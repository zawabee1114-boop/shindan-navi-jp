/**
 * POST /api/auth/signout
 * ログアウト処理
 *
 * Phase 3.2: Supabase セッション Cookie を削除してリダイレクト
 *
 * セキュリティ:
 * - POST のみ受け付け（CSRF 対策）
 * - Cookie を即時期限切れに設定
 * - Supabase 側でも signOut 実行
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request, redirect }) => {
  const isConfigured = Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  // env 未設定 → ホームにリダイレクト
  if (!isConfigured) {
    return redirect('/', 302);
  }

  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  // Cookie からセッションを取得してサーバー側でサインアウト
  const cookieHeader = request.headers.get('cookie') ?? '';
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? '';
  const cookieName = `sb-${projectRef}-auth-token`;

  // Cookie パース
  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const [key, ...valueParts] = part.trim().split('=');
    if (key) cookies[key.trim()] = valueParts.join('=').trim();
  }

  const authCookieRaw = cookies[cookieName];
  if (authCookieRaw) {
    try {
      const tokenData = JSON.parse(decodeURIComponent(authCookieRaw));
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;

      if (accessToken) {
        const client = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        });

        await client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken ?? '',
        });

        await client.auth.signOut();
      }
    } catch {
      // サインアウトエラーは無視（Cookie 削除は続行）
    }
  }

  // Cookie を即時期限切れに設定してリダイレクト
  const headers = new Headers();
  headers.set('Location', '/');

  // 通常Cookie
  headers.append('Set-Cookie', `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
  // Chunked Cookie（念のため）
  headers.append('Set-Cookie', `${cookieName}.0=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);

  return new Response(null, {
    status: 302,
    headers,
  });
};

// GET は許可しない
export const GET: APIRoute = async ({ redirect }) => {
  return redirect('/', 302);
};
