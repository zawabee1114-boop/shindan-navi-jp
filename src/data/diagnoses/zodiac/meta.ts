/**
 * 星座性格診断 メタ情報
 *
 * 学術根拠:
 * - Carlson S (1985) "A double-blind test of astrology" Nature 318, 419-425
 *   https://doi.org/10.1038/318419a0
 *   （二重盲検で占星術の根拠を否定した代表的研究）
 * - Hartmann P, Reuter M, Nyborg H (2006)
 *   "The relationship between date of birth and individual differences in
 *    personality and general intelligence"
 *   Personality and Individual Differences 40(7), 1349-1362
 *   https://doi.org/10.1016/j.paid.2005.11.017
 * - National Geographic: "Astrology" (History & Culture)
 *   https://www.nationalgeographic.com/science/article/astrology
 * - International Astronomical Union (IAU): "Astronomy vs Astrology"
 *   https://www.iau.org/public/themes/astrology_vs_astronomy/
 * - 国立天文台 「占星術と天文学」
 *   https://www.nao.ac.jp/faq/a0204.html
 *
 * 重要ルール:
 * - 「未来予測」「運勢」「ラッキーアイテム」「今日の運勢」絶対NG
 * - 「12星座と性格特性の統計的関連」を科学者の懐疑的視点も併記して扱う
 * - Carlson 1985 Nature の批判研究を必ず引用
 * - 西洋占星術は「文化的性格分類フレームワーク」として扱う
 * - YMYL回避: 医療・精神疾患・治療言及は絶対NG
 * - 心理的決定論禁止（「必ず〜」→「傾向がある」）
 * - 「相性悪い」→「学び合いペア」「対比から学べるペア」
 *
 * 確認日: 2026-05-21
 * 情報の正確性: 公式資料・学術文献に基づく。推測情報は含まない。
 */

export const ZODIAC_TYPES = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
] as const;

export type ZodiacType = typeof ZODIAC_TYPES[number];

export const meta = {
  id: 'zodiac',
  slug: 'zodiac',
  /** 28-42字 */
  title: '星座性格診断【12星座完全版・性格分類×心理学】｜診断ナビ',
  /** 80-120字 */
  description:
    '西洋占星術の12星座分類×現代性格心理学の枠組みで自己理解を深める星座性格診断。牡羊座〜魚座の全12星座の性格特性・強み・仕事スタイル・12星座別相性を網羅。科学的位置付けも明示した信頼できる星座性格ガイド。',
  mainKW: '星座性格',
  relatedKW: [
    '12星座 性格',
    '星座 性格診断',
    '牡羊座 性格',
    '牡牛座 性格',
    '双子座 性格',
    '蟹座 性格',
    '獅子座 性格',
    '乙女座 性格',
    '天秤座 性格',
    '蠍座 性格',
    '射手座 性格',
    '山羊座 性格',
    '水瓶座 性格',
    '魚座 性格',
    '12星座 相性',
  ],
  typeIds: ZODIAC_TYPES,
  /** 学術根拠サマリー */
  scientificBasis:
    '西洋占星術（プトレマイオス『テトラビブロス』2世紀）× 現代性格心理学（Big Five FFM）× 性格分類研究の批判的検討（Carlson 1985 Nature）',
  references: [
    {
      title: 'A double-blind test of astrology',
      author: 'Carlson S',
      year: 1985,
      publisher: 'Nature 318, 419-425',
      url: 'https://doi.org/10.1038/318419a0',
      note: '二重盲検試験で占星術師の予測が偶然レベルと差がないことを示した科学的検証研究。占星術に科学的根拠がないことを示す代表的論文。',
    },
    {
      title:
        'The relationship between date of birth and individual differences in personality and general intelligence',
      author: 'Hartmann P, Reuter M, Nyborg H',
      year: 2006,
      publisher: 'Personality and Individual Differences 40(7), 1349-1362',
      url: 'https://doi.org/10.1016/j.paid.2005.11.017',
      note: '誕生日と性格・知能の関係を大規模調査。生まれ月と性格の間に統計的に有意な関連は見られないとの結論。',
    },
    {
      title: 'Astrology (History & Culture)',
      author: 'National Geographic',
      year: 2024,
      publisher: 'National Geographic',
      url: 'https://www.nationalgeographic.com/science/article/astrology',
      note: '占星術の文化的・歴史的位置付けを解説した教育コンテンツ。',
    },
    {
      title: 'Astronomy vs Astrology',
      author: 'International Astronomical Union (IAU)',
      year: 2024,
      publisher: 'IAU',
      url: 'https://www.iau.org/public/themes/astrology_vs_astronomy/',
      note: '天文学の国際機関による「占星術と天文学の違い」の公式解説。占星術は科学ではないと明記。',
    },
    {
      title: '占星術と天文学',
      author: '国立天文台',
      year: 2024,
      publisher: '国立天文台 (NAOJ)',
      url: 'https://www.nao.ac.jp/faq/a0204.html',
      note: '国立天文台による占星術と天文学の違いに関する公式見解。',
    },
  ],
  /** 免責事項（必須表示・全ページ） */
  disclaimer:
    '本診断は西洋占星術の12星座分類×現代性格心理学の枠組みで自己理解の参考として提供しています。占星術には科学的根拠が確認されていないとの研究（Carlson 1985 Nature等）があり、未来予測・運勢判断には使えません。エンタメ・自己理解のヒントとしてお楽しみください。',
  /** 公開日 */
  publishedAt: '2026-05-21',
  updatedAt: '2026-05-21',
} as const;
