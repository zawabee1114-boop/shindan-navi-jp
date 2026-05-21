/**
 * POST /api/ai-prompt-card
 * AIプロンプトカード生成エンドポイント
 *
 * レート制限:
 *   - 無料: 利用不可
 *   - PASS: 1日10回（LocalStorage カウンタで仮実装）
 *   - PRO: 無制限
 *
 * Phase 3.1: LocalStorage カウンタ + 静的テンプレート fallback
 * Phase 3.3: Supabase DB カウンタ + Claude Sonnet 4.6 本接続
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import type { AiPromptFormat, AiUseCase } from '../../lib/claude/client';

export const POST: APIRoute = async ({ request }) => {
  let body: {
    format?: AiPromptFormat;
    useCase?: AiUseCase;
    profile?: Record<string, unknown>;
    plan?: string;
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
    format = 'chatgpt',
    useCase = 'self_intro',
    profile = {},
    plan = 'free',
  } = body;

  // レート制限チェック（Phase 3.1: plan 引数ベースの簡易実装）
  if (plan === 'free') {
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'AIプロンプトカードは PASS（¥390）または PRO（¥590/月）会員限定機能です。',
        upgradeUrl: '/pro/',
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // PASS: 1日10回制限（Phase 3.3でDB実装に移行）
  // Phase 3.1ではフロントのLocalStorageカウンタを信頼
  if (plan === 'pass') {
    // サーバーサイドでは制限なし（フロントが管理）
    // Phase 3.3でDB カウンタに切り替え
  }

  // PRO: 無制限

  // Claude API でカード生成
  const { generateAiPromptCard } = await import('../../lib/claude/client');

  try {
    const result = await generateAiPromptCard(
      profile as Parameters<typeof generateAiPromptCard>[0],
      format,
      useCase
    );

    return new Response(
      JSON.stringify({
        ok: true,
        ...result,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI生成エラー';
    return new Response(
      JSON.stringify({ ok: false, message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
