/**
 * 関連診断マッピングデータ
 *
 * 各診断・タイプごとに「関連する他診断」を4種類提供する:
 *   1. 同一診断内の別タイプ（sameGroup）
 *   2. クロス診断推薦（crossRecommend）
 *   3. 統合プロファイル（integratedProfile）
 *   4. 招待・シェア促進（invite）
 *
 * 利用箇所: RelatedDiagnoses.astro
 * 確認日: 2026-05-23
 */

// ====================================================
// 型定義
// ====================================================

export interface RelatedLink {
  /** 表示タイトル */
  title: string;
  /** リンク先URL */
  href: string;
  /** 表示絵文字 */
  icon: string;
  /** バッジラベル（任意） */
  badge?: string;
  /** 診断カラークラス（diag-* ）*/
  diagClass?: string;
  /** 短い説明文（任意） */
  description?: string;
}

export interface RelatedGroup {
  /** セクションラベル */
  label: string;
  /** セクションアイコン */
  sectionIcon: string;
  links: RelatedLink[];
}

// ====================================================
// 全診断カタログ（クロス推薦ベース）
// ====================================================

export const ALL_DIAGNOSES: RelatedLink[] = [
  {
    title: 'MBTI診断',
    href: '/diagnosis/mbti/',
    icon: '🧠',
    diagClass: 'diag-mbti',
    description: '性格の根本パターンを16タイプで解析',
  },
  {
    title: 'MBTI相性診断',
    href: '/diagnosis/mbti-compat/',
    icon: '💜',
    diagClass: 'diag-mbti',
    description: '16タイプ間の仕事・恋愛相性を数値化',
  },
  {
    title: '多重知能テスト',
    href: '/diagnosis/multi-int/',
    icon: '🦉',
    diagClass: 'diag-multi',
    description: '8つの知能領域から才能の軸を発見',
  },
  {
    title: '完璧主義診断',
    href: '/diagnosis/perfectionism/',
    icon: '⭐',
    diagClass: 'diag-perfect',
    description: '4タイプの完璧主義傾向とCBT的向き合い方',
  },
  {
    title: 'DiSC診断',
    href: '/diagnosis/disc/',
    icon: '💼',
    diagClass: 'diag-disc',
    description: '職場・ビジネスでの行動スタイルを4分類',
  },
  {
    title: '恋愛スタイル診断',
    href: '/diagnosis/love-style/',
    icon: '💕',
    diagClass: 'diag-love',
    description: '6タイプの恋愛アプローチと相性ランキング',
  },
  {
    title: '友達相性診断',
    href: '/diagnosis/friend-compat/',
    icon: '🤝',
    diagClass: 'diag-love',
    description: '6タイプの友情スタイル・グループ相性',
  },
  {
    title: '金銭感覚診断',
    href: '/diagnosis/money-style/',
    icon: '💰',
    diagClass: 'diag-money',
    description: '4タイプのお金との向き合い方を解析',
  },
  {
    title: '星座性格診断',
    href: '/diagnosis/zodiac/',
    icon: '✨',
    diagClass: 'diag-star',
    description: '12星座の伝統的性格特性と相性',
  },
  {
    title: '愛着スタイル診断',
    href: '/diagnosis/love-dependency/',
    icon: '🫂',
    diagClass: 'diag-love',
    description: '恋愛・対人関係の安心感のパターンを分析',
  },
];

// ====================================================
// 診断IDごとのクロス推薦テーブル
// タイプに関わらず「この診断を受けたユーザーにおすすめ」
// ====================================================

