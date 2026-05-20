/**
 * MBTI相性一覧 相性データ取得ロジック
 *
 * 学術根拠:
 * - Beebe J (2017) Energies and Patterns in Psychological Type
 *   https://www.routledge.com/Energies-and-Patterns-in-Psychological-Type-The-reservoir-of-consciousness/Beebe/p/book/9781138859760
 * - Keirsey D (1998) Please Understand Me II
 *   https://keirsey.com/product/please-understand-me-ii/
 *
 * 注意:
 * - 「相性が悪い」表現禁止 → 「成長機会の多いペア」等に言い換え
 * - 心理的決定論禁止（「このタイプはこの相手以外と幸せになれない」等）
 * - YMYL回避: 医学的診断・臨床判断は行わない
 *
 * 確認日: 2026-05-20
 */

import type { MBTIType } from './meta';
import { MBTI_TYPES } from './meta';
import { compatibilityMatrix } from './compatibility';
import type { CompatibilityData, CompatibilityCategory } from './compatibility';
export type { CompatibilityData, CompatibilityCategory };

/**
 * ペアキーをアルファベット順に正規化する
 * 'INFP-INTJ' と 'INTJ-INFP' が同じキーになるようにする
 *
 * @param t1 - タイプ1
 * @param t2 - タイプ2
 * @returns 正規化されたキー（例: 'INFP-INTJ'）
 */
export function formatPairKey(t1: MBTIType, t2: MBTIType): string {
  return [t1, t2].sort().join('-');
}

/**
 * 2タイプ間の相性データを取得する
 *
 * @param type1 - タイプ1
 * @param type2 - タイプ2
 * @returns CompatibilityData
 */
export function getCompatibility(type1: MBTIType, type2: MBTIType): CompatibilityData {
  const key = formatPairKey(type1, type2);
  const data = compatibilityMatrix[key];
  if (!data) {
    throw new Error(`相性データが見つかりません: ${key}`);
  }
  return data;
}

/**
 * 指定タイプとの全15ペアの相性データを取得する
 *
 * @param type - 基準タイプ
 * @returns CompatibilityData[] (15件・自分自身を除く)
 */
export function getAllPairsForType(type: MBTIType): CompatibilityData[] {
  return MBTI_TYPES.filter((t) => t !== type).map((t) => getCompatibility(type, t));
}

/**
 * 指定タイプとの全16ペアの相性データを取得する（自分自身を含む）
 *
 * @param type - 基準タイプ
 * @returns CompatibilityData[] (16件)
 */
export function getAllPairsForTypeIncludingSelf(type: MBTIType): CompatibilityData[] {
  return MBTI_TYPES.map((t) => getCompatibility(type, t));
}

/**
 * 指定タイプのベストマッチを取得する
 *
 * @param type - 基準タイプ
 * @param n - 取得件数（デフォルト: 3）
 * @returns スコア上位 n 件の CompatibilityData[]
 */
export function getBestMatches(type: MBTIType, n: number = 3): CompatibilityData[] {
  return getAllPairsForType(type)
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
export function getWorstMatches(type: MBTIType, n: number = 3): CompatibilityData[] {
  return getAllPairsForType(type)
    .sort((a, b) => a.score - b.score)
    .slice(0, n);
}

/**
 * 指定タイプと指定カテゴリの全ペアを取得する
 *
 * @param type - 基準タイプ
 * @param category - 相性カテゴリ
 * @returns 指定カテゴリのペア一覧
 */
export function getPairsByCategory(
  type: MBTIType,
  category: CompatibilityCategory
): CompatibilityData[] {
  return getAllPairsForType(type).filter((d) => d.category === category);
}

/**
 * スコアからカテゴリラベル（日本語）を取得する
 */
export function getCategoryLabel(category: CompatibilityCategory): string {
  const labels: Record<CompatibilityCategory, string> = {
    soulmate: 'ソウルメイト型',
    good: '相性の良いペア',
    neutral: 'バランス型',
    tough: '成長機会の多いペア',
    opposite: '最大の成長機会ペア',
  };
  return labels[category];
}

/**
 * スコアからカテゴリの説明（短文）を取得する
 */
export function getCategoryDescription(category: CompatibilityCategory): string {
  const descriptions: Record<CompatibilityCategory, string> = {
    soulmate: 'Beebe（2017）の機能スタック理論が示す補完的な認知機能のペア。深い相互理解が育ちやすい。',
    good: 'Keirsey（1998）の気質分析で近接する特性を持つペア。自然な親和性と協力関係が生まれやすい。',
    neutral: '意識的な対話で相互理解が深まるペア。異なる強みを活かして互いを補完できる組み合わせ。',
    tough: 'アプローチの違いが多い分、学び合いの機会も豊富なペア。Jung（1921）の個性化プロセスが促進される。',
    opposite: '最も異なる認知スタイルを持つペア。最大の成長機会と、深い理解に向けた継続的な対話が鍵。',
  };
  return descriptions[category];
}

/**
 * カテゴリ別の色コードを取得する（UI表示用）
 */
export function getCategoryColor(category: CompatibilityCategory): string {
  const colors: Record<CompatibilityCategory, string> = {
    soulmate: '#8B5CF6',  // purple-500
    good: '#10B981',      // emerald-500
    neutral: '#3B82F6',   // blue-500
    tough: '#F59E0B',     // amber-500
    opposite: '#EF4444',  // red-500
  };
  return colors[category];
}

/**
 * 全タイプのベストマッチランキングを生成する
 * 相性表・一覧ページの生成に使用
 *
 * @returns Record<MBTIType, CompatibilityData[]> - 各タイプのベスト3ペア
 */
export function generateBestMatchRanking(): Record<MBTIType, CompatibilityData[]> {
  const ranking = {} as Record<MBTIType, CompatibilityData[]>;
  for (const type of MBTI_TYPES) {
    ranking[type] = getBestMatches(type, 3);
  }
  return ranking;
}

/**
 * スコアを百分率テキストに整形する
 */
export function formatScore(score: number): string {
  return `${score}%`;
}

/**
 * 全組み合わせ数の確認（開発・テスト用）
 */
export function getTotalCombinationCount(): number {
  return Object.keys(compatibilityMatrix).length;
}
