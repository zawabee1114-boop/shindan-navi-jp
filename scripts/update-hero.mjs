// scripts/update-hero.mjs
// TOP ページのヘッダー + ヒーローセクションを v2.0 新デザインに置換
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/index.astro';
let content = readFileSync(filePath, 'utf-8');

// ---- 1. 旧ヘッダー → 新ヘッダー ----
const OLD_HEADER_START = '<header class="site-header">';
const OLD_HEADER_END = '</header>';
const h1 = content.indexOf(OLD_HEADER_START);
const h2 = content.indexOf(OLD_HEADER_END, h1) + OLD_HEADER_END.length;
console.log('header:', h1, h2);

const NEW_HEADER = `<header class="site-header-v2" role="banner">
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="診断ナビ - トップページ">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="14" cy="14" r="14" fill="url(#top-logo-grad)"/>
          <defs><linearGradient id="top-logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#9b85ff"/><stop offset="100%" stop-color="#6a47ff"/></linearGradient></defs>
          <path d="M14 7l1.5 4.2L20 12.5l-4.2 1.8.7 4.3L14 16.4l-2.5 2.2.7-4.3-4.2-1.8 4.5-1.3L14 7z" fill="white"/>
        </svg>
        <span class="nav-logo-text">診断ナビ</span>
      </a>
      <nav class="nav-links" aria-label="グローバルナビゲーション">
        <a href="/diagnosis/">診断一覧</a>
        <a href="/aisei/">相性診断</a>
        <a href="/strengths/">強み発見</a>
        <a href="/pro/">PRO機能</a>
      </nav>
      <div class="nav-actions">
        <a href="/login/" class="nav-btn-login">ログイン</a>
        <a href="/signup/" class="nav-btn-signup">無料登録</a>
      </div>
    </div>
  </header>`;

content = content.slice(0, h1) + NEW_HEADER + content.slice(h2);

// ---- 2. 旧ヒーロー → 新ヒーロー ----
const OLD_HERO_COMMENT = '  <!-- ヒーローセクション -->';
const AFTER_HERO_COMMENT = '  <!-- このページでわかること';

const hStart = content.indexOf(OLD_HERO_COMMENT);
const hEnd = content.indexOf(AFTER_HERO_COMMENT);
console.log('hero:', hStart, hEnd);