/** 診断ID → クロス推薦リスト（3件） */
export const CROSS_RECOMMEND: Record<string, RelatedLink[]> = {
  mbti: [
    {
      title: 'MBTI相性診断',
      href: '/diagnosis/mbti-compat/',
      icon: '💜',
      diagClass: 'diag-mbti',
      badge: '相性チェック',
      description: '他の16タイプとの仕事・恋愛・友人相性を数値で確認',
    },
    {
      title: '多重知能テスト',
      href: '/diagnosis/multi-int/',
      icon: '🦉',
      diagClass: 'diag-multi',
      description: '性格(MBTI)と才能(多重知能)を組み合わせると自己理解が深まる',
    },
    {
      title: 'DiSC診断',
      href: '/diagnosis/disc/',
      icon: '💼',
      diagClass: 'diag-disc',
      description: '職場での行動スタイルをMBTIと掛け合わせて仕事戦略を最適化',
    },
  ],
  'mbti-compat': [
    {
      title: 'MBTI診断',
      href: '/diagnosis/mbti/',
      icon: '🧠',
      diagClass: 'diag-mbti',
      badge: '先に受ける',
      description: '自分のMBTIタイプを確認してから相性を見よう',
    },
    {
      title: '恋愛スタイル診断',
      href: '/diagnosis/love-style/',
      icon: '💕',
      diagClass: 'diag-love',
      description: '恋愛アプローチのスタイルをMBTI相性と組み合わせて理解',
    },
    {
      title: '友達相性診断',
      href: '/diagnosis/friend-compat/',
      icon: '🤝',
      diagClass: 'diag-love',
      description: '友情の相性パターンも確認しておこう',
    },
  ],
  'multi-int': [
    {
      title: 'MBTI診断',
      href: '/diagnosis/mbti/',
      icon: '🧠',
      diagClass: 'diag-mbti',
      badge: 'おすすめ',
      description: '才能(多重知能)×性格(MBTI)で仕事の方向性が見える',
    },
    {
      title: 'DiSC診断',
      href: '/diagnosis/disc/',
      icon: '💼',
      diagClass: 'diag-disc',
      description: '才能と行動スタイルを掛け合わせてキャリアを設計',
    },
    {
      title: '完璧主義診断',
      href: '/diagnosis/perfectionism/',
      icon: '⭐',
      diagClass: 'diag-perfect',
      description: '才能を活かす上での「完璧主義傾向」を把握',
    },
  ],
  perfectionism: [
    {
      title: '多重知能テスト',
      href: '/diagnosis/multi-int/',
      icon: '🦉',
      diagClass: 'diag-multi',
      badge: '組み合わせ',
      description: '完璧主義の傾向が才能のどの領域に現れているか確認',
    },
    {
      title: 'MBTI診断',
      href: '/diagnosis/mbti/',
      icon: '🧠',
      diagClass: 'diag-mbti',
      description: '性格タイプ別の完璧主義の出方が分かる',
    },
    {
      title: 'DiSC診断',
      href: '/diagnosis/disc/',
      icon: '💼',
      diagClass: 'diag-disc',
      description: '職場での完璧主義をプラスに活かす行動スタイル',
    },
  ],
  disc: [
    {
      title: '完璧主義診断',
      href: '/diagnosis/perfectionism/',
      icon: '⭐',
      diagClass: 'diag-perfect',
      badge: '相性良',
      description: '職場での完璧主義傾向とDiSCを掛け合わせた行動分析',
    },
    {
      title: 'MBTI診断',
      href: '/diagnosis/mbti/',
      icon: '🧠',
      diagClass: 'diag-mbti',
      description: '性格の深層パターンとビジネス行動スタイルを統合',
    },
    {
      title: '多重知能テスト',
      href: '/diagnosis/multi-int/',
      icon: '🦉',
      diagClass: 'diag-multi',
      description: '行動スタイル(DiSC)×才能(多重知能)でキャリア最適化',
    },
  ],
  'love-style': [
    {
      title: '愛着スタイル診断',
      href: '/diagnosis/love-dependency/',
      icon: '🫂',
      diagClass: 'diag-love',
      badge: '関連深い',
      description: '恋愛スタイルと愛着パターンの組み合わせで関係性を深く理解',
    },
    {
      title: '友達相性診断',
      href: '/diagnosis/friend-compat/',
      icon: '🤝',
      diagClass: 'diag-love',
      description: '友情でのスタイルも恋愛スタイルと似ている傾向がある',
    },
    {
      title: 'MBTI相性診断',
      href: '/diagnosis/mbti-compat/',
      icon: '💜',
      diagClass: 'diag-mbti',
      description: '性格タイプ別の恋愛相性を数値で確認',
    },
  ],
  'friend-compat': [
    {
      title: 'MBTI相性診断',
      href: '/diagnosis/mbti-compat/',
      icon: '💜',
      diagClass: 'diag-mbti',
      badge: '人気',
      description: 'MBTIタイプ別の仕事・恋愛・友人相性を網羅的に確認',
    },
    {
      title: '多重知能テスト',
      href: '/diagnosis/multi-int/',
      icon: '🦉',
      diagClass: 'diag-multi',
      description: '友達グループ内での自分の「才能の役割」を発見',
    },
    {
      title: '完璧主義診断',
      href: '/diagnosis/perfectionism/',
      icon: '⭐',
      diagClass: 'diag-perfect',
      description: '友達との摩擦の原因になりやすい完璧主義傾向を把握',
    },
  ],
  'money-style': [
    {
      title: '恋愛スタイル診断',
      href: '/diagnosis/love-style/',
      icon: '💕',
      diagClass: 'diag-love',
      badge: 'おすすめ',
      description: 'パートナーの金銭感覚と恋愛スタイルの相性を理解',
    },
    {
      title: 'DiSC診断',
      href: '/diagnosis/disc/',
      icon: '💼',
      diagClass: 'diag-disc',
      description: '職場行動スタイルと金銭感覚の組み合わせでキャリア設計',
    },
    {
      title: '完璧主義診断',
      href: '/diagnosis/perfectionism/',
      icon: '⭐',
      diagClass: 'diag-perfect',
      description: 'お金への完璧主義的こだわりのパターンを把握',
    },
  ],
  zodiac: [
    {
      title: 'MBTI診断',
      href: '/diagnosis/mbti/',
      icon: '🧠',
      diagClass: 'diag-mbti',
      badge: 'おすすめ',
      description: '星座の傾向をMBTIで科学的に補完して自己理解を深める',
    },
    {
      title: '恋愛スタイル診断',
      href: '/diagnosis/love-style/',
      icon: '💕',
      diagClass: 'diag-love',
      description: '星座の相性を恋愛スタイルの視点で再確認',
    },
    {
      title: '友達相性診断',
      href: '/diagnosis/friend-compat/',
      icon: '🤝',
      diagClass: 'diag-love',
      description: '友情の星座相性とタイプ別スタイルを比較',
    },
  ],
  'love-dependency': [
    {
      title: '恋愛スタイル診断',
      href: '/diagnosis/love-style/',
      icon: '💕',
      diagClass: 'diag-love',
      badge: '関連深い',
      description: '愛着スタイルと恋愛アプローチを組み合わせて関係性を整理',
    },
    {
      title: '完璧主義診断',
      href: '/diagnosis/perfectionism/',
      icon: '⭐',
      diagClass: 'diag-perfect',
      description: 'パートナーへの過度な期待の根本にある完璧主義傾向を把握',
    },
    {
      title: '友達相性診断',
      href: '/diagnosis/friend-compat/',
      icon: '🤝',
      diagClass: 'diag-love',
      description: '愛着スタイルは友情パターンにも現れる',
    },
  ],
};

