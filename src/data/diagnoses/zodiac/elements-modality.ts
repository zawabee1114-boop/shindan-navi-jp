/**
 * 星座性格診断 4エレメント + 3モダリティ解説データ
 *
 * 学術根拠:
 * - プトレマイオス『テトラビブロス』（2世紀）: 4エレメント分類の古典的基盤
 * - Rudhyar D (1970) "The Planetarization of Consciousness": モダリティの現代的解釈
 * - 西洋占星術の伝統的分類（文化的フレームワーク）として扱う
 *
 * 注意:
 * - 未来予測・運勢・運命言及禁止
 * - 心理的決定論禁止（「必ず〜」→「傾向がある」「とされている」）
 * - 科学的根拠があるとは主張しない
 *
 * 確認日: 2026-05-21
 */

import type { ZodiacType } from './meta';

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Modality = 'cardinal' | 'fixed' | 'mutable';

export interface ElementInfo {
  id: Element;
  japaneseName: string;
  englishName: string;
  symbol: string;
  color: string;
  zodiacSigns: ZodiacType[];
  keywords: string[];
  description: string;
  /** 伝統的な性格傾向（150字） */
  characterTrait: string;
  /** 強み（4項目） */
  strengths: string[];
  /** 傾向（4項目） */
  tendencies: string[];
  /** 補完エレメント */
  complementElement: Element;
  /** 対比エレメント */
  contrastElement: Element;
}

export interface ModalityInfo {
  id: Modality;
  japaneseName: string;
  englishName: string;
  symbol: string;
  zodiacSigns: ZodiacType[];
  keywords: string[];
  description: string;
  /** 行動スタイルの傾向（150字） */
  actionStyle: string;
  /** 強み（4項目） */
  strengths: string[];
  /** 傾向（4項目） */
  tendencies: string[];
}

// ================================================================
// 4エレメント
// ================================================================

