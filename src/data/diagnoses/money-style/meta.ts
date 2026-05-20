/**
 * 金銭感覚診断 メタ情報
 *
 * 学術根拠:
 * - Klontz BT, Britt SL, Mentzer J, Klontz T (2011)
 *   "Money beliefs and financial behaviors: Development of the Klontz Money Script Inventory"
 *   Journal of Financial Therapy, 2(1). DOI: 10.4148/jft.v2i1.451
 *   4タイプのマネースクリプト理論（Money Scripts Inventory: KMSI）の原典
 *
 * - Furnham A (1984)
 *   "Many sides of the coin: The psychology of money usage"
 *   Personality and Individual Differences, 5(5), 501-509.
 *
 * - Mitchell TR, Mickel AE (1999)
 *   "The meaning of money: An individual difference perspective"
 *   Academy of Management Review, 24(3), 568-578.
 *
 * - American Psychological Association (APA)
 *   Financial Therapy / Money Psychology
 *   https://www.apa.org/topics/money
 *
 * 確認日: 2026-05-21
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 *
 * 注意:
 * - YMYL回避: 投資推奨・金融商品比較・税務助言 絶対NG
 * - 「守銭奴」「ケチ」「浪費家」等スティグマ表現NG → 「節制傾向」「消費志向」へ
 * - 「買い物依存症」「経済的虐待」等の医学用語NG
 * - 心理的決定論NG: 「○○型は必ず〜」等の断定禁止
 * - LGBTQ+配慮: 「彼/彼女」NG → 「パートナー」表現
 * - 占い口調NG
 */

export const meta = {
  id: 'money-style',
  slug: 'money-style',
  /** 28-42字 */
  title: '金銭感覚診断【無料・3分・24問・Klontz理論】｜診断ナビ',
  /** 80-120字 */
  description:
    'Klontz et al.（2011）のマネースクリプト理論に基づく無料診断。24問で回避型・崇拝型・地位型・用心型の4タイプからお金の価値観を判定。パートナーとの金銭感覚の相性や、キャリアへの影響も確認できます。',
  mainKW: '金銭感覚診断',
  relatedKW: [
    '金銭感覚 タイプ',
    'お金 性格診断',
    '金銭観',
    'マネースクリプト',
    'お金の使い方 タイプ',
    'カップル 金銭感覚',
    '結婚 お金 価値観',
  ],
  questionCount: 24,
  estimatedMinutes: 3,
  resultTypeCount: 4,
  typeIds: ['avoidance', 'worship', 'status', 'vigilance'] as const,
  /**
   * 学術根拠（要約）
   * Klontz BT et al. (2011) Klontz Money Script Inventory (KMSI) + Furnham A (1984) + Mitchell & Mickel (1999)
   */
  scientificBasis:
    'Klontz BT, Britt SL, Mentzer J, Klontz T (2011) "Money beliefs and financial behaviors: Development of the Klontz Money Script Inventory" Journal of Financial Therapy 2(1) DOI:10.4148/jft.v2i1.451 + Furnham A (1984) "Many sides of the coin: The psychology of money usage" Personality and Individual Differences',
  references: [
    {
      title:
        'Money beliefs and financial behaviors: Development of the Klontz Money Script Inventory',
      author: 'Klontz BT, Britt SL, Mentzer J, Klontz T',
      year: 2011,
      publisher: 'Journal of Financial Therapy, 2(1)',
      url: 'https://doi.org/10.4148/jft.v2i1.451',
    },
    {
      title: 'Many sides of the coin: The psychology of money usage',
      author: 'Furnham A',
      year: 1984,
      publisher: 'Personality and Individual Differences, 5(5), 501-509',
      url: 'https://doi.org/10.1016/0191-8869(84)90025-4',
    },
    {
      title: 'The meaning of money: An individual difference perspective',
      author: 'Mitchell TR, Mickel AE',
      year: 1999,
      publisher: 'Academy of Management Review, 24(3), 568-578',
      url: 'https://doi.org/10.5465/amr.1999.2202141',
    },
    {
      title: 'APA Topics: Money and Mental Health',
      author: 'American Psychological Association',
      year: 2024,
      publisher: 'APA',
      url: 'https://www.apa.org/topics/money',
    },
    {
      title: 'Affluence and the World of Work: When Money Does Not Bring Happiness',
      author: 'Joo SH, Grable JE',
      year: 2004,
      publisher:
        'Journal of Financial Counseling and Planning, 15(1)',
      url: 'https://scholar.google.com/scholar?q=Joo+Grable+2004+Financial+Counseling+Planning',
    },
  ],
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-21',
  updatedAt: '2026-05-21',
} as const;

export type MoneyStyleTypeId = (typeof meta.typeIds)[number];
