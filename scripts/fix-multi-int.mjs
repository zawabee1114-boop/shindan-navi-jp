// scripts/fix-multi-int.mjs
// multi-int/index.astro の CSS 構文エラーを修正
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/multi-int/index.astro';
let content = readFileSync(filePath, 'utf-8');

// 問題箇所: .mi-hero-catch { ... }\n  color: #3b3d56;\n}
// これを .mi-hero-catch { ... color: #3b3d56; } に修正
const BAD = `.mi-hero-catch {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);

  line-height: 1.7;
  margin: 0;
}
  color: #3b3d56;
}`;

const FIXED = `.mi-hero-catch {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: #3b3d56;
  line-height: 1.7;
  margin: 0;
}`;

if (content.includes(BAD)) {
  content = content.replace(BAD, FIXED);
  console.log('Fixed .mi-hero-catch');
} else {
  // Try alternative pattern
  const idx = content.indexOf('.mi-hero-catch {');
  if (idx !== -1) {
    console.log('Context around .mi-hero-catch:');
    console.log(JSON.stringify(content.slice(idx, idx + 200)));
  }
}

// .mi-stat-sep の rgba(255 255 255 / 0.5) → var(--ink-300) に修正（白文字を廃止）
content = content.replace(
  '  color: rgba(255 255 255 / 0.5);',
  '  color: var(--ink-300);'
);

// .mi-hero-meta の opacity 0.9 は削除（白テキスト前提）
content = content.replace(
  `.mi-hero-meta {
  display: block;
  font-size: clamp(1rem, 3vw, 1.4rem);
  opacity: 0.9;
}`,
  `.mi-hero-meta {
  display: block;
  font-size: clamp(1rem, 3vw, 1.4rem);
  color: var(--ink-500);
}`
);

// .mi-hero-sub の opacity: 0.7 を削除
content = content.replace(/\.mi-hero-sub \{[^}]+\}/, (match) => {
  return match.replace(/\s*opacity:\s*0\.7;/, '').replace(/}$/, '  color: var(--ink-500);\n}');
});

// .mi-hero-stats の opacity 0.85 を削除
content = content.replace(/\.mi-hero-stats \{[^}]+\}/, (match) => {
  return match.replace(/\s*opacity:\s*0\.85;/, '');
});

writeFileSync(filePath, content, 'utf-8');
console.log('Done fixing multi-int');
