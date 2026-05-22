/**
 * 16動物キャラクター定義
 *
 * Big5 の4軸（O開放性・C誠実性・E外向性・A協調性）× 各2段階（high/low）= 16パターン
 * N（情緒安定性）は別途 Big5MoodMeter で管理
 *
 * ユーザー向けルール:
 * - Big5/OCEAN/ビッグファイブ という用語はユーザーに見せない
 * - 動物名・特性キーワードで表現する
 *
 * characterId 命名規則: "o-{level}_c-{level}_e-{level}_a-{level}"
 * 例: "o-high_c-high_e-high_a-high" → ライオン王
 */

export interface AnimalCharacter {
  /** characterId: 4軸×high/low の組み合わせ（16通り） */
  id: string;
  /** 動物名（ユーザー表示用） */
  name: string;
  /** 動物の種類（SVGアイコン選択に使用） */
  animal: string;
  /** キャッチコピー（1行） */
  tagline: string;
  /** 特性キーワード（3〜4個） */
  traits: string[];
  /** 個性カラー（CSS変数またはhex） */
  color: string;
  /** 背景グラデーション */
  gradient: string;
  /** 絵文字フォールバック */
  emoji: string;
}

/**
 * 4軸の high/low を boolean で受け取り characterId を生成する
 */
export function buildCharacterId(O: boolean, C: boolean, E: boolean, A: boolean): string {
  return `o-${O ? 'high' : 'low'}_c-${C ? 'high' : 'low'}_e-${E ? 'high' : 'low'}_a-${A ? 'high' : 'low'}`;
}

/**
 * Big5スコア（0-100）から high/low を判定する閾値
 * 50以上を high とする
 */
export function scoreToLevel(score: number): boolean {
  return score >= 50;
}

/**
 * 統合プロファイルのBig5スコアからcharacterIdを導出する
 */
export function big5ToCharacterId(O: number, C: number, E: number, A: number): string {
  return buildCharacterId(
    scoreToLevel(O),
    scoreToLevel(C),
    scoreToLevel(E),
    scoreToLevel(A)
  );
}

/**
 * 16動物キャラクター一覧
 *
 * O高=好奇心旺盛・創造的 / O低=現実的・安定志向
 * C高=計画的・几帳面    / C低=柔軟・自由
 * E高=活発・社交的      / E低=内向・熟考
 * A高=共感・協力的      / A低=独立・直接的
 */
