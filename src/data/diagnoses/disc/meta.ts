/**
 * DiSC診断 メタ情報
 *
 * 学術根拠:
 * - Marston WM (1928) "Emotions of Normal People" Routledge
 * - Clarke WV (1956) "Activity Vector Analysis" Walter Clarke Associates
 * - Geier JG (1970s) Personal Profile System (Performax Systems)
 * - Wiley DiSC公式: https://www.discprofile.com/what-is-disc/overview
 * - Everything DiSC公式: https://www.everythingdisc.com/
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 *
 * 注意:
 * - 「DiSC」はWiley社の登録商標。商標表記「DiSC®」を冒頭・footnoteで明記すること
 * - 本診断はWiley社の公式DiSCアセスメントとは別の自己理解ツールです
 */

export const meta = {
  id: 'disc',
  slug: 'disc',
  /** 28-42字 */
  title: 'DiSC診断【無料・3分・28問・公式根拠付】｜診断ナビ',
  /** 80-120字 */
  description:
    'Marston (1928) のDiSC理論に基づく無料診断。28問に答えるだけでD（主導型）・i（感化型）・S（安定型）・C（慎重型）の4タイプを判定。リーダーシップ・チームビルディング・職場コミュニケーションへの活用方法がわかります。',
  mainKW: 'DiSC診断',
  relatedKW: [
    'DISC診断',
    'DiSC タイプ',
    'DiSC 仕事',
    'DiSC リーダーシップ',
    'DiSC チームビルディング',
    'D型 i型 S型 C型',
  ],
  questionCount: 28,
  estimatedMinutes: 3,
  resultTypeCount: 4,
  /** 確認日: 2026-05-20 */
  scientificBasis:
    'William Moulton Marston (1928) "Emotions of Normal People" + Walter Vernon Clarke (1956) Activity Vector Analysis + John Geier (1970s) Personal Profile System の現代版（Wiley DiSC公式系譜）',
  references: [
    {
      title: 'Emotions of Normal People',
      author: 'Marston WM',
      year: 1928,
      publisher: 'Routledge',
      url: 'https://archive.org/details/emotionsofnormal00mars',
    },
    {
      title: 'Activity Vector Analysis',
      author: 'Clarke WV',
      year: 1956,
      publisher: 'Walter Clarke Associates',
      url: 'https://www.discprofile.com/what-is-disc/history-of-disc',
    },
    {
      title: 'What is DiSC? – Overview',
      author: 'Wiley',
      year: 2024,
      publisher: 'Wiley / DiSC Profile',
      url: 'https://www.discprofile.com/what-is-disc/overview',
    },
    {
      title: 'Everything DiSC – Official Site',
      author: 'Wiley',
      year: 2024,
      publisher: 'Wiley',
      url: 'https://www.everythingdisc.com/',
    },
    {
      title: 'History of DiSC – From Marston to Everything DiSC',
      author: 'Wiley',
      year: 2024,
      publisher: 'DiSC Profile',
      url: 'https://www.discprofile.com/what-is-disc/history-of-disc',
    },
  ],
  /** 4タイプ ID一覧 */
  typeIds: ['D', 'i', 'S', 'C'] as const,
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;

export type DiscTypeId = (typeof meta.typeIds)[number];
