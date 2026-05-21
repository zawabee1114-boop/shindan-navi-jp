/**
 * src/lib/supabase/server.ts
 * Supabase サーバーサイドクライアント（SERVICE_ROLE_KEY 使用）
 *
 * API Routes / Webhooks の内部でのみ使用。
 * フロントエンドには絶対に公開しない。
 *
 * Phase 3.1: 環境変数未設定時は null を返すスタブ動作
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/** サーバーサイド用クライアントを生成（呼び出し毎に生成してリクエスト分離を維持）*/
export function createServerClient(): SupabaseClient<Database> | null {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn('[Supabase Server] 環境変数未設定のためスタブ動作（Phase 3.1）');
    return null;
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/** 環境変数設定済みかチェック */
export const isServerConfigured = Boolean(
  import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);
