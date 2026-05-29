// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

/**
 * URL ごとの最終更新日マップ（JST）
 * ページ実URLと完全一致させること。
 * 未登録は BUILD_DATE にフォールバック。
 *
 * 最終更新: 2026-05-29（IMP-2: 全未登録ページを実公開日（git初コミット日）で登録。偽鮮度解消）
 */
const PAGE_LAST_MODIFIED = {
  // ===== TOP =====
  '/': '2026-05-21',

  // ===== 診断メインハブ（8診断）=====
  '/diagnosis/': '2026-05-21',
  '/diagnosis/multi-int/': '2026-05-21',
  '/diagnosis/mbti/': '2026-05-21',
  '/diagnosis/disc/': '2026-05-21',
  '/diagnosis/perfectionism/': '2026-05-21',
  '/diagnosis/love-style/': '2026-05-21',
  '/diagnosis/money-style/': '2026-05-21',
  '/diagnosis/zodiac/': '2026-05-21',
  '/diagnosis/blood-compat/': '2026-05-21',
  '/diagnosis/friend-compat/': '2026-05-21',
  '/diagnosis/mbti-compat/': '2026-05-21',
  '/diagnosis/mbti-compat/love/': '2026-05-21',

  // ===== 恋愛依存 ハブ・サブページ =====
  '/diagnosis/love-dependency/': '2026-05-21',
  '/diagnosis/love-dependency/anxious/': '2026-05-21',
  '/diagnosis/love-dependency/avoidant/': '2026-05-21',
  '/diagnosis/love-dependency/codependent/': '2026-05-21',
  '/diagnosis/love-dependency/secure/': '2026-05-21',

  // ===== 音楽タイプ ハブ・サブページ =====
  '/diagnosis/music-type/': '2026-05-21',
  '/diagnosis/music-type/genre/': '2026-05-21',
  '/diagnosis/music-type/mbti-music/': '2026-05-21',
  '/diagnosis/music-type/mood/': '2026-05-21',
  '/diagnosis/music-type/multi-int/': '2026-05-21',

  // ===== 性格変化系 サブページ =====
  '/diagnosis/change/kawaru-kikkake/': '2026-05-21',
  '/diagnosis/change/mbti-kawatta/': '2026-05-21',
  '/diagnosis/change/seikaku-kawaru/': '2026-05-21',
  '/diagnosis/change/seikaku-kawatta/': '2026-05-21',

  // ===== DiSC サブページ =====
  '/diagnosis/disc/business/': '2026-05-21',
  '/diagnosis/disc/types-summary/': '2026-05-21',

  // ===== 完璧主義 サブページ =====
  '/diagnosis/perfectionism/naoshikata/': '2026-05-21',
  '/diagnosis/perfectionism/work/': '2026-05-21',
  '/diagnosis/perfectionism/yametai/': '2026-05-21',

  // ===== 血液型相性 サブページ =====
  '/diagnosis/blood-compat/best-match/': '2026-05-21',
  '/diagnosis/blood-compat/friend/': '2026-05-21',

  // ===== 血液型タイプ別 サブページ =====
  '/diagnosis/blood-type/a/': '2026-05-21',
  '/diagnosis/blood-type/ab/': '2026-05-21',
  '/diagnosis/blood-type/b/': '2026-05-21',
  '/diagnosis/blood-type/love/': '2026-05-21',
  '/diagnosis/blood-type/o/': '2026-05-21',
  '/diagnosis/blood-type/work/': '2026-05-21',

  // ===== 限定診断 =====
  '/diagnosis/limited/': '2026-05-22',
  '/diagnosis/limited/limited-2026-06/': '2026-05-22',

  // ===== 診断結果ページ（multi-int 8タイプ）=====
  '/diagnosis/multi-int/result/linguistic/': '2026-05-21',
  '/diagnosis/multi-int/result/logical/': '2026-05-21',
  '/diagnosis/multi-int/result/spatial/': '2026-05-21',
  '/diagnosis/multi-int/result/kinesthetic/': '2026-05-21',
  '/diagnosis/multi-int/result/musical/': '2026-05-21',
  '/diagnosis/multi-int/result/interpersonal/': '2026-05-21',
  '/diagnosis/multi-int/result/intrapersonal/': '2026-05-21',
  '/diagnosis/multi-int/result/naturalist/': '2026-05-21',

  // ===== 診断結果ページ（perfectionism 4タイプ）=====
  '/diagnosis/perfectionism/result/thorough/': '2026-05-22',
  '/diagnosis/perfectionism/result/particular/': '2026-05-22',
  '/diagnosis/perfectionism/result/procrastinating/': '2026-05-22',
  '/diagnosis/perfectionism/result/expecting/': '2026-05-22',

  // ===== 診断結果ページ（friend-compat 6タイプ）=====
  '/diagnosis/friend-compat/result/mood-maker/': '2026-05-22',
  '/diagnosis/friend-compat/result/listener/': '2026-05-22',
  '/diagnosis/friend-compat/result/leader/': '2026-05-22',
  '/diagnosis/friend-compat/result/lone-wolf/': '2026-05-22',
  '/diagnosis/friend-compat/result/harmonizer/': '2026-05-22',
  '/diagnosis/friend-compat/result/analyst/': '2026-05-22',

  // ===== 診断結果ページ（disc 4タイプ）=====
  '/diagnosis/disc/result/D/': '2026-05-21',
  '/diagnosis/disc/result/i/': '2026-05-21',
  '/diagnosis/disc/result/S/': '2026-05-21',
  '/diagnosis/disc/result/C/': '2026-05-21',

  // ===== 診断結果ページ（love-style 6タイプ）=====
  '/diagnosis/love-style/result/eros/': '2026-05-21',
  '/diagnosis/love-style/result/ludus/': '2026-05-21',
  '/diagnosis/love-style/result/storge/': '2026-05-21',
  '/diagnosis/love-style/result/pragma/': '2026-05-21',
  '/diagnosis/love-style/result/mania/': '2026-05-21',
  '/diagnosis/love-style/result/agape/': '2026-05-21',

  // ===== 診断結果ページ（money-style 4タイプ）=====
  '/diagnosis/money-style/result/avoidance/': '2026-05-22',
  '/diagnosis/money-style/result/worship/': '2026-05-22',
  '/diagnosis/money-style/result/status/': '2026-05-22',
  '/diagnosis/money-style/result/vigilance/': '2026-05-22',

  // ===== 星座ページ（12ページ）=====
  '/diagnosis/zodiac/aries/': '2026-05-21',
  '/diagnosis/zodiac/taurus/': '2026-05-21',
  '/diagnosis/zodiac/gemini/': '2026-05-21',
  '/diagnosis/zodiac/cancer/': '2026-05-21',
  '/diagnosis/zodiac/leo/': '2026-05-21',
  '/diagnosis/zodiac/virgo/': '2026-05-21',
  '/diagnosis/zodiac/libra/': '2026-05-21',
  '/diagnosis/zodiac/scorpio/': '2026-05-21',
  '/diagnosis/zodiac/sagittarius/': '2026-05-21',
  '/diagnosis/zodiac/capricorn/': '2026-05-21',
  '/diagnosis/zodiac/aquarius/': '2026-05-21',
  '/diagnosis/zodiac/pisces/': '2026-05-21',

  // ===== 相性ツール・表（5ページ）=====
  '/diagnosis/mbti-compat/tool/': '2026-05-21',
  '/diagnosis/mbti-compat/table/': '2026-05-21',
  '/diagnosis/blood-compat/tool/': '2026-05-21',
  '/diagnosis/blood-compat/table/': '2026-05-21',
  '/diagnosis/zodiac/compatibility/': '2026-05-21',

  // ===== MBTI恋愛相性（16タイプ）=====
  '/diagnosis/mbti-compat/love/INTJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/INTP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ENTJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ENTP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/INFJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/INFP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ENFJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ENFP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ISTJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ISFJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ESTJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ESFJ/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ISTP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ISFP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ESTP/': '2026-05-21',
  '/diagnosis/mbti-compat/love/ESFP/': '2026-05-21',

  // ===== 相性ハブ（aisei）=====
  '/aisei/': '2026-05-21',
  '/aisei/renai/': '2026-05-22',
  '/aisei/shokuba/': '2026-05-22',
  '/aisei/yujin/': '2026-05-22',

  // ===== 学校軸（gakkou）=====
  '/aisei/gakkou/': '2026-05-21',
  '/aisei/gakkou/learning-style/': '2026-05-21',
  '/aisei/gakkou/multi-int-learning/': '2026-05-21',
  '/aisei/gakkou/parent-support/': '2026-05-21',
  '/aisei/gakkou/shinro/': '2026-05-21',

  // ===== 家族軸（kazoku）=====
  '/aisei/kazoku/': '2026-05-21',
  '/aisei/kazoku/communication/': '2026-05-21',
  '/aisei/kazoku/fufu/': '2026-05-20',
  '/aisei/kazoku/oyako/': '2026-05-20',

  // ===== 信頼・法的ページ =====
  '/about/': '2026-05-21',
  '/editorial-policy/': '2026-05-21',
  '/contact/': '2026-05-21',
  '/faq/': '2026-05-21',
  '/privacy/': '2026-05-20',
  '/terms/': '2026-05-20',
  '/disclaimer/': '2026-05-21',
  '/tokushoho/': '2026-05-21',

  // ===== その他機能ページ =====
  '/pro/': '2026-05-21',
  '/pass/': '2026-05-22',
  '/changelog/': '2026-05-27',
  '/time-capsule/': '2026-05-21',
  '/time-capsule/letter/': '2026-05-21',
  '/character/': '2026-05-22',
};

