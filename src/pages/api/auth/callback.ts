/**
 * GET /api/auth/callback
 * Supabase Magic Link コールバック
 *
 * Phase 3.1: env未設定時はホームにリダイレクト
 * Phase 3.2: Supabase Auth の code を交換し、ユーザー登録・LocalStorage移行
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://shindan-navi.jp';
  const isConfigured = Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  // env 未設定 → ホームにリダイレクト（モック動作）
  if (!isConfigured) {
    return redirect(`${siteUrl}/?auth=mock`, 302);
  }

  // Phase 3.2 で実装:
  // 1. code パラメータを取得
  // 2. supabase.auth.exchangeCodeForSession(code)
  // 3. users テーブルに INSERT on conflict do nothing
  // 4. LocalStorage の診断データを DB に移行
  // 5. ダッシュボードにリダイレクト

  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/profile/';

  if (!code) {
    return redirect(`${siteUrl}/?auth=error`, 302);
  }

  // TODO Phase 3.2: 本実装
  return redirect(`${siteUrl}${next}`, 302);
};
