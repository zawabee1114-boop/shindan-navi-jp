// scripts/fix-multi-int2.mjs
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/diagnosis/multi-int/index.astro';
let content = readFileSync(filePath, 'utf-8');

// Normalize line endings for matching
const normalized = content.replace(/\r\n/g, '\n');

// Find and fix the broken .mi-hero-catch block
// Pattern: .mi-hero-catch { ... }\n  color: #3b3d56;\n}
const badPattern = /\.mi-hero-catch \{[^}]*\}\n  color: #3b3d56;\n\}/;
const fixed = `.mi-hero-catch {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: #3b3d56;
  line-height: 1.7;
  margin: 0;
}`;

if (badPattern.test(normalized)) {
  const newContent = normalized.replace(badPattern, fixed);
  writeFileSync(filePath, newContent, 'utf-8');
  console.log('Fixed .mi-hero-catch CSS error');
} else {
  // Manual approach: find the exact positions
  const catchStart = normalized.indexOf('.mi-hero-catch {');
  const afterCatch = normalized.indexOf('.mi-hero-stats {', catchStart);
  if (catchStart !== -1 && afterCatch !== -1) {
    console.log('Catch block:');
    console.log(JSON.stringify(normalized.slice(catchStart, afterCatch)));

    // Replace the entire catch section
    const badSection = normalized.slice(catchStart, afterCatch);
    const newSection = fixed + '\n';
    const newContent = normalized.replace(badSection, newSection);
    writeFileSync(filePath, newContent, 'utf-8');
    console.log('Fixed via manual replacement');
  } else {
    console.log('Could not find markers');
  }
}
