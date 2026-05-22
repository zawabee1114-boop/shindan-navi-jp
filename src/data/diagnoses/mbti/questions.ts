/**
 * MBTI主診断 質問データ
 * 理論: Jung CG (1921) + Myers IB (1962/1998)
 *
 * 4軸 × 10問 = 40問
 * 5段階リッカートスケール（1=全く当てはまらない 〜 5=とても当てはまる）
 * 軸: EI（外向/内向）・SN（感覚/直観）・TF（思考/感情）・JP（判断/知覚）
 *
 * direction:
 *   'first' = 第1極（E/S/T/J）を高めるスコア（値が大きいほど第1極寄り）
 *   'second' = 第2極（I/N/F/P）を高めるスコア（値が大きいほど第2極寄り → 計算時に反転）
 *
 * 質問順: 4軸を混合配置（連続バイアス回避）
 * 配列順: EI・SN・TF・JP・EI・SN・TF・JP... を繰り返し
 *
 * 確認日: 2026-05-22
 * 参考: The Myers-Briggs Company https://www.themyersbriggs.com/
 */

export type MBTIAxis = 'EI' | 'SN' | 'TF' | 'JP';
export type MBTIDirection = 'first' | 'second';

export interface MBTIQuestion {
  id: number;
  text: string;
  /** 判定軸 */
  axis: MBTIAxis;
  /**
   * 'first' = E/S/T/J 方向（高スコア → 第1極）
   * 'second' = I/N/F/P 方向（高スコア → 第2極）
   */
  direction: MBTIDirection;
}

