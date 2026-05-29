/**
 * MID-5: .md 並走配置スクリプト
 *
 * 各診断ハブページの dist/client 配下に {slug}.md を生成する。
 * LLM（ChatGPT / Perplexity / Claude）が https://shindan-navi.jp/diagnosis/mbti.md
 * のようにクリーンMarkdown版を直接取得できるようにする。
 *
 * 実装方針:
 *   - ビルド後の dist/client/diagnosis/{slug}/index.html から
 *     title・description・JSON-LD・本文見出し（h1〜h3）・FAQを抽出
 *   - dist/client/diagnosis/{slug}.md として出力
 *     → Cloudflare Pages の静的配信でそのまま公開される
 *
 * 実行: npm run postbuild（build 後自動実行）または
 *       node scripts/generate-md-mirrors.mjs
 *
 * 注意:
 *   - Astro SSR ページ（動的ルート）は対象外
 *   - dist/client が存在することが前提（npm run build 後に実行）
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST_CLIENT = join(ROOT, 'dist', 'client');
const SITE_URL = 'https://shindan-navi.jp';

// ============================================================
// 対象ページ定義
// ============================================================

/**
 * 各診断ハブページの定義
 * dir: dist/client 配下のディレクトリパス
 * mdName: 出力する .md ファイル名（dir の親ディレクトリに配置）
 * desc: llms.txt 向けの簡単な説明
 */
const PAGES = [
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'mbti'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'mbti.md'),
    slug: '/diagnosis/mbti/',
    label: 'MBTI診断（16タイプ性格分類）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'multi-int'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'multi-int.md'),
    slug: '/diagnosis/multi-int/',
    label: '多重知能テスト（Gardner理論・8知能）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'disc'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'disc.md'),
    slug: '/diagnosis/disc/',
    label: 'DiSC診断（行動スタイル4タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'perfectionism'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'perfectionism.md'),
    slug: '/diagnosis/perfectionism/',
    label: '完璧主義診断（Hewitt & Flett理論・4タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'love-style'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'love-style.md'),
    slug: '/diagnosis/love-style/',
    label: '恋愛スタイル診断（J.A.Lee理論・6タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'love-dependency'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'love-dependency.md'),
    slug: '/diagnosis/love-dependency/',
    label: '恋愛における依存的傾向（愛着スタイル4タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'friend-compat'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'friend-compat.md'),
    slug: '/diagnosis/friend-compat/',
    label: '友達相性診断（Big Five・FIRO-B・6タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'money-style'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'money-style.md'),
    slug: '/diagnosis/money-style/',
    label: '金銭感覚診断（Klontzマネースクリプト理論・4タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'music-type'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'music-type.md'),
    slug: '/diagnosis/music-type/',
    label: '音楽タイプ診断（音楽心理学・6タイプ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'zodiac'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'zodiac.md'),
    slug: '/diagnosis/zodiac/',
    label: '星座性格診断（西洋占星術・12星座）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'mbti-compat'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'mbti-compat.md'),
    slug: '/diagnosis/mbti-compat/',
    label: 'MBTI相性一覧（16タイプ全組み合わせ）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis', 'blood-compat'),
    mdPath: join(DIST_CLIENT, 'diagnosis', 'blood-compat.md'),
    slug: '/diagnosis/blood-compat/',
    label: '血液型相性診断（A・B・O・AB型完全版）',
  },
  {
    dir: join(DIST_CLIENT, 'diagnosis'),
    mdPath: join(DIST_CLIENT, 'diagnosis.md'),
    slug: '/diagnosis/',
    label: '診断一覧（8診断＋相性系ハブ）',
  },
  {
    dir: join(DIST_CLIENT),
    mdPath: join(DIST_CLIENT, 'index.md'),
    slug: '/',
    label: '診断ナビ トップページ',
  },
];

// ============================================================
// HTML → Markdown 抽出関数
// ============================================================

