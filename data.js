// ================= 1. JAPAN PLACES & EXPERIENCES DATA =================
const JAPAN_DATA = [
  // --- TOKYO ---
  {
    id: "tokyo-sensoji",
    title: "วัดเซนโซจิ อาซากุสะ (Senso-ji Temple)",
    japanese: "浅草寺 (せんそうじ)",
    region: "tokyo",
    category: "attraction",
    seasons: ["all_year", "spring", "autumn"],
    tag: "วัดโบราณ / วัฒนธรรม",
    rating: 4.8,
    keyword: "sensoji temple asakusa tokyo red lantern",
    image: "https://images.unsplash.com/photo-1580167227251-be70f01b0c51?auto=format&fit=crop&w=1200&q=80",
    description: "วัดพุทธที่เก่าแก่ที่สุดในโตเกียว มีโคมแดงยักษ์คามินาริมงอันเป็นเอกลักษณ์ และถนนคนเดินนากามิเซะที่มีของกินและของที่ระลึกดั้งเดิมกว่า 90 ร้าน",
    transport: "🚇 เดิน 5 นาทีจากสถานี Asakusa Station (Tokyo Metro Ginza Line / Toei Asakusa Line ทางออก 1)",
    bestTime: "เช้าตรู่ 07:00 - 09:00 (คนไม่แน่น) หรือช่วงค่ำที่มีการเปิดไฟประดับสวยงาม",
    foodTips: "ห้ามพลาด: ซาลาเปาทอด (Age-Manju), เมลอนปังกรอบนอกนุ่มในร้าน Kagetsudo, ไอศกรีมมัทฉะเข้มข้นระดับ 7 ร้าน Suzukien",
    estimatedCost: "เข้าชมฟรี (ขนมของกิน 300 - 1,000 เยน)",
    mustTry: ["ถ่ายรูปกับโคมแดงยักษ์", "เสี่ยงเซียมซี (Omikuji)", "เดินชิมขนมถนนนากามิเซะ"],
    nearbyHotels: [
      {
        name: "Nine Hours Asakusa (9h Capsule)",
        japanese: "ナインアワーズ浅草",
        type: "แคปซูลดีไซน์มินิมอลติดถนนคนเดิน",
        distance: "เดิน 2 นาทีถึงวัดเซนโซจิ",
        priceJPY: 2800,
        priceRange: "¥2,500 - ¥4,500 / คืน",
        rating: 4.6,
        highlight: "แคปซูลสไตล์นอร์ดิก สะอาด ปลอดภัย มีคาเฟ่ Fuglen ชั้นล่าง เหมาะสำหรับสายประหยัด",
        searchQuery: "Nine Hours Asakusa Tokyo"
      },
      {
        name: "Toyoko Inn Tokyo Asakusa Sensoji",
        japanese: "東横INN浅草千束",
        type: "โรงแรมบัดเจ็ทมาตรฐานญี่ปุ่น (ฟรีอาหารเช้า)",
        distance: "เดิน 5 นาทีถึงประตูหลังวัดเซนโซจิ",
        priceJPY: 5800,
        priceRange: "¥5,200 - ¥7,800 / คืน",
        rating: 4.6,
        highlight: "ราคาประหยัด คุ้มค่า บริการอาหารเช้าฟรีทุกวัน มีอุปกรณ์อำนวยความสะดวกครบครัน",
        searchQuery: "Toyoko Inn Tokyo Asakusa"
      },
      {
        name: "APA Hotel Asakusa Ekimae",
        japanese: "アパホテル〈浅草駅前〉",
        type: "บัดเจ็ทคุ้มค่าติดสถานี",
        distance: "เดิน 1 นาทีจากสถานี Asakusa ทางออก A1",
        priceJPY: 9500,
        priceRange: "¥8,500 - ¥13,000 / คืน",
        rating: 4.5,
        highlight: "ทำเลดีเลิศเดินทางสะดวก เตียงนอนนุ่มสบาย เดินไปวัดเซนโซจิเพียง 3 นาที",
        searchQuery: "APA Hotel Asakusa Ekimae"
      },
      {
        name: "The Gate Hotel Asakusa Kaminarimon by Hulic",
        japanese: "ザ・ゲートホテル雷門 by HULIC",
        type: "โรงแรมหรูวิววัด & สกายทรี",
        distance: "เดิน 2 นาทีถึงประตูคามินาริมง",
        priceJPY: 22000,
        priceRange: "¥18,000 - ¥28,000 / คืน",
        rating: 4.8,
        highlight: "ดาดฟ้าชั้น 13 ชมวิววัดเซนโซจิและโตเกียวสกายทรีพาโนรามา อาหารเช้าพรีเมียม",
        searchQuery: "The Gate Hotel Asakusa Kaminarimon by Hulic Tokyo"
      },
      {
        name: "Onyado Nono Asakusa Natural Hot Spring",
        japanese: "御宿 野乃 浅草 (天然温泉 凌雲の湯)",
        type: "เรียวกังโมเดิร์นพร้อมออนเซ็นน้ำแร่ดำ",
        distance: "เดิน 4 นาทีถึงวัด",
        priceJPY: 16000,
        priceRange: "¥14,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "ปูเสื่อทาทามิทั้งอาคาร บ่อออนเซ็นน้ำแร่ดำธรรมชาติแท้ เสิร์ฟราเมงฟรีรอบดึก",
        searchQuery: "Onyado Nono Asakusa Natural Hot Spring"
      }
    ]
  },
  {
    id: "tokyo-shibuya-sky",
    title: "ชิบูย่า สกาย & ทางข้ามห้าแยก (Shibuya Sky & Crossing)",
    japanese: "SHIBUYA SKY & 渋谷スクランブル交差点",
    region: "tokyo",
    category: "attraction",
    seasons: ["all_year", "autumn", "winter"],
    tag: "แลนด์มาร์ก / วิวมุมสูง 360°",
    rating: 4.9,
    keyword: "shibuya scramble crossing tokyo night skyline",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    description: "จุดชมวิวบนดาดฟ้าตึก Shibuya Scramble Square สูง 229 เมตร มองเห็นวิวโตเกียวพาโนรามา เห็นโตเกียวทาวเวอร์ สกายทรี และภูเขาไฟฟูจิในวันฟ้าโปร่ง",
    transport: "🚇 สถานี Shibuya Station (JR Yamanote Line / Tokyo Metro Hanzomon, Fukutoshin, Ginza Line) ทางออก B6",
    bestTime: "ช่วงก่อนพระอาทิตย์ตกดิน 16:45 - 18:30 น. (แนะนำจองตั๋วล่วงหน้าออนไลน์อย่างน้อย 2-4 สัปดาห์)",
    foodTips: "ห้ามพลาด: ข้าวหน้าเนื้อชุบแป้งทอด Gyukatsu Motomura, ซูชิสายพาน Uobei, ราเมงข้อสอบ Ichiran Shibuya",
    estimatedCost: "ค่าขึ้น Shibuya Sky 2,200 เยน (ผู้ใหญ่จองออนไลน์)",
    mustTry: ["ถ่ายรูปมุม Sky Edge ยอดฮิต", "ชมวิวห้าแยกชิบูย่าจากมุมสูง", "แวะทักทายรูปปั้นสุนัขฮาจิโกะ"],
    nearbyHotels: [
      {
        name: "Shibuya Stream Excel Hotel Tokyu",
        japanese: "渋谷ストリームエクセルホテル東急",
        type: "โรงแรมหรูดีไซน์ล้ำติดสถานี",
        distance: "เชื่อมตรงสถานี Shibuya (เดิน 2 นาที)",
        priceJPY: 13500,
        priceRange: "¥13,500 - ¥28,000 / คืน",
        rating: 4.8,
        highlight: "เชื่อมต่อกับห้าง Shibuya Stream และสถานีรถไฟ เดินไป Shibuya Sky และห้าแยกได้ใน 2 นาที",
        searchQuery: "Shibuya Stream Excel Hotel Tokyu"
      },
      {
        name: "sequence MIYASHITA PARK",
        japanese: "シークエンス ミヤシタパーク",
        type: "โรงแรมดีไซน์ติดสวนลอยฟ้า",
        distance: "เดิน 5 นาทีถึงห้าแยกชิบูย่า",
        priceJPY: 9800,
        priceRange: "¥9,800 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "ตั้งอยู่บนสวนลอยฟ้า Miyashita Park ห้องพักวิวเมืองทันสมัย เช็กเอาต์ได้ถึง 14:00 น.",
        searchQuery: "sequence MIYASHITA PARK Tokyo Shibuya"
      },
      {
        name: "Dormy Inn Premium Shibuya Jingumae",
        japanese: "ドーミーインPREMIUM 渋谷神宮前",
        type: "โรงแรมพร้อมออนเซ็น & ราเมงฟรี",
        distance: "เดิน 7 นาทีถึงสถานี Shibuya / Harajuku",
        priceJPY: 7500,
        priceRange: "¥7,500 - ¥16,000 / คืน",
        rating: 4.6,
        highlight: "มีบ่ออาบน้ำแร่ออนเซ็นขนาดใหญ่ เสิร์ฟไอศกรีมและราเมง Yonaki Soba ฟรีรอบดึก",
        searchQuery: "Dormy Inn Premium Shibuya Jingumae"
      }
    ]
  },
  {
    id: "tokyo-tsukiji-food",
    title: "ตลาดปลาสึกิจิ & โทโยสึ (Tsukiji Outer Market)",
    japanese: "築地場外市場 (つきじ)",
    region: "tokyo",
    category: "food",
    seasons: ["all_year", "spring", "winter"],
    tag: "สตรีทฟู้ด / ซีฟู้ดสด",
    rating: 4.8,
    keyword: "japanese sushi sashimi salmon tuna market",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    description: "แหล่งรวมสตรีทฟู้ดอาหารทะเลสดใหม่กว่า 400 ร้าน ทั้งข้าวหน้าปลาดิบพรีเมียม (Kaisen-don), ไข่หวานย่างสด, หอยเชลล์ย่างเนย, อูนิ และสตรอว์เบอร์รีไดฟูกุ",
    transport: "🚇 เดิน 3 นาทีจากสถานี Tsukiji Shijo (Toei Oedo Line) หรือสถานี Tsukiji (Tokyo Metro Hibiya Line)",
    bestTime: "08:00 - 12:30 น. (ร้านค้าจะเริ่มทยอยปิดช่วง 14:00 น.)",
    foodTips: "ห้ามพลาด: ไข่หวานย่างร้อนๆ ร้าน Yamacho (ชิ้นละ 150 เยน), ข้าวหน้าปลาดิบรวมร้าน Tsukiji Donburi Senmon, เนื้อวากิวย่างไฟ A5",
    estimatedCost: "งบชิมอาหาร 2,000 - 4,500 เยนต่อคน",
    mustTry: ["ชิมไข่หวานม้วนสดใหม่", "ลิ้มลองโอโทโร่และอูนิสดๆ", "กินสตรอว์เบอร์รีไดฟูกุลูกยักษ์"],
    nearbyHotels: [
      {
        name: "Mitsui Garden Hotel Ginza Premier",
        japanese: "三井ガーデンホテル銀座プレミア",
        type: "โรงแรมหรูวิวอ่าวโตเกียวและกินซ่า",
        distance: "เดิน 7 นาทีถึงตลาดปลาสึกิจิ",
        priceJPY: 26000,
        priceRange: "¥22,000 - ¥34,000 / คืน",
        rating: 4.8,
        highlight: "ล็อบบี้ลอยฟ้าชั้น 16 ชมวิวโตเกียวทาวเวอร์และอ่าวโตเกียว ตื่นเช้าไปกินซูชิได้สบายๆ",
        searchQuery: "Mitsui Garden Hotel Ginza Premier"
      },
      {
        name: "TSUKI Tokyo (Tsukiji)",
        japanese: "TSUKI 東京",
        type: "โรงแรมบูติกสไตล์มินิมอลญี่ปุ่น",
        distance: "เดิน 3 นาทีถึงตลาดปลาสึกิจิ",
        priceJPY: 18000,
        priceRange: "¥15,000 - ¥24,000 / คืน",
        rating: 4.7,
        highlight: "อ่างอาบน้ำไม้ฮิโนกิส่วนตัว กลิ่นหอมผ่อนคลาย บรรยากาศเงียบสงบใจกลางย่านของกิน",
        searchQuery: "TSUKI Tokyo Tsukiji Hotel"
      },
      {
        name: "Hotel Intergate Tokyo Kyobashi",
        japanese: "ホテルインターゲート東京 京橋",
        type: "โรงแรมคุ้มค่าพร้อมเลานจ์ฟรีตลอดวัน",
        distance: "เดิน 10 นาทีถึงตลาดสึกิจิ / กินซ่า",
        priceJPY: 14000,
        priceRange: "¥12,000 - ¥19,000 / คืน",
        rating: 4.6,
        highlight: "บริการเครื่องดื่ม กาแฟดริป ไวน์ และข้าวต้ม Ochazuke ฟรีในเลานจ์ตลอดวัน",
        searchQuery: "Hotel Intergate Tokyo Kyobashi"
      }
    ]
  },
  {
    id: "tokyo-shinjuku-gyoen",
    title: "สวนชินจูกุเกียวเอน (Shinjuku Gyoen National Garden)",
    japanese: "新宿御苑 (しんじゅくぎょえん)",
    region: "tokyo",
    category: "attraction",
    seasons: ["spring", "autumn"],
    tag: "จุดชมซากุระ & ใบไม้เปลี่ยนสี",
    rating: 4.8,
    keyword: "cherry blossom sakura park tokyo shinjuku garden",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80",
    description: "สวนสาธารณะขนาดใหญ่ใจกลางเมืองโตเกียว จุดชมซากุระกว่า 1,000 ต้นในช่วงฤดูใบไม้ผลิ และจุดชมใบเมเปิ้ลเปลี่ยนสีทองอร่ามในช่วงฤดูใบไม้ร่วง",
    transport: "🚇 เดิน 5 นาทีจากสถานี Shinjuku-gyoemmae (Tokyo Metro Marunouchi Line)",
    bestTime: "ปลาย มี.ค. - ต้น เม.ย. (ซากุระบานสะพรั่ง) หรือ กลาง พ.ย. - ต้น ธ.ค. (ใบไม้แดง)",
    foodTips: "ซื้อข้าวกล่องเบนโตะและขนมดังโงะจากห้าง Isetan Shinjuku มานั่งปิกนิกใต้ต้นไม้",
    estimatedCost: "ค่าเข้าสวน 500 เยน (ผู้ใหญ่)",
    mustTry: ["ปิกนิกใต้ต้นซากุระ", "ชมสวนสไตล์ญี่ปุ่นดั้งเดิมและเรือนกระจก", "ถ่ายรูปสะท้อนน้ำวิวตึก Docomo Tower"],
    nearbyHotels: [
      {
        name: "Hotel Gracery Shinjuku (Godzilla Hotel)",
        japanese: "ホテルグレイスリー新宿 (ゴジラホテル)",
        type: "โรงแรมหัวก็อดซิลล่าใจกลางชินจูกุ",
        distance: "เดิน 10 นาทีถึงสวนชินจูกุเกียวเอน",
        priceJPY: 8500,
        priceRange: "¥8,500 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "แลนด์มาร์กหัวก็อดซิลล่ายักษ์ อยู่ใจกลางย่านกินดื่มชินจูกุ ห้องพักโมเดิร์นสะอาด",
        searchQuery: "Hotel Gracery Shinjuku Tokyo"
      },
      {
        name: "Century Southern Tower Hotel",
        japanese: "小田急ホテルセンチュリーサザンタワー",
        type: "โรงแรมวิวสูงพาโนรามาติดสถานี Shinjuku",
        distance: "เดิน 7 นาทีถึงสวนชินจูกุเกียวเอน",
        priceJPY: 29000,
        priceRange: "¥25,000 - ¥38,000 / คืน",
        rating: 4.8,
        highlight: "ห้องพักชั้น 22-35 วิวเมืองชินจูกุและสวนเกียวเอนเต็มตา เดินทางเชื่อมต่อ Shinjuku Station สะดวกที่สุด",
        searchQuery: "Century Southern Tower Hotel Shinjuku"
      },
      {
        name: "Super Hotel Shinjuku Kabukicho",
        japanese: "スーパーホテル新宿歌舞伎町",
        type: "บัดเจ็ทคุ้มค่าพร้อมออนเซ็นน้ำแร่",
        distance: "เดิน 12 นาทีถึงสวนชินจูกุเกียวเอน",
        priceJPY: 5800,
        priceRange: "¥5,800 - ¥14,000 / คืน",
        rating: 4.5,
        highlight: "มีบ่อออนเซ็นรวมแยกชาย-หญิง อาหารเช้าบุฟเฟต์เพื่อสุขภาพฟรี คุ้มค่าเงินมาก",
        searchQuery: "Super Hotel Shinjuku Kabukicho"
      }
    ]
  },
  {
    id: "tokyo-metro-guide",
    title: "คู่มือระบบรถไฟโตเกียว (Tokyo Metro & JR Yamanote)",
    japanese: "東京の電車・地下鉄ガイド",
    region: "tokyo",
    category: "transport",
    seasons: ["all_year"],
    tag: "คู่มือเดินทาง / รถไฟ",
    rating: 4.9,
    keyword: "tokyo metro subway train railway station japan",
    image: "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80",
    description: "ระบบรถไฟโตเกียวครอบคลุมและตรงเวลาที่สุด แนะนำให้ใช้บัตรแตะจ่าย Welcome Suica / Pasmo หรือบัตรเหมาเที่ยว Tokyo Subway Ticket (24/48/72 ชม.)",
    transport: "🚅 สายหลัก: JR Yamanote (วิ่งวนลูปใจกลางเมือง), Tokyo Metro Ginza, Marunouchi, Hibiya, Chiyoda Lines",
    bestTime: "หลีกเลี่ยงชั่วโมงเร่งด่วนช่วงเช้า 07:45 - 09:00 และช่วงเย็น 17:30 - 19:00",
    foodTips: "ตามสถานีใหญ่ (Tokyo Station, Shinagawa, Shinjuku) มีโซน Ekiben รวบรวมข้าวกล่องรถไฟพรีเมียมจากทั่วญี่ปุ่น",
    estimatedCost: "Tokyo Subway Ticket 72 ชม. ราคา 1,500 เยน (นั่งไม่จำกัดเที่ยว)",
    mustTry: ["ผูกบัตร Suica กับ Apple Wallet", "ใช้ Google Maps เช็กหมายเลขชานชาลา (Track)", "ลองกินข้าวกล่อง Ekiben บนรถไฟ"],
    nearbyHotels: [
      {
        name: "The Tokyo Station Hotel",
        japanese: "東京ステーションホテル",
        type: "โรงแรมประวัติศาสตร์ระดับ 5 ดาวในสถานีโตเกียว",
        distance: "อยู่ในอาคารสถานี Tokyo Station (0 นาที)",
        priceJPY: 65000,
        priceRange: "¥55,000 - ¥90,000 / คืน",
        rating: 4.9,
        highlight: "โรงแรมมรดกทางวัฒนธรรมในอาคารอิฐแดงสถานีโตเกียว เดินลงมาชานชาลา Shinkansen ได้ทันที",
        searchQuery: "The Tokyo Station Hotel"
      },
      {
        name: "Hotel Ryumeikan Tokyo",
        japanese: "ホテル龍名館東京",
        type: "โรงแรมหรูโมเดิร์นหน้าสถานีโตเกียว",
        distance: "เดิน 3 นาทีจากสถานีโตเกียว ทางออก Yaesu",
        priceJPY: 22000,
        priceRange: "¥18,000 - ¥28,000 / คืน",
        rating: 4.7,
        highlight: "ประวัติยาวนานกว่า 100 ปี ห้องพักผสมผสานความเป็นญี่ปุ่นและการเดินทางที่สะดวกที่สุด",
        searchQuery: "Hotel Ryumeikan Tokyo"
      },
      {
        name: "Super Hotel Premier Tokyo Station Yaesu",
        japanese: "スーパーホテルPremier東京駅八重洲中央口",
        type: "บัดเจ็ทพรีเมียมพร้อมออนเซ็น",
        distance: "เดิน 4 นาทีจากสถานี Tokyo Station",
        priceJPY: 14000,
        priceRange: "¥12,000 - ¥18,000 / คืน",
        rating: 4.6,
        highlight: "มีบ่ออาบน้ำแร่ธรรมชาติ 'Yae-no-Yu' คุ้มค่าและเดินทางไปทุกมุมเมืองโตเกียวได้ง่าย",
        searchQuery: "Super Hotel Premier Tokyo Station Yaesu"
      }
    ]
  },

  // --- KYOTO ---
  {
    id: "kyoto-fushimi-inari",
    title: "ศาลเจ้าเสาโทริอิพันต้น ฟูชิมิอินาริ (Fushimi Inari Taisha)",
    japanese: "伏見稲荷大社 (ふしみいなり)",
    region: "kyoto",
    category: "attraction",
    seasons: ["all_year", "autumn", "spring"],
    tag: "ศาลเจ้า / มรดกโลก",
    rating: 4.9,
    keyword: "fushimi inari kyoto torii gates orange shrine",
    image: "https://resources.matcha-jp.com/resize/480x2000/2022/02/14-122640.webp",
    description: "ศาลเจ้าจิ้งจอกอันเลื่องชื่อ มีอุโมงค์เสาโทริอิสีส้มสดนับหมื่นต้นทอดยาวขึ้นไปบนภูเขาอินาริ เป็นจุดขอพรยอดนิยมเรื่องความสำเร็จ การค้าขาย และหน้าที่การงาน",
    transport: "🚆 สถานี JR Inari Station (JR Nara Line นั่งจาก Kyoto Station เพียง 5 นาที) หรือสถานี Fushimi-Inari (Keihan Line)",
    bestTime: "ช่วงเช้าตรู่ 06:30 - 08:00 (คนโล่ง ถ่ายรูปสวย ไม่มีคนบังเสา) หรือช่วงค่ำที่มีโคมไฟเปิดตลอดทาง",
    foodTips: "ห้ามพลาด: ซูชิเต้าหู้หวานอินาริ (Inari Sushi), มัทฉะซอฟต์เสิร์ฟเข้มข้น, ขนมดังโงะย่างซอสโชยุหวาน",
    estimatedCost: "เข้าชมฟรีตลอด 24 ชั่วโมง",
    mustTry: ["เดินลอดอุโมงค์ Senbon Torii", "เขียนแผ่นป้ายขอพรหน้ารูปจิ้งจอก", "แวะดื่มชาเขียวมัทฉะเกียวโตแท้"],
    nearbyHotels: [
      {
        name: "Hotel Granvia Kyoto",
        japanese: "ホテルグランヴィア京都",
        type: "โรงแรมหรู 5 ดาวเชื่อมตรงสถานีเกียวโต",
        distance: "นั่ง JR Nara Line 5 นาทีถึงศาลเจ้า",
        priceJPY: 28000,
        priceRange: "¥22,000 - ¥35,000 / คืน",
        rating: 4.8,
        highlight: "เชื่อมต่อสถานี Kyoto Station นั่งรถไฟ JR ไปฟูชิมิอินาริเพียง 2 สถานี เดินทางสะดวกที่สุดในเกียวโต",
        searchQuery: "Hotel Granvia Kyoto"
      },
      {
        name: "Urban Hotel Kyoto",
        japanese: "アーバンホテル京都",
        type: "โรงแรมคุ้มค่าใกล้ฟูชิมิอินาริ",
        distance: "เดิน 10 นาทีถึงศาลเจ้าฟูชิมิอินาริ",
        priceJPY: 10000,
        priceRange: "¥8,500 - ¥14,000 / คืน",
        rating: 4.5,
        highlight: "ตื่นเช้าเดินไปถ่ายรูปเสาโทริอิได้ก่อนใคร บรรยากาศสงบ ใกล้สถานีรถไฟ Keihan",
        searchQuery: "Urban Hotel Kyoto Fushimi Inari"
      },
      {
        name: "Daiwa Roynet Hotel Kyoto Terrace Hachijo Higashiguchi",
        japanese: "ダイワロイネットホテル 京都テラス八条東口",
        type: "โรงแรมโมเดิร์นติดสถานีเกียวโต",
        distance: "เดิน 2 นาทีจากสถานี Kyoto ทางออก Hachijo",
        priceJPY: 14500,
        priceRange: "¥12,000 - ¥19,000 / คืน",
        rating: 4.7,
        highlight: "ห้องพักกว้างขวาง ตกแต่งสไตล์ญี่ปุ่นร่วมสมัย มีเลานจ์เครื่องดื่มฟรี",
        searchQuery: "Daiwa Roynet Hotel Kyoto Terrace Hachijo Higashiguchi"
      }
    ]
  },
  {
    id: "kyoto-arashiyama",
    title: "ป่าไผ่อาราชิยามะ & สะพานโทเก็ตสึเคียว (Arashiyama Bamboo Grove)",
    japanese: "嵐山 竹林の小径 & 渡月橋",
    region: "kyoto",
    category: "attraction",
    seasons: ["spring", "summer", "autumn"],
    tag: "ธรรมชาติ / ป่าไผ่",
    rating: 4.8,
    keyword: "arashiyama bamboo forest grove kyoto green path",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "ทางเดินร่มรื่นท่ามกลางต้นไผ่สูงเสียดฟ้านับพันต้น ให้บรรยากาศสงบและงดงามราวกับหลุดเข้าไปในโลกโบราณ พร้อมแวะถ่ายรูปกับสะพานไม้ประวัติศาสตร์โทเก็ตสึเคียว",
    transport: "🚆 นั่งรถไฟ JR San-in (Sagano) Line จาก Kyoto Station มาลงสถานี Saga-Arashiyama (15 นาที)",
    bestTime: "ช่วงเช้า 07:00 - 08:30 น. หรือช่วงฤดูใบไม้เปลี่ยนสี (กลางถึงปลายเดือน พ.ย.)",
    foodTips: "ห้ามพลาด: กาแฟชื่อดัง % Arabica Kyoto Arashiyama ริมแม่น้ำ, เต้าหู้ต้มเกียวโต Yudofu, ไอศกรีมมัทฉะเข้มข้น",
    estimatedCost: "เข้าชมป่าไผ่ฟรี (กาแฟและของว่าง 600 - 1,500 เยน)",
    mustTry: ["จิบกาแฟริมแม่น้ำ Katsura", "นั่งรถไฟสายโรแมนติก Sagano Romantic Train", "นั่งรถลากโบราณ Jinrikisha"],
    nearbyHotels: [
      {
        name: "Kadensho, Arashiyama Onsen (Kyoritsu Resort)",
        japanese: "京都 嵐山温泉 花伝抄 (かでんしょう)",
        type: "เรียวกังออนเซ็นดั้งเดิม 5 บ่อส่วนตัว",
        distance: "เดิน 5 นาทีถึงสะพานโทเก็ตสึเคียว / ป่าไผ่",
        priceJPY: 32000,
        priceRange: "¥26,000 - ¥42,000 / คืน",
        rating: 4.8,
        highlight: "บ่อออนเซ็นส่วนตัวฟรี 5 แบบ สวมชุดยูกาตะหลากสีเดินเล่น เสิร์ฟไคเซกิดินเนอร์และราเมงฟรี",
        searchQuery: "Kadensho Arashiyama Onsen Kyoto"
      },
      {
        name: "Suiran, a Luxury Collection Hotel, Kyoto",
        japanese: "翠嵐 ラグジュアリーコレクションホテル 京都",
        type: "โรงแรมระดับ 5 ดาวริมแม่น้ำ Katsura",
        distance: "เดิน 3 นาทีถึงป่าไผ่อาราชิยามะ",
        priceJPY: 85000,
        priceRange: "¥68,000 - ¥110,000 / คืน",
        rating: 4.9,
        highlight: "วิวแม่น้ำและป่าไผ่อันเงียบสงบ มีบ่อออนเซ็นกลางแจ้งส่วนตัวในห้องพัก บริการแชมเปญฟรีช่วงพระอาทิตย์ตก",
        searchQuery: "Suiran Luxury Collection Hotel Kyoto"
      },
      {
        name: "The GrandWest Arashiyama",
        japanese: "ザ グランドウエスト 嵐山",
        type: "โรงแรมบูติกห้องสวีทสำหรับครอบครัว",
        distance: "เดิน 6 นาทีถึงสะพานโทเก็ตสึเคียว",
        priceJPY: 20000,
        priceRange: "¥16,000 - ¥26,000 / คืน",
        rating: 4.7,
        highlight: "ห้องพักสไตล์คอนโดกว้างขวาง มีเตียงเด็กและห้องนั่งเล่น เหมาะมากสำหรับกลุ่มเพื่อนและครอบครัว",
        searchQuery: "The GrandWest Arashiyama Kyoto"
      }
    ]
  },
  {
    id: "kyoto-nishiki-market",
    title: "ตลาดนิชิกิ — ครัวแห่งเกียวโต (Nishiki Market)",
    japanese: "錦市場 (にしきいちば)",
    region: "kyoto",
    category: "food",
    seasons: ["all_year", "winter", "spring"],
    tag: "ตลาดอาหารโบราณ / ขนมเกียวโต",
    rating: 4.7,
    keyword: "kyoto street food market matcha wagashi skewer",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    description: "ถนนคนเดินสายอาหารยาว 400 เมตร อายุกว่า 400 ปี รวบรวมอาหารพื้นเมืองเกียวโตกว่า 130 ร้าน ทั้งปลาหมึกยัดไส้ไข่นกกระทา, ขนมเซมเบ้ปิ้งสด, ดังโงะ และชาเขียว",
    transport: "🚇 เดิน 3 นาทีจากสถานี Shijo (Kyoto City Subway) หรือสถานี Karasuma (Hankyu Kyoto Line)",
    bestTime: "10:30 - 16:00 น. (เหมาะสำหรับทานเป็นมื้อกลางวันและของว่าง)",
    foodTips: "ห้ามพลาด: ปลาหมึกแดงยัดไส้ไข่ Tako Tamago, เต้าหู้ทอดเสียบไม้, ขนมโมจิไส้เกาลัด, ชาร้าน Ippodo Tea",
    estimatedCost: "งบชิมอาหาร 1,500 - 3,500 เยนต่อคน",
    mustTry: ["ชิมสตรีทฟู้ดสไตล์เกียวโตดั้งเดิม", "ซื้อผงชาเขียวมัทฉะเกรดพิธีการ", "ลองชิมผักดองเกียวโต Tsukemono"],
    nearbyHotels: [
      {
        name: "Cross Hotel Kyoto",
        japanese: "クロスホテル京都",
        type: "โรงแรมโมเดิร์นดีไซน์ใจกลางคาวาระมาจิ",
        distance: "เดิน 4 นาทีถึงตลาดนิชิกิและย่านกิอง",
        priceJPY: 19000,
        priceRange: "¥16,000 - ¥26,000 / คืน",
        rating: 4.8,
        highlight: "ทำเลดีที่สุดในเกียวโต รายล้อมด้วยร้านอาหารและคาเฟ่ ห้องพักกว้างขวางตกแต่งกลิ่นอายไม้ญี่ปุ่น",
        searchQuery: "Cross Hotel Kyoto Kawaramachi"
      },
      {
        name: "GOOD NATURE HOTEL KYOTO",
        japanese: "GOOD NATURE HOTEL KYOTO",
        type: "โรงแรมรักษ์โลก สไตล์มินิมอลติด Takashimaya",
        distance: "เดิน 5 นาทีถึงตลาดนิชิกิ",
        priceJPY: 23000,
        priceRange: "¥19,000 - ¥30,000 / คืน",
        rating: 4.8,
        highlight: "อาคารคอมเพล็กซ์เพื่อสุขภาพ มีคาเฟ่ออร์แกนิกและสวนคอร์ทยาร์ดใจกลางโรงแรม",
        searchQuery: "GOOD NATURE HOTEL KYOTO"
      },
      {
        name: "Sotetsu Fresa Inn Kyoto-Shijo Karasuma",
        japanese: "相鉄フレッサイン 京都四条烏丸",
        type: "บัดเจ็ทคุ้มค่าติดสถานี Shijo",
        distance: "เดิน 3 นาทีถึงตลาดนิชิกิ",
        priceJPY: 11000,
        priceRange: "¥9,000 - ¥15,000 / คืน",
        rating: 4.6,
        highlight: "ติดสถานีรถไฟใต้ดิน Shijo และ Hankyu Line ราคาประหยัด สะอาด ปลอดภัย",
        searchQuery: "Sotetsu Fresa Inn Kyoto Shijo Karasuma"
      }
    ]
  },

  // --- OSAKA ---
  {
    id: "osaka-dotonbori",
    title: "ย่านโดทงโบริ & ป้ายกูลิโกะ (Dotonbori & Glico Sign)",
    japanese: "道頓堀 (どうとんぼり)",
    region: "osaka",
    category: "food",
    seasons: ["all_year", "summer", "autumn", "winter"],
    tag: "สตรีทฟู้ด / แหล่งกินดื่มกลางคืน",
    rating: 4.8,
    keyword: "osaka dotonbori glico neon canal street food takoyaki",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
    description: "มหานครแห่งอาหารและแสงสีนีออน เมืองหลวงแห่งสตรีทฟู้ดที่มีสโลแกน 'กินจนล้มละลาย' (Kuidaore) เต็มไปด้วยร้านทาโกะยากิ โอโคโนมิยากิ คุชิคัตสึ และปูยักษ์",
    transport: "🚇 เดิน 3 นาทีจากสถานี Namba Station (Osaka Metro Midosuji Line / Nankai Line ทางออก 14)",
    bestTime: "17:30 - 22:30 น. ช่วงค่ำที่ป้ายไฟนีออนเปิดสว่างไสว บรรยากาศคึกคักที่สุด",
    foodTips: "ห้ามพลาด: ทาโกะยากิร้าน Kukuru และ Achochichi, คุชิคัตสึทอดเสียบไม้ Kushikatsu Daruma, ราเมงมังกร Kinryu Ramen",
    estimatedCost: "งบกินสตรีทฟู้ด 2,000 - 4,000 เยนต่อคน",
    mustTry: ["ทำท่ายกขาถ่ายรูปคู่กับป้ายกูลิโกะ", "ชิมทาโกะยากิกรอบนอกนุ่มใน", "ล่องเรือ Tombori River Cruise ยามค่ำคืน"],
    nearbyHotels: [
      {
        name: "Cross Hotel Osaka",
        japanese: "クロスホテル大阪",
        type: "โรงแรมหรูใจกลางโดทงโบริ",
        distance: "เดิน 1 นาทีถึงป้ายกูลิโกะและสะพาน Ebisubashi",
        priceJPY: 7800,
        priceRange: "¥7,800 - ¥19,000 / คืน",
        rating: 4.8,
        highlight: "ทำเลดีอันดับ 1 เดินลงมาก็ถึงใจกลางย่านกินดื่มโดทงโบริและชินไซบาชิ ช้อปปิ้งเสร็จเอาของมาเก็บได้ทันที",
        searchQuery: "Cross Hotel Osaka Dotonbori"
      },
      {
        name: "Candeo Hotels Osaka Namba",
        japanese: "カンデオホテルズ大阪なんば",
        type: "โรงแรมมีสกายสปาออนเซ็นลอยฟ้า",
        distance: "เดิน 5 นาทีถึงโดทงโบริ",
        priceJPY: 18000,
        priceRange: "¥15,000 - ¥24,000 / คืน",
        rating: 4.7,
        highlight: "บ่อออนเซ็นลอยฟ้า Skyspa ชั้น 17 แช่น้ำอุ่นชมวิวตึกระฟ้าโอซาก้ายามค่ำคืน อาหารเช้าอร่อยมาก",
        searchQuery: "Candeo Hotels Osaka Namba"
      },
      {
        name: "Dormy Inn Premium Namba Natural Hot Spring",
        japanese: "天然温泉 夕霧の湯 ドーミーインPREMIUMなんば",
        type: "โรงแรมพร้อมออนเซ็น & ราเมงฟรี",
        distance: "เดิน 6 นาทีถึงโดทงโบริ / นิปปอนบาชิ",
        priceJPY: 15000,
        priceRange: "¥12,000 - ¥19,000 / คืน",
        rating: 4.7,
        highlight: "บ่อน้ำแร่ออนเซ็นธรรมชาติแท้ ซาวน่า และบริการราเมงรอบดึกฟรีอันเป็นเอกลักษณ์",
        searchQuery: "Dormy Inn Premium Namba Osaka"
      }
    ]
  },
  {
    id: "osaka-castle",
    title: "ปราสาทโอซาก้า & สวนนิชิโนมารุ (Osaka Castle & Park)",
    japanese: "大阪城 (おおさかじょう)",
    region: "osaka",
    category: "attraction",
    seasons: ["spring", "autumn"],
    tag: "ปราสาทประวัติศาสตร์ / ซากุระ",
    rating: 4.7,
    keyword: "osaka castle japan ancient historic fortress moat",
    image: "https://images.unsplash.com/photo-1580138051672-325eb98b2749?auto=format&fit=crop&w=1200&q=80",
    description: "ปราสาทห้าชั้นอันยิ่งใหญ่ที่สร้างโดยโทโยโตมิ ฮิเดโยชิ ล้อมรอบด้วยคูน้ำหินและสวนสาธารณะขนาดใหญ่ที่มีต้นซากุระกว่า 3,000 ต้น และใบแปะก๊วยสีทองในฤดูใบไม้ร่วง",
    transport: "🚇 เดิน 10 นาทีจากสถานี Osakajokoen (JR Loop Line) หรือสถานี Tanimachi 4-chome (Osaka Metro)",
    bestTime: "09:00 - 16:30 น. (ช่วงซากุระบานปลาย มี.ค. - ต้น เม.ย. มีการเปิดไฟประดับสวยงาม)",
    foodTips: "แวะทานทาโกะยากิและไอศกรีมมัทฉะที่ลาน Jo-Terrace Osaka หน้าทางเข้าปราสาท",
    estimatedCost: "เข้าสวนฟรี | ค่าขึ้นชมหอคอยปราสาท 600 เยน (ฟรีเมื่อใช้ Osaka Amazing Pass)",
    mustTry: ["ขึ้นชมวิวพาโนรามาบนชั้น 8 ของปราสาท", "ล่องเรือโบราณ Gozabune ในคูน้ำปราสาท", "เดินเล่นในสวนนิชิโนมารุ"],
    nearbyHotels: [
      {
        name: "Hotel New Otani Osaka",
        japanese: "ホテルニューオータニ大阪",
        type: "โรงแรมหรูระดับ 5 ดาววิวปราสาทโอซาก้า",
        distance: "เดิน 5 นาทีถึงสวนปราสาทโอซาก้า",
        priceJPY: 27000,
        priceRange: "¥22,000 - ¥35,000 / คืน",
        rating: 4.8,
        highlight: "มองเห็นวิวปราสาทโอซาก้าและคูน้ำชัดเจนจากห้องพัก บรรยากาศร่มรื่น ติดห้างและร้านอาหาร",
        searchQuery: "Hotel New Otani Osaka"
      },
      {
        name: "Hotel Keihan Kyobashi Grande",
        japanese: "ホテル京阪 京橋 グランデ",
        type: "โรงแรมเชื่อมต่อสถานี JR & Keihan",
        distance: "เดิน 10 นาทีถึงปราสาทโอซาก้า",
        priceJPY: 13000,
        priceRange: "¥10,000 - ¥16,000 / คืน",
        rating: 4.6,
        highlight: "เชื่อมต่อสถานี Kyobashi นั่งรถไฟ JR Loop Line ไปปราสาทโอซาก้าเพียง 1 สถานี เดินทางไปเกียวโตก็นั่งสาย Keihan ต่อเดียว",
        searchQuery: "Hotel Keihan Kyobashi Grande"
      },
      {
        name: "The Bridge Hotel Shinsaibashi",
        japanese: "ザ ブリッジホテル 心斎橋",
        type: "โรงแรมบริการเครื่องดื่ม & ไอศกรีมฟรี",
        distance: "นั่งใต้ดิน 10 นาทีถึงสถานีปราสาทโอซาก้า",
        priceJPY: 14000,
        priceRange: "¥11,000 - ¥18,000 / คืน",
        rating: 4.7,
        highlight: "เสิร์ฟเบียร์สด ไวน์ ไอศกรีม และราเมงฟรีทุกคืน มีกิจกรรมสวมชุดกิโมโนและวัฒนธรรมญี่ปุ่นฟรี",
        searchQuery: "The Bridge Hotel Shinsaibashi Osaka"
      }
    ]
  },
  {
    id: "osaka-usj",
    title: "ยูนิเวอร์แซล สตูดิโอส์ เจแปน (Universal Studios Japan - USJ)",
    japanese: "ユニバーサル・スタジオ・ジャパン",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year", "spring", "summer", "autumn", "winter"],
    tag: "ธีมพาร์คระดับโลก / มาริโอ้ & แฮร์รี่",
    rating: 4.9,
    keyword: "universal studios japan usj super nintendo world mario harry potter osaka",
    image: "https://images.unsplash.com/photo-1612404459571-ccef4b6588e7?auto=format&fit=crop&w=1200&q=80",
    description: "สวนสนุกระดับโลกอันดับ 1 ของญี่ปุ่น ไฮไลต์ห้ามพลาดคือ Super Nintendo World (โซน Mario & Donkey Kong Country ใหม่ล่าสุด) และ The Wizarding World of Harry Potter ปราสาทฮอกวอตส์สุดอลังการ",
    transport: "🚆 นั่งรถไฟ JR Yumesaki Line มาลงที่สถานี Universal City Station เดินเพียง 3 นาทีถึงหน้าประตูสวนสนุก",
    bestTime: "08:30 - 21:00 น. (แนะนำให้ไปถึงก่อนเวลาเปิดอย่างน้อย 45-60 นาที เพื่อวิ่งเข้าโซน Nintendo)",
    foodTips: "ห้ามพลาด: บัตเตอร์เบียร์ (Butterbeer) ร้อน/เย็น, พายเนื้อและไก่ย่างร้าน Three Broomsticks, คาเฟ่ Kinopio's Cafe",
    estimatedCost: "ตั๋ว 1 วัน: ¥8,600 - ¥10,900 (ขึ้นอยู่กับช่วงเวลา Tier A-E) | Express Pass ¥7,800 - ¥23,800",
    mustTry: ["สวมสายรัด Power-Up Band ชกบล็อกเหรียญในโซน Mario", "เล่นเครื่องเล่น Mario Kart: Koopa's Challenge", "ชิมบัตเตอร์เบียร์หน้าปราสาทฮอกวอตส์"],
    nearbyHotels: [
      {
        name: "The Park Front Hotel at Universal Studios Japan",
        japanese: "ザ パーク フロント ホテル アット ユニバーサル・スタジオ・ジャパン",
        type: "โรงแรมหน้าประตูทางเข้า USJ",
        distance: "เดิน 1 นาทีถึงประตูสวนสนุก USJ",
        priceJPY: 11800,
        priceRange: "¥11,800 - ¥28,000 / คืน",
        rating: 4.9,
        highlight: "ทำเลดีที่สุดใน USJ อยู่หน้าประตูทางเข้าเป๊ะ มองเห็นวิวมุมสูงของสวนสนุก ตื่นเช้าไปต่อแถวได้ก่อนใคร",
        searchQuery: "The Park Front Hotel at Universal Studios Japan"
      },
      {
        name: "Hotel Universal Port Vita",
        japanese: "ホテル ユニバーサル ポート ヴィータ",
        type: "โรงแรมธีมมินเนียนสำหรับครอบครัว",
        distance: "เดิน 3 นาทีถึงทางเข้า USJ",
        priceJPY: 6550,
        priceRange: "¥6,550 - ¥18,000 / คืน",
        rating: 4.8,
        highlight: "โรงแรมอย่างเป็นทางการของ USJ มีมินเนียนต้อนรับตั้งแต่ล็อบบี้ ห้องพักกว้าง อาหารเช้าเลิศรส",
        searchQuery: "Hotel Universal Port Vita Osaka"
      },
      {
        name: "LIBER HOTEL OSAKA (Sakurajima)",
        japanese: "リーベルホテル 大阪 (天然温泉スパ)",
        type: "โรงแรมหรูพร้อมสปาออนเซ็นธรรมชาติขนาดใหญ่",
        distance: "ติดสถานี Sakurajima (1 สถานีจาก USJ)",
        priceJPY: 6800,
        priceRange: "¥6,800 - ¥18,000 / คืน",
        rating: 4.8,
        highlight: "มีสปาออนเซ็นธรรมชาติขนาดใหญ่และซาวน่าริมแม่น้ำ ระเบียงชมวิวกว้าง โปรเริ่มต้นคุ้มค่ามาก",
        searchQuery: "LIBER HOTEL OSAKA Sakurajima"
      }
    ]
  },
  {
    id: "kansai-shinkansen-guide",
    title: "คู่มือ Shinkansen โตเกียว ↔ โอซาก้า / เกียวโต",
    japanese: "東海道新幹線 (のぞみ・ひかり)",
    region: "osaka",
    category: "transport",
    seasons: ["all_year"],
    tag: "รถไฟความเร็วสูง / Shinkansen",
    rating: 4.9,
    keyword: "shinkansen bullet train tokyo kyoto osaka japan rail",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description: "เดินทางข้ามภูมิภาคจาก Tokyo สู่ Kyoto/Osaka ใช้เวลาเพียง 2 ชั่วโมง 15 นาที ด้วยรถไฟ Tokaido Shinkansen (ขบวน Nozomi / Hikari) สะดวก รวดเร็ว ตรงเวลาเป๊ะระดับวินาที",
    transport: "🚅 ขึ้นจากสถานี Tokyo หรือ Shinagawa Station ไปลงสถานี Kyoto หรือ Shin-Osaka Station",
    bestTime: "เลือกที่นั่งฝั่งขวา (ที่นั่งแถว E) ตอนเดินทางจาก Tokyo ไป Osaka เพื่อชมวิวภูเขาไฟฟูจิ",
    foodTips: "ซื้อข้าวกล่อง Shinkansen Bento และไอศกรีมแข็งในตำนาน (Super Hard Ice Cream) บนรถไฟ",
    estimatedCost: "ค่าตั๋วประมาณ 13,870 - 14,920 เยน (เที่ยวเดียว)",
    mustTry: ["จองที่นั่งริมหน้าต่างแถว E เพื่อดูวิวฟูจิ", "ชิมไอศกรีมวานิลลาเข้มข้นบนรถไฟ", "จองตั๋วล่วงหน้าผ่านแอป SmartEX"],
    nearbyHotels: [
      {
        name: "Courtyard by Marriott Shin-Osaka Station",
        japanese: "コートヤード・バイ・マリオット 新大阪ステーション",
        type: "โรงแรมหรู 5 ดาวเชื่อมตรงสถานี Shinkansen",
        distance: "เชื่อมต่อสถานี Shin-Osaka (เดิน 1 นาที)",
        priceJPY: 28000,
        priceRange: "¥24,000 - ¥36,000 / คืน",
        rating: 4.8,
        highlight: "เดินลงมาชานชาลา Shinkansen ได้ทันที มีสะพานเชื่อมในร่ม เหมาะมากสำหรับผู้ที่เดินทางข้ามเมืองบ่อยๆ",
        searchQuery: "Courtyard by Marriott Shin-Osaka Station"
      },
      {
        name: "karaksa hotel grande Shin-Osaka Tower",
        japanese: "からくさホテルグランデ新大阪タワー",
        type: "โรงแรมโมเดิร์นพร้อมบ่ออาบน้ำรวมขนาดใหญ่",
        distance: "เดิน 5 นาทีจากสถานี Shin-Osaka",
        priceJPY: 16000,
        priceRange: "¥13,000 - ¥20,000 / คืน",
        rating: 4.7,
        highlight: "มีบ่ออาบน้ำรวมและซาวน่า ห้องพักเชื่อมต่อกันได้สำหรับกลุ่มครอบครัว สะดวกต่อการลากกระเป๋าเดินทาง",
        searchQuery: "karaksa hotel grande Shin-Osaka Tower"
      },
      {
        name: "Super Hotel JR Shin-Osaka Higashiguchi",
        japanese: "スーパーホテルJR新大阪東口",
        type: "บัดเจ็ทคุ้มค่าพร้อมอาหารเช้าฟรี",
        distance: "เดิน 4 นาทีจากสถานี Shin-Osaka ทางออกทิศตะวันออก",
        priceJPY: 10500,
        priceRange: "¥8,500 - ¥13,000 / คืน",
        rating: 4.5,
        highlight: "มีบ่อน้ำแร่ธรรมชาติ อาหารเช้าขนมปังอบสดใหม่ฟรี คุ้มค่าและประหยัดงบเดินทาง",
        searchQuery: "Super Hotel JR Shin Osaka Higashiguchi"
      }
    ]
  },

  // --- MT. FUJI & CHUBU ---
  {
    id: "fuji-kawaguchiko",
    title: "ทะเลสาบคาวากุจิโกะ & เจดีย์ชูเรโตะ (Lake Kawaguchiko & Chureito Pagoda)",
    japanese: "河口湖 & 新倉山浅間公園 忠霊塔",
    region: "chubu",
    category: "attraction",
    seasons: ["spring", "autumn", "winter"],
    tag: "ภูเขาไฟฟูจิ / วิวโปสการ์ด",
    rating: 4.9,
    keyword: "mount fuji kawaguchiko chureito pagoda japan peak",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80",
    description: "จุดชมวิวภูเขาไฟฟูจิที่คลาสสิกและสวยที่สุดในโลก ภาพเจดีย์ห้าชั้นสีแดงชูเรโตะคู่กับภูเขาไฟฟูจิและดอกซากุระหรือใบไม้แดง เป็นมุมโปสการ์ดในฝันของนักท่องเที่ยวทุกคน",
    transport: "🚌 นั่งรถบัส Highway Bus จากชินจูกุ (Shinjuku Expressway Bus Terminal) ตรงถึง Kawaguchiko (1 ชม. 45 นาที) หรือนั่งรถไฟด่วน Fuji Excursion",
    bestTime: "ช่วงเช้า 06:30 - 10:00 ฟ้ามักจะเปิดและเห็นยอดฟูจิชัดเจนที่สุด (ฤดูหนาว ธ.ค. - ก.พ. ฟ้าใสที่สุด)",
    foodTips: "ห้ามพลาด: ซุปเส้นโฮโต (Hoto Fudo) บะหมี่เส้นแบนต้มซุปฟักทองมิโสะร้อนๆ รสชาติเข้มข้น",
    estimatedCost: "ค่ารถบัสไป-กลับ 4,400 เยน | ค่าเข้าเจดีย์ชูเรโตะ ฟรี",
    mustTry: ["ขึ้นบันได 398 ขั้นไปจุดชมวิวเจดีย์ชูเรโตะ", "ปั่นจักรยานรับลมรอบทะเลสาบคาวากุจิโกะ", "ชิมซุปโฮโตหม้อไฟร้าน Hoto Fudo"],
    nearbyHotels: [
      {
        name: "Kozantei Ubuya (湖山亭 うぶや)",
        japanese: "湖山亭 うぶや (天然温泉 露天風呂)",
        type: "เรียวกังออนเซ็นระดับลักชัวรีวิวฟูจิสะท้อนน้ำ",
        distance: "ริมทะเลสาบคาวากุจิโกะ",
        priceJPY: 62000,
        priceRange: "¥48,000 - ¥85,000 / คืน",
        rating: 4.9,
        highlight: "วิวภูเขาไฟฟูจิสะท้อนผิวน้ำ (Sakasa Fuji) จากห้องพักและบ่อออนเซ็นส่วนตัวทุกห้อง ดินเนอร์เนื้อวากิวระดับพรีเมียม",
        searchQuery: "Kozantei Ubuya Kawaguchiko"
      },
      {
        name: "Fuji View Hotel",
        japanese: "富士ビューホテル",
        type: "โรงแรมคลาสสิกสวนกว้างวิวฟูจิเต็มตา",
        distance: "ริมทะเลสาบคาวากุจิโกะ",
        priceJPY: 28000,
        priceRange: "¥22,000 - ¥36,000 / คืน",
        rating: 4.8,
        highlight: "สวนสไตล์ญี่ปุ่นขนาดใหญ่ มีต้นซากุระกว่า 300 ต้น และบ่อออนเซ็นกลางแจ้งวิวภูเขาไฟฟูจิ",
        searchQuery: "Fuji View Hotel Kawaguchiko"
      },
      {
        name: "Mizno Hotel (The Water Hotel)",
        japanese: "水野ホテル",
        type: "โรงแรมบูติกบนเนินเขา วิวพาโนรามา",
        distance: "เดิน 10 นาทีถึงทะเลสาบ",
        priceJPY: 25000,
        priceRange: "¥20,000 - ¥32,000 / คืน",
        rating: 4.8,
        highlight: "อ่างจากุซซี่ออนเซ็นบนดาดฟ้ามองเห็นภูเขาไฟฟูจิแบบ 180 องศา บรรยากาศโรแมนติกและสงบเงียบ",
        searchQuery: "Mizno Hotel Kawaguchiko"
      }
    ]
  },
  {
    id: "chubu-shirakawago",
    title: "หมู่บ้านมรดกโลก ชิราคาวาโกะ (Shirakawa-go Village)",
    japanese: "白川郷 (しらかわごう)",
    region: "chubu",
    category: "attraction",
    seasons: ["winter", "summer", "autumn"],
    tag: "หมู่บ้านโบราณ / หิมะตกหนา",
    rating: 4.9,
    keyword: "shirakawago traditional village japan snow gassho",
    image: "https://images.unsplash.com/photo-1623078788671-f168da577997?auto=format&fit=crop&w=1200&q=80",
    description: "หมู่บ้านชาวนาโบราณกลางหุบเขาที่ได้รับการขึ้นทะเบียนเป็นมรดกโลก เอกลักษณ์คือบ้านทรงพนมมือ (Gassho-zukuri) มุงด้วยหญ้าคาหนาเตอะเพื่อรองรับหิมะตกหนักในฤดูหนาว",
    transport: "🚌 นั่งรถบัส Nohi Bus จากสถานี Takayama หรือ Kanazawa มาลงที่ Shirakawa-go Bus Terminal (ประมาณ 50-85 นาที)",
    bestTime: "ฤดูหนาวช่วงหิมะขาวโพลน (ม.ค. - ก.พ.) หรือฤดูใบไม้เขียวขจี (พ.ค. - ก.ย.)",
    foodTips: "ห้ามพลาด: เนื้อวัวฮิดะย่างมิโสะ (Hida Beef), ซาลาเปาไส้เนื้อฮิดะ, ข้าวเกรียบปิ้งเตาถ่าน",
    estimatedCost: "เข้าชมหมู่บ้านฟรี (ค่าเข้าบ้านโบราณหลังละ 300 - 400 เยน)",
    mustTry: ["ขึ้นจุดชมวิว Shiroyama Viewpoint ถ่ายรูปมุมสูง", "เข้าชมภายในบ้านโบราณ和田家 (Wada House)", "กินเนื้อฮิดะย่างเสียบไม้ชุ่มฉ่ำ"],
    nearbyHotels: [
      {
        name: "Shirakawa-go Gassho Minsyuku (Kanjiya / Kidoya)",
        japanese: "白川郷 合掌民宿 (かんじや / きどや)",
        type: "โฮมสเตย์บ้านโบราณทรงพนมมือมรดกโลก",
        distance: "ตั้งอยู่ใจกลางหมู่บ้านชิราคาวาโกะ",
        priceJPY: 20000,
        priceRange: "¥16,000 - ¥24,000 / คน",
        rating: 4.8,
        highlight: "นอนค้างคืนในบ้านมรดกโลกอายุ 300 ปี สัมผัสบรรยากาศเตาผิงอิโรริโบราณและอาหารพื้นบ้านแสนอบอุ่น",
        searchQuery: "Shirakawago Gassho Minshuku"
      },
      {
        name: "Oyado Koto No Yume (Takayama)",
        japanese: "お宿 古都の夢 (高山温泉)",
        type: "เรียวกังออนเซ็นใจกลางเมืองทาคายามะ",
        distance: "นั่งบัส 50 นาทีจากชิราคาวาโกะ (ติด Takayama Station)",
        priceJPY: 26000,
        priceRange: "¥22,000 - ¥34,000 / คืน",
        rating: 4.8,
        highlight: "ตกแต่งสไตล์เกียวโตโบราณ มีบ่อออนเซ็นกลางแจ้ง เสิร์ฟดินเนอร์เนื้อฮิดะเกรด A5 ย่างเตาถ่าน",
        searchQuery: "Oyado Koto No Yume Takayama"
      },
      {
        name: "Hida Hotel Plaza (Takayama)",
        japanese: "ひだホテルプラザ",
        type: "โรงแรมหรูพร้อมออนเซ็นลอยฟ้าชมวิวเจแปนแอลป์",
        distance: "เดิน 5 นาทีจากสถานี Takayama",
        priceJPY: 17000,
        priceRange: "¥14,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "บ่อออนเซ็นลอยฟ้าชั้นบนสุดชมวิวเทือกเขาหิมะ และสปาเกลือหิมาลายัน",
        searchQuery: "Hida Hotel Plaza Takayama"
      }
    ]
  },

  // --- HOKKAIDO ---
  {
    id: "hokkaido-otaru-canal",
    title: "คลองโอตารุ & ถนนสายโรแมนติก (Otaru Canal & Sakaimachi)",
    japanese: "小樽運河 & 堺町通り",
    region: "hokkaido",
    category: "attraction",
    seasons: ["winter", "summer"],
    tag: "คลองโบราณ / ขนมหวานชื่อดัง",
    rating: 4.7,
    keyword: "otaru canal hokkaido winter snow gas lamp dusk",
    image: "https://images.unsplash.com/photo-1563282870-e9e8d69c4271?auto=format&fit=crop&w=1200&q=80",
    description: "เมืองท่าสุดโรแมนติก มีคลองโอตารุเรียงรายด้วยโกดังหินโบราณและโคมไฟแก๊สยามค่ำคืน ถนนซาไกมาจิเต็มไปด้วยร้านเครื่องแก้ว กล่องดนตรี และร้านชีสเค้กชื่อดังระดับโลก",
    transport: "🚆 นั่งรถไฟ JR Rapid Airport จากสถานี Sapporo เพียง 35 นาที มาลงสถานี Otaru Station",
    bestTime: "ช่วงฤดูหนาว (ธ.ค. - ก.พ.) 16:30 น. เป็นต้นไป มีไฟประดับและแสงเทียนบนหิมะริมคลอง",
    foodTips: "ห้ามพลาด: ชีสเค้กสดสองชั้น LeTAO Main Store, ชูครีมและไอศกรีม Kitakaro, ซูชิสดระดับตำนานถนน Sushiya-dori",
    estimatedCost: "เดินชมคลองฟรี (งบชิมขนมและกาแฟ 1,200 - 2,500 เยน)",
    mustTry: ["ถ่ายรูปคู่คลองโอตารุยามค่ำคืน", "แวะฟังเสียงกล่องดนตรีที่ Otaru Music Box Museum", "กินชีสเค้ก Double Fromage ที่ร้านต้นตำรับ"],
    nearbyHotels: [
      {
        name: "Otaru Furukawa",
        japanese: "小樽運河の宿 おたる ふる川",
        type: "เรียวกังออนเซ็นติดริมคลองโอตารุ",
        distance: "เดิน 1 นาทีถึงคลองโอตารุ",
        priceJPY: 27000,
        priceRange: "¥22,000 - ¥35,000 / คืน",
        rating: 4.8,
        highlight: "วิวคลองโอตารุจากห้องพัก บ่อออนเซ็นไม้ฮิโนกิและบ่อหินธรรมชาติ บรรยากาศโรแมนติกย้อนยุคเมจิ",
        searchQuery: "Otaru Furukawa Ryokan Hokkaido"
      },
      {
        name: "Dormy Inn Premium Otaru",
        japanese: "天然温泉 灯の湯 ドーミーインPREMIUM小樽",
        type: "โรงแรมตรงข้ามสถานีพร้อมบุฟเฟต์ปลาดิบ",
        distance: "เดิน 1 นาทีจากสถานี Otaru Station",
        priceJPY: 16000,
        priceRange: "¥13,000 - ¥20,000 / คืน",
        rating: 4.7,
        highlight: "บุฟเฟต์อาหารเช้าตักไข่ปลาแซลมอน (Ikura) ไม่อั้น มีบ่อออนเซ็นธรรมชาติและราเมงฟรีรอบดึก",
        searchQuery: "Dormy Inn Premium Otaru"
      },
      {
        name: "UNWIND HOTEL & BAR OTARU",
        japanese: "アンワインドホテル＆バー 小樽",
        type: "โรงแรมบูติกสไตล์ยุโรปคลาสสิก",
        distance: "เดิน 5 นาทีถึงคลองโอตารุ",
        priceJPY: 17500,
        priceRange: "¥14,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "รีโนเวทจากอาคารประวัติศาสตร์สไตล์อังกฤษ เสิร์ฟไวน์ฟรีทุกเย็นในบาร์สุดคลาสสิก",
        searchQuery: "UNWIND HOTEL & BAR OTARU"
      }
    ]
  },
  {
    id: "hokkaido-ramen-alley",
    title: "ตรอกราเมงซัปโปโร & อาหารฮอกไกโด (Ganso Sapporo Ramen Yokocho)",
    japanese: "元祖さっぽろラーメン横丁",
    region: "hokkaido",
    category: "food",
    seasons: ["winter", "all_year"],
    tag: "มิโซะราเมง / ปูยักษ์ฮอกไกโด",
    rating: 4.8,
    keyword: "japanese ramen bowl soup pork noodles miso egg",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    description: "ต้นกำเนิดมิโซะราเมงอันเลื่องชื่อ ตรอกเล็กๆ ในย่านซูซูกิโนะที่รวมร้านราเมงสูตรเด็ดไว้ถึง 17 ร้าน เสิร์ฟราเมงน้ำซุปมิโซะเข้มข้นใส่เนยและข้าวโพดหวานฮอกไกโด",
    transport: "🚇 เดิน 3 นาทีจากสถานี Susukino Station (Sapporo Subway Namboku Line)",
    bestTime: "18:00 - 02:00 น. (เหมาะมากสำหรับทานเป็นมื้อค่ำหรือแก้หนาว)",
    foodTips: "ห้ามพลาด: มิโซะราเมงใส่เนยข้าวโพด, ซุปแกงกะหรี่ Soup Curry, ขาปูยักษ์ฮอกไกโด (Taraba/Zuwaigani)",
    estimatedCost: "ราเมงชามละ 900 - 1,500 เยน",
    mustTry: ["สั่งราเมงซุปมิโซะท็อปปิ้งเนยและข้าวโพดหวาน", "ชิมเนื้อแกะย่างเจงกิสข่าน (Jingisukan)", "ดื่มเบียร์สด Sapporo Classic สดใหม่"],
    nearbyHotels: [
      {
        name: "Dormy Inn Premium Sapporo",
        japanese: "天然温泉 石狩の湯 ドーミーインPREMIUM札幌",
        type: "โรงแรมใจกลางย่านกินดื่มทานุกิโคจิ",
        distance: "เดิน 5 นาทีถึงตรอกราเมงซูซูกิโนะ",
        priceJPY: 17000,
        priceRange: "¥14,000 - ¥22,000 / คืน",
        rating: 4.8,
        highlight: "บุฟเฟต์ข้าวหน้าปลาดิบซีฟู้ดฮอกไกโดแบบไม่อั้น มีออนเซ็นธรรมชาติกลางเมือง และราเมงฟรีรอบดึก",
        searchQuery: "Dormy Inn Premium Sapporo"
      },
      {
        name: "Vessel Hotel Campana Susukino",
        japanese: "ベッセルホテルカンパーナすすきの",
        type: "โรงแรมโมเดิร์นพร้อมซาวน่าและบ่ออาบน้ำรวม",
        distance: "เดิน 4 นาทีถึงตรอกราเมงซูซูกิโนะ",
        priceJPY: 14500,
        priceRange: "¥12,000 - ¥18,000 / คืน",
        rating: 4.7,
        highlight: "มีบ่ออาบน้ำรวมขนาดใหญ่ ซาวน่าฟินแลนด์ อาหารเช้าใช้วัตถุดิบสดจากฮอกไกโดแท้ๆ",
        searchQuery: "Vessel Hotel Campana Susukino"
      },
      {
        name: "Sapporo Grand Hotel",
        japanese: "札幌グランドホテル",
        type: "โรงแรมระดับตำนานเชื่อมทางเดินใต้ดิน",
        distance: "เชื่อมทางเดินใต้ดิน เดิน 10 นาทีถึงซูซูกิโนะ",
        priceJPY: 19000,
        priceRange: "¥15,000 - ¥25,000 / คืน",
        rating: 4.7,
        highlight: "โรงแรมประวัติศาสตร์เก่าแก่ที่สุดในซัปโปโร เชื่อมทางเดินใต้ดินไม่ต้องเดินฝ่าหิมะ",
        searchQuery: "Sapporo Grand Hotel"
      }
    ]
  },

  // --- FUKUOKA ---
  {
    id: "fukuoka-yatai-nakasu",
    title: "ร้านสตรีทฟู้ดแผงลอยยาไต ย่านนากาสุ (Nakasu Yatai Stalls)",
    japanese: "中洲 屋台街 (やたい)",
    region: "fukuoka",
    category: "food",
    seasons: ["all_year", "autumn", "spring"],
    tag: "แผงลอยยาไต / ทงคตสึราเมง",
    rating: 4.7,
    keyword: "fukuoka yatai street food stalls night hakata ramen",
    image: "https://images.unsplash.com/photo-1685845283904-f67cfc9a85d5?auto=format&fit=crop&w=1200&q=80",
    description: "วัฒนธรรมร้านอาหารริมทางแบบดั้งเดิมของฟุกุโอกะ ร้านแผงลอยเล็กๆ ริมแม่น้ำนากาสุ เสิร์ฟทงคตสึราเมงซุปกระดูกหมูเข้มข้น, เกี๊ยวซ่ากระทะร้อน (Hakata Gyoza), และยากิโทริ",
    transport: "🚇 เดิน 7 นาทีจากสถานี Nakasu-Kawabata หรือสถานี Tenjin (Fukuoka City Subway)",
    bestTime: "18:30 - 23:30 น. บรรยากาศริมแม่น้ำคึกคักและอากาศเย็นสบาย",
    foodTips: "ห้ามพลาด: ฮากาตะทงคตสึราเมงเส้นเล็กแข็ง, หม้อไฟไส้วัว Motsunabe, ข้าวหน้าไข่ปลาค็อด Mentaiko",
    estimatedCost: "งบกินดื่มยาไต 1,500 - 3,500 เยนต่อคน",
    mustTry: ["นั่งกินราเมงข้างคนท้องถิ่นในซุ้มยาไต", "สั่งเกี๊ยวซ่าชิ้นพอดีคำ Hakata Hitokuchi Gyoza", "ชิมไข่ปลา Mentaiko รสเผ็ดกลมกล่อม"],
    nearbyHotels: [
      {
        name: "Miyako Hotel Hakata",
        japanese: "都ホテル 博多 (温泉プール＆スパ)",
        type: "โรงแรมหรู 5 ดาวเชื่อมตรงสถานี Hakata",
        distance: "เดิน 10 นาทีถึงซุ้มยาไตริมแม่น้ำนากาสุ",
        priceJPY: 27000,
        priceRange: "¥22,000 - ¥35,000 / คืน",
        rating: 4.9,
        highlight: "มีสระว่ายน้ำออนเซ็นน้ำตกบนดาดฟ้าชมวิวเมืองฟุกุโอกะ เชื่อมตรงสถานี Hakata Shinkansen",
        searchQuery: "Miyako Hotel Hakata Fukuoka"
      },
      {
        name: "Candeo Hotels Fukuoka Tenjin",
        japanese: "カンデオホテルズ福岡天神",
        type: "โรงแรมพร้อมสกายสปาออนเซ็นชั้นดาดฟ้า",
        distance: "เดิน 8 นาทีถึงซุ้มยาไตย่านนากาสุ",
        priceJPY: 17000,
        priceRange: "¥14,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "บ่อออนเซ็นลอยฟ้ากลางแจ้ง Skyspa แช่น้ำอุ่นใต้แสงดาวหลังกินดื่มยาไตริมแม่น้ำ",
        searchQuery: "Candeo Hotels Fukuoka Tenjin"
      },
      {
        name: "The Gate Hotel Fukuoka by Hulic",
        japanese: "THE GATE HOTEL 福岡 by HULIC",
        type: "โรงแรมหรูสไตล์บูติกใจกลางเทนจิน",
        distance: "เดิน 7 นาทีถึงนากาสุ",
        priceJPY: 22000,
        priceRange: "¥18,000 - ¥28,000 / คืน",
        rating: 4.8,
        highlight: "โรงแรมใหม่ดีไซน์พรีเมียม ใกล้แหล่งช้อปปิ้งและร้านอาหารชื่อดังของฟุกุโอกะ",
        searchQuery: "The Gate Hotel Fukuoka by Hulic"
      }
    ]
  },

  // --- NEW TOKYO & KANTO DESTINATIONS ---
  {
    id: "tokyo-teamlab-planets",
    title: "พิพิธภัณฑ์ศิลปะดิจิทัล teamLab Planets โตเกียว (teamLab Planets Toyosu)",
    japanese: "チームラボプラネッツ TOKYO (豊洲)",
    region: "tokyo",
    category: "attraction",
    seasons: ["all_year", "summer", "winter"],
    tag: "ศิลปะดิจิทัล / ลุยน้ำ",
    rating: 4.9,
    keyword: "teamlab planets tokyo digital art museum water mirror",
    image: "https://images.unsplash.com/photo-1785637981940-0ec1cfefed10?auto=format&fit=crop&w=1200&q=80",
    description: "นิทรรศการศิลปะดิจิทัลระดับโลกที่ให้เดินลุยน้ำ ถ่ายรูปท่ามกลางสวนดอกไม้นับล้านดอก และดงไฟคริสตัลอินฟินิตี้สุดตระการตา",
    transport: "🚝 นั่งรถไฟสาย Yurikamome ลงสถานี Shin-Toyosu Station (เดิน 1 นาที)",
    bestTime: "รอบเช้า 09:00 - 10:30 น. หรือรอบค่ำหลัง 18:00 น. เพื่อหลีกเลี่ยงคิวหนาแน่น",
    foodTips: "ห้ามพลาด: ราเมงวีแกน Vegan Ramen UZU ด้านหน้ามิวเซียม และซูชิสดใหม่ที่ตลาดโทโยสึ (Toyosu Market)",
    estimatedCost: "ตั๋วเข้าชมผู้ใหญ่ 3,800 - 4,200 เยน",
    mustTry: ["เดินลุยน้ำในบ่อปลาคาร์ปดิจิทัล", "ถ่ายรูปในห้องไฟคริสตัล The Infinite Crystal Universe", "สัมผัสสวนกล้วยไม้ลอยได้ Floating Flower Garden"],
    nearbyHotels: [
      {
        name: "Hotel Villa Fontaine Grand Tokyo-Ariake",
        japanese: "ホテル ヴィラフォンテーヌ グランド 東京有明",
        type: "โรงแรมโมเดิร์นพร้อมบ่อน้ำแร่ออนเซ็นขนาดใหญ่",
        distance: "นั่งรถไฟ Yurikamome 4 นาทีถึง teamLab",
        priceJPY: 15500,
        priceRange: "¥13,000 - ¥20,000 / คืน",
        rating: 4.7,
        highlight: "มีสปาน้ำแร่ธรรมชาติ Izumi Tenku no Yu เปิด 24 ชม. เชื่อมกับห้าง Ariake Garden",
        searchQuery: "Hotel Villa Fontaine Grand Tokyo Ariake"
      },
      {
        name: "La Vista Tokyo Bay",
        japanese: "ラビスタ東京ベイ",
        type: "โรงแรมหรูออนเซ็นวิวอ่าวโตเกียวและโตเกียวทาวเวอร์",
        distance: "นั่งรถไฟ Yurikamome 2 นาทีถึง teamLab",
        priceJPY: 24000,
        priceRange: "¥19,000 - ¥32,000 / คืน",
        rating: 4.9,
        highlight: "ออนเซ็นลอยฟ้าชั้นบนสุดชมวิวสะพานเรนโบว์บริดจ์ บุฟเฟต์อาหารเช้าเสิร์ฟไข่ปลาแซลมอนไม่อั้น",
        searchQuery: "La Vista Tokyo Bay"
      },
      {
        name: "Mitsui Garden Hotel Toyosu Premier",
        japanese: "三井ガーデンホテル豊洲プレミア",
        type: "โรงแรมวิวเมืองพาโนรามาเชื่อมสถานี Toyosu",
        distance: "เดิน 12 นาที หรือนั่งรถไฟ 1 สถานี",
        priceJPY: 21000,
        priceRange: "¥17,000 - ¥26,000 / คืน",
        rating: 4.8,
        highlight: "ล็อบบี้และบ่ออาบน้ำลอยฟ้าชั้น 36 มองเห็นอ่าวโตเกียวและสกายไลน์ยามค่ำคืนงดงาม",
        searchQuery: "Mitsui Garden Hotel Toyosu Premier"
      }
    ]
  },
  {
    id: "tokyo-harajuku-meiji",
    title: "ย่านฮาราจูกุ & ศาลเจ้าเมจิ (Harajuku Takeshita & Meiji Jingu)",
    japanese: "原宿 竹下通り & 明治神宮",
    region: "tokyo",
    category: "attraction",
    seasons: ["all_year", "spring", "autumn"],
    tag: "แฟชั่นสตรีท / ศาลเจ้าป่า",
    rating: 4.8,
    keyword: "harajuku takeshita street tokyo meiji shrine torii gate",
    image: "https://images.unsplash.com/photo-1703443371292-0d9081cc4787?auto=format&fit=crop&w=1200&q=80",
    description: "จุดตัดระหว่างวัฒนธรรมป๊อปแฟชั่นสุดคาวาอี้บนถนนทาเคชิตะ กับความสงบร่มรื่นของป่าศักดิ์สิทธิ์ใจกลางเมืองหลวง ณ ศาลเจ้าเมจิ",
    transport: "🚆 นั่งรถไฟ JR Yamanote Line ลงสถานี Harajuku Station (ทางออก Omotesando)",
    bestTime: "ช่วงเช้า 08:00 - 10:00 น. สำหรับศาลเจ้าเมจิ และ 11:30 - 16:00 น. สำหรับเดินช้อปปิ้ง",
    foodTips: "ห้ามพลาด: เครปญี่ปุ่นสูตรต้นตำรับร้าน Marion Crepes, แพนเค้กเด้งดึ๋ง A Happy Pancake, กาแฟสตรีทแฟชั่นย่านโอโมเตะซันโด",
    estimatedCost: "ศาลเจ้าเข้าฟรี (ของกินและขนม 500 - 1,500 เยน)",
    mustTry: ["เดินลอดเสาโทริอิไม้ขนาดยักษ์ศาลเจ้าเมจิ", "ชิมเครปม้วนสดบนถนนทาเคชิตะ", "เดินช้อปปิ้งสตรีทแวร์ย่าน Ura-Harajuku"],
    nearbyHotels: [
      {
        name: "Dormy Inn Premium Shibuya-Jingumae",
        japanese: "ドーミーインPREMIUM 渋谷神宮前",
        type: "โรงแรมพร้อมออนเซ็นธรรมชาติใกล้ฮาราจูกุ",
        distance: "เดิน 6 นาทีถึงถนนทาเคชิตะและสถานี Harajuku",
        priceJPY: 19500,
        priceRange: "¥16,000 - ¥25,000 / คืน",
        rating: 4.8,
        highlight: "มีบ่อออนเซ็นสมุนไพรธรรมชาติ เสิร์ฟราเมงฟรีรอบดึก ทำเลเงียบสงบใจกลางย่านช้อปปิ้ง",
        searchQuery: "Dormy Inn Premium Shibuya Jingumae"
      },
      {
        name: "Cerulean Tower Tokyu Hotel",
        japanese: "セルリアンタワー東急ホテル",
        type: "โรงแรมหรู 5 ดาววิวเมืองโตเกียวพาโนรามา",
        distance: "เดิน 12 นาที หรือนั่งรถไฟ 1 สถานี",
        priceJPY: 38000,
        priceRange: "¥32,000 - ¥48,000 / คืน",
        rating: 4.9,
        highlight: "ห้องพักกว้างขวางระดับพรีเมียม อยู่บนตึกสูงมองเห็นภูเขาไฟฟูจิและโตเกียวทาวเวอร์",
        searchQuery: "Cerulean Tower Tokyu Hotel Tokyo"
      },
      {
        name: "sequence MIYASHITA PARK",
        japanese: "シークエンス ミヤシタパーク",
        type: "โรงแรมดีไซน์โมเดิร์นบนสวนลอยฟ้ามิยาชิตะ",
        distance: "เดิน 8 นาทีถึงฮาราจูกุ",
        priceJPY: 23000,
        priceRange: "¥19,000 - ¥30,000 / คืน",
        rating: 4.7,
        highlight: "เชื่อมต่อสวนสาธารณะลอยฟ้า Miyashita Park และแหล่งรวมร้านอาหารสุดฮิป",
        searchQuery: "sequence MIYASHITA PARK Shibuya"
      }
    ]
  },
  {
    id: "kanto-kamakura-daibutsu",
    title: "พระใหญ่ไดบุตสึ & เมืองเก่าริมทะเลคามาคุระ (Kamakura Daibutsu & Enoshima)",
    japanese: "鎌倉大仏 (高徳院) & 江の島",
    region: "tokyo",
    category: "attraction",
    seasons: ["spring", "summer", "autumn"],
    tag: "พระใหญ่โบราณ / รถไฟเลียบทะเล",
    rating: 4.8,
    keyword: "kamakura giant buddha statue japan enoshima sea",
    image: "https://images.unsplash.com/photo-1662554471428-d036dfbc6c45?auto=format&fit=crop&w=1200&q=80",
    description: "เมืองหลวงโบราณริมทะเลที่มีพระพุทธรูปสัมฤทธิ์องค์ใหญ่กลางแจ้งอายุเกือบ 800 ปี พร้อมนั่งรถไฟโบราณสายเอโนเด็น (Enoden) เลียบหาดทราย",
    transport: "🚆 นั่งรถไฟ JR Shonan-Shinjuku Line จากโตเกียวไปลง Kamakura แล้วต่อรถไฟ Enoden ลงสถานี Hase (1 ชม.)",
    bestTime: "09:30 - 15:30 น. เหมาะสำหรับจัดทริปไปเช้าเย็นกลับจากโตเกียว (Day Trip)",
    foodTips: "ห้ามพลาด: ข้าวหน้าปลาชิราสึสด (Shirasu-don), ขนมเซมเบ้กุ้งและปลาหมึกกดแบนทั้งตัว, ซอฟต์เสิร์ฟรสมันม่วง",
    estimatedCost: "ค่าเข้าวัดโคโตคุอิน 300 เยน (ลอดเข้าไปในองค์พระเพิ่ม 50 เยน)",
    mustTry: ["ถ่ายรูปกับพระใหญ่ไดบุตสึกลางแจ้ง", "ถ่ายรูปจุดตัดรถไฟ Enoden เลียบทะเลหน้าโรงเรียนคามาคุระโคโกะมาเอะ", "ข้ามสะพานไปเที่ยวเกาะเอโนชิมะ"],
    nearbyHotels: [
      {
        name: "Kamakura Prince Hotel",
        japanese: "鎌倉プリンスホテル",
        type: "โรงแรมตากอากาศหรูริมหาดชิจิริกาฮามะ",
        distance: "เดิน 5 นาทีจากสถานี Shichirigahama (Enoden)",
        priceJPY: 26000,
        priceRange: "¥20,000 - ¥36,000 / คืน",
        rating: 4.8,
        highlight: "ทุกห้องพักมองเห็นวิวทะเลและภูเขาไฟฟูจิ มีสระว่ายน้ำกลางแจ้งริมหาด",
        searchQuery: "Kamakura Prince Hotel"
      },
      {
        name: "Hotel Metropolitan Kamakura",
        japanese: "ホテルメトロポリタン 鎌倉",
        type: "โรงแรมบูติกสไตล์มินิมอลติดสถานีคามาคุระ",
        distance: "เดิน 2 นาทีจากสถานี Kamakura ทางออก East",
        priceJPY: 22000,
        priceRange: "¥17,000 - ¥28,000 / คืน",
        rating: 4.9,
        highlight: "ทำเลดีเลิศบนถนนช้อปปิ้งโคมาจิโดริ ตกแต่งด้วยไม้และหินธรรมชาติสไตล์เซน",
        searchQuery: "Hotel Metropolitan Kamakura"
      },
      {
        name: "WeBase Kamakura",
        japanese: "ウィーベース 鎌倉",
        type: "โรงแรมและโฮสเทลดีไซน์เก๋ใกล้หาดยูอิกาฮามะ",
        distance: "เดิน 3 นาทีถึงหาด และ 5 นาทีจากสถานี Yuigahama",
        priceJPY: 11000,
        priceRange: "¥8,500 - ¥16,000 / คืน",
        rating: 4.6,
        highlight: "มีบ่ออาบน้ำรวมขนาดใหญ่ สตูดิโอโยคะ และห้องอาหารฝรั่งเศสบรรยากาศชิล",
        searchQuery: "WeBase Kamakura"
      }
    ]
  },
  {
    id: "kanto-hakone-lake-ashi",
    title: "ล่องเรือโจรสลัดทะเลสาบอาชิ & ฮาโกเนะออนเซ็น (Hakone Lake Ashi & Onsen)",
    japanese: "箱根 芦ノ湖 & 箱根海賊船",
    region: "tokyo",
    category: "attraction",
    seasons: ["autumn", "spring", "winter"],
    tag: "ล่องเรือ / เสาโทริอิกลางน้ำ / ออนเซ็น",
    rating: 4.8,
    keyword: "hakone lake ashi pirate ship mount fuji torii gate water",
    image: "https://images.unsplash.com/photo-1560863244-387447ab62c4?auto=format&fit=crop&w=1200&q=80",
    description: "เมืองตากอากาศออนเซ็นยอดฮิต ล่องเรือโจรสลัดชมภูเขาไฟฟูจิสะท้อนผิวน้ำ ถ่ายรูปเสาโทริอิสีแดงกลางทะเลสาบ และชิมไข่ดำอายุยืนที่หุบเขาโอวาคุดานิ",
    transport: "🚆 นั่งรถไฟ Romancecar จากสถานี Shinjuku มาลง Hakone-Yumoto (85 นาที)",
    bestTime: "09:00 - 16:30 น. ช่วงฤดูใบไม้เปลี่ยนสี (พ.ย.) หรือวันที่ฟ้าใสชมฟูจิ",
    foodTips: "ห้ามพลาด: ไข่ดำต้มน้ำแร่กำมะถันโอวาคุดานิ (เชื่อว่ากิน 1 ฟองอายุยืนขึ้น 7 ปี), เต้าหู้คัตสึโทฟุ, โซบะน้ำแร่ฮาโกเนะ",
    estimatedCost: "ใช้บัตร Hakone Freepass 2 วัน (¥6,500 รวมรถไฟ กระเช้า และเรือโจรสลัดครบ)",
    mustTry: ["ล่องเรือโจรสลัดขนาดใหญ่ข้ามทะเลสาบอาชิ", "ถ่ายรูปกับเสาโทริอิแห่งสันติภาพกลางน้ำศาลเจ้าฮาโกเนะ", "นั่งกระเช้าลอยฟ้าชมควันกำมะถันหุบเขาโอวาคุดานิ"],
    nearbyHotels: [
      {
        name: "Hakone Ashinoko Hanaori",
        japanese: "はなをり (箱根・芦ノ湖)",
        type: "เรียวกังหรูริมทะเลสาบพร้อมระเบียงบ่อน้ำแช่เท้า",
        distance: "เดิน 3 นาทีถึงท่าเรือกระเช้า Togendai",
        priceJPY: 35000,
        priceRange: "¥28,000 - ¥45,000 / คืน",
        rating: 4.9,
        highlight: "บ่อออนเซ็นกลางแจ้งวิวทะเลสาบอาชิ ระเบียงที่นั่งกลางสระน้ำสุดไอคอนิก บุฟเฟต์อาหารญี่ปุ่นระดับพรีเมียม",
        searchQuery: "Hakone Ashinoko Hanaori"
      },
      {
        name: "Hakone Kowakien Ten-yu",
        japanese: "箱根小涌園 天悠",
        type: "เรียวกัง 5 ดาวมีออนเซ็นส่วนตัวกลางแจ้งทุกห้อง",
        distance: "นั่งรถบัส 15 นาทีจากทะเลสาบอาชิ",
        priceJPY: 46000,
        priceRange: "¥38,000 - ¥60,000 / คืน",
        rating: 4.9,
        highlight: "ออนเซ็นอินฟินิตี้ลอยฟ้าไร้ขอบผสานกับทิวทัศน์หุบเขาและน้ำตกธรรมชาติ",
        searchQuery: "Hakone Kowakien Ten-yu"
      },
      {
        name: "Hakone Yumoto Onsen Yaeikan",
        japanese: "箱根湯本温泉 八重翠館",
        type: "เรียวกังดั้งเดิมติดสถานีฮาโกเนะยุโมโตะ",
        distance: "เดิน 6 นาทีจากสถานี Hakone-Yumoto",
        priceJPY: 24000,
        priceRange: "¥18,000 - ¥30,000 / คืน",
        rating: 4.7,
        highlight: "เสิร์ฟไคเซกิดินเนอร์ถึงห้องพัก บ่อออนเซ็นไม้สนธรรมชาติแสนผ่อนคลาย",
        searchQuery: "Hakone Yumoto Onsen Yaeikan"
      }
    ]
  },

  // --- NEW KYOTO DESTINATIONS ---
  {
    id: "kyoto-kinkakuji",
    title: "วัดทองคินคะคุจิ (Kinkaku-ji Golden Pavilion)",
    japanese: "金閣寺 (鹿苑寺 - ろくおんじ)",
    region: "kyoto",
    category: "attraction",
    seasons: ["all_year", "autumn", "winter"],
    tag: "วัดทองคำ / มรดกโลก UNESCO",
    rating: 4.8,
    keyword: "kinkakuji golden pavilion kyoto temple reflection pond",
    image: "https://images.unsplash.com/photo-1503640538573-148065ba4904?auto=format&fit=crop&w=1200&q=80",
    description: "มรดกโลกอันเลื่องชื่อ ศาลาทองคำแท้ 3 ชั้นตั้งตระหง่านสะท้อนผิวน้ำกลางสระเคียวโกะจิ งดงามตระการตาในทุกฤดูกาลโดยเฉพาะช่วงหิมะและใบไม้แดง",
    transport: "🚌 นั่ง Kyoto City Bus สาย 205 หรือ 12 จาก Kyoto Station มาลงป้าย Kinkakuji-michi (40 นาที)",
    bestTime: "09:00 - 10:30 น. (แสงเช้าตกกระทบทองคำสวยงามที่สุด) หรือช่วงบ่ายแก่ 15:30 - 16:30 น.",
    foodTips: "ห้ามพลาด: ไอศกรีมมัทฉะแปะแผ่นทองคำเปลวบริสุทธิ์หน้าร้านขายของที่ระลึก, ขนมโมจิถั่วแดงย่าง",
    estimatedCost: "ค่าเข้าชม 500 เยน (ตั๋วเข้าชมเป็นผ้ายันต์มงคลภาษาญี่ปุ่น)",
    mustTry: ["ถ่ายรูปเงาสะท้อนศาลาทองคำบนผิวน้ำ", "ชิมไอศกรีมมัทฉะปิดทองคำแท้", "จิบชามัทฉะในเรือนชาโบราณเซกกาเต"],
    nearbyHotels: [
      {
        name: "ROKU KYOTO, LXR Hotels & Resorts",
        japanese: "ロク キョウト (ROKU KYOTO)",
        type: "รีสอร์ตหรู 5 ดาวระดับอัลตร้าลักชัวรี่",
        distance: "เดิน 15 นาที หรือนั่งแท็กซี่ 4 นาทีถึงวัดทอง",
        priceJPY: 75000,
        priceRange: "¥60,000 - ¥110,000 / คืน",
        rating: 4.9,
        highlight: "สระว่ายน้ำน้ำแร่ออนเซ็นกลางแจ้งท่ามกลางขุนเขาและลำธารธรรมชาติของเกียวโตเหนือ",
        searchQuery: "ROKU KYOTO LXR Hotels and Resorts"
      },
      {
        name: "Urban Hotel Kyoto Nijo Premium",
        japanese: "アーバンホテル京都 二条プレミアム",
        type: "โรงแรมโมเดิร์นพร้อมบ่ออาบน้ำรวมและซาวน่า",
        distance: "นั่งรถบัสสาย 205 ต่อเดียวถึงหน้าวัดทอง",
        priceJPY: 13500,
        priceRange: "¥10,000 - ¥18,000 / คืน",
        rating: 4.6,
        highlight: "มีบ่ออาบน้ำขนาดใหญ่ ซาวน่า เตียงนุ่มสบาย เดินทางไปวัดทองและปราสาทนิโจสะดวกมาก",
        searchQuery: "Urban Hotel Kyoto Nijo Premium"
      },
      {
        name: "Koto no Ie Kyoto Traditional Machiya",
        japanese: "古都の家 金閣寺 (京町家)",
        type: "บ้านพักโบราณแมชิยะส่วนตัวสไตล์เกียวโตแท้",
        distance: "เดิน 5 นาทีถึงประตูวัดทอง",
        priceJPY: 28000,
        priceRange: "¥22,000 - ¥38,000 / คืน",
        rating: 4.8,
        highlight: "เช่าบ้านโบราณทั้งหลัง มีสวนหินญี่ปุ่นส่วนตัว ปูเสื่อทาทามิและอ่างอาบน้ำไม้ฮิโนกิ",
        searchQuery: "Koto no Ie Kinkakuji Kyoto"
      }
    ]
  },
  {
    id: "kyoto-kiyomizudera",
    title: "วัดน้ำใสคิโยมิสุเดระ & ถนนคนเดินโบราณ (Kiyomizu-dera & Sannenzaka)",
    japanese: "清水寺 (きよみずでら) & 二年坂・産年坂",
    region: "kyoto",
    category: "attraction",
    seasons: ["spring", "autumn", "all_year"],
    tag: "ระเบียงไม้โบราณ / ซากุระ & ใบไม้แดง",
    rating: 4.9,
    keyword: "kiyomizudera temple kyoto wooden stage sannenzaka ninenzaka",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&w=1200&q=80",
    description: "วัดไม้โบราณมรดกโลกอายุกว่า 1,200 ปี โดดเด่นด้วยระเบียงไม้ยื่นกลางหุบเขาที่สร้างโดยไม่ใช้ตะปูแม้แต่ตัวเดียว พร้อมดื่มน้ำตกสามสายโอโตวะขอพร และเดินช้อปปิ้งถนนโบราณนินเอ็นซากะ",
    transport: "🚌 นั่ง Kyoto City Bus สาย 206 หรือ 100 จาก Kyoto Station ลงป้าย Gojo-zaka หรือ Kiyomizu-michi (เดินขึ้นเนิน 10 นาที)",
    bestTime: "เช้าตรู่ 06:30 - 08:30 น. (บรรยากาศสงบไร้ผู้คน) หรือช่วงใบไม้เปลี่ยนสีที่มีการเปิดไฟประดับ Light-up ยามค่ำคืน",
    foodTips: "ห้ามพลาด: ขนมยัตสึฮาชิ (Yatsuhashi) แป้งสามเหลี่ยมไส้อบเชยและถั่วแดง, ชูครีมมัทฉะยักษ์, ดังโงะย่างซอสหวาน",
    estimatedCost: "ค่าเข้าชมวัดคิโยมิสุเดระ 400 เยน",
    mustTry: ["ดื่มน้ำตกศักดิ์สิทธิ์ 3 สายโอโตวะ (เลือก 1 สาย: สุขภาพ, ความรัก, การเรียน)", "ชมวิวพาโนรามาของเมืองเกียวโตจากระเบียงไม้", "เดินถ่ายรูปใส่ชุดกิโมโนบนถนนโบราณนินเอ็นซากะและซันเน็นซากะ"],
    nearbyHotels: [
      {
        name: "The Westin Miyako Kyoto",
        japanese: "ウェスティン都ホテル京都 (天然温泉 華頂)",
        type: "โรงแรมหรู 5 ดาวพร้อมบ่อออนเซ็นน้ำแร่ธรรมชาติ",
        distance: "นั่งแท็กซี่ 7 นาทีถึงวัดคิโยมิสุเดระ",
        priceJPY: 46000,
        priceRange: "¥38,000 - ¥65,000 / คืน",
        rating: 4.9,
        highlight: "บ่อออนเซ็นน้ำแร่ธรรมชาติขนาดใหญ่ที่สุดในเกียวโต 'Kacho' และสวนญี่ปุ่นมรดกทางวัฒนธรรม",
        searchQuery: "The Westin Miyako Kyoto"
      },
      {
        name: "Nohga Hotel Kiyomizu Kyoto",
        japanese: "ノーガホテル 清水 京都",
        type: "โรงแรมบูติกดีไซน์โมเดิร์นคราฟต์",
        distance: "เดิน 10 นาทีถึงวัดคิโยมิสุเดระ",
        priceJPY: 24000,
        priceRange: "¥19,000 - ¥32,000 / คืน",
        rating: 4.8,
        highlight: "มีรูฟท็อปบาร์ชมวิวพระอาทิตย์ตกดินเหนือเมืองเกียวโต และเบเกอรี่โฮมเมดสดใหม่",
        searchQuery: "Nohga Hotel Kiyomizu Kyoto"
      },
      {
        name: "Kyoto Machiya Hotel Minoya",
        japanese: "京都町屋ホテル 箕乃屋",
        type: "โรงแรมบ้านโบราณแมชิยะบรรยากาศญี่ปุ่นแท้",
        distance: "เดิน 12 นาทีถึงวัดคิโยมิสุเดระ",
        priceJPY: 16000,
        priceRange: "¥13,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "สัมผัสการพักผ่อนในบ้านไม้ญี่ปุ่นดั้งเดิม ใกล้แหล่งมรดกโลกและร้านชาเขียว",
        searchQuery: "Kyoto Machiya Hotel Minoya"
      }
    ]
  },

  // --- NEW OSAKA & KANSAI DESTINATIONS ---
  {
    id: "kansai-nara-park",
    title: "สวนกวางนารา & วัดหลวงพ่อโตโทไดจิ (Nara Deer Park & Todai-ji)",
    japanese: "奈良公園 & 東大寺 (大仏殿)",
    region: "osaka",
    category: "attraction",
    seasons: ["spring", "autumn", "summer"],
    tag: "กวางป่าแสนรู้ / หลวงพ่อโตไม้โบราณ",
    rating: 4.9,
    keyword: "nara deer park japan todaiji temple giant buddha",
    image: "https://images.unsplash.com/photo-1572175428143-3a40195b0c2d?auto=format&fit=crop&w=1200&q=80",
    description: "สวนธรรมชาติขนาดใหญ่ที่มีกวางป่าแสนรู้กว่า 1,200 ตัวเดินโค้งคำนับขอขนม พร้อมชมวิหารไม้โบราณขนาดใหญ่ที่สุดในโลกที่ประดิษฐานหลวงพ่อโตไดบุตสึแห่งนารา",
    transport: "🚆 นั่งรถไฟ Kintetsu Nara Line จากสถานี Osaka-Namba มาลงสถานี Kintetsu-Nara (38 นาที เดินต่อ 5 นาที)",
    bestTime: "ช่วงเช้า 08:30 - 11:30 น. (กวางยังตื่นตัวและนักท่องเที่ยวยังไม่หนาแน่น)",
    foodTips: "ห้ามพลาด: ขนมโมจิไส้ถั่วแดงตำสดด้วยความเร็วสูงร้าน Nakatanidou, ซูชิห่อใบพลับ (Kaki no Ha Sushi), พุดดิ้งนารารูปกวาง (Mahoroba Daibutsu Pudding)",
    estimatedCost: "เข้าสวนกวางฟรี (ขนมเซมเบ้เลี้ยงกวางชุดละ 200 เยน / ค่าเข้าวัดโทไดจิ 600 เยน)",
    mustTry: ["ป้อนขนมเซมเบ้และรอให้กวางโค้งคำนับขอบคุณ", "สักการะพระพุทธรูปหลวงพ่อโตไดบุตสึในวิหารไม้โทไดจิ", "ชมการตำโมจิสดสุดตื่นตาตื่นใจร้าน Nakatanidou"],
    nearbyHotels: [
      {
        name: "JW Marriott Hotel Nara",
        japanese: "JWマリオット・ホテル奈良",
        type: "โรงแรมหรู 5 ดาวอินเตอร์แห่งแรกในนารา",
        distance: "นั่งแท็กซี่ 7 นาทีถึงสวนกวางนารา",
        priceJPY: 39000,
        priceRange: "¥32,000 - ¥52,000 / คืน",
        rating: 4.9,
        highlight: "ดีไซน์หรูหราผสานกลิ่นอายไม้และเขากวาง มีสปาหรูและสระว่ายน้ำในร่ม",
        searchQuery: "JW Marriott Hotel Nara"
      },
      {
        name: "Nara Hotel",
        japanese: "奈良ホテル (明治42年創業)",
        type: "โรงแรมประวัติศาสตร์ระดับตำนานกว่า 100 ปี",
        distance: "เดิน 5 นาทีถึงสวนกวางนารา",
        priceJPY: 31000,
        priceRange: "¥24,000 - ¥42,000 / คืน",
        rating: 4.8,
        highlight: "อาคารไม้คลาสสิกสไตล์วิกตอเรียนผสมญี่ปุ่น เคยต้อนรับกษัตริย์และบุคคลสำคัญระดับโลก",
        searchQuery: "Nara Hotel Japan"
      },
      {
        name: "Piazza Hotel Nara",
        japanese: "ピアッツァホテル 奈良",
        type: "โรงแรมโมเดิร์นติดสถานีรถไฟ JR Nara",
        distance: "เดิน 1 นาทีจากสถานี JR Nara",
        priceJPY: 13000,
        priceRange: "¥10,000 - ¥17,000 / คืน",
        rating: 4.6,
        highlight: "ทำเลสะดวกสบายสุดๆ ติดสถานีรถไฟ ห้องพักสะอาด มีฟิตเนสและคาเฟ่",
        searchQuery: "Piazza Hotel Nara"
      }
    ]
  },
  {
    id: "osaka-kuromon-market",
    title: "ตลาดปลาคุโรมง ครัวของชาวโอซาก้า (Kuromon Ichiba Seafood Market)",
    japanese: "黒門市場 (くろもんいちば - 大阪の台所)",
    region: "osaka",
    category: "food",
    seasons: ["all_year", "winter", "spring"],
    tag: "ปลาดิบสด / ปูยักษ์ / วากิวเสียบไม้",
    rating: 4.7,
    keyword: "kuromon market osaka seafood sashimi king crab wagyu beef",
    image: "https://images.unsplash.com/photo-1608516494623-2df85572e673?auto=format&fit=crop&w=1200&q=80",
    description: "ตลาดสดยาว 600 เมตรใจกลางมินามิโอซาก้า รวมร้านอาหารทะเลสด ขาปูยักษ์ย่าง หอยเชลล์เนยกระเทียม และเนื้อโกเบวากิว A5 ปรุงสดทานหน้าร้านได้ทันที",
    transport: "🚇 เดิน 2 นาทีจากสถานี Nippombashi Station (Osaka Metro Sakaisuji / Sennichimae Line ทางออก 10)",
    bestTime: "09:30 - 14:00 น. ช่วงอาหารทะเลสดใหม่ที่สุด",
    foodTips: "ห้ามพลาด: ข้าวหน้าไข่หอยเม่นอุนิสด (Uni), หอยเชลล์ย่างเนยโชยุตัวยักษ์, ขาปูทาระบะย่าง, เนื้อวากิว A5 เบิร์นไฟโรยเกลือหิมาลายัน",
    estimatedCost: "งบกินซีฟู้ดและเนื้อย่าง 2,500 - 5,500 เยนต่อคน",
    mustTry: ["เลือกขาปูยักษ์ให้เชฟย่างสดๆ หน้าร้าน", "ชิมหอยเม่นสดหวานมันไร้กลิ่นคาว", "ปิดท้ายด้วยสตรอว์เบอร์รีสีขาวลูกโต"],
    nearbyHotels: [
      {
        name: "Swissotel Nankai Osaka",
        japanese: "スイスホテル南海大阪",
        type: "โรงแรมหรู 5 ดาวเชื่อมตรงสถานี Namba",
        distance: "เดิน 5 นาทีถึงตลาดคุโรมง",
        priceJPY: 12500,
        priceRange: "¥12,500 - ¥28,000 / คืน",
        rating: 4.9,
        highlight: "อยู่บนสถานี Nankai Namba นั่งรถไฟ Rapi:t ตรงไปสนามบินคันไซได้สะดวกที่สุด",
        searchQuery: "Swissotel Nankai Osaka"
      },
      {
        name: "Candeo Hotels Osaka Namba",
        japanese: "カンデオホテルズ大阪なんば",
        type: "โรงแรมพร้อมสกายสปาออนเซ็นลอยฟ้า",
        distance: "เดิน 4 นาทีถึงตลาดคุโรมงและโดทงโบริ",
        priceJPY: 20000,
        priceRange: "¥16,000 - ¥27,000 / คืน",
        rating: 4.8,
        highlight: "บ่อออนเซ็นลอยฟ้ากลางแจ้งชั้นดาดฟ้า แช่น้ำอุ่นชมวิวเมืองโอซาก้าหลังเดินกินตลาดปลา",
        searchQuery: "Candeo Hotels Osaka Namba"
      },
      {
        name: "Hotel Hillarys Shinsaibashi",
        japanese: "ホテルヒラリーズ 心斎橋",
        type: "โรงแรมโมเดิร์นพร้อมบ่ออาบน้ำรวม",
        distance: "เดิน 6 นาทีถึงตลาดคุโรมง",
        priceJPY: 13500,
        priceRange: "¥10,500 - ¥17,500 / คืน",
        rating: 4.6,
        highlight: "มีบ่ออาบน้ำรวมขนาดใหญ่ สปา และมุมเครื่องดื่มฟรี ทำเลใจกลางแหล่งช้อปปิ้ง",
        searchQuery: "Hotel Hillarys Shinsaibashi Osaka"
      }
    ]
  },
  {
    id: "osaka-umeda-sky",
    title: "จุดชมวิวตึกระฟ้า อุเมดะ สกาย บิลดิ้ง (Umeda Sky Building Floating Garden)",
    japanese: "梅田スカイビル (空中庭園展望台)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year", "autumn", "winter"],
    tag: "สถาปัตยกรรมลอยฟ้า / วิวเมือง 360 องศา",
    rating: 4.8,
    keyword: "umeda sky building osaka floating garden observatory night",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    description: "ตึกแฝดสูง 173 เมตรที่เชื่อมกันด้วยสะพานลอยฟ้าวงกลมสุดล้ำ มีจุดชมวิวกลางแจ้ง 360 องศาแบบเปิดโล่ง มองเห็นสกายไลน์โอซาก้าและแม่น้ำโยโดะยามค่ำคืน",
    transport: "🚆 เดิน 8 นาทีจากสถานี Osaka Station (JR) หรือสถานี Umeda (Osaka Metro)",
    bestTime: "17:00 - 19:30 น. ชมพระอาทิตย์ตกดินและไฟเมืองเปิดระยิบระยับ",
    foodTips: "ห้ามพลาด: ตรอกอาหารใต้ดิน Takimi-Koji สไตล์ย้อนยุคโชวะ 1920s เสิร์ฟโอโคโนมิยากิและคุชิคัตสึต้นตำรับ",
    estimatedCost: "ค่าเข้าจุดชมวิว 1,500 เยน (เข้าฟรีก่อน 16:00 น. หากใช้บัตร Osaka Amazing Pass)",
    mustTry: ["ขึ้นบันไดเลื่อนลอยฟ้าแบบอุโมงค์แก้วกลางอากาศ", "เดินบนทางเดินเรืองแสงกลางคืน Lumi Sky Walk", "กินโอโคโนมิยากิในตรอกโบราณชั้นใต้ดิน B1"],
    nearbyHotels: [
      {
        name: "InterContinental Hotel Osaka",
        japanese: "インターコンチネンタルホテル大阪",
        type: "โรงแรมหรู 5 ดาวเชื่อมศูนย์การค้า Grand Front Osaka",
        distance: "เดิน 5 นาทีถึงตึก Umeda Sky",
        priceJPY: 42000,
        priceRange: "¥35,000 - ¥56,000 / คืน",
        rating: 4.9,
        highlight: "ห้องพักขนาดใหญ่พิเศษสไตล์คอนเทมโพรารี บริการระดับโลก พร้อมสระว่ายน้ำในร่ม",
        searchQuery: "InterContinental Hotel Osaka"
      },
      {
        name: "Hotel Hankyu RESPIRE OSAKA",
        japanese: "ホテル阪急レスパイア大阪",
        type: "โรงแรมโมเดิร์นขนาดใหญ่ใจกลางย่านอุเมดะ",
        distance: "เดิน 6 นาทีถึงตึก Umeda Sky",
        priceJPY: 18500,
        priceRange: "¥14,500 - ¥24,000 / คืน",
        rating: 4.8,
        highlight: "ตั้งอยู่บนห้าง Yodobashi Links Umeda ห้องพักดีไซน์ธรรมชาติของญี่ปุ่น สะดวกต่อการช้อปปิ้ง",
        searchQuery: "Hotel Hankyu RESPIRE OSAKA"
      },
      {
        name: "Nest Hotel Osaka Umeda",
        japanese: "ネストホテル大阪梅田",
        type: "โรงแรมบัดเจ็ทมินิมอลราคาสบายกระเป๋า",
        distance: "เดิน 8 นาทีถึงสถานี Osaka / Umeda",
        priceJPY: 11000,
        priceRange: "¥8,500 - ¥15,000 / คืน",
        rating: 4.5,
        highlight: "ตกแต่งเรียบง่ายสะอาดตา คุ้มค่าคุ้มราคาในย่านธุรกิจศูนย์กลางการเดินทางของโอซาก้า",
        searchQuery: "Nest Hotel Osaka Umeda"
      }
    ]
  },
  {
    id: "osaka-denden-town",
    title: "ย่านเด็นเด็นทาวน์ นิปปอนบาชิ (Nipponbashi Denden Town)",
    japanese: "でんでんタウン (日本橋電気街)",
    region: "osaka",
    category: "shopping",
    seasons: ["all_year"],
    tag: "อนิเมะ / ฟิกเกอร์ / เกมส์ & เมดคาเฟ่",
    rating: 4.8,
    keyword: "den den town nipponbashi osaka anime figures gaming retro",
    image: "https://photos.smugmug.com/Osaka/Den-Den-Town-Guide/i-4jb6ZK3/0/1c0ad2f1/L/DenDen6-L.jpg",
    description: "อากิฮาบาระแห่งคันไซ ศูนย์รวมร้านฟิกเกอร์ อนิเมะ โมเดลกันพลา การ์ดสะสม อุปกรณ์อิเล็กทรอนิกส์ เกมเรโทร และเมดคาเฟ่ที่มีให้เลือกช้อปตลอดสองฝั่งถนน",
    transport: "🚇 เดิน 3 นาทีจากสถานี Nipponbashi (Osaka Metro Sakaisuji/Sennichimae Line ทางออก 5 หรือ 10) หรือสถานี Ebisucho (ทางออก 1B)",
    bestTime: "12:00 - 18:30 น. (ร้านค้าเปิดครบทุกร้านและบรรยากาศคึกคักที่สุด)",
    foodTips: "ห้ามพลาด: เมดคาเฟ่ยอดฮิต Maidreamin, ทงคัตสึข้าวหมูทอดร้านดังคิวยาว และซอฟต์เสิร์ฟไอศกรีมมัทฉะ",
    estimatedCost: "งบช้อปปิ้งของเล่น/ฟิกเกอร์ 2,000 - 15,000 เยน",
    mustTry: ["ส่องร้านฟิกเกอร์มือสองหายากที่ Animate & Mandarake", "หมุนตู้กาชาปองยักษ์กว่า 500 ตู้", "สัมผัสประสบการณ์เมดคาเฟ่ญี่ปุ่นดั้งเดิม"],
    nearbyHotels: [
      {
        name: "Nine Hours Shin-Osaka (9h Capsule)",
        japanese: "ナインアワーズ新大阪",
        type: "แคปซูลดีไซน์ล้ำติดสถานีรถไฟใหญ่",
        distance: "ติดสถานี Shin-Osaka ทางออก East (เดิน 1 นาที)",
        priceJPY: 2800,
        priceRange: "¥2,500 - ¥4,200 / คืน",
        rating: 4.6,
        highlight: "แคปซูลทันสมัยสไตล์ไซไฟ สะอาดมาก มีห้องอาบน้ำและล็อกเกอร์ส่วนตัว เหมาะสำหรับสายประหยัดคนเดียว",
        searchQuery: "Nine Hours Shin Osaka Capsule"
      },
      {
        name: "First Cabin Midosuji Namba",
        japanese: "ファーストキャビン 御堂筋難波",
        type: "แคปซูลหรูสไตล์เฟิร์สคลาสบนเครื่องบิน",
        distance: "เชื่อมตรงสถานี Namba ทางออก 13 (เดิน 3 นาทีถึงเด็นเด็นทาวน์)",
        priceJPY: 3900,
        priceRange: "¥3,500 - ¥5,800 / คืน",
        rating: 4.7,
        highlight: "แคปซูลเพดานสูงยืนแต่งตัวได้ มีบ่อน้ำแช่รวมขนาดใหญ่ ซาวน่า และสิ่งอำนวยความสะดวกเทียบเท่าโรงแรม 4 ดาว",
        searchQuery: "First Cabin Midosuji Namba Osaka"
      },
      {
        name: "Hotel Livemax Osaka Namba",
        japanese: "ホテルリブマックス大阪なんば",
        type: "โรงแรมบัดเจ็ทเชนราคาประหยัดที่สุด",
        distance: "เดิน 6 นาทีถึงสถานี Namba / เด็นเด็นทาวน์",
        priceJPY: 4200,
        priceRange: "¥3,800 - ¥6,500 / คืน",
        rating: 4.4,
        highlight: "ห้องพักส่วนตัวพร้อมห้องน้ำในตัว เตียงนุ่ม แอร์ ทีวี ตู้เย็น ไมโครเวฟครบ ในราคาประหยัดเงินในกระเป๋า",
        searchQuery: "Hotel Livemax Osaka Namba"
      },
      {
        name: "Toyoko Inn Osaka Namba",
        japanese: "東横INN大阪なんば",
        type: "โรงแรมบัดเจ็ทมาตรฐานญี่ปุ่น (ฟรีอาหารเช้า)",
        distance: "เดิน 4 นาทีถึงสถานี Namba / เดิน 3 นาทีถึงเด็นเด็นทาวน์",
        priceJPY: 5800,
        priceRange: "¥5,200 - ¥8,000 / คืน",
        rating: 4.7,
        highlight: "เครือโรงแรมธุรกิจยอดนิยม สะอาด ปลอดภัย มีบริการอาหารเช้าข้าวปั้น/ซุปมิโซะฟรีทุกเช้า!",
        searchQuery: "Toyoko Inn Osaka Namba"
      },
      {
        name: "Dormy Inn Premium Namba (Natural Hot Spring)",
        japanese: "ドーミーイン プレミアム なんば",
        type: "โรงแรมยอดนิยมอันดับ 1 พร้อมออนเซ็น",
        distance: "เดิน 5 นาทีถึงถนนเด็นเด็นทาวน์",
        priceJPY: 13500,
        priceRange: "¥11,000 - ¥18,000 / คืน",
        rating: 4.8,
        highlight: "บ่อออนเซ็นธรรมชาติ ซาวน่า และบริการราเมง Yonaki Soba ฟรีทุกคืน ทำเลเดินช้อปปิ้งสะดวกสุดๆ",
        searchQuery: "Dormy Inn Premium Namba Osaka"
      },
      {
        name: "Citadines Namba Osaka",
        japanese: "シタディーンなんば大阪",
        type: "เซอร์วิสอพาร์ตเมนต์หรูในตึกประวัติศาสตร์",
        distance: "เดิน 2 นาทีถึงเด็นเด็นทาวน์",
        priceJPY: 19500,
        priceRange: "¥16,000 - ¥26,000 / คืน",
        rating: 4.8,
        highlight: "รีโนเวทจากห้างสรรพสินค้าเก่าแก่ สถาปัตยกรรมสวยงาม ห้องพักกว้างขวางพร้อมสิ่งอำนวยความสะดวกครบครัน",
        searchQuery: "Citadines Namba Osaka"
      }
    ]
  },
  {
    id: "osaka-shinsekai",
    title: "ย่านชินเซไก & หอคอยซึเทนคาคุ (Shinsekai & Tsutenkaku Tower)",
    japanese: "新世界 / 通天閣 (つうてんかく)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year"],
    tag: "ย่านเรโทร / ของทอดคุชิคัตสึ / สไลเดอร์ยักษ์",
    rating: 4.7,
    keyword: "shinsekai tsutenkaku tower osaka kushikatsu retro billiken",
    image: "https://photos.smugmug.com/Osaka/Shinsekai/i-QC87CbR/0/L/IMG_5336-L.jpg",
    description: "ย่านประวัติศาสตร์สไตล์เรโทรยุคโชวะที่มีหอคอยซึเทนคาคุอันเป็นสัญลักษณ์ รูปปั้นเทพเจ้าแห่งโชคลาภบิลลิเคน (Billiken) สไลเดอร์ยักษ์ Tower Slider ทะลุหอคอย และดงของทอดเสียบไม้",
    transport: "🚇 เดิน 3 นาทีจากสถานี Ebisucho (Osaka Metro Sakaisuji Line ทางออก 3) หรือสถานี Dobutsuen-mae (Midosuji Line ทางออก 1)",
    bestTime: "11:30 - 14:00 น. หรือช่วงค่ำ 17:30 - 20:30 น. ป้ายไฟนีออนปลาปักเป้าเปิดสว่างไสว",
    foodTips: "ห้ามพลาด: คุชิคัตสึ (Kushikatsu) ของทอดเสียบไม้ร้าน Kushikatsu Daruma ต้นตำรับ, ซุปเนื้อตุ๋น Doteyaki หอมหวาน",
    estimatedCost: "ค่าขึ้นหอคอย 900 เยน (เล่นสไลเดอร์ Tower Slider 1,000 เยน) / ค่าอาหาร 1,500 - 3,000 เยน",
    mustTry: ["ลูบฝ่าเท้าขอพรเทพเจ้า Billiken", "สัมผัสความเสียวบน Tower Slider สไลเดอร์วนรอบหอคอย", "กินของทอดเสียบไม้คุชิคัตสึร้อนๆ จิ้มซอสสูตรเด็ด"],
    nearbyHotels: [
      {
        name: "OMO7 Osaka by Hoshino Resorts",
        japanese: "OMO7 大阪 by 星野リゾート",
        type: "โรงแรมดีไซน์พรีเมียมโดยเครือโฮชิโนะ",
        distance: "เดิน 5 นาทีถึงหอคอยซึเทนคาคุ",
        priceJPY: 24000,
        priceRange: "¥20,000 - ¥35,000 / คืน",
        rating: 4.9,
        highlight: "มีสนามหญ้าลอยฟ้าขนาดใหญ่ การแสดงไฟบนผนังตึก บ่ออาบน้ำสาธารณะ และทัวร์พาชิมของกินชินเซไกฟรี",
        searchQuery: "OMO7 Osaka by Hoshino Resorts"
      }
    ]
  },
  {
    id: "osaka-kaiyukan",
    title: "พิพิธภัณฑ์สัตว์น้ำไคยูคัง (Osaka Aquarium Kaiyukan)",
    japanese: "海遊館 (かいゆうかん)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year"],
    tag: "อควาเรียมยักษ์ระดับโลก / ฉลามวาฬ & ชิงช้าสวรรค์",
    rating: 4.9,
    keyword: "kaiyukan osaka aquarium whale shark tempozan ferris wheel",
    image: "https://photos.smugmug.com/Osaka/Osaka-Bay-Area/i-rSRzRm5/0/5734745a/L/OsakaBay_TSD_Kaiyukan5-L.jpg",
    description: "หนึ่งในพิพิธภัณฑ์สัตว์น้ำที่ใหญ่ที่สุดในโลก จำลองระบบนิเวศวงแหวนแห่งแปซิฟิก ไฮไลต์คือแท็งก์น้ำวนขนาดมหึมาลึก 9 เมตรที่มีฉลามวาฬ (Whale Shark) และปลากระเบนราหูแหวกว่ายอย่างสง่างาม",
    transport: "🚇 เดิน 5 นาทีจากสถานี Osakako (Osaka Metro Chuo Line ทางออก 1)",
    bestTime: "10:00 - 13:00 น. หรือช่วง 17:00 น. เป็นต้นไป (มี Night Aquarium แสงไฟสลัวโรแมนติก)",
    foodTips: "ห้ามพลาด: ไอศกรีมซอฟต์เสิร์ฟลายฉลามวาฬสีฟ้า-ขาว (Whale Shark Soft Cream) ที่คาเซ่คาเฟ่ในอควาเรียม",
    estimatedCost: "ค่าเข้าชมผู้ใหญ่ 2,700 เยน / เด็ก 1,400 เยน",
    mustTry: ["ชมฉลามวาฬยักษ์แหวกว่ายในแท็งก์แปซิฟิก", "เดินในอุโมงค์กระจกใต้ทะเล Aqua Gate", "ขึ้นชิงช้าสวรรค์เทมโปซานชมวิวอ่าวโอซาก้า"],
    nearbyHotels: [
      {
        name: "Hotel Universal Port Vita",
        japanese: "ホテル ユニバーサル ポート ヴィータ",
        type: "โรงแรมหรูวิวอ่าวใกล้ USJ และไคยูคัง",
        distance: "นั่งเรือเฟอร์รี่ Captain Line ข้ามฟาก 10 นาทีถึงไคยูคัง",
        priceJPY: 17500,
        priceRange: "¥13,500 - ¥23,000 / คืน",
        rating: 4.8,
        highlight: "ห้องพักขนาดใหญ่ ตกแต่งธีมมินเนี่ยน อาหารเช้าบุฟเฟต์นานาชาติยอดเยี่ยมระดับท็อปของโอซาก้า",
        searchQuery: "Hotel Universal Port Vita Osaka"
      }
    ]
  },
  {
    id: "osaka-namba-yasaka",
    title: "ศาลเจ้านัมบะ ยาซากะ (Namba Yasaka Shrine - ศาลเจ้าหัวสิงโตยักษ์)",
    japanese: "難波八阪神社 (なんばやさかじんじゃ)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year", "spring"],
    tag: "ศาลเจ้าหัวสิงโตยักษ์ / ปัดเป่าเคราะห์ & ขอโชคลาภ",
    rating: 4.8,
    keyword: "namba yasaka shrine lion head giant mouth fortune osaka",
    image: "https://photos.smugmug.com/Osaka/Central-Osaka/i-X5WkZBM/0/5ebd2d07/L/Minami_TSD_NambaYasakaShrine3-L.jpg",
    description: "ศาลเจ้าศักดิ์สิทธิ์ใจกลางเมืองโอซาก้า โดดเด่นด้วยเวทีหัวสิงโตทองคำอ้าปากกว้างขนาดยักษ์สูง 12 เมตร เชื่อว่าพลังอำนาจของสิงโตจะช่วยกลืนกินสิ่งชั่วร้าย เคราะห์กรรม และดึงดูดโชคลาภความสำเร็จเข้ามา",
    transport: "🚶 เดิน 6 นาทีจากสถานี Namba Station (Osaka Metro Midosuji Line / Nankai Line ทางออก 5 หรือ 6)",
    bestTime: "08:30 - 11:00 น. (ช่วงเช้าแสงแดดส่องกระทบหัวสิงโตสวยงามและคนไม่เยอะ)",
    foodTips: "หลังจากไหว้พระ เดิน 7 นาทีไปชิมชีสทาร์ตชื่อดัง Pablo Namba หรือเนื้อย่างเกรดพรีเมียมในย่านนัมบะ",
    estimatedCost: "เข้าชมฟรี (เช่าเครื่องรางและเซียมซีหัวสิงโต 300 - 800 เยน)",
    mustTry: ["ถ่ายรูปมุมตรงกับหัวสิงโตยักษ์อ้าปากกว้าง", "ซื้อเครื่องรางหัวสิงโตนำโชคด้านการเรียนและธุรกิจ", "เสี่ยงเซียมซีพับทรงพัดญี่ปุ่น"],
    nearbyHotels: [
      {
        name: "Swissotel Nankai Osaka",
        japanese: "スイスホテル南海大阪",
        type: "โรงแรมหรู 5 ดาวตั้งอยู่เหนือสถานี Namba",
        distance: "เดิน 6 นาทีถึงศาลเจ้านัมบะ ยาซากะ",
        priceJPY: 31000,
        priceRange: "¥25,000 - ¥42,000 / คืน",
        rating: 4.8,
        highlight: "ทำเลเชื่อมต่อรถไฟ Nankai Rapi:t ตรงจากสนามบินคันไซ KIX มีสปา สระว่ายน้ำ และห้องอาหารวิวเมือง 36 ชั้น",
        searchQuery: "Swissotel Nankai Osaka"
      }
    ]
  },
  {
    id: "osaka-shinsaibashi",
    title: "ถนนคนเดินชินไซบาชิ & อเมริกาหมู่บ้าน (Shinsaibashi-suji & Amerikamura)",
    japanese: "心斎橋筋商店街 / アメリカ村",
    region: "osaka",
    category: "shopping",
    seasons: ["all_year"],
    tag: "ถนนช้อปปิ้งในร่ม / เสื้อผ้าแฟชั่น & สตรีทฟู้ด",
    rating: 4.8,
    keyword: "shinsaibashi suji shopping street amerikamura osaka fashion",
    image: "https://photos.smugmug.com/photos/i-qCQGB6V/0/8cb3c405/L/i-qCQGB6V-L.jpg",
    description: "ถนนคนเดินในร่มหลังคาสูงยาวเกือบ 600 เมตร สวรรค์ของนักช้อป รวมร้านค้าแบรนด์เนม ห้างไดมารู ร้านดองกี้ และย่าน Amerikamura แหล่งรวมสตรีทแฟชั่น เสื้อผ้ามือสองวินเทจ คาเฟ่ฮิปสเตอร์ และทาโกะยากิเจ้าดัง",
    transport: "🚇 สถานี Shinsaibashi (Osaka Metro Midosuji Line ทางออก 5 หรือ 6 เชื่อมตรงเข้าถนนช้อปปิ้ง)",
    bestTime: "13:00 - 20:30 น. (ร้านค้าเปิดครบ และแสงสีค่ำคืนคึกคัก)",
    foodTips: "ห้ามพลาด: ทาโกะยากิร้าน Kogaryu ในสวน Sankaku Koen (Amerikamura), ชาเขียวมัทฉะเข้มข้นร้าน Ujien, ครัวซองต์กรอบร้าน Le Croissant",
    estimatedCost: "งบช้อปปิ้ง & กินดื่ม 3,000 - 12,000 เยน",
    mustTry: ["เดินช้อปปิ้งตั้งแต่ชินไซบาชิทะลุไปยังป้ายกูลิโกะโดทงโบริ", "ชิมทาโกะยากิราดซอสมายองเนสตาข่ายร้าน Kogaryu", "ค้นหาเสื้อผ้าวินเทจและไอเทมสตรีทแฟชั่นใน Amerikamura"],
    nearbyHotels: [
      {
        name: "Sotetsu Fresa Inn Osaka Namba",
        japanese: "相鉄フレッサイン 大阪なんば駅前",
        type: "โรงแรมบัดเจ็ทคุ้มค่ายอดนิยม",
        distance: "เดิน 1 นาทีถึงสถานี Namba / เดิน 4 นาทีถึงชินไซบาชิ",
        priceJPY: 7200,
        priceRange: "¥6,800 - ¥11,500 / คืน",
        rating: 4.7,
        highlight: "ราคาประหยัด ทำเลดีมากติดทางขึ้นรถไฟใต้ดิน สิ่งอำนวยความสะดวกฟรีครบครันและระบบเช็คอินอัตโนมัติ",
        searchQuery: "Sotetsu Fresa Inn Osaka Namba"
      },
      {
        name: "APA Hotel & Resort Midosuji Hommachi Eki Tower",
        japanese: "アパホテル＆リゾート 御堂筋本町駅タワー",
        type: "โรงแรมบัดเจ็ทพรีเมียมพร้อมสปาออนเซ็น",
        distance: "เชื่อมตรงสถานี Hommachi (สายสีแดง Midosuji Line เดิน 5 นาทีถึงชินไซบาชิ)",
        priceJPY: 6800,
        priceRange: "¥6,000 - ¥10,500 / คืน",
        rating: 4.6,
        highlight: "โรงแรมตึกสูงมีบ่อออนเซ็นขนาดใหญ่และสระว่ายน้ำ เดินทางง่าย 1 สถานีถึงชินไซบาชิและอุเมดะ",
        searchQuery: "APA Hotel Resort Midosuji Hommachi Osaka"
      },
      {
        name: "Cross Hotel Osaka",
        japanese: "クロスホテル大阪",
        type: "โรงแรมทำเลทองติดถนนชินไซบาชิ",
        distance: "ตั้งอยู่บนถนนชินไซบาชิ เดิน 1 นาทีถึงโดทงโบริ",
        priceJPY: 17000,
        priceRange: "¥14,000 - ¥25,000 / คืน",
        rating: 4.8,
        highlight: "ทำเลดีที่สุดในโอซาก้า ช้อปปิ้งเสร็จเดินเอาของกลับมาเก็บที่ห้องได้ทันที ห้องน้ำแยกโซนเปียกแห้งกว้างขวาง",
        searchQuery: "Cross Hotel Osaka Shinsaibashi"
      }
    ]
  },
  {
    id: "osaka-abeno-harukas",
    title: "จุดชมวิวตึกระฟ้า อาเบโนะ ฮารุกัส 300 (Abeno Harukas 300 Observatory)",
    japanese: "あべのハルカス (ハルカス300展望台)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year"],
    tag: "ตึกระฟ้า 300 เมตร / วิวพาโนรามา 360 องศา",
    rating: 4.8,
    keyword: "abeno harukas 300 observatory tower osaka tennoji night view",
    image: "https://photos.smugmug.com/Osaka/Tennoji/i-P7K79vj/0/237e6287/L/Tennoji-Abeno_TSD_AbenoHarukas7-L.jpg",
    description: "ตึกระฟ้าที่สูงที่สุดในโอซาก้า (300 เมตร) จุดชมวิวฮารุกัส 300 บนชั้น 58-60 ผนังกระจกใสรอบทิศ มองเห็นวิวพาโนรามาครอบคลุมโอซาก้า อ่าวคันไซ ไปจนถึงเกียวโตและโกเบในวันที่ฟ้าโปร่ง",
    transport: "🚇 สถานี Tennoji (JR / Osaka Metro Midosuji Line) หรือสถานี Osaka-Abenobashi เชื่อมตรงใต้ตึก",
    bestTime: "16:30 - 19:00 น. (ชมแสงทไวไลท์ พระอาทิตย์ตกดิน และแสงไฟมหานครเปิดสว่าง)",
    foodTips: "ห้ามพลาด: ขนมพุดดิ้งคลาวด์ Harukas 300 บนชั้น 58 และชิมอาหารในห้างสรรพสินค้า Kintetsu Department Store ที่ใหญ่ที่สุดในญี่ปุ่น",
    estimatedCost: "ค่าขึ้นชมวิวผู้ใหญ่ 2,000 เยน / เด็กโต 1,200 เยน",
    mustTry: ["ยืนบนพื้นกระจกซีทรูมองทะลุลงไปชั้นล่าง", "ถ่ายรูปกับมาสคอตหมีเมฆ Abenobea", "นั่งจิบเครื่องดื่มชมพระอาทิตย์ตกที่ลานเปิดโล่งชั้น 58"],
    nearbyHotels: [
      {
        name: "Osaka Marriott Miyako Hotel",
        japanese: "大阪マリオット都ホテル",
        type: "โรงแรมหรูระดับเวิลด์คลาสบนตึกฮารุกัส",
        distance: "ตั้งอยู่บนชั้น 38-57 ของตึก Abeno Harukas",
        priceJPY: 39000,
        priceRange: "¥32,000 - ¥55,000 / คืน",
        rating: 4.9,
        highlight: "นอนชมวิวมหานครโอซาก้าจากหน้าต่างกระจกบานใหญ่ในห้องพัก สิทธิพิเศษเข้าชม Harukas 300 ก่อนเวลาเปิด",
        searchQuery: "Osaka Marriott Miyako Hotel Abeno Harukas"
      }
    ]
  },
  {
    id: "osaka-minoh-falls",
    title: "น้ำตกมิโนะ & อุทยานธรรมชาติ (Minoh Falls & Park)",
    japanese: "箕面大滝 (みのおおおたき) / 箕面公園",
    region: "osaka",
    category: "attraction",
    seasons: ["autumn", "spring", "summer"],
    tag: "ธรรมชาติ & น้ำตก / เมเปิ้ลทอดเทมปุระ",
    rating: 4.8,
    keyword: "minoh falls waterfall osaka maple momiji tempura autumn park",
    image: "https://photos.smugmug.com/photos/i-ZtsfPFW/0/84949416/L/i-ZtsfPFW-L.jpg",
    description: "อุทยานธรรมชาติและน้ำตกความสูง 33 เมตรที่สวยที่สุดของโอซาก้า เดินทอดน่องตามเส้นทางเลียบธารน้ำร่มรื่น 2.8 กม. จุดชมใบไม้เปลี่ยนสีอันดับหนึ่งของภูมิภาคคันไซ",
    transport: "🚆 สถานี Minoh Station (Hankyu Minoh Line นั่งจาก Umeda เพียง 25 นาที) แล้วเดินตามเส้นทางเดินธรรมชาติ",
    bestTime: "กลาง พ.ย. - ต้น ธ.ค. (ใบไม้เปลี่ยนสีแดงส้มเต็มหุบเขา) หรือช่วงฤดูร้อนเพื่อรับลมเย็นสบาย",
    foodTips: "ห้ามพลาด: ใบเมเปิ้ลชุบแป้งทอดกรอบ (Momiji Tempura) ของฝากดั้งเดิมกว่า 1,300 ปี กรอบหวานมันเคี้ยวเพลิน",
    estimatedCost: "เข้าชมฟรี (ค่าเดินทางรถไฟ Hankyu ~280 เยน / ขนมเมเปิ้ลทอด 500 เยน)",
    mustTry: ["เดินชมธรรมชาติเลียบลำธารใสไปยังหน้าน้ำตก", "ชิมใบเมเปิ้ลทอดเทมปุระสดใหม่ริมทาง", "แวะแช่เท้าที่บ่อน้ำพุร้อนหน้าสถานี Minoh"],
    nearbyHotels: [
      {
        name: "Ooedo Onsen Monogatari Minoh Kanko Hotel",
        japanese: "大江戸温泉物語 箕面観光ホテル",
        type: "โรงแรมเรียวกังออนเซ็นชมวิวมหานคร",
        distance: "เดิน 5 นาทีจากสถานี Minoh",
        priceJPY: 16500,
        priceRange: "¥13,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "บ่อออนเซ็นลอยฟ้า Sky Open-air Bath ชมวิวพาโนรามาแสงไฟโอซาก้า มีบุฟเฟต์มื้อค่ำอาหารญี่ปุ่นและเนื้อย่างจัดเต็ม",
        searchQuery: "Minoh Kanko Hotel Osaka"
      }
    ]
  },
  {
    id: "osaka-katsuoji",
    title: "วัดคัตสึโอจิ — วัดดารุมะแห่งชัยชนะ (Katsuo-ji Temple)",
    japanese: "勝尾寺 (かつおうじ)",
    region: "osaka",
    category: "attraction",
    seasons: ["all_year", "autumn", "spring"],
    tag: "วัดดารุมะ / ขอพรชัยชนะ & ธุรกิจรุ่งเรือง",
    rating: 4.9,
    keyword: "katsuoji katsuo-ji temple daruma doll osaka minoh luck victory winning",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
    description: "วัดศักดิ์สิทธิ์อายุกว่า 1,300 ปีบนหุบเขาทางตอนเหนือของโอซาก้า ขึ้นชื่อเรื่องตุ๊กตาดารุมะสีแดงนับพันตัวที่ตั้งเรียงรายทั่ววัด ผู้คนนิยมมาเขียนตาข้างขวาและขอพรแห่งชัยชนะ (Winning Daruma) ทั้งเรื่องธุรกิจ การสอบ และความสำเร็จในชีวิต",
    transport: "🚌 จากสถานี Minoh-kayano (Osaka Metro Midosuji Line / Kita-Osaka Kyuko) ต่อรถบัส Hankyu Bus 15-20 นาที",
    bestTime: "09:00 - 15:00 น. (ช่วงเช้าถึงบ่ายแดดส่องกระทบวิหารสีแดงและรอบรถบัสสะดวก)",
    foodTips: "ห้ามพลาด: ชิมไอศกรีมมัทฉะดารุมะ และซื้อขนมเซมเบ้รูปดารุมะของฝากเอกลักษณ์ประจำวัด",
    estimatedCost: "ค่าเข้าชมผู้ใหญ่ 500 เยน / เด็ก 400 เยน (ตุ๊กตาดารุมะขอพร 2,000 - 5,000 เยน)",
    mustTry: ["เขียนตาและอธิษฐานขอพรกับตุ๊กตาดารุมะแห่งชัยชนะ", "ตามหาตุ๊กตาดารุมะจิ๋วที่ซ่อนอยู่ตามซอกหินและโคมไฟทั่ววัด", "ถ่ายรูปสะพานสีแดงข้ามสระน้ำและหมอกไอละอองน้ำสุดอลังการ"],
    nearbyHotels: [
      {
        name: "Ooedo Onsen Monogatari Minoh Kanko Hotel",
        japanese: "大江戸温泉物語 箕面観光ホテル",
        type: "โรงแรมเรียวกังออนเซ็นชมวิวมหานคร",
        distance: "นั่งรถ 10 นาทีถึงวัดคัตสึโอจิ",
        priceJPY: 16500,
        priceRange: "¥13,000 - ¥22,000 / คืน",
        rating: 4.7,
        highlight: "บ่อออนเซ็นลอยฟ้า Sky Open-air Bath ชมวิวพาโนรามาแสงไฟโอซาก้า มีบุฟเฟต์มื้อค่ำอาหารญี่ปุ่นและเนื้อย่างจัดเต็ม",
        searchQuery: "Minoh Kanko Hotel Osaka"
      },
      {
        name: "Senri Hankyu Hotel Osaka",
        japanese: "千里阪急ホテル",
        type: "โรงแรมคลาสสิกใกล้สถานีรถไฟใหญ่สายสีแดง",
        distance: "ติดสถานี Senri-Chuo (นั่งรถบัสตรงถึงวัดคัตสึโอจิ)",
        priceJPY: 11000,
        priceRange: "¥9,000 - ¥16,000 / คืน",
        rating: 4.6,
        highlight: "ทำเลต่อรถบัสไปวัดคัตสึโอจิสะดวกที่สุด เงียบสงบ บรรยากาศร่มรื่นสไตล์ยุโรป",
        searchQuery: "Senri Hankyu Hotel Osaka"
      }
    ]
  },

  // --- NEW CHUBU & HOKKAIDO DESTINATIONS ---
  {
    id: "chubu-takayama-oldtown",
    title: "เมืองเก่าทาคายามะ ซันมาจิ ซูจิ & วากิวฮิดะ (Takayama Sanmachi Suji & Hida Beef)",
    japanese: "飛騨高山 古い町並み (三町通り) & 飛騨牛",
    region: "chubu",
    category: "food",
    seasons: ["autumn", "winter", "spring"],
    tag: "บ้านไม้โบราณยุคเอโดะ / เนื้อฮิดะ A5",
    rating: 4.9,
    keyword: "takayama old town sanmachi suji hida beef sushi japan",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80",
    description: "เมืองโบราณยุคเอโดะที่ได้รับการอนุรักษ์ไว้อย่างสมบูรณ์แบบ เดินชิมซูชิเนื้อฮิดะวากิว A5 เบิร์นไฟบนแผ่นเซมเบ้ และชิมสาเกญี่ปุ่นในโรงกลั่นอายุกว่า 200 ปี",
    transport: "🚆 นั่งรถไฟ JR Limited Express Hida จากสถานี Nagoya มาลง Takayama Station (2 ชม. 20 นาที)",
    bestTime: "09:30 - 15:30 น. ช่วงที่ร้านค้าโบราณและโรงกลั่นสาเกเปิดให้บริการ",
    foodTips: "ห้ามพลาด: ซูชิเนื้อฮิดะวากิว A5 วางบนข้าวเกรียบ (Hida Beef Nigiri), ซาลาเปาไส้เนื้อฮิดะร้อนๆ, ทาคายามะราเมงเส้นหยักซุปโชยุเข้มข้น",
    estimatedCost: "ซูชิเนื้อฮิดะ 2 คำ 800 - 1,200 เยน / ราเมงชามละ 800 - 1,100 เยน",
    mustTry: ["สั่งซูชิเนื้อฮิดะเบิร์นไฟโรยเกลือหินร้าน Hida Kotteushi", "ชิมสาเกท้องถิ่นแบบหยอดเหรียญในโรงกลั่น Funasaka Sake Brewery", "เดินข้ามสะพานสีแดง Nakabashi"],
    nearbyHotels: [
      {
        name: "Honjin Hiranoya Kachoan",
        japanese: "本陣平野屋 花兆庵 (飛騨高山)",
        type: "เรียวกังหรูระดับท็อปบริการระดับตำนาน",
        distance: "เดิน 1 นาทีถึงเมืองเก่าซันมาจิซูจิ",
        priceJPY: 45000,
        priceRange: "¥36,000 - ¥58,000 / คืน",
        rating: 4.9,
        highlight: "เสิร์ฟไคเซกิดินเนอร์เนื้อฮิดะวากิว A5 ในห้องพัก บ่อออนเซ็นหินธรรมชาติวิวแม่น้ำมิยางาวะ",
        searchQuery: "Honjin Hiranoya Kachoan Takayama"
      },
      {
        name: "Oyado Koto no Yume",
        japanese: "お宿 琴の夢",
        type: "เรียวกังบูติกสไตล์ญี่ปุ่นอบอุ่น",
        distance: "เดิน 5 นาทีถึงเมืองเก่า",
        priceJPY: 23000,
        priceRange: "¥18,000 - ¥29,000 / คืน",
        rating: 4.8,
        highlight: "มีชุดยูกาตะสีสันสดใสให้เลือกใส่ฟรี บ่อออนเซ็นกลิ่นดอกไม้ อาหารเช้าสไตล์โฮมเมดฮิดะ",
        searchQuery: "Oyado Koto no Yume Takayama"
      },
      {
        name: "Wat Hotel & Spa Hida Takayama",
        japanese: "ワットホテル＆スパ 飛騨高山",
        type: "โรงแรมโมเดิร์นพร้อมออนเซ็นกลางแจ้งบนดาดฟ้า",
        distance: "เดิน 6 นาทีจากสถานี Takayama",
        priceJPY: 14500,
        priceRange: "¥11,000 - ¥19,000 / คืน",
        rating: 4.7,
        highlight: "มีบ่อออนเซ็นส่วนตัวฟรี 4 ห้อง บ่อกลางแจ้งชมวิวเมืองทาคายามะและเทือกเขาเจแปนแอลป์",
        searchQuery: "Wat Hotel and Spa Hida Takayama"
      }
    ]
  },
  {
    id: "hokkaido-hakodate-night",
    title: "จุดชมวิวกลางคืนยอดเขาฮาโกดาเตะ & ตลาดเช้า (Mount Hakodate Night View)",
    japanese: "函館山 夜景 & 函館朝市",
    region: "hokkaido",
    category: "attraction",
    seasons: ["all_year", "winter", "autumn"],
    tag: "1 ใน 3 วิวกลางคืนสวยที่สุดในโลก / ข้าวหน้าปลาดิบ",
    rating: 4.9,
    keyword: "mount hakodate night view japan morning seafood market",
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1200&q=80",
    description: "ทัศนียภาพยามค่ำคืนระดับ 3 ดาวมิชลินกรีนไกด์ คอดคอดแคบของเมืองที่ขนาบด้วยทะเลสองฝั่ง พร้อมตื่นเช้าไปตกหมึกสดและกินข้าวหน้าไข่ปลาแซลมอนที่ตลาดเช้าฮาโกดาเตะ",
    transport: "🚡 นั่งรถราง Hakodate City Tram ลงป้าย Jujigai แล้วเดิน 7 นาทีไปขึ้นกระเช้าลอยฟ้า Mount Hakodate Ropeway",
    bestTime: "17:30 - 20:00 น. สำหรับจุดชมวิวกลางคืน และ 07:00 - 11:00 น. สำหรับตลาดเช้า",
    foodTips: "ห้ามพลาด: ข้าวหน้าซีฟู้ด 3 สี (Uni-Ikura-Kani Don), เบอร์เกอร์หมึกดำร้าน Lucky Pierrot, ชีสเค้กเนื้อนุ่มร้าน Snaffles",
    estimatedCost: "ตั๋วกระเช้าลอยฟ้าไป-กลับ 1,800 เยน / ข้าวหน้าปลาดิบตลาดเช้า 1,800 - 3,500 เยน",
    mustTry: ["ชมแสงไฟเมืองโค้งเว้าสองฟากฝั่งทะเลบนยอดเขาฮาโกดาเตะ", "กิจกรรมตกหมึกสดดิ้นได้ในบ่อตลาดเช้า", "ชิมเบอร์เกอร์ไก่ทอดสไตล์จีน Lucky Pierrot ที่มีเฉพาะในฮาโกดาเตะ"],
    nearbyHotels: [
      {
        name: "La Vista Hakodate Bay",
        japanese: "ラビスタ函館ベイ",
        type: "โรงแรมหรูออนเซ็นวิวอ่าวและอาหารเช้าอันดับ 1",
        distance: "เดิน 3 นาทีถึงโกดังอิฐแดง และ 10 นาทีถึงกระเช้าฮาโกดาเตะ",
        priceJPY: 23000,
        priceRange: "¥18,000 - ¥30,000 / คืน",
        rating: 4.9,
        highlight: "บุฟเฟต์อาหารเช้าที่ชนะเลิศอันดับ 1 ของญี่ปุ่น ตักไข่ปลาแซลมอน ปลาหมึก หอยเชลล์สดไม่อั้น",
        searchQuery: "La Vista Hakodate Bay"
      },
      {
        name: "Century Marina Hakodate",
        japanese: "センチュリーマリーナ函館",
        type: "โรงแรมโมเดิร์นพรีเมียมพร้อมสกายสปาออนเซ็น",
        distance: "เดิน 5 นาทีจากสถานี JR Hakodate",
        priceJPY: 25000,
        priceRange: "¥19,000 - ¥34,000 / คืน",
        rating: 4.9,
        highlight: "บ่อออนเซ็นอินฟินิตี้วิวทะเลบนชั้น 15 สปาเกลือหิน และอาหารเช้าสุดอลังการกว่า 150 เมนู",
        searchQuery: "Century Marina Hakodate"
      },
      {
        name: "Hotel WBF Grande Hakodate",
        japanese: "ホテルWBFグランデ函館",
        type: "โรงแรมทำเลเยี่ยมใกล้จุดขึ้นกระเช้า",
        distance: "เดิน 5 นาทีถึงสถานีรถราง Jujigai",
        priceJPY: 11500,
        priceRange: "¥9,000 - ¥16,000 / คืน",
        rating: 4.6,
        highlight: "ทำเลดีเดินทางสะดวก ห้องพักสะอาด บรรยากาศเงียบสงบในราคาคุ้มค่า",
        searchQuery: "Hotel WBF Grande Hakodate"
      }
    ]
  },
  {
    id: "fukuoka-dazaifu",
    title: "ศาลเจ้าดาไซฟุ เทนมันกุ & ขนมบ๊วยย่าง (Dazaifu Tenmangu Shrine)",
    japanese: "太宰府天満宮 (だざいふてんまんぐう) & 梅ヶ枝餅",
    region: "fukuoka",
    category: "attraction",
    seasons: ["spring", "winter", "autumn"],
    tag: "ศาลเจ้าเทพแห่งการเรียน / สวนต้นบ๊วย 6,000 ต้น",
    rating: 4.8,
    keyword: "dazaifu tenmangu fukuoka shrine plum blossom bridge torii",
    image: "https://images.unsplash.com/photo-1574083290929-a7b9ebdfab99?auto=format&fit=crop&w=1200&q=80",
    description: "ศาลเจ้าศักดิ์สิทธิ์ประจำเทพแห่งการศึกษาและปัญญา มีสะพานแดงโค้งข้ามสระน้ำ 3 ช่วงสื่อถึงอดีต ปัจจุบัน อนาคต พร้อมต้นบ๊วยโบราณบานสะพรั่งกว่า 6,000 ต้น",
    transport: "🚆 นั่งรถไฟ Nishitetsu Tenjin-Omuta Line จากสถานี Tenjin มาลง Dazaifu Station (30 นาที)",
    bestTime: "09:00 - 15:30 น. ช่วงฤดูดอกบ๊วยบาน (ก.พ. - มี.ค.) หรือช่วงไหว้พระขอพร",
    foodTips: "ห้ามพลาด: ขนมโมจิย่างไส้ถั่วแดงร้อนๆ ประทับตราดอกบ๊วย (Umegae Mochi), กาแฟร้าน Starbucks สาขาดีไซน์ไม้สานสุดล้ำโดย Kengo Kuma",
    estimatedCost: "เข้าชมฟรี (ขนมโมจิชิ้นละ 150 เยน / ค่าเครื่องรางการเรียน 1,000 เยน)",
    mustTry: ["ลูบหัววัวทองสัมฤทธิ์หน้าศาลเจ้าเพื่อเสริมสติปัญญา", "เดินข้ามสะพานแดงโค้งไทโกะบาชิ 3 ช่วง", "กินขนม Umegae Mochi ย่างร้อนๆ กรอบนอกนุ่มใน"],
    nearbyHotels: [
      {
        name: "Hotel Cultia Dazaifu",
        japanese: "HOTEL CULTIA 太宰府",
        type: "โรงแรมหรูรีโนเวทจากคฤหาสน์โบราณยุคเอโดะ",
        distance: "เดิน 3 นาทีถึงศาลเจ้าดาไซฟุ",
        priceJPY: 38000,
        priceRange: "¥30,000 - ¥50,000 / คืน",
        rating: 4.9,
        highlight: "พักในบ้านขุนนางโบราณที่ตกแต่งอย่างมีระดับ เสิร์ฟอาหารฝรั่งเศสฟิวชั่นวัตถุดิบคิวชู",
        searchQuery: "Hotel Cultia Dazaifu Fukuoka"
      },
      {
        name: "Nishitetsu Hotel Croom Hakata Gion",
        japanese: "西鉄ホテル クルーム 博多祇園 (天然温泉)",
        type: "โรงแรมพร้อมออนเซ็นน้ำแร่ธรรมชาติใจกลางเมือง",
        distance: "นั่งรถไฟจาก Tenjin 30 นาทีถึงดาไซฟุ",
        priceJPY: 17500,
        priceRange: "¥14,000 - ¥23,000 / คืน",
        rating: 4.8,
        highlight: "บ่อออนเซ็นธรรมชาติขนาดใหญ่ ทำเลสะดวกติดสถานี Kushida Shrine และตลาดคาแนลซิตี้",
        searchQuery: "Nishitetsu Hotel Croom Hakata Gion"
      },
      {
        name: "Dormy Inn Hakata Gion",
        japanese: "天然温泉 袖湊の湯 ドーミーイン博多祇園",
        type: "โรงแรมออนเซ็นคุ้มค่ายอดนิยม",
        distance: "นั่งรถไฟตรงสู่ดาไซฟุได้ง่าย",
        priceJPY: 15000,
        priceRange: "¥12,000 - ¥19,000 / คืน",
        rating: 4.7,
        highlight: "ออนเซ็นน้ำแร่ธรรมชาติ ฟรีราเมงโชยุรอบดึก บุฟเฟต์อาหารเช้าเสิร์ฟเมนไทโกะไม่อั้น",
        searchQuery: "Dormy Inn Hakata Gion Fukuoka"
      }
    ]
  },
  {
    id: "hiroshima-miyajima",
    title: "ศาลเจ้าลอยน้ำมิยาจิมะ & เสาโทริอิกลางทะเล (Miyajima Itsukushima Shrine)",
    japanese: "宮島 厳島神社 (いつくしまじんじゃ - 日本三景)",
    region: "fukuoka",
    category: "attraction",
    seasons: ["autumn", "spring", "all_year"],
    tag: "1 ใน 3 ทิวทัศน์สวยที่สุดในญี่ปุ่น / มรดกโลก UNESCO",
    rating: 4.9,
    keyword: "miyajima itsukushima floating torii gate hiroshima sea deer",
    image: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=1200&q=80",
    description: "หนึ่งใน 'นิฮงซังเค' (3 ทิวทัศน์งดงามที่สุดของญี่ปุ่น) เสาโทริอิไม้สีชาดขนาดยักษ์และวิหารศาลเจ้าที่ดูเหมือนลอยอยู่บนผิวน้ำทะเลเวลาน้ำขึ้น และเดินลงไปแตะโคนเสาได้เวลาน้ำลง",
    transport: "⛴️ นั่งรถไฟ JR Sanyo Line จากสถานี Hiroshima ไปลง Miyajimaguchi (28 นาที) แล้วต่อเรือเฟอร์รี่ JR Ferry (10 นาที)",
    bestTime: "ช่วงน้ำขึ้นเต็มที่ (High Tide) เพื่อชมเสาลอยน้ำ และช่วงพระอาทิตย์ตกดิน",
    foodTips: "ห้ามพลาด: หอยนางรมฮิโรชิม่าย่างเนยตัวโต (Yaki Kaki), ขนมโมจิใบเมเปิลไส้คัสตาร์ดทอดกรอบ (Fried Momiji Manju), ข้าวหน้าปลาไหลทะเลอะนาโกะ (Anagomeshi)",
    estimatedCost: "ค่าเข้าศาลเจ้าอิทสึคุชิมะ 300 เยน / ค่าเรือเฟอร์รี่ 200 เยน (ใช้ JR Pass ขึ้นฟรี)",
    mustTry: ["ถ่ายรูปเสาโทริอิลอยน้ำสีแดงสดตัดกับทะเลสีคราม", "เดินลงไปสัมผัสเสาโทริอิตอนน้ำลดช่วงบ่าย", "ชิมหอยนางรมย่างสดๆ ริมทางเดินเลียบหาด"],
    nearbyHotels: [
      {
        name: "Kurayado Iroha",
        japanese: "蔵宿 いろは (宮島)",
        type: "เรียวกังโมเดิร์นลักชัวรี่วิวทะเลมิยาจิมะ",
        distance: "เดิน 5 นาทีถึงศาลเจ้าอิทสึคุชิมะ",
        priceJPY: 42000,
        priceRange: "¥34,000 - ¥55,000 / คืน",
        rating: 4.9,
        highlight: "บ่อออนเซ็นลอยฟ้าชั้นบนสุดชมวิวเสาโทริอิกลางทะเล ดินเนอร์ไคเซกิเสิร์ฟหอยนางรมและเนื้อวากิว",
        searchQuery: "Kurayado Iroha Miyajima Hiroshima"
      },
      {
        name: "Miyajima Seaside Hotel",
        japanese: "宮島シーサイドホテル",
        type: "โรงแรมตากอากาศริมหาดเงียบสงบ",
        distance: "มีรถรับส่งฟรีจากท่าเรือมิยาจิมะ",
        priceJPY: 24000,
        priceRange: "¥18,000 - ¥30,000 / คืน",
        rating: 4.7,
        highlight: "มองเห็นวิวทะเลเซโตะในทุกห้องพัก บ่ออาบน้ำรวมขนาดใหญ่ท่ามกลางธรรมชาติ",
        searchQuery: "Miyajima Seaside Hotel"
      },
      {
        name: "Sheraton Grand Hiroshima Hotel",
        japanese: "シェラトングランドホテル広島",
        type: "โรงแรมหรู 5 ดาวเชื่อมตรงสถานี Hiroshima Shinkansen",
        distance: "เชื่อมตรงสถานี Shinkansen เดินทางไปมิยาจิมะสะดวกมาก",
        priceJPY: 26000,
        priceRange: "¥20,000 - ¥35,000 / คืน",
        rating: 4.9,
        highlight: "ทำเลดีเลิศติดสถานีรถไฟชินคันเซ็น ห้องพักหรูหรากว้างขวาง สระว่ายน้ำในร่ม",
        searchQuery: "Sheraton Grand Hiroshima Hotel"
      }
    ]
  }
];

