/**
 * test_syntax.cjs
 * Tool for validating JavaScript syntax of data.js and app.js
 * Usage: node tools/test_syntax.cjs
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log("=========================================");
console.log("🔍 [TOOL] SYNTAX VALIDATION TEST");
console.log("=========================================\n");

// 1. Validate data.js
const dataPath = path.join(rootDir, 'data.js');
console.log("Testing data.js syntax...");
const dataCode = fs.readFileSync(dataPath, 'utf8');
try {
  new Function(dataCode);
  console.log("✅ data.js syntax is valid!");
} catch (err) {
  console.error("❌ Syntax Error in data.js:", err);
  process.exit(1);
}

// 2. Validate app.js
const appPath = path.join(rootDir, 'app.js');
console.log("\nTesting app.js syntax...");
const appCode = fs.readFileSync(appPath, 'utf8');
try {
  new Function(`
    const document = { addEventListener: () => {}, getElementById: () => null, querySelectorAll: () => [] };
    const window = {};
    const localStorage = { getItem: () => null, setItem: () => {} };
    ${appCode}
  `);
  console.log("✅ app.js syntax is valid!");
} catch (err) {
  console.error("❌ Syntax Error in app.js:", err);
  process.exit(1);
}

console.log("\n🎉 ALL JAVASCRIPT FILES PASS SYNTAX CHECK!\n");
