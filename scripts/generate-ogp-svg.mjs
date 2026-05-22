/**
 * generate-ogp-svg.mjs
 * OGP 用 SVG 画像を診断別に生成するスクリプト
 * 実行: node scripts/generate-ogp-svg.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_DIR = join(__dirname, '../public/og');

mkdirSync(OUT_DIR, { recursive: true });

/** 診断別設定 */
const DIAGNOSES = [
  {
    id: 'multi-int',
    title: '多重知能テスト',
    subtitle: 'Howard Gardner理論 ｜ 8知能タイプ',
    desc: '才能を発見し、仕事・学習に活かす',
    icon: '🧠',
    color: '#ff9a4d',
    colorLight: '#fff4eb',
    gradStart: '#fff4eb',
    gradEnd: '#ffd6b0',
  },
  {
    id: 'mbti',
    title: 'MBTI診断',
    subtitle: '16タイプ ｜ 性格・相性分析',
    desc: '性格の核心を5軸で徹底分析',
    icon: '🔮',
    color: '#8b5cf6',
    colorLight: '#f3eeff',
    gradStart: '#f3eeff',
    gradEnd: '#ddd6fe',
  },
  {
    id: 'blood-type',
    title: '血液型診断',
    subtitle: 'A・B・O・AB型 ｜ 性格・相性',
    desc: '血液型から読み解く性格と人間関係',
    icon: '🩸',
    color: '#ff6f7a',
    colorLight: '#fff0f1',
    gradStart: '#fff0f1',
    gradEnd: '#ffc9cc',
  },
  {
    id: 'perfectionism',
    title: '完璧主義診断',
    subtitle: 'Multidimensional Perfectionism Scale',
    desc: '完璧主義の種類と向き合い方を発見',
    icon: '⭐',
    color: '#f0c14e',
    colorLight: '#fffbeb',
    gradStart: '#fffbeb',
    gradEnd: '#fde68a',
  },
  {
    id: 'disc',
    title: 'DiSC診断',
    subtitle: '4スタイル ｜ 行動・リーダーシップ',
    desc: 'チームでの役割と強みを分析',
    icon: '📊',
    color: '#34c0a8',
    colorLight: '#f0fdf9',
    gradStart: '#f0fdf9',
    gradEnd: '#a7f3e0',
  },
  {
    id: 'love-style',
    title: '恋愛スタイル診断',
    subtitle: 'J.A.Lee 恋愛スタイル理論',
    desc: '6つの恋愛スタイルで相性を深掘り',
    icon: '💕',
    color: '#ff7ab3',
    colorLight: '#fff0f7',
    gradStart: '#fff0f7',
    gradEnd: '#ffc8e1',
  },
  {
    id: 'zodiac',
    title: '星座占い診断',
    subtitle: '12星座 ｜ 性格・運気・相性',
    desc: '星座から読み解く性格と行動パターン',
    icon: '✨',
    color: '#4ea4f0',
    colorLight: '#eff8ff',
    gradStart: '#eff8ff',
    gradEnd: '#bfdbfe',
  },
  {
    id: 'money-style',
    title: '金銭感覚診断',
    subtitle: '行動経済学ベース ｜ お金との向き合い方',
    desc: 'あなたのマネースタイルを4タイプで分析',
    icon: '💰',
    color: '#c8a26a',
    colorLight: '#fdf8f0',
    gradStart: '#fdf8f0',
    gradEnd: '#f5e0b5',
  },
];

/** 統合プロファイル用 */
const SPECIAL = [
  {
    id: 'integrated',
    title: '統合プロファイル',
    subtitle: '8診断 × 5シーン軸',
    desc: '仕事・恋愛・友人・家族・学校の行動指針',
    icon: '🌟',
    color: '#7c5cff',
    colorLight: '#efeaff',
    gradStart: '#efeaff',
    gradEnd: '#c2b3ff',
  },
  {
    id: 'pass',
    title: '診断PASSで詳細レポート',
    subtitle: '¥390 買切 ｜ 全8診断に使える',
    desc: '5軸の詳細アドバイス・向く環境・注意点',
    icon: '🔑',
    color: '#5b8def',
    colorLight: '#eef3ff',
    gradStart: '#eef3ff',
    gradEnd: '#bfdbfe',
  },
  {
    id: 'pro',
    title: 'PRO会員で無限に深める',
    subtitle: '¥590/月 ｜ いつでも解約可',
    desc: 'タイムカプセル・AIプロンプト・変化グラフ',
    icon: '👑',
    color: '#7c5cff',
    colorLight: '#f3eeff',
    gradStart: '#1e1b4b',
    gradEnd: '#4f46e5',
    darkMode: true,
  },
  {
    id: 'limited',
    title: '限定診断',
    subtitle: '友達招待・特別解放',
    desc: '招待でしか受けられないプレミアム診断',
    icon: '🎁',
    color: '#ff7ab3',
    colorLight: '#fff0f7',
    gradStart: '#fff0f7',
    gradEnd: '#ffc8e1',
  },
];