// ================= 2. SEASON & POPULARITY STATS DATA =================
const SEASON_STATS_DATA = {
  spring: {
    name: "ฤดูใบไม้ผลิ (Spring / ซากุระ)",
    months: "มีนาคม — พฤษภาคม",
    tempRange: "10°C - 20°C (อากาศเย็นสบาย)",
    overallCrowdIndex: "🔥 พีคสุดของปี (High Season)",
    highlightDescription: "ช่วงเวลาที่ดอกซากุระบานสะพรั่งทั่วประเทศ บรรยากาศโรแมนติก เหมาะกับการชมดอกไม้ (Hanami) และเดินเล่นในเมือง",
    topCities: [
      { name: "โตเกียว (Tokyo)", sharePercent: 92, highlight: "ซากุระบานเต็มสวนชินจูกุและแม่น้ำเมกุโระ", crowdLevel: "แน่นมาก" },
      { name: "เกียวโต (Kyoto)", sharePercent: 96, highlight: "เสาโทริอิและวัดโบราณตัดกับซากุระสีชมพู", crowdLevel: "แน่นที่สุด" },
      { name: "ภูเขาไฟฟูจิ (Fuji)", sharePercent: 88, highlight: "เทศกาลชมซากุระริมทะเลสาบคาวากุจิโกะ", crowdLevel: "แน่นมาก" },
      { name: "โอซาก้า (Osaka)", sharePercent: 85, highlight: "สวนปราสาทโอซาก้าและปิกนิกริมน้ำ", crowdLevel: "ปานกลาง-แน่น" }
    ],
    budgetLevel: "🔴 สูงสุด (ตั๋วเครื่องบินและโรงแรมปรับขึ้น 30-50%)"
  },
  summer: {
    name: "ฤดูร้อน (Summer / เทศกาลดอกไม้ไฟ)",
    months: "มิถุนายน — สิงหาคม",
    tempRange: "24°C - 33°C (ร้อนชื้น มีฝน)",
    overallCrowdIndex: "🟢 ปานกลาง (Low-Mid Season)",
    highlightDescription: "เทศกาลงานวัดญี่ปุ่น (Matsuri), เทศกาลดอกไม้ไฟยามค่ำคืน, ทุ่งลาเวนเดอร์ฮอกไกโด และปีนภูเขาไฟฟูจิ",
    topCities: [
      { name: "ฮอกไกโด (Hokkaido)", sharePercent: 94, highlight: "ทุ่งลาเวนเดอร์ฟุราโนะ อากาศเย็นสบายไม่ร้อน", crowdLevel: "แน่นมาก" },
      { name: "โอซาก้า (Osaka)", sharePercent: 78, highlight: "เทศกาลเทนจิน มัตสุริ และสวนสนุก USJ", crowdLevel: "ปานกลาง" },
      { name: "ฟุกุโอกะ (Fukuoka)", sharePercent: 72, highlight: "เทศกาลฮากาตะ กิอง ยามากาสะ ชายหาดสวย", crowdLevel: "ปานกลาง" },
      { name: "โตเกียว (Tokyo)", sharePercent: 70, highlight: "งานแสดงดอกไม้ไฟริมแม่น้ำสุมิดะ", crowdLevel: "ปานกลาง" }
    ],
    budgetLevel: "🟢 ประหยัด (ตั๋วเครื่องบินและโรงแรมราคาถูกที่สุด ยกเว้นฮอกไกโด)"
  },
  autumn: {
    name: "ฤดูใบไม้เปลี่ยนสี (Autumn / ใบไม้แดง)",
    months: "กันยายน — พฤศจิกายน",
    tempRange: "12°C - 22°C (เย็นสดชื่น ฟ้าโปร่ง)",
    overallCrowdIndex: "🔥 พีคมาก (High Season)",
    highlightDescription: "ฤดูที่สวยงามที่สุดด้วยใบเมเปิ้ลสีแดงส้มและใบแปะก๊วยสีเหลืองทองทั่ววัด ศาลเจ้า และอุทยานแห่งชาติ",
    topCities: [
      { name: "เกียวโต (Kyoto)", sharePercent: 98, highlight: "ป่าไผ่ วัดคิโยมิสึ และวัดโทฟุคุจิ ใบไม้แดงตระการตา", crowdLevel: "แน่นที่สุด" },
      { name: "ภูเขาไฟฟูจิ (Fuji)", sharePercent: 91, highlight: "อุโมงค์ใบเมเปิ้ลแดงริมทะเลสาบคาวากุจิโกะ", crowdLevel: "แน่นมาก" },
      { name: "ชิราคาวาโกะ (Shirakawa-go)", sharePercent: 86, highlight: "หมู่บ้านมรดกโลกโอบล้อมด้วยภูเขาหลากสี", crowdLevel: "แน่นมาก" },
      { name: "โตเกียว (Tokyo)", sharePercent: 88, highlight: "ถนนต้นแปะก๊วย Meiji Jingu Gaien สีเหลืองทอง", crowdLevel: "แน่น" }
    ],
    budgetLevel: "🟠 สูง (ที่พักในเกียวโตและฟูจิต้องจองล่วงหน้า 2-3 เดือน)"
  },
  winter: {
    name: "ฤดูหนาว (Winter / หิมะ & ออนเซ็น)",
    months: "ธันวาคม — กุมภาพันธ์",
    tempRange: "-5°C - 8°C (หนาวจัด หิมะตก)",
    overallCrowdIndex: "❄️ พีคเฉพาะโซนหิมะ (Mid-High Season)",
    highlightDescription: "หิมะขาวโพลน สกีรีสอร์ต เทศกาลหิมะซัปโปโร การแช่ออนเซ็นกลางแจ้ง และวิวฟูจิที่ฟ้าเปิดใสที่สุดในรอบปี",
    topCities: [
      { name: "ฮอกไกโด (Hokkaido)", sharePercent: 96, highlight: "เทศกาลหิมะ Sapporo Snow Festival และคลองโอตารุ", crowdLevel: "แน่นที่สุด" },
      { name: "ชิราคาวาโกะ (Shirakawa-go)", sharePercent: 95, highlight: "บ้านโบราณใต้หิมะหนาและงานประดับไฟ Light-up", crowdLevel: "แน่นมาก" },
      { name: "ภูเขาไฟฟูจิ (Fuji)", sharePercent: 89, highlight: "ยอดฟูจิปกคลุมด้วยหิมะขาวบริสุทธิ์ ฟ้าเปิดใส", crowdLevel: "ปานกลาง" },
      { name: "โตเกียว (Tokyo)", sharePercent: 75, highlight: "ไฟประดับฤดูหนาว Illumination และช้อปปิ้งปีใหม่", crowdLevel: "ปานกลาง" }
    ],
    budgetLevel: "🟠 สูงในโซนหิมะ (ฮอกไกโด/สกีรีสอร์ตราคาพุ่งสูง ช่วงคริสต์มาส-ปีใหม่)"
  }
};

