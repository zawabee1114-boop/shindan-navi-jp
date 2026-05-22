/**
 * 月1限定診断 レジストリ
 *
 * PRO最上位特典。毎月1日に新しい限定診断が公開される。
 * PRO会員（¥590/月）のみフルアクセス。
 * 無料/PASS会員は今月のテーマプレビューのみ表示。
 *
 * 配信ロジック:
 * - 現在月（JST基準）から getCurrentLimited() で今月の診断を取得
 * - publishedAt <= 今日 の診断のみ公開
 *
 * 確認日: 2026-05-22
 */

export interface LimitedDiagnosisEntry {
  /** ユニーク識別子（例: limited-2026-06）*/
  slug: string;
  /** 公開年 */
  year: number;
  /** 公開月（1-12）*/
  month: number;
  /** 診断タイトル */
  title: string;
  /** 月のテーマ（プレビュー表示用・無料/PASSにも見せる）*/
  theme: string;
  /** テーマの一言説明（プレビュー用）*/
  themeDescription: string;
  /** 公開日（YYYY-MM-DD）*/
  publishedAt: string;
  /** 問題数 */
  questionCount: number;
  /** 所要時間（分）*/
  estimatedMinutes: number;
  /** タイプ数 */
  resultTypeCount: number;
  /** 学術根拠の一言 */
  scientificBasisShort: string;
}

/**
 * 全限定診断の一覧
 * 新しい月の診断を追加する際はここに追加する
 */
export const limitedDiagnosesRegistry: LimitedDiagnosisEntry[] = [
  {
    slug: 'limited-2026-06',
    year: 2026,
    month: 6,
    title: 'ストレス対処タイプ診断【6月限定 · PRO限定】',
    theme: 'ストレス対処タイプ',
    themeDescription:
      '梅雨・初夏のストレスをどう乗り越えるか。あなたのコーピング傾向を科学的に分析します。',
    publishedAt: '2026-06-01',
    questionCount: 20,
    estimatedMinutes: 3,
    resultTypeCount: 4,
    scientificBasisShort:
      'Lazarus & Folkman (1984) + Carver et al. (1997) Brief COPE理論',
  },
];

/**
 * JST基準で今月の限定診断を返す
 * 公開日（publishedAt）が今日以前のものだけを対象にする
 */
export function getCurrentLimited(): LimitedDiagnosisEntry | null {
  const now = new Date();
  // UTC+9 に補正
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffset);
  const currentYear = jstNow.getUTCFullYear();
  const currentMonth = jstNow.getUTCMonth() + 1;
  const todayStr = jstNow.toISOString().slice(0, 10);

  return (
    limitedDiagnosesRegistry.find(
      (entry) =>
        entry.year === currentYear &&
        entry.month === currentMonth &&
        entry.publishedAt <= todayStr
    ) ?? null
  );
}

/**
 * 過去の限定診断一覧を返す（現在月を除く・公開済みのみ）
 * 新しい順に並べる
 */
export function getPastLimited(): LimitedDiagnosisEntry[] {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffset);
  const currentYear = jstNow.getUTCFullYear();
  const currentMonth = jstNow.getUTCMonth() + 1;
  const todayStr = jstNow.toISOString().slice(0, 10);

  return limitedDiagnosesRegistry
    .filter(
      (entry) =>
        entry.publishedAt <= todayStr &&
        !(entry.year === currentYear && entry.month === currentMonth)
    )
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
}

/**
 * スラッグから限定診断を取得する
 */
export function getLimitedBySlug(slug: string): LimitedDiagnosisEntry | null {
  return limitedDiagnosesRegistry.find((entry) => entry.slug === slug) ?? null;
}

/**
 * 公開済みの全限定診断を返す（新しい順）
 */
export function getAllPublishedLimited(): LimitedDiagnosisEntry[] {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffset);
  const todayStr = jstNow.toISOString().slice(0, 10);

  return limitedDiagnosesRegistry
    .filter((entry) => entry.publishedAt <= todayStr)
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
}

/** 月ラベル（日本語）*/
export function getMonthLabel(year: number, month: number): string {
  return `${year}年${month}月`;
}
