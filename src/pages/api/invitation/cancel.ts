/**
 * POST /api/invitation/cancel
 * 招待コードの取り消し（招待者が使用）
 *
 * Phase 3.5: expires_at を即時過去日に設定して無効化
 *
 * 入力: { invitation_id }
 * 認証: ログイン必須 + 自分が inviter のもののみキャンセル可
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase/server';

export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ ok: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { invitation_id?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { invitation_id } = body;
  if (!invitation_id) {
    return new Response(JSON.stringify({ ok: false, message: 'invitation_id required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createServerClient();
  if (!supabase) {
    return new Response(
      JSON.stringify({ ok: false, message: 'DB not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 自分が inviter か確認してから無効化
  const { error } = await supabase
    .from('invitations')
    .update({ expires_at: new Date(0).toISOString() })
    .eq('id', invitation_id)
    .eq('inviter_id', user.id);

  if (error) {
    console.error('[Invitation Cancel] DB エラー:', error.message);
    return new Response(
      JSON.stringify({ ok: false, message: 'DB error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
