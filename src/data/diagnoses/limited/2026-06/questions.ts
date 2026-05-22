/**
 * ストレス対処タイプ診断 質問データ（2026年6月限定）
 *
 * 学術根拠:
 * - Lazarus & Folkman (1984): 問題焦点型・感情焦点型の2大コーピング
 *   https://link.springer.com/book/9780826141910
 * - Carver CS (1997) Brief COPE: 14サブスケールを参照
 *   https://doi.org/10.1207/s15327558ijbm0401_6
 *
 * 構成: 4タイプ × 5問 = 20問
 * タイプ混合配置（連続防止・回答バイアス回避）
 * 5段階リッカートスケール（1=全くしない 〜 5=いつもする）
 *
 * 4タイプ:
 * - problem-focused（問題解決型）: Brief COPE の Active Coping / Planning
 * - emotion-focused（感情調整型）: Brief COPE の Positive Reframing / Acceptance
 * - avoidance（回避型）: Brief COPE の Self-Distraction / Behavioral Disengagement
 * - support-seeking（サポート希求型）: Brief COPE の Emotional / Instrumental Support
 *
 * YMYL注意:
 * - 「ストレス障害」「適応障害」等の医学用語NG
 * - 「対処スタイル」「コーピング傾向」の表現を使う
 * - 占い口調・運命論NG
 *
 * 確認日: 2026-05-22
 */

export type StressCopeType =
  | 'problem-focused'  // 問題解決型（Lazarus: problem-focused coping）
  | 'emotion-focused'  // 感情調整型（Lazarus: emotion-focused coping）
  | 'avoidance'        // 回避型（Brief COPE: behavioral disengagement + self-distraction）
  | 'support-seeking'; // サポート希求型（Brief COPE: emotional + instrumental support）

export interface StressQuestion {
  id: number;
  text: string;
  type: StressCopeType;
}

/**
 * 20問のストレス対処タイプ診断
 *
 * 配置順（タイプ混合で回答バイアスを防止）:
 * Q1:problem Q2:emotion Q3:avoidance Q4:support
 * Q5:problem Q6:emotion Q7:avoidance Q8:support
 * Q9:problem Q10:emotion Q11:avoidance Q12:support
 * Q13:problem Q14:emotion Q15:avoidance Q16:support
 * Q17:problem Q18:emotion Q19:avoidance Q20:support
 */
export const questions: StressQuestion[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: 'ストレスを感じたとき、原因となっている問題をどうすれば解決できるか考える',
    type: 'problem-focused',
  },
  {
    id: 2,
    text: 'ストレスを感じたとき、「これには意味があるはずだ」と気持ちを切り替えようとする',
    type: 'emotion-focused',
  },
  {
    id: 3,
    text: 'ストレスを感じたとき、その問題からいったん距離を置いて別のことに集中する',
    type: 'avoidance',
  },
  {
    id: 4,
    text: 'ストレスを感じたとき、信頼できる人に話を聞いてもらう',
    type: 'support-seeking',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '困難な状況に直面したとき、具体的な対応策や計画を立てようとする',
    type: 'problem-focused',
  },
  {
    id: 6,
    text: 'どうにもならない状況は「仕方ない」と受け入れて気持ちを落ち着けようとする',
    type: 'emotion-focused',
  },
  {
    id: 7,
    text: 'ストレスの多い状況では、とりあえず今のことを考えないようにする',
    type: 'avoidance',
  },
  {
    id: 8,
    text: '悩んでいるとき、友人や家族に話してアドバイスをもらうことが多い',
    type: 'support-seeking',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: 'ストレスを感じたとき、状況を変えるために自分から積極的に動く',
    type: 'problem-focused',
  },
  {
    id: 10,
    text: '嫌なことがあったとき、その状況の「良い面」を探して気持ちを整えようとする',
    type: 'emotion-focused',
  },
  {
    id: 11,
    text: 'プレッシャーを感じたとき、音楽・ゲーム・動画など別のことで気分を紛らわす',
    type: 'avoidance',
  },
  {
    id: 12,
    text: '困ったとき、「こんなことがあった」と誰かに話すだけでも楽になれる',
    type: 'support-seeking',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: '問題が起きたとき、何が課題で何から手をつけるべきかを整理しようとする',
    type: 'problem-focused',
  },
  {
    id: 14,
    text: '自分の感情を言葉や文字にして整理することで、気持ちが楽になることが多い',
    type: 'emotion-focused',
  },
  {
    id: 15,
    text: 'ストレスを感じると、その状況についてあまり深く考えないようにすることが多い',
    type: 'avoidance',
  },
  {
    id: 16,
    text: '困難なとき、同じような経験をした人の話を聞いたり体験談を読んだりする',
    type: 'support-seeking',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: 'ストレスの原因を取り除くための具体的な手順を考えることが自分の対処法になっている',
    type: 'problem-focused',
  },
  {
    id: 18,
    text: 'つらい出来事の中にも「自分が学べることがある」と意味を見つけようとする',
    type: 'emotion-focused',
  },
  {
    id: 19,
    text: '強いストレスを感じたとき、しばらくの間そのことを頭から切り離しておきたくなる',
    type: 'avoidance',
  },
  {
    id: 20,
    text: 'ストレスの多い時期は、誰かそばにいてくれるだけで心強く感じる',
    type: 'support-seeking',
  },
];

/** 5段階リッカートスケールのラベル（「する頻度」軸）*/
export const scaleLabels = [
  { value: 1, label: '全くしない' },
  { value: 2, label: 'あまりしない' },
  { value: 3, label: 'どちらともいえない' },
  { value: 4, label: 'よくする' },
  { value: 5, label: 'いつもする' },
] as const;

/** タイプ別の質問グループを返す */
export function getQuestionsByType(type: StressCopeType): StressQuestion[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const stressCopeTypes: StressCopeType[] = [
  'problem-focused',
  'emotion-focused',
  'avoidance',
  'support-seeking',
];
