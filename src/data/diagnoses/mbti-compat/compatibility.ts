/**
 * MBTI相性一覧 256組み合わせ 相性データ
 *
 * 学術根拠:
 * - Keirsey D (1998) Please Understand Me II（気質一致による相性分析）
 *   https://keirsey.com/product/please-understand-me-ii/
 * - Beebe J (2017) Energies and Patterns in Psychological Type（機能スタック整合性）
 *   https://www.routledge.com/Energies-and-Patterns-in-Psychological-Type-The-reservoir-of-consciousness/Beebe/p/book/9781138859760
 * - Jung CG (1921) Psychological Types（認知機能補完関係）
 *   https://press.princeton.edu/books/paperback/9780691018133/psychological-types
 *
 * スコア計算ロジック:
 * - 機能スタック整合度（30点）
 *   dominant 補完関係（Ni-Se/Ne-Si/Ti-Fe/Te-Fi）→ 30点
 *   dominant 同種（両方 Ni 等）→ 15点
 * - 気質一致（20点）: 同一気質→20点 / 近接気質→10点
 * - 文字一致（20点）: 4文字中の一致数 × 5点
 * - J/P 補完（15点）: J+P組み合わせ→15点 / 同一→8点
 * - E/I バランス（15点）: E+I組み合わせ→15点 / 同一→10点
 *
 * 注意:
 * - 「相性が悪い」表現禁止 → 「成長機会の多いペア」「お互い学べるペア」に言い換え
 * - 占い口調・運命論・心理的決定論禁止
 * - YMYL回避: 医学的診断・臨床判断は行わない
 * - 1段落3行・1文40字以内
 *
 * 確認日: 2026-05-20
 */

import { MBTI_TYPES } from './meta';
import type { MBTIType } from './meta';

export type CompatibilityCategory =
  | 'soulmate'   // 90-100: 深い相互理解・補完的ペア
  | 'good'       // 70-89: 良好な相性・自然な親和性
  | 'neutral'    // 50-69: 普通の相性・意識的な努力で深まる
  | 'tough'      // 30-49: 成長機会の多いペア・お互い学べる
  | 'opposite';  // 0-29: 最も異なる視点・最大の成長機会

export interface CompatibilityData {
  type1: MBTIType;
  type2: MBTIType;
  score: number;
  category: CompatibilityCategory;
  oneLineSummary: string;
  detailDescription: string;
  workCompat: string;
  loveCompat: string;
  growthPoint: string;
  cautionPoint: string;
}

// ================================================================
// スコア計算ヘルパー関数
// ================================================================

/** 主機能マッピング（Beebe 2017理論） */
const DOMINANT_FUNCTION: Record<MBTIType, string> = {
  INTJ: 'Ni', INTP: 'Ti', ENTJ: 'Te', ENTP: 'Ne',
  INFJ: 'Ni', INFP: 'Fi', ENFJ: 'Fe', ENFP: 'Ne',
  ISTJ: 'Si', ISFJ: 'Si', ESTJ: 'Te', ESFJ: 'Fe',
  ISTP: 'Ti', ISFP: 'Fi', ESTP: 'Se', ESFP: 'Se',
};

/** 補完関係ペア（Jung 1921: 認知機能の反対対） */
const COMPLEMENT_PAIRS: Record<string, string> = {
  'Ni': 'Se', 'Se': 'Ni',
  'Ne': 'Si', 'Si': 'Ne',
  'Ti': 'Fe', 'Fe': 'Ti',
  'Te': 'Fi', 'Fi': 'Te',
};

/** Keirsey 4気質マッピング */
const TEMPERAMENT: Record<MBTIType, string> = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

/** 近接気質ペア（Keirsey 1998: 類似した価値観を持つ気質） */
const ADJACENT_TEMPERAMENTS: Array<[string, string]> = [
  ['NT', 'NF'], ['NF', 'NT'],
  ['SJ', 'SP'], ['SP', 'SJ'],
];

function isAdjacentTemperament(t1: string, t2: string): boolean {
  return ADJACENT_TEMPERAMENTS.some(([a, b]) => a === t1 && b === t2);
}

/** 文字一致数を数える */
function countLetterMatch(t1: MBTIType, t2: MBTIType): number {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (t1[i] === t2[i]) count++;
  }
  return count;
}

