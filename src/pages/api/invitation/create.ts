/**
 * POST /api/invitation/create
 * 招待コード生成エンドポイント
 *
 * Phase 3.1: サーバー側はコード生成のみ（フロント LocalStorage に保存）
 * Phase 3.5: Supabase invitations テーブルに INSERT
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { generateInviteCode } from '../../../lib/invitation/code-generator';

export const POST: APIRoute = async ({ request }) => {
  let body: { mode?: string; resultId?: string; diagPath?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { mode = 'secret', resultId = '', diagPath = '/diagnosis/mbti/' } = body;

  // 有効な mode チェック
  const validModes = ['secret', 'invite', 'one_way', 'full_share'];
  if (!validModes.includes(mode)) {
    return new Response(
      JSON.stringify({ ok: false, message: `Invalid mode: ${mode}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const code = generateInviteCode();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // Supabase 設定済みの場合はDBに保存（Phase 3.5で本実装）
  const { isServerConfigured } = await import('../../../lib/supabase/server');
  if (isServerConfigured) {
    // TODO Phase 3.5: Supabase invitations テーブルに INSERT
    console.log('[Invitation] Supabase 設定済みですが DB保存は Phase 3.5 で実装予定');
  }

  return new Response(
    JSON.stringify({
      ok: true,
      code,
      mode,
      resultId,
      diagPath,
      expiresAt,
      inviteUrl: `https://shindan-navi.jp/i/${code}/`,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
