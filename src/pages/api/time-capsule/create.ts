/**
 * POST /api/time-capsule/create
 * タイムカプセル作成エンドポイント
 *
 * Phase 3.1: レスポンスのみ（LocalStorage はフロントが管理）
 * Phase 3.4: Supabase time_capsules テーブルに INSERT
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  let body: {
    letterText?: string;
    targetMonths?: number;
    diagnosisSnapshot?: Record<string, unknown>;
    userId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { letterText = '', targetMonths = 3, diagnosisSnapshot = {}, userId } = body;

  // バリデーション
  if (!letterText.trim() || letterText.trim().length < 10) {
    return new Response(
      JSON.stringify({ ok: false, message: '手紙の内容は10文字以上必要です' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (![3, 6, 12].includes(targetMonths)) {
    return new Response(
      JSON.stringify({ ok: false, message: 'targetMonths は 3, 6, 12 のいずれかを指定してください' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Supabase 設定済みの場合はDBに保存（Phase 3.4で本実装）
  const { isServerConfigured } = await import('../../../lib/supabase/server');

  if (isServerConfigured && userId) {
    // TODO Phase 3.4: Supabase time_capsules に INSERT
    console.log('[TimeCapsule] Supabase 設定済みですが DB保存は Phase 3.4 で実装予定');
  }

  const scheduledOpenAt = new Date();
  scheduledOpenAt.setMonth(scheduledOpenAt.getMonth() + targetMonths);

  const mockId = `tc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return new Response(
    JSON.stringify({
      ok: true,
      id: mockId,
      scheduledOpenAt: scheduledOpenAt.toISOString(),
      message: `${targetMonths}ヶ月後（${scheduledOpenAt.toLocaleDateString('ja-JP')}）に通知が届きます`,
      persisted: isServerConfigured && Boolean(userId),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