// ====================================================
// MBTIタイプ別同グループ推薦
// ====================================================

/** 4気質グループ定義 */
const MBTI_TEMPERAMENT_GROUPS: Record<string, string[]> = {
  NT: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  NF: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  SJ: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  SP: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
};

const MBTI_NAMES: Record<string, string> = {
  INTJ: '建築家', INTP: '論理学者', ENTJ: '指揮官', ENTP: '討論者',
  INFJ: '提唱者', INFP: '仲介者', ENFJ: '主人公', ENFP: '運動家',
  ISTJ: '管理者', ISFJ: '擁護者', ESTJ: '幹部',  ESFJ: '領事',
  ISTP: '巨匠',  ISFP: '冒険家', ESTP: '起業家', ESFP: 'エンターテイナー',
};

const MBTI_EMOJIS: Record<string, string> = {
  INTJ: '🔭', INTP: '🔬', ENTJ: '⚡', ENTP: '💡',
  INFJ: '🔮', INFP: '🌿', ENFJ: '🌟', ENFP: '🎨',
  ISTJ: '📋', ISFJ: '🛡️', ESTJ: '⚖️', ESFJ: '🌸',
  ISTP: '🔧', ISFP: '🎭', ESTP: '🚀', ESFP: '🎉',
};

/**
 * MBTIタイプの同グループ3タイプを取得
 */
export function getMbtiSameGroupLinks(typeId: string): RelatedLink[] {
  const group = Object.values(MBTI_TEMPERAMENT_GROUPS).find((g) => g.includes(typeId));
  if (!group) return [];
  return group
    .filter((t) => t !== typeId)
    .slice(0, 3)
    .map((t) => ({
      title: `${t}（${MBTI_NAMES[t] ?? t}）`,
      href: `/diagnosis/mbti/result/${t}/`,
      icon: MBTI_EMOJIS[t] ?? '🔮',
      diagClass: 'diag-mbti',
      description: `同じ気質グループ（${Object.keys(MBTI_TEMPERAMENT_GROUPS).find((k) => MBTI_TEMPERAMENT_GROUPS[k].includes(t))}）の別タイプ`,
    }));
}

// ====================================================
// 多重知能タイプ別同グループ推薦
// ====================================================

