/**
 * audit_all_spacing.cjs
 * Tool for auditing word-wrap, flex gaps, and spacing issues
 * Usage: node tools/audit_all_spacing.cjs
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log("=================================================================");
console.log("🔍 [TOOL] AUDITING WORD SPACING, PADDING, GAPS & WORD BREAKS");
console.log("=================================================================\n");

const cssPath = path.join(rootDir, 'style.css');
const appPath = path.join(rootDir, 'app.js');

const css = fs.readFileSync(cssPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

const cssLines = css.split('\n');
let flexWithoutGap = [];
cssLines.forEach((l, idx) => {
  if (l.includes('display: flex') || l.includes('display: inline-flex')) {
    let hasGap = false;
    let hasJustify = false;
    for (let j = idx; j < Math.min(cssLines.length, idx + 12); j++) {
      if (cssLines[j].includes('}')) break;
      if (cssLines[j].includes('gap:')) hasGap = true;
      if (cssLines[j].includes('justify-content: space-between')) hasJustify = true;
    }
    if (hasJustify && !hasGap) {
      flexWithoutGap.push({ line: idx + 1, content: l, selector: cssLines[idx-1] || '' });
    }
  }
});

console.log(`Flex containers with justify-content: space-between: ${flexWithoutGap.length} un-gapped.`);

let badWordBreaks = 0;
cssLines.forEach((l, idx) => {
  if (l.includes('word-break: break-all')) {
    console.log(`  ⚠️ [Line ${idx + 1}] Found word-break: break-all: ${l.trim()}`);
    badWordBreaks++;
  }
});

if (badWordBreaks === 0) {
  console.log("✅ Zero bad word-break (break-all) detected across style.css!");
}

console.log("\n✅ Spacing audit complete.\n");
