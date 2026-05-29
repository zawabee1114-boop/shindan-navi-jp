/**
 * generate-favicons.mjs
 * favicon.svg から PNG ファビコン一式を生成するスクリプト
 *
 * 生成物:
 *   public/favicon-32x32.png   (32x32)
 *   public/apple-touch-icon.png (180x180)
 *   public/favicon.ico          (32x32 ICO)
 *
 * Usage: node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');

// SVGの代わりに直接PNGバッファを生成（SVG→sharpのフォント依存を回避）
// 診断ナビロゴ: indigo (#6366f1) 背景 + 白文字 "診" または シンプルなアイコン

async function generateFavicons() {
  // 32x32 PNG: シンプルなインジゴ背景＋白の丸アイコン
  const svg32 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" rx="8" fill="#6366f1"/>
    <circle cx="16" cy="13" r="5" fill="white" opacity="0.95"/>
    <ellipse cx="16" cy="23" rx="7" ry="4" fill="white" opacity="0.95"/>
  </svg>`;

  const svg180 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
    <rect width="180" height="180" rx="40" fill="#6366f1"/>
    <circle cx="90" cy="72" r="30" fill="white" opacity="0.95"/>
    <ellipse cx="90" cy="128" rx="42" ry="24" fill="white" opacity="0.95"/>
  </svg>`;

  // 32x32 PNG
  const png32 = await sharp(Buffer.from(svg32))
    .resize(32, 32)
    .png()
    .toBuffer();

  writeFileSync(join(publicDir, 'favicon-32x32.png'), png32);
  console.log('✓ public/favicon-32x32.png generated');

  // 180x180 apple-touch-icon
  const png180 = await sharp(Buffer.from(svg180))
    .resize(180, 180)
    .png()
    .toBuffer();

  writeFileSync(join(publicDir, 'apple-touch-icon.png'), png180);
  console.log('✓ public/apple-touch-icon.png generated');

  // favicon.ico: ICO はシンプルな 32x32 PNG をそのまま .ico として配置
  // （ほとんどのブラウザはPNGをICOとして認識する）
  // 正式なICOバイナリ生成
  const icoBuffer = createIco(png32);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ public/favicon.ico generated');
}

/**
 * ICOバイナリを作成（1フレーム: 32x32 PNG）
 * ICO形式: 6バイトヘッダー + 16バイトディレクトリエントリ + PNGデータ
 */
function createIco(pngBuffer) {
  const HEADER_SIZE = 6;
  const DIR_ENTRY_SIZE = 16;
  const dataOffset = HEADER_SIZE + DIR_ENTRY_SIZE;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);       // Reserved
  header.writeUInt16LE(1, 2);       // Type: ICO
  header.writeUInt16LE(1, 4);       // Count: 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);        // Width: 32 (0 means 256)
  dirEntry.writeUInt8(32, 1);        // Height: 32
  dirEntry.writeUInt8(0, 2);         // Color count
  dirEntry.writeUInt8(0, 3);         // Reserved
  dirEntry.writeUInt16LE(1, 4);      // Color planes
  dirEntry.writeUInt16LE(32, 6);     // Bits per pixel
  dirEntry.writeUInt32LE(pngBuffer.length, 8);  // Image data size
  dirEntry.writeUInt32LE(dataOffset, 12);        // Image data offset

  return Buffer.concat([header, dirEntry, pngBuffer]);
}

generateFavicons().catch(console.error);
