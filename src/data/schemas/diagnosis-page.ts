/**
 * diagnosis-page.ts - 個別診断ページ用 JSON-LD テンプレート
 * 準拠: zawa-empire/docs/seo-aio/02-structured-data.md
 *
 * 使用スキーマ:
 * - WebApplication（診断ツール本体）
 * - FAQPage（FAQセクションが視覚的に表示されているページのみ）
 * - BreadcrumbList（BaseLayout の breadcrumbs prop 経由で自動生成）
 *
 * 注意:
 * - FAQPage は必ずページに視覚的に表示されているQ&Aのみ追記する
 * - @id 連結: isPartOf → WebSite/#website / publisher → Organization/#organization
 */

const SITE_URL = 'https://shindan-navi.jp';

/** 個別診断ページ用 WebApplication JSON-LD 生成 */
export function buildDiagnosisSchema(params: {
  name: string;
  url: string;
  description: string;
  operatingSystem?: string;
  applicationCategory?: string;
  /** 診断の質問数 */
  questionCount?: number;
  /** 無料 or 有料 */
  isFree?: boolean;
}) {
  const {
    name,
    url,
    description,
    operatingSystem = 'Web',
    applicationCategory = 'EntertainmentApplication',
    questionCount,
    isFree = true,
  } = params;

  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${absoluteUrl}#app`,
    name,
    url: absoluteUrl,
    description,
    operatingSystem,
    applicationCategory,
    inLanguage: 'ja-JP',
    isAccessibleForFree: isFree,
    ...(questionCount && {
      featureList: [`${questionCount}問の質問で診断`, '5シーン別行動指針', '相性診断と連携可能'],
    }),
    offers: isFree
      ? { '@type': 'Offer', price: '0', priceCurrency: 'JPY' }
      : { '@type': 'Offer', price: '390', priceCurrency: 'JPY' },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
  };
}

/** FAQPage JSON-LD 生成（ページに視覚表示されているFAQのみ） */
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** CollectionPage JSON-LD（カテゴリハブ用） */
export function buildCollectionPageSchema(params: {
  name: string;
  url: string;
  description: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  const { name, url, description, items } = params;
  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl}#collection`,
    name,
    url: absoluteUrl,
    description,
    inLanguage: 'ja-JP',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    hasPart: items.map((item) => ({
      '@type': 'WebApplication',
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      ...(item.description && { description: item.description }),
    })),
  };
}

/** AboutPage + Person JSON-LD（About / 編集ポリシーページ用） */
export function buildAboutPageSchema(params: {
  url: string;
  description: string;
}) {
  const { url, description } = params;
  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl}#about`,
    url: absoluteUrl,
    name: '診断ナビについて',
    description,
    inLanguage: 'ja-JP',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
  };
}

/**
 * 相性診断ハブページ用 JSON-LD
 * ItemList で各相性診断をリスト化
 */
export function buildAiseiHubSchema(params: {
  url: string;
  name: string;
  description: string;
  items: Array<{ name: string; url: string; position: number }>;
}) {
  const { url, name, description, items } = params;
  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl}#list`,
    url: absoluteUrl,
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
