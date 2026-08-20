document.addEventListener("DOMContentLoaded", () => {
  // Global State
  let currentCategory = "all";
  let currentRegion = "all";
  let currentSeason = "all";
  let currentAnalyticsSeason = "spring";
  let currentCalcDays = 5;
  let currentCalcStyleIndex = 1;
  let searchQuery = "";
  let itineraryList = JSON.parse(localStorage.getItem("nippon_itinerary") || "[]");
  let customPlacesStore = JSON.parse(localStorage.getItem("nippon_custom_places") || "[]");

  // Register saved custom places into ROUTE_SIMULATION_META
  if (typeof ROUTE_SIMULATION_META !== "undefined") {
    customPlacesStore.forEach(cp => {
      ROUTE_SIMULATION_META[cp.id] = {
        lat: parseFloat(cp.lat) || 35.6895,
        lng: parseFloat(cp.lng) || 139.6917,
        icon: cp.icon || "📍",
        region: cp.region || "tokyo",
        station: cp.station || "สถานีใกล้เคียง",
        stayHours: cp.stayHours || "1 - 2 ชม.",
        bestTimeOfDay: "ช่วงเวลาที่สะดวก",
        mapsName: cp.title
      };
    });
  }

  // Pagination State (6 cards per page)
  const CARDS_PER_PAGE = 6;
  let currentCardPage = 1;
  const cardsPaginationEl = document.getElementById("cards-pagination");

  // Fallback image URL in case external image fails
  const FALLBACK_IMG = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80";

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
      const inPlan = itineraryList.some(i => i.id === item.id);
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
              <button class="btn outline toggle-plan-btn" data-id="${item.id}">
                ${inPlan ? "✓ ในแผน" : "+ แผนเที่ยว"}
              </button>
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

    // Also sync with top Hero season pills
    if (typeof seasonPills !== 'undefined' && seasonPills) {
      const heroSeasonKey = (detectedShortcut === "all" ? "all" : detectedShortcut);
      seasonPills.querySelectorAll(".pill").forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-season") === heroSeasonKey);
      });
    }
  }

  function setDateFromShortcut(targetSeason, targetDate) {
    const today = new Date();
    const currentYear = today.getFullYear();

    let resolvedDate = "";
    if (targetDate === "today" || !targetDate) {
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      resolvedDate = `${yyyy}-${mm}-${dd}`;
    } else {
      const parts = targetDate.split('-');
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      
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

  let isMapPinMode = false;
  const mapPinModeBtn = document.getElementById("map-pin-mode-btn");
  const mapPinHintBanner = document.getElementById("map-pin-hint-banner");
  const closePinModeBtn = document.getElementById("close-pin-hint-btn");

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

    // CartoDB Voyager tiles - ultra clean, easy to read English & Japanese labels, roads & landmarks
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      subdomains: "abcd"
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

  function getRouteItems() {
    if (selectedRoutePresetId === "custom") {
      return itineraryList.map(item => {
        const builtin = JAPAN_DATA.find(i => i.id === item.id);
        if (builtin) return builtin;
        const custom = customPlacesStore.find(i => i.id === item.id);
        if (custom) return custom;
        return item;
      });
    }
    const preset = ROUTE_PRESETS_DATA.find(p => p.id === selectedRoutePresetId);
    if (preset) {
      return preset.itemIds.map(id => {
        const b = JAPAN_DATA.find(item => item.id === id);
        if (b) return b;
        return customPlacesStore.find(item => item.id === id);
      }).filter(Boolean);
    }
    return itineraryList;
  }

  function calculateTransitLeg(fromItem, toItem) {
    if (!fromItem || !toItem) return { mode: "🚇 รถไฟ", duration: "15 นาที", fareJPY: 210, icon: "🚇" };

    // Same Tokyo
    if (fromItem.region === "tokyo" && toItem.region === "tokyo") {
      if (fromItem.id === "tokyo-sensoji" && toItem.id === "tokyo-tsukiji-outer") {
        return { mode: "Toei Asakusa + Hibiya Line", duration: "18 นาที", fareJPY: 210, icon: "🚇" };
      }
      if (fromItem.id === "tokyo-tsukiji-outer" && toItem.id === "tokyo-shibuya-sky") {
        return { mode: "Tokyo Metro Hibiya + Ginza Line", duration: "22 นาที", fareJPY: 210, icon: "🚇" };
      }
      if (fromItem.id === "tokyo-shibuya-sky" && toItem.id === "tokyo-shinjuku-omoide") {
        return { mode: "JR Yamanote Line", duration: "7 นาที", fareJPY: 170, icon: "🚆" };
      }
      return { mode: "Tokyo Metro / JR Yamanote Line", duration: "15 - 25 นาที", fareJPY: 210, icon: "🚇" };
    }

    // Same Kansai (Kyoto / Osaka)
    if ((fromItem.region === "kyoto" || fromItem.region === "osaka") && (toItem.region === "kyoto" || toItem.region === "osaka")) {
      if (fromItem.region === "kyoto" && toItem.region === "osaka") {
        return { mode: "JR Special Rapid Service / Keihan Line", duration: "35 นาที", fareJPY: 580, icon: "🚆" };
      }
      if (fromItem.region === "osaka" && toItem.region === "kyoto") {
        return { mode: "JR Special Rapid Service / Hankyu Line", duration: "35 นาที", fareJPY: 580, icon: "🚆" };
      }
      if (fromItem.id === "osaka-usj" && toItem.id === "osaka-dotonbori") {
        return { mode: "JR Yumesaki + Hanshin Namba Line", duration: "25 นาที", fareJPY: 370, icon: "🚆" };
      }
      if (fromItem.id === "osaka-castle" && toItem.id === "osaka-usj") {
        return { mode: "JR Osaka Loop + Yumesaki Line", duration: "30 นาที", fareJPY: 200, icon: "🚆" };
      }
      return { mode: "JR Kansai / Osaka Metro / Hankyu", duration: "20 - 30 นาที", fareJPY: 250, icon: "🚆" };
    }

    // Tokyo <-> Kyoto / Osaka
    if ((fromItem.region === "tokyo" && (toItem.region === "kyoto" || toItem.region === "osaka")) ||
        ((fromItem.region === "kyoto" || fromItem.region === "osaka") && toItem.region === "tokyo")) {
      return { mode: "Shinkansen Nozomi (Tokaido Line)", duration: "2 ชม. 15 นาที", fareJPY: 14170, icon: "🚄" };
    }

    // Tokyo / Shinjuku <-> Fuji Kawaguchiko
    if ((fromItem.region === "tokyo" && toItem.region === "chubu") || (fromItem.region === "chubu" && toItem.region === "tokyo")) {
      return { mode: "Highway Express Bus / Fuji Excursion", duration: "1 ชม. 45 นาที", fareJPY: 2200, icon: "🚌" };
    }

    // Fuji <-> Shirakawago
    if (fromItem.region === "chubu" && toItem.region === "chubu") {
      return { mode: "JR Limited Express Hida + Nohi Bus", duration: "3 ชม. 45 นาที", fareJPY: 6500, icon: "🚆" };
    }

    // Hokkaido
    if (fromItem.region === "hokkaido" && toItem.region === "hokkaido") {
      if (fromItem.id === "hokkaido-otaru-canal" && toItem.id === "hokkaido-shikisaino-oka") {
        return { mode: "JR Limited Express Lilac + Furano Line", duration: "2 ชม. 15 นาที", fareJPY: 3850, icon: "🚆" };
      }
      if (fromItem.id === "hokkaido-shikisaino-oka" && toItem.id === "hokkaido-ramen-alley") {
        return { mode: "JR Limited Express Kamui / Lilac", duration: "1 ชม. 45 นาที", fareJPY: 3400, icon: "🚆" };
      }
      return { mode: "JR Hokkaido Rapid Airport / Express", duration: "35 นาที", fareJPY: 750, icon: "🚆" };
    }

    // Long distance
    return { mode: "Shinkansen / JR Limited Express", duration: "2 - 3 ชั่วโมง", fareJPY: 11500, icon: "🚄" };
  }

  function moveRouteItem(index, direction) {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= activeSimulationRoute.length) return;

    if (selectedRoutePresetId === "custom") {
      const temp = itineraryList[index];
      itineraryList[index] = itineraryList[targetIdx];
      itineraryList[targetIdx] = temp;
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
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

    if (selectedRoutePresetId === "custom") {
      const movedItem = itineraryList.splice(fromIdx, 1)[0];
      itineraryList.splice(toIdx, 0, movedItem);
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
    } else {
      const movedItem = activeSimulationRoute.splice(fromIdx, 1)[0];
      activeSimulationRoute.splice(toIdx, 0, movedItem);
    }
    resetRouteSimulation();
    renderRouteSimulator();
  }

  function removeRouteItem(index) {
    if (selectedRoutePresetId === "custom") {
      itineraryList = itineraryList.filter((_, idx) => idx !== index);
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
      updateItineraryUI();
      renderCards();
    } else {
      activeSimulationRoute = activeSimulationRoute.filter((_, idx) => idx !== index);
    }
    resetRouteSimulation();
    renderRouteSimulator();
  }

  function renderRouteSimulator() {
    if (!routePresetPills || !routeTimelineList) return;

    activeSimulationRoute = getRouteItems();

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

      const latLngs = [];

      // 2.1 Add Numbered Circular Pin Markers with Region Themed Colors
      for (let i = 0; i < activeSimulationRoute.length; i++) {
        const item = activeSimulationRoute[i];
        const meta = ROUTE_SIMULATION_META[item.id] || {
          lat: 35.6895,
          lng: 139.6917,
          icon: "📍",
          region: item.region || "tokyo",
          station: "สถานีใกล้เคียง",
          stayHours: "1.5 - 2 ชม."
        };
        const regCode = meta.region || item.region || "tokyo";
        visitedRegions.add(regCode);
        const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍" };

        const pos = [meta.lat, meta.lng];
        latLngs.push(pos);

        const markerHtml = `
          <div class="custom-leaflet-marker" id="leaflet-marker-${i}" style="border-color: ${theme.color};">
            <span class="marker-badge-num" style="background: ${theme.color};">${i + 1}</span>
            <span>${meta.icon} ${item.title.split('(')[0].trim()}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: "",
          iconSize: [150, 34],
          iconAnchor: [24, 17]
        });

        const marker = L.marker(pos, { icon: customIcon }).addTo(leafletRouteLayerGroup);
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 0.85rem; padding: 2px;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="background: ${theme.color}; color: white; font-weight: 800; font-size: 0.72rem; padding: 1px 6px; border-radius: 10px;">#${i + 1}</span>
              <strong style="color: #0f172a;">${item.title}</strong>
            </div>
            <span style="color: #64748b; font-size: 0.8rem;">🚉 ${meta.station}</span><br>
            <span style="color: #059669; font-weight: 600; font-size: 0.8rem;">⏳ แนะนำเวลา: ${meta.stayHours}</span>
          </div>
        `);
      }

      // 2.2 Draw Color-Coded Polylines & Midpoint Leg Badges
      for (let i = 0; i < activeSimulationRoute.length - 1; i++) {
        const item1 = activeSimulationRoute[i];
        const item2 = activeSimulationRoute[i + 1];
        const meta1 = ROUTE_SIMULATION_META[item1.id] || { lat: 35.6895, lng: 139.6917, region: item1.region || "tokyo" };
        const meta2 = ROUTE_SIMULATION_META[item2.id] || { lat: 35.6895, lng: 139.6917, region: item2.region || "tokyo" };
        const pos1 = [meta1.lat, meta1.lng];
        const pos2 = [meta2.lat, meta2.lng];

        const reg1 = meta1.region || item1.region || "tokyo";
        const reg2 = meta2.region || item2.region || "tokyo";
        const isCrossRegion = (reg1 !== reg2);

        const leg = calculateTransitLeg(item1, item2);
        totalFareJPY += leg.fareJPY;

        const lineColor = isCrossRegion ? "#e11d48" : ((typeof REGION_THEMES !== "undefined" && REGION_THEMES[reg1]) ? REGION_THEMES[reg1].color : "#0284c7");
        const dashArray = isCrossRegion ? "10, 8" : "6, 6";
        const weight = isCrossRegion ? 5 : 4;

        // Add segment polyline
        L.polyline([pos1, pos2], {
          color: lineColor,
          weight: weight,
          opacity: 0.9,
          dashArray: dashArray,
          lineCap: "round"
        }).addTo(leafletRouteLayerGroup);

        // Add Midpoint Transit Badge
        const midLat = (pos1[0] + pos2[0]) / 2;
        const midLng = (pos1[1] + pos2[1]) / 2;

        const badgeHtml = `
          <div class="leaflet-route-badge ${isCrossRegion ? 'shinkansen-badge' : ''}">
            <span>${leg.icon}</span>
            <span>${leg.duration}</span>
            <span>· ¥${leg.fareJPY.toLocaleString()}</span>
          </div>
        `;

        const badgeIcon = L.divIcon({
          html: badgeHtml,
          className: "",
          iconAnchor: [55, 12]
        });

        L.marker([midLat, midLng], { icon: badgeIcon, interactive: false }).addTo(leafletRouteLayerGroup);
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
        const meta = ROUTE_SIMULATION_META[item.id] || { station: "สถานีใกล้เคียง", icon: "📍", region: item.region || "tokyo" };
        const regCode = meta.region || item.region || "tokyo";
        const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍" };

        metroHtml += `
          <div class="metro-station-node" id="metro-node-${i}" style="border-color: ${theme.color};">
            <div class="metro-node-num" style="color: ${theme.color};">STOP #${i + 1}</div>
            <div class="metro-node-title">${meta.icon} ${item.title.split('(')[0].slice(0, 14)}</div>
            <div class="metro-node-station">🚉 ${meta.station.split('(')[0].slice(0, 16)}</div>
          </div>
        `;

        if (i < activeSimulationRoute.length - 1) {
          const nextItem = activeSimulationRoute[i + 1];
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
      metroTrackLine.innerHTML = metroHtml;
    }

    // 3. Render Auto-Grouped Timeline with Drag-and-Drop & Region Headers
    let timelineHtml = `
      <div class="timeline-drag-tip">
        <span>✋ คลิกลากการ์ดเพื่อสลับลำดับจุดแวะ (Drag & Drop) หรือกดปุ่ม ⬆️ ⬇️</span>
      </div>
    `;

    let lastRegion = null;

    for (let i = 0; i < activeSimulationRoute.length; i++) {
      const item = activeSimulationRoute[i];
      const meta = ROUTE_SIMULATION_META[item.id] || {
        station: "สถานีใกล้เคียง",
        stayHours: "1.5 - 2 ชม.",
        bestTimeOfDay: "ช่วงกลางวัน",
        icon: "📍",
        region: item.region || "tokyo",
        mapsName: item.title
      };
      const regCode = meta.region || item.region || "tokyo";
      const theme = (typeof REGION_THEMES !== "undefined" && REGION_THEMES[regCode]) ? REGION_THEMES[regCode] : { color: "#0284c7", icon: "📍", dayLabel: "โซนท่องเที่ยว", name: regCode, bg: "#f0f9ff", border: "#bae6fd" };

      // Add Region Group Header if region changed
      if (regCode !== lastRegion) {
        lastRegion = regCode;
        timelineHtml += `
          <div class="region-group-header" style="background: ${theme.bg}; border: 1px solid ${theme.border}; color: ${theme.color};">
            <div class="region-group-title">
              <span>${theme.icon}</span>
              <span>${theme.dayLabel}</span>
            </div>
            <span class="region-group-badge" style="color: ${theme.color};">${theme.name}</span>
          </div>
        `;
      }

      timelineHtml += `
        <div class="route-stop-card" id="sim-stop-${i}" data-stop-idx="${i}" draggable="true">
          <div class="route-stop-header">
            <div class="stop-title-wrap">
              <span class="stop-drag-handle" title="คลิกลากเพื่อสลับลำดับ">⋮⋮</span>
              <span class="stop-num-badge" style="background: ${theme.color};">${i + 1}</span>
              <div>
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
            <span>⏰ แนะนำ: ${meta.bestTimeOfDay}</span>
          </div>
        </div>
      `;

      // If not last stop, render connecting transit leg
      if (i < activeSimulationRoute.length - 1) {
        const nextItem = activeSimulationRoute[i + 1];
        const nextMeta = ROUTE_SIMULATION_META[nextItem.id] || { region: nextItem.region || "tokyo" };
        const nextRegCode = nextMeta.region || nextItem.region || "tokyo";
        const isCross = (regCode !== nextRegCode);

        const leg = calculateTransitLeg(item, nextItem);
        const fareTHB = Math.round(leg.fareJPY * currentExchangeRate);

        timelineHtml += `
          <div class="route-transit-leg ${isCross ? 'cross-region' : ''}">
            <div class="transit-leg-mode">
              <span>${leg.icon}</span>
              <span>${leg.mode}</span>
            </div>
            <div class="transit-leg-time">⏱️ ${leg.duration}</div>
            <div class="transit-leg-fare">~¥${leg.fareJPY.toLocaleString()} (${fareTHB} บ.)</div>
          </div>
        `;
      }
    }

    routeTimelineList.innerHTML = timelineHtml;

    // Attach HTML5 Drag-and-Drop Handlers
    let draggedIndex = null;
    routeTimelineList.querySelectorAll(".route-stop-card").forEach(card => {
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
          <span class="tier-cost-label">✈️ ตั๋วเครื่องบินไป-กลับ:</span>
          <span class="tier-cost-val">${t.flightTHB}</span>
        </div>
        <div class="tier-cost-item">
          <span class="tier-cost-label">🏨 ที่พักต่อคืน:</span>
          <span class="tier-cost-val">${t.hotelTHB}</span>
        </div>
        <div class="tier-cost-item">
          <span class="tier-cost-label">🍜 ค่าอาหารต่อวัน:</span>
          <span class="tier-cost-val">${t.foodTHB}</span>
        </div>
        <div class="tier-cost-item">
          <span class="tier-cost-label">🚅 การเดินทางต่อวัน:</span>
          <span class="tier-cost-val">${t.transitTHB}</span>
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
    const item = JAPAN_DATA.find(i => i.id === id);
    if (!item) return;

    const inPlan = itineraryList.some(i => i.id === item.id);
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

        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
          <button class="btn primary" id="modal-plan-toggle" style="padding: 0.75rem;">
            ${inPlan ? "✓ ลบออกจากแผนเที่ยว" : "+ เพิ่มลงในแผนการเดินทาง"}
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-plan-toggle").addEventListener("click", () => {
      toggleItineraryItem(item.id);
      detailModal.classList.remove("active");
    });

    detailModal.classList.add("active");
  }

  // 8. Toggle Itinerary Items
  function toggleItineraryItem(id) {
    const idx = itineraryList.findIndex(i => i.id === id);
    if (idx >= 0) {
      itineraryList.splice(idx, 1);
    } else {
      const builtin = JAPAN_DATA.find(i => i.id === id);
      if (builtin) {
        itineraryList.push({
          id: builtin.id,
          title: builtin.title,
          tag: builtin.tag,
          cost: builtin.estimatedCost,
          region: builtin.region,
          japanese: builtin.japanese
        });
      } else {
        const custom = customPlacesStore.find(i => i.id === id);
        if (custom) {
          itineraryList.push({
            id: custom.id,
            title: custom.title,
            tag: custom.tag,
            cost: custom.cost,
            region: custom.region,
            japanese: custom.japanese,
            icon: custom.icon,
            isCustom: true
          });
        }
      }
    }

    localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
    updateItineraryUI();
    renderCards();
    renderRouteSimulator();
  }

  // 9. Update Itinerary Drawer UI
  function updateItineraryUI() {
    if (itineraryCountBadge) itineraryCountBadge.textContent = itineraryList.length;
    if (drawerItemCount) drawerItemCount.textContent = `${itineraryList.length} รายการ`;
    const mobileDockBadge = document.getElementById("mobile-dock-badge");
    if (mobileDockBadge) mobileDockBadge.textContent = itineraryList.length;

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

    // Split itinerary items into Day 1, Day 2, Day 3 (up to 3 items per day)
    let daysHtml = "";
    const itemsPerDay = 3;
    const totalDays = Math.ceil(itineraryList.length / itemsPerDay);

    for (let day = 1; day <= totalDays; day++) {
      const startIndex = (day - 1) * itemsPerDay;
      const dayItems = itineraryList.slice(startIndex, startIndex + itemsPerDay);

      daysHtml += `
        <div class="itinerary-day-block" style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--primary-red); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span>🗓️ DAY ${day}</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${dayItems.length} จุดหมาย</span>
          </div>
          ${dayItems.map((item, index) => {
            const isCustom = item.isCustom || item.id.startsWith("custom-");
            const icon = item.icon || (isCustom ? "📍" : "🗾");
            return `
              <div class="itinerary-item">
                <div>
                  <div class="itinerary-item-title" style="display: flex; align-items: center; gap: 4px;">
                    <span>${icon}</span>
                    <strong>${startIndex + index + 1}. ${item.title}</strong>
                  </div>
                  <div class="itinerary-item-sub">
                    ${isCustom ? `<span style="background: #ecfdf5; color: #059669; font-weight: 700; padding: 1px 5px; border-radius: 6px; font-size: 0.7rem;">Custom</span> ` : ''}
                    ${item.tag || 'จุดหมาย'} • ${item.japanese || item.title}
                  </div>
                </div>
                <button class="remove-itinerary-btn" data-id="${item.id}" title="ลบออกจากแผน">&times;</button>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    itineraryItemsList.innerHTML = daysHtml;

    const estimatedJPY = itineraryList.length * 5500;
    const estimatedTHB = Math.round(estimatedJPY * currentExchangeRate);
    if (estimatedBudgetTotal) {
      estimatedBudgetTotal.textContent = `~¥${estimatedJPY.toLocaleString()} เยน (~${estimatedTHB.toLocaleString()} บาท)`;
    }

    itineraryItemsList.querySelectorAll(".remove-itinerary-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        toggleItineraryItem(id);
      });
    });
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
  function addCustomPlaceToPlan(placeData) {
    const customId = placeData.id || `custom-place-${Date.now()}`;
    const newPlace = {
      id: customId,
      title: placeData.title || placeData.name,
      japanese: placeData.japanese || placeData.title || placeData.name,
      region: placeData.region || "tokyo",
      tag: placeData.tag || "จุดหมายของฉัน",
      icon: placeData.icon || "📍",
      cost: placeData.category === "hotel" ? "ค่าที่พัก" : "ค่ากิจกรรม/อาหาร",
      station: placeData.station || "สถานีใกล้เคียง",
      stayHours: placeData.stayHours || "1 - 2 ชม.",
      lat: parseFloat(placeData.lat) || 35.6895,
      lng: parseFloat(placeData.lng) || 139.6917,
      isCustom: true
    };

    // 1. Save to customPlacesStore if not already there
    if (!customPlacesStore.some(cp => cp.id === newPlace.id)) {
      customPlacesStore.push(newPlace);
      localStorage.setItem("nippon_custom_places", JSON.stringify(customPlacesStore));
    }

    // 2. Register into ROUTE_SIMULATION_META for Leaflet mapping & timelines
    if (typeof ROUTE_SIMULATION_META !== "undefined") {
      ROUTE_SIMULATION_META[newPlace.id] = {
        lat: newPlace.lat,
        lng: newPlace.lng,
        icon: newPlace.icon,
        region: newPlace.region,
        station: newPlace.station,
        stayHours: newPlace.stayHours,
        bestTimeOfDay: "ช่วงเวลาที่สะดวก",
        mapsName: newPlace.title
      };
    }

    // 3. Add to itineraryList if not already present
    if (!itineraryList.some(i => i.id === newPlace.id)) {
      itineraryList.push({
        id: newPlace.id,
        title: newPlace.title,
        tag: newPlace.tag,
        cost: newPlace.cost,
        region: newPlace.region,
        japanese: newPlace.japanese,
        icon: newPlace.icon,
        isCustom: true
      });
      localStorage.setItem("nippon_itinerary", JSON.stringify(itineraryList));
    }

    // 4. Switch to custom preset in Route Simulator so user immediately sees their place
    selectedRoutePresetId = "custom";

    updateItineraryUI();
    renderRouteSimulator();
    renderHotspotsGrid();
  }

  // 1-Click Hotspots Catalog Renderer
  function renderHotspotsGrid() {
    if (!hotspotsGrid || typeof POPULAR_HOTSPOTS_DATA === "undefined") return;

    let list = POPULAR_HOTSPOTS_DATA;
    if (currentHotspotFilter !== "all") {
      list = POPULAR_HOTSPOTS_DATA.filter(h => h.category === currentHotspotFilter);
    }

    hotspotsGrid.innerHTML = list.map(h => {
      const isAdded = itineraryList.some(i => i.id === h.id || i.title === h.name);
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
            <button type="button" class="hotspot-add-btn ${isAdded ? 'added' : ''}" data-hotspot-id="${h.id}">
              ${isAdded ? '✓ อยู่ในแผนแล้ว' : '+ เพิ่มเข้าทริป'}
            </button>
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

  // OpenStreetMap Nominatim Auto-Search & Google Maps URL Parser
  async function performCustomPlaceSearch(query) {
    if (!query || query.trim().length < 2) {
      if (customSearchResults) customSearchResults.style.display = "none";
      return;
    }

    const trimmed = query.trim();

    // 1. Check if input contains raw coordinates e.g. "35.6938, 139.7034" or "@35.6938,139.7034"
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
            let reg = "tokyo";
            if (lat > 34.4 && lat < 35.2 && lon > 135.0 && lon < 136.0) reg = "osaka";
            else if (lat > 34.8 && lat < 35.3 && lon > 135.5 && lon < 136.0) reg = "kyoto";
            else if (lat > 42.0) reg = "hokkaido";
            else if (lat < 34.0) reg = "fukuoka";
            else if (lat > 35.0 && lat < 36.5 && lon < 138.5) reg = "chubu";

            addCustomPlaceToPlan({
              id: `custom-coord-${Date.now()}`,
              title: `จุดปักหมุด (${lat.toFixed(3)}, ${lon.toFixed(3)})`,
              japanese: `GPS: ${lat.toFixed(3)}, ${lon.toFixed(3)}`,
              region: reg,
              tag: "พิกัดปักหมุด",
              icon: "📍",
              category: "spot",
              station: "ตำแหน่งระบุ",
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
    let cleanQuery = trimmed;
    if (cleanQuery.includes("google.com/maps/place/")) {
      const placeMatch = cleanQuery.match(/place\/([^\/]+)/);
      if (placeMatch) cleanQuery = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    }

    if (customSearchResults) {
      customSearchResults.innerHTML = `<div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">🔄 กำลังค้นหาตำแหน่งในญี่ปุ่น...</div>`;
      customSearchResults.style.display = "block";
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&countrycodes=jp&limit=6&addressdetails=1`;
      const resp = await fetch(url, { headers: { "Accept-Language": "en,ja,th" } });
      const data = await resp.json();

      if (!data || data.length === 0) {
        if (customSearchResults) {
          customSearchResults.innerHTML = `
            <div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
              ❌ ไม่พบพิกัดโดยตรง — คุณสามารถสลับไปที่แท็บ "กรอกพิกัดเอง" ได้ครับ
            </div>
          `;
        }
        return;
      }

      if (customSearchResults) {
        customSearchResults.innerHTML = data.map((item, idx) => {
          const placeTitle = item.name || item.display_name.split(",")[0];
          const placeAddr = item.display_name;
          return `
            <div class="custom-search-item" data-idx="${idx}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="custom-search-item-title">📍 ${placeTitle}</div>
                <button type="button" class="hotspot-add-btn" style="padding: 2px 8px; font-size: 0.72rem;">+ เพิ่มทันที</button>
              </div>
              <div class="custom-search-item-address">${placeAddr}</div>
            </div>
          `;
        }).join("");

        customSearchResults.querySelectorAll(".custom-search-item").forEach(itemEl => {
          itemEl.addEventListener("click", () => {
            const idx = parseInt(itemEl.getAttribute("data-idx"), 10);
            const selected = data[idx];
            if (selected) {
              const placeTitle = selected.name || selected.display_name.split(",")[0];
              const lat = parseFloat(selected.lat);
              const lon = parseFloat(selected.lon);

              // Auto detect region
              const fullText = (selected.display_name + " " + JSON.stringify(selected.address || {})).toLowerCase();
              let reg = "tokyo";
              if (fullText.includes("kyoto")) reg = "kyoto";
              else if (fullText.includes("osaka") || fullText.includes("nara") || fullText.includes("kobe")) reg = "osaka";
              else if (fullText.includes("fuji") || fullText.includes("yamanashi") || fullText.includes("nagoya") || fullText.includes("gifu") || fullText.includes("takayama") || fullText.includes("shirakawa")) reg = "chubu";
              else if (fullText.includes("hokkaido") || fullText.includes("sapporo") || fullText.includes("otaru") || fullText.includes("furano") || fullText.includes("hakodate")) reg = "hokkaido";
              else if (fullText.includes("fukuoka") || fullText.includes("hakata") || fullText.includes("kyushu")) reg = "fukuoka";
              else if (fullText.includes("hiroshima") || fullText.includes("miyajima")) reg = "hiroshima";

              let station = "สถานีใกล้เคียง";
              if (selected.address && (selected.address.subway || selected.address.railway || selected.address.station)) {
                station = `สถานี ${selected.address.subway || selected.address.railway || selected.address.station}`;
              }

              addCustomPlaceToPlan({
                id: `custom-search-${Date.now()}`,
                title: placeTitle,
                japanese: placeTitle,
                region: reg,
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
      console.error("Geocoding search failed:", err);
      if (customSearchResults) {
        customSearchResults.innerHTML = `<div style="padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">กรอกชื่อและเลือกเมืองในแท็บกรอกพิกัดเองได้เลยครับ</div>`;
      }
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
        lng: lng
      });

      closeCustomPlaceModal();

      const routeSection = document.getElementById("route-simulator");
      if (routeSection) {
        routeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================= Event Listeners =================

  // Search & Clear
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

  // Season Filter Pills
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

  // Region Filter Pills
  regionPills.querySelectorAll(".pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      regionPills.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentRegion = e.currentTarget.getAttribute("data-region");
      currentCardPage = 1;
      renderCards();
    });
  });

  // Category Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCategory = e.currentTarget.getAttribute("data-category");
      currentCardPage = 1;
      renderCards();
    });
  });

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
  modalCloseBtn.addEventListener("click", () => detailModal.classList.remove("active"));
  detailModal.addEventListener("click", (e) => {
    if (e.target === detailModal) detailModal.classList.remove("active");
  });

  // Drawer Controls
  navItineraryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    itineraryDrawer.classList.add("open");
  });
  drawerCloseBtn.addEventListener("click", () => itineraryDrawer.classList.remove("open"));
  clearItineraryBtn.addEventListener("click", () => {
    if (confirm("คุณต้องการล้างแผนการเดินทางทั้งหมดใช่หรือไม่?")) {
      itineraryList = [];
      localStorage.setItem("nippon_itinerary", "[]");
      updateItineraryUI();
      renderCards();
    }
  });

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
  let currentExchangeRate = parseFloat(localStorage.getItem("nippon_exchange_rate")) || 0.235;
  const inputJpy = document.getElementById("input-jpy");
  const inputThb = document.getElementById("input-thb");
  const currentRateDisplay = document.getElementById("current-rate-display");
  const customRateInput = document.getElementById("custom-rate-input");
  const resetRateDefaultBtn = document.getElementById("reset-rate-default-btn");
  const taxQualifyBadge = document.getElementById("tax-qualify-badge");
  const taxGrossPrice = document.getElementById("tax-gross-price");
  const taxSavedPrice = document.getElementById("tax-saved-price");
  const taxNetPrice = document.getElementById("tax-net-price");

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
    if (taxGrossPrice) taxGrossPrice.textContent = `¥${currentJPY.toLocaleString()} เยน`;

    if (currentJPY >= 5000) {
      if (taxQualifyBadge) {
        taxQualifyBadge.textContent = "✓ ช้อปครบ 5,000 เยน ทำ Tax-Free ได้!";
        taxQualifyBadge.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
        taxQualifyBadge.style.color = "#059669";
      }

      const savedJPY = Math.round(currentJPY - (currentJPY / 1.10));
      const savedTHB = Math.round(savedJPY * currentExchangeRate);
      const netJPY = currentJPY - savedJPY;
      const netTHB = Math.round(netJPY * currentExchangeRate);

      if (taxSavedPrice) taxSavedPrice.textContent = `-¥${savedJPY.toLocaleString()} เยน (~${savedTHB.toLocaleString()} บาท)`;
      if (taxNetPrice) taxNetPrice.textContent = `¥${netJPY.toLocaleString()} เยน (~${netTHB.toLocaleString()} บาท)`;
    } else {
      if (taxQualifyBadge) {
        taxQualifyBadge.textContent = "⚠️ ยอดไม่ถึง 5,000 เยน (ไม่สามารถทำ Tax-Free ได้)";
        taxQualifyBadge.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        taxQualifyBadge.style.color = "#dc2626";
      }

      if (taxSavedPrice) taxSavedPrice.textContent = `¥0 เยน (ซื้อเพิ่มอีก ¥${(5000 - currentJPY).toLocaleString()} เพื่อลดภาษี)`;
      const totalTHB = Math.round(currentJPY * currentExchangeRate);
      if (taxNetPrice) taxNetPrice.textContent = `¥${currentJPY.toLocaleString()} เยน (~${totalTHB.toLocaleString()} บาท)`;
    }
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

  // Initial Render
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
});




