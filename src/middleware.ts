/**
 * src/middleware.ts
 * Astro 認証ミドルウェア
 *
 * Phase 3.1: env未設定時は無条件通過（モック動作）
 * Phase 3.2: Supabase セッション検証・PRO限定ページガード
 *
 * PRO限定パス（認証必須）:
 *   - /track/timecapsule/create
 *   - /me/ （ユーザーダッシュボード）
 */

import { defineMiddleware } from 'astro:middleware';

// PRO 限定パス（Phase 3.2 以降でガード有効化）
const PRO_ONLY_PATHS = ['/track/timecapsule/create'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals } = context;
  const pathname = new URL(url).pathname;

  // env 未設定時は無条件通過（Phase 3.1 モック動作）
  const isSupabaseConfigured = Boolean(
    import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  if (!isSupabaseConfigured) {
    // Phase 3.1: 認証なしで全ページにアクセス可能
    locals.session = null;
    locals.user = null;
    locals.plan = 'free';
    return next();
  }

  // Phase 3.2 以降: Supabase セッション検証
  // （env設定後に以下を有効化）
  /*
  const { createServerClient } = await import('./lib/supabase/server');
  const supabase = createServerClient();

  if (supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    locals.session = session;
    locals.user = session?.user ?? null;

    if (session?.user) {
      const { data: userRow } = await supabase
        .from('users')
        .select('plan')
        .eq('id', session.user.id)
        .single();
      locals.plan = userRow?.plan ?? 'free';
    } else {
      locals.plan = 'free';
    }
  }

  // PRO限定ページの保護
  const isProOnly = PRO_ONLY_PATHS.some((p) => pathname.startsWith(p));
  if (isProOnly && locals.plan !== 'pro') {
    return context.redirect('/pro/?ref=gate');
  }
  */

  locals.session = null;
  locals.user = null;
  locals.plan = 'free';

  return next();
});
