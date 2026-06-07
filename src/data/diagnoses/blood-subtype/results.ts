/**
 * 血液型サブタイプ診断 スコア計算ロジック
 *
 * 計算方式:
 * 1. ユーザーが選択した血液型（A/B/O/AB）でサブタイプ3候補を絞り込む
 * 2. 10問の回答から E・A・N・C の4軸スコアを算出
 *    - 各軸: 質問数×5を最大として正規化（0-100）
 *    - 情緒安定スコア = 100 - N（Nは低いほど情緒安定）
 * 3. 血液型ごとの判定ロジックで3サブタイプのうち最高スコアを決定
 *    - A型: E スコア × 0.6 + 情緒安定スコア × 0.4
 *      典型A: E中低・情緒中 / 行動A: E高 / 内省A: E低・N高
 *    - B型: E スコア × 0.5 + A スコア × 0.5
 *      典型B: E中高・A低 / 協調B: E高・A高 / 集中B: E低・A低
 *    - O型: E スコア × 0.5 + A スコア × 0.5
 *      典型O: E高・A中 / 温和O: A高 / 探究O: E中・A中（C高）
 *    - AB型: 情緒安定スコア × 0.5 + C スコア × 0.5
 *      典型AB: 中間 / 共感AB: N高（情緒揺れ大） / 分析AB: N低（情緒安定）・C高
 *
 * LocalStorage:
 * - キー: sn_scores_bloodSubtype
 * - 7日キャッシュ（期限切れで自動削除）
 *
 * 注意:
 * - 血液型と性格の科学的相関は限定的（日本心理学会2014年公式見解）
 * - この診断は傾向把握のための参考ツールです
 * - 採用・評価・選考への使用を推奨しません
 *
 * 確認日: 2026-06-07
 */

import type { Answer } from '@/types/diagnosis';
import type { BloodSubtypeId, BloodType } from './meta';
import { questions } from './questions';
import type { Big5Axis } from './questions';

/** 4軸の正規化スコア（0-100） */
export interface AxisScores {
  E: number;
  A: number;
  N: number;
  C: number;
}

export interface BloodSubtypeResult {
  /** 選択された血液型 */
  bloodType: BloodType;
  /** 判定されたサブタイプID */
  subtypeId: BloodSubtypeId;
  /** 4軸スコア（0-100） */
  axisScores: AxisScores;
  /** 情緒安定スコア（100-N・ユーザー向け非表示） */
  emotionalStability: number;
}

const AXES: Big5Axis[] = ['E', 'A', 'N', 'C'];

/**
 * 10問の回答から4軸スコアを計算する
 */
function calculateAxisScores(answers: Answer[]): AxisScores {
  const rawScores: Record<string, number> = { E: 0, A: 0, N: 0, C: 0 };
  const counts: Record<string, number> = { E: 0, A: 0, N: 0, C: 0 };

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    rawScores[question.axis] = (rawScores[question.axis] ?? 0) + answer.value;
    counts[question.axis] = (counts[question.axis] ?? 0) + 1;
  }

  const normalized: AxisScores = { E: 50, A: 50, N: 50, C: 50 };
  for (const axis of AXES) {
    const count = counts[axis] ?? 0;
    if (count === 0) continue;
    const maxScore = count * 5;
    const minScore = count * 1;
    normalized[axis] = Math.round(((rawScores[axis] - minScore) / (maxScore - minScore)) * 100);
  }

  return normalized;
}

/**
 * 血液型ごとのサブタイプ判定ロジック
 */
function determineSubtype(bloodType: BloodType, scores: AxisScores): BloodSubtypeId {
  const stability = 100 - scores.N; // 情緒安定スコア

  switch (bloodType) {
    case 'A': {
      // A型: E(外向)と情緒安定の2軸で3タイプを分離
      // 内省A: E低 かつ N高（情緒揺れが大きい）
      // 行動A: E高（外向傾向が強い）
      // 典型A: その中間
      if (scores.E < 45 && scores.N >= 55) return 'A-inner';
      if (scores.E >= 58) return 'A-active';
      return 'A-typical';
    }
    case 'B': {
      // B型: EとAの2軸で3タイプを分離
      // 集中B: E低 かつ A低（内向・自律）
      // 協調B: E高 かつ A高（社交的）
      // 典型B: E中高・A低〜中（自由マイペース）
      if (scores.E < 45 && scores.A < 50) return 'B-focused';
      if (scores.E >= 62 && scores.A >= 55) return 'B-social';
      return 'B-typical';
    }
    case 'O': {
      // O型: EとAの2軸（C高で探究Oを捕捉）
      // 温和O: A高（協調・サポート志向）
      // 探究O: E中＋C高（独立・知的）
      // 典型O: E高・おおらか
      if (scores.A >= 68) return 'O-gentle';
      if (scores.E < 60 && scores.C >= 60) return 'O-explorer';
      return 'O-typical';
    }
    case 'AB': {
      // AB型: 情緒安定スコアとCで3タイプを分離
      // 共感AB: N高（情緒揺れ大・感受性高い）
      // 分析AB: N低（安定）かつ C高（論理的）
      // 典型AB: 中間
      if (scores.N >= 62) return 'AB-empathy';
      if (stability >= 62 && scores.C >= 65) return 'AB-analyst';
      return 'AB-typical';
    }
    default:
      return 'A-typical';
  }
}

/**
 * 血液型とアンケート回答からサブタイプを判定する
 *
 * @param bloodType ユーザーが選択した血液型
 * @param answers 10問の回答
 */
export function calculateResult(bloodType: BloodType, answers: Answer[]): BloodSubtypeResult {
  const axisScores = calculateAxisScores(answers);
  const subtypeId = determineSubtype(bloodType, axisScores);

  return {
    bloodType,
    subtypeId,
    axisScores,
    emotionalStability: 100 - axisScores.N,
  };
}

/**
 * DiagnosisFlow に渡す calculateResultTypeId 用ラッパー
 * diagnosisId に血液型を埋め込む方式を使う
 * （血液型選択は別UIで実施 → この関数呼び出し前にbloodTypeを確定させること）
 *
 * @param answers 回答データ。answers[0].questionId === 'bloodType' を血液型として使う
 */
export function calculateResultTypeId(answers: Answer[]): string {
  // 血液型は最初の "special" 回答から取得
  const bloodTypeAnswer = answers.find((a) => a.questionId === 'bloodType');
  const bloodType = (bloodTypeAnswer?.value as unknown as BloodType) ?? 'A';
  const realAnswers = answers.filter((a) => a.questionId !== 'bloodType');
  const result = calculateResult(bloodType, realAnswers);
  return result.subtypeId;
}

/**
 * LocalStorage保存キー
 */
const STORAGE_KEY = 'sn_scores_bloodSubtype';

/**
 * 計算結果をLocalStorageに保存（7日キャッシュ）
 * 8診断統合の「bloodSubtype」キーで保存
 */
export function saveResultToStorage(result: BloodSubtypeResult): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...result,
        savedAt: new Date().toISOString(),
      })
    );
    // 血液型本体も保存（統合プロファイル用）
    localStorage.setItem('sn_blood_type', JSON.stringify({ type: result.bloodType }));
  } catch {
    // localStorage が使えない環境は無視
  }
}

/**
 * LocalStorageから計算結果を読み込む（7日以上経過で自動削除）
 */
export function loadResultFromStorage(): BloodSubtypeResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const savedAt = new Date(data.savedAt).getTime();
    if (Date.now() - savedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data as BloodSubtypeResult;
  } catch {
    return null;
  }
}
