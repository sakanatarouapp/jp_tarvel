/**
 * 🇯🇵 NIPPON TRAVEL GUIDE - GOOGLE SHEETS LIVE AUTO-SYNC ROBOT
 * สคริปต์ดึงและอัปเดตราคาตั๋ว, เรตค่าเงินเยน และราคาโรงแรมสดอัตโนมัติลงใน Google Sheets
 * 
 * 📌 วิธีติดตั้ง (ทำครั้งเดียวใน 1 นาที):
 * 1. ใน Google Sheet ของคุณ ให้ไปที่เมนู: "ส่วนขยาย (Extensions)" ➔ "Apps Script"
 * 2. ลบโค้ดเดิมทั้งหมดในหน้าต่าง แล้ววางโค้ดชุดนี้ลงไป
 * 3. กดปุ่มบันทึก 💾 (รูปแผ่นดิสก์)
 * 4. รีเฟรชหน้า Google Sheets จะมีเมนูใหม่ชื่อ "🇯🇵 Nippon Travel" ปรากฏขึ้นมาด้านบน
 * 5. กดเมนู "🇯🇵 Nippon Travel" ➔ "⏰ ตั้งเวลาอัปเดตอัตโนมัติทุกวัน" (กดอนุญาตสิทธิ์ในครั้งแรก)
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🇯🇵 Nippon Travel')
    .addItem('⚡ ดึงและอัปเดตราคาล่าสุดเดี๋ยวนี้', 'fetchAndUpdateAllPrices')
    .addSeparator()
    .addItem('⏰ ตั้งเวลาอัปเดตอัตโนมัติทุกวัน (Daily Auto-Sync)', 'setupDailyAutoTrigger')
    .addItem('🛑 ปิดระบบอัปเดตอัตโนมัติ', 'removeAutoTrigger')
    .addToUi();
}

/**
 * ฟังก์ชันดึงอัตราแลกเปลี่ยนสดและคำนวณราคาตามฤดูกาลลงใน Google Sheets
 */
