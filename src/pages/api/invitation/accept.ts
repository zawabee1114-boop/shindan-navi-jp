/**
 * POST /api/invitation/accept
 * 招待受け取り完了（受け手が診断完了後に呼ぶ）
 *
 * Phase 3.5: invitations.accepted_at をセット + compatibility_pairs INSERT
 *
 * 入力:
 *   { invitation_id, invite_code, invitee_diagnosis_snapshot, compatibility_result }
 *
 * 招待相性は完全無料・無制限（制限ロジックなし）
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase/server';
import type { InviteMode } from '../../../lib/supabase/types';

export const POST: APIRoute = async ({ request, locals }) => {
  let body: {
    invitation_id?: string;
    invite_code?: string;
    invitee_diagnosis_snapshot?: Record<string, unknown>;
    compatibility_result?: Record<string, number>;
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
    invitation_id,
    invite_code,
    invitee_diagnosis_snapshot = {},
    compatibility_result = { overall: 0, love: 0, work: 0, friend: 0, family: 0, school: 0 },
  } = body;

  if (!invitation_id && !invite_code) {
    return new Response(
      JSON.stringify({ ok: false, message: 'invitation_id or invite_code required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const supabase = createServerClient();
  if (!supabase) {
    // DB 未接続時はゲストモードで成功扱い
    return new Response(
      JSON.stringify({ ok: true, saved: false, reason: 'supabase_not_configured' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 招待情報の取得
  let invitationRow: {
    id: string;
    inviter_id: string;
    mode: InviteMode;
    expires_at: string;
    accepted_at: string | null;
  } | null = null;

  try {
    const query = invitation_id
      ? supabase.from('invitations').select('id, inviter_id, mode, expires_at, accepted_at').eq('id', invitation_id).single()
      : supabase.from('invitations').select('id, inviter_id, mode, expires_at, accepted_at').eq('invite_code', invite_code!.toUpperCase()).single();

    const { data, error } = await query;
    if (error || !data) {
      return new Response(
        JSON.stringify({ ok: false, message: 'Invitation not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    invitationRow = data as typeof invitationRow;
  } catch (err) {
    console.error('[Invitation Accept] DB 取得エラー:', err);
    return new Response(
      JSON.stringify({ ok: false, message: 'DB error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!invitationRow) {
    return new Response(
      JSON.stringify({ ok: false, message: 'Invitation not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 有効期限チェック
  if (new Date(invitationRow.expires_at) < new Date()) {
    return new Response(
      JSON.stringify({ ok: false, message: 'Invitation expired' }),
      { status: 410, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const now = new Date().toISOString();
  const inviteeId = locals.user?.id ?? null;

  // invitations テーブル更新（accepted_at + invitee 情報）
  try {
    await supabase
      .from('invitations')
      .update({
        accepted_at: now,
        invitee_id: inviteeId,
        invitee_diagnosis_snapshot: invitee_diagnosis_snapshot,
        compatibility_result: compatibility_result as Record<string, unknown>,
      })
      .eq('id', invitationRow.id);
  } catch (err) {
    console.error('[Invitation Accept] invitations UPDATE エラー:', err);
  }

  // compatibility_pairs INSERT（招待者 + 受け手の相性データ）
  let pairId: string | null = null;
  try {
    const { data: pairData, error: pairError } = await supabase
      .from('compatibility_pairs')
      .insert({
        inviter_id: invitationRow.inviter_id,
        invitee_id: inviteeId,
        invitation_id: invitationRow.id,
        mode: invitationRow.mode,
        compatibility_result: compatibility_result,
      })
      .select('id')
      .single();

    if (pairError) {
      console.error('[Invitation Accept] compatibility_pairs INSERT エラー:', pairError.message);
    } else {
      pairId = pairData?.id ?? null;
    }
  } catch (err) {
    console.error('[Invitation Accept] pairs DB エラー:', err);
  }

  return new Response(
    JSON.stringify({
      ok: true,
      saved: true,
      pair_id: pairId,
      invitation_id: invitationRow.id,
      mode: invitationRow.mode,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
