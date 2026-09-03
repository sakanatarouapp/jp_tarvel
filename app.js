document.addEventListener("DOMContentLoaded", () => {
  // Global State
  let currentCategory = "all";
  let currentRegion = "all";
  let currentSeason = "all";
  let currentAnalyticsSeason = "spring";
  let currentCalcDays = 5;
  let currentCalcStyleIndex = 1;
  let searchQuery = "";
  // ================= SMART PROXIMITY & LOCATION RESOLUTION ENGINE =================
  const KNOWN_JAPAN_PLACES_DICTIONARY = [
    // Osaka & Kansai
    {
      aliases: ["katsuoji", "katsuo-ji", "katsuojitemple", "วัดคัตสึโอจิ", "คัตสึโอจิ", "วัดดารุมะ", "ดารุมะ", "勝尾寺", "かつおうじ", "วัดคัทสึโอจิ", "katsuo"],
      id: "osaka-katsuoji",
      title: "วัดคัตสึโอจิ — วัดดารุมะแห่งชัยชนะ (Katsuo-ji Temple)",
      japanese: "勝尾寺 (かつおうじ)",
      station: "สถานี Minoh-kayano (M06) ต่อรถบัส Hankyu Bus 15 นาที",
      region: "osaka",
      tag: "วัดดารุมะ / ขอพรชัยชนะ & ธุรกิจรุ่งเรือง",
      icon: "🏮",
      stayHours: "1.5 - 2.5 ชม.",
      lat: 34.8658,
      lng: 135.4912
    },
    {
      aliases: ["denden", "dendentown", "dendenstreet", "nipponbashi", "เด็นเด็น", "เดนเดน", "นิปปอนบาชิ", "日本橋", "でんでんタウン"],
      id: "osaka-denden-town",
      title: "ย่านเด็นเด็นทาวน์ นิปปอนบาชิ (Nipponbashi Denden Town)",
      japanese: "日本橋でんでんタウン",
      station: "สถานี Ebisucho (K18) / Nippombashi (K17) เดิน 2 นาที",
      region: "osaka",
      tag: "อนิเมะ / เกม / ฟิกเกอร์ & อิเล็กทรอนิกส์",
      icon: "🎮",
      stayHours: "2 - 3 ชม.",
      lat: 34.6590,
      lng: 135.5058
    },
    {
      aliases: ["shinsekai", "tsutenkaku", "shinsekaijapantown", "ชินเซไก", "ซึเทนคาคุ", "หอคอยซึเทนคาคุ", "新世界", "通天閣"],
      id: "osaka-shinsekai",
      title: "ย่านชินเซไก & หอคอยซึเทนคาคุ (Shinsekai & Tsutenkaku)",
      japanese: "新世界 / 通天閣",
      station: "สถานี Shin-Imamiya / Dobutsuen-mae / Ebisucho เดิน 3 นาที",
      region: "osaka",
      tag: "ย่านเรโทร / สตรีทฟู้ดคุชิคัตสึ",
      icon: "🗼",
      stayHours: "2 - 3 ชม.",
      lat: 34.6525,
      lng: 135.5063
    },
    {
      aliases: ["kaiyukan", "osakaaquarium", "osakako", "ไคยูคัง", "พิพิธภัณฑ์สัตว์น้ำไคยูคัง", "海遊館"],
      id: "osaka-kaiyukan",
      title: "พิพิธภัณฑ์สัตว์น้ำไคยูคัง (Osaka Aquarium Kaiyukan)",
      japanese: "海遊館 (かいゆうかん)",
      station: "สถานี Osakako (C11 ทางออก 1 เดิน 5 นาที)",
      region: "osaka",
      tag: "อควาเรียมระดับโลก / ฉลามวาฬยักษ์",
      icon: "🦈",
      stayHours: "2.5 - 3.5 ชม.",
      lat: 34.6545,
      lng: 135.4289
    },
    {
      aliases: ["nambayasaka", "nambayasakashrine", "yasakashrine", "ศาลเจ้าหัวสิงโต", "นัมบะยาซากะ", "難波八阪神社"],
      id: "osaka-namba-yasaka",
      title: "ศาลเจ้าหัวสิงโตยักษ์ นัมบะ ยาซากะ (Namba Yasaka Shrine)",
      japanese: "難波八阪神社",
      station: "สถานี Namba ทางออก 5 หรือ 6 (เดิน 6 นาที)",
      region: "osaka",
      tag: "ศาลเจ้าหัวสิงโตยักษ์ / ปัดเป่าโชคร้าย",
      icon: "🦁",
      stayHours: "45 นาที - 1 ชม.",
      lat: 34.6628,
      lng: 135.4965
    },
    {
      aliases: ["shinsaibashi", "shinsaibashisuji", "amerikamura", "ชินไซบาชิ", "อเมริกามูระ", "心斎橋筋商店街", "アメリカ村"],
      id: "osaka-shinsaibashi",
      title: "ถนนช้อปปิ้งชินไซบาชิ & อเมริกามูระ (Shinsaibashi-Suji)",
      japanese: "心斎橋筋商店街",
      station: "สถานี Shinsaibashi (M19 ทางออก 5/6 เชื่อมตรง)",
      region: "osaka",
      tag: "ถนนช้อปปิ้งในร่ม / แฟชั่น & สตรีทฟู้ด",
      icon: "🛍️",
      stayHours: "2.5 - 4 ชม.",
      lat: 34.6710,
      lng: 135.5010
    },
    {
      aliases: ["harukas", "abenoharukas", "harukas300", "อาเบโนะ", "ฮารุกัส", "あべのハルカス"],
      id: "osaka-abeno-harukas",
      title: "จุดชมวิวตึกระฟ้า อาเบโนะ ฮารุกัส 300 (Abeno Harukas)",
      japanese: "あべのハルカス (ハルカス300)",
      station: "สถานี Tennoji (JR/M23) / Osaka-Abenobashi เชื่อมตรงใต้ตึก",
      region: "osaka",
      tag: "ตึกระฟ้า 300 เมตร / วิวพาโนรามา 360 องศา",
      icon: "✨",
      stayHours: "1.5 - 2 ชม.",
      lat: 34.6458,
      lng: 135.5140
    },
    {
      aliases: ["minoh", "minohfalls", "minohpark", "น้ำตกมิโนะ", "อุทยานมิโนะ", "箕面大滝", "箕面公園"],
      id: "osaka-minoh-falls",
      title: "น้ำตกมิโนะ & อุทยานธรรมชาติ (Minoh Falls & Park)",
      japanese: "箕面大滝 / 箕面公園",
      station: "สถานี Minoh (Hankyu Minoh Line เดินเลียบน้ำตก 30 นาที)",
      region: "osaka",
      tag: "ธรรมชาติ / น้ำตกใบไม้เปลี่ยนสี & ใบเมเปิ้ลทอด",
      icon: "🍁",
      stayHours: "2.5 - 3.5 ชม.",
      lat: 34.8500,
      lng: 135.4740
    },
    {
      aliases: ["dotonbori", "glico", "โดทงโบริ", "กูลิโกะ", "ป้ายกูลิโกะ", "道頓堀"],
      id: "osaka-dotonbori",
      title: "ย่านโดทงโบริ & ป้ายไฟกูลิโกะ (Dotonbori & Glico Sign)",
      japanese: "道頓堀 (どうとんぼり)",
      station: "สถานี Namba (M20 ทางออก 14) / Nippombashi เดิน 3 นาที",
      region: "osaka",
      tag: "แลนด์มาร์ก / สตรีทฟู้ด & ช้อปปิ้ง",
      icon: "🏃",
      stayHours: "2 - 3 ชม.",
      lat: 34.6687,
      lng: 135.5013
    },
    {
      aliases: ["osakacastle", "ปราสาทโอซาก้า", "สวนปราสาทโอซาก้า", "大阪城"],
      id: "osaka-castle",
      title: "ปราสาทโอซาก้า & สวนปราสาท (Osaka Castle)",
      japanese: "大阪城 (おおさかじょう)",
      station: "สถานี Osakajokoen (JR Loop Line) / Tanimachi 4-chome เดิน 5 นาที",
      region: "osaka",
      tag: "ประวัติศาสตร์ / แลนด์มาร์กหลัก",
      icon: "🏯",
      stayHours: "2 - 2.5 ชม.",
      lat: 34.6873,
      lng: 135.5262
    },
    {
      aliases: ["usj", "universalstudios", "universalstudiosjapan", "ยูนิเวอร์แซล", "ยูเอสเจ", "ユニバーサルスタジオジャパン"],
      id: "osaka-usj",
      title: "ยูนิเวอร์แซล สตูดิโอส์ เจแปน (Universal Studios Japan)",
      japanese: "ユニバーサル・スタジオ・ジャパン",
      station: "สถานี Universal City (JR Yumesaki Line เดิน 2 นาที)",
      region: "osaka",
      tag: "สวนสนุกระดับโลก / มาริโอ้ & แฮร์รี่ พอตเตอร์",
      icon: "🎢",
      stayHours: "6 - 8 ชม.",
      lat: 34.6654,
      lng: 135.4323
    },
    {
      aliases: ["kuromon", "kuromonmarket", "ตลาดคุโรมง", "คุโรมง", "黒門市場"],
      id: "osaka-kuromon-market",
      title: "ตลาดปลาและสตรีทฟู้ด คุโรมง (Kuromon Ichiba Market)",
      japanese: "黒門市場 (くろもんいちば)",
      station: "สถานี Nippombashi (K17/S17 ทางออก 10 เดิน 1 นาที)",
      region: "osaka",
      tag: "ตลาดปลาสด / ซูชิ & เนื้อย่าง A5",
      icon: "🦀",
      stayHours: "1.5 - 2 ชม.",
      lat: 34.6659,
      lng: 135.5070
    },
    {
      aliases: ["umedasky", "umeda", "floatinggarden", "อุเมดะ", "อุเมดะสกาย", "梅田スカイビル"],
      id: "osaka-umeda-sky",
      title: "จุดชมวิวตึกระฟ้า อุเมดะ สกาย บิลดิ้ง (Umeda Sky Building)",
      japanese: "梅田スカイビル 空中庭園展望台",
      station: "สถานี Osaka / Umeda เดิน 9 นาที",
      region: "osaka",
      tag: "จุดชมวิวเชื่อมสองตึก / พระอาทิตย์ตก",
      icon: "🌉",
      stayHours: "1.5 - 2 ชม.",
      lat: 34.7053,
      lng: 135.4897
    },
    {
      aliases: ["sumiyoshi", "sumiyoshitaisha", "ศาลเจ้าสุมิโยชิ", "สุมิโยชิ", "住吉大社"],
      id: "osaka-sumiyoshi",
      title: "ศาลเจ้าสุมิโยชิ ไทฉะ & สะพานโค้งสีแดง (Sumiyoshi Taisha)",
      japanese: "住吉大社 (すみよしたいしゃ)",
      station: "สถานี Sumiyoshtaitaisha (Nankai Line เดิน 2 นาที)",
      region: "osaka",
      tag: "ศาลเจ้าโบราณ / สะพานกลองสีแดงโซริฮาชิ",
      icon: "⛩️",
      stayHours: "1 - 1.5 ชม.",
      lat: 34.6133,
      lng: 135.4930
    },
    {
      aliases: ["himeji", "himejicastle", "ปราสาทฮิเมจิ", "ฮิเมจิ", "姫路城"],
      id: "osaka-himeji-castle",
      title: "ปราสาทฮิเมจิ มรดกโลก ปราสาทนกกระสาขาว (Himeji Castle)",
      japanese: "姫路城 (ひめじじょう)",
      station: "สถานี JR Himeji (เดิน 15 นาที หรือนั่งรถบัส 5 นาที)",
      region: "osaka",
      tag: "มรดกโลก UNESCO / ปราสาทดั้งเดิม",
      icon: "🏯",
      stayHours: "2.5 - 3.5 ชม.",
      lat: 34.8394,
      lng: 134.6939
    },
    {
      aliases: ["nara", "narapark", "todaiji", "สวนกวางนารา", "นารา", "กวางนารา", "วัดโทไดจิ", "奈良公園", "東大寺"],
      id: "kansai-nara-park",
      title: "สวนกวางนารา & วัดหลวงพ่อโตโทไดจิ (Nara Deer Park & Todai-ji)",
      japanese: "奈良公園 & 東大寺 (大仏殿)",
      station: "สถานี Kintetsu-Nara เดิน 5 นาที / JR Nara เดิน 15 นาที",
      region: "osaka",
      tag: "สวนกวางแสนรู้ / พระใหญ่ไดบุตสึไม้ที่ใหญ่ที่สุด",
      icon: "🦌",
      stayHours: "3 - 4 ชม.",
      lat: 34.6851,
      lng: 135.8430
    },

    // Kyoto
    {
      aliases: ["fushimiinari", "fushimi", "inari", "เสาโทริอิ", "ฟูชิมิอินาริ", "ศาลเจ้าจิ้งจอก", "伏見稲荷大社"],
      id: "kyoto-fushimi-inari",
      title: "ศาลเจ้าฟูชิมิ อินาริ (Fushimi Inari Taisha)",
      japanese: "伏見稲荷大社",
      station: "สถานี Fushimi-Inari (Keihan Line) / Inari (JR Nara Line เดิน 1 นาที)",
      region: "kyoto",
      tag: "วัด & วัฒนธรรม / เสาโทริอิพันต้น",
      icon: "⛩️",
      stayHours: "2 - 3 ชม.",
      lat: 34.9671,
      lng: 135.7727
    },
    {
      aliases: ["arashiyama", "bamboogrove", "ป่าไผ่", "อาราชิยามะ", "สะพานโทเก็ตสึเคียว", "嵐山"],
      id: "kyoto-arashiyama",
      title: "ป่าไผ่อาราชิยามะ & สะพานโทเก็ตสึเคียว (Arashiyama)",
      japanese: "嵐山 竹林の小径",
      station: "สถานี Saga-Arashiyama (JR) / Arashiyama (Hankyu/Keifuku เดิน 5 นาที)",
      region: "kyoto",
      tag: "ธรรมชาติ & วัฒนธรรม / ป่าไผ่โบราณ",
      icon: "🎋",
      stayHours: "3 - 4 ชม.",
      lat: 35.0166,
      lng: 135.6713
    },
    {
      aliases: ["kiyomizu", "kiyomizudera", "วัดน้ำใส", "คิโยมิสุเดระ", "ซันเนนซากะ", "清水寺"],
      id: "kyoto-kiyomizudera",
      title: "วัดน้ำใสคิโยมิสุเดระ & ถนนคนเดินโบราณ (Kiyomizu-dera)",
      japanese: "清水寺 & 産寧坂 (三年坂)",
      station: "นั่งรถบัส Kyoto City Bus สาย 206 หรือ 100 ลงป้าย Gojozaka / Kiyomizu-michi",
      region: "kyoto",
      tag: "มรดกโลก UNESCO / ระเบียงไม้ไร้ตะปู",
      icon: "⛩️",
      stayHours: "2 - 3 ชม.",
      lat: 34.9949,
      lng: 135.7850
    },
    {
      aliases: ["kinkakuji", "goldenpavilion", "วัดทอง", "คินคะคุจิ", "金閣寺"],
      id: "kyoto-kinkakuji",
      title: "วัดทองคินคะคุจิ (Kinkaku-ji Golden Pavilion)",
      japanese: "金閣寺 (鹿苑寺)",
      station: "นั่งรถบัส Kyoto City Bus สาย 12 หรือ 205 ลงป้าย Kinkakuji-michi",
      region: "kyoto",
      tag: "มรดกโลก / ศาลาทองคำสะท้อนผืนน้ำ",
      icon: "✨",
      stayHours: "1 - 1.5 ชม.",
      lat: 35.0394,
      lng: 135.7292
    },
    {
      aliases: ["ginkakuji", "silverpavilion", "วัดเงิน", "กิงคะคุจิ", "ทางเดินสายปรัชญา", "銀閣寺"],
      id: "kyoto-ginkakuji",
      title: "วัดเงินกิงคะคุจิ & ทางเดินสายปรัชญา (Ginkaku-ji)",
      japanese: "銀閣寺 (慈照寺)",
      station: "นั่งรถบัส Kyoto City Bus สาย 5, 17, 100 ลงป้าย Ginkakuji-michi",
      region: "kyoto",
      tag: "วัด & สวนทรายเซน / ทางเดินสายปรัชญา",
      icon: "🍃",
      stayHours: "1 - 1.5 ชม.",
      lat: 35.0272,
      lng: 135.7982
    },
    {
      aliases: ["nishiki", "nishikimarket", "ตลาดนิชิกิ", "ครัวเกียวโต", "錦市場"],
      id: "kyoto-nishiki-market",
      title: "ตลาดนิชิกิ — ครัวแห่งเกียวโต (Nishiki Market)",
      japanese: "錦市場 (にしきいちば)",
      station: "สถานี Shijo (Karama Line) / Kyoto-kawaramachi (Hankyu Line เดิน 3 นาที)",
      region: "kyoto",
      tag: "สตรีทฟู้ดโบราณ / อาหารเกียวโตแท้",
      icon: "🍢",
      stayHours: "1.5 - 2 ชม.",
      lat: 35.0050,
      lng: 135.7650
    },
    {
      aliases: ["byodoin", "uji", "วัดเบียวโดอิน", "อุจิ", "ชาเขียวอุจิ", "平等院"],
      id: "kyoto-byodoin",
      title: "วัดเบียวโดอิน & เมืองชาเขียวอุจิ (Byodoin Temple & Uji)",
      japanese: "平等院 鳳凰堂 & 宇治",
      station: "สถานี JR Uji / Keihan Uji (เดิน 10 นาที)",
      region: "kyoto",
      tag: "วิหารหงส์บนเหรียญ 10 เยน / มรดกโลก & ชาเขียว",
      icon: "🍵",
      stayHours: "2 - 3 ชม.",
      lat: 34.8893,
      lng: 135.8078
    },
    {
      aliases: ["gion", "hanamikoji", "yasakashrine", "กิออน", "ย่านกิออน", "ฮานามิโคจิ", "เกอิชา", "ศาลเจ้ายาซากะ", "祇園", "花見小路"],
      id: "kyoto-gion-hanamikoji",
      title: "ย่านกิออน & ถนนสายเกอิชา ฮานามิโคจิ (Gion & Hanamikoji Geisha District)",
      japanese: "祇園 / 花見小路通 (ぎおん / はなみこうじどおり)",
      station: "สถานี Gion-Shijo (Keihan) / Kyoto-Kawaramachi (Hankyu เดิน 3 นาที)",
      region: "kyoto",
      tag: "ย่านเกอิชาโบราณ / บ้านไม้ Machiya & โรงน้ำชา",
      icon: "🏮",
      stayHours: "2 - 3 ชม.",
      lat: 35.0037,
      lng: 135.7753
    },

    // Tokyo & Kanto
    {
      aliases: ["sensoji", "asakusa", "วัดเซนโซจิ", "วัดอาซากุสะ", "โคมแดง", "浅草寺"],
      id: "tokyo-sensoji",
      title: "วัดเซนโซจิ อาซากุสะ (Sensoji Temple)",
      japanese: "浅草寺 (せんそうじ)",
      station: "สถานี Asakusa (G19/A18 ทางออก 1 เดิน 3 นาที)",
      region: "tokyo",
      tag: "วัด & วัฒนธรรม / โคมแดงยักษ์",
      icon: "⛩️",
      stayHours: "1.5 - 2 ชม.",
      lat: 35.7148,
      lng: 135.7968
    },
    {
      aliases: ["shibuyasky", "shibuya", "shibuyacrossing", "ชิบูย่า", "ชิบูย่าสกาย", "ห้าแยกชิบูย่า", "渋谷"],
      id: "tokyo-shibuya-sky",
      title: "ชิบูย่า สกาย & ทางข้ามห้าแยก (Shibuya Sky)",
      japanese: "SHIBUYA SKY & 渋谷スクランブル交差点",
      station: "สถานี Shibuya (JY20/G01 ทางออก Hachiko เชื่อมตรงตึก)",
      region: "tokyo",
      tag: "แลนด์มาร์ก / วิวมุมสูง 360°",
      icon: "🗼",
      stayHours: "2 - 2.5 ชม.",
      lat: 35.6580,
      lng: 139.7016
    },
    {
      aliases: ["skytree", "tokyoskytree", "สกายทรี", "โตเกียวสกายทรี", "東京スカイツリー"],
      id: "tokyo-skytree",
      title: "โตเกียวสกายทรี (Tokyo Skytree)",
      japanese: "東京スカイツリー",
      station: "สถานี Tokyo Skytree (Tobu Line) / Oshiage (Z14/A20 เชื่อมตรง)",
      region: "tokyo",
      tag: "แลนด์มาร์ก & ชมวิว 360°",
      icon: "🗼",
      stayHours: "2 - 3 ชม.",
      lat: 35.7100,
      lng: 139.8107
    },
    {
      aliases: ["tokyotower", "โตเกียวทาวเวอร์", "หอคอยโตเกียว", "東京タワー"],
      id: "tokyo-tower",
      title: "โตเกียวทาวเวอร์ (Tokyo Tower)",
      japanese: "東京タワー",
      station: "สถานี Akabanebashi (Oedo Line เดิน 5 นาที) / Kamiyacho",
      region: "tokyo",
      tag: "แลนด์มาร์กคลาสสิกสีส้มขาว / วิวมุมสูง",
      icon: "🗼",
      stayHours: "1.5 - 2 ชม.",
      lat: 35.6586,
      lng: 139.7454
    },
    {
      aliases: ["tsukiji", "toyosu", "ตลาดปลา", "ตลาดปลาสึกิจิ", "โทโยสึ", "築地市場", "豊洲市場"],
      id: "tokyo-tsukiji-food",
      title: "ตลาดปลาสึกิจิ & โทโยสึ (Tsukiji Outer Market)",
      japanese: "築地場外市場 & 豊洲市場",
      station: "สถานี Tsukiji (H10) / Tsukijishijo (E18 เดิน 1 นาที)",
      region: "tokyo",
      tag: "สตรีทฟู้ดซีฟู้ด / ซูชิต้นตำรับ & ไข่หวานย่าง",
      icon: "🍣",
      stayHours: "1.5 - 2 ชม.",
      lat: 35.6655,
      lng: 139.7708
    },
    {
      aliases: ["shinjukugyoen", "shinjuku", "สวนชินจูกุ", "ชินจูกุเกียวเอน", "新宿御苑"],
      id: "tokyo-shinjuku-gyoen",
      title: "สวนชินจูกุเกียวเอน (Shinjuku Gyoen National Garden)",
      japanese: "新宿御苑 (しんじゅくぎょえん)",
      station: "สถานี Shinjuku-gyoemmae (M09 ทางออก 1 เดิน 5 นาที)",
      region: "tokyo",
      tag: "สวนธรรมชาติ / จุดชมซากุระ & ใบไม้เปลี่ยนสี",
      icon: "🌸",
      stayHours: "2 - 2.5 ชม.",
      lat: 35.6852,
      lng: 139.7101
    },
    {
      aliases: ["teamlabplanets", "teamlab", "ทีมแล็บ", "แพลเน็ตส์", "チームラボプラネッツ"],
      id: "tokyo-teamlab-planets",
      title: "พิพิธภัณฑ์ศิลปะดิจิทัล teamLab Planets โตเกียว (Toyosu)",
      japanese: "teamLab Planets TOKYO (チームラボプラネッツ 豊洲)",
      station: "สถานี Shin-Toyosu (Yurikamome Line เดิน 1 นาที)",
      region: "tokyo",
      tag: "ดิจิทัลอาร์ตระดับโลก / ลุยน้ำ & สวนดอกไม้กระจก",
      icon: "✨",
      stayHours: "2 - 2.5 ชม.",
      lat: 35.6514,
      lng: 139.7897
    },
    {
      aliases: ["teamlabborderless", "borderless", "azabudai", "บอร์เดอร์เลส", "อาซาบุได", "麻布台ヒルズ"],
      id: "tokyo-teamlab-borderless",
      title: "teamLab Borderless ดิจิทัลอาร์ต อาซาบุได ฮิลส์ (Azabudai Hills)",
      japanese: "teamLab Borderless (麻布台ヒルズ)",
      station: "สถานี Kamiyacho (Hibiya Line เชื่อมตรงใต้ตึก)",
      region: "tokyo",
      tag: "พิพิธภัณฑ์ศิลปะดิจิทัลระดับโลก",
      icon: "✨",
      stayHours: "2.5 - 3 ชม.",
      lat: 35.6608,
      lng: 139.7431
    },
    {
      aliases: ["disney", "disneyland", "disneysea", "โตเกียวดิสนีย์แลนด์", "ดิสนีย์แลนด์", "ดิสนีย์ซี", "ディズニーランド", "ディズニーシー"],
      id: "tokyo-disney",
      title: "โตเกียวดิสนีย์แลนด์ & ดิสนีย์ซี (Tokyo Disney Resort)",
      japanese: "東京ディズニーリゾート (TDL & TDS)",
      station: "สถานี JR Maihama (Keiyo Line เชื่อมต่อ Disney Resort Line)",
      region: "tokyo",
      tag: "อาณาจักรเวทมนตร์ / Fantasy Springs",
      icon: "🏰",
      stayHours: "8 - 10 ชม.",
      lat: 35.6329,
      lng: 139.8804
    },
    {
      aliases: ["kamakura", "enoshima", "daibutsu", "พระใหญ่คามาคุระ", "คามาคุระ", "เอโนชิมะ", "鎌倉大仏", "江の島"],
      id: "kanto-kamakura-daibutsu",
      title: "พระใหญ่ไดบุตสึ & เมืองเก่าริมทะเลคามาคุระ (Kamakura & Enoshima)",
      japanese: "鎌倉大仏 (高徳院) & 江の島",
      station: "สถานี Hase (Enoden Line เดิน 5 นาที) / Kamakura (JR Yokosuka Line)",
      region: "tokyo",
      tag: "พระใหญ่กลางแจ้ง / รถไฟโบราณ Enoden เลียบทะเล",
      icon: "🧘",
      stayHours: "4 - 5 ชม.",
      lat: 35.3168,
      lng: 139.5357
    },
    {
      aliases: ["hakone", "lakeashi", "owakudani", "ฮาโกเนะ", "ทะเลสาบอาชิ", "โอวากุดานิ", "ไข่ดำ", "箱根", "芦ノ湖", "大涌谷"],
      id: "kanto-hakone-lake-ashi",
      title: "ล่องเรือโจรสลัดทะเลสาบอาชิ & ฮาโกเนะออนเซ็น (Hakone Lake Ashi)",
      japanese: "箱根海賊船 (芦ノ湖) & 大涌谷温泉",
      station: "สถานี Hakone-Yumoto (Odakyu Romancecar ต่อ Hakone Tozan Railway)",
      region: "tokyo",
      tag: "ล่องเรือชมวิวฟูจิ / ไข่ดำโอวากุดานิ & แช่ออนเซ็น",
      icon: "🚢",
      stayHours: "5 - 7 ชม.",
      lat: 35.2045,
      lng: 139.0223
    },

    // Chubu & Fuji
    {
      aliases: ["kawaguchiko", "fuji", "chureito", "คาวากุจิโกะ", "ฟูจิ", "เจดีย์ชูเรโตะ", "ภูเขาไฟฟูจิ", "河口湖", "新倉山浅間公園"],
      id: "fuji-kawaguchiko",
      title: "ทะเลสาบคาวากุจิโกะ & เจดีย์ชูเรโตะ (Lake Kawaguchiko & Chureito Pagoda)",
      japanese: "富士河口湖 & 新倉山浅間公園 (忠霊塔)",
      station: "สถานี Kawaguchiko (Fujikyu Railway) / Shimoyoshida เดิน 15 นาที",
      region: "chubu",
      tag: "วิวฟูจิยอดฮิตอันดับ 1 / เจดีย์แดง 5 ชั้น",
      icon: "🗻",
      stayHours: "4 - 6 ชม.",
      lat: 35.5015,
      lng: 138.7562
    },
    {
      aliases: ["shirakawago", "shirakawa", "ชิราคาวาโกะ", "หมู่บ้านมรดกโลก", "บ้านทรงพนมมือ", "白川郷"],
      id: "chubu-shirakawago",
      title: "หมู่บ้านมรดกโลก ชิราคาวาโกะ (Shirakawa-go Village)",
      japanese: "白川郷 合掌造り集落",
      station: "สถานี Shirakawa-go Bus Terminal (นั่งบัสจาก Takayama/Kanazawa 50 นาที)",
      region: "chubu",
      tag: "มรดกโลก UNESCO / บ้านกัสโชซึคุริหิมะขาว",
      icon: "🏘️",
      stayHours: "3 - 4 ชม.",
      lat: 36.2562,
      lng: 136.9064
    },
    {
      aliases: ["takayama", "sanmachi", "ทาคายามะ", "เมืองเก่าทาคายามะ", "เนื้อฮิดะ", "飛騨高山"],
      id: "chubu-takayama-oldtown",
      title: "เมืองเก่าทาคายามะ ซันมาจิ ซูจิ & วากิวฮิดะ (Takayama Sanmachi)",
      japanese: "飛騨高山 古い町並み (三町通り) & 飛騨牛",
      station: "สถานี JR Takayama (Takayama Main Line เดิน 8 นาที)",
      region: "chubu",
      tag: "เมืองเก่าเอโดะ / ข้าวปั้นซูชิเนื้อฮิดะวากิว A5",
      icon: "🥩",
      stayHours: "3 - 4 ชม.",
      lat: 36.1408,
      lng: 137.2588
    },

    // Hokkaido
    {
      aliases: ["otaru", "otarucanal", "โอตารุ", "คลองโอตารุ", "小樽運河"],
      id: "hokkaido-otaru-canal",
      title: "คลองโอตารุ & ถนนสายโรแมนติก (Otaru Canal)",
      japanese: "小樽運河 (おたるうんが)",
      station: "สถานี Otaru (JR Hakodate Line เดิน 8 นาที)",
      region: "hokkaido",
      tag: "คลองโบราณ & บรรยากาศโรแมนติก",
      icon: "❄️",
      stayHours: "2.5 - 4 ชม.",
      lat: 43.1907,
      lng: 140.9947
    },
    {
      aliases: ["sappororamen", "ramenalley", "ตรอกราเมง", "ซัปโปโร", "susukino", "ราเมงซัปโปโร", "ラーメン横丁"],
      id: "hokkaido-ramen-alley",
      title: "ตรอกราเมงซัปโปโร ซูซูกิโนะ (Ganso Ramen Yokocho)",
      japanese: "元祖さっぽろラーメン横丁",
      station: "สถานี Susukino (Namboku Line ทางออก 3 เดิน 2 นาที)",
      region: "hokkaido",
      tag: "สตรีทฟู้ด / มิโซะราเมงฮอกไกโด",
      icon: "🍜",
      stayHours: "1 - 1.5 ชม.",
      lat: 43.0556,
      lng: 141.3533
    },
    {
      aliases: ["hakodate", "mounthakodate", "ฮาโกดาเตะ", "ยอดเขาฮาโกดาเตะ", "函館山"],
      id: "hokkaido-hakodate-night",
      title: "จุดชมวิวกลางคืนยอดเขาฮาโกดาเตะ & ตลาดเช้า (Mount Hakodate)",
      japanese: "函館山ロープウェイ & 函館朝市",
      station: "สถานี Hakodate (JR) / นั่งกระเช้า Mt. Hakodate Ropeway",
      region: "hokkaido",
      tag: "วิวกลางคืน 1 ใน 3 ที่สวยที่สุดในโลก",
      icon: "🌃",
      stayHours: "3 - 4 ชม.",
      lat: 41.7588,
      lng: 140.7042
    },

    // Fukuoka & Kyushu
    {
      aliases: ["nakasu", "yatai", "fukuoka", "นากาสุ", "ยาไต", "ฟุกุโอกะ", "中洲屋台"],
      id: "fukuoka-yatai-nakasu",
      title: "ร้านสตรีทฟู้ดแผงลอยยาไต ย่านนากาสุ (Nakasu Yatai Stalls)",
      japanese: "中洲屋台街 (なかす やたいがい)",
      station: "สถานี Nakasu-Kawabata (Kuko Line ทางออก 1 เดิน 5 นาที)",
      region: "fukuoka",
      tag: "วัฒนธรรมกินดื่มริมแม่น้ำ / ฮากาตะทงคตสึราเมง",
      icon: "🍜",
      stayHours: "2 - 3 ชม.",
      lat: 33.5902,
      lng: 130.4078
    },
    {
      aliases: ["dazaifu", "dazaifutenmangu", "ดาไซฟุ", "ศาลเจ้าดาไซฟุ", "ขนมบ๊วยย่าง", "太宰府天満宮"],
      id: "fukuoka-dazaifu",
      title: "ศาลเจ้าดาไซฟุ เทนมันกุ & ขนมบ๊วยย่าง (Dazaifu Tenmangu Shrine)",
      japanese: "太宰府天満宮 & 梅ヶ枝餅",
      station: "สถานี Dazaifu (Nishitetsu Dazaifu Line เดิน 5 นาที)",
      region: "fukuoka",
      tag: "ขอพรการเรียน & การสอบ / ต้นบ๊วยศักดิ์สิทธิ์",
      icon: "⛩️",
      stayHours: "2 - 3 ชม.",
      lat: 33.5215,
      lng: 130.5349
    },

    // Hiroshima & Chugoku
    {
      aliases: ["miyajima", "itsukushima", "มิยาจิมะ", "ศาลเจ้าลอยน้ำ", "เสาโทริอิกลางทะเล", "厳島神社", "宮島"],
      id: "hiroshima-miyajima",
      title: "ศาลเจ้าลอยน้ำมิยาจิมะ & เสาโทริอิกลางทะเล (Miyajima Itsukushima Shrine)",
      japanese: "宮島 厳島神社 (大鳥居)",
      station: "สถานี Miyajimaguchi (JR) แล้วนั่งเรือเฟอร์รี่ JR Miyajima Ferry 10 นาที",
      region: "hiroshima",
      tag: "มรดกโลก UNESCO / เสาโทริอิสีแดงลอยน้ำ",
      icon: "⛩️",
      stayHours: "3 - 5 ชม.",
      lat: 34.2960,
      lng: 132.3198
    }
  ];

  const MAJOR_JAPAN_STATIONS = [
    // Osaka
    { name: "สถานี Namba (M20/Y15)", lat: 34.6669, lng: 135.5005, region: "osaka", distName: "Namba" },
    { name: "สถานี Nipponbashi (K17/S17)", lat: 34.6667, lng: 135.5065, region: "osaka", distName: "Nipponbashi / Denden Town" },
    { name: "สถานี Shinsaibashi (M19)", lat: 34.6750, lng: 135.5004, region: "osaka", distName: "Shinsaibashi" },
    { name: "สถานี Ebisucho (K18) / Dobutsuen-mae", lat: 34.6525, lng: 135.5063, region: "osaka", distName: "Shinsekai" },
    { name: "สถานี Osaka / Umeda (JR/Metro)", lat: 34.7024, lng: 135.4959, region: "osaka", distName: "Umeda" },
    { name: "สถานี Osakajokoen / Morinomiya (JR Loop Line)", lat: 34.6885, lng: 135.5342, region: "osaka", distName: "Osaka Castle" },
    { name: "สถานี Osakako (C11)", lat: 34.6552, lng: 135.4312, region: "osaka", distName: "Kaiyukan" },
    { name: "สถานี Tennoji (JR/M23)", lat: 34.6473, lng: 135.5140, region: "osaka", distName: "Tennoji / Harukas" },
    { name: "สถานี Universal City (JR Yumesaki Line)", lat: 34.6678, lng: 135.4385, region: "osaka", distName: "USJ" },
    { name: "สถานี Shin-Osaka (Shinkansen/M13)", lat: 34.7335, lng: 135.5003, region: "osaka", distName: "Shin-Osaka" },
    { name: "สถานี Minoh (Hankyu Minoh Line)", lat: 34.8268, lng: 135.4704, region: "osaka", distName: "Minoh" },
    // Tokyo
    { name: "สถานี Shinjuku (JY17/M08)", lat: 35.6896, lng: 139.7005, region: "tokyo", distName: "Shinjuku" },
    { name: "สถานี Shibuya (JY20/G01)", lat: 35.6580, lng: 139.7016, region: "tokyo", distName: "Shibuya" },
    { name: "สถานี Tokyo Station (Marunouchi)", lat: 35.6812, lng: 139.7671, region: "tokyo", distName: "Tokyo Station" },
    { name: "สถานี Asakusa (G19/A18)", lat: 35.7118, lng: 139.7966, region: "tokyo", distName: "Asakusa" },
    { name: "สถานี Ueno (JY05/G16)", lat: 35.7141, lng: 139.7774, region: "tokyo", distName: "Ueno" },
    { name: "สถานี Akihabara (JY03/H16)", lat: 35.6983, lng: 139.7730, region: "tokyo", distName: "Akihabara" },
    { name: "สถานี Ginza (G09/M16)", lat: 35.6715, lng: 139.7649, region: "tokyo", distName: "Ginza" },
    { name: "สถานี Roppongi (H04/E23)", lat: 35.6628, lng: 139.7313, region: "tokyo", distName: "Roppongi" },
    { name: "สถานี Ikebukuro (JY13/M25)", lat: 35.7295, lng: 139.7109, region: "tokyo", distName: "Ikebukuro" },
    // Kyoto
    { name: "สถานี Kyoto Station (JR/Subway)", lat: 34.9858, lng: 135.7588, region: "kyoto", distName: "Kyoto Station" },
    { name: "สถานี Gion-Shijo / Kawaramachi", lat: 35.0037, lng: 135.7725, region: "kyoto", distName: "Gion / Kawaramachi" },
    { name: "สถานี Fushimi-Inari / Inari", lat: 34.9671, lng: 135.7727, region: "kyoto", distName: "Fushimi Inari" },
    { name: "สถานี Saga-Arashiyama / Arashiyama", lat: 35.0166, lng: 135.6713, region: "kyoto", distName: "Arashiyama" }
  ];

  function getDistanceKm(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function resolveSmartStationAndRegion(query, lat, lon) {
    const rawQ = (query || "").trim();
    const cleanQ = rawQ.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');

    // 1. Check known synonym dictionary
    for (const p of KNOWN_JAPAN_PLACES_DICTIONARY) {
      if (p.aliases.some(a => cleanQ.includes(a) || a.includes(cleanQ))) {
        return {
          station: p.station,
          japanese: p.japanese,
          region: p.region,
          tag: p.tag,
          stayHours: p.stayHours,
          lat: lat || p.lat,
          lng: lon || p.lng
        };
      }
    }

    // 2. Check exact/partial keyword match in JAPAN_DATA
    const matchInJapanData = JAPAN_DATA.find(d => {
      const dTitle = (d.title || "").toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
      const dJp = (d.japanese || "").toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
      const dKw = (d.keyword || "").toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
      const dId = (d.id || "").toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
      return dId === cleanQ || dTitle.includes(cleanQ) || cleanQ.includes(dTitle) || dJp.includes(cleanQ) || dKw.includes(cleanQ);
    });

    if (matchInJapanData) {
      const stationText = matchInJapanData.transport ? matchInJapanData.transport.split('(')[0].replace('สถานี', '').trim() : matchInJapanData.tag;
      return {
        station: stationText,
        japanese: matchInJapanData.japanese,
        fullTransport: matchInJapanData.transport,
        region: matchInJapanData.region,
        tag: matchInJapanData.tag,
        stayHours: "1.5 - 2.5 ชม.",
        lat: (ROUTE_SIMULATION_META[matchInJapanData.id] ? ROUTE_SIMULATION_META[matchInJapanData.id].lat : (lat || 34.6687)),
        lng: (ROUTE_SIMULATION_META[matchInJapanData.id] ? ROUTE_SIMULATION_META[matchInJapanData.id].lng : (lon || 135.5013))
      };
    }

    // 3. Proximity check against MAJOR_JAPAN_STATIONS
    let closestStation = null;
    let minDistance = 999999;
    if (lat && lon) {
      MAJOR_JAPAN_STATIONS.forEach(st => {
        const dist = getDistanceKm(lat, lon, st.lat, st.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closestStation = st;
        }
      });
    }

    if (closestStation && minDistance < 6) {
      const walkMin = Math.max(2, Math.round(minDistance * 13));
      return {
        station: `เดิน ${walkMin} นาทีจาก${closestStation.name}`,
        japanese: rawQ,
        region: closestStation.region,
        tag: `ย่าน ${closestStation.distName}`,
        stayHours: "1.5 - 2 ชม.",
        lat: lat,
        lng: lon
      };
    }

    // 4. Fallback
    return {
      station: "สถานี Namba / Shinsaibashi (ใจกลางเมือง)",
      japanese: rawQ,
      region: "osaka",
      tag: "จุดหมายยอดฮิต",
      stayHours: "1.5 - 2 ชม.",
      lat: lat || 34.6687,
      lng: lon || 135.5013
    };
  }

  function getSmartMetaForItem(item) {
    const rawTitle = item.title || item.name || item.id || "";
    const baseId = item.baseId || (item.id ? item.id.split('_')[0] : item.id);
    const resolved = resolveSmartStationAndRegion(rawTitle, item.lat, item.lng);

    const base = ROUTE_SIMULATION_META[item.id] || ROUTE_SIMULATION_META[baseId] || {};
    const station = (base.station && base.station !== "สถานีใกล้เคียง" && base.station !== "จากการค้นหา")
      ? base.station
      : ((item.station && item.station !== "สถานีใกล้เคียง" && item.station !== "จากการค้นหา") ? item.station : resolved.station);

    const japanese = resolved.japanese || item.japanese || base.japanese || rawTitle;

    return {
      station: station,
      stayHours: item.stayHours || base.stayHours || resolved.stayHours || "1.5 - 2 ชม.",
      bestTimeOfDay: base.bestTimeOfDay || "ช่วงเวลาที่สะดวก",
      icon: item.icon || base.icon || resolved.icon || "📍",
      region: item.region || base.region || resolved.region || "osaka",
      lat: item.lat || base.lat || resolved.lat,
      lng: item.lng || base.lng || resolved.lng,
      mapsName: rawTitle,
      japanese: japanese
    };
  }

  // Canonical Mapping of Known Synonyms & Place IDs
  const CANONICAL_PLACE_MAP = {
    "hotspot-shop-denden-town": "osaka-denden-town",
    "denden-town": "osaka-denden-town",
    "denden": "osaka-denden-town",
    "nipponbashi-denden": "osaka-denden-town",
    "hotspot-shop-shinsaibashi": "osaka-shinsaibashi",
    "shinsaibashi": "osaka-shinsaibashi",
    "hotspot-attraction-kaiyukan": "osaka-kaiyukan",
    "kaiyukan": "osaka-kaiyukan",
    "hotspot-attraction-namba-yasaka": "osaka-namba-yasaka",
    "namba-yasaka": "osaka-namba-yasaka",
    "hotspot-attraction-katsuoji": "osaka-katsuoji",
    "katsuoji": "osaka-katsuoji",
    "hotspot-attraction-disneyland": "tokyo-disneyland-guide",
    "disneyland": "tokyo-disneyland-guide",
    "hotspot-attraction-disneysea": "tokyo-disneysea-guide",
    "disneysea": "tokyo-disneysea-guide",
    "usj": "osaka-usj",
    "gion": "kyoto-gion-hanamikoji",
    "hanamikoji": "kyoto-gion-hanamikoji",
    "kyoto-gion": "kyoto-gion-hanamikoji"
  };

  function getCanonicalPlaceId(id, title = "") {
    if (!id && !title) return "";
    const rawId = (id || "").toLowerCase().trim();
    const rawTitle = (title || "").toLowerCase().trim();
    
    if (CANONICAL_PLACE_MAP[rawId]) return CANONICAL_PLACE_MAP[rawId];
    
    // Direct match in JAPAN_DATA
    if (typeof JAPAN_DATA !== "undefined" && Array.isArray(JAPAN_DATA)) {
      const direct = JAPAN_DATA.find(p => p.id === rawId || p.id === rawId.split('_')[0]);
      if (direct) return direct.id;
    }

    // Search by keyword/alias in titles
    if (rawId.includes("denden") || rawTitle.includes("denden") || rawTitle.includes("เด็นเด็น") || rawTitle.includes("เดนเดน") || rawTitle.includes("den den") || rawTitle.includes("nipponbashi")) {
      return "osaka-denden-town";
    }
    if (rawId.includes("shinsaibashi") || rawTitle.includes("shinsaibashi") || rawTitle.includes("ชินไซบาชิ")) {
      return "osaka-shinsaibashi";
    }
    if (rawId.includes("kaiyukan") || rawTitle.includes("kaiyukan") || rawTitle.includes("ไคยูคัง")) {
      return "osaka-kaiyukan";
    }
    if (rawId.includes("yasaka") || rawTitle.includes("yasaka") || rawTitle.includes("หัวสิงโต")) {
      return "osaka-namba-yasaka";
    }
    if (rawId.includes("katsuo") || rawTitle.includes("katsuo") || rawTitle.includes("คัตสึโอจิ") || rawTitle.includes("ดารุมะ")) {
      return "osaka-katsuoji";
    }
    if (rawId.includes("disneysea") || rawTitle.includes("disneysea") || rawTitle.includes("ดิสนีย์ซี")) {
      return "tokyo-disneysea-guide";
    }
    if (rawId.includes("disneyland") || rawTitle.includes("disneyland") || rawTitle.includes("ดิสนีย์แลนด์")) {
      return "tokyo-disneyland-guide";
    }
    if (rawId.includes("usj") || rawTitle.includes("universal") || rawTitle.includes("ยูเอสเจ") || rawTitle.includes("ยูนิเวอร์แซล")) {
      return "osaka-usj";
    }

    return rawId;
  }

  function arePlacesEquivalent(placeA, placeB) {
    if (!placeA || !placeB) return false;
    const idA = getCanonicalPlaceId(placeA.baseId || placeA.id, placeA.title || placeA.name);
    const idB = getCanonicalPlaceId(placeB.baseId || placeB.id, placeB.title || placeB.name);
    return idA === idB;
  }

  // Load Saved Itinerary and Custom Places
  let itineraryList = JSON.parse(localStorage.getItem("nippon_itinerary") || "[]");
  let customPlacesStore = JSON.parse(localStorage.getItem("nippon_custom_places") || "[]");

  // Auto-enrich & sanitize custom places and saved itinerary from localStorage on startup
  if (itineraryList && itineraryList.length > 0) {
    itineraryList.forEach((item, idx) => {
      if (!item.day || typeof item.day !== "number") {
        item.day = Math.floor(idx / 3) + 1;
      }
      const smart = resolveSmartStationAndRegion(item.title || item.name || item.id, item.lat, item.lng);
      if (!item.station || item.station === "สถานีใกล้เคียง" || item.station === "จากการค้นหา") {
        item.station = smart.station;
      }
      item.region = item.region || smart.region;
      item.tag = (item.tag && item.tag !== "จากการค้นหา" && item.tag !== "จุดหมายของฉัน") ? item.tag : smart.tag;
      item.stayHours = item.stayHours || smart.stayHours;
      if (!item.japanese || item.japanese === item.title) {
        item.japanese = smart.japanese || item.title;
      }
    });
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
  }

  if (customPlacesStore && customPlacesStore.length > 0) {
    const dedupedCustom = [];
    const seenCanonicalIds = new Set();

    customPlacesStore.forEach(cp => {
      const canonicalId = getCanonicalPlaceId(cp.id, cp.title || cp.name);
      if (!seenCanonicalIds.has(canonicalId)) {
        seenCanonicalIds.add(canonicalId);
        const canonInJapanData = JAPAN_DATA.find(j => j.id === canonicalId);
        const smart = resolveSmartStationAndRegion(cp.title || cp.name || cp.id, cp.lat, cp.lng);

        if (canonInJapanData) {
          dedupedCustom.push({
            ...cp,
            id: canonicalId,
            baseId: canonicalId,
            title: canonInJapanData.title,
            japanese: canonInJapanData.japanese,
            region: canonInJapanData.region,
            station: canonInJapanData.station || smart.station,
            tag: canonInJapanData.tag || smart.tag,
            stayHours: canonInJapanData.stayHours || smart.stayHours
          });
        } else {
          dedupedCustom.push({
            ...cp,
            id: cp.id || canonicalId,
            baseId: canonicalId,
            station: (!cp.station || cp.station === "สถานีใกล้เคียง" || cp.station === "จากการค้นหา") ? smart.station : cp.station,
            region: cp.region || smart.region,
            tag: (cp.tag && cp.tag !== "จากการค้นหา" && cp.tag !== "จุดหมายของฉัน") ? cp.tag : smart.tag,
            stayHours: cp.stayHours || smart.stayHours,
            japanese: (!cp.japanese || cp.japanese === cp.title) ? (smart.japanese || cp.title) : cp.japanese
          });
        }
      }
    });

    customPlacesStore = dedupedCustom;
    localStorage.setItem("nippon_custom_places", JSON.stringify(customPlacesStore));
  }

  // Register saved custom places into ROUTE_SIMULATION_META
  if (typeof ROUTE_SIMULATION_META !== "undefined") {
    customPlacesStore.forEach(cp => {
      const smart = resolveSmartStationAndRegion(cp.title, cp.lat, cp.lng);
      ROUTE_SIMULATION_META[cp.id] = {
        lat: parseFloat(cp.lat) || smart.lat,
        lng: parseFloat(cp.lng) || smart.lng,
        icon: cp.icon || "📍",
        region: cp.region || smart.region,
        station: (cp.station && cp.station !== "สถานีใกล้เคียง" && cp.station !== "จากการค้นหา") ? cp.station : smart.station,
        stayHours: cp.stayHours || smart.stayHours,
        bestTimeOfDay: "ช่วงเวลาที่สะดวก",
        mapsName: cp.title,
        japanese: cp.japanese || smart.japanese
      };
    });
  }

  // Pagination State (6 cards per page)
  const CARDS_PER_PAGE = 6;
  let currentCardPage = 1;
  const cardsPaginationEl = document.getElementById("cards-pagination");

  // Fallback image URL in case external image fails
  const FALLBACK_IMG = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80";

  // DOM Elements
  const cardsGrid = document.getElementById("cards-grid");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const regionPills = document.getElementById("region-pills");
  const seasonPills = document.getElementById("season-pills");
  const categoryTabs = document.querySelectorAll(".tab-btn");
  const resultsCountEl = document.getElementById("results-count");
  const transitTipsGrid = document.getElementById("transit-tips-grid");

  // Season Analytics Elements
  const analyticsSeasonTabs = document.getElementById("analytics-season-tabs");
  const seasonAnalyticsContent = document.getElementById("season-analytics-content");

  // Budget Calculator Elements
  const daysSelector = document.getElementById("days-selector");
  const styleSelector = document.getElementById("style-selector");
  const budgetCalculatedResult = document.getElementById("budget-calculated-result");
  const budgetTiersGrid = document.getElementById("budget-tiers-grid");

  // Modal Elements
  const detailModal = document.getElementById("detail-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBodyContent = document.getElementById("modal-body-content");

  // Drawer Elements
  const itineraryDrawer = document.getElementById("itinerary-drawer");
  const navItineraryBtn = document.getElementById("nav-itinerary-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const itineraryItemsList = document.getElementById("itinerary-items-list");
  const itineraryCountBadge = document.getElementById("itinerary-count-badge");
  const drawerItemCount = document.getElementById("drawer-item-count");
  const estimatedBudgetTotal = document.getElementById("estimated-budget-total");
  const clearItineraryBtn = document.getElementById("clear-itinerary-btn");

  // 1. Update Category Tab Counts
  function updateCounts() {
    document.getElementById("count-all").textContent = JAPAN_DATA.length;
    document.getElementById("count-attraction").textContent = JAPAN_DATA.filter(i => i.category === "attraction").length;
    document.getElementById("count-food").textContent = JAPAN_DATA.filter(i => i.category === "food").length;
    document.getElementById("count-transport").textContent = JAPAN_DATA.filter(i => i.category === "transport").length;
  }

  // 2. Filter Cards by Category, Region, Season, and Search Query
  function getFilteredItems() {
    return JAPAN_DATA.filter(item => {
      const matchCategory = currentCategory === "all" || item.category === currentCategory;
      const matchRegion = currentRegion === "all" || item.region === currentRegion;
      const matchSeason = currentSeason === "all" || item.seasons.includes("all_year") || item.seasons.includes(currentSeason);
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.japanese.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.foodTips.toLowerCase().includes(q) ||
        item.transport.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q);

      return matchCategory && matchRegion && matchSeason && matchSearch;
    });
  }

  // 3. Render Cards Grid with Pagination (6 cards per page)
  function renderCards(scrollOnPageChange = false) {
    const filtered = getFilteredItems();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE) || 1;

    // Boundary check for current page
    if (currentCardPage > totalPages) currentCardPage = totalPages;
    if (currentCardPage < 1) currentCardPage = 1;

    const startIndex = (currentCardPage - 1) * CARDS_PER_PAGE;
    const endIndex = Math.min(startIndex + CARDS_PER_PAGE, totalItems);
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (totalItems === 0) {
      resultsCountEl.textContent = `ไม่พบสถานที่ที่ตรงกับเงื่อนไข`;
      cardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">🔍</span>
          <h3>ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</h3>
          <p>ลองปรับตัวกรองช่วงเวลา ภูมิภาค หรือล้างคำค้นหาดูครับ</p>
        </div>
      `;
      if (cardsPaginationEl) cardsPaginationEl.innerHTML = "";
      return;
    }

    resultsCountEl.textContent = `แสดง ${startIndex + 1} - ${endIndex} จากทั้งหมด ${totalItems} รายการ (หน้า ${currentCardPage}/${totalPages})`;

    cardsGrid.innerHTML = paginatedItems.map(item => {
      const instances = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) === item.id || i.id === item.id);
      const inPlanCount = instances.length;
      return `
        <div class="card" data-id="${item.id}">
          <div class="card-image-wrap">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              class="card-image" 
              loading="lazy"
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"
            >
            <span class="card-tag">${item.tag}</span>
            <span class="card-rating">⭐ ${item.rating}</span>
          </div>
          <div class="card-body">
            <div class="card-title-group">
              <h3 class="card-title">${item.title}</h3>
              <span class="card-japanese">${item.japanese}</span>
            </div>
            <p class="card-desc">${item.description}</p>
            <div class="card-meta-list">
              <div><strong>🚅 การเดินทาง:</strong> ${item.transport}</div>
              <div><strong>🍜 ของกินเด็ด:</strong> ${item.foodTips.slice(0, 75)}...</div>
              ${item.nearbyHotels ? `<div><strong>🏨 ที่พักแนะนำ:</strong> ${item.nearbyHotels[0].name.split('(')[0].slice(0, 32)} (${item.nearbyHotels[0].distance})</div>` : ''}
            </div>
            <div class="card-actions">
              <button class="btn primary view-detail-btn" data-id="${item.id}" style="display: flex; align-items: center; justify-content: center; gap: 0.35rem; font-weight: 700;">
                🏨 ดูโรงแรม & รายละเอียด
              </button>
              ${inPlanCount > 0 ? `
                <div style="display: flex; gap: 4px; flex-shrink: 0;">
                  <button class="btn outline toggle-plan-btn" data-id="${item.id}" style="background: #e0f2fe; color: #0284c7; border-color: #0284c7; font-weight: 800; padding: 0.4rem 0.65rem;" title="อยู่ในแผน ${inPlanCount} ครั้ง (คลิกเพื่อลบออก)">
                    ✓ ในแผน (${inPlanCount})
                  </button>
                  <button class="btn outline add-repeat-card-btn" data-id="${item.id}" title="เพิ่มสถานที่นี้ซ้ำอีกครั้ง (เช่น ไปวันที่ 2 หรือรอบค่ำ)" style="background: #f0fdf4; color: #16a34a; border-color: #86efac; font-weight: 800; padding: 0.4rem 0.6rem; cursor: pointer;">
                    ➕ ซ้ำ
                  </button>
                </div>
              ` : `
                <button class="btn outline toggle-plan-btn" data-id="${item.id}">
                  + แผนเที่ยว
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Bind click events
    document.querySelectorAll(".view-detail-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        openDetailModal(id);
      });
    });

    document.querySelectorAll(".card-image-wrap").forEach(imgWrap => {
      imgWrap.style.cursor = "pointer";
      imgWrap.addEventListener("click", (e) => {
        const card = e.currentTarget.closest(".card");
        const id = card?.getAttribute("data-id");
        if (id) openDetailModal(id);
      });
    });

    document.querySelectorAll(".toggle-plan-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        toggleItineraryItem(id);
      });
    });

    document.querySelectorAll(".add-repeat-card-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        addItineraryDuplicate(id);
      });
    });

    // Render Pagination Controls
    renderCardsPagination(totalItems, totalPages);

    if (scrollOnPageChange) {
      const exploreSection = document.getElementById("explore");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function renderCardsPagination(totalItems, totalPages) {
    if (!cardsPaginationEl) return;
    if (totalPages <= 1) {
      cardsPaginationEl.innerHTML = "";
      return;
    }

    let buttonsHtml = `
      <div class="pagination-controls">
        <button class="page-btn page-nav-btn" id="page-prev-btn" ${currentCardPage === 1 ? 'disabled' : ''}>
          ‹ ก่อนหน้า
        </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      // Show first, last, and window around current page
      if (p === 1 || p === totalPages || (p >= currentCardPage - 1 && p <= currentCardPage + 1)) {
        buttonsHtml += `
          <button class="page-btn ${p === currentCardPage ? 'active' : ''}" data-page="${p}">
            ${p}
          </button>
        `;
      } else if (p === currentCardPage - 2 || p === currentCardPage + 2) {
        buttonsHtml += `<span style="padding: 0 4px; color: var(--text-muted); font-weight: bold;">...</span>`;
      }
    }

    buttonsHtml += `
        <button class="page-btn page-nav-btn" id="page-next-btn" ${currentCardPage === totalPages ? 'disabled' : ''}>
          ถัดไป ›
        </button>
      </div>
      <div class="pagination-info-text">
        แสดงที่เที่ยว <strong>${(currentCardPage - 1) * CARDS_PER_PAGE + 1} - ${Math.min(currentCardPage * CARDS_PER_PAGE, totalItems)}</strong> จากทั้งหมด <strong>${totalItems}</strong> แห่ง (หน้า ${currentCardPage} จาก ${totalPages} หน้า)
      </div>
    `;

    cardsPaginationEl.innerHTML = buttonsHtml;

    // Attach listeners
    cardsPaginationEl.querySelectorAll(".page-btn[data-page]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const page = parseInt(e.currentTarget.getAttribute("data-page"), 10);
        if (page !== currentCardPage) {
          currentCardPage = page;
          renderCards(true);
        }
      });
    });

    const prevBtn = document.getElementById("page-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentCardPage > 1) {
          currentCardPage--;
          renderCards(true);
        }
      });
    }

    const nextBtn = document.getElementById("page-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentCardPage < totalPages) {
          currentCardPage++;
          renderCards(true);
        }
      });
    }
  }

  // ================= 3.5. Dedicated Nearby Hotel Guide Section =================
  let selectedHotelRegion = "osaka";
  let selectedHotelAttractionId = "osaka-usj";
  const hotelRegionPills = document.getElementById("hotel-region-pills");
  const hotelLandmarkPills = document.getElementById("hotel-landmark-pills");
  const hotelDirectSelect = document.getElementById("hotel-direct-select");
  const hotelAttractionDisplay = document.getElementById("hotel-attraction-display");

  const HOTEL_REGIONS_CONFIG = [
    { id: "osaka", name: "โอซาก้า (Osaka)", icon: "🏯" },
    { id: "tokyo", name: "โตเกียว (Tokyo)", icon: "🗼" },
    { id: "kyoto", name: "เกียวโต (Kyoto)", icon: "⛩️" },
    { id: "chubu", name: "ฟูจิ & ชูบุ (Fuji/Chubu)", icon: "🗻" },
    { id: "hokkaido", name: "ฮอกไกโด (Hokkaido)", icon: "❄️" },
    { id: "fukuoka", name: "ฟุกุโอกะ / ฮิโรชิม่า", icon: "🍜" },
    { id: "all", name: "ทั้งหมด", icon: "🌟" }
  ];

  function getShortLandmarkTitle(item) {
    const titles = {
      "osaka-usj": "🎢 ยูนิเวอร์แซล USJ",
      "osaka-castle": "🏯 ปราสาทโอซาก้า",
      "osaka-dotonbori": "🦀 ย่านโดทงโบริ",
      "osaka-kuromon-market": "🐟 ตลาดคุโรมง",
      "osaka-umeda-sky": "🏙️ ตึกอุเมดะ สกาย",
      "kansai-nara-park": "🦌 สวนกวางนารา",
      "tokyo-sensoji": "🏮 วัดเซนโซจิ อาสะกุสะ",
      "tokyo-shibuya-sky": "🗼 ชิบูย่า สกาย",
      "tokyo-tsukiji-food": "🐟 ตลาดปลาซึคิจิ",
      "tokyo-shinjuku-gyoen": "🌸 สวนชินจูกุเงียวเอ็น",
      "tokyo-teamlab-planets": "✨ teamLab Planets",
      "tokyo-harajuku-meiji": "⛩️ ฮาราจูกุ & ศาลเจ้าเมจิ",
      "kanto-kamakura-daibutsu": "🗿 พระใหญ่คามาคุระ",
      "kanto-hakone-lake-ashi": "♨️ ฮาโกเนะ & ทะเลสาบอาชิ",
      "kyoto-fushimi-inari": "⛩️ ศาลเจ้าฟูชิมิอินาริ",
      "kyoto-arashiyama": "🎋 ป่าไผ่อาราชิยามะ",
      "kyoto-nishiki-market": "🍵 ตลาดนิชิกิ",
      "kyoto-kinkakuji": "✨ วัดทองคินคะคุจิ",
      "kyoto-kiyomizudera": "🌊 วัดน้ำใสคิโยมิซุเดระ",
      "fuji-kawaguchiko": "🗻 ทะเลสาบคาวากุจิโกะ",
      "chubu-shirakawago": "🏡 หมู่บ้านชิราคาวาโกะ",
      "chubu-takayama-oldtown": "🪵 เมืองเก่าทาคายามะ",
      "hokkaido-otaru-canal": "❄️ คลองโอตารุ",
      "hokkaido-ramen-alley": "🍜 ตรอกราเมงซัปโปโร",
      "hokkaido-hakodate-night": "🌃 วิวกลางคืนฮาโกดาเตะ",
      "fukuoka-yatai-nakasu": "🍢 สตรีทฟู้ดยะไต นาคาสุ",
      "fukuoka-dazaifu": "🌸 ศาลเจ้าดาไซฟุ",
      "hiroshima-miyajima": "⛩️ ศาลเจ้าลอยน้ำมิยาจิมะ"
    };
    return titles[item.id] || `📍 ${item.title.split('(')[0].split('&')[0].trim()}`;
  }

  let customHotelSearchQuery = "";
  let selectedHotelSeason = "all";
  let selectedCheckinDate = "";
  let selectedStayNights = 2;
  let selectedGuestCount = 2;

  const hotelCustomSearchInput = document.getElementById("hotel-custom-search-input");
  const hotelClearSearchBtn = document.getElementById("hotel-clear-search-btn");
  const hotelSearchSubmitBtn = document.getElementById("hotel-search-submit-btn");
  const hotelSeasonShortcuts = document.getElementById("hotel-season-shortcuts");
  const hotelCheckinDateInput = document.getElementById("hotel-checkin-date");
  const hotelStayNightsSelect = document.getElementById("hotel-stay-nights");
  const hotelGuestCountSelect = document.getElementById("hotel-guest-count");
  const hotelDateSyncBtn = document.getElementById("hotel-date-sync-btn");
  const dateLiveMatchBadge = document.getElementById("date-live-match-badge");
  const dateInsightHint = document.getElementById("date-insight-hint");

  function syncDateToSeasonShortcuts(checkinDateStr) {
    if (!checkinDateStr) return;
    const parts = checkinDateStr.split('-');
    if (parts.length < 3) return;
    const month = parseInt(parts[1], 10);

    let detectedShortcut = "all";
    if (month >= 3 && month <= 5) {
      detectedShortcut = "spring";
    } else if (month >= 6 && month <= 8) {
      detectedShortcut = "summer";
    } else if (month >= 9 && month <= 11) {
      detectedShortcut = "autumn";
    } else if (month === 12 || month <= 2) {
      detectedShortcut = "winter";
    }

    if (hotelSeasonShortcuts) {
      hotelSeasonShortcuts.querySelectorAll(".season-shortcut-btn").forEach(btn => {
        const target = btn.getAttribute("data-target-season");
        btn.classList.toggle("active", target === detectedShortcut);
      });
    }
  }

  function setDateFromShortcut(targetSeason, targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();

    let resolvedDate = "";
    if (targetDate === "today" || !targetDate) {
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      resolvedDate = `${yyyy}-${mm}-${dd}`;
    } else {
      let m = 3, d = 1;
      if (targetSeason === "spring") { m = 3; d = 1; }
      else if (targetSeason === "summer") { m = 6; d = 1; }
      else if (targetSeason === "autumn") { m = 9; d = 1; }
      else if (targetSeason === "winter") { m = 12; d = 1; }
      else {
        const parts = targetDate.split('-');
        m = parseInt(parts[1], 10);
        d = parseInt(parts[2], 10);
      }
      
      let yr = currentYear;
      const targetThisYear = new Date(currentYear, m - 1, d);
      if (targetThisYear < today) {
        yr = currentYear + 1;
      }
      resolvedDate = `${yr}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }

    selectedCheckinDate = resolvedDate;
    if (hotelCheckinDateInput) {
      hotelCheckinDateInput.value = selectedCheckinDate;
    }

    syncDateToSeasonShortcuts(selectedCheckinDate);
    renderHotelGuide();
  }

  function initHotelDatePicker() {
    if (hotelCheckinDateInput && !hotelCheckinDateInput.value) {
      const today = new Date();
      today.setDate(today.getDate() + 14); // 2 weeks ahead
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      selectedCheckinDate = `${yyyy}-${mm}-${dd}`;
      hotelCheckinDateInput.value = selectedCheckinDate;
      hotelCheckinDateInput.min = new Date().toISOString().split('T')[0];
    } else if (hotelCheckinDateInput) {
      selectedCheckinDate = hotelCheckinDateInput.value;
    }
    if (hotelStayNightsSelect) {
      selectedStayNights = parseInt(hotelStayNightsSelect.value, 10) || 2;
    }
    if (hotelGuestCountSelect) {
      selectedGuestCount = parseInt(hotelGuestCountSelect.value, 10) || 2;
    }
    syncDateToSeasonShortcuts(selectedCheckinDate);
  }
  initHotelDatePicker();

  function calculateDateAwareHotelPricing(hotel, checkinDateStr, nights = 2, guests = 2) {
    if (!checkinDateStr) {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      checkinDateStr = d.toISOString().split('T')[0];
    }

    const parts = checkinDateStr.split('-');
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const dayOfWeek = dateObj.getDay();

    let seasonMult = 1.0;
    let seasonName = "☀️ ฤดูร้อน (โลว์ซีซั่นโปรโมชัน)";
    let badgeText = "☀️ โลว์โปรโมชัน";
    let badgeColor = "#059669";
    let badgeBg = "#ecfdf5";

    if (month >= 3 && month <= 5) {
      seasonMult = 1.45;
      seasonName = "🌸 ฤดูใบไม้ผลิ (ช่วงซากุระพีค)";
      badgeText = "🌸 ซากุระพีค (+45%)";
      badgeColor = "#db2777";
      badgeBg = "#fdf2f8";
    } else if (month >= 6 && month <= 8) {
      seasonMult = 1.0;
      seasonName = "☀️ ฤดูร้อน (โลว์ซีซั่นโปรโมชัน)";
      badgeText = "☀️ โลว์โปรโมชัน (ราคาต่ำสุด)";
      badgeColor = "#059669";
      badgeBg = "#ecfdf5";
    } else if (month >= 9 && month <= 11) {
      seasonMult = 1.28;
      seasonName = "🍁 ฤดูใบไม้เปลี่ยนสี (ช่วงพีค)";
      badgeText = "🍁 ใบไม้เปลี่ยนสี (+28%)";
      badgeColor = "#ea580c";
      badgeBg = "#fff7ed";
    } else {
      seasonMult = 1.15;
      seasonName = "❄️ ฤดูหนาว / หิมะ";
      badgeText = "❄️ ฤดูหนาว (+15%)";
      badgeColor = "#2563eb";
      badgeBg = "#eff6ff";
    }

    let dayMult = 1.0;
    let dayLabel = "วันธรรมดา (Weekday Promo)";
    if (dayOfWeek === 5 || dayOfWeek === 0) {
      dayMult = 1.08;
      dayLabel = "คืนวันศุกร์/อาทิตย์ (+8%)";
    } else if (dayOfWeek === 6) {
      dayMult = 1.22;
      dayLabel = "คืนวันเสาร์ Weekend Peak (+22%)";
    }

    let isHoliday = false;
    let holidayLabel = "";

    // 1. Christmas & Year-End Peak (23 ธ.ค. - 5 ม.ค.)
    if ((month === 12 && day >= 23) || (month === 1 && day <= 5)) {
      isHoliday = true;
      if (month === 12 && (day === 24 || day === 25)) {
        holidayLabel = "🎄 เทศกาลคริสต์มาส Christmas Peak (+45%)";
        badgeText = "🎄 คริสต์มาสพีค (+45%)";
      } else if ((month === 12 && day >= 29) || (month === 1 && day <= 3)) {
        holidayLabel = "🎌 ช่วงปีใหม่ New Year Peak (+50%)";
        badgeText = "🎌 ปีใหม่พีค (+50%)";
      } else {
        holidayLabel = "❄️ สัปดาห์ส่งท้ายปีเก่า & คริสต์มาส (+40%)";
        badgeText = "❄️ วันหยุดปลายปี (+40%)";
      }
      seasonMult = 1.45;
      badgeColor = "#dc2626";
      badgeBg = "#fef2f2";
    }
    // 2. Sapporo Snow Festival & Valentine (4 - 15 ก.พ.)
    else if (month === 2 && day >= 4 && day <= 15) {
      isHoliday = true;
      if (day === 14) {
        holidayLabel = "💖 วันวาเลนไทน์ Valentine's Day (+25%)";
        badgeText = "💖 วาเลนไทน์ (+25%)";
      } else {
        holidayLabel = "❄️ เทศกาลหิมะซัปโปโร & เทศกาลฤดูหนาว (+35%)";
        badgeText = "❄️ เทศกาลหิมะ (+35%)";
      }
      seasonMult = 1.35;
      badgeColor = "#2563eb";
      badgeBg = "#eff6ff";
    }
    // 3. Sakura Peak & Songkran (20 มี.ค. - 18 เม.ย.)
    else if ((month === 3 && day >= 20) || (month === 4 && day <= 18)) {
      isHoliday = true;
      if (month === 4 && day >= 11 && day <= 16) {
        holidayLabel = "💦 ช่วงสงกรานต์ & ซากุระพีค (+48%)";
        badgeText = "💦 สงกรานต์พีค (+48%)";
      } else {
        holidayLabel = "🌸 ช่วงซากุระบานสะพรั่ง Peak (+45%)";
        badgeText = "🌸 ซากุระพีค (+45%)";
      }
      seasonMult = 1.45;
      badgeColor = "#db2777";
      badgeBg = "#fdf2f8";
    }
    // 4. Golden Week (28 เม.ย. - 6 พ.ค.)
    else if ((month === 4 && day >= 28) || (month === 5 && day <= 6)) {
      isHoliday = true;
      holidayLabel = "🎌 Golden Week วันหยุดยาวญี่ปุ่น (+45%)";
      badgeText = "🎌 Golden Week (+45%)";
      seasonMult = 1.45;
      badgeColor = "#dc2626";
      badgeBg = "#fef2f2";
    }
    // 5. Obon Festival (8 - 18 ส.ค.)
    else if (month === 8 && day >= 8 && day <= 18) {
      isHoliday = true;
      holidayLabel = "🎌 เทศกาลโอบ้ง Obon Holiday (+35%)";
      badgeText = "🎌 เทศกาลโอบ้ง (+35%)";
      seasonMult = 1.35;
      badgeColor = "#ea580c";
      badgeBg = "#fff7ed";
    }
    // 6. Silver Week & Halloween (18-26 ก.ย., 28-31 ต.ค.)
    else if (month === 9 && day >= 18 && day <= 26) {
      isHoliday = true;
      holidayLabel = "🎌 Silver Week วันหยุดยาวญี่ปุ่น (+30%)";
      badgeText = "🎌 Silver Week (+30%)";
      seasonMult = 1.30;
      badgeColor = "#ea580c";
      badgeBg = "#fff7ed";
    } else if (month === 10 && day >= 28 && day <= 31) {
      isHoliday = true;
      holidayLabel = "🎃 เทศกาลฮาโลวีน Shibuya & USJ (+30%)";
      badgeText = "🎃 ฮาโลวีน (+30%)";
      seasonMult = 1.30;
      badgeColor = "#ea580c";
      badgeBg = "#fff7ed";
    } else if (month === 11 && day >= 10 && day <= 25) {
      isHoliday = true;
      holidayLabel = "🍁 ช่วงใบไม้แดงพีคสุดขีด Koyo Peak (+35%)";
      badgeText = "🍁 ใบไม้แดงพีค (+35%)";
      seasonMult = 1.35;
      badgeColor = "#ea580c";
      badgeBg = "#fff7ed";
    }

    if (isHoliday) {
      dayLabel = holidayLabel;
    }

    const combinedMultiplier = seasonMult * dayMult;
    const baseJPY = hotel.priceJPY || 8500;
    const nightlyJPY = Math.round(baseJPY * combinedMultiplier);
    const nightlyTHB = Math.round(nightlyJPY * currentExchangeRate);
    const totalJPY = nightlyJPY * nights;
    const totalTHB = nightlyTHB * nights;

    const checkoutDateObj = new Date(dateObj);
    checkoutDateObj.setDate(checkoutDateObj.getDate() + nights);
    const cY = checkoutDateObj.getFullYear();
    const cM = String(checkoutDateObj.getMonth() + 1).padStart(2, '0');
    const cD = String(checkoutDateObj.getDate()).padStart(2, '0');
    const checkoutDateStr = `${cY}-${cM}-${cD}`;

    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const formattedCheckin = `${day} ${thaiMonths[month - 1]} ${dateObj.getFullYear()}`;

    const googleHotelsUrl = `https://www.google.com/travel/hotels?q=${encodeURIComponent((hotel.name || 'hotel') + ' hotel ' + (hotel.japanese || '') + ' japan')}&checkin=${checkinDateStr}&checkout=${checkoutDateStr}&adults=${guests}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.searchQuery || hotel.name || 'hotel japan')}`;
    const agodaUrl = `https://www.agoda.com/search?text=${encodeURIComponent((hotel.name || 'hotel') + ' japan')}&checkIn=${checkinDateStr}&checkOut=${checkoutDateStr}&rooms=1&adults=${guests}`;

    return {
      checkinDateStr,
      checkoutDateStr,
      nights,
      guests,
      month,
      day,
      dayOfWeek,
      seasonMult,
      dayMult,
      combinedMultiplier,
      seasonName,
      badgeText,
      badgeColor,
      badgeBg,
      dayLabel,
      isHoliday,
      holidayLabel,
      nightlyJPY,
      nightlyTHB,
      totalJPY,
      totalTHB,
      formattedCheckin,
      googleHotelsUrl,
      googleMapsUrl,
      agodaUrl
    };
  }

  function generateAgodaAreaSearchUrl(areaName, region, checkinDateStr, nights = 2, guests = 2) {
    if (!checkinDateStr) {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      checkinDateStr = d.toISOString().split('T')[0];
    }
    const parts = checkinDateStr.split('-');
    const inD = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const outD = new Date(inD);
    outD.setDate(outD.getDate() + (nights || 2));

    const inY = inD.getFullYear();
    const inM = String(inD.getMonth() + 1).padStart(2, '0');
    const inDay = String(inD.getDate()).padStart(2, '0');
    const outY = outD.getFullYear();
    const outM = String(outD.getMonth() + 1).padStart(2, '0');
    const outDay = String(outD.getDate()).padStart(2, '0');

    let destination = areaName || "Osaka";
    if (region === "osaka") destination = "Osaka Namba";
    else if (region === "tokyo") destination = "Tokyo Shinjuku";
    else if (region === "kyoto") destination = "Kyoto Station";
    else if (region === "hokkaido") destination = "Sapporo";
    else if (region === "chubu") destination = "Takayama";

    return `https://www.agoda.com/search?text=${encodeURIComponent(destination)}&checkIn=${inY}-${inM}-${inDay}&checkOut=${outY}-${outM}-${outDay}&rooms=1&adults=${guests || 2}&sort=priceLowToHigh`;
  }

  function getSeasonalHotelMultiplier(season) {
    switch (season) {
      case "spring":
        return {
          multiplier: 1.45,
          seasonLabel: "🌸 ฤดูใบไม้ผลิ (ช่วงซากุระพีค)",
          badge: "🌸 ซากุระพีค (+45%)",
          badgeBg: "#fdf2f8",
          badgeColor: "#db2777"
        };
      case "autumn":
        return {
          multiplier: 1.28,
          seasonLabel: "🍁 ฤดูใบไม้เปลี่ยนสี (ช่วงพีค)",
          badge: "🍁 ใบไม้เปลี่ยนสี (+28%)",
          badgeBg: "#fff7ed",
          badgeColor: "#ea580c"
        };
      case "winter":
        return {
          multiplier: 1.15,
          seasonLabel: "❄️ ฤดูหนาว / หิมะ (ช่วงเทศกาล)",
          badge: "❄️ ฤดูหนาว (+15%)",
          badgeBg: "#eff6ff",
          badgeColor: "#2563eb"
        };
      case "summer":
        return {
          multiplier: 1.0,
          seasonLabel: "☀️ ฤดูร้อน (โลว์ซีซั่นโปรโมชัน)",
          badge: "☀️ โลว์ซีซั่นโปร (ราคาต่ำสุด)",
          badgeBg: "#ecfdf5",
          badgeColor: "#059669"
        };
      case "all":
      default:
        return {
          multiplier: 1.0,
          seasonLabel: "🍂 ทุกช่วงเวลา (ราคาเริ่มต้นโปรโมชัน)",
          badge: "",
          badgeBg: "#f8fafc",
          badgeColor: "#475569"
        };
    }
  }

  function renderHotelGuide() {
    if (!hotelAttractionDisplay) return;

    // Filter destination landmarks with hotels (exclude pure transit guides)
    const attractionsWithHotels = JAPAN_DATA.filter(item => 
      item.nearbyHotels && item.nearbyHotels.length > 0 && item.category !== "transport"
    );

    // Update Date Bar Insights & Badge
    const samplePricing = calculateDateAwareHotelPricing({ priceJPY: 6550 }, selectedCheckinDate, selectedStayNights, selectedGuestCount);
    if (dateLiveMatchBadge) {
      if (samplePricing.isHoliday) {
        dateLiveMatchBadge.textContent = `🔥 ${samplePricing.holidayLabel}`;
        dateLiveMatchBadge.style.backgroundColor = samplePricing.badgeColor;
        dateLiveMatchBadge.style.color = "white";
        dateLiveMatchBadge.style.borderColor = samplePricing.badgeColor;
      } else {
        dateLiveMatchBadge.textContent = `⚡ เรตสด ${samplePricing.formattedCheckin} (${samplePricing.dayLabel})`;
        dateLiveMatchBadge.style.backgroundColor = samplePricing.badgeBg;
        dateLiveMatchBadge.style.color = samplePricing.badgeColor;
        dateLiveMatchBadge.style.borderColor = samplePricing.badgeColor;
      }
    }
    if (dateInsightHint) {
      if (samplePricing.isHoliday) {
        dateInsightHint.innerHTML = `
          💡 <strong>คำแนะนำราคา:</strong> วันที่เลือกคือ <strong>${samplePricing.formattedCheckin}</strong> ตรงกับ <strong style="color: #dc2626;">${samplePricing.holidayLabel}</strong> — 
          เป็นช่วงเทศกาลเฉลิมฉลองยอดนิยมที่มีความต้องการห้องพักสูงมาก ราคาโรงแรมบน Google Hotels / Agoda จะขยับขึ้นสู่ช่วงพีคตามอัตราดีมานด์จริงครับ
        `;
      } else {
        dateInsightHint.innerHTML = `
          💡 <strong>คำแนะนำราคา:</strong> วันที่เลือกคือ <strong>${samplePricing.formattedCheckin}</strong> เป็น <em>${samplePricing.dayLabel}</em> ในช่วง <em>${samplePricing.seasonName}</em> — 
          ราคาห้องพักตรงตามช่วงโปรโมชันบน Google Hotels และ Trip.com
        `;
      }
    }

    // 1. Render City/Region Pills
    if (hotelRegionPills) {
      hotelRegionPills.innerHTML = HOTEL_REGIONS_CONFIG.map(reg => {
        const count = reg.id === "all" ? attractionsWithHotels.length : attractionsWithHotels.filter(i => {
          if (reg.id === "fukuoka") return i.region === "fukuoka" || i.region === "hiroshima";
          return i.region === reg.id;
        }).length;
        return `
          <button class="hotel-region-pill ${reg.id === selectedHotelRegion ? 'active' : ''}" data-region-id="${reg.id}">
            <span>${reg.icon}</span> ${reg.name} <small style="opacity: 0.85; font-size: 0.72rem;">(${count})</small>
          </button>
        `;
      }).join("");

      hotelRegionPills.querySelectorAll(".hotel-region-pill").forEach(btn => {
        btn.addEventListener("click", (e) => {
          customHotelSearchQuery = "";
          if (hotelCustomSearchInput) hotelCustomSearchInput.value = "";
          if (hotelClearSearchBtn) hotelClearSearchBtn.style.display = "none";
          selectedHotelRegion = e.currentTarget.getAttribute("data-region-id");
          const regionItems = attractionsWithHotels.filter(i => {
            if (selectedHotelRegion === "all") return true;
            if (selectedHotelRegion === "fukuoka") return i.region === "fukuoka" || i.region === "hiroshima";
            return i.region === selectedHotelRegion;
          });
          if (regionItems.length > 0 && !regionItems.some(i => i.id === selectedHotelAttractionId)) {
            selectedHotelAttractionId = regionItems[0].id;
          }
          renderHotelGuide();
        });
      });
    }

    // 2. Filter landmarks for selected region
    const currentRegionItems = attractionsWithHotels.filter(i => {
      if (selectedHotelRegion === "all") return true;
      if (selectedHotelRegion === "fukuoka") return i.region === "fukuoka" || i.region === "hiroshima";
      return i.region === selectedHotelRegion;
    });

    // 3. Render Landmark Chips
    if (hotelLandmarkPills) {
      hotelLandmarkPills.innerHTML = currentRegionItems.map(item => `
        <button class="hotel-landmark-pill ${item.id === selectedHotelAttractionId ? 'active' : ''}" data-id="${item.id}">
          ${getShortLandmarkTitle(item)}
        </button>
      `).join("");

      hotelLandmarkPills.querySelectorAll(".hotel-landmark-pill").forEach(btn => {
        btn.addEventListener("click", (e) => {
          customHotelSearchQuery = "";
          if (hotelCustomSearchInput) hotelCustomSearchInput.value = "";
          if (hotelClearSearchBtn) hotelClearSearchBtn.style.display = "none";
          selectedHotelAttractionId = e.currentTarget.getAttribute("data-id");
          renderHotelGuide();
        });
      });
    }

    // 4. Render Direct Select Dropdown
    if (hotelDirectSelect) {
      let optHtml = `<option value="" disabled>-- เลือกดูสถานที่เที่ยวในญี่ปุ่น --</option>`;
      HOTEL_REGIONS_CONFIG.filter(r => r.id !== "all").forEach(reg => {
        const groupItems = attractionsWithHotels.filter(i => {
          if (reg.id === "fukuoka") return i.region === "fukuoka" || i.region === "hiroshima";
          return i.region === reg.id;
        });
        if (groupItems.length > 0) {
          optHtml += `<optgroup label="${reg.icon} ${reg.name}">`;
          groupItems.forEach(item => {
            optHtml += `<option value="${item.id}" ${item.id === selectedHotelAttractionId ? 'selected' : ''}>${item.title.split('(')[0].trim()}</option>`;
          });
          optHtml += `</optgroup>`;
        }
      });
      hotelDirectSelect.innerHTML = optHtml;

      hotelDirectSelect.onchange = (e) => {
        customHotelSearchQuery = "";
        if (hotelCustomSearchInput) hotelCustomSearchInput.value = "";
        if (hotelClearSearchBtn) hotelClearSearchBtn.style.display = "none";
        const targetId = e.target.value;
        const targetItem = JAPAN_DATA.find(i => i.id === targetId);
        if (targetItem) {
          selectedHotelAttractionId = targetId;
          selectedHotelRegion = (targetItem.region === "hiroshima") ? "fukuoka" : targetItem.region;
          renderHotelGuide();
        }
      };
    }

    // 4.5. Update Hotel Season Shortcuts State (Two-Way Sync)
    syncDateToSeasonShortcuts(selectedCheckinDate);

    // 5. If Custom Hotel Search Query is Active
    if (customHotelSearchQuery.trim() !== "") {
      const q = customHotelSearchQuery.trim().toLowerCase();
      
      let matchedHotels = [];
      attractionsWithHotels.forEach(att => {
        att.nearbyHotels.forEach(h => {
          const matchName = h.name.toLowerCase().includes(q);
          const matchJp = h.japanese ? h.japanese.toLowerCase().includes(q) : false;
          const matchQuery = h.searchQuery ? h.searchQuery.toLowerCase().includes(q) : false;
          const matchHighlight = h.highlight ? h.highlight.toLowerCase().includes(q) : false;
          const matchType = h.type ? h.type.toLowerCase().includes(q) : false;
          const matchAtt = att.title.toLowerCase().includes(q);

          if (matchName || matchJp || matchQuery || matchHighlight || matchType || matchAtt) {
            if (!matchedHotels.some(existing => existing.name === h.name)) {
              matchedHotels.push({ ...h, parentLandmark: att.title });
            }
          }
        });
      });

      let customHotelCardHtml = "";
      if (matchedHotels.length === 0) {
        const customObj = { name: customHotelSearchQuery, priceJPY: 8500, searchQuery: customHotelSearchQuery + ' hotel japan' };
        const pricing = calculateDateAwareHotelPricing(customObj, selectedCheckinDate, selectedStayNights, selectedGuestCount);
        
        customHotelCardHtml = `
          <div class="hotel-showcase-card" style="border: 2px dashed #059669; background: #f0fdf4;">
            <div class="hotel-card-badge-row">
              <span class="hotel-rank-badge" style="background: #059669; color: white;">🔍 โรงแรมค้นหาอิสระ</span>
              <span class="hotel-rating-badge">⭐ 4.5+ (ประเมิน)</span>
            </div>
            <h4 class="hotel-showcase-name">${customHotelSearchQuery}</h4>
            <div class="hotel-showcase-jp">日本ホテル検索 (Live Date Search)</div>
            
            <div class="hotel-tags-row">
              <span class="hotel-tag type">โรงแรม / ที่พักในญี่ปุ่น</span>
              <span class="hotel-tag distance">🚶 ใจกลางเมือง / ใกล้สถานี</span>
            </div>

            <p class="hotel-showcase-highlight">ค้นหาข้อมูลห้องพัก พิกัดแผนที่จริง และเช็กราคาเรียลไทม์จาก Google Hotels & Agoda สำหรับวันที่ ${pricing.formattedCheckin}</p>

            <div class="hotel-showcase-pricing">
              <div class="hotel-price-box">
                <span class="hotel-price-range">คืนละ ¥${pricing.nightlyJPY.toLocaleString()} เยน (~${pricing.nightlyTHB.toLocaleString()} บ.)</span>
                <strong class="hotel-price-thb">เริ่มต้น ~${pricing.nightlyTHB.toLocaleString()} บาท/คืน</strong>
                <small style="font-size: 0.74rem; color: #047857; font-weight: 700; margin-top: 2px;">
                  🌙 รวม ${pricing.nights} คืน: ~${pricing.totalTHB.toLocaleString()} บาท (${pricing.guests} ท่าน)
                </small>
              </div>
              <div class="hotel-actions-col">
                <a href="${pricing.googleHotelsUrl}" target="_blank" rel="noopener noreferrer" class="hotel-google-btn">
                  🗺️ เช็กราคาสดบน Google Hotels (${pricing.formattedCheckin})
                </a>
                <a href="${pricing.agodaUrl}" target="_blank" rel="noopener noreferrer" class="hotel-agoda-btn">
                  🏨 ดูห้องว่างบน Agoda (${pricing.nights} คืน)
                </a>
              </div>
            </div>
          </div>
        `;
      }

      hotelAttractionDisplay.innerHTML = `
        <div class="hotel-search-results-banner">
          <div>
            <strong>🔍 ผลการค้นหาโรงแรม:</strong> พบ ${matchedHotels.length > 0 ? matchedHotels.length : 1} รายการ สำหรับ <em>"${customHotelSearchQuery}"</em>
            <span style="margin-left: 0.5rem; color: #059669; font-weight: 700;">(เช็คอิน: ${samplePricing.formattedCheckin} • ${selectedStayNights} คืน)</span>
          </div>
          <button type="button" class="hotel-reset-search-btn" id="hotel-reset-search-btn">
            🔄 ล้างการค้นหา & กลับไปดูตามย่าน
          </button>
        </div>

        <div class="hotel-showcase-grid">
          ${customHotelCardHtml}
          ${matchedHotels.map((h, idx) => {
            const pricing = calculateDateAwareHotelPricing(h, selectedCheckinDate, selectedStayNights, selectedGuestCount);

            let badgeHtml = "";
            if (h.promoBadge) {
              badgeHtml = `<span class="hotel-rank-badge" style="background: #dc2626; color: white;">${h.promoBadge}</span>`;
            } else if (pricing.isHoliday) {
              badgeHtml = `<span class="hotel-rank-badge" style="background: #fff7ed; color: #ea580c; border: 1px solid #ea580c; font-weight: 800;">${pricing.holidayLabel}</span>`;
            } else {
              badgeHtml = `<span class="hotel-rank-badge" style="background: ${pricing.badgeBg}; color: ${pricing.badgeColor}; border: 1px solid ${pricing.badgeColor}; font-weight: 800;">${pricing.badgeText}</span>`;
            }

            return `
              <div class="hotel-showcase-card">
                <div class="hotel-card-badge-row">
                  ${badgeHtml}
                  <span class="hotel-rating-badge">⭐ ${h.rating} / 5.0</span>
                </div>
                <h4 class="hotel-showcase-name">${h.name}</h4>
                <div class="hotel-showcase-jp">${h.japanese} (ย่าน: ${h.parentLandmark ? h.parentLandmark.split('(')[0].trim() : 'ญี่ปุ่น'})</div>
                
                <div class="hotel-tags-row">
                  <span class="hotel-tag type">${h.type}</span>
                  <span class="hotel-tag distance">🚶 ${h.distance}</span>
                </div>

                <p class="hotel-showcase-highlight">${h.highlight}</p>

                <div class="hotel-showcase-pricing">
                  <div class="hotel-price-box">
                    <span class="hotel-price-range">คืนละ ¥${pricing.nightlyJPY.toLocaleString()} เยน (~${pricing.nightlyTHB.toLocaleString()} บ.)</span>
                    <strong class="hotel-price-thb">เริ่มต้น ~${pricing.nightlyTHB.toLocaleString()} บาท/คืน</strong>
                    <small style="font-size: 0.74rem; color: #047857; font-weight: 700; margin-top: 2px;">
                      🌙 รวม ${pricing.nights} คืน: ~${pricing.totalTHB.toLocaleString()} บาท (${pricing.guests} ท่าน)
                    </small>
                  </div>
                  <div class="hotel-actions-col">
                    <a href="${pricing.googleHotelsUrl}" target="_blank" rel="noopener noreferrer" class="hotel-google-btn">
                      🗺️ เช็กราคาสดบน Google Hotels (${pricing.formattedCheckin})
                    </a>
                    <a href="${pricing.agodaUrl}" target="_blank" rel="noopener noreferrer" class="hotel-agoda-btn">
                      🏨 ดูห้องว่างบน Agoda (${pricing.nights} คืน)
                    </a>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;

      hotelAttractionDisplay.querySelector("#hotel-reset-search-btn")?.addEventListener("click", () => {
        customHotelSearchQuery = "";
        if (hotelCustomSearchInput) hotelCustomSearchInput.value = "";
        if (hotelClearSearchBtn) hotelClearSearchBtn.style.display = "none";
        renderHotelGuide();
      });

      return;
    }

    // 6. Render Current Item Hotel Cards (Default Landmark View)
    const currentItem = JAPAN_DATA.find(i => i.id === selectedHotelAttractionId) || attractionsWithHotels[0];
    if (!currentItem) return;

    hotelAttractionDisplay.innerHTML = `
      <div class="hotel-showcase-header">
        <div class="hotel-showcase-title-wrap">
          <div class="hotel-showcase-location-badge">📍 ${currentItem.title} (${currentItem.japanese})</div>
          <h3>🏨 3 โรงแรม & ที่พักแนะนำยอดนิยมประจำย่าน</h3>
          <p>คัดสรรทำเลที่ดีที่สุด ใกล้ ${currentItem.title.split('(')[0].trim()} เดินทางสะดวก พร้อมประเมินราคาตรงกับ Google Maps & Agoda สำหรับวันที่ <strong>${samplePricing.formattedCheckin}</strong></p>
        </div>
        <button class="btn primary view-landmark-detail-btn" data-id="${currentItem.id}">
          📖 ดูข้อมูลที่เที่ยวนี้
        </button>
      </div>

      <div class="hotel-showcase-grid">
        ${currentItem.nearbyHotels.map((h, idx) => {
          const pricing = calculateDateAwareHotelPricing(h, selectedCheckinDate, selectedStayNights, selectedGuestCount);

          let badgeHtml = "";
          if (h.promoBadge) {
            badgeHtml = `<span class="hotel-rank-badge" style="background: #dc2626; color: white;">${h.promoBadge}</span>`;
          } else if (pricing.isHoliday) {
            badgeHtml = `<span class="hotel-rank-badge" style="background: #fff7ed; color: #ea580c; border: 1px solid #ea580c; font-weight: 800;">${pricing.holidayLabel}</span>`;
          } else {
            badgeHtml = `<span class="hotel-rank-badge" style="background: ${pricing.badgeBg}; color: ${pricing.badgeColor}; border: 1px solid ${pricing.badgeColor}; font-weight: 800;">#${idx + 1} ${pricing.badgeText}</span>`;
          }

          return `
            <div class="hotel-showcase-card">
              <div class="hotel-card-badge-row">
                ${badgeHtml}
                <span class="hotel-rating-badge">⭐ ${h.rating} / 5.0</span>
              </div>
              <h4 class="hotel-showcase-name">${h.name}</h4>
              <div class="hotel-showcase-jp">${h.japanese}</div>
              
              <div class="hotel-tags-row">
                <span class="hotel-tag type">${h.type}</span>
                <span class="hotel-tag distance">🚶 ${h.distance}</span>
              </div>

              <p class="hotel-showcase-highlight">${h.highlight}</p>

              <div class="hotel-showcase-pricing">
                <div class="hotel-price-box">
                  <span class="hotel-price-range">คืนละ ¥${pricing.nightlyJPY.toLocaleString()} เยน (~${pricing.nightlyTHB.toLocaleString()} บ.)</span>
                  <strong class="hotel-price-thb">เริ่มต้น ~${pricing.nightlyTHB.toLocaleString()} บาท/คืน</strong>
                  <small style="font-size: 0.74rem; color: #047857; font-weight: 700; margin-top: 2px;">
                    🌙 รวม ${pricing.nights} คืน: ~${pricing.totalTHB.toLocaleString()} บาท (${pricing.guests} ท่าน)
                  </small>
                </div>
                <div class="hotel-actions-col">
                  <a href="${pricing.googleHotelsUrl}" target="_blank" rel="noopener noreferrer" class="hotel-google-btn">
                    🗺️ เช็กราคาสดบน Google Hotels (${pricing.formattedCheckin})
                  </a>
                  <a href="${pricing.agodaUrl}" target="_blank" rel="noopener noreferrer" class="hotel-agoda-btn">
                    🏨 ดูห้องว่างบน Agoda (${pricing.nights} คืน)
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    hotelAttractionDisplay.querySelector(".view-landmark-detail-btn")?.addEventListener("click", (e) => {
      openDetailModal(currentItem.id);
    });
  }

  // Bind Season Shortcuts Click Listeners (Two-Way Sync)
  if (hotelSeasonShortcuts) {
    hotelSeasonShortcuts.querySelectorAll(".season-shortcut-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetSeason = e.currentTarget.getAttribute("data-target-season");
        const targetDate = e.currentTarget.getAttribute("data-target-date");
        setDateFromShortcut(targetSeason, targetDate);
      });
    });
  }

  // Bind Date Picker Event Listeners
  if (hotelCheckinDateInput) {
    hotelCheckinDateInput.addEventListener("change", (e) => {
      selectedCheckinDate = e.target.value;
      syncDateToSeasonShortcuts(selectedCheckinDate);
      renderHotelGuide();
    });
  }
  if (hotelStayNightsSelect) {
    hotelStayNightsSelect.addEventListener("change", (e) => {
      selectedStayNights = parseInt(e.target.value, 10) || 2;
      renderHotelGuide();
    });
  }
  if (hotelGuestCountSelect) {
    hotelGuestCountSelect.addEventListener("change", (e) => {
      selectedGuestCount = parseInt(e.target.value, 10) || 2;
      renderHotelGuide();
    });
  }
  if (hotelDateSyncBtn) {
    hotelDateSyncBtn.addEventListener("click", () => {
      if (hotelCheckinDateInput) selectedCheckinDate = hotelCheckinDateInput.value;
      if (hotelStayNightsSelect) selectedStayNights = parseInt(hotelStayNightsSelect.value, 10) || 2;
      if (hotelGuestCountSelect) selectedGuestCount = parseInt(hotelGuestCountSelect.value, 10) || 2;
      syncDateToSeasonShortcuts(selectedCheckinDate);
      renderHotelGuide();
    });
  }

  // Bind Hotel Search Input Event Listeners
  if (hotelCustomSearchInput) {
    hotelCustomSearchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (hotelClearSearchBtn) {
        hotelClearSearchBtn.style.display = val.length > 0 ? "inline-flex" : "none";
      }
      if (val.trim() === "") {
        customHotelSearchQuery = "";
        renderHotelGuide();
      }
    });

    hotelCustomSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        customHotelSearchQuery = hotelCustomSearchInput.value;
        renderHotelGuide();
      }
    });
  }

  if (hotelSearchSubmitBtn) {
    hotelSearchSubmitBtn.addEventListener("click", () => {
      if (hotelCustomSearchInput) {
        customHotelSearchQuery = hotelCustomSearchInput.value;
        renderHotelGuide();
      }
    });
  }

  if (hotelClearSearchBtn) {
    hotelClearSearchBtn.addEventListener("click", () => {
      if (hotelCustomSearchInput) {
        hotelCustomSearchInput.value = "";
        hotelClearSearchBtn.style.display = "none";
      }
      customHotelSearchQuery = "";
      renderHotelGuide();
    });
  }

  // ================= 3.6. Interactive Route Simulator (Leaflet Real Map & Metro View) =================
  let selectedRoutePresetId = "preset-tokyo-1day";
  let activeSimulationRoute = [];
  let isSimulating = false;
  let currentSimStep = 0;
  let simTimer = null;
  let simSpeed = 1;
  let leafletRouteMap = null;
  let leafletRouteLayerGroup = null;
  let leafletVehicleMarker = null;
  let currentMapViewMode = "map";
  let currentRouteFilterDay = "all";
  let leafletMarkersMap = {};
  let isFullscreenMap = false;
  let userSelectedTransitModes = {};

  const routePresetPills = document.getElementById("route-preset-pills");
  const routeActiveCount = document.getElementById("route-active-count");
  const simPlayBtn = document.getElementById("sim-play-btn");
  const simPauseBtn = document.getElementById("sim-pause-btn");
  const simResetBtn = document.getElementById("sim-reset-btn");
  const journeyStatusBanner = document.getElementById("journey-status-banner");
  const routeSummaryBox = document.getElementById("route-summary-box");
  const routeTimelineList = document.getElementById("route-timeline-list");
  const drawerSimulateBtn = document.getElementById("drawer-simulate-btn");
  const routeLeafletContainer = document.getElementById("route-leaflet-container");
  const routeMetroContainer = document.getElementById("route-metro-container");
  const metroTrackLine = document.getElementById("metro-track-line");
  const mapViewSwitcher = document.getElementById("map-view-switcher");

  const routeDayFilterBar = document.getElementById("route-day-filter-bar");
  const routeDayFilterTabs = document.getElementById("route-day-filter-tabs");
  const routeDayStatsBanner = document.getElementById("route-day-stats-banner");
  const routeDayStatsTitle = document.getElementById("route-day-stats-title");
  const routeDayStatsMetrics = document.getElementById("route-day-stats-metrics");
  const mapFitBoundsBtn = document.getElementById("map-fit-bounds-btn");
  const mapFullscreenToggleBtn = document.getElementById("map-fullscreen-toggle-btn");

  let isMapPinMode = false;
  const mapPinModeBtn = document.getElementById("map-pin-mode-btn");
  const mapPinHintBanner = document.getElementById("map-pin-hint-banner");
  const closePinModeBtn = document.getElementById("close-pin-hint-btn");

  function getDayColor(dayNum) {
    const d = parseInt(dayNum, 10) || 1;
    const colors = ["#0284c7", "#059669", "#7c3aed", "#d97706", "#e11d48"];
    return colors[(d - 1) % colors.length];
  }

  function toggleFullscreenMap(forceState) {
    const panel = document.querySelector(".route-map-panel");
    if (!panel) return;
    isFullscreenMap = typeof forceState === "boolean" ? forceState : !isFullscreenMap;
    if (isFullscreenMap) {
      panel.classList.add("fullscreen-map-active");
      if (mapFullscreenToggleBtn) mapFullscreenToggleBtn.innerHTML = "✕ ย่อจอ";
      document.body.style.overflow = "hidden";
    } else {
      panel.classList.remove("fullscreen-map-active");
      if (mapFullscreenToggleBtn) mapFullscreenToggleBtn.innerHTML = "⛶ เต็มจอ";
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      if (leafletRouteMap) leafletRouteMap.invalidateSize();
    }, 200);
  }

  if (mapFullscreenToggleBtn) {
    mapFullscreenToggleBtn.addEventListener("click", () => toggleFullscreenMap());
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFullscreenMap) {
      toggleFullscreenMap(false);
    }
  });

  function fitMapBoundsToActive() {
    if (!leafletRouteMap) return;
    const items = getFilteredRouteItems();
    const latLngs = items.map(item => {
      const meta = getSmartMetaForItem(item);
      return [meta.lat, meta.lng];
    });
    if (latLngs.length === 1) {
      leafletRouteMap.setView(latLngs[0], 13);
    } else if (latLngs.length > 1) {
      leafletRouteMap.fitBounds(latLngs, { padding: [50, 50], maxZoom: 14 });
    }
  }

  if (mapFitBoundsBtn) {
    mapFitBoundsBtn.addEventListener("click", () => fitMapBoundsToActive());
  }

  function toggleMapPinMode(forceState) {
    isMapPinMode = typeof forceState === "boolean" ? forceState : !isMapPinMode;
    if (mapPinModeBtn) {
      if (isMapPinMode) {
        mapPinModeBtn.classList.add("active");
        mapPinModeBtn.innerHTML = "📌 โหมดปักหมุด (คลิกบนแผนที่)";
        if (mapPinHintBanner) mapPinHintBanner.style.display = "flex";
      } else {
        mapPinModeBtn.classList.remove("active");
        mapPinModeBtn.innerHTML = "📌 คลิกปักหมุด";
        if (mapPinHintBanner) mapPinHintBanner.style.display = "none";
      }
    }
  }

  if (mapPinModeBtn) mapPinModeBtn.addEventListener("click", () => toggleMapPinMode());
  if (closePinModeBtn) closePinModeBtn.addEventListener("click", () => toggleMapPinMode(false));

  function initLeafletMap() {
    if (leafletRouteMap) return;
    const mapEl = document.getElementById("route-leaflet-map");
    if (!mapEl || typeof L === "undefined") return;

    leafletRouteMap = L.map("route-leaflet-map", {
      center: [36.2048, 138.2529],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Clean Modern Basemap - soft pastel tones, clear landmarks, English/Japanese labels, 100% zero watermark
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ',
      maxZoom: 19
    }).addTo(leafletRouteMap);

    leafletRouteLayerGroup = L.layerGroup().addTo(leafletRouteMap);

    // Map Click Listener for Click-to-Pin Mode
    if (leafletRouteMap.on) {
      leafletRouteMap.on("click", (e) => {
        if (!isMapPinMode) return;

      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const popupHtml = `
        <div style="min-width: 220px; font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px;">
          <h5 style="margin: 0 0 6px; font-size: 0.88rem; font-weight: 800; color: #0f172a;">📍 ปักหมุดตำแหน่งนี้</h5>
          <input type="text" id="map-pin-input-name" placeholder="ระบุชื่อ เช่น โรงแรมของฉัน, คาเฟ่" style="width: 100%; box-sizing: border-box; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.8rem; margin-bottom: 6px;" autofocus>
          <div style="display: flex; gap: 4px; margin-bottom: 8px;">
            <button type="button" class="pin-popup-cat active" data-icon="🏨" data-tag="โรงแรม" style="flex:1; font-size: 0.72rem; padding: 4px 2px; border-radius: 4px; border: 1px solid #059669; background: #ecfdf5; color: #059669; font-weight: 700; cursor: pointer;">🏨 โรงแรม</button>
            <button type="button" class="pin-popup-cat" data-icon="🍜" data-tag="ร้านอาหาร" style="flex:1; font-size: 0.72rem; padding: 4px 2px; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; font-weight: 700; cursor: pointer;">🍜 อาหาร</button>
            <button type="button" class="pin-popup-cat" data-icon="📍" data-tag="จุดแวะ" style="flex:1; font-size: 0.72rem; padding: 4px 2px; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; font-weight: 700; cursor: pointer;">📍 จุดแวะ</button>
          </div>
          <button type="button" id="map-pin-confirm-btn" style="width: 100%; background: #059669; color: white; border: none; padding: 6px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
            ✨ + บันทึกลงแผนเที่ยวทันที
          </button>
        </div>
      `;

      L.popup()
        .setLatLng(e.latlng)
        .setContent(popupHtml)
        .openOn(leafletRouteMap);

      setTimeout(() => {
        let chosenIcon = "🏨";
        let chosenTag = "โรงแรม";
        
        document.querySelectorAll(".pin-popup-cat").forEach(btn => {
          btn.addEventListener("click", (evt) => {
            document.querySelectorAll(".pin-popup-cat").forEach(b => {
              b.style.background = "white";
              b.style.borderColor = "#cbd5e1";
              b.style.color = "#475569";
            });
            evt.currentTarget.style.background = "#ecfdf5";
            evt.currentTarget.style.borderColor = "#059669";
            evt.currentTarget.style.color = "#059669";
            chosenIcon = evt.currentTarget.getAttribute("data-icon");
            chosenTag = evt.currentTarget.getAttribute("data-tag");
          });
        });

        const confirmBtn = document.getElementById("map-pin-confirm-btn");
        const nameInput = document.getElementById("map-pin-input-name");
        if (confirmBtn) {
          confirmBtn.addEventListener("click", () => {
            const placeTitle = (nameInput && nameInput.value.trim()) || `จุดปักหมุด (${lat.toFixed(3)}, ${lng.toFixed(3)})`;
            
            // Auto detect region by lat/lng
            let reg = "tokyo";
            if (lat > 34.4 && lat < 35.2 && lng > 135.0 && lng < 136.0) reg = "osaka";
            else if (lat > 34.8 && lat < 35.3 && lng > 135.5 && lng < 136.0) reg = "kyoto";
            else if (lat > 42.0) reg = "hokkaido";
            else if (lat < 34.0) reg = "fukuoka";
            else if (lat > 35.0 && lat < 36.5 && lng < 138.5) reg = "chubu";

            addCustomPlaceToPlan({
              id: `custom-pin-${Date.now()}`,
              title: placeTitle,
              japanese: placeTitle,
              region: reg,
              tag: chosenTag,
              icon: chosenIcon,
              category: chosenTag === "โรงแรม" ? "hotel" : (chosenTag === "ร้านอาหาร" ? "food" : "spot"),
              station: "พิกัดปักหมุดบนแผนที่",
              stayHours: "1 - 2 ชม.",
              lat: lat,
              lng: lng
            });

            leafletRouteMap.closePopup();
            toggleMapPinMode(false);
          });
        }
      }, 50);
      });
    }
  }

  function sortItineraryList() {
    itineraryList.forEach((item, idx) => {
      item.day = parseInt(item.day, 10) || (Math.floor(idx / 3) + 1);
    });
    itineraryList.sort((a, b) => {
      const dayA = parseInt(a.day, 10) || 1;
      const dayB = parseInt(b.day, 10) || 1;
      if (dayA !== dayB) return dayA - dayB;
      if (a.time && b.time) return a.time.localeCompare(b.time);
      if (a.time && !b.time) return -1;
      if (!a.time && b.time) return 1;
      return 0;
    });
  }

  function getRouteItems() {
    if (selectedRoutePresetId === "custom") {
      sortItineraryList();
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));

      return itineraryList.map((item, idx) => {
        const baseId = item.baseId || (item.id ? item.id.split('_')[0] : item.id);
        const builtin = JAPAN_DATA.find(i => i.id === item.id || i.id === baseId);
        const custom = customPlacesStore.find(i => i.id === item.id || i.id === baseId);
        const base = builtin || custom || item;
        return {
          ...base,
          ...item,
          id: item.id,
          baseId: baseId,
          title: item.title || base.title,
          japanese: item.japanese || base.japanese,
          region: item.region || base.region,
          day: parseInt(item.day, 10) || 1,
          time: item.time || ""
        };
      });
    }
    const preset = ROUTE_PRESETS_DATA.find(p => p.id === selectedRoutePresetId);
    if (preset) {
      const items = preset.itemIds.map((id, idx) => {
        const b = JAPAN_DATA.find(item => item.id === id) || customPlacesStore.find(item => item.id === id) || { id, title: id, region: preset.region };
        let assignedDay = 1;
        if (preset.id === "preset-hokkaido-classic") {
          assignedDay = idx + 1;
        } else if (preset.id === "preset-golden-route") {
          assignedDay = Math.floor(idx / 2) + 1;
        } else if (preset.id === "preset-kansai-2day") {
          assignedDay = Math.floor(idx / 3) + 1;
        } else if (preset.id === "preset-fuji-heritage") {
          assignedDay = idx + 1;
        } else {
          assignedDay = Math.floor(idx / 3) + 1;
        }
        return {
          ...b,
          day: assignedDay,
          time: ""
        };
      }).filter(Boolean);

      items.sort((a, b) => (parseInt(a.day, 10) || 1) - (parseInt(b.day, 10) || 1));
      return items;
    }
    return itineraryList;
  }

  function calculateTransitLeg(fromItem, toItem) {
    if (!fromItem || !toItem) {
      return {
        mode: "🚇 รถไฟ / ใต้ดิน",
        duration: "15 นาที",
        fareJPY: 210,
        icon: "🚇",
        distKm: 3.5,
        walk: { time: "45 นาที", cost: "ฟรี (0 บ.)", isFriendly: false, note: "เดินพอไหว" },
        taxi: { time: "10 - 15 นาที", cost: "~¥1,500 (315 บ.)", costJPY: 1500 },
        train: { mode: "Tokyo Metro / JR Line", time: "15 นาที", costJPY: 210, costText: "~¥210 (44 บ.)", icon: "🚇" }
      };
    }

    // Coordinates and Distance
    const meta1 = getSmartMetaForItem(fromItem);
    const meta2 = getSmartMetaForItem(toItem);
    const lat1 = meta1.lat, lon1 = meta1.lng;
    const lat2 = meta2.lat, lon2 = meta2.lng;

    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightDistKm = R * c;
    const roadKm = Math.max(0.4, Math.round(straightDistKm * 1.25 * 10) / 10);

    // 1. Walk Calculation (เดินเท้า)
    const walkMins = Math.round(roadKm * 13.5);
    let walkTimeText = "";
    let walkCostText = "ฟรี (0 บ.)";
    let isWalkFriendly = false;
    let walkNote = "";

    if (roadKm <= 1.2) {
      walkTimeText = `${walkMins} นาที`;
      walkCostText = `ฟรี · ${Math.round(roadKm * 1000)} ม.`;
      isWalkFriendly = true;
      walkNote = "เดินชิลๆ ชมเมือง";
    } else if (roadKm <= 3.5) {
      walkTimeText = `${walkMins} นาที`;
      walkCostText = `ฟรี · ${roadKm} กม.`;
      isWalkFriendly = false;
      walkNote = "เดินพอไหว";
    } else if (roadKm <= 12) {
      const h = Math.floor(walkMins / 60);
      const m = walkMins % 60;
      walkTimeText = `${h} ชม. ${m > 0 ? m + ' น.' : ''}`;
      walkCostText = `~${roadKm} กม.`;
      walkNote = "ระยะไกล";
    } else {
      walkTimeText = "> 3 - 5 ชม.";
      walkCostText = `ไกลเกินเดิน (${Math.round(roadKm)} กม.)`;
      walkNote = "ไม่แนะนำให้เดิน";
    }

    // 2. Taxi Calculation (เรียกรถ / แท็กซี่)
    let taxiTimeText = "";
    let taxiCostJPY = 0;
    let taxiCostText = "";

    if (roadKm <= 20) {
      const minMins = Math.max(5, Math.round(roadKm * 2.2 + 3));
      const maxMins = Math.max(8, Math.round(roadKm * 3.2 + 6));
      taxiTimeText = `${minMins} - ${maxMins} นาที`;

      if (roadKm <= 1.1) {
        taxiCostJPY = 500;
      } else {
        taxiCostJPY = Math.round((500 + (roadKm - 1.1) * 392) / 100) * 100;
      }
      const thb = Math.round(taxiCostJPY * currentExchangeRate);
      taxiCostText = `~¥${taxiCostJPY.toLocaleString()} (${thb} บ.)`;
    } else if (roadKm <= 60) {
      const minMins = Math.round(roadKm * 1.2 + 10);
      const maxMins = Math.round(roadKm * 1.5 + 15);
      taxiTimeText = `${minMins} - ${maxMins} นาที`;
      taxiCostJPY = Math.round((roadKm * 350 + 2000) / 500) * 500;
      const thb = Math.round(taxiCostJPY * currentExchangeRate);
      taxiCostText = `~¥${taxiCostJPY.toLocaleString()} (${thb} บ.)`;
    } else {
      taxiTimeText = "~5 - 6 ชม.";
      taxiCostText = "ไม่แนะนำ (> ¥70,000)";
      taxiCostJPY = 70000;
    }

    // 3. Train Calculation (รถไฟ / ขนส่งสาธารณะ)
    let trainMode = "Tokyo Metro / JR Line";
    let trainDuration = "15 - 25 นาที";
    let trainFareJPY = 210;
    let trainIcon = "🚇";

    // Same Tokyo
    if (fromItem.region === "tokyo" && toItem.region === "tokyo") {
      if (fromItem.id === "tokyo-sensoji" && toItem.id === "tokyo-tsukiji-outer") {
        trainMode = "Toei Asakusa + Hibiya Line";
        trainDuration = "18 นาที";
        trainFareJPY = 210;
        trainIcon = "🚇";
      } else if (fromItem.id === "tokyo-tsukiji-outer" && toItem.id === "tokyo-shibuya-sky") {
        trainMode = "Tokyo Metro Hibiya + Ginza Line";
        trainDuration = "22 นาที";
        trainFareJPY = 210;
        trainIcon = "🚇";
      } else if (fromItem.id === "tokyo-shibuya-sky" && toItem.id === "tokyo-shinjuku-omoide") {
        trainMode = "JR Yamanote Line";
        trainDuration = "7 นาที";
        trainFareJPY = 170;
        trainIcon = "🚆";
      } else {
        trainMode = "Tokyo Metro / JR Yamanote Line";
        trainDuration = "15 - 25 นาที";
        trainFareJPY = 210;
        trainIcon = "🚇";
      }
    } else if ((fromItem.region === "kyoto" || fromItem.region === "osaka") && (toItem.region === "kyoto" || toItem.region === "osaka")) {
      if (fromItem.region === "kyoto" && toItem.region === "osaka") {
        trainMode = "JR Special Rapid Service / Keihan Line";
        trainDuration = "35 นาที";
        trainFareJPY = 580;
        trainIcon = "🚆";
      } else if (fromItem.region === "osaka" && toItem.region === "kyoto") {
        trainMode = "JR Special Rapid Service / Hankyu Line";
        trainDuration = "35 นาที";
        trainFareJPY = 580;
        trainIcon = "🚆";
      } else if (fromItem.id === "osaka-usj" && toItem.id === "osaka-dotonbori") {
        trainMode = "JR Yumesaki + Hanshin Namba Line";
        trainDuration = "25 นาที";
        trainFareJPY = 370;
        trainIcon = "🚆";
      } else if (fromItem.id === "osaka-castle" && toItem.id === "osaka-usj") {
        trainMode = "JR Osaka Loop + Yumesaki Line";
        trainDuration = "30 นาที";
        trainFareJPY = 200;
        trainIcon = "🚆";
      } else {
        trainMode = "JR Kansai / Osaka Metro / Hankyu";
        trainDuration = "20 - 30 นาที";
        trainFareJPY = 250;
        trainIcon = "🚆";
      }
    } else if ((fromItem.region === "tokyo" && (toItem.region === "kyoto" || toItem.region === "osaka")) ||
               ((fromItem.region === "kyoto" || fromItem.region === "osaka") && toItem.region === "tokyo")) {
      trainMode = "Shinkansen Nozomi (Tokaido Line)";
      trainDuration = "2 ชม. 15 นาที";
      trainFareJPY = 14170;
      trainIcon = "🚄";
    } else if ((fromItem.region === "tokyo" && toItem.region === "chubu") || (fromItem.region === "chubu" && toItem.region === "tokyo")) {
      trainMode = "Highway Express Bus / Fuji Excursion";
      trainDuration = "1 ชม. 45 นาที";
      trainFareJPY = 2200;
      trainIcon = "🚌";
    } else if (fromItem.region === "chubu" && toItem.region === "chubu") {
      trainMode = "JR Limited Express Hida + Nohi Bus";
      trainDuration = "3 ชม. 45 นาที";
      trainFareJPY = 6500;
      trainIcon = "🚆";
    } else if (fromItem.region === "hokkaido" && toItem.region === "hokkaido") {
      if (fromItem.id === "hokkaido-otaru-canal" && toItem.id === "hokkaido-shikisaino-oka") {
        trainMode = "JR Limited Express Lilac + Furano Line";
        trainDuration = "2 ชม. 15 นาที";
        trainFareJPY = 3850;
        trainIcon = "🚆";
      } else if (fromItem.id === "hokkaido-shikisaino-oka" && toItem.id === "hokkaido-ramen-alley") {
        trainMode = "JR Limited Express Kamui / Lilac";
        trainDuration = "1 ชม. 45 นาที";
        trainFareJPY = 3400;
        trainIcon = "🚆";
      } else {
        trainMode = "JR Hokkaido Rapid Airport / Express";
        trainDuration = "35 นาที";
        trainFareJPY = 750;
        trainIcon = "🚆";
      }
    } else {
      trainMode = "Shinkansen / JR Limited Express";
      trainDuration = "2 - 3 ชั่วโมง";
      trainFareJPY = 11500;
      trainIcon = "🚄";
    }

    return {
      mode: trainMode,
      duration: trainDuration,
      fareJPY: trainFareJPY,
      icon: trainIcon,
      distKm: roadKm,
      walk: {
        time: walkTimeText,
        cost: walkCostText,
        isFriendly: isWalkFriendly,
        note: walkNote
      },
      taxi: {
        time: taxiTimeText,
        cost: taxiCostText,
        costJPY: taxiCostJPY
      },
      train: {
        mode: trainMode,
        time: trainDuration,
        costJPY: trainFareJPY,
        costText: `~¥${trainFareJPY.toLocaleString()} (${Math.round(trainFareJPY * currentExchangeRate)} บ.)`,
        icon: trainIcon
      }
    };
  }

  function moveRouteItem(index, direction) {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= activeSimulationRoute.length) return;

    const itemA = activeSimulationRoute[index];
    const itemB = activeSimulationRoute[targetIdx];
    if (!itemA || !itemB) return;

    if (selectedRoutePresetId === "custom") {
      const realIdxA = itineraryList.findIndex(x => x.id === itemA.id);
      const realIdxB = itineraryList.findIndex(x => x.id === itemB.id);
      if (realIdxA !== -1 && realIdxB !== -1) {
        const temp = itineraryList[realIdxA];
        itineraryList[realIdxA] = itineraryList[realIdxB];
        itineraryList[realIdxB] = temp;
        itineraryList[realIdxA].day = itemA.day || 1;
        itineraryList[realIdxB].day = itemB.day || 1;
        localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
        updateItineraryUI();
      }
    } else {
      const temp = activeSimulationRoute[index];
      activeSimulationRoute[index] = activeSimulationRoute[targetIdx];
      activeSimulationRoute[targetIdx] = temp;
    }
    resetRouteSimulation();
    renderRouteSimulator();
  }

  function reorderRouteItems(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0) return;
    if (fromIdx >= activeSimulationRoute.length || toIdx >= activeSimulationRoute.length) return;

    const fromItem = activeSimulationRoute[fromIdx];
    const toItem = activeSimulationRoute[toIdx];
    if (!fromItem || !toItem) return;

    if (selectedRoutePresetId === "custom") {
      const realFromIdx = itineraryList.findIndex(x => x.id === fromItem.id);
      const realToIdx = itineraryList.findIndex(x => x.id === toItem.id);
      if (realFromIdx !== -1 && realToIdx !== -1) {
        const movedItem = itineraryList.splice(realFromIdx, 1)[0];
        if (itineraryList[realToIdx]) {
          movedItem.day = itineraryList[realToIdx].day || fromItem.day || 1;
        }
        itineraryList.splice(realToIdx, 0, movedItem);
        localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
        updateItineraryUI();
      }
    } else {
      const movedItem = activeSimulationRoute.splice(fromIdx, 1)[0];
      activeSimulationRoute.splice(toIdx, 0, movedItem);
    }
    resetRouteSimulation();
    renderRouteSimulator();
  }

  function removeRouteItem(index) {
    const item = activeSimulationRoute[index];
    if (!item) return;

    if (selectedRoutePresetId === "custom") {
      itineraryList = itineraryList.filter(x => x.id !== item.id);
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderCards();
    } else {
      activeSimulationRoute = activeSimulationRoute.filter((_, idx) => idx !== index);
    }
    resetRouteSimulation();
    renderRouteSimulator();
  }

  function getFilteredRouteItems(allItems) {
    const list = allItems || getRouteItems();
    list.sort((a, b) => {
      const dayA = parseInt(a.day, 10) || 1;
      const dayB = parseInt(b.day, 10) || 1;
      if (dayA !== dayB) return dayA - dayB;
      if (a.time && b.time) return a.time.localeCompare(b.time);
      if (a.time && !b.time) return -1;
      if (!a.time && b.time) return 1;
      return 0;
    });

    if (currentRouteFilterDay === "all") {
      return list;
    }
    const targetDay = parseInt(currentRouteFilterDay, 10);
    return list.filter(item => (parseInt(item.day, 10) || 1) === targetDay);
  }

  function renderRouteDayFilterTabs(allItems) {
    if (!routeDayFilterTabs) return;
    const uniqueDays = Array.from(new Set(allItems.map(i => parseInt(i.day, 10) || 1))).sort((a, b) => a - b);

    if (currentRouteFilterDay !== "all" && !uniqueDays.includes(parseInt(currentRouteFilterDay, 10))) {
      currentRouteFilterDay = "all";
    }

    let tabsHtml = `
      <button type="button" class="route-day-tab-btn ${currentRouteFilterDay === 'all' ? 'active' : ''}" data-day="all">
        <span>🌟</span> ทุกวัน (${allItems.length} จุด)
      </button>
    `;

    uniqueDays.forEach(dayNum => {
      const stopsOnDay = allItems.filter(i => (parseInt(i.day, 10) || 1) === dayNum);
      const themeClass = `day-theme-${((dayNum - 1) % 5) + 1}`;
      const isAct = (currentRouteFilterDay !== "all" && parseInt(currentRouteFilterDay, 10) === dayNum);
      tabsHtml += `
        <button type="button" class="route-day-tab-btn ${themeClass} ${isAct ? 'active' : ''}" data-day="${dayNum}">
          <span>🗓️</span> Day ${dayNum} (${stopsOnDay.length} จุด)
        </button>
      `;
    });

    routeDayFilterTabs.innerHTML = tabsHtml;

    routeDayFilterTabs.querySelectorAll(".route-day-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const dayVal = e.currentTarget.getAttribute("data-day");
        currentRouteFilterDay = (dayVal === "all") ? "all" : parseInt(dayVal, 10);
        resetRouteSimulation();
        renderRouteSimulator();
      });
    });
  }

  function highlightTimelineItem(itemId) {
    if (!routeTimelineList) return;
    routeTimelineList.querySelectorAll(".route-stop-card").forEach(c => c.classList.remove("active-pin-highlight"));
    const targetCard = routeTimelineList.querySelector(`.route-stop-card[data-item-id="${itemId}"]`);
    if (targetCard) {
      targetCard.classList.add("active-pin-highlight");
      targetCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function focusMapOnItem(itemId) {
    if (!leafletRouteMap || !leafletMarkersMap[itemId]) return;
    const marker = leafletMarkersMap[itemId];
    const latLng = marker.getLatLng();
    leafletRouteMap.flyTo(latLng, Math.max(leafletRouteMap.getZoom(), 14), { duration: 0.8 });
    marker.openPopup();

    document.querySelectorAll(".modern-drop-pin-container").forEach(el => el.classList.remove("active-selected-pin"));
    const pinEl = document.getElementById(`modern-pin-${itemId}`);
    if (pinEl) pinEl.classList.add("active-selected-pin");
  }

  function getCurvedSegmentLatLngs(p1, p2, curveIntensity = 0.12) {
    const lat1 = p1[0], lng1 = p1[1];
    const lat2 = p2[0], lng2 = p2[1];

    const midLat = (lat1 + lat2) / 2;
    const midLng = (lng1 + lng2) / 2;

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist === 0) return { points: [p1, p2], midPoint: [midLat, midLng] };

    // Calculate perpendicular offset for curved arc
    const normalLat = -dLng * curveIntensity;
    const normalLng = dLat * curveIntensity;

    const controlLat = midLat + normalLat;
    const controlLng = midLng + normalLng;

    const points = [];
    const steps = 14;
    for (let t = 0; t <= steps; t++) {
      const factor = t / steps;
      const inv = 1 - factor;
      const lat = inv * inv * lat1 + 2 * inv * factor * controlLat + factor * factor * lat2;
      const lng = inv * inv * lng1 + 2 * inv * factor * controlLng + factor * factor * lng2;
      points.push([lat, lng]);
    }
    return { points, midPoint: [controlLat, controlLng] };
  }

  function renderRouteSimulator() {
    if (!routePresetPills || !routeTimelineList) return;

    const allRouteItems = getRouteItems();
    allRouteItems.sort((a, b) => {
      const dayA = parseInt(a.day, 10) || 1;
      const dayB = parseInt(b.day, 10) || 1;
      if (dayA !== dayB) return dayA - dayB;
      if (a.time && b.time) return a.time.localeCompare(b.time);
      if (a.time && !b.time) return -1;
      if (!a.time && b.time) return 1;
      return 0;
    });

    // Render Day-by-Day Filter Tabs
    renderRouteDayFilterTabs(allRouteItems);

    activeSimulationRoute = getFilteredRouteItems(allRouteItems);

    // 1. Render Preset Pills
    let pillsHtml = `
      <button class="preset-pill-btn ${selectedRoutePresetId === 'custom' ? 'active' : ''}" data-preset="custom">
        ✨ แผนที่ฉัน Mark ไว้ (${itineraryList.length} จุด)
        <span class="preset-tag-badge">My Plan</span>
      </button>
    `;

    pillsHtml += ROUTE_PRESETS_DATA.map(preset => `
      <button class="preset-pill-btn ${selectedRoutePresetId === preset.id ? 'active' : ''}" data-preset="${preset.id}">
        ${preset.title}
        <span class="preset-tag-badge">${preset.tag}</span>
      </button>
    `).join("");

    routePresetPills.innerHTML = pillsHtml;

    routePresetPills.querySelectorAll(".preset-pill-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        selectedRoutePresetId = e.currentTarget.getAttribute("data-preset");
        currentRouteFilterDay = "all";
        resetRouteSimulation();
        renderRouteSimulator();
      });
    });

    if (routeActiveCount) {
      routeActiveCount.textContent = `${activeSimulationRoute.length} จุดหมาย`;
    }

    if (activeSimulationRoute.length === 0) {
      routeTimelineList.innerHTML = `
        <div class="empty-route-state">
          <span>🗾</span>
          <h4>ยังไม่มีสถานที่ในเส้นทาง</h4>
          <p>เลือกกด Preset ด้านบน หรือกด <strong>"+ แผนเที่ยว"</strong> ที่การ์ดสถานที่ใดก็ได้เพื่อเริ่มจำลองเส้นทาง</p>
        </div>
      `;
      if (leafletRouteLayerGroup) leafletRouteLayerGroup.clearLayers();
      if (metroTrackLine) metroTrackLine.innerHTML = "";
      if (routeSummaryBox) routeSummaryBox.innerHTML = "";
      if (simPlayBtn) simPlayBtn.disabled = true;
      if (routeDayStatsTitle) routeDayStatsTitle.textContent = "📍 ยังไม่มีสถานที่ในเส้นทาง";
      if (routeDayStatsMetrics) routeDayStatsMetrics.innerHTML = "";
      return;
    }

    if (simPlayBtn) simPlayBtn.disabled = false;

    // 2. Initialize and Render Real Leaflet Map with Color-Coded Pins & Segment Polylines
    initLeafletMap();

    const visitedRegions = new Set();
    let totalFareJPY = 0;

    if (leafletRouteMap && leafletRouteLayerGroup) {
      leafletRouteLayerGroup.clearLayers();
      leafletVehicleMarker = null;
      leafletMarkersMap = {};

      const latLngs = [];

      // 2.1 Add Numbered Circular Drop-Pin Markers
      for (let i = 0; i < activeSimulationRoute.length; i++) {
        const item = activeSimulationRoute[i];
        const meta = getSmartMetaForItem(item);
        const regCode = meta.region || item.region || "tokyo";
        visitedRegions.add(regCode);
        const dayColor = getDayColor(item.day || 1);

        // Clean sequence number inside circle (Option 1: crisp single number)
        let circleNumber = i + 1;
        let dayTagHtml = "";
        let popupBadgeLabel = `#${i + 1}`;

        if (currentRouteFilterDay === "all") {
          const dayStops = allRouteItems.filter(x => (x.day || 1) === (item.day || 1));
          const seqInDay = dayStops.findIndex(x => x.id === item.id) + 1;
          circleNumber = seqInDay > 0 ? seqInDay : (i + 1);
          dayTagHtml = `<span class="pin-day-tag">D${item.day || 1}</span>`;
          popupBadgeLabel = `Day ${item.day || 1} · #${circleNumber}`;
        } else {
          circleNumber = i + 1;
          dayTagHtml = "";
          popupBadgeLabel = `Day ${item.day || 1} · #${circleNumber}`;
        }

        const pos = [meta.lat, meta.lng];
        latLngs.push(pos);

        const markerHtml = `
          <div class="modern-drop-pin-container" id="modern-pin-${item.id}">
            <div class="pin-label-pill" style="border-color: ${dayColor};">
              ${dayTagHtml}
              <span>${meta.icon || '📍'}</span>
              <span>${item.title.split('(')[0].trim()}</span>
            </div>
            <div class="pin-circle-head" style="background: ${dayColor};">
              ${circleNumber}
            </div>
            <div class="pin-point-arrow" style="border-top-color: ${dayColor};"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: "custom-modern-pin-divicon",
          iconSize: [160, 68],
          iconAnchor: [80, 66],
          popupAnchor: [0, -66]
        });

        const marker = L.marker(pos, { icon: customIcon }).addTo(leafletRouteLayerGroup);
        leafletMarkersMap[item.id] = marker;

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 0.85rem; padding: 2px; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="background: ${dayColor}; color: white; font-weight: 800; font-size: 0.72rem; padding: 1px 6px; border-radius: 10px;">${popupBadgeLabel}</span>
              <strong style="color: #0f172a;">${item.title}</strong>
            </div>
            <span style="color: #64748b; font-size: 0.8rem;">🚉 ${meta.station}</span><br>
            <span style="color: #059669; font-weight: 600; font-size: 0.8rem;">⏳ แนะนำเวลา: ${meta.stayHours}</span>
            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.72rem; color: #64748b;">🗓️ Day ${item.day || 1}</span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7;">⏰ ${item.time || 'ไม่ระบุเวลา'}</span>
            </div>
          </div>
        `);

        marker.on("click", () => {
          highlightTimelineItem(item.id);
        });
      }

      // 2.2 Draw Color-Coded Polylines & Midpoint Leg Badges
      // Clean Connection Rule: only connect stops that belong to the same day or when viewing a single day!
      for (let i = 0; i < activeSimulationRoute.length - 1; i++) {
        const item1 = activeSimulationRoute[i];
        const item2 = activeSimulationRoute[i + 1];

        // Skip line connection if day changes in 'all' view to prevent tangled cross-day lines!
        if (currentRouteFilterDay === "all" && (item1.day || 1) !== (item2.day || 1)) {
          continue;
        }

        const meta1 = getSmartMetaForItem(item1);
        const meta2 = getSmartMetaForItem(item2);
        const pos1 = [meta1.lat, meta1.lng];
        const pos2 = [meta2.lat, meta2.lng];

        const reg1 = meta1.region || item1.region || "tokyo";
        const reg2 = meta2.region || item2.region || "tokyo";
        const isCrossRegion = (reg1 !== reg2);

        const legKey = `${item1.id}_${item2.id}`;
        const leg = calculateTransitLeg(item1, item2);
        const chosenMode = userSelectedTransitModes[legKey] || (leg.distKm <= 0.8 ? "walk" : "train");

        let activeModeFare = leg.fareJPY;
        let activeModeDuration = leg.duration;
        let activeModeIcon = leg.icon;

        if (chosenMode === "taxi") {
          activeModeFare = leg.taxi.costJPY || 0;
          activeModeDuration = leg.taxi.time;
          activeModeIcon = "🚕";
        } else if (chosenMode === "walk") {
          activeModeFare = 0;
          activeModeDuration = leg.walk.time;
          activeModeIcon = "🚶";
        }

        totalFareJPY += activeModeFare;

        const lineColor = getDayColor(item1.day || 1);
        const curveIntensity = isCrossRegion ? 0.08 : 0.12;
        const curved = getCurvedSegmentLatLngs(pos1, pos2, curveIntensity);

        // 1. Back Glow Line (matching mockup)
        L.polyline(curved.points, {
          color: lineColor,
          weight: 8,
          opacity: 0.28,
          lineCap: "round",
          className: "leaflet-route-glow",
          interactive: false
        }).addTo(leafletRouteLayerGroup);

        // 2. Animated Moving Dashed Polyline (เส้นประวิ่งตาม Mockup)
        L.polyline(curved.points, {
          color: lineColor,
          weight: 4.5,
          opacity: 0.95,
          dashArray: "10, 10",
          className: "leaflet-route-moving-dash",
          lineCap: "round",
          interactive: false
        }).addTo(leafletRouteLayerGroup);

        // Add Midpoint Transit Badge at apex of curve
        const badgeLat = curved.midPoint[0];
        const badgeLng = curved.midPoint[1];

        const fareBadgeText = activeModeFare === 0 ? "ฟรี" : `¥${activeModeFare.toLocaleString()}`;
        const badgeHtml = `
          <div class="leaflet-route-badge ${isCrossRegion ? 'shinkansen-badge' : ''}">
            <span>${activeModeIcon}</span>
            <span>${activeModeDuration}</span>
            <span>· ${fareBadgeText}</span>
          </div>
        `;

        const badgeIcon = L.divIcon({
          html: badgeHtml,
          className: "",
          iconAnchor: [55, 12]
        });

        L.marker([badgeLat, badgeLng], { icon: badgeIcon, interactive: false }).addTo(leafletRouteLayerGroup);
      }

      // 2.3 Update Day Stats Banner
      if (routeDayStatsTitle && routeDayStatsMetrics) {
        if (currentRouteFilterDay === "all") {
          const uniqueDays = Array.from(new Set(allRouteItems.map(i => parseInt(i.day, 10) || 1)));
          routeDayStatsTitle.textContent = `🌟 ภาพรวมเส้นทางทุกวัน (${allRouteItems.length} จุดหมาย · ${uniqueDays.length} วัน)`;
          routeDayStatsMetrics.innerHTML = `
            <span>📍 ครบทุกเมือง</span>
            <span>·</span>
            <span>💳 ค่าเดินทางรวม ~¥${totalFareJPY.toLocaleString()} (~${Math.round(totalFareJPY * currentExchangeRate)} บาท)</span>
            <span>·</span>
            <span style="color: #38bdf8;">✨ คลิกปุ่ม Day ด้านบนเพื่อแยกดูทีละวัน</span>
          `;
        } else {
          const dNum = parseInt(currentRouteFilterDay, 10);
          const stopNames = activeSimulationRoute.map(s => s.title.split('(')[0].trim()).join(' ➔ ');
          routeDayStatsTitle.textContent = `📍 Day ${dNum}: ${stopNames}`;
          routeDayStatsMetrics.innerHTML = `
            <span>🎯 ${activeSimulationRoute.length} สถานที่</span>
            <span>·</span>
            <span style="color: #38bdf8;">💳 ค่าเดินทาง ~¥${totalFareJPY.toLocaleString()} (~${Math.round(totalFareJPY * currentExchangeRate)} บาท)</span>
            <span>·</span>
            <span style="color: #34d399;">⏱️ ลำดับการเดินทางชัดเจน</span>
          `;
        }
      }

      // Auto zoom to perfectly frame all marked places
      if (latLngs.length > 0) {
        if (latLngs.length === 1) {
          leafletRouteMap.setView(latLngs[0], 13);
        } else {
          leafletRouteMap.fitBounds(latLngs, {
            padding: [50, 50],
            maxZoom: 14
          });
        }
      }

      setTimeout(() => {
        if (leafletRouteMap) leafletRouteMap.invalidateSize();
      }, 200);
    }

    // 2.5 Render Metro Schematic Transit Track
    if (metroTrackLine) {
      let metroHtml = "";
      for (let i = 0; i < activeSimulationRoute.length; i++) {
        const item = activeSimulationRoute[i];
        const meta = getSmartMetaForItem(item);
        const regCode = meta.region || item.region || "tokyo";
        const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍" };

        metroHtml += `
          <div class="metro-station-node" id="metro-node-${i}" style="border-color: ${theme.color};">
            <div class="metro-node-num" style="color: ${theme.color};">DAY ${item.day || 1} · STOP #${i + 1}</div>
            <div class="metro-node-title">${meta.icon} ${item.title.split('(')[0].slice(0, 14)}</div>
            <div class="metro-node-station">🚉 ${meta.station.split('(')[0].slice(0, 16)}</div>
          </div>
        `;

        if (i < activeSimulationRoute.length - 1) {
          const nextItem = activeSimulationRoute[i + 1];
          const isDayBreak = ((item.day || 1) !== (nextItem.day || 1));
          if (isDayBreak) {
            metroHtml += `
              <div class="metro-leg-bridge" style="border-left: 2px dashed #94a3b8; padding-left: 4px;">
                <span class="metro-bridge-label" style="color: #64748b;">🌙 ข้ามวัน</span>
                <div class="metro-bridge-line" style="background: #94a3b8; border-style: dashed;"></div>
                <span style="font-size: 0.65rem; color: #64748b; font-weight: 700;">DAY ${nextItem.day || 1} 🌅</span>
              </div>
            `;
          } else {
            const leg = calculateTransitLeg(item, nextItem);
            metroHtml += `
              <div class="metro-leg-bridge">
                <span class="metro-bridge-label" style="color: ${theme.color};">${leg.icon} ${leg.duration}</span>
                <div class="metro-bridge-line" style="background: ${theme.color};"></div>
                <span style="font-size: 0.65rem; color: #64748b;">${leg.mode.slice(0, 15)}</span>
              </div>
            `;
          }
        }
      }
      metroTrackLine.innerHTML = metroHtml;
    }

    // 3. Render Auto-Grouped Timeline with Drag-and-Drop, Day Banners & Region Headers
    let timelineHtml = `
      <div class="timeline-drag-tip">
        <span>✋ คลิกลากการ์ดเพื่อสลับลำดับจุดแวะ (Drag & Drop) หรือกดปุ่ม ⬆️ ⬇️</span>
      </div>
    `;

    let lastDay = null;
    let lastRegion = null;

    for (let i = 0; i < activeSimulationRoute.length; i++) {
      const item = activeSimulationRoute[i];
      const currentDay = item.day || 1;
      const meta = getSmartMetaForItem(item);
      const regCode = meta.region || item.region || "tokyo";
      const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍", dayLabel: "โซนท่องเที่ยว", name: regCode, bg: "#f0f9ff", border: "#bae6fd" };

      // Add Day Group Header if day changed
      if (currentDay !== lastDay) {
        lastDay = currentDay;
        lastRegion = null; // Reset region grouping per day
        const dayStopsCount = activeSimulationRoute.filter(x => (x.day || 1) === currentDay).length;
        timelineHtml += `
          <div class="timeline-day-header" style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 0.75rem 1.15rem; border-radius: 12px; margin: 1.25rem 0 0.75rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.2rem;">🗓️</span>
              <span style="font-weight: 800; font-size: 1rem; letter-spacing: 0.5px;">DAY ${currentDay}</span>
              <span style="font-size: 0.75rem; background: rgba(255,255,255,0.22); padding: 2px 9px; border-radius: 12px; font-weight: 700;">${dayStopsCount} จุดหมาย</span>
            </div>
            <span style="font-size: 0.78rem; color: #cbd5e1; font-weight: 600;">${theme.name || regCode}</span>
          </div>
        `;
      }

      // Add Region Sub-header if region changed within day
      if (regCode !== lastRegion) {
        lastRegion = regCode;
        timelineHtml += `
          <div class="region-group-header" style="background: ${theme.bg}; border: 1px solid ${theme.border}; color: ${theme.color}; margin-top: 0.4rem;">
            <div class="region-group-title">
              <span>${theme.icon}</span>
              <span>${theme.dayLabel}</span>
            </div>
            <span class="region-group-badge" style="color: ${theme.color};">${theme.name}</span>
          </div>
        `;
      }

      timelineHtml += `
        <div class="route-stop-card" id="sim-stop-${i}" data-stop-idx="${i}" data-item-id="${item.id}" draggable="true">
          <div class="route-stop-header">
            <div class="stop-title-wrap">
              <span class="stop-drag-handle" title="คลิกลากเพื่อสลับลำดับ">⋮⋮</span>
              <span class="stop-num-badge" style="background: ${theme.color};">${i + 1}</span>
              <span class="stop-day-pill">DAY ${currentDay}</span>
              <div class="stop-time-picker-box">
                <span>🕒</span>
                <input type="time" class="stop-time-picker-input" data-id="${item.id}" value="${item.time || ''}" title="เลือกเวลาเริ่มต้นของสถานที่นี้">
              </div>
              <div style="min-width: 0; flex: 1 1 auto;">
                <div class="stop-title-text">${meta.icon} ${item.title}</div>
                <div style="font-size: 0.75rem; color: ${theme.color}; font-weight: 700;">${item.japanese}</div>
              </div>
            </div>
            <div class="stop-reorder-btns">
              <button class="stop-reorder-btn move-up" data-idx="${i}" title="เลื่อนขึ้น" ${i === 0 ? 'disabled' : ''}>▲</button>
              <button class="stop-reorder-btn move-down" data-idx="${i}" title="เลื่อนลง" ${i === activeSimulationRoute.length - 1 ? 'disabled' : ''}>▼</button>
              <button class="stop-reorder-btn remove-stop" data-idx="${i}" title="ลบออก" style="color: #ef4444;">✕</button>
            </div>
          </div>
          <div class="stop-meta-row">
            <span>🚉 ${meta.station}</span>
            <span>⏳ เวลาแวะ: ${meta.stayHours}</span>
          </div>
        </div>
      `;

      // If not last stop, render connecting transit leg or day transition divider
      if (i < activeSimulationRoute.length - 1) {
        const nextItem = activeSimulationRoute[i + 1];
        const nextDay = nextItem.day || 1;
        const isDayBreak = (currentDay !== nextDay);

        if (isDayBreak) {
          timelineHtml += `
            <div class="route-transit-leg day-transition-leg" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1.5px dashed #cbd5e1; border-radius: 10px; padding: 0.7rem 1.15rem; margin: 0.65rem 0; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #475569;">
                <span>🌙</span>
                <span>จบแผนเที่ยว DAY ${currentDay} ➔ พักค้างคืน / เริ่มต้นเช้าวันใหม่ <strong>DAY ${nextDay}</strong></span>
              </div>
              <span style="font-size: 0.72rem; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 6px; font-weight: 700;">เช้าวันใหม่ 🌅</span>
            </div>
          `;
        } else {
          const nextMeta = ROUTE_SIMULATION_META[nextItem.id] || { region: nextItem.region || "tokyo" };
          const nextRegCode = nextMeta.region || nextItem.region || "tokyo";
          const isCross = (regCode !== nextRegCode);

          const legKey = `${item.id}_${nextItem.id}`;
          const leg = calculateTransitLeg(item, nextItem);
          const chosenMode = userSelectedTransitModes[legKey] || (leg.distKm <= 0.8 ? "walk" : "train");

          let chosenLabel = `🚇 ${leg.mode}`;
          let chosenDuration = leg.duration;
          if (chosenMode === "taxi") {
            chosenLabel = "🚕 แท็กซี่";
            chosenDuration = leg.taxi.time;
          } else if (chosenMode === "walk") {
            chosenLabel = "🚶 เดิน";
            chosenDuration = leg.walk.time;
          }

          timelineHtml += `
            <div class="route-transit-leg multi-modal-leg ${isCross ? 'cross-region' : ''}">
              <div class="transit-leg-header">
                <span class="transit-leg-distance">📏 ~${leg.distKm} กม.</span>
                <span class="transit-leg-rec">
                  เลือก: <strong>${chosenLabel}</strong> (⏱️ ${chosenDuration})
                </span>
              </div>
              <div class="transit-modes-grid">
                <!-- Mode 1: รถไฟ -->
                <button type="button" class="transit-mode-btn ${chosenMode === 'train' ? 'is-selected' : ''}" data-leg-key="${legKey}" data-mode="train" title="เลือกเดินทางด้วยรถไฟ">
                  <div class="mode-btn-top">
                    <span class="mode-btn-title">🚇 รถไฟ</span>
                    ${chosenMode === 'train' ? '<span class="mode-btn-check">✓</span>' : ''}
                  </div>
                  <div class="mode-btn-meta">
                    <span class="mode-btn-time">⏱️ ${leg.train.time}</span>
                    <span class="mode-btn-price">${leg.train.costText}</span>
                  </div>
                </button>

                <!-- Mode 2: แท็กซี่ -->
                <button type="button" class="transit-mode-btn ${chosenMode === 'taxi' ? 'is-selected' : ''}" data-leg-key="${legKey}" data-mode="taxi" title="เลือกเดินทางด้วยแท็กซี่ / เรียกรถ">
                  <div class="mode-btn-top">
                    <span class="mode-btn-title">🚕 แท็กซี่</span>
                    ${chosenMode === 'taxi' ? '<span class="mode-btn-check">✓</span>' : ''}
                  </div>
                  <div class="mode-btn-meta">
                    <span class="mode-btn-time">⏱️ ${leg.taxi.time}</span>
                    <span class="mode-btn-price">${leg.taxi.cost}</span>
                  </div>
                </button>

                <!-- Mode 3: เดินเท้า -->
                <button type="button" class="transit-mode-btn ${chosenMode === 'walk' ? 'is-selected' : ''}" data-leg-key="${legKey}" data-mode="walk" title="${leg.walk.note}">
                  <div class="mode-btn-top">
                    <span class="mode-btn-title">🚶 เดิน</span>
                    ${chosenMode === 'walk' ? '<span class="mode-btn-check">✓</span>' : ''}
                  </div>
                  <div class="mode-btn-meta">
                    <span class="mode-btn-time">⏱️ ${leg.walk.time}</span>
                    <span class="mode-btn-price">${leg.walk.cost}</span>
                  </div>
                </button>
              </div>
            </div>
          `;
        }
      }
    }

    routeTimelineList.innerHTML = timelineHtml;

    // Attach HTML5 Drag-and-Drop & 2-Way Sync Handlers
    let draggedIndex = null;
    routeTimelineList.querySelectorAll(".route-stop-card").forEach(card => {
      // 2-Way Sync: clicking card smoothly pans map to destination and highlights pin
      card.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("input")) return;
        const itemId = card.getAttribute("data-item-id");
        if (itemId) {
          focusMapOnItem(itemId);
          highlightTimelineItem(itemId);
        }
      });

      card.addEventListener("dragstart", (e) => {
        draggedIndex = parseInt(e.currentTarget.getAttribute("data-stop-idx"));
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", draggedIndex);
      });

      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        card.classList.add("drag-over");
      });

      card.addEventListener("dragleave", () => {
        card.classList.remove("drag-over");
      });

      card.addEventListener("drop", (e) => {
        e.preventDefault();
        card.classList.remove("drag-over");
        const targetIdx = parseInt(card.getAttribute("data-stop-idx"));
        if (draggedIndex !== null && targetIdx !== null && draggedIndex !== targetIdx) {
          reorderRouteItems(draggedIndex, targetIdx);
        }
      });

      card.addEventListener("dragend", (e) => {
        e.currentTarget.classList.remove("dragging");
        routeTimelineList.querySelectorAll(".route-stop-card").forEach(c => c.classList.remove("drag-over"));
      });
    });

    // Attach Reorder and Delete Button Events
    routeTimelineList.querySelectorAll(".stop-reorder-btn.move-up").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
        moveRouteItem(idx, -1);
      });
    });

    routeTimelineList.querySelectorAll(".stop-reorder-btn.move-down").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
        moveRouteItem(idx, 1);
      });
    });

    routeTimelineList.querySelectorAll(".stop-reorder-btn.remove-stop").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
        removeRouteItem(idx);
      });
    });

    // Attach Time Picker Listeners in Route Simulator
    routeTimelineList.querySelectorAll(".stop-time-picker-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        const newTime = e.target.value;
        setItineraryItemTime(id, newTime);
      });
    });

    // Attach Transit Mode Selection Click Listeners (เลือกรูปแบบการเดินทาง รถไฟ / แท็กซี่ / เดิน)
    routeTimelineList.querySelectorAll(".transit-mode-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const legKey = btn.getAttribute("data-leg-key");
        const mode = btn.getAttribute("data-mode");
        if (legKey && mode) {
          userSelectedTransitModes[legKey] = mode;
          renderRouteSimulator();
        }
      });
    });

    // 4. Smart Pass Optimizer Calculation & Summary Box
    const totalFareTHB = Math.round(totalFareJPY * currentExchangeRate);
    const activePreset = ROUTE_PRESETS_DATA.find(p => p.id === selectedRoutePresetId);

    // Compute Best Recommended Pass & Savings
    const regionArray = Array.from(visitedRegions);
    let bestPass = null;
    let savingsJPY = 0;

    if (regionArray.includes("tokyo") && (regionArray.includes("kyoto") || regionArray.includes("osaka") || regionArray.includes("hiroshima")) && totalFareJPY >= 38000) {
      bestPass = {
        title: "🎫 JR All Japan Rail Pass (7 วัน)",
        desc: "ทริปข้ามเมืองใหญ่ (โตเกียว ↔ คันไซ) แนะนำซื้อ JR Pass 7 วัน หรือจอง Shinkansen SmartEX ล่วงหน้า",
        savingsNote: `ครอบคลุมรถไฟชินคันเซ็นและ JR ทั่วประเทศ คล่องตัวสูงสุด`
      };
    } else if (regionArray.every(r => r === "tokyo") && activeSimulationRoute.length >= 3) {
      const passCost = 1500;
      savingsJPY = Math.max(0, totalFareJPY - passCost);
      const savingsTHB = Math.round(savingsJPY * currentExchangeRate);
      bestPass = {
        title: "🎫 Tokyo Subway Ticket (72 ชั่วโมง / ¥1,500)",
        desc: "นั่ง Tokyo Metro และ Toei Subway 13 สายไม่อั้นทั่วโตเกียว",
        savingsNote: savingsJPY > 0 ? `💰 ประหยัดได้กว่า ¥${savingsJPY.toLocaleString()} เยน (~${savingsTHB} บาท) เทียบกับการซื้อตั๋วเที่ยวเดียว` : "สะดวกสบาย แตะผ่านประตูได้ไม่จำกัดเที่ยว"
      };
    } else if (regionArray.every(r => r === "kyoto" || r === "osaka") && activeSimulationRoute.length >= 4) {
      bestPass = {
        title: "🎫 Kansai Thru Pass / Kansai Railway Pass",
        desc: "นั่งรถไฟใต้ดิน รถไฟเอกชน (Hankyu, Keihan, Kintetsu) และรถบัสทั่วคันไซ",
        savingsNote: "ครอบคลุมทุกการเดินทางข้ามเมืองระหว่าง เกียวโต-โอซาก้า-นารา"
      };
    } else {
      bestPass = {
        title: "💳 แนะนำใช้บัตร IC Card (Welcome Suica / ICOCA)",
        desc: "แตะจ่ายตามระยะทางจริง สะดวกที่สุด ผูกกับ Apple Wallet / Google Wallet ได้ทันที",
        savingsNote: "ไม่ต้องต่อคิวซื้อตั๋วทีละเที่ยว และใช้ซื้อของในร้านสะดวกซื้อ 7-11/Lawson ได้"
      };
    }

    // Build Google Maps multi-stop URL
    const origin = encodeURIComponent(ROUTE_SIMULATION_META[activeSimulationRoute[0].id]?.mapsName || activeSimulationRoute[0].title);
    const destination = encodeURIComponent(ROUTE_SIMULATION_META[activeSimulationRoute[activeSimulationRoute.length - 1].id]?.mapsName || activeSimulationRoute[activeSimulationRoute.length - 1].title);
    const waypoints = activeSimulationRoute.slice(1, -1).map(item => encodeURIComponent(ROUTE_SIMULATION_META[item.id]?.mapsName || item.title)).join("|");
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=transit`;

    routeSummaryBox.innerHTML = `
      <div class="summary-metrics-grid">
        <div class="summary-metric-card">
          <span class="summary-metric-label">⏱️ ประมาณการเวลาเที่ยวรวม:</span>
          <span class="summary-metric-value">${activePreset ? activePreset.totalEstTime : `~${activeSimulationRoute.length * 2.5} ชั่วโมง`}</span>
        </div>
        <div class="summary-metric-card">
          <span class="summary-metric-label">💰 ค่าเดินทางบนรถไฟรวม:</span>
          <span class="summary-metric-value" style="color: var(--primary-red);">~¥${totalFareJPY.toLocaleString()} เยน (~${totalFareTHB.toLocaleString()} บ.)</span>
        </div>
      </div>

      <!-- Smart Pass Optimizer Box -->
      <div class="pass-optimizer-box">
        <div class="pass-opt-header">
          <span>💡 ผลการวิเคราะห์บัตรโดยสารสุดคุ้ม (Smart Pass Optimizer)</span>
        </div>
        <div class="pass-opt-title">${bestPass.title}</div>
        <div class="pass-opt-desc">${bestPass.desc}</div>
        <div class="pass-saving-pill">
          ${bestPass.savingsNote}
        </div>
      </div>

      <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="google-maps-sync-btn">
        🗺️ เปิดเส้นทางนี้ใน Google Maps ทันที
      </a>
    `;
  }

  function startRouteSimulation() {
    if (activeSimulationRoute.length === 0) return;
    isSimulating = true;
    simPlayBtn.disabled = true;
    simPauseBtn.disabled = false;

    if (currentSimStep >= activeSimulationRoute.length) {
      currentSimStep = 0;
    }

    runNextSimStep();
  }

  function runNextSimStep() {
    if (!isSimulating) return;

    if (currentSimStep >= activeSimulationRoute.length) {
      // Completed simulation
      isSimulating = false;
      simPlayBtn.disabled = false;
      simPauseBtn.disabled = true;
      journeyStatusBanner.innerHTML = `🏁 <strong>เดินทางครบทุกจุดหมายเรียบร้อยแล้ว!</strong> (รวม ${activeSimulationRoute.length} สถานที่)`;
      return;
    }

    const currentItem = activeSimulationRoute[currentSimStep];
    const meta = ROUTE_SIMULATION_META[currentItem.id] || { lat: 35.6895, lng: 139.6917, icon: "📍", station: "สถานีใกล้เคียง", region: currentItem.region || "tokyo" };
    const regCode = meta.region || currentItem.region || "tokyo";
    const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍" };

    // 1. Move vehicle on Leaflet Map
    if (leafletRouteMap && typeof L !== "undefined") {
      const pos = [meta.lat, meta.lng];

      if (!leafletVehicleMarker) {
        const vehicleHtml = `
          <div class="leaflet-vehicle-marker" style="background: ${theme.color};">
            <span>${meta.icon || '🚅'}</span>
            <span>จุด #${currentSimStep + 1}: ${currentItem.title.split('(')[0].slice(0, 10)}</span>
          </div>
        `;
        const vIcon = L.divIcon({ html: vehicleHtml, className: "", iconSize: [160, 34], iconAnchor: [80, 17] });
        leafletVehicleMarker = L.marker(pos, { icon: vIcon, zIndexOffset: 1000 }).addTo(leafletRouteLayerGroup);
      } else {
        leafletVehicleMarker.setLatLng(pos);
        leafletVehicleMarker.setIcon(L.divIcon({
          html: `
            <div class="leaflet-vehicle-marker" style="background: ${theme.color};">
              <span>${meta.icon || '🚅'}</span>
              <span>จุด #${currentSimStep + 1}: ${currentItem.title.split('(')[0].slice(0, 10)}</span>
            </div>
          `,
          className: "",
          iconSize: [160, 34],
          iconAnchor: [80, 17]
        }));
      }

      leafletRouteMap.panTo(pos, { animate: true, duration: 0.8 });
    }

    // 2. Highlight map pin marker
    document.querySelectorAll(".custom-leaflet-marker").forEach(m => m.classList.remove("active-marker"));
    const mapPin = document.getElementById(`leaflet-marker-${currentSimStep}`);
    if (mapPin) mapPin.classList.add("active-marker");

    // 3. Highlight timeline stop card & metro node
    document.querySelectorAll(".route-stop-card").forEach(c => c.classList.remove("active-sim-stop"));
    const stopEl = document.getElementById(`sim-stop-${currentSimStep}`);
    if (stopEl) {
      stopEl.classList.add("active-sim-stop");
      stopEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    document.querySelectorAll(".metro-station-node").forEach(n => n.classList.remove("active"));
    const metroNode = document.getElementById(`metro-node-${currentSimStep}`);
    if (metroNode) {
      metroNode.classList.add("active");
      metroNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    // 4. Update banner
    let transitInfo = "";
    if (currentSimStep < activeSimulationRoute.length - 1) {
      const nextItem = activeSimulationRoute[currentSimStep + 1];
      const leg = calculateTransitLeg(currentItem, nextItem);
      transitInfo = ` ➔ เตรียมเดินทางต่อไปยัง <strong>${nextItem.title.split('(')[0]}</strong> ด้วย ${leg.mode} (${leg.duration})`;
    }

    journeyStatusBanner.innerHTML = `
      🚩 <strong>จุด #${currentSimStep + 1}:</strong> กำลังเที่ยว <strong>${currentItem.title}</strong> (${meta.station}) ${transitInfo}
    `;

    currentSimStep++;

    const delay = (2400 / simSpeed);
    simTimer = setTimeout(runNextSimStep, delay);
  }

  function pauseRouteSimulation() {
    isSimulating = false;
    clearTimeout(simTimer);
    simPlayBtn.disabled = false;
    simPauseBtn.disabled = true;
    journeyStatusBanner.innerHTML = `⏸️ <strong>พักการจำลองชั่วคราว</strong> — กด "▶️ เริ่มจำลองเส้นทาง" เพื่อเดินทางต่อ`;
  }

  function resetRouteSimulation() {
    isSimulating = false;
    clearTimeout(simTimer);
    currentSimStep = 0;
    simPlayBtn.disabled = false;
    simPauseBtn.disabled = true;
    if (leafletVehicleMarker && leafletRouteLayerGroup) {
      leafletRouteLayerGroup.removeLayer(leafletVehicleMarker);
      leafletVehicleMarker = null;
    }
    document.querySelectorAll(".custom-leaflet-marker").forEach(m => m.classList.remove("active-marker"));
    document.querySelectorAll(".route-stop-card").forEach(c => c.classList.remove("active-sim-stop"));
    document.querySelectorAll(".metro-station-node").forEach(n => n.classList.remove("active"));
    journeyStatusBanner.innerHTML = `📍 พร้อมเริ่มการจำลองเส้นทาง — คลิก <strong>"▶️ เริ่มจำลองเส้นทาง"</strong> เพื่อชมการเคลื่อนที่`;
  }

  // Simulation Controls Binding
  if (simPlayBtn) simPlayBtn.addEventListener("click", startRouteSimulation);
  if (simPauseBtn) simPauseBtn.addEventListener("click", pauseRouteSimulation);
  if (simResetBtn) simResetBtn.addEventListener("click", resetRouteSimulation);

  document.querySelectorAll(".speed-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      simSpeed = parseInt(e.currentTarget.getAttribute("data-speed")) || 1;
    });
  });

  // Map View Switcher Binding (Real Map vs Metro Diagram)
  if (mapViewSwitcher) {
    mapViewSwitcher.querySelectorAll(".map-switch-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        mapViewSwitcher.querySelectorAll(".map-switch-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentMapViewMode = e.currentTarget.getAttribute("data-view");

        if (currentMapViewMode === "map") {
          if (routeLeafletContainer) routeLeafletContainer.style.display = "block";
          if (routeMetroContainer) routeMetroContainer.style.display = "none";
          if (leafletRouteMap) {
            setTimeout(() => leafletRouteMap.invalidateSize(), 150);
          }
        } else {
          if (routeLeafletContainer) routeLeafletContainer.style.display = "none";
          if (routeMetroContainer) routeMetroContainer.style.display = "block";
        }
      });
    });
  }

  if (drawerSimulateBtn) {
    drawerSimulateBtn.addEventListener("click", () => {
      itineraryDrawer.classList.remove("open");
      selectedRoutePresetId = "custom";
      renderRouteSimulator();
      const sec = document.getElementById("route-simulator");
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 4. Render Season Analytics Section
  function renderSeasonAnalytics() {
    const data = SEASON_STATS_DATA[currentAnalyticsSeason];
    if (!data) return;

    seasonAnalyticsContent.innerHTML = `
      <div class="season-analytics-card">
        <div class="season-analytics-header">
          <div class="season-badge-group">
            <h3>${data.name}</h3>
            <span style="font-family: var(--font-jp); font-size: 0.85rem; color: var(--primary-red); font-weight: 700;">${data.japaneseSeason}</span>
          </div>
          <div class="season-quick-meta">
            <div class="meta-pill-item">🌡️ อุณหภูมิ: <strong>${data.tempRange}</strong></div>
            <div class="meta-pill-item">👥 ความหนาแน่น: <strong>${data.overallCrowdIndex}</strong></div>
            <div class="meta-pill-item">💰 ระดับงบ: <strong>${data.budgetLevel}</strong></div>
          </div>
        </div>

        <p style="color: var(--text-main); font-size: 0.95rem; margin-bottom: 1.25rem;">
          ${data.highlightDescription}
        </p>

        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.75rem;">
          📈 สถิติเมืองยอดนิยมที่นักท่องเที่ยวเลือกไปมากที่สุดในช่วงนี้:
        </h4>

        <div class="city-popularity-grid">
          ${data.topCities.map(city => `
            <div class="city-stat-card">
              <div class="city-stat-header">
                <span class="city-stat-title">${city.name}</span>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary-red); background: rgba(188, 0, 45, 0.08); padding: 2px 8px; border-radius: 12px;">
                  ความนิยม ${city.sharePercent}%
                </span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${city.sharePercent}%;"></div>
              </div>
              <p class="city-highlight-text">
                ✨ <strong>ไฮไลต์:</strong> ${city.highlight}<br>
                🚶 <strong>ความหนาแน่น:</strong> ${city.crowdLevel}
              </p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // 5. Render Budget Calculator & Comparison
  function renderBudgetCalculator() {
    const tier = BUDGET_STATS_DATA.tiers[currentCalcStyleIndex];

    // Estimated calculation based on days & style
    let estFlight = currentCalcStyleIndex === 0 ? 12000 : (currentCalcStyleIndex === 1 ? 19000 : 38000);
    let hotelPerNight = currentCalcStyleIndex === 0 ? 1500 : (currentCalcStyleIndex === 1 ? 3800 : 12000);
    let foodPerDay = currentCalcStyleIndex === 0 ? 900 : (currentCalcStyleIndex === 1 ? 1800 : 5500);
    let transitPerDay = currentCalcStyleIndex === 0 ? 500 : (currentCalcStyleIndex === 1 ? 1000 : 2500);

    const totalHotel = hotelPerNight * Math.max(1, currentCalcDays - 1);
    const totalFood = foodPerDay * currentCalcDays;
    const totalTransit = transitPerDay * currentCalcDays;
    const grandTotal = estFlight + totalHotel + totalFood + totalTransit;

    budgetCalculatedResult.innerHTML = `
      <div>
        <div class="result-total-label">ประมาณการงบรวมทริป ${currentCalcDays} วัน (${tier.style.split(' ')[1]}):</div>
        <div class="result-total-val">~${grandTotal.toLocaleString()} บาท / คน</div>
      </div>
      <div class="result-breakdown-row">
        <span>✈️ ตั๋วเครื่องบิน: ~${estFlight.toLocaleString()} บ.</span>
        <span>🏨 ที่พัก (${currentCalcDays - 1} คืน): ~${totalHotel.toLocaleString()} บ.</span>
        <span>🍜 ค่ากิน: ~${totalFood.toLocaleString()} บ.</span>
        <span>🚅 เดินทาง: ~${totalTransit.toLocaleString()} บ.</span>
      </div>
    `;

    // Render Tiers Comparison Grid
    budgetTiersGrid.innerHTML = BUDGET_STATS_DATA.tiers.map((t, idx) => `
      <div class="tier-card ${idx === currentCalcStyleIndex ? 'highlight' : ''}">
        <div class="tier-header">
          <div class="tier-title">${t.style}</div>
          <div class="tier-daily">${t.dailyCostTHB}</div>
        </div>
        <div class="tier-cost-item">
          <div class="tier-cost-label">✈️ ตั๋วเครื่องบินไป-กลับ:</div>
          <div class="tier-cost-val">${t.flightTHB}</div>
        </div>
        <div class="tier-cost-item">
          <div class="tier-cost-label">🏨 ที่พักต่อคืน:</div>
          <div class="tier-cost-val">${t.hotelTHB}</div>
        </div>
        <div class="tier-cost-item">
          <div class="tier-cost-label">🍜 ค่าอาหารต่อวัน:</div>
          <div class="tier-cost-val">${t.foodTHB}</div>
        </div>
        <div class="tier-cost-item">
          <div class="tier-cost-label">🚅 การเดินทางต่อวัน:</div>
          <div class="tier-cost-val">${t.transitTHB}</div>
        </div>
      </div>
    `).join("");
  }

  // 6. Render Transit Tips
  function renderTransitTips() {
    transitTipsGrid.innerHTML = JAPAN_TRANSIT_TIPS.map(tip => `
      <div class="transit-card">
        <div class="transit-icon">${tip.icon}</div>
        <h3>${tip.title}</h3>
        <p>${tip.desc}</p>
      </div>
    `).join("");
  }

  // 7. Open Detail Modal
  function openDetailModal(id) {
    const baseId = id ? id.split('_')[0] : "";
    const item = JAPAN_DATA.find(i => i.id === id || i.id === baseId);
    if (!item) return;

    const instances = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) === item.id || i.id === item.id);
    const inPlanCount = instances.length;

    modalBodyContent.innerHTML = `
      <img 
        src="${item.image}" 
        alt="${item.title}" 
        class="modal-header-img"
        referrerpolicy="no-referrer"
        onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"
      >
      <div class="modal-content-wrap">
        <div class="modal-badge-row">
          <span class="card-tag" style="position: static;">${item.tag}</span>
          <span class="card-rating" style="position: static;">⭐ ${item.rating}</span>
        </div>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-jp">${item.japanese}</div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">${item.description}</p>

        <div class="modal-section">
          <h4>🚇 การเดินทางอย่างละเอียด (How to get there)</h4>
          <p>${item.transport}</p>
        </div>

        <div class="modal-section">
          <h4>⏰ ช่วงเวลาที่แนะนำ (Best Time to Visit)</h4>
          <p>${item.bestTime}</p>
        </div>

        <div class="modal-section">
          <h4>🍜 ของกินเด็ด & เมนูห้ามพลาด (Food & Dining Tips)</h4>
          <p>${item.foodTips}</p>
        </div>

        <div class="modal-section">
          <h4>💰 ค่าใช้จ่ายโดยประมาณ</h4>
          <p>${item.estimatedCost}</p>
        </div>

        <div class="modal-section">
          <h4>✨ ไฮไลต์กิจกรรมห้ามพลาด:</h4>
          <ul style="margin-left: 1.25rem; margin-top: 0.4rem; color: var(--text-main);">
            ${item.mustTry.map(m => `<li>${m}</li>`).join("")}
          </ul>
        </div>

        ${item.nearbyHotels && item.nearbyHotels.length > 0 ? (() => {
          const modalSamplePricing = calculateDateAwareHotelPricing({ priceJPY: 6550 }, selectedCheckinDate, selectedStayNights, selectedGuestCount);
          return `
            <div class="modal-section modal-hotels-section">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
                <h4 style="display: flex; align-items: center; gap: 0.45rem; color: #1e3a8a; font-size: 1.05rem; margin: 0;">
                  <span>🏨</span> โรงแรม & ที่พักแนะนำบริเวณใกล้เคียง (${item.title.split('(')[0].trim()})
                </h4>
                <span style="background: ${modalSamplePricing.isHoliday ? '#fef2f2' : modalSamplePricing.badgeBg}; color: ${modalSamplePricing.badgeColor}; font-size: 0.75rem; font-weight: 800; padding: 3px 9px; border-radius: 12px; border: 1px solid ${modalSamplePricing.badgeColor};">
                  ${modalSamplePricing.isHoliday ? modalSamplePricing.holidayLabel : `⚡ เรตสด ${modalSamplePricing.formattedCheckin} (${modalSamplePricing.dayLabel})`}
                </span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">
                คัดสรรที่พักทำเลเด่น เดินทางสะดวก ใกล้แหล่งท่องเที่ยว • คำนวณราคาตามวันเช็คอินจริง (${modalSamplePricing.formattedCheckin})
              </p>
              <div class="modal-hotels-grid">
                ${item.nearbyHotels.map(h => {
                  const pricing = calculateDateAwareHotelPricing(h, selectedCheckinDate, selectedStayNights, selectedGuestCount);
                  
                  let badgeHtml = "";
                  if (h.promoBadge) {
                    badgeHtml = `<span class="hotel-rank-badge" style="background: #dc2626; color: white;">${h.promoBadge}</span>`;
                  } else if (pricing.isHoliday) {
                    badgeHtml = `<span class="hotel-rank-badge" style="background: #fff7ed; color: #ea580c; border: 1px solid #ea580c; font-weight: 800;">${pricing.holidayLabel}</span>`;
                  } else {
                    badgeHtml = `<span class="hotel-rank-badge" style="background: ${pricing.badgeBg}; color: ${pricing.badgeColor}; border: 1px solid ${pricing.badgeColor}; font-weight: 800;">${pricing.badgeText}</span>`;
                  }

                  return `
                    <div class="modal-hotel-card">
                      <div class="modal-hotel-header">
                        <div>
                          <div class="modal-hotel-name">${h.name}</div>
                          <div class="modal-hotel-jp">${h.japanese}</div>
                        </div>
                        <div style="display: flex; gap: 0.35rem; align-items: center;">
                          ${badgeHtml}
                          <span class="hotel-rating-badge">⭐ ${h.rating}</span>
                        </div>
                      </div>
                      <div class="modal-hotel-tags">
                        <span class="hotel-tag type">${h.type}</span>
                        <span class="hotel-tag distance">📍 ${h.distance}</span>
                      </div>
                      <p class="modal-hotel-highlight">${h.highlight}</p>
                      <div class="modal-hotel-footer">
                        <div class="modal-hotel-price">
                          <span class="price-range">คืนละ ¥${pricing.nightlyJPY.toLocaleString()} เยน (~${pricing.nightlyTHB.toLocaleString()} บ.)</span>
                          <strong class="price-thb">เริ่มต้น ~${pricing.nightlyTHB.toLocaleString()} บาท/คืน</strong>
                          <small style="font-size: 0.72rem; color: #047857; font-weight: 700; margin-top: 1px;">
                            🌙 รวม ${pricing.nights} คืน: ~${pricing.totalTHB.toLocaleString()} บาท (${pricing.guests} ท่าน)
                          </small>
                        </div>
                        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                          <a href="${pricing.googleHotelsUrl}" target="_blank" rel="noopener noreferrer" class="hotel-google-btn" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">
                            🗺️ Google Hotels (${pricing.formattedCheckin})
                          </a>
                          <a href="${pricing.agodaUrl}" target="_blank" rel="noopener noreferrer" class="hotel-agoda-btn" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">
                            🏨 Agoda (${pricing.nights} คืน)
                          </a>
                        </div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        })() : ''}

        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.65rem;">
          ${inPlanCount > 0 ? `
            <div style="background: #f0fdf4; border: 1.5px solid #86efac; padding: 0.65rem 1rem; border-radius: 10px; font-size: 0.85rem; color: #166534; font-weight: 700;">
              📍 มีอยู่ในแผนเที่ยวแล้ว <strong>${inPlanCount} ครั้ง</strong> (${instances.map(inst => `DAY ${inst.day || 1}${inst.time ? ' ' + inst.time + 'น.' : ''}`).join(", ")})
            </div>
            <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
              <button class="btn primary" id="modal-plan-add-repeat" style="background: #0284c7; color: white; padding: 0.75rem 1.25rem; font-weight: 800; border-radius: 10px; border: none; cursor: pointer;">
                ➕ เพิ่มสถานที่นี้อีกครั้ง (เช่น เที่ยววันที่ 2 หรือรอบค่ำ)
              </button>
              <button class="btn outline" id="modal-plan-remove-all" style="padding: 0.75rem 1rem; color: #dc2626; border-color: #fca5a5; font-weight: 700;">
                ✕ ลบออกจากแผนเที่ยว
              </button>
            </div>
          ` : `
            <div style="display: flex; gap: 0.75rem;">
              <button class="btn primary" id="modal-plan-toggle" style="padding: 0.75rem 1.25rem;">
                + เพิ่มลงในแผนการเดินทาง
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    const addRepeatBtn = document.getElementById("modal-plan-add-repeat");
    if (addRepeatBtn) {
      addRepeatBtn.addEventListener("click", () => {
        addItineraryDuplicate(item.id);
        detailModal.classList.remove("active");
      });
    }

    const removeAllBtn = document.getElementById("modal-plan-remove-all");
    if (removeAllBtn) {
      removeAllBtn.addEventListener("click", () => {
        removeAllInstancesOfPlace(item.id);
        detailModal.classList.remove("active");
      });
    }

    const toggleBtn = document.getElementById("modal-plan-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        toggleItineraryItem(item.id);
        detailModal.classList.remove("active");
      });
    }

    detailModal.classList.add("active");
  }

  // 8. Toggle / Duplicate / Remove Itinerary Items
  function toggleItineraryItem(id, targetDay = null) {
    const baseId = id ? id.split('_')[0] : "";
    const instances = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) === id || i.id === id || (i.baseId || i.id.split('_')[0]) === baseId);
    
    if (instances.length > 0) {
      if (instances.length === 1) {
        removeItineraryItemInstance(instances[0].id);
      } else {
        removeItineraryItemInstance(instances[instances.length - 1].id);
      }
    } else {
      const assignedDay = targetDay ? parseInt(targetDay, 10) : (itineraryList.length > 0 ? Math.max(...itineraryList.map(i => parseInt(i.day, 10) || 1)) : 1);
      const builtin = JAPAN_DATA.find(i => i.id === id || i.id === baseId);
      if (builtin) {
        itineraryList.push({
          id: builtin.id,
          baseId: builtin.id,
          title: builtin.title,
          tag: builtin.tag,
          cost: builtin.estimatedCost,
          region: builtin.region,
          japanese: builtin.japanese,
          day: assignedDay,
          time: ""
        });
      } else {
        const custom = customPlacesStore.find(i => i.id === id || i.id === baseId);
        if (custom) {
          itineraryList.push({
            id: custom.id,
            baseId: custom.id,
            title: custom.title,
            tag: custom.tag,
            cost: custom.cost,
            region: custom.region,
            japanese: custom.japanese,
            icon: custom.icon,
            isCustom: true,
            day: assignedDay,
            time: custom.time || ""
          });
        }
      }
      sortItineraryList();
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderCards();
      renderRouteSimulator();
    }
  }

  function addItineraryDuplicate(id, targetDay = null, targetTime = "") {
    const baseId = id ? id.split('_')[0] : "";
    const builtin = JAPAN_DATA.find(i => i.id === id || i.id === baseId);
    const custom = customPlacesStore.find(i => i.id === id || i.id === baseId);
    const base = builtin || custom;
    if (!base) return;

    // Find all current visits of this place
    const existingVisits = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) === base.id || i.id === base.id);
    let assignedDay = targetDay ? parseInt(targetDay, 10) : 1;
    if (!targetDay) {
      if (existingVisits.length > 0) {
        const lastDay = Math.max(...existingVisits.map(v => parseInt(v.day, 10) || 1));
        assignedDay = lastDay + 1;
      } else {
        assignedDay = itineraryList.length > 0 ? Math.max(...itineraryList.map(i => parseInt(i.day, 10) || 1)) : 1;
      }
    }

    const uniqueId = `${base.id}_v${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    itineraryList.push({
      id: uniqueId,
      baseId: base.id,
      title: base.title,
      tag: base.tag,
      cost: base.estimatedCost || base.cost,
      region: base.region,
      station: base.station,
      stayHours: base.stayHours,
      japanese: base.japanese,
      icon: base.icon,
      isCustom: !!custom,
      day: assignedDay,
      time: targetTime || ""
    });

    sortItineraryList();
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
    updateItineraryUI();
    renderCards();
    renderRouteSimulator();

    alert(`🎉 เพิ่ม "${base.title}" เข้าแผนเที่ยวอีกครั้งเรียบร้อยแล้ว!\n🗓️ กำหนดไว้ที่ DAY ${assignedDay} (คุณสามารถปรับเปลี่ยนวันและเวลาได้ในแถบแผนเที่ยวครับ)`);
  }

  function removeItineraryItemInstance(instanceId) {
    const idx = itineraryList.findIndex(i => i.id === instanceId);
    if (idx >= 0) {
      itineraryList.splice(idx, 1);
      sortItineraryList();
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderCards();
      renderRouteSimulator();
    }
  }

  function removeAllInstancesOfPlace(baseId) {
    itineraryList = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) !== baseId && i.id !== baseId);
    sortItineraryList();
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
    updateItineraryUI();
    renderCards();
    renderRouteSimulator();
  }

  function setItineraryItemDay(id, newDay) {
    const item = itineraryList.find(i => i.id === id);
    if (item) {
      item.day = parseInt(newDay, 10) || 1;
      sortItineraryList();
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderRouteSimulator();
    }
  }

  function setItineraryItemTime(id, newTime) {
    const item = itineraryList.find(i => i.id === id);
    if (item) {
      item.time = newTime;
      sortItineraryList();
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderRouteSimulator();
    }
  }

  function moveItineraryItemInList(id, direction) {
    const idx = itineraryList.findIndex(i => i.id === id);
    if (idx < 0) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= itineraryList.length) return;

    const temp = itineraryList[idx];
    itineraryList[idx] = itineraryList[targetIdx];
    itineraryList[targetIdx] = temp;

    // Sync day with target location's day if crossing day boundary
    if (itineraryList[idx] && itineraryList[targetIdx]) {
      itineraryList[targetIdx].day = itineraryList[idx].day || 1;
    }
    
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
    updateItineraryUI();
    renderRouteSimulator();
  }

  // 9. Update Itinerary Drawer UI with Day Grouping & Time Setting
  function updateItineraryUI() {
    if (itineraryCountBadge) itineraryCountBadge.textContent = itineraryList.length;
    if (drawerItemCount) drawerItemCount.textContent = `${itineraryList.length} รายการ`;
    const mobileDockBadge = document.getElementById("mobile-dock-badge");
    if (mobileDockBadge) mobileDockBadge.textContent = itineraryList.length;
    if (typeof updateProfileHubUI === "function") updateProfileHubUI();

    if (!itineraryItemsList) return;

    if (itineraryList.length === 0) {
      itineraryItemsList.innerHTML = `
        <div class="empty-itinerary">
          <span>🗾</span>
          <p>ยังไม่มีสถานที่ในแผนเที่ยว</p>
          <small>คลิกปุ่ม <strong>"+ เพิ่มในแผนเที่ยว"</strong> ที่การ์ดสถานที่ หรือกด <strong>"+ เพิ่มสถานที่เอง"</strong> ด้านบน</small>
        </div>
      `;
      if (estimatedBudgetTotal) estimatedBudgetTotal.textContent = "¥0 เยน (~0 บาท)";
      return;
    }

    sortItineraryList();

    // Group items by day
    const dayBuckets = {};
    itineraryList.forEach(item => {
      const d = parseInt(item.day, 10) || 1;
      if (!dayBuckets[d]) dayBuckets[d] = [];
      dayBuckets[d].push(item);
    });

    const dayNumbers = Object.keys(dayBuckets).map(Number).sort((a, b) => a - b);
    const maxDayInList = Math.max(3, ...dayNumbers, (selectedStayNights || 2));
    const availableDays = Array.from({ length: Math.max(maxDayInList + 1, 5) }, (_, i) => i + 1);

    let daysHtml = "";
    let globalCounter = 1;

    dayNumbers.forEach(day => {
      const dayItems = dayBuckets[day];

      daysHtml += `
        <div class="itinerary-day-block">
          <div class="itinerary-day-header">
            <span>🗓️ DAY ${day}</span>
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--text-muted);">${dayItems.length} จุดหมาย</span>
          </div>
          ${dayItems.map(item => {
            const isCustom = item.isCustom || item.id.startsWith("custom-");
            const icon = item.icon || (isCustom ? "📍" : "🗾");
            const num = globalCounter++;

            const baseId = item.baseId || item.id.split('_')[0];
            const allVisits = itineraryList.filter(x => (x.baseId || x.id.split('_')[0]) === baseId || x.id === baseId);
            const isDuplicate = allVisits.length > 1;
            const visitIdx = allVisits.findIndex(x => x.id === item.id) + 1;

            return `
              <div class="itinerary-item" data-id="${item.id}">
                <div class="itinerary-item-info">
                  <div class="itinerary-item-title" style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                    <span>${icon}</span>
                    <strong title="${item.title}">${num}. ${item.title}</strong>
                    ${isDuplicate ? `<span style="background: #e0f2fe; color: #0284c7; font-weight: 800; font-size: 0.7rem; padding: 1px 6px; border-radius: 6px;">รอบที่ ${visitIdx}/${allVisits.length}</span>` : ''}
                  </div>
                  <div class="itinerary-item-sub">
                    ${isCustom ? `<span style="background: #ecfdf5; color: #059669; font-weight: 700; padding: 1px 5px; border-radius: 6px; font-size: 0.7rem;">Custom</span> ` : ''}
                    ${item.tag || 'จุดหมาย'} • ${item.japanese || item.title}
                  </div>
                  <div class="itinerary-item-time-row" style="display: flex; align-items: center; gap: 6px; margin-top: 5px;">
                    <span style="font-size: 0.72rem; color: #0369a1; font-weight: 700;">🕒 เวลา:</span>
                    <input type="time" class="item-time-input" data-id="${item.id}" value="${item.time || ''}" title="ระบุเวลาของสถานที่นี้">
                  </div>
                </div>
                <div class="itinerary-item-actions">
                  <select class="item-day-select" data-id="${item.id}" title="ย้ายไปวันที่...">
                    ${availableDays.map(d => `
                      <option value="${d}" ${d === item.day ? 'selected' : ''}>DAY ${d}</option>
                    `).join("")}
                  </select>
                  <button type="button" class="duplicate-itinerary-btn" data-id="${item.id}" title="เพิ่มสถานที่นี้ซ้ำอีกครั้ง (เช่น ไปวันที่ 2 หรือรอบค่ำ)" style="background: #f0fdf4; color: #16a34a; border: 1px solid #86efac; border-radius: 6px; padding: 2px 6px; font-size: 0.72rem; font-weight: 800; cursor: pointer;">➕ ซ้ำ</button>
                  <button type="button" class="move-item-btn up" data-id="${item.id}" title="เลื่อนขึ้น">⬆️</button>
                  <button type="button" class="move-item-btn down" data-id="${item.id}" title="เลื่อนลง">⬇️</button>
                  <button type="button" class="remove-itinerary-btn" data-id="${item.id}" title="ลบออกจากแผน">&times;</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    });

    daysHtml += `
      <button type="button" class="add-new-day-btn" id="add-new-empty-day-btn">
        <span>➕</span> เพิ่มวันใหม่ (DAY ${dayNumbers.length > 0 ? Math.max(...dayNumbers) + 1 : 1})
      </button>
    `;

    itineraryItemsList.innerHTML = daysHtml;

    const estimatedJPY = itineraryList.length * 5500;
    const estimatedTHB = Math.round(estimatedJPY * currentExchangeRate);
    if (estimatedBudgetTotal) {
      estimatedBudgetTotal.textContent = `~¥${estimatedJPY.toLocaleString()} เยน (~${estimatedTHB.toLocaleString()} บาท)`;
    }

    // Attach Day change listener
    itineraryItemsList.querySelectorAll(".item-day-select").forEach(select => {
      select.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        const newDay = e.target.value;
        setItineraryItemDay(id, newDay);
      });
    });

    // Attach Time change listener
    itineraryItemsList.querySelectorAll(".item-time-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        const newTime = e.target.value;
        setItineraryItemTime(id, newTime);
      });
    });

    // Attach Duplicate
    itineraryItemsList.querySelectorAll(".duplicate-itinerary-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        addItineraryDuplicate(id);
      });
    });

    // Attach Move Up & Move Down
    itineraryItemsList.querySelectorAll(".move-item-btn.up").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        moveItineraryItemInList(id, -1);
      });
    });

    itineraryItemsList.querySelectorAll(".move-item-btn.down").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        moveItineraryItemInList(id, 1);
      });
    });

    // Attach Remove
    itineraryItemsList.querySelectorAll(".remove-itinerary-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        removeItineraryItemInstance(id);
      });
    });

    // Add New Day Button
    const addEmptyDayBtn = document.getElementById("add-new-empty-day-btn");
    if (addEmptyDayBtn) {
      addEmptyDayBtn.addEventListener("click", () => {
        if (customPlaceModal) {
          const nextD = dayNumbers.length > 0 ? Math.max(...dayNumbers) + 1 : 1;
          const dayInput = document.getElementById("custom-place-day");
          if (dayInput) dayInput.value = String(nextD);
          customPlaceModal.style.display = "flex";
        }
      });
    }
  }

  // ================= 10. Smart Custom Place & Hotspots Hub =================
  const customPlaceModal = document.getElementById("custom-place-modal");
  const openCustomPlaceBtnRoute = document.getElementById("open-custom-place-btn-route");
  const openCustomPlaceBtnDrawer = document.getElementById("open-custom-place-btn-drawer");
  const customModalCloseBtn = document.getElementById("custom-modal-close-btn");
  const customModalCancelBtn = document.getElementById("custom-modal-cancel-btn");
  const customModalSubmitBtn = document.getElementById("custom-modal-submit-btn");
  const customSearchInput = document.getElementById("custom-search-input");
  const customSearchTriggerBtn = document.getElementById("custom-search-trigger-btn");
  const customSearchResults = document.getElementById("custom-search-results");
  const customCategoryPills = document.getElementById("custom-category-pills");
  const customPlaceName = document.getElementById("custom-place-name");
  const customPlaceJapanese = document.getElementById("custom-place-japanese");
  const customPlaceRegion = document.getElementById("custom-place-region");
  const customPlaceStation = document.getElementById("custom-place-station");
  const customPlaceStay = document.getElementById("custom-place-stay");
  const customPlaceLat = document.getElementById("custom-place-lat");
  const customPlaceLng = document.getElementById("custom-place-lng");
  const customModalMsg = document.getElementById("custom-modal-msg");
  const customModalNavTabs = document.getElementById("custom-modal-nav-tabs");
  const hotspotFilterPills = document.getElementById("hotspot-filter-pills");
  const hotspotsGrid = document.getElementById("hotspots-grid");

  let selectedCategory = "hotel";
  let selectedCategoryIcon = "🏨";
  let currentHotspotFilter = "all";
  let searchDebounceTimer = null;

  // Universal helper to add any place (hotspot, search, pin, form) directly into the plan
  function addCustomPlaceToPlan(placeData, targetDay = null, allowDuplicate = true) {
    const rawId = placeData.id || `custom-place-${Date.now()}`;
    const canonicalId = getCanonicalPlaceId(rawId, placeData.title || placeData.name);
    const baseId = canonicalId || rawId.split('_')[0];

    // Check if canonical destination exists in JAPAN_DATA
    const canonInJapanData = JAPAN_DATA.find(j => j.id === baseId);
    if (canonInJapanData) {
      placeData.title = canonInJapanData.title;
      placeData.japanese = canonInJapanData.japanese;
      placeData.region = canonInJapanData.region;
      placeData.station = canonInJapanData.station || placeData.station;
      placeData.tag = canonInJapanData.tag || placeData.tag;
      placeData.stayHours = canonInJapanData.stayHours || placeData.stayHours;
    }

    const smart = resolveSmartStationAndRegion(placeData.title || placeData.name, placeData.lat, placeData.lng);
    const station = (placeData.station && placeData.station !== "สถานีใกล้เคียง" && placeData.station !== "จากการค้นหา") ? placeData.station : smart.station;
    const region = placeData.region || smart.region || "osaka";
    const tag = (placeData.tag && placeData.tag !== "จากการค้นหา" && placeData.tag !== "จุดหมายของฉัน") ? placeData.tag : smart.tag;
    const stayHours = placeData.stayHours || smart.stayHours || "1 - 2 ชม.";

    // Determine Day & Time
    const existingVisits = itineraryList.filter(i => {
      const iCanon = getCanonicalPlaceId(i.baseId || i.id, i.title || i.name);
      return iCanon === baseId || i.title === (placeData.title || placeData.name);
    });
    let assignedDay = targetDay ? parseInt(targetDay, 10) : (placeData.day ? parseInt(placeData.day, 10) : null);
    if (!assignedDay) {
      if (existingVisits.length > 0) {
        const lastDay = Math.max(...existingVisits.map(v => parseInt(v.day, 10) || 1));
        assignedDay = lastDay + 1;
      } else {
        assignedDay = itineraryList.length > 0 ? Math.max(...itineraryList.map(i => parseInt(i.day, 10) || 1)) : 1;
      }
    }
    const assignedTime = placeData.time || "";

    const customId = allowDuplicate ? `${baseId}_v${Date.now()}_${Math.random().toString(36).substr(2, 4)}` : baseId;

    const newPlace = {
      id: customId,
      baseId: baseId,
      title: placeData.title || placeData.name,
      japanese: placeData.japanese || placeData.title || placeData.name,
      region: region,
      tag: tag,
      icon: placeData.icon || "📍",
      cost: placeData.category === "hotel" ? "ค่าที่พัก" : (placeData.cost || "ค่ากิจกรรม/อาหาร"),
      station: station,
      stayHours: stayHours,
      lat: parseFloat(placeData.lat) || smart.lat,
      lng: parseFloat(placeData.lng) || smart.lng,
      isCustom: true,
      day: assignedDay,
      time: assignedTime
    };

    // 1. Save to customPlacesStore if not already there (deduplicating by canonical ID)
    const existingCpIdx = customPlacesStore.findIndex(cp => {
      const cpCanon = getCanonicalPlaceId(cp.id, cp.title || cp.name);
      return cpCanon === baseId || cp.id === baseId || cp.title === newPlace.title;
    });
    if (existingCpIdx >= 0) {
      customPlacesStore[existingCpIdx] = { ...newPlace, id: baseId };
    } else {
      customPlacesStore.push({ ...newPlace, id: baseId });
    }
    localStorage.setItem("nippon_custom_places", JSON.stringify(customPlacesStore));

    // 2. Register into ROUTE_SIMULATION_META for Leaflet mapping & timelines
    if (typeof ROUTE_SIMULATION_META !== "undefined") {
      ROUTE_SIMULATION_META[newPlace.id] = {
        lat: newPlace.lat,
        lng: newPlace.lng,
        icon: newPlace.icon,
        region: newPlace.region,
        station: newPlace.station,
        stayHours: newPlace.stayHours,
        bestTimeOfDay: assignedTime ? `${assignedTime} น.` : "ช่วงเวลาที่สะดวก",
        mapsName: newPlace.title
      };
      ROUTE_SIMULATION_META[baseId] = ROUTE_SIMULATION_META[newPlace.id];
    }

    // 3. Add to itineraryList
    itineraryList.push({
      id: newPlace.id,
      baseId: baseId,
      title: newPlace.title,
      tag: newPlace.tag,
      cost: newPlace.cost,
      region: newPlace.region,
      station: newPlace.station,
      stayHours: newPlace.stayHours,
      japanese: newPlace.japanese,
      icon: newPlace.icon,
      isCustom: true,
      day: assignedDay,
      time: assignedTime
    });

    sortItineraryList();
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));

    // 4. Switch to custom preset in Route Simulator so user immediately sees their place
    selectedRoutePresetId = "custom";

    updateItineraryUI();
    renderRouteSimulator();
    renderHotspotsGrid();
    renderCards();
  }

  // 1-Click Hotspots Catalog Renderer
  function renderHotspotsGrid() {
    if (!hotspotsGrid || typeof POPULAR_HOTSPOTS_DATA === "undefined") return;

    let list = POPULAR_HOTSPOTS_DATA;
    if (currentHotspotFilter !== "all") {
      list = POPULAR_HOTSPOTS_DATA.filter(h => h.category === currentHotspotFilter);
    }

    hotspotsGrid.innerHTML = list.map(h => {
      const instances = itineraryList.filter(i => (i.baseId || i.id.split('_')[0]) === h.id || i.id === h.id || i.title === h.name);
      const isAdded = instances.length > 0;
      return `
        <div class="hotspot-card">
          <div class="hotspot-card-top">
            <span class="hotspot-card-icon">${h.icon}</span>
            <div class="hotspot-card-title-group">
              <div class="hotspot-card-title">${h.name}</div>
              <div class="hotspot-card-jp">${h.japanese}</div>
              <div class="hotspot-card-station">📍 ${h.station}</div>
            </div>
          </div>
          <p class="hotspot-card-desc">${h.desc}</p>
          <div class="hotspot-card-bottom">
            <span class="hotspot-tag-badge">${h.tag}</span>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="hotspot-add-btn ${isAdded ? 'added' : ''}" data-hotspot-id="${h.id}">
                ${isAdded ? `✓ ในแผน (${instances.length})` : '+ เพิ่มเข้าทริป'}
              </button>
              ${isAdded ? `
                <button type="button" class="hotspot-repeat-btn" data-hotspot-id="${h.id}" title="เพิ่มสถานที่นี้อีกครั้ง (เช่น ไปวันที่ 2 หรือ 3)" style="padding: 2px 8px; font-size: 0.72rem; font-weight: 800; background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; border-radius: 6px; cursor: pointer;">
                  ➕ ซ้ำ
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join("");

    hotspotsGrid.querySelectorAll(".hotspot-add-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-hotspot-id");
        const found = POPULAR_HOTSPOTS_DATA.find(h => h.id === id);
        if (found) {
          addCustomPlaceToPlan({
            id: found.id,
            title: found.name,
            japanese: found.japanese,
            region: found.region,
            tag: found.tag,
            icon: found.icon,
            category: found.category,
            station: found.station,
            stayHours: found.stayHours,
            lat: found.lat,
            lng: found.lng
          });
        }
      });
    });

    hotspotsGrid.querySelectorAll(".hotspot-repeat-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-hotspot-id");
        const found = POPULAR_HOTSPOTS_DATA.find(h => h.id === id);
        if (found) {
          addCustomPlaceToPlan({
            id: found.id,
            title: found.name,
            japanese: found.japanese,
            region: found.region,
            tag: found.tag,
            icon: found.icon,
            category: found.category,
            station: found.station,
            stayHours: found.stayHours,
            lat: found.lat,
            lng: found.lng
          });
        }
      });
    });
  }

  // Hotspot Sub-filter Pills
  if (hotspotFilterPills) {
    hotspotFilterPills.querySelectorAll(".hotspot-filter-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        hotspotFilterPills.querySelectorAll(".hotspot-filter-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentHotspotFilter = e.currentTarget.getAttribute("data-hotspot-filter");
        renderHotspotsGrid();
      });
    });
  }

  // Tab Switcher
  if (customModalNavTabs) {
    customModalNavTabs.querySelectorAll(".custom-nav-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        customModalNavTabs.querySelectorAll(".custom-nav-tab").forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const targetTab = e.currentTarget.getAttribute("data-tab");
        
        document.querySelectorAll(".custom-tab-content").forEach(content => {
          content.style.display = "none";
        });
        const activeContent = document.getElementById(`tab-content-${targetTab}`);
        if (activeContent) activeContent.style.display = "block";

        if (targetTab === "hotspots") renderHotspotsGrid();
      });
    });
  }

  function openCustomPlaceModal(initialTab = "hotspots") {
    if (!customPlaceModal) return;
    customPlaceModal.style.display = "flex";
    
    // Switch to target tab
    if (customModalNavTabs) {
      customModalNavTabs.querySelectorAll(".custom-nav-tab").forEach(t => {
        if (t.getAttribute("data-tab") === initialTab) {
          t.click();
        }
      });
    }

    renderHotspotsGrid();

    if (customSearchInput) {
      customSearchInput.value = "";
    }
    if (customSearchResults) customSearchResults.style.display = "none";
    if (customModalMsg) customModalMsg.style.display = "none";
  }

  function closeCustomPlaceModal() {
    if (!customPlaceModal) return;
    customPlaceModal.style.display = "none";
    if (customSearchResults) customSearchResults.style.display = "none";
  }

  // Hook Modal Open Buttons
  if (openCustomPlaceBtnRoute) {
    openCustomPlaceBtnRoute.addEventListener("click", () => openCustomPlaceModal("hotspots"));
  }
  if (openCustomPlaceBtnDrawer) {
    openCustomPlaceBtnDrawer.addEventListener("click", () => {
      itineraryDrawer.classList.remove("open");
      openCustomPlaceModal("hotspots");
    });
  }
  if (customModalCloseBtn) customModalCloseBtn.addEventListener("click", closeCustomPlaceModal);
  if (customModalCancelBtn) customModalCancelBtn.addEventListener("click", closeCustomPlaceModal);
  if (customPlaceModal) {
    customPlaceModal.addEventListener("click", (e) => {
      if (e.target === customPlaceModal) closeCustomPlaceModal();
    });
  }

  // Category Selector Toggle for Tab 3 (Form)
  if (customCategoryPills) {
    customCategoryPills.querySelectorAll(".category-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        customCategoryPills.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        selectedCategory = e.currentTarget.getAttribute("data-category");
        selectedCategoryIcon = e.currentTarget.getAttribute("data-icon") || "📍";
      });
    });
  }

  // Thai to English/Japanese Geocoding Translation Dictionary
  const THAI_TO_EN_GEO_MAP = [
    { th: "วัดคัตสึโอจิ", en: "Katsuo-ji Temple Minoh Osaka" },
    { th: "คัตสึโอจิ", en: "Katsuo-ji Temple Minoh Osaka" },
    { th: "วัดดารุมะ", en: "Katsuo-ji Temple" },
    { th: "วัดคิโยมิสุเดระ", en: "Kiyomizu-dera Kyoto" },
    { th: "วัดคิโยมิสุ", en: "Kiyomizu-dera Kyoto" },
    { th: "วัดน้ำใส", en: "Kiyomizu-dera Kyoto" },
    { th: "วัดทอง", en: "Kinkaku-ji Kyoto" },
    { th: "คินคะคุจิ", en: "Kinkaku-ji Kyoto" },
    { th: "วัดเงิน", en: "Ginkaku-ji Kyoto" },
    { th: "กิงคะคุจิ", en: "Ginkaku-ji Kyoto" },
    { th: "วัดเซนโซจิ", en: "Senso-ji Asakusa Tokyo" },
    { th: "วัดอาซากุสะ", en: "Senso-ji Asakusa Tokyo" },
    { th: "ปราสาทโอซาก้า", en: "Osaka Castle" },
    { th: "ปราสาทฮิเมจิ", en: "Himeji Castle" },
    { th: "ปราสาทคุมาโมโตะ", en: "Kumamoto Castle" },
    { th: "ปราสาทนิโจ", en: "Nijo Castle Kyoto" },
    { th: "โตเกียวทาวเวอร์", en: "Tokyo Tower" },
    { th: "โตเกียวสกายทรี", en: "Tokyo Skytree" },
    { th: "ดิสนีย์แลนด์", en: "Tokyo Disneyland" },
    { th: "ดิสนีย์ซี", en: "Tokyo DisneySea" },
    { th: "ยูนิเวอร์แซล", en: "Universal Studios Japan" },
    { th: "ชิราคาวาโกะ", en: "Shirakawa-go Gifu" },
    { th: "คาวากุจิโกะ", en: "Lake Kawaguchiko" },
    { th: "เจดีย์ชูเรโตะ", en: "Chureito Pagoda Fujiyoshida" },
    { th: "ฮาโกเนะ", en: "Hakone Kanagawa" },
    { th: "โอตารุ", en: "Otaru Canal Hokkaido" },
    { th: "สวนกวางนารา", en: "Nara Park Todai-ji" },
    { th: "วัดโทไดจิ", en: "Todai-ji Temple Nara" },
    { th: "ศาลเจ้าสุมิโยชิ", en: "Sumiyoshi Taisha Osaka" },
    { th: "ศาลเจ้าดาไซฟุ", en: "Dazaifu Tenmangu Fukuoka" },
    { th: "ศาลเจ้ามิยาจิมะ", en: "Itsukushima Shrine Miyajima Hiroshima" },
    { th: "ป่าไผ่อาราชิยามะ", en: "Arashiyama Bamboo Grove Kyoto" },
    { th: "ตลาดคุโรมง", en: "Kuromon Ichiba Market Osaka" },
    { th: "ตลาดนิชิกิ", en: "Nishiki Market Kyoto" },
    { th: "ตลาดปลาสึกิจิ", en: "Tsukiji Outer Market Tokyo" },
    { th: "ทีมแล็บ", en: "teamLab Planets Tokyo" }
  ];

  function translateThaiSearchQuery(q) {
    let clean = q.trim();
    for (const item of THAI_TO_EN_GEO_MAP) {
      if (clean.includes(item.th)) {
        return item.en;
      }
    }
    let mapped = clean
      .replace(/วัด/g, " Temple ")
      .replace(/ศาลเจ้า/g, " Shrine ")
      .replace(/ปราสาท/g, " Castle ")
      .replace(/ตลาด/g, " Market ")
      .replace(/สวนสนุก/g, " Theme Park ")
      .replace(/สวน/g, " Park ")
      .replace(/สถานี/g, " Station ")
      .replace(/โรงแรม/g, " Hotel ")
      .replace(/หอคอย/g, " Tower ")
      .replace(/น้ำตก/g, " Falls ")
      .replace(/ยอดเขา/g, " Mount ")
      .replace(/ทะเลสาบ/g, " Lake ");
    return mapped.trim();
  }

  // OpenStreetMap Nominatim Auto-Search & Instant Local Smart Resolution Engine
  async function performCustomPlaceSearch(query) {
    if (!query || query.trim().length < 2) {
      if (customSearchResults) customSearchResults.style.display = "none";
      return;
    }

    const trimmed = query.trim();
    const cleanQ = trimmed.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');

    // 1. Direct Coordinate Match (e.g. "34.8658, 135.4912" or "@35.6895,139.6917")
    const coordMatch = trimmed.match(/@?(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lon = parseFloat(coordMatch[2]);
      if (lat >= 20 && lat <= 46 && lon >= 122 && lon <= 154) {
        if (customSearchResults) {
          customSearchResults.innerHTML = `
            <div class="custom-search-item" data-direct-coord="true">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="custom-search-item-title">📍 พิกัดระบุ: ${lat.toFixed(4)}, ${lon.toFixed(4)}</div>
                <button type="button" class="hotspot-add-btn" style="padding: 2px 8px; font-size: 0.72rem;">+ เพิ่มเข้าทริปทันที</button>
              </div>
              <div class="custom-search-item-address">คลิกเพื่อใช้พิกัดนี้บนแผนที่ญี่ปุ่น</div>
            </div>
          `;
          customSearchResults.style.display = "block";
          customSearchResults.querySelector(".custom-search-item")?.addEventListener("click", () => {
            const smart = resolveSmartStationAndRegion(`พิกัด ${lat.toFixed(3)}, ${lon.toFixed(3)}`, lat, lon);
            addCustomPlaceToPlan({
              id: `custom-coord-${Date.now()}`,
              title: `จุดปักหมุด (${lat.toFixed(3)}, ${lon.toFixed(3)})`,
              japanese: `GPS: ${lat.toFixed(3)}, ${lon.toFixed(3)}`,
              region: smart.region,
              tag: "พิกัดปักหมุด",
              icon: "📍",
              category: "spot",
              station: smart.station,
              stayHours: "1 - 2 ชม.",
              lat: lat,
              lng: lon
            });
            closeCustomPlaceModal();
          });
        }
        return;
      }
    }

    // 2. Clean URL if pasted from Google Maps
    let cleanSearchStr = trimmed;
    if (cleanSearchStr.includes("google.com/maps/place/")) {
      const placeMatch = cleanSearchStr.match(/place\/([^\/]+)/);
      if (placeMatch) cleanSearchStr = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    }

    // 3. Instant Local Smart Search (0ms) from KNOWN_JAPAN_PLACES_DICTIONARY, JAPAN_DATA & HOTSPOTS
    const localMatches = [];

    // A. Check KNOWN_JAPAN_PLACES_DICTIONARY
    KNOWN_JAPAN_PLACES_DICTIONARY.forEach(item => {
      const matchAlias = item.aliases && item.aliases.some(a => {
        const cleanA = a.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
        return cleanQ.includes(cleanA) || cleanA.includes(cleanQ);
      });
      const matchTitle = item.title.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '').includes(cleanQ);
      const matchJp = item.japanese && item.japanese.includes(trimmed);
      if (matchAlias || matchTitle || matchJp) {
        if (!localMatches.some(m => m.id === item.id || m.title === item.title)) {
          localMatches.push({
            id: item.id,
            title: item.title,
            japanese: item.japanese,
            region: item.region,
            station: item.station,
            tag: item.tag,
            icon: item.icon || "⛩️",
            stayHours: item.stayHours || "1.5 - 2 ชม.",
            lat: item.lat,
            lng: item.lng,
            source: "⚡ แนะนำตรงเป๊ะ (Smart Database)"
          });
        }
      }
    });

    // B. Check JAPAN_DATA
    if (typeof JAPAN_DATA !== "undefined") {
      JAPAN_DATA.forEach(card => {
        const cleanTitle = card.title.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
        const cleanKw = (card.keyword || '').toLowerCase();
        if (cleanTitle.includes(cleanQ) || cleanKw.includes(cleanQ) || (card.japanese && card.japanese.includes(trimmed))) {
          if (!localMatches.some(m => m.id === card.id || m.title === card.title)) {
            const meta = (typeof ROUTE_SIMULATION_META !== "undefined" && ROUTE_SIMULATION_META[card.id]) ? ROUTE_SIMULATION_META[card.id] : {};
            localMatches.push({
              id: card.id,
              title: card.title,
              japanese: card.japanese || card.title,
              region: card.region,
              station: meta.station || (card.transport ? card.transport.split(" (")[0].replace("🚶", "").replace("🚇", "").replace("🚆", "").trim() : "สถานีใกล้เคียง"),
              tag: card.tag || "สถานที่ท่องเที่ยว",
              icon: meta.icon || "🗾",
              stayHours: meta.stayHours || "2 - 3 ชม.",
              lat: meta.lat || 34.68,
              lng: meta.lng || 135.50,
              source: "🗾 สถานที่ในคู่มือ (Japan Guide)"
            });
          }
        }
      });
    }

    // C. Check POPULAR_HOTSPOTS_DATA
    if (typeof POPULAR_HOTSPOTS_DATA !== "undefined") {
      POPULAR_HOTSPOTS_DATA.forEach(h => {
        const cleanHName = h.name.toLowerCase().replace(/[\s\-_.,()'"/]+/g, '');
        if (cleanHName.includes(cleanQ) || (h.japanese && h.japanese.includes(trimmed))) {
          if (!localMatches.some(m => m.id === h.id || m.title === h.name)) {
            localMatches.push({
              id: h.id,
              title: h.name,
              japanese: h.japanese,
              region: h.region,
              station: h.station,
              tag: h.tag,
              icon: h.icon || "📍",
              stayHours: h.stayHours || "1.5 - 2 ชม.",
              lat: h.lat,
              lng: h.lng,
              source: "🌟 จุดยอดนิยม (Hotspot)"
            });
          }
        }
      });
    }

    // Render Immediate Local Results if found
    let initialHtml = "";
    if (localMatches.length > 0) {
      initialHtml = `
        <div style="padding: 4px 8px; font-size: 0.72rem; font-weight: 800; color: #059669; background: #ecfdf5; border-radius: 6px; margin-bottom: 6px;">
          ⚡ พบสถานที่ตรงกับคำค้นหาทันที (${localMatches.length} จุดหมาย):
        </div>
        ${localMatches.map((item, idx) => `
          <div class="custom-search-item local-match-item" data-local-idx="${idx}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div class="custom-search-item-title">${item.icon} ${item.title}</div>
              <button type="button" class="hotspot-add-btn" style="padding: 2px 8px; font-size: 0.72rem; background: #059669;">+ เพิ่มเข้าทริป</button>
            </div>
            <div class="custom-search-item-address">
              <span style="color: #059669; font-weight: 700;">${item.source}</span> • ${item.japanese} • 📍 ${item.station}
            </div>
          </div>
        `).join("")}
      `;
    } else {
      initialHtml = `<div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">🔄 กำลังค้นหาพิกัดบนแผนที่ญี่ปุ่น...</div>`;
    }

    if (customSearchResults) {
      customSearchResults.innerHTML = initialHtml;
      customSearchResults.style.display = "block";

      // Attach click listeners for instant local matches
      customSearchResults.querySelectorAll(".local-match-item").forEach(el => {
        el.addEventListener("click", () => {
          const lIdx = parseInt(el.getAttribute("data-local-idx"), 10);
          const sel = localMatches[lIdx];
          if (sel) {
            addCustomPlaceToPlan({
              id: sel.id,
              title: sel.title,
              japanese: sel.japanese,
              region: sel.region,
              tag: sel.tag,
              icon: sel.icon,
              station: sel.station,
              stayHours: sel.stayHours,
              lat: sel.lat,
              lng: sel.lng
            });
            closeCustomPlaceModal();
          }
        });
      });
    }

    // 4. Parallel OpenStreetMap Nominatim Live Geocoding with Thai-to-EN query translation
    try {
      const translatedQuery = translateThaiSearchQuery(cleanSearchStr);
      const queryToUse = (translatedQuery && translatedQuery !== cleanSearchStr) ? translatedQuery : cleanSearchStr;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryToUse)}&countrycodes=jp&limit=5&addressdetails=1`;
      
      const resp = await fetch(url, { headers: { "Accept-Language": "en,ja,th" } });
      const data = await resp.json();

      let externalHtml = "";
      if (data && data.length > 0) {
        externalHtml = `
          <div style="padding: 6px 8px 2px; font-size: 0.72rem; font-weight: 800; color: #0284c7; border-top: 1px dashed #cbd5e1; margin-top: 6px;">
            🌐 ผลการค้นหาพิกัดแผนที่ (OpenStreetMap Japan):
          </div>
          ${data.map((item, idx) => {
            const placeTitle = item.name || item.display_name.split(",")[0];
            const placeAddr = item.display_name;
            return `
              <div class="custom-search-item osm-match-item" data-osm-idx="${idx}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="custom-search-item-title">📍 ${placeTitle}</div>
                  <button type="button" class="hotspot-add-btn" style="padding: 2px 8px; font-size: 0.72rem;">+ เพิ่มทันที</button>
                </div>
                <div class="custom-search-item-address">${placeAddr}</div>
              </div>
            `;
          }).join("")}
        `;
      }

      if (customSearchResults) {
        if (localMatches.length === 0 && (!data || data.length === 0)) {
          customSearchResults.innerHTML = `
            <div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
              ❌ ไม่พบพิกัดโดยตรง — คุณสามารถสลับไปที่แท็บ "✍️ กรอกพิกัดเอง" ได้ครับ
            </div>
          `;
          return;
        }

        // Combine local results + OSM results
        customSearchResults.innerHTML = (localMatches.length > 0 ? initialHtml : "") + externalHtml;

        // Re-attach local listeners
        customSearchResults.querySelectorAll(".local-match-item").forEach(el => {
          el.addEventListener("click", () => {
            const lIdx = parseInt(el.getAttribute("data-local-idx"), 10);
            const sel = localMatches[lIdx];
            if (sel) {
              addCustomPlaceToPlan({
                id: sel.id,
                title: sel.title,
                japanese: sel.japanese,
                region: sel.region,
                tag: sel.tag,
                icon: sel.icon,
                station: sel.station,
                stayHours: sel.stayHours,
                lat: sel.lat,
                lng: sel.lng
              });
              closeCustomPlaceModal();
            }
          });
        });

        // Attach OSM listeners
        customSearchResults.querySelectorAll(".osm-match-item").forEach(itemEl => {
          itemEl.addEventListener("click", () => {
            const idx = parseInt(itemEl.getAttribute("data-osm-idx"), 10);
            const selected = data[idx];
            if (selected) {
              const placeTitle = selected.name || selected.display_name.split(",")[0];
              const lat = parseFloat(selected.lat);
              const lon = parseFloat(selected.lon);

              const smart = resolveSmartStationAndRegion(placeTitle, lat, lon);

              let station = smart.station;
              if (selected.address && (selected.address.subway || selected.address.railway || selected.address.station)) {
                station = `สถานี ${selected.address.subway || selected.address.railway || selected.address.station}`;
              }

              addCustomPlaceToPlan({
                id: `custom-search-${Date.now()}`,
                title: placeTitle,
                japanese: placeTitle,
                region: smart.region,
                tag: "จากการค้นหา",
                icon: "📍",
                category: "spot",
                station: station,
                stayHours: "1 - 2 ชม.",
                lat: lat,
                lng: lon
              });

              customSearchResults.style.display = "none";
              closeCustomPlaceModal();
            }
          });
        });
      }
    } catch (err) {
      console.warn("Geocoding external fetch note:", err);
      // If local matches exist, they remain visible!
    }
  }

  // Trigger search on typing (with debounce) and button click
  if (customSearchInput) {
    customSearchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounceTimer);
      const q = e.target.value;
      searchDebounceTimer = setTimeout(() => {
        performCustomPlaceSearch(q);
      }, 450);
    });

    customSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performCustomPlaceSearch(customSearchInput.value);
      }
    });
  }

  if (customSearchTriggerBtn) {
    customSearchTriggerBtn.addEventListener("click", () => {
      performCustomPlaceSearch(customSearchInput.value);
    });
  }

  // Handle Form Submission for Tab 3 (Form)
  if (customModalSubmitBtn) {
    customModalSubmitBtn.addEventListener("click", () => {
      const name = customPlaceName ? customPlaceName.value.trim() : "";
      if (!name) {
        if (customModalMsg) {
          customModalMsg.className = "custom-modal-msg error";
          customModalMsg.textContent = "⚠️ กรุณากรอกชื่อสถานที่";
          customModalMsg.style.display = "block";
        }
        if (customPlaceName) customPlaceName.focus();
        return;
      }

      const japanese = customPlaceJapanese ? customPlaceJapanese.value.trim() : name;
      const region = customPlaceRegion ? customPlaceRegion.value : "tokyo";
      const station = customPlaceStation ? (customPlaceStation.value.trim() || "สถานีใกล้เคียง") : "สถานีใกล้เคียง";
      const stayHours = customPlaceStay ? (customPlaceStay.value.trim() || "1 - 2 ชม.") : "1 - 2 ชม.";
      const lat = customPlaceLat ? (parseFloat(customPlaceLat.value) || 35.6895) : 35.6895;
      const lng = customPlaceLng ? (parseFloat(customPlaceLng.value) || 139.6917) : 139.6917;

      const customPlaceDay = document.getElementById("custom-place-day");
      const customPlaceTime = document.getElementById("custom-place-time");
      const chosenDay = customPlaceDay ? parseInt(customPlaceDay.value, 10) || 1 : 1;
      const chosenTime = customPlaceTime ? customPlaceTime.value : "";

      const categoryLabels = {
        hotel: "โรงแรมที่พัก",
        food: "ร้านอาหาร/คาเฟ่",
        shopping: "แหล่งช้อปปิ้ง",
        attraction: "จุดท่องเที่ยว",
        spot: "จุดแวะทั่วไป"
      };

      addCustomPlaceToPlan({
        id: `custom-place-${Date.now()}`,
        title: name,
        japanese: japanese || name,
        region: region,
        tag: categoryLabels[selectedCategory] || "จุดหมายของฉัน",
        icon: selectedCategoryIcon,
        category: selectedCategory,
        station: station,
        stayHours: stayHours,
        lat: lat,
        lng: lng,
        day: chosenDay,
        time: chosenTime
      }, chosenDay);

      closeCustomPlaceModal();

      const routeSection = document.getElementById("route-simulator");
      if (routeSection) {
        routeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================= Event Listeners =================

  // Search & Clear
  if (searchInput && clearSearchBtn) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      clearSearchBtn.style.display = searchQuery ? "block" : "none";
      currentCardPage = 1;
      renderCards();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      currentCardPage = 1;
      renderCards();
    });
  }

  // Season Filter Pills
  if (seasonPills) {
    seasonPills.querySelectorAll(".pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        seasonPills.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentSeason = e.currentTarget.getAttribute("data-season");
        selectedHotelSeason = currentSeason;
        currentCardPage = 1;
        renderCards();
        renderHotelGuide();
      });
    });
  }

  // Region Filter Pills
  if (regionPills) {
    regionPills.querySelectorAll(".pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        regionPills.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentRegion = e.currentTarget.getAttribute("data-region");
        currentCardPage = 1;
        renderCards();
      });
    });
  }

  // Category Tabs
  if (categoryTabs) {
    categoryTabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        categoryTabs.forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentCategory = e.currentTarget.getAttribute("data-category");
        currentCardPage = 1;
        renderCards();
      });
    });
  }

  // Analytics Season Tabs
  analyticsSeasonTabs.querySelectorAll(".analytics-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      analyticsSeasonTabs.querySelectorAll(".analytics-tab-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentAnalyticsSeason = e.currentTarget.getAttribute("data-analytics-season");
      renderSeasonAnalytics();
    });
  });

  // Budget Calculator: Days Selector
  daysSelector.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      daysSelector.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCalcDays = parseInt(e.currentTarget.getAttribute("data-days"), 10);
      renderBudgetCalculator();
    });
  });

  // Budget Calculator: Style Selector
  styleSelector.querySelectorAll(".style-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      styleSelector.querySelectorAll(".style-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCalcStyleIndex = parseInt(e.currentTarget.getAttribute("data-style-index"), 10);
      renderBudgetCalculator();
    });
  });

  // Modal Controls
  if (modalCloseBtn && detailModal) {
    modalCloseBtn.addEventListener("click", () => detailModal.classList.remove("active"));
  }
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) detailModal.classList.remove("active");
    });
  }

  // Drawer Controls
  if (navItineraryBtn && itineraryDrawer) {
    navItineraryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      itineraryDrawer.classList.add("open");
    });
  }
  if (drawerCloseBtn && itineraryDrawer) {
    drawerCloseBtn.addEventListener("click", () => itineraryDrawer.classList.remove("open"));
  }
  if (clearItineraryBtn) {
    clearItineraryBtn.addEventListener("click", () => {
      if (confirm("คุณต้องการล้างแผนการเดินทางทั้งหมดใช่หรือไม่?")) {
        itineraryList = [];
        localStorage.setItem("nippon_itinerary", "[]");
        updateItineraryUI();
        renderCards();
      }
    });
  }

  // ================= 11. Konbini Gourmet & Souvenirs Renderer =================
  let currentKonbiniFilter = "all";
  const konbiniGrid = document.getElementById("konbini-grid");
  const konbiniTabs = document.getElementById("konbini-tabs");

  function renderKonbiniAndSouvenirs() {
    let itemsHtml = "";

    if (currentKonbiniFilter === "souvenirs") {
      itemsHtml = SOUVENIRS_DATA.map(item => `
        <div class="konbini-card">
          <div class="konbini-img-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'">
            <span class="konbini-store-badge" style="background-color: #8b5cf6;">🎁 ของฝากยอดฮิต</span>
          </div>
          <div class="konbini-body">
            <h4 class="konbini-title">${item.name}</h4>
            <span class="konbini-jp">${item.japanese}</span>
            <div class="konbini-price">ราคา: ${item.priceRange}</div>
            <p class="konbini-desc">${item.desc}</p>
            <div class="konbini-tips">📍 <strong>แหล่งซื้อ:</strong> ${item.whereToBuy}</div>
          </div>
        </div>
      `).join("");
    } else {
      let list = KONBINI_DATA;
      if (currentKonbiniFilter !== "all") {
        list = KONBINI_DATA.filter(k => k.store === currentKonbiniFilter);
      }

      itemsHtml = list.map(item => `
        <div class="konbini-card">
          <div class="konbini-img-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80'">
            <span class="konbini-store-badge" style="background-color: ${item.badgeColor};">${item.storeName}</span>
          </div>
          <div class="konbini-body">
            <h4 class="konbini-title">${item.name}</h4>
            <span class="konbini-jp">${item.japanese}</span>
            <div class="konbini-price">${item.priceJPY}</div>
            <p class="konbini-desc">${item.description}</p>
            <div class="konbini-tips">💡 <strong>ทิปส์:</strong> ${item.tips}</div>
          </div>
        </div>
      `).join("");
    }

    konbiniGrid.innerHTML = itemsHtml;
  }

  konbiniTabs.querySelectorAll(".konbini-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      konbiniTabs.querySelectorAll(".konbini-tab-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentKonbiniFilter = e.currentTarget.getAttribute("data-konbini-filter");
      renderKonbiniAndSouvenirs();
    });
  });

  // ================= 12. Currency Converter & Tax-Free Logic =================
  // ================= 12. Currency Converter, Store Coupons & Tax-Free Hub =================
  let currentExchangeRate = parseFloat(localStorage.getItem("nippon_exchange_rate")) || 0.235;
  let selectedStoreCoupon = "tax_only";
  let customCouponDiscountPercent = 5;

  const JAPAN_POPULAR_PRICES_DATA = [
    { icon: "🥫", name: "ชาเขียว/น้ำดื่มตู้หยอดเหรียญ", jpy: 160, desc: "เครื่องดื่มเย็น/ร้อน" },
    { icon: "🍙", name: "ข้าวปั้นโอนิกิริ & แซนด์วิช 7-11", jpy: 300, desc: "ของกินเล่นร้านสะดวกซื้อ" },
    { icon: "☕", name: "กาแฟสตาร์บัคส์ / คาเฟ่ญี่ปุ่น", jpy: 650, desc: "Starbucks / Doutor" },
    { icon: "🍜", name: "อิจิรันราเมงข้อสอบ / ราเมง 1 ชาม", jpy: 1080, desc: "Ichiran / Ippudo Ramen" },
    { icon: "🥩", name: "ข้าวหน้าเนื้อวากิว / ปิ้งย่างกลางวัน", jpy: 2200, desc: "เซ็ตมื้อเที่ยงสุดคุ้ม" },
    { icon: "🍣", name: "ซูชิสายพานพรีเมียม / บุฟเฟต์", jpy: 3500, desc: "มื้อเย็นจุใจ" },
    { icon: "🛍️", name: "ช้อปปิ้งดองกี้ขั้นต่ำเริ่ม Tax-Free", jpy: 5500, desc: "เริ่มลดภาษี 10% ได้ทันที" },
    { icon: "🧴", name: "สกินแคร์ Matsumoto Kiyoshi เซ็ตยอดฮิต", jpy: 10000, desc: "ลด Tax-Free 10% + คูปอง 5%" },
    { icon: "👟", name: "รองเท้า Onitsuka Tiger / เสื้อผ้า Uniqlo", jpy: 18000, desc: "รองเท้าผ้าใบยอดฮิต" },
    { icon: "🎮", name: "Nintendo Switch OLED / เกมคอนโซล", jpy: 37980, desc: "เครื่องเล่นเกมพกพา" },
    { icon: "💨", name: "ไดร์เป่าผม Dyson Supersonic", jpy: 48800, desc: "Bic Camera ลด 10% + 7%" },
    { icon: "📷", name: "กล้อง Sony Alpha / เลนส์ยอดฮิต", jpy: 120000, desc: "อุปกรณ์ถ่ายภาพระดับโปร" }
  ];

  const inputJpy = document.getElementById("input-jpy");
  const inputThb = document.getElementById("input-thb");
  const currentRateDisplay = document.getElementById("current-rate-display");
  const customRateInput = document.getElementById("custom-rate-input");
  const resetRateDefaultBtn = document.getElementById("reset-rate-default-btn");
  const taxQualifyBadge = document.getElementById("tax-qualify-badge");
  const taxGrossPrice = document.getElementById("tax-gross-price");
  const taxRefundAmount = document.getElementById("tax-refund-amount");
  const couponDiscountRow = document.getElementById("coupon-discount-row");
  const couponDiscountLabel = document.getElementById("coupon-discount-label");
  const couponDiscountAmount = document.getElementById("coupon-discount-amount");
  const taxSavedPrice = document.getElementById("tax-saved-price");
  const taxNetPrice = document.getElementById("tax-net-price");
  const storeSelectedBadge = document.getElementById("store-selected-badge");
  const storeCouponGrid = document.getElementById("store-coupon-grid");
  const customDiscountInline = document.getElementById("custom-discount-inline");
  const customDiscountPercentInput = document.getElementById("custom-discount-percent-input");
  const quickPriceGrid = document.getElementById("quick-price-grid");

  function setGlobalExchangeRate(rate, updateInput = true) {
    if (isNaN(rate) || rate <= 0) return;
    currentExchangeRate = rate;
    localStorage.setItem("nippon_exchange_rate", currentExchangeRate.toString());

    if (customRateInput && updateInput) {
      customRateInput.value = currentExchangeRate;
    }
    if (currentRateDisplay) {
      currentRateDisplay.textContent = (currentExchangeRate * 100).toFixed(2);
    }

    // Highlight matching preset chip if any
    document.querySelectorAll(".rate-chip").forEach(chip => {
      const chipRate = parseFloat(chip.getAttribute("data-rate"));
      if (Math.abs(chipRate - currentExchangeRate) < 0.0001) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });

    updateCurrencyCalculations("jpy");
    renderQuickPriceTable();

    if (typeof renderHotelGuide === "function") {
      try { renderHotelGuide(); } catch(e) {}
    }
    if (typeof renderRouteSimulator === "function") {
      try { renderRouteSimulator(); } catch(e) {}
    }
    if (typeof calculateJRPassROI === "function") {
      try { calculateJRPassROI(); } catch(e) {}
    }
    if (typeof updateItineraryUI === "function") {
      try { updateItineraryUI(); } catch(e) {}
    }
  }

  function updateCurrencyCalculations(source) {
    if (!inputJpy || !inputThb) return;
    const jpyVal = parseFloat(inputJpy.value) || 0;

    if (source === "jpy") {
      const thbVal = Math.round(jpyVal * currentExchangeRate);
      inputThb.value = thbVal;
    } else if (source === "thb") {
      const thbVal = parseFloat(inputThb.value) || 0;
      const jpyCalc = Math.round(thbVal / currentExchangeRate);
      inputJpy.value = jpyCalc;
    }

    const currentJPY = parseFloat(inputJpy.value) || 0;
    const grossTHB = Math.round(currentJPY * currentExchangeRate);
    if (taxGrossPrice) taxGrossPrice.textContent = `¥${currentJPY.toLocaleString()} เยน (~${grossTHB.toLocaleString()} บาท)`;

    if (currentJPY >= 5000) {
      const taxRefundJPY = Math.round(currentJPY - (currentJPY / 1.10));
      const taxRefundTHB = Math.round(taxRefundJPY * currentExchangeRate);
      const baseExTaxJPY = currentJPY - taxRefundJPY;

      let couponPercent = 0;
      let couponLabelText = "คูปองส่วนลด";
      let couponNote = "";

      if (selectedStoreCoupon === "donki") {
        if (baseExTaxJPY >= 30000) {
          couponPercent = 7;
          couponLabelText = "คูปอง Don Quijote (ลดเพิ่ม 7% ยอด ≥ ¥30,000)";
        } else if (baseExTaxJPY >= 10000) {
          couponPercent = 5;
          couponLabelText = "คูปอง Don Quijote (ลดเพิ่ม 5% ยอด ≥ ¥10,000)";
        } else {
          couponPercent = 0;
          couponNote = " (ดองกี้ต้องยอดรวม ≥ ¥10,000 เพื่อรับคูปองเพิ่ม 5%)";
          couponLabelText = "คูปอง Don Quijote" + couponNote;
        }
      } else if (selectedStoreCoupon === "bic_camera") {
        couponPercent = 7;
        couponLabelText = "คูปอง Bic Camera / Yodobashi (ลดเพิ่ม 7%)";
      } else if (selectedStoreCoupon === "matsukiyo") {
        if (baseExTaxJPY >= 10000) {
          couponPercent = 5;
          couponLabelText = "คูปอง Matsumoto Kiyoshi (ลดเพิ่ม 5% ยอด ≥ ¥10,000)";
        } else {
          couponPercent = 0;
          couponNote = " (ต้องยอดรวม ≥ ¥10,000 เพื่อรับคูปองเพิ่ม 5%)";
          couponLabelText = "คูปอง Matsumoto Kiyoshi" + couponNote;
        }
      } else if (selectedStoreCoupon === "department") {
        couponPercent = 5;
        couponLabelText = "ห้างสรรพสินค้า Guest Card (ลดเพิ่ม 5%)";
      } else if (selectedStoreCoupon === "custom") {
        couponPercent = customCouponDiscountPercent;
        couponLabelText = `คูปองส่วนลดพิเศษที่คุณระบุ (${couponPercent}%)`;
      }

      const couponDiscountJPY = Math.round(baseExTaxJPY * (couponPercent / 100));
      const couponDiscountTHB = Math.round(couponDiscountJPY * currentExchangeRate);
      const totalSavedJPY = taxRefundJPY + couponDiscountJPY;
      const totalSavedTHB = Math.round(totalSavedJPY * currentExchangeRate);
      const finalNetJPY = Math.max(0, currentJPY - totalSavedJPY);
      const finalNetTHB = Math.round(finalNetJPY * currentExchangeRate);
      const savedPercent = ((totalSavedJPY / currentJPY) * 100).toFixed(1);

      if (taxQualifyBadge) {
        if (couponPercent > 0) {
          taxQualifyBadge.textContent = `✓ ลด Tax-Free 10% + ได้ส่วนลดคูปองเพิ่ม ${couponPercent}%!`;
          taxQualifyBadge.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
          taxQualifyBadge.style.color = "#047857";
        } else {
          taxQualifyBadge.textContent = "✓ ช้อปครบ 5,000 เยน ทำ Tax-Free 10% ได้ทันที!";
          taxQualifyBadge.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
          taxQualifyBadge.style.color = "#059669";
        }
      }

      if (taxRefundAmount) taxRefundAmount.textContent = `-¥${taxRefundJPY.toLocaleString()} เยน (~${taxRefundTHB.toLocaleString()} บาท)`;

      if (couponDiscountRow && couponDiscountAmount && couponDiscountLabel) {
        if (selectedStoreCoupon !== "tax_only") {
          couponDiscountRow.style.display = "flex";
          couponDiscountLabel.textContent = `หัก${couponLabelText}:`;
          couponDiscountAmount.textContent = couponDiscountJPY > 0 ? `-¥${couponDiscountJPY.toLocaleString()} เยน (~${couponDiscountTHB.toLocaleString()} บาท)` : `¥0 เยน (ยอดไม่ถึงเกณฑ์)`;
        } else {
          couponDiscountRow.style.display = "none";
        }
      }

      if (taxSavedPrice) {
        taxSavedPrice.textContent = `-¥${totalSavedJPY.toLocaleString()} เยน (~${totalSavedTHB.toLocaleString()} บาท) (ประหยัดไป ${savedPercent}%)`;
      }
      if (taxNetPrice) {
        taxNetPrice.textContent = `¥${finalNetJPY.toLocaleString()} เยน (~${finalNetTHB.toLocaleString()} บาท)`;
      }
    } else {
      // Gross < 5,000 JPY
      if (taxQualifyBadge) {
        taxQualifyBadge.textContent = `⚠️ ยอดไม่ถึง ¥5,000 (ยังทำ Tax-Free ไม่ได้ ขาดอีก ¥${(5000 - currentJPY).toLocaleString()})`;
        taxQualifyBadge.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        taxQualifyBadge.style.color = "#dc2626";
      }

      if (taxRefundAmount) taxRefundAmount.textContent = `¥0 เยน (~0 บาท)`;
      if (couponDiscountRow) couponDiscountRow.style.display = "none";
      if (taxSavedPrice) taxSavedPrice.textContent = `¥0 เยน (ซื้อเพิ่มอีก ¥${(5000 - currentJPY).toLocaleString()} เพื่อลดภาษี)`;
      if (taxNetPrice) taxNetPrice.textContent = `¥${currentJPY.toLocaleString()} เยน (~${grossTHB.toLocaleString()} บาท)`;
    }
  }

  function renderQuickPriceTable() {
    if (!quickPriceGrid) return;
    quickPriceGrid.innerHTML = JAPAN_POPULAR_PRICES_DATA.map(item => {
      const thb = Math.round(item.jpy * currentExchangeRate);
      return `
        <div class="quick-price-item" data-jpy="${item.jpy}" title="คลิกเพื่อนำยอด ¥${item.jpy.toLocaleString()} ไปคำนวณ">
          <div class="quick-price-title-col">
            <span style="font-size: 1.15rem;">${item.icon}</span>
            <div>
              <div class="quick-price-title-text">${item.name}</div>
              <div class="quick-price-thb-sub">${item.desc} • ~${thb.toLocaleString()} บาท</div>
            </div>
          </div>
          <span class="quick-price-jpy-badge">¥${item.jpy.toLocaleString()}</span>
        </div>
      `;
    }).join("");

    quickPriceGrid.querySelectorAll(".quick-price-item").forEach(el => {
      el.addEventListener("click", (e) => {
        const jpy = parseFloat(e.currentTarget.getAttribute("data-jpy"));
        if (!isNaN(jpy) && inputJpy) {
          inputJpy.value = jpy;
          updateCurrencyCalculations("jpy");
          const calcCard = document.querySelector(".currency-calculator-card");
          if (calcCard) calcCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });
  }

  // Bind Stepper Buttons
  document.querySelectorAll(".amount-stepper-btn[data-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const addVal = parseInt(e.currentTarget.getAttribute("data-add"), 10);
      const cur = parseFloat(inputJpy.value) || 0;
      inputJpy.value = cur + addVal;
      updateCurrencyCalculations("jpy");
    });
  });

  const clearJpyAmountBtn = document.getElementById("clear-jpy-amount-btn");
  if (clearJpyAmountBtn) {
    clearJpyAmountBtn.addEventListener("click", () => {
      if (inputJpy) inputJpy.value = 0;
      updateCurrencyCalculations("jpy");
    });
  }

  // Bind Store Coupon Cards
  if (storeCouponGrid) {
    storeCouponGrid.querySelectorAll(".store-coupon-card").forEach(card => {
      card.addEventListener("click", (e) => {
        storeCouponGrid.querySelectorAll(".store-coupon-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectedStoreCoupon = card.getAttribute("data-store");

        if (selectedStoreCoupon === "custom") {
          if (customDiscountInline) customDiscountInline.style.display = "inline-flex";
          if (storeSelectedBadge) storeSelectedBadge.textContent = `✏️ ส่วนลดระบุเอง (${customCouponDiscountPercent}%)`;
        } else {
          if (customDiscountInline) customDiscountInline.style.display = "none";
          const storeName = card.querySelector(".store-card-name")?.textContent || "คูปองร้านค้า";
          if (storeSelectedBadge) storeSelectedBadge.textContent = `🛍️ ${storeName}`;
        }

        updateCurrencyCalculations("jpy");
      });
    });
  }

  if (customDiscountPercentInput) {
    customDiscountPercentInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0) {
        customCouponDiscountPercent = val;
        if (storeSelectedBadge && selectedStoreCoupon === "custom") {
          storeSelectedBadge.textContent = `✏️ ส่วนลดระบุเอง (${customCouponDiscountPercent}%)`;
        }
        updateCurrencyCalculations("jpy");
      }
    });
  }

  // Initial rate setup
  if (customRateInput) {
    customRateInput.value = currentExchangeRate;
    customRateInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        setGlobalExchangeRate(val, false);
      }
    });
  }

  if (currentRateDisplay) {
    currentRateDisplay.textContent = (currentExchangeRate * 100).toFixed(2);
  }

  if (resetRateDefaultBtn) {
    resetRateDefaultBtn.addEventListener("click", () => {
      setGlobalExchangeRate(0.235, true);
    });
  }

  if (inputJpy) inputJpy.addEventListener("input", () => updateCurrencyCalculations("jpy"));
  if (inputThb) inputThb.addEventListener("input", () => updateCurrencyCalculations("thb"));

  document.querySelectorAll(".rate-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      const rate = parseFloat(e.currentTarget.getAttribute("data-rate"));
      setGlobalExchangeRate(rate, true);
    });
  });

  // Initial render of Quick Price Table
  renderQuickPriceTable();

  // ================= 12.1 Real-Time Live Sync & Dynamic Seasonal Pricing Engine =================
  const DEFAULT_GOOGLE_SHEET_ID = "1TORgRDsPN0DH3ZAaSBibtZPw7FRzIg8r9fnYZlsxQhw";
  let GOOGLE_SHEET_ID = localStorage.getItem("nippon_google_sheet_id") || DEFAULT_GOOGLE_SHEET_ID;
  let liveSheetData = {};
  let isGoogleSheetConnected = false;

  function updateLiveStatusBadges(rate) {
    const liveRateText = document.getElementById("live-rate-status-text");
    const liveSeasonText = document.getElementById("live-season-status-text");

    if (liveRateText) {
      const per100 = (rate * 100).toFixed(2);
      liveRateText.textContent = `⚡ เรตสดวันนี้: 100 JPY ≈ ${per100} THB`;
    }

    if (liveSeasonText) {
      if (isGoogleSheetConnected) {
        liveSeasonText.textContent = `🟢 เชื่อมต่อ Google Sheets สด (Auto-Synced)`;
        liveSeasonText.style.color = "#047857";
      } else {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const dayOfWeek = now.getDay();

        let seasonName = "ฤดูหนาว (Winter)";
        let tierNote = "วันธรรมดา (Regular)";

        if (month >= 3 && month <= 5) {
          seasonName = "ฤดูใบไม้ผลิ 🌸 (Spring)";
        } else if (month >= 6 && month <= 8) {
          seasonName = "ฤดูร้อน ☀️ (Summer)";
        } else if (month >= 9 && month <= 11) {
          seasonName = "ใบไม้เปลี่ยนสี 🍁 (Autumn)";
        }

        const isSakuraPeak = (month === 3 && day >= 20) || (month === 4 && day <= 15);
        const isGoldenWeek = (month === 4 && day >= 29) || (month === 5 && day <= 6);
        const isObon = (month === 8 && day >= 10 && day <= 18);
        const isNewYear = (month === 12 && day >= 28) || (month === 1 && day <= 5);

        if (isSakuraPeak || isGoldenWeek || isObon || isNewYear) {
          tierNote = "🔥 ช่วงไฮซีซั่นพีค (Peak Holiday)";
        } else if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5) {
          tierNote = "🎉 สุดสัปดาห์ (Weekend)";
        }

        liveSeasonText.textContent = `🗓️ ปฏิทิน: ${seasonName} • ${tierNote}`;
      }
    }
  }

  async function fetchLiveExchangeRate() {
    if (typeof fetch === "undefined") return;
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/JPY");
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && data.rates.THB) {
          const liveRate = parseFloat(data.rates.THB.toFixed(4));
          setGlobalExchangeRate(liveRate, true);
          updateLiveStatusBadges(liveRate);
        }
      }
    } catch (e) {
      updateLiveStatusBadges(currentExchangeRate);
    }
  }

  async function fetchGoogleSheetsPrices(sheetId) {
    if (typeof fetch === "undefined") return;
    const targetId = sheetId || GOOGLE_SHEET_ID;
    if (!targetId) return;

    try {
      const url = `https://docs.google.com/spreadsheets/d/${targetId}/gviz/tq?tqx=out:json`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
        if (jsonMatch && jsonMatch[1]) {
          const parsed = JSON.parse(jsonMatch[1]);
          const rows = parsed.table.rows;

          rows.forEach(r => {
            const c = r.c;
            if (c && c[0] && c[0].v) {
              const itemId = String(c[0].v).trim();
              const price = c[3] ? parseFloat(c[3].v) : 0;
              const discount = c[4] ? parseFloat(c[4].v) : 0;
              const promoBadge = c[5] ? String(c[5].v) : "";
              const notes = c[6] ? String(c[6].v) : "";

              liveSheetData[itemId] = {
                priceJPY: price,
                discountPercent: discount,
                promoBadge: promoBadge,
                notes: notes
              };
            }
          });

          isGoogleSheetConnected = true;
          updateLiveStatusBadges(currentExchangeRate);
          applyLiveSheetPrices();
        }
      }
    } catch (err) {
      console.warn("Live sheet sync notice:", err);
    }
  }

  function applyLiveSheetPrices() {
    if (liveSheetData["config_exchange_rate"] && liveSheetData["config_exchange_rate"].priceJPY > 0) {
      setGlobalExchangeRate(liveSheetData["config_exchange_rate"].priceJPY, true);
    }

    // Override nearbyHotels in JAPAN_DATA
    if (typeof JAPAN_DATA !== "undefined") {
      JAPAN_DATA.forEach(item => {
        if (item.nearbyHotels && item.nearbyHotels.length > 0) {
          item.nearbyHotels.forEach(h => {
            const hNameLower = h.name.toLowerCase();
            Object.keys(liveSheetData).forEach(sheetKey => {
              const sheetItem = liveSheetData[sheetKey];
              const keyWords = sheetKey.replace("hotel-", "").split("-");
              const isMatch = keyWords.every(w => hNameLower.includes(w));

              if (isMatch && sheetItem.priceJPY > 0) {
                const finalPrice = Math.round(sheetItem.priceJPY * (1 - (sheetItem.discountPercent / 100)));
                h.priceJPY = finalPrice;
                h.priceRange = `¥${finalPrice.toLocaleString()} / คืน`;
                if (sheetItem.promoBadge && sheetItem.promoBadge !== "") {
                  h.promoBadge = sheetItem.promoBadge;
                }
              }
            });
          });
        }
      });
    }

    if (typeof renderHotelGuide === "function") renderHotelGuide();
    if (typeof renderThemeParkTickets === "function") renderThemeParkTickets();
  }

  // Auto trigger live currency fetch on load
  fetchLiveExchangeRate();
  if (GOOGLE_SHEET_ID) {
    fetchGoogleSheetsPrices(GOOGLE_SHEET_ID);
  }

  // ================= 13. Japanese Phrasebook Audio Renderer =================
  const phrasebookGrid = document.getElementById("phrasebook-grid");

  function renderPhrasebook() {
    phrasebookGrid.innerHTML = TRAVEL_PHRASES_DATA.map(cat => `
      <div class="phrase-category-card">
        <div class="phrase-category-header">${cat.categoryName}</div>
        <div class="phrase-list">
          ${cat.phrases.map(p => `
            <div class="phrase-item-row">
              <div class="phrase-text-col">
                <div class="phrase-th">${p.th}</div>
                <div class="phrase-jp">${p.jp}</div>
                <div class="phrase-romaji">${p.romaji}</div>
              </div>
              <button class="speak-btn" data-speak="${p.speak}" title="กดเพื่อฟังเสียงออกเสียงภาษาญี่ปุ่น">🔊</button>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    phrasebookGrid.querySelectorAll(".speak-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const text = e.currentTarget.getAttribute("data-speak");
        playJapaneseSpeech(text);
      });
    });
  }

  function playJapaneseSpeech(text) {
    if (!('speechSynthesis' in window)) {
      alert("ขออภัย อุปกรณ์ของคุณไม่รองรับฟังก์ชัน Text-to-Speech");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  // ================= 14. Pre-Flight Checklist Logic =================
  let checklistCompleted = JSON.parse(localStorage.getItem("nippon_checklist") || "[]");
  const checklistItemsList = document.getElementById("checklist-items-list");
  const checklistProgressBar = document.getElementById("checklist-progress-bar");
  const checklistProgressText = document.getElementById("checklist-progress-text");

  function renderChecklist() {
    checklistItemsList.innerHTML = CHECKLIST_DATA.map(item => {
      const isDone = checklistCompleted.includes(item.id);
      return `
        <div class="checklist-item ${isDone ? 'completed' : ''}" data-chk-id="${item.id}">
          <input type="checkbox" class="chk-checkbox" ${isDone ? 'checked' : ''} data-chk-id="${item.id}">
          <div class="chk-content">
            <div class="chk-title-row">
              <span class="chk-title">${item.title}</span>
              <span class="chk-tag">${item.tag}</span>
            </div>
            <p class="chk-desc">${item.desc}</p>
            ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener" class="chk-link">🌐 ไปยังเว็บไซต์ทางการ &rarr;</a>` : ''}
          </div>
        </div>
      `;
    }).join("");

    updateChecklistProgress();

    checklistItemsList.querySelectorAll(".checklist-item").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.tagName === "A") return;
        const id = el.getAttribute("data-chk-id");
        toggleChecklistItem(id);
      });
    });
  }

  function toggleChecklistItem(id) {
    const idx = checklistCompleted.indexOf(id);
    if (idx >= 0) {
      checklistCompleted.splice(idx, 1);
    } else {
      checklistCompleted.push(id);
    }
    localStorage.setItem("nippon_checklist", JSON.stringify(checklistCompleted));
    renderChecklist();
  }

  function updateChecklistProgress() {
    const total = CHECKLIST_DATA.length;
    const completed = checklistCompleted.length;
    const pct = Math.round((completed / total) * 100);
    checklistProgressBar.style.width = `${pct}%`;
    checklistProgressText.textContent = `${completed} / ${total} รายการ (${pct}%)`;
  }

  // ================= 16. JR Pass ROI Calculator =================
  let selectedJRPassType = "7_days";
  let selectedJRRoutes = ["tokyo-kyoto", "tokyo-osaka"]; // Default test selection
  const jrpassTypeGroup = document.getElementById("jrpass-type-group");
  const jrpassRoutesGrid = document.getElementById("jrpass-routes-grid");
  const jrpassResultVerdict = document.getElementById("jrpass-result-verdict");

  function renderJRPassCalculator() {
    if (!jrpassRoutesGrid) return;
    jrpassRoutesGrid.innerHTML = JR_SHINKANSEN_ROUTES.map(route => {
      const isSelected = selectedJRRoutes.includes(route.id);
      return `
        <div class="jrpass-route-item ${isSelected ? 'selected' : ''}" data-route-id="${route.id}">
          <input type="checkbox" class="jrpass-checkbox" ${isSelected ? 'checked' : ''} data-route-id="${route.id}">
          <div class="jrpass-route-info">
            <div class="jrpass-route-name">${route.name}</div>
            <div class="jrpass-route-sub">${route.train} (${route.time})</div>
          </div>
          <div class="jrpass-route-price">¥${route.priceJPY.toLocaleString()}</div>
        </div>
      `;
    }).join("");

    jrpassRoutesGrid.querySelectorAll(".jrpass-route-item").forEach(item => {
      item.addEventListener("click", (e) => {
        const routeId = item.getAttribute("data-route-id");
        toggleJRRoute(routeId);
      });
    });

    calculateJRPassROI();
  }

  function toggleJRRoute(routeId) {
    const idx = selectedJRRoutes.indexOf(routeId);
    if (idx >= 0) {
      selectedJRRoutes.splice(idx, 1);
    } else {
      selectedJRRoutes.push(routeId);
    }
    renderJRPassCalculator();
  }

  if (jrpassTypeGroup) {
    jrpassTypeGroup.querySelectorAll(".toggle-choice").forEach(btn => {
      btn.addEventListener("click", (e) => {
        jrpassTypeGroup.querySelectorAll(".toggle-choice").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        selectedJRPassType = e.currentTarget.getAttribute("data-pass-type");
        calculateJRPassROI();
      });
    });
  }

  function calculateJRPassROI() {
    if (!jrpassResultVerdict) return;
    const passInfo = JR_PASS_PRICES[selectedJRPassType];
    const passPrice = passInfo.priceJPY;

    let totalSingleTickets = 0;
    selectedJRRoutes.forEach(rId => {
      const found = JR_SHINKANSEN_ROUTES.find(r => r.id === rId);
      if (found) totalSingleTickets += found.priceJPY;
    });

    const diff = totalSingleTickets - passPrice;

    if (diff >= 0) {
      jrpassResultVerdict.className = "jrpass-result-verdict buy-pass";
      jrpassResultVerdict.innerHTML = `
        <div class="jrpass-verdict-text">
          <h4>🎉 ซื้อ ${passInfo.name} คุ้มกว่า!</h4>
          <p>ประหยัดเงินได้ประมาณ <strong>¥${diff.toLocaleString()} เยน (~${Math.round(diff * currentExchangeRate).toLocaleString()} บาท)</strong> พร้อมนั่งรถไฟ JR ทั่วประเทศไม่จำกัดเที่ยว</p>
        </div>
        <div class="jrpass-price-comparison">
          <div class="jrpass-compare-box">
            <span>รวมตั๋วแยก</span>
            <strong>¥${totalSingleTickets.toLocaleString()}</strong>
          </div>
          <div class="jrpass-compare-box">
            <span>ราคา JR Pass</span>
            <strong style="color: #059669;">¥${passPrice.toLocaleString()}</strong>
          </div>
        </div>
      `;
    } else {
      const savingBySingle = Math.abs(diff);
      jrpassResultVerdict.className = "jrpass-result-verdict buy-single";
      jrpassResultVerdict.innerHTML = `
        <div class="jrpass-verdict-text">
          <h4>💡 แนะนำ: ซื้อตั๋วแยกเที่ยว (Single Tickets) ประหยัดกว่า</h4>
          <p>เส้นทางที่คุณเลือกยังไม่คุ้มกับการซื้อ JR Pass ซื้อแยกเที่ยวจะประหยัดกว่า <strong>¥${savingBySingle.toLocaleString()} เยน (~${Math.round(savingBySingle * currentExchangeRate).toLocaleString()} บาท)</strong></p>
        </div>
        <div class="jrpass-price-comparison">
          <div class="jrpass-compare-box">
            <span>รวมตั๋วแยก</span>
            <strong style="color: #dc2626;">¥${totalSingleTickets.toLocaleString()}</strong>
          </div>
          <div class="jrpass-compare-box">
            <span>ราคา JR Pass</span>
            <strong>¥${passPrice.toLocaleString()}</strong>
          </div>
        </div>
      `;
    }
  }

  // ================= 17. Theme Park & USJ Ticket Pricing Guide =================
  let selectedThemeParkId = "park-usj";
  const parkSelectorTabs = document.getElementById("park-selector-tabs");
  const parkTicketDisplay = document.getElementById("park-ticket-display");

  function renderThemeParkTickets() {
    if (!parkSelectorTabs || !parkTicketDisplay) return;

    parkSelectorTabs.innerHTML = THEME_PARK_TICKETS_DATA.map(park => `
      <button class="park-selector-btn ${park.id === selectedThemeParkId ? 'active' : ''}" data-park-id="${park.id}">
        <span>${park.icon}</span> ${park.name.split("—")[0].trim()}
      </button>
    `).join("");

    parkSelectorTabs.querySelectorAll(".park-selector-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        selectedThemeParkId = e.currentTarget.getAttribute("data-park-id");
        renderThemeParkTickets();
      });
    });

    const currentPark = THEME_PARK_TICKETS_DATA.find(p => p.id === selectedThemeParkId) || THEME_PARK_TICKETS_DATA[0];

    let tiersHtml = "";
    if (currentPark.tiers && currentPark.tiers.length > 0) {
      tiersHtml = `
        <div class="park-tier-grid">
          ${currentPark.tiers.map(t => {
            const adultTHB = Math.round(t.priceAdult * currentExchangeRate);
            const childTHB = t.priceChild > 0 ? Math.round(t.priceChild * currentExchangeRate) : 0;
            return `
              <div class="park-tier-item">
                <span class="park-tier-name">${t.tier}</span>
                <div class="park-tier-price-row">
                  <span>ผู้ใหญ่:</span>
                  <strong>¥${t.priceAdult.toLocaleString()} (~${adultTHB.toLocaleString()} บ.)</strong>
                </div>
                ${t.priceChild > 0 ? `
                  <div class="park-tier-price-row">
                    <span>เด็ก:</span>
                    <span style="font-weight: 600; color: #64748b;">¥${t.priceChild.toLocaleString()} (~${childTHB.toLocaleString()} บ.)</span>
                  </div>
                ` : ''}
                <p class="park-tier-desc">${t.seasonDesc}</p>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    let expressHtml = "";
    if (currentPark.expressPass && currentPark.expressPass.length > 0) {
      expressHtml = `
        <div class="park-express-box">
          <h4>⚡ ตั๋วเสริม & Express Pass / FastPass</h4>
          ${currentPark.expressPass.map(exp => `
            <div class="park-express-item">
              <div class="park-express-title-row">
                <span>${exp.name}</span>
                <span class="park-express-price">${exp.priceRangeJPY}</span>
              </div>
              <p class="park-express-desc">${exp.highlight}</p>
            </div>
          `).join("")}
        </div>
      `;
    }

    let tipsHtml = "";
    if (currentPark.proTips && currentPark.proTips.length > 0) {
      tipsHtml = `
        <div class="park-tips-box">
          <h4>💡 เคล็ดลับการจอง & การเข้าเล่น (Pro-Tips)</h4>
          <ul class="park-tips-list">
            ${currentPark.proTips.map(tip => `<li>${tip}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    parkTicketDisplay.innerHTML = `
      <div class="park-display-header">
        <div class="park-display-title">
          <h3>${currentPark.icon} ${currentPark.name}</h3>
          <span>${currentPark.japanese} • ${currentPark.pricingType}</span>
        </div>
        <span class="clothing-tag" style="background: rgba(37, 99, 235, 0.1); color: #2563eb;">${currentPark.tag}</span>
      </div>
      ${tiersHtml}
      ${expressHtml}
      ${tipsHtml}
    `;
  }

  // ================= 18. Weather & Clothing (OOTD) Guide =================
  let selectedWeatherTempIndex = 1;
  const weatherTempTabs = document.getElementById("weather-temp-tabs");
  const weatherDisplayCard = document.getElementById("weather-display-card");

  function renderWeatherClothingGuide() {
    if (!weatherTempTabs || !weatherDisplayCard) return;

    weatherTempTabs.innerHTML = WEATHER_CLOTHING_DATA.map((w, idx) => `
      <button class="weather-temp-btn ${idx === selectedWeatherTempIndex ? 'active' : ''}" data-temp-idx="${idx}">
        ${w.icon} ${w.tempRange}
      </button>
    `).join("");

    weatherTempTabs.querySelectorAll(".weather-temp-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        selectedWeatherTempIndex = parseInt(e.currentTarget.getAttribute("data-temp-idx"), 10);
        renderWeatherClothingGuide();
      });
    });

    const currentW = WEATHER_CLOTHING_DATA[selectedWeatherTempIndex];
    weatherDisplayCard.innerHTML = `
      <div class="weather-card-header">
        <div class="weather-card-title-group">
          <h3>${currentW.icon} อุณหภูมิ ${currentW.tempRange} : ${currentW.seasonTitle}</h3>
          <span>📍 ตัวอย่างเมือง & ช่วงเวลา: ${currentW.citiesSample}</span>
        </div>
      </div>
      <div class="weather-clothing-grid">
        ${currentW.clothingItems.map(item => `
          <div class="clothing-item-card">
            <div class="clothing-item-card-header">
              <strong>${item.name}</strong>
              ${item.tag ? `<span class="clothing-tag">${item.tag}</span>` : ''}
            </div>
            <p>${item.desc}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // ================= 18. Bloom & Foliage Forecast Timeline =================
  let currentBloomType = "sakura";
  const bloomTabs = document.getElementById("bloom-tabs");
  const bloomTimelineGrid = document.getElementById("bloom-timeline-grid");

  function renderBloomForecast() {
    if (!bloomTimelineGrid) return;
    if (currentBloomType === "sakura") {
      bloomTimelineGrid.innerHTML = BLOOM_FORECAST_DATA.sakura.map(item => `
        <div class="bloom-timeline-card">
          <div class="bloom-card-region">📍 ${item.region}</div>
          <div class="bloom-dates-row">
            <span class="bloom-date-badge">เริ่มบาน: ${item.firstBloom}</span>
            <span class="bloom-date-badge" style="color: #059669; border-color: #bbf7d0;">บานเต็มที่: ${item.fullBloom}</span>
          </div>
          <p class="bloom-card-highlight">${item.status}</p>
        </div>
      `).join("");
    } else {
      bloomTimelineGrid.innerHTML = BLOOM_FORECAST_DATA.autumn.map(item => `
        <div class="bloom-timeline-card" style="border-left-color: #d97706;">
          <div class="bloom-card-region">📍 ${item.region}</div>
          <div class="bloom-dates-row">
            <span class="bloom-date-badge" style="color: #d97706; border-color: #fed7aa;">ช่วงพีคสุด: ${item.peakPeriod}</span>
          </div>
          <p class="bloom-card-highlight">🍁 ไฮไลต์: ${item.highlight}</p>
        </div>
      `).join("");
    }
  }

  if (bloomTabs) {
    bloomTabs.querySelectorAll(".bloom-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        bloomTabs.querySelectorAll(".bloom-tab-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentBloomType = e.currentTarget.getAttribute("data-bloom");
        renderBloomForecast();
      });
    });
  }

  // ================= 19. Emergency SOS Cards Renderer =================
  const sosCardsGrid = document.getElementById("sos-cards-grid");

  function renderEmergencySOSCards() {
    if (!sosCardsGrid) return;
    sosCardsGrid.innerHTML = EMERGENCY_CARDS_DATA.map(sos => `
      <div class="sos-card">
        <div class="sos-card-header">
          <span class="sos-card-icon">${sos.icon}</span>
          <span class="sos-card-title">${sos.title}</span>
          <span class="clothing-tag" style="margin-left: auto;">${sos.tag}</span>
        </div>
        <div class="sos-jp-box">
          <div class="sos-jp-text">${sos.japanese}</div>
          <div class="sos-romaji-text">${sos.romaji}</div>
        </div>
        <div class="sos-actions-row">
          <button class="sos-speak-btn" data-sos-speak="${sos.speakText}">🔊 กดเปิดเสียงภาษาญี่ปุ่น</button>
        </div>
      </div>
    `).join("");

    sosCardsGrid.querySelectorAll(".sos-speak-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const text = e.currentTarget.getAttribute("data-sos-speak");
        playJapaneseSpeech(text);
      });
    });
  }

  // ================= 20. Auto-Hide Navigation on Scroll & Clean Tab Control =================
  const headerElement = document.querySelector(".header");
  const mobileDockElement = document.getElementById("mobile-floating-dock");
  const navLinks = document.querySelectorAll(".nav-link:not(.plan-link)");
  const navContainer = document.querySelector(".nav-links");

  let lastScrollY = typeof window !== "undefined" ? (window.pageYOffset || 0) : 0;
  let isNavHidden = false;

  function handleScrollDirection() {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    // Always show when near the very top of the page
    if (currentScrollY <= 60) {
      if (isNavHidden) {
        if (headerElement) headerElement.classList.remove("header-hidden");
        if (mobileDockElement) mobileDockElement.classList.remove("dock-hidden");
        isNavHidden = false;
      }
      lastScrollY = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY;

    // Scroll Down -> Hide top navbar & bottom dock
    if (scrollDelta > 8 && !isNavHidden) {
      if (headerElement) headerElement.classList.add("header-hidden");
      if (mobileDockElement) mobileDockElement.classList.add("dock-hidden");
      isNavHidden = true;
    }
    // Scroll Up -> Show top navbar & bottom dock
    else if (scrollDelta < -8 && isNavHidden) {
      if (headerElement) headerElement.classList.remove("header-hidden");
      if (mobileDockElement) mobileDockElement.classList.remove("dock-hidden");
      isNavHidden = false;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScrollDirection, { passive: true });

  // Tab click: highlight and smoothly center clicked tab
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      if (navContainer) {
        const containerWidth = navContainer.clientWidth;
        const linkLeft = link.offsetLeft;
        const linkWidth = link.clientWidth;
        const scrollTarget = linkLeft - (containerWidth / 2) + (linkWidth / 2);
        navContainer.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
      }
    });
  });

  const navScrollLeftBtn = document.getElementById("nav-scroll-left");
  const navScrollRightBtn = document.getElementById("nav-scroll-right");

  if (navScrollLeftBtn && navContainer) {
    navScrollLeftBtn.addEventListener("click", () => {
      navContainer.scrollBy({ left: -220, behavior: "smooth" });
    });
  }

  if (navScrollRightBtn && navContainer) {
    navScrollRightBtn.addEventListener("click", () => {
      navContainer.scrollBy({ left: 220, behavior: "smooth" });
    });
  }

  // ================= 18. Japan Immigration & Customs Fast Pass Hub =================
  const QA_IMMIGRATION_DATA = [
    {
      id: "qa-1",
      topic: "1. วัตถุประสงค์การเดินทาง (Purpose of Visit)",
      officerEn: "What is the purpose of your visit to Japan?",
      officerJp: "滞在の目的は何ですか？ (Taizai no mokuteki wa nan desu ka?)",
      officerTh: "คุณมาทำอะไรที่ประเทศญี่ปุ่น?",
      replyEn: "Sightseeing and holiday.",
      replyTh: "มาท่องเที่ยวและพักผ่อนครับ/ค่ะ",
      tip: "💡 แนะนำตอบสั้นๆ ว่า 'Sightseeing' (ไซท์ซีอิ้ง) หรือ 'Tourism' เจ้าหน้าที่จะเข้าใจทันที ห้ามตอบว่ามาทำงานเด็ดขาด"
    },
    {
      id: "qa-2",
      topic: "2. ระยะเวลาที่อยู่ในญี่ปุ่น (Length of Stay)",
      officerEn: "How long will you be staying in Japan?",
      officerJp: "何日間滞在しますか？ (Nan-nichikan taizai shimasu ka?)",
      officerTh: "คุณจะอยู่ในญี่ปุ่นกี่วัน?",
      replyEn: "5 days (or according to your trip).",
      replyTh: "อยู่ 5 วันครับ/ค่ะ (ระบุตามตั๋วเครื่องบินขากลับ)",
      tip: "💡 ระบุจำนวนวันให้ตรงกับตั๋วเครื่องบินขากลับ เช่น '5 days' หรือ '1 week'"
    },
    {
      id: "qa-3",
      topic: "3. ที่พักในญี่ปุ่น (Accommodation)",
      officerEn: "Where are you staying?",
      officerJp: "どこに宿泊しますか？ (Doko ni shukuhaku shimasu ka?)",
      officerTh: "คุณพักที่โรงแรมไหน / ที่ไหน?",
      replyEn: "At Hotel Gracery in Shinjuku, Tokyo.",
      replyTh: "พักที่โรงแรม (ระบุชื่อโรงแรมคืนแรก) พร้อมยื่นใบจองโรงแรม",
      tip: "💡 ตอบชื่อโรงแรมแรกที่จองไว้ และยื่นหน้าจอ Fast Pass หรือ Hotel Voucher ให้เจ้าหน้าที่ดูได้เลย"
    },
    {
      id: "qa-4",
      topic: "4. เดินทางคนเดียวหรือมากี่คน (Traveling Group)",
      officerEn: "Are you traveling alone or with a group?",
      officerJp: "お一人ですか？ (Ohitori desu ka?)",
      officerTh: "คุณเดินทางคนเดียวหรือมาเป็นกลุ่ม?",
      replyEn: "With my family (or with friends / traveling alone).",
      replyTh: "มากับครอบครัว / มากับเพื่อน / เดินทางคนเดียว",
      tip: "💡 หากมาเป็นครอบครัว สามารถเดินเข้าช่องตรวจพร้อมกันได้ในกรณีมีเด็กหรือผู้สูงอายุ"
    },
    {
      id: "qa-5",
      topic: "5. ตั๋วเครื่องบินขากลับ (Return Ticket)",
      officerEn: "Do you have a return flight ticket?",
      officerJp: "帰りの航空券はありますか？ (Kaeri no koukuuken wa arimasu ka?)",
      officerTh: "คุณมีตั๋วเครื่องบินขากลับไหม?",
      replyEn: "Yes, here is my return E-ticket.",
      replyTh: "มีครับ/ค่ะ นี่คือตั๋วเครื่องบินขากลับ",
      tip: "💡 ควรพิมพ์ E-ticket ตั๋วขากลับใส่กระดาษหรือแคปรูปเก็บไว้ในมือถือให้พร้อมเปิดเสมอ"
    },
    {
      id: "qa-6",
      topic: "6. การสแกนลายนิ้วมือและถ่ายรูป (Biometrics)",
      officerEn: "Please place both index fingers on the scanner and look at the camera.",
      officerJp: "指紋センサーに両手の人差し指を置き、カメラを見てください。",
      officerTh: "กรุณาวางนิ้วชี้ทั้งสองข้างบนเครื่องสแกน และมองที่กล้องด้านบน",
      replyEn: "(Follow officer instruction politely)",
      replyTh: "วางนิ้วชี้ทั้งสองข้างบนแผ่นกระจกสีเขียว มองตรงที่กล้องจนกระทั่งไฟดับ",
      tip: "💡 วางนิ้วชี้แนบสนิท และถอดแว่นตา/หมวก/หน้ากากอนามัยออกขณะถ่ายรูป"
    },
    {
      id: "qa-7",
      topic: "7. ศุลกากรตรวจสัมภาระ (Customs Declaration)",
      officerEn: "Do you have any meat products, plants, or anything to declare?",
      officerJp: "肉類、植物、または申告するものはありますか？",
      officerTh: "คุณมีผลิตภัณฑ์จากเนื้อสัตว์ พืช หรือสิ่งของที่ต้องสำแดงภาษีไหม?",
      replyEn: "No, I have nothing to declare.",
      replyTh: "ไม่มีสิ่งของต้องสำแดงครับ/ค่ะ",
      tip: "💡 ห้ามนำหมูหยอง กุนเชียง ไส้กรอก แคบหมู เข้าญี่ปุ่นเด็ดขาด หากสแกน QR Code Visit Japan Web แล้ว สามารถเดินผ่านประตูอัตโนมัติได้เลย"
    }
  ];

  let selectedPocketHotelName = "";

  const IMMIGRATION_CHECKLIST_DATA = [
    { id: "imm-chk-1", title: "🛂 หนังสือเดินทาง (Passport)", desc: "มีอายุการใช้งานเหลือมากกว่า 6 เดือน และไม่มีรอยชำรุดฉีกขาด" },
    { id: "imm-chk-2", title: "📲 QR Code จาก Visit Japan Web (VJW)", desc: "ลงทะเบียนล่วงหน้าและแคปรูป Screenshot QR Code ทั้ง 2 ส่วน (ตม. และศุลกากร) บันทึกไว้ในอัลบั้มรูปภาพ" },
    { id: "imm-chk-3", title: "✈️ E-Ticket ตั๋วเครื่องบินขากลับ", desc: "พิมพ์ใส่กระดาษสำรองไว้ 1 ชุด หรือบันทึก PDF ไว้ในมือถือแบบเปิดได้โดยไม่ต้องต่อเน็ต" },
    { id: "imm-chk-4", title: "🏨 ใบจองโรงแรมคืนแรก (Hotel Voucher)", desc: "เอกสารภาษาอังกฤษที่มีชื่อผู้เดินทาง ที่อยู่โรงแรม และเบอร์โทรศัพท์ชัดเจน" },
    { id: "imm-chk-5", title: "🗺️ แผนการเดินทางภาษาอังกฤษ (Travel Itinerary)", desc: "สามารถกดปุ่ม '🖨️ เซฟ PDF' จากแถบแผนการเดินทางของเว็บนี้เก็บไว้ได้ทันที" },
    { id: "imm-chk-6", title: "💳 เงินเยนสด & บัตร Travel Card สำรอง", desc: "พกเงินสดเยนติดตัวพอประมาณ และบัตรเครดิต/Travel Card ที่เปิดใช้งานต่างประเทศแล้ว" },
    { id: "imm-chk-7", title: "🖊️ ปากกาลูกลื่นพกติดตัว 1 ด้าม", desc: "พกติดกระเป๋าขึ้นเครื่อง เผื่อกรณีระบบ QR Code ขัดข้องและต้องกรอกใบ ตม. แบบกระดาษบนเครื่องบิน" }
  ];

  const immigrationModal = document.getElementById("immigration-modal");
  const openImmigrationModalTopBtn = document.getElementById("open-immigration-modal-top-btn");
  const navImmigrationBtn = document.getElementById("nav-immigration-btn");
  const drawerImmigrationBtn = document.getElementById("drawer-immigration-btn");
  const immigrationModalCloseBtn = document.getElementById("immigration-modal-close-btn");
  const immigrationModalCancelBtn = document.getElementById("immigration-modal-cancel-btn");
  const immigrationModalTabs = document.getElementById("immigration-modal-tabs");
  const qaSimulatorList = document.getElementById("qa-simulator-list");
  const immChecklistContainer = document.getElementById("imm-checklist-container");
  const immHotelNameEl = document.getElementById("imm-hotel-name");
  const immHotelSubEl = document.getElementById("imm-hotel-sub");
  const immEditHotelBtn = document.getElementById("imm-edit-hotel-btn");
  const immHotelEditWrap = document.getElementById("imm-hotel-edit-wrap");
  const immCustomHotelInput = document.getElementById("imm-custom-hotel-input");
  const immFullscreenBtn = document.getElementById("imm-fullscreen-btn");
  const immSavePassBtn = document.getElementById("imm-save-pass-btn");
  const fullscreenPassOverlay = document.getElementById("fullscreen-pass-overlay");
  const fullscreenPassRenderBox = document.getElementById("fullscreen-pass-render-box");
  const closeFullscreenPassBtn = document.getElementById("close-fullscreen-pass-btn");

  let immChecklistState = JSON.parse(localStorage.getItem("nippon_imm_checklist") || "[]");

  function speakText(text, lang = "en-US") {
    if (!('speechSynthesis' in window)) {
      alert("ขออภัย อุปกรณ์ของคุณไม่รองรับฟังก์ชัน Text-to-Speech");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  }

  function updateImmigrationFastPassData() {
    // 1. Determine first accommodation from itinerary or custom places
    let firstHotelName = "Hotel Gracery Shinjuku (ホテルグレイスリー新宿)";
    let firstHotelSub = "📍 1-19-1 Kabukicho, Shinjuku-ku, Tokyo (Tel: +81-3-6833-1111)";

    const hotelInPlan = itineraryList.find(i => i.isCustom && (i.tag === "โรงแรม" || i.tag === "โรงแรมที่พัก")) || 
                        itineraryList.find(i => i.id.includes("hotel")) ||
                        itineraryList[0];

    if (hotelInPlan) {
      const builtin = JAPAN_DATA.find(i => i.id === hotelInPlan.id);
      if (builtin && builtin.nearbyHotels && builtin.nearbyHotels.length > 0) {
        const h = builtin.nearbyHotels[0];
        firstHotelName = `${h.name} (${h.japanese})`;
        firstHotelSub = `📍 ${h.distance} near ${builtin.title.split('(')[0]} (Tel: +81-3-XXXX-XXXX)`;
      } else if (hotelInPlan.title) {
        firstHotelName = `${hotelInPlan.title} (${hotelInPlan.japanese || ''})`;
        firstHotelSub = `📍 Near ${hotelInPlan.station || 'Tokyo/Osaka'} (Japan)`;
      }
    }

    const customHotelSaved = localStorage.getItem("nippon_custom_imm_hotel");
    if (customHotelSaved) {
      firstHotelName = customHotelSaved;
      firstHotelSub = "📍 User Specified Accommodation (Japan)";
    }

    if (immHotelNameEl) immHotelNameEl.textContent = firstHotelName;
    if (immHotelSubEl) immHotelSubEl.textContent = firstHotelSub;

    // 2. Determine Length of Stay
    const durationInput = document.getElementById("imm-input-duration");
    if (durationInput && itineraryList.length > 0) {
      const days = Math.max(3, Math.ceil(itineraryList.length / 3));
      durationInput.value = `${days} Days / ${days - 1} Nights`;
    }
  }

  function renderQASimulator() {
    if (!qaSimulatorList) return;

    qaSimulatorList.innerHTML = QA_IMMIGRATION_DATA.map((qa, idx) => `
      <div class="qa-card">
        <div class="qa-header-row">
          <span class="qa-num-badge">SCENARIO #${idx + 1}</span>
          <span class="qa-topic-title">${qa.topic}</span>
        </div>

        <!-- Officer Question Bubble -->
        <div class="qa-officer-bubble">
          <div class="qa-officer-text-wrap">
            <div class="qa-officer-en">👮‍♂️ "${qa.officerEn}"</div>
            <div class="qa-officer-jp">${qa.officerJp}</div>
            <div class="qa-officer-th">🇹🇭 ความหมาย: ${qa.officerTh}</div>
          </div>
          <div style="display: flex; gap: 4px; flex-shrink: 0;">
            <button type="button" class="speech-play-btn" data-speech-en="${encodeURIComponent(qa.officerEn)}" title="ฟังเสียงภาษาอังกฤษ 🔊">
              🇺🇸
            </button>
            <button type="button" class="speech-play-btn" data-speech-jp="${encodeURIComponent(qa.officerJp.split('(')[0])}" title="ฟังเสียงภาษาญี่ปุ่น 🔊">
              🇯🇵
            </button>
          </div>
        </div>

        <!-- Recommended Traveler Reply -->
        <div class="qa-reply-box">
          <div>
            <div class="qa-reply-en">🙋‍♂️ คำตอบแนะนำ: "${qa.replyEn}"</div>
            <div class="qa-reply-th">🇹🇭 คำแปล: ${qa.replyTh}</div>
          </div>
          <button type="button" class="speech-reply-btn" data-speech-reply="${encodeURIComponent(qa.replyEn)}" title="ฟังเสียงคำตอบภาษาอังกฤษ 🔊">
            🔊
          </button>
        </div>

        <div class="qa-tip-text">${qa.tip}</div>
      </div>
    `).join("");

    qaSimulatorList.querySelectorAll(".speech-play-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const en = e.currentTarget.getAttribute("data-speech-en");
        const jp = e.currentTarget.getAttribute("data-speech-jp");
        if (en) speakText(decodeURIComponent(en), "en-US");
        else if (jp) speakText(decodeURIComponent(jp), "ja-JP");
      });
    });

    qaSimulatorList.querySelectorAll(".speech-reply-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const reply = e.currentTarget.getAttribute("data-speech-reply");
        if (reply) speakText(decodeURIComponent(reply), "en-US");
      });
    });
  }

  function renderImmigrationChecklist() {
    if (!immChecklistContainer) return;

    immChecklistContainer.innerHTML = IMMIGRATION_CHECKLIST_DATA.map(item => {
      const isChecked = immChecklistState.includes(item.id);
      return `
        <div class="imm-check-item ${isChecked ? 'completed' : ''}" data-chk-id="${item.id}">
          <input type="checkbox" class="imm-check-cb" ${isChecked ? 'checked' : ''} data-chk-id="${item.id}">
          <div class="imm-check-label">
            <div class="imm-check-title">${item.title}</div>
            <div class="imm-check-sub">${item.desc}</div>
          </div>
        </div>
      `;
    }).join("");

    immChecklistContainer.querySelectorAll(".imm-check-item").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.tagName !== "INPUT") {
          const cb = el.querySelector(".imm-check-cb");
          if (cb) cb.checked = !cb.checked;
        }
        const id = el.getAttribute("data-chk-id");
        const cb = el.querySelector(".imm-check-cb");
        if (cb && cb.checked) {
          if (!immChecklistState.includes(id)) immChecklistState.push(id);
          el.classList.add("completed");
        } else {
          immChecklistState = immChecklistState.filter(i => i !== id);
          el.classList.remove("completed");
        }
        localStorage.setItem("nippon_imm_checklist", JSON.stringify(immChecklistState));
      });
    });
  }

  function openImmigrationModal(tab = "fastpass") {
    if (!immigrationModal) return;
    updateImmigrationFastPassData();
    renderQASimulator();
    renderImmigrationChecklist();

    immigrationModal.style.display = "flex";

    if (immigrationModalTabs) {
      immigrationModalTabs.querySelectorAll(".imm-nav-tab").forEach(t => {
        if (t.getAttribute("data-tab") === tab) t.click();
      });
    }
  }

  function closeImmigrationModal() {
    if (!immigrationModal) return;
    immigrationModal.style.display = "none";
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  // Hook immigration modal buttons
  if (openImmigrationModalTopBtn) {
    openImmigrationModalTopBtn.addEventListener("click", () => openImmigrationModal("fastpass"));
  }
  const openImmigrationFromChecklistBtn = document.getElementById("open-immigration-from-checklist-btn");
  if (openImmigrationFromChecklistBtn) {
    openImmigrationFromChecklistBtn.addEventListener("click", () => openImmigrationModal("qa"));
  }
  if (drawerImmigrationBtn) {
    drawerImmigrationBtn.addEventListener("click", () => {
      itineraryDrawer.classList.remove("open");
      openImmigrationModal("fastpass");
    });
  }
  if (immigrationModalCloseBtn) immigrationModalCloseBtn.addEventListener("click", closeImmigrationModal);
  if (immigrationModalCancelBtn) immigrationModalCancelBtn.addEventListener("click", closeImmigrationModal);
  if (immigrationModal) {
    immigrationModal.addEventListener("click", (e) => {
      if (e.target === immigrationModal) closeImmigrationModal();
    });
  }

  // Modal Tab Switcher
  if (immigrationModalTabs) {
    immigrationModalTabs.querySelectorAll(".imm-nav-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        immigrationModalTabs.querySelectorAll(".imm-nav-tab").forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const targetTab = e.currentTarget.getAttribute("data-tab");

        document.querySelectorAll(".imm-tab-content").forEach(content => {
          content.style.display = "none";
        });
        const activeContent = document.getElementById(`imm-tab-${targetTab}`);
        if (activeContent) activeContent.style.display = "block";
      });
    });
  }

  // Edit Hotel Name Handler
  if (immEditHotelBtn && immHotelEditWrap && immCustomHotelInput) {
    immEditHotelBtn.addEventListener("click", () => {
      const isHidden = immHotelEditWrap.style.display === "none";
      immHotelEditWrap.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        immCustomHotelInput.value = immHotelNameEl.textContent;
        immCustomHotelInput.focus();
      }
    });

    immCustomHotelInput.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val) {
        immHotelNameEl.textContent = val;
        localStorage.setItem("nippon_custom_imm_hotel", val);
      }
    });
  }

  // Fullscreen Presentation Mode
  if (immFullscreenBtn && fullscreenPassOverlay && fullscreenPassRenderBox) {
    immFullscreenBtn.addEventListener("click", () => {
      const card = document.getElementById("fastpass-card");
      if (card) {
        fullscreenPassRenderBox.innerHTML = card.outerHTML;
        fullscreenPassOverlay.style.display = "flex";
      }
    });
  }

  if (closeFullscreenPassBtn && fullscreenPassOverlay) {
    closeFullscreenPassBtn.addEventListener("click", () => {
      fullscreenPassOverlay.style.display = "none";
    });
  }

  // Print Fast Pass Card
  if (immSavePassBtn) {
    immSavePassBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ================= 19. Mobile Floating Quick Dock Handlers =================
  const mobileDockImmBtn = document.getElementById("mobile-dock-imm-btn");
  const mobileDockPlanBtn = document.getElementById("mobile-dock-plan-btn");
  const mobileDockTopBtn = document.getElementById("mobile-dock-top-btn");

  if (mobileDockImmBtn) {
    mobileDockImmBtn.addEventListener("click", () => openImmigrationModal("fastpass"));
  }
  if (mobileDockPlanBtn) {
    mobileDockPlanBtn.addEventListener("click", () => {
      itineraryDrawer.classList.add("open");
    });
  }
  if (mobileDockTopBtn) {
    mobileDockTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ================= 20. One-Click Pocket Itinerary Export Hub =================
  const pocketExportModal = document.getElementById("pocket-export-modal");
  const closePocketExportModalBtn = document.getElementById("close-pocket-export-modal-btn");
  const pocketModalCancelBtn = document.getElementById("pocket-modal-cancel-btn");
  const drawerExportPocketBtn = document.getElementById("drawer-export-pocket-btn");
  const openExportModalBtnRoute = document.getElementById("open-export-modal-btn-route");
  const exportActionPdfBtn = document.getElementById("export-action-pdf-btn");
  const exportActionImgBtn = document.getElementById("export-action-img-btn");
  const exportActionLinkBtn = document.getElementById("export-action-link-btn");
  const exportActionLineBtn = document.getElementById("export-action-line-btn");
  const pocketSheetRenderTarget = document.getElementById("pocket-sheet-render-target");
  const pocketSettingPlanSource = document.getElementById("pocket-setting-plan-source");
  const pocketSettingDate = document.getElementById("pocket-setting-date");
  const pocketSettingNights = document.getElementById("pocket-setting-nights");
  const pocketSettingGuests = document.getElementById("pocket-setting-guests");
  const pocketHolidayBadge = document.getElementById("pocket-holiday-badge");

  function openPocketExportModal(forceSourceId = null) {
    if (!pocketSheetRenderTarget) return;

    if (forceSourceId) {
      selectedRoutePresetId = forceSourceId;
    }

    // Sync input controls with current global settings
    if (pocketSettingPlanSource) {
      pocketSettingPlanSource.value = selectedRoutePresetId || "custom";
    }
    if (pocketSettingDate && selectedCheckinDate) {
      pocketSettingDate.value = selectedCheckinDate;
    }
    if (pocketSettingNights && selectedStayNights) {
      pocketSettingNights.value = String(selectedStayNights);
    }
    if (pocketSettingGuests && selectedGuestCount) {
      pocketSettingGuests.value = String(selectedGuestCount);
    }

    // Determine plan items based on current active route preset or custom user plan
    let planItems = [];
    let isFallback = false;
    let activePreset = null;

    if (selectedRoutePresetId && selectedRoutePresetId !== "custom") {
      activePreset = ROUTE_PRESETS_DATA.find(p => p.id === selectedRoutePresetId);
      planItems = getRouteItems();
    } else {
      planItems = getRouteItems();
    }

    if (!planItems || planItems.length === 0) {
      isFallback = true;
      planItems = [
        { id: "sensoji", title: "วัดเซ็นโซจิ (Sensoji Temple)", japanese: "浅草寺", tag: "วัด & วัฒนธรรม", cost: "ฟรี", day: 1, time: "09:00" },
        { id: "skytree", title: "โตเกียวสกายทรี (Tokyo Skytree)", japanese: "東京スカイツリー", tag: "แลนด์มาร์ก & ชมวิว", cost: "¥2,100", day: 1, time: "12:30" },
        { id: "shibuya", title: "ห้าแยกชิบูย่า & ฮาจิโกะ", japanese: "渋谷スクランブル交差点", tag: "ช้อปปิ้ง & ไลฟ์สไตล์", cost: "ฟรี", day: 2, time: "15:30" },
        { id: "usj", title: "ยูนิเวอร์แซล สตูดิโอส์ เจแปน (USJ)", japanese: "ユニバーサル・スタジオ・ジャパン", tag: "สวนสนุกระดับโลก", cost: "¥8,600", day: 3, time: "08:30" }
      ];
    }

    // Group items by day
    const dayMap = {};
    planItems.forEach((item, idx) => {
      const day = parseInt(item.day, 10) || (Math.floor(idx / 3) + 1);
      if (!dayMap[day]) dayMap[day] = [];
      dayMap[day].push(item);
    });

    const dayNumbers = Object.keys(dayMap).map(Number).sort((a, b) => a - b);
    const totalDays = dayNumbers.length || 1;
    const maxDayInList = Math.max(3, ...dayNumbers, (selectedStayNights || 2));
    const availableDays = Array.from({ length: Math.max(maxDayInList + 1, 5) }, (_, i) => i + 1);
    const dayTimes = ["09:00", "12:30", "15:30", "18:30", "20:30"];
    const transitSteps = [
      "🚇 Tokyo Metro / JR Line (~15 นาที)",
      "🚶 เดินชมเมือง (~8 นาที) / ต่อรถไฟใต้ดิน (~12 นาที)",
      "🚇 รถไฟสายหลัก (~20 นาที)"
    ];

    let daysHtml = "";
    let sheetGlobalCounter = 1;

    dayNumbers.forEach(day => {
      const dayList = dayMap[day];
      dayList.sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time && !b.time) return -1;
        if (!a.time && b.time) return 1;
        return 0;
      });

      daysHtml += `
        <div class="pocket-day-section">
          <div class="pocket-day-header">
            <span>🗓️ DAY ${day}: กิจกรรมท่องเที่ยววันที่ ${day}</span>
            <span style="font-size: 0.78rem; font-weight: 700; color: #475569;">${dayList.length} จุดหมาย</span>
          </div>
          <div class="pocket-timeline-items">
            ${dayList.map((item, idx) => {
              const fullData = JAPAN_DATA.find(d => d.id === item.id) || customPlacesStore.find(cp => cp.id === item.id) || {};
              const smartMeta = getSmartMetaForItem(item);
              const station = (fullData.transport && fullData.transport !== "สถานีใกล้เคียง" && fullData.transport !== "จากการค้นหา")
                ? fullData.transport.split('(')[0].replace('สถานี', '').trim()
                : (smartMeta.station && smartMeta.station !== "สถานีใกล้เคียง" ? smartMeta.station : (item.station && item.station !== "สถานีใกล้เคียง" ? item.station : 'ใจกลางเมือง'));
              const defaultTime = dayTimes[idx % dayTimes.length];
              const rawTime = item.time || defaultTime;
              const num = sheetGlobalCounter++;
              const jpName = smartMeta.japanese || fullData.japanese || item.japanese || item.title;

              const itemRegion = smartMeta.region || item.region || fullData.region || "osaka";
              let transitStep = "🚇 Tokyo Metro / JR Line (~15 นาที)";
              if (itemRegion === "osaka") {
                const osakaSteps = [
                  "🚇 Osaka Metro Midosuji / Sakaisuji Line (~10-15 นาที)",
                  "🚶 เดินชมเมือง (~6-10 นาที) / ต่อรถไฟ Nankai Line (~12 นาที)",
                  "🚆 JR Osaka Loop Line (~15 นาที)"
                ];
                transitStep = osakaSteps[idx % osakaSteps.length];
              } else if (itemRegion === "kyoto") {
                const kyotoSteps = [
                  "🚌 Kyoto City Bus สาย 205/206 (~15 นาที)",
                  "🚶 เดินชมย่านประวัติศาสตร์ (~8-12 นาที)",
                  "🚆 Keihan Main Line / Hankyu Line (~15 นาที)"
                ];
                transitStep = kyotoSteps[idx % kyotoSteps.length];
              } else {
                const tokyoSteps = [
                  "🚇 Tokyo Metro / JR Yamanote Line (~15 นาที)",
                  "🚶 เดินชมเมือง (~8 นาที) / ต่อรถไฟใต้ดิน (~12 นาที)",
                  "🚆 JR Chuo-Sobu Line (~15 นาที)"
                ];
                transitStep = tokyoSteps[idx % tokyoSteps.length];
              }

              return `
                <div class="pocket-timeline-row">
                  <div class="pocket-time-col">
                    <span style="font-size: 0.85rem;">⏰</span>
                    <input type="time" class="pocket-item-time-input" data-id="${item.id}" value="${rawTime}" title="คลิกเพื่อปรับเวลา">
                  </div>
                  <div class="pocket-info-col">
                    <div class="pocket-place-content-row">
                      <div style="flex: 1; min-width: 0;">
                        <div class="pocket-place-name">${num}. ${item.title}</div>
                        <div class="pocket-place-sub">
                          📍 สถานี/พิกัด: <strong>${station}</strong> • 🇯🇵 ${jpName}
                        </div>
                      </div>
                      <div class="pocket-card-actions">
                        <div class="pocket-card-day-ctrl">
                          <span class="pocket-day-pill-label">ย้ายวัน:</span>
                          <select class="pocket-item-day-select" data-id="${item.id}" title="ย้ายสถานที่นี้ไปวันที่...">
                            ${availableDays.map(d => `
                              <option value="${d}" ${d === (item.day || day) ? 'selected' : ''}>DAY ${d}</option>
                            `).join("")}
                          </select>
                        </div>
                        <button type="button" class="pocket-item-remove-btn" data-id="${item.id}" title="ลบ ${item.title} ออกจากแผนเที่ยว" aria-label="ลบ">&times;</button>
                      </div>
                    </div>
                  </div>
                </div>
                ${idx < dayList.length - 1 ? `<div class="pocket-transit-connector">↓ ${transitStep}</div>` : ''}
              `;
            }).join("")}
          </div>
        </div>
      `;
    });

    // 1. Detect Dominant Region from plan items
    const regionCounts = {};
    planItems.forEach(item => {
      const fullData = JAPAN_DATA.find(d => d.id === item.id) || customPlacesStore.find(cp => cp.id === item.id) || {};
      const smart = getSmartMetaForItem(item);
      const reg = item.region || fullData.region || smart.region || "osaka";
      regionCounts[reg] = (regionCounts[reg] || 0) + 1;
    });

    let dominantRegion = "osaka";
    let maxCount = 0;
    Object.keys(regionCounts).forEach(r => {
      if (regionCounts[r] > maxCount) {
        maxCount = regionCounts[r];
        dominantRegion = r;
      }
    });

    // 2. Gather candidate hotels matching dominant region
    const candidateHotels = [];
    JAPAN_DATA.forEach(p => {
      if (p.region === dominantRegion && p.nearbyHotels) {
        p.nearbyHotels.forEach(h => {
          if (!candidateHotels.some(ch => ch.name === h.name)) {
            candidateHotels.push(h);
          }
        });
      }
    });

    // Fallback if none found
    if (candidateHotels.length === 0) {
      JAPAN_DATA.forEach(p => {
        if (p.nearbyHotels) {
          p.nearbyHotels.forEach(h => {
            if (!candidateHotels.some(ch => ch.name === h.name)) {
              candidateHotels.push(h);
            }
          });
        }
      });
    }

    // Sort by price ascending: Best budget & value options first!
    candidateHotels.sort((a, b) => a.priceJPY - b.priceJPY);

    let userCustomHotel = JSON.parse(localStorage.getItem("nippon_user_custom_hotel") || 'null') || {
      name: "โรงแรมที่จองเอง (Custom Hotel)",
      japanese: "宿泊先ホテル",
      type: "โรงแรมที่จองส่วนตัว",
      distance: "ใกล้สถานีรถไฟหลัก",
      priceJPY: 4500
    };

    let isCustomHotel = (selectedPocketHotelName === "__custom__");
    let sampleHotel = null;

    if (isCustomHotel) {
      sampleHotel = userCustomHotel;
    } else {
      if (!selectedPocketHotelName || !candidateHotels.some(h => h.name === selectedPocketHotelName)) {
        selectedPocketHotelName = candidateHotels[0]?.name || "Toyoko Inn Osaka Namba";
      }
      sampleHotel = candidateHotels.find(h => h.name === selectedPocketHotelName) || candidateHotels[0] || {
        name: "Toyoko Inn Osaka Namba",
        japanese: "東横INN大阪なんば",
        priceJPY: 5800,
        priceRange: "¥5,200 - ¥8,000 / คืน",
        distance: "เดิน 4 นาทีถึงสถานี Namba",
        type: "โรงแรมบัดเจ็ทคุ้มค่า (ฟรีอาหารเช้า)"
      };
    }

    const hotelPricing = calculateDateAwareHotelPricing(sampleHotel, selectedCheckinDate, selectedStayNights, selectedGuestCount);
    const agodaSmartAreaUrl = generateAgodaAreaSearchUrl(sampleHotel.distance || regionNameTh, dominantRegion, selectedCheckinDate, selectedStayNights, selectedGuestCount);

    if (pocketHolidayBadge) {
      if (hotelPricing.isHoliday) {
        pocketHolidayBadge.textContent = hotelPricing.holidayLabel;
        pocketHolidayBadge.style.background = "#fef2f2";
        pocketHolidayBadge.style.color = "#dc2626";
        pocketHolidayBadge.style.borderColor = "#f87171";
      } else {
        pocketHolidayBadge.textContent = `⚡ เรตสด (${hotelPricing.dayLabel})`;
        pocketHolidayBadge.style.background = "#ecfdf5";
        pocketHolidayBadge.style.color = "#059669";
        pocketHolidayBadge.style.borderColor = "#86efac";
      }
    }

    // Budget Calculation
    const estTransitJPY = planItems.length * 2800;
    const estFoodJPY = totalDays * 4500 * (selectedGuestCount || 2);
    const estHotelJPY = hotelPricing.totalJPY;
    const grandTotalJPY = estTransitJPY + estFoodJPY + estHotelJPY;
    const grandTotalTHB = Math.round(grandTotalJPY * currentExchangeRate);

    // Calculate checkout date
    const checkinParts = (selectedCheckinDate || "2026-09-01").split('-');
    const inDate = new Date(parseInt(checkinParts[0]), parseInt(checkinParts[1]) - 1, parseInt(checkinParts[2]));
    const outDate = new Date(inDate);
    outDate.setDate(outDate.getDate() + (selectedStayNights || 2));
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const formattedCheckin = `${inDate.getDate()} ${thaiMonths[inDate.getMonth()]} ${inDate.getFullYear()}`;
    const formattedCheckout = `${outDate.getDate()} ${thaiMonths[outDate.getMonth()]} ${outDate.getFullYear()}`;

    const regionNameTh = dominantRegion === "osaka" ? "โอซาก้า / คันไซ" : (dominantRegion === "kyoto" ? "เกียวโต" : (dominantRegion === "tokyo" ? "โตเกียว" : (dominantRegion === "hokkaido" ? "ฮอกไกโด" : dominantRegion.toUpperCase())));

    pocketSheetRenderTarget.innerHTML = `
      <div class="pocket-itinerary-card" id="pocket-itinerary-sheet">
        <!-- Header Banner -->
        <div class="pocket-header-banner">
          <div>
            <div class="pocket-brand-title">
              <span>⛩️</span> ${activePreset ? activePreset.title : 'NIPPON TRAVEL POCKET ITINERARY'}
            </div>
            <div class="pocket-brand-sub">
              ${activePreset ? activePreset.description : 'สรุปแผนการเดินทาง & ข้อมูลสำคัญท่องเที่ยวญี่ปุ่น 2026'}
            </div>
          </div>
          <div class="pocket-meta-pill-group">
            <span class="pocket-meta-pill highlight">🗓️ ${formattedCheckin} - ${formattedCheckout}</span>
            <span class="pocket-meta-pill">🌙 ${selectedStayNights || 2} คืน</span>
            <span class="pocket-meta-pill">👥 ${selectedGuestCount || 2} ท่าน</span>
            <span class="pocket-meta-pill">💱 1 JPY = ${currentExchangeRate.toFixed(4)} THB</span>
          </div>
        </div>

        ${isFallback ? `
          <div style="background: #fffbeb; border: 1px dashed #f59e0b; padding: 6px 12px; border-radius: 8px; font-size: 0.76rem; color: #b45309;">
            💡 <em>หมายเหตุ: ตัวอย่างแผนเที่ยวจำลอง (เนื่องจากยังไม่มีรายการในแผน) คุณสามารถเพิ่มสถานที่ที่ชอบได้ทุกเมื่อครับ</em>
          </div>
        ` : ''}

        <!-- Day by Day Section -->
        ${daysHtml}

        <!-- Two Column Grid: Hotel & Budget/Emergency -->
        <div class="pocket-two-col-grid">
          <!-- Hotel Summary Box -->
          <div class="pocket-card-box">
            <div class="pocket-box-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span>🏨 ที่พักแนะนำ (${regionNameTh})</span>
              <span style="font-size: 0.72rem; color: #0284c7; font-weight: 700;">เลือกเปลี่ยนได้ ▾</span>
            </div>

            <!-- Live Hotel Switcher Dropdown -->
            <div class="pocket-hotel-select-wrap">
              <select class="pocket-hotel-select" id="pocket-hotel-select" title="เลือกเปลี่ยนโรงแรมที่ต้องการ">
                ${candidateHotels.map(h => {
                  let tagIcon = '💰';
                  if (h.name.toLowerCase().includes('capsule') || h.type.includes('แคปซูล') || h.priceJPY < 3500) tagIcon = '🛌';
                  else if (h.priceJPY <= 9000) tagIcon = '💰';
                  else if (h.priceJPY <= 16000) tagIcon = '♨️';
                  else tagIcon = '👑';
                  return `
                    <option value="${h.name}" ${h.name === sampleHotel.name && !isCustomHotel ? 'selected' : ''}>
                      ${tagIcon} ${h.name} (~¥${h.priceJPY.toLocaleString()}/คืน)
                    </option>
                  `;
                }).join("")}
                <option value="__custom__" ${isCustomHotel ? 'selected' : ''}>
                  ✏️ ระบุโรงแรมที่ฉันจองเอง (Custom Hotel)...
                </option>
              </select>
            </div>

            ${isCustomHotel ? `
              <div class="pocket-custom-hotel-inputs" style="margin-top: 0.4rem; background: #f8fafc; padding: 0.6rem; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="font-size: 0.75rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.35rem;">
                  📝 ระบุข้อมูลโรงแรมที่คุณจอง (ระบบจะคำนวณงบและใส่ในใบ ตม. ให้อัตโนมัติ):
                </div>
                <div style="display: flex; gap: 6px; margin-bottom: 0.35rem;">
                  <input type="text" id="pocket-custom-hotel-name-input" placeholder="ชื่อโรงแรมภาษาอังกฤษ (เช่น APA Hotel Namba)" value="${sampleHotel.name}" style="flex: 1.3; padding: 0.3rem 0.5rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid #94a3b8; font-family: inherit;">
                  <input type="number" id="pocket-custom-hotel-price-input" placeholder="ราคาต่อคืน (เยน JPY)" value="${sampleHotel.priceJPY}" style="flex: 0.9; padding: 0.3rem 0.5rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid #94a3b8; font-family: inherit;">
                </div>
                <div style="display: flex; gap: 6px;">
                  <input type="text" id="pocket-custom-hotel-jp-input" placeholder="ชื่อภาษาญี่ปุ่น (ถ้ามี เช่น アパホテル)" value="${sampleHotel.japanese || ''}" style="flex: 1; padding: 0.3rem 0.5rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid #94a3b8; font-family: inherit;">
                  <input type="text" id="pocket-custom-hotel-dist-input" placeholder="ทำเล/สถานี (เช่น เดิน 2 นาทีจากสถานี)" value="${sampleHotel.distance || ''}" style="flex: 1; padding: 0.3rem 0.5rem; font-size: 0.78rem; border-radius: 6px; border: 1px solid #94a3b8; font-family: inherit;">
                </div>
              </div>
            ` : `
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a; line-height: 1.3; margin-top: 0.35rem;">
                ${sampleHotel.name}
              </div>
              <div style="font-size: 0.75rem; color: #16a34a; font-family: var(--font-jp); margin-bottom: 0.3rem;">
                ${sampleHotel.japanese || ''}
              </div>
              <div style="font-size: 0.76rem; color: #475569; margin-bottom: 0.25rem;">
                🏷️ สไตล์: <strong>${sampleHotel.type}</strong>
              </div>
              <div style="font-size: 0.76rem; color: #475569; margin-bottom: 0.25rem;">
                📍 ทำเล: ${sampleHotel.distance || 'ใกล้สถานีรถไฟหลัก'}
              </div>
            `}

            <div style="font-size: 0.76rem; color: #475569; margin-top: 0.3rem; margin-bottom: 0.35rem;">
              🗓️ เข้าพัก: <strong>${formattedCheckin}</strong> – <strong>${formattedCheckout}</strong> (${hotelPricing.nights} คืน, ${hotelPricing.guests} ท่าน)
            </div>
            <div style="font-size: 0.82rem; font-weight: 800; color: #dc2626; margin-top: 0.4rem; padding-top: 0.35rem; border-top: 1px dashed #cbd5e1;">
              💳 รวม ${hotelPricing.nights} คืน: ~¥${hotelPricing.totalJPY.toLocaleString()} เยน (~${hotelPricing.totalTHB.toLocaleString()} บาท)
            </div>

            <!-- Two Action Buttons for Booking & Smart Area Filter -->
            <div class="pocket-hotel-actions-row">
              <a href="${hotelPricing.agodaUrl}" target="_blank" rel="noopener noreferrer" class="pocket-hotel-btn agoda-direct-btn">
                🏨 จองโรงแรมนี้บน Agoda ↗
              </a>
              <a href="${agodaSmartAreaUrl}" target="_blank" rel="noopener noreferrer" class="pocket-hotel-btn agoda-deals-btn">
                🔍 ส่องดีลราคาถูกย่านนี้ (>100+ แห่ง) ↗
              </a>
            </div>
          </div>

          <!-- Budget & Fast Pass Box -->
          <div class="pocket-card-box">
            <div class="pocket-box-title">
              <span>💰</span> สรุปงบประมาณ & เบอร์ฉุกเฉิน
            </div>
            <div style="font-size: 0.78rem; color: #334155; line-height: 1.5; margin-bottom: 0.5rem;">
              • ค่าเดินทาง/ตั๋ว: ~¥${estTransitJPY.toLocaleString()} เยน (~${Math.round(estTransitJPY * currentExchangeRate).toLocaleString()} บ.)<br>
              • ค่าอาหาร & กินดื่ม (${selectedGuestCount || 2} ท่าน): ~¥${estFoodJPY.toLocaleString()} เยน (~${Math.round(estFoodJPY * currentExchangeRate).toLocaleString()} บ.)<br>
              • ค่าที่พัก (${hotelPricing.nights} คืน): ~¥${estHotelJPY.toLocaleString()} เยน (~${Math.round(estHotelJPY * currentExchangeRate).toLocaleString()} บ.)<br>
              <strong style="color: #047857; font-size: 0.84rem;">🏷️ รวมงบประมาณทริป: ~¥${grandTotalJPY.toLocaleString()} เยน (~${grandTotalTHB.toLocaleString()} บาท)</strong>
            </div>
            <div style="font-size: 0.75rem; color: #dc2626; font-weight: 700; border-top: 1px dashed #cbd5e1; padding-top: 0.4rem;">
              🚨 เบอร์ฉุกเฉิน: 🚓 ตำรวจ 110 | 🚑 รถพยาบาล 119<br>
              🇹🇭 สถานทูตไทยโตเกียว: +81-3-5789-2525<br>
              🛂 วัตถุประสงค์ยื่น ตม.: ท่องเที่ยว (Sightseeing / Holiday)
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Hotel Select change listener
    const hotelSelectEl = pocketSheetRenderTarget.querySelector("#pocket-hotel-select");
    if (hotelSelectEl) {
      hotelSelectEl.addEventListener("change", (e) => {
        selectedPocketHotelName = e.target.value;
        openPocketExportModal();
      });
    }

    // Custom hotel input change handlers
    const customNameInput = pocketSheetRenderTarget.querySelector("#pocket-custom-hotel-name-input");
    const customPriceInput = pocketSheetRenderTarget.querySelector("#pocket-custom-hotel-price-input");
    const customJpInput = pocketSheetRenderTarget.querySelector("#pocket-custom-hotel-jp-input");
    const customDistInput = pocketSheetRenderTarget.querySelector("#pocket-custom-hotel-dist-input");

    const saveCustomHotel = () => {
      const updated = {
        name: (customNameInput?.value || "โรงแรมที่จองเอง").trim(),
        priceJPY: parseInt(customPriceInput?.value, 10) || 4500,
        japanese: (customJpInput?.value || "").trim(),
        distance: (customDistInput?.value || "ใกล้สถานีรถไฟหลัก").trim(),
        type: "โรงแรมที่จองส่วนตัว"
      };
      localStorage.setItem("nippon_user_custom_hotel", JSON.stringify(updated));
    };

    if (customNameInput) customNameInput.addEventListener("input", saveCustomHotel);
    if (customJpInput) customJpInput.addEventListener("input", saveCustomHotel);
    if (customDistInput) customDistInput.addEventListener("input", saveCustomHotel);
    if (customPriceInput) {
      customPriceInput.addEventListener("change", () => {
        saveCustomHotel();
        openPocketExportModal();
      });
    }

    // Attach Day change listener inside the pocket sheet cards
    pocketSheetRenderTarget.querySelectorAll(".pocket-item-day-select").forEach(select => {
      select.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        const newDay = parseInt(e.target.value, 10);
        const item = itineraryList.find(i => i.id === id);
        if (item) {
          item.day = newDay;
          sortItineraryList();
          localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
          openPocketExportModal();
          updateItineraryUI();
          renderRouteSimulator();
        }
      });
    });

    // Attach Time change listener inside the pocket sheet cards
    pocketSheetRenderTarget.querySelectorAll(".pocket-item-time-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        const newTime = e.target.value;
        const item = itineraryList.find(i => i.id === id);
        if (item) {
          item.time = newTime;
          sortItineraryList();
          localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
          openPocketExportModal();
          updateItineraryUI();
          renderRouteSimulator();
        } else {
          const customItem = customPlacesStore.find(i => i.id === id);
          if (customItem) {
            customItem.time = newTime;
            localStorage.setItem("nippon_custom_places", JSON.stringify(customPlacesStore));
          }
          openPocketExportModal();
        }
      });
    });

    // Attach Remove Item listener inside the pocket sheet cards
    pocketSheetRenderTarget.querySelectorAll(".pocket-item-remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        removeItineraryItemInstance(id);
        openPocketExportModal();
        updateItineraryUI();
        renderRouteSimulator();
        renderCards();
        if (typeof updateProfileHubUI === "function") updateProfileHubUI();
      });
    });

    if (pocketExportModal) pocketExportModal.style.display = "flex";
  }

  function closePocketExportModal() {
    if (pocketExportModal) pocketExportModal.style.display = "none";
  }

  function exportPocketAsImage() {
    const target = document.getElementById("pocket-itinerary-sheet");
    if (!target || typeof html2canvas === "undefined") {
      alert("ขออภัย ไม่พบไลบรารีสร้างรูปภาพ กรุณาใช้ปุ่มพิมพ์/บันทึก PDF แทนครับ");
      return;
    }

    if (exportActionImgBtn) {
      exportActionImgBtn.textContent = "⏳ กำลังสร้างรูปภาพ...";
      exportActionImgBtn.disabled = true;
    }

    // Temporarily hide interactive day controls, hotel select dropdown, custom inputs & action buttons for clean picture capture
    const hiddenCtrls = target.querySelectorAll(".pocket-card-day-ctrl, .pocket-hotel-select-wrap, .pocket-custom-hotel-inputs, .pocket-hotel-actions-row");
    hiddenCtrls.forEach(el => el.style.display = "none");

    // Replace <input type="time"> with elegant plain text for crisp image rendering
    const timeInputs = target.querySelectorAll(".pocket-item-time-input");
    const tempSpans = [];
    timeInputs.forEach(inp => {
      const span = document.createElement("span");
      span.className = "temp-export-time-text";
      span.textContent = `${inp.value} น.`;
      span.style.fontWeight = "800";
      span.style.color = "#1e3a8a";
      span.style.fontSize = "0.82rem";
      inp.style.display = "none";
      inp.parentNode.appendChild(span);
      tempSpans.push({ inp, span });
    });

    const cleanupImageExport = () => {
      hiddenCtrls.forEach(el => el.style.display = "");
      tempSpans.forEach(({ inp, span }) => {
        inp.style.display = "";
        if (span.parentNode) span.parentNode.removeChild(span);
      });
    };

    html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false
    }).then(canvas => {
      cleanupImageExport();
      const link = document.createElement("a");
      link.download = `nippon_trip_plan_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      if (exportActionImgBtn) {
        exportActionImgBtn.innerHTML = "<span>📱</span> บันทึกเป็นการ์ดรูปภาพ (PNG)";
        exportActionImgBtn.disabled = false;
      }
    }).catch(err => {
      cleanupImageExport();
      console.error("Error generating image:", err);
      alert("เกิดข้อผิดพลาดในการสร้างรูปภาพ กรุณาลองใหม่อีกครั้งหรือใช้ปุ่มพิมพ์ PDF ครับ");
      if (exportActionImgBtn) {
        exportActionImgBtn.innerHTML = "<span>📱</span> บันทึกเป็นการ์ดรูปภาพ (PNG)";
        exportActionImgBtn.disabled = false;
      }
    });
  }

  function shareItineraryLink() {
    const ids = itineraryList.map(i => i.id).join(',');
    const url = new URL(window.location.href);
    if (ids) {
      url.searchParams.set("plan", ids);
    }
    url.searchParams.set("checkin", selectedCheckinDate || "");
    url.searchParams.set("nights", selectedStayNights || 2);
    url.searchParams.set("guests", selectedGuestCount || 2);

    navigator.clipboard.writeText(url.toString()).then(() => {
      if (exportActionLinkBtn) {
        const orig = exportActionLinkBtn.innerHTML;
        exportActionLinkBtn.innerHTML = "<span>✓</span> คัดลอกลิงก์แล้ว!";
        setTimeout(() => { exportActionLinkBtn.innerHTML = orig; }, 2500);
      }
    }).catch(() => {
      prompt("คัดลอกลิงก์แผนเที่ยวนี้ส่งให้เพื่อนได้เลยครับ:", url.toString());
    });
  }

  function shareItineraryToLine() {
    const titles = itineraryList.map((item, idx) => `${idx + 1}. ${item.title}`).join('\n');
    const msg = `🇯🇵 แผนเที่ยวญี่ปุ่นของฉัน (${selectedCheckinDate || 'เร็วๆ นี้'}):\n${titles}\n\nดูรายละเอียดแผนเที่ยวทั้งหมดได้ที่:\n${window.location.href}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
    window.open(lineUrl, "_blank");
  }

  // Event Listeners for Pocket Export Hub
  if (drawerExportPocketBtn) {
    drawerExportPocketBtn.addEventListener("click", () => {
      if (itineraryDrawer) itineraryDrawer.classList.remove("open");
      openPocketExportModal();
    });
  }
  if (openExportModalBtnRoute) {
    openExportModalBtnRoute.addEventListener("click", openPocketExportModal);
  }
  if (closePocketExportModalBtn) {
    closePocketExportModalBtn.addEventListener("click", closePocketExportModal);
  }
  if (pocketModalCancelBtn) {
    pocketModalCancelBtn.addEventListener("click", closePocketExportModal);
  }
  if (exportActionPdfBtn) {
    exportActionPdfBtn.addEventListener("click", () => {
      window.print();
    });
  }
  if (exportActionImgBtn) {
    exportActionImgBtn.addEventListener("click", exportPocketAsImage);
  }
  if (exportActionLinkBtn) {
    exportActionLinkBtn.addEventListener("click", shareItineraryLink);
  }
  if (exportActionLineBtn) {
    exportActionLineBtn.addEventListener("click", shareItineraryToLine);
  }

  // Live Quick Customizer Handlers inside Pocket Export Modal
  if (pocketSettingPlanSource) {
    pocketSettingPlanSource.addEventListener("change", (e) => {
      selectedRoutePresetId = e.target.value;
      selectedPocketHotelName = ""; // Auto reset to best budget hotel for selected route's region
      openPocketExportModal();
      renderRouteSimulator();
    });
  }

  if (pocketSettingDate) {
    pocketSettingDate.addEventListener("change", (e) => {
      selectedCheckinDate = e.target.value;
      if (hotelCheckinDateInput) hotelCheckinDateInput.value = selectedCheckinDate;
      syncDateToSeasonShortcuts(selectedCheckinDate);
      openPocketExportModal();
      renderHotelGuide();
    });
  }

  if (pocketSettingNights) {
    pocketSettingNights.addEventListener("change", (e) => {
      selectedStayNights = parseInt(e.target.value, 10) || 2;
      if (hotelStayNightsSelect) hotelStayNightsSelect.value = String(selectedStayNights);
      openPocketExportModal();
      renderHotelGuide();
    });
  }

  if (pocketSettingGuests) {
    pocketSettingGuests.addEventListener("change", (e) => {
      selectedGuestCount = parseInt(e.target.value, 10) || 2;
      if (hotelGuestCountSelect) hotelGuestCountSelect.value = String(selectedGuestCount);
      openPocketExportModal();
      renderHotelGuide();
    });
  }

  function checkUrlShareParams() {
    try {
      if (typeof window !== "undefined" && window.location && window.location.search && typeof URLSearchParams !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const planParam = params.get('plan');
        if (planParam) {
          const ids = planParam.split(',');
          ids.forEach(id => {
            const item = JAPAN_DATA.find(i => i.id === id);
            if (item && !itineraryList.some(ex => ex.id === item.id)) {
              itineraryList.push({
                id: item.id,
                title: item.title,
                tag: item.tag,
                cost: item.estimatedCost,
                region: item.region,
                japanese: item.japanese
              });
            }
          });
          localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
        }
      }
    } catch (e) {
      console.warn("Could not parse URL params", e);
    }
  }

  // ================= 20. Smart Trip Plan Wizard (Season-Aware AI Auto Generator) =================
  let wizardSelectedDays = 5;
  let wizardSelectedRegion = "tokyo";
  let wizardSelectedSeason = "all";
  let wizardSelectedStyle = "landmarks";

  const smartWizardModal = document.getElementById("smart-wizard-modal");
  const openSmartWizardTopBtn = document.getElementById("open-smart-wizard-top-btn");
  const openSmartWizardHeroBtn = document.getElementById("open-smart-wizard-hero-btn");
  const openSmartWizardRouteBtn = document.getElementById("open-smart-wizard-route-btn");
  const mobileDockWizardBtn = document.getElementById("mobile-dock-wizard-btn");
  const closeSmartWizardModalBtn = document.getElementById("close-smart-wizard-modal-btn");
  const wizardCancelBtn = document.getElementById("wizard-cancel-btn");
  const wizardGenerateBtn = document.getElementById("wizard-generate-btn");
  const wizardSummaryPreview = document.getElementById("wizard-summary-preview");

  function openSmartWizard() {
    if (smartWizardModal) smartWizardModal.style.display = "flex";
    updateWizardSummary();
  }

  function closeSmartWizard() {
    if (smartWizardModal) smartWizardModal.style.display = "none";
  }

  function updateWizardSummary() {
    if (!wizardSummaryPreview) return;
    const regionNames = {
      tokyo: "Tokyo & Kanto (โตเกียว ชินจูกุ ชิบูย่า ฟูจิ)",
      kansai: "Kansai (โอซาก้า เกียวโต นารา USJ)",
      golden: "Golden Route (โตเกียว + ฟูจิ + เกียวโต + โอซาก้า)",
      hokkaido: "Hokkaido (ซัปโปโร โอตารุ หิมะ อาหารทะเล)"
    };
    const seasonNames = {
      all: "เที่ยวได้ทุกฤดู (All Year)",
      spring: "🌸 ใบไม้ผลิ • ซากุระ",
      summer: "☀️ ฤดูร้อน • มัตสึริ",
      autumn: "🍁 ใบไม้ร่วง • เปลี่ยนสี",
      winter: "❄️ ฤดูหนาว • หิมะ & ออนเซ็น"
    };
    const styleNames = {
      landmarks: "ไฮไลต์ & ถ่ายรูปเช็กอิน",
      foodie: "สายกิน & คาเฟ่",
      shopping: "ช้อปปิ้ง & อนิเมะ",
      parks: "สวนสนุก & ครอบครัว"
    };
    wizardSummaryPreview.innerHTML = `💡 สรุป: ทริป <strong>${wizardSelectedDays} วัน</strong> • โซน <strong>${regionNames[wizardSelectedRegion] || wizardSelectedRegion}</strong> • ฤดู <strong>${seasonNames[wizardSelectedSeason] || wizardSelectedSeason}</strong> • สไตล์ <strong>${styleNames[wizardSelectedStyle] || wizardSelectedStyle}</strong>`;
  }

  // Bind Wizard Option Buttons
  const wizardDaysOptions = document.getElementById("wizard-days-options");
  if (wizardDaysOptions) {
    wizardDaysOptions.querySelectorAll(".wizard-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        wizardDaysOptions.querySelectorAll(".wizard-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        wizardSelectedDays = parseInt(btn.getAttribute("data-days"), 10) || 5;
        updateWizardSummary();
      });
    });
  }

  const wizardRegionOptions = document.getElementById("wizard-region-options");
  if (wizardRegionOptions) {
    wizardRegionOptions.querySelectorAll(".wizard-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        wizardRegionOptions.querySelectorAll(".wizard-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        wizardSelectedRegion = btn.getAttribute("data-region");
        updateWizardSummary();
      });
    });
  }

  const wizardSeasonOptions = document.getElementById("wizard-season-options");
  if (wizardSeasonOptions) {
    wizardSeasonOptions.querySelectorAll(".wizard-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        wizardSeasonOptions.querySelectorAll(".wizard-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        wizardSelectedSeason = btn.getAttribute("data-season") || "all";
        updateWizardSummary();
      });
    });
  }

  const wizardStyleOptions = document.getElementById("wizard-style-options");
  if (wizardStyleOptions) {
    wizardStyleOptions.querySelectorAll(".wizard-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        wizardStyleOptions.querySelectorAll(".wizard-opt-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        wizardSelectedStyle = btn.getAttribute("data-style");
        updateWizardSummary();
      });
    });
  }

  if (openSmartWizardTopBtn) openSmartWizardTopBtn.addEventListener("click", openSmartWizard);
  if (openSmartWizardHeroBtn) openSmartWizardHeroBtn.addEventListener("click", openSmartWizard);
  if (openSmartWizardRouteBtn) openSmartWizardRouteBtn.addEventListener("click", openSmartWizard);
  if (mobileDockWizardBtn) mobileDockWizardBtn.addEventListener("click", openSmartWizard);
  if (closeSmartWizardModalBtn) closeSmartWizardModalBtn.addEventListener("click", closeSmartWizard);
  if (wizardCancelBtn) wizardCancelBtn.addEventListener("click", closeSmartWizard);

  if (wizardGenerateBtn) {
    wizardGenerateBtn.addEventListener("click", () => {
      generateSmartItinerary(wizardSelectedDays, wizardSelectedRegion, wizardSelectedSeason, wizardSelectedStyle);
      closeSmartWizard();
      const routeSec = document.getElementById("route-simulator");
      if (routeSec) routeSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  function generateSmartItinerary(days, region, season = "all", style = "landmarks") {
    // Combine standard JAPAN_DATA and saved custom places
    const availablePool = [...JAPAN_DATA, ...customPlacesStore];

    // Score all candidate attractions based on Region, Season, and Style
    const scored = availablePool.map(item => {
      let score = 0;

      // 1. Region Affinity
      const r = (item.region || "").toLowerCase();
      if (region === "tokyo") {
        if (r === "tokyo") score += 500;
        else if (r === "kanto" || r === "chubu") score += 300;
        else score += 40;
      } else if (region === "kansai") {
        if (r === "osaka" || r === "kyoto" || r === "kansai") score += 500;
        else if (r === "kobe" || r === "nara") score += 400;
        else score += 40;
      } else if (region === "golden") {
        if (["tokyo", "kanto", "chubu", "kyoto", "osaka", "kansai"].includes(r)) score += 500;
        else score += 80;
      } else if (region === "hokkaido") {
        if (r === "hokkaido") score += 600;
        else score += 40;
      }

      // 2. Season Affinity
      const itemSeasons = Array.isArray(item.seasons) ? item.seasons : ["all_year"];
      if (season !== "all") {
        if (itemSeasons.includes(season)) {
          score += 250; // Strong match for season highlights
        } else if (itemSeasons.includes("all_year")) {
          score += 90;  // Good all year round
        } else {
          score -= 120; // Deprioritize off-season
        }
      } else {
        score += 100;
      }

      // 3. Style Affinity
      const cat = (item.category || "").toLowerCase();
      const tag = (item.tag || "").toLowerCase();
      const title = (item.title || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const foodTips = (item.foodTips || "").toLowerCase();

      if (style === "foodie") {
        if (cat === "food" || tag.includes("ตลาด") || tag.includes("สตรีทฟู้ด") || tag.includes("ของกิน") || desc.includes("อาหาร") || foodTips.length > 5) score += 180;
      } else if (style === "shopping") {
        if (tag.includes("ช้อปปิ้ง") || tag.includes("แฟชั่น") || tag.includes("อนิเมะ") || title.includes("ชินไซบาชิ") || title.includes("ชิบูย่า") || title.includes("ดงกิ") || title.includes("ชินเซไก")) score += 180;
      } else if (style === "parks") {
        if (cat === "theme_park" || tag.includes("สวนสนุก") || tag.includes("อควาเรียม") || title.includes("USJ") || title.includes("Disney") || title.includes("สวนสัตว์")) score += 200;
      } else {
        // landmarks default
        if (cat === "attraction" || tag.includes("แลนด์มาร์ก") || tag.includes("วัด") || tag.includes("ปราสาท") || tag.includes("หอคอย") || tag.includes("ชมวิว")) score += 140;
      }

      return { item, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Build Day Schedule Configuration (Arrival, Full Exploration Days, and Departure Flight Day)
    const dayConfigs = [];
    for (let d = 1; d <= days; d++) {
      if (days > 1 && d === days) {
        // Departure day: 2 light spots (10:00 & 12:30) leaving afternoon clear for Airport & Flight check-in!
        dayConfigs.push({
          day: d,
          targetCount: 2,
          times: ["10:00", "12:30"],
          isDeparture: true,
          theme: "วันเดินทางกลับ • ช้อปปิ้งของฝาก & มุ่งสู่สนามบิน"
        });
      } else if (d === 1 && days > 1) {
        // Arrival day: Smooth start
        dayConfigs.push({
          day: d,
          targetCount: 3,
          times: ["10:00", "13:30", "17:30"],
          isArrival: true,
          theme: "วันแรกของการเดินทาง • เช็กอินแลนด์มาร์กหลัก"
        });
      } else {
        // Full Mid-Trip Days
        dayConfigs.push({
          day: d,
          targetCount: 3,
          times: ["09:00", "13:00", "17:30"],
          isFull: true,
          theme: "วันเที่ยวเต็มวัน • ตะลุยไฮไลต์ & เช็กอินครบสูตร"
        });
      }
    }

    // Guaranteed ZERO duplicates: track used Canonical IDs across all aliases & datasets
    const usedCanonicalIds = new Set();
    const newItinerary = [];

    dayConfigs.forEach(cfg => {
      let stopsAddedForDay = 0;
      for (let idx = 0; idx < scored.length && stopsAddedForDay < cfg.targetCount; idx++) {
        const candidate = scored[idx].item;
        const canonicalId = getCanonicalPlaceId(candidate.baseId || candidate.id, candidate.title || candidate.name);
        
        if (!usedCanonicalIds.has(canonicalId)) {
          usedCanonicalIds.add(canonicalId);
          const canonInJapanData = JAPAN_DATA.find(j => j.id === canonicalId);
          const finalTitle = canonInJapanData ? canonInJapanData.title : candidate.title;
          const finalJp = canonInJapanData ? canonInJapanData.japanese : candidate.japanese;
          const finalRegion = canonInJapanData ? canonInJapanData.region : candidate.region;
          const finalStation = canonInJapanData ? (canonInJapanData.station || candidate.station) : candidate.station;
          const finalTag = canonInJapanData ? (canonInJapanData.tag || candidate.tag) : candidate.tag;
          const finalCost = canonInJapanData ? (canonInJapanData.estimatedCost || candidate.cost || "ฟรี") : (candidate.cost || "ฟรี");

          newItinerary.push({
            id: candidate.id,
            baseId: canonicalId,
            title: finalTitle,
            japanese: finalJp,
            region: finalRegion,
            tag: finalTag,
            cost: finalCost,
            station: finalStation,
            stayHours: candidate.stayHours || (canonInJapanData ? canonInJapanData.stayHours : "1.5 - 2.5 ชม."),
            icon: candidate.icon || (canonInJapanData ? canonInJapanData.icon : "📍"),
            day: cfg.day,
            time: cfg.times[stopsAddedForDay],
            isDepartureDay: !!cfg.isDeparture
          });
          stopsAddedForDay++;
        }
      }
    });

    itineraryList = newItinerary;
    sortItineraryList();
    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));

    // Reset Route Simulator preset to custom to view new plan
    selectedRoutePresetId = "custom";

    updateItineraryUI();
    renderCards();
    renderRouteSimulator();
    if (typeof updateProfileHubUI === "function") updateProfileHubUI();

    // Present comprehensive AI Rationale Breakdown
    openAiRationaleModal(days, region, season, style, newItinerary);
  }

  // ================= 20.1 AI Trip Plan Rationale Presentation Logic =================
  const aiRationaleModal = document.getElementById("ai-rationale-modal");
  const aiRationaleBody = document.getElementById("ai-rationale-body");
  const closeAiRationaleModalBtn = document.getElementById("close-ai-rationale-modal-btn");
  const rationaleCloseBottomBtn = document.getElementById("rationale-close-bottom-btn");
  const rationaleViewRouteBtn = document.getElementById("rationale-view-route-btn");
  const rationaleOpenOntripBtn = document.getElementById("rationale-open-ontrip-btn");

  function openAiRationaleModal(days, region, season, style, newItinerary) {
    if (!aiRationaleModal || !aiRationaleBody) return;
    aiRationaleBody.innerHTML = generateAiRationaleHTML(days, region, season, style, newItinerary);
    aiRationaleModal.style.display = "flex";
  }

  function closeAiRationaleModal() {
    if (aiRationaleModal) aiRationaleModal.style.display = "none";
  }

  function generateAiRationaleHTML(days, region, season, style, newItinerary) {
    const regionLabels = {
      tokyo: "Tokyo & Kanto (มหานครโตเกียว & คันโต)",
      kansai: "Kansai (โอซาก้า เกียวโต นารา คันไซ)",
      golden: "Golden Route (โตเกียว + ฟูจิ + เกียวโต + โอซาก้า)",
      hokkaido: "Hokkaido (ฮอกไกโด ซัปโปโร โอตารุ)"
    };

    const seasonLabels = {
      all: "🌟 เที่ยวได้ทุกฤดู (All Year)",
      spring: "🌸 ฤดูใบไม้ผลิ • เทศกาลซากุระ (มี.ค. - พ.ค.)",
      summer: "☀️ ฤดูร้อน • เทศกาลมัตสึริ & แสงสี (มิ.ย. - ส.ค.)",
      autumn: "🍁 ฤดูใบไม้ร่วง • ใบไม้เปลี่ยนสี (ก.ย. - พ.ย.)",
      winter: "❄️ ฤดูหนาว • หิมะ ออนเซ็น & ไฟประดับ (ธ.ค. - ก.พ.)"
    };

    const styleLabels = {
      landmarks: "📸 ไฮไลต์ & ถ่ายรูปเช็กอินยอดนิยม",
      foodie: "🍜 ตะลุยชิมสตรีทฟู้ด ตลาดปลา & คาเฟ่",
      shopping: "🛍️ ช้อปปิ้ง แฟชั่น & สวรรค์อนิเมะ",
      parks: "🎢 สวนสนุกระดับโลก & ธีมพาร์คครอบครัว"
    };

    // Seasonal explanations
    let seasonRationale = "";
    if (season === "spring") {
      seasonRationale = "AI จัดวางสถานที่ที่มีทัศนียภาพซากุระและธรรมชาติสดใสเป็นอันดับหนึ่ง เช่น วัดเซ็นโซจิริมแม่น้ำสุมิดะ, สวนชินจูกุ, สวนนารา และจุดชมวิวฟูจิ เพื่อให้คุณได้สัมผัสบรรยากาศกลีบซากุระบานสะพรั่งและแสงแดดฤดูใบไม้ผลิที่อบอุ่นที่สุด";
    } else if (season === "summer") {
      seasonRationale = "AI คัดสรรย่านริมน้ำ ตลาดคนเดินสตรีทฟู้ดยามเย็น และสถานที่ในร่มสลับกลางแจ้งอย่างสมดุล (เช่น โตเกียวสกายทรี, ไคยูคัง, โดทงโบริ, อควาเรียม) เพื่อให้เที่ยวสบายท่ามกลางบรรยากาศสดใสของฤดูร้อนญี่ปุ่น";
    } else if (season === "autumn") {
      seasonRationale = "AI จัดลำดับสถานที่ที่มีทิวทัศน์ใบไม้เปลี่ยนสี (Koyo) ที่งดงามระดับตำนาน เช่น วัดคัตสึโอจิ (ดารุมะแดงตัดกับใบไม้เปลี่ยนสี), ศาลเจ้าฟูชิมิอินาริ, วัดคิโยมิซุเดระ และทะเลสาบคาวากุจิโกะ ให้คุณได้ภาพถ่ายโทนอุ่นสวยงามที่สุด";
    } else if (season === "winter") {
      seasonRationale = "AI ให้ความสำคัญกับเสน่ห์ฤดูหนาว เช่น ลานหิมะฮอกไกโด, แหล่งแช่ออนเซ็นคลายหนาว, จุดชมวิวไฟประดับยามค่ำคืน (Shibuya Sky / Umeda Sky) และการแวะคาเฟ่อุ่นๆ ในย่านวินเทจ";
    } else {
      seasonRationale = "AI คัดกรองสถานที่ระดับ Iconic ที่สวยงามทรงคุณค่าตลอด 365 วัน ไม่ว่าคุณจะเดินทางช่วงเวลาใด ก็จะได้รับประสบการณ์ท่องเที่ยวญี่ปุ่นที่ครบถ้วนสมบูรณ์แบบ";
    }

    // Geographical & Transit explanations
    let transitRationale = "AI ใช้หลักการจัดกลุ่มแบบเชิงเส้น (Linear Corridor Clustering) โดยแบ่งกลุ่มสถานที่ตามสายรถไฟสายหลัก (เช่น JR Yamanote / Tokyo Metro / Osaka Loop Line / Keihan Line) จัดให้สถานที่ในวันเดียวกันอยู่ในโซนเดียวกัน ลดเวลาเดินทางบนรถไฟเหลือเฉลี่ยเพียง 10-18 นาทีต่อจุด และไม่ต้องนั่งรถไฟย้อนไปย้อนมา";

    // Pacing & Crowd explanations
    let pacingRationale = "จัดวางวัดและศาลเจ้าประวัติศาสตร์ไว้ช่วงเช้า (09:00 น.) เพื่อเลี่ยงความแออัดของนักท่องเที่ยวและรับพลังความสงบยามเช้า, วางตลาดสดและแหล่งของกินไว้ช่วงเที่ยง (13:00 น.) ที่อาหารสดใหม่ที่สุด, และวางย่านช้อปปิ้ง/จุดชมวิวหอคอยไว้ช่วงเย็น-ค่ำ (17:30 น.) เพื่อชมพระอาทิตย์ตกดินและไฟนีออนยามราตรี";

    // Departure Day Principle
    let departureRationale = days > 1 
      ? `ในวันสุดท้าย (วันที่ ${days}) AI ปรับลดโปรแกรมเหลือเพียง 2 จุดเบาๆ (10:00 น. และ 12:30 น.) เน้นจุดช้อปปิ้งของฝาก ตลาดสด และแหล่งต่อรถไฟสนามบิน ไม่จัดโปรแกรมแน่น เพื่อให้คุณมีเวลาเช็กเอาต์โรงแรม ฝากกระเป๋า และเดินทางถึงสนามบินเพื่อเช็กอินล่วงหน้า 3 ชั่วโมงได้อย่างสบายใจ ไม่ต้องเร่งรีบหรือเสี่ยงตกเครื่อง`
      : `สำหรับทริป 1 วัน AI จัดโปรแกรมกระชับ 3 จุดไฮไลต์ต่อเนื่อง เพื่อให้คุณได้สัมผัสจุดเด่นสำคัญของเมืองอย่างเต็มอิ่มและคุ้มค่าเวลามากที่สุด`;

    // Budget & Fatigue balance
    let budgetRationale = `เกลี่ยสัดส่วนระหว่างสถานที่เข้าชมฟรี (วัด, ศาลเจ้า, สวนสาธารณะ, ย่านการค้า) กับสถานที่ที่ต้องซื้อบัตร (ธีมพาร์ค, หอคอย) ไว้อย่างลงตัว โดยเฉลี่ยงบไม่เกิน ~¥5,500/วัน และกำหนดจุดแวะพอดีเพื่อให้มีเวลาดื่มด่ำ ไม่เร่งรีบ และไม่เหนื่อยล้า`;

    // Day-by-day themes
    const dayGroups = {};
    newItinerary.forEach(item => {
      const d = item.day || 1;
      if (!dayGroups[d]) dayGroups[d] = [];
      dayGroups[d].push(item);
    });

    const dayCardsHtml = Object.keys(dayGroups).map(d => {
      const dayNum = parseInt(d, 10);
      const items = dayGroups[d];
      const titles = items.map(i => i.title.split('(')[0].trim()).join(" ➔ ");
      const areaName = items[0]?.region === "tokyo" ? "มหานครโตเกียว" : (items[0]?.region === "kyoto" ? "เกียวโตโบราณ" : (items[0]?.region === "osaka" ? "โอซาก้า & คันไซ" : "ฮอกไกโด / ธรรมชาติ"));
      
      const isDepDay = (days > 1 && dayNum === days);
      const dayBadgeText = isDepDay ? `DAY ${d} (วันเดินทางกลับ 🛫)` : `DAY ${d}`;
      const dayThemeText = isDepDay ? `ช้อปปิ้งของฝาก & มุ่งสู่สนามบินขากลับ` : `โซน${areaName} • เที่ยวตามแนวเส้นทางหลัก`;
      const dayStrategyText = isDepDay
        ? `💡 <strong>กลยุทธ์ AI:</strong> เที่ยวช่วงเช้า-เที่ยง (10:00น. ➔ 12:30น.) แวะซื้อของฝากและกินมื้อเที่ยง จากนั้นช่วงบ่ายมุ่งหน้าสู่สนามบินเพื่อเตรียมตัวเช็กอินเที่ยวบินขากลับอย่างปลอดภัย`
        : `💡 <strong>กลยุทธ์ AI:</strong> เที่ยวเรียงลำดับเวลา 09:00น. ➔ 13:00น. ➔ 17:30น. อยู่บนสายรถไฟเดียวกัน เดินทางง่าย ไม่เหนื่อย`;

      return `
        <div class="rationale-day-row" style="${isDepDay ? 'border-left: 4px solid #f59e0b; background: #fffbeb;' : ''}">
          <div class="rationale-day-badge-line">
            <span class="rationale-day-badge" style="${isDepDay ? 'background: #d97706;' : ''}">${dayBadgeText}</span>
            <span class="rationale-day-theme">${dayThemeText}</span>
          </div>
          <div class="rationale-day-stops">
            📍 ลำดับการเที่ยว: <strong>${titles}</strong>
          </div>
          <div class="rationale-day-reason">
            ${dayStrategyText}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="rationale-hero-card">
        <div class="rationale-hero-title">
          ✨ กลยุทธ์การวางแผน: ทริป ${days} วัน ${days > 1 ? `(${days-1} คืน)` : ''} (${regionLabels[region] || region.toUpperCase()})
        </div>
        <div style="font-size: 0.84rem; opacity: 0.9; line-height: 1.4;">
          ระบบ Nippon AI ได้วิเคราะห์ฐานข้อมูลและจัดจังหวะเวลาการเที่ยวจริง (รวมทั้งวันเดินทางกลับ) วางแผนจำนวน <strong>${newItinerary.length} จุดหมายเฉพาะตัว (ไม่ซ้ำกัน 100%)</strong> ให้พร้อมสำหรับการเดินทางจริงของคุณ
        </div>
        <div class="rationale-hero-tags">
          <span class="rationale-tag-pill">🗓️ ${days} วัน ${days > 1 ? `(${days-1} คืน)` : ''}</span>
          <span class="rationale-tag-pill">${seasonLabels[season] || season}</span>
          <span class="rationale-tag-pill">${styleLabels[style] || style}</span>
          <span class="rationale-tag-pill">🛫 วันสุดท้ายไม่แน่น ป้องกันตกเครื่อง</span>
          <span class="rationale-tag-pill">🎯 รวม ${newItinerary.length} จุดหมายไม่ซ้ำกัน</span>
        </div>
      </div>

      <div>
        <div style="font-size: 0.95rem; font-weight: 800; color: #1e1b4b; margin-bottom: 0.65rem;">
          🧠 5 เสาหลักเหตุผลเบื้องหลังการออกแบบแผนโดย AI:
        </div>
        <div class="rationale-pillars-grid">
          <div class="rationale-pillar-card">
            <div class="rationale-pillar-header">
              <span class="rationale-pillar-icon">🛫</span>
              <span class="rationale-pillar-title">1. วันเดินทางกลับ (Departure Optimization)</span>
            </div>
            <p class="rationale-pillar-desc">${departureRationale}</p>
          </div>

          <div class="rationale-pillar-card">
            <div class="rationale-pillar-header">
              <span class="rationale-pillar-icon">🌸</span>
              <span class="rationale-pillar-title">2. เหตุผลด้านฤดูกาล (Seasonal Match)</span>
            </div>
            <p class="rationale-pillar-desc">${seasonRationale}</p>
          </div>

          <div class="rationale-pillar-card">
            <div class="rationale-pillar-header">
              <span class="rationale-pillar-icon">🚇</span>
              <span class="rationale-pillar-title">3. การจัดกลุ่มสถานี & รถไฟ (Transit Clustering)</span>
            </div>
            <p class="rationale-pillar-desc">${transitRationale}</p>
          </div>

          <div class="rationale-pillar-card">
            <div class="rationale-pillar-header">
              <span class="rationale-pillar-icon">⏰</span>
              <span class="rationale-pillar-title">4. จังหวะเวลา & เลี่ยงฝูงชน (Pacing & Crowd)</span>
            </div>
            <p class="rationale-pillar-desc">${pacingRationale}</p>
          </div>

          <div class="rationale-pillar-card">
            <div class="rationale-pillar-header">
              <span class="rationale-pillar-icon">💰</span>
              <span class="rationale-pillar-title">5. ความสมดุลของงบ & กำลังกาย (Balance)</span>
            </div>
            <p class="rationale-pillar-desc">${budgetRationale}</p>
          </div>
        </div>
      </div>

      <div class="rationale-days-section">
        <div class="rationale-days-title">
          <span>📋 สรุปกลยุทธ์การจัดรูท Day-by-Day (วันต่อวัน):</span>
        </div>
        <div class="rationale-days-list">
          ${dayCardsHtml}
        </div>
      </div>
    `;
  }

  if (closeAiRationaleModalBtn) closeAiRationaleModalBtn.addEventListener("click", closeAiRationaleModal);
  if (rationaleCloseBottomBtn) rationaleCloseBottomBtn.addEventListener("click", closeAiRationaleModal);

  if (rationaleViewRouteBtn) {
    rationaleViewRouteBtn.addEventListener("click", () => {
      closeAiRationaleModal();
      const routeSec = document.getElementById("route-simulator");
      if (routeSec) routeSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (rationaleOpenOntripBtn) {
    rationaleOpenOntripBtn.addEventListener("click", () => {
      closeAiRationaleModal();
      openOnTripModal();
    });
  }

  // ================= 21. On-Trip Live Travel Mode Logic =================
  let onTripActiveDay = 1;
  let onTripActiveStopIndex = 0;
  let onTripClockTimer = null;

  const ontripModal = document.getElementById("ontrip-modal");
  const openOntripModalTopBtn = document.getElementById("open-ontrip-modal-top-btn");
  const openOntripModalRouteBtn = document.getElementById("open-ontrip-modal-route-btn");
  const mobileDockOntripBtn = document.getElementById("mobile-dock-ontrip-btn");
  const closeOntripModalBtn = document.getElementById("close-ontrip-modal-btn");
  const ontripDaySelector = document.getElementById("ontrip-day-selector");
  const ontripMainViewport = document.getElementById("ontrip-main-viewport");
  const ontripTransitBox = document.getElementById("ontrip-transit-box");
  const ontripStopCounter = document.getElementById("ontrip-stop-counter");
  const ontripPrevStopBtn = document.getElementById("ontrip-prev-stop-btn");
  const ontripNextStopBtn = document.getElementById("ontrip-next-stop-btn");
  const ontripClockJst = document.getElementById("ontrip-clock-jst");
  const ontripClockIct = document.getElementById("ontrip-clock-ict");

  // Show-to-Local Taxi Card Modal Elements
  const showToLocalModal = document.getElementById("show-to-local-modal");
  const closeShowLocalModalBtn = document.getElementById("close-show-local-modal-btn");
  const showLocalBody = document.getElementById("show-local-body");
  const showLocalSpeakBtn = document.getElementById("show-local-speak-btn");
  let currentShowLocalItem = null;

  function openOnTripModal() {
    if (ontripModal) ontripModal.style.display = "flex";
    onTripActiveStopIndex = 0;
    startOnTripClocks();
    renderOnTripMode();
  }

  function closeOnTripModal() {
    if (ontripModal) ontripModal.style.display = "none";
    if (onTripClockTimer) clearInterval(onTripClockTimer);
  }

  function startOnTripClocks() {
    if (onTripClockTimer) clearInterval(onTripClockTimer);
    const update = () => {
      const now = new Date();
      // JST is UTC+9
      const jstHours = (now.getUTCHours() + 9) % 24;
      const jstMins = now.getUTCMinutes().toString().padStart(2, '0');
      if (ontripClockJst) ontripClockJst.textContent = `${jstHours.toString().padStart(2, '0')}:${jstMins}`;

      // ICT is UTC+7
      const ictHours = (now.getUTCHours() + 7) % 24;
      const ictMins = now.getUTCMinutes().toString().padStart(2, '0');
      if (ontripClockIct) ontripClockIct.textContent = `${ictHours.toString().padStart(2, '0')}:${ictMins}`;
    };
    update();
    onTripClockTimer = setInterval(update, 1000);
  }

  function getOnTripRouteItems() {
    const rawList = getRouteItems();
    return rawList.map((item, idx) => ({
      ...item,
      day: parseInt(item.day, 10) || 1,
      time: item.time || ""
    }));
  }

  function renderOnTripMode() {
    const allStops = getOnTripRouteItems();
    if (allStops.length === 0) {
      if (ontripMainViewport) {
        ontripMainViewport.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: #94a3b8;">
            <div style="font-size: 3rem; margin-bottom: 0.75rem;">🗺️</div>
            <h3 style="color: white; font-size: 1.2rem; margin-bottom: 0.5rem;">ยังไม่มีสถานที่ในแผนการเดินทาง</h3>
            <p style="font-size: 0.85rem; margin-bottom: 1.25rem;">กดปุ่ม <strong>"🪄 จัดทริป AI"</strong> หรือเลือกสถานที่ท่องเที่ยวเพื่อเริ่มใช้งานโหมดเที่ยวจริง</p>
            <button type="button" class="btn primary" id="ontrip-empty-wizard-btn" style="background: #7c3aed; color: white; padding: 0.6rem 1.25rem; border-radius: 20px; font-weight: 800;">
              🪄 ให้ AI ช่วยจัดทริป 3 วินาที
            </button>
          </div>
        `;
        const emptyWizardBtn = document.getElementById("ontrip-empty-wizard-btn");
        if (emptyWizardBtn) {
          emptyWizardBtn.addEventListener("click", () => {
            closeOnTripModal();
            openSmartWizard();
          });
        }
      }
      if (ontripTransitBox) ontripTransitBox.style.display = "none";
      if (ontripStopCounter) ontripStopCounter.textContent = "0 / 0";
      return;
    }

    // Extract unique days
    const uniqueDays = [...new Set(allStops.map(s => s.day))].sort((a, b) => a - b);
    if (!uniqueDays.includes(onTripActiveDay)) {
      onTripActiveDay = uniqueDays[0] || 1;
    }

    // Render Day Selector
    if (ontripDaySelector) {
      ontripDaySelector.innerHTML = uniqueDays.map(d => `
        <button type="button" class="ontrip-day-btn ${d === onTripActiveDay ? 'active' : ''}" data-day="${d}">
          DAY ${d}
        </button>
      `).join("");

      ontripDaySelector.querySelectorAll(".ontrip-day-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          onTripActiveDay = parseInt(btn.getAttribute("data-day"), 10);
          onTripActiveStopIndex = 0;
          renderOnTripMode();
        });
      });
    }

    // Filter stops for the active day
    const dayStops = allStops.filter(s => s.day === onTripActiveDay);
    if (dayStops.length === 0) {
      onTripActiveDay = uniqueDays[0];
      return renderOnTripMode();
    }

    if (onTripActiveStopIndex >= dayStops.length) {
      onTripActiveStopIndex = dayStops.length - 1;
    }
    if (onTripActiveStopIndex < 0) {
      onTripActiveStopIndex = 0;
    }

    const currentStop = dayStops[onTripActiveStopIndex];
    const nextStop = dayStops[onTripActiveStopIndex + 1] || null;

    const baseId = currentStop.id.split('_')[0];
    const meta = ROUTE_SIMULATION_META[baseId] || {
      station: "สถานีรถไฟใจกลางเมือง",
      city: "ญี่ปุ่น",
      region: currentStop.region || "tokyo",
      lat: 35.6895,
      lng: 139.6917,
      stayHours: "2 ชม.",
      bestTimeOfDay: "ช่วงเช้า-บ่าย",
      icon: "📍",
      mapsName: currentStop.title
    };

    if (ontripStopCounter) {
      ontripStopCounter.textContent = `จุดที่ ${onTripActiveStopIndex + 1} / ${dayStops.length}`;
    }

    // Render Hero Card
    if (ontripMainViewport) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meta.mapsName || currentStop.title)}`;
      ontripMainViewport.innerHTML = `
        <div class="ontrip-hero-card">
          <div class="ontrip-hero-top">
            <span class="ontrip-stop-badge">ลำดับที่ ${onTripActiveStopIndex + 1} (DAY ${onTripActiveDay})</span>
            <span class="ontrip-time-tag">⏰ ${currentStop.time ? currentStop.time + ' น.' : 'ไม่ระบุเวลา'}</span>
          </div>

          <div class="ontrip-place-name-th">${meta.icon} ${currentStop.title}</div>
          <div class="ontrip-place-name-jp">${currentStop.japanese || meta.mapsName || ''}</div>

          <div class="ontrip-hero-meta-grid">
            <div class="ontrip-meta-item">
              <span>🚉 สถานีใกล้ที่สุด:</span><br>
              <strong>${meta.station}</strong>
            </div>
            <div class="ontrip-meta-item">
              <span>⏳ เวลาแวะแนะนำ:</span><br>
              <strong>${meta.stayHours}</strong> (${meta.bestTimeOfDay})
            </div>
          </div>

          <div class="ontrip-hero-actions-row">
            <a href="${mapsUrl}" target="_blank" rel="noopener" class="ontrip-action-btn ontrip-maps-btn">
              <span>🗺️</span> นำทางด้วย Google Maps
            </a>
            <button type="button" class="ontrip-action-btn ontrip-taxi-btn" id="ontrip-open-taxi-card-btn">
              <span>🚖</span> การ์ดยื่นคนญี่ปุ่น / แท็กซี่ 🔊
            </button>
          </div>
        </div>
      `;

      const taxiBtn = document.getElementById("ontrip-open-taxi-card-btn");
      if (taxiBtn) {
        taxiBtn.addEventListener("click", () => {
          openShowToLocalModal(currentStop, meta);
        });
      }
    }

    // Render Transit Leg to Next Stop
    if (ontripTransitBox) {
      if (nextStop) {
        ontripTransitBox.style.display = "block";
        const nextBaseId = nextStop.id.split('_')[0];
        const nextMeta = ROUTE_SIMULATION_META[nextBaseId] || { city: "ญี่ปุ่น", station: "สถานีถัดไป" };
        const transitInfo = calculateTransitLeg(currentStop, nextStop);
        ontripTransitBox.innerHTML = `
          <div class="transit-next-header">➔ จุดหมายถัดไป: <strong>${nextStop.title}</strong> (${nextStop.time ? nextStop.time + ' น.' : 'ช่วงบ่าย'})</div>
          <div class="transit-route-detail">🚇 ${transitInfo.mode} (${transitInfo.duration}) • ค่าโดยสาร ~¥${transitInfo.fareJPY.toLocaleString()}</div>
        `;
      } else {
        ontripTransitBox.style.display = "block";
        ontripTransitBox.innerHTML = `
          <div class="transit-next-header" style="color: #22c55e;">🎉 นี่คือจุดหมายสุดท้ายของ DAY ${onTripActiveDay}</div>
          <div class="transit-route-detail" style="color: #cbd5e1; font-size: 0.85rem;">เดินทางกลับโรงแรมที่พัก หรือแวะช้อปปิ้งตามอัธยาศัย</div>
        `;
      }
    }
  }

  // Next / Prev Stop Handlers
  if (ontripPrevStopBtn) {
    ontripPrevStopBtn.addEventListener("click", () => {
      if (onTripActiveStopIndex > 0) {
        onTripActiveStopIndex--;
        renderOnTripMode();
      }
    });
  }

  if (ontripNextStopBtn) {
    ontripNextStopBtn.addEventListener("click", () => {
      const allStops = getOnTripRouteItems().filter(s => s.day === onTripActiveDay);
      if (onTripActiveStopIndex < allStops.length - 1) {
        onTripActiveStopIndex++;
        renderOnTripMode();
      }
    });
  }

  // Bottom Tools Handlers
  const ontripToolCalcBtn = document.getElementById("ontrip-tool-calc-btn");
  if (ontripToolCalcBtn) {
    ontripToolCalcBtn.addEventListener("click", () => {
      closeOnTripModal();
      const currSec = document.getElementById("currency-calc");
      if (currSec) currSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  const ontripToolTaxiBtn = document.getElementById("ontrip-tool-taxi-btn");
  if (ontripToolTaxiBtn) {
    ontripToolTaxiBtn.addEventListener("click", () => {
      const allStops = getOnTripRouteItems().filter(s => s.day === onTripActiveDay);
      const cur = allStops[onTripActiveStopIndex];
      if (cur) {
        const baseId = cur.id.split('_')[0];
        const meta = ROUTE_SIMULATION_META[baseId] || {};
        openShowToLocalModal(cur, meta);
      } else {
        alert("กรุณาเลือกสถานที่ก่อนเปิดการ์ดยื่นแท็กซี่ครับ");
      }
    });
  }

  const ontripToolSosBtn = document.getElementById("ontrip-tool-sos-btn");
  if (ontripToolSosBtn) {
    ontripToolSosBtn.addEventListener("click", () => {
      closeOnTripModal();
      const sosSec = document.getElementById("emergency-sos");
      if (sosSec) sosSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (openOntripModalTopBtn) openOntripModalTopBtn.addEventListener("click", openOnTripModal);
  if (openOntripModalRouteBtn) openOntripModalRouteBtn.addEventListener("click", openOnTripModal);
  if (mobileDockOntripBtn) mobileDockOntripBtn.addEventListener("click", openOnTripModal);
  if (closeOntripModalBtn) closeOntripModalBtn.addEventListener("click", closeOnTripModal);

  // ================= 22. Show-to-Local & Taxi Card Modal Logic =================
  function openShowToLocalModal(item, meta) {
    currentShowLocalItem = { item, meta };
    if (!showLocalBody || !showToLocalModal) return;

    const jpTitle = item.japanese || item.title;
    const station = meta.station || "สถานีรถไฟ";

    showLocalBody.innerHTML = `
      <div class="show-local-phrase">すみません、ここに行きたいです。</div>
      <div style="font-size: 0.85rem; color: #475569;">(ขอโทษนะคะ/ครับ อยากจะไปที่นี่ครับ)</div>
      
      <div class="show-local-jp-big">
        【 ${jpTitle} 】
      </div>

      <div style="background: #f1f5f9; padding: 0.75rem 1rem; border-radius: 10px; text-align: left; margin-bottom: 0.5rem;">
        <div style="font-size: 0.8rem; color: #64748b; font-weight: 700;">🚉 สถานีรถไฟที่ใกล้ที่สุด:</div>
        <div style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">${station}</div>
      </div>
      <div class="show-local-sub">
        🇹🇭 ภาษาไทย: ${item.title}
      </div>
    `;

    showToLocalModal.style.display = "flex";
  }

  function closeShowToLocalModal() {
    if (showToLocalModal) showToLocalModal.style.display = "none";
  }

  if (closeShowLocalModalBtn) closeShowLocalModalBtn.addEventListener("click", closeShowToLocalModal);
  if (showLocalSpeakBtn) {
    showLocalSpeakBtn.addEventListener("click", () => {
      if (currentShowLocalItem && currentShowLocalItem.item) {
        const textToSpeak = `すみません、${currentShowLocalItem.item.japanese || currentShowLocalItem.item.title} に行きたいです。`;
        playJapaneseSpeech(textToSpeak);
      }
    });
  }

  // ================= 23. User Profile & Travel Hub Menu Logic =================
  const profileHubModal = document.getElementById("profile-hub-modal");
  const openProfileHubBtn = document.getElementById("open-profile-hub-btn");
  const closeProfileHubBtn = document.getElementById("close-profile-hub-btn");
  const mobileDockProfileBtn = document.getElementById("mobile-dock-profile-btn");
  const profileHubBadge = document.getElementById("profile-hub-badge");
  const profileBtnSubText = document.getElementById("profile-btn-sub-text");
  const profileModalTripSummary = document.getElementById("profile-modal-trip-summary");
  const profileStatDays = document.getElementById("profile-stat-days");
  const profileStatSpots = document.getElementById("profile-stat-spots");
  const profileStatBudget = document.getElementById("profile-stat-budget");
  const profileMenuPlanBadge = document.getElementById("profile-menu-plan-badge");

  function openProfileHub() {
    if (profileHubModal) {
      profileHubModal.style.display = "flex";
      updateProfileHubUI();
    }
  }

  function closeProfileHub() {
    if (profileHubModal) profileHubModal.style.display = "none";
  }

  function updateProfileHubUI() {
    const totalStops = itineraryList.length;
    const dayNumbers = [...new Set(itineraryList.map(i => parseInt(i.day, 10) || 1))];
    const totalDays = dayNumbers.length > 0 ? Math.max(...dayNumbers) : 1;
    const estJPY = totalStops * 5500;
    const estTHB = Math.round(estJPY * currentExchangeRate);

    if (profileHubBadge) profileHubBadge.textContent = totalStops;
    if (profileBtnSubText) profileBtnSubText.textContent = `${totalStops} สถานที่`;
    if (profileModalTripSummary) profileModalTripSummary.textContent = `📍 แผนปัจจุบัน: ${totalStops} สถานที่ (${totalDays} วัน)`;
    if (profileStatDays) profileStatDays.textContent = `${totalDays} วัน`;
    if (profileStatSpots) profileStatSpots.textContent = `${totalStops} แห่ง`;
    if (profileStatBudget) profileStatBudget.textContent = `~¥${estJPY.toLocaleString()} (~${estTHB.toLocaleString()} บ.)`;
    if (profileMenuPlanBadge) profileMenuPlanBadge.textContent = `${totalStops} รายการ`;
  }

  if (openProfileHubBtn) openProfileHubBtn.addEventListener("click", openProfileHub);
  if (closeProfileHubBtn) closeProfileHubBtn.addEventListener("click", closeProfileHub);
  if (mobileDockProfileBtn) mobileDockProfileBtn.addEventListener("click", openProfileHub);

  if (profileHubModal) {
    profileHubModal.addEventListener("click", (e) => {
      if (e.target === profileHubModal) closeProfileHub();
    });
  }

  // Profile Menu Items Action Bindings
  const profileMenuPlanBtn = document.getElementById("profile-menu-plan-btn");
  if (profileMenuPlanBtn) {
    profileMenuPlanBtn.addEventListener("click", () => {
      closeProfileHub();
      if (itineraryDrawer) itineraryDrawer.classList.add("open");
    });
  }

  const profileMenuOntripBtn = document.getElementById("profile-menu-ontrip-btn");
  if (profileMenuOntripBtn) {
    profileMenuOntripBtn.addEventListener("click", () => {
      closeProfileHub();
      openOnTripModal();
    });
  }

  const profileMenuWizardBtn = document.getElementById("profile-menu-wizard-btn");
  if (profileMenuWizardBtn) {
    profileMenuWizardBtn.addEventListener("click", () => {
      closeProfileHub();
      openSmartWizard();
    });
  }

  const profileMenuImmBtn = document.getElementById("profile-menu-imm-btn");
  if (profileMenuImmBtn) {
    profileMenuImmBtn.addEventListener("click", () => {
      closeProfileHub();
      openImmigrationModal();
    });
  }

  const profileMenuExportBtn = document.getElementById("profile-menu-export-btn");
  if (profileMenuExportBtn) {
    profileMenuExportBtn.addEventListener("click", () => {
      closeProfileHub();
      openPocketExportModal();
    });
  }

  // Shinkansen Master Guide Modal Logic
  const shinkansenGuideModal = document.getElementById("shinkansen-guide-modal");
  const openShinkansenGuideBtn = document.getElementById("open-shinkansen-guide-btn");
  const closeShinkansenModalBtn = document.getElementById("close-shinkansen-modal-btn");
  const shinkansenCloseBottomBtn = document.getElementById("shinkansen-close-bottom-btn");
  const shinkansenCalcPassBtn = document.getElementById("shinkansen-calc-pass-btn");
  const profileMenuShinkansenBtn = document.getElementById("profile-menu-shinkansen-btn");

  function openShinkansenGuide() {
    if (shinkansenGuideModal) shinkansenGuideModal.style.display = "flex";
  }

  function closeShinkansenGuide() {
    if (shinkansenGuideModal) shinkansenGuideModal.style.display = "none";
  }

  if (openShinkansenGuideBtn) openShinkansenGuideBtn.addEventListener("click", openShinkansenGuide);
  if (closeShinkansenModalBtn) closeShinkansenModalBtn.addEventListener("click", closeShinkansenGuide);
  if (shinkansenCloseBottomBtn) shinkansenCloseBottomBtn.addEventListener("click", closeShinkansenGuide);
  if (shinkansenGuideModal) {
    shinkansenGuideModal.addEventListener("click", (e) => {
      if (e.target === shinkansenGuideModal) closeShinkansenGuide();
    });
  }

  if (shinkansenCalcPassBtn) {
    shinkansenCalcPassBtn.addEventListener("click", () => {
      closeShinkansenGuide();
      const jrSec = document.getElementById("jr-pass-calc");
      if (jrSec) jrSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (profileMenuShinkansenBtn) {
    profileMenuShinkansenBtn.addEventListener("click", () => {
      closeProfileHub();
      openShinkansenGuide();
    });
  }

  const profileMenuCurrencyBtn = document.getElementById("profile-menu-currency-btn");
  if (profileMenuCurrencyBtn) {
    profileMenuCurrencyBtn.addEventListener("click", () => {
      closeProfileHub();
      const currSec = document.getElementById("currency-calc");
      if (currSec) currSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  const profileMenuSosBtn = document.getElementById("profile-menu-sos-btn");
  if (profileMenuSosBtn) {
    profileMenuSosBtn.addEventListener("click", () => {
      closeProfileHub();
      const sosSec = document.getElementById("emergency-sos");
      if (sosSec) sosSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  const profileClearPlanBtn = document.getElementById("profile-clear-plan-btn");
  if (profileClearPlanBtn) {
    profileClearPlanBtn.addEventListener("click", () => {
      if (itineraryList.length === 0) {
        alert("ยังไม่มีสถานที่ในแผนเที่ยวครับ");
        return;
      }
      if (confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างแผนการเดินทางทั้งหมด?")) {
        itineraryList = [];
        localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
        updateItineraryUI();
        renderCards();
        renderRouteSimulator();
        updateProfileHubUI();
        closeProfileHub();
        alert("🗑️ ล้างแผนการเดินทางเรียบร้อยแล้ว");
      }
    });
  }

  // Initial Render
  checkUrlShareParams();
  updateCounts();
  renderTransitTips();
  renderHotelGuide();
  renderRouteSimulator();
  renderSeasonAnalytics();
  renderBudgetCalculator();
  renderThemeParkTickets();
  renderJRPassCalculator();
  renderKonbiniAndSouvenirs();
  updateCurrencyCalculations("jpy");
  renderWeatherClothingGuide();
  renderBloomForecast();
  renderPhrasebook();
  renderEmergencySOSCards();
  renderChecklist();
  updateItineraryUI();
  renderCards();
  updateImmigrationFastPassData();
  updateProfileHubUI();
});