export const elementsData: Record<Element, ElementInfo> = {
  // ────────────────────────────────────────────────
  // 火: 牡羊・獅子・射手
  // ────────────────────────────────────────────────
  fire: {
    id: 'fire',
    japaneseName: '火',
    englishName: 'Fire',
    symbol: '🔥',
    color: '#EF4444',
    zodiacSigns: ['aries', 'leo', 'sagittarius'],
    keywords: ['情熱', '行動力', '直感', '創造性', '自己表現'],
    description:
      '西洋占星術の伝統的分類で「火のエレメント」とされる牡羊座・獅子座・射手座。'
      + '情熱的で行動力があり、自分の信念を持って前に進む傾向があるとされています。'
      + '直感を大切にし、エネルギッシュな自己表現が特徴的です。',
    characterTrait:
      '熱意と行動力を持つとされる火のグループ。'
      + '新しいことへの挑戦を楽しみ、周囲を巻き込む力があるとされます。'
      + '感情を率直に表現し、目標に向かって積極的に動く傾向があります。',
    strengths: ['行動力・推進力', '情熱・熱意', '自己表現力', 'リーダーシップ'],
    tendencies: ['衝動的になりやすい', '持続性の課題', '他者意見を聞きにくい場合', '過剰な自信'],
    complementElement: 'air',
    contrastElement: 'water',
  },

  // ────────────────────────────────────────────────
  // 地: 牡牛・乙女・山羊
  // ────────────────────────────────────────────────
  earth: {
    id: 'earth',
    japaneseName: '地',
    englishName: 'Earth',
    symbol: '🌍',
    color: '#78716C',
    zodiacSigns: ['taurus', 'virgo', 'capricorn'],
    keywords: ['安定', '実務', '忍耐', '現実感覚', '信頼性'],
    description:
      '西洋占星術の伝統的分類で「地のエレメント」とされる牡牛座・乙女座・山羊座。'
      + '安定志向で現実的な判断を大切にし、着実に物事を進める傾向があるとされます。'
      + '信頼性と責任感があり、長期的な視野を持って行動することが多いとされます。',
    characterTrait:
      '堅実さと忍耐力を持つとされる地のグループ。'
      + '計画を立てて確実に実行し、約束を守ることを大切にするとされます。'
      + '物質的・現実的な安心感を重視し、積み上げる力があるとされます。',
    strengths: ['安定性・一貫性', '実務的能力', '忍耐力・持続力', '信頼性・責任感'],
    tendencies: ['変化への抵抗', '頑固になりやすい', '柔軟性の課題', '過度な保守性'],
    complementElement: 'water',
    contrastElement: 'air',
  },

  // ────────────────────────────────────────────────
  // 風: 双子・天秤・水瓶
  // ────────────────────────────────────────────────
  air: {
    id: 'air',
    japaneseName: '風',
    englishName: 'Air',
    symbol: '💨',
    color: '#3B82F6',
    zodiacSigns: ['gemini', 'libra', 'aquarius'],
    keywords: ['知性', '社交性', '革新', '客観性', 'コミュニケーション'],
    description:
      '西洋占星術の伝統的分類で「風のエレメント」とされる双子座・天秤座・水瓶座。'
      + '知的好奇心が旺盛で、コミュニケーションや情報交換を楽しむ傾向があるとされます。'
      + '客観的な視点を持ち、革新的なアイデアを生み出すことが多いとされます。',
    characterTrait:
      '知性と社交性を持つとされる風のグループ。'
      + '幅広い交友関係を持ち、新しい知識や考え方に積極的に触れるとされます。'
      + '論理的に物事を整理し、バランスのとれた視点で判断する傾向があります。',
    strengths: ['知的好奇心', '社交性・コミュニケーション力', '客観的視点', '革新的発想'],
    tendencies: ['優柔不断になりやすい', '感情面の浅さ', '一貫性の課題', '現実から離れやすい'],
    complementElement: 'fire',
    contrastElement: 'earth',
  },

  // ────────────────────────────────────────────────
  // 水: 蟹・蠍・魚
  // ────────────────────────────────────────────────
  water: {
    id: 'water',
    japaneseName: '水',
    englishName: 'Water',
    symbol: '💧',
    color: '#06B6D4',
    zodiacSigns: ['cancer', 'scorpio', 'pisces'],
    keywords: ['感受性', '共感', '直観', '感情的知性', '深さ'],
    description:
      '西洋占星術の伝統的分類で「水のエレメント」とされる蟹座・蠍座・魚座。'
      + '感受性が豊かで、他者の感情を敏感に察する共感力があるとされます。'
      + '深い感情の世界を持ち、直観的な判断力が発達しているとされます。',
    characterTrait:
      '感受性と共感力を持つとされる水のグループ。'
      + '人の気持ちや空気感を読む力があり、深い人間関係を大切にするとされます。'
      + '感情的な深みと直観力を活かして、独自の視点を持つことが多いとされます。',
    strengths: ['共感力・感受性', '直観的洞察力', '深い人間関係の構築', '感情的知性'],
    tendencies: ['感情的になりやすい', '境界線の課題', '過度な感情移入', '現実逃避の傾向'],
    complementElement: 'earth',
    contrastElement: 'fire',
  },
};

// ================================================================
// 3モダリティ
// ================================================================

