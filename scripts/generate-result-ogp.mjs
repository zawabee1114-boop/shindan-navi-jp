/**
 * generate-result-ogp.mjs
 * 診断結果タイプ別 OGP SVG 生成スクリプト
 *
 * 対象: multi-int(8) / mbti(16) / mbti-compat/love(16) / perfectionism(4) /
 *        disc(4) / friend-compat(6) / love-style(6) / money-style(4) / zodiac(12) /
 *        animals(16) = 合計 約92枚
 *
 * 注意:
 * - Unicode絵文字は一切使用しない (SVGパスのみ)
 * - Big5/OCEAN/ビッグファイブ ユーザー向け表記禁止
 * - 占い口調禁止
 * - MBTI® 商標配慮（ユーザー向けテキストに® は付けない・診断ナビ独自ラベルで表記）
 *
 * 実行: node scripts/generate-result-ogp.mjs
 * 出力: public/og/result/{diagnosisId}/{typeId}.svg
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '../public');

// ============================================================
// 診断別カラー設定
// ============================================================
const DIAGNOSIS_COLORS = {
  'multi-int':    { primary: '#ff9a4d', gradStart: '#fff4eb', gradEnd: '#ffd6b0', dark: false },
  'mbti':         { primary: '#8b5cf6', gradStart: '#f3eeff', gradEnd: '#ddd6fe', dark: false },
  'mbti-love':    { primary: '#e85d9b', gradStart: '#fdf0f7', gradEnd: '#fbc8e0', dark: false },
  'perfectionism':{ primary: '#f0c14e', gradStart: '#fffbeb', gradEnd: '#fde68a', dark: false },
  'disc':         { primary: '#34c0a8', gradStart: '#f0fdf9', gradEnd: '#a7f3e0', dark: false },
  'friend-compat':{ primary: '#0ea5e9', gradStart: '#eff8ff', gradEnd: '#bfdbfe', dark: false },
  'love-style':   { primary: '#ff7ab3', gradStart: '#fff0f7', gradEnd: '#ffc8e1', dark: false },
  'money-style':  { primary: '#c8a26a', gradStart: '#fdf8f0', gradEnd: '#f5e0b5', dark: false },
  'zodiac':       { primary: '#4ea4f0', gradStart: '#eff8ff', gradEnd: '#bfdbfe', dark: false },
  'animals':      { primary: '#7c5cff', gradStart: '#efeaff', gradEnd: '#c2b3ff', dark: false },
};

// 星座エレメント別カラー上書き
const ZODIAC_ELEMENT_COLORS = {
  fire:  { primary: '#ef4444', gradStart: '#fff1f2', gradEnd: '#fecaca' },
  earth: { primary: '#84845a', gradStart: '#f5f5f0', gradEnd: '#d9d9b8' },
  air:   { primary: '#6366f1', gradStart: '#eef2ff', gradEnd: '#c7d2fe' },
  water: { primary: '#0e7490', gradStart: '#ecfeff', gradEnd: '#a5f3fc' },
};

// ============================================================
// SVG アイコン定義（24x24 viewbox → OGP上で scale して使用）
// ============================================================

/** 脳アイコン（多重知能） */
function iconBrain(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <path d="M8.5 3.5c-2 0-3.5 1.4-3.5 3.2 0 .4.1.8.2 1.2C3.8 8.6 3 9.8 3 11.2c0 1.3.7 2.4 1.8 3-.5.6-.8 1.4-.8 2.2 0 1.9 1.5 3.3 3.5 3.3 1.1 0 2.1-.5 2.8-1.2.5.4 1.1.6 1.7.6V5c-.7-.9-1.9-1.5-3.5-1.5z" fill="white"/>
    <path d="M15.5 3.5c2 0 3.5 1.4 3.5 3.2 0 .4-.1.8-.2 1.2 1.4.7 2.2 1.9 2.2 3.3 0 1.3-.7 2.4-1.8 3 .5.6.8 1.4.8 2.2 0 1.9-1.5 3.3-3.5 3.3-1.1 0-2.1-.5-2.8-1.2-.5.4-1.1.6-1.7.6V5c.7-.9 1.9-1.5 3.5-1.5z" fill="white" fill-opacity=".75"/>
  </g>`;
}

/** 4つの円（MBTI性格の多面性） */
function iconMbti(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <circle cx="9" cy="9" r="5" fill="white" fill-opacity=".9"/>
    <circle cx="15" cy="9" r="5" fill="white" fill-opacity=".7"/>
    <circle cx="9" cy="15" r="5" fill="white" fill-opacity=".75"/>
    <circle cx="15" cy="15" r="5" fill="white" fill-opacity=".85"/>
  </g>`;
}

