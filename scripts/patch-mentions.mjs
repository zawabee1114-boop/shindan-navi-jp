/**
 * MID-6: mentions プロパティ追加スクリプト
 * 各診断ハブの jsonLdWebApp / jsonLdArticle に mentions（重要エンティティ連結）を追加
 * 実行: node scripts/patch-mentions.mjs
 *
 * 注意: Windows CRLF (\r\n) のファイルを正規化してから処理する
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIAG = resolve(ROOT, 'src/pages/diagnosis');

function hub(slug) {
  return resolve(DIAG, slug, 'index.astro');
}

// ファイル読み込みと CRLF → LF 正規化
function readNorm(p) {
  return readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}

// ============================================================
// 各ハブのパッチ定義
// ============================================================

// WebApp publisher 末尾パターン（MBTI / DiSC / perfectionism / love-style / friend-compat / money-style）
function webAppPublisherSearchReplace(nextComment, mentionsBlock) {
  const search = `  publisher: {\n    '@type': 'Organization',\n    '@id': \`\${SITE_URL}/#organization\`,\n  },\n};\n\n${nextComment}`;
  const replace = `  publisher: {\n    '@type': 'Organization',\n    '@id': \`\${SITE_URL}/#organization\`,\n  },\n  // MID-6: mentions（重要エンティティ連結・AI引用率向上）\n  mentions: [\n${mentionsBlock}\n  ],\n};\n\n${nextComment}`;
  return { search, replace };
}

function thing(name, sameAs) {
  return `    {\n      '@type': 'Thing',\n      name: '${name}',\n      sameAs: '${sameAs}',\n    },`;
}
function person(name, sameAs) {
  return `    {\n      '@type': 'Person',\n      name: '${name}',\n      sameAs: '${sameAs}',\n    },`;
}
function org(name, sameAs) {
  return `    {\n      '@type': 'Organization',\n      name: '${name}',\n      sameAs: '${sameAs}',\n    },`;
}

const patches = [];

// ---- MBTI ----
{
  const items = [
    thing('Myers-Briggs Type Indicator（MBTI®）', 'https://www.themyersbriggs.com/'),
    person('Carl Gustav Jung', 'https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%BC%E3%83%AB%E3%83%BB%E3%82%B0%E3%82%B9%E3%82%BF%E3%83%95%E3%83%BB%E3%83%A6%E3%83%B3%E3%82%B0'),
    thing('Keirsey Temperament Sorter（気質分類理論）', 'https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter'),
    thing('Five-Factor Model（ビッグファイブ性格特性モデル）', 'https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%96_(%E5%BF%83%E7%90%86%E5%AD%A6)'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('mbti'), search, replace });
}

// ---- DiSC ----
{
  const items = [
    thing('DiSC® 行動スタイルモデル（Dominance / influence / Steadiness / Conscientiousness）', 'https://www.discprofile.com/what-is-disc/overview'),
    person('William Moulton Marston', 'https://en.wikipedia.org/wiki/William_Moulton_Marston'),
    org('Wiley（Everything DiSC 公式）', 'https://www.discprofile.com/'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('disc'), search, replace });
}

// ---- perfectionism ----
{
  const items = [
    thing('Multidimensional Perfectionism Scale（多次元完璧主義尺度）', 'https://doi.org/10.1037/0022-3514.60.3.456'),
    person('Paul L. Hewitt', 'https://en.wikipedia.org/wiki/Paul_Hewitt_(psychologist)'),
    thing('Positive vs. Negative Perfectionism（適応的・不適応的完璧主義）', 'https://doi.org/10.1207/s15327752jpa6701_6'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('perfectionism'), search, replace });
}

// ---- love-style ----
{
  const items = [
    thing('Love Attitudes Scale / Colours of Love Theory（Lee 1973）', 'https://doi.org/10.1037/0022-3514.50.2.392'),
    person('John Alan Lee', 'https://en.wikipedia.org/wiki/John_Alan_Lee'),
    thing('Sternberg Triangular Theory of Love（愛の三角理論）', 'https://en.wikipedia.org/wiki/Triangular_theory_of_love'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('love-style'), search, replace });
}

// ---- friend-compat ----
{
  const items = [
    thing('Five-Factor Model（ビッグファイブ性格特性モデル）', 'https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%96_(%E5%BF%83%E7%90%86%E5%AD%A6)'),
    thing('FIRO-B（Fundamental Interpersonal Relations Orientation）', 'https://en.wikipedia.org/wiki/FIRO'),
    person('Willard Waller Hartup', 'https://en.wikipedia.org/wiki/Willard_Hartup'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('friend-compat'), search, replace });
}

// ---- money-style ----
{
  const items = [
    thing('Klontz Money Script Inventory（KMSI・マネースクリプト理論）', 'https://doi.org/10.4148/jft.v2i1.451'),
    person('Brad Klontz', 'https://en.wikipedia.org/wiki/Brad_Klontz'),
    thing('Behavioral Finance（行動ファイナンス）', 'https://ja.wikipedia.org/wiki/%E8%A1%8C%E5%8B%95%E3%83%95%E3%82%A1%E3%82%A4%E3%83%8A%E3%83%B3%E3%82%B9'),
  ].join('\n');
  const { search, replace } = webAppPublisherSearchReplace(
    '// JSON-LD: Quiz（citation に学術文献を配置）',
    items
  );
  patches.push({ file: hub('money-style'), search, replace });
}

// ---- love-dependency: publisher なし → author 末尾で挿入 ----
{
  const items = [
    thing('Adult Attachment Style（成人愛着スタイル）', 'https://en.wikipedia.org/wiki/Attachment_in_adults'),
    person('John Bowlby', 'https://ja.wikipedia.org/wiki/%E3%82%B8%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%9C%E3%82%A6%E3%83%AB%E3%83%93%E3%82%A3'),
    person('Cindy Hazan', 'https://en.wikipedia.org/wiki/Cindy_Hazan'),
    thing('Anxious–avoidant attachment（不安-回避型愛着）', 'https://en.wikipedia.org/wiki/Anxious%E2%80%93avoidant_attachment'),
  ].join('\n');
  patches.push({
    file: hub('love-dependency'),
    search: `    url: SITE_URL,\n  },\n};\n\n// JSON-LD: Quiz（将来実装スタブ）`,
    replace: `    url: SITE_URL,\n  },\n  // MID-6: mentions（重要エンティティ連結・AI引用率向上）\n  mentions: [\n${items}\n  ],\n};\n\n// JSON-LD: Quiz（将来実装スタブ）`,
  });
}

// ---- zodiac: jsonLdArticle の citation 末尾に mentions 追加 ----
{
  const items = [
    thing('西洋占星術（Western Astrology）', 'https://ja.wikipedia.org/wiki/%E8%A5%BF%E6%B4%8B%E5%8D%A0%E6%98%9F%E8%A1%93'),
    thing('黄道十二星座（Zodiac / Ecliptic）', 'https://ja.wikipedia.org/wiki/%E9%BB%84%E9%81%93%E5%8D%81%E4%BA%8C%E6%98%9F%E5%BA%A7'),
    thing('Big Five性格特性モデル（Five-Factor Model）', 'https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%96_(%E5%BF%83%E7%90%86%E5%AD%A6)'),
  ].join('\n');
  const search = `  citation: meta.references.map((ref) => ({\n    '@type': 'CreativeWork',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n};\n\n// JSON-LD: FAQPage\nconst jsonLdFaq`;
  const replace = `  citation: meta.references.map((ref) => ({\n    '@type': 'CreativeWork',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n  // MID-6: mentions（重要エンティティ連結・AI引用率向上）\n  mentions: [\n${items}\n  ],\n};\n\n// JSON-LD: FAQPage\nconst jsonLdFaq`;
  patches.push({ file: hub('zodiac'), search, replace });
}

// ---- mbti-compat: jsonLdArticle の citation 末尾に mentions 追加 ----
{
  const items = [
    thing('Myers-Briggs Type Indicator（MBTI®）16タイプ性格分類', 'https://www.themyersbriggs.com/'),
    person('Carl Gustav Jung', 'https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%BC%E3%83%AB%E3%83%BB%E3%82%B0%E3%82%B9%E3%82%BF%E3%83%95%E3%83%BB%E3%83%A6%E3%83%B3%E3%82%B0'),
    thing('Keirsey Temperament Sorter（4気質分類）', 'https://en.wikipedia.org/wiki/Keirsey_Temperament_Sorter'),
    thing('Jungian Cognitive Functions（ユング認知機能論）', 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions'),
  ].join('\n');
  const search = `  citation: meta.references.map((ref) => ({\n    '@type': 'Book',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n};\n\n// JSON-LD: FAQPage`;
  const replace = `  citation: meta.references.map((ref) => ({\n    '@type': 'Book',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n  // MID-6: mentions（重要エンティティ連結・AI引用率向上）\n  mentions: [\n${items}\n  ],\n};\n\n// JSON-LD: FAQPage`;
  patches.push({ file: hub('mbti-compat'), search, replace });
}

// ---- blood-compat: jsonLdArticle の citation 末尾に mentions 追加 ----
{
  const items = [
    thing('ABO Blood Group System（ABO血液型システム）', 'https://ja.wikipedia.org/wiki/ABO%E5%BC%8F%E8%A1%80%E6%B6%B2%E5%9E%8B'),
    thing('血液型と性格の相関研究（能見俊賢・Furukawa 1927）', 'https://ja.wikipedia.org/wiki/%E8%A1%80%E6%B6%B2%E5%9E%8B%E6%80%A7%E6%A0%BC%E5%88%86%E9%A1%9E'),
    thing('Five-Factor Model（ビッグファイブ性格特性モデル）', 'https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%96_(%E5%BF%83%E7%90%86%E5%AD%A6)'),
  ].join('\n');
  const search = `  citation: meta.references.map((ref) => ({\n    '@type': ref.url.includes('doi.org') ? 'ScholarlyArticle' : 'Book',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n};\n\n// JSON-LD: FAQPage`;
  const replace = `  citation: meta.references.map((ref) => ({\n    '@type': ref.url.includes('doi.org') ? 'ScholarlyArticle' : 'Book',\n    name: ref.title,\n    author: ref.author,\n    datePublished: String(ref.year),\n    publisher: ref.publisher,\n    url: ref.url,\n  })),\n  // MID-6: mentions（重要エンティティ連結・AI引用率向上）\n  mentions: [\n${items}\n  ],\n};\n\n// JSON-LD: FAQPage`;
  patches.push({ file: hub('blood-compat'), search, replace });
}

// ============================================================
// メイン処理
// ============================================================

let ok = 0;
let fail = 0;

for (const patch of patches) {
  try {
    // CRLF → LF 正規化して読み込み
    let content = readNorm(patch.file);
    if (!content.includes(patch.search)) {
      console.error(`[FAIL] Search string not found: ${patch.file.split(/[\\/]/).slice(-3).join('/')}`);
      // デバッグ用: 期待文字列の最初の50文字でgrepしてみる
      const preview = patch.search.slice(0, 60).replace(/\n/g, '\\n');
      console.error('  search_preview: ' + preview);
      // ファイル内の実際の類似文字列を探す
      const key = patch.search.split('\n')[0];
      const idx = content.indexOf(key);
      if (idx >= 0) {
        console.error('  actual_at_' + idx + ': ' + JSON.stringify(content.slice(idx, idx + 100)));
      }
      fail++;
      continue;
    }
    const newContent = content.replace(patch.search, patch.replace);
    // 元のファイルが CRLF なら CRLF に戻して書き込む
    const original = readFileSync(patch.file, 'utf8');
    const hasCRLF = original.includes('\r\n');
    writeFileSync(patch.file, hasCRLF ? newContent.replace(/\n/g, '\r\n') : newContent, 'utf8');
    console.log(`[OK] ${patch.file.split(/[\\/]/).slice(-3).join('/')}`);
    ok++;
  } catch (err) {
    console.error(`[ERROR] ${patch.file.split(/[\\/]/).slice(-3).join('/')}: ${err.message}`);
    fail++;
  }
}

console.log(`\n完了: ${ok}件成功 / ${fail}件失敗`);
if (fail > 0) process.exit(1);
