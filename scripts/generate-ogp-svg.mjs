/**
 * generate-ogp-svg.mjs
 * OGP 用 SVG 画像を診断別に生成するスクリプト
 * 実行: node scripts/generate-ogp-svg.mjs
 *
 * 注意: Unicode絵文字は一切使用しない。
 *       全アイコンはインラインSVGパス（path/circle要素）で描画する。
 *       これにより sharp/librsvg 変換時の黒シルエット問題を解消する。
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_DIR = join(__dirname, '../public/og');

mkdirSync(OUT_DIR, { recursive: true });

/**
 * SVGアイコン定義（viewBox: 0 0 24 24 ベース）
 * cx/cy=980, r=170 の円の中心に配置する想定。
 * OGP上でのレンダリングサイズ: 140×140px 相当
 * transformで 980, 315 中心に配置する。
 */
const ICON_DEFS = {
  // MBTI: 4つの円が重なるパターン（性格の多面性）
  mbti: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M12 2.5c1.7 0 3 1.3 3 3 0 .8-.3 1.5-.8 2 .5-.5 1.2-.8 2-.8 1.7 0 3 1.3 3 3s-1.3 3-3 3c-.8 0-1.5-.3-2-.8.5.5.8 1.2.8 2 0 1.7-1.3 3-3 3s-3-1.3-3-3c0-.8.3-1.5.8-2-.5.5-1.2.8-2 .8-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.5.3 2 .8C9.3 7 9 6.3 9 5.5c0-1.7 1.3-3 3-3z" fill="${fill}"/>
      <circle cx="12" cy="11.7" r="2.3" fill="rgba(255,255,255,.35)"/>
    </g>`;
  },

  // 血液型: しずく
  'blood-type': (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M12 2.5s-6 7-6 11.4A6 6 0 0 0 12 20a6 6 0 0 0 6-6.1C18 9.5 12 2.5 12 2.5z" fill="${fill}"/>
    </g>`;
  },

  // 多重知能: 脳（左右）
  'multi-int': (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M8.5 3.5c-2 0-3.5 1.4-3.5 3.2 0 .4.1.8.2 1.2C3.8 8.6 3 9.8 3 11.2c0 1.3.7 2.4 1.8 3-.5.6-.8 1.4-.8 2.2 0 1.9 1.5 3.3 3.5 3.3 1.1 0 2.1-.5 2.8-1.2.5.4 1.1.6 1.7.6V5c-.7-.9-1.9-1.5-3.5-1.5z" fill="${fill}"/>
      <path d="M15.5 3.5c2 0 3.5 1.4 3.5 3.2 0 .4-.1.8-.2 1.2 1.4.7 2.2 1.9 2.2 3.3 0 1.3-.7 2.4-1.8 3 .5.6.8 1.4.8 2.2 0 1.9-1.5 3.3-3.5 3.3-1.1 0-2.1-.5-2.8-1.2-.5.4-1.1.6-1.7.6V5c.7-.9 1.9-1.5 3.5-1.5z" fill="${fill}" fill-opacity=".75"/>
    </g>`;
  },

  // 星座: 星
  zodiac: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M12 4l1.6 4.3L18 9.5l-3.2 2.8.9 4.4L12 14.5 8.3 16.7l.9-4.4L6 9.5l4.4-1.2L12 4z" fill="${fill}"/>
    </g>`;
  },

  // 完璧主義: シールド + チェック
  perfectionism: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M12 2.5L4 5.5v6.2c0 4.6 3.2 8.8 8 10 4.8-1.2 8-5.4 8-10V5.5l-8-3z" fill="${fill}"/>
      <path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="rgba(0,0,0,.25)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>`;
  },

  // DiSC: コンパス（円＋分割）
  disc: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <circle cx="12" cy="12" r="9" fill="${fill}"/>
      <path d="M12 3v18M3 12h18" stroke="rgba(255,255,255,.7)" stroke-width="1.6"/>
      <circle cx="12" cy="12" r="3.2" fill="rgba(255,255,255,.95)"/>
    </g>`;
  },

  // 恋愛スタイル: ハート
  'love-style': (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M12 20s-7-4.3-7-10c0-3 2.2-5 4.7-5C11.3 5 12 6.2 12 6.2S12.7 5 14.3 5C16.8 5 19 7 19 10c0 5.7-7 10-7 10z" fill="${fill}"/>
    </g>`;
  },

  // 金銭感覚: コイン/財布
  'money-style': (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M9 4.5h6l-1.5 3 1.5 1c2.4 1.5 4 4.2 4 6.8 0 3-2.5 5.2-7 5.2s-7-2.2-7-5.2c0-2.6 1.6-5.3 4-6.8L10.5 7.5 9 4.5z" fill="${fill}"/>
    </g>`;
  },

  // 統合プロファイル: 重なり合う3円（シナジー）
  integrated: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <circle cx="9" cy="10" r="6" fill="${fill}" fill-opacity=".9"/>
      <circle cx="15" cy="10" r="6" fill="${fill}" fill-opacity=".7"/>
      <circle cx="12" cy="15.5" r="6" fill="${fill}" fill-opacity=".8"/>
    </g>`;
  },

  // pass: カギ
  pass: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <circle cx="8" cy="9" r="4.5" fill="none" stroke="${fill}" stroke-width="2.2"/>
      <line x1="11.5" y1="11.5" x2="20" y2="20" stroke="${fill}" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="17" y1="18" x2="19" y2="16" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
      <line x1="15" y1="20" x2="17" y2="18" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  },

  // pro: 王冠
  pro: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || '#ffd700';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <path d="M3 17h18v2H3v-2z" fill="${fill}" fill-opacity=".9"/>
      <path d="M3 17L5 8l4.5 4L12 4l2.5 8L19 8l2 9H3z" fill="${fill}"/>
      <circle cx="12" cy="4.5" r="1.8" fill="${fill}"/>
      <circle cx="4.2" cy="8.2" r="1.5" fill="${fill}"/>
      <circle cx="19.8" cy="8.2" r="1.5" fill="${fill}"/>
    </g>`;
  },

  // limited: リボン付きギフトボックス
  limited: (cx, cy, size, color) => {
    const s = size / 24;
    const fill = color || 'white';
    return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
      <rect x="3" y="10" width="18" height="11" rx="1.5" fill="${fill}"/>
      <rect x="3" y="6" width="18" height="4" rx="1" fill="${fill}" fill-opacity=".85"/>
      <path d="M12 6c-1.5-3-4-3.5-4-1.5S10.5 6 12 6z" fill="${fill}" fill-opacity=".7"/>
      <path d="M12 6c1.5-3 4-3.5 4-1.5S13.5 6 12 6z" fill="${fill}" fill-opacity=".7"/>
      <line x1="12" y1="6" x2="12" y2="21" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    </g>`;
  },
};

