/**
 * 血液型サブタイプ診断 質問データ
 *
 * 測定軸:
 * - E（外向性 Extraversion）: 社交性・活動性・外向きエネルギー
 * - A（協調性 Agreeableness）: 他者への配慮・協調・温かさ
 * - N（神経症傾向 Neuroticism）: 感情の揺れ・繊細さ・ストレス感受性
 * - C（誠実性 Conscientiousness）: 計画性・几帳面さ・責任感
 *
 * 構成: 10問（E×3問 / A×2問 / N×3問 / C×2問）
 * 混合配置（バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない〜5=とても当てはまる）
 *
 * 判定ロジック: 血液型ごとのサブタイプ3つを外向(E)と情緒安定(N逆転)の
 * 2軸スコアで判定する。
 *
 * 参考:
 * - McCrae RR, Costa PT (1987) Big Five Personality Factors
 * - 能見正比古 (1971) 典型・変則・中間の概念
 *
 * 確認日: 2026-06-07
 */

/** Big5の4測定軸 */
export type Big5Axis = 'E' | 'A' | 'N' | 'C';

export interface Question {
  id: number;
  text: string;
  axis: Big5Axis;
}

/**
 * 10問の質問
 *
 * 配置順（タイプ混合でバイアス回避）:
 * Q1:E  Q2:N  Q3:C  Q4:A  Q5:E
 * Q6:N  Q7:C  Q8:E  Q9:A  Q10:N
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q5） ----
  {
    id: 1,
    text: '初対面の人と話すときも、自分から積極的に話しかける方だ',
    axis: 'E',
  },
  {
    id: 2,
    text: '細かいことが気になって、ちょっとしたミスや言葉のズレを引きずりやすい',
    axis: 'N',
  },
  {
    id: 3,
    text: '物事を始める前に、手順や段取りを考えてから動くことが多い',
    axis: 'C',
  },
  {
    id: 4,
    text: '誰かが困っていると、気づかないふりができず、つい助けてしまう',
    axis: 'A',
  },
  {
    id: 5,
    text: '複数の人がいる場の中心にいることが心地よく、会話が弾むと元気が出る',
    axis: 'E',
  },

  // ---- ブロック 2（Q6-Q10） ----
  {
    id: 6,
    text: '気分の浮き沈みがあり、調子のよい日と悪い日の差が出やすい',
    axis: 'N',
  },
  {
    id: 7,
    text: '決めたことはきちんと守りたいと思い、自分への約束も大切にしている',
    axis: 'C',
  },
  {
    id: 8,
    text: '人との会話や交流がエネルギーの源になっており、一人より誰かといる方が楽しい',
    axis: 'E',
  },
  {
    id: 9,
    text: '意見が対立したとき、自分の主張より関係の調和を優先することが多い',
    axis: 'A',
  },
  {
    id: 10,
    text: '他人の評価や反応が気になって、言いたいことを言えないことがある',
    axis: 'N',
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

/** 軸別の質問グループを返す */
export function getQuestionsByAxis(axis: Big5Axis): Question[] {
  return questions.filter((q) => q.axis === axis);
}
