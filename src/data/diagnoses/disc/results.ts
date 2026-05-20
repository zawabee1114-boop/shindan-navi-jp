/**
 * DiSC診断 スコア計算ロジック
 *
 * 計算方式:
 * - 各タイプ 7問 × 5段階リッカートスケール（1-5）
 * - 生スコア = 7問の合計（最小7 / 最大35）
 * - 正規化スコア = (生スコア - 7) / 28 × 100（0-100）
 * - primaryType = 最高スコアのタイプ
 * - allScores = 4タイプの正規化スコア
 * - Big5換算 = primaryType の big5 フィールドを使用
 *
 * LocalStorage:
 * - キー: sn_scores_disc
 * - 7日キャッシュ（期限切れで自動削除）
 *
 * 注意:
 * - この診断は学術的な臨床評価ではなく、傾向把握のための参考ツールです
 * - 採用・評価・選考への使用を推奨しません
 * - Wiley社の公式DiSC®アセスメントとは別の自己理解ツールです
 *
 * 確認日: 2026-05-20
 */

import type { Answer } from '@/types/diagnosis';
import type { DiscType } from './questions';
import { questions } from './questions';
import { types } from './types';

/** 4タイプの正規化スコア */
export type DiscScores = Record<DiscType, number>;

export interface DiscResult {
  /** 最高スコアのタイプ（結果ページのタイプID） */
  primaryType: DiscType;
  /** 4タイプの正規化スコア（0-100） */
  allScores: DiscScores;
  /** Big5換算スコア（primaryType の big5 を使用・ユーザー向け非表示） */
  big5: { O: number; C: number; E: number; A: number; N: number };
}

const DISC_TYPES: DiscType[] = ['D', 'i', 'S', 'C'];

/**
 * 28問の回答から4タイプスコアを計算する
 * DiagnosisFlow から呼ばれる calculateResult の完全版
 */
export function calculateResult(answers: Answer[]): DiscResult {
  // 1. 各タイプの生スコアを集計
  const rawScores: Record<string, number> = {};
  for (const t of DISC_TYPES) {
    rawScores[t] = 0;
  }

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    rawScores[question.type] = (rawScores[question.type] ?? 0) + answer.value;
  }

  // 2. 正規化（0-100スケールへ変換）
  // 7問 × 最小1 = 7、7問 × 最大5 = 35 → (raw - 7) / 28 × 100
  const allScores: DiscScores = {} as DiscScores;
  for (const t of DISC_TYPES) {
    const raw = rawScores[t] ?? 7;
    allScores[t] = Math.round(((raw - 7) / 28) * 100);
  }

  // 3. 最高スコアタイプを決定
  const primaryType = DISC_TYPES.reduce((best, t) =>
    allScores[t] > allScores[best] ? t : best
  );

  // 4. Big5換算（primaryType の big5 を使用）
  const big5 = types[primaryType].big5;

  return {
    primaryType,
    allScores,
    big5: { O: big5.O, C: big5.C, E: big5.E, A: big5.A, N: big5.N },
  };
}

/**
 * DiagnosisFlow に渡す calculateResultTypeId ラッパー
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
 * 4タイプの日本語ラベル
 */
export const TYPE_LABELS: Record<DiscType, string> = {
  D: '主導型',
  i: '感化型',
  S: '安定型',
  C: '慎重型',
};

/**
 * LocalStorage保存キー
 */
const STORAGE_KEY = 'sn_scores_disc';

/**
 * 計算結果をLocalStorageに保存（7日キャッシュ）
 */
export function saveResultToStorage(result: DiscResult): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
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
 * LocalStorageから計算結果を読み込む（7日以上経過で自動削除）
 */
export function loadResultFromStorage(): DiscResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // 7日以上経過したデータは破棄
    const savedAt = new Date(data.savedAt).getTime();
    if (Date.now() - savedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data as DiscResult;
  } catch {
    return null;
  }
}
