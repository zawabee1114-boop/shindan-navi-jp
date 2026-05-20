/**
 * 血液型相性診断 メタ情報
 *
 * 学術根拠:
 * - 古川竹二 (1927) 「血液型による気質の研究」心理学研究
 * - 能見正比古 (1971) 『血液型でわかる相性』青春出版社
 * - Sakamoto A, Yamazaki K (2004) "Blood-typical Personality Stereotypes
 *   and Self-fulfilling Prophecy" International Journal of Psychology 39(4)
 * - 日本心理学会 公式見解「血液型と性格の無関連性」
 *   https://psych.or.jp/opinion/bl-personality/
 *
 * 注意:
 * - YMYL回避: 医療・精神疾患・治療に関する言及は絶対NG
 * - 占い口調・運命論・心理的決定論禁止
 * - 「相性が悪い」→「学び合いペア」「成長機会の多いペア」に言い換え
 * - 科学的相関は限定的との指摘を必ず明示（disclaimer 必須）
 * - 日本独自の文化的分類として扱う（医学的根拠とは別）
 *
 * 確認日: 2026-05-20
 * 情報の正確性: 公式資料・学術文献に基づく。推測情報は含まない。
 */

export const BLOOD_TYPES = ['A', 'B', 'O', 'AB'] as const;

export type BloodType = typeof BLOOD_TYPES[number];

export const meta = {
  id: 'blood-compat',
  slug: 'blood-compat',
  /** 28-42字 */
  title: '血液型相性診断【A・B・O・AB型完全版】｜診断ナビ',
  /** 80-120字 */
  description:
    '古川竹二（1927）・能見正比古（1971）の研究と日本の血液型性格分類文化をもとにした血液型相性診断。A×B×O×ABの全10ペアのスコア・特徴・恋愛・仕事相性を完全収録。血液型相性表・ランキングも掲載。',
  mainKW: '血液型相性',
  relatedKW: [
    '血液型相性ランキング',
    '血液型相性表',
    'A型B型相性',
    'O型相性',
    'AB型相性',
    '血液型相性 友達',
    '血液型 相性 恋愛',
    '血液型 相性 仕事',
  ],
  typeIds: ['A', 'B', 'O', 'AB'] as const,
  /** 学術根拠サマリー */
  scientificBasis:
    '古川竹二 (1927) 血液型による気質の研究（心理学研究）+ 能見正比古 (1971) 血液型でわかる相性（青春出版社）+ Sakamoto A & Yamazaki K (2004) Blood-typical Personality Stereotypes and Self-fulfilling Prophecy（International Journal of Psychology）',
  references: [
    {
      title: '血液型による気質の研究',
      author: '古川竹二',
      year: 1927,
      publisher: '心理学研究 第2巻第4号',
      url: 'https://www.jstage.jst.go.jp/browse/psycholres',
      note: '血液型性格分類研究の嚆矢。4型の気質傾向を初めて体系的に記述。',
    },
    {
      title: '血液型でわかる相性',
      author: '能見正比古',
      year: 1971,
      publisher: '青春出版社',
      url: 'https://www.seishun.co.jp/',
      note: '日本で血液型性格論を一般に広めた代表的著作。',
    },
    {
      title:
        'Blood-typical Personality Stereotypes and Self-fulfilling Prophecy: A, B, O, and AB Types',
      author: 'Sakamoto A, Yamazaki K',
      year: 2004,
      publisher: 'International Journal of Psychology, 39(4), 275-285',
      url: 'https://doi.org/10.1080/00207590344000248',
      note: '自己成就予言効果の観点から血液型ステレオタイプを検討。相関は限定的と結論。',
    },
    {
      title: '「血液型と性格」の関連についての公式見解',
      author: '日本心理学会',
      year: 2014,
      publisher: '日本心理学会',
      url: 'https://psych.or.jp/opinion/bl-personality/',
      note: '血液型と性格の間に科学的に明確な統計的相関は認められないとする公式見解。',
    },
    {
      title: '血液型と性格は無関係——血液型刻印効果の危険性',
      author: '縄田健悟',
      year: 2014,
      publisher: '心理学研究 85(2)',
      url: 'https://doi.org/10.4992/jjpsy.85.13E0025',
      note: '大規模調査で血液型性格論の科学的根拠のなさを示した研究。',
    },
  ],
  /** 免責事項（必須表示） */
  disclaimer:
    '本診断は日本の血液型性格分類文化と心理学的傾向研究を参考にしています。科学的に厳密な統計的相関は限定的との指摘があり（日本心理学会公式見解 2014年）、自己理解の話題として楽しむことを推奨します。医学的・臨床的な診断ではありません。',
  /** 公開日 */
  publishedAt: '2026-05-20',
  updatedAt: '2026-05-20',
} as const;
