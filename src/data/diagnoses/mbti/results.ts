/**
 * MBTI主診断 スコア計算ロジック
 *
 * 計算方式:
 * - 各軸 10問 × 5段階リッカートスケール（1-5）
 * - direction='first' の回答 → そのまま集計（高スコア = E/S/T/J 寄り）
 * - direction='second' の回答 → 反転（6-value）して集計（高スコア = I/N/F/P 寄り）
 * - 軸スコア = first方向の合計 / (10問 × 5) = 0.0-1.0
 * - firstScore > 0.5 なら第1極（E/S/T/J）、≤ 0.5 なら第2極（I/N/F/P）
 * - 軸の「強さ%」= |firstScore - 0.5| / 0.5 × 100（0-100%）
 *
 * タイプID: 4文字の組み合わせ（例: 'INTJ'）
 *
 * LocalStorage:
 * - キー: sn_scores_mbti
 * - 7日キャッシュ（期限切れで自動削除）
 *
 * 注意:
 * - この診断は学術的な臨床評価ではなく、傾向把握のための参考ツールです
 * - 精神疾患・メンタルヘルス疾患等の医学的診断は絶対に行いません
 *
 * 確認日: 2026-05-22
 */

import type { Answer } from '@/types/diagnosis';
import type { MBTIAxis } from './questions';
import { questions } from './questions';
import type { MBTITypeId } from './meta';

export interface MBTIAxisScore {
  /** 第1極スコア比率（0.0-1.0）。0.5超でE/S/T/J、以下でI/N/F/P */
  firstRatio: number;
  /** 第1極か（true=E/S/T/J / false=I/N/F/P） */
  isFirst: boolean;
  /** 傾きの強さ%（0-100。50%以上で「傾向が強い」） */
  strengthPct: number;
}

export interface MBTIResult {
  /** 4文字タイプID（例: 'INTJ'） */
  typeId: MBTITypeId;
  /** 各軸のスコア詳細 */
  axisScores: Record<MBTIAxis, MBTIAxisScore>;
  /** E比率（0-100%表示用） */
  ePct: number;
  /** S比率（0-100%表示用） */
  sPct: number;
  /** T比率（0-100%表示用） */
  tPct: number;
  /** J比率（0-100%表示用） */
  jPct: number;
}

const AXES: MBTIAxis[] = ['EI', 'SN', 'TF', 'JP'];

/**
 * 40問の回答から各軸スコアを計算しタイプIDを決定する
 */
export function calculateResult(answers: Answer[]): MBTIResult {
  // 軸ごとに first方向スコア合計を集計
  const firstSums: Record<MBTIAxis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const counts: Record<MBTIAxis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const answer of answers) {
    const qId = Number(answer.questionId);
    const question = questions.find((q) => q.id === qId);
    if (!question) continue;

    const val = answer.value; // 1-5
    // direction='first' → そのまま加算
    // direction='second' → 反転（6-val）して加算（secondが高いほど第2極寄り）
    const normalizedVal = question.direction === 'first' ? val : 6 - val;
    firstSums[question.axis] += normalizedVal;
    counts[question.axis]++;
  }

  // 各軸スコアを算出
  const axisScores: Record<MBTIAxis, MBTIAxisScore> = {} as Record<MBTIAxis, MBTIAxisScore>;
  const typeChars: string[] = [];

  for (const axis of AXES) {
    const n = counts[axis] || 10;
    const maxSum = n * 5;
    const firstRatio = firstSums[axis] / maxSum; // 0.0-1.0
    const isFirst = firstRatio > 0.5;
    const strengthPct = Math.round(Math.abs(firstRatio - 0.5) / 0.5 * 100);

    axisScores[axis] = { firstRatio, isFirst, strengthPct };

    // タイプ文字を組み立て
    switch (axis) {
      case 'EI': typeChars.push(isFirst ? 'E' : 'I'); break;
      case 'SN': typeChars.push(isFirst ? 'S' : 'N'); break;
      case 'TF': typeChars.push(isFirst ? 'T' : 'F'); break;
      case 'JP': typeChars.push(isFirst ? 'J' : 'P'); break;
    }
  }

  const typeId = typeChars.join('') as MBTITypeId;

  return {
    typeId,
    axisScores,
    ePct: Math.round(axisScores.EI.firstRatio * 100),
    sPct: Math.round(axisScores.SN.firstRatio * 100),
    tPct: Math.round(axisScores.TF.firstRatio * 100),
    jPct: Math.round(axisScores.JP.firstRatio * 100),
  };
}

/**
 * DiagnosisFlow に渡す calculateResult ラッパー
 * 戻り値が string（typeId）のみのシンプルな版
 */
export function calculateResultTypeId(answers: Answer[]): string {
  return calculateResult(answers).typeId;
}

/**
 * 軸スコアの%表示用フォーマット
 * 例: EI軸でE=65% → 'E 65% / I 35%'
 */
export function formatAxisScore(axis: MBTIAxis, score: MBTIAxisScore): string {
  const pct1 = Math.round(score.firstRatio * 100);
  const pct2 = 100 - pct1;
  switch (axis) {
    case 'EI': return `E ${pct1}% / I ${pct2}%`;
    case 'SN': return `S ${pct1}% / N ${pct2}%`;
    case 'TF': return `T ${pct1}% / F ${pct2}%`;
    case 'JP': return `J ${pct1}% / P ${pct2}%`;
  }
}

/**
 * 計算結果をLocalStorageに保存（7日キャッシュ）
 */
export function saveResultToStorage(result: MBTIResult): void {
  try {
    localStorage.setItem(
      'sn_scores_mbti',
      JSON.stringify({
        ...result,
        savedAt: new Date().toISOString(),
      })
    );
  } catch {
    // localStorage が使えない環境は無視
  }
}

/**
 * LocalStorageから計算結果を読み込む（7日以上経過で破棄）
 */
export function loadResultFromStorage(): MBTIResult | null {
  try {
    const raw = localStorage.getItem('sn_scores_mbti');
    if (!raw) return null;
    const data = JSON.parse(raw);
    const savedAt = new Date(data.savedAt).getTime();
    if (Date.now() - savedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('sn_scores_mbti');
      return null;
    }
    return data as MBTIResult;
  } catch {
    return null;
  }
}
