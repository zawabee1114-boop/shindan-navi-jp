/**
 * GET /api/invitation/verify/[code]
 * 招待コード検証エンドポイント
 *
 * Phase 3.5: DB + LocalStorage 両方を考慮した検証
 *
 * 検索順:
 *   1. invitations テーブル（DB）で code 検索 → ヒットすれば DB 優先
 *   2. DB に無い場合はゲスト生成コードとして valid: true を返す（フロントで LocalStorage 確認）
 *
 * 戻り値:
 *   { valid, mode, inviter_id, diagPath, expires_at, source: 'db' | 'guest' }
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase/server';

export const GET: APIRoute = async ({ params }) => {
  const rawCode = params.code ?? '';
  const code = rawCode.trim().toUpperCase();

  if (!code || !/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4,8}$/.test(code)) {
    return new Response(
      JSON.stringify({ valid: false, message: 'Invalid code format' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabase = createServerClient();

  // DB 検索
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('id, inviter_id, mode, inviter_diagnosis_snapshot, invitee_id, accepted_at, expires_at')
        .eq('invite_code', code)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = not found 以外はサーバーエラー
        console.error('[Invitation Verify] DB エラー:', error.message);
      }

      if (data) {
        const isExpired = new Date(data.expires_at) < new Date();
        if (isExpired) {
          return new Response(
            JSON.stringify({ valid: false, message: 'Invitation expired', source: 'db' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({
            valid: true,
            source: 'db',
            mode: data.mode,
            inviter_id: data.inviter_id,
            invitation_id: data.id,
            expires_at: data.expires_at,
            already_accepted: data.accepted_at !== null,
            inviter_diagnosis_snapshot: data.inviter_diagnosis_snapshot,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (err) {
      console.error('[Invitation Verify] 接続エラー:', err);
    }
  }

  // DB に無い場合: ゲスト生成コードとして扱う（LocalStorage でフロントが確認）
  // コードフォーマットが正しければ有効として返す（フロントで期限チェック）
  return new Response(
    JSON.stringify({
      valid: true,
      source: 'guest',
      mode: null,
      inviter_id: null,
      invitation_id: null,
      expires_at: null,
      already_accepted: false,
      inviter_diagnosis_snapshot: null,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
