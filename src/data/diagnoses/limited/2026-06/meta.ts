/**
 * ストレス対処タイプ診断 メタ情報（2026年6月限定診断）
 *
 * 学術根拠:
 * - Lazarus RS, Folkman S (1984) "Stress, Appraisal, and Coping"
 *   https://link.springer.com/book/9780826141910
 * - Carver CS, Scheier MF, Weintraub JK (1989) Assessing coping strategies
 *   Journal of Personality and Social Psychology, 56(2), 267-283
 *   https://doi.org/10.1037/0022-3514.56.2.267
 * - Carver CS (1997) You want to measure coping but your protocol's too long
 *   International Journal of Behavioral Medicine, 4(1), 92-100
 *   https://doi.org/10.1207/s15327558ijbm0401_6
 *
 * PRO限定機能: 月1限定診断（PRO最上位特典）
 * 確認日: 2026-05-22
 * 情報の正確性: 公式学術資料に基づく。推測情報は含まない。
 *
 * YMYL注意事項:
 * - 「ストレス障害」「適応障害」等の医学用語NG
 * - 「ストレス対処スタイル」「コーピング傾向」の表現を使う
 * - 強いストレス時は専門家相談推奨を明示
 */

export const meta = {
  id: 'limited-2026-06',
  slug: 'limited-2026-06',
  /** 診断タイトル（28-42字）*/
  title: 'ストレス対処タイプ診断【2026年6月限定・PRO限定】｜診断ナビ',
  /** ディスクリプション（80-120字）*/
  description:
    'Lazarus & Folkman（1984）のコーピング理論に基づく6月限定診断。20問でストレス対処スタイルを「問題解決型」「感情調整型」「回避型」「サポート希求型」の4タイプに分類。PRO会員（¥590/月）限定公開。',
  mainKW: 'ストレス対処タイプ診断',
  relatedKW: [
    'ストレス対処 スタイル',
    'コーピング タイプ',
    'ストレス 対処法 診断',
    'ストレス 傾向 チェック',
    'ストレス マネジメント タイプ',
  ],
  questionCount: 20,
  estimatedMinutes: 3,
  resultTypeCount: 4,
  /** PRO限定フラグ */
  isProOnly: true,
  /** 公開月 */
  year: 2026,
  month: 6,
  /** 確認日: 2026-05-22 */
  scientificBasis:
    'Lazarus & Folkman (1984) Stress, Appraisal, and Coping + Carver CS (1997) Brief COPE',
  references: [
    {
      title: 'Stress, Appraisal, and Coping',
      author: 'Lazarus RS, Folkman S',
      year: 1984,
      publisher: 'Springer',
      url: 'https://link.springer.com/book/9780826141910',
    },
    {
      title: 'Assessing coping strategies: A theoretically based approach',
      author: 'Carver CS, Scheier MF, Weintraub JK',
      year: 1989,
      journal: 'Journal of Personality and Social Psychology',
      volume: '56(2)',
      pages: '267-283',
      url: 'https://doi.org/10.1037/0022-3514.56.2.267',
    },
    {
      title:
        "You want to measure coping but your protocol's too long: Consider the Brief COPE",
      author: 'Carver CS',
      year: 1997,
      journal: 'International Journal of Behavioral Medicine',
      volume: '4(1)',
      pages: '92-100',
      url: 'https://doi.org/10.1207/s15327558ijbm0401_6',
    },
    {
      title:
        'The Ways of Coping Questionnaire: Research edition',
      author: 'Folkman S, Lazarus RS',
      year: 1988,
      publisher: 'Consulting Psychologists Press',
      url: 'https://doi.org/10.1037/t06763-000',
    },
  ],
  /** 4タイプ ID一覧 */
  typeIds: [
    'problem-focused',
    'emotion-focused',
    'avoidance',
    'support-seeking',
  ] as const,
  /** 公開日 */
  publishedAt: '2026-06-01',
  updatedAt: '2026-05-22',
} as const;

export type StressCopeTypeId = (typeof meta.typeIds)[number];
