/**
 * 目標達成タイプ診断 メタ情報（2026年9月限定診断）
 *
 * 学術根拠:
 * - Dweck CS, Leggett EL (1988) A social-cognitive approach to motivation and personality
 *   Psychological Review, 95(2), 256-273
 *   https://doi.org/10.1037/0033-295X.95.2.256
 * - Elliot AJ, Church MA (1997) A hierarchical model of approach and avoidance achievement motivation
 *   Journal of Personality and Social Psychology, 72(1), 218-232
 *   https://doi.org/10.1037/0022-3514.72.1.218
 * - Elliot AJ, McGregor HA (2001) A 2×2 achievement goal framework
 *   Journal of Personality and Social Psychology, 80(3), 501-519
 *   https://doi.org/10.1037/0022-3514.80.3.501
 *
 * PRO限定機能: 月1限定診断（PRO最上位特典）
 * 確認日: 2026-09-06
 * 情報の正確性: 公式学術資料に基づく。推測情報は含まない。
 *
 * YMYL注意事項:
 * - 「無気力」「意欲障害」「燃え尽き症候群」等の医学・臨床用語NG
 * - 「目標への向き合い方」「達成目標の傾向」の表現を使う
 * - 4タイプに優劣をつけない。どのタイプにも強み・注意点がある構成にする
 */

export const meta = {
  id: 'limited-2026-09',
  slug: 'limited-2026-09',
  /** 診断タイトル（28-42字）*/
  title: '目標達成タイプ診断【2026年9月限定・PRO限定】｜診断ナビ',
  /** ディスクリプション（80-120字）*/
  description:
    'Elliot & McGregor（2001）の達成目標理論に基づく9月限定診断。20問で目標への向き合い方を「成長追求型」「着実維持型」「成果証明型」「堅実回避型」の4タイプに分類。PRO会員（¥590/月）限定公開。',
  mainKW: '目標達成タイプ診断',
  relatedKW: [
    '目標設定 タイプ 診断',
    '達成目標理論 タイプ',
    'マインドセット タイプ診断',
    'モチベーション タイプ 診断',
    '下半期 目標 診断',
  ],
  questionCount: 20,
  estimatedMinutes: 3,
  resultTypeCount: 4,
  /** PRO限定フラグ */
  isProOnly: true,
  /** 公開月 */
  year: 2026,
  month: 9,
  /** 確認日: 2026-09-06 */
  scientificBasis:
    'Elliot & McGregor (2001) 2×2 Achievement Goal Framework + Dweck & Leggett (1988) 社会的認知アプローチ',
  references: [
    {
      title: 'A social-cognitive approach to motivation and personality',
      author: 'Dweck CS, Leggett EL',
      year: 1988,
      journal: 'Psychological Review',
      volume: '95(2)',
      pages: '256-273',
      url: 'https://doi.org/10.1037/0033-295X.95.2.256',
    },
    {
      title: 'A hierarchical model of approach and avoidance achievement motivation',
      author: 'Elliot AJ, Church MA',
      year: 1997,
      journal: 'Journal of Personality and Social Psychology',
      volume: '72(1)',
      pages: '218-232',
      url: 'https://doi.org/10.1037/0022-3514.72.1.218',
    },
    {
      title: 'A 2×2 achievement goal framework',
      author: 'Elliot AJ, McGregor HA',
      year: 2001,
      journal: 'Journal of Personality and Social Psychology',
      volume: '80(3)',
      pages: '501-519',
      url: 'https://doi.org/10.1037/0022-3514.80.3.501',
    },
  ],
  /** 4タイプ ID一覧 */
  typeIds: [
    'mastery-approach',
    'mastery-avoidance',
    'performance-approach',
    'performance-avoidance',
  ] as const,
  /** 公開日（実際に公開した日。未来日や月初日の偽装はしない）*/
  publishedAt: '2026-09-06',
  updatedAt: '2026-09-06',
} as const;

export type GoalOrientationTypeId = (typeof meta.typeIds)[number];
