/**
 * 完璧主義診断 メタ情報
 *
 * 学術根拠:
 * - Hewitt & Flett (1991) Multidimensional Perfectionism Scale
 * - Frost et al. (1990) Multidimensional Perfectionism Scale（Frost版）
 * - Stoeber & Otto (2006) 適応的/不適応的完璧主義の二分法
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 */

export const meta = {
  id: 'perfectionism',
  slug: 'perfectionism',
  /** 28-42字 */
  title: '完璧主義診断【無料・3分・28問】｜診断ナビ',
  /** 80-120字 */
  description:
    'Hewitt & Flett (1991) の多次元完璧主義尺度に基づく無料の完璧主義診断。28問に答えるだけで「徹底型」「こだわり型」「先延ばし型」「期待型」の4タイプを判定。仕事・恋愛・日常での向き合い方がわかります。',
  mainKW: '完璧主義診断',
  relatedKW: [
    '完璧主義 やめたい',
    '完璧主義 治し方',
    '完璧主義 仕事',
    '完璧主義 タイプ',
    '完璧主義者',
    '完璧主義 恋愛',
  ],
  questionCount: 28,
  estimatedMinutes: 3,
  resultTypeCount: 4,
  /** 確認日: 2026-05-20 */
  scientificBasis:
    'Hewitt & Flett (1991) Multidimensional Perfectionism Scale + Frost et al. (1990) MPS + Stoeber & Otto (2006) 適応的/不適応的二分法',
  references: [
    {
      title: 'Perfectionism in the self and social contexts: Conceptualization, assessment, and association with psychopathology',
      author: 'Hewitt PL, Flett GL',
      year: 1991,
      journal: 'Journal of Personality and Social Psychology',
      volume: '60(3)',
      pages: '456-470',
      url: 'https://doi.org/10.1037/0022-3514.60.3.456',
    },
    {
      title: 'The dimensions of perfectionism',
      author: 'Frost RO, Marten P, Lahart C, Rosenblate R',
      year: 1990,
      journal: 'Cognitive Therapy and Research',
      volume: '14(5)',
      pages: '449-468',
      url: 'https://doi.org/10.1007/BF01172967',
    },
    {
      title: 'Positive conceptions of perfectionism: Approaches, evidence, challenges',
      author: 'Stoeber J, Otto K',
      year: 2006,
      journal: 'Personality and Social Psychology Review',
      volume: '10(4)',
      pages: '295-319',
      url: 'https://doi.org/10.1207/s15327957pspr1004_2',
    },
    {
      title: 'Perfectionism: Theory, Research, and Practice',
      author: 'Stoeber J (Ed.)',
      year: 2018,
      publisher: 'American Psychological Association',
      url: 'https://www.apa.org/pubs/books/4318054',
    },
  ],
  /** 4タイプ ID一覧 */
  typeIds: [
    'thorough',
    'particular',
    'procrastinating',
    'expecting',
  ] as const,
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;

export type PerfectionismTypeId = (typeof meta.typeIds)[number];