// ================= 3. STATISTICAL BUDGET BREAKDOWN =================
const BUDGET_STATS_DATA = {
  tiers: [
    {
      style: "🎒 สายประหยัด (Backpacker / Solo)",
      dailyCostTHB: "2,000 - 2,800 บาท / วัน",
      flightTHB: "10,000 - 15,000 บาท (สายการบิน Low-cost)",
      hotelTHB: "1,200 - 2,000 บาท / คืน (Hostel / Capsule / Business Hotel)",
      foodTHB: "800 - 1,200 บาท / วัน (สตรีทฟู้ด ข้าวกล่อง 7-11 ราเมง)",
      transitTHB: "400 - 700 บาท / วัน (Subway Pass / IC Card)"
    },
    {
      style: "✈️ สายมาตรฐาน สบายๆ (Standard / Couple)",
      dailyCostTHB: "3,500 - 5,000 บาท / วัน",
      flightTHB: "16,000 - 24,000 บาท (Full Service หรือ Low-cost รวมโหลดกระเป๋า)",
      hotelTHB: "3,000 - 5,500 บาท / คืน (โรงแรม 3-4 ดาว ใกล้สถานีใหญ่)",
      foodTHB: "1,500 - 2,500 บาท / วัน (ซูชิ วากิว บุฟเฟต์ คาเฟ่ ขนม)",
      transitTHB: "800 - 1,500 บาท / วัน (รวม Shinkansen บางช่วง)"
    },
    {
      style: "👑 สายพรีเมียม / เรียวกังออนเซ็น (Luxury / Family)",
      dailyCostTHB: "7,000 - 15,000+ บาท / วัน",
      flightTHB: "28,000 - 55,000+ บาท (Business Class หรือ Full Service พรีเมียม)",
      hotelTHB: "8,000 - 20,000+ บาท / คืน (Ryokan ออนเซ็นส่วนตัว / 5 ดาว)",
      foodTHB: "4,000 - 10,000+ บาท / วัน (ไคเซกิ โอมากาเสะ เนื้อวากิว A5)",
      transitTHB: "2,000 - 4,000 บาท / วัน (Green Car Shinkansen / แท็กซี่)"
    }
  ]
};

