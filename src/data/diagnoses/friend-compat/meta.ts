/**
 * 友達相性診断 メタ情報
 *
 * 学術根拠:
 * - Costa PT, McCrae RR (1992) Five-Factor Model（NEO-PI-R）
 *   https://doi.org/10.1037/t07435-000
 * - Schutz WC (1958) FIRO: A Three-Dimensional Theory of Interpersonal Behavior
 *   https://www.worldcat.org/title/firo-a-three-dimensional-theory-of-interpersonal-behavior/oclc/186068
 * - Hartup WW (1996) The company they keep: Friendships and their developmental significance
 *   https://doi.org/10.2307/1131834
 * - Selman RL (1980) The Growth of Interpersonal Understanding
 *   https://www.worldcat.org/title/growth-of-interpersonal-understanding/oclc/5549936
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 */

export const meta = {
  id: 'friend-compat',
  slug: 'friend-compat',
  /** 28-42字 */
  title: '友達相性診断【無料・5分・24問】｜診断ナビ',
  /** 80-120字 */
  description:
    'Big Five・FIRO-B・Hartup友情研究に基づく無料の友達相性診断。24問で「ムードメーカー型」「聴き上手型」「仕切り屋型」「一匹狼型」「同調型」「知性派型」の6タイプを判定。グループでの自分の役割と相性がわかります。',
  mainKW: '友達相性診断',
  relatedKW: [
    '友達相性',
    '友達 性格 タイプ',
    '友情 相性',
    'グループ 相性',
    '仲良し タイプ',
    'サークル 相性',
  ],
  questionCount: 24,
  estimatedMinutes: 5,
  resultTypeCount: 6,
  /** 6タイプID一覧 */
  typeIds: [
    'mood-maker',
    'listener',
    'leader',
    'lone-wolf',
    'harmonizer',
    'analyst',
  ] as const,
  /** 学術根拠サマリー */
  scientificBasis:
    'Big Five (Costa & McCrae 1992 NEO-PI-R) + Schutz FIRO-B (1958) + Hartup (1996) 友情発達研究 + Selman (1980) 対人理解発達理論',
  references: [
    {
      title: 'Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI)',
      author: 'Costa PT, McCrae RR',
      year: 1992,
      publisher: 'Psychological Assessment Resources',
      url: 'https://doi.org/10.1037/t07435-000',
    },
    {
      title: 'FIRO: A Three-Dimensional Theory of Interpersonal Behavior',
      author: 'Schutz WC',
      year: 1958,
      publisher: 'Rinehart',
      url: 'https://www.worldcat.org/title/firo-a-three-dimensional-theory-of-interpersonal-behavior/oclc/186068',
    },
    {
      title: 'The company they keep: Friendships and their developmental significance',
      author: 'Hartup WW',
      year: 1996,
      journal: 'Child Development',
      volume: '67(1)',
      pages: '1-13',
      url: 'https://doi.org/10.2307/1131834',
    },
    {
      title: 'The Growth of Interpersonal Understanding: Developmental and Clinical Analyses',
      author: 'Selman RL',
      year: 1980,
      publisher: 'Academic Press',
      url: 'https://www.worldcat.org/title/growth-of-interpersonal-understanding/oclc/5549936',
    },
    {
      title: 'Friendship and Peer Relations in Children',
      author: 'Bigelow BJ, Tesson G, Lewko JH',
      year: 1996,
      publisher: 'Guilford Press',
      url: 'https://www.guilford.com/books/Friendship-and-Peer-Relations-in-Children/Bigelow-Tesson-Lewko/9781572301269',
    },
  ],
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;

export type FriendTypeId = (typeof meta.typeIds)[number];
