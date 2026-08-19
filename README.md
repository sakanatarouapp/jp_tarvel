# ⛩️ Nippon Explorer — Japan Travel Guide & Planner (2026)

**Nippon Explorer (日本旅行ガイド & 統計ツール)** — เว็บแอปพลิเคชันคู่มือท่องเที่ยว วางแผนการเดินทาง จำลองเส้นทางรถไฟ และระบบเตรียมความพร้อมผ่าน ตม. ประเทศญี่ปุ่นแบบครบวงจร

🌐 **Live Demo (GitHub Pages)**: [https://sakanatarouapp.github.io/jp_tarvel/](https://sakanatarouapp.github.io/jp_tarvel/)

---

## ✨ ไฮไลต์ฟีเจอร์เด่น (Key Features):

1. **🏯 คลังสถานที่ท่องเที่ยว & สตรีทฟู้ด (Explore & Street Food Hub)**:
   - ค้นหาและกรองสถานที่ท่องเที่ยวตามเมือง, ภูมิภาค, และแท็กความสนใจ
   - ข้อมูลเวลาที่เหมาะสม, สถานีรถไฟที่ใกล้ที่สุด, ค่าใช้จ่ายโดยประมาณ และพิกัดแผนที่

2. **🏨 ระบบแนะนำ 3 โรงแรมยอดนิยมประจำย่าน (Hotel & Ryokan Guide)**:
   - 2-Tier Control Panel เลือกเมืองและจุดแลนด์มาร์กเพื่อดูโรงแรมใกล้เคียงทันที
   - คำนวณระยะเดินจริง, เรตติ้ง, และราคาแปลงเป็นเงินบาทสด

3. **🗺️ Interactive Route Simulator & Leaflet Map**:
   - แผนที่จำลองเส้นทางท่องเที่ยวแบบเรียลไทม์ พร้อมระบบเล่นอนิเมชันยานพาหนะ
   - คำนวณระยะเวลาเดินทางและค่าโดยสาร พร้อมแนะนำตั๋ว Pass ที่คุ้มค่าที่สุด (Smart Pass Optimizer)

4. **🛂 Japan Immigration & Customs Fast Pass Hub (2026)**:
   - **Q&A Simulator**: ซ้อมตอบคำถามจริงกับเจ้าหน้าที่ ตม. พร้อมระบบเปิดเสียงภาษาญี่ปุ่น 🔊 (Web Speech API)
   - **Fast Pass Card**: สรุปข้อมูลการยื่น ตม. (โรงแรม, ตั๋วเครื่องบิน, อาชีพ, งบประมาณ) แสดงผลได้ทั้งภาษาอังกฤษและภาษาญี่ปุ่น
   - **โหมดโชว์เต็มหน้าจอ**: สำหรับยื่นให้เจ้าหน้าที่ ตม. และศุลกากรดูที่สนามบินได้ทันที
   - **กฎศุลกากร & เช็กลิสต์**: กฎการนำเข้าของต้องห้ามและสิ่งของปลอดภาษี 100%

5. **💰 งบประมาณ & คำนวณ JR Pass ROI**:
   - คำนวณงบประมาณตามสไตล์เที่ยว (สายประหยัด / สายมาตรฐาน / สายพรีเมียม)
   - คำนวณความคุ้มค่าตั๋ว JR Pass เทียบกับตั๋ว Shinkansen รายเที่ยว

6. **🌸 Bloom Forecast & Weather OOTD Guide**:
   - พยากรณ์ช่วงเวลาซากุระบานสะพรั่งและใบไม้เปลี่ยนสีทั่วทุกภูมิภาค
   - แนะนำการแต่งกายตามระดับอุณหภูมิ (0°C ถึง >24°C)

7. **📱 Mobile-First Responsive & Auto-Hide UI**:
   - รองรับทุกขนาดหน้าจอ (Desktop, Tablet, Mobile 360px+)
   - ระบบ Auto-Hide ซ่อน Navbar ด้านบนและแถบ Floating Dock ด้านล่างอัตโนมัติเมื่อเลื่อนหน้าจอลงเพื่อเพิ่มพื้นที่การอ่าน

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack):

- **Frontend**: HTML5, CSS3 (Modern CSS Grid / Flexbox / CSS Custom Properties)
- **Scripting**: Pure Vanilla JavaScript (ES6+ / 0 External Build Dependencies)
- **Map Engine**: Leaflet.js (OpenStreetMap) + Nominatim Geocoding API
- **Audio / Speech**: Web Speech Synthesis API
- **Storage**: LocalStorage API (เก็บบันทึกแผนเที่ยวและเช็กลิสต์แบบออฟไลน์)
- **Hosting**: GitHub Pages (100% Free CDN Hosting)

---

## 💻 วิธีการเปิดใช้งานบนเครื่อง Local:

1. Clone repository นี้:
   \\\ash
   git clone https://github.com/sakanatarouapp/jp_tarvel.git
   \\\
2. ดับเบิลคลิกเปิดไฟล์ \index.html\ บนเบราว์เซอร์ได้ทันทีโดยไม่ต้องติดตั้ง Dependency เพิ่มเติม

---

© 2026 **Nippon Explorer**. Built with InwGateway Local Engine.
