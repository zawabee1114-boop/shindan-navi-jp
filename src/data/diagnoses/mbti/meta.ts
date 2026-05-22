/**
 * MBTI主診断 メタ情報
 *
 * 学術根拠:
 * - Jung CG (1921) Psychological Types
 *   https://press.princeton.edu/books/paperback/9780691018133/psychological-types
 * - Myers IB (1962/1998) MBTI Manual
 *   https://www.themyersbriggs.com/en-US/Products-and-Services/Myers-Briggs
 * - Myers IB, McCaulley MH (1985) Manual: A Guide to the Development and Use of the MBTI
 * - Keirsey D (1998) Please Understand Me II
 *   https://keirsey.com/product/please-understand-me-ii/
 * - The Myers-Briggs Company 公式
 *   https://www.themyersbriggs.com/
 *
 * 注意:
 * - MBTI® は The Myers-Briggs Company の登録商標
 * - 占い口調・心理的決定論禁止
 * - YMYL回避: 精神疾患・臨床診断は行わない
 * - ユーザー向け Big5/OCEAN/ビッグファイブ表記禁止 → 「特性」「傾向」を使用
 *
 * 確認日: 2026-05-22
 * 情報の正確性: 公式資料・学術文献に基づく。推測情報は含まない。
 */

export const MBTI_TYPE_IDS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

export type MBTITypeId = typeof MBTI_TYPE_IDS[number];

export const meta = {
  id: 'mbti',
  slug: 'mbti',
  /** 28-42字 */
  title: 'MBTI診断【無料・5分・40問・16タイプ判定】｜診断ナビ',
  /** 80-120字 */
  description:
    'Jung（1921）+Myers（1962）理論に基づくMBTI主診断。40問・約5分で外向/内向・感覚/直観・思考/感情・判断/知覚の4軸から16タイプを無料判定。自分のMBTIタイプを知って仕事・恋愛・友人関係を深く理解できます。',
  mainKW: 'MBTI診断',
  relatedKW: [
    'MBTI 16タイプ',
    'MBTI 無料',
    '性格診断 16タイプ',
    'Myers-Briggs',
    'MBTI テスト',
    '16personalities',
    'マイヤーズブリッグス',
    '16タイプ性格分類',
  ],
  questionCount: 40,
  estimatedMinutes: 5,
  resultTypeCount: 16,
  typeIds: MBTI_TYPE_IDS,
  /** 学術根拠サマリー */
  scientificBasis:
    'Carl Jung (1921) Psychological Types + Isabel Briggs Myers (1962) MBTI Manual + Katharine Cook Briggs + David Keirsey (1998) Please Understand Me II',
  references: [
    {
      title: 'Psychological Types (Collected Works of C.G. Jung, Vol. 6)',
      author: 'Jung CG',
      year: 1921,
      publisher: 'Princeton University Press',
      url: 'https://press.princeton.edu/books/paperback/9780691018133/psychological-types',
    },
    {
      title: 'MBTI Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator (3rd ed.)',
      author: 'Myers IB, McCaulley MH, Quenk NL, Hammer AL',
      year: 1998,
      publisher: 'CPP, Inc.',
      url: 'https://www.themyersbriggs.com/en-US/Products-and-Services/Myers-Briggs',
    },
    {
      title: 'Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator (1st ed.)',
      author: 'Myers IB, McCaulley MH',
      year: 1985,
      publisher: 'Consulting Psychologists Press',
      url: 'https://www.themyersbriggs.com/en-US/Products-and-Services/Myers-Briggs',
    },
    {
      title: 'Please Understand Me II: Temperament, Character, Intelligence',
      author: 'Keirsey D',
      year: 1998,
      publisher: 'Prometheus Nemesis Book Company',
      url: 'https://keirsey.com/product/please-understand-me-ii/',
    },
    {
      title: 'The Myers-Briggs Company 公式サイト',
      author: 'The Myers-Briggs Company',
      year: 2024,
      url: 'https://www.themyersbriggs.com/',
    },
  ],
  /** 公開日 */
  publishedAt: '2026-05-22',
  updatedAt: '2026-05-22',
} as const;