const NEW_HERO = `  <!-- ヒーローセクション（v2.0 新デザイン）-->
  <section class="hero-v2" aria-label="ヒーロー">
    <span class="hero-sparkle" style="left:8%;top:18%;animation-delay:.2s" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="#ffc4e3"/></svg></span>
    <span class="hero-sparkle" style="left:22%;top:72%;animation-delay:1.1s" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="#c2b3ff"/></svg></span>
    <span class="hero-sparkle" style="left:75%;top:14%;animation-delay:.5s" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="#a8c4ff"/></svg></span>
    <span class="hero-sparkle" style="left:88%;top:60%;animation-delay:1.8s" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="#ffc4e3"/></svg></span>
    <span class="hero-sparkle" style="left:55%;top:82%;animation-delay:.8s" aria-hidden="true"><svg width="8" height="8" viewBox="0 0 24 24"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="#c2b3ff"/></svg></span>
    <div class="hero-v2-inner">
      <div class="hero-v2-text">
        <div class="hero-v2-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="var(--brand-500)"/></svg>
          8診断 × 5シーン 自己理解プラットフォーム
        </div>
        <h1 class="hero-v2-title">
          <span class="hero-v2-accent">8つの診断</span>を統合して、<br />
          あなたの<span class="hero-v2-underline">「本当の姿」</span>を<br />
          浮かび上がらせます。
        </h1>
        <p class="hero-v2-desc">
          MBTI、血液型、多重知能、完璧主義、DiSC、恋愛スタイル、星座、お金の感覚。
          8つの診断を統合し、仕事・恋愛・友人・家族・学校の5シーンで行動指針をお届けします。
        </p>
        <div class="hero-v2-cta-group">
          <a href="/diagnosis/multi-int/" class="hero-v2-cta" aria-label="無料で診断をはじめる">
            無料で診断をはじめる
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>
          </a>
          <a href="/about/" class="hero-v2-cta-sub">サービスについて</a>
        </div>
        <p class="hero-v2-proof">登録不要・すぐにスタートできます</p>
      </div>
      <div class="hero-v2-tiles" aria-label="8つの診断カテゴリ">
        <a href="/diagnosis/mbti-compat/" class="hero-tile-item" aria-label="MBTI診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#a07cf8,#6a3fe0);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2.5c1.7 0 3 1.3 3 3 0 .8-.3 1.5-.8 2 .5-.5 1.2-.8 2-.8 1.7 0 3 1.3 3 3s-1.3 3-3 3c-.8 0-1.5-.3-2-.8.5.5.8 1.2.8 2 0 1.7-1.3 3-3 3s-3-1.3-3-3c0-.8.3-1.5.8-2-.5.5-1.2.8-2 .8-1.7 0-3-1.3-3-3s1.3-3 3-3c.8 0 1.5.3 2 .8C9.3 7 9 6.3 9 5.5c0-1.7 1.3-3 3-3z"/><circle cx="12" cy="11.7" r="2.3" fill="rgba(255,255,255,.35)"/></svg>
          </span>
          <span class="hero-tile-label">MBTI</span>
        </a>
        <a href="/diagnosis/blood-compat/" class="hero-tile-item" aria-label="血液型診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#ff8a93,#d94855);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2.5s-6 7-6 11.4A6 6 0 0 0 12 20a6 6 0 0 0 6-6.1C18 9.5 12 2.5 12 2.5z"/></svg>
          </span>
          <span class="hero-tile-label">血液型</span>
        </a>
        <a href="/diagnosis/multi-int/" class="hero-tile-item" aria-label="多重知能テスト">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#ffb06a,#d97520);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M8.5 3.5c-2 0-3.5 1.4-3.5 3.2 0 .4.1.8.2 1.2C3.8 8.6 3 9.8 3 11.2c0 1.3.7 2.4 1.8 3-.5.6-.8 1.4-.8 2.2 0 1.9 1.5 3.3 3.5 3.3 1.1 0 2.1-.5 2.8-1.2.5.4 1.1.6 1.7.6V5c-.7-.9-1.9-1.5-3.5-1.5z"/><path d="M15.5 3.5c2 0 3.5 1.4 3.5 3.2 0 .4-.1.8-.2 1.2 1.4.7 2.2 1.9 2.2 3.3 0 1.3-.7 2.4-1.8 3 .5.6.8 1.4.8 2.2 0 1.9-1.5 3.3-3.5 3.3-1.1 0-2.1-.5-2.8-1.2-.5.4-1.1.6-1.7.6V5c.7-.9 1.9-1.5 3.5-1.5z" fill-opacity=".75"/></svg>
          </span>
          <span class="hero-tile-label">多重知能</span>
        </a>
        <a href="/diagnosis/zodiac/" class="hero-tile-item" aria-label="星座性格診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#72baff,#2878c8);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 4l1.6 4.3L18 9.5l-3.2 2.8.9 4.4L12 14.5 8.3 16.7l.9-4.4L6 9.5l4.4-1.2L12 4z"/></svg>
          </span>
          <span class="hero-tile-label">星座</span>
        </a>
        <a href="/diagnosis/perfectionism/" class="hero-tile-item" aria-label="完璧主義診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#f5d06a,#c89820);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2.5L4 5.5v6.2c0 4.6 3.2 8.8 8 10 4.8-1.2 8-5.4 8-10V5.5l-8-3z"/><path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="rgba(0,0,0,.25)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
          </span>
          <span class="hero-tile-label">完璧主義</span>
        </a>
        <a href="/diagnosis/disc/" class="hero-tile-item" aria-label="DiSC診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#55d4bc,#1e9a84);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18" stroke="rgba(255,255,255,.7)" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="rgba(255,255,255,.95)"/></svg>
          </span>
          <span class="hero-tile-label">DiSC</span>
        </a>
        <a href="/diagnosis/love-style/" class="hero-tile-item" aria-label="恋愛スタイル診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#ff98c8,#d84888);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 20s-7-4.3-7-10c0-3 2.2-5 4.7-5C11.3 5 12 6.2 12 6.2S12.7 5 14.3 5C16.8 5 19 7 19 10c0 5.7-7 10-7 10z"/></svg>
          </span>
          <span class="hero-tile-label">恋愛スタイル</span>
        </a>
        <a href="/diagnosis/money-sense/" class="hero-tile-item" aria-label="お金の感覚診断">
          <span class="hero-tile-circle" style="background:linear-gradient(155deg,#daba82,#a87840);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M9 4.5h6l-1.5 3 1.5 1c2.4 1.5 4 4.2 4 6.8 0 3-2.5 5.2-7 5.2s-7-2.2-7-5.2c0-2.6 1.6-5.3 4-6.8L10.5 7.5 9 4.5z"/></svg>
          </span>
          <span class="hero-tile-label">お金の感覚</span>
        </a>
      </div>
    </div>
  </section>

  `;

content = content.slice(0, hStart) + NEW_HERO + content.slice(hEnd);

writeFileSync(filePath, content, 'utf-8');
console.log('Done. New length:', content.length);
