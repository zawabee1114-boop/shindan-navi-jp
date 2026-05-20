/**
 * MBTI相性一覧 メタ情報
 *
 * 学術根拠:
 * - Keirsey D (1998) Please Understand Me II
 * - Myers IB (1962/1998) MBTI Manual
 * - Jung CG (1921) Psychological Types
 * - Beebe J (2017) Energies and Patterns in Psychological Type
 *
 * 注意:
 * - YMYL回避: 精神疾患・臨床診断は行わない
 * - 運命論・心理的決定論は絶対NG
 * - 「MBTI®」は登録商標（The Myers-Briggs Company）。「16タイプ性格分類」も併用
 * - 占い口調・断定的相性判断禁止
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術文献に基づく。推測情報は含まない。
 */

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

export type MBTIType = typeof MBTI_TYPES[number];

export const meta = {
  id: 'mbti-compat',
  slug: 'mbti-compat',
  /** 28-42字 */
  title: 'MBTI相性一覧【全16タイプ完全版・公式根拠付】｜診断ナビ',
  /** 80-120字 */
  description:
    'Keirsey（1998）の気質理論・Jung（1921）の心理機能論に基づく16タイプ性格分類（MBTI®）の相性一覧。全256組み合わせのスコア・相性カテゴリ・仕事・恋愛・成長ポイントを完全収録。MBTI相性表・MBTI相性診断も対応。',
  mainKW: 'MBTI相性一覧',
  relatedKW: [
    'MBTI相性',
    'MBTI相性表',
    'MBTI相性診断',
    'MBTI 相性 ランキング',
    '16タイプ 相性',
    'Myers-Briggs 相性',
    'マイヤーズブリッグス 相性',
    '16タイプ性格分類 相性',
  ],
  typeIds: [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ] as const,
  /** 学術根拠サマリー */
  scientificBasis:
    'David Keirsey (1998) Please Understand Me II + Carl Jung (1921) Psychological Types + Isabel Briggs Myers (1962) MBTI Manual + John Beebe (2017) Energies and Patterns in Psychological Type',
  references: [
    {
      title: 'Please Understand Me II: Temperament, Character, Intelligence',
      author: 'Keirsey D',
      year: 1998,
      publisher: 'Prometheus Nemesis Book Company',
      url: 'https://keirsey.com/product/please-understand-me-ii/',
    },
    {
      title: 'MBTI Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator (3rd ed.)',
      author: 'Myers IB, McCaulley MH, Quenk NL, Hammer AL',
      year: 1998,
      publisher: 'CPP, Inc.',
      url: 'https://www.themyersbriggs.com/en-US/Products-and-Services/Myers-Briggs',
    },
    {
      title: 'Psychological Types (Collected Works of C.G. Jung, Vol. 6)',
      author: 'Jung CG',
      year: 1921,
      publisher: 'Princeton University Press',
      url: 'https://press.princeton.edu/books/paperback/9780691018133/psychological-types',
    },
    {
      title: 'Energies and Patterns in Psychological Type: The reservoir of consciousness',
      author: 'Beebe J',
      year: 2017,
      publisher: 'Routledge',
      url: 'https://www.routledge.com/Energies-and-Patterns-in-Psychological-Type-The-reservoir-of-consciousness/Beebe/p/book/9781138859760',
    },
    {
      title: 'Please Understand Me: Character and Temperament Types (5th ed.)',
      author: 'Keirsey D, Bates M',
      year: 1984,
      publisher: 'Prometheus Nemesis Book Company',
      url: 'https://keirsey.com/product/please-understand-me/',
    },
  ],
  /** 公開日 */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;
