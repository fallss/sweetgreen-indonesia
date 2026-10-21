// ==========================================================================
// SWEETGREEN INDONESIA — APLIKASI WEB UMKM PANGAN SEHAT
// Integrasi Tailwind CSS, Framer Motion (Motion), & Direct WhatsApp
// ==========================================================================

// Nomor WhatsApp Resmi UMKM Dapur Sweetgreen Indonesia
const WHATSAPP_PHONE = '6281298765432';

const MENU_ITEMS = [
  {
    id: 'harvest-bowl',
    name: 'Warm Harvest Bowl',
    category: 'warm-bowls',
    price: 48000,
    calories: '680 kkal',
    image: 'images/harvest-bowl.jpg',
    description: 'Dada ayam panggang rempah, ubi Cilembu madu oven, apel Malang renyah, keju kambing lokal, kacang sangrai, beras merah organik, daun kale, dan saus balsamic.',
    dietary: ['gluten-free', 'high-protein'],
    macros: { protein: '38g Protein', carbo: '46g Karbo', serat: '8g Serat' },
    onlineOnly: false
  },
  {
    id: 'crispy-rice-bowl',
    name: 'Crispy Rice Bowl',
    category: 'warm-bowls',
    price: 46000,
    calories: '610 kkal',
    image: 'images/crispy-rice-bowl.jpg',
    description: 'Ayam bakar gurih, beras merah hangat, beras krispi renyah, rajangan kubis ungu, wortel serut, timun hidroponik, daun ketumbar, almond sangrai, dan saus cashew jahe wijen.',
    dietary: ['gluten-free', 'dairy-free', 'high-protein'],
    macros: { protein: '34g Protein', carbo: '52g Karbo', serat: '6g Serat' },
    onlineOnly: false
  },
  {
    id: 'guacamole-greens',
    name: 'Guacamole Greens Salad',
    category: 'salads',
    price: 45000,
    calories: '530 kkal',
    image: 'images/guacamole-greens.jpg',
    description: 'Ayam bakar rempah, alpukat mentega segar, tomat heirloom Lembang, bawang merah segar, kripik jagung renyah, selada mesclun organik, dan vinaigrette ketumbar jeruk nipis.',
    dietary: ['gluten-free', 'dairy-free', 'high-protein'],
    macros: { protein: '32g Protein', carbo: '30g Karbo', serat: '10g Serat' },
    onlineOnly: false
  },
  {
    id: 'peach-burrata',
    name: 'Peach & Burrata Salad',
    category: 'salads',
    price: 55000,
    calories: '490 kkal',
    image: 'images/peach-burrata.jpg',
    description: 'Keju burrata artisan segar, irisan persik madu manis, daging asap gurih, daun rucola liar, daun mint segar, biji pinus sangrai, minyak zaitun murni, dan reduksi balsamic.',
    dietary: ['gluten-free', 'vegetarian'],
    macros: { protein: '22g Protein', carbo: '28g Karbo', serat: '5g Serat' },
    onlineOnly: true
  },
  {
    id: 'shroomami-bowl',
    name: 'Shroomami Warm Bowl',
    category: 'warm-bowls',
    price: 42000,
    calories: '570 kkal',
    image: 'images/shroomami-bowl.jpg',
    description: 'Jamur portobello panggang, tahu organik panggang bumbu gurih, beras merah pulen, serutan bit merah, pita timun segar, baby kale, biji wijen sangrai, dan saus miso jahe.',
    dietary: ['gluten-free', 'dairy-free', 'vegetarian', 'vegan'],
    macros: { protein: '26g Protein', carbo: '48g Karbo', serat: '9g Serat' },
    onlineOnly: false
  },
  {
    id: 'kale-caesar',
    name: 'Kale Caesar Salad',
    category: 'salads',
    price: 44000,
    calories: '420 kkal',
    image: 'images/kale-caesar.jpg',
    description: 'Dada ayam panggang lembut, parmesan crisps garing, keju parmesan parut asli, daun kale keriting, selada romaine renyah, perasan jeruk nipis segar, dan saus Caesar khas dapur.',
    dietary: ['gluten-free', 'high-protein'],
    macros: { protein: '36g Protein', carbo: '18g Karbo', serat: '7g Serat' },
    onlineOnly: false
  },
  {
    id: 'hummus-focaccia',
    name: 'Roti Focaccia & Hummus Rempah',
    category: 'sides',
    price: 25000,
    calories: '380 kkal',
    image: 'images/hummus-focaccia.jpg',
    description: 'Roti artisan focaccia rosemary bawang putih hangat, hummus lembut paprika merah panggang, acar seledri bawang segar, taburan rempah za\'atar, dan minyak zaitun.',
    dietary: ['vegetarian', 'vegan', 'dairy-free'],
    macros: { protein: '12g Protein', carbo: '42g Karbo', serat: '8g Serat' },
    onlineOnly: false
  }
];