const MULTI_INT_TYPES: Record<string, { name: string; icon: string; related: string[] }> = {
  linguistic:    { name: '言語型',   icon: '📝', related: ['logical', 'interpersonal', 'intrapersonal'] },
  logical:       { name: '論理数学型', icon: '🔢', related: ['linguistic', 'spatial', 'naturalist'] },
  spatial:       { name: '空間型',   icon: '🎨', related: ['kinesthetic', 'musical', 'naturalist'] },
  kinesthetic:   { name: '身体運動型', icon: '🏃', related: ['spatial', 'naturalist', 'interpersonal'] },
  musical:       { name: '音楽型',   icon: '🎵', related: ['spatial', 'interpersonal', 'intrapersonal'] },
  interpersonal: { name: '対人型',   icon: '🤝', related: ['intrapersonal', 'linguistic', 'kinesthetic'] },
  intrapersonal: { name: '内省型',   icon: '🔍', related: ['interpersonal', 'linguistic', 'naturalist'] },
  naturalist:    { name: '博物型',   icon: '🌿', related: ['kinesthetic', 'logical', 'spatial'] },
};

export function getMultiIntSameGroupLinks(typeId: string): RelatedLink[] {
  const related = MULTI_INT_TYPES[typeId]?.related ?? [];
  return related.slice(0, 3).map((t) => ({
    title: `${MULTI_INT_TYPES[t]?.name ?? t}（${t}）`,
    href: `/diagnosis/multi-int/result/${t}/`,
    icon: MULTI_INT_TYPES[t]?.icon ?? '🧠',
    diagClass: 'diag-multi',
    description: '関連する知能タイプの特徴を見る',
  }));
}

// ====================================================
// 完璧主義タイプ別同グループ推薦
// ====================================================

const PERFECTIONISM_TYPES: Record<string, { name: string; icon: string }> = {
  thorough:      { name: '徹底型',   icon: '🔱' },
  particular:    { name: 'こだわり型', icon: '⚙️' },
  procrastinating: { name: '先延ばし型', icon: '⏳' },
  expecting:     { name: '期待型',   icon: '🌟' },
};

export function getPerfectionismSameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(PERFECTIONISM_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: `${data.name}（${t}）`,
      href: `/diagnosis/perfectionism/result/${t}/`,
      icon: data.icon,
      diagClass: 'diag-perfect',
      description: '他の完璧主義タイプと比較してみる',
    }));
}

// ====================================================
// DiSCタイプ別同グループ推薦
// ====================================================

const DISC_TYPES: Record<string, { name: string; icon: string }> = {
  D: { name: '主導型', icon: '⚡' },
  i: { name: '感化型', icon: '🌟' },
  S: { name: '安定型', icon: '🌿' },
  C: { name: '慎重型', icon: '🔍' },
};

export function getDiscSameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(DISC_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: `${data.name}（DiSC ${t}型）`,
      href: `/diagnosis/disc/result/${t}/`,
      icon: data.icon,
      diagClass: 'diag-disc',
      description: '他のDiSCタイプとの仕事相性を確認',
    }));
}

// ====================================================
// 恋愛スタイルタイプ別同グループ推薦
// ====================================================

const LOVE_STYLE_TYPES: Record<string, { name: string; icon: string }> = {
  eros:   { name: '情熱型（エロス）', icon: '❤️' },
  ludus:  { name: '遊戯型（ルーダス）', icon: '🎲' },
  storge: { name: '友情型（ストーゲ）', icon: '🫂' },
  pragma: { name: '実利型（プラグマ）', icon: '⚖️' },
  mania:  { name: '執着型（マニア）', icon: '🌙' },
  agape:  { name: '献身型（アガペ）', icon: '🕊️' },
};

export function getLoveStyleSameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(LOVE_STYLE_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: data.name,
      href: `/diagnosis/love-style/result/${t}/`,
      icon: data.icon,
      diagClass: 'diag-love',
      description: '他の恋愛スタイルとの相性を見る',
    }));
}

// ====================================================
// 友達相性タイプ別同グループ推薦
// ====================================================

const FRIEND_COMPAT_TYPES: Record<string, { name: string; icon: string }> = {
  'mood-maker': { name: 'ムードメーカー型', icon: '🎉' },
  listener:     { name: 'リスナー型',     icon: '👂' },
  leader:       { name: 'リーダー型',     icon: '👑' },
  'lone-wolf':  { name: 'ひとり狼型',    icon: '🐺' },
  harmonizer:   { name: 'ハーモナイザー型', icon: '🌸' },
  analyst:      { name: 'アナリスト型',   icon: '🔎' },
};

export function getFriendCompatSameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(FRIEND_COMPAT_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: data.name,
      href: `/diagnosis/friend-compat/result/${t}/`,
      icon: data.icon,
      diagClass: 'diag-love',
      description: '他の友達タイプとの相性を確認',
    }));
}

// ====================================================
// 金銭感覚タイプ別同グループ推薦
// ====================================================