export const ANIMAL_CHARACTERS: AnimalCharacter[] = [
  // ========== O高・C高・E高・A高 ==========
  {
    id: 'o-high_c-high_e-high_a-high',
    name: 'ライオン王',
    animal: 'lion',
    tagline: '仲間を引っ張る、頼れるリーダー',
    traits: ['行動力', '計画力', '社交的', '思いやり'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    emoji: '🦁',
  },
  // ========== O高・C高・E高・A低 ==========
  {
    id: 'o-high_c-high_e-high_a-low',
    name: 'ハヤブサ',
    animal: 'falcon',
    tagline: '目標に向かって突き進む、鋭い先駆者',
    traits: ['目標達成', '決断力', '行動力', '独立心'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    emoji: '🦅',
  },
  // ========== O高・C高・E低・A高 ==========
  {
    id: 'o-high_c-high_e-low_a-high',
    name: 'フクロウ博士',
    animal: 'owl',
    tagline: '深く考え、静かに人を支える知者',
    traits: ['知性', '計画力', '思いやり', '洞察力'],
    color: '#7c5cff',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    emoji: '🦉',
  },
  // ========== O高・C高・E低・A低 ==========
  {
    id: 'o-high_c-high_e-low_a-low',
    name: 'タコ博士',
    animal: 'octopus',
    tagline: '緻密な戦略で問題を解き明かす、孤高の研究者',
    traits: ['分析力', '計画力', '独創性', '集中力'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    emoji: '🐙',
  },
  // ========== O高・C低・E高・A高 ==========
  {
    id: 'o-high_c-low_e-high_a-high',
    name: 'イルカ',
    animal: 'dolphin',
    tagline: '遊び心と優しさで場を明るくする、自由な社交家',
    traits: ['社交的', '共感力', '自由', '好奇心'],
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    emoji: '🐬',
  },
  // ========== O高・C低・E高・A低 ==========
  {
    id: 'o-high_c-low_e-high_a-low',
    name: 'キツネ',
    animal: 'fox',
    tagline: 'ユニークな発想で場を席巻する、自由な挑戦者',
    traits: ['創造力', '行動力', '独創性', '自由'],
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
    emoji: '🦊',
  },
  // ========== O高・C低・E低・A高 ==========
  {
    id: 'o-high_c-low_e-low_a-high',
    name: 'ネコ',
    animal: 'cat',
    tagline: '自分のペースで、大切な人を静かに支える',
    traits: ['独創性', '共感力', '自由', '癒し'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    emoji: '🐱',
  },
  // ========== O高・C低・E低・A低 ==========
  {
    id: 'o-high_c-low_e-low_a-low',
    name: 'トラ',
    animal: 'tiger',
    tagline: '独自の世界観を持つ、孤独な芸術家',
    traits: ['独創性', '個性', '自由', '直感'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)',
    emoji: '🐯',
  },
  // ========== O低・C高・E高・A高 ==========
  {
    id: 'o-low_c-high_e-high_a-high',
    name: 'イヌ',
    animal: 'dog',
    tagline: '誰にでも誠実、チームの要となる頼れる存在',
    traits: ['誠実さ', '協調性', '責任感', '社交的'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    emoji: '🐶',
  },
  // ========== O低・C高・E高・A低 ==========
  {
    id: 'o-low_c-high_e-high_a-low',
    name: 'オオカミ',
    animal: 'wolf',
    tagline: '群れを率いる、強さと規律のリーダー',
    traits: ['決断力', '計画力', '行動力', '自立心'],
    color: '#64748b',
    gradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    emoji: '🐺',
  },
  // ========== O低・C高・E低・A高 ==========
  {
    id: 'o-low_c-high_e-low_a-high',
    name: 'ビーバー',
    animal: 'beaver',
    tagline: 'コツコツ積み上げ、みんなの土台を作る名職人',
    traits: ['堅実さ', '計画力', '思いやり', '忍耐力'],
    color: '#a16207',
    gradient: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
    emoji: '🦫',
  },
  // ========== O低・C高・E低・A低 ==========
  {
    id: 'o-low_c-high_e-low_a-low',
    name: 'ワシ',
    animal: 'eagle',
    tagline: '高い目標を静かに追い続ける、孤高の完璧主義者',
    traits: ['完璧主義', '集中力', '自立心', '精度'],
    color: '#475569',
    gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    emoji: '🦅',
  },
  // ========== O低・C低・E高・A高 ==========
  {
    id: 'o-low_c-low_e-high_a-high',
    name: 'パンダ',
    animal: 'panda',
    tagline: 'みんなに愛される、場の雰囲気メーカー',
    traits: ['社交的', '癒し', '共感力', '明るさ'],
    color: '#7ec79b',
    gradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    emoji: '🐼',
  },
  // ========== O低・C低・E高・A低 ==========
  {
    id: 'o-low_c-low_e-high_a-low',
    name: 'チーター',
    animal: 'cheetah',
    tagline: '直感と勢いで道を切り開く、行動派のスプリンター',
    traits: ['瞬発力', '行動力', '自由', '決断力'],
    color: '#d97706',
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fde68a 100%)',
    emoji: '🐆',
  },
  // ========== O低・C低・E低・A高 ==========
  {
    id: 'o-low_c-low_e-low_a-high',
    name: 'ウサギ',
    animal: 'rabbit',
    tagline: '穏やかで優しい、そっと寄り添う守り手',
    traits: ['温かさ', '共感力', '穏やかさ', '思いやり'],
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)',
    emoji: '🐰',
  },
  // ========== O低・C低・E低・A低 ==========
  {
    id: 'o-low_c-low_e-low_a-low',
    name: 'ハリネズミ',
    animal: 'hedgehog',
    tagline: '自分だけの世界をもつ、静かな一匹狼',
    traits: ['個性', '自立心', 'マイペース', '内省'],
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    emoji: '🦔',
  },
];

/** characterId から AnimalCharacter を取得する */
export function getAnimalById(characterId: string): AnimalCharacter | undefined {
  return ANIMAL_CHARACTERS.find((a) => a.id === characterId);
}

/** characterId が有効かチェックする */
export function isValidCharacterId(characterId: string): boolean {
  return ANIMAL_CHARACTERS.some((a) => a.id === characterId);
}