// Helper Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// App State
let currentCategory = 'all';
let currentDietary = 'all';
let cart = [];
let currentCustomizingItem = null;
let currentStoreName = 'Dapur UMKM Senopati, Jaksel (Buka s/d 21.00 WIB)';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initCategoryTabs();
  initDietaryFilters();
  initCart();
  initCustomizerModal();
  initStoreSelector();
  initScrollEffects();
  initFramerMotionEffects();
});

// Render Menu Cards
function initMenu() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = MENU_ITEMS.filter(item => {
    const matchesCategory = currentCategory === 'all' || 
      (currentCategory === 'online-only' ? item.onlineOnly : item.category === currentCategory);
    
    const matchesDiet = currentDietary === 'all' || item.dietary.includes(currentDietary);
    
    return matchesCategory && matchesDiet;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0;">
        <h3 style="font-family: var(--font-sweetsans); font-size: 28px; margin-bottom: 8px;">Tidak ada menu yang sesuai filter</h3>
        <p style="color: var(--color-warm-gray);">Silakan pilih kategori lain atau hapus saringan preferensi diet Anda.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="product-card" data-id="${item.id}">
      <div class="product-image-wrap">
        ${item.onlineOnly ? `<span class="badge-online-only">KHUSUS ONLINE</span>` : ''}
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="product-image" 
          loading="lazy" 
          onclick="openCustomizer('${item.id}')"
          style="cursor: pointer;"
        />
      </div>
      <div class="product-info">
        <div class="product-header-row">
          <h3 class="product-name">${item.name}</h3>
          <span class="product-price">${formatRupiah(item.price)}</span>
        </div>
        <p class="product-desc">${item.description}</p>
        
        <!-- Macro Nutrients Badges -->
        <div class="macro-pills-row">
          <span class="macro-pill">⚡ ${item.calories}</span>
          <span class="macro-pill">💪 ${item.macros.protein}</span>
          <span class="macro-pill">🌾 ${item.macros.carbo}</span>
          <span class="macro-pill">🥗 ${item.macros.serat}</span>
        </div>

        <div class="product-action-row">
          <button class="ghost-text-link" onclick="openCustomizer('${item.id}')">
            Kustomisasi <span class="arrow">→</span>
          </button>
          
          <button class="btn-card-wa" onclick="orderDirectWhatsApp('${item.id}')" title="Pesan langsung lewat WhatsApp">
            <span>💬 Pesan WA</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Animate cards entrance with Framer Motion engine
  animateCardsEntrance();
}

// Category Tabs Handlers
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      initMenu();

      // Motion spring on active tab dot
      if (window.Motion) {
        const dot = tab.querySelector('.tab-dot');
        if (dot) {
          window.Motion.animate(dot, { scale: [0, 1.4, 1] }, { duration: 0.35, easing: 'spring' });
        }
      }
    });
  });
}

// Dietary Filter Chips Handlers
function initDietaryFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentDietary = chip.dataset.diet;
      initMenu();
    });
  });
}