/** ハート（恋愛系） */
function iconHeart(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <path d="M12 20s-7-4.3-7-10c0-3 2.2-5 4.7-5C11.3 5 12 6.2 12 6.2S12.7 5 14.3 5C16.8 5 19 7 19 10c0 5.7-7 10-7 10z" fill="white"/>
  </g>`;
}

/** シールド＋チェック（完璧主義） */
function iconShield(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <path d="M12 2.5L4 5.5v6.2c0 4.6 3.2 8.8 8 10 4.8-1.2 8-5.4 8-10V5.5l-8-3z" fill="white"/>
    <path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="rgba(0,0,0,.25)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>`;
}

/** コンパス（DiSC） */
function iconCompass(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <circle cx="12" cy="12" r="9" fill="white"/>
    <path d="M12 3v18M3 12h18" stroke="rgba(0,0,0,.15)" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="3.2" fill="rgba(0,0,0,.12)"/>
  </g>`;
}

/** 会話バブル（友達相性） */
function iconChat(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white"/>
    <circle cx="8" cy="11" r="1.2" fill="rgba(0,0,0,.2)"/>
    <circle cx="12" cy="11" r="1.2" fill="rgba(0,0,0,.2)"/>
    <circle cx="16" cy="11" r="1.2" fill="rgba(0,0,0,.2)"/>
  </g>`;
}

/** コイン（金銭感覚） */
function iconCoin(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <circle cx="12" cy="12" r="9" fill="white"/>
    <text x="12" y="17" font-size="11" font-weight="900" text-anchor="middle" fill="rgba(0,0,0,.25)" font-family="serif">¥</text>
  </g>`;
}

/** 星（星座） */
function iconStar(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <path d="M12 4l1.6 4.3L18 9.5l-3.2 2.8.9 4.4L12 14.5 8.3 16.7l.9-4.4L6 9.5l4.4-1.2L12 4z" fill="white"/>
  </g>`;
}

/** 動物の足跡（動物キャラ） */
function iconPaw(cx, cy, size) {
  const s = size / 24;
  return `<g transform="translate(${cx - size / 2}, ${cy - size / 2}) scale(${s})">
    <circle cx="9" cy="7" r="2.5" fill="white"/>
    <circle cx="15" cy="7" r="2.5" fill="white"/>
    <circle cx="6" cy="11" r="2" fill="white" fill-opacity=".8"/>
    <circle cx="18" cy="11" r="2" fill="white" fill-opacity=".8"/>
    <ellipse cx="12" cy="15" rx="5" ry="4" fill="white"/>
  </g>`;
}

// アイコン取得ヘルパー
function getIcon(diagnosisId, cx, cy, size) {
  switch(diagnosisId) {
    case 'multi-int':    return iconBrain(cx, cy, size);
    case 'mbti':
    case 'mbti-love':   return iconMbti(cx, cy, size);
    case 'perfectionism': return iconShield(cx, cy, size);
    case 'disc':         return iconCompass(cx, cy, size);
    case 'friend-compat': return iconChat(cx, cy, size);
    case 'love-style':   return iconHeart(cx, cy, size);
    case 'money-style':  return iconCoin(cx, cy, size);
    case 'zodiac':       return iconStar(cx, cy, size);
    case 'animals':      return iconPaw(cx, cy, size);
    default:             return iconBrain(cx, cy, size);
  }
}

