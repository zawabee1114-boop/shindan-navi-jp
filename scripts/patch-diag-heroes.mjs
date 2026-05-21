// scripts/patch-diag-heroes.mjs
// 8診断メインハブページのヒーロー背景を新デザイントークン対応に更新
// 各診断の固有カラーは維持しつつ、淡色グラデーション + 濃テキストに変更
import { readFileSync, writeFileSync } from 'fs';

const patches = [
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/multi-int/index.astro',
    prefix: 'mi',
    // オレンジ系
    heroGrad: 'linear-gradient(135deg, #fff6ee 0%, #ffe9d5 60%, #fff2e5 100%)',
    badgeBg: 'rgba(255,154,77,.15)',
    badgeBorder: 'rgba(255,154,77,.4)',
    badgeColor: '#b05a10',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ffb06a 0%, #d97520 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(255,154,77,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/mbti-compat/index.astro',
    prefix: 'mh',
    // 紫系
    heroGrad: 'linear-gradient(135deg, #f3efff 0%, #e8e0ff 60%, #ede5ff 100%)',
    badgeBg: 'rgba(139,92,246,.15)',
    badgeBorder: 'rgba(139,92,246,.4)',
    badgeColor: '#5a1fa8',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #a07cf8 0%, #6a3fe0 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(139,92,246,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/blood-compat/index.astro',
    prefix: 'bh',
    // 珊瑚系
    heroGrad: 'linear-gradient(135deg, #fff0f1 0%, #ffe4e6 60%, #ffeaec 100%)',
    badgeBg: 'rgba(255,111,122,.15)',
    badgeBorder: 'rgba(255,111,122,.4)',
    badgeColor: '#a8262e',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff8a93 0%, #d94855 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(255,111,122,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/friend-compat/index.astro',
    prefix: 'fh',
    // ピンク・ライラック
    heroGrad: 'linear-gradient(135deg, #fff0f7 0%, #ffe4f2 60%, #ffedf7 100%)',
    badgeBg: 'rgba(255,122,179,.15)',
    badgeBorder: 'rgba(255,122,179,.4)',
    badgeColor: '#a0185a',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff98c8 0%, #d84888 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(255,122,179,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/perfectionism/index.astro',
    prefix: 'ph',
    // 黄系
    heroGrad: 'linear-gradient(135deg, #fffbea 0%, #fef3c7 60%, #fffde8 100%)',
    badgeBg: 'rgba(240,193,78,.2)',
    badgeBorder: 'rgba(240,193,78,.5)',
    badgeColor: '#8a5a00',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #f5d06a 0%, #c89820 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(240,193,78,.4)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/disc/index.astro',
    prefix: 'dh',
    // ティール系
    heroGrad: 'linear-gradient(135deg, #edfaf7 0%, #d0f5ec 60%, #e4f9f5 100%)',
    badgeBg: 'rgba(52,192,168,.15)',
    badgeBorder: 'rgba(52,192,168,.4)',
    badgeColor: '#0a6e5a',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #55d4bc 0%, #1e9a84 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(52,192,168,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/zodiac/index.astro',
    prefix: 'zh',
    // 青系
    heroGrad: 'linear-gradient(135deg, #eef6ff 0%, #ddeeff 60%, #e8f3ff 100%)',
    badgeBg: 'rgba(78,164,240,.15)',
    badgeBorder: 'rgba(78,164,240,.4)',
    badgeColor: '#0d4a8a',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #72baff 0%, #2878c8 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(78,164,240,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/love-style/index.astro',
    prefix: 'lh',
    // ピンク系
    heroGrad: 'linear-gradient(135deg, #fff0f7 0%, #ffe4f2 60%, #ffedf7 100%)',
    badgeBg: 'rgba(255,122,179,.15)',
    badgeBorder: 'rgba(255,122,179,.4)',
    badgeColor: '#a0185a',
    h1Color: '#1f2235',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff98c8 0%, #d84888 100%)',
    ctaColor: '#fff',
    ctaShadow: '0 10px 22px rgba(255,122,179,.35)',
  },
];

