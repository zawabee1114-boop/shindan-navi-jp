/**
 * analytics.ts - GA4 カスタムイベント ラッパー
 *
 * GA4 測定ID: G-S4WP0YRDWW（BaseLayout.astro に直書き済み）
 *
 * 設計方針:
 *   - window.gtag が存在すれば発火・なければ no-op（開発環境セーフ）
 *   - 個人情報を絶対に送らない（diagnosis_id / result_type / platform のみ）
 *   - メアド・ユーザーID・Supabase UUID 等をパラメータに含めない
 *   - TypeScript で全イベント名・パラメータを型付け（タイポ防止）
 *
 * イベント一覧:
 *   診断系:
 *     - diagnosis_start（診断開始）
 *     - diagnosis_complete（診断完了）
 *     - result_view（結果ページ表示）
 *   マネタイズ系:
 *     - pass_cta_click（PASS購入ボタンクリック）
 *     - pro_cta_click（PRO登録ボタンクリック）
 *     - ai_prompt_generate（AIプロンプトカード生成）
 *   バイラル系:
 *     - invite_create（招待コード生成）
 *     - invite_accept（招待受諾）
 *     - share_click（シェアボタンクリック）
 *   エンゲージメント系:
 *     - integrated_profile_view（統合プロファイル閲覧）
 *     - diagnosis_count_milestone（3/8診断完了マイルストーン）
 */

// ============================================================
// 型定義
// ============================================================

/** GA4 で発火するカスタムイベント名の列挙 */
export type GA4EventName =
  // 診断系
  | 'diagnosis_start'
  | 'diagnosis_complete'
  | 'result_view'
  // マネタイズ系
  | 'pass_cta_click'
  | 'pro_cta_click'
  | 'ai_prompt_generate'
  // バイラル系
  | 'invite_create'
  | 'invite_accept'
  | 'share_click'
  // エンゲージメント系
  | 'integrated_profile_view'
  | 'diagnosis_count_milestone';

/** 各イベントのパラメータ型（diagnosis_id / type のみ・個人情報NG） */
export type GA4EventParams = {
  diagnosis_start: {
    /** 診断ID（例: 'mbti', 'multi-int', 'blood-type'）*/
    diagnosis_id: string;
  };
  diagnosis_complete: {
    diagnosis_id: string;
    /** 結果タイプ（例: 'INTJ', 'linguistic', 'A'）*/
    result_type: string;
  };
  result_view: {
    diagnosis_id: string;
    /** 結果タイプ */
    result_type: string;
  };
  pass_cta_click: {
    /** どのページ（scene）の PASS CTAか（例: 'work', 'love'）*/
    scene?: string;
    /** 診断ID */
    diagnosis_id?: string;
  };
  pro_cta_click: {
    /** CTA の表示位置（例: 'compact', 'full', 'timecapsule'）*/
    location?: string;
  };
  ai_prompt_generate: {
    diagnosis_id?: string;
    /** プロンプトカードの種類 */
    card_type?: string;
  };
  invite_create: {
    /** 招待モード（例: 'secret', 'invite', 'one_way', 'full_share'）*/
    mode: string;
    diagnosis_id?: string;
  };
  invite_accept: {
    diagnosis_id?: string;
  };
  share_click: {
    /** シェア先プラットフォーム */
    platform: 'x' | 'line' | 'threads' | 'copy' | 'other';
    diagnosis_id?: string;
    result_type?: string;
  };
  integrated_profile_view: {
    /** 何診断完了時点で見たか */
    diagnosis_count?: number;
  };
  diagnosis_count_milestone: {
    /** マイルストーン（3 or 8）*/
    milestone: 3 | 8;
  };
};

// ============================================================
// コアラッパー関数
// ============================================================

/**
 * GA4 カスタムイベントを発火する
 *
 * @param eventName - イベント名（GA4EventName 型で型チェック）
 * @param params - イベントパラメータ（個人情報を含めないこと）
 *
 * @example
 * trackEvent('diagnosis_start', { diagnosis_id: 'mbti' });
 * trackEvent('share_click', { platform: 'x', diagnosis_id: 'mbti' });
 */
export function trackEvent<T extends GA4EventName>(
  eventName: T,
  params: GA4EventParams[T]
): void {
  try {
    // window.gtag が存在しない場合（開発環境・SSR・gtag ブロック時）は no-op
    if (typeof window === 'undefined') return;

    const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtagFn !== 'function') return;

    gtagFn('event', eventName, params);

    // 開発時のみコンソールログ（本番では vite が tree-shake）
    if (import.meta.env.DEV) {
      console.debug('[Analytics]', eventName, params);
    }
  } catch {
    // 計測失敗はサイレントに無視（UX に影響させない）
  }
}

// ============================================================
// 便利ヘルパー（よく使うイベントのショートハンド）
// ============================================================

/** 診断開始イベント */
export const trackDiagnosisStart = (diagnosisId: string) =>
  trackEvent('diagnosis_start', { diagnosis_id: diagnosisId });

/** 診断完了イベント */
export const trackDiagnosisComplete = (diagnosisId: string, resultType: string) =>
  trackEvent('diagnosis_complete', { diagnosis_id: diagnosisId, result_type: resultType });

/** 結果ページ表示イベント */
export const trackResultView = (diagnosisId: string, resultType: string) =>
  trackEvent('result_view', { diagnosis_id: diagnosisId, result_type: resultType });

/** PASS CTA クリックイベント */
export const trackPassCtaClick = (diagnosisId?: string, scene?: string) =>
  trackEvent('pass_cta_click', { diagnosis_id: diagnosisId, scene });

/** PRO CTA クリックイベント */
export const trackProCtaClick = (location?: string) =>
  trackEvent('pro_cta_click', { location });

/** AIプロンプトカード生成イベント */
export const trackAiPromptGenerate = (cardType?: string, diagnosisId?: string) =>
  trackEvent('ai_prompt_generate', { card_type: cardType, diagnosis_id: diagnosisId });

/** 招待コード生成イベント */
export const trackInviteCreate = (mode: string, diagnosisId?: string) =>
  trackEvent('invite_create', { mode, diagnosis_id: diagnosisId });

/** 招待受諾イベント */
export const trackInviteAccept = (diagnosisId?: string) =>
  trackEvent('invite_accept', { diagnosis_id: diagnosisId });

/** シェアクリックイベント */
export const trackShareClick = (
  platform: 'x' | 'line' | 'threads' | 'copy' | 'other',
  diagnosisId?: string,
  resultType?: string
) => trackEvent('share_click', { platform, diagnosis_id: diagnosisId, result_type: resultType });

/** 統合プロファイル閲覧イベント */
export const trackIntegratedProfileView = (diagnosisCount?: number) =>
  trackEvent('integrated_profile_view', { diagnosis_count: diagnosisCount });

/** 診断数マイルストーンイベント */
export const trackDiagnosisCountMilestone = (milestone: 3 | 8) =>
  trackEvent('diagnosis_count_milestone', { milestone });