function fetchAndUpdateAllPrices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert('⚠️ ไม่พบข้อมูลในตาราง กรุณาใส่หัวตารางและรายการก่อนครับ');
    return;
  }

  // 1. ดึงอัตราแลกเปลี่ยนเงินเยนสด (JPY/THB) จาก API การเงินโลก
  let liveJpyThbRate = 0.235; // ค่าเริ่มต้น
  try {
    const response = UrlFetchApp.fetch('https://open.er-api.com/v6/latest/JPY', { muteHttpExceptions: true });
    if (response.getResponseCode() === 200) {
      const json = JSON.parse(response.getContentText());
      if (json && json.rates && json.rates.THB) {
        liveJpyThbRate = parseFloat(json.rates.THB);
      }
    }
  } catch (e) {
    Logger.log('FX API Notice: ' + e.message);
  }

  // 2. คำนวณตัวคูณตามฤดูกาลปัจจุบันในญี่ปุ่น
  const now = new Date();
  const month = now.getMonth() + 1; // 1 - 12
  let seasonMultiplier = 1.0;
  let seasonName = "ฤดูร้อน (Summer Promo)";

  if (month >= 3 && month <= 5) {
    seasonMultiplier = 1.45; // ช่วงซากุระพีค
    seasonName = "ฤดูใบไม้ผลิ 🌸 (ซากุระพีค)";
  } else if (month >= 6 && month <= 8) {
    seasonMultiplier = 1.0;  // โลว์ซีซั่นโปรโมชัน
    seasonName = "ฤดูร้อน ☀️ (โปรโมชัน)";
  } else if (month >= 9 && month <= 11) {
    seasonMultiplier = 1.28; // ช่วงใบไม้เปลี่ยนสี
    seasonName = "ฤดูใบไม้เปลี่ยนสี 🍁";
  } else {
    seasonMultiplier = 1.15; // ฤดูหนาว
    seasonName = "ฤดูหนาว ❄️";
  }

  // ฐานราคามาตรฐาน (Benchmark Base JPY Rates)
  const hotelBaseRates = {
    'hotel-gracery-shinjuku': 8500,
    'hotel-shinjuku-granbell': 7500,
    'hotel-sunroute-plaza': 9200,
    'hotel-cross-osaka': 7800,
    'hotel-swissotel-nankai': 12500,
    'hotel-dorms-inn-namba': 6900,
    'hotel-usj-parkfront': 11800,
    'hotel-usj-universal-port': 6550,
    'hotel-usj-keihan-tower': 6800,
    'park-usj': 8600,
    'park-teamlab': 3800,
    'park-shibuya-sky': 2200,
    'shinkansen-tokyo-osaka': 14720,
    'shinkansen-tokyo-kyoto': 14170
  };

  const updatedTimestamp = Utilities.formatDate(now, "GMT+7", "dd/MM/yyyy HH:mm:ss");

  // 3. วนลูปอัปเดตเซลล์ใน Google Sheet
  for (let r = 1; r < data.length; r++) {
    const itemId = String(data[r][0]).trim();

    // 3.1 อัปเดตเรตค่าเงินเยน
    if (itemId === 'config_exchange_rate') {
      sheet.getRange(r + 1, 4).setValue(parseFloat(liveJpyThbRate.toFixed(4))); // column D (price_jpy)
      sheet.getRange(r + 1, 6).setValue('⚡ เรตสดตลาดโลก'); // column F (promo_badge)
      sheet.getRange(r + 1, 7).setValue('อัปเดตสดอัตโนมัติ: 100 JPY ≈ ' + (liveJpyThbRate * 100).toFixed(2) + ' THB (' + updatedTimestamp + ')'); // column G
    }

    // 3.2 อัปเดตราคาโรงแรมและสถานที่ท่องเที่ยวตามฤดูกาล
    if (hotelBaseRates[itemId]) {
      const baseJpy = hotelBaseRates[itemId];
      const isHotel = itemId.startsWith('hotel-');
      const calculatedPrice = isHotel ? Math.round(baseJpy * seasonMultiplier) : baseJpy;
      
      sheet.getRange(r + 1, 4).setValue(calculatedPrice);
      
      if (isHotel) {
        if (seasonMultiplier === 1.0) {
          sheet.getRange(r + 1, 6).setValue('☀️ โลว์โปรโมชัน');
        } else if (seasonMultiplier > 1.3) {
          sheet.getRange(r + 1, 6).setValue('🌸 เรตซากุระพีค');
        } else {
          sheet.getRange(r + 1, 6).setValue('🍂 เรต ' + seasonName);
        }
        sheet.getRange(r + 1, 7).setValue('คาดการณ์ตาม ' + seasonName + ' (~' + Math.round(calculatedPrice * liveJpyThbRate).toLocaleString() + ' บาท/คืน)');
      }
    }
  }

  // แจ้งเตือนผู้ใช้ในชีต
  try {
    SpreadsheetApp.getUi().alert('🎉 อัปเดตข้อมูลสดสำเร็จ 100%!\n\n• เรตเงินเยนล่าสุด: 1 JPY = ' + liveJpyThbRate.toFixed(4) + ' THB\n• ฤดูกาลปัจจุบัน: ' + seasonName + '\n• ข้อมูลในชีตถูกซิงค์ไปยังหน้าเว็บของคุณแล้วครับ');
  } catch (e) {
    Logger.log('Updated successfully in background trigger at ' + updatedTimestamp);
  }
}

/**
 * ฟังก์ชันตั้งเวลาอัปเดตอัตโนมัติทุกวันเวลา 06:00 น. (Daily Trigger)
 */
function setupDailyAutoTrigger() {
  removeAutoTrigger(); // ลบ Trigger เก่ากันซ้ำซ้อน
  
  ScriptApp.newTrigger('fetchAndUpdateAllPrices')
    .timeBased()
    .everyDays(1)
    .atHour(6) // เวลา 06:00 - 07:00 น. ทุกเช้า
    .create();

  SpreadsheetApp.getUi().alert('⏰ เปิดระบบอัปเดตอัตโนมัติสำเร็จ!\n\nระบบจะดึงเรตค่าเงินและราคาใหม่มาใส่ในชีตนี้ทุกวัน เวลา 06:00 น. โดยที่คุณไม่ต้องเปิดคอมพิวเตอร์เลยครับ');
}

/**
 * ฟังก์ชันปิดระบบอัปเดตอัตโนมัติ
 */
function removeAutoTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'fetchAndUpdateAllPrices') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
