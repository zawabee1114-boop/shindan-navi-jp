/**
 * generate-result-ogp-png.mjs
 * 結果タイプ別 OGP SVG を PNG に変換するスクリプト
 *
 * Twitter/X・Facebook・LINE・Slack は OGP に SVG 非サポート（PNG 必須）。
 * generate-result-ogp.mjs で生成した SVG を sharp（librsvg 経由）で PNG 変換する。
 *
 * 実行: node scripts/generate-result-ogp-png.mjs
 *       または npm run build の prebuild フックで自動実行
 *
 * 出力: public/og/result/{diagnosisId}/{typeId}.png（1200×630px）
 */

import sharp from 'sharp';
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RESULT_OGP_DIR = join(__dirname, '../public/og/result');
const WIDTH = 1200;
const HEIGHT = 630;

let successCount = 0;
let skipCount = 0;
const errors = [];

console.log('=== generate-result-ogp-png.mjs: SVG → PNG 変換 ===\n');
console.log(`対象ディレクトリ: ${RESULT_OGP_DIR}\n`);

if (!existsSync(RESULT_OGP_DIR)) {
  console.error(`[ERR] ${RESULT_OGP_DIR} が存在しません。先に generate-result-ogp.mjs を実行してください。`);
  process.exit(1);
}

// public/og/result/{diagnosisId}/ 配下を再帰的に走査
const diagnosisDirs = readdirSync(RESULT_OGP_DIR).filter((name) => {
  const fullPath = join(RESULT_OGP_DIR, name);
  return statSync(fullPath).isDirectory();
});

for (const diagnosisId of diagnosisDirs) {
  const dirPath = join(RESULT_OGP_DIR, diagnosisId);
  const svgFiles = readdirSync(dirPath).filter((f) => f.endsWith('.svg'));

  console.log(`[${diagnosisId}] ${svgFiles.length}件の SVG を変換中...`);

  for (const svgFile of svgFiles) {
    const svgPath = join(dirPath, svgFile);
    const pngFile = svgFile.replace('.svg', '.png');
    const pngPath = join(dirPath, pngFile);

    try {
      const svgBuffer = readFileSync(svgPath);

      await sharp(svgBuffer, {
        density: 144, // 2x density for crisp rendering
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

      successCount++;
      console.log(`  [OK] ${diagnosisId}/${pngFile}`);
    } catch (err) {
      console.error(`  [ERR] ${diagnosisId}/${svgFile}: ${err.message}`);
      errors.push({ diagnosisId, file: svgFile, error: err.message });
    }
  }
}

console.log(`\n==============================`);
console.log(`合計 ${successCount} PNG ファイル生成完了`);
console.log(`スキップ: ${skipCount} 件`);

if (errors.length > 0) {
  console.error(`\nエラー ${errors.length} 件:`);
  for (const e of errors) {
    console.error(`  - ${e.diagnosisId}/${e.file}: ${e.error}`);
  }
  process.exit(1);
} else {
  console.log('全変換成功。OGP PNG は public/og/result/ 配下に配置されました。');
}
