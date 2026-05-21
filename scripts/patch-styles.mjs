// scripts/patch-styles.mjs
// index.astro の旧ヘッダー+ヒーロー CSS を新デザイン CSS で置換
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/index.astro';
let content = readFileSync(filePath, 'utf-8');

// style タグ内の /* ヘッダー */ から /* ヒーローセクション */ ... の終わりまでを差し替え
// まずどこにあるか特定
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
const styleContent = content.slice(styleStart, styleEnd);

// ヘッダー CSS ブロックの開始
const HEADER_MARKER = '    /* ヘッダー */';
const headerIdx = styleContent.indexOf(HEADER_MARKER);

// 3つの理由セクション（ここまでを置換対象）
const REASONS_MARKER = '    /* 3つの理由 */';
const reasonsIdx = styleContent.indexOf(REASONS_MARKER);

console.log('style section length:', styleContent.length);
console.log('header marker at:', headerIdx);
console.log('reasons marker at:', reasonsIdx);

if (headerIdx === -1 || reasonsIdx === -1) {
  console.log('Markers not found. Dumping first 2000 chars of style:');
  console.log(styleContent.slice(0, 2000));
  process.exit(1);
}

const NEW_CSS = `    /* ===== ヘッダー v2.0 ===== */
    .site-header-v2 {
      position: sticky; top: 0; z-index: 100;
      height: var(--sn-header-h);
      background: rgba(255,255,255,.75);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--line);
      box-shadow: var(--shadow-sm);
    }
    .nav-inner {
      max-width: var(--sn-max-w); margin: 0 auto; padding: 0 var(--sn-space-4);
      height: 100%; display: flex; align-items: center; gap: var(--sn-space-4);
    }
    @media (min-width: 640px) { .nav-inner { padding: 0 var(--sn-space-6); } }
    .nav-logo {
      display: flex; align-items: center; gap: 8px;
      text-decoration: none; flex-shrink: 0;
    }
    .nav-logo-text {
      font-family: 'Inter', 'Noto Sans JP', system-ui, sans-serif;
      font-size: var(--sn-text-lg); font-weight: 700; color: var(--ink-900); letter-spacing: -.01em;
    }
    .nav-links { display: none; margin-left: var(--sn-space-4); gap: 4px; }
    @media (min-width: 768px) { .nav-links { display: flex; align-items: center; } }
    .nav-links a {
      display: block; padding: 8px 12px; border-radius: var(--radius-sm);
      font-size: var(--sn-text-sm); font-weight: 500; color: var(--ink-700);
      text-decoration: none;
      transition: background var(--sn-dur-fast) var(--sn-ease), color var(--sn-dur-fast) var(--sn-ease);
    }
    .nav-links a:hover { background: var(--brand-50); color: var(--brand-600); }
    .nav-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .nav-btn-login {
      display: inline-flex; align-items: center;
      background: var(--brand-100); color: var(--brand-600);
      padding: 8px 16px; border-radius: var(--radius-pill);
      font-weight: 700; font-size: 13px; text-decoration: none; min-height: var(--sn-tap-min);
    }
    .nav-btn-signup {
      display: inline-flex; align-items: center;
      background: linear-gradient(180deg, #8a6dff 0%, #6c47ff 100%);
      color: #fff; padding: 8px 16px; border-radius: var(--radius-pill);
      font-weight: 700; font-size: 13px; text-decoration: none; min-height: var(--sn-tap-min);
      box-shadow: 0 6px 14px rgba(108,71,255,.28);
    }
    .nav-btn-signup:hover { opacity: .9; color: #fff; }

    /* ===== ヒーロー v2.0 ===== */
    .hero-v2 {
      background: var(--hero-grad);
      position: relative; overflow: hidden;
      padding: 48px 16px 56px;
    }
    .hero-v2::before {
      content: ""; position: absolute; inset: 0;
      background:
        radial-gradient(40% 30% at 75% 25%, rgba(255,200,235,.4), transparent 60%),
        radial-gradient(50% 40% at 15% 75%, rgba(195,210,255,.4), transparent 60%);
      pointer-events: none;
    }
    @keyframes sparkle-pulse2 {
      0%, 100% { opacity: .3; transform: scale(1) rotate(0deg); }
      50% { opacity: .75; transform: scale(1.15) rotate(20deg); }
    }
    .hero-sparkle { position: absolute; pointer-events: none; animation: sparkle-pulse2 3.5s ease-in-out infinite; }
    .hero-v2-inner {
      position: relative; max-width: var(--sn-max-w); margin: 0 auto;
      display: flex; flex-direction: column; gap: 40px; align-items: center;
    }
    @media (min-width: 900px) {
      .hero-v2 { padding: 64px 48px 72px; }
      .hero-v2-inner { flex-direction: row; gap: 48px; align-items: center; }
    }
    .hero-v2-text { flex: 1; text-align: center; }
    @media (min-width: 900px) { .hero-v2-text { text-align: left; } }
    .hero-v2-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--brand-100); color: var(--brand-600); border-radius: var(--radius-pill);
      font-weight: 700; padding: 6px 14px; font-size: 12px; letter-spacing: .06em; margin-bottom: 18px;
    }
    .hero-v2-title {
      font-family: 'Noto Sans JP', system-ui, sans-serif;
      font-size: clamp(24px, 5vw, 46px);
      font-weight: 800; line-height: 1.32; color: var(--ink-900); margin-bottom: 20px;
    }
    .hero-v2-accent { color: var(--brand-600); }
    .hero-v2-underline { background: linear-gradient(transparent 65%, #ffd9ec 65%); padding: 0 2px; }
    .hero-v2-desc {
      font-size: 14px; color: var(--ink-700); line-height: 1.85;
      max-width: 460px; margin: 0 auto 24px;
    }
    @media (min-width: 900px) { .hero-v2-desc { margin: 0 0 24px; } }
    .hero-v2-cta-group { display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; margin-bottom: 12px; }
    @media (min-width: 900px) { .hero-v2-cta-group { justify-content: flex-start; } }
    .hero-v2-cta {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(180deg, #8a6dff 0%, #6c47ff 100%);
      color: #fff; font-weight: 700; letter-spacing: .04em;
      box-shadow: 0 10px 22px rgba(108,71,255,.32), 0 2px 4px rgba(108,71,255,.18);
      border-radius: var(--radius-pill); padding: 14px 24px; font-size: 16px;
      text-decoration: none; min-height: var(--sn-tap-min);
      transition: opacity var(--sn-dur-fast) var(--sn-ease), transform var(--sn-dur-fast) var(--sn-ease);
    }
    .hero-v2-cta:hover { opacity: .92; color: #fff; text-decoration: none; }
    .hero-v2-cta:active { transform: scale(.97); }
    .hero-v2-cta-sub {
      display: inline-flex; align-items: center;
      color: var(--ink-700); font-weight: 600; font-size: 14px;
      text-decoration: none; padding: 10px 16px; border-radius: var(--radius-pill);
      border: 1.5px solid var(--line-2); min-height: var(--sn-tap-min);
      transition: background var(--sn-dur-fast) var(--sn-ease);
    }
    .hero-v2-cta-sub:hover { background: var(--brand-50); color: var(--brand-600); text-decoration: none; }
    .hero-v2-proof { font-size: 12px; color: var(--ink-400); text-align: center; }
    @media (min-width: 900px) { .hero-v2-proof { text-align: left; } }
    /* 8診断タイル */
    .hero-v2-tiles {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
      width: 100%; max-width: 420px;
    }
    @media (min-width: 900px) { .hero-v2-tiles { max-width: 360px; gap: 14px; } }
    .hero-tile-item {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      text-decoration: none; color: var(--ink-700);
      transition: transform var(--sn-dur-fast) var(--sn-ease-bounce);
    }
    .hero-tile-item:hover { transform: translateY(-3px); text-decoration: none; color: var(--ink-700); }
    .hero-tile-circle {
      width: 60px; height: 60px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center; color: #fff;
      box-shadow: 0 8px 18px rgba(0,0,0,.14);
    }
    @media (max-width: 400px) { .hero-tile-circle { width: 48px; height: 48px; } }
    .hero-tile-label { font-size: 11px; font-weight: 700; text-align: center; white-space: nowrap; }

    /* 3つの理由 */
`;

// 置換: headerIdx から reasonsIdx の直前まで
const newStyleContent =
  styleContent.slice(0, headerIdx) +
  NEW_CSS +
  styleContent.slice(reasonsIdx + REASONS_MARKER.length);

content = content.slice(0, styleStart) + newStyleContent + content.slice(styleEnd);
writeFileSync(filePath, content, 'utf-8');
console.log('Done. Final length:', content.length);