// Customizer Modal
function initCustomizerModal() {
  const modal = document.getElementById('customizer-modal');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const addToBagBtn = document.getElementById('modal-add-btn');

  if (!modal) return;

  window.openCustomizer = function(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    currentCustomizingItem = item;
    document.getElementById('modal-item-title').textContent = item.name;
    document.getElementById('modal-item-desc').textContent = item.description;
    document.getElementById('modal-item-img').src = item.image;
    document.getElementById('modal-base-price').textContent = formatRupiah(item.price);
    
    // Reset add-on checkboxes and selected classes
    document.querySelectorAll('.custom-addon-checkbox').forEach(cb => {
      cb.checked = false;
      cb.closest('.addon-card-item')?.classList.remove('checked');
    });

    // Reset default dressing
    const defaultDressing = document.querySelector('input[name="dressing-level"][value="Sedang"]');
    if (defaultDressing) defaultDressing.checked = true;

    updateModalPrice();

    modal.classList.add('active');
    backdrop.classList.add('active');

    if (window.Motion) {
      window.Motion.animate(modal, { opacity: [0, 1] }, { duration: 0.2 });
    }
  };

  function closeModal() {
    modal.classList.remove('active');
    if (!document.getElementById('cart-drawer')?.classList.contains('active') && !document.getElementById('kitchen-modal')?.classList.contains('active')) {
      backdrop.classList.remove('active');
    }
  }
  window.closeModal = closeModal;

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  backdrop.addEventListener('click', () => {
    closeModal();
    if (window.closeKitchenModal) window.closeKitchenModal();
    if (window.closeCart) window.closeCart();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (window.closeKitchenModal) window.closeKitchenModal();
      if (window.closeCart) window.closeCart();
    }
  });

  // Calculate live customizer price & card checked state
  document.querySelectorAll('.custom-addon-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.addon-card-item')?.classList.toggle('checked', cb.checked);
      updateModalPrice();
    });
  });

  function updateModalPrice() {
    if (!currentCustomizingItem) return;
    let extra = 0;
    document.querySelectorAll('.custom-addon-checkbox:checked').forEach(cb => {
      extra += parseFloat(cb.dataset.price || 0);
    });
    const total = currentCustomizingItem.price + extra;
    if (addToBagBtn) {
      addToBagBtn.innerHTML = `<span>Tambahkan ke Tas • ${formatRupiah(total)}</span>`;
    }
  }

  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (!currentCustomizingItem) return;

      const addons = [];
      let extra = 0;
      document.querySelectorAll('.custom-addon-checkbox:checked').forEach(cb => {
        addons.push(cb.dataset.name);
        extra += parseFloat(cb.dataset.price || 0);
      });

      const dressingLevel = document.querySelector('input[name="dressing-level"]:checked')?.value || 'Sedang';

      addToCart({
        id: currentCustomizingItem.id + '-' + Date.now(),
        itemId: currentCustomizingItem.id,
        name: currentCustomizingItem.name,
        price: currentCustomizingItem.price + extra,
        image: currentCustomizingItem.image,
        dressing: dressingLevel,
        addons: addons,
        quantity: 1
      });

      closeModal();
      showToast(`${currentCustomizingItem.name} ditambahkan ke tas!`);
      openCart();
    });
  }
}

// Cart Drawer System
window.closeCart = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) {
    drawer.classList.remove('active');
    drawer.style.transform = '';
  }
  if (backdrop) {
    if (!document.getElementById('customizer-modal')?.classList.contains('active') && 
        !document.getElementById('kitchen-modal')?.classList.contains('active')) {
      backdrop.classList.remove('active');
    }
  }
};

window.openCart = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return;
  drawer.style.transform = '';
  drawer.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  renderCart();
};

function initCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const openButtons = document.querySelectorAll('[data-action="open-cart"]');
  const closeBtn = document.getElementById('cart-close-btn');

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.openCart();
  }));

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.closeCart();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      window.closeCart();
    });
  }
}

function addToCart(cartItem) {
  cart.push(cartItem);
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = count;
    if (window.Motion && count > 0) {
      window.Motion.animate(b, { scale: [1, 1.4, 1] }, { duration: 0.25 });
    }
  });
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 0;">
        <div style="font-size: 48px; margin-bottom: 12px;">🥗</div>
        <p style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Tas belanja Anda masih kosong</p>
        <p style="color: var(--color-warm-gray); font-size: 14px; margin-bottom: 24px;">Pilih mangkuk warm bowl dan salad organik segar dari dapur UMKM kami.</p>
        <button class="btn-pill-primary" onclick="closeCart()" style="font-size: 14px; padding: 12px 20px;">Lihat Menu Pilihan</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rp 0';
    if (taxEl) taxEl.textContent = 'Rp 0';
    if (totalEl) totalEl.textContent = 'Rp 0';
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const dressingBadge = `<span style="font-size: 12px; color: var(--color-deep-forest); font-weight: 600;">Saus: ${item.dressing}</span>`;
    const addonsText = item.addons && item.addons.length > 0 
      ? `<div style="font-size: 12px; color: var(--color-warm-gray); margin-top: 2px;">+ ${item.addons.join(', ')}</div>` 
      : '';

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatRupiah(itemTotal)}</div>
          <div style="margin-top: 2px;">${dressingBadge}</div>
          ${addonsText}
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateItemQty(${index}, -1)" aria-label="Kurang satu">−</button>
            <span style="font-size: 14px; font-weight: 600; min-width: 16px; text-align: center;">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQty(${index}, 1)" aria-label="Tambah satu">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Pajak restoran / PB1 10%
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (taxEl) taxEl.textContent = formatRupiah(tax);
  if (totalEl) totalEl.textContent = formatRupiah(total);

  // Update navbar preview
  const navPreview = document.getElementById('nav-cart-preview');
  if (navPreview) navPreview.textContent = formatRupiah(subtotal);
}

