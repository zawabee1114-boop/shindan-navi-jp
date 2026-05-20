/**
 * 恋愛スタイル診断 スコア計算ロジック
 *
 * 計算方式:
 * - 各タイプ 5問 × 5段階リッカートスケール（1-5）
 * - 生スコア = 5問の合計（最小5 / 最大25）
 * - 正規化スコア = (生スコア - 5) / 20 × 100（0-100）
 * - primaryType = 最高スコアのタイプ
 * - allScores = 6タイプの正規化スコア
 *
 * LocalStorage:
 * - キー: sn_scores_love_style
 * - 7日キャッシュ（期限切れで自動削除）
 *
 * 注意:
 * - この診断は学術的な臨床評価ではなく、傾向把握のための参考ツールです
 * - YMYL回避: 医学的診断・精神科的判断は行わない
 * - J.A.Lee（1973）の恋愛スタイル理論に基づく傾向分類
 *
 * 確認日: 2026-05-21
 */

import type { Answer } from '@/types/diagnosis';
import type { LoveStyleType } from './questions';
import { questions, loveStyleTypes } from './questions';
import { types } from './types';
import { getCompatibility } from './compatibility';

/** 6タイプの正規化スコア */
export type LoveStyleScores = Record<LoveStyleType, number>;

export interface LoveStyleResult {
  /** 最高スコアのタイプ（結果ページのタイプID） */
  primaryType: LoveStyleType;
  /** 6タイプの正規化スコア（0-100） */
  allScores: LoveStyleScores;
  /** Big5換算スコア（primaryType の big5 を使用・ユーザー向け非表示） */
  big5: { O: number; C: number; E: number; A: number; N: number };
}

/**
 * 30問の回答から6タイプスコアを計算する
 */
export function calculateResult(answers: Answer[]): LoveStyleResult {
  // 1. 各タイプの生スコアを集計
  const rawScores: Record<string, number> = {};
  for (const t of loveStyleTypes) {
    rawScores[t] = 0;
  }

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    rawScores[question.type] = (rawScores[question.type] ?? 0) + answer.value;
  }

  // 2. 正規化（0-100スケールへ変換）
  // 5問 × 最小1 = 5、5問 × 最大5 = 25 → (raw - 5) / 20 × 100
  const allScores: LoveStyleScores = {} as LoveStyleScores;
  for (const t of loveStyleTypes) {
    const raw = rawScores[t] ?? 5;
    allScores[t] = Math.round(((raw - 5) / 20) * 100);
  }

  // 3. 最高スコアタイプを決定
  const primaryType = loveStyleTypes.reduce((best, t) =>
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
 * 6タイプの日本語ラベル
 */
export const TYPE_LABELS: Record<LoveStyleType, string> = {
  eros: '情熱型',
  ludus: '遊戯型',
  storge: '友愛型',
  pragma: '実利型',
  mania: '感情型',
  agape: '献身型',
};

/**
 * LocalStorage保存キー
 */
const STORAGE_KEY = 'sn_scores_love_style';

/**
 * 計算結果をLocalStorageに保存（7日キャッシュ）
 */
export function saveResultToStorage(result: LoveStyleResult): void {
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
export function loadResultFromStorage(): LoveStyleResult | null {
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
    return data as LoveStyleResult;
  } catch {
    return null;
  }
}

// getCompatibility を再エクスポート（ページからも使いやすいように）
export { getCompatibility };
