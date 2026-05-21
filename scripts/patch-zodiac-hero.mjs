// scripts/patch-zodiac-hero.mjs
// zodiac/index.astro にヒーローセクションを追加
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/zodiac/index.astro';
let content = readFileSync(filePath, 'utf-8');
// normalize CRLF
content = content.replace(/\r\n/g, '\n');

// ---- 1. <Container> の前にヒーローセクションを挿入 ----
const CONTAINER_OPEN = `  <Container>
    <!-- パンくず -->
    <nav aria-label="パンくずリスト" style="padding-block: 0.75rem; font-size: 0.85rem; color: var(--sn-muted);">
      <a href="/" style="color: var(--sn-primary);">ホーム</a>
      <span aria-hidden="true"> › </span>
      <a href="/diagnosis/" style="color: var(--sn-primary);">診断一覧</a>
      <span aria-hidden="true"> › </span>
      <span aria-current="page">星座性格診断</span>
    </nav>

    <!-- H1 -->
    <h1 style="font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 800; line-height: 1.3; margin-bottom: 0.75rem; color: var(--sn-text);">
      星座性格診断【12星座完全版】<br>
      <span style="font-size: 0.75em; font-weight: 600; color: var(--sn-muted);">性格分類 × 心理学 × 科学的位置付け</span>
    </h1>

    <!-- 鮮度バッジ -->
    <p style="font-size: 0.8rem; color: var(--sn-muted); margin-bottom: 1.5rem;">
      <time datetime={meta.updatedAt}>{meta.updatedAt.replace(/-/g, '/')} 時点の情報</time>
      ｜ 確認: <a href="https://doi.org/10.1038/318419a0" target="_blank" rel="noopener noreferrer" style="color: var(--sn-primary);">Carlson 1985 Nature</a> ｜
      <a href="https://www.iau.org/public/themes/astrology_vs_astronomy/" target="_blank" rel="noopener noreferrer" style="color: var(--sn-primary);">IAU公式</a>
    </p>`;

const HERO_BEFORE_CONTAINER = `  <!-- ★ ヒーローセクション（星座・青系） -->
  <section class="zd-hero">
    <div class="zd-hero-inner">
      <p class="zd-hero-badge">⭐ 星座性格診断</p>
      <h1 class="zd-hero-title">
        星座性格診断<br>
        <span class="zd-hero-catch">12星座完全版 × 科学的位置付け</span>
      </h1>
      <p class="zd-hero-meta">性格分類 × 心理学 × Carlson 1985 Nature</p>
      <div class="zd-hero-stats">
        <span>12星座</span>
        <span class="zd-stat-sep">|</span>
        <span>4エレメント</span>
        <span class="zd-stat-sep">|</span>
        <span>3モダリティ</span>
      </div>
      <a href="#zodiac-tool" class="zd-cta-btn">誕生日から星座を調べる →</a>
    </div>
  </section>

  <Container>
    <!-- パンくず -->
    <nav aria-label="パンくずリスト" style="padding-block: 0.75rem; font-size: 0.85rem; color: var(--sn-muted);">
      <a href="/" style="color: var(--sn-primary);">ホーム</a>
      <span aria-hidden="true"> › </span>
      <a href="/diagnosis/" style="color: var(--sn-primary);">診断一覧</a>
      <span aria-hidden="true"> › </span>
      <span aria-current="page">星座性格診断</span>
    </nav>

    <!-- H1（hidden: ヒーローに移動済み） -->
    <h1 style="font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 800; line-height: 1.3; margin-bottom: 0.75rem; color: var(--sn-text); display: none;" aria-hidden="true">
      星座性格診断【12星座完全版】<br>
      <span style="font-size: 0.75em; font-weight: 600; color: var(--sn-muted);">性格分類 × 心理学 × 科学的位置付け</span>
    </h1>

    <!-- 鮮度バッジ -->
    <p style="font-size: 0.8rem; color: var(--sn-muted); margin-bottom: 1.5rem;">
      <time datetime={meta.updatedAt}>{meta.updatedAt.replace(/-/g, '/')} 時点の情報</time>
      ｜ 確認: <a href="https://doi.org/10.1038/318419a0" target="_blank" rel="noopener noreferrer" style="color: var(--sn-primary);">Carlson 1985 Nature</a> ｜
      <a href="https://www.iau.org/public/themes/astrology_vs_astronomy/" target="_blank" rel="noopener noreferrer" style="color: var(--sn-primary);">IAU公式</a>
    </p>`;

