/**
 * 友達相性診断 スコア計算ロジック
 *
 * 計算方式:
 * - 4軸（外向性/共感性/主導性/独立性） × 6問 = 24問
 * - 各軸 生スコア = 6問の合計（最小6 / 最大30）
 * - 正規化スコア = (生スコア - 6) / 24 × 100（0-100）
 *
 * タイプ判定ロジック（4軸スコアをもとに判定）:
 * - mood-maker: extraversion + empathy が高く、independence が低い
 * - listener: empathy が突出して高く、extraversion が低い
 * - leader: leadership + extraversion が高い
 * - lone-wolf: independence が突出して高い（60以上 かつ 最高値）
 * - harmonizer: empathy が高く、independence が低く、leadership が低い
 * - analyst: extraversion が低く、empathy が低く、leadership が低い
 *
 * 判定優先順位:
 * 1. independence ≥ 60 かつ (extraversion < 50 または leadership < 50) → lone-wolf
 * 2. extraversion ≥ 65 かつ leadership ≥ 60 → leader
 * 3. extraversion ≥ 65 かつ empathy ≥ 55 → mood-maker
 * 4. empathy ≥ 65 かつ extraversion < 55 かつ independence < 55 → listener
 * 5. empathy ≥ 55 かつ independence < 50 → harmonizer
 * 6. それ以外 → analyst
 *
 * LocalStorage:
 * - キー: sn_scores_friend_compat
 * - 7日キャッシュ（期限切れで自動削除）
 *
 * 注意:
 * - この診断は傾向把握のための参考ツールです
 * - 医学的・臨床的な診断ではありません
 *
 * 確認日: 2026-05-20
 */

import type { Answer } from '@/types/diagnosis';
import type { FriendType, FriendDimension } from './questions';
import { questions } from './questions';
import { types } from './types';

/** 4軸の正規化スコア */
export type FriendDimensionScores = Record<FriendDimension, number>;

export interface FriendResult {
  /** 判定されたタイプ */
  primaryType: FriendType;
  /** 4軸の正規化スコア（0-100） */
  dimensionScores: FriendDimensionScores;
  /** Big5換算スコア（primaryTypeのbig5を使用・ユーザー向け非表示） */
  big5: { O: number; C: number; E: number; A: number; N: number };
}

const FRIEND_DIMENSIONS: FriendDimension[] = [
  'extraversion',
  'empathy',
  'leadership',
  'independence',
];

/**
 * 24問の回答から4軸スコアを計算しタイプを判定する
 */
export function calculateResult(answers: Answer[]): FriendResult {
  // 1. 各軸の生スコアを集計
  const rawScores: Record<FriendDimension, number> = {
    extraversion: 0,
    empathy: 0,
    leadership: 0,
    independence: 0,
  };

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    rawScores[question.dimension] = (rawScores[question.dimension] ?? 0) + answer.value;
  }

  // 2. 正規化（0-100スケールへ変換）
  // 6問 × 最小1 = 6、6問 × 最大5 = 30 → (raw - 6) / 24 × 100
  const dimensionScores: FriendDimensionScores = {} as FriendDimensionScores;
  for (const dim of FRIEND_DIMENSIONS) {
    const raw = rawScores[dim] ?? 6;
    dimensionScores[dim] = Math.round(((raw - 6) / 24) * 100);
  }

  const { extraversion, empathy, leadership, independence } = dimensionScores;

  // 3. タイプ判定ロジック（優先順位順）
  let primaryType: FriendType;

  if (independence >= 60 && (extraversion < 50 || leadership < 50)) {
    // 独立性が高く、外向性か主導性が低い → 一匹狼型
    primaryType = 'lone-wolf';
  } else if (extraversion >= 65 && leadership >= 60) {
    // 外向性・主導性ともに高い → 仕切り屋型
    primaryType = 'leader';
  } else if (extraversion >= 65 && empathy >= 55) {
    // 外向性高・共感性中以上 → ムードメーカー型
    primaryType = 'mood-maker';
  } else if (empathy >= 65 && extraversion < 55 && independence < 55) {
    // 共感性が突出・外向性低・独立性低 → 聴き上手型
    primaryType = 'listener';
  } else if (empathy >= 55 && independence < 50) {
    // 共感性中以上・独立性低 → 同調型
    primaryType = 'harmonizer';
  } else {
    // 上記に当てはまらない → 知性派型
    primaryType = 'analyst';
  }

  // 4. Big5換算（primaryTypeのbig5を使用）
  const big5 = types[primaryType].big5;

  return {
    primaryType,
    dimensionScores,
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
 * 4軸の日本語ラベル
 */
export const DIMENSION_LABELS: Record<FriendDimension, string> = {
  extraversion: '外向性（にぎやかさ）',
  empathy: '共感性（寄り添い力）',
  leadership: '主導性（まとめる力）',
  independence: '独立性（自分のペース）',
};

/**
 * タイプの日本語ラベル
 */
export const TYPE_LABELS: Record<FriendType, string> = {
  'mood-maker': 'ムードメーカー型',
  'listener': '聴き上手型',
  'leader': '仕切り屋型',
  'lone-wolf': '一匹狼型',
  'harmonizer': '同調型',
  'analyst': '知性派型',
};

/**
 * LocalStorage保存キー
 */
const STORAGE_KEY = 'sn_scores_friend_compat';

/**
 * 計算結果をLocalStorageに保存（7日キャッシュ）
 */
export function saveResultToStorage(result: FriendResult): void {
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
export function loadResultFromStorage(): FriendResult | null {
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
    return data as FriendResult;
  } catch {
    return null;
  }
}

/**
 * スコアをパーセンテージ表示用に整形する
 */
export function formatScore(score: number): string {
  return `${score}%`;
}