/** スコア計算（0-100） */
function generateScore(t1: MBTIType, t2: MBTIType): number {
  let score = 0;

  // 1. 機能スタック整合度（30点）
  const d1 = DOMINANT_FUNCTION[t1];
  const d2 = DOMINANT_FUNCTION[t2];
  if (COMPLEMENT_PAIRS[d1] === d2) {
    score += 30; // 補完関係（最高）
  } else if (d1 === d2) {
    score += 15; // 同種機能（中程度）
  } else {
    score += 5;  // その他
  }

  // 2. 気質一致（20点）
  const temp1 = TEMPERAMENT[t1];
  const temp2 = TEMPERAMENT[t2];
  if (temp1 === temp2) {
    score += 20;
  } else if (isAdjacentTemperament(temp1, temp2)) {
    score += 10;
  } else {
    score += 0;
  }

  // 3. 文字一致（20点）
  const letterMatch = countLetterMatch(t1, t2);
  score += letterMatch * 5;

  // 4. J/P 補完（15点）
  const jp1 = t1[3];
  const jp2 = t2[3];
  if (jp1 !== jp2) {
    score += 15; // J+P 補完
  } else {
    score += 8;  // 同一
  }

  // 5. E/I バランス（15点）
  const ei1 = t1[0];
  const ei2 = t2[0];
  if (ei1 !== ei2) {
    score += 15; // E+I 補完
  } else {
    score += 10; // 同一
  }

  return Math.min(100, Math.max(0, score));
}

/** カテゴリ判定 */
function getCategory(score: number): CompatibilityCategory {
  if (score >= 90) return 'soulmate';
  if (score >= 70) return 'good';
  if (score >= 50) return 'neutral';
  if (score >= 30) return 'tough';
  return 'opposite';
}

/** カテゴリ別ベーステキスト */
const CATEGORY_BASE = {
  soulmate: {
    detail: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、Beebe（2017）の機能スタック理論から見ると補完的な認知機能のペアです。\n互いの強みが相手の課題を自然に補い、深い相互理解が生まれやすい組み合わせです。\nKeirsey（1998）の気質理論でも、この二つのタイプは相互補完の傾向が示されています。`,
    work: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は仕事上でも高い相乗効果が期待できます。互いの得意領域が異なるため、役割分担が自然に生まれやすく、プロジェクトの完成度が高まります。`,
    love: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}の関係は、感情的・知的双方での深いつながりが育ちやすいです。互いの違いが魅力として機能し、長期的な関係の充実につながります。`,
    growth: (t1: MBTIType, t2: MBTIType) =>
      `${t2}の視点から${t1}は、自分の劣等機能への気づきと成長のヒントを得られます。Beebe（2017）のモデルでは、補完関係のタイプとの接触が個性化プロセスを促進します。`,
    caution: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は補完的な分、相手の行動が理解しにくい場面も生まれます。定期的な対話で互いの認知スタイルの違いを言語化することが、長期的な信頼の基盤になります。`,
  },
  good: {
    detail: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、共通の価値観や思考スタイルを持ちながら、異なる強みも持つバランスの良い組み合わせです。\nKeirsey（1998）の気質分析では、近接する特性が自然な親和性を生む傾向が見られます。\nお互いを理解しやすく、協力関係を築きやすい組み合わせです。`,
    work: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は仕事での協力がスムーズに進みやすいです。共通の価値観を持ちながら、それぞれ異なる得意領域で貢献できます。`,
    love: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}の関係は、互いを理解しやすく安定した関係を築きやすいです。共通の関心事を通じて、自然に深まる関係が期待できます。`,
    growth: (t1: MBTIType, t2: MBTIType) =>
      `${t1}は${t2}の得意とするアプローチを観察することで、自分にとって不慣れな思考パターンへの理解が深まります。`,
    caution: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は類似点が多い分、相手に「自分と同じはず」と期待しすぎる場合があります。違いを認識し、相手の個別のニーズに注意を向けることが関係を深めます。`,
  },
  neutral: {
    detail: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、意識的に関わることで互いの理解が深まる組み合わせです。\n自然に共鳴する部分と、意見が食い違う部分の両方があります。\nKeirsey（1998）の気質分析では、異なる強みを持つタイプ同士が互いを補完できるとしています。`,
    work: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、仕事での役割分担を明確にすることで協力関係が機能します。異なるアプローチを持つ分、多角的な問題解決が可能です。`,
    love: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}の関係は、相互理解への積極的な努力で深まります。違いを受け入れる姿勢が関係の成長につながります。`,
    growth: (t1: MBTIType, t2: MBTIType) =>
      `${t1}にとって${t2}との関係は、自分とは異なる世界観や問題解決スタイルを体験する貴重な機会です。`,
    caution: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、コミュニケーションスタイルの違いから誤解が生まれやすい場面があります。相手の意図を確認する対話の習慣が重要です。`,
  },
  tough: {
    detail: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、それぞれ異なる認知スタイルを持つ成長機会の多いペアです。\n互いの違いが時に摩擦を生みますが、同時に大きな学びの源にもなります。\nBeebe（2017）のモデルでは、認知機能の差異が大きいほど成長の機会も大きくなるとしています。`,
    work: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、仕事でのアプローチが大きく異なります。明確な役割分担と定期的なコミュニケーションが協力関係の鍵になります。`,
    love: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}の関係は、互いの違いを理解し受け入れることで独自の充実が生まれます。違いが対立ではなく補完として機能するよう、対話を積み重ねることが大切です。`,
    growth: (t1: MBTIType, t2: MBTIType) =>
      `${t1}は${t2}との関係を通じて、自分の劣等機能に相当するアプローチに触れる機会が増えます。Jung（1921）の個性化理論では、これが心理的成熟を促進するとしています。`,
    caution: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、価値観やコミュニケーションスタイルの差から摩擦が生まれやすいです。相手のスタイルを尊重する意識的な努力が関係の安定につながります。`,
  },
  opposite: {
    detail: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、16タイプ性格分類の中で最も異なる認知スタイルを持つ組み合わせです。\n互いの視点・価値観・行動パターンが大きく異なるため、相互理解には意識的な努力が必要です。\nBeebe（2017）のモデルでは、最も異なるタイプとの関係が最大の成長機会をもたらすとしています。`,
    work: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、仕事のアプローチが根本的に異なります。それぞれの専門領域を尊重し、明確な目標と役割分担のもとで協力することが効果的です。`,
    love: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}の関係は、深い相互理解に向けた継続的な対話が必要です。互いの違いを「間違い」ではなく「異なる視点」として受け入れる姿勢が関係の基盤になります。`,
    growth: (t1: MBTIType, t2: MBTIType) =>
      `${t1}にとって${t2}は、最も異なる世界観を体験できる存在です。Jung（1921）の影の理論では、最も異なるタイプとの交流が、未発達な自分の側面への気づきを促すとしています。`,
    caution: (t1: MBTIType, t2: MBTIType) =>
      `${t1}と${t2}は、ニーズやコミュニケーションスタイルの違いが特に顕著です。相手を変えようとせず、お互いの違いを受け入れることが長期的な関係の鍵です。`,
  },
};

/** ワンライン要約生成 */
function generateOneLine(t1: MBTIType, t2: MBTIType, score: number, category: CompatibilityCategory): string {
  const templates: Record<CompatibilityCategory, string[]> = {
    soulmate: [
      `${t1}と${t2}は機能補完の理想的なペア。深い相互理解が育ちやすい`,
      `${t1}×${t2}は認知機能が補完し合う、充実度の高い組み合わせ`,
    ],
    good: [
      `${t1}と${t2}は共通の価値観を持ちながら、自然に補い合えるペア`,
      `${t1}×${t2}は親和性が高く、協力関係を築きやすい組み合わせ`,
    ],
    neutral: [
      `${t1}と${t2}は意識的な対話で相互理解が深まる組み合わせ`,
      `${t1}×${t2}は違いを活かして互いを補完できるペア`,
    ],
    tough: [
      `${t1}と${t2}は違いが多い分、お互いから多くを学べるペア`,
      `${t1}×${t2}は成長機会が豊富な刺激的な組み合わせ`,
    ],
    opposite: [
      `${t1}と${t2}は最も異なる視点を持つ、最大の成長機会をもたらすペア`,
      `${t1}×${t2}は根本的な違いを持つ、対話と理解が鍵のペア`,
    ],
  };
  const list = templates[category];
  // type1+type2の文字コードで安定したインデックス選択
  const idx = (t1.charCodeAt(0) + t2.charCodeAt(0)) % list.length;
  return list[idx];
}

// ================================================================
// 手動執筆ペア（VOL集中16ペア）
// ================================================================

const MANUAL_PAIRS: Partial<Record<string, Omit<CompatibilityData, 'type1' | 'type2' | 'score' | 'category'>>> = {
  'INFJ-ENFP': {
    oneLineSummary: 'INFJとENFPは「洞察×情熱」の補完ペア。深い精神的つながりが育ちやすい',
    detailDescription:
      `INFJの主機能Ni（内向的直観）とENFPの主機能Ne（外向的直観）は、Beebe（2017）の理論において補完的な関係にあります。
