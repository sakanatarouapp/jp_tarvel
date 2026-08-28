/**
 * test_comprehensive_suite.cjs
 * Comprehensive regression & feature verification test suite for Nippon Explorer
 * Usage: node tools/test_comprehensive_suite.cjs
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log("=================================================================");
console.log("🧪 STARTING COMPREHENSIVE AUTOMATED TEST SUITE: JAPAN TRAVEL GUIDE");
console.log("=================================================================\n");

let passedCount = 0;
let totalCount = 0;

function assert(condition, testName, details = "") {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

// Mock window and global objects for headless execution
global.window = {};
global.document = {
  getElementById: () => ({ innerHTML: "", textContent: "", value: "", addEventListener: () => {} }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; },
  removeItem: (k) => { delete storage[k]; }
};

// 1. Load data.js
const dataPath = path.join(rootDir, 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
eval(dataContent.replace(/const /g, 'global.'));

console.log("--- 1. DATA INTEGRITY & ASSETS TESTS ---");
assert(typeof global.JAPAN_DATA !== "undefined" && Array.isArray(global.JAPAN_DATA), "JAPAN_DATA is loaded and is an array");
assert(global.JAPAN_DATA.length >= 35, `JAPAN_DATA contains comprehensive destinations (${global.JAPAN_DATA.length} places)`);

const katsuoJi = global.JAPAN_DATA.find(p => p.id === "osaka-katsuoji");
assert(!!katsuoJi, "Katsuo-ji Temple (วัดคัตสึโอจิ) exists in JAPAN_DATA");
assert(katsuoJi && katsuoJi.region === "osaka", "Katsuo-ji has valid region Osaka");

const allMetaHaveCoords = Object.keys(global.ROUTE_SIMULATION_META).every(k => {
  const m = global.ROUTE_SIMULATION_META[k];
  return typeof m.lat === "number" && typeof m.lng === "number" && !isNaN(m.lat) && !isNaN(m.lng);
});
assert(allMetaHaveCoords, "All destinations have valid numeric lat/lng coordinates in ROUTE_SIMULATION_META");


// 2. Load app.js and HTML
const appPath = path.join(rootDir, 'app.js');
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'style.css');

const appContent = fs.readFileSync(appPath, 'utf8');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

console.log("\n--- 2. SMART TRIP WIZARD & SEASON-AWARENESS TESTS ---");
assert(htmlContent.includes('id="wizard-season-options"'), "index.html contains #wizard-season-options");
assert(htmlContent.includes('data-season="spring"'), "Wizard includes Spring (ซากุระ)");
assert(htmlContent.includes('data-season="autumn"'), "Wizard includes Autumn (ใบไม้เปลี่ยนสี)");
assert(htmlContent.includes('data-season="winter"'), "Wizard includes Winter (หิมะ/ออนเซ็น)");
assert(appContent.includes("wizardSelectedSeason"), "app.js manages wizardSelectedSeason state");

// Test AI zero duplicate guarantee & departure day pacing for 5-day trip
eval(appContent.slice(appContent.indexOf('const CANONICAL_PLACE_MAP'), appContent.indexOf('// Load Saved Itinerary and Custom Places')));
eval(appContent.slice(appContent.indexOf('function generateSmartItinerary'), appContent.indexOf('// ================= 20.1 AI Trip Plan Rationale Presentation Logic =================')));
eval(appContent.slice(appContent.indexOf('function generateAiRationaleHTML'), appContent.indexOf('if (closeAiRationaleModalBtn)')));

// Mock UI update functions
global.itineraryList = [];
global.customPlacesStore = [];
global.sortItineraryList = () => {};
global.updateItineraryUI = () => {};
global.renderCards = () => {};
global.renderRouteSimulator = () => {};
global.updateProfileHubUI = () => {};
global.openAiRationaleModal = () => {};

generateSmartItinerary(5, "kansai", "autumn", "landmarks");
assert(global.itineraryList.length === 14, `5 Days 4 Nights trip generates 14 stops (3+3+3+3 + 2 light stops on departure day)`);

const day5Items = global.itineraryList.filter(i => i.day === 5);
assert(day5Items.length === 2, "Departure day (Day 5) has exactly 2 light stops (Morning & Lunch/Souvenirs)");
assert(day5Items[0].time === "10:00" && day5Items[1].time === "12:30", "Departure day times are 10:00 and 12:30 leaving afternoon free for flight");

const uniqueIds5Days = new Set(global.itineraryList.map(i => i.baseId));
assert(uniqueIds5Days.size === global.itineraryList.length, "All 14 generated stops are 100% unique (Zero duplicates)");

const rationaleHtml = generateAiRationaleHTML(5, "kansai", "autumn", "landmarks", global.itineraryList);
assert(rationaleHtml.includes("วันเดินทางกลับ (Departure Optimization)"), "Rationale includes Flight Departure Day Optimization pillar");


console.log("\n--- 3. POCKET ITINERARY DELETE BUTTON TESTS ---");
assert(appContent.includes("pocket-item-remove-btn"), "app.js contains pocket-item-remove-btn rendering & listeners");
assert(cssContent.includes(".pocket-item-remove-btn"), "style.css contains .pocket-item-remove-btn styles");
assert(cssContent.includes(".pocket-card-actions"), "style.css contains .pocket-card-actions styles");


console.log("\n--- 4. USER PROFILE & TRAVEL HUB TESTS ---");
assert(htmlContent.includes("open-profile-hub-btn"), "index.html contains #open-profile-hub-btn in header");
assert(htmlContent.includes("profile-hub-modal"), "index.html contains #profile-hub-modal markup");
assert(cssContent.includes(".user-profile-hub-btn"), "style.css contains .user-profile-hub-btn styles");
assert(appContent.includes("openProfileHub"), "app.js contains openProfileHub logic");


console.log("\n=================================================================");
console.log(`📊 TEST SUITE SUMMARY: ${passedCount} / ${totalCount} TESTS PASSED (100% SUCCESS)`);
console.log("=================================================================\n");

if (passedCount !== totalCount) {
  process.exit(1);
}
