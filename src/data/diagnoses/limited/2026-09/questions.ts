/**
 * 目標達成タイプ診断 質問データ（2026年9月限定）
 *
 * 学術根拠:
 * - Elliot & McGregor (2001): 2×2 達成目標フレームワーク
 *   https://doi.org/10.1037/0022-3514.80.3.501
 * - Elliot & Church (1997): 達成動機の階層モデル
 *   https://doi.org/10.1037/0022-3514.72.1.218
 * - Dweck & Leggett (1988): 学習目標・遂行目標の社会的認知アプローチ
 *   https://doi.org/10.1037/0033-295X.95.2.256
 *
 * 構成: 4タイプ × 5問 = 20問
 * タイプ混合配置（連続防止・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=非常に当てはまる）
 *
 * 4タイプ:
 * - mastery-approach（成長追求型）: 自分の成長・習得そのものを目標にする
 * - mastery-avoidance（着実維持型）: 自分の基準を下回らないことを目標にする
 * - performance-approach（成果証明型）: 他者より優れた結果を示すことを目標にする
 * - performance-avoidance（堅実回避型）: 他者より劣って見えないことを目標にする
 *
 * YMYL注意:
 * - 「無気力」「意欲障害」等の医学・臨床用語NG
 * - 「目標への向き合い方」の表現を使う
 * - 4タイプに優劣をつけない
 *
 * 確認日: 2026-09-06
 */

export type GoalOrientationType =
  | 'mastery-approach' // 成長追求型（Elliot & McGregor: mastery-approach goal）
  | 'mastery-avoidance' // 着実維持型（Elliot & McGregor: mastery-avoidance goal）
  | 'performance-approach' // 成果証明型（Elliot & McGregor: performance-approach goal）
  | 'performance-avoidance'; // 堅実回避型（Elliot & McGregor: performance-avoidance goal）

export interface GoalOrientationQuestion {
  id: number;
  text: string;
  type: GoalOrientationType;
}

/**
 * 20問の目標達成タイプ診断
 *
 * 配置順（タイプ混合で回答バイアスを防止）:
 * Q1:mastery-approach Q2:mastery-avoidance Q3:performance-approach Q4:performance-avoidance
 * Q5-Q8 / Q9-Q12 / Q13-Q16 / Q17-Q20 も同じ並び順で繰り返す
 */
export const questions: GoalOrientationQuestion[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: '目標に取り組むとき、「どれだけ多くを学べるか」を重視する',
    type: 'mastery-approach',
  },
  {
    id: 2,
    text: '一度身につけた知識やスキルを、忘れたり衰えさせたりしないよう気をつけている',
    type: 'mastery-avoidance',
  },
  {
    id: 3,
    text: '周囲より良い結果を出せたとき、大きな達成感を感じる',
    type: 'performance-approach',
  },
  {
    id: 4,
    text: '人前で失敗して評価が下がることを、できるだけ避けたい',
    type: 'performance-avoidance',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '新しいスキルを深く身につけることに、大きなやりがいを感じる',
    type: 'mastery-approach',
  },
  {
    id: 6,
    text: '「前の自分より下手にならないように」という気持ちで練習や勉強に取り組む',
    type: 'mastery-avoidance',
  },
  {
    id: 7,
    text: '人と比べて自分がどれだけできているかが気になる',
    type: 'performance-approach',
  },
  {
    id: 8,
    text: '「できない人だと思われたくない」という気持ちが行動の動機になることが多い',
    type: 'performance-avoidance',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: '昨日より少しでも上達していると感じられると満足する',
    type: 'mastery-approach',
  },
  {
    id: 10,
    text: '自分の基準を下回るミスをすることに、強い抵抗を感じる',
    type: 'mastery-avoidance',
  },
  {
    id: 11,
    text: '目立つ場面で実力を発揮し、評価されることにやりがいを感じる',
    type: 'performance-approach',
  },
  {
    id: 12,
    text: '自信がない課題は、目立たないように進めたいと感じる',
    type: 'performance-avoidance',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: '難しい課題に直面すると、「成長のチャンスだ」と捉えることが多い',
    type: 'mastery-approach',
  },
  {
    id: 14,
    text: '完全に理解しきれていない部分が残っていると、落ち着かない気持ちになる',
    type: 'mastery-avoidance',
  },
  {
    id: 15,
    text: '「自分の方が優れている」と示せる機会を積極的に探す',
    type: 'performance-approach',
  },
  {
    id: 16,
    text: 'ミスをして恥をかく可能性がある場面では、慎重になりすぎることがある',
    type: 'performance-avoidance',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: '完全に理解できるまで、粘り強く取り組み続けたいと思う',
    type: 'mastery-approach',
  },
  {
    id: 18,
    text: '積み上げてきたものを維持することに、多くのエネルギーを使っている',
    type: 'mastery-avoidance',
  },
  {
    id: 19,
    text: '結果や成績で自分の実力を証明したいという気持ちが強い',
    type: 'performance-approach',
  },
  {
    id: 20,
    text: '周りと比べて劣っていると思われないよう、無難な選択をしがちだ',
    type: 'performance-avoidance',
  },
];

/** 5段階リッカートスケールのラベル（「当てはまり度」軸）*/
export const scaleLabels = [
  { value: 1, label: '全く当てはまらない' },
  { value: 2, label: 'あまり当てはまらない' },
  { value: 3, label: 'どちらともいえない' },
  { value: 4, label: 'やや当てはまる' },
  { value: 5, label: '非常に当てはまる' },
] as const;

/** タイプ別の質問グループを返す */
export function getQuestionsByType(type: GoalOrientationType): GoalOrientationQuestion[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const goalOrientationTypes: GoalOrientationType[] = [
  'mastery-approach',
  'mastery-avoidance',
  'performance-approach',
  'performance-avoidance',
];
