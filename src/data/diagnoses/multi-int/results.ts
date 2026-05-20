/**
 * 多重知能テスト スコア計算ロジック
 * 理論: Howard Gardner「Frames of Mind」(1983)
 *
 * 計算方式:
 * - 各知能 8問 × 5段階リッカートスケール（1-5）
 * - 生スコア = 8問の合計（最小8 / 最大40）
 * - 正規化スコア = (生スコア - 8) / 32 × 100（0-100）
 * - primaryType = 最高スコアの知能タイプ
 * - topThree = 上位3タイプ（降順）
 * - Big5換算 = types.tsのbig5フィールドをprimaryTypeから取得
 *
 * 注意:
 * - この診断は学術的な能力測定ではなく、傾向把握のための参考ツールです
 * - 学習障害・発達障害等の医学的診断は絶対に行いません
 */

import type { Answer } from '@/types/diagnosis';
import type { IntelligenceType } from './questions';
import { questions } from './questions';
import { types } from './types';

export type IntelligenceScores = Record<IntelligenceType, number>;

export interface MultiIntResult {
  /** 最高スコアの知能タイプ（結果ページのタイプID） */
  primaryType: IntelligenceType;
  /** 上位3タイプ（降順） */
  topThree: IntelligenceType[];
  /** 8知能の正規化スコア（0-100） */
  scores: IntelligenceScores;
  /** Big5換算スコア（primaryTypeのbig5を使用） */
  big5: { O: number; C: number; E: number; A: number; N: number };
}

const INTELLIGENCE_TYPES: IntelligenceType[] = [
  'linguistic',
  'logical',
  'spatial',
  'kinesthetic',
  'musical',
  'interpersonal',
  'intrapersonal',
  'naturalist',
];

/**
 * 64問の回答から8知能スコアを計算する
 * DiagnosisFlow から呼ばれる calculateResult の完全版
 */
export function calculateResult(answers: Answer[]): MultiIntResult {
  // 1. 各知能の生スコアを集計
  const rawScores: Record<string, number> = {};
  for (const t of INTELLIGENCE_TYPES) {
    rawScores[t] = 0;
  }

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    rawScores[question.intelligence] = (rawScores[question.intelligence] ?? 0) + answer.value;
  }

  // 2. 正規化（0-100スケールへ変換）
  // 8問 × 最小1 = 8、8問 × 最大5 = 40 → (raw - 8) / 32 × 100
  const scores: IntelligenceScores = {} as IntelligenceScores;
  for (const t of INTELLIGENCE_TYPES) {
    const raw = rawScores[t] ?? 8;
    scores[t] = Math.round(((raw - 8) / 32) * 100);
  }

  // 3. 降順でソート
  const sorted = [...INTELLIGENCE_TYPES].sort((a, b) => scores[b] - scores[a]);

  const primaryType = sorted[0];
  const topThree = sorted.slice(0, 3);

  // 4. Big5換算（primaryTypeのbig5を使用）
  const big5 = types[primaryType].big5;

  return {
    primaryType,
    topThree,
    scores,
    big5: { O: big5.O, C: big5.C, E: big5.E, A: big5.A, N: big5.N },
  };
}

/**
 * DiagnosisFlow に渡す calculateResult ラッパー
 * 戻り値がstring（typeId）のみのシンプルな版
 */
export function calculateResultTypeId(answers: Answer[]): string {
  return calculateResult(answers).primaryType;
}

/**
 * スコアをパーセンテージ表示用に整形する
 */
export function formatScore(score: number): string {
  return `${score}%`;
}

/**
 * 全8知能のラベル（日本語）
 */
export const INTELLIGENCE_LABELS: Record<IntelligenceType, string> = {
  linguistic: '言語的知能',
  logical: '論理数学的知能',
  spatial: '視空間的知能',
  kinesthetic: '身体運動的知能',
  musical: '音楽的知能',
  interpersonal: '対人的知能',
  intrapersonal: '内省的知能',
  naturalist: '博物的知能',
};

/**
 * スコアをLocalStorageに保存するキー生成
 */
export function getScoreStorageKey(diagnosisId: string): string {
  return `sn_scores_${diagnosisId}`;
}

/**
 * 計算結果をLocalStorageに保存
 * 結果ページで参照するため
 */
export function saveResultToStorage(result: MultiIntResult): void {
  try {
    localStorage.setItem(
      getScoreStorageKey('multi-int'),
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
 * LocalStorageから計算結果を読み込む
 */
export function loadResultFromStorage(): MultiIntResult | null {
  try {
    const raw = localStorage.getItem(getScoreStorageKey('multi-int'));
    if (!raw) return null;
    const data = JSON.parse(raw);
    // 7日以上経過したデータは破棄
    const savedAt = new Date(data.savedAt).getTime();
    if (Date.now() - savedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(getScoreStorageKey('multi-int'));
      return null;
    }
    return data as MultiIntResult;
  } catch {
    return null;
  }
}