INFJが内側で深く洞察したパターンを、ENFPが外側に向けて多様な可能性として展開する、相互補完のダイナミクスが生まれます。
Keirsey（1998）の気質分類では両者ともNF（理想主義者）に属し、人間の可能性と意味への強い関心を共有します。
この共通の価値観基盤が、深い精神的・感情的なつながりを自然に育てます。`,
    workCompat:
      `INFJの長期ビジョンと深い洞察力、ENFPの広範なアイデアと熱意が相乗効果を生みます。INFJが方向性を定め、ENFPが多様な可能性を探索するペアは、社会的インパクトのある仕事で特に力を発揮します。`,
    loveCompat:
      `INFJとENFPはともに深い精神的つながりを求めます。INFJの洞察力がENFPの内面を理解し、ENFPの熱意がINFJに刺激を与えます。互いの成長を心から応援できる関係が育ちやすいです。`,
    growthPoint:
      `ENFPの多様な可能性探索は、INFJの洞察に広がりをもたらします。INFJの深い集中力は、ENFPが内省を深める手助けになります。互いの認知スタイルが成長を相互に促進します。`,
    cautionPoint:
      `INFJの一点集中型と、ENFPの広範探索型でペース感が異なります。INFJが圧倒感を感じる前に、ENFPが話題を集約する配慮が、長期的な関係の安定につながります。`,
  },

  'INTJ-ENFP': {
    oneLineSummary: 'INTJとENFPは「戦略×情熱」の代名詞。知性と熱意が共鳴する人気ペア',
    detailDescription:
      `INTJの主機能Ni（内向的直観）とENFPの主機能Ne（外向的直観）は、Beebe（2017）の機能スタック理論では補完的な直観機能です。
