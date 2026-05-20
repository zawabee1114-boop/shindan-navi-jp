/**
 * 多重知能テスト メタ情報
 * 理論: Howard Gardner「Frames of Mind」(1983)
 * 参考: https://www.pz.harvard.edu/projects/multiple-intelligences
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 */

export const meta = {
  id: 'multi-int',
  slug: 'multi-int',
  /** 28-42字 */
  title: '多重知能テスト【無料・5分・64問】｜診断ナビ',
  /** 80-120字 */
  description:
    'ハーバード大学Howard Gardner理論に基づく多重知能テスト。64問に答えるだけで言語・論理・視空間など8つの知能プロファイルを無料で診断。仕事・学習スタイル・向いている職種がわかります。',
  mainKW: '多重知能テスト',
  relatedKW: [
    '多重知能診断',
    '多重知能 8つ',
    '多重知能 仕事',
    '多重知能 学習スタイル',
    '知能テスト 無料',
    'MI理論',
    'ガードナー 多重知能',
  ],
  questionCount: 64,
  estimatedMinutes: 5,
  resultTypeCount: 8,
  scientificBasis: 'ハーバード大学 Howard Gardner（1983年「Frames of Mind」）',
  /** 確認日: 2026-05-20 */
  references: [
    {
      title: 'Frames of Mind: The Theory of Multiple Intelligences',
      author: 'Howard Gardner',
      year: 1983,
      publisher: 'Basic Books',
      url: 'https://www.basicbooks.com/titles/howard-gardner/frames-of-mind/9780465024339/',
    },
    {
      title: 'Multiple Intelligences - Project Zero（Harvard Graduate School of Education）',
      author: 'Project Zero, Harvard University',
      year: 2024,
      url: 'https://www.pz.harvard.edu/projects/multiple-intelligences',
    },
    {
      title: 'Intelligence Reframed: Multiple Intelligences for the 21st Century',
      author: 'Howard Gardner',
      year: 1999,
      publisher: 'Basic Books',
      url: 'https://www.basicbooks.com/titles/howard-gardner/intelligence-reframed/9780465026104/',
    },
  ],
  /** 8タイプ ID一覧 */
  typeIds: [
    'linguistic',
    'logical',
    'spatial',
    'kinesthetic',
    'musical',
    'interpersonal',
    'intrapersonal',
    'naturalist',
  ] as const,
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;

export type MultiIntTypeId = (typeof meta.typeIds)[number];