const JAPAN_TRANSIT_TIPS = [
  {
    icon: "💳",
    title: "บัตร IC Card (Welcome Suica / Pasmo / ICOCA)",
    desc: "บัตรแตะจ่ายที่ใช้ได้กับรถไฟ รถบัส และร้านสะดวกซื้อ (7-Eleven, Lawson, FamilyMart) ทั่วญี่ปุ่น สามารถผูกเข้ากับ Apple Wallet ได้ทันที"
  },
  {
    icon: "🚅",
    title: "JR Pass vs ซื้อตั๋ว Shinkansen รายเที่ยว",
    desc: "หากเดินทางข้ามเมืองใหญ่แค่ 1-2 เมือง (เช่น Tokyo -> Kyoto -> Osaka) แนะนำซื้อตั๋ว Shinkansen รายเที่ยวผ่านแอป SmartEX จะประหยัดกว่าซื้อ JR Pass ทั้งประเทศ"
  },
  {
    icon: "📱",
    title: "แอปจำเป็นสำหรับการเดินทาง",
    desc: "ใช้ Google Maps ร่วมกับแอป 'Japan Travel by NAVITIME' จะบอกหมายเลขชานชาลา (Track No.) ทางออกที่ใกล้ที่สุด (Exit) และตู้รถไฟที่เปลี่ยนสายได้เร็วที่สุด"
  },
  {
    icon: "🧳",
    title: "บริการส่งกระเป๋าข้ามเมือง (Ta-Q-Bin / แมวดำ)",
    desc: "ไม่ต้องลากกระเป๋าใบใหญ่ขึ้นรถไฟ Shinkansen สามารถใช้บริการส่งกระเป๋า Yamato Transport จากโรงแรมหนึ่งไปยังอีกโรงแรมได้ในราคาเพียง ~2,000 เยนต่อใบ"
  }
];