/** ビルド実行日（JST）をデフォルトの lastmod として使用 */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/**
 * サイトマップ除外パターン
 *
 * 除外対象:
 * - /share/   : 動的個人シェアページ（重複コンテンツ防止）
 * - /me/      : 個人データページ（noindex）
 * - /favorites/: 個人データページ（noindex）
 * - /profile/ : 統合プロファイル（noindex・個人LocalStorageデータ）
 * - /strengths/: 準備中（noindex）
 * - /aisei/kazoku/fufu/ など: 個人データ統合ページ（LocalStorage依存）
 *
 * 注意: 診断結果ページ（/result/配下）はSEO対象として含める
 *   旧パターン /result\/[a-z0-9-]+\// は大文字タイプ(D/S/C/i等)を
 *   誤除外していたため削除
 */
const SITEMAP_EXCLUDE = [
  /\/share\//,
  /\/me\//,
  /\/favorites\//,
  // noindex の個人データ・準備中ページ
  /^\/profile\/$/,
  /^\/strengths\/$/,
  // 認証・開発・noindexページ
  /^\/login\//,
  /^\/signup\//,
  /^\/dev\//,
  /^\/invite\//,
  /^\/search\//,
  // 相性診断ハブ（renai/shokuba/yujin は noindex 解除済み・2026-05-22）
  // kazoku/fufu と kazoku/oyako は個人データ依存のため引き続き除外なし
];