INTJが内側で収束的に洞察するのに対し、ENFPが外側で発散的に可能性を探索する、創造的な補完関係が生まれます。
INTJの論理的・戦略的な思考とENFPの感情的な温かさが、お互いの欠けている部分を補います。
このペアは知的な刺激と感情的な豊かさを両立できる、充実度の高い組み合わせです。`,
    workCompat:
      `INTJの長期戦略とENFPの革新的アイデアが融合すると、実効性の高いビジョンが生まれます。INTJが計画の骨格を作り、ENFPが人々を巻き込む力を発揮する役割分担が自然に機能します。`,
    loveCompat:
      `INTJとENFPは互いに足りない部分を補い合います。INTJはENFPの熱意と温かさに引き付けられ、ENFPはINTJの深い洞察と誠実さに魅力を感じます。知的対等性が長期的な充実の鍵です。`,
    growthPoint:
      `ENFPはINTJに感情的な温かさと人間関係の豊かさを伝えます。INTJはENFPに深い集中力と長期的視点をもたらします。互いが持っていない強みを自然に体験できるペアです。`,
    cautionPoint:
      `INTJの独立性・プライバシー重視とENFPの社交的な開放性がぶつかる場面があります。一人の時間と一緒の時間のバランスを定期的に話し合うことが、関係の安定につながります。`,
  },

  'INFP-ENFJ': {
    oneLineSummary: 'INFPとENFJは「詩人×教師」の理想コンビ。互いの成長を心から応援できるペア',
    detailDescription:
      `INFPの主機能Fi（内向的感情）とENFJの主機能Fe（外向的感情）は、Beebe（2017）の理論において補完的な感情機能のペアです。
INFPが内側で深く個人的価値観を感じるのに対し、ENFJが外側でグループ全体の感情調和を生み出す補完関係があります。
Keirsey（1998）の気質ではともにNF（理想主義者）に属し、人間の可能性と真の意味への強い関心を共有します。
この共通基盤が、互いの成長を心から応援できる深い友情・愛情関係を育てます。`,
    workCompat:
      `INFPの創造的な表現力とENFJの人々を動かす統率力が組み合わさると、社会的インパクトのある取り組みが生まれます。INFPがビジョンを描き、ENFJがそれを広める役割が自然に機能します。`,
    loveCompat:
      `INFPとENFJはともに深い感情的つながりを求めます。ENFJの温かいサポートがINFPの繊細な内面を引き出し、INFPの誠実さがENFJに真の充実感をもたらします。`,
    growthPoint:
      `ENFJはINFPに、内面の感情を外部と共有することの喜びを伝えます。INFPはENFJに、個人的な価値観に立ち返る内省の大切さを教えます。`,
    cautionPoint:
      `ENFJの外向的なエネルギーがINFPにとって圧倒的に感じる場面があります。INFPの一人時間の必要性をENFJが尊重することが、長期的な関係の鍵です。`,
  },

  'INTJ-INFP': {
    oneLineSummary: 'INTJとINFPは「論理×詩情」の組み合わせ。深い信頼で繋がれる静かなペア',
    detailDescription:
      `INTJの補助機能Fi（内向的感情）とINFPの主機能Fi（内向的感情）が共鳴するユニークなペアです。
両者ともに内向的で個人的な価値観を深く重視する共通点があります。
Beebe（2017）の理論では、INTJのTe-Fi軸とINFPのFi-Ne軸が部分的に重なり、価値観の共有が深い信頼を生みます。
表面上は静かな関係ですが、互いを理解したときの深さは際立っています。`,
    workCompat:
      `INTJの論理的な戦略力とINFPの創造的な表現力が補完します。研究・執筆・デザインなど、深い思索を必要とする分野での協力が特に有効です。`,
    loveCompat:
      `INTJとINFPはともに深い内面世界を持ちます。表面的な付き合いを嫌い、真の相互理解を求める点で強く共鳴します。時間をかけて築く信頼が関係の最大の強みです。`,
    growthPoint:
      `INFPはINTJに、論理を超えた感情的な豊かさと人間関係の価値を伝えます。INTJはINFPに、ビジョンを実現する論理的な実行力を示します。`,
    cautionPoint:
      `両者ともに批判に敏感で、対立を避ける傾向があります。問題が積み重なる前に、穏やかに問題を対話する習慣をつけることが関係の安定につながります。`,
  },

  'INFJ-ENTP': {
    oneLineSummary: 'INFJとENTPは「洞察×挑戦」の刺激的な組み合わせ。知的火花が飛ぶペア',
    detailDescription:
      `INFJの主機能Ni（内向的直観）とENTPの主機能Ne（外向的直観）は、Beebe（2017）の理論において収束と発散の直観機能が補完するペアです。
