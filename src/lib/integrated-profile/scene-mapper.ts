/**
 * シーンマッパー - 5シーン軸のスコア計算とテンプレート定義
 *
 * Big5スコアを5シーン軸（仕事/恋愛/友人/家族/学校）のスコアに変換する。
 * バックエンド専用計算ロジック（ユーザー向けにBig5を表示しない）
 *
 * スコア式の参考:
 * - Barrick MR, Mount MK (1991) "The Big Five personality dimensions and job performance"
 *   Personnel Psychology 44(1): doi:10.1111/j.1744-6570.1991.tb00688.x
 * - Wooldridge MB (2010) Big Five and interpersonal relationships
 * - Costa & McCrae (1992) NEO-PI-R 各因子の生活領域相関
 */

import type { Big5Scores, SceneScore, SceneScores, DiagnosisResultEntry } from './types';

/** シーン軸の特性ラベルマップ */
const SCENE_LABELS: Record<string, string[]> = {
  work: [
    'リーダーシップ',
    '分析力',
    'チームワーク',
    '実行力',
    '創造性',
    '計画力',
    '自律性',
    '誠実さ',
    '推進力',
    '柔軟性',
  ],
  love: [
    '情熱度',
    'コミットメント',
    'コミュニケーション力',
    '自立性',
    '共感力',
    '誠実さ',
    '安定感',
    '自己開示力',
    '思いやり',
    '冒険心',
  ],
  friend: [
    '社交性',
    '共感力',
    '信頼性',
    '場づくり力',
    '傾聴力',
    '包容力',
    '誠実さ',
    '好奇心',
    'ユニークさ',
    '安心感',
  ],
  family: [
    '安定性',
    '調和力',
    '忍耐力',
    'コミュニケーション',
    '思いやり',
    '誠実さ',
    '包容力',
    '責任感',
  ],
  school: [
    '学習意欲',
    '集中力',
    '好奇心',
    '粘り強さ',
    '計画力',
    '創造的思考',
    '論理的思考',
    '自律的学習',
  ],
};

/**
 * Big5スコアから仕事軸スコアを計算する
 *
 * 式: (C×0.40) + (E×0.25) + (O×0.20) + (A×0.05) - (N×0.10)
 * 根拠: Barrick & Mount (1991) C因子が最も仕事パフォーマンスと相関
 */
function calcWorkScore(b5: Big5Scores): number {
  const raw = b5.C * 0.40 + b5.E * 0.25 + b5.O * 0.20 + b5.A * 0.05 - b5.N * 0.10;
  return Math.max(10, Math.min(100, Math.round(raw)));
}

/**
 * Big5スコアから恋愛軸スコアを計算する
 *
 * 式: (E×0.30) + (A×0.30) + (O×0.20) - (N×0.20)
 * 根拠: Wooldridge(2010) 恋愛満足度はE・A高く・N低いと相関
 */
function calcLoveScore(b5: Big5Scores): number {
  const raw = b5.E * 0.30 + b5.A * 0.30 + b5.O * 0.20 - b5.N * 0.20;
  return Math.max(10, Math.min(100, Math.round(raw)));
}

/**
 * Big5スコアから友人軸スコアを計算する
 *
 * 式: (E×0.40) + (A×0.35) + (O×0.15) - (N×0.10)
 * 根拠: 社交性(E)・協調性(A)が友人関係の質と強く相関
 */
function calcFriendScore(b5: Big5Scores): number {
  const raw = b5.E * 0.40 + b5.A * 0.35 + b5.O * 0.15 - b5.N * 0.10;
  return Math.max(10, Math.min(100, Math.round(raw)));
}

/**
 * Big5スコアから家族軸スコアを計算する
 * ※家族軸 = 性格相性・調和のみ（育児ストレス・介護はYMYL回避）
 *
 * 式: (A×0.45) + (C×0.25) + (E×0.10) + (O×0.10) - (N×0.10)
 * 根拠: 協調性(A)・誠実性(C)が家族関係の安定と最も相関
 */
function calcFamilyScore(b5: Big5Scores): number {
  const raw = b5.A * 0.45 + b5.C * 0.25 + b5.E * 0.10 + b5.O * 0.10 - b5.N * 0.10;
  return Math.max(10, Math.min(100, Math.round(raw)));
}

/**
 * Big5スコアから学校・学習軸スコアを計算する
 *
 * 式: (O×0.40) + (C×0.35) + (E×0.10) - (N×0.15)
 * 根拠: Costa & McCrae(1992) O因子が学業・学習意欲と最も相関
 */
function calcSchoolScore(b5: Big5Scores): number {
  const raw = b5.O * 0.40 + b5.C * 0.35 + b5.E * 0.10 - b5.N * 0.15;
  return Math.max(10, Math.min(100, Math.round(raw)));
}

/**
 * スコアから強みラベルを選択する
 * Big5の高スコア因子に対応した強みを返す
 */