/**
 * HTMLからtitleタグの内容を抽出
 */
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : '';
}

/**
 * HTMLからdescriptionメタタグを抽出
 */
function extractDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  return m ? m[1].trim() : '';
}

/**
 * HTMLからcanonical URLを抽出
 */
function extractCanonical(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  return m ? m[1].trim() : '';
}

/**
 * HTMLから最初の <h1> テキストを抽出
 */
function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * HTML から JSON-LD の FAQPage を抽出し、Q&Aを返す
 */
function extractFAQ(html) {
  const results = [];
  const scriptRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item['@type'] === 'FAQPage' && Array.isArray(item.mainEntity)) {
          for (const q of item.mainEntity) {
            results.push({
              question: q.name || '',
              answer: (q.acceptedAnswer && q.acceptedAnswer.text) || '',
            });
          }
        }
      }
    } catch (_) {
      // JSON parse error skip
    }
  }
  return results;
}

/**
 * HTML から h2 見出しテキスト一覧を抽出
 */
function extractH2s(html) {
  const results = [];
  const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) results.push(text);
  }
  return results;
}

/**
 * HTML から TL;DR ブロック（data-tldr または class="tldr"）を抽出
 */
function extractTldr(html) {
  // TldrBlock は sn-tldr クラスを持つと想定
  const m = html.match(/class="[^"]*sn-tldr[^"]*"[^>]*>([\s\S]*?)<\/(?:section|div|aside)>/i);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * HTML からページのMarkdownを生成
 */
function htmlToMarkdown(html, page) {
  const title = extractTitle(html);
  const description = extractDescription(html);
  const canonical = extractCanonical(html) || (SITE_URL + page.slug);
  const h1 = extractH1(html);
  const h2s = extractH2s(html);
  const faqs = extractFAQ(html);

  const lines = [];

  // ヘッダー
  lines.push(`# ${h1 || title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`URL: ${canonical}`);
  lines.push(`更新日: ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');

  // 目次
  if (h2s.length > 0) {
    lines.push('## 目次');
    for (const h of h2s) {
      lines.push(`- ${h}`);
    }
    lines.push('');
  }

  // FAQ
  if (faqs.length > 0) {
    lines.push('## よくある質問（FAQ）');
    lines.push('');
    for (const faq of faqs) {
      lines.push(`### ${faq.question}`);
      lines.push('');
      // URLリンクをMarkdownリンクに変換
      const answer = faq.answer.replace(/(https?:\/\/[^\s）、。,\]]+)/g, '[$1]($1)');
      lines.push(answer);
      lines.push('');
    }
  }

  // フッター
  lines.push('---');
  lines.push('');
  lines.push(`*このMarkdownファイルは [診断ナビ](${SITE_URL}) の LLM 向けクリーンコンテンツです。*`);
  lines.push(`*元ページ: ${canonical}*`);
  lines.push('');

  return lines.join('\n');
}

// ============================================================
// メイン処理
// ============================================================

let ok = 0;
let skip = 0;
let fail = 0;

console.log('=== MID-5: .md 並走ファイル生成 ===');

for (const page of PAGES) {
  const htmlPath = join(page.dir, 'index.html');

  if (!existsSync(htmlPath)) {
    console.log(`[SKIP] ${htmlPath} が見つかりません（ビルド対象外）`);
    skip++;
    continue;
  }

  try {
    const html = readFileSync(htmlPath, 'utf8');
    const markdown = htmlToMarkdown(html, page);
    writeFileSync(page.mdPath, markdown, 'utf8');
    console.log(`[OK] ${page.slug} → ${page.mdPath.split(/[\\/]/).slice(-3).join('/')}`);
    ok++;
  } catch (err) {
    console.error(`[FAIL] ${page.slug}: ${err.message}`);
    fail++;
  }
}

console.log(`\n完了: ${ok}件生成 / ${skip}件スキップ / ${fail}件失敗`);
if (fail > 0) process.exit(1);