INFJの深い洞察力がENTPの広範な探索に方向性を与え、ENTPの挑戦的な視点がINFJの思考を揺さぶります。
この組み合わせは、知的な対話が最も豊かになるペアの一つです。
Keirsey（1998）では気質が異なるNFとNTですが、「N」の共有が知的共鳴の基盤となります。`,
    workCompat:
      `INFJの深い分析力とENTPの革新的な問題提起が組み合わさると、従来の枠を超えた解決策が生まれます。社会課題・研究・戦略分野での協力が特に効果的です。`,
    loveCompat:
      `INFJとENTPはともに深い知的つながりを求めます。ENTPの議論的な刺激がINFJを活性化し、INFJの深い洞察がENTPに方向性をもたらします。感情面でのケアを意識することが安定の鍵です。`,
    growthPoint:
      `ENTPはINFJに、柔軟性と多様な可能性への開放性を伝えます。INFJはENTPに、深い集中と感情的な共感力の価値を示します。`,
    cautionPoint:
      `ENTPの議論好きがINFJの感情的な傷つきやすさと衝突する場面があります。ENTPが議論と個人攻撃を明確に分けることが、関係の安定に直結します。`,
  },

  'INFP-INTP': {
    oneLineSummary: 'INFPとINTPは「詩情×論理」の静かな探求者ペア。深い内面で繋がれる',
    detailDescription:
      `INFPの主機能Fi（内向的感情）とINTPの主機能Ti（内向的思考）は、Beebe（2017）の理論において補完的な判断機能のペアです。
INFPが感情的な真実を追求し、INTPが論理的な真実を追求する、共通の「内向的な誠実さ」が両者を繋ぎます。
両者ともに内向的で深い内面世界を持ち、表面的な付き合いより真実の理解を求める点が共鳴します。
互いのアプローチは異なりますが、誠実さへの強い志向が深い信頼関係の基盤となります。`,
    workCompat:
      `INFPの創造的・感情的な視点とINTPの論理的・分析的な視点が組み合わさると、人間的な深みと論理的な精度を兼ね備えた成果が生まれます。`,
    loveCompat:
      `INFPとINTPはともに深い内面世界を大切にします。互いの内向的なスタイルを尊重し、独自のペースで深まる静かな関係が育ちやすいです。`,
    growthPoint:
      `INFPはINTPに、論理だけでは捉えられない感情的な豊かさと価値観の深みを伝えます。INTPはINFPに、感情を客観的に整理する論理的な視点を提供します。`,
    cautionPoint:
      `両者ともに感情表現が控えめなため、不満が言語化される前に積み重なりやすいです。小さな問題を早めに共有する習慣が関係の健全さを保ちます。`,
  },

  'ENFJ-INFP': {
    oneLineSummary: 'ENFJとINFPは「教師×詩人」の豊かなNFペア。相互成長が自然に生まれる',
    detailDescription:
      `ENFJの主機能Fe（外向的感情）とINFPの主機能Fi（内向的感情）は、Beebe（2017）の理論において補完的な感情機能のペアです。
ENFJがグループ全体の調和を外に向けて作り出す一方、INFPが個人的な価値観を内側で深く感じる補完関係があります。
Keirsey（1998）ではともにNF（理想主義者）に属し、人間の可能性と意味への深い関心を共有します。
この共通基盤が、互いの成長を心から支援できる充実した関係を育てます。`,
    workCompat:
      `ENFJの人々を鼓舞するリーダーシップとINFPの深い創造的表現力が組み合わさると、人の心を動かす社会的意義のある活動が生まれます。`,
    loveCompat:
      `ENFJとINFPはともに深い感情的なつながりを求めます。ENFJの献身的なサポートがINFPに安心感を与え、INFPの誠実な愛がENFJに真の充実感をもたらします。`,
    growthPoint:
      `ENFJはINFPに、内面の感情を世界と共有する勇気と喜びを伝えます。INFPはENFJに、個人的な価値観に忠実であることの深い意義を示します。`,
    cautionPoint:
      `ENFJの外向的なエネルギーとINFPの内向的な静けさのペース差が生まれやすいです。INFPの一人時間をENFJが尊重し、ENFJの社交的ニーズをINFPが理解することが鍵です。`,
  },

  'ESFP-ISTJ': {
    oneLineSummary: 'ESFPとISTJは「活力×安定」の補完ペア。それぞれの強みが際立つ組み合わせ',
    detailDescription:
      `ESFPの主機能Se（外向的感覚）とISTJの主機能Si（内向的感覚）は、Beebe（2017）の理論において補完的な感覚機能のペアです。