for (const p of patches) {
  let content = readFileSync(p.file, 'utf-8');

  // ヒーロー背景を新グラデーションに置換（各診断ページのヒーロークラス名は異なる）
  // background: linear-gradient(... の部分を探して置換
  const oldGradPatterns = [
    /background:\s*linear-gradient\(135deg,\s*var\(--sn-primary\)[^;]+;/g,
    /background:\s*linear-gradient\(135deg,\s*var\(--sn-diag-[^)]+\)[^;]+;/g,
    /background:\s*linear-gradient\(135deg,\s*#[0-9a-f]{3,6}[^;]+;/gi,
  ];

  // ヒーローセクション内のbackgroundのみ置換（style内）
  // まずヒーロークラスのbackground行を特定
  const heroClassReg = new RegExp(`\\.${p.prefix}-hero\\s*\\{([^}]+)\\}`, 'g');
  let changed = false;
  content = content.replace(heroClassReg, (match) => {
    if (match.includes('background')) {
      changed = true;
      // background 行を置換
      return match.replace(/background:[^;]+;/, `background: ${p.heroGrad};`);
    }
    return match;
  });

  // バッジのスタイルを更新（background: rgba... の白透明を診断カラーに）
  const badgeReg = new RegExp(`\\.${p.prefix}-hero-badge\\s*\\{([^}]+)\\}`, 'g');
  content = content.replace(badgeReg, (match) => {
    let updated = match;
    updated = updated.replace(/background:[^;]+;/, `background: ${p.badgeBg};`);
    updated = updated.replace(/border:[^;]+;/, `border: 1px solid ${p.badgeBorder};`);
    updated = updated.replace(/color:[^;]+;/, `color: ${p.badgeColor};`);
    return updated;
  });

  // h1 カラーを白から濃色に
  const h1Reg = new RegExp(`\\.${p.prefix}-hero-h1\\s*\\{([^}]+)\\}`, 'g');
  content = content.replace(h1Reg, (match) => {
    // color: #fff -> var(--ink-900)
    if (match.includes('color: #fff') || match.includes('color:#fff')) {
      return match.replace(/color:\s*#fff[f]?;/, `color: ${p.h1Color};`);
    }
    return match;
  });

  // catch テキスト
  const catchReg = new RegExp(`\\.${p.prefix}-hero-catch\\s*\\{([^}]+)\\}`, 'g');
  content = content.replace(catchReg, (match) => {
    if (match.includes('opacity')) {
      return match.replace(/opacity:\s*[\d.]+;/, '').replace(/color:[^;]+;/, '').trimEnd() + `\n  color: ${p.catchColor};\n}`;
    }
    return match;
  });

  // CTAボタン
  const ctaReg = new RegExp(`\\.${p.prefix}-cta-btn\\s*\\{([^}]+)\\}`, 'g');
  content = content.replace(ctaReg, (match) => {
    let updated = match;
    updated = updated.replace(/background:\s*#fff[^;]*;/, `background: ${p.ctaBg};`);
    updated = updated.replace(/background:\s*white[^;]*;/, `background: ${p.ctaBg};`);
    updated = updated.replace(/color:\s*var\(--sn-primary\)[^;]*;/, `color: ${p.ctaColor};`);
    updated = updated.replace(/color:\s*#[0-9a-f]{3,6}[^;]*;/i, `color: ${p.ctaColor};`);
    // add shadow if not present
    if (!updated.includes('box-shadow')) {
      updated = updated.replace(/}$/, `  box-shadow: ${p.ctaShadow};\n}`);
    }
    return updated;
  });

  // ヒーロー全体: color: #fff を削除（白テキスト → 継承で濃色）
  const heroSectionReg = new RegExp(`\\.${p.prefix}-hero\\s*\\{([^}]+)\\}`, 'g');
  content = content.replace(heroSectionReg, (match) => {
    return match.replace(/\s*color:\s*#fff;/, '');
  });

  writeFileSync(p.file, content, 'utf-8');
  console.log(`Patched: ${p.file.split('/').pop()} (changed: ${changed})`);
}

console.log('All diagnosis hero patches done.');
