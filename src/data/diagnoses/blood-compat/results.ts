/**
 * 血液型相性診断 相性データ取得ロジック
 *
 * 学術根拠:
 * - 能見正比古 (1971) 『血液型でわかる相性』青春出版社
 *   https://www.seishun.co.jp/
 * - 古川竹二 (1927) 「血液型による気質の研究」心理学研究
 *   https://www.jstage.jst.go.jp/browse/psycholres
 *
 * 注意:
 * - 「相性が悪い」表現禁止 → 「学び合いペア」「成長機会の多いペア」等に言い換え
 * - 心理的決定論禁止（「このタイプはこの相手以外と幸せになれない」等）
 * - YMYL回避: 医学的診断・臨床判断は行わない
 *
 * 確認日: 2026-05-20
 */

import type { BloodType } from './meta';
import { BLOOD_TYPES } from './meta';
import { compatibilityMatrix, formatPairKey } from './compatibility';
import type { CompatibilityData, CompatibilityCategory } from './compatibility';
export type { CompatibilityData, CompatibilityCategory };
export { formatPairKey };

/**
 * 2タイプ間の相性データを取得する
 *
 * @param type1 - タイプ1
 * @param type2 - タイプ2
 * @returns CompatibilityData
 */
export function getCompatibility(type1: BloodType, type2: BloodType): CompatibilityData {
  const key = formatPairKey(type1, type2);
  const data = compatibilityMatrix[key];
  if (!data) {
    throw new Error(`相性データが見つかりません: ${key}`);
  }
  return data;
}

/**
 * 指定タイプとの全3ペアの相性データを取得する（自分以外）
 *
 * @param type - 基準タイプ
 * @returns CompatibilityData[] (3件・自分自身を除く)
 */
export function getAllPairsForType(type: BloodType): CompatibilityData[] {
  return BLOOD_TYPES.filter((t) => t !== type).map((t) => getCompatibility(type, t));
}

/**
 * 指定タイプとの全4ペアの相性データを取得する（自分自身を含む）
 *
 * @param type - 基準タイプ
 * @returns CompatibilityData[] (4件)
 */
export function getAllPairsForTypeIncludingSelf(type: BloodType): CompatibilityData[] {
  return BLOOD_TYPES.map((t) => getCompatibility(type, t));
}

/**
 * 指定タイプのベストマッチを取得する
 *
 * @param type - 基準タイプ
 * @param n - 取得件数（デフォルト: 3）
 * @returns スコア上位 n 件の CompatibilityData[]
 */
export function getBestMatches(type: BloodType, n: number = 3): CompatibilityData[] {
  return getAllPairsForTypeIncludingSelf(type)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/**
 * 指定タイプの最も成長機会が多いペアを取得する
 * （「相性が悪い」という表現は使わず「成長機会」として提示）
 *
 * @param type - 基準タイプ
 * @param n - 取得件数（デフォルト: 3）
 * @returns スコア下位 n 件の CompatibilityData[]
 */
export function getGrowthMatches(type: BloodType, n: number = 3): CompatibilityData[] {
  return getAllPairsForTypeIncludingSelf(type)
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
}

/**
 * スコアからカテゴリラベル（日本語）を取得する
 */
export function getCategoryLabel(category: CompatibilityCategory): string {
  const labels: Record<CompatibilityCategory, string> = {
    soulmate: '深く理解し合えるペア',
    good: '相性の良いペア',
    neutral: 'バランス型ペア',
    growth: '学び合いペア',
    challenge: '最大の成長機会ペア',
  };
  return labels[category];
}

/**
 * スコアからカテゴリの説明（短文）を取得する
 */
export function getCategoryDescription(category: CompatibilityCategory): string {
  const descriptions: Record<CompatibilityCategory, string> = {
    soulmate:
      '価値観と行動スタイルが近く、深い理解と信頼が育ちやすいペア。能見正比古（1971）の相性論で高評価の組み合わせ。',
    good:
      '異なる強みが自然に補い合い、良好な協力関係が生まれやすいペア。',
    neutral:
      '意識的な対話で相互理解が深まるペア。異なるスタイルを通じて互いを補完できる組み合わせ。',
    growth:
      'アプローチの違いが多い分、学び合いの機会も豊富なペア。違いの中に成長のヒントがある。',
    challenge:
      '最も異なるスタイルを持つペア。継続的な理解の努力で、最大の成長機会が生まれる。',
  };
  return descriptions[category];
}

/**
 * カテゴリ別の色コードを取得する（UI表示用）
 */
export function getCategoryColor(category: CompatibilityCategory): string {
  const colors: Record<CompatibilityCategory, string> = {
    soulmate: '#8B5CF6',   // purple-500
    good: '#10B981',       // emerald-500
    neutral: '#3B82F6',    // blue-500
    growth: '#F59E0B',     // amber-500
    challenge: '#EF4444',  // red-500
  };
  return colors[category];
}

/**
 * 全タイプのベストマッチランキングを生成する
 * 相性表・一覧ページの生成に使用
 *
 * @returns Record<BloodType, CompatibilityData[]> - 各タイプのベスト3ペア
 */
export function generateBestMatchRanking(): Record<BloodType, CompatibilityData[]> {
  const ranking = {} as Record<BloodType, CompatibilityData[]>;
  for (const type of BLOOD_TYPES) {
    ranking[type] = getBestMatches(type, 3);
  }
  return ranking;
}

/**
 * スコアを百分率テキストに整形する
 */
export function formatScore(score: number): string {
  return `${score}点`;
}

/**
 * 全組み合わせ数の確認（開発・テスト用）
 */
export function getTotalCombinationCount(): number {
  return Object.keys(compatibilityMatrix).length;
}
