/**
 * 多重知能テスト 質問データ
 * 理論: Howard Gardner「Frames of Mind」(1983) / Multiple Intelligences
 * 8知能 × 8問 = 64問
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * 確認日: 2026-05-20
 * 参考: https://www.pz.harvard.edu/projects/multiple-intelligences
 */

export type IntelligenceType =
  | 'linguistic'       // 言語的知能
  | 'logical'          // 論理数学的知能
  | 'spatial'          // 視空間的知能
  | 'kinesthetic'      // 身体運動的知能
  | 'musical'          // 音楽的知能
  | 'interpersonal'    // 対人的知能
  | 'intrapersonal'    // 内省的知能
  | 'naturalist';      // 博物的知能

export interface Question {
  id: number;
  text: string;
  intelligence: IntelligenceType;
}

export const questions: Question[] = [
  // ========================
  // 言語的知能（Linguistic） Q1-8
  // ========================
  {
    id: 1,
    text: '読書や物語を読むのが好きだ',
    intelligence: 'linguistic',
  },
  {
    id: 2,
    text: '言葉遊びやダジャレを思いつくのが得意だ',
    intelligence: 'linguistic',
  },
  {
    id: 3,
    text: '自分の考えを文章でうまく表現できる',
    intelligence: 'linguistic',
  },
  {
    id: 4,
    text: '新しい言葉や表現を覚えるのが早い',
    intelligence: 'linguistic',
  },
  {
    id: 5,
    text: '話し合いや議論で自分の意見をうまく伝えられる',
    intelligence: 'linguistic',
  },
  {
    id: 6,
    text: '詩や歌詞の表現に強く惹かれる',
    intelligence: 'linguistic',
  },
  {
    id: 7,
    text: '聞いた話や読んだ文章の内容をよく覚えている',
    intelligence: 'linguistic',
  },
  {
    id: 8,
    text: '日記や文章を書くことが自分の気持ちの整理になる',
    intelligence: 'linguistic',
  },

  // ========================
  // 論理数学的知能（Logical-Mathematical） Q9-16
  // ========================
  {
    id: 9,
    text: '数学やパズルを解くのが好きだ',
    intelligence: 'logical',
  },
  {
    id: 10,
    text: '物事を論理的な順序で考えるのが得意だ',
    intelligence: 'logical',
  },
  {
    id: 11,
    text: 'パターンや規則性を見つけるのが楽しい',
    intelligence: 'logical',
  },
  {
    id: 12,
    text: '問題の原因を分析して解決策を考えるのが得意だ',
    intelligence: 'logical',
  },
  {
    id: 13,
    text: '統計やデータを見て傾向を読み取るのが好きだ',
    intelligence: 'logical',
  },
  {
    id: 14,
    text: '「なぜそうなるのか」という理由を突き詰めて考える',
    intelligence: 'logical',
  },
  {
    id: 15,
    text: 'コンピュータやプログラムの仕組みに興味がある',
    intelligence: 'logical',
  },
  {
    id: 16,
    text: '物事を数字や図表で整理すると理解しやすい',
    intelligence: 'logical',
  },

  // ========================
  // 視空間的知能（Spatial） Q17-24
  // ========================
  {
    id: 17,
    text: '地図を見てすぐに場所や方向を把握できる',
    intelligence: 'spatial',
  },
  {
    id: 18,
    text: '絵を描いたりデザインしたりするのが好きだ',
    intelligence: 'spatial',
  },
  {
    id: 19,
    text: '立体的な形や構造を頭の中でイメージするのが得意だ',
    intelligence: 'spatial',
  },
  {
    id: 20,
    text: '色やデザインのバランスに敏感で、好みがはっきりしている',
    intelligence: 'spatial',
  },
  {
    id: 21,
    text: '写真や動画で自分のイメージを表現したくなる',
    intelligence: 'spatial',
  },
  {
    id: 22,
    text: '部屋のレイアウトや家具の配置を考えるのが楽しい',
    intelligence: 'spatial',
  },
  {
    id: 23,
    text: '映像や図で説明されるとすぐに理解できる',
    intelligence: 'spatial',
  },
  {
    id: 24,
    text: '建物や景色の構造・雰囲気に強く興味を持つ',
    intelligence: 'spatial',
  },

  // ========================
  // 身体運動的知能（Bodily-Kinesthetic） Q25-32
  // ========================
  {
    id: 25,
    text: 'スポーツや体を使う活動が得意だ',
    intelligence: 'kinesthetic',
  },
  {
    id: 26,
    text: '手先を使った作業（工作・料理・楽器演奏等）が好きだ',
    intelligence: 'kinesthetic',
  },
  {
    id: 27,
    text: '身体を動かしながらのほうが物事を覚えやすい',
    intelligence: 'kinesthetic',
  },
  {
    id: 28,
    text: 'ダンスや体操など体の動きを覚えるのが早い',
    intelligence: 'kinesthetic',
  },
  {
    id: 29,
    text: '長時間じっとしているより動いているほうが落ち着く',
    intelligence: 'kinesthetic',
  },
  {
    id: 30,
    text: '自分の身体感覚（疲れ・緊張・バランス等）に敏感だ',
    intelligence: 'kinesthetic',
  },
  {
    id: 31,
    text: '細かい手作業や精密な動きをするのが得意だ',
    intelligence: 'kinesthetic',
  },
  {
    id: 32,
    text: '実際に体験してみることで理解が深まる',
    intelligence: 'kinesthetic',
  },

  // ========================
  // 音楽的知能（Musical） Q33-40
  // ========================
  {
    id: 33,
    text: '音楽を聴くと気分や感情が大きく動く',
    intelligence: 'musical',
  },
  {
    id: 34,
    text: '聴いたメロディーや歌詞をすぐに覚えられる',
    intelligence: 'musical',
  },
  {
    id: 35,
    text: 'リズムやテンポに乗って体が自然に動く',
    intelligence: 'musical',
  },
  {
    id: 36,
    text: '音楽を演奏したり、鼻歌を歌ったりするのが好きだ',
    intelligence: 'musical',
  },
  {
    id: 37,
    text: '環境音や背景音楽が作業の集中力に大きく影響する',
    intelligence: 'musical',
  },
  {
    id: 38,
    text: '音の高さや音色の違いに気づきやすい',
    intelligence: 'musical',
  },
  {
    id: 39,
    text: '音楽で自分の気持ちを表現したいと感じることがある',
    intelligence: 'musical',
  },
  {
    id: 40,
    text: '楽器を演奏することや歌うことが日常的な楽しみだ',
    intelligence: 'musical',
  },

  // ========================
  // 対人的知能（Interpersonal） Q41-48
  // ========================
  {
    id: 41,
    text: '初対面の人ともすぐに打ち解けられる',
    intelligence: 'interpersonal',
  },
  {
    id: 42,
    text: '相手の気持ちや状況を直感的に察することが得意だ',
    intelligence: 'interpersonal',
  },
  {
    id: 43,
    text: 'グループをまとめたりリードしたりするのが好きだ',
    intelligence: 'interpersonal',
  },
  {
    id: 44,
    text: '友人や知人から相談を受けることが多い',
    intelligence: 'interpersonal',
  },
  {
    id: 45,
    text: '異なる意見を持つ人たちの間を仲介するのが得意だ',
    intelligence: 'interpersonal',
  },
  {
    id: 46,
    text: '人の表情やちょっとした変化に気づきやすい',
    intelligence: 'interpersonal',
  },
  {
    id: 47,
    text: 'チームで協力しながら働くのが好きだ',
    intelligence: 'interpersonal',
  },
  {
    id: 48,
    text: '人の話をじっくり聞いて共感することが自然にできる',
    intelligence: 'interpersonal',
  },

  // ========================
  // 内省的知能（Intrapersonal） Q49-56
  // ========================
  {
    id: 49,
    text: '自分の気持ちや考えをじっくり振り返る時間が好きだ',
    intelligence: 'intrapersonal',
  },
  {
    id: 50,
    text: '自分の強みと弱みをよく理解している',
    intelligence: 'intrapersonal',
  },
  {
    id: 51,
    text: '自分の感情の変化に気づいて名前をつけられる',
    intelligence: 'intrapersonal',
  },
  {
    id: 52,
    text: '人生の目標や価値観について深く考えることがある',
    intelligence: 'intrapersonal',
  },
  {
    id: 53,
    text: 'ひとりで過ごす時間がエネルギー補充になる',
    intelligence: 'intrapersonal',
  },
  {
    id: 54,
    text: '自分の行動や選択に一貫したポリシーを持っている',
    intelligence: 'intrapersonal',
  },
  {
    id: 55,
    text: '自分がなぜそう感じたのかを掘り下げて考える',
    intelligence: 'intrapersonal',
  },
  {
    id: 56,
    text: '内面の変化や成長を大切にしている',
    intelligence: 'intrapersonal',
  },

  // ========================
  // 博物的知能（Naturalist） Q57-64
  // ========================
  {
    id: 57,
    text: '自然の中にいると気持ちが落ち着く',
    intelligence: 'naturalist',
  },
  {
    id: 58,
    text: '植物・動物・鉱物など自然の分類に興味がある',
    intelligence: 'naturalist',
  },
  {
    id: 59,
    text: '天気や季節の変化に敏感に気づく',
    intelligence: 'naturalist',
  },
  {
    id: 60,
    text: '生き物の生態や行動パターンを観察するのが好きだ',
    intelligence: 'naturalist',
  },
  {
    id: 61,
    text: '環境問題や生態系への関心が高い',
    intelligence: 'naturalist',
  },
  {
    id: 62,
    text: '似ているものの細かな違いを見分けるのが得意だ',
    intelligence: 'naturalist',
  },
  {
    id: 63,
    text: '野外活動（ハイキング・キャンプ・ガーデニング等）が好きだ',
    intelligence: 'naturalist',
  },
  {
    id: 64,
    text: '自然や生き物に関する知識を集めることが楽しい',
    intelligence: 'naturalist',
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

/** 知能別の質問グループを返す */
export function getQuestionsByIntelligence(type: IntelligenceType): Question[] {
  return questions.filter((q) => q.intelligence === type);
}

/** 全知能タイプ一覧 */
export const intelligenceTypes: IntelligenceType[] = [
  'linguistic',
  'logical',
  'spatial',
  'kinesthetic',
  'musical',
  'interpersonal',
  'intrapersonal',
  'naturalist',
];
