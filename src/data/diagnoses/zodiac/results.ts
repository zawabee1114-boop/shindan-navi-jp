/**
 * 星座性格診断 データ取得ロジック
 *
 * 学術根拠:
 * - プトレマイオス『テトラビブロス』（2世紀）: 12星座日付境界の伝統的分類
 * - Carlson S (1985) Nature 318, 419-425
 *   https://doi.org/10.1038/318419a0
 *
 * 注意:
 * - 「相性が悪い」表現禁止 → 「学び合いペア」「対比から学べるペア」
 * - 心理的決定論禁止（「必ず〜」「絶対〜」NG）
 * - YMYL回避: 医療・精神疾患言及絶対NG
 * - 結婚・就職判断に使えない旨を明示する
 *
 * LocalStorage キャッシュ:
 * - キー: 'zodiac_result_{year}-{month}-{day}'
 * - TTL: 7日間
 *
 * 確認日: 2026-05-21
 */

import { ZODIAC_TYPES } from './meta';
import type { ZodiacType } from './meta';
import { compatibilityMatrix, formatPairKey } from './compatibility';
import type { CompatibilityData, CompatibilityCategory } from './compatibility';
export type { CompatibilityData, CompatibilityCategory };
export { formatPairKey };

// ================================================================
// 誕生日 → 星座 変換
// 各星座の日付境界（プトレマイオス『テトラビブロス』2世紀の分類に準拠）
// ================================================================

const ZODIAC_DATE_RANGES: Array<{
  zodiac: ZodiacType;
  startMonth: number;
  startDay: number;
}> = [
  { zodiac: 'capricorn',   startMonth: 12, startDay: 22 }, // 12/22 - 1/19
  { zodiac: 'aquarius',    startMonth: 1,  startDay: 20 }, // 1/20 - 2/18
  { zodiac: 'pisces',      startMonth: 2,  startDay: 19 }, // 2/19 - 3/20
  { zodiac: 'aries',       startMonth: 3,  startDay: 21 }, // 3/21 - 4/19
  { zodiac: 'taurus',      startMonth: 4,  startDay: 20 }, // 4/20 - 5/20
  { zodiac: 'gemini',      startMonth: 5,  startDay: 21 }, // 5/21 - 6/21
  { zodiac: 'cancer',      startMonth: 6,  startDay: 22 }, // 6/22 - 7/22
  { zodiac: 'leo',         startMonth: 7,  startDay: 23 }, // 7/23 - 8/22
  { zodiac: 'virgo',       startMonth: 8,  startDay: 23 }, // 8/23 - 9/22
  { zodiac: 'libra',       startMonth: 9,  startDay: 23 }, // 9/23 - 10/23
  { zodiac: 'scorpio',     startMonth: 10, startDay: 24 }, // 10/24 - 11/22
  { zodiac: 'sagittarius', startMonth: 11, startDay: 23 }, // 11/23 - 12/21
];

/**
 * 誕生日（月・日）から星座を判定する
 *
 * @param month - 月（1-12）
 * @param day - 日（1-31）
 * @returns ZodiacType
 */
export function getZodiacByBirthdate(month: number, day: number): ZodiacType {
  // capricorn は 12/22〜1/19 にまたがるため特別処理
  if (month === 12 && day >= 22) return 'capricorn';
  if (month === 1 && day <= 19) return 'capricorn';

  // それ以外は当月の開始日以降かどうかで判定
  const currentMonthRange = ZODIAC_DATE_RANGES.find(
    (r) => r.startMonth === month && day >= r.startDay
  );
  if (currentMonthRange) return currentMonthRange.zodiac;

  // 当月の開始日前なら前月の星座
  const prevMonthRange = ZODIAC_DATE_RANGES.find(
    (r) => r.startMonth === (month === 1 ? 12 : month - 1)
  );
  return prevMonthRange ? prevMonthRange.zodiac : 'aries';
}

/**
 * 2星座間の相性データを取得する
 */
export function getCompatibility(z1: ZodiacType, z2: ZodiacType): CompatibilityData {
  const key = formatPairKey(z1, z2);
  const data = compatibilityMatrix[key];
  if (!data) {
    throw new Error(`相性データが見つかりません: ${key}`);
  }
  return data;
}