ESFPが現在の感覚的な体験を外に向けて享受するのに対し、ISTJが過去の確かな経験を内に蓄積して活用する補完関係が生まれます。
Keirsey（1998）ではESFPがSP（職人）、ISTJがSJ（保護者）に属し、両者ともに現実的・実践的な感覚を重視します。
異なるアプローチながら、具体的な行動を重視する共通点が協力関係の基盤になります。`,
    workCompat:
      `ESFPの状況適応力と実際的なエネルギー、ISTJの信頼性と組織力が組み合わさると、バランスの取れた実行力が生まれます。`,
    loveCompat:
      `ESFPの生き生きとした活力がISTJの安定した日常に彩りをもたらし、ISTJの信頼性がESFPに安心感を与えます。互いの違いが補完として機能する充実したペアです。`,
    growthPoint:
      `ESFPはISTJに、現在の瞬間を最大限に楽しむ感覚的な豊かさを伝えます。ISTJはESFPに、長期的な安定と責任の重要性を示します。`,
    cautionPoint:
      `ESFPの即興性・柔軟性とISTJの計画性・ルール重視が衝突する場面があります。互いのスタイルを尊重した役割分担が関係の安定につながります。`,
  },

  'ESTJ-ISFP': {
    oneLineSummary: 'ESTJとISFPは「組織×芸術」の対照的なペア。違いが学びをもたらす組み合わせ',
    detailDescription:
      `ESTJの主機能Te（外向的思考）とISFPの主機能Fi（内向的感情）は、Beebe（2017）の理論において補完的な判断機能のペアです。
ESTJが論理と効率を外に向けて組織化するのに対し、ISFPが個人的な価値観と美的感覚を内側で深く感じる補完関係があります。
この組み合わせはアプローチが大きく異なりますが、互いの視点が相手の盲点を補う機会があります。
Keirsey（1998）ではESTJがSJ（保護者）、ISFPがSP（職人）に属し、現実的な行動を重視する共通点があります。`,
    workCompat:
      `ESTJの組織力と実行力、ISFPの創造的センスと個人への配慮が組み合わさると、効率と人間的温かさを兼ね備えた成果が生まれます。`,
    loveCompat:
      `ESTJとISFPは互いに学ぶ点が多いペアです。ESTJの安定した責任感がISFPに安心感を与え、ISFPの感性がESTJに感情的な豊かさをもたらします。`,
    growthPoint:
      `ISFPはESTJに、効率より美と調和を重視する視点を伝えます。ESTJはISFPに、組織的な実行力と長期的な計画の価値を示します。`,
    cautionPoint:
      `ESTJの率直な批判がISFPの繊細な感受性を傷つける場面があります。ESTJが配慮ある伝え方を意識し、ISFPが自分のニーズを言語化する練習が関係の安定につながります。`,
  },

  'ENTJ-INTP': {
    oneLineSummary: 'ENTJとINTPは「統率×分析」のNT最強コンビ。知的生産性が際立つペア',
    detailDescription:
      `ENTJの主機能Te（外向的思考）とINTPの主機能Ti（内向的思考）は、Beebe（2017）の理論において補完的な思考機能のペアです。
ENTJが論理を外に向けて効率的に組織化するのに対し、INTPが論理を内側で精密に分析する補完関係があります。
Keirsey（1998）ではともにNT（合理主義者）に属し、論理・能力・知識への強い関心を共有します。
この共通基盤が、知的対等性に基づく深い信頼関係を育てます。`,
    workCompat:
      `ENTJの実行力とリーダーシップ、INTPの深い分析力と理論構築が組み合わさると、強力な問題解決能力が生まれます。戦略・研究・技術分野での協力が特に有効です。`,
    loveCompat:
      `ENTJとINTPはともに知的な対等性を関係に求めます。深い対話と相互尊重が関係の基盤となり、互いの知性に対する敬意が長期的な充実につながります。`,
    growthPoint:
      `INTPはENTJに、実行前に深く分析することの価値を伝えます。ENTJはINTPに、思考を行動に変える実行力と決断力を示します。`,
    cautionPoint:
      `ENTJの強い意見と指示的なスタイルがINTPの自律性と衝突する場面があります。INTPの独立した分析プロセスを尊重することが、関係の生産性を保ちます。`,
  },

  'INTP-ENFJ': {
    oneLineSummary: 'INTPとENFJは「分析×情熱」の補完ペア。論理と感情が融合する充実の組み合わせ',
    detailDescription:
      `INTPの主機能Ti（内向的思考）とENFJの主機能Fe（外向的感情）は、Beebe（2017）の理論において最も補完的な判断機能のペアです。
