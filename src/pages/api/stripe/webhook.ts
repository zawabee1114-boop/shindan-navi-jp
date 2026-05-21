/**
 * POST /api/stripe/webhook
 * Stripe Webhook 受信・イベント処理
 *
 * Phase 3.1: env未設定なら503
 * Phase 3.3: 本接続・全イベントハンドラ実装
 *
 * 署名検証: stripe.webhooks.constructEvent
 * Cloudflare Workers 互換（raw body をtext()で取得）
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  // env 未設定チェック
  if (!stripeSecretKey || !webhookSecret) {
    return new Response(
      JSON.stringify({
        ok: false,
        mock: true,
        message: 'Stripe Webhook は準備中です（Phase 3.3 で本接続）',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeSecretKey);

  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  // 署名検証
  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Supabase サーバークライアント（env設定済みの場合のみ）
  const { createServerClient } = await import('../../../lib/supabase/server');
  const supabase = createServerClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as {
          metadata?: { user_id?: string; type?: string };
          payment_intent?: string;
          id: string;
        };
        const userId = session.metadata?.user_id;
        const type = session.metadata?.type;

        if (userId && type === 'pass' && supabase) {
          // pass_purchases に INSERT
          await supabase.from('pass_purchases').insert({
            user_id: userId,
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string | undefined,
            amount_jpy: 390,
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          });
          // users プランを pass に更新
          await supabase
            .from('users')
            .update({
              plan: 'pass',
              pass_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as {
          id: string;
          customer: string;
          status: string;
          current_period_start: number;
          current_period_end: number;
          cancel_at_period_end: boolean;
          metadata?: { user_id?: string };
        };
        const userId = sub.metadata?.user_id;

        if (userId && supabase) {
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: sub.customer as string,
            stripe_subscription_id: sub.id,
            plan: 'pro',
            status: sub.status as 'active' | 'past_due' | 'canceled' | 'incomplete',
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          });
          await supabase
            .from('users')
            .update({ plan: 'pro', updated_at: new Date().toISOString() })
            .eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as {
          id: string;
          metadata?: { user_id?: string };
        };
        const userId = sub.metadata?.user_id;

        if (userId && supabase) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'canceled',
              plan: 'free',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', sub.id);
          await supabase
            .from('users')
            .update({ plan: 'free', updated_at: new Date().toISOString() })
            .eq('id', userId);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as {
          subscription?: string;
        };
        if (invoice.subscription && supabase) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due', updated_at: new Date().toISOString() })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        break;
      }

      default:
        // 未処理イベントは無視
        break;
    }
  } catch (err) {
    console.error('[Stripe Webhook] 処理エラー:', err);
    return new Response('Internal server error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
