/**
 * src/lib/supabase/client.ts
 * Supabase クライアント（ブラウザ側）
 *
 * Phase 3.1: 環境変数未設定時は null を返すスタブ動作
 * Phase 3.2: 環境変数設定後に本接続に自動切り替え
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** 環境変数が設定済みかチェック */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Supabase クライアント（env未設定時は null）*/
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// ===== 認証ヘルパー関数 =====

/** Magic Link でサインイン（メール送信）*/
export async function signInWithMagicLink(
  email: string
): Promise<{ error: Error | null }> {
  if (!supabase) {
    console.warn('[Supabase] 未設定のため Magic Link を送信できません（モック動作）');
    return { error: null }; // モックでは成功扱い
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${import.meta.env.PUBLIC_SITE_URL ?? 'https://shindan-navi.jp'}/api/auth/callback`,
    },
  });
  return { error: error as Error | null };
}

/** サインアップ（Magic Linkと同じ・パスワードレス）*/
export async function signUp(email: string): Promise<{ error: Error | null }> {
  return signInWithMagicLink(email);
}

/** サインアウト */
export async function signOut(): Promise<{ error: Error | null }> {
  if (!supabase) {
    return { error: null };
  }
  const { error } = await supabase.auth.signOut();
  return { error: error as Error | null };
}

/** 現在のユーザー取得 */
export async function getUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** セッション取得（RLS対応）*/
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}
