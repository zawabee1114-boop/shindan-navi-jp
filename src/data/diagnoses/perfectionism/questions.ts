/**
 * 完璧主義診断 質問データ
 *
 * 学術根拠:
 * - Hewitt & Flett (1991) Multidimensional Perfectionism Scale (MPS-HF)
 *   自己志向型・他者志向型・社会規定型の3次元を参照
 *   https://doi.org/10.1037/0022-3514.60.3.456
 * - Frost et al. (1990) MPS: 懸念的評価・失敗懸念・組織化の次元を参照
 *   https://doi.org/10.1007/BF01172967
 *
 * 構成: 4タイプ × 7問 = 28問
 * タイプ混合配置（連続防止・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * 確認日: 2026-05-20
 */

export type PerfectionismType =
  | 'thorough'       // 徹底型（自己志向型：Hewitt & Flett 自己志向完璧主義）
  | 'particular'     // こだわり型（Frost組織化・詳細志向）
  | 'procrastinating' // 先延ばし型（Frost失敗懸念・不適応的完璧主義）
  | 'expecting';     // 期待型（社会規定型：Hewitt & Flett 社会規定完璧主義）

export interface Question {
  id: number;
  text: string;
  type: PerfectionismType;
}

/**
 * 28問の完璧主義診断
 *
 * 配置順（タイプ混合で回答バイアスを防止）:
 * Q1:thorough Q2:particular Q3:procrastinating Q4:expecting
 * Q5:thorough Q6:particular Q7:procrastinating Q8:expecting
 * Q9:thorough Q10:particular Q11:procrastinating Q12:expecting
 * Q13:thorough Q14:particular Q15:procrastinating Q16:expecting
 * Q17:thorough Q18:particular Q19:procrastinating Q20:expecting
 * Q21:thorough Q22:particular Q23:procrastinating Q24:expecting
 * Q25:thorough Q26:particular Q27:procrastinating Q28:expecting
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: '何かに取り組むとき、妥協せずに最善を尽くさなければ気が済まない',
    type: 'thorough',
  },
  {
    id: 2,
    text: '作業の細部が整っていないと、全体が完成したとは思えない',
    type: 'particular',
  },
  {
    id: 3,
    text: '完璧にできる自信がないと、なかなか手をつけられない',
    type: 'procrastinating',
  },
  {
    id: 4,
    text: '周囲の人が自分に高い水準を求めていると感じる',
    type: 'expecting',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '自分に課す基準は、他の人と比べてかなり高いと思う',
    type: 'thorough',
  },
  {
    id: 6,
    text: '物の配置や整理整頓が乱れていると、落ち着いて作業できない',
    type: 'particular',
  },
  {
    id: 7,
    text: '失敗する可能性があると思うと、行動に移すのが怖くなる',
    type: 'procrastinating',
  },
  {
    id: 8,
    text: '期待に応えられなかったとき、自分の価値が下がった気がする',
    type: 'expecting',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: '100%の出来でなければ、やった意味がないと感じることがある',
    type: 'thorough',
  },
  {
    id: 10,
    text: '仕事や作業の手順・やり方へのこだわりが強い',
    type: 'particular',
  },
  {
    id: 11,
    text: '他者から批判されることを考えると、動き出すのが難しくなる',
    type: 'procrastinating',
  },
  {
    id: 12,
    text: '親や上司など、身近な人の期待がプレッシャーになることが多い',
    type: 'expecting',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: '一度決めたことには、最後まで手を抜かずにやり切ろうとする',
    type: 'thorough',
  },
  {
    id: 14,
    text: '書類・ファイル・道具の管理方法に、自分なりのルールがある',
    type: 'particular',
  },
  {
    id: 15,
    text: '締め切りが迫っても「もっと仕上げたい」と感じて提出をためらう',
    type: 'procrastinating',
  },
  {
    id: 16,
    text: '自分が「できる人」でいられなくなることへの不安がある',
    type: 'expecting',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: '自分の仕事や成果物に、いつも満足しきれないことが多い',
    type: 'thorough',
  },
  {
    id: 18,
    text: '複数の方法があるとき、どれが正確かを徹底的に確認したくなる',
    type: 'particular',
  },
  {
    id: 19,
    text: '「どうせうまくいかない」と思って先送りにすることがある',
    type: 'procrastinating',
  },
  {
    id: 20,
    text: '周囲の評価を気にして、本当にやりたいことを抑えることがある',
    type: 'expecting',
  },

  // ---- ブロック 6（Q21-Q24） ----
  {
    id: 21,
    text: '目標を達成しても「もっとうまくできたはず」と思ってしまう',
    type: 'thorough',
  },
  {
    id: 22,
    text: '他人が自分の基準と違うやり方をしていると気になってしまう',
    type: 'particular',
  },
  {
    id: 23,
    text: '失敗したことを何度も思い返して落ち込む時間が長い',
    type: 'procrastinating',
  },
  {
    id: 24,
    text: '誰かの期待を裏切りそうだと感じると、強いストレスを感じる',
    type: 'expecting',
  },

  // ---- ブロック 7（Q25-Q28） ----
  {
    id: 25,
    text: '「できるだけ完璧に」ではなく「完璧でないと意味がない」と感じる',
    type: 'thorough',
  },
  {
    id: 26,
    text: '作業がきれいに整理・完結していないと、次のステップに進みにくい',
    type: 'particular',
  },
  {
    id: 27,
    text: '新しいことを始めるとき、十分な準備が整わないと動けない',
    type: 'procrastinating',
  },
  {
    id: 28,
    text: '「自分への期待」が高すぎて、普通の成果では満足できないことが多い',
    type: 'expecting',
  },
];

/** 5段階リッカートスケールのラベル */
export const scaleLabels = [
  { value: 1, label: '全く当てはまらない' },
  { value: 2, label: 'あまり当てはまらない' },
  { value: 3, label: 'どちらともいえない' },
  { value: 4, label: 'やや当てはまる' },
  { value: 5, label: 'とても当てはまる' },
] as const;

/** タイプ別の質問グループを返す */
export function getQuestionsByType(type: PerfectionismType): Question[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const perfectionismTypes: PerfectionismType[] = [
  'thorough',
  'particular',
  'procrastinating',
  'expecting',
];