// ============================================================
// 星座固有アイコン（SVGパス）
// ============================================================
const ZODIAC_SVG_ICONS = {
  aries:       `<path d="M12 5 C9 5 7 7 7 9 C7 12 10 14 12 16 C14 14 17 12 17 9 C17 7 15 5 12 5 Z M12 3 L12 5 M12 3 C12 3 9 1 8 3 M12 3 C12 3 15 1 16 3" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  taurus:      `<path d="M7 10 C7 6 9 4 12 4 C15 4 17 6 17 10 M5 8 C5 6 6 4 8 4 M19 8 C19 6 18 4 16 4 M7 10 C7 15 9 18 12 18 C15 18 17 15 17 10" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  gemini:      `<path d="M8 4 L8 20 M16 4 L16 20 M8 4 C10 6 14 6 16 4 M8 20 C10 18 14 18 16 20 M8 12 C10 11 14 13 16 12" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  cancer:      `<path d="M8 8 C6 10 6 14 8 16 C10 18 14 18 16 16 M16 16 C18 14 18 10 16 8 C14 6 10 6 8 8 M8 8 C10 6 12 7 12 9 M16 16 C14 18 12 17 12 15" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  leo:         `<circle cx="12" cy="10" r="5" stroke="white" stroke-width="1.8" fill="none"/><path d="M12 15 C12 18 10 20 9 19 C8 18 9 16 11 15" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  virgo:       `<path d="M7 4 L7 16 C7 18 9 19 11 19 L13 19 C15 19 17 18 17 16 M12 4 L12 19 M17 4 L17 10" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  libra:       `<path d="M5 14 L19 14 M12 14 C12 11 9 8 7 8 C9 8 15 8 17 8 C15 8 12 11 12 14 M8 18 L16 18" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  scorpio:     `<path d="M7 4 L7 16 M12 4 L12 16 M7 10 C9 8 10 8 12 10 M17 4 L17 14 C17 16 18 18 20 17" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  sagittarius: `<path d="M6 18 L18 6 M18 6 L11 6 M18 6 L18 13 M11 13 L13 11 M9 15 L11 13" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  capricorn:   `<path d="M7 4 L7 16 C7 18 9 20 12 20 C15 20 17 18 17 16 C17 14 15 13 13 14 C11 15 10 17 11 19 M7 10 C9 8 11 9 12 11" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  aquarius:    `<path d="M5 10 C7 8 9 12 11 10 C13 8 15 12 17 10 C19 8 20 10 20 10 M5 16 C7 14 9 18 11 16 C13 14 15 18 17 16 C19 14 20 16 20 16" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  pisces:      `<path d="M12 4 L12 20 M6 8 C8 6 10 8 12 8 C14 8 16 6 18 8 M6 16 C8 14 10 16 12 16 C14 16 16 14 18 16" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
};

// ============================================================
// SVG テキスト折り返しヘルパー
// ============================================================

/** 長いキャッチフレーズを2行に分割する（約22文字で折り返し）*/
function splitCatchphrase(text, maxLen = 22) {
  if (!text || text.length <= maxLen) return { line1: text || '', line2: '' };

  // 句読点・記号で自然な区切りを探す
  const separators = ['。', '、', '・', '，', '，', '─', '—', '。', '―'];
  let bestPos = -1;
  let minDiff = Infinity;

  for (let i = maxLen - 4; i <= maxLen + 4; i++) {
    if (i <= 0 || i >= text.length) continue;
    const diff = Math.abs(i - maxLen);
    if (separators.includes(text[i]) && diff < minDiff) {
      minDiff = diff;
      bestPos = i + 1;
    }
  }

  // 区切りが見つからなければ maxLen で強制分割
  const pos = bestPos > 0 ? bestPos : Math.min(maxLen, text.length);
  return {
    line1: text.slice(0, pos),
    line2: text.slice(pos),
  };
}

// ============================================================
// OGP SVG 生成関数（結果タイプ別）
// ============================================================

/**
 * 結果OGP SVG を生成する
 * @param {object} opts
 * @param {string} opts.diagnosisId    - 'multi-int' | 'mbti' | ...
 * @param {string} opts.diagnosisLabel - '多重知能テスト' | 'MBTI診断' | ...
 * @param {string} opts.typeId         - タイプID (例: 'linguistic', 'INTJ', 'aries')
 * @param {string} opts.typeName       - タイプ名日本語 (例: '言語的知能タイプ')
 * @param {string} opts.typeNameSub    - サブテキスト/英語名 (例: 'Linguistic')
 * @param {string} opts.catchphrase    - キャッチフレーズ
 * @param {string} [opts.zodiacSymbol] - 星座固有SVGパス
 * @param {object} [opts.colorOverride]- カラー上書き
 */