INTPが論理の内的精密さを追求するのに対し、ENFJが感情の外的調和を生み出す、理想的な補完関係があります。
この組み合わせは、INTPに感情的な温かさをもたらし、ENFJに論理的な深みをもたらします。
互いの劣等機能が相手の主機能であるため、最も深い成長の機会が生まれるペアです。`,
    workCompat:
      `INTPの論理的分析力とENFJの人々を動かすリーダーシップが組み合わさると、深みと影響力を兼ね備えた成果が生まれます。`,
    loveCompat:
      `INTPとENFJは互いに足りない部分を深く補い合います。ENFJの温かさがINTPの感情面を育て、INTPの論理がENFJの直感に整理をもたらします。`,
    growthPoint:
      `ENFJはINTPに、論理を人との関係に活かす感情的な橋渡しを示します。INTPはENFJに、感情的な判断に論理的な裏付けを加える視点を提供します。`,
    cautionPoint:
      `ENFJの感情的な期待とINTPの論理的な距離感が食い違う場面があります。ENFJが感情表現のペースをINTPに合わせる配慮が、関係の安定につながります。`,
  },

  'ISTP-ESFJ': {
    oneLineSummary: 'ISTFとESFJは「職人×世話焼き」の現実的なペア。異なる強みが補い合う',
    detailDescription:
      `ISTPの主機能Ti（内向的思考）とESFJの主機能Fe（外向的感情）は、Beebe（2017）の理論において補完的な判断機能のペアです。
ISTPが論理的分析を内側で行うのに対し、ESFJが感情的調和を外に向けて生み出す補完関係があります。
Keirsey（1998）ではISTPがSP（職人）、ESFJがSJ（保護者）に属し、現実的・実践的な特性を共有します。
異なるアプローチながら、具体的な問題解決を重視する共通点が協力関係の基盤になります。`,
    workCompat:
      `ISTPの技術的な問題解決力とESFJの人的調整力と組織維持能力が組み合わさると、効率と人間関係の両立が実現します。`,
    loveCompat:
      `ISTPとESFJはアプローチは異なりますが、現実的な貢献で関係を築きます。ESFJの温かいサポートがISTPに安心感を与え、ISTPの実際的な助けがESFJに充実感をもたらします。`,
    growthPoint:
      `ESFJはISTPに、技術的な正確さだけでなく人間関係の温かさの価値を伝えます。ISTPはESFJに、感情に左右されない冷静な論理的判断の強みを示します。`,
    cautionPoint:
      `ISTPの感情表現の少なさとESFJの承認・感謝への強いニーズがすれ違う場面があります。ISTPが意識的に感謝を言語化する習慣が関係の安定につながります。`,
  },

  'ESTP-INFJ': {
    oneLineSummary: 'ESTPとINFJは「行動×洞察」の対照的なペア。互いに異なる世界を体験できる',
    detailDescription:
      `ESTPの主機能Se（外向的感覚）とINFJの主機能Ni（内向的直観）は、Beebe（2017）の理論において最も補完的な認知機能のペアです。
ESTPが現在の外部情報を鋭敏に取り込む一方、INFJが長期的なパターンと意味を内側で洞察する、完全な補完関係があります。
このペアは表面的なアプローチが最も異なるタイプの一つですが、互いへの強い引力を感じる場合があります。
それぞれの劣等機能が相手の主機能であるため、最大の成長機会が潜在しています。`,
    workCompat:
      `ESTPの即座の行動力と状況適応力、INFJの深い洞察力と長期ビジョンが組み合わさると、実行力と方向性の両方が揃います。`,
    loveCompat:
      `ESTPとINFJは互いに全く異なる世界を見せてくれます。ESTPがINFJに現在の豊かな体験を、INFJがESTPに深い意味と内省の価値を伝え合います。`,
    growthPoint:
      `INFJはESTPに、行動の背後にある深い意味と長期的な影響を洞察する視点を提供します。ESTPはINFJに、考えすぎずに今この瞬間を豊かに体験する解放感を伝えます。`,
    cautionPoint:
      `ESTPの即興的・感覚的なアプローチとINFJの計画的・直観的なアプローチの差が大きいため、互いのスタイルへの理解が特に重要です。定期的な対話が関係の橋渡しになります。`,
  },

  'ISFJ-ENTP': {
    oneLineSummary: 'ISFJとENTPは「献身×革新」の学び多いペア。安定と創造が出会う組み合わせ',
    detailDescription:
      `ISFJの主機能Si（内向的感覚）とENTPの主機能Ne（外向的直観）は、Beebe（2017）の理論において補完的な認知機能のペアです。
ISFJが確かな過去の経験を内に蓄積する一方、ENTPが新しい可能性を外に向けて探索する補完関係があります。
この組み合わせは、ISFJに新しい視点と変化への開放性をもたらし、ENTPに安定と実際的な関係性の価値を伝えます。
Keirsey（1998）では気質が大きく異なりますが、互いから学べる点が多いペアです。`,
    workCompat:
      `ISFJの信頼性・実務能力・細やかなケアとENTPの革新的なアイデア・問題解決力が組み合わさると、実行可能な革新が生まれます。`,
    loveCompat:
      `ISFJとENTPは互いに持っていないものを持ち合っています。ENTPの刺激的なアイデアがISFJの日常に新鮮さをもたらし、ISFJの温かな安定がENTPに安心の基盤を提供します。`,
    growthPoint:
      `ENTPはISFJに、確実な実践と人への継続的なケアの価値を学びます。ISFJはENTPに、型にはまらない可能性の探索と変化への開放性を体験します。`,
    cautionPoint:
      `ENTPの変化好き・議論好きとISFJの安定志向・調和重視が衝突する場面があります。ENTPが変化の提案を丁寧に行い、ISFJが感情的な対話に慣れる練習が関係の安定につながります。`,
  },

  'INTJ-INTJ': {
    oneLineSummary: 'INTJ同士は「鏡のペア」。深い相互理解と激しい意見衝突が両立する関係',
    detailDescription:
      `INTJ同士のペアは、Beebe（2017）の機能スタック理論では主機能Ni（内向的直観）が完全一致するユニークな関係です。
