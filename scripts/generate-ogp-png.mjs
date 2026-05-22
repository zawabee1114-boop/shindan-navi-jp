/**
 * generate-ogp-png.mjs
 * OGP 用 PNG 画像を SVG から変換して生成するスクリプト
 *
 * 背景:
 *   Twitter/X・Facebook・LINE・Slack は OGP に SVG を非サポート（PNG/JPG 必須）。
 *   generate-ogp-svg.mjs で生成した SVG を sharp（librsvg 経由）で PNG 変換する。
 *
 * 実行: node scripts/generate-ogp-png.mjs
 *       または npm run build で prebuild フックが自動実行
 *
 * 出力: public/og/*.png（1200×630px）
 */

import sharp from 'sharp';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SVG_DIR = join(__dirname, '../public/og');
const OUT_DIR = join(__dirname, '../public/og');

mkdirSync(OUT_DIR, { recursive: true });

/** 変換対象の OGP ファイル名（SVG のベース名リスト）*/
const OGP_FILES = [
  'blood-type',
  'default',
  'disc',
  'integrated',
  'limited',
  'love-style',
  'mbti',
  'money-style',
  'multi-int',
  'pass',
  'perfectionism',
  'pro',
  'zodiac',
];

const WIDTH = 1200;
const HEIGHT = 630;

let successCount = 0;
let skipCount = 0;
const errors = [];

console.log('Generating OGP PNG images from SVG sources...\n');

for (const name of OGP_FILES) {
  const svgPath = join(SVG_DIR, `${name}.svg`);
  const pngPath = join(OUT_DIR, `${name}.png`);

  if (!existsSync(svgPath)) {
    console.warn(`  [SKIP] ${name}.svg not found`);
    skipCount++;
    continue;
  }

  try {
    const svgBuffer = readFileSync(svgPath);

    await sharp(svgBuffer, {
      density: 144, // 2x density for crisp rendering at 1200×630
    })
      .resize(WIDTH, HEIGHT, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png({
        compressionLevel: 8,
        adaptiveFiltering: true,
      })
      .toFile(pngPath);

    console.log(`  [OK]   ${name}.png  (${WIDTH}x${HEIGHT})`);
    successCount++;
  } catch (err) {
    console.error(`  [ERR]  ${name}: ${err.message}`);
    errors.push({ name, error: err.message });
  }
}

console.log(`\nDone: ${successCount} generated, ${skipCount} skipped, ${errors.length} errors.`);

if (errors.length > 0) {
  console.error('\nFailed files:');
  for (const e of errors) {
    console.error(`  - ${e.name}: ${e.error}`);
  }
  process.exit(1);
}