// ================= 4. KONBINI GOURMET DATA (7-11, Lawson, FamilyMart) =================
const KONBINI_DATA = [
  {
    id: "konbini-711-egg",
    store: "7-eleven",
    storeName: "7-Eleven Japan",
    badgeColor: "#008050",
    name: "แซนด์วิชไข่ในตำนาน (Tamago Sando)",
    japanese: "たっぷりたまごサンド",
    priceJPY: "¥160 (ประมาณ 38 บาท)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    description: "ขนมปังนุ่มละมุน ไส้สลัดไข่แน่นทะลัก รสชาติกลมกล่อมหอมมายองเนสญี่ปุ่นสูตรลับ เมนูอาหารเช้าอันดับ 1 ของนักท่องเที่ยว",
    tips: "ทานคู่กับกาแฟดริป 7-Cafe ร้อนๆ อร่อยลงตัวที่สุด"
  },
  {
    id: "konbini-lawson-karaage",
    store: "lawson",
    storeName: "Lawson Station",
    badgeColor: "#0068b7",
    name: "ไก่ทอดคาราอาเกะคุง (Karaage-kun)",
    japanese: "からあげクン (レギュラー / レッド)",
    priceJPY: "¥238 (ประมาณ 56 บาท)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    description: "เนื้อไก่ชิ้นพอดีคำ กรอบนอกนุ่มฉ่ำใน มีหลากหลายรสชาติทั้ง รสดั้งเดิม (Regular), รสเผ็ด (Red), และรสชีส (Cheese)",
    tips: "สั่งตรงตู้กระจกหน้าแคชเชียร์ หยิบกินร้อนๆ ตอนอากาศหนาวฟินสุดๆ"
  },
  {
    id: "konbini-famima-famichiki",
    store: "familymart",
    storeName: "FamilyMart",
    badgeColor: "#00a0e9",
    name: "ไก่ทอดแฟมิจิกิ (FamiChiki)",
    japanese: "ファミチキ (骨なしジューシーチキン)",
    priceJPY: "¥220 (ประมาณ 52 บาท)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    description: "ไก่ทอดไร้กระดูก หนังกรอบสะใจ เนื้อในชุ่มฉ่ำน้ำซุปละลายในปาก เป็นเมนูร้อนในตำนานของ FamilyMart",
    tips: "สามารถซื้อขนมปังเบอร์เกอร์ของแฟมิลี่มาร์ทมาประกบกินเป็น FamiChiki Burger ได้"
  },
  {
    id: "konbini-lawson-rollcake",
    store: "lawson",
    storeName: "Lawson Uchi Cafe",
    badgeColor: "#0068b7",
    name: "พรีเมียมโรลเค้ก (Premium Roll Cake)",
    japanese: "プレミアムロールケーキ",
    priceJPY: "¥180 (ประมาณ 42 บาท)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    description: "เค้กโรลแป้งนุ่มฟู สอดไส้ด้วยวิปครีมนมสดฮอกไกโดเข้มข้น ไม่หวานเลี่ยน กินคำไหนก็ฟิน",
    tips: "มีช้อนเล็กแถมให้ ตักกินพร้อมครีมตรงกลางสดชื่นมาก"
  },
  {
    id: "konbini-711-smoothie",
    store: "7-eleven",
    storeName: "7-Eleven Japan",
    badgeColor: "#008050",
    name: "สมูทตี้ผลไม้สดปั่นสด (7-Cafe Smoothie)",
    japanese: "セブンカフェ スムージー",
    priceJPY: "¥300 (ประมาณ 70 บาท)",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    description: "แก้วผลไม้สดแช่แข็งในตู้ฟรีซ นำไปวางในเครื่องปั่นอัตโนมัติหน้าร้าน 7-11 ปั่นสดใหม่ใน 90 วินาที",
    tips: "รส Berry Banana Soy Smoothie และ Greens Smoothie หอมสดชื่น ดื่มคลายร้อนดีเยี่ยม"
  }
];

