/**
 * 統合プロファイル型定義
 *
 * 重要ルール:
 * - Big5/OCEAN/ビッグファイブ はバックエンド計算専用。ユーザー向け表示禁止
 * - ユーザー表示語: 「特性」「傾向」「総合プロファイル」「あなたの強み」
 * - 5シーン軸固定: 仕事 / 恋愛 / 友人 / 家族 / 学校
 * - 家族軸 = 性格相性のみ（育児ストレス・介護はYMYL回避）
 * - LocalStorage のみ保存（サーバー送信なし）
 */

/** バックエンド専用 Big5スコア（ユーザー向け非表示） */
export interface Big5Scores {
  /** 開放性 0-100 */
  O: number;
  /** 誠実性 0-100 */
  C: number;
  /** 外向性 0-100 */
  E: number;
  /** 協調性 0-100 */
  A: number;
  /** 神経症傾向 0-100 */
  N: number;
}

/** 5シーン軸スコア（ユーザー向け「特性スコア」として表示） */
export interface SceneScore {
  /** 0-100 スコア */
  score: number;
  /** 強み（最大3つ） */
  topStrengths: string[];
  /** 注意点（最大2つ） */
  cautions: string[];
  /** このシーンを特徴付けるラベル */
  label: string;
}

/** 5シーン軸 */
export interface SceneScores {
  work: SceneScore;
  love: SceneScore;
  friend: SceneScore;
  family: SceneScore;
  school: SceneScore;
}

/** 診断1件の保存済み結果 */
export interface DiagnosisResultEntry {
  /** タイプID（診断結果の識別子） */
  typeId: string;
  /** 保存日時 ISO 8601 */
  savedAt: string;
  /** Big5スコア（診断タイプから取得） */
  big5: Big5Scores;
}

/** 統合プロファイル全体 */
export interface IntegratedProfile {
  /** 受診済み診断IDリスト */
  completedDiagnoses: string[];
  /** 受診数 0-8 */
  completedCount: number;
  /** 完成度 0-100 */
  completionRate: number;
  /** 加重平均 Big5スコア（バックエンド専用） */
  aggregatedBig5: Big5Scores;
  /** 5シーン軸スコア */
  sceneScores: SceneScores;
  /** 最も強い特性キーワード（ユーザー向け） */
  dominantTrait: string;
  /** 診断別の保存結果 */
  diagnosisResults: Record<string, DiagnosisResultEntry | null>;
}

/** 診断の表示情報 */
export interface DiagnosisInfo {
  /** 診断ID */
  id: string;
  /** 診断ラベル */
  label: string;
  /** アイコン */
  icon: string;
  /** 結果ページURL */
  resultPath: string;
  /** 診断ページURL */
  diagnosisPath: string;
  /** テーマカラー */
  color: string;
}

/** サポートする診断一覧 */
export const DIAGNOSIS_LIST: DiagnosisInfo[] = [
  {
    id: 'multi-int',
    label: '多重知能診断',
    icon: '🎓',
    resultPath: '/diagnosis/multi-int/result/',
    diagnosisPath: '/diagnosis/multi-int/',
    color: 'var(--sn-diag-multi-int)',
  },
  {
    id: 'perfectionism',
    label: '完璧主義タイプ診断',
    icon: '⭐',
    resultPath: '/diagnosis/perfectionism/result/',
    diagnosisPath: '/diagnosis/perfectionism/',
    color: 'var(--sn-diag-perfectionism)',
  },
  {
    id: 'disc',
    label: 'DiSC行動スタイル診断',
    icon: '📊',
    resultPath: '/diagnosis/disc/result/',
    diagnosisPath: '/diagnosis/disc/',
    color: 'var(--sn-diag-disc)',
  },
  {
    id: 'love_style',
    label: '恋愛スタイル診断',
    icon: '💕',
    resultPath: '/diagnosis/love/result/',
    diagnosisPath: '/diagnosis/love/',
    color: 'var(--sn-diag-love)',
  },
  {
    id: 'money_style',
    label: '金銭感覚診断',
    icon: '💰',
    resultPath: '/diagnosis/money/result/',
    diagnosisPath: '/diagnosis/money/',
    color: 'var(--sn-diag-money)',
  },
  {
    id: 'friend_compat',
    label: '友達相性タイプ診断',
    icon: '👥',
    resultPath: '/diagnosis/friend/result/',
    diagnosisPath: '/diagnosis/friend/',
    color: 'var(--sn-scene-friend)',
  },
  {
    id: 'zodiac',
    label: '星座性格診断',
    icon: '✨',
    resultPath: '/diagnosis/seiza/result/',
    diagnosisPath: '/diagnosis/seiza/',
    color: 'var(--sn-diag-seiza)',
  },
  {
    id: 'blood_compat',
    label: '血液型性格診断',
    icon: '🩸',
    resultPath: '/diagnosis/blood/result/',
    diagnosisPath: '/diagnosis/blood/',
    color: 'var(--sn-diag-blood)',
  },
];

/** 各診断の加重係数（信頼度ベース） */
export const DIAGNOSIS_WEIGHTS: Record<string, number> = {
  'multi-int': 1.5,
  'perfectionism': 1.0,
  'disc': 1.2,
  'love_style': 1.2,
  'money_style': 1.0,
  'friend_compat': 1.0,
  'zodiac': 0.5,
  'blood_compat': 0.5,
};
