/**
 * GET /api/auth/callback
 * Supabase Magic Link コールバック
 *
 * Phase 3.2: Supabase Auth の code を交換してセッションを確立
 *
 * フロー:
 * 1. Magic Link メールから ?code= パラメータ付きで遷移
 * 2. code を exchangeCodeForSession で JWT に変換
 * 3. users テーブルに初回登録（ON CONFLICT DO NOTHING）
 * 4. /profile/ へリダイレクト
 *
 * セキュリティ:
 * - Service Role Key はサーバーサイドでのみ使用（クライアント露出禁止）
 * - 取得したセッション Cookie は Supabase SDK が自動設定
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../lib/supabase/types';

export const GET: APIRoute = async ({ url, redirect, request }) => {
  const siteUrl = import.meta.env.PUBLIC_SUPABASE_URL ? 'https://shindan-navi.jp' : (import.meta.env.PUBLIC_SITE_URL ?? 'https://shindan-navi.jp');
  const isConfigured = Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  // env 未設定 → ホームにリダイレクト（モック動作）
  if (!isConfigured) {
    return redirect(`/?auth=mock`, 302);
  }

  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/profile/';
  const errorParam = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // エラーパラメータが含まれる場合（期限切れリンク等）
  if (errorParam) {
    const msg = encodeURIComponent(errorDescription ?? errorParam);
    return redirect(`/login/?auth_error=${msg}`, 302);
  }

  if (!code) {
    return redirect(`/login/?auth_error=no_code`, 302);
  }

  // Supabase クライアント（anon key で code exchange）
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // code → session 交換
  const { data: sessionData, error: sessionError } = await client.auth.exchangeCodeForSession(code);

  if (sessionError || !sessionData.session) {
    console.error('[Auth Callback] セッション交換エラー:', sessionError?.message);
    return redirect(`/login/?auth_error=session_exchange_failed`, 302);
  }

  const { session, user } = sessionData;

  // users テーブルへの初回登録（DBトリガーが既に処理する場合もあるが、念のため明示実行）
  // Service Role Key でバイパス（RLS 回避）
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    try {
      const adminClient = createClient<Database>(supabaseUrl, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      // users テーブルに upsert（既存ユーザーは更新しない）
      const { error: upsertError } = await adminClient
        .from('users')
        .upsert(
          {
            id: user.id,
            email: user.email ?? '',
            plan: 'free',
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'id',
            ignoreDuplicates: true, // 既存ユーザーはスキップ
          }
        );

      if (upsertError) {
        // エラーでも認証フロー自体は続行
        console.warn('[Auth Callback] users upsert warning:', upsertError.message);
      }
    } catch (err) {
      console.warn('[Auth Callback] 管理クライアントエラー（続行）:', err);
    }
  }

  // セッション Cookie をレスポンスヘッダーにセット
  // Supabase が期待する Cookie 名: sb-{project-ref}-auth-token
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? '';
  const cookieName = `sb-${projectRef}-auth-token`;
  const cookieValue = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    token_type: 'bearer',
    user: {
      id: user.id,
      email: user.email,
    },
  });

  // リダイレクト先（next パラメータ または profile）
  const redirectTo = next.startsWith('/') ? next : '/profile/';

  // Cookie をセットしてリダイレクト
  const headers = new Headers();
  headers.set('Location', redirectTo);

  const cookieOptions = [
    `${cookieName}=${encodeURIComponent(cookieValue)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
    `Max-Age=${60 * 60 * 24 * 7}`, // 7日
  ].join('; ');

  headers.append('Set-Cookie', cookieOptions);

  return new Response(null, {
    status: 302,
    headers,
  });
};
