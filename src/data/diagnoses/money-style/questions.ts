/**
 * 金銭感覚診断 質問データ
 *
 * 学術根拠:
 * - Klontz BT et al. (2011) Klontz Money Script Inventory (KMSI)
 *   DOI: 10.4148/jft.v2i1.451
 *   4タイプ: avoidance / worship / status / vigilance
 *
 * 構成: 4タイプ × 6問 = 24問
 * タイプ混合配置（avoidance→worship→status→vigilanceの順で繰り返し・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * YMYL回避注意事項:
 * - 投資推奨・金融商品比較・税務助言 絶対NG
 * - 「守銭奴」「ケチ」「浪費家」「買い物依存」等のスティグマ用語NG
 * - 断定的な負の評価NG（「傾向がある」表現を使用）
 * - 「彼/彼女」NG → 「パートナー」表現
 *
 * 確認日: 2026-05-21
 */

export type MoneyType =
  | 'avoidance' // 回避型: お金の話を避けたい・不安・罪悪感
  | 'worship'   // 崇拝型: お金があれば解決・収入=価値・リッチ志向
  | 'status'    // 地位型: ブランド・見栄・ステータス・他者比較
  | 'vigilance'; // 用心型: 貯金・節約・予算管理・計画的

export interface Question {
  id: number;
  text: string;
  type: MoneyType;
}

/**
 * 24問の金銭感覚診断
 *
 * 配置順（タイプ混合でバイアス回避）:
 * Q1:avoidance  Q2:worship  Q3:status  Q4:vigilance
 * Q5:avoidance  Q6:worship  Q7:status  Q8:vigilance
 * Q9:avoidance  Q10:worship Q11:status Q12:vigilance
 * Q13:avoidance Q14:worship Q15:status Q16:vigilance
 * Q17:avoidance Q18:worship Q19:status Q20:vigilance
 * Q21:avoidance Q22:worship Q23:status Q24:vigilance
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: 'お金の話題になると、何となく気が重くなったり、話を避けたくなることがある',
    type: 'avoidance',
  },
  {
    id: 2,
    text: 'お金がもっとあれば、今の悩みや問題のほとんどは解決できると感じる',
    type: 'worship',
  },
  {
    id: 3,
    text: '持ち物やブランドで、その人の社会的な立場や人柄をなんとなく判断することがある',
    type: 'status',
  },
  {
    id: 4,
    text: '毎月の収支を把握し、無駄な出費を抑えることが自分の安心感につながっている',
    type: 'vigilance',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '自分の貯金残高や資産について、じっくり考えるのが苦手または不安に感じる',
    type: 'avoidance',
  },
  {
    id: 6,
    text: '収入が増えれば増えるほど、幸福感や満足感も上がっていくと思う',
    type: 'worship',
  },
  {
    id: 7,
    text: '他の人より良い物を持ちたい、または生活水準を高く見せたいという気持ちがある',
    type: 'status',
  },
  {
    id: 8,
    text: '衝動買いはほとんどせず、購入前に「本当に必要か」を自分なりに確認する',
    type: 'vigilance',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: 'お金を管理したり計画したりすることが苦手で、つい後回しにしてしまう',
    type: 'avoidance',
  },
  {
    id: 10,
    text: 'お金を多く稼ぐことは、努力や能力の正当な証明だと思う',
    type: 'worship',
  },
  {
    id: 11,
    text: '年収や資産の多さが、その人の社会的な価値に影響すると感じる',
    type: 'status',
  },
  {
    id: 12,
    text: '将来のために、今のうちから計画的に貯蓄や資産管理を進めたいと思っている',
    type: 'vigilance',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: 'お金のことを考えると罪悪感や後ろめたさを感じることがある',
    type: 'avoidance',
  },
  {
    id: 14,
    text: '節約するより、より多く稼ぐことを考える方が生産的だと思う',
    type: 'worship',
  },
  {
    id: 15,
    text: '高価な物を持ったり贅沢な体験をすると、気分が上がったり自信がつく感覚がある',
    type: 'status',
  },
  {
    id: 16,
    text: '無駄遣いをしたと感じると、強いストレスや後悔を覚えることがある',
    type: 'vigilance',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: 'お金について学んだり調べたりすることに、なかなか気が向かない',
    type: 'avoidance',
  },
  {
    id: 18,
    text: 'お金さえあれば、愛情や人間関係の問題も大部分は解決できると感じる',
    type: 'worship',
  },
  {
    id: 19,
    text: 'SNSや周囲の人の暮らしぶりを見て、自分もそれに近いレベルを保ちたいと思う',
    type: 'status',
  },
  {
    id: 20,
    text: '予算を立てて行動することが好きで、計画通りに進むと安心感を感じる',
    type: 'vigilance',
  },

  // ---- ブロック 6（Q21-Q24） ----
  {
    id: 21,
    text: 'お金を稼ぐことに対して、どこか罪悪感や抵抗感を覚えることがある',
    type: 'avoidance',
  },
  {
    id: 22,
    text: '豊かな生活や裕福なライフスタイルへの憧れが、日常的なモチベーションになっている',
    type: 'worship',
  },
  {
    id: 23,
    text: '周囲に比べて見劣りしないよう、外見や持ち物・生活環境を意識することがある',
    type: 'status',
  },
  {
    id: 24,
    text: '将来への不安を減らすために、今の生活をある程度我慢してでも蓄えを増やしたいと思う',
    type: 'vigilance',
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
export function getQuestionsByType(type: MoneyType): Question[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const moneyTypes: MoneyType[] = [
  'avoidance',
  'worship',
  'status',
  'vigilance',
];