/** SVG テンプレート生成関数 */
function buildSvg(config) {
  const {
    title,
    subtitle,
    desc,
    icon,
    color,
    colorLight,
    gradStart,
    gradEnd,
    darkMode = false,
  } = config;

  const textColor = darkMode ? '#ffffff' : '#1f2235';
  const textSoft = darkMode ? 'rgba(255,255,255,0.8)' : '#3b3d56';
  const textMuted = darkMode ? 'rgba(255,255,255,0.6)' : '#6e6e89';
  const chipBorder = darkMode ? 'rgba(255,255,255,0.3)' : color;
  const chipText = darkMode ? '#ffffff' : color;

  // タイトル長によってフォントサイズ調整
  const titleFontSize = title.length > 12 ? 48 : title.length > 8 ? 54 : 62;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </linearGradient>
    <linearGradient id="circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1020" cy="100" r="220" fill="${color}" fill-opacity="0.08"/>
  <circle cx="100" cy="580" r="160" fill="${color}" fill-opacity="0.06"/>

  <!-- Top badge -->
  <rect x="60" y="52" width="160" height="36" rx="18" fill="${color}"/>
  <text x="140" y="75" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="700" fill="white" text-anchor="middle">診断ナビ</text>

  <!-- Big icon -->
  <circle cx="980" cy="315" r="170" fill="${color}" fill-opacity="0.12"/>
  <circle cx="980" cy="315" r="120" fill="${color}" fill-opacity="0.1"/>
  <text x="980" y="350" font-size="110" text-anchor="middle">${icon}</text>

  <!-- Main headline -->
  <text x="60" y="220" font-family="'Noto Sans JP', sans-serif" font-size="${titleFontSize}" font-weight="900" fill="${textColor}" letter-spacing="-1">${title}</text>

  <!-- Subtitle -->
  <text x="60" y="278" font-family="'Noto Sans JP', sans-serif" font-size="22" font-weight="600" fill="${color}">${subtitle}</text>

  <!-- Description -->
  <text x="60" y="340" font-family="'Noto Sans JP', sans-serif" font-size="26" font-weight="400" fill="${textSoft}">${desc}</text>

  <!-- Feature chip: 無料 -->
  <rect x="60" y="390" width="110" height="38" rx="19" fill="none" stroke="${chipBorder}" stroke-width="1.5"/>
  <text x="115" y="414" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="600" fill="${chipText}" text-anchor="middle">完全無料</text>

  <!-- Feature chip: 相性診断 -->
  <rect x="184" y="390" width="130" height="38" rx="19" fill="none" stroke="${chipBorder}" stroke-width="1.5"/>
  <text x="249" y="414" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="600" fill="${chipText}" text-anchor="middle">相性診断あり</text>

  <!-- Feature chip: 統合 -->
  <rect x="328" y="390" width="160" height="38" rx="19" fill="none" stroke="${chipBorder}" stroke-width="1.5"/>
  <text x="408" y="414" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="600" fill="${chipText}" text-anchor="middle">統合プロファイル</text>

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="${color}" fill-opacity="0.12"/>
  <text x="600" y="616" font-family="'Inter', sans-serif" font-size="17" font-weight="600" fill="${color}" text-anchor="middle">shindan-navi.jp</text>
</svg>`;
}

// 8診断用 SVG を生成
let count = 0;
for (const d of DIAGNOSES) {
  const svg = buildSvg(d);
  const outPath = join(OUT_DIR, `${d.id}.svg`);
  writeFileSync(outPath, svg, 'utf-8');
  count++;
  console.log(`Generated: ${outPath}`);
}

// 特殊ページ用 SVG を生成
for (const s of SPECIAL) {
  const svg = buildSvg(s);
  const outPath = join(OUT_DIR, `${s.id}.svg`);
  writeFileSync(outPath, svg, 'utf-8');
  count++;
  console.log(`Generated: ${outPath}`);
}

console.log(`\nTotal: ${count} SVG files generated in ${OUT_DIR}`);
