/**
 * HOCL LABS Clone - Core Interactive Application Logic (O'zbek tili)
 */

document.addEventListener('DOMContentLoaded', function () {
  // ----------------------------------------------------
  // 1. DATA DEFINITIONS (O'zbek tilida)
  // ----------------------------------------------------
  const PRODUCTS = {
    'cpr-face-mist': {
      id: 'cpr-face-mist',
      title: 'CPR Yuz Spreyi',
      variants: {
        '120ml': { name: '120 ml', price: 145000 },
        '60ml': { name: '60 ml', price: 95000 },
        '30ml': { name: '30 ml', price: 55000 }
      },
      currentVariant: '120ml',
      image: './assets/images/ChatGPT_Image_Apr_18_2026_07_24_29_PM.png',
      badge: 'Bestseller',
      inStock: true,
      desc: '0.015% toza Gipoxlorid kislotasi (HOCl). Akne bakteriyalarini yo\'qotadi, qizarishni tinchlantiradi va teri to\'sig\'ini mustahkamlaydi.'
    },
    'cpr-body-mist': {
      id: 'cpr-body-mist',
      title: 'CPR Tana Spreyi',
      variants: {
        '250ml': { name: '250 ml', price: 210000 }
      },
      currentVariant: '250ml',
      image: './assets/images/body_mist_6afb0f79-e207-4c2c-b56f-c5eb86080601.png',
      badge: 'Sotuvda tugagan',
      inStock: false,
      desc: 'Orqa, ko\'krak va tana terisi uchun 360 darajali sprey. Mashg\'ulotdan keyingi toshmalar va ter hidini keltirib chiqaruvchi bakteriyalarni yo\'qotadi.'
    },
    'mayday-pads': {
      id: 'mayday-pads',
      title: 'MAYDAY Tonik Yostiqchalari',
      variants: {
        '50pads': { name: '50 dona', price: 165000 }
      },
      currentVariant: '50pads',
      image: './assets/images/mayday_tissue.png',
      badge: 'Sotuvda tugagan',
      inStock: false,
      desc: 'Faol HOCl eritmasi bilan shimdirilgan relyefli paxta disklari. Teshikchalarni chuqur tozalaydi va terini tinchlantiradi.'
    },
    'orynea-mist': {
      id: 'orynea-mist',
      title: 'ORYNEA Qovoq va Kiprik Spreyi',
      variants: {
        '100ml': { name: '100 ml', price: 130000 }
      },
      currentVariant: '100ml',
      image: './assets/images/freepik_change-the-background-col_2742290919.png',
      badge: 'Oftalmologik tekshirilgan',
      inStock: true,
      desc: 'Ko\'z atrofi va qovoqlar uchun xavfsiz oftalmologik toifadagi HOCl. Ko\'z charchog\'i, blefarit va kiprik gigiyenasi uchun achishtirmaydigan sprey.'
    }
  };

  const RITUAL_DETAILS = {
    'post-gym': {
      title: 'Mashg\'ulotdan keyingi himoya',
      desc: 'Sport zaldagi ter teshikchalarda bakteriyalar ko\'payishiga sabab bo\'ladi. HOCl 15 soniya ichida akne chaqiruvchi Cutibacterium acnes bakteriyalarini yo\'qotadi va qizigan terini sovitadi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'SPORT & TIKLANISH',
      howTo: 'Mashg\'ulot tugashi bilan yuz va bo\'yinga 4-5 marta seping.'
    },
    'breakout-sos': {
      title: 'Toshmalarga qarshi favqulodda yordam',
      desc: 'Yallig\'langan toshmalar va husnbuzarlarni hujayra darajasida zararsizlantiradi, bunda terining namlik qatlamini quritmaydi.',
      product: PRODUCTS['mayday-pads'],
      tag: 'AKNEGA QARSHI',
      howTo: 'Shimdirilgan diskni muammoli sohada 20 soniya ushlab turing, so\'ng CPR spreyini seping.'
    },
    'daily-cpr': {
      title: 'Kundalik tabiiy himoya',
      desc: 'Shahar changi, havoning ifloslanishi va patogen mikroblardan himoya qiluvchi har kungi qalqon.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'KUNDALIK G\'AMXO\'RLIK',
      howTo: 'Ertalab va kechqurun sarum va kremlardan oldin 0-bosqich sifatida seping.'
    },
    'flight-mode': {
      title: 'Parvoz rejimi va sayohat',
      desc: 'Samolyotning quruq havosi terini tez suvsizlantiradi. HOCl sayohat davomida terini tetiklashtiradi va himoya qiladi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'SAYOHAT QALQONI',
      howTo: 'Parvoz paytida har 2-3 soatda yuzga seping.'
    },
    'razor-reset': {
      title: 'Soqoldan keyingi tinchlantirish',
      desc: 'Pichoq ta\'siridagi mikrotilanishlar, qizarish va tuk o\'sishini tinchlantiradi, yallig\'lanishni to\'xtatadi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'ERKAKLAR PARVARIŞI',
      howTo: 'Soqol olgandan keyin teriga seping, so\'ngra krem surting.'
    },
    'lash-line': {
      title: 'Qovoq va kipriklar parvarishi',
      desc: 'Nozik qovoq chetlarini xavfsiz tozalaydi, ko\'zning quruqligini kamaytiradi va kipriklarni mikroblardan himoyalaydi.',
      product: PRODUCTS['orynea-mist'],
      tag: 'KO\'Z GIGIYENASI',
      howTo: 'Ko\'zingizni yuming va 1-2 marta seping, o\'z holicha qurishiga qo\'ying.'
    },
    'desert-heat': {
      title: 'Quyosh va jaziramadan keyin',
      desc: 'Yuqori harorat terida ortiqcha yog\'lanish va quyosh stressini keltirib chiqaradi. HOCl terini bir zumda tinchlantiradi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'IQLIM RESILIENTI',
      howTo: 'Ko\'chadan qaytgach darhol toza yuzga seping.'
    },
    'post-facial': {
      title: 'Kosmetologik muolajadan keyin',
      desc: 'Chistka, peeling, lazer yoki mikronidlingdan keyin terining tez va xavfsiz tiklanishini ta\'minlaydi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'KLINIK TIKLANISH',
      howTo: 'Muolajadan keyingi dastlabki 24 soatda har soatda seping.'
    }
  };

  // ----------------------------------------------------
  // 2. CURRENCY CONVERSION ENGINE (Default: UZS)
  // ----------------------------------------------------
  const CURRENCIES = {
    UZS: { symbol: '', postfix: ' so\'m', rate: 1.0 },
    USD: { symbol: '$', postfix: '', rate: 0.000078 },
    EUR: { symbol: '€', postfix: '', rate: 0.000072 },
    AED: { symbol: 'Dhs. ', postfix: '', rate: 0.000287 }
  };
  let currentCurrency = 'UZS';

  function formatMoney(amountInUzs) {
    const cur = CURRENCIES[currentCurrency] || CURRENCIES.UZS;
    if (currentCurrency === 'UZS') {
      return Number(amountInUzs).toLocaleString('uz-UZ') + cur.postfix;
    }
    const converted = (amountInUzs * cur.rate).toFixed(2);
    return `${cur.symbol}${converted}${cur.postfix}`;
  }

  // ----------------------------------------------------
  // 3. CART SYSTEM (PERSISTENT & REACTIVE)
  // ----------------------------------------------------
  let cart = [];
  try {
    const stored = localStorage.getItem('hocl_cart_data_uz');
    if (stored) cart = JSON.parse(stored);
  } catch (e) { cart = []; }

  function saveCart() {
    try {
      localStorage.setItem('hocl_cart_data_uz', JSON.stringify(cart));
    } catch (e) {}
    renderCart();
  }

  function getCartSubtotal() {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  function getCartItemCount() {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  function addToCart(productId, variantName, quantity = 1) {
    const p = PRODUCTS[productId];
    if (!p) return;
    const v = p.variants[variantName] || Object.values(p.variants)[0];
    const key = `${productId}-${v.name}`;

    const existing = cart.find(i => i.key === key);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        key: key,
        productId: productId,
        title: p.title,
        variantName: v.name,
        price: v.price,
        image: p.image,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`${p.title} (${v.name}) savatga qo'shildi`);
    openCartDrawer();
  }

  function updateQuantity(key, delta) {
    const item = cart.find(i => i.key === key);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.key !== key);
    }
    saveCart();
  }

  function removeFromCart(key) {
    cart = cart.filter(i => i.key !== key);
    saveCart();
  }

  // Toast System
  const toastEl = document.createElement('div');
  toastEl.className = 'hocl-toast';
  toastEl.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span class="hocl-toast-msg">Mahsulot savatga qo'shildi</span>`;
  document.body.appendChild(toastEl);
  let toastTimer = null;

  function showToast(message) {
    toastEl.querySelector('.hocl-toast-msg').textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2800);
  }

  // Build Cart Drawer DOM elements
  const cartOverlay = document.createElement('div');
  cartOverlay.className = 'cart-drawer-overlay';
  document.body.appendChild(cartOverlay);

  const cartDrawer = document.createElement('div');
  cartDrawer.id = 'HoclCartDrawer';
  cartDrawer.innerHTML = `
    <div class="cart-drawer-header">
      <div class="cart-drawer-title">
        <span>Sizning savatingiz</span>
        <span class="cart-drawer-badge" id="cartDrawerCount">0</span>
      </div>
      <button class="cart-drawer-close" aria-label="Savatni yopish">&times;</button>
    </div>
    <div class="shipping-meter-wrap">
      <div class="shipping-meter-text">
        <span id="shippingMeterMsg">Bepul yetkazib berish uchun yana 200 000 so'm qo'shing</span>
        <span id="shippingMeterPct">0%</span>
      </div>
      <div class="shipping-meter-bar">
        <div class="shipping-meter-fill" id="shippingMeterFill"></div>
      </div>
    </div>
    <div class="cart-items-scroll" id="cartItemsContainer"></div>
    <div class="cart-drawer-footer" id="cartFooter">
      <div class="cart-subtotal-row">
        <span class="cart-subtotal-label">Jami summa</span>
        <span class="cart-subtotal-val" id="cartSubtotalVal">0 so'm</span>
      </div>
      <div class="cart-tax-note">Yetkazib berish va soliqlar hisob-kitob paytida belgilanadi.</div>
      <button class="cart-checkout-btn" id="cartCheckoutBtn">
        Buyurtmani rasmiylashtirish
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(cartDrawer);

  function openCartDrawer() {
    cartDrawer.classList.add('is-active');
    cartOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('is-active');
    cartOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  cartDrawer.querySelector('.cart-drawer-close').addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);

  // Render Cart state
  function renderCart() {
    const totalCount = getCartItemCount();
    const subtotal = getCartSubtotal();

    // Update Header Badges
    document.querySelectorAll('#cart-icon-bubble, .header__icon--cart, [data-cart-count], .hs_header-cart__js').forEach(el => {
      let badge = el.querySelector('.cart-count-bubble span, span[aria-hidden="true"], .bubble-count, .hs_header-cart__count');
      if (badge) badge.textContent = totalCount;
      const countSpan = el.querySelector('#cart-total-badge');
      if (countSpan) countSpan.textContent = totalCount;
    });
    document.querySelectorAll('.hs_header-cart__count').forEach(el => {
      el.textContent = totalCount;
    });

    // Update Drawer Badges & Shipping
    document.getElementById('cartDrawerCount').textContent = totalCount;
    document.getElementById('cartSubtotalVal').textContent = formatMoney(subtotal);

    // Free Shipping Progress (Threshold: 200 000 UZS)
    const threshold = 200000;
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    const fillEl = document.getElementById('shippingMeterFill');
    const msgEl = document.getElementById('shippingMeterMsg');
    const pctEl = document.getElementById('shippingMeterPct');

    fillEl.style.width = `${progress}%`;
    pctEl.textContent = `${progress}%`;

    if (subtotal >= threshold) {
      msgEl.textContent = '🎉 Siz uchun bepul yetkazib berish faollashdi!';
      fillEl.style.background = '#10b981';
    } else {
      const remaining = threshold - subtotal;
      msgEl.textContent = `Bepul yetkazib berish uchun yana ${formatMoney(remaining)} qo'shing`;
      fillEl.style.background = 'linear-gradient(90deg, #7b6491, #9d82b8)';
    }

    // Items list
    const container = document.getElementById('cartItemsContainer');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-view">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p style="font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px 0;">Savatingiz hozircha bo'sh</p>
          <p style="font-size: 13px; margin: 0;">Terining tabiiy to'sig'ini tiklovchi toza HOCl vositalarini kashf eting.</p>
          <button class="cart-empty-btn" id="cartExploreBtn">Mahsulotlarni ko'rish</button>
        </div>
      `;
      footer.style.display = 'none';
      const exploreBtn = document.getElementById('cartExploreBtn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
          closeCartDrawer();
          const target = document.querySelector('.hs_featured_collection-bg') || document.querySelector('#shopify-section-template--27508218462251__hs_featured_collection_GNmkLh');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    footer.style.display = 'block';
    container.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-key="${item.key}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-details">
          <div class="cart-item-top">
            <div>
              <div class="cart-item-name">${item.title}</div>
              <div class="cart-item-variant">${item.variantName}</div>
            </div>
            <div class="cart-item-price">${formatMoney(item.price * item.quantity)}</div>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-stepper">
              <button class="qty-btn" data-action="minus" data-key="${item.key}">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" data-action="plus" data-key="${item.key}">+</button>
            </div>
            <button class="cart-remove-btn" data-action="remove" data-key="${item.key}">O'chirish</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach row events
    container.querySelectorAll('[data-action="minus"]').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.key, -1));
    });
    container.querySelectorAll('[data-action="plus"]').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.key, 1));
    });
    container.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
  }

  // ----------------------------------------------------
  // 4. CHECKOUT SIMULATION MODAL (O'zbek tilida)
  // ----------------------------------------------------
  const checkoutModal = document.createElement('div');
  checkoutModal.className = 'ritual-modal-backdrop';
  checkoutModal.innerHTML = `
    <div class="checkout-modal-box">
      <div style="width: 56px; height: 56px; background: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; color: #10b981;">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 style="font-size: 22px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px 0;">Buyurtmani rasmiylashtirish</h3>
      <p style="font-size: 14px; color: #666; margin: 0 0 20px 0;">Buyurtma namoyish rejimida qabul qilinadi.</p>
      <div style="background: #fbf9fd; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: left; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #666;">Mahsulotlar soni:</span>
          <strong id="simSubtotal">${formatMoney(getCartSubtotal())}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #666;">Yetkazib berish:</span>
          <strong style="color: #10b981;">Bepul</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 8px; margin-top: 8px;">
          <span style="font-weight: 600;">Jami to'lov:</span>
          <strong style="font-size: 16px; color: #1a1a2e;" id="simTotal">${formatMoney(getCartSubtotal())}</strong>
        </div>
      </div>
      <button class="cart-checkout-btn" id="confirmOrderBtn" style="margin-bottom: 12px;">Buyurtmani tasdiqlash</button>
      <button style="background: transparent; border: none; font-size: 13px; color: #7b6491; cursor: pointer; text-decoration: underline;" id="closeCheckoutSimBtn">Do'konga qaytish</button>
    </div>
  `;
  document.body.appendChild(checkoutModal);

  document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
    document.getElementById('simSubtotal').textContent = formatMoney(getCartSubtotal());
    document.getElementById('simTotal').textContent = formatMoney(getCartSubtotal());
    checkoutModal.classList.add('is-active');
  });

  document.getElementById('confirmOrderBtn').addEventListener('click', () => {
    cart = [];
    saveCart();
    checkoutModal.classList.remove('is-active');
    closeCartDrawer();
    showToast('🎉 Buyurtmangiz qabul qilindi! HOCL LABS ni tanlaganingiz uchun rahmat.');
  });

  document.getElementById('closeCheckoutSimBtn').addEventListener('click', () => {
    checkoutModal.classList.remove('is-active');
  });

  // ----------------------------------------------------
  // 5. SEARCH DRAWER & LIVE FILTERING
  // ----------------------------------------------------
  const searchDrawer = document.createElement('div');
  searchDrawer.id = 'HoclSearchDrawer';
  searchDrawer.innerHTML = `
    <div class="search-drawer-inner">
      <div class="search-bar-wrap">
        <svg class="search-bar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" class="search-bar-input" id="hoclSearchInput" placeholder="Mahsulotlar, tarkib (HOCl), rituallar yoki muammolarni qidiring..." />
        <button class="search-drawer-close" id="closeSearchDrawerBtn" aria-label="Qidiruvni yopish">&times;</button>
      </div>
      <div class="search-results-list" id="hoclSearchResults"></div>
    </div>
  `;
  document.body.appendChild(searchDrawer);

  const searchInput = document.getElementById('hoclSearchInput');
  const searchResults = document.getElementById('hoclSearchResults');

  function openSearchDrawer() {
    searchDrawer.classList.add('is-active');
    cartOverlay.classList.add('is-active');
    setTimeout(() => searchInput.focus(), 150);
    renderSearchResults('');
  }

  function closeSearchDrawer() {
    searchDrawer.classList.remove('is-active');
    cartOverlay.classList.remove('is-active');
  }

  document.getElementById('closeSearchDrawerBtn').addEventListener('click', closeSearchDrawer);

  function renderSearchResults(query) {
    const q = query.toLowerCase().trim();
    const matched = Object.values(PRODUCTS).filter(p => {
      return !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    });

    if (matched.length === 0) {
      searchResults.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; text-align: center; color: #888;">"${query}" bo'yicha mahsulot topilmadi. "CPR", "Sprey" yoki "Tonik" deb qidirib ko'ring.</div>`;
      return;
    }

    searchResults.innerHTML = matched.map(p => {
      const v = Object.values(p.variants)[0];
      return `
        <div class="search-result-card" data-product-id="${p.id}">
          <img src="${p.image}" alt="${p.title}" class="search-result-img" />
          <div class="search-result-info">
            <h5>${p.title}</h5>
            <p>${formatMoney(v.price)}</p>
            <span style="font-size: 11px; color: ${p.inStock ? '#10b981' : '#ef4444'}; font-weight: 600;">${p.inStock ? 'Mavjud' : 'Sotuvda tugagan'}</span>
          </div>
        </div>
      `;
    }).join('');

    searchResults.querySelectorAll('.search-result-card').forEach(card => {
      card.addEventListener('click', () => {
        closeSearchDrawer();
        const pid = card.dataset.productId;
        if (PRODUCTS[pid]?.inStock) {
          addToCart(pid, Object.keys(PRODUCTS[pid].variants)[0]);
        } else {
          showToast(`${PRODUCTS[pid].title} hozirda sotuvda tugagan.`);
        }
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  // Header Search Buttons Trigger
  document.querySelectorAll('header [href*="search"], header button[aria-label*="Search"], .header__search, details-modal[header-search-details], .hs_header-search summary, summary.header__icon--search').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openSearchDrawer();
    });
  });

  // Header Cart Buttons Trigger
  document.querySelectorAll('a#cart-icon-bubble, button#cart-icon-bubble, .header__icon--cart, .hs_header-cart__js').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCartDrawer();
    });
  });

  // ----------------------------------------------------
  // 6. RITUAL CLOUD INTERACTION & MODAL
  // ----------------------------------------------------
  const ritualModal = document.createElement('div');
  ritualModal.className = 'ritual-modal-backdrop';
  ritualModal.innerHTML = `
    <div class="ritual-modal-box">
      <button class="ritual-modal-close" id="closeRitualModalBtn">&times;</button>
      <div class="ritual-modal-badge" id="ritualBadge">KUNLIK RITUAL</div>
      <h3 class="ritual-modal-title" id="ritualTitle">Ritual nomi</h3>
      <p class="ritual-modal-desc" id="ritualDesc">Ushbu holatda toza HOCl terini qanday davolashi haqida ilmiy ma'lumot.</p>
      <div class="ritual-product-preview">
        <img src="" alt="" class="ritual-product-img" id="ritualImg" />
        <div style="flex: 1;">
          <h4 class="ritual-product-name" id="ritualProdName">Mahsulot</h4>
          <div class="ritual-product-price" id="ritualProdPrice">0 so'm</div>
          <div style="font-size: 11px; color: #706a7c; margin-top: 2px;" id="ritualHowTo">Qo'llash usuli</div>
        </div>
      </div>
      <button class="ritual-modal-cta" id="ritualAddBtn">Ritualni savatga qo'shish</button>
    </div>
  `;
  document.body.appendChild(ritualModal);

  let activeRitualProduct = null;

  function showRitualModal(ritualKey) {
    const r = RITUAL_DETAILS[ritualKey] || {
      title: ritualKey.replace('-', ' ').toUpperCase(),
      desc: 'HOCl inson oq qon tanachalari ishlab chiqaradigan tabiiy birikma bo\'lib, bakteriyalarni yo\'qotadi va to\'qimalarni davolaydi.',
      product: PRODUCTS['cpr-face-mist'],
      tag: 'TAVSIYA ETILADIGAN RITUAL',
      howTo: 'Kun davomida toza yoki quruq teriga kerak bo\'lganda erkin seping.'
    };

    document.getElementById('ritualBadge').textContent = r.tag;
    document.getElementById('ritualTitle').textContent = r.title;
    document.getElementById('ritualDesc').textContent = r.desc;
    document.getElementById('ritualImg').src = r.product.image;
    document.getElementById('ritualProdName').textContent = r.product.title;
    document.getElementById('ritualProdPrice').textContent = formatMoney(Object.values(r.product.variants)[0].price);
    document.getElementById('ritualHowTo').textContent = r.howTo;

    activeRitualProduct = r.product;
    ritualModal.classList.add('is-active');
  }

  document.getElementById('closeRitualModalBtn').addEventListener('click', () => {
    ritualModal.classList.remove('is-active');
  });
  ritualModal.addEventListener('click', (e) => {
    if (e.target === ritualModal) ritualModal.classList.remove('is-active');
  });

  document.getElementById('ritualAddBtn').addEventListener('click', () => {
    if (activeRitualProduct) {
      if (activeRitualProduct.inStock) {
        addToCart(activeRitualProduct.id, Object.keys(activeRitualProduct.variants)[0]);
        ritualModal.classList.remove('is-active');
      } else {
        showToast(`${activeRitualProduct.title} hozirda sotuvda tugagan.`);
      }
    }
  });

  // Listen for Ritual Cloud clicks
  document.addEventListener('click', function (e) {
    const wordBtn = e.target.closest('.rc-word');
    if (wordBtn) {
      const text = wordBtn.textContent.replace('/', '').trim();
      showRitualModal(text);
    }
  });

  // ----------------------------------------------------
  // 7. FEATURED PRODUCTS COLLECTION HOOKS
  // ----------------------------------------------------
  document.querySelectorAll('button[name="add"], .hs_pro button, button:contains("Add to cart"), button:contains("Savatga")').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = btn.closest('.hs_pro, .product, .card');
      let pid = 'cpr-face-mist';
      if (card) {
        const text = card.textContent;
        if (text.includes('Body Mist') || text.includes('Tana Spreyi')) pid = 'cpr-body-mist';
        else if (text.includes('MAYDAY')) pid = 'mayday-pads';
        else if (text.includes('ORYNEA') || text.includes('Qovoq')) pid = 'orynea-mist';
      }

      if (PRODUCTS[pid]?.inStock) {
        const v = PRODUCTS[pid].currentVariant || Object.keys(PRODUCTS[pid].variants)[0];
        addToCart(pid, v);
      } else {
        showToast('Ushbu mahsulot hozirda sotuvda tugagan.');
      }
    });
  });

  // CPR Face Mist Size Variant Pills
  const sizePillsContainer = document.querySelector('.variant-pills-row');
  if (sizePillsContainer) {
    sizePillsContainer.querySelectorAll('.variant-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        sizePillsContainer.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const size = pill.dataset.size;
        PRODUCTS['cpr-face-mist'].currentVariant = size;
        const newPrice = PRODUCTS['cpr-face-mist'].variants[size].price;
        const priceDisplay = document.querySelector('[data-product-price="cpr-face-mist"]');
        if (priceDisplay) priceDisplay.textContent = formatMoney(newPrice);
      });
    });
  }

  // ----------------------------------------------------
  // 8. INTERACTIVE BEFORE & AFTER COMPARISON SLIDER
  // ----------------------------------------------------
  const baContainer = document.getElementById('cprBaSlider') || document.querySelector('.ba-slider-container');
  if (baContainer) {
    const handle = baContainer.querySelector('.ba-handle');
    let isDragging = false;
    let currentPct = 50;

    function updateSplit(pct) {
      currentPct = Math.max(1, Math.min(99, pct));
      const pctStr = currentPct.toFixed(2) + '%';
      baContainer.style.setProperty('--split', pctStr);
      if (handle) {
        handle.setAttribute('aria-valuenow', Math.round(currentPct));
      }
    }

    function getPctFromEvent(e) {
      const rect = baContainer.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const x = clientX - rect.left;
      return (x / rect.width) * 100;
    }

    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      baContainer.classList.add('is-dragging');
      try {
        baContainer.setPointerCapture(e.pointerId);
      } catch (err) {}
      updateSplit(getPctFromEvent(e));
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      updateSplit(getPctFromEvent(e));
    }

    function onPointerUp(e) {
      if (isDragging) {
        isDragging = false;
        baContainer.classList.remove('is-dragging');
        try {
          baContainer.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    }

    baContainer.addEventListener('pointerdown', onPointerDown);
    baContainer.addEventListener('pointermove', onPointerMove);
    baContainer.addEventListener('pointerup', onPointerUp);
    baContainer.addEventListener('pointercancel', onPointerUp);

    if (handle) {
      handle.addEventListener('keydown', (e) => {
        let step = e.shiftKey ? 10 : 3;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          updateSplit(currentPct - step);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          updateSplit(currentPct + step);
        } else if (e.key === 'Home') {
          e.preventDefault();
          updateSplit(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          updateSplit(100);
        }
      });
    }

    updateSplit(50);
  }

  // ----------------------------------------------------
  // 9. CURRENCY SWITCHER
  // ----------------------------------------------------
  document.querySelectorAll('[data-currency-select], .localization-form select').forEach(select => {
    select.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      renderCart();
      document.querySelectorAll('[data-price-aed], [data-price-uzs]').forEach(el => {
        const uzs = parseFloat(el.dataset.priceUzs || (el.dataset.priceAed ? el.dataset.priceAed * 3500 : 145000));
        el.textContent = formatMoney(uzs);
      });
      showToast(`Valyuta: ${currentCurrency}`);
    });
  });

  // ----------------------------------------------------
  // 10. NEWSLETTER FORM
  // ----------------------------------------------------
  const newsletterForm = document.querySelector('.pe_newsletter-form form, #contact_form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('✓ HOCL LABS ilmiy yangiliklariga muvaffaqiyatli a\'zo bo\'ldingiz!');
        input.value = '';
      }
    });
  }

  // Navigation link smooth scrolling for "Biz haqimizda", "HOCl Ilmi", "Do'kon", "Bog'lanish"
  document.querySelectorAll('a[href*="about-us"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('.section-aflow') || document.querySelector('.cpr-hs');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('a[href*="the-science"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('.section-curved-stats') || document.querySelector('.section-aflow');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('a[href*="contact"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('.pe_newsletter-bg') || document.querySelector('#shopify-section-template--27508218462251__hs_newsletter_njdCRN');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Initial render
  renderCart();
});