export const questions: MBTIQuestion[] = [
  // ========== Q1-4: 各軸1問目（混合配置） ==========

  // Q1: EI軸 - E方向
  {
    id: 1,
    text: '初対面の人とでも、すぐに打ち解けて話せる',
    axis: 'EI',
    direction: 'first',
  },
  // Q2: SN軸 - S方向
  {
    id: 2,
    text: '直感よりも、具体的な事実やデータを重視する',
    axis: 'SN',
    direction: 'first',
  },
  // Q3: TF軸 - T方向
  {
    id: 3,
    text: '判断する時は、感情よりも論理と客観的な根拠を優先する',
    axis: 'TF',
    direction: 'first',
  },
  // Q4: JP軸 - J方向
  {
    id: 4,
    text: '物事は事前に計画を立ててから着実に進めたい',
    axis: 'JP',
    direction: 'first',
  },

  // ========== Q5-8: 各軸2問目 ==========

  // Q5: EI軸 - I方向
  {
    id: 5,
    text: '大勢の人と過ごした後は、一人の時間でエネルギーを回復する',
    axis: 'EI',
    direction: 'second',
  },
  // Q6: SN軸 - N方向
  {
    id: 6,
    text: '将来の可能性やひらめきを、今ある事実よりも大事にする',
    axis: 'SN',
    direction: 'second',
  },
  // Q7: TF軸 - F方向
  {
    id: 7,
    text: '決断するとき、周囲の人への影響や気持ちが最も気になる',
    axis: 'TF',
    direction: 'second',
  },
  // Q8: JP軸 - P方向
  {
    id: 8,
    text: '状況が変わっても臨機応変に対応できるよう、選択肢を開いておきたい',
    axis: 'JP',
    direction: 'second',
  },

  // ========== Q9-12: 各軸3問目 ==========

  // Q9: EI軸 - E方向
  {
    id: 9,
    text: '考えを整理するとき、声に出して話しながらまとめる方がやりやすい',
    axis: 'EI',
    direction: 'first',
  },
  // Q10: SN軸 - S方向
  {
    id: 10,
    text: '現実的・実践的な問題解決を、理論より優先する',
    axis: 'SN',
    direction: 'first',
  },
  // Q11: TF軸 - T方向
  {
    id: 11,
    text: '公平さと一貫性は、たとえ感情を傷つけても守るべきだと思う',
    axis: 'TF',
    direction: 'first',
  },
  // Q12: JP軸 - J方向
  {
    id: 12,
    text: '締切前に余裕をもって仕事を終わらせる方が落ち着く',
    axis: 'JP',
    direction: 'first',
  },

  // ========== Q13-16: 各軸4問目 ==========

  // Q13: EI軸 - I方向
  {
    id: 13,
    text: '深く狭い人間関係（少人数の親密な関係）を広い交友関係より好む',
    axis: 'EI',
    direction: 'second',
  },
  // Q14: SN軸 - N方向
  {
    id: 14,
    text: '抽象的な概念やパターンに強く惹かれる',
    axis: 'SN',
    direction: 'second',
  },
  // Q15: TF軸 - F方向
  {
    id: 15,
    text: '論理的に正しくても、人間関係の調和を損なう決断はしたくない',
    axis: 'TF',
    direction: 'second',
  },
  // Q16: JP軸 - P方向
  {
    id: 16,
    text: '予定よりも、その日の気分や状況に合わせて行動するのが好きだ',
    axis: 'JP',
    direction: 'second',
  },

  // ========== Q17-20: 各軸5問目 ==========

  // Q17: EI軸 - E方向
  {
    id: 17,
    text: '大人数の集まりや社交的な場では、エネルギーがわいてくる',
    axis: 'EI',
    direction: 'first',
  },
  // Q18: SN軸 - S方向
  {
    id: 18,
    text: '実績があることや試された方法を、新しいアプローチより信頼する',
    axis: 'SN',
    direction: 'first',
  },
  // Q19: TF軸 - T方向
  {
    id: 19,
    text: '議論では、感情的なつながりより論理の正しさを優先する',
    axis: 'TF',
    direction: 'first',
  },
  // Q20: JP軸 - J方向
  {
    id: 20,
    text: 'やるべきことのリストを作り、順番に片付けていくのが好きだ',
    axis: 'JP',
    direction: 'first',
  },

  // ========== Q21-24: 各軸6問目 ==========

  // Q21: EI軸 - I方向
  {
    id: 21,
    text: '人と長時間一緒にいると、たとえ楽しくても疲れを感じる',
    axis: 'EI',
    direction: 'second',
  },
  // Q22: SN軸 - N方向
  {
    id: 22,
    text: '現在の状況より、まだ実現していない可能性の方が気になる',
    axis: 'SN',
    direction: 'second',
  },
  // Q23: TF軸 - F方向
  {
    id: 23,
    text: '友人が困っているとき、解決策よりも共感して話を聞く方が自然だ',
    axis: 'TF',
    direction: 'second',
  },
  // Q24: JP軸 - P方向
  {
    id: 24,
    text: '完全に決めてしまうより、途中でも方向転換できる状態を好む',
    axis: 'JP',
    direction: 'second',
  },

  // ========== Q25-28: 各軸7問目 ==========

  // Q25: EI軸 - E方向
  {
    id: 25,
    text: '新しい環境やグループでも、自分から積極的に話しかける方だ',
    axis: 'EI',
    direction: 'first',
  },
  // Q26: SN軸 - S方向
  {
    id: 26,
    text: '詳細な情報や具体的な数字・事実に基づいて物事を判断する',
    axis: 'SN',
    direction: 'first',
  },
  // Q27: TF軸 - T方向
  {
    id: 27,
    text: '組織やチームでは、人間関係の調和より目標達成の効率を優先する',
    axis: 'TF',
    direction: 'first',
  },
  // Q28: JP軸 - J方向
  {
    id: 28,
    text: '仕事や作業は、すっきり完了させてから次のことを考えたい',
    axis: 'JP',
    direction: 'first',
  },

  // ========== Q29-32: 各軸8問目 ==========

  // Q29: EI軸 - I方向
  {
    id: 29,
    text: '自分の考えを整理するとき、まず一人で静かに考えたい',
    axis: 'EI',
    direction: 'second',
  },
  // Q30: SN軸 - N方向
  {
    id: 30,
    text: '普段から「なぜそうなるのか」という概念的な理由を考えることが好きだ',
    axis: 'SN',
    direction: 'second',
  },
  // Q31: TF軸 - F方向
  {
    id: 31,
    text: '相手の感情や状況を察して行動することが、自分の自然な反応だ',
    axis: 'TF',
    direction: 'second',
  },
  // Q32: JP軸 - P方向
  {
    id: 32,
    text: '長期的な計画より、流れに身を任せて柔軟に動く方が合っている',
    axis: 'JP',
    direction: 'second',
  },

  // ========== Q33-36: 各軸9問目 ==========

  // Q33: EI軸 - E方向
  {
    id: 33,
    text: '友人や知人と会う約束を積極的に入れる方だ',
    axis: 'EI',
    direction: 'first',
  },
  // Q34: SN軸 - S方向
  {
    id: 34,
    text: '仕事では、理論より実際の経験や現場の感覚を優先する',
    axis: 'SN',
    direction: 'first',
  },
  // Q35: TF軸 - T方向
  {
    id: 35,
    text: '物事を判断する際に、個人的な感情を切り離して考えることが得意だ',
    axis: 'TF',
    direction: 'first',
  },
  // Q36: JP軸 - J方向
  {
    id: 36,
    text: '曖昧な状況や結論が出ない状態が続くと、ストレスを感じる',
    axis: 'JP',
    direction: 'first',
  },

  // ========== Q37-40: 各軸10問目 ==========

  // Q37: EI軸 - I方向
  {
    id: 37,
    text: '休日は家でゆっくり過ごす方が、外出するより充実感を感じる',
    axis: 'EI',
    direction: 'second',
  },
  // Q38: SN軸 - N方向
  {
    id: 38,
    text: '物事の表面より、その背後にある意味やつながりを探ることが好きだ',
    axis: 'SN',
    direction: 'second',
  },
  // Q39: TF軸 - F方向
  {
    id: 39,
    text: '誰かが感情的に傷ついている場面では、事実の整理より共感が先に出る',
    axis: 'TF',
    direction: 'second',
  },
  // Q40: JP軸 - P方向
  {
    id: 40,
    text: '新しい情報が入ったら、決めた計画を変えることにそれほど抵抗を感じない',
    axis: 'JP',
    direction: 'second',
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
export function getQuestionsByAxis(axis: MBTIAxis): MBTIQuestion[] {
  return questions.filter((q) => q.axis === axis);
}

/** 全軸 */
export const axes: MBTIAxis[] = ['EI', 'SN', 'TF', 'JP'];
