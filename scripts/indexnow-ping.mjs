/**
 * IndexNow API 送信スクリプト
 *
 * 用途: ビルド後または手動実行で Bing / Yandex へ全ページを即時通知する。
 * 仕様: https://www.indexnow.org/documentation
 *
 * 実行方法:
 *   node scripts/indexnow-ping.mjs          # 実際に送信
 *   DRY_RUN=1 node scripts/indexnow-ping.mjs  # ドライラン（送信しない）
 *
 * 注意:
 *   - 同一URLは 1日1回まで（過剰送信は逆効果）
 *   - 1リクエスト最大 10,000 URL（現状 ~100ページなので余裕）
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

// ============================================================
// 設定
// ============================================================

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? 'ax4413ovu3r17ew1oef7v8i55mz9htca';
const HOST = 'shindan-navi.jp';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

/** IndexNow エンドポイント（api.indexnow.org = Bing/Yandex 両方に同時通知） */
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

/** サイトマップ XML のパス（@astrojs/sitemap が生成） */
const SITEMAP_PATHS = [
  join(ROOT_DIR, 'dist', 'client', 'sitemap-index.xml'),
  join(ROOT_DIR, 'dist', 'client', 'sitemap-0.xml'),
  join(ROOT_DIR, 'dist', 'sitemap-index.xml'),
  join(ROOT_DIR, 'dist', 'sitemap-0.xml'),
];

const DRY_RUN = process.env.DRY_RUN === '1';

// ============================================================
// サイトマップから URL を抽出
// ============================================================

/**
 * sitemap XML からすべての <loc> URL を抽出する。
 * sitemap-index.xml → 子サイトマップ参照 → 子をパースする。
 */
function extractUrlsFromXml(xmlContent) {
  const locMatches = xmlContent.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
  return Array.from(locMatches, (m) => m[1].trim());
}

function readSitemapFile() {
  for (const sitemapPath of SITEMAP_PATHS) {
    if (existsSync(sitemapPath)) {
      console.log(`[IndexNow] サイトマップ読み込み: ${sitemapPath}`);
      return readFileSync(sitemapPath, 'utf-8');
    }
  }
  return null;
}

/**
 * サイトマップ index から子サイトマップ URL を取得し、
 * さらに子サイトマップ内の loc を全取得する。
 */
function parseAllUrls(xmlContent) {
  const urls = extractUrlsFromXml(xmlContent);

  // sitemap-index.xml の場合は子サイトマップを参照
  if (xmlContent.includes('<sitemapindex')) {
    const childSitemapUrls = urls;
    const pageUrls = [];

    for (const childUrl of childSitemapUrls) {
      // ローカルファイルから読む（child sitemap-0.xml etc.）
      const fileName = childUrl.split('/').pop(); // e.g. "sitemap-0.xml"
      const distDir = [
        join(ROOT_DIR, 'dist', 'client'),
        join(ROOT_DIR, 'dist'),
      ].find((d) => existsSync(join(d, fileName)));

      if (distDir) {
        const childXml = readFileSync(join(distDir, fileName), 'utf-8');
        pageUrls.push(...extractUrlsFromXml(childXml));
      } else {
        console.warn(`[IndexNow] 子サイトマップ見つからず: ${fileName}`);
      }
    }

    return pageUrls;
  }

  // sitemap-0.xml の場合はそのまま使用
  return urls;
}

// ============================================================
// IndexNow API 送信
// ============================================================

async function pingIndexNow(urlList) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`[IndexNow] 送信先: ${INDEXNOW_ENDPOINT}`);
  console.log(`[IndexNow] URL 数: ${urlList.length}`);
  console.log(`[IndexNow] キー: ${INDEXNOW_KEY}`);
  console.log(`[IndexNow] キー検証 URL: ${KEY_LOCATION}`);

  if (DRY_RUN) {
    console.log('\n[IndexNow] *** DRY RUN モード（実際には送信しません） ***');
    console.log('[IndexNow] 送信予定 URL 一覧:');
    urlList.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
    console.log('\n[IndexNow] DRY RUN 完了。DRY_RUN=1 を外すと実際に送信されます。');
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  console.log(`[IndexNow] レスポンス: HTTP ${response.status}`);

  // IndexNow API レスポンスコード解説
  const statusMessages = {
    200: '成功: すべての URL を受け付けました',
    202: '受付済み: URL は検証後にクロールキューへ追加されます',
    400: 'エラー: リクエスト形式が不正です',
    403: 'エラー: キーが無効または keyLocation が一致しません',
    422: 'エラー: URL がキーの host と一致しません',
    429: 'エラー: リクエスト過多（1日1回まで）',
  };

  const message = statusMessages[response.status];
  if (message) {
    console.log(`[IndexNow] ${message}`);
  }

  if (response.status === 200 || response.status === 202) {
    console.log('[IndexNow] 送信成功。Bing / Yandex へのクロール促進が開始されました。');
  } else {
    let body = '';
    try {
      body = await response.text();
    } catch (_) {
      // ignore
    }
    throw new Error(`IndexNow API エラー: HTTP ${response.status}\n${body}`);
  }
}

// ============================================================
// メイン
// ============================================================

async function main() {
  console.log('=== IndexNow ping スクリプト 開始 ===');
  console.log(`[IndexNow] モード: ${DRY_RUN ? 'DRY RUN（送信なし）' : '本番送信'}`);

  // 1. サイトマップ読み込み
  const sitemapXml = readSitemapFile();

  if (!sitemapXml) {
    console.error(
      '[IndexNow] エラー: dist/ にサイトマップが見つかりません。\n' +
        '先に npm run build を実行してください。\n' +
        '確認パス:\n' +
        SITEMAP_PATHS.join('\n'),
    );
    process.exit(1);
  }

  // 2. URL 一覧取得
  const urlList = parseAllUrls(sitemapXml);

  if (urlList.length === 0) {
    console.error('[IndexNow] エラー: サイトマップから URL を取得できませんでした。');
    process.exit(1);
  }

  console.log(`[IndexNow] 取得 URL 数: ${urlList.length}`);

  // 3. IndexNow API 送信（1回のリクエストで最大 10,000 URL）
  await pingIndexNow(urlList);

  console.log('=== IndexNow ping スクリプト 完了 ===');
}

main().catch((err) => {
  console.error('[IndexNow] 致命的エラー:', err);
  process.exit(1);
});
