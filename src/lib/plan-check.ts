/**
 * src/lib/plan-check.ts
 * プラン判定ヘルパー
 *
 * Phase 3.1: LocalStorage ベースのプラン判定
 * Phase 3.2: Supabase DB 参照に切り替え
 *
 * plan: 'free' | 'pass' | 'pro'
 */

export type UserPlan = 'free' | 'pass' | 'pro';

const PLAN_STORAGE_KEY = 'shindan_user_plan';

/** LocalStorage からプランを取得（モック）*/
export function getLocalPlan(): UserPlan {
  if (typeof window === 'undefined') return 'free';
  try {
    const stored = localStorage.getItem(PLAN_STORAGE_KEY);
    if (stored === 'pass' || stored === 'pro') return stored;
    return 'free';
  } catch {
    return 'free';
  }
}

/** LocalStorage にプランを保存（テスト用・本番では Stripe Webhook が更新）*/
export function setLocalPlan(plan: UserPlan): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, plan);
  } catch {
    console.warn('[PlanCheck] LocalStorage への保存に失敗しました');
  }
}

/** プランの機能チェック */
export const planFeatures = {
  canViewDetailedReport: (plan: UserPlan) => plan === 'pass' || plan === 'pro',
  canUseAiCard: (plan: UserPlan) => plan === 'pass' || plan === 'pro',
  canUseTimeCapsule: (plan: UserPlan) => plan === 'pro',
  canUseUnlimitedAi: (plan: UserPlan) => plan === 'pro',
  hasNoAds: (plan: UserPlan) => plan === 'pro',
  hasHistoryGraph: (plan: UserPlan) => plan === 'pro',
  aiDailyLimit: (plan: UserPlan): number => {
    if (plan === 'pro') return Infinity;
    if (plan === 'pass') return 10;
    return 0;
  },
};

/** プランの表示名 */
export const planLabels: Record<UserPlan, string> = {
  free: '無料',
  pass: 'PASS（¥390）',
  pro: 'PRO（¥590/月）',
};

/** PRO限定機能の未加入メッセージ */
export function getUpgradeMessage(
  feature: 'timeCapsule' | 'unlimitedAi' | 'historyGraph' | 'noAds'
): string {
  const messages: Record<string, string> = {
    timeCapsule: 'タイムカプセル機能は PRO会員（¥590/月）限定です。',
    unlimitedAi: 'AIプロンプトカードの無制限利用は PRO会員（¥590/月）限定です。',
    historyGraph: '特性変化グラフは PRO会員（¥590/月）限定です。',
    noAds: '広告非表示は PRO会員（¥590/月）限定です。',
  };
  return messages[feature] ?? 'この機能は PRO会員限定です。';
}
