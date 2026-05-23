/**
 * POST /api/invitation/create
 * 招待コード生成エンドポイント
 *
 * Phase 3.5: Supabase invitations テーブルに本接続
 *
 * 入力: { mode, resultId, diagPath, diagnosisSnapshot? }
 * - ゲスト: コード生成のみ返却（LocalStorage 保存はフロントで行う）
 * - ログイン時: invitations テーブルに INSERT + コード返却
 *
 * 招待相性は完全無料・無制限（回数制限ロジック一切なし）
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { generateInviteCode } from '../../../lib/invitation/code-generator';
import { createServerClient } from '../../../lib/supabase/server';
import type { InviteMode } from '../../../lib/supabase/types';

const VALID_MODES: InviteMode[] = ['secret', 'invite', 'one_way', 'full_share'];

export const POST: APIRoute = async ({ request, locals }) => {
  let body: {
    mode?: string;
    resultId?: string;
    diagPath?: string;
    diagnosisSnapshot?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const {
    mode = 'secret',
    resultId = '',
    diagPath = '/diagnosis/mbti/',
    diagnosisSnapshot = {},
  } = body;

  // モード検証
  if (!VALID_MODES.includes(mode as InviteMode)) {
    return new Response(
      JSON.stringify({ ok: false, message: `Invalid mode: ${mode}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const code = generateInviteCode();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const inviteUrl = `https://shindan-navi.jp/invite/?code=${code}`;

  // ログインユーザーは DB に保存（招待相性は無料・無制限 = 回数チェックなし）
  const user = locals.user;
  let dbId: string | null = null;

  if (user) {
    const supabase = createServerClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .insert({
            inviter_id: user.id,
            invite_code: code,
            mode: mode as InviteMode,
            inviter_diagnosis_snapshot: diagnosisSnapshot,
            expires_at: expiresAt,
          })
          .select('id')
          .single();

        if (error) {
          console.error('[Invitation] DB INSERT エラー:', error.message);
        } else {
          dbId = data?.id ?? null;
        }
      } catch (err) {
        console.error('[Invitation] DB 接続エラー:', err);
      }
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      code,
      mode,
      resultId,
      diagPath,
      expiresAt,
      inviteUrl,
      dbId,
      savedToDb: dbId !== null,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