window.updateItemQty = function(index, change) {
  if (!cart[index]) return;
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartBadge();
  renderCart();
};

// ==========================================================================
// WHATSAPP DIRECT ORDER INTEGRATION
// ==========================================================================

// 1. Checkout seluruh isi keranjang belanja ke WhatsApp
window.checkoutToWhatsApp = function() {
  if (cart.length === 0) {
    showToast('Tas belanja masih kosong. Silakan pilih menu!');
    return;
  }

  let subtotal = 0;
  let itemsListText = '';

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const addonsStr = item.addons && item.addons.length > 0 ? ` (Ekstra: ${item.addons.join(', ')})` : '';
    itemsListText += `${idx + 1}. *${item.name}* x${item.quantity} — ${formatRupiah(itemTotal)}\n   • Saus: ${item.dressing}${addonsStr}\n`;
  });

  const tax = subtotal * 0.10;
  const grandTotal = subtotal + tax;

  const message = 
`Halo Dapur Sweetgreen UMKM Indonesia! 🥗
Saya ingin memesan menu sehat berikut:

📋 *RINCIAN PESANAN:*
${itemsListText}
----------------------------------------
💰 *Subtotal:* ${formatRupiah(subtotal)}
🧾 *Pajak Restoran PB1 (10%):* ${formatRupiah(tax)}
💵 *TOTAL PEMBAYARAN:* *${formatRupiah(grandTotal)}*

📍 *Titik Dapur Pengambilan:*
${currentStoreName}

🛵 *Metode:* Ambil di Gerai / Pengiriman Instan

Mohon konfirmasi ketersediaan dan nomor rekening/QRIS untuk pembayaran ya. Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  closeCart();
  showToast('Mengarahkan ke WhatsApp Dapur Sweetgreen...');
};

// 2. Pesan langsung satu item tertentu via WhatsApp
window.orderDirectWhatsApp = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const message = 
`Halo Sweetgreen UMKM! 🥗
Saya ingin pesan langsung menu:
*${item.name}* — ${formatRupiah(item.price)}
(${item.calories})

📍 *Lokasi Dapur:* ${currentStoreName}

Tolong infokan estimasi waktu penyajian dan metode pembayarannya ya. Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

