/**
 * 診断フロー共通型定義
 * 全React島コンポーネントで共通利用する
 */

/** 5段階リッカートスケール回答値 */
export type LikertValue = 1 | 2 | 3 | 4 | 5;

/** 1問の回答 */
export interface Answer {
  questionId: string;
  value: LikertValue;
}

/** 診断質問 */
export interface Question {
  id: string;
  text: string;
  /** 反転スコアリングが必要か（Big5Nは反転が多い）*/
  reversed?: boolean;
}

/** 診断フローの Props */
export interface DiagnosisFlowProps {
  /** 診断ID（localStorage キー prefix に使用）*/
  diagnosisId: string;
  /** 質問配列 */
  questions: Question[];
  /** 結果ページURL生成関数 */
  resultPath: (typeId: string) => string;
  /** 回答配列からタイプIDを計算する関数 */
  calculateResult: (answers: Answer[]) => string;
}


/** リッカートスケールのラベル定義 */
export const LIKERT_LABELS: Record<LikertValue, string> = {
  1: '全く当てはまらない',
  2: 'あまり当てはまらない',
  3: 'どちらとも言えない',
  4: 'やや当てはまる',
  5: 'とても当てはまる',
};

/** 相性プライバシーモード */
export type PrivacyMode = 'secret' | 'invite' | 'one-way' | 'open';

/** Big5 スコア（0-100） */
export interface Big5Scores {
  /** 開放性 Openness */
  O: number;
  /** 誠実性 Conscientiousness */
  C: number;
  /** 外向性 Extraversion */
  E: number;
  /** 協調性 Agreeableness */
  A: number;
  /** 神経症傾向 Neuroticism */
  N: number;
}

/** シーン軸 */
export type Scene = 'work' | 'love' | 'friend' | 'family' | 'school';

/** LocalStorage に保存する診断進捗 */
export interface DiagnosisProgress {
  diagnosisId: string;
  answers: Answer[];
  currentIndex: number;
  startedAt: string;
}
