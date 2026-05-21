/**
 * POST /api/stripe/checkout-session
 * Stripe Checkout Session 作成（PASS ¥390 買い切り / PRO ¥590/月サブスク）
 *
 * Phase 3.1: env未設定なら503 + モックメッセージ
 * Phase 3.3: env設定後に本接続
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
  const passPriceId = import.meta.env.STRIPE_PASS_PRICE_ID;
  const proPriceId = import.meta.env.STRIPE_PRO_PRICE_ID;
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://shindan-navi.jp';

  // env 未設定チェック（モック動作）
  if (!stripeSecretKey || !passPriceId || !proPriceId) {
    return new Response(
      JSON.stringify({
        ok: false,
        mock: true,
        message: 'Stripe 決済は準備中です。CEO が環境変数を設定するとご利用いただけます。',
        mockUrl: `${siteUrl}/pro/`,
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // env 設定済み → 本接続
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeSecretKey);

  let body: { type?: string; userId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { type = 'pass', userId } = body;

  try {
    if (type === 'pass') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: passPriceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${siteUrl}/pass/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/pass/cancel`,
        metadata: { user_id: userId ?? '', type: 'pass' },
      });
      return new Response(JSON.stringify({ ok: true, url: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (type === 'pro') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: proPriceId, quantity: 1 }],
        mode: 'subscription',
        success_url: `${siteUrl}/pro/success`,
        cancel_url: `${siteUrl}/pro/cancel`,
        subscription_data: { metadata: { user_id: userId ?? '' } },
      });
      return new Response(JSON.stringify({ ok: true, url: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: false, message: 'Invalid type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return new Response(JSON.stringify({ ok: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
