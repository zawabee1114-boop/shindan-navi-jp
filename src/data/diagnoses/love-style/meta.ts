/**
 * 恋愛スタイル診断 メタ情報
 *
 * 学術根拠:
 * - Lee JA (1973) "Colours of Love: An Exploration of the Ways of Loving" New Press
 *   6タイプ恋愛理論（Eros / Ludus / Storge / Pragma / Mania / Agape）の原典
 * - Hendrick C, Hendrick S (1986) "A Theory and Method of Love"
 *   Journal of Personality and Social Psychology, 50(2), 392-402
 *   DOI: 10.1037/0022-3514.50.2.392
 *   Love Attitudes Scale（LAS）の開発・検証
 * - Sternberg RJ (1986) "A triangular theory of love"
 *   Psychological Review, 93(2), 119-135
 *   DOI: 10.1037/0033-295X.93.2.119
 * - APA Dictionary of Psychology: Love style
 *   https://dictionary.apa.org/love-style
 *
 * 確認日: 2026-05-21
 * 情報の正確性: 公式資料・学術論文に基づく。推測情報は含まない。
 *
 * 注意:
 * - YMYL回避: 「依存症」「執着障害」等の医学・精神医学用語NG
 * - 「恋愛傾向」「恋愛スタイル」表現を使用する
 * - mania型を「メンヘラ」「依存症」等でラベリングしない
 * - LGBTQ+配慮: 「彼/彼女」ではなく「パートナー/相手」表現
 * - 心理的決定論NG: 「○○型は浮気する」等の断定禁止
 */

export const meta = {
  id: 'love-style',
  slug: 'love-style',
  /** 28-42字 */
  title: '恋愛スタイル診断【無料・3分・30問・J.A.Lee理論】｜診断ナビ',
  /** 80-120字 */
  description:
    'John Alan Lee（1973）の6タイプ恋愛理論に基づく無料診断。30問で情熱型（Eros）・遊戯型（Ludus）・友愛型（Storge）・実利型（Pragma）・感情型（Mania）・献身型（Agape）から恋愛スタイルを判定。恋愛傾向と相性がわかります。',
  mainKW: '恋愛スタイル診断',
  relatedKW: [
    '恋愛タイプ診断',
    '恋愛 傾向',
    '恋愛 タイプ',
    '恋愛スタイル 6タイプ',
    '恋愛心理学',
    'J.A.Lee 恋愛',
    'Colours of Love',
  ],
  questionCount: 30,
  estimatedMinutes: 3,
  resultTypeCount: 6,
  typeIds: ['eros', 'ludus', 'storge', 'pragma', 'mania', 'agape'] as const,
  /** 確認日: 2026-05-21 */
  scientificBasis:
    'John Alan Lee (1973) "Colours of Love: An Exploration of the Ways of Loving" New Press + Clyde Hendrick & Susan Hendrick (1986) Love Attitudes Scale (LAS), Journal of Personality and Social Psychology',
  references: [
    {
      title: 'Colours of Love: An Exploration of the Ways of Loving',
      author: 'Lee JA',
      year: 1973,
      publisher: 'New Press',
      url: 'https://scholar.google.com/scholar?q=Lee+1973+Colours+of+Love',
    },
    {
      title: 'A Theory and Method of Love',
      author: 'Hendrick C, Hendrick S',
      year: 1986,
      publisher: 'Journal of Personality and Social Psychology, 50(2), 392-402',
      url: 'https://doi.org/10.1037/0022-3514.50.2.392',
    },
    {
      title: 'A triangular theory of love',
      author: 'Sternberg RJ',
      year: 1986,
      publisher: 'Psychological Review, 93(2), 119-135',
      url: 'https://doi.org/10.1037/0033-295X.93.2.119',
    },
    {
      title: 'APA Dictionary of Psychology: Love style',
      author: 'American Psychological Association',
      year: 2024,
      publisher: 'APA',
      url: 'https://dictionary.apa.org/love-style',
    },
    {
      title: 'Love Attitudes Scale: Two new measures',
      author: 'Hendrick C, Hendrick S, Dicke A',
      year: 1998,
      publisher: 'Journal of Social and Personal Relationships, 15(2), 137-142',
      url: 'https://doi.org/10.1177/0265407598152001',
    },
  ],
  /** 公開日（最終確認日） */
  publishedAt: '2026-05-21',
  updatedAt: '2026-05-21',
} as const;

export type LoveStyleTypeId = (typeof meta.typeIds)[number];
