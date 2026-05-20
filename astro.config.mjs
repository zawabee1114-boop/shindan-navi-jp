// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * URL ごとの最終更新日マップ
 * ページ frontmatter の lastUpdated を反映。
 * 新規ページ追加時はここに追記する（未登録は buildDate にフォールバック）。
 */
const PAGE_LAST_MODIFIED = {
  '/':                          '2026-05-20',
  '/about/':                    '2026-05-20',
  '/editorial-policy/':         '2026-05-20',
  '/contact/':                  '2026-05-20',
  '/privacy/':                  '2026-05-20',
  '/terms/':                    '2026-05-20',
  '/diagnosis/mbti/':           '2026-05-20',
  '/diagnosis/blood-type/':     '2026-05-20',
  '/diagnosis/multiple-intelligences/': '2026-05-20',
  '/diagnosis/perfectionism/':  '2026-05-20',
  '/diagnosis/disc/':           '2026-05-20',
  '/diagnosis/love-style/':     '2026-05-20',
  '/diagnosis/zodiac/':         '2026-05-20',
  '/diagnosis/money-style/':    '2026-05-20',
  '/aisei/love/':               '2026-05-20',
  '/aisei/friend/':             '2026-05-20',
  '/aisei/couple/':             '2026-05-20',
  '/aisei/parent-child/':       '2026-05-20',
  '/profile/':                  '2026-05-20',
};

/** ビルド実行日（JST）をデフォルトの lastmod として使用 */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/**
 * サイトマップ除外パターン
 * 動的個人ページ・シェアページ・パーマリンク等はインデックス不要
 */
const SITEMAP_EXCLUDE = [
  /\/share\//,
  /\/me\//,
  /\/favorites\//,
  /\/result\/[a-z0-9-]+\//, // 動的診断結果URL
];

export default defineConfig({
  site: 'https://shindan-navi.jp',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        return !SITEMAP_EXCLUDE.some((pattern) => pattern.test(pathname));
      },
      serialize(item) {
        const url = item.url;
        const pathname = url.replace('https://shindan-navi.jp', '') || '/';

        // lastmod 設定（登録済みページは固定日付、未登録はビルド日）
        const mappedDate = PAGE_LAST_MODIFIED[pathname];
        item.lastmod = mappedDate ? new Date(mappedDate) : new Date(BUILD_DATE);

        // priority / changefreq 設定
        if (pathname === '/') {
          // トップページ
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (pathname.startsWith('/diagnosis/')) {
          // 個別診断ページ（主要SEOコンテンツ）
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (pathname.startsWith('/aisei/')) {
          // 相性診断カテゴリ
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (pathname === '/profile/' || pathname === '/character/') {
          // 統合機能ページ
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else if (pathname === '/ai-prompt/' || pathname === '/time-capsule/') {
          // PRO核機能
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (pathname === '/about/' || pathname === '/editorial-policy/') {
          // 信頼ページ（E-E-A-T）
          item.priority = 0.5;
          item.changefreq = 'yearly';
        } else if (pathname === '/contact/') {
          item.priority = 0.4;
          item.changefreq = 'yearly';
        } else if (
          pathname === '/privacy/' ||
          pathname === '/terms/' ||
          pathname === '/disclaimer/'
        ) {
          // 法的ページ
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          // その他（カテゴリハブ等）
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }

        return item;
      },
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