// ================= 5. MUST-BUY SOUVENIRS DATA =================
const SOUVENIRS_DATA = [
  {
    id: "souvenir-tokyo-banana",
    name: "โตเกียว บานาน่า (Tokyo Banana)",
    japanese: "東京ばな奈「見ぃつけたっ」",
    origin: "โตเกียว / สนามบินฮาเนดะ-นาริตะ",
    priceRange: "¥1,180 - ¥1,700 (4-8 ชิ้น)",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    desc: "เค้กฟองน้ำรูปกล้วยนุ่มนิ่ม สอดไส้คัสตาร์ดครีมกล้วยแท้ ของฝากยอดนิยมอันดับ 1 ของเมืองหลวง",
    whereToBuy: "สนามบินนาริตะ, สนามบินฮาเนดะ, สถานี Tokyo Station และห้างสรรพสินค้า"
  },
  {
    id: "souvenir-shiroi-koibito",
    name: "ชิโรอิ โคอิบิโตะ (Shiroi Koibito)",
    japanese: "白い恋人 (ขนมคนรักสีขาว)",
    origin: "ฮอกไกโด (Hokkaido)",
    priceRange: "¥1,200 - ¥2,200 (12-24 ชิ้น)",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
    desc: "คุกกี้ลิ้นแมวบางกรอบสอดไส้ไวท์ช็อกโกแลตนมฮอกไกโด รสชาติหวานมัน ละลายในปาก",
    whereToBuy: "สนามบิน Shin-Chitose, สนามบินหลักทั่วญี่ปุ่นในโซน Duty Free"
  },
  {
    id: "souvenir-matcha-kyoto",
    name: "ผงชาเขียวมัทฉะอุจิ & ขนมมัทฉะ (Uji Matcha)",
    japanese: "京都・宇治抹茶 (Ippodo / Tsujiri)",
    origin: "เกียวโต (Kyoto / Uji)",
    priceRange: "¥1,000 - ¥3,500 ต่อกล่อง",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    desc: "ชาเขียวมัทฉะเกรดพรีเมียมจากเมืองอุจิ แหล่งกำเนิดชาที่ดีที่สุดในญี่ปุ่น ทั้งแบบผงชงดื่มและเวเฟอร์คุกกี้",
    whereToBuy: "ร้าน Ippodo Tea, ร้าน Tsujiri เกียวโต, และสนามบินคันไซ/นาริตะ"
  }
];

// ================= 6. TRAVEL JAPANESE PHRASEBOOK DATA =================
const TRAVEL_PHRASES_DATA = [
  {
    category: "dining",
    categoryName: "🍜 สั่งอาหาร & ร้านอาหาร",
    phrases: [
      { th: "ขออันนี้ครับ/ค่ะ (ชี้เมนู)", jp: "これをください", romaji: "Kore o kudasai", speak: "これをお願いします" },
      { th: "มีเมนูภาษาอังกฤษไหมครับ/ค่ะ?", jp: "英語のメニューはありますか？", romaji: "Eigo no menyū wa arimasu ka?", speak: "英語のメニューはありますか" },
      { th: "เก็บเงินด้วยครับ/ค่ะ", jp: "お会計をお願いします", romaji: "Okaikei o onegaishimasu", speak: "お会計をお願いします" },
      { th: "อร่อยมากครับ/ค่ะ! ขอบคุณสำหรับมื้ออาหาร", jp: "ごちそうさまでした", romaji: "Gochisōsama deshita", speak: "ごちそうさまでした" }
    ]
  },
  {
    category: "transit",
    categoryName: "🚅 การเดินทาง & ถามทาง",
    phrases: [
      { th: "สถานีรถไฟไปทางไหนครับ/ค่ะ?", jp: "駅はどこですか？", romaji: "Eki wa doko desu ka?", speak: "駅はどこですか" },
      { th: "รถไฟขบวนนี้ไป [โตเกียว] ไหมครับ/ค่ะ?", jp: "この電車は東京に行きますか？", romaji: "Kono densha wa Tōkyō ni ikimasu ka?", speak: "この電車は東京に行きますか" },
      { th: "ห้องน้ำอยู่ที่ไหนครับ/ค่ะ?", jp: "お手洗いはどこですか？", romaji: "Otearai wa doko desu ka?", speak: "お手洗いはどこですか" }
    ]
  },
  {
    category: "shopping",
    categoryName: "🛍️ ช้อปปิ้ง & คืนภาษี",
    phrases: [
      { th: "ทำ Tax-Free (คืนภาษี) ได้ไหมครับ/ค่ะ?", jp: "免税できますか？", romaji: "Menzei dekimasu ka?", speak: "免税できますか" },
      { th: "อันนี้ราคาเท่าไหร่ครับ/ค่ะ?", jp: "これはいくらですか？", romaji: "Kore wa ikura desu ka?", speak: "これはいくらですか" },
      { th: "จ่ายด้วยบัตรเครดิต/IC Card ได้ไหมครับ/ค่ะ?", jp: "カードで払えますか？", romaji: "Kādo de haraemasu ka?", speak: "カードで払えますか" }
    ]
  }
];

// ================= 7. PRE-FLIGHT CHECKLIST DATA =================
const CHECKLIST_DATA = [
  { id: "chk-vjw", title: "ลงทะเบียน Visit Japan Web", desc: "กรอกข้อมูลตรวจคนเข้าเมือง (Immigration) และศุลกากร (Customs) ล่วงหน้า เพื่อรับ QR Code ผ่านด่านรวดเร็ว", link: "https://vjw-lp.digital.go.jp/en/", tag: "สำคัญมาก" },
  { id: "chk-pass", title: "เช็กอายุหนังสือเดินทาง (Passport)", desc: "ตรวจสอบว่าพาสปอร์ตมีอายุคงเหลือมากกว่า 6 เดือน นับจากวันเดินทางกลับ", tag: "จำเป็น" },
  { id: "chk-esim", title: "เตรียมซิมเน็ต / eSIM / Pocket Wi-Fi", desc: "ซื้อและตั้งค่า eSIM หรือเช่า Wi-Fi พกพา เพื่อให้มีอินเทอร์เน็ตใช้งานทันทีที่ลงเครื่อง", tag: "สะดวกสบาย" },
  { id: "chk-insurance", title: "ทำประกันการเดินทางต่างประเทศ", desc: "ครอบคลุมค่ารักษาพยาบาลฉุกเฉินและสัมภาระสูญหาย อุ่นใจตลอดทริป", tag: "แนะนำ" },
  { id: "chk-card", title: "เตรียมบัตร Travel Card & บัตรเครดิต", desc: "แลกเงินเยนใส่บัตร YouTrip, SCB Planet, หรือ Krungthai Travel Card ไว้แตะจ่ายสะดวกเรทดี", tag: "ประหยัดเงิน" },
  { id: "chk-adapter", title: "หัวปลั๊กไฟ & Power Bank", desc: "ญี่ปุ่นใช้ไฟ 100V ขาแบน 2 ขา (Type A) ควรเตรียม Power Bank ไม่เกิน 20,000-30,000 mAh ขึ้นเครื่อง", tag: "อุปกรณ์" }
];

// ================= 8. JR PASS VS SINGLE TICKET CALCULATOR DATA =================
const JR_PASS_PRICES = {
  "7_days": { name: "All Japan JR Pass 7 วัน (Ordinary)", priceJPY: 50000 },
  "14_days": { name: "All Japan JR Pass 14 วัน (Ordinary)", priceJPY: 80000 },
  "21_days": { name: "All Japan JR Pass 21 วัน (Ordinary)", priceJPY: 100000 }
};

const JR_SHINKANSEN_ROUTES = [
  { id: "tokyo-kyoto", name: "โตเกียว (Tokyo) ↔ เกียวโต (Kyoto)", train: "Tokaido Shinkansen (Nozomi/Hikari)", priceJPY: 14170, time: "2 ชม. 15 นาที" },
  { id: "tokyo-osaka", name: "โตเกียว (Tokyo) ↔ โอซาก้า (Shin-Osaka)", train: "Tokaido Shinkansen (Nozomi)", priceJPY: 14720, time: "2 ชม. 30 นาที" },
  { id: "osaka-hiroshima", name: "ชินโอซาก้า ↔ ฮิโรชิม่า (Hiroshima)", train: "Sanyo Shinkansen (Sakura/Nozomi)", priceJPY: 10630, time: "1 ชม. 25 นาที" },
  { id: "tokyo-kanazawa", name: "โตเกียว (Tokyo) ↔ คานาซาว่า (Kanazawa)", train: "Hokuriku Shinkansen (Kagayaki)", priceJPY: 14380, time: "2 ชม. 30 นาที" },
  { id: "tokyo-sendai", name: "โตเกียว (Tokyo) ↔ เซนได (Sendai)", train: "Tohoku Shinkansen (Hayabusa)", priceJPY: 11410, time: "1 ชม. 30 นาที" },
  { id: "tokyo-hakodate", name: "โตเกียว ↔ ฮาโกดาเตะ/ฮอกไกโด (Hakodate)", train: "Hokkaido Shinkansen", priceJPY: 23430, time: "4 ชม." },
  { id: "kyoto-nara", name: "เกียวโต ↔ นารา (Nara)", train: "JR Miyakoji Rapid Train", priceJPY: 720, time: "45 นาที" },
  { id: "osaka-kobe", name: "โอซาก้า ↔ โกเบ (Kobe Sannomiya)", train: "JR Special Rapid Service", priceJPY: 420, time: "22 นาที" },
  { id: "tokyo-narita", name: "โตเกียว ↔ สนามบินนาริตะ (Narita Express)", train: "N'EX (ไป-กลับ)", priceJPY: 5000, time: "55 นาที" },
  { id: "osaka-kix", name: "โอซาก้า ↔ สนามบินคันไซ (Haruka Express)", train: "Kansai Airport Express Haruka", priceJPY: 2900, time: "50 นาที" }
];

// ================= 9. WEATHER & CLOTHING (OOTD) GUIDE DATA =================
const WEATHER_CLOTHING_DATA = [
  {
    tempRange: "< 5°C",
    seasonTitle: "หนาวจัด / หิมะตก (Freezing Cold)",
    citiesSample: "ฮอกไกโด, ชิราคาวาโกะ, ภูเขาไฟฟูจิ (ฤดูหนาว ธ.ค. - ก.พ.)",
    icon: "❄️",
    clothingItems: [
      { name: "ชั้นใน (Base Layer)", desc: "เสื้อ & กางเกง Heattech ชนิด Ultra Warm", tag: "จำเป็น" },
      { name: "ชั้นกลาง (Mid Layer)", desc: "สเวตเตอร์ขนสัตว์ (Wool) หรือ Fleece หนา", tag: "อุ่นสบาย" },
      { name: "เสื้อนอก (Outerwear)", desc: "เสื้อโค้ตขนเป็ด (Down Jacket) ชนิดกันลมและกันละอองน้ำ", tag: "ห้ามพลาด" },
      { name: "ไอเทมเสริม", desc: "ถุงมือทัชสกรีน, ผ้าพันคอ, หมวกไหมพรม Beanie, ถุงทรายร้อน (Kairo)" }
    ]
  },
  {
    tempRange: "6°C - 14°C",
    seasonTitle: "อากาศหนาวเย็นสบาย (Cool & Chilly)",
    citiesSample: "โตเกียว, โอซาก้า, เกียวโต (ปลายฤดูใบไม้ร่วง / ต้นใบไม้ผลิ)",
    icon: "🧥",
    clothingItems: [
      { name: "เสื้อท่อนบน", desc: "เสื้อสเวตเตอร์, ฮู้ดดี้, หรือเชิ้ตคู่กับคาร์ดิแกน", tag: "ยอดนิยม" },
      { name: "เสื้อคลุม", desc: "Trench Coat, เสื้อโค้ตผ้าวูล, หรือแจ็กเก็ตหนัง/ยีนส์", tag: "แฟชั่น" },
      { name: "เสื้อท่อนล่าง", desc: "กางเกงยีนส์ขายาว, กางเกงสแล็ค, หรือกระโปรงพร้อมเลกกิ้ง", tag: "คล่องตัว" },
      { name: "ไอเทมเสริม", desc: "ผ้าพันคอแฟชั่นเบาๆ, รองเท้าผ้าใบใส่เดินสบายทั้งวัน" }
    ]
  },
  {
    tempRange: "15°C - 23°C",
    seasonTitle: "อบอุ่นสบายกำลังดี (Pleasant & Mild)",
    citiesSample: "ช่วงซากุระบานสะพรั่ง (เม.ย. - พ.ค.) / ช่วงใบไม้แดงพีค (ต.ค. - พ.ย.)",
    icon: "🌸",
    clothingItems: [
      { name: "เสื้อท่อนบน", desc: "เสื้อยืดแขนยาว หรือเสื้อเชิ้ตผ้าคอตตอนโปร่งสบาย", tag: "สบายตัว" },
      { name: "เสื้อคลุมเบา", desc: "Cardigan บางๆ หรือ Blazer ลำลองสำหรับช่วงเช้า-ค่ำ", tag: "พกพาง่าย" },
      { name: "รองเท้า", desc: "Sneakers รองเท้าผ้าใบเดินชมธรรมชาติและวัด", tag: "แนะนำ" }
    ]
  },
  {
    tempRange: "> 24°C",
    seasonTitle: "ฤดูร้อน & เทศกาลดอกไม้ไฟ (Summer & Warm)",
    citiesSample: "โตเกียว, ฟุกุโอกะ, โอซาก้า (ก.ค. - ส.ค.)",
    icon: "☀️",
    clothingItems: [
      { name: "เสื้อผ้า", desc: "เสื้อยืดผ้าลินิน/คอตตอน ระบายอากาศได้ดี (AIRism)", tag: "เย็นสบาย" },
      { name: "ท่อนล่าง", desc: "กางเกงขาสั้น หรือกางเกงผ้าลินินขายาวโปร่ง", tag: "คล่องตัว" },
      { name: "ไอเทมเสริม", desc: "แว่นกันแดด, ครีมกันแดด SPF50+, ร่มพับกัน UV/ฝน, พัดลมมือถือ" }
    ]
  }
];

// ================= 10. BLOOM & FOLIAGE FORECAST DATA =================
const BLOOM_FORECAST_DATA = {
  sakura: [
    { region: "คิวชู / ฟุกุโอกะ (Fukuoka)", firstBloom: "20 - 23 มี.ค.", fullBloom: "28 มี.ค. - 3 เม.ย.", status: "ชมได้เร็วที่สุดในเกาะหลัก" },
    { region: "โตเกียว (Tokyo)", firstBloom: "22 - 25 มี.ค.", fullBloom: "29 มี.ค. - 6 เม.ย.", status: "ไฮไลต์: แม่น้ำ Meguro, สวน Ueno" },
    { region: "คันไซ / เกียวโต & โอซาก้า (Kyoto/Osaka)", firstBloom: "24 - 27 มี.ค.", fullBloom: "31 มี.ค. - 8 เม.ย.", status: "ไฮไลต์: สวน Nishinomaru, ปรัชญา Path" },
    { region: "โทโฮคุ / เซนได & อาโอโมริ (Tohoku)", firstBloom: "7 - 14 เม.ย.", fullBloom: "15 - 24 เม.ย.", status: "ไฮไลต์: ปราสาท Hirosaki ดอกซากุระบานสะพรั่ง" },
    { region: "ฮอกไกโด / ซัปโปโร (Hokkaido)", firstBloom: "26 - 30 เม.ย.", fullBloom: "2 - 9 พ.ค.", status: "บานต้อนรับ Golden Week ของญี่ปุ่น" }
  ],
  autumn: [
    { region: "ฮอกไกโด (Daisetsuzan / Sapporo)", peakPeriod: "กลาง ก.ย. - กลาง ต.ค.", highlight: "อุทยานไดเซ็ตสึซัง ใบไม้แดงเร็วที่สุดในญี่ปุ่น" },
    { region: "โทโฮคุ (Tohoku / Aomori Oirase)", peakPeriod: "กลาง ต.ค. - ต้น พ.ย.", highlight: "ลำธารโออิราเสะ & ทะเลสาบโทวาดะ" },
    { region: "ภูมิภาคฟูจิ & นิกโก้ (Nikko / Fuji)", peakPeriod: "ปลาย ต.ค. - กลาง พ.ย.", highlight: "อุโมงค์ใบเมเปิ้ลริมทะเลสาบคาวากุจิโกะ" },
    { region: "โตเกียว (Tokyo)", peakPeriod: "กลาง พ.ย. - ต้น ธ.ค.", highlight: "ถนนต้นแปะก๊วยสีทอง Icho Namiki & สวน Meiji Jingu" },
    { region: "เกียวโต & โอซาก้า (Kyoto & Osaka)", peakPeriod: "กลาง พ.ย. - ต้น ธ.ค.", highlight: "วัดโทฟุคุจิ, วัดน้ำใส คิโยมิซุเดระ และสวนคันไซ" }
  ]
};

// ================= 11. EMERGENCY SOS & SHOW-TO-LOCAL CARDS =================
const EMERGENCY_CARDS_DATA = [
  {
    id: "sos-allergy-seafood",
    category: "food_allergy",
    title: "ฉันแพ้อาหารทะเล / กุ้ง / ปู",
    japanese: "私は甲殻類・魚介類のアレルギーがあります。これらを料理に入れないでください。",
    romaji: "Watashi wa kōkakurui / gyokairui no arerugī ga arimasu. Korera o ryōri ni irenaide kudasai.",
    speakText: "私は甲殻類と魚介類のアレルギーがあります。料理に入れないでください。",
    icon: "🦐",
    tag: "แพ้อาหาร"
  },
  {
    id: "sos-allergy-peanut",
    category: "food_allergy",
    title: "ฉันแพ้ถั่วลิสง / ถั่วทุกชนิด",
    japanese: "私はナッツ類（ピーナッツ）のアレルギーがあります。使用しないでください。",
    romaji: "Watashi wa nattsurui (pīnattsu) no arerugī ga arimasu. Shiyō shinaide kudasai.",
    speakText: "私はナッツ類のアレルギーがあります。使用しないでください。",
    icon: "🥜",
    tag: "แพ้อาหาร"
  },
  {
    id: "sos-medical-help",
    category: "medical",
    title: "รู้สึกไม่สบายมาก ต้องการพบแพทย์ / ไปโรงพยาบาล",
    japanese: "体調が非常に悪いです。近くの病院か救急車をお願いします。",
    romaji: "Taichō ga hijō ni warui desu. Chikaku no byōin ka kyūkyūsha o onegaishimasu.",
    speakText: "体調が非常に悪いです。病院か救急車をお願いします。",
    icon: "🏥",
    tag: "การแพทย์"
  },
  {
    id: "sos-lost-passport",
    category: "police",
    title: "ทำพาสปอร์ต / กระเป๋าสตางค์หาย ช่วยพาไปป้อมตำรวจ (Koban) ทีครับ",
    japanese: "パスポートと財布を紛失しました。最寄りの交番（警察）はどこですか？",
    romaji: "Pasupōto to saifu o funshitsu shimashita. Moyori no kōban wa doko desu ka?",
    speakText: "パスポートと財布を無くしました。最寄りの交番はどこですか？",
    icon: "🛂",
    tag: "ของหาย"
  },
  {
    id: "sos-lost-baggage",
    category: "transit",
    title: "ลืมกระเป๋า / สัมภาระไว้บนรถไฟ ขบวนที่เพิ่งลง",
    japanese: "電車の中に荷物を忘れました。忘れ物取扱所を教えてください。",
    romaji: "Densha no naka ni nimotsu o wasuremashita. Wasuremono toriatsukaisho o oshiete kudasai.",
    speakText: "電車の中に荷物を忘れました。忘れ物取扱所を教えてください。",
    icon: "🧳",
    tag: "รถไฟ"
  },
  {
    id: "sos-call-hotline",
    category: "hotline",
    title: "เบอร์โทรฉุกเฉินสำคัญในญี่ปุ่น",
    japanese: "警察: 110 | 救急・消防: 119 | Japan Visitor Hotline: 050-3816-2720",
    romaji: "Police: 110 | Ambulance: 119 | Visitor Hotline: 050-3816-2720 (24h ภาษาไทย/อังกฤษ)",
    speakText: "警察は110番、救急は119番です。",
    icon: "🚨",
    tag: "เบอร์ฉุกเฉิน"
  }
];

