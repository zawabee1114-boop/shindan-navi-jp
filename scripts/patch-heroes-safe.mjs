// scripts/patch-heroes-safe.mjs
// 安全なヒーロー CSS パッチ（各診断ページ）
import { readFileSync, writeFileSync } from 'fs';

const diagnoses = [
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/mbti-compat/index.astro',
    prefix: 'mc',
    heroGrad: 'linear-gradient(135deg, #f3efff 0%, #e8e0ff 60%, #ede5ff 100%)',
    badgeBg: 'rgba(139,92,246,.15)',
    badgeBorder: 'rgba(139,92,246,.4)',
    badgeColor: '#5a1fa8',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #a07cf8 0%, #6a3fe0 100%)',
    ctaShadow: '0 10px 22px rgba(139,92,246,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/blood-compat/index.astro',
    prefix: 'bc',
    heroGrad: 'linear-gradient(135deg, #fff0f1 0%, #ffe4e6 60%, #ffeaec 100%)',
    badgeBg: 'rgba(255,111,122,.15)',
    badgeBorder: 'rgba(255,111,122,.4)',
    badgeColor: '#a8262e',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff8a93 0%, #d94855 100%)',
    ctaShadow: '0 10px 22px rgba(255,111,122,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/friend-compat/index.astro',
    prefix: 'fc',
    heroGrad: 'linear-gradient(135deg, #fff0f7 0%, #ffe4f2 60%, #ffedf7 100%)',
    badgeBg: 'rgba(255,122,179,.15)',
    badgeBorder: 'rgba(255,122,179,.4)',
    badgeColor: '#a0185a',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff98c8 0%, #d84888 100%)',
    ctaShadow: '0 10px 22px rgba(255,122,179,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/perfectionism/index.astro',
    prefix: 'pf',
    heroGrad: 'linear-gradient(135deg, #fffbea 0%, #fef3c7 60%, #fffde8 100%)',
    badgeBg: 'rgba(240,193,78,.2)',
    badgeBorder: 'rgba(240,193,78,.5)',
    badgeColor: '#8a5a00',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #f5d06a 0%, #c89820 100%)',
    ctaShadow: '0 10px 22px rgba(240,193,78,.4)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/disc/index.astro',
    prefix: 'disc',
    heroGrad: 'linear-gradient(135deg, #edfaf7 0%, #d0f5ec 60%, #e4f9f5 100%)',
    badgeBg: 'rgba(52,192,168,.15)',
    badgeBorder: 'rgba(52,192,168,.4)',
    badgeColor: '#0a6e5a',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #55d4bc 0%, #1e9a84 100%)',
    ctaShadow: '0 10px 22px rgba(52,192,168,.35)',
  },
  {
    file: 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/love-style/index.astro',
    prefix: 'ls',
    heroGrad: 'linear-gradient(135deg, #fff0f7 0%, #ffe4f2 60%, #ffedf7 100%)',
    badgeBg: 'rgba(255,122,179,.15)',
    badgeBorder: 'rgba(255,122,179,.4)',
    badgeColor: '#a0185a',
    catchColor: '#3b3d56',
    ctaBg: 'linear-gradient(180deg, #ff98c8 0%, #d84888 100%)',
    ctaShadow: '0 10px 22px rgba(255,122,179,.35)',
  },
];

function patchFile(diag) {
  let content = readFileSync(diag.file, 'utf-8');
  // normalize CRLF
  content = content.replace(/\r\n/g, '\n');
  const { prefix } = diag;

  // ---- 1. hero background & color ----
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero \\{[^}]*?)background:[^;]+;`, 's'),
    (m, before) => `${before}background: ${diag.heroGrad};`
  );
  // remove color: #fff from hero
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero \\{[^}]*?)\\s*color:\\s*#fff;`, 's'),
    '$1'
  );

  // ---- 2. badge ----
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-badge \\{[^}]*?)background:[^;]+;`, 's'),
    (m, before) => `${before}background: ${diag.badgeBg};`
  );
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-badge \\{[^}]*?)border:[^;]+;`, 's'),
    (m, before) => `${before}border: 1px solid ${diag.badgeBorder};`
  );
  // Add color to badge if not present
  if (!content.match(new RegExp(`\\.${prefix}-hero-badge \\{[^}]*color:`))) {
    content = content.replace(
      new RegExp(`(\\.${prefix}-hero-badge \\{)([^}]*)(\\})`),
      (m, open, body, close) => `${open}${body}  color: ${diag.badgeColor};\n${close}`
    );
  }

  // ---- 3. catch / sub text ----
  // Replace opacity with color on catch
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-catch \\{[^}]*?)\\s*opacity:[^;]+;`, 's'),
    (m, before) => `${before}\n  color: ${diag.catchColor};`
  );

  // ---- 4. meta opacity -> color ----
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-meta \\{[^}]*?)\\s*opacity:[^;]+;`, 's'),
    (m, before) => `${before}\n  color: var(--ink-500);`
  );

  // ---- 5. sub opacity -> color ----
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-sub \\{[^}]*?)\\s*opacity:[^;]+;`, 's'),
    (m, before) => `${before}\n  color: var(--ink-400);`
  );

  // ---- 6. stats opacity -> remove ----
  content = content.replace(
    new RegExp(`(\\.${prefix}-hero-stats \\{[^}]*?)\\s*opacity:[^;]+;`, 's'),
    '$1'
  );
  // rgba white stat-sep -> ink-300
  content = content.replace(
    /color:\s*rgba\(255\s+255\s+255\s*\/\s*0\.5\);/g,
    'color: var(--ink-300);'
  );

  // ---- 7. CTA button ----
  // Update CTA background from white to colored gradient
  const ctaBtnReg = new RegExp(`\\.${prefix}-cta-btn\\s*\\{[^}]+\\}`, 's');
  content = content.replace(ctaBtnReg, (match) => {
    let updated = match;
    // Replace white background
    updated = updated.replace(/background:\s*#fff[^;]*;/, `background: ${diag.ctaBg};`);
    updated = updated.replace(/background:\s*white[^;]*;/, `background: ${diag.ctaBg};`);
    // Replace color: var(--sn-primary) -> #fff
    updated = updated.replace(/color:\s*var\(--sn-primary[^)]*\)\s*;/, 'color: #fff;');
    updated = updated.replace(/color:\s*var\(--sn-diag-[^)]+\)\s*;/, 'color: #fff;');
    // Add box-shadow if not present
    if (!updated.includes('box-shadow')) {
      updated = updated.replace(/}$/, `  box-shadow: ${diag.ctaShadow};\n}`);
    }
    return updated;
  });

  writeFileSync(diag.file, content, 'utf-8');
  console.log(`Patched: ${diag.file.split('/').slice(-2).join('/')}`);
}

for (const d of diagnoses) {
  patchFile(d);
}

console.log('All patches done.');
