/**
 * 血液型サブタイプ診断 メタ情報
 *
 * 学術根拠:
 * - 古川竹二 (1927) 「血液型による気質の研究」心理学研究 第2巻第4号
 *   https://www.jstage.jst.go.jp/browse/psycholres
 * - 能見正比古 (1971) 『血液型でわかる相性』青春出版社（典型・変則・中間の概念）
 * - McCrae RR, Costa PT (1987) Big Five Personality Factors
 *   （外向性E・協調性A・神経症傾向N軸）
 * - Sakamoto A, Yamazaki K (2004) International Journal of Psychology 39(4)
 *   https://doi.org/10.1080/00207590344000248
 * - 日本心理学会 公式見解「血液型と性格の無関連性」(2014)
 *   https://psych.or.jp/opinion/bl-personality/
 *
 * 重要: 血液型と性格の間に科学的に明確な統計的相関は認められません。
 * 本診断は日本の文化的な傾向区分を参考情報として提示するものです。
 *
 * 確認日: 2026-06-07
 */

export const meta = {
  id: 'bloodSubtype',
  slug: 'blood-subtype',
  /** 28-42字 */
  title: '血液型サブタイプ診断【無料・12タイプ・学術根拠付】｜診断ナビ',
  /** 80-120字 */
  description:
    '血液型×Big5傾向分析による12サブタイプ診断。A型・B型・O型・AB型を「典型・行動・内省」など各3タイプに細分化。古川（1927）・能見（1971）の傾向区分をBig5の外向性・情緒安定性で再解釈。無料・登録不要・所要約3分。',
  mainKW: '血液型 サブタイプ',
  relatedKW: [
    '血液型 細かい',
    '血液型 詳しく',
    'A型 タイプ',
    'B型 タイプ',
    'O型 タイプ',
    'AB型 タイプ',
    '血液型 診断',
  ],
  questionCount: 10,
  estimatedMinutes: 3,
  resultTypeCount: 12,
  /** 確認日: 2026-06-07 */
  scientificBasis:
    '古川竹二 (1927) 血液型による気質の研究 + 能見正比古 (1971) 血液型でわかる相性（典型・変則・中間の概念）+ Big5 外向性(E)・協調性(A)・神経症傾向(N) 軸によるサブタイプ分化。ただし血液型と性格の科学的相関は限定的（日本心理学会2014年公式見解）。',
  references: [
    {
      title: '血液型による気質の研究',
      author: '古川竹二',
      year: 1927,
      publisher: '心理学研究 第2巻第4号',
      url: 'https://www.jstage.jst.go.jp/browse/psycholres',
    },
    {
      title: '血液型でわかる相性',
      author: '能見正比古',
      year: 1971,
      publisher: '青春出版社',
      url: 'https://www.seishun.co.jp/',
    },
    {
      title: 'Blood-typical Personality Stereotypes and Self-fulfilling Prophecy',
      author: 'Sakamoto A, Yamazaki K',
      year: 2004,
      publisher: 'International Journal of Psychology, 39(4), 275-285',
      url: 'https://doi.org/10.1080/00207590344000248',
    },
    {
      title: '「血液型と性格」の関連についての公式見解',
      author: '日本心理学会',
      year: 2014,
      publisher: '日本心理学会',
      url: 'https://psych.or.jp/opinion/bl-personality/',
    },
    {
      title: 'Validation of the Five-Factor Model of Personality Across Instruments and Observers',
      author: 'McCrae RR, Costa PT',
      year: 1987,
      publisher: 'Journal of Personality and Social Psychology, 52(1), 81-90',
      url: 'https://doi.org/10.1037/0022-3514.52.1.81',
    },
  ],
  /** 12タイプ ID一覧（血液型-サブタイプ番号） */
  typeIds: [
    'A-typical', 'A-active', 'A-inner',
    'B-typical', 'B-social', 'B-focused',
    'O-typical', 'O-gentle', 'O-explorer',
    'AB-typical', 'AB-empathy', 'AB-analyst',
  ] as const,
  /** 4血液型 */
  bloodTypes: ['A', 'B', 'O', 'AB'] as const,
  /** 公開日（最終確認日） */
  publishedAt: '2026-06-07',
  updatedAt: '2026-06-07',
} as const;

export type BloodSubtypeId = (typeof meta.typeIds)[number];
export type BloodType = (typeof meta.bloodTypes)[number];