const MONEY_STYLE_TYPES: Record<string, { name: string; icon: string }> = {
  avoidance:  { name: '回避型', icon: '🙈' },
  worship:    { name: '崇拝型', icon: '✨' },
  status:     { name: '地位型', icon: '👑' },
  vigilance:  { name: '警戒型', icon: '🛡️' },
};

export function getMoneyStyleSameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(MONEY_STYLE_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: `${data.name}（${t}）`,
      href: `/diagnosis/money-style/result/${t}/`,
      icon: data.icon,
      diagClass: 'diag-money',
      description: '他の金銭感覚タイプと比較',
    }));
}

// ====================================================
// 星座タイプ別同グループ推薦（エレメント別）
// ====================================================

const ZODIAC_ELEMENTS: Record<string, { name: string; icon: string; element: string }> = {
  aries:       { name: '牡羊座', icon: '♈', element: 'fire' },
  taurus:      { name: '牡牛座', icon: '♉', element: 'earth' },
  gemini:      { name: '双子座', icon: '♊', element: 'air' },
  cancer:      { name: '蟹座',   icon: '♋', element: 'water' },
  leo:         { name: '獅子座', icon: '♌', element: 'fire' },
  virgo:       { name: '乙女座', icon: '♍', element: 'earth' },
  libra:       { name: '天秤座', icon: '♎', element: 'air' },
  scorpio:     { name: '蠍座',   icon: '♏', element: 'water' },
  sagittarius: { name: '射手座', icon: '♐', element: 'fire' },
  capricorn:   { name: '山羊座', icon: '♑', element: 'earth' },
  aquarius:    { name: '水瓶座', icon: '♒', element: 'air' },
  pisces:      { name: '魚座',   icon: '♓', element: 'water' },
};

export function getZodiacSameGroupLinks(zodiacId: string): RelatedLink[] {
  const currentElement = ZODIAC_ELEMENTS[zodiacId]?.element;
  if (!currentElement) return [];
  return Object.entries(ZODIAC_ELEMENTS)
    .filter(([t, data]) => t !== zodiacId && data.element === currentElement)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: data.name,
      href: `/diagnosis/zodiac/${t}/`,
      icon: data.icon,
      diagClass: 'diag-star',
      description: `同じ${currentElement === 'fire' ? '火' : currentElement === 'earth' ? '地' : currentElement === 'air' ? '風' : '水'}のエレメント`,
    }));
}

// ====================================================
// 愛着スタイルタイプ別同グループ推薦
// ====================================================

const LOVE_DEP_TYPES: Record<string, { name: string; icon: string }> = {
  secure:      { name: '安定型', icon: '💚' },
  anxious:     { name: '不安型', icon: '💛' },
  avoidant:    { name: '回避型', icon: '🔵' },
  codependent: { name: '共依存型', icon: '🟣' },
};

export function getLoveDependencySameGroupLinks(typeId: string): RelatedLink[] {
  return Object.entries(LOVE_DEP_TYPES)
    .filter(([t]) => t !== typeId)
    .slice(0, 3)
    .map(([t, data]) => ({
      title: `${data.name}（${t}）`,
      href: `/diagnosis/love-dependency/${t}/`,
      icon: data.icon,
      diagClass: 'diag-love',
      description: '他の愛着スタイルとの関係性を理解',
    }));
}

// ====================================================
// メインエクスポート: 同グループリンク取得関数
// ====================================================

/**
 * 診断ID・タイプIDから同グループの関連リンクを取得する
 */
export function getSameGroupLinks(diagnosisId: string, typeId: string): RelatedLink[] {
  switch (diagnosisId) {
    case 'mbti':            return getMbtiSameGroupLinks(typeId);
    case 'multi-int':       return getMultiIntSameGroupLinks(typeId);
    case 'perfectionism':   return getPerfectionismSameGroupLinks(typeId);
    case 'disc':            return getDiscSameGroupLinks(typeId);
    case 'love-style':      return getLoveStyleSameGroupLinks(typeId);
    case 'friend-compat':   return getFriendCompatSameGroupLinks(typeId);
    case 'money-style':     return getMoneyStyleSameGroupLinks(typeId);
    case 'zodiac':          return getZodiacSameGroupLinks(typeId);
    case 'love-dependency': return getLoveDependencySameGroupLinks(typeId);
    default:                return [];
  }
}

/**
 * 診断IDからクロス推薦リンクを取得する
 */
export function getCrossRecommendLinks(diagnosisId: string): RelatedLink[] {
  return CROSS_RECOMMEND[diagnosisId] ?? [];
}
