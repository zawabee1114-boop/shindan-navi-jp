/**
 * src/middleware.ts
 * Astro 認証ミドルウェア
 *
 * Phase 3.2: Supabase セッション検証・認証ガード本接続
 *
 * 保護ページ:
 *   - /profile/          : 統合プロファイル（要ログイン）
 *   - /me/               : マイページ（要ログイン）
 *   - /pro/              : プロ機能（要ログイン、plan チェック不要）
 *   - /track/timecapsule/create : タイムカプセル作成（PRO限定）
 *
 * 認証済みユーザーが /login/ /signup/ にアクセスしたら /profile/ へ
 * env 未設定時は全ページ通過（Phase 3.1 互換）
 */

import { defineMiddleware } from 'astro:middleware';

// 認証必須パス（未ログインは /login/?redirect=元URL へ）
const AUTH_REQUIRED_PATHS = [
  '/profile/',
  '/me/',
];

// PRO 限定パス（ログイン必須 + plan=pro が必要）
const PRO_ONLY_PATHS = [
  '/track/timecapsule/create',
];

// ログイン済みユーザーをリダイレクトするパス
const REDIRECT_IF_AUTHED_PATHS = [
  '/login/',
  '/signup/',
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals, redirect } = context;
  const pathname = new URL(url).pathname;
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://shindan-navi.jp';

  // env 未設定時は無条件通過（Phase 3.1 モック動作）
  const isSupabaseConfigured = Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  if (!isSupabaseConfigured) {
    locals.session = null;
    locals.user = null;
    locals.plan = 'free';
    return next();
  }

  // Phase 3.2: Supabase セッション検証
  // サーバーサイドでは Cookie ベースのセッション取得が必要だが、
  // Cloudflare Pages + Astro hybrid では getSession() が Cookie を自動読み取る
  let session = null;
  let user = null;
  let plan: 'free' | 'pass' | 'pro' = 'free';

  try {
    // サーバーサイドで anon key を使って Cookie セッションを確認
    // Service Role Key は使わない（Cookie の JWT を検証するだけなので anon key で十分）
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    // Cookie からアクセストークンを取得
    const cookieHeader = context.request.headers.get('cookie') ?? '';
    const cookies = parseCookies(cookieHeader);

    // Supabase の Cookie 名パターン: sb-{project-ref}-auth-token
    // project ref は URL から抽出
    const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? '';
    const authCookieName = `sb-${projectRef}-auth-token`;
    const authCookieNameBase64 = `sb-${projectRef}-auth-token.0`; // Chunked 形式

    // Cookie からセッション情報を復元
    const authTokenRaw = cookies[authCookieName] || cookies[authCookieNameBase64];

    if (authTokenRaw) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(authTokenRaw));
        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;

        if (accessToken) {
          // アクセストークンが存在する場合、Supabase クライアントでユーザー取得
          const client = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          });

          // アクセストークンをセット
          await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken ?? '',
          });

          const { data: { user: authUser } } = await client.auth.getUser();

          if (authUser) {
            user = authUser;
            session = { access_token: accessToken, user: authUser } as App.Locals['session'];

            // users テーブルからプランを取得
            const { data: userRow } = await client
              .from('users')
              .select('plan')
              .eq('id', authUser.id)
              .single();

            plan = (userRow?.plan as 'free' | 'pass' | 'pro') ?? 'free';
          }
        }
      } catch {
        // Cookie パース失敗は無視（未認証扱い）
      }
    }
  } catch (err) {
    console.error('[Middleware] セッション取得エラー:', err);
  }

  locals.session = session;
  locals.user = user;
  locals.plan = plan;

  // ログイン済みユーザーが /login/ /signup/ にアクセス → /profile/ へ
  if (user && REDIRECT_IF_AUTHED_PATHS.some((p) => pathname.startsWith(p))) {
    return redirect('/profile/');
  }

  // 認証必須ページの保護
  const isAuthRequired = AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p));
  if (isAuthRequired && !user) {
    const redirectParam = encodeURIComponent(pathname);
    return redirect(`/login/?redirect=${redirectParam}`);
  }

  // PRO 限定ページの保護
  const isProOnly = PRO_ONLY_PATHS.some((p) => pathname.startsWith(p));
  if (isProOnly) {
    if (!user) {
      const redirectParam = encodeURIComponent(pathname);
      return redirect(`/login/?redirect=${redirectParam}`);
    }
    if (plan !== 'pro') {
      return redirect('/pro/?ref=gate');
    }
  }

  return next();
});

/**
 * Cookie ヘッダーをパースして Record に変換
 */
function parseCookies(cookieHeader: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;

  for (const part of cookieHeader.split(';')) {
    const [key, ...valueParts] = part.trim().split('=');
    if (key) {
      result[key.trim()] = valueParts.join('=').trim();
    }
  }
  return result;
}