// 3. Pesan katering kelompok via WhatsApp
window.openCateringWhatsApp = function() {
  const message = 
`Halo Tim Katering Sweetgreen UMKM! 🥗🍱
Saya berminat untuk memesan layanan katering sehat untuk acara/kantor.

📋 *Informasi Acara:*
• Nama Pemesan: 
• Nama Perusahaan / Acara: 
• Estimasi Jumlah Porsi: (min. 10 porsi)
• Tanggal & Waktu Pengiriman: 
• Alamat Pengiriman: 

Mohon informasi daftar paket katering dan penawaran terbaiknya. Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

// 4. Chat Admin Umum via WhatsApp
window.openGeneralWhatsApp = function() {
  const message = 
`Halo Admin Sweetgreen UMKM Indonesia! 🥗
Saya ingin bertanya seputar menu segar, katering, atau kemitraan petani lokal. Terima kasih!`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

// Toast notification
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  
  if (window.Motion) {
    window.Motion.animate(toast, { y: [40, 0], opacity: [0, 1] }, { duration: 0.3, easing: 'spring' });
  }

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Data Gerai & Dapur UMKM
const KITCHENS_DATA = [
  {
    id: 'senopati',
    name: 'Dapur UMKM Senopati, Jaksel',
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
    hours: 'Buka s/d 21.00 WIB',
    status: 'Dapur Aktif • Buka',
    prepTime: 'Estimasi 15 Menit Siap',
    rating: '⭐ 4.9 (420+ Ulasan)',
    distance: '1.2 km dari Anda',
    badge: 'Dapur Pusat'
  },
  {
    id: 'kemang',
    name: 'Dapur UMKM Kemang, Jaksel',
    address: 'Jl. Kemang Raya No. 18, Mampang Prapatan, Jakarta Selatan',
    hours: 'Buka s/d 22.00 WIB',
    status: 'Dapur Aktif • Buka',
    prepTime: 'Estimasi 12 Menit Siap',
    rating: '⭐ 4.9 (380+ Ulasan)',
    distance: '3.5 km dari Anda',
    badge: 'Buka Sampai Malam'
  },
  {
    id: 'dago',
    name: 'Gerai UMKM Dago, Bandung',
    address: 'Jl. Ir. H. Juanda No. 88, Coblong, Kota Bandung',
    hours: 'Buka s/d 21.00 WIB',
    status: 'Dapur Aktif • Panen Lembang',
    prepTime: 'Estimasi 18 Menit Siap',
    rating: '⭐ 5.0 (290+ Ulasan)',
    distance: 'Area Bandung & Sekitarnya',
    badge: 'Sayur Organik Lembang'
  },
  {
    id: 'bsd',
    name: 'Dapur UMKM BSD City, Tangerang',
    address: 'The Breeze BSD City, Cisauk, Tangerang Selatan',
    hours: 'Buka s/d 21.30 WIB',
    status: 'Dapur Aktif • Buka',
    prepTime: 'Estimasi 15 Menit Siap',
    rating: '⭐ 4.8 (210+ Ulasan)',
    distance: 'Area BSD & Tangerang',
    badge: 'Layanan Pengiriman Cepat'
  }
];

let selectedKitchenId = 'senopati';
let currentFulfillmentMode = 'pickup';

// Toggle Metode Pemesanan (Ambil di Gerai / Kirim Instan)
window.setFulfillmentMode = function(mode) {
  currentFulfillmentMode = mode;
  const btnPickup = document.getElementById('btn-pickup');
  const btnDelivery = document.getElementById('btn-delivery');

  if (mode === 'pickup') {
    btnPickup?.classList.add('active');
    btnDelivery?.classList.remove('active');
    showToast('Metode: Ambil Sendiri di Gerai (Siap dalam 15 Menit)');
  } else {
    btnDelivery?.classList.add('active');
    btnPickup?.classList.remove('active');
    showToast('Metode: Pengiriman Instan ke Alamat Anda');
  }

  if (window.Motion) {
    const activeBtn = mode === 'pickup' ? btnPickup : btnDelivery;
    if (activeBtn) window.Motion.animate(activeBtn, { scale: [0.95, 1.05, 1] }, { duration: 0.25 });
  }
};

// Modal Ganti Gerai / Dapur
window.openKitchenModal = function() {
  const modal = document.getElementById('kitchen-modal');
  const backdrop = document.getElementById('drawer-backdrop');
  const listEl = document.getElementById('kitchen-options-list');

  if (!modal || !listEl) return;

  listEl.innerHTML = KITCHENS_DATA.map(k => {
    const isSelected = k.id === selectedKitchenId;
    return `
      <div class="kitchen-option-card ${isSelected ? 'selected' : ''}" onclick="selectKitchen('${k.id}')">
        <div style="display: flex; gap: 14px; align-items: center; flex: 1;">
          <div style="width: 40px; height: 40px; border-radius: 12px; background: ${isSelected ? 'var(--color-deep-forest)' : 'rgba(0,71,60,0.08)'}; color: ${isSelected ? 'var(--color-lime-glow)' : 'var(--color-deep-forest)'}; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">
            📍
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-weight: 700; font-size: 14.5px; color: var(--color-forest-shadow);">${k.name}</span>
              <span style="font-size: 10px; font-weight: 800; background: var(--color-lime-glow); color: var(--color-forest-shadow); padding: 2px 8px; border-radius: 9999px;">${k.badge}</span>
            </div>
            <p style="font-size: 12px; color: var(--color-slate-gray); margin-top: 3px; line-height: 1.35;">${k.address}</p>
            <div style="display: flex; gap: 12px; font-size: 11.5px; color: var(--color-deep-forest); font-weight: 600; margin-top: 5px;">
              <span>🕒 ${k.hours}</span>
              <span>⚡ ${k.prepTime}</span>
              <span>${k.rating}</span>
            </div>
          </div>
        </div>

        <div style="flex-shrink: 0; margin-left: 10px;">
          <span style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; ${isSelected ? 'background: var(--color-deep-forest); color: #ffffff;' : 'border: 1.5px solid rgba(14,21,14,0.15); color: var(--color-forest-shadow); background: #ffffff;'}">
            ${isSelected ? '✓ Terpilih' : 'Pilih Gerai'}
          </span>
        </div>
      </div>
    `;
  }).join('');

  modal.classList.add('active');
  backdrop?.classList.add('active');

  if (window.Motion) {
    window.Motion.animate(modal, { opacity: [0, 1] }, { duration: 0.2 });
  }
};

window.closeKitchenModal = function() {
  const modal = document.getElementById('kitchen-modal');
  const backdrop = document.getElementById('drawer-backdrop');
  modal?.classList.remove('active');
  if (!document.getElementById('cart-drawer')?.classList.contains('active') && !document.getElementById('customizer-modal')?.classList.contains('active')) {
    backdrop?.classList.remove('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const km = document.getElementById('kitchen-modal');
  km?.addEventListener('click', (e) => {
    if (e.target === km) window.closeKitchenModal();
  });
});

window.selectKitchen = function(kitchenId) {
  const kitchen = KITCHENS_DATA.find(k => k.id === kitchenId);
  if (!kitchen) return;

  selectedKitchenId = kitchen.id;
  currentStoreName = kitchen.name;
  
  const labelEl = document.getElementById('current-store-name');
  if (labelEl) {
    labelEl.textContent = kitchen.name;
    if (window.Motion) {
      window.Motion.animate(labelEl, { scale: [0.95, 1.05, 1] }, { duration: 0.3 });
    }
  }

  closeKitchenModal();
  showToast(`Dapur aktif diubah ke: ${kitchen.name}`);
};

function initStoreSelector() {
  // Integrated with modal selector
}

// Scroll Effects (Header elevation)
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// FRAMER MOTION (Motion Engine) ANIMATIONS
// ==========================================================================

function initFramerMotionEffects() {
  if (!window.Motion) {
    console.log('Motion library not loaded, using CSS transitions');
    return;
  }

  const { animate, inView } = window.Motion;

  // 1. Hero Content Entrance Animation with spring
  const heroPanel = document.querySelector('.hero-overlay-panel');
  if (heroPanel) {
    animate(heroPanel, { y: [30, 0], opacity: [0, 1] }, { duration: 0.7, easing: [0.16, 1, 0.3, 1] });
  }

  // 2. Feature Cards Stagger on scroll
  inView('.features-strip-section', () => {
    const cards = document.querySelectorAll('.feature-pill-card');
    cards.forEach((card, index) => {
      animate(card, { y: [30, 0], opacity: [0, 1] }, { duration: 0.5, delay: index * 0.1, easing: 'spring' });
    });
  });

  // 3. Step cards on scroll
  inView('.steps-order-section', () => {
    const steps = document.querySelectorAll('.step-card');
    steps.forEach((step, index) => {
      animate(step, { y: [40, 0], opacity: [0, 1] }, { duration: 0.6, delay: index * 0.15, easing: 'spring' });
    });
  });

  // 4. Testimonials on scroll
  inView('.testimonials-section', () => {
    const items = document.querySelectorAll('.testimonial-card');
    items.forEach((item, index) => {
      animate(item, { scale: [0.94, 1], opacity: [0, 1] }, { duration: 0.5, delay: index * 0.12, easing: 'spring' });
    });
  });

  // 5. Floating WhatsApp Button Continuous Pulse & Hover Spring
  const floatingBtn = document.querySelector('.floating-wa-btn');
  if (floatingBtn) {
    animate(floatingBtn, { scale: [0.8, 1], opacity: [0, 1] }, { duration: 0.5, delay: 0.6, easing: 'spring' });
  }
}

function animateCardsEntrance() {
  if (!window.Motion) return;
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    window.Motion.animate(card, { y: [20, 0], opacity: [0, 1] }, { duration: 0.4, delay: index * 0.08, easing: [0.16, 1, 0.3, 1] });
  });
}
