# ⛩️ Nippon Travel Guide & Smart AI Itinerary Planner (2026)
### เว็บแอปพลิเคชันคู่มือท่องเที่ยว วางแผนการเดินทางอัจฉริยะ และระบบจัดการทริปญี่ปุ่นครบวงจร

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://sakanatarouapp.github.io/jp_tarvel/)
[![Repository](https://img.shields.io/badge/Repository-jp__tarvel-blue?style=for-the-badge&logo=git)](https://github.com/sakanatarouapp/jp_tarvel.git)
[![Vanilla JS](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-orange?style=for-the-badge)]()
[![Automated Tests](https://img.shields.io/badge/Tests-22%2F22%20Passing%20(100%25)-success?style=for-the-badge)]()

---

## 📖 สารบัญ (Table of Contents)
1. [ภาพรวมของโปรแกรม (Overview & Vision)](#-1-ภาพรวมของโปรแกรม-overview--vision)
2. [สถาปัตยกรรมและพื้นฐานในการออกแบบ (Design Architecture & Principles)](#-2-สถาปัตยกรรมและพื้นฐานในการออกแบบ-design-architecture--principles)
3. [โครงสร้างไฟล์และโฟลเดอร์ (File & Directory Structure)](#-3-โครงสร้างไฟล์และโฟลเดอร์-file--directory-structure)
4. [ฟังก์ชันและการทำงานของระบบต่างๆ (Detailed Feature Breakdown)](#-4-ฟังก์ชันและการทำงานของระบบต่างๆ-detailed-feature-breakdown)
5. [เครื่องมือสำหรับนักพัฒนาที่มีในระบบ (Developer Tools & Automated Suites)](#-5-เครื่องมือสำหรับนักพัฒนาที่มีในระบบ-developer-tools--automated-suites)
6. [คู่มือการนำไปพัฒนาต่อบนเครื่องอื่น (How to Continue Development on Another Machine)](#-6-คู่มือการนำไปพัฒนาต่อบนเครื่องอื่น-how-to-continue-development-on-another-machine)
7. [คำสั่ง AI System Prompt & บริบทสำหรับ AI ตัวใหม่ (AI System Prompt & Engineering Context)](#-7-คำสั่ง-ai-system-prompt--บริบทสำหรับ-ai-ตัวใหม่-ai-system-prompt--engineering-context)

---

## 🌟 1. ภาพรวมของโปรแกรม (Overview & Vision)

**Nippon Travel Guide & Smart AI Itinerary Planner** ถูกออกแบบขึ้นเพื่อเป็น "OS พกพาสำหรับการท่องเที่ยวญี่ปุ่น" ที่รวมศูนย์ข้อมูลตั้งแต่ก่อนเดินทางจนถึงการใช้งานจริงในประเทศญี่ปุ่น (On-Trip):

- 🎯 **วางแผนใน 3 คลิกด้วย AI (Smart Trip Wizard):** จัดตาราง Day-by-Day อัจฉริยะตามจำนวนวัน ฤดูกาล และสไตล์การท่องเที่ยว พร้อมคำนวณวันเดินทางกลับไม่ให้แน่นจนเสี่ยงตกเครื่อง
- 🧠 **อธิบายเหตุผลเบื้องหลัง (AI Trip Insights):** แสดงวิเคราะห์ 5 เสาหลัก (Flight Departure, Seasonality, Transit Clustering, Pacing, Budget)
- 📍 **โหมดเที่ยวจริง (On-Trip Live Travel Mode):** แสดงเวลานาฬิกาคู่ JST (ญี่ปุ่น) vs ICT (ไทย) พร้อมการ์ดยื่นให้คนขับแท็กซี่/คนญี่ปุ่น ภาษาญี่ปุ่นตัวโตพร้อมระบบกดฟังเสียงพูด (Speech Synthesis)
- 🚅 **คู่มือ Shinkansen 2026 & JR Pass ROI:** คำนวณความคุ้มค่าตั๋ว JR Pass หลังปรับราคาเทียบกับการซื้อรายเที่ยวผ่านแอป SmartEX
- 🏨 **Dynamic Hotel Pricing:** ค้นหาโรงแรมพร้อมคำนวณเรตสดตามฤดูกาลและวันเข้าพักจริง เชื่อมโยง Google Hotels & Agoda
- 🧳 **Fast Pass ตม. & ศุลกากร:** ซ้อมตอบคำถาม ตม. ญี่ปุ่น และบัตรสรุปข้อมูลพกพา

---

## 🏛️ 2. สถาปัตยกรรมและพื้นฐานในการออกแบบ (Design Architecture & Principles)

### 1. Zero-Build Vanilla Architecture (เปิดใช้งานได้ทันที 100%)
- **ไม่มี Dependency บวม (Zero Node/Webpack/Vite Build Step):** ทำงานด้วย Pure HTML5, Modern CSS3 และ Vanilla JavaScript ES6+
- สามารถ Clone ลงเครื่องใดก็ได้แล้วดับเบิลคลิกเปิดไฟล์ `index.html` หรือรัน Static HTTP Server ได้ทันที ไม่ต้อง `npm install` ก้อนใหญ่

### 2. Mobile-First & Pixel-Perfect Guardrails (มาตรฐานการใช้งานบนมือถือ)
- **Modern App Bottom Navigation Bar:** เมนูลอยด้านล่างสไตล์ Native App (🧳 ทริปของฉัน, 🎯 เที่ยวจริง, 🪄 จัดทริป AI, 📋 แผนเที่ยว, ⬆️ ขึ้นบน) ไม่ล้นขอบจอ ไม่ตกบรรทัด
- **Zero Horizontal Overflow:** มี `overflow-x: hidden` และ `word-break: break-word; overflow-wrap: anywhere;` ป้องกันข้อความภาษาไทยหรือลิงก์ยาวหลุดเฟรม
- **Safe Area Insets:** รองรับรอยบากและแถบ Home Bar ของ iPhone (`env(safe-area-inset-bottom)`)
- **Touch Target:** ขนาดปุ่มและจุดสัมผัสอย่างน้อย 40–44px กดง่ายด้วยนิ้วโป้งเดียว

### 3. Data & State Separation (การแยกชั้นข้อมูลและสถานะ)
- `data.js` ทำหน้าที่เป็น **Database / Catalog:** เก็บข้อมูลสถานที่ (38 Iconic Places), พิกัด GPS, โรงแรม, ข้อมูลรถไฟ, คำศัพท์, และสถิติต่างๆ
- `app.js` ทำหน้าที่เป็น **Application Controller:** จัดการ Event Listeners, State Stores, DOM Rendering, และ AI Scoring Algorithms
- **Offline Persistence Strategy:** จัดเก็บข้อมูลสำคัญลงใน Browser `localStorage` อัตโนมัติ:
  - `nippon_itinerary`: รายการแผนการเดินทาง (วัน, เวลา, สถานที่)
  - `nippon_custom_places`: สถานที่ท่องเที่ยวส่วนตัวที่ผู้ใช้เพิ่มขึ้นเอง
  - `nippon_checklist`: สถานะการติ๊กกระเป๋าเดินทาง
  - `nippon_imm_profile`: ข้อมูลบัตร Fast Pass ตม. ญี่ปุ่น

---

## 📁 3. โครงสร้างไฟล์และโฟลเดอร์ (File & Directory Structure)

```text
japan-travel-guide/
├── index.html                       # โครงสร้างหน้าเว็บหลัก (Single Page Application)
├── style.css                        # ระบบสไตล์ชีตทั้งหมด (Design System, CSS Variables, Responsive)
├── app.js                           # กลไกการทำงานหลักและอัลกอริทึม AI (Controller & UI Logic)
├── data.js                          # ฐานข้อมูลสถานที่, โรงแรม, พาสรถไฟ, ตั๋วสวนสนุก, และสถิติ
├── README.md                        # เอกสารคู่มือระบบฉบับสมบูรณ์
├── google_apps_script_auto_sync.js  # สคริปต์ Google Apps Script สำหรับเชื่อมโยง Google Sheets
├── google_sheets_pricing_template.csv # แม่แบบไฟล์ CSV สำหรับตารางคำนวณราคา
├── images/                          # โฟลเดอร์รูปภาพแลนด์มาร์กและไอคอน
├── tools/                           # โฟลเดอร์เครื่องมือและ Automated Test Suite
│   ├── test_syntax.cjs              # ตรวจสอบ Syntax ความถูกต้องของ JavaScript
│   ├── test_comprehensive_suite.cjs # ชุดทดสอบระบบอัตโนมัติ 22 รายการ (Regression Tests)
│   └── audit_all_spacing.cjs        # ตรวจสอบการเว้นช่องไฟ, Flex Gap, และการตัดคำภาษาไทย
```

---

## ⚙️ 4. ฟังก์ชันและการทำงานของระบบต่างๆ (Detailed Feature Breakdown)

### 1. 🪄 AI Smart Trip Wizard & Multi-Day Engine
- **อัลกอริทึมการให้คะแนน (Scoring Algorithm):**
  - วิเคราะห์สถานที่จาก `JAPAN_DATA` และสถานที่ส่วนตัวที่ผู้ใช้เพิ่มเอง โดยคำนวณคะแนนตามภูมิภาค (Region Match), ฤดูกาล (Season Match), และสไตล์เที่ยว (Vibe Match)
- **ระบบ Pacing วันเดินทางกลับ (Flight Departure Optimization):**
  - วันที่ $1$ ถึง $N-1$: จัดเที่ยวเต็มวัน วันละ 3 จุด (เช้า 09:00, บ่าย 13:00, เย็น 17:30)
  - วันสุดท้าย (วันเดินทางกลับ): จัดเบาๆ เพียง 2 จุด (เช้า 10:00 ตลาด/ของฝาก, เที่ยง 12:30 มื้ออำลา) เพื่อเว้นช่วงบ่ายว่างสำหรับการเดินทางไปสนามบินและเช็กอินล่วงหน้า 3 ชั่วโมง ป้องกันการตกเครื่อง 100%
- **Canonical Place Deduplication:**
  - มี Dictionary แผนผังชื่อพ้อง (`CANONICAL_PLACE_MAP`) เพื่อป้องกันไม่ให้ AI เลือกสถานที่ซ้ำแม้จะสะกดคนละภาษา (เช่น "Dotonbori", "โดทงโบริ", "ย่านโดทงโบริ")

### 2. 🧠 AI Trip Insights & Rationale Presentation Modal
- หน้าต่างวิเคราะห์เชิงลึกที่สรุปว่า **"ทำไม AI ถึงออกแบบแผนนี้ให้คุณ"** ผ่าน 5 เสาหลัก:
  1. *วันเดินทางกลับ (Departure Optimization):* อธิบายการจัดเวลาวันสุดท้าย
  2. *ฤดูกาล (Seasonal Match):* สถานที่พิเศษเฉพาะฤดู เช่น ซากุระ ใบไม้เปลี่ยนสี หรือหิมะ
  3. *การจัดกลุ่มสายรถไฟ (Transit Clustering):* จัดกลุ่มสถานที่ใกล้กันให้อยู่ในวันเดียวกัน
  4. *จังหวะเวลาและการเลี่ยงฝูงชน (Pacing & Crowd Control):* กำหนดเวลาเช้า/บ่าย/ค่ำที่เหมาะสม
  5. *ความสมดุลของงบประมาณและแรงกาย (Balance & Energy):* สลับกิจกรรมหนัก-เบา

### 3. 🗺️ Interactive Route Simulator & Map
- แผนที่จำลองเส้นทาง (Leaflet.js) เชื่อมโยงพิกัด GPS อัตโนมัติตามลำดับสถานที่ในแผน
- คำนวณระยะทางรวม ค่าเดินทางโดยประมาณ และแนะนำ Pass ที่คุ้มค่าที่สุด (Smart Pass Optimizer)

### 4. 🎯 On-Trip Live Travel Mode (โหมดเที่ยวจริงขณะอยู่ในญี่ปุ่น)
- **Dual Live Clocks:** แสดงเวลานาฬิกาคู่แบบเรียลไทม์: เวลาโตเกียว (JST, UTC+9) และเวลาไทย (ICT, UTC+7)
- **Step-by-Step Navigation:** ปุ่มเลื่อนจุดเที่ยวถัดไป พร้อมเวลาเป้าหมาย
- **Show-to-Local Taxi Card:** ป๊อปอัปข้อความภาษาญี่ปุ่นตัวโตสำหรับยื่นให้คนขับรถแท็กซี่หรือคนท้องถิ่นดู พร้อมปุ่ม 🔊 กดฟังเสียงอ่านภาษาญี่ปุ่นด้วย Web Speech API

### 5. 🧳 Profile & Travel Hub (`#profile-hub-modal`)
- ศูนย์รวมฟีเจอร์พกพาสำหรับผู้ใช้ กดเปิดได้จากส่วนหัวของเว็บหรือเมนูด้านล่างบนมือถือ
- สรุปจำนวนวัน, จำนวนสถานที่, และงบประมาณประมาณการ
- เมนูลัดเปิดหน้าต่างต่างๆ เช่น จัดทริป AI, โหมดเที่ยวจริง, ตารางสรุปพกพา, ตม. Fast Pass, และปุ่มล้างแผนการเดินทาง

### 6. 📋 Pocket Itinerary Export Hub (ตารางสรุปพกพา)
- ตารางสรุปแผนเดินทางรายวันพร้อมเวลา สามารถแก้ไขเวลาและเปลี่ยนวันได้
- มีปุ่มลบสถานที่ (`pocket-item-remove-btn`) สำหรับนำสถานที่ออกจากแผนได้ทีละจุด
- สามารถ Export เป็นตารางพร้อมพิมพ์ (Print-Ready) และมีปุ่มเปิดซิงก์ข้อมูลกับ Google Sheets

### 7. 🚅 Shinkansen Master Guide 2026 (คู่มือรถไฟชินคันเซ็น)
- สรุป 4 สายหลักและเวลาเดินทางจริง (Tokaido, Sanyo, Hokuriku, Tohoku/Hokkaido)
- **ทริคเลือกที่นั่งชมวิวฟูจิ (Fuji View Seat Hack):** ขาไปโตเกียว ➔ เกียวโต/โอซาก้า เลือกแถว E (ฝั่งขวา) / ขากลับ เลือกแถว A (ฝั่งซ้าย)
- วิธีจองตั๋วล่วงหน้าผ่านแอป SmartEX ผูกกับบัตร Suica/Pasmo แตะผ่านเกตได้ทันที
- กฎกระเป๋าเดินทางขนาดใหญ่ (Oversized Baggage 160–250 ซม.) สำหรับตู้ขบวนชินคันเซ็น
- แนะนำข้าวกล่องสถานีรถไฟ (Ekiben) และไอศกรีมแข็ง Sujata Super Hard Ice Cream

### 8. 🎫 เครื่องคำนวณ JR Pass vs ซื้อตั๋วรายเที่ยว
- ตารางเปรียบเทียบราคา JR Pass ทั่วประเทศ (หลังปรับราคา ต.ค. 2023) เทียบกับการซื้อตั๋ว Shinkansen รายเที่ยว เพื่อตัดสินใจว่าคุ้มค่าหรือไม่

### 9. 🏨 Dynamic Hotel Pricing Hub (ระบบจองโรงแรมและเรตสด)
- ตัวกรอง 4 ระดับ: ภูมิภาค, สไตล์/งบประมาณ, ค้นหาอิสระ, และเลือกวันเช็คอินจริง
- คำนวณตัวคูณราคาตามฤดูกาล (Low Season, Regular, High Season, Golden Week / Peak) อัตโนมัติ

---

## 🛠️ 5. เครื่องมือสำหรับนักพัฒนาที่มีในระบบ (Developer Tools & Automated Suites)

ภายในโฟลเดอร์ `tools/` มีสคริปต์สำหรับการทดสอบและดูแลรักษาระบบ ซึ่งสามารถรันผ่าน Node.js ได้ทันที:

### 1. `tools/test_syntax.cjs`
- ตรวจสอบ Syntax ของทั้ง `data.js` และ `app.js` แบบแยกชิ้นส่วน ป้องกันไม่ให้เกิด Run-time Syntax Error บนโปรดักชัน
```bash
node tools/test_syntax.cjs
```

### 2. `tools/test_comprehensive_suite.cjs` (Regression Test Suite 22 รายการ)
- รันชุดทดสอบครอบคลุม 4 โดเมนหลัก:
  1. *Data Integrity:* ความถูกต้องของข้อมูลสถานที่, พิกัด GPS, และแลนด์มาร์กสำคัญ
  2. *Smart Trip Wizard:* อัลกอริทึมฤดูกาล, การ Pacing วันเดินทางกลับ 5 วัน 14 จุด, การันตีสถานที่ Unique 100%
  3. *Pocket Itinerary:* ตรวจสอบปุ่มลบสถานที่และ CSS
  4. *Profile Hub:* ตรวจสอบการผูก Event Listener และมาร์กอัป
```bash
node tools/test_comprehensive_suite.cjs
```

### 3. `tools/audit_all_spacing.cjs`
- สแกนตรวจสอบการจัด Layout, ระยะช่องไฟ (`gap`), และตรวจสอบว่าไม่มีการใช้ `word-break: break-all` ที่ตัดคำภาษาไทยเสียหาย
```bash
node tools/audit_all_spacing.cjs
```

### 4. `google_apps_script_auto_sync.js`
- โค้ด Google Apps Script สำหรับใส่ใน Extensions ➔ Apps Script ของ Google Sheets เพื่อดึงข้อมูลแผนเที่ยวและราคากลับมายังหน้าเว็บแบบสองทาง (Two-Way Sync)

---

## 💻 6. คู่มือการนำไปพัฒนาต่อบนเครื่องอื่น (How to Continue Development on Another Machine)

หากต้องการนำโค้ดชุดนี้ไปพัฒนาต่อบนคอมพิวเตอร์เครื่องอื่น ให้ทำตามขั้นตอนดังนี้:

### ขั้นตอนที่ 1: Clone Repository ลงเครื่องใหม่
```bash
git clone https://github.com/sakanatarouapp/jp_tarvel.git
cd jp_tarvel
```

### ขั้นตอนที่ 2: เปิดรันโปรแกรมบนเครื่อง Local
คุณสามารถเปิดใช้งานได้ 2 วิธี:
- **วิธีที่ 1 (ง่ายที่สุด):** ดับเบิลคลิกที่ไฟล์ `index.html` เพื่อเปิดบนเว็บเบราว์เซอร์ได้ทันที
- **วิธีที่ 2 (แนะนำผ่าน HTTP Server):** รัน Local Server ด้วยคำสั่งใดคำสั่งหนึ่ง:
  ```bash
  # หากมี Python
  python -m http.server 8000
  
  # หรือหากมี Node.js / npx
  npx serve .
  ```
  จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

### ขั้นตอนที่ 3: รันเทสต์เพื่อตรวจความพร้อมของโค้ด
```bash
node tools/test_syntax.cjs
node tools/test_comprehensive_suite.cjs
```
*(ควรได้ผลลัพธ์ `22 / 22 TESTS PASSED (100% SUCCESS)`)*

### ขั้นตอนที่ 4: การแก้ไขหรือเพิ่มข้อมูล
- **หากต้องการเพิ่มสถานที่ท่องเที่ยวใหม่:** เพิ่ม Object ในอาเรย์ `JAPAN_DATA` และกำหนดพิกัดใน `ROUTE_SIMULATION_META` ในไฟล์ `data.js`
- **หากต้องการปรับแต่งการทำงาน/ฟังก์ชัน:** แก้ไขใน `app.js`
- **หากต้องการปรับแต่งหน้าตาและสี:** ปรับแก้ใน `style.css` (ใช้ CSS Variables ใน `:root`)

### ขั้นตอนที่ 5: Commit และ Push กลับขึ้น GitHub
```bash
git add .
git commit -m "Your update description"
git push origin main
```
ระบบจะอัปเดตหน้าเว็บจริงบน GitHub Pages (`https://sakanatarouapp.github.io/jp_tarvel/`) ให้อัตโนมัติภายใน 1–2 นาที!

---

## 🤖 7. คำสั่ง AI System Prompt & บริบทสำหรับ AI ตัวใหม่ (AI System Prompt & Engineering Context)

> **สำหรับผู้ใช้ (User):** เมื่อคุณนำโปรเจกต์นี้ไปเปิดบนเครื่องอื่น หรือต้องการสั่งให้ AI ตัวใหม่ (เช่น ChatGPT, Claude, Gemini, Cursor, Copilot, Windsurf) เข้ามาทำงานต่อ คุณสามารถ **Copy กล่องข้อความด้านล่างนี้** ส่งให้ AI อ่านเป็นคำสั่งเริ่มต้น (System Directives) ได้ทันที เพื่อให้ AI เข้าใจโครงสร้างระบบและคุมโทนการดีไซน์ได้ตรงกัน 100%

````markdown
### ⛩️ System Prompt & Instructions สำหรับ AI พัฒนาต่อ (Copy-Paste Prompt):

คุณคือ Senior Frontend Architect & Travel UI/UX Specialist ประจำโปรเจกต์ "Nippon Travel Guide & Smart AI Itinerary Planner 2026"
ก่อนเริ่มเขียนหรือแก้ไขโค้ดใดๆ คุณต้องศึกษาและปฏิบัติตามกฎเกณฑ์การออกแบบ (Design DNA & Architecture Invariants) ดังต่อไปนี้อย่างเคร่งครัด:

#### ⚡ 1. กฎสถาปัตยกรรมระบบ (Zero-Build Vanilla Architecture)
- โปรเจกต์นี้เป็น **Pure Vanilla Stack (HTML5 + CSS3 + ES6+ JavaScript)** ไม่มี Node.js build step, ไม่ใช้ Webpack/Vite/Babel, และไม่มี external package manager
- **ห้ามนำ npm modules หรือ bundler เข้ามาครอบโปรเจกต์เด็ดขาด** ไฟล์ `index.html` ต้องสามารถดับเบิลคลิกเปิดบนเบราว์เซอร์ได้ทันที 100%
- การแยกไฟล์ต้องคงโครงสร้างเดิมเสมอ:
  - `data.js`: เป็นฐานข้อมูล (Database Catalog) สถานที่ท่องเที่ยว, พิกัด GPS, โรงแรม, ข้อมูลรถไฟ, และสถิติ
  - `app.js`: เป็น Controller จัดการ State, UI Rendering, Event Listeners, และ AI Algorithms
  - `style.css`: จัดการ Design System, CSS Variables, และ Responsive Breakpoints

#### 🎨 2. กฎการออกแบบและ Visual DNA (Design System & Pixel-Perfect Guardrails)
- **Palette สีหลักของระบบ:**
  - สีแดงญี่ปุ่น (Crimson Red): `--primary-red: #bc002d`, Hover: `#9e0026`
  - สีน้ำเงินเข้มมิดไนท์ (Midnight Navy): `--primary-navy: #0f172a`, Secondary: `#1e293b`
  - สีพื้นหลังหน้าเว็บ (Slate Page BG): `--bg-page: #f8fafc`
  - สีการ์ด (Pure White): `--bg-card: #ffffff`
  - สีตัวหนังสือเทา (Muted Text): `--text-muted: #64748b`
  - สีไฮไลต์ AI (Purple Gradient): `linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)`
- **Zero Horizontal Overflow:** ห้ามมี Scrollbar แนวนอนหลุดออกมาเด็ดขาด (`overflow-x: hidden`)
- **การตัดคำภาษาไทย (Thai Typography):** ใช้ `word-break: break-word; overflow-wrap: anywhere;` ห้ามใช้ `word-break: break-all` ที่จะทำให้คำภาษาไทยถูกหักกลางพยางค์
- **Mobile Floating Dock Bar:** แถบเมนูล่างจอต้องคงโครงสร้างเป็น 5 ปุ่มที่มี `flex: 1; min-width: 0;` ประกอบด้วย Icon ด้านบน และ Label ด้านล่าง พร้อม Badge ที่มุมขวาบนของไอคอน รองรับ Safe Area (`env(safe-area-inset-bottom)`)
- **Touch Targets:** ปุ่มและจุดกดสัมผัสทุกจุดบนมือถือต้องมีความสูงอย่างน้อย 40–44px

#### 🧠 3. กฎเหล็กของข้อมูลและอัลกอริทึม AI (Core Invariants)
- **In-Data Invariant (100% Genuine Attractions):** ข้อมูลใน `JAPAN_DATA` (`data.js`) ต้องเป็นสถานที่ท่องเที่ยวจริงเท่านั้น ห้ามใส่การ์ดคู่มือรถไฟหรือบริการลงไปในการ์ดสถานที่เที่ยว (ข้อมูลคู่มือรถไฟให้อยู่ในโมดอลแยก `#shinkansen-guide-modal` หรือ `#jr-pass-calc`)
- **Coordinate Invariant:** ทุกสถานที่ใน `JAPAN_DATA` ต้องมีพิกัดตัวเลข `lat` และ `lng` ที่ถูกต้องใน `ROUTE_SIMULATION_META` เสมอ
- **Canonical Deduplication Invariant:** ใน `app.js` มี `CANONICAL_PLACE_MAP` ที่จับคู่ชื่อสถานที่หลากหลายภาษาเข้าหา ID หลัก เพื่อการันตีว่า AI จะไม่มีวันเลือกสถานที่เดียวกันซ้ำแม้จะสะกดคนละภาษา
- **Flight Departure Day Pacing Invariant:** เมื่อ AI จัดทริป $N$ วัน:
  - วันที่ $1$ ถึง $N-1$: จัดเที่ยวเต็มวัน วันละ 3 จุด (09:00, 13:00, 17:30)
  - วันที่ $N$ (วันเดินทางกลับ): **ต้องจัดเที่ยวเบาๆ เพียง 2 จุดเท่านั้น** (10:00 และ 12:30 เน้นตลาด/ของฝากใกล้สถานีใหญ่) และเว้นช่วงบ่ายว่างสำหรับการเดินทางไปสนามบินและเช็คอิน 3 ชม. ล่วงหน้า ห้ามจัดเที่ยวช่วงบ่าย-ค่ำในวันสุดท้ายเด็ดขาด
- **LocalStorage Keys Invariant:** ห้ามเปลี่ยนชื่อคีย์จัดเก็บข้อมูลใน `localStorage`: `nippon_itinerary`, `nippon_custom_places`, `nippon_checklist`, `nippon_imm_profile`

#### 🧪 4. การทดสอบอัตโนมัติก่อนส่งมอบงาน (Autonomous Verification Gate)
ทุกครั้งที่มีการแก้ไขโค้ดใน `data.js`, `app.js`, `index.html` หรือ `style.css` คุณต้องรันเครื่องมือทดสอบในโฟลเดอร์ `tools/` เสมอ:
1. `node tools/test_syntax.cjs` -> ตรวจสอบว่าไม่มีข้อผิดพลาดทางไวยากรณ์ (Syntax OK)
2. `node tools/test_comprehensive_suite.cjs` -> ตรวจสอบความถูกต้องครบทั้ง 22 ข้อ (ต้องผ่าน 100%)
3. `node tools/audit_all_spacing.cjs` -> ตรวจสอบว่าไม่มีปัญหาการตัดคำและช่องไฟหลุดเฟรม

#### 📋 5. รูปแบบการสรุปงานหลังโค้ดเสร็จ (Post-Coding Summary)
รายงานสรุปผลให้ผู้ใช้ทราบอย่างกระชับ ครอบคลุม 4 ข้อ:
1. 📍 **Where:** แก้ไขไฟล์ไหนและฟังก์ชันใด
2. ⚙️ **How it works:** อธิบายกลไกสั้นๆ 1-2 ประโยค
3. 🎯 **Benefits:** ผลลัพธ์ที่เปลี่ยนไปบนหน้าจอ
4. 🔄 **Impact Analysis:** ยืนยันผลกระทบต่อฟังก์ชันเดิมและผลการรันชุดทดสอบ
````

---

© 2026 **Nippon Travel Guide & Planner**. Open-source travel engineering.