if (!content.includes('zd-hero')) {
  if (content.includes(CONTAINER_OPEN)) {
    content = content.replace(CONTAINER_OPEN, HERO_BEFORE_CONTAINER);
    console.log('Hero section inserted before Container');
  } else {
    console.log('ERROR: Could not find Container open marker');
    process.exit(1);
  }
} else {
  console.log('Hero section already exists, skipping insertion');
}

// ---- 2. zodiac-tool アンカーを診断ツールセクションに追加 ----
content = content.replace(
  '    <!-- ★ 誕生日入力ツール（React Island） -->\n    <section style="margin-bottom: 3rem;">',
  '    <!-- ★ 誕生日入力ツール（React Island） -->\n    <section id="zodiac-tool" style="margin-bottom: 3rem;">'
);

// ---- 3. <style> ブロック末尾に zodiac hero CSS を追加 ----
const STYLE_END = '</style>';
const ZODIAC_CSS = `
  /* ===== 星座ヒーロー（青系） ===== */
  .zd-hero {
    background: linear-gradient(135deg, #eef4ff 0%, #ddeaff 60%, #e8f0ff 100%);
    padding: clamp(2.5rem, 6vw, 4.5rem) 1rem;
    text-align: center;
  }
  .zd-hero-inner {
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .zd-hero-badge {
    display: inline-block;
    background: rgba(78,164,240,.15);
    border: 1px solid rgba(78,164,240,.4);
    color: #0a4a8a;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    margin: 0;
  }
  .zd-hero-title {
    font-size: clamp(1.6rem, 4.5vw, 2.6rem);
    font-weight: 800;
    line-height: 1.25;
    color: #1f2235;
    margin: 0;
  }
  .zd-hero-catch {
    display: block;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: #3b3d56;
    line-height: 1.7;
    margin: 0;
    font-weight: 600;
  }
  .zd-hero-meta {
    display: block;
    font-size: clamp(1rem, 3vw, 1.4rem);
    color: var(--ink-500);
    margin: 0;
  }
  .zd-hero-stats {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--ink-400);
    align-items: center;
  }
  .zd-stat-sep {
    color: var(--ink-300);
  }
  .zd-cta-btn {
    display: inline-block;
    background: linear-gradient(180deg, #5b8def 0%, #2c5fcf 100%);
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.85rem 2rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 10px 22px rgba(78,130,240,.35);
    transition: opacity 0.15s;
    margin-top: 0.5rem;
  }
  .zd-cta-btn:hover {
    opacity: 0.88;
  }

`;

if (!content.includes('.zd-hero {')) {
  // Find the last </style> and insert before it
  const lastStyleEnd = content.lastIndexOf(STYLE_END);
  if (lastStyleEnd !== -1) {
    content = content.slice(0, lastStyleEnd) + ZODIAC_CSS + content.slice(lastStyleEnd);
    console.log('Zodiac hero CSS inserted into <style> block');
  } else {
    // No style block - append a new one before </BaseLayout>
    content = content.replace('</BaseLayout>', `<style>\n${ZODIAC_CSS}</style>\n</BaseLayout>`);
    console.log('New <style> block created with zodiac hero CSS');
  }
}

writeFileSync(filePath, content, 'utf-8');
console.log('Done patching zodiac/index.astro');
