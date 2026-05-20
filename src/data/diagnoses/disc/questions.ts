/**
 * DiSC診断 質問データ
 *
 * 学術根拠:
 * - Marston WM (1928) "Emotions of Normal People" Routledge
 *   D（Dominance）/ i（influence）/ S（Steadiness）/ C（Conscientiousness）の4次元
 *   https://archive.org/details/emotionsofnormal00mars
 * - Wiley DiSC公式 (2024) What is DiSC?
 *   https://www.discprofile.com/what-is-disc/overview
 *
 * 構成: 4タイプ × 7問 = 28問
 * タイプ混合配置（D→i→S→C の順で繰り返し・回答バイアス回避）
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 *
 * 確認日: 2026-05-20
 */

export type DiscType =
  | 'D' // Dominance（主導型）: 課題への直接的なアプローチ・結果重視
  | 'i' // influence（感化型）: 社交的・楽観的・人を巻き込む
  | 'S' // Steadiness（安定型）: 協調性・忍耐・チームの調和
  | 'C'; // Conscientiousness（慎重型）: 正確性・分析・品質へのこだわり

export interface Question {
  id: number;
  text: string;
  type: DiscType;
}

/**
 * 28問のDiSC診断
 *
 * 配置順（タイプ混合で回答バイアスを防止）:
 * Q1:D Q2:i Q3:S Q4:C
 * Q5:D Q6:i Q7:S Q8:C
 * Q9:D Q10:i Q11:S Q12:C
 * Q13:D Q14:i Q15:S Q16:C
 * Q17:D Q18:i Q19:S Q20:C
 * Q21:D Q22:i Q23:S Q24:C
 * Q25:D Q26:i Q27:S Q28:C
 */
export const questions: Question[] = [
  // ---- ブロック 1（Q1-Q4） ----
  {
    id: 1,
    text: '困難な課題に直面したとき、まず自分が先頭に立って解決しようとする',
    type: 'D',
  },
  {
    id: 2,
    text: '人と話すことがエネルギーの源になっており、会話が弾むと気分が上がる',
    type: 'i',
  },
  {
    id: 3,
    text: 'チームの中では協調性を大切にし、対立より調和を優先する',
    type: 'S',
  },
  {
    id: 4,
    text: '決断する前に、できるだけ多くのデータや情報を集めたいと思う',
    type: 'C',
  },

  // ---- ブロック 2（Q5-Q8） ----
  {
    id: 5,
    text: '目標に向かって障害があっても、直接的に突き進む傾向がある',
    type: 'D',
  },
  {
    id: 6,
    text: '初対面の人でも自然に打ち解けられ、すぐに仲良くなれる',
    type: 'i',
  },
  {
    id: 7,
    text: '急な変更や予定外の出来事があると、ペースを乱されやすいと感じる',
    type: 'S',
  },
  {
    id: 8,
    text: '仕事では正確さを最優先にし、ミスのないことを強く意識する',
    type: 'C',
  },

  // ---- ブロック 3（Q9-Q12） ----
  {
    id: 9,
    text: '結果を早く出すことを重視し、スピードと成果にこだわる',
    type: 'D',
  },
  {
    id: 10,
    text: 'アイデアを人と共有することが好きで、周囲を巻き込むのが得意だ',
    type: 'i',
  },
  {
    id: 11,
    text: '一度関係を築いた人との信頼を長期間維持することを大切にする',
    type: 'S',
  },
  {
    id: 12,
    text: '品質や完成度にこだわり、手を抜くことに強い抵抗感がある',
    type: 'C',
  },

  // ---- ブロック 4（Q13-Q16） ----
  {
    id: 13,
    text: '会議や議論では自分の意見を率直に、はっきり主張する',
    type: 'D',
  },
  {
    id: 14,
    text: 'チームの雰囲気を盛り上げたり、人を元気づけるのが自然にできる',
    type: 'i',
  },
  {
    id: 15,
    text: 'コツコツと着実に進める仕事スタイルを好み、忍耐強く取り組める',
    type: 'S',
  },
  {
    id: 16,
    text: 'ルールや手順を把握してから動きたいと思い、プロセスを重視する',
    type: 'C',
  },

  // ---- ブロック 5（Q17-Q20） ----
  {
    id: 17,
    text: '挑戦的な目標や困難なプロジェクトに取り組むことにやりがいを感じる',
    type: 'D',
  },
  {
    id: 18,
    text: '人を説得・影響することが得意で、自分の考えを共感してもらいやすい',
    type: 'i',
  },
  {
    id: 19,
    text: 'チームの一員として周囲をサポートする役割が心地よく感じる',
    type: 'S',
  },
  {
    id: 20,
    text: '論理的・分析的に物事を考えることが多く、感情より事実を重視する',
    type: 'C',
  },

  // ---- ブロック 6（Q21-Q24） ----
  {
    id: 21,
    text: '決断が早く、考えすぎるよりまず動いてから修正するタイプだと思う',
    type: 'D',
  },
  {
    id: 22,
    text: '人脈を広げることに積極的で、新しい出会いを楽しめる',
    type: 'i',
  },
  {
    id: 23,
    text: '人の話を最後まで丁寧に聞くことができ、相談されることが多い',
    type: 'S',
  },
  {
    id: 24,
    text: '作業前に計画・準備を念入りに行い、見通しが立ってから動く',
    type: 'C',
  },

  // ---- ブロック 7（Q25-Q28） ----
  {
    id: 25,
    text: '競争や勝負の場面で、負けることへの強い抵抗感がある',
    type: 'D',
  },
  {
    id: 26,
    text: '感情を豊かに表現することが多く、喜怒哀楽がわかりやすいと言われる',
    type: 'i',
  },
  {
    id: 27,
    text: '職場や家庭で安定した環境を好み、変化より継続を大切にする',
    type: 'S',
  },
  {
    id: 28,
    text: '高い専門性や正確な知識を積み上げることに価値を感じる',
    type: 'C',
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
export function getQuestionsByType(type: DiscType): Question[] {
  return questions.filter((q) => q.type === type);
}

/** 全タイプ一覧 */
export const discTypes: DiscType[] = ['D', 'i', 'S', 'C'];