// ================= 12. THEME PARK & ATTRACTION TICKETS PRICING DATA =================
const THEME_PARK_TICKETS_DATA = [
  {
    id: "park-usj",
    name: "Universal Studios Japan (USJ) — โอซาก้า",
    japanese: "ユニバーサル・スタジオ・ジャパン",
    icon: "🎢",
    tag: "ยอดนิยมอันดับ 1",
    pricingType: "Dynamic Pricing (ราคาเปลี่ยนตามระดับความหนาแน่น Tier A - E)",
    tiers: [
      { tier: "Tier A (Low / วันธรรมดาโล่ง)", priceAdult: 8600, priceChild: 5600, seasonDesc: "ช่วงกลาง ม.ค. - ก.พ. / กลาง พ.ค. - มิ.ย. (วันอังคาร - พฤหัสฯ ที่ไม่มีวันหยุด)" },
      { tier: "Tier B (Regular / วันธรรมดาทั่วไป)", priceAdult: 9400, priceChild: 6100, seasonDesc: "วันธรรมดาส่วนใหญ่ตลอดทั้งปี / วันจันทร์และวันศุกร์นอกช่วงไฮซีซั่น" },
      { tier: "Tier C (High / วันหยุดสุดสัปดาห์)", priceAdult: 9900, priceChild: 6500, seasonDesc: "วันเสาร์-อาทิตย์ทั่วไป / ช่วงปิดเทอมญี่ปุ่น / ฤดูใบไม้ร่วง" },
      { tier: "Tier D (Peak / ฤดูซากุระ & ฮาโลวีน)", priceAdult: 10400, priceChild: 6800, seasonDesc: "ปลาย มี.ค. - ต้น เม.ย. (ซากุระ) / เดือน ต.ค. (เทศกาล Halloween Horror Nights)" },
      { tier: "Tier E (Super Peak / วันหยุดยาวระดับชาติ)", priceAdult: 10900, priceChild: 7100, seasonDesc: "สัปดาห์ Golden Week (ต้น พ.ค.) / Obon (ส.ค.) / เทศกาลปีใหม่ (ปลาย ธ.ค. - ต้น ม.ค.)" }
    ],
    expressPass: [
      { name: "Universal Express Pass 4 (แนะนำ)", priceRangeJPY: "¥7,800 - ¥16,800", highlight: "การันตีเข้าโซน Super Nintendo World & Mario Kart + เครื่องเล่นฮิตอีก 3 ชนิด ไม่ต้องต่อคิว" },
      { name: "Universal Express Pass 7 (ฟูลออปชัน)", priceRangeJPY: "¥10,800 - ¥23,800", highlight: "การันตีเข้า Nintendo + Harry Potter + เครื่องเล่นแถวหน้าครบ 7 อย่าง" },
      { name: "Early Entry Pass (สิทธิ์เข้าก่อน 15 นาที)", priceRangeJPY: "ตั๋วพ่วงโรงแรมหรือ Klook", highlight: "เข้าสวนสนุกก่อนเวลาเปิด 15 นาที วิ่งไปเล่น Mario Kart หรือ Donkey Kong ได้ทันทีแบบไม่ต้องกดคิว" }
    ],
    proTips: [
      "💡 **วิธีเข้า Super Nintendo World ฟรี**: ไปถึงหน้าสวนสนุกก่อนเวลาเปิดจริง 45-60 นาที เมื่อประตูเปิดให้เดินตรงเข้าโซน Nintendo ได้ทันทีโดยยังไม่ต้องใช้บัตรคิว (Free Entry ช่วงเปิด)",
      "📱 **กดบัตรคิวในแอป USJ**: เมื่อสแกนตั๋วผ่านประตูแล้ว ให้เปิดแอป Universal Studios Japan แล้วกดรับ **Area Timed Entry eTicket** ฟรีเพื่อเลือกเวลารอบเข้าโซน Nintendo ในช่วงบ่าย/ค่ำ",
      "🎟️ **ระยะเวลาเปิดจองตั๋ว**: ตั๋วและ Express Pass จะเปิดขายล่วงหน้าประมาณ **2 เดือน** บนเว็บไซต์ทางการและตัวแทนจำหน่าย (Klook/KKday) ควรรีบจองตั้งแต่ 00:00 น. ของวันเปิดขาย"
    ]
  },
  {
    id: "park-disney",
    name: "Tokyo Disney Resort (Disneyland & DisneySea)",
    japanese: "東京ディズニーリゾート (ランド・シー)",
    icon: "🏰",
    tag: "ดิสนีย์แลนด์ & โซนใหม่ Fantasy Springs",
    pricingType: "Dynamic Pricing (ราคาตั๋ว 1-Day Passport ผันแปร 4 ระดับ)",
    tiers: [
      { tier: "ระดับ 1 (วันธรรมดา Low Season)", priceAdult: 7900, priceChild: 4700, seasonDesc: "วันอังคาร - พฤหัสฯ ช่วง ม.ค. - ก.พ. / พ.ค. - มิ.ย." },
      { tier: "ระดับ 2 (วันธรรมดาทั่วไป)", priceAdult: 8400, priceChild: 5000, seasonDesc: "วันธรรมดาในเดือนปกติ" },
      { tier: "ระดับ 3 (วันหยุดสุดสัปดาห์)", priceAdult: 9400, priceChild: 5600, seasonDesc: "วันเสาร์-อาทิตย์ และช่วงเทศกาลฮาโลวีน" },
      { tier: "ระดับ 4 (Peak / วันหยุดเทศกาล)", priceAdult: 10900, priceChild: 6500, seasonDesc: "เทศกาลปีใหม่, Golden Week, คริสต์มาส, และวันหยุดนักขัตฤกษ์" }
    ],
    expressPass: [
      { name: "Disney Premier Access (DPA ซื้อแยกรายเครื่องเล่น)", priceRangeJPY: "¥1,500 - ¥2,000 ต่อเครื่องเล่น", highlight: "กดซื้อผ่านแอป Tokyo Disney Resort สำหรับ Beauty and the Beast, Soaring, หรือเครื่องเล่นใน Fantasy Springs" },
      { name: "Tokyo Disney Resort 40th Anniversary Priority Pass", priceRangeJPY: "ฟรี (กดในแอป)", highlight: "บัตรคิวด่วนฟาสต์พาสฟรีสำหรับเครื่องเล่นคลาสสิกอย่าง Space Mountain, Big Thunder Mountain" }
    ],
    proTips: [
      "🌊 **วิธีเข้าโซนใหม่ Fantasy Springs (DisneySea)**: ต้องมีตั๋วเข้า DisneySea + กดรับ **Standby Pass (ฟรี)** ในแอปทันทีที่เข้าสวนสนุก หรือซื้อ **Disney Premier Access (DPA)**",
      "⏰ **เปิดจองตั๋วล่วงหน้า**: เปิดจองล่วงหน้า 2 เดือนทุกวันเวลา 14:00 น. (เวลาญี่ปุ่น)"
    ]
  },
  {
    id: "park-harry-potter",
    name: "Warner Bros. Studio Tour Tokyo — The Making of Harry Potter",
    japanese: "ワーナー ブラザース スタジオツアー東京",
    icon: "🧙‍♂️",
    tag: "สตูแฮร์รี่ พอตเตอร์ ที่ใหญ่ที่สุดในเอเชีย",
    pricingType: "Fixed Pricing (ราคาคงที่ทุกวัน แต่ต้องจองระบุวันและรอบเวลาล่วงหน้า 100%)",
    tiers: [
      { tier: "ตั๋วผู้ใหญ่ (Adult อายุ 18 ปีขึ้นไป)", priceAdult: 6500, priceChild: 0, seasonDesc: "ราคาเท่ากันทุกวันตลอดทั้งปี (ไม่จำกัดเวลาเดินชมด้านใน)" },
      { tier: "ตั๋วเด็กโต (Junior อายุ 12 - 17 ปี)", priceAdult: 5400, priceChild: 0, seasonDesc: "นักเรียนมัธยม" },
      { tier: "ตั๋วเด็กเล็ก (Child อายุ 4 - 11 ปี)", priceAdult: 3900, priceChild: 0, seasonDesc: "เด็กเล็กต่ำกว่า 4 ปีเข้าชมฟรี" }
    ],
    expressPass: [
      { name: "Audio Guide & Digital Souvenir Guidebook", priceRangeJPY: "¥1,300 - ¥2,500", highlight: "หูฟังบรรยายภาษาไทย/อังกฤษ และหนังสือคู่มือของที่ระลึกภาพยนตร์" }
    ],
    proTips: [
      "⚡ **ต้องจองล่วงหน้าเท่านั้น (ไม่มีขายหน้างาน)**: ตั๋วรอบเช้า 09:00 - 11:00 น. มักจะเต็มล่วงหน้า 1-2 เดือน แนะนำจองรอบเช้าเพื่อมีเวลาเดินเต็มที่ 4-5 ชั่วโมง",
      "🍺 **ชิม Butterbeer**: โซนคาเฟ่กลางทางมี Butterbeer แก้วของที่ระลึกที่สามารถล้างแล้วเอากลับบ้านได้ฟรี"
    ]
  },
  {
    id: "park-shibuya-sky",
    name: "จุดชมวิว Shibuya Sky (ดาดฟ้า 360 องศา โตเกียว)",
    japanese: "SHIBUYA SKY (渋谷スカイ)",
    icon: "🗼",
    tag: "จุดชมวิวเมืองยอดฮิตอันดับ 1",
    pricingType: "จองออนไลน์ถูกกว่าหน้างาน (มีจำกัดจำนวนคนต่อรอบ)",
    tiers: [
      { tier: "จองออนไลน์ล่วงหน้า (Web Ticket)", priceAdult: 2200, priceChild: 1000, seasonDesc: "ผู้ใหญ่ ¥2,200 | มัธยม ¥1,700 | ประถม ¥1,000 | เด็กเล็ก ¥600" },
      { tier: "ซื้อหน้าเคาน์เตอร์วันจริง (Same-day Ticket)", priceAdult: 2500, priceChild: 1200, seasonDesc: "ผู้ใหญ่ ¥2,500 (มักจะเต็มหมด โดยเฉพาะช่วงเย็น)" }
    ],
    expressPass: [
      { name: "The Roof Shibuya Sky (บาร์เครื่องดื่มบนดาดฟ้า)", priceRangeJPY: "¥4,000 - ¥5,500 (รวมตั๋วเข้า + 2 Drinks + ที่นั่งโซฟา)", highlight: "นั่งจิบค็อกเทลชมวิวแสงสีโตเกียวทาวเวอร์และชิบูย่ายามค่ำคืน (เปิดเฉพาะฤดูใบไม้ผลิ-ใบไม้ร่วง)" }
    ],
    proTips: [
      "🌅 **ช่วงเวลาที่ดีที่สุด**: จองรอบเวลา **16:20 - 17:00 น.** (ก่อนพระอาทิตย์ตก 30 นาที) เพื่อชมแสงทไวไลต์ ภูเขาไฟฟูจิยามเย็น และแสงไฟโตเกียวทาวเวอร์ในตั๋วใบเดียว",
      "🗓️ **เปิดจองตั๋ว**: เปิดขายล่วงหน้า **4 สัปดาห์ (28 วัน)** เวลา 00:00 น. (เวลาญี่ปุ่น) รอบพระอาทิตย์ตกจะเต็มภายในไม่กี่นาที!"
    ]
  },
  {
    id: "park-teamlab",
    name: "teamLab Planets & Borderless (โตเกียว)",
    japanese: "チームラボプラネッツ / ボーダレス",
    icon: "✨",
    tag: "พิพิธภัณฑ์ศิลปะดิจิทัลระดับโลก",
    pricingType: "Dynamic Pricing (ราคาผันแปรตามวันธรรมดาและวันหยุด)",
    tiers: [
      { tier: "วันธรรมดาทั่วไป (Weekday)", priceAdult: 3800, priceChild: 1300, seasonDesc: "ผู้ใหญ่ ¥3,800 | มัธยม ¥2,800 | เด็ก 4-12 ปี ¥1,300" },
      { tier: "วันเสาร์-อาทิตย์ & วันหยุดพีค (Weekend/Holiday)", priceAdult: 4200, priceChild: 1500, seasonDesc: "ผู้ใหญ่ ¥4,200 | มัธยม ¥3,000 | เด็ก 4-12 ปี ¥1,500" }
    ],
    expressPass: [
      { name: "Priority Pass / VIP Ticket", priceRangeJPY: "¥8,500 - ¥10,000", highlight: "เข้าชมได้ทันทีไม่ต้องรอรอบคิว และเข้าชมนิทรรศการพิเศษ" }
    ],
    proTips: [
      "👟 **การแต่งกาย (teamLab Planets Toyosu)**: ด้านในมีโซนลุยน้ำระดับเข่า แนะนำใส่กางเกงที่พับขาได้ง่าย และมีพื้นกระจกเงาสะท้อน (ผู้หญิงควรหลีกเลี่ยงกระโปรง หรือยืมกางเกงฟรีด้านใน)",
      "🏛️ **ความต่าง**: Planets (เน้นสัมผัสและลุยน้ำที่ Toyosu) vs Borderless (เน้นเดินหลงทางในโลกเวทมนตร์แสงสีที่ Azabudai Hills)"
    ]
  },
  {
    id: "park-ghibli",
    name: "Ghibli Park (สตูดิโอจิบลิ — นาโกย่า)",
    japanese: "ジブリパーク (愛知県長久手市)",
    icon: "🌱",
    tag: "โลกของโตโตโร่ & ปราสาทฮาวล์",
    pricingType: "ระบบลอตเตอรี่และจองล่วงหน้า 100% (แบ่งตามโซนบัตรผ่าน)",
    tiers: [
      { tier: "Ghibli Park O-Sanpo Pass (ตั๋วเดินชม 5 โซน)", priceAdult: 3500, priceChild: 1750, seasonDesc: "เข้าชมพื้นที่ภายนอกของทั้ง 5 โซน + นิทรรศการใหญ่ Ghibli's Grand Warehouse (วันหยุด ผู้ใหญ่ ¥4,000)" },
      { tier: "Ghibli Park O-Sanpo Pass Premium (ตั๋วฟูลออปชัน)", priceAdult: 7300, priceChild: 3650, seasonDesc: "เข้าชมได้ครบทุกโซน รวมถึงภายในบ้านของซัทสึกิและเมอิ และภายในปราสาทฮาวล์ (วันหยุด ผู้ใหญ่ ¥7,800)" }
    ],
    expressPass: [],
    proTips: [
      "📅 **วันเปิดจอง**: ตั๋วสำหรับเดือนถัดไปจะเปิดจองล่วงหน้า **2 เดือน ทุกวันที่ 10 เวลา 14:00 น. (เวลาญี่ปุ่น)** ทางเว็บไซต์ Lawson Ticket International",
      "🚆 **การเดินทาง**: นั่ง Shinkansen ไปลงสถานี Nagoya ต่อรถไฟสาย Higashiyama ไปลง Fujigaoka แล้วต่อรถไฟลอยฟ้า Linimo ลงสถานี Ai-Chikyuhaku-Kinen-Koen"
    ]
  }
];

// ================= 10. ROUTE SIMULATOR, REGIONS & PASS OPTIMIZER DATA =================
const REGION_THEMES = {
  tokyo: {
    name: "โตเกียว & คันโต",
    code: "tokyo",
    color: "#0284c7",       // Vibrant sky blue
    accent: "#38bdf8",
    bg: "#f0f9ff",
    border: "#bae6fd",
    icon: "🗼",
    dayLabel: "โซนโตเกียว / คันโต"
  },
  kyoto: {
    name: "เกียวโต",
    code: "kyoto",
    color: "#059669",       // Emerald green
    accent: "#34d399",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: "⛩️",
    dayLabel: "โซนเกียวโตโบราณ"
  },
  osaka: {
    name: "โอซาก้า & นารา",
    code: "osaka",
    color: "#ea580c",       // Vibrant orange
    accent: "#fb923c",
    bg: "#fff7ed",
    border: "#fed7aa",
    icon: "🏯",
    dayLabel: "โซนโอซาก้า & นารา"
  },
  chubu: {
    name: "ชูบุ / ฟูจิ / ทาคายามะ",
    code: "chubu",
    color: "#d97706",       // Amber gold
    accent: "#fbbf24",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: "🗻",
    dayLabel: "โซนฟูจิ & ชูบุ มรดกโลก"
  },
  hokkaido: {
    name: "ฮอกไกโด",
    code: "hokkaido",
    color: "#7c3aed",       // Lavender purple
    accent: "#a78bfa",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: "❄️",
    dayLabel: "โซนฮอกไกโด"
  },
  fukuoka: {
    name: "ฟุกุโอกะ & คิวชู",
    code: "fukuoka",
    color: "#0d9488",       // Teal
    accent: "#2dd4bf",
    bg: "#f0fdfa",
    border: "#99f6e4",
    icon: "🏮",
    dayLabel: "โซนฟุกุโอกะ & คิวชู"
  },
  hiroshima: {
    name: "ฮิโรชิม่า & ชูโกคุ",
    code: "hiroshima",
    color: "#dc2626",       // Ruby red
    accent: "#f87171",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: "🌊",
    dayLabel: "โซนฮิโรชิม่า & มิยาจิมะ"
  },
  shinkansen: {
    name: "รถไฟความเร็วสูง Shinkansen ข้ามภูมิภาค",
    code: "shinkansen",
    color: "#e11d48",       // Shinkansen Crimson
    accent: "#fb7185",
    bg: "#fff1f2",
    border: "#fecdd3",
    icon: "🚅",
    dayLabel: "เดินทางข้ามภูมิภาคด้วย Shinkansen"
  }
};