/** 診断別設定 */
const DIAGNOSES = [
  {
    id: 'multi-int',
    title: '多重知能テスト',
    subtitle: 'Howard Gardner理論 | 8知能タイプ',
    desc: '才能を発見し、仕事・学習に活かす',
    iconKey: 'multi-int',
    color: '#ff9a4d',
    colorLight: '#fff4eb',
    gradStart: '#fff4eb',
    gradEnd: '#ffd6b0',
  },
  {
    id: 'mbti',
    title: 'MBTI診断',
    subtitle: '16タイプ | 性格・相性分析',
    desc: '性格の核心を5軸で徹底分析',
    iconKey: 'mbti',
    color: '#8b5cf6',
    colorLight: '#f3eeff',
    gradStart: '#f3eeff',
    gradEnd: '#ddd6fe',
  },
  {
    id: 'blood-type',
    title: '血液型診断',
    subtitle: 'A・B・O・AB型 | 性格・相性',
    desc: '血液型から読み解く性格と人間関係',
    iconKey: 'blood-type',
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
    iconKey: 'perfectionism',
    color: '#f0c14e',
    colorLight: '#fffbeb',
    gradStart: '#fffbeb',
    gradEnd: '#fde68a',
  },
  {
    id: 'disc',
    title: 'DiSC診断',
    subtitle: '4スタイル | 行動・リーダーシップ',
    desc: 'チームでの役割と強みを分析',
    iconKey: 'disc',
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
    iconKey: 'love-style',
    color: '#ff7ab3',
    colorLight: '#fff0f7',
    gradStart: '#fff0f7',
    gradEnd: '#ffc8e1',
  },
  {
    id: 'zodiac',
    title: '星座占い診断',
    subtitle: '12星座 | 性格・運気・相性',
    desc: '星座から読み解く性格と行動パターン',
    iconKey: 'zodiac',
    color: '#4ea4f0',
    colorLight: '#eff8ff',
    gradStart: '#eff8ff',
    gradEnd: '#bfdbfe',
  },
  {
    id: 'money-style',
    title: '金銭感覚診断',
    subtitle: '行動経済学ベース | お金との向き合い方',
    desc: 'あなたのマネースタイルを4タイプで分析',
    iconKey: 'money-style',
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
    subtitle: '8診断 x 5シーン軸',
    desc: '仕事・恋愛・友人・家族・学校の行動指針',
    iconKey: 'integrated',
    color: '#7c5cff',
    colorLight: '#efeaff',
    gradStart: '#efeaff',
    gradEnd: '#c2b3ff',
  },
  {
    id: 'pass',
    title: '診断PASSで詳細レポート',
    subtitle: '¥390 買切 | 全8診断に使える',
    desc: '5軸の詳細アドバイス・向く環境・注意点',
    iconKey: 'pass',
    color: '#5b8def',
    colorLight: '#eef3ff',
    gradStart: '#eef3ff',
    gradEnd: '#bfdbfe',
  },
  {
    id: 'pro',
    title: 'PRO会員で無限に深める',
    subtitle: '¥590/月 | いつでも解約可',
    desc: 'タイムカプセル・AIプロンプト・変化グラフ',
    iconKey: 'pro',
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
    iconKey: 'limited',
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
    iconKey,
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

  // アイコン色: pro はゴールド、それ以外はホワイト
  const iconColor = iconKey === 'pro' ? '#ffd700' : 'white';

  // アイコンSVG生成（OGP大アイコン: 140px サイズ、中心 980, 315）
  const iconSvg = ICON_DEFS[iconKey]
    ? ICON_DEFS[iconKey](980, 315, 140, iconColor)
    : '';

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

  <!-- Big icon area -->
  <circle cx="980" cy="315" r="170" fill="${color}" fill-opacity="0.12"/>
  <circle cx="980" cy="315" r="120" fill="${color}" fill-opacity="0.1"/>
  ${iconSvg}

  <!-- Main headline -->
  <text x="60" y="220" font-family="'Noto Sans JP', sans-serif" font-size="${titleFontSize}" font-weight="900" fill="${textColor}" letter-spacing="-1">${title}</text>

  <!-- Subtitle -->
  <text x="60" y="278" font-family="'Noto Sans JP', sans-serif" font-size="22" font-weight="600" fill="${color}">${subtitle}</text>

  <!-- Description -->
  <text x="60" y="340" font-family="'Noto Sans JP', sans-serif" font-size="26" font-weight="400" fill="${textSoft}">${desc}</text>

  <!-- Feature chip: 完全無料 -->
  <rect x="60" y="390" width="110" height="38" rx="19" fill="none" stroke="${chipBorder}" stroke-width="1.5"/>
  <text x="115" y="414" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="600" fill="${chipText}" text-anchor="middle">完全無料</text>

  <!-- Feature chip: 相性診断あり -->
  <rect x="184" y="390" width="130" height="38" rx="19" fill="none" stroke="${chipBorder}" stroke-width="1.5"/>
  <text x="249" y="414" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="600" fill="${chipText}" text-anchor="middle">相性診断あり</text>

  <!-- Feature chip: 統合プロファイル -->
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