export const modalitiesData: Record<Modality, ModalityInfo> = {
  // ────────────────────────────────────────────────
  // 活動（Cardinal）: 牡羊・蟹・天秤・山羊
  // ────────────────────────────────────────────────
  cardinal: {
    id: 'cardinal',
    japaneseName: '活動宮',
    englishName: 'Cardinal',
    symbol: '▶',
    zodiacSigns: ['aries', 'cancer', 'libra', 'capricorn'],
    keywords: ['開始', '主導', 'イニシアチブ', '先頭に立つ', '新しい始まり'],
    description:
      '各季節の始まりに対応する「活動宮」とされる牡羊・蟹・天秤・山羊座。'
      + '新しいことを始める力があり、リーダーシップを発揮する傾向があるとされます。'
      + 'イニシアチブを取り、方向性を打ち出すことが得意とされます。',
    actionStyle:
      '「まず動く」スタイルが強いとされる活動宮。'
      + '計画を立てながら同時に行動し始め、状況を作り出す力があるとされます。'
      + '変化の起点になることが多く、周囲を動かすきっかけを生み出します。',
    strengths: ['行動開始力', 'リーダーシップ', '目標設定力', '変化への適応'],
    tendencies: ['継続性の課題', '拙速になりやすい', '途中放棄の傾向', '方針変更が多い'],
  },

  // ────────────────────────────────────────────────
  // 不動（Fixed）: 牡牛・獅子・蠍・水瓶
  // ────────────────────────────────────────────────
  fixed: {
    id: 'fixed',
    japaneseName: '不動宮',
    englishName: 'Fixed',
    symbol: '⬛',
    zodiacSigns: ['taurus', 'leo', 'scorpio', 'aquarius'],
    keywords: ['持続', '集中', '安定', '意志の強さ', '深化'],
    description:
      '各季節の最盛期に対応する「不動宮」とされる牡牛・獅子・蠍・水瓶座。'
      + '一度始めたことを最後まで持続させる強い意志力があるとされます。'
      + '集中力が高く、専門性を深めることに優れているとされます。',
    actionStyle:
      '「じっくり継続する」スタイルが強いとされる不動宮。'
      + '決めたことへのこだわりが強く、粘り強く取り組む傾向があります。'
      + '一つの方向性を徹底的に追求し、専門性を高めることが得意とされます。',
    strengths: ['持続力・忍耐力', '専門性の深化', '強い意志力', '安定的な実行力'],
    tendencies: ['頑固になりやすい', '変化への抵抗', '融通が利かない場合', '執着の傾向'],
  },

  // ────────────────────────────────────────────────
  // 柔軟（Mutable）: 双子・乙女・射手・魚
  // ────────────────────────────────────────────────
  mutable: {
    id: 'mutable',
    japaneseName: '柔軟宮',
    englishName: 'Mutable',
    symbol: '♻',
    zodiacSigns: ['gemini', 'virgo', 'sagittarius', 'pisces'],
    keywords: ['適応', '変化', '柔軟性', '多様性', '移行'],
    description:
      '各季節の終わりに対応する「柔軟宮」とされる双子・乙女・射手・魚座。'
      + '環境の変化に素早く適応できる柔軟性があるとされます。'
      + '多様な視点を取り入れ、状況に応じてアプローチを変える能力があるとされます。',
    actionStyle:
      '「状況に合わせて動く」スタイルが強いとされる柔軟宮。'
      + '複数の選択肢を同時に持ち、状況に応じて最適な方法を選ぶ傾向があります。'
      + '変化を自然に受け入れ、移行期をうまく乗り越える力があるとされます。',
    strengths: ['適応力・柔軟性', '多面的な視点', '変化への対応', '調整能力'],
    tendencies: ['一貫性の課題', '優柔不断になりやすい', '軸が定まりにくい場合', '散漫になりやすい'],
  },
};

// ================================================================
// ユーティリティ関数
// ================================================================

/**
 * エレメント同士の相性スコア加算値を返す
 */
export function getElementCompatibilityBonus(e1: Element, e2: Element): number {
  if (e1 === e2) return 30;
  // 火-風、地-水: 補完関係
  if ((e1 === 'fire' && e2 === 'air') || (e1 === 'air' && e2 === 'fire')) return 20;
  if ((e1 === 'earth' && e2 === 'water') || (e1 === 'water' && e2 === 'earth')) return 20;
  // 火-水、地-風: 対立関係
  if ((e1 === 'fire' && e2 === 'water') || (e1 === 'water' && e2 === 'fire')) return -5;
  if ((e1 === 'earth' && e2 === 'air') || (e1 === 'air' && e2 === 'earth')) return -5;
  return 0;
}

/**
 * モダリティ同士の相性スコア加算値を返す
 */
export function getModalityCompatibilityBonus(m1: Modality, m2: Modality): number {
  if (m1 === m2) return 10;
  // cardinal-fixed, fixed-mutable: 補完関係
  if (
    (m1 === 'cardinal' && m2 === 'fixed') || (m1 === 'fixed' && m2 === 'cardinal') ||
    (m1 === 'fixed' && m2 === 'mutable') || (m1 === 'mutable' && m2 === 'fixed')
  ) return 15;
  // cardinal-mutable: 軽い補完
  return 5;
}
