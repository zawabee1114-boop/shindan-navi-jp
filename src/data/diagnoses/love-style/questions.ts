/**
 * 恋愛スタイル診断 質問データ
 *
 * 学術根拠:
 * - Lee JA (1973) "Colours of Love" New Press
 *   6タイプ: Eros / Ludus / Storge / Pragma / Mania / Agape
 * - Hendrick C, Hendrick S (1986) Love Attitudes Scale (LAS)
 *   DOI: 10.1037/0022-3514.50.2.392
 *
 * 構成: 6タイプ × 5問 = 30問
 * タイプ混合配置（Eros→Ludus→Storge→Pragma→Mania→Agapeの順で繰り返し・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * YMYL回避注意事項:
 * - 「依存症」「執着障害」「メンヘラ」等の医学・スティグマ用語NG
 * - 「彼/彼女」NG → 「パートナー/相手」表現
 * - 断定的な負の評価NG（「傾向がある」表現を使用）
 *
 * 確認日: 2026-05-21
 */

export type LoveStyleType =
  | 'eros'   // 情熱型: 一目惚れ・身体的魅力・強い感情・ロマンチック
  | 'ludus'  // 遊戯型: 恋愛をゲームとして楽しむ・束縛を嫌う・複数同時
  | 'storge' // 友愛型: 友情から愛が育つ・ゆっくり・安定・信頼
  | 'pragma' // 実利型: 条件・価値観・将来設計・現実的な相性
  | 'mania'  // 感情型: 嫉妬・不安・感情の波・相手への強い執着傾向
  | 'agape'; // 献身型: 無償の愛・相手の幸せ優先・見返りを求めない

export interface Question {
  id: number;
  text: string;
  type: LoveStyleType;
}

/**
 * 30問の恋愛スタイル診断
 *
 * 配置順（タイプ混合でバイアス回避）:
 * Q1:eros  Q2:ludus  Q3:storge  Q4:pragma  Q5:mania  Q6:agape
 * Q7:eros  Q8:ludus  Q9:storge  Q10:pragma Q11:mania Q12:agape
 * Q13:eros Q14:ludus Q15:storge Q16:pragma Q17:mania Q18:agape
 * Q19:eros Q20:ludus Q21:storge Q22:pragma Q23:mania Q24:agape
 * Q25:eros Q26:ludus Q27:storge Q28:pragma Q29:mania Q30:agape
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q6） ----
  {
    id: 1,
    text: 'パートナーに一目惚れした経験がある、または一目で「この人だ」と感じたことがある',
    type: 'eros',
  },
  {
    id: 2,
    text: '恋愛は楽しいゲームのようなもので、深刻に考えすぎずに楽しむことが大切だと思う',
    type: 'ludus',
  },
  {
    id: 3,
    text: '友人として長く付き合ううちに、気づいたら恋愛感情が芽生えるパターンが多い',
    type: 'storge',
  },
  {
    id: 4,
    text: 'パートナーを選ぶとき、価値観や将来の方向性が合っているかを冷静に確認する',
    type: 'pragma',
  },
  {
    id: 5,
    text: 'パートナーが他の人と仲良くしているのを見ると、強い不安や焦りを感じる',
    type: 'mania',
  },
  {
    id: 6,
    text: 'パートナーが幸せであれば、自分が少し我慢することは苦にならない',
    type: 'agape',
  },

  // ---- ブロック 2（Q7-Q12） ----
  {
    id: 7,
    text: 'パートナーの外見や雰囲気に強く惹かれることが、恋愛の大きなきっかけになる',
    type: 'eros',
  },
  {
    id: 8,
    text: '同時期に複数の人と軽く付き合うことを、特に問題だとは感じない',
    type: 'ludus',
  },
  {
    id: 9,
    text: '恋愛は急いで始めるより、時間をかけて相手をよく知ってからが理想的だと思う',
    type: 'storge',
  },
  {
    id: 10,
    text: '恋愛相手を選ぶとき、収入・生活水準・家族背景なども無意識に考慮している',
    type: 'pragma',
  },
  {
    id: 11,
    text: 'パートナーから連絡が来ないと、何か悪いことがあったのではと不安になりやすい',
    type: 'mania',
  },
  {
    id: 12,
    text: 'パートナーのために自分の時間や計画を後回しにすることが自然にできる',
    type: 'agape',
  },

  // ---- ブロック 3（Q13-Q18） ----
  {
    id: 13,
    text: '理想のパートナーに出会えたとき、強い情熱と高揚感を覚えることが多い',
    type: 'eros',
  },
  {
    id: 14,
    text: '恋愛関係に縛られることに強い抵抗感があり、自由を保ちたいと思う',
    type: 'ludus',
  },
  {
    id: 15,
    text: '親友のような関係性を築けるパートナーが、恋愛でも理想に近いと思う',
    type: 'storge',
  },
  {
    id: 16,
    text: '結婚・将来を意識したとき、相手との生活設計が合うかどうかを真剣に考える',
    type: 'pragma',
  },
  {
    id: 17,
    text: 'パートナーへの気持ちが激しくなりすぎて、感情の波に振り回されることがある',
    type: 'mania',
  },
  {
    id: 18,
    text: '恋愛では見返りを求めず、ただ相手が笑顔でいてくれることが喜びになる',
    type: 'agape',
  },

  // ---- ブロック 4（Q19-Q24） ----
  {
    id: 19,
    text: 'パートナーのことを、頭の中で理想の存在として思い描く傾向がある',
    type: 'eros',
  },
  {
    id: 20,
    text: '恋愛が重くなってきたと感じると、距離を置きたくなることがある',
    type: 'ludus',
  },
  {
    id: 21,
    text: '信頼関係が積み上がるにつれて、少しずつ相手への愛情が深まっていく感覚がある',
    type: 'storge',
  },
  {
    id: 22,
    text: 'パートナーが持つ社会的・職業的な背景は、交際を続けるかどうかの判断に影響する',
    type: 'pragma',
  },
  {
    id: 23,
    text: 'パートナーのことを考えすぎて、眠れなくなったり落ち着かなくなることがある',
    type: 'mania',
  },
  {
    id: 24,
    text: 'パートナーが困っているときは、自分のことよりも相手を最優先にしたいと思う',
    type: 'agape',
  },

  // ---- ブロック 5（Q25-Q30） ----
  {
    id: 25,
    text: '恋愛において、ロマンチックな演出やサプライズを大切にしたいと思う',
    type: 'eros',
  },
  {
    id: 26,
    text: '相手に深入りしすぎず、お互いに適度な距離感を保つ恋愛が心地よい',
    type: 'ludus',
  },
  {
    id: 27,
    text: '安定した関係の中で、毎日を穏やかに過ごせるパートナーシップが理想だと思う',
    type: 'storge',
  },
  {
    id: 28,
    text: '恋愛を始める前に、相手と自分の相性を現実的な視点でしっかり考える',
    type: 'pragma',
  },
  {
    id: 29,
    text: 'パートナーへの気持ちが強すぎて、自分でコントロールできないと感じることがある',
    type: 'mania',
  },
  {
    id: 30,
    text: '愛するということは、相手の幸せのために自分を犠牲にすることも含むと思う',
    type: 'agape',
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
export function getQuestionsByType(type: LoveStyleType): Question[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const loveStyleTypes: LoveStyleType[] = [
  'eros',
  'ludus',
  'storge',
  'pragma',
  'mania',
  'agape',
];