/**
 * 指定星座との全11ペアの相性データを取得する（自分自身を含む）
 */
export function getAllPairsForZodiac(zodiac: ZodiacType): CompatibilityData[] {
  return ZODIAC_TYPES.map((z) => getCompatibility(zodiac, z));
}

/**
 * 指定星座との全11ペアの相性データを取得する（自分以外）
 */
export function getAllPairsExcludingSelf(zodiac: ZodiacType): CompatibilityData[] {
  return ZODIAC_TYPES.filter((z) => z !== zodiac).map((z) => getCompatibility(zodiac, z));
}

/**
 * 指定星座のベストマッチを取得する
 */
export function getBestMatches(zodiac: ZodiacType, n: number = 3): CompatibilityData[] {
  return getAllPairsExcludingSelf(zodiac)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/**
 * 指定星座の最も対比的なペアを取得する（「成長機会の多いペア」として提示）
 */
export function getChallengeMatches(zodiac: ZodiacType, n: number = 3): CompatibilityData[] {
  return getAllPairsExcludingSelf(zodiac)
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
}

/**
 * スコアからカテゴリラベル（日本語）を取得する
 */
export function getCategoryLabel(category: CompatibilityCategory): string {
  const labels: Record<CompatibilityCategory, string> = {
    soulmate: '深い親和性のあるペア',
    good: '相性の良いペア',
    neutral: 'バランス型ペア',
    tough: '学び合いペア',
    opposite: '対比から最も学べるペア',
  };
  return labels[category];
}

/**
 * カテゴリ別の色コードを取得する
 */
export function getCategoryColor(category: CompatibilityCategory): string {
  const colors: Record<CompatibilityCategory, string> = {
    soulmate: '#8B5CF6',   // purple-500
    good:     '#10B981',   // emerald-500
    neutral:  '#3B82F6',   // blue-500
    tough:    '#F59E0B',   // amber-500
    opposite: '#EF4444',   // red-500
  };
  return colors[category];
}

/**
 * カテゴリ別の短い説明を取得する
 */
export function getCategoryDescription(category: CompatibilityCategory): string {
  const descriptions: Record<CompatibilityCategory, string> = {
    soulmate:
      '伝統的な占星術分類で強い親和性を持つとされるペア。価値観・行動スタイルが近く、自然な理解が生まれやすいとされます。',
    good:
      '伝統的な占星術分類で補完関係にあるとされるペア。互いの強みが自然に補い合いやすい組み合わせとされます。',
    neutral:
      '対話と相互理解で関係が深まるペア。異なるスタイルを通じて互いを豊かにできるとされます。',
    tough:
      'アプローチの違いが多い分、学び合いの機会も豊富なペア。違いの中に成長のヒントがあるとされます。',
    opposite:
      '最も異なるスタイルを持つとされるペア。継続的な理解の努力で、最大の成長機会が生まれるとされます。',
  };
  return descriptions[category];
}

/**
 * 全星座のベストマッチランキングを生成する
 */
export function generateBestMatchRanking(): Record<ZodiacType, CompatibilityData[]> {
  const ranking = {} as Record<ZodiacType, CompatibilityData[]>;
  for (const zodiac of ZODIAC_TYPES) {
    ranking[zodiac] = getBestMatches(zodiac, 3);
  }
  return ranking;
}

/**
 * スコアをテキストに整形する
 */
export function formatScore(score: number): string {
  return `${score}点`;
}

/**
 * LocalStorage 7日キャッシュ（クライアントサイドのみ）
 */
export function cacheResult(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    const item = {
      value,
      expiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(`zodiac_result_${key}`, JSON.stringify(item));
  } catch {
    // localStorage が利用不可の場合は無視
  }
}

export function getCachedResult<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`zodiac_result_${key}`);
    if (!raw) return null;
    const item = JSON.parse(raw) as { value: T; expiry: number };
    if (Date.now() > item.expiry) {
      localStorage.removeItem(`zodiac_result_${key}`);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
}