export default defineConfig({
  site: 'https://shindan-navi.jp',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
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

        // ============================================================
        // priority / changefreq 設定
        // 基準: zawa-empire/docs/seo-aio/06-technical.md
        // ============================================================
        if (pathname === '/') {
          // TOP: 最高優先度
          item.priority = 1.0;
          item.changefreq = 'weekly';

        } else if (pathname === '/diagnosis/') {
          // 診断ハブ: TOP次点
          item.priority = 0.95;
          item.changefreq = 'weekly';

        } else if (pathname === '/aisei/') {
          // 相性診断ハブ
          item.priority = 0.9;
          item.changefreq = 'weekly';

        } else if (
          pathname === '/diagnosis/multi-int/' ||
          pathname === '/diagnosis/mbti/' ||
          pathname === '/diagnosis/disc/' ||
          pathname === '/diagnosis/perfectionism/' ||
          pathname === '/diagnosis/love-style/' ||
          pathname === '/diagnosis/money-style/' ||
          pathname === '/diagnosis/zodiac/' ||
          pathname === '/diagnosis/blood-compat/' ||
          pathname === '/diagnosis/friend-compat/' ||
          pathname === '/diagnosis/mbti-compat/' ||
          pathname === '/diagnosis/mbti-compat/love/' ||
          pathname === '/diagnosis/love-dependency/' ||
          pathname === '/diagnosis/music-type/'
        ) {
          // 診断メインハブ（8診断 + 相性系ハブ + 拡張診断ハブ）
          item.priority = 0.9;
          item.changefreq = 'weekly';

        } else if (
          pathname.includes('/tool/') ||
          pathname.includes('/table/') ||
          pathname === '/diagnosis/zodiac/compatibility/'
        ) {
          // 相性ツール・相性表（5ページ）
          item.priority = 0.85;
          item.changefreq = 'weekly';

        } else if (pathname.includes('/result/')) {
          // タイプ別結果ページ（静的生成）
          item.priority = 0.85;
          item.changefreq = 'weekly';

        } else if (
          // 星座個別ページ（12ページ）
          pathname.match(/^\/diagnosis\/zodiac\/[a-z]+\/$/) &&
          !pathname.includes('/compatibility/')
        ) {
          item.priority = 0.85;
          item.changefreq = 'weekly';

        } else if (
          // MBTI恋愛相性 タイプ別（16ページ）
          pathname.match(/^\/diagnosis\/mbti-compat\/love\/[A-Z]+\/$/)
        ) {
          item.priority = 0.85;
          item.changefreq = 'weekly';

        } else if (pathname === '/pro/' || pathname === '/pass/') {
          // 収益化ページ
          item.priority = 0.8;
          item.changefreq = 'monthly';

        } else if (
          pathname === '/about/' ||
          pathname === '/editorial-policy/' ||
          pathname === '/faq/' ||
          pathname === '/changelog/'
        ) {
          // 信頼・E-E-A-Tページ（changelog は鮮度シグナルのため同等扱い）
          item.priority = 0.5;
          item.changefreq = 'monthly';

        } else if (pathname === '/contact/') {
          item.priority = 0.4;
          item.changefreq = 'yearly';

        } else if (
          pathname === '/privacy/' ||
          pathname === '/terms/' ||
          pathname === '/disclaimer/' ||
          pathname === '/tokushoho/'
        ) {
          // 法的ページ
          item.priority = 0.3;
          item.changefreq = 'yearly';

        } else {
          // その他（未分類・診断サブページ等）
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }

        item.fullPrecisionPriority = true;
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