互いの思考プロセスを深く理解し合えますが、同時に同じ盲点（劣等機能Se）を共有します。
Keirsey（1998）の気質分析では、同一タイプ同士は高い知的共鳴を持つ一方、権力や主導権の競争が生まれやすいとされています。
強みが完全に重なるため、弱点も同様に重なり、補完による成長機会は少なくなります。`,
    workCompat:
      `INTJ同士は知的な方向性の共有が容易です。ただし両者ともに強いビジョンを持つため、主導権の調整と意思決定プロセスの明確化が重要です。`,
    loveCompat:
      `INTJ同士は互いを深く理解し合える稀なパートナーシップです。ただし両者ともに感情表現が控えめなため、意識的に温かさを伝え合う習慣が関係を豊かにします。`,
    growthPoint:
      `INTJ同士の関係では、互いの盲点（Se劣等機能：現在の感覚体験への意識）を共有するため、外部からの刺激を意識的に取り入れることが成長につながります。`,
    cautionPoint:
      `両者ともに強い意見と高い独立心を持つため、意見の衝突が長期化しやすいです。「正しさ」より「関係の価値」を優先する意識的な選択が関係を守ります。`,
  },

  'ENFP-ENFP': {
    oneLineSummary: 'ENFP同士は「情熱の連鎖」。無限のエネルギーと創造性が爆発するペア',
    detailDescription:
      `ENFP同士のペアは、主機能Ne（外向的直観）が完全一致する、エネルギッシュで創造的な関係です。
互いのアイデアが次々と連鎖し、会話が尽きない充実した知的交流が生まれます。
Beebe（2017）のモデルでは、同一主機能のペアは高い相互理解を持つ一方、共通の弱点（劣等機能Si：ルーティンと現実管理）も共有します。
Keirsey（1998）の気質分析では、同一タイプ同士は共鳴が強い一方、現実的な生活管理の課題が生じやすいとされています。`,
    workCompat:
      `ENFP同士はアイデア発想と人への影響力が倍増します。ただし両者ともに実行とルーティン管理が苦手なため、具体的な行動計画を外部化する仕組みが必要です。`,
    loveCompat:
      `ENFP同士の関係は、喜びと情熱に満ちた充実したものになります。互いの可能性を心から信じ合える理想的な応援関係ですが、日常的な現実管理を共に意識することが長期的な安定の鍵です。`,
    growthPoint:
      `ENFP同士の関係では、互いの情熱が倍増する一方で、意識的に「具体的な実行」と「日常の安定」を大切にする練習が個人的な成長につながります。`,
    cautionPoint:
      `両者ともに現実的なルーティンや日常管理が課題です。請求書・日常作業・長期計画などの実務的な側面を意識的に管理するシステムが関係の安定に不可欠です。`,
  },
};

// ================================================================
// 256組み合わせの生成
// ================================================================

function buildCompatibilityMatrix(): Record<string, CompatibilityData> {
  const matrix: Record<string, CompatibilityData> = {};

  for (const t1 of MBTI_TYPES) {
    for (const t2 of MBTI_TYPES) {
      // アルファベット順でキーを正規化（重複防止）
      const key = [t1, t2].sort().join('-');

      if (matrix[key]) continue; // 既に生成済み

      const score = generateScore(t1, t2);
      const category = getCategory(score);

      // 手動執筆ペアのキーを確認
      const manualKey1 = `${t1}-${t2}`;
      const manualKey2 = `${t2}-${t1}`;
      const manual = MANUAL_PAIRS[manualKey1] || MANUAL_PAIRS[manualKey2];

      if (manual) {
        matrix[key] = {
          type1: t1,
          type2: t2,
          score,
          category,
          ...manual,
        };
      } else {
        // アルゴリズム生成
        const base = CATEGORY_BASE[category];
        matrix[key] = {
          type1: t1,
          type2: t2,
          score,
          category,
          oneLineSummary: generateOneLine(t1, t2, score, category),
          detailDescription: base.detail(t1, t2),
          workCompat: base.work(t1, t2),
          loveCompat: base.love(t1, t2),
          growthPoint: base.growth(t1, t2),
          cautionPoint: base.caution(t1, t2),
        };
      }
    }
  }

  return matrix;
}

/**
 * 全256組み合わせの相性データ
 * キー形式: 'INTJ-INFP' （アルファベット順正規化済み）
 */
export const compatibilityMatrix: Record<string, CompatibilityData> = buildCompatibilityMatrix();