function getTopStrengths(
  score: number,
  b5: Big5Scores,
  scene: keyof typeof SCENE_LABELS
): string[] {
  const labels = SCENE_LABELS[scene];
  // Big5の高い因子順で上位3つを選択（簡易実装）
  const factors: [keyof Big5Scores, number][] = [
    ['O', b5.O], ['C', b5.C], ['E', b5.E], ['A', b5.A]
  ];
  factors.sort((a, b) => b[1] - a[1]);

  // シーン別インデックスマッピング
  const indexMap: Record<string, Record<keyof Big5Scores, number>> = {
    work:   { O: 4, C: 5, E: 3, A: 2, N: 0 },
    love:   { O: 2, C: 5, E: 0, A: 4, N: 7 },
    friend: { O: 7, C: 6, E: 0, A: 1, N: 9 },
    family: { O: 3, C: 7, E: 3, A: 4, N: 6 },
    school: { O: 2, C: 4, E: 7, A: 3, N: 3 },
  };

  const sceneMap = indexMap[scene];
  const seen = new Set<number>();
  const result: string[] = [];

  for (const [factor] of factors) {
    if (result.length >= 3) break;
    const idx = sceneMap[factor] ?? 0;
    if (!seen.has(idx) && labels[idx]) {
      seen.add(idx);
      result.push(labels[idx]);
    }
  }

  // 3つに満たない場合は先頭から補完
  for (const label of labels) {
    if (result.length >= 3) break;
    if (!result.includes(label)) result.push(label);
  }

  return result.slice(0, 3);
}

/**
 * スコアから注意点を選択する
 * N（神経症傾向）高・特定の因子低スコアに対応した注意点を返す
 */
function getCautions(score: number, b5: Big5Scores, scene: string): string[] {
  const cautions: Record<string, string[]> = {
    work: [
      'ストレス管理を意識しましょう',
      '完璧主義になりすぎないよう注意',
      '他者の意見も積極的に取り入れましょう',
      '柔軟な対応力を磨くと◎',
    ],
    love: [
      '感情の変化を言葉で伝える練習を',
      '相手のペースも尊重しましょう',
      '自分の時間も大切に確保して',
      '依存・過剰期待に注意',
    ],
    friend: [
      '自分のニーズも大切にしましょう',
      '一人の時間でエネルギーを補充して',
      '深い関係を焦らず育てましょう',
      '断る練習も自己ケアのひとつ',
    ],
    family: [
      '自分の気持ちも言葉にすることが大切',
      '変化を受け入れる柔軟性を育てて',
      '家族それぞれのペースを尊重しましょう',
    ],
    school: [
      '休憩を取りながら集中力を持続して',
      '得意な学習スタイルを活かして',
      '完璧を求めすぎず進むことも大切',
      '苦手分野は少しずつ克服を',
    ],
  };

  const list = cautions[scene] || [];

  // N高め: ストレス関連の注意を優先
  if (b5.N >= 65) {
    return [list[0], list[list.length - 1]].filter(Boolean).slice(0, 2);
  }
  // スコア低め: 改善系の注意
  if (score < 45) {
    return list.slice(1, 3);
  }
  // 通常: 最初の2つ
  return list.slice(0, 2);
}

/**
 * スコアからラベルを生成する
 */
function getSceneLabel(score: number, scene: string): string {
  const labelMap: Record<string, [string, string, string, string]> = {
    work:   ['向上中',     'バランス型',   'チームの核',   '天性のリーダー'],
    love:   ['丁寧な愛情型', '誠実な恋愛型', '情熱的な恋愛型', '深い絆型'],
    friend: ['穏やかな関係型', '信頼の友人型', '活発な友人型', '友人の核'],
    family: ['調和を大切に', '家族の安定軸', '頼れる存在',   '家族の絆型'],
    school: ['着実な成長型', '努力家型',    '好奇心旺盛型',  '探究者型'],
  };
  const labels = labelMap[scene] || ['', '', '', ''];
  if (score < 35) return labels[0];
  if (score < 55) return labels[1];
  if (score < 75) return labels[2];
  return labels[3];
}

/**
 * 5シーン軸スコアを計算する（メイン関数）
 *
 * @param b5 - 加重平均Big5スコア
 * @param _results - 診断結果（将来の拡張用）
 * @returns SceneScores
 */
export function calculateSceneScores(
  b5: Big5Scores,
  _results?: Record<string, DiagnosisResultEntry | null>
): SceneScores {
  const workScore = calcWorkScore(b5);
  const loveScore = calcLoveScore(b5);
  const friendScore = calcFriendScore(b5);
  const familyScore = calcFamilyScore(b5);
  const schoolScore = calcSchoolScore(b5);

  return {
    work: {
      score: workScore,
      topStrengths: getTopStrengths(workScore, b5, 'work'),
      cautions: getCautions(workScore, b5, 'work'),
      label: getSceneLabel(workScore, 'work'),
    },
    love: {
      score: loveScore,
      topStrengths: getTopStrengths(loveScore, b5, 'love'),
      cautions: getCautions(loveScore, b5, 'love'),
      label: getSceneLabel(loveScore, 'love'),
    },
    friend: {
      score: friendScore,
      topStrengths: getTopStrengths(friendScore, b5, 'friend'),
      cautions: getCautions(friendScore, b5, 'friend'),
      label: getSceneLabel(friendScore, 'friend'),
    },
    family: {
      score: familyScore,
      topStrengths: getTopStrengths(familyScore, b5, 'family'),
      cautions: getCautions(familyScore, b5, 'family'),
      label: getSceneLabel(familyScore, 'family'),
    },
    school: {
      score: schoolScore,
      topStrengths: getTopStrengths(schoolScore, b5, 'school'),
      cautions: getCautions(schoolScore, b5, 'school'),
      label: getSceneLabel(schoolScore, 'school'),
    },
  };
}