function buildResultSvg(opts) {
  const {
    diagnosisId,
    diagnosisLabel,
    typeId,
    typeName,
    typeNameSub,
    catchphrase,
    zodiacSymbol,
    colorOverride,
  } = opts;

  const colors = colorOverride ?? DIAGNOSIS_COLORS[diagnosisId] ?? DIAGNOSIS_COLORS['mbti'];
  const { primary, gradStart, gradEnd } = colors;

  const textColor = '#1f2235';
  const textSoft = '#3b3d56';

  // キャッチフレーズ分割
  const { line1, line2 } = splitCatchphrase(catchphrase, 20);

  // タイプ名のフォントサイズ調整
  const typeNameFontSize = typeName.length > 12 ? 38 : typeName.length > 8 ? 44 : 50;

  // サブテキスト（typeNameSub）が長い場合はトリム
  const subText = typeNameSub && typeNameSub.length > 28
    ? typeNameSub.slice(0, 26) + '…'
    : (typeNameSub || '');

  // 右側のアイコン描画
  const iconCx = 980;
  const iconCy = 300;
  const iconSize = 140;

  let iconContent = '';
  if (zodiacSymbol) {
    // 星座: 固有SVGパス (24x24 viewbox → scale で OGP上に配置)
    const s = iconSize / 24;
    iconContent = `<g transform="translate(${iconCx - iconSize / 2}, ${iconCy - iconSize / 2}) scale(${s})">${zodiacSymbol}</g>`;
  } else {
    iconContent = getIcon(diagnosisId, iconCx, iconCy, iconSize);
  }

  // 「あなたのタイプ」ラベル + タイプID 表示
  const showTypeIdBadge = ['mbti', 'mbti-love', 'disc'].includes(diagnosisId);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1020" cy="80" r="240" fill="${primary}" fill-opacity="0.09"/>
  <circle cx="80" cy="580" r="160" fill="${primary}" fill-opacity="0.06"/>
  <circle cx="500" cy="620" r="120" fill="${primary}" fill-opacity="0.04"/>

  <!-- 診断ラベル（左上バッジ） -->
  <rect x="60" y="48" width="176" height="36" rx="18" fill="${primary}"/>
  <text x="148" y="71" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="14" font-weight="700" fill="white" text-anchor="middle">${diagnosisLabel}</text>

  <!-- 「あなたのタイプ」ラベル -->
  <text x="60" y="148" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="18" font-weight="600" fill="${primary}">あなたのタイプ</text>

  <!-- タイプID バッジ（MBTI/DiSC） -->
  ${showTypeIdBadge ? `<rect x="60" y="165" width="160" height="64" rx="12" fill="${primary}" fill-opacity="0.12"/>
  <text x="140" y="210" font-family="'Inter', 'Arial', sans-serif" font-size="40" font-weight="900" fill="${primary}" text-anchor="middle" letter-spacing="2">${typeId}</text>` : ''}

  <!-- タイプ名 メイン -->
  <text x="60" y="${showTypeIdBadge ? '275' : '215'}" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="${typeNameFontSize}" font-weight="900" fill="${textColor}" letter-spacing="-0.5">${typeName}</text>

  <!-- サブテキスト（英語名等） -->
  ${subText ? `<text x="60" y="${showTypeIdBadge ? '315' : '255'}" font-family="'Inter', 'Arial', sans-serif" font-size="20" font-weight="500" fill="${primary}" opacity="0.85">${subText}</text>` : ''}

  <!-- キャッチフレーズ 1行目 -->
  <text x="60" y="${showTypeIdBadge ? '375' : '310'}" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="24" font-weight="400" fill="${textSoft}">${line1}</text>
  <!-- キャッチフレーズ 2行目 -->
  ${line2 ? `<text x="60" y="${showTypeIdBadge ? '410' : '345'}" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="24" font-weight="400" fill="${textSoft}">${line2}</text>` : ''}

  <!-- 右側アイコン装飾 -->
  <circle cx="${iconCx}" cy="${iconCy}" r="170" fill="${primary}" fill-opacity="0.12"/>
  <circle cx="${iconCx}" cy="${iconCy}" r="120" fill="${primary}" fill-opacity="0.10"/>
  ${iconContent}

  <!-- シェアCTA バッジ -->
  <rect x="60" y="${showTypeIdBadge ? '460' : '400'}" width="168" height="40" rx="20" fill="none" stroke="${primary}" stroke-width="1.5"/>
  <text x="144" y="${showTypeIdBadge ? '485' : '425'}" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="15" font-weight="600" fill="${primary}" text-anchor="middle">完全無料で診断</text>

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="${primary}" fill-opacity="0.12"/>
  <text x="600" y="616" font-family="'Inter', 'Arial', sans-serif" font-size="17" font-weight="600" fill="${primary}" text-anchor="middle">shindan-navi.jp</text>
</svg>`;
}

// ============================================================
// タイプデータ定義（TypeScript ファイルを直接読まず、
// 必要なデータのみ定数として抽出）
// ============================================================

// ---------- 多重知能 8タイプ ----------
const MULTI_INT_TYPES = [
  { id: 'linguistic',    name: '言語的知能タイプ',      nameEn: 'Linguistic',           catchphrase: '言葉で世界を切り拓く、知の探究者' },
  { id: 'logical',       name: '論理数学的知能タイプ',  nameEn: 'Logical-Mathematical',  catchphrase: '論理という武器で、謎を解き明かす思考者' },
  { id: 'spatial',       name: '視空間的知能タイプ',    nameEn: 'Spatial',               catchphrase: '見えないものを見える形に変える、ビジョンの創造者' },
  { id: 'kinesthetic',   name: '身体運動的知能タイプ',  nameEn: 'Bodily-Kinesthetic',    catchphrase: '体が語る。動くことで世界と繋がる、身体の達人' },
  { id: 'musical',       name: '音楽的知能タイプ',      nameEn: 'Musical',               catchphrase: '音が世界を彩る。感情を音楽で生きる表現者' },
  { id: 'interpersonal', name: '対人的知能タイプ',      nameEn: 'Interpersonal',         catchphrase: '人の心を読む。共に前へ進む、繋がりの達人' },
  { id: 'intrapersonal', name: '内省的知能タイプ',      nameEn: 'Intrapersonal',         catchphrase: '自分を知ることが、最大の強み。深い自己理解の哲学者' },
  { id: 'naturalist',    name: '博物的知能タイプ',      nameEn: 'Naturalist',            catchphrase: '自然のパターンを読む。万物を分類する、観察の達人' },
];

// ---------- MBTI 16タイプ ----------
const MBTI_TYPES = [
  { id: 'INTJ', name: '戦略家',    nameEn: 'INTJ - The Architect',    catchphrase: '戦略的な完璧主義者。独自のビジョンで世界を変える' },
  { id: 'INTP', name: '思想家',    nameEn: 'INTP - The Thinker',      catchphrase: '論理の探究者。知の海を自由に泳ぐ革新者' },
  { id: 'ENTJ', name: '統率者',    nameEn: 'ENTJ - The Commander',    catchphrase: '生まれながらのリーダー。目標に向かって突き進む' },
  { id: 'ENTP', name: '発明家',    nameEn: 'ENTP - The Debater',      catchphrase: '挑発的な革新者。常識を疑い、新境地を拓く' },
  { id: 'INFJ', name: '洞察者',    nameEn: 'INFJ - The Advocate',     catchphrase: '深い洞察と強い信念を持つ、希少なビジョナリー' },
  { id: 'INFP', name: '詩人',      nameEn: 'INFP - The Mediator',     catchphrase: '理想を追い続ける夢想家。人の可能性を信じる詩人' },
  { id: 'ENFJ', name: '教師',      nameEn: 'ENFJ - The Protagonist',  catchphrase: '人を育てる情熱的なリーダー。共感で世界を動かす' },
  { id: 'ENFP', name: '情熱家',    nameEn: 'ENFP - The Campaigner',   catchphrase: '自由な精神を持つ創造者。可能性に満ちた冒険者' },
  { id: 'ISTJ', name: '検査官',    nameEn: 'ISTJ - The Inspector',    catchphrase: '誠実で責任感溢れる守護者。伝統と秩序の番人' },
  { id: 'ISFJ', name: '保護者',    nameEn: 'ISFJ - The Defender',     catchphrase: '献身的な守り手。静かな力で周囲を支え続ける' },
  { id: 'ESTJ', name: '監督者',    nameEn: 'ESTJ - The Executive',    catchphrase: '実行力の化身。ルールと秩序でチームを導く' },
  { id: 'ESFJ', name: '世話焼き',  nameEn: 'ESFJ - The Consul',       catchphrase: '温かい心で人々を繋ぐ。調和を作る天性のホスト' },
  { id: 'ISTP', name: '職人',      nameEn: 'ISTP - The Virtuoso',     catchphrase: '大胆な実験者。実践で世界の仕組みを解き明かす' },
  { id: 'ISFP', name: '芸術家',    nameEn: 'ISFP - The Adventurer',   catchphrase: '感性豊かな探検家。今この瞬間の美しさを生きる' },
  { id: 'ESTP', name: '行動者',    nameEn: 'ESTP - The Entrepreneur', catchphrase: '大胆なリスクテイカー。瞬発力で状況を制する' },
  { id: 'ESFP', name: 'パフォーマー', nameEn: 'ESFP - The Entertainer', catchphrase: '生きることはエンタメ。場を笑顔で満たす天才' },
];

// ---------- 完璧主義 4タイプ ----------
const PERFECTIONISM_TYPES = [
  { id: 'thorough',      name: '徹底型',    nameEn: 'Self-Oriented',       catchphrase: 'やるなら100%。自分への基準が誰よりも高い、妥協なき完成追求者' },
  { id: 'particular',   name: 'こだわり型', nameEn: 'Organization-Oriented', catchphrase: '細部にこそ本質が宿る。秩序と精度を愛する、こだわりの職人気質' },
  { id: 'procrastinating', name: '慎重型', nameEn: 'Failure-Avoidant',    catchphrase: '完璧にできないなら始められない。失敗への恐れが生む、慎重さの罠' },
  { id: 'expecting',    name: '期待型',    nameEn: 'Socially-Prescribed',  catchphrase: '誰かの期待が、私のプレッシャー。他者の視線に揺れる、承認の追求者' },
];

// ---------- DiSC 4タイプ ----------
const DISC_TYPES = [
  { id: 'D', name: '主導型',   nameEn: 'Dominance',         catchphrase: '結果を出すために動く、スピードと実行力の牽引者' },
  { id: 'i', name: '感化型',   nameEn: 'influence',         catchphrase: '人を巻き込み、場を明るくする生まれながらのムードメーカー' },
  { id: 'S', name: '安定型',   nameEn: 'Steadiness',        catchphrase: 'チームの土台を支える、忍耐と協調の縁の下の力持ち' },
  { id: 'C', name: '慎重型',   nameEn: 'Conscientiousness', catchphrase: '正確性とデータで判断する、品質と根拠の専門家' },
];

// ---------- 友達相性 6タイプ ----------
const FRIEND_COMPAT_TYPES = [
  { id: 'mood-maker',  name: 'ムードメーカー型', nameEn: 'Mood Maker',               catchphrase: '場を明るくする、みんなの太陽' },
  { id: 'listener',    name: '聴き上手型',        nameEn: 'Compassionate Listener',   catchphrase: '話してよかったと思わせる、安心の存在' },
  { id: 'leader',      name: '仕切り屋型',        nameEn: 'Natural Leader',           catchphrase: 'みんなを動かす、頼れる旗振り役' },
  { id: 'lone-wolf',   name: '一匹狼型',          nameEn: 'Independent Spirit',       catchphrase: '少数の深い絆を大切にする、自分軸の人' },
  { id: 'harmonizer',  name: '同調型',            nameEn: 'Empathetic Harmonizer',    catchphrase: '空気を読んで、みんなをつなぐ縁の下の力持ち' },
  { id: 'analyst',     name: '知性派型',          nameEn: 'Thoughtful Analyst',       catchphrase: '深く考え、本質を語る。静かなる洞察者' },
];

// ---------- 恋愛スタイル 6タイプ ----------
const LOVE_STYLE_TYPES = [
  { id: 'eros',   name: '情熱型（Eros）',  nameEn: 'Eros',   catchphrase: '運命の出会いを信じる、情熱と直感の恋愛家' },
  { id: 'ludus',  name: '遊戯型（Ludus）', nameEn: 'Ludus',  catchphrase: '自由に楽しむ、恋愛の達人スタイル' },
  { id: 'storge', name: '友愛型（Storge）', nameEn: 'Storge', catchphrase: '信頼と時間が育む、友情から始まる深い絆' },
  { id: 'pragma', name: '実利型（Pragma）', nameEn: 'Pragma', catchphrase: '現実と感情を両立させる、賢明な恋愛設計者' },
  { id: 'mania',  name: '感情型（Mania）', nameEn: 'Mania',  catchphrase: '愛の深さを全力で感じる、感情の豊かな恋愛家' },
  { id: 'agape',  name: '献身型（Agape）', nameEn: 'Agape',  catchphrase: '見返りを求めない、深く静かな無償の愛' },
];

// ---------- 金銭感覚 4タイプ ----------
const MONEY_STYLE_TYPES = [
  { id: 'avoidance',  name: '回避型',  nameEn: 'Money Avoidance',  catchphrase: 'お金より大切なものがある、静かな価値観の持ち主' },
  { id: 'worship',    name: '崇拝型',  nameEn: 'Money Worship',    catchphrase: 'もっと稼げば、もっと自由になれると信じる行動派' },
  { id: 'status',     name: '地位型',  nameEn: 'Money Status',     catchphrase: '洗練された暮らしで、自分の価値を表現したい' },
  { id: 'vigilance',  name: '用心型',  nameEn: 'Money Vigilance',  catchphrase: '計画と節制で、将来への安心を積み上げる堅実派' },
];

// ---------- 星座 12タイプ ----------
const ZODIAC_TYPES = [
  { id: 'aries',       name: '牡羊座',  nameEn: 'Aries',        element: 'fire',  catchphrase: 'チャレンジが力の源。先頭を切る先駆者' },
  { id: 'taurus',      name: '牡牛座',  nameEn: 'Taurus',       element: 'earth', catchphrase: '安心感と信頼で関係を育む。大地の守り人' },
  { id: 'gemini',      name: '双子座',  nameEn: 'Gemini',       element: 'air',   catchphrase: '知識と対話で世界を広げる。情報の橋渡し役' },
  { id: 'cancer',      name: '蟹座',    nameEn: 'Cancer',       element: 'water', catchphrase: '深い共感と愛情で周囲を守る。感情の守護者' },
  { id: 'leo',         name: '獅子座',  nameEn: 'Leo',          element: 'fire',  catchphrase: '情熱と誇りで舞台を照らす。輝きのリーダー' },
  { id: 'virgo',       name: '乙女座',  nameEn: 'Virgo',        element: 'earth', catchphrase: '緻密な分析と丁寧さで理想を追求する' },
  { id: 'libra',       name: '天秤座',  nameEn: 'Libra',        element: 'air',   catchphrase: '公正さと調和で人々をつなぐ。バランスの達人' },
  { id: 'scorpio',     name: '蠍座',    nameEn: 'Scorpio',      element: 'water', catchphrase: '深い洞察と情熱で本質を追い求める探求者' },
  { id: 'sagittarius', name: '射手座',  nameEn: 'Sagittarius',  element: 'fire',  catchphrase: '自由と冒険で真理を追い求める旅人' },
  { id: 'capricorn',   name: '山羊座',  nameEn: 'Capricorn',    element: 'earth', catchphrase: '着実な努力と自律で山頂を目指す戦略家' },
  { id: 'aquarius',    name: '水瓶座',  nameEn: 'Aquarius',     element: 'air',   catchphrase: '革新と自由で未来を切り拓くビジョナリー' },
  { id: 'pisces',      name: '魚座',    nameEn: 'Pisces',       element: 'water', catchphrase: '共感と想像力で人の心に寄り添う夢見人' },
];

// ---------- 16動物キャラクター ----------
const ANIMAL_CHARACTERS = [
  { id: 'o-high_c-high_e-high_a-high', name: 'ライオン王',   tagline: '仲間を引っ張る、頼れるリーダー' },
  { id: 'o-high_c-high_e-high_a-low',  name: 'ハヤブサ',     tagline: '目標に向かって突き進む、鋭い先駆者' },
  { id: 'o-high_c-high_e-low_a-high',  name: 'フクロウ博士', tagline: '深く考え、静かに人を支える知者' },
  { id: 'o-high_c-high_e-low_a-low',   name: 'タコ博士',     tagline: '緻密な戦略で問題を解き明かす、孤高の研究者' },
  { id: 'o-high_c-low_e-high_a-high',  name: 'イルカ',       tagline: '遊び心と優しさで場を明るくする、自由な社交家' },
  { id: 'o-high_c-low_e-high_a-low',   name: 'キツネ',       tagline: 'ユニークな発想で場を席巻する、自由な挑戦者' },
  { id: 'o-high_c-low_e-low_a-high',   name: 'ネコ',         tagline: '自分のペースで、大切な人を静かに支える' },
  { id: 'o-high_c-low_e-low_a-low',    name: 'トラ',         tagline: '独自の世界観を持つ、孤独な芸術家' },
  { id: 'o-low_c-high_e-high_a-high',  name: 'イヌ',         tagline: '誰にでも誠実、チームの要となる頼れる存在' },
  { id: 'o-low_c-high_e-high_a-low',   name: 'オオカミ',     tagline: '群れを率いる、強さと規律のリーダー' },
  { id: 'o-low_c-high_e-low_a-high',   name: 'ビーバー',     tagline: 'コツコツ積み上げ、みんなの土台を作る名職人' },
  { id: 'o-low_c-high_e-low_a-low',    name: 'ワシ',         tagline: '高い目標を静かに追い続ける、孤高の完璧主義者' },
  { id: 'o-low_c-low_e-high_a-high',   name: 'パンダ',       tagline: 'みんなに愛される、場の雰囲気メーカー' },
  { id: 'o-low_c-low_e-high_a-low',    name: 'チーター',     tagline: '直感と勢いで道を切り開く、行動派のスプリンター' },
  { id: 'o-low_c-low_e-low_a-high',    name: 'ウサギ',       tagline: '穏やかで優しい、そっと寄り添う守り手' },
  { id: 'o-low_c-low_e-low_a-low',     name: 'ハリネズミ',   tagline: '自分だけの世界をもつ、静かな一匹狼' },
];

// ============================================================
// 生成実行
// ============================================================

let totalGenerated = 0;
const errors = [];

function generateOgp(diagnosisId, diagnosisLabel, types, opts = {}) {
  const outDir = join(PUBLIC_DIR, 'og', 'result', diagnosisId);
  mkdirSync(outDir, { recursive: true });

  for (const t of types) {
    try {
      const svg = buildResultSvg({
        diagnosisId,
        diagnosisLabel,
        typeId:      t.id,
        typeName:    t.name,
        typeNameSub: t.nameEn || t.tagline || '',
        catchphrase: t.catchphrase || t.tagline || '',
        zodiacSymbol: opts.useZodiacSymbol ? ZODIAC_SVG_ICONS[t.id] : null,
        colorOverride: opts.colorOverride ? opts.colorOverride(t) : null,
      });

      const outPath = join(outDir, `${t.id}.svg`);
      writeFileSync(outPath, svg, 'utf-8');
      totalGenerated++;
      console.log(`  [OK] ${diagnosisId}/${t.id}.svg`);
    } catch (err) {
      console.error(`  [ERR] ${diagnosisId}/${t.id}: ${err.message}`);
      errors.push({ diagnosisId, typeId: t.id, error: err.message });
    }
  }
}

console.log('=== generate-result-ogp.mjs: 結果タイプ別 OGP SVG 生成 ===\n');

// 1. 多重知能
console.log('[1/8] 多重知能テスト (8タイプ)');
generateOgp('multi-int', '多重知能テスト', MULTI_INT_TYPES);

// 2. MBTI
console.log('[2/8] MBTI 16タイプ性格診断 (16タイプ)');
generateOgp('mbti', 'MBTI診断（16タイプ）', MBTI_TYPES);

// 3. MBTI恋愛相性（mbti-love として分離）
console.log('[3/8] MBTI 恋愛・相性診断 (16タイプ)');
generateOgp('mbti-love', 'MBTI恋愛相性診断', MBTI_TYPES);

// 4. 完璧主義
console.log('[4/8] 完璧主義診断 (4タイプ)');
generateOgp('perfectionism', '完璧主義診断', PERFECTIONISM_TYPES);

// 5. DiSC
console.log('[5/8] DiSC診断 (4タイプ)');
generateOgp('disc', 'DiSC診断', DISC_TYPES);

// 6. 友達相性
console.log('[6/8] 友達相性診断 (6タイプ)');
generateOgp('friend-compat', '友達相性診断', FRIEND_COMPAT_TYPES);

// 7. 恋愛スタイル
console.log('[7/8] 恋愛スタイル診断 (6タイプ)');
generateOgp('love-style', '恋愛スタイル診断', LOVE_STYLE_TYPES);

// 8. 金銭感覚
console.log('[8/10] 金銭感覚診断 (4タイプ)');
generateOgp('money-style', '金銭感覚診断', MONEY_STYLE_TYPES);

// 9. 星座（エレメント別カラー上書き）
console.log('[9/10] 星座性格診断 (12タイプ)');
generateOgp('zodiac', '星座性格診断', ZODIAC_TYPES, {
  useZodiacSymbol: true,
  colorOverride: (t) => {
    const ec = ZODIAC_ELEMENT_COLORS[t.element];
    return ec ? { primary: ec.primary, gradStart: ec.gradStart, gradEnd: ec.gradEnd, dark: false } : null;
  },
});

// 10. 16動物キャラクター
console.log('[10/10] 16動物キャラクター (16タイプ)');
generateOgp('animals', '統合プロファイル', ANIMAL_CHARACTERS.map(a => ({
  ...a,
  nameEn: a.tagline,
  catchphrase: a.tagline,
})));

// ============================================================
// 結果サマリー
// ============================================================
console.log(`\n==============================`);
console.log(`合計 ${totalGenerated} SVGファイル生成完了`);
if (errors.length > 0) {
  console.error(`\nエラー ${errors.length} 件:`);
  for (const e of errors) console.error(`  - ${e.diagnosisId}/${e.typeId}: ${e.error}`);
  process.exit(1);
} else {
  console.log('エラーなし。次: generate-result-ogp-png.mjs で PNG 変換を実行');
}
