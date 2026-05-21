/**
 * src/lib/user-profile.ts
 * ユーザープロファイル・プラン取得ヘルパー
 *
 * Phase 3.2: Supabase users テーブルから取得
 *
 * 使用箇所:
 * - middleware.ts（サーバーサイドでプラン取得）
 * - API ルート（認証チェック）
 * - Astro ページ（Astro.locals.plan 経由が推奨）
 *
 * 注意: クライアントサイドで直接呼び出さないこと。
 * クライアント側は src/lib/plan-check.ts の getLocalPlan() を使う。
 */

import { createClient } from '@supabase/supabase-js';
import type { Database, UserPlan } from './supabase/types';

/**
 * users テーブルからユーザーのプランを取得
 *
 * @param userId Supabase Auth の user.id
 * @returns UserPlan（取得失敗時は 'free'）
 */
export async function getUserPlan(userId: string): Promise<UserPlan> {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) return 'free';

  try {
    const client = createClient<Database>(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await client
      .from('users')
      .select('plan, pass_expires_at')
      .eq('id', userId)
      .single();

    if (error || !data) return 'free';

    // PASS プランの有効期限チェック
    if (data.plan === 'pass' && data.pass_expires_at) {
      const expiresAt = new Date(data.pass_expires_at).getTime();
      if (Date.now() > expiresAt) {
        // 期限切れの場合は free にダウングレード（非同期更新）
        void downgradeExpiredPass(userId, client);
        return 'free';
      }
    }

    return data.plan as UserPlan;
  } catch {
    return 'free';
  }
}

/**
 * 期限切れ PASS を free にダウングレード（非同期・エラー無視）
 */
async function downgradeExpiredPass(
  userId: string,
  client: ReturnType<typeof createClient<Database>>
): Promise<void> {
  try {
    await client
      .from('users')
      .update({ plan: 'free', pass_expires_at: null, updated_at: new Date().toISOString() })
      .eq('id', userId);
  } catch {
    // 無視
  }
}

/**
 * users テーブルのレコードを取得
 * middleware では Astro.locals.plan を使うことを推奨
 */
export async function getUserRecord(userId: string) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) return null;

  try {
    const client = createClient<Database>(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await client
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * プラン別の1日あたり AI プロンプトカード利用上限
 */
export function getAiDailyLimit(plan: UserPlan): number {
  if (plan === 'pro') return Infinity;
  if (plan === 'pass') return 10;
  return 3; // 無料は1日3回
}

/**
 * プランが特定の機能を利用できるか確認
 */
export const planFeatureCheck = {
  /** 詳細レポート表示 */
  detailedReport: (plan: UserPlan) => plan === 'pass' || plan === 'pro',
  /** AI プロンプトカード利用 */
  aiPromptCard: (plan: UserPlan) => true, // 全プラン利用可（制限あり）
  /** タイムカプセル */
  timeCapsule: (plan: UserPlan) => plan === 'pro',
  /** 広告非表示 */
  noAds: (plan: UserPlan) => plan === 'pro',
  /** 統合プロファイル履歴 */
  profileHistory: (plan: UserPlan) => plan === 'pro',
};
