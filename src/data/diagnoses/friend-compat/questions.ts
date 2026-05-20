/**
 * 友達相性診断 質問データ
 *
 * 学術根拠:
 * - Costa & McCrae (1992) Big Five（外向性・協調性の次元を参照）
 *   https://doi.org/10.1037/t07435-000
 * - Schutz FIRO-B (1958): 包含欲求・支配欲求・愛着欲求の3次元を参照
 *   https://www.worldcat.org/title/firo-a-three-dimensional-theory-of-interpersonal-behavior/oclc/186068
 * - Hartup (1996) 友情研究: 互恵性・関与度の軸を参照
 *   https://doi.org/10.2307/1131834
 *
 * 構成: 4軸 × 6問 = 24問
 * タイプ混合配置（連続防止・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * 4軸:
 * - extraversion（外向性）: 人と一緒にいることへの心地よさ・積極性
 * - empathy（共感性）: 相手の気持ちを察する・感情サポート傾向
 * - leadership（主導性）: グループをまとめ・計画を立てる傾向
 * - independence（独立性）: 自分のペース重視・一人時間の必要性
 *
 * 確認日: 2026-05-20
 */

export type FriendDimension =
  | 'extraversion'   // 外向性
  | 'empathy'        // 共感性
  | 'leadership'     // 主導性
  | 'independence';  // 独立性

export type FriendType =
  | 'mood-maker'   // 外向高+共感中 → ムードメーカー型
  | 'listener'     // 共感高+外向低 → 聴き上手型
  | 'leader'       // 主導高+外向高 → 仕切り屋型
  | 'lone-wolf'    // 独立突出 → 一匹狼型
  | 'harmonizer'   // 共感高+独立低 → 同調型
  | 'analyst';     // 外向低+主導低+共感低 → 知性派型

export interface Question {
  id: number;
  text: string;
  dimension: FriendDimension;
}

/**
 * 24問の友達相性診断
 *
 * 配置順（4軸混合・回答バイアス防止）:
 * Q1:ext Q2:emp Q3:lead Q4:ind
 * Q5:ext Q6:emp Q7:lead Q8:ind
 * Q9:ext Q10:emp Q11:lead Q12:ind
 * Q13:ext Q14:emp Q15:lead Q16:ind
 * Q17:ext Q18:emp Q19:lead Q20:ind
 * Q21:ext Q22:emp Q23:lead Q24:ind
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: '大人数のパーティや集まりは、疲れるより楽しい気持ちになることが多い',
    dimension: 'extraversion',
  },
  {
    id: 2,
    text: '友達が悩んでいるとき、話を聞くことで自分も力をもらえる感じがする',
    dimension: 'empathy',
  },
  {
    id: 3,
    text: 'グループで遊ぶ計画を立てるとき、自然と自分がまとめ役になることが多い',
    dimension: 'leadership',
  },
  {
    id: 4,
    text: '一人でいる時間は、誰かといる時間と同じくらい大切だと思う',
    dimension: 'independence',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '初対面の人にも自分から話しかけられる方だと思う',
    dimension: 'extraversion',
  },
  {
    id: 6,
    text: '友達の表情や雰囲気から「何かあったな」と察することがよくある',
    dimension: 'empathy',
  },
  {
    id: 7,
    text: '「誰がどの役割をやるか」を決めるとき、率先して振り分けようとする',
    dimension: 'leadership',
  },
  {
    id: 8,
    text: '友達と長時間一緒にいた後は、ひとりで気持ちを整える時間が必要だと感じる',
    dimension: 'independence',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: 'グループのムードが下がっているとき、自分が場を明るくしようとする',
    dimension: 'extraversion',
  },
  {
    id: 10,
    text: '友達の気持ちに寄り添うことで、自分がその子の力になれると思う',
    dimension: 'empathy',
  },
  {
    id: 11,
    text: 'グループ内で意見が割れたとき、自分が折衷案を出してまとめようとする',
    dimension: 'leadership',
  },
  {
    id: 12,
    text: '多数の人に合わせ続けるより、少人数で深く関わる方が自分に合っている',
    dimension: 'independence',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: '友達が多い状態は、毎日の活力につながると感じる',
    dimension: 'extraversion',
  },
  {
    id: 14,
    text: '相手の話を遮らず、最後まで丁寧に聴くことが自然にできる',
    dimension: 'empathy',
  },
  {
    id: 15,
    text: 'みんなが迷っているとき、自分がリードすることで場が動くことが多い',
    dimension: 'leadership',
  },
  {
    id: 16,
    text: '「群れて行動する」より「自分のペースで動く」の方がしっくりくる',
    dimension: 'independence',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: '人と話していると自然とテンションが上がり、元気になれる',
    dimension: 'extraversion',
  },
  {
    id: 18,
    text: '友達が落ち込んでいるとき、的確な言葉をかけてあげたいと思う',
    dimension: 'empathy',
  },
  {
    id: 19,
    text: '旅行や飲み会など、グループの企画・手配を積極的に引き受けることが多い',
    dimension: 'leadership',
  },
  {
    id: 20,
    text: '自分の興味や考えが周りと違っても、それはそれで構わないと思う',
    dimension: 'independence',
  },

  // ---- ブロック 6（Q21-Q24） ----
  {
    id: 21,
    text: '初めて参加するグループでも、すぐに打ち解けられる方だと思う',
    dimension: 'extraversion',
  },
  {
    id: 22,
    text: '友達の感情の変化に気づいたとき、そっとフォローしたくなる',
    dimension: 'empathy',
  },
  {
    id: 23,
    text: 'グループ内で問題が起きたとき、誰かが動かないなら自分が動こうと思う',
    dimension: 'leadership',
  },
  {
    id: 24,
    text: '深く付き合える友達が少数いれば、それで十分だと感じることが多い',
    dimension: 'independence',
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
export function getQuestionsByDimension(dimension: FriendDimension): Question[] {
  return questions.filter((q) => q.dimension === dimension);
}

/** 全軸一覧 */
export const friendDimensions: FriendDimension[] = [
  'extraversion',
  'empathy',
  'leadership',
  'independence',
];