const ROUTE_SIMULATION_META = {
  "tokyo-sensoji": {
    station: "สถานี Asakusa (G19/A18)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.7147,
    lng: 139.7966,
    svgPos: { x: 74, y: 55 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "08:30 - 10:30 น.",
    icon: "⛩️",
    mapsName: "Senso-ji, Asakusa, Tokyo"
  },
  "tokyo-shibuya-sky": {
    station: "สถานี Shibuya (JY20/G01/Z01)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6585,
    lng: 139.7013,
    svgPos: { x: 68, y: 62 },
    stayHours: "2 - 2.5 ชม.",
    bestTimeOfDay: "16:00 - 18:30 น.",
    icon: "🗼",
    mapsName: "SHIBUYA SKY, Shibuya, Tokyo"
  },
  "tokyo-tsukiji-food": {
    station: "สถานี Tsukiji (H10) / Tsukijishijo (E18)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6655,
    lng: 139.7708,
    svgPos: { x: 72, y: 59 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "10:30 - 12:30 น.",
    icon: "🍣",
    mapsName: "Tsukiji Outer Market, Tokyo"
  },
  "tokyo-tsukiji-outer": {
    station: "สถานี Tsukiji (H10) / Tsukijishijo (E18)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6655,
    lng: 139.7708,
    svgPos: { x: 72, y: 59 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "10:30 - 12:30 น.",
    icon: "🍣",
    mapsName: "Tsukiji Outer Market, Tokyo"
  },
  "tokyo-shinjuku-gyoen": {
    station: "สถานี Shinjuku-gyoemmae (M09) / Shinjuku (JY17)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6852,
    lng: 139.7100,
    svgPos: { x: 68, y: 58 },
    stayHours: "2 - 2.5 ชม.",
    bestTimeOfDay: "09:30 - 12:00 น.",
    icon: "🌸",
    mapsName: "Shinjuku Gyoen National Garden, Tokyo"
  },
  "tokyo-shinjuku-omoide": {
    station: "สถานี Shinjuku (JY17/M08/S01)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6938,
    lng: 139.7003,
    svgPos: { x: 67, y: 57 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "18:30 - 21:00 น.",
    icon: "🏮",
    mapsName: "Omoide Yokocho, Shinjuku, Tokyo"
  },
  "tokyo-metro-guide": {
    station: "สถานี Tokyo Station (Marunouchi / JR Yamanote)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6812,
    lng: 139.7671,
    svgPos: { x: 71, y: 58 },
    stayHours: "1 - 1.5 ชม.",
    bestTimeOfDay: "10:00 - 16:00 น.",
    icon: "🚆",
    mapsName: "Tokyo Station, Tokyo"
  },
  "tokyo-teamlab-planets": {
    station: "สถานี Shin-Toyosu (Yurikamome)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6493,
    lng: 139.7903,
    svgPos: { x: 73, y: 61 },
    stayHours: "2 - 2.5 ชม.",
    bestTimeOfDay: "09:00 - 11:30 น.",
    icon: "✨",
    mapsName: "teamLab Planets TOKYO, Toyosu"
  },
  "tokyo-harajuku-meiji": {
    station: "สถานี Harajuku (JY19) / Meiji-jingumae (C03)",
    city: "โตเกียว",
    region: "tokyo",
    lat: 35.6702,
    lng: 139.7027,
    svgPos: { x: 68, y: 60 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "08:30 - 11:30 น.",
    icon: "🌲",
    mapsName: "Meiji Jingu & Takeshita Street, Tokyo"
  },
  "kanto-kamakura-daibutsu": {
    station: "สถานี Hase (Enoden Line)",
    city: "คามาคุระ",
    region: "tokyo",
    lat: 35.3168,
    lng: 139.5357,
    svgPos: { x: 67, y: 67 },
    stayHours: "3 - 4 ชม.",
    bestTimeOfDay: "09:30 - 14:30 น.",
    icon: "🧘‍♂️",
    mapsName: "Kotoku-in Great Buddha, Kamakura"
  },
  "kanto-hakone-lake-ashi": {
    station: "สถานี Togendai / Moto-Hakone (Hakone Sightseeing Cruise)",
    city: "ฮาโกเนะ",
    region: "tokyo",
    lat: 35.2045,
    lng: 139.0232,
    svgPos: { x: 63, y: 66 },
    stayHours: "4 - 6 ชม.",
    bestTimeOfDay: "09:00 - 15:30 น.",
    icon: "🚢",
    mapsName: "Lake Ashi, Hakone"
  },
  "kyoto-fushimi-inari": {
    station: "สถานี Fushimi-Inari (Keihan) / Inari (JR Nara Line)",
    city: "เกียวโต",
    region: "kyoto",
    lat: 34.9671,
    lng: 135.7727,
    svgPos: { x: 46, y: 68 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "07:30 - 10:00 น.",
    icon: "⛩️",
    mapsName: "Fushimi Inari Taisha, Kyoto"
  },
  "kyoto-arashiyama": {
    station: "สถานี Saga-Arashiyama (JR) / Arashiyama (Hankyu)",
    city: "เกียวโต",
    region: "kyoto",
    lat: 35.0166,
    lng: 135.6713,
    svgPos: { x: 43, y: 66 },
    stayHours: "2.5 - 3.5 ชม.",
    bestTimeOfDay: "08:00 - 11:30 น.",
    icon: "🎋",
    mapsName: "Arashiyama Bamboo Grove, Kyoto"
  },
  "kyoto-kinkakuji": {
    station: "ป้าย Kinkakuji-michi (Kyoto City Bus สาย 205/12)",
    city: "เกียวโต",
    region: "kyoto",
    lat: 35.0394,
    lng: 135.7292,
    svgPos: { x: 44, y: 64 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "09:00 - 11:00 น.",
    icon: "✨",
    mapsName: "Kinkaku-ji, Kyoto"
  },
  "kyoto-kiyomizudera": {
    station: "สถานี Kiyomizu-Gojo (Keihan) / ป้าย Gojo-zaka",
    city: "เกียวโต",
    region: "kyoto",
    lat: 34.9949,
    lng: 135.7850,
    svgPos: { x: 47, y: 67 },
    stayHours: "2.5 - 3 ชม.",
    bestTimeOfDay: "06:30 - 09:00 หรือ 15:30 - 17:30 น.",
    icon: "🏯",
    mapsName: "Kiyomizu-dera, Kyoto"
  },
  "kyoto-gion-kiyomizu": {
    station: "สถานี Gion-Shijo (Keihan) / Kiyomizu-Gojo",
    city: "เกียวโต",
    region: "kyoto",
    lat: 34.9949,
    lng: 135.7850,
    svgPos: { x: 47, y: 67 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "13:30 - 16:30 น.",
    icon: "👘",
    mapsName: "Kiyomizu-dera, Kyoto"
  },
  "kyoto-nishiki-market": {
    station: "สถานี Shijo (Subway) / Karasuma (Hankyu)",
    city: "เกียวโต",
    region: "kyoto",
    lat: 35.0050,
    lng: 135.7649,
    svgPos: { x: 46, y: 67 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "11:00 - 14:00 น.",
    icon: "🍢",
    mapsName: "Nishiki Market, Kyoto"
  },
  "osaka-dotonbori": {
    station: "สถานี Namba (M20) / Shinsaibashi (M19)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6687,
    lng: 135.5013,
    svgPos: { x: 42, y: 73 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "17:30 - 21:30 น.",
    icon: "🏃",
    mapsName: "Dotonbori Glico Sign, Osaka"
  },
  "osaka-castle": {
    station: "สถานี Osakajokoen (JR Loop Line) / Tanimachi 4-chome",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6873,
    lng: 135.5262,
    svgPos: { x: 43, y: 71 },
    stayHours: "2 - 2.5 ชม.",
    bestTimeOfDay: "09:30 - 12:00 น.",
    icon: "🏯",
    mapsName: "Osaka Castle, Osaka"
  },
  "osaka-usj": {
    station: "สถานี Universal City (JR Yumesaki Line)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6654,
    lng: 135.4323,
    svgPos: { x: 39, y: 73 },
    stayHours: "6 - 8 ชม.",
    bestTimeOfDay: "08:00 - 18:00 น.",
    icon: "🍄",
    mapsName: "Universal Studios Japan, Osaka"
  },
  "osaka-kuromon-market": {
    station: "สถานี Nippombashi (K17/S17 Exit 10)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6659,
    lng: 135.5070,
    svgPos: { x: 42, y: 74 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "10:00 - 13:30 น.",
    icon: "🦀",
    mapsName: "Kuromon Ichiba Market, Osaka"
  },
  "osaka-umeda-sky": {
    station: "สถานี Osaka / Umeda (JR & Metro)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.7053,
    lng: 135.4897,
    svgPos: { x: 41, y: 70 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "17:00 - 19:30 น.",
    icon: "🌉",
    mapsName: "Umeda Sky Building, Osaka"
  },
  "osaka-shinsekai": {
    station: "สถานี Shin-Imamiya (JR) / Dobutsuen-mae (M22) / Ebisucho (K18)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6525,
    lng: 135.5063,
    svgPos: { x: 42, y: 75 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "12:00 - 14:00 น.",
    icon: "🗼",
    mapsName: "Shinsekai Tsutenkaku, Osaka"
  },
  "osaka-denden-town": {
    station: "สถานี Nipponbashi (K17/S17) / Ebisucho (K18)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6605,
    lng: 135.5060,
    svgPos: { x: 42, y: 74 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "12:00 - 18:00 น.",
    icon: "🎮",
    mapsName: "Nipponbashi Denden Town, Osaka"
  },
  "osaka-kaiyukan": {
    station: "สถานี Osakako (C11 ทางออก 1)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6545,
    lng: 135.4289,
    svgPos: { x: 38, y: 74 },
    stayHours: "2.5 - 3.5 ชม.",
    bestTimeOfDay: "10:00 - 14:00 น.",
    icon: "🦈",
    mapsName: "Osaka Aquarium Kaiyukan, Osaka"
  },
  "osaka-namba-yasaka": {
    station: "สถานี Namba (M20/Y15 เดิน 6 นาที)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6629,
    lng: 135.4965,
    svgPos: { x: 41, y: 74 },
    stayHours: "45 นาที - 1 ชม.",
    bestTimeOfDay: "09:00 - 11:30 น.",
    icon: "🦁",
    mapsName: "Namba Yasaka Shrine, Osaka"
  },
  "osaka-shinsaibashi": {
    station: "สถานี Shinsaibashi (M19 ทางออก 5/6)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6710,
    lng: 135.5010,
    svgPos: { x: 42, y: 72 },
    stayHours: "2.5 - 4 ชม.",
    bestTimeOfDay: "14:00 - 20:00 น.",
    icon: "🛍️",
    mapsName: "Shinsaibashi-suji, Osaka"
  },
  "osaka-abeno-harukas": {
    station: "สถานี Tennoji (JR/M23) / Osaka-Abenobashi",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.6458,
    lng: 135.5138,
    svgPos: { x: 43, y: 76 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "16:30 - 19:30 น.",
    icon: "✨",
    mapsName: "Abeno Harukas 300, Osaka"
  },
  "osaka-minoh-falls": {
    station: "สถานี Minoh Station (Hankyu Minoh Line)",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.8488,
    lng: 135.4744,
    svgPos: { x: 41, y: 64 },
    stayHours: "3 - 4 ชม.",
    bestTimeOfDay: "09:00 - 13:00 น.",
    icon: "🍁",
    mapsName: "Minoh Falls, Osaka"
  },
  "osaka-katsuoji": {
    station: "สถานี Minoh-kayano (M06) ต่อรถบัส 15 นาที",
    city: "โอซาก้า",
    region: "osaka",
    lat: 34.8658,
    lng: 135.4912,
    svgPos: { x: 42, y: 63 },
    stayHours: "1.5 - 2.5 ชม.",
    bestTimeOfDay: "09:00 - 12:00 น.",
    icon: "🏮",
    mapsName: "Katsuo-ji, Minoh, Osaka"
  },
  "kansai-nara-park": {
    station: "สถานี Kintetsu-Nara (เดิน 5 นาที)",
    city: "นารา",
    region: "osaka",
    lat: 34.6851,
    lng: 135.8430,
    svgPos: { x: 48, y: 72 },
    stayHours: "3 - 4 ชม.",
    bestTimeOfDay: "08:30 - 12:00 น.",
    icon: "🦌",
    mapsName: "Nara Park & Todai-ji, Nara"
  },
  "kansai-shinkansen-guide": {
    station: "สถานี Shin-Osaka / Shinagawa / Tokyo",
    city: "โตเกียว ↔ โอซาก้า",
    region: "shinkansen",
    lat: 34.7335,
    lng: 135.5003,
    svgPos: { x: 50, y: 65 },
    stayHours: "2 ชม. 15 นาที",
    bestTimeOfDay: "08:00 - 20:00 น.",
    icon: "🚅",
    mapsName: "Tokaido Shinkansen, Japan"
  },
  "fuji-kawaguchiko": {
    station: "สถานี Kawaguchiko (Fujikyu Railway)",
    city: "ฟูจิ / ยามานาชิ",
    region: "chubu",
    lat: 35.4983,
    lng: 138.7686,
    svgPos: { x: 62, y: 64 },
    stayHours: "4 - 6 ชม.",
    bestTimeOfDay: "09:00 - 15:00 น.",
    icon: "🗻",
    mapsName: "Lake Kawaguchiko, Yamanashi"
  },
  "chubu-fuji-kawaguchiko": {
    station: "สถานี Kawaguchiko (Fujikyu Railway)",
    city: "ฟูจิ / ยามานาชิ",
    region: "chubu",
    lat: 35.4983,
    lng: 138.7686,
    svgPos: { x: 62, y: 64 },
    stayHours: "4 - 6 ชม.",
    bestTimeOfDay: "09:00 - 15:00 น.",
    icon: "🗻",
    mapsName: "Lake Kawaguchiko, Yamanashi"
  },
  "chubu-shirakawago": {
    station: "Shirakawa-go Bus Terminal (Nohi Bus)",
    city: "ชิราคาวาโกะ / กิฟุ",
    region: "chubu",
    lat: 36.2562,
    lng: 136.9066,
    svgPos: { x: 52, y: 54 },
    stayHours: "3 - 4 ชม.",
    bestTimeOfDay: "10:00 - 14:00 น.",
    icon: "🛖",
    mapsName: "Shirakawa-go, Gifu"
  },
  "chubu-takayama-oldtown": {
    station: "สถานี Takayama (JR Limited Express Hida)",
    city: "ทาคายามะ / กิฟุ",
    region: "chubu",
    lat: 36.1408,
    lng: 137.2588,
    svgPos: { x: 54, y: 56 },
    stayHours: "2.5 - 3.5 ชม.",
    bestTimeOfDay: "09:30 - 14:00 น.",
    icon: "🏮",
    mapsName: "Sanmachi Suji, Takayama"
  },
  "hokkaido-otaru-canal": {
    station: "สถานี Otaru (JR Hakodate Line)",
    city: "โอตารุ / ฮอกไกโด",
    region: "hokkaido",
    lat: 43.1907,
    lng: 140.9947,
    svgPos: { x: 80, y: 22 },
    stayHours: "3 - 4 ชม.",
    bestTimeOfDay: "14:00 - 18:30 น.",
    icon: "🕯️",
    mapsName: "Otaru Canal, Hokkaido"
  },
  "hokkaido-ramen-alley": {
    station: "สถานี Susukino (Sapporo Subway Namboku Line)",
    city: "ซัปโปโร / ฮอกไกโด",
    region: "hokkaido",
    lat: 43.0554,
    lng: 141.3533,
    svgPos: { x: 82, y: 24 },
    stayHours: "1.5 - 2 ชม.",
    bestTimeOfDay: "18:00 - 22:00 น.",
    icon: "🍜",
    mapsName: "Ganso Sapporo Ramen Yokocho, Sapporo"
  },
  "hokkaido-hakodate-night": {
    station: "สถานี Jujigai / Mount Hakodate Ropeway",
    city: "ฮาโกดาเตะ / ฮอกไกโด",
    region: "hokkaido",
    lat: 41.7592,
    lng: 140.7042,
    svgPos: { x: 79, y: 30 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "17:30 - 20:00 น.",
    icon: "🌃",
    mapsName: "Mount Hakodate Observatory, Hokkaido"
  },
  "hokkaido-shikisaino-oka": {
    station: "สถานี Bibaushi / Biei (JR Furano Line)",
    city: "บิเอะ / ฮอกไกโด",
    region: "hokkaido",
    lat: 43.5283,
    lng: 142.4704,
    svgPos: { x: 86, y: 19 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "10:00 - 13:00 น.",
    icon: "🌸",
    mapsName: "Shikisai-no-oka, Biei, Hokkaido"
  },
  "fukuoka-yatai-nakasu": {
    station: "สถานี Nakasu-Kawabata / Tenjin (K09)",
    city: "ฟุกุโอกะ",
    region: "fukuoka",
    lat: 33.5932,
    lng: 130.4072,
    svgPos: { x: 18, y: 84 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "18:30 - 22:30 น.",
    icon: "🏮",
    mapsName: "Nakasu Yatai Stalls, Fukuoka"
  },
  "fukuoka-dazaifu": {
    station: "สถานี Dazaifu (Nishitetsu Dazaifu Line)",
    city: "ฟุกุโอกะ",
    region: "fukuoka",
    lat: 33.5215,
    lng: 130.5349,
    svgPos: { x: 19, y: 86 },
    stayHours: "2 - 3 ชม.",
    bestTimeOfDay: "09:00 - 13:00 น.",
    icon: "⛩️",
    mapsName: "Dazaifu Tenmangu, Fukuoka"
  },
  "hiroshima-miyajima": {
    station: "ท่าเรือ Miyajimaguchi ➔ นั่งเรือเฟอร์รี่ 10 นาที",
    city: "ฮิโรชิม่า / มิยาจิมะ",
    region: "hiroshima",
    lat: 34.2960,
    lng: 132.3196,
    svgPos: { x: 28, y: 78 },
    stayHours: "3 - 5 ชม.",
    bestTimeOfDay: "10:00 - 16:30 น.",
    icon: "🌊",
    mapsName: "Itsukushima Floating Torii, Miyajima"
  }
};

const PASS_OPTIMIZER_DATA = [
  {
    id: "jr-all-japan-7",
    name: "JR All Japan Rail Pass (7 วัน)",
    priceJPY: 50000,
    coverage: "ครอบคลุมรถไฟ JR และ Shinkansen ทั่วประเทศ (Hikari/Kodama/Sakura)",
    bestWhen: (regions, totalCostJPY) => regions.includes("tokyo") && (regions.includes("kyoto") || regions.includes("osaka") || regions.includes("hiroshima")) && totalCostJPY >= 40000,
    tip: "ทริปของคุณมีการเดินทางข้ามภูมิภาคระยะไกล ซื้อ JR All Japan Pass จะประหยัดและคล่องตัวที่สุด"
  },
  {
    id: "tokyo-subway-72",
    name: "Tokyo Subway Ticket (72 ชั่วโมง)",
    priceJPY: 1500,
    coverage: "นั่งรถไฟใต้ดิน Tokyo Metro และ Toei Subway ทุกสาย รวม 13 สาย ไม่อั้น",
    bestWhen: (regions, totalCostJPY) => regions.every(r => r === "tokyo") && totalCostJPY >= 1500,
    tip: "ทริปเที่ยวเฉพาะในโตเกียว แนะนำ Tokyo Subway Ticket 72 ชม. (เพียง ¥1,500) ประหยัดค่าเดินทางในเมืองได้กว่า 40%"
  },
  {
    id: "kansai-thru-pass",
    name: "Kansai Thru Pass / Kansai Railway Pass (3 วัน)",
    priceJPY: 5600,
    coverage: "นั่งรถไฟใต้ดิน รถไฟเอกชน (Hankyu, Hanshin, Keihan, Kintetsu, Nankai) และรถบัสทั่วคันไซ",
    bestWhen: (regions, totalCostJPY) => regions.every(r => r === "kyoto" || r === "osaka") && totalCostJPY >= 4000,
    tip: "ทริปเที่ยวรอบคันไซ (เกียวโต-โอซาก้า-นารา) บัตร Kansai Thru Pass ตอบโจทย์ที่สุด ครอบคลุมรถไฟเอกชนและบัสเกือบทุกสาย"
  },
  {
    id: "osaka-amazing-pass",
    name: "Osaka Amazing Pass (2 วัน)",
    priceJPY: 3600,
    coverage: "ขึ้นรถไฟใต้ดินโอซาก้าฟรีไม่จำกัด + เข้าฟรีสถานที่ท่องเที่ยวกว่า 40 แห่ง (รวมปราสาทโอซาก้า & ตึกอุเมดะ)",
    bestWhen: (regions, totalCostJPY) => regions.every(r => r === "osaka"),
    tip: "หากเน้นเที่ยวสถานที่หลักในตัวเมืองโอซาก้า Osaka Amazing Pass คุ้มค่าที่สุดเพราะรวมค่าเข้าปราสาทและจุดชมวิวฟรี"
  },
  {
    id: "ic-card-payg",
    name: "บัตร IC Card (Welcome Suica / ICOCA / Pasmo)",
    priceJPY: 0,
    coverage: "แตะจ่ายตามระยะทางจริง สะดวก ไม่ต้องคำนวณ",
    bestWhen: () => true,
    tip: "เส้นทางระยะสั้นหรือเดินทางไม่กี่จุด แนะนำใช้บัตรแตะ Suica / ICOCA (ผูก Apple Wallet ได้) สะดวกที่สุด ไม่ต้องซื้อตั๋วทีละเที่ยว"
  }
];

const ROUTE_PRESETS_DATA = [
  {
    id: "preset-tokyo-1day",
    title: "🗼 โตเกียว ไฮไลต์ 1 วัน (Tokyo Iconic Day)",
    tag: "ยอดนิยมอันดับ 1",
    region: "tokyo",
    description: "ไหว้พระวัดเซนโซจิ ทานซูชิสดตลาดปลา ชมวิวห้าแยกชิบูย่า และดื่มด่ำไฟชินจูกุ",
    itemIds: ["tokyo-sensoji", "tokyo-tsukiji-food", "tokyo-shibuya-sky", "tokyo-shinjuku-gyoen"],
    recommendedPass: "Tokyo Subway 24-Hour Ticket (¥800) ประหยัดกว่าแตะบัตรรายเที่ยว",
    totalEstTime: "ประมาณ 9 - 10 ชั่วโมง",
    estTransitCostJPY: 980
  },
  {
    id: "preset-golden-route",
    title: "🚅 Golden Route 3 เมืองในฝัน: โตเกียว ➔ เกียวโต ➔ โอซาก้า",
    tag: "เส้นทางคลาสสิก",
    region: "shinkansen",
    description: "สัมผัสเมืองหลวงโตเกียว นั่งชินคันเซ็นสู่เกียวโตเมืองหลวงเก่า และจบด้วยสตรีทฟู้ดโอซาก้า",
    itemIds: ["tokyo-shibuya-sky", "tokyo-sensoji", "kyoto-fushimi-inari", "kyoto-arashiyama", "osaka-castle", "osaka-dotonbori"],
    recommendedPass: "JR All Japan Pass หรือ ตั๋ว Shinkansen SmartEX จองล่วงหน้า",
    totalEstTime: "ทริป 4 - 5 วัน",
    estTransitCostJPY: 17800
  },
  {
    id: "preset-kansai-2day",
    title: "⛩️ คันไซ เกียวโต โอซาก้า นารา (Kansai Highlights)",
    tag: "คุ้มค่าสุดในคันไซ",
    region: "osaka",
    description: "ชมป่าไผ่และเสาโทริอิพันต้นเกียวโต เลี้ยงกวางป่านารา ตะลุย USJ และถ่ายรูปป้ายกูลิโกะ",
    itemIds: ["kyoto-arashiyama", "kyoto-fushimi-inari", "kansai-nara-park", "osaka-castle", "osaka-usj", "osaka-dotonbori"],
    recommendedPass: "Kansai Thru Pass หรือ JR Kansai Area Pass",
    totalEstTime: "ทริป 2 - 3 วันเต็ม",
    estTransitCostJPY: 3400
  },
  {
    id: "preset-fuji-heritage",
    title: "🗻 ฟูจิคาวากุจิโกะ & หมู่บ้านชิราคาวาโกะ (Nature & Heritage)",
    tag: "สายธรรมชาติ & มรดกโลก",
    region: "chubu",
    description: "ชมฟูจิสะท้อนน้ำคาวากุจิโกะ สู่เมืองเก่าทาคายามะและบ้านโบราณชิราคาวาโกะ",
    itemIds: ["fuji-kawaguchiko", "chubu-takayama-oldtown", "chubu-shirakawago"],
    recommendedPass: "Takayama-Hokuriku Area Tourist Pass + Highway Bus",
    totalEstTime: "ทริป 2 - 3 วัน",
    estTransitCostJPY: 9200
  },
  {
    id: "preset-hokkaido-classic",
    title: "❄️ ฮอกไกโด โรแมนติก: ซัปโปโร ➔ คลองโอตารุ ➔ ฮาโกดาเตะ",
    tag: "โรแมนติก & สายกิน",
    region: "hokkaido",
    description: "เดินเลียบคลองโบราณโอตารุ ทานราเมงซัปโปโร และชมวิวแสงไฟกลางคืนระดับโลกที่ฮาโกดาเตะ",
    itemIds: ["hokkaido-ramen-alley", "hokkaido-otaru-canal", "hokkaido-hakodate-night"],
    recommendedPass: "JR Hokkaido Rail Pass",
    totalEstTime: "ทริป 3 วัน",
    estTransitCostJPY: 9850
  }
];

// ================= 13. POPULAR HOTSPOTS CATALOG (1-CLICK ADD) =================
const POPULAR_HOTSPOTS_DATA = [
  // --- HOTELS ---
  {
    id: "hotspot-hotel-gracery",
    name: "Hotel Gracery Shinjuku (โรงแรมก็อดซิลล่า)",
    japanese: "ホテルグレイスリー新宿",
    category: "hotel",
    icon: "🏨",
    region: "tokyo",
    station: "สถานี JR Shinjuku (East Exit) เดิน 5 นาที",
    stayHours: "พักค้างคืน",
    lat: 35.6953,
    lng: 139.7020,
    tag: "โรงแรมยอดฮิต",
    desc: "แลนด์มาร์กหัวก็อดซิลล่าชินจูกุ ทำเลทองใจกลางคาบุกิโจ เดินทางสะดวก ใกล้แหล่งช้อปปิ้งและร้านอาหาร"
  },
  {
    id: "hotspot-hotel-apa-ryogoku",
    name: "APA Hotel & Resort Ryogoku Eki Tower",
    japanese: "アパホテル＆リゾート 両国駅タワー",
    category: "hotel",
    icon: "🏨",
    region: "tokyo",
    station: "ติดสถานี JR Ryogoku",
    stayHours: "พักค้างคืน",
    lat: 35.6980,
    lng: 139.7940,
    tag: "โรงแรมมีออนเซ็น",
    desc: "ตึกสูงวิวโตเกียวสกายทรี มีสระว่ายน้ำลอยฟ้าและออนเซ็นรวมขนาดใหญ่ให้แช่ฟรี"
  },
  {
    id: "hotspot-hotel-sotetsu-ginza",
    name: "Sotetsu Fresa Inn Ginza-Sanchome",
    japanese: "相鉄フレッサイン 銀座三丁目",
    category: "hotel",
    icon: "🏨",
    region: "tokyo",
    station: "สถานี Ginza / Higashi-Ginza เดิน 3 นาที",
    stayHours: "พักค้างคืน",
    lat: 35.6710,
    lng: 139.7675,
    tag: "โรงแรมย่านหรู",
    desc: "ใจกลางย่านกินซ่า เดินช้อปปิ้งห้างสรรพสินค้าและต่อรถไฟใต้ดินไปทุกที่ในโตเกียวได้ง่ายมาก"
  },
  {
    id: "hotspot-hotel-dormy-namba",
    name: "Dormy Inn Premium Namba (天然温泉)",
    japanese: "ドーミーイン プレミアム なんば",
    category: "hotel",
    icon: "🏨",
    region: "osaka",
    station: "สถานี Nihombashi เดิน 5 นาที / Namba",
    stayHours: "พักค้างคืน",
    lat: 34.6698,
    lng: 135.5085,
    tag: "มีออนเซ็น & ราเมงฟรี",
    desc: "โรงแรมยอดนิยมอันดับ 1 ของคนไทยในโอซาก้า มีบ่อออนเซ็นธรรมชาติ ซาวน่า และเสิร์ฟราเมง Yonaki Soba ฟรีทุกคืน"
  },
  {
    id: "hotspot-hotel-cross-osaka",
    name: "Cross Hotel Osaka (ชินไซบาชิ/โดทงโบริ)",
    japanese: "クロスホテル大阪",
    category: "hotel",
    icon: "🏨",
    region: "osaka",
    station: "สถานี Namba / Shinsaibashi เดิน 3 นาที",
    stayHours: "พักค้างคืน",
    lat: 34.6695,
    lng: 135.5015,
    tag: "ทำเลดีที่สุด",
    desc: "ตั้งอยู่ติดถนนชินไซบาชิและป้ายกูลิโกะโดทงโบริเพียง 1 นาที เดินช้อปปิ้งดึกแค่ไหนก็เดินกลับโรงแรมได้ทันที"
  },
  {
    id: "hotspot-hotel-granvia-kyoto",
    name: "Hotel Granvia Kyoto (ในสถานีรถไฟเกียวโต)",
    japanese: "ホテルグランヴィア京都",
    category: "hotel",
    icon: "🏨",
    region: "kyoto",
    station: "เชื่อมต่อตรงในสถานี JR Kyoto Station",
    stayHours: "พักค้างคืน",
    lat: 34.9855,
    lng: 135.7585,
    tag: "โรงแรมติดสถานี",
    desc: "อยู่บนตึกสถานีรถไฟ JR Kyoto Station โดยตรง ลากกระเป๋าขึ้นห้องได้ทันที สะดวกสุดๆ สำหรับนั่งชินคันเซ็น"
  },

  // --- FOOD & DINING ---
  {
    id: "hotspot-food-ichiran-shibuya",
    name: "Ichiran Ramen Shibuya (ราเมงข้อสอบ ชิบูย่า)",
    japanese: "一蘭 渋谷店 (天然とんこつラーメン)",
    category: "food",
    icon: "🍜",
    region: "tokyo",
    station: "สถานี Shibuya ทางออก Hachiko เดิน 3 นาที",
    stayHours: "45 นาที - 1 ชม.",
    lat: 35.6606,
    lng: 139.7005,
    tag: "ราเมงยอดฮิต",
    desc: "ราเมงซุปทงคตสึสูตรต้นตำรับจากฮากาตะ นั่งในล็อกข้อสอบส่วนตัว เลือกระดับความเผ็ดและความเข้มข้นได้ตามใจ"
  },
  {
    id: "hotspot-food-gyukatsu-motomura",
    name: "Gyukatsu Motomura Shinjuku (เนื้อทอดกิวคัตสึ)",
    japanese: "牛かつ もと村 新宿南口店",
    category: "food",
    icon: "🥩",
    region: "tokyo",
    station: "สถานี JR Shinjuku (South Exit) เดิน 3 นาที",
    stayHours: "1 - 1.5 ชม.",
    lat: 35.6908,
    lng: 139.7025,
    tag: "เนื้อชุบแป้งทอด",
    desc: "เนื้อวัวเกรดพรีเมียมชุบเกล็ดขนมปังทอดกรอบนอกนุ่มใน ย่างต่อบนเตาหินส่วนตัว จิ้มเกลือหิมาลายันและซอสวาซาบิ"
  },
  {
    id: "hotspot-food-harbs-shinjuku",
    name: "HARBS Cake Lumine Est (เค้กผลไม้เครปพันชั้น)",
    japanese: "ハーブス ルミネエスト新宿店",
    category: "food",
    icon: "🍰",
    region: "tokyo",
    station: "ชั้น B1 ห้าง Lumine Est Shinjuku",
    stayHours: "1 ชม.",
    lat: 35.6917,
    lng: 139.7012,
    tag: "คาเฟ่ขนมหวาน",
    desc: "Mille Crepes เค้กเครปผลไม้สด 6 ชั้น ครีมสดนุ่มเบาหวานน้อย เมนูซิกเนเจอร์อันดับ 1 ที่คิวยาวตลอดทั้งวัน"
  },
  {
    id: "hotspot-food-redrock-harajuku",
    name: "Red Rock Harajuku (ข้าวหน้าเนื้อภูเขาไฟ)",
    japanese: "レッドロック 原宿店",
    category: "food",
    icon: "🥩",
    region: "tokyo",
    station: "สถานี Meiji-jingumae เดิน 3 นาที / Harajuku",
    stayHours: "45 นาที - 1 ชม.",
    lat: 35.6702,
    lng: 139.7065,
    tag: "ข้าวหน้าเนื้อ",
    desc: "ข้าวหน้า Roast Beef กองพูนเหมือนภูเขาไฟ ราดซอสโยเกิร์ตกระเทียมและไข่แดงเยิ้มๆ รสชาติเข้มข้นจุใจ"
  },
  {
    id: "hotspot-food-isomaru-dotonbori",
    name: "Isomaru Suisan Dotonbori (อิซากายะซีฟู้ดย่าง 24 ชม.)",
    japanese: "磯丸水産 道頓堀店",
    category: "food",
    icon: "🦀",
    region: "osaka",
    station: "สถานี Namba / Nipponbashi เดิน 3 นาที",
    stayHours: "1.5 - 2 ชม.",
    lat: 34.6687,
    lng: 135.5020,
    tag: "อิซากายะ 24 ชม.",
    desc: "ร้านซีฟู้ดปิ้งย่างบนเตาไฟ ไฮไลต์คือมันปูย่างกระดอง (Kani Miso) หอมมันเข้มข้น เปิดตลอด 24 ชั่วโมง"
  },
  {
    id: "hotspot-food-kushikatsu-daruma",
    name: "Kushikatsu Daruma Shinsekai (ของทอดดารุมะต้นตำรับ)",
    japanese: "元祖串かつ だるま 新世界総本店",
    category: "food",
    icon: "🍢",
    region: "osaka",
    station: "สถานี Ebisucho / Dobutsuen-mae เดิน 4 นาที",
    stayHours: "1 - 1.5 ชม.",
    lat: 34.6521,
    lng: 135.5061,
    tag: "ของทอดเสียบไม้โอซาก้า",
    desc: "ร้านของทอดเสียบไม้ในตำนานตั้งแต่ปี 1929 แป้งบางกรอบไม่อมน้ำมัน จิ้มซอสสูตรเด็ด (ห้ามจุ่มซอสซ้ำสอง)"
  },

  // --- SHOPPING ---
  {
    id: "hotspot-shop-donki-shibuya",
    name: "MEGA Don Quijote Shibuya (ดองกี้ ชิบูย่า 6 ชั้น)",
    japanese: "MEGAドン・キホーテ 渋谷本店",
    category: "shopping",
    icon: "🛍️",
    region: "tokyo",
    station: "สถานี Shibuya เดิน 5 นาที",
    stayHours: "1.5 - 3 ชม.",
    lat: 35.6602,
    lng: 139.6975,
    tag: "ช้อปปิ้ง 24 ชม.",
    desc: "ดองกี้สาขาใหญ่ที่สุดในโตเกียว มี 6 ชั้น รวมขนม เครื่องสำอาง ยา ของเล่น และของฝากญี่ปุ่นครบจบในที่เดียว ทำ Tax-Free ได้สะดวก"
  },
  {
    id: "hotspot-shop-parco-shibuya",
    name: "Shibuya PARCO (Nintendo Tokyo & Pokémon Center)",
    japanese: "渋谷パルコ (Nintendo TOKYO / ポケモンセンター)",
    category: "shopping",
    icon: "🎮",
    region: "tokyo",
    station: "ชั้น 6 ห้าง Shibuya PARCO เดิน 6 นาทีจากสถานี Shibuya",
    stayHours: "1.5 - 2.5 ชม.",
    lat: 35.6622,
    lng: 139.6988,
    tag: "ศูนย์รวมอนิเมะ/เกม",
    desc: "สวรรค์ของแฟนเกม Nintendo, Pokémon Center Shibuya (มีมิวทูขนาดยักษ์), Capcom Store และ Jump Shop รวมอยู่ในชั้นเดียว"
  },
  {
    id: "hotspot-shop-gotemba-outlet",
    name: "Gotemba Premium Outlets (เอาต์เล็ตวิวภูเขาไฟฟูจิ)",
    japanese: "御殿場プレミアム・アウトレット",
    category: "shopping",
    icon: "🛍️",
    region: "chubu",
    station: "นั่งรถบัสตรงจาก Shinjuku / Tokyo Station 1.5 ชม.",
    stayHours: "3 - 5 ชม.",
    lat: 35.3082,
    lng: 138.9660,
    tag: "เอาต์เล็ตแบรนด์เนม",
    desc: "เอาต์เล็ตที่ใหญ่ที่สุดในญี่ปุ่น รวมแบรนด์เนมกว่า 290 ร้าน พร้อมมุมถ่ายรูปวิวภูเขาไฟฟูจิแบบพาโนรามาสุดอลังการ"
  },
  {
    id: "hotspot-shop-denden-town",
    name: "Nipponbashi Denden Town (ย่านเด็นเด็นทาวน์ อนิเมะ/เกม)",
    japanese: "日本橋でんでんタウン",
    category: "shopping",
    icon: "🎮",
    region: "osaka",
    station: "สถานี Nipponbashi / Ebisucho เดิน 3 นาที",
    stayHours: "2 - 3 ชม.",
    lat: 34.6605,
    lng: 135.5060,
    tag: "อนิเมะ/ฟิกเกอร์/เกมส์",
    desc: "อากิฮาบาระแห่งคันไซ ศูนย์รวมฟิกเกอร์ อนิเมะ โมเดลกันพลา การ์ดสะสม และเมดคาเฟ่"
  },
  {
    id: "hotspot-shop-shinsaibashi",
    name: "Shinsaibashi-suji & Amerikamura (ถนนช้อปปิ้งชินไซบาชิ)",
    japanese: "心斎橋筋商店街 / アメリカ村",
    category: "shopping",
    icon: "🛍️",
    region: "osaka",
    station: "สถานี Shinsaibashi ทางออก 5 หรือ 6",
    stayHours: "2.5 - 4 ชม.",
    lat: 34.6710,
    lng: 135.5010,
    tag: "ถนนช้อปปิ้งในร่ม",
    desc: "ถนนช้อปปิ้งในร่มยาว 600 เมตร รวมแบรนด์เนม ดองกี้ เสื้อผ้าแฟชั่น และย่านสตรีท Amerikamura"
  },

  // --- ATTRACTIONS & THEME PARKS ---
  {
    id: "hotspot-attraction-kaiyukan",
    name: "Osaka Aquarium Kaiyukan (พิพิธภัณฑ์สัตว์น้ำไคยูคัง)",
    japanese: "海遊館 (かいゆうかん)",
    category: "attraction",
    icon: "🦈",
    region: "osaka",
    station: "สถานี Osakako (Chuo Line ทางออก 1) เดิน 5 นาที",
    stayHours: "2.5 - 3.5 ชม.",
    lat: 34.6545,
    lng: 135.4289,
    tag: "อควาเรียมระดับโลก",
    desc: "อควาเรียมยักษ์ระดับโลก ชมฉลามวาฬแหวกว่ายในแท็งก์น้ำวน 9 เมตร และชิงช้าสวรรค์เทมโปซาน"
  },
  {
    id: "hotspot-attraction-namba-yasaka",
    name: "Namba Yasaka Shrine (ศาลเจ้านัมบะ ยาซากะ หัวสิงโตยักษ์)",
    japanese: "難波八阪神社",
    category: "attraction",
    icon: "🦁",
    region: "osaka",
    station: "สถานี Namba เดิน 6 นาที",
    stayHours: "45 นาที - 1 ชม.",
    lat: 34.6629,
    lng: 135.4965,
    tag: "ศาลเจ้าหัวสิงโตยักษ์",
    desc: "ศาลเจ้าศักดิ์สิทธิ์ใจกลางเมือง โดดเด่นด้วยหัวสิงโตทองอ้าปากกว้าง 12 เมตร ช่วยกลืนกินเคราะห์และเรียกโชคลาภ"
  },
  {
    id: "hotspot-attraction-abeno-harukas",
    name: "Abeno Harukas 300 (ตึกระฟ้า อาเบโนะ ฮารุกัส 300)",
    japanese: "あべのハルカス300",
    category: "attraction",
    icon: "✨",
    region: "osaka",
    station: "สถานี Tennoji / Osaka-Abenobashi เชื่อมตรงใต้ตึก",
    stayHours: "1.5 - 2 ชม.",
    lat: 34.6458,
    lng: 135.5138,
    tag: "จุดชมวิวตึกระฟ้า 300 ม.",
    desc: "จุดชมวิวพาโนรามา 360 องศาบนตึกที่สูงที่สุดในโอซาก้า ชมพระอาทิตย์ตกและแสงสีค่ำคืนคันไซ"
  },
  {
    id: "hotspot-attraction-disneysea",
    name: "Tokyo DisneySea (โตเกียว ดิสนีย์ซี & โซน Fantasy Springs)",
    japanese: "東京ディズニーシー (ファンタジースプリングス)",
    category: "attraction",
    icon: "🧜‍♀️",
    region: "tokyo",
    station: "สถานี Maihama ➔ ต่อ Disney Resort Line",
    stayHours: "เต็มวัน (8 - 12 ชม.)",
    lat: 35.6267,
    lng: 139.8851,
    tag: "ธีมพาร์คระดับโลก",
    desc: "สวนสนุกดิสนีย์ธีมทะเลแห่งเดียวในโลก พร้อมโซนใหม่ล่าสุด Fantasy Springs (Frozen, Tangled, Peter Pan) สุดตระการตา"
  },
  {
    id: "hotspot-attraction-disneyland",
    name: "Tokyo Disneyland (โตเกียว ดิสนีย์แลนด์ & ปราสาทซินเดอเรลล่า)",
    japanese: "東京ディズニーランド",
    category: "attraction",
    icon: "🏰",
    region: "tokyo",
    station: "สถานี JR Maihama เดิน 5 นาที",
    stayHours: "เต็มวัน (8 - 12 ชม.)",
    lat: 35.6329,
    lng: 139.8804,
    tag: "สวนสนุกคลาสสิก",
    desc: "ดินแดนแห่งเวทมนตร์ ปราสาทซินเดอเรลล่า เครื่องเล่น Beauty and the Beast และขบวนพาเหรดสุดประทับใจ"
  },
  {
    id: "hotspot-attraction-harry-potter",
    name: "Warner Bros. Studio Tour Tokyo (The Making of Harry Potter)",
    japanese: "ワーナー ブラザース スタジオツアー東京 - メイキング・オブ・ハリー・ポッター",
    category: "attraction",
    icon: "🧙‍♂️",
    region: "tokyo",
    station: "สถานี Toshimaen (Seibu Ikebukuro / Toei Oedo Line) เดิน 2 นาที",
    stayHours: "4 - 5 ชม.",
    lat: 35.7445,
    lng: 139.6158,
    tag: "สตูดิโอแฮร์รี่ พอตเตอร์",
    desc: "สตูดิโอทัวร์แฮร์รี่ พอตเตอร์ในร่มที่ใหญ่ที่สุดในโลก เดินชมฉากห้องโถงใหญ่ ชานชาลา 9 ¾ ป่าต้องห้าม และตรอกไดแอกอนของจริง"
  },
  {
    id: "hotspot-attraction-katsuoji",
    name: "Katsuo-ji Temple (วัดคัตสึโอจิ / วัดดารุมะแห่งชัยชนะ)",
    japanese: "勝尾寺 (かつおうじ)",
    category: "attraction",
    icon: "🏮",
    region: "osaka",
    station: "สถานี Minoh-kayano (M06) ต่อรถบัส 15 นาที",
    stayHours: "1.5 - 2.5 ชม.",
    lat: 34.8658,
    lng: 135.4912,
    tag: "วัดดารุมะ / ขอพรชัยชนะ",
    desc: "วัดดารุมะศักดิ์สิทธิ์บนหุบเขาโอซาก้า มีตุ๊กตาดารุมะสีแดงนับหมื่นตัวตั้งเรียงราย ขอพรเรื่องความสำเร็จ ธุรกิจ การงาน และชัยชนะ"
  },
  {
    id: "hotspot-attraction-borderless",
    name: "teamLab Borderless (Azabudai Hills)",
    japanese: "チームラボボーダレス (麻布台ヒルズ)",
    category: "attraction",
    icon: "✨",
    region: "tokyo",
    station: "สถานี Kamiyacho (Hibiya Line) หรือ Roppongi-Itchome เดินตรงเข้าตึก",
    stayHours: "2.5 - 3.5 ชม.",
    lat: 35.6601,
    lng: 139.7428,
    tag: "นิทรรศการแสงสีดิจิทัล",
    desc: "พิพิธภัณฑ์ศิลปะดิจิทัลไร้พรมแดนระดับโลกแห่งใหม่ในตึกสูงที่สุดในญี่ปุ่น Azabudai Hills ผลงานศิลปะเคลื่อนไหวผสมผสานกันอย่างน่าอัศจรรย์"
  }
];





