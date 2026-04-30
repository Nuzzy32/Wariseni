document.addEventListener("DOMContentLoaded", () => {
  injectFigmaHeader();
  renderAuthHeader();
  initAuthHeaderMenu();
  initMiniCartWidgets();
  updateCartBadges();
  renderNotificationCenter();
  initNotificationCenter();
  initAccountDrawer();
  setActiveNav();
  initScrollReveal();
  bindInlineForms();
  bindMarketplaceFilters();
  bindProductDetailLinks();
  initSearchEnhancements();
  initWishlistButtons();
  bindExploreCtas();
  renderMobileCommerceNav();
  renderGlobalChatWidget();
  initGlobalChatWidget();
  bindServiceFilters();
  renderAccountCommerce();
  bindSettingsForm();
  bindCustomerAccountControls();
  bindForgotPasswordFlow();
  bindVerificationFlow();
  bindDashboardTheme();
  renderNotificationsPage();
});

function injectFigmaHeader() {
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const trackingHref = inPagesDir ? (pagesDepth > 0 ? '../order-tracking.html' : 'order-tracking.html') : 'pages/order-tracking.html';
  const body = document.body;
  if (!body) return;
  if (body.classList.contains("auth-page")) {
    body.classList.remove("figma-header-ready");
    document.querySelector(".figma-header")?.remove();
    return;
  }
  if (body.classList.contains("seller-dashboard-page")) {
    body.classList.remove("figma-header-ready");
    document.querySelector(".figma-header")?.remove();
    return;
  }
  if (document.querySelector(".figma-header")) return;

  const wrapper = document.createElement("header");
  wrapper.className = "figma-header sticky top-0 z-50 border-b border-stone-100 bg-white/95 shadow-[0_1px_10px_rgba(15,23,42,0.06)] backdrop-blur-md";
  wrapper.innerHTML = `
    <div class="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between gap-6 px-8">
      <a class="flex w-36 items-center gap-2.5 text-slate-900" href="${prefix}index.html" aria-label="Karya Lokal">
        <img class="h-8 w-8 shrink-0" src="${prefix}assets/icons/logo-bag.svg" alt="" aria-hidden="true" />
        <span class="text-xl font-extrabold leading-5 tracking-[-0.02em]">Karya<br />Lokal</span>
      </a>

      <label class="relative hidden flex-1 lg:block" aria-label="Pencarian">
        <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#896B61]">
          <svg class="h-[18px] w-[18px]" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M16.6 18 10.3 11.7M12 6.5A5.5 5.5 0 1 1 1 6.5a5.5 5.5 0 0 1 11 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </span>
        <input class="h-11 w-full max-w-[576px] rounded-lg bg-stone-100 pl-11 pr-4 text-base text-slate-800 outline-none placeholder:text-stone-500 focus:ring-2 focus:ring-orange-500/25" data-site-search type="search" placeholder="Cari produk atau jasa..." />
      </label>

      <nav class="hidden items-center gap-6 text-sm text-gray-500 lg:flex" aria-label="Navigasi utama">
        <a class="inline-flex items-center gap-1.5 hover:text-orange-600" href="${trackingHref}">
          <img class="h-5 w-5" src="${prefix}assets/icons/map-pin-line.svg" alt="" aria-hidden="true" />
          Lacak Order
        </a>
        <a class="inline-flex items-center gap-1.5 hover:text-orange-600" href="${inPagesDir ? (pagesDepth > 0 ? '../auth/forgot-password.html' : 'auth/forgot-password.html') : 'pages/auth/forgot-password.html'}">
          <img class="h-5 w-5" src="${prefix}assets/icons/headphones.svg" alt="" aria-hidden="true" />
          Customer Support
        </a>
        <a class="hover:text-orange-600" href="${prefix}index.html#footer">Tentang Kami</a>
      </nav>

      <div class="flex items-center gap-4 border-l border-neutral-200 pl-6">
        ${createMiniCartMarkup(prefix, inPagesDir)}
        <div data-auth-header-slot></div>
      </div>
    </div>
  `;

  body.prepend(wrapper);
  injectPageBreadcrumb(body, wrapper, prefix, inPagesDir);
  createAccountDrawer(body, prefix, inPagesDir);
  body.classList.add("figma-header-ready");
}

function createMiniCartMarkup(prefix, inPagesDir) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const cartHref = inPagesDir ? (pagesDepth > 0 ? '../cart.html' : 'cart.html') : 'pages/cart.html';
  return `
    <div class="relative" data-mini-cart-widget data-mini-cart-prefix="${prefix}">
      <button
        class="group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-orange-300 hover:text-orange-600 hover:shadow-md"
        aria-label="Keranjang belanja"
        aria-haspopup="true"
        aria-expanded="false"
        type="button"
        data-mini-cart-button
      >
        <svg class="h-5 w-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M1 1h2.5l1.68 8.39a2 2 0 0 0 2 1.61h7.64a2 2 0 0 0 1.97-1.65L17.5 4H5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9" cy="20" r="1.2" fill="currentColor"/>
          <circle cx="16" cy="20" r="1.2" fill="currentColor"/>
        </svg>
        <span class="absolute -right-0.5 -top-0.5 hidden h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white shadow-sm" aria-hidden="true" data-cart-badge>0</span>
      </button>

      <div
        role="dialog"
        aria-label="Pratinjau keranjang"
        class="pointer-events-none absolute right-0 top-[calc(100%+12px)] z-50 w-[360px] origin-top-right scale-95 rounded-2xl border border-neutral-100 bg-white opacity-0 shadow-[0_8px_32px_rgba(15,23,42,0.12)] transition-all duration-200 ease-out"
        data-mini-cart-panel
      >
        <div class="absolute -top-2 right-4 h-4 w-4 rotate-45 rounded-sm border-l border-t border-neutral-100 bg-white"></div>
        <div class="px-5 pb-5 pt-4">
          <div class="mb-4 flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">Baru Ditambahkan</p>
            <button class="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-stone-100 hover:text-slate-600" aria-label="Tutup" type="button" data-mini-cart-close>
              <svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1 1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            </button>
          </div>
          <ul class="space-y-3" data-mini-cart-items></ul>
          <div class="mt-4 border-t border-neutral-100 pt-4">
            <div class="flex items-center justify-between text-sm" data-mini-cart-summary></div>
            <a
              href="${cartHref}"
              class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(234,88,12,0.3)] transition-all duration-200 hover:bg-orange-700 hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)] active:scale-[0.98]"
            >
              Tampilkan Keranjang Belanja
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAuthHeader() {
  const slots = [
    ...document.querySelectorAll("[data-auth-header-slot]"),
    ...document.querySelectorAll("#authHeaderSlot"),
  ];
  if (!slots.length) return;

  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const loginHref = inPagesDir ? (pagesDepth > 0 ? '../auth/login.html' : 'auth/login.html') : 'pages/auth/login.html';
  const settingsHref = inPagesDir ? (pagesDepth > 0 ? '../settings/settings.html' : 'settings/settings.html') : 'pages/settings/settings.html';
  const dashboardHref = inPagesDir ? (pagesDepth > 0 ? '../seller/dashboard.html' : 'seller/dashboard.html') : 'pages/seller/dashboard.html';
  const session = window.KL?.getSession?.();

  slots.forEach((slot) => {
    slot.setAttribute("data-auth-rendered", "true");
    if (!session) {
      slot.innerHTML = `<a class="inline-flex h-10 items-center justify-center rounded-lg bg-orange-600 px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(234,88,12,0.22)] transition hover:bg-orange-700" href="${loginHref}">Login</a>`;
      return;
    }

    const avatar = session.avatar
      ? `<img class="h-7 w-7 rounded-full object-cover" src="${resolveSessionAvatar(session.avatar, prefix)}" alt="" />`
      : `<span class="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">${escapeHtml(session.name || "U").charAt(0)}</span>`;
    const dashboardLink = session.role === "seller"
      ? `<a class="block px-4 py-2 text-sm text-slate-700 hover:bg-stone-100" href="${dashboardHref}">Dashboard</a>`
      : "";

    slot.innerHTML = `
      <div class="relative" data-auth-menu>
        <button class="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:shadow-md" type="button" aria-haspopup="true" aria-expanded="false" data-auth-menu-toggle>
          ${avatar}
          <span class="hidden max-w-[140px] truncate sm:inline">${escapeHtml(session.name)}</span>
          <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 4.5l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="pointer-events-none absolute right-0 top-[calc(100%+8px)] z-50 min-w-[176px] origin-top-right scale-95 rounded-xl border border-neutral-100 bg-white opacity-0 shadow-lg transition-all duration-150" data-auth-menu-dropdown>
          <div class="border-b border-neutral-100 px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">${escapeHtml(session.role)}</p>
            <p class="mt-0.5 text-sm font-bold text-slate-900">${escapeHtml(session.name)}</p>
          </div>
          ${dashboardLink}
          <a class="block px-4 py-2 text-sm text-slate-700 hover:bg-stone-100" href="${settingsHref}">Pengaturan</a>
          <button class="flex w-full items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" type="button" data-auth-logout>Keluar</button>
        </div>
      </div>
    `;
  });
}

function resolveSessionAvatar(src, prefix) {
  const value = String(src || "");
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  return `${prefix}${value.replace(/^(\.\.\/)+/, "")}`;
}

function setAuthMenuOpen(menu, isOpen) {
  const toggle = menu?.querySelector("[data-auth-menu-toggle]");
  const dropdown = menu?.querySelector("[data-auth-menu-dropdown]");
  if (!toggle || !dropdown) return;

  dropdown.classList.toggle("opacity-0", !isOpen);
  dropdown.classList.toggle("scale-95", !isOpen);
  dropdown.classList.toggle("pointer-events-none", !isOpen);
  dropdown.classList.toggle("opacity-100", isOpen);
  dropdown.classList.toggle("scale-100", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
}

function initAuthHeaderMenu() {
  document.addEventListener("click", (event) => {
    const menu = event.target.closest("[data-auth-menu]");
    document.querySelectorAll("[data-auth-menu]").forEach((item) => {
      if (item !== menu) setAuthMenuOpen(item, false);
    });

    if (event.target.closest("[data-auth-logout]")) {
      window.KL?.logout?.();
      return;
    }

    const toggle = event.target.closest("[data-auth-menu-toggle]");
    if (!toggle || !menu) return;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setAuthMenuOpen(menu, !isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-auth-menu]").forEach((menu) => setAuthMenuOpen(menu, false));
  });
}

function injectPageBreadcrumb(body, header, prefix, inPagesDir) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  if (document.querySelector("[data-page-breadcrumb]")) return;

  const page = body.dataset.page;
  const pageMap = {
    explore: [{ label: "Jelajahi" }],
    marketplace: [{ label: "Jelajahi", href: inPagesDir ? (pagesDepth > 0 ? '../explore.html' : 'explore.html') : 'pages/explore.html' }, { label: "Marketplace" }],
    services: [{ label: "Jelajahi", href: inPagesDir ? (pagesDepth > 0 ? '../explore.html' : 'explore.html') : 'pages/explore.html' }, { label: "Jasa" }],
    auction: [{ label: "Jelajahi", href: inPagesDir ? (pagesDepth > 0 ? '../explore.html' : 'explore.html') : 'pages/explore.html' }, { label: "Lelang" }],
    "product-detail": [{ label: "Marketplace", href: inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html' }, { label: "Detail Produk" }],
    "provider-profile": [{ label: "Jelajahi", href: inPagesDir ? (pagesDepth > 0 ? '../explore.html' : 'explore.html') : 'pages/explore.html' }, { label: "Profil Kreator" }],
    cart: [{ label: "Keranjang" }],
    checkout: [{ label: "Keranjang", href: inPagesDir ? (pagesDepth > 0 ? '../cart.html' : 'cart.html') : 'pages/cart.html' }, { label: "Checkout" }],
    "order-success": [{ label: "Keranjang", href: inPagesDir ? (pagesDepth > 0 ? '../cart.html' : 'cart.html') : 'pages/cart.html' }, { label: "Pesanan Berhasil" }],
    settings: [{ label: "Account Setting" }],
    notifications: [{ label: "Notifikasi" }],
    tracking: [{ label: "Lacak Order" }],
  };

  const trail = pageMap[page];
  if (!trail) return;

  const homeHref = `${prefix}index.html`;
  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "border-b border-slate-900/5 bg-white/70";
  breadcrumb.setAttribute("aria-label", "Breadcrumb");
  breadcrumb.setAttribute("data-page-breadcrumb", "");
  breadcrumb.innerHTML = `
    <div class="mx-auto max-w-[1280px] px-8 py-3">
      <ol class="flex flex-wrap items-center gap-2 text-sm font-medium leading-5 text-neutral-900 sm:text-base">
        <li>
          <a class="text-neutral-900 transition hover:text-orange-600" href="${homeHref}">Home</a>
        </li>
        ${trail.map((item, index) => `
          <li class="flex items-center gap-2">
            <svg class="h-3.5 w-3.5 text-neutral-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m7.5 4 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            ${item.href && index !== trail.length - 1
              ? `<a class="text-neutral-900 transition hover:text-orange-600" href="${item.href}">${item.label}</a>`
              : `<span ${index === trail.length - 1 ? 'aria-current="page"' : ""}>${item.label}</span>`}
          </li>
        `).join("")}
      </ol>
    </div>
  `;

  header.insertAdjacentElement("afterend", breadcrumb);
}

function createCartDrawer(body, prefix, inPagesDir) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  if (document.querySelector("[data-cart-drawer]")) return;

  const marketplaceHref = inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html';
  const ordersHref = inPagesDir ? (pagesDepth > 0 ? '../settings/settings-orders.html' : 'settings/settings-orders.html') : 'pages/settings/settings-orders.html';
  const supportHref = inPagesDir ? (pagesDepth > 0 ? '../auth/forgot-password.html' : 'auth/forgot-password.html') : 'pages/auth/forgot-password.html';

  const drawer = document.createElement("div");
  drawer.className = "cart-drawer";
  drawer.id = "cartDrawer";
  drawer.setAttribute("data-cart-drawer", "");
  drawer.innerHTML = `
    <button class="cart-drawer__backdrop" type="button" aria-label="Tutup drawer keranjang" data-cart-close></button>
    <aside class="cart-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cartDrawerTitle">
      <div class="flex min-h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">Keranjang Anda</p>
            <h2 id="cartDrawerTitle" class="mt-2 font-display text-3xl leading-none tracking-[-0.04em] text-cocoa-900">Kurasi pilihan siap dibawa pulang.</h2>
            <p class="mt-3 max-w-sm text-sm leading-7 text-muted">Daftar belanja ini disusun seperti etalase pribadi: hangat, rapi, dan siap menuju checkout.</p>
          </div>
          <button class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-cocoa-900 shadow-soft transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Tutup drawer" data-cart-close>
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 3.5 12.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
              <path d="M12.5 3.5 3.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>

        <div class="mt-6 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-soft">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Ringkasan</p>
              <p class="mt-2 text-lg font-semibold text-cocoa-900">3 item dari artisan berbeda</p>
            </div>
            <span class="inline-flex items-center rounded-full bg-clay-50 px-3 py-1 text-xs font-semibold text-clay-700">Subtotal aktif</span>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Item</p>
              <strong class="mt-2 block text-xl text-cocoa-900">3</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Artisan</p>
              <strong class="mt-2 block text-xl text-cocoa-900">3</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Kurir</p>
              <strong class="mt-2 block text-xl text-cocoa-900">Express</strong>
            </div>
          </div>
        </div>

        <div class="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
          <article class="rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-soft">
            <div class="flex gap-4">
              <img class="h-24 w-20 rounded-[1.25rem] object-cover" src="${prefix}assets/images/marketplace/rattan-bag.png" alt="Tas Rotan Bulat Premium" />
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-700">Anyaman Lombok</p>
                    <h3 class="mt-2 text-base font-semibold leading-6 text-cocoa-900">Tas Rotan Bulat Premium</h3>
                  </div>
                  <button class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-muted transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Hapus item dari keranjang">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4.5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M6.2 4.5V3.5C6.2 3.224 6.424 3 6.7 3H9.3C9.576 3 9.8 3.224 9.8 3.5V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M5 6.2V11C5 11.552 5.448 12 6 12H10C10.552 12 11 11.552 11 11V6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    </svg>
                  </button>
                </div>
                <p class="mt-2 text-sm text-muted">Natural tan • Qty 1</p>
                <div class="mt-4 flex items-center justify-between gap-3">
                  <span class="inline-flex items-center rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold text-muted">Siap dikirim besok</span>
                  <strong class="text-base text-cocoa-900">Rp 250.000</strong>
                </div>
              </div>
            </div>
          </article>

          <article class="rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-soft">
            <div class="flex gap-4">
              <img class="h-24 w-20 rounded-[1.25rem] object-cover" src="${prefix}assets/images/marketplace/ceramic-mug.png" alt="Mug Keramik Hand-made Bali" />
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-700">Studio Keramik Bali</p>
                    <h3 class="mt-2 text-base font-semibold leading-6 text-cocoa-900">Mug Keramik Hand-made Bali</h3>
                  </div>
                  <button class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-muted transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Hapus item dari keranjang">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4.5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M6.2 4.5V3.5C6.2 3.224 6.424 3 6.7 3H9.3C9.576 3 9.8 3.224 9.8 3.5V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M5 6.2V11C5 11.552 5.448 12 6 12H10C10.552 12 11 11.552 11 11V6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    </svg>
                  </button>
                </div>
                <p class="mt-2 text-sm text-muted">Glasir pasir • Qty 1</p>
                <div class="mt-4 flex items-center justify-between gap-3">
                  <span class="inline-flex items-center rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold text-muted">Pre-order 2 hari</span>
                  <strong class="text-base text-cocoa-900">Rp 150.000</strong>
                </div>
              </div>
            </div>
          </article>

          <article class="rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-soft">
            <div class="flex gap-4">
              <img class="h-24 w-20 rounded-[1.25rem] object-cover" src="${prefix}assets/images/marketplace/wooden-decor.png" alt="Mangkuk Kayu Jati Ukir" />
              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-700">Jepara Woodcraft</p>
                    <h3 class="mt-2 text-base font-semibold leading-6 text-cocoa-900">Mangkuk Kayu Jati Ukir</h3>
                  </div>
                  <button class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-muted transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Hapus item dari keranjang">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 4.5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M6.2 4.5V3.5C6.2 3.224 6.424 3 6.7 3H9.3C9.576 3 9.8 3.224 9.8 3.5V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M5 6.2V11C5 11.552 5.448 12 6 12H10C10.552 12 11 11.552 11 11V6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    </svg>
                  </button>
                </div>
                <p class="mt-2 text-sm text-muted">Ukir natural • Qty 1</p>
                <div class="mt-4 flex items-center justify-between gap-3">
                  <span class="inline-flex items-center rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold text-muted">Siap gift wrap</span>
                  <strong class="text-base text-cocoa-900">Rp 85.000</strong>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-6 rounded-[1.75rem] border border-white/70 bg-white/88 p-5 shadow-soft">
          <div class="flex items-center justify-between gap-4 text-sm">
            <span class="text-muted">Subtotal</span>
            <strong class="text-lg text-cocoa-900">Rp 485.000</strong>
          </div>
          <div class="mt-3 flex items-center justify-between gap-4 text-sm">
            <span class="text-muted">Proteksi pengiriman</span>
            <span class="font-semibold text-emerald-700">Gratis</span>
          </div>
          <div class="mt-4 rounded-2xl bg-sand-50/85 px-4 py-4">
            <p class="text-sm leading-7 text-muted">Tambah satu produk lagi untuk mendapat kurasi packing premium dan kartu cerita artisan.</p>
          </div>
          <div class="mt-5 grid gap-3">
            <a class="btn--dark w-full" href="${ordersHref}" data-cart-dismiss>Review Pesanan</a>
            <a class="btn--light w-full" href="${marketplaceHref}" data-cart-dismiss>Lanjut Belanja</a>
          </div>
          <a class="mt-4 inline-flex items-center justify-center text-sm text-link" href="${supportHref}" data-cart-dismiss>Butuh bantuan pesanan?</a>
        </div>
      </div>
    </aside>
  `;

  body.append(drawer);
  renderCartDrawer(prefix, inPagesDir);
}

function getCartApi() {
  return window.KaryaCart || null;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveCartAsset(src, prefix) {
  const value = String(src || "");
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  return `${prefix}${value.replace(/^(\.\.\/)+/, "")}`;
}

function getNotificationItems(prefix) {
  const cart = getCartApi();
  const orders = cart?.getOrders?.() || [];
  const wishlist = cart?.getWishlist?.() || [];
  const notifications = [];

  if (orders[0]) {
    notifications.push({
      type: "order",
      tone: "bg-orange-100 text-orange-700",
      title: `Order ${orders[0].id} dibuat`,
      body: `${orders[0].status || "Menunggu Pembayaran"} - ${cart.formatRupiah(orders[0].summary?.total || 0)}`,
      time: "Baru saja",
      href: `${prefix}pages/order-tracking.html?order=${encodeURIComponent(orders[0].id)}`.replace("pages/pages/", "pages/"),
      unread: true,
    });
  }

  notifications.push(
    {
      type: "payment",
      tone: "bg-amber-100 text-amber-700",
      title: "Pembayaran menunggu konfirmasi",
      body: "Selesaikan pembayaran agar seller bisa memproses pesanan.",
      time: "12 menit",
      href: `${prefix}pages/cart.html`.replace("pages/pages/", "pages/"),
      unread: true,
    },
    {
      type: "shipping",
      tone: "bg-emerald-100 text-emerald-700",
      title: "Paket siap dikirim",
      body: "Anyaman Lombok menyiapkan resi pengiriman untuk pesananmu.",
      time: "1 jam",
      href: `${prefix}pages/order-tracking.html`.replace("pages/pages/", "pages/"),
      unread: false,
    },
    {
      type: "promo",
      tone: "bg-clay-50 text-clay-700",
      title: wishlist.length ? "Wishlist kamu ada promo" : "Promo kurasi minggu ini",
      body: wishlist.length ? `${wishlist[0].title} masuk rekomendasi diskon artisan.` : "Produk keramik, rotan, dan batik sedang dikurasi khusus.",
      time: "Hari ini",
      href: `${prefix}pages/marketplace.html`.replace("pages/pages/", "pages/"),
      unread: true,
    },
    {
      type: "review",
      tone: "bg-sand-100 text-cocoa-800",
      title: "Review reminder",
      body: "Beri ulasan setelah produk diterima untuk bantu pembeli lain.",
      time: "Kemarin",
      href: `${prefix}pages/settings/settings-orders.html`.replace("pages/pages/", "pages/"),
      unread: false,
    },
  );

  return notifications;
}

function createNotificationMarkup(prefix) {
  const notifications = getNotificationItems(prefix);
  const unreadCount = notifications.filter((item) => item.unread).length;
  const allHref = `${prefix}pages/notifications.html`.replace("pages/pages/", "pages/");
  return `
    <div class="notification-widget relative" data-notification-widget>
      <button class="notification-button" type="button" aria-label="Buka notifikasi" aria-haspopup="true" aria-expanded="false" data-notification-toggle>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15 7.5A5 5 0 0 0 5 7.5v2.9l-1.2 2.4h12.4L15 10.4V7.5ZM8 15.5h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${unreadCount ? `<span class="notification-badge">${unreadCount}</span>` : ""}
      </button>
      <div class="notification-panel" role="dialog" aria-label="Notifikasi" data-notification-panel>
        <div class="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Pusat Notifikasi</p>
            <h2 class="mt-1 text-base font-extrabold text-slate-900">${unreadCount} update baru</h2>
          </div>
          <a class="text-xs font-bold text-orange-600 hover:text-orange-700" href="${allHref}">Lihat semua</a>
        </div>
        <div class="max-h-[22rem] overflow-y-auto p-3">
          ${notifications.slice(0, 5).map((item) => `
            <a class="notification-item" href="${item.href}">
              <span class="notification-dot ${item.tone}">
                ${item.type.charAt(0).toUpperCase()}
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-start justify-between gap-3">
                  <strong class="block text-sm text-slate-900">${escapeHtml(item.title)}</strong>
                  <span class="shrink-0 text-[11px] font-semibold text-slate-400">${escapeHtml(item.time)}</span>
                </span>
                <span class="mt-1 block text-xs leading-5 text-slate-500">${escapeHtml(item.body)}</span>
              </span>
              ${item.unread ? `<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-600"></span>` : ""}
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderNotificationCenter() {
  if (document.body.classList.contains("auth-page") || document.querySelector("[data-notification-widget]")) return;
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const authSlot = document.querySelector(".figma-header [data-auth-header-slot], .figma-header #authHeaderSlot");
  if (!authSlot?.parentElement) return;

  const template = document.createElement("template");
  template.innerHTML = createNotificationMarkup(prefix).trim();
  authSlot.parentElement.insertBefore(template.content.firstElementChild, authSlot);
}

function initNotificationCenter() {
  const widget = document.querySelector("[data-notification-widget]");
  if (!widget || widget.dataset.bound === "true") return;
  widget.dataset.bound = "true";

  const toggle = widget.querySelector("[data-notification-toggle]");
  const panel = widget.querySelector("[data-notification-panel]");
  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("click", (event) => {
    if (!widget.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function getChatThreads(prefix) {
  const asset = (src) => resolveCartAsset(src, prefix);
  return [
    {
      id: "surya",
      name: "Surya Art Studio",
      avatar: asset("assets/images/0a786b17ad9c47ca2d8136bacb46d840c330f804.png"),
      status: "Online",
      time: "19:18",
      unread: 2,
      preview: "Kirim foto, mood warna, dan deadline ya.",
      messages: [
        { from: "seller", text: "Halo, boleh ceritakan brief ilustrasinya untuk kebutuhan apa?", time: "09.12" },
        { from: "me", text: "Aku butuh portrait realis untuk hadiah, dari satu foto referensi.", time: "09.14" },
        { from: "seller", text: "Bisa. Untuk portrait realis, paket Full Color biasanya paling pas.", time: "09.15" },
        { from: "seller", text: "Kirim foto, mood warna, dan deadline. Nanti aku bantu susun penawarannya.", time: "09.16" },
      ],
    },
    {
      id: "ceramic",
      name: "Studio Keramik Bali",
      avatar: asset("assets/images/marketplace/ceramic-mug.png"),
      status: "Aktif 8 menit lalu",
      time: "Jumat",
      unread: 1,
      preview: "Mug pasir masih ready, kak.",
      messages: [
        { from: "seller", text: "Halo kak, mug keramik glasir pasir masih ready.", time: "13.02" },
        { from: "me", text: "Bisa kirim dua warna yang paling netral?", time: "13.05" },
        { from: "seller", text: "Bisa kak. Ivory dan sand beige paling aman untuk hadiah.", time: "13.07" },
      ],
    },
    {
      id: "lombok",
      name: "Anyaman Lombok",
      avatar: asset("assets/images/marketplace/rattan-bag.png"),
      status: "Aktif hari ini",
      time: "22/03",
      unread: 0,
      preview: "Tas rotan natural tan bisa dikirim besok.",
      messages: [
        { from: "seller", text: "Tas rotan natural tan bisa dikirim besok dari Lombok.", time: "10.44" },
        { from: "me", text: "Untuk packaging hadiah ada opsi tambahan?", time: "10.47" },
        { from: "seller", text: "Ada dust bag dan kartu ucapan, kak.", time: "10.48" },
      ],
    },
    {
      id: "jepara",
      name: "Jepara Woodcraft",
      avatar: asset("assets/images/marketplace/wooden-decor.png"),
      status: "Aktif kemarin",
      time: "01/03",
      unread: 1,
      preview: "Ukiran custom nama bisa.",
      messages: [
        { from: "seller", text: "Ukiran custom nama bisa, estimasi tambah 2 hari.", time: "15.31" },
        { from: "me", text: "Kalau untuk corporate gift minimal berapa?", time: "15.35" },
      ],
    },
    {
      id: "batik",
      name: "Batik Sogan Solo",
      avatar: asset("assets/images/marketplace/batik-cloth.png"),
      status: "Aktif 2 hari lalu",
      time: "11/01",
      unread: 0,
      preview: "Motif parang ukuran 2 meter ready.",
      messages: [
        { from: "seller", text: "Motif parang ukuran 2 meter ready. Warna sogan lebih hangat dari foto.", time: "08.21" },
        { from: "me", text: "Oke kak, aku cek dulu ukurannya.", time: "08.24" },
      ],
    },
  ];
}

function renderGlobalChatWidget() {
  const body = document.body;
  if (!body || body.classList.contains("auth-page") || document.querySelector("[data-commerce-chat-widget]")) return;

  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const threads = getChatThreads(prefix);
  const totalUnread = threads.reduce((sum, thread) => sum + thread.unread, 0);

  const widget = document.createElement("div");
  widget.className = "commerce-chat-widget";
  widget.setAttribute("data-commerce-chat-widget", "");
  widget.dataset.activeThread = "";
  widget.innerHTML = `
    <section class="commerce-chat-panel" aria-label="Chat Karya Lokal" aria-hidden="true">
      <header class="commerce-chat-header">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">Chat</p>
          <h2 class="mt-0.5 text-xl font-extrabold tracking-[-0.02em] text-cocoa-900">Pesan (${totalUnread})</h2>
        </div>
        <div class="flex items-center gap-2">
          <button class="commerce-chat-icon-button" type="button" data-commerce-chat-minimize aria-label="Minimize chat">
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
          <button class="commerce-chat-icon-button" type="button" data-commerce-chat-close aria-label="Tutup chat">
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
      </header>

      <div class="commerce-chat-body">
        <aside class="commerce-chat-list" aria-label="Daftar percakapan">
          <div class="commerce-chat-search">
            <svg class="h-4 w-4 shrink-0 text-muted" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M16.6 18 10.3 11.7M12 6.5A5.5 5.5 0 1 1 1 6.5a5.5 5.5 0 0 1 11 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <input type="search" placeholder="Cari nama" aria-label="Cari nama chat" data-commerce-chat-search />
          </div>
          <div class="mt-3 flex items-center justify-between px-1 text-sm">
            <span class="font-semibold text-cocoa-900">Semua</span>
            <span class="text-xs font-semibold text-muted">${threads.length} chat</span>
          </div>
          <div class="commerce-chat-threads" data-commerce-chat-list>
            ${threads.map((thread) => `
              <button class="commerce-chat-thread" type="button" data-commerce-chat-thread="${escapeHtml(thread.id)}" data-chat-name="${escapeHtml(thread.name.toLowerCase())}">
                <img class="h-12 w-12 rounded-full object-cover" src="${thread.avatar}" alt="" />
                <span class="min-w-0 flex-1 text-left">
                  <span class="flex items-center justify-between gap-3">
                    <strong class="block truncate text-sm font-extrabold text-cocoa-900">${escapeHtml(thread.name)}</strong>
                    <span class="shrink-0 text-xs font-medium text-muted">${escapeHtml(thread.time)}</span>
                  </span>
                  <span class="mt-1 flex items-center justify-between gap-3">
                    <span class="block truncate text-sm text-muted">${escapeHtml(thread.preview)}</span>
                    ${thread.unread ? `<span class="commerce-chat-unread">${thread.unread}</span>` : ""}
                  </span>
                </span>
              </button>
            `).join("")}
          </div>
        </aside>

        <section class="commerce-chat-conversation" data-commerce-chat-conversation>
          <div class="commerce-chat-empty" data-commerce-chat-empty>
            <svg class="h-24 w-24 text-clay-500" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <rect x="28" y="24" width="64" height="50" rx="10" fill="currentColor" opacity="0.14"/>
              <path d="M36 42h38M36 54h24M36 66h32" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
              <path d="M70 62h26a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8H82l-14 10V88h2a8 8 0 0 1-8-8V70a8 8 0 0 1 8-8Z" fill="#C45320"/>
              <circle cx="78" cy="75" r="3" fill="white"/><circle cx="87" cy="75" r="3" fill="white"/><circle cx="96" cy="75" r="3" fill="white"/>
            </svg>
            <h3 class="mt-4 text-xl font-extrabold tracking-[-0.02em] text-cocoa-900">Selamat Datang di Chat Karya Lokal</h3>
            <p class="mt-2 max-w-sm text-center text-sm leading-6 text-muted">Pilih salah satu seller di kiri untuk lanjut ngobrol soal produk, jasa, atau pesanan.</p>
          </div>
        </section>
      </div>
    </section>

    <button class="commerce-chat-fab" type="button" data-commerce-chat-toggle aria-label="Buka chat">
      ${totalUnread ? `<span class="commerce-chat-fab__badge" aria-hidden="true">${totalUnread}</span>` : ""}
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2h5A3.5 3.5 0 0 1 16 5.5v4A3.5 3.5 0 0 1 12.5 13H9l-4.5 3v-3.25A3.5 3.5 0 0 1 2 9.4V5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
      <span>Chat</span>
    </button>
  `;

  body.append(widget);
}

function initGlobalChatWidget() {
  const widget = document.querySelector("[data-commerce-chat-widget]");
  if (!widget || widget.dataset.bound === "true") return;

  widget.dataset.bound = "true";
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const threads = getChatThreads(prefix);
  const panel = widget.querySelector(".commerce-chat-panel");
  const conversation = widget.querySelector("[data-commerce-chat-conversation]");
  const search = widget.querySelector("[data-commerce-chat-search]");
  const threadButtons = [...widget.querySelectorAll("[data-commerce-chat-thread]")];

  const setOpen = (isOpen) => {
    widget.classList.toggle("is-open", isOpen);
    panel?.setAttribute("aria-hidden", String(!isOpen));
  };

  const renderThread = (threadId) => {
    const thread = threads.find((item) => item.id === threadId);
    if (!thread || !conversation) return;

    widget.dataset.activeThread = thread.id;
    threadButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.commerceChatThread === thread.id));
    conversation.innerHTML = `
      <div class="commerce-chat-room-header">
        <img class="h-11 w-11 rounded-full object-cover" src="${thread.avatar}" alt="" />
        <div class="min-w-0 flex-1">
          <h3 class="truncate text-base font-extrabold text-cocoa-900">${escapeHtml(thread.name)}</h3>
          <p class="mt-0.5 text-xs font-medium text-success">${escapeHtml(thread.status)}</p>
        </div>
      </div>
      <div class="commerce-chat-message-list" data-commerce-chat-message-list>
        ${thread.messages.map((message) => `
          <div class="chat ${message.from === "me" ? "chat-end" : "chat-start"}">
            ${message.from === "seller" ? `<div class="chat-image avatar"><div class="w-10"><img src="${thread.avatar}" alt="" /></div></div>` : ""}
            <div>
              <div class="chat-bubble">${escapeHtml(message.text)}</div>
              <p class="chat-meta ${message.from === "me" ? "text-right" : ""}">${message.from === "me" ? "Kamu" : escapeHtml(thread.name.split(" ")[0])} · ${escapeHtml(message.time)}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <form class="commerce-chat-compose" data-commerce-chat-form>
        <label class="sr-only" for="commerceChatMessage">Tulis pesan</label>
        <input id="commerceChatMessage" type="text" placeholder="Tulis pesan..." autocomplete="off" />
        <button type="submit" aria-label="Kirim pesan">
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8 14 2 9.5 14 7.5 8.8 2 8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </button>
      </form>
    `;

    const messageList = conversation.querySelector("[data-commerce-chat-message-list]");
    const form = conversation.querySelector("[data-commerce-chat-form]");
    const input = form?.querySelector("input");
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
    window.setTimeout(() => input?.focus(), 100);

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text || !messageList) return;
      messageList.insertAdjacentHTML("beforeend", `
        <div class="chat chat-end">
          <div>
            <div class="chat-bubble"></div>
            <p class="chat-meta text-right">Kamu · baru saja</p>
          </div>
        </div>
      `);
      messageList.querySelector(".chat:last-child .chat-bubble").textContent = text;
      input.value = "";
      messageList.scrollTop = messageList.scrollHeight;
    });
  };

  widget.querySelector("[data-commerce-chat-toggle]")?.addEventListener("click", () => setOpen(!widget.classList.contains("is-open")));
  widget.querySelector("[data-commerce-chat-close]")?.addEventListener("click", () => setOpen(false));
  widget.querySelector("[data-commerce-chat-minimize]")?.addEventListener("click", () => setOpen(false));

  threadButtons.forEach((button) => {
    button.addEventListener("click", () => renderThread(button.dataset.commerceChatThread));
  });

  search?.addEventListener("input", () => {
    const value = search.value.trim().toLowerCase();
    threadButtons.forEach((button) => {
      button.classList.toggle("hidden", value && !button.dataset.chatName.includes(value));
    });
  });

  document.querySelectorAll("[data-open-service-chat]").forEach((button) => {
    button.addEventListener("click", () => {
      setOpen(true);
      renderThread("surya");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function getCartItemHref(item, inPagesDir) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const base = inPagesDir ? (pagesDepth > 0 ? '../product-detail.html' : 'product-detail.html') : 'pages/product-detail.html';
  return `${base}?product=${encodeURIComponent(item.slug || "")}`;
}

function updateCartBadges() {
  const cart = getCartApi();
  const summary = cart?.getSummary?.() || { quantity: 0 };
  document.querySelectorAll("[data-cart-badge]").forEach((badge) => {
    badge.textContent = summary.quantity > 99 ? "99+" : String(summary.quantity);
    badge.classList.toggle("hidden", summary.quantity === 0);
    badge.classList.toggle("flex", summary.quantity > 0);
  });
}

function renderMiniCartWidget(widget) {
  const cart = getCartApi();
  if (!widget || !cart) return;
  const prefix = widget.dataset.miniCartPrefix || (window.location.pathname.includes("/pages/") ? "../" : "");
  const button = widget.querySelector("[data-mini-cart-button], #cartBtn");
  const list = widget.querySelector("[data-mini-cart-items], ul");
  const summaryRow = widget.querySelector("[data-mini-cart-summary]") || widget.querySelector(".mt-4.border-t .flex");
  const items = cart.getItems();
  const summary = cart.getSummary(items);

  button?.setAttribute("aria-label", `Keranjang belanja, ${summary.quantity} item`);
  updateCartBadges();

  if (list) {
    list.innerHTML = items.length ? items.slice(0, 3).map((item) => `
      <li class="flex items-center gap-3">
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
          <img class="h-full w-full object-cover" src="${resolveCartAsset(item.image, prefix)}" alt="${escapeHtml(item.title)}" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-slate-800">${escapeHtml(item.title)}</p>
          <p class="text-xs text-slate-400">${escapeHtml(item.seller)} - x${item.quantity}</p>
        </div>
        <span class="shrink-0 text-sm font-bold text-orange-600">${cart.formatRupiah(Number(item.price) * Number(item.quantity))}</span>
      </li>
    `).join("") : `
      <li class="rounded-xl bg-neutral-50 px-4 py-5 text-center text-sm font-semibold text-slate-500">Keranjang masih kosong</li>
    `;
  }

  if (summaryRow) {
    const remaining = Math.max(0, items.length - 3);
    summaryRow.innerHTML = `
      <span class="text-slate-500">${remaining ? `${remaining} Produk Lainnya` : `${summary.quantity} item`}</span>
      <span class="font-bold text-slate-900">Total: <span class="text-orange-600">${cart.formatRupiah(summary.subtotal)}</span></span>
    `;
  }
}

function initMiniCartWidgets() {
  const widgets = [...document.querySelectorAll("[data-mini-cart-widget], #cartWidget")];
  if (!widgets.length) return;

  widgets.forEach((widget) => {
    const button = widget.querySelector("[data-mini-cart-button], #cartBtn");
    const panel = widget.querySelector("[data-mini-cart-panel], #miniCart");
    const closeButton = widget.querySelector("[data-mini-cart-close], #miniCartClose");
    if (!button || !panel || widget.dataset.miniCartBound === "true") return;

    widget.dataset.miniCartBound = "true";
    let hoverTimer;
    const openCart = () => {
      window.clearTimeout(hoverTimer);
      renderMiniCartWidget(widget);
      panel.classList.remove("opacity-0", "scale-95", "pointer-events-none");
      panel.classList.add("opacity-100", "scale-100");
      button.setAttribute("aria-expanded", "true");
    };
    const closeCart = () => {
      panel.classList.add("opacity-0", "scale-95", "pointer-events-none");
      panel.classList.remove("opacity-100", "scale-100");
      button.setAttribute("aria-expanded", "false");
    };

    widget.addEventListener("mouseenter", openCart);
    widget.addEventListener("mouseleave", () => {
      hoverTimer = window.setTimeout(closeCart, 120);
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      button.getAttribute("aria-expanded") === "true" ? closeCart() : openCart();
    });
    closeButton?.addEventListener("click", closeCart);
    renderMiniCartWidget(widget);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-mini-cart-widget], #cartWidget").forEach((widget) => {
      const button = widget.querySelector("[data-mini-cart-button], #cartBtn");
      const panel = widget.querySelector("[data-mini-cart-panel], #miniCart");
      panel?.classList.add("opacity-0", "scale-95", "pointer-events-none");
      panel?.classList.remove("opacity-100", "scale-100");
      button?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll("[data-mini-cart-widget], #cartWidget").forEach((widget) => {
      if (widget.contains(event.target)) return;
      const button = widget.querySelector("[data-mini-cart-button], #cartBtn");
      const panel = widget.querySelector("[data-mini-cart-panel], #miniCart");
      panel?.classList.add("opacity-0", "scale-95", "pointer-events-none");
      panel?.classList.remove("opacity-100", "scale-100");
      button?.setAttribute("aria-expanded", "false");
    });
  });

  getCartApi()?.subscribe?.(() => {
    document.querySelectorAll("[data-mini-cart-widget], #cartWidget").forEach(renderMiniCartWidget);
  });
}

function renderCartDrawer(prefix, inPagesDir = window.location.pathname.includes("/pages/")) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const drawer = document.querySelector("[data-cart-drawer]");
  const cart = getCartApi();
  if (!drawer || !cart) return;
  const assetPrefix = typeof prefix === "string" ? prefix : (inPagesDir ? "../" : "");

  const items = cart.getItems();
  const summary = cart.getSummary(items);
  const marketplaceHref = inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html';
  const checkoutHref = inPagesDir ? (pagesDepth > 0 ? '../checkout.html' : 'checkout.html') : 'pages/checkout.html';
  const supportHref = inPagesDir ? (pagesDepth > 0 ? '../auth/forgot-password.html' : 'auth/forgot-password.html') : 'pages/auth/forgot-password.html';
  const itemMarkup = items.length ? items.map((item) => `
    <article class="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-soft" data-cart-row data-slug="${escapeHtml(item.slug)}" data-option="${escapeHtml(item.option)}">
      <div class="flex gap-4">
        <a class="h-24 w-20 shrink-0 overflow-hidden rounded-[1rem] bg-sand-50" href="${getCartItemHref(item, inPagesDir)}" data-cart-dismiss>
          <img class="h-full w-full object-cover" src="${resolveCartAsset(item.image, assetPrefix)}" alt="${escapeHtml(item.title)}" />
        </a>
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-700">${escapeHtml(item.seller)}</p>
              <h3 class="mt-2 text-base font-semibold leading-6 text-cocoa-900">${escapeHtml(item.title)}</h3>
              <p class="mt-1 text-sm text-muted">${escapeHtml(item.option || "Pilihan utama")}</p>
            </div>
            <button class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-muted transition hover:border-red-200 hover:text-red-500" type="button" aria-label="Hapus ${escapeHtml(item.title)}" data-cart-remove>
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4.5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M6.2 4.5V3.5C6.2 3.224 6.424 3 6.7 3H9.3C9.576 3 9.8 3.224 9.8 3.5V4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M5 6.2V11C5 11.552 5.448 12 6 12H10C10.552 12 11 11.552 11 11V6.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
              </svg>
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between gap-3">
            <div class="inline-flex items-center rounded-full border border-cocoa-900/10 bg-sand-50">
              <button class="h-8 w-8 rounded-full text-sm font-bold text-cocoa-900 hover:bg-white" type="button" aria-label="Kurangi jumlah" data-cart-dec>-</button>
              <span class="w-8 text-center text-sm font-bold text-cocoa-900">${item.quantity}</span>
              <button class="h-8 w-8 rounded-full text-sm font-bold text-cocoa-900 hover:bg-white" type="button" aria-label="Tambah jumlah" data-cart-inc>+</button>
            </div>
            <strong class="text-base text-cocoa-900">${cart.formatRupiah(Number(item.price) * Number(item.quantity))}</strong>
          </div>
        </div>
      </div>
    </article>
  `).join("") : `
    <div class="rounded-[1.25rem] border border-dashed border-cocoa-900/15 bg-white/80 p-6 text-center">
      <p class="text-base font-semibold text-cocoa-900">Keranjang masih kosong</p>
      <p class="mt-2 text-sm leading-6 text-muted">Mulai dari marketplace dan pilih karya lokal yang ingin dibeli.</p>
      <a class="btn--dark mt-5 w-full" href="${marketplaceHref}" data-cart-dismiss>Jelajahi Produk</a>
    </div>
  `;

  drawer.innerHTML = `
    <button class="cart-drawer__backdrop" type="button" aria-label="Tutup drawer keranjang" data-cart-close></button>
    <aside class="cart-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cartDrawerTitle">
      <div class="flex min-h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">Keranjang Anda</p>
            <h2 id="cartDrawerTitle" class="mt-2 font-display text-3xl leading-none tracking-[-0.04em] text-cocoa-900">Siap menuju checkout.</h2>
            <p class="mt-3 max-w-sm text-sm leading-7 text-muted">Item tersimpan otomatis, jadi isi keranjang tetap ada saat pindah halaman.</p>
          </div>
          <button class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-cocoa-900 shadow-soft transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Tutup drawer" data-cart-close>
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 3.5 12.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
              <path d="M12.5 3.5 3.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>

        <div class="mt-6 rounded-[1.25rem] border border-white/70 bg-white/88 p-4 shadow-soft">
          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Item</p>
              <strong class="mt-2 block text-xl text-cocoa-900">${summary.quantity}</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Artisan</p>
              <strong class="mt-2 block text-xl text-cocoa-900">${summary.artisanCount}</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Ongkir</p>
              <strong class="mt-2 block text-xl text-cocoa-900">${summary.shipping === 0 ? "Gratis" : "Reg"}</strong>
            </div>
          </div>
        </div>

        <div class="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
          ${itemMarkup}
        </div>

        <div class="mt-6 rounded-[1.25rem] border border-white/70 bg-white/88 p-5 shadow-soft">
          <div class="flex items-center justify-between gap-4 text-sm">
            <span class="text-muted">Subtotal</span>
            <strong class="text-lg text-cocoa-900">${cart.formatRupiah(summary.subtotal)}</strong>
          </div>
          <div class="mt-3 flex items-center justify-between gap-4 text-sm">
            <span class="text-muted">Estimasi ongkir</span>
            <span class="font-semibold text-cocoa-900">${summary.shipping === 0 ? "Gratis" : cart.formatRupiah(summary.shipping)}</span>
          </div>
          <div class="mt-5 grid gap-3">
            <a class="btn--dark w-full ${items.length ? "" : "pointer-events-none opacity-50"}" href="${checkoutHref}" data-cart-dismiss>Checkout</a>
            <a class="btn--light w-full" href="${marketplaceHref}" data-cart-dismiss>Lanjut Belanja</a>
          </div>
          <a class="mt-4 inline-flex items-center justify-center text-sm text-link" href="${supportHref}" data-cart-dismiss>Butuh bantuan pesanan?</a>
        </div>
      </div>
    </aside>
  `;
  updateCartBadges();
}

function createAccountDrawer(body, prefix, inPagesDir) {
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  if (document.querySelector("[data-account-drawer]")) return;

  const settingsHref = inPagesDir ? (pagesDepth > 0 ? '../settings/settings.html' : 'settings/settings.html') : 'pages/settings/settings.html';
  const addressHref = inPagesDir ? (pagesDepth > 0 ? '../settings/settings-addresses.html' : 'settings/settings-addresses.html') : 'pages/settings/settings-addresses.html';
  const ordersHref = inPagesDir ? (pagesDepth > 0 ? '../settings/settings-orders.html' : 'settings/settings-orders.html') : 'pages/settings/settings-orders.html';
  const marketplaceHref = inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html';
  const exploreHref = inPagesDir ? (pagesDepth > 0 ? '../explore.html' : 'explore.html') : 'pages/explore.html';
  const supportHref = inPagesDir ? (pagesDepth > 0 ? '../auth/forgot-password.html' : 'auth/forgot-password.html') : 'pages/auth/forgot-password.html';
  const homeHref = `${prefix}index.html`;

  const drawer = document.createElement("div");
  drawer.className = "account-drawer";
  drawer.id = "accountDrawer";
  drawer.setAttribute("data-account-drawer", "");
  drawer.innerHTML = `
    <button class="account-drawer__backdrop" type="button" aria-label="Tutup drawer akun" data-account-close></button>
    <aside class="account-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="accountDrawerTitle">
      <div class="flex min-h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-4">
            <img class="h-14 w-14 rounded-[1.25rem] object-cover shadow-soft" src="${prefix}assets/images/topbar-avatar.png" alt="Foto profil" />
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">Akun Saya</p>
              <h2 id="accountDrawerTitle" class="mt-2 font-display text-3xl leading-none tracking-[-0.04em] text-cocoa-900">Nadia Rahma</h2>
              <p class="mt-2 text-sm text-muted">Ringkasan pesanan, wishlist, voucher, dan preferensi akun Anda dalam satu tempat.</p>
            </div>
          </div>
          <button class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-cocoa-900 shadow-soft transition hover:border-clay-300 hover:text-clay-700" type="button" aria-label="Tutup drawer" data-account-close>
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 3.5 12.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
              <path d="M12.5 3.5 3.5 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>

        <div class="mt-6 rounded-[1.75rem] border border-white/70 bg-white/85 p-4 shadow-soft">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Status Akun</p>
              <p class="mt-2 text-lg font-semibold text-cocoa-900">Member Terverifikasi</p>
            </div>
            <span class="status-pill status-pill--delivered">Aktif</span>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Pesanan</p>
              <strong class="mt-2 block text-xl text-cocoa-900">2</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Wishlist</p>
              <strong class="mt-2 block text-xl text-cocoa-900">12</strong>
            </div>
            <div class="rounded-2xl bg-sand-50/90 px-3 py-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Voucher</p>
              <strong class="mt-2 block text-xl text-cocoa-900">3</strong>
            </div>
          </div>
        </div>

        <div class="segmented mt-6 w-full justify-between">
          <button class="active flex-1" type="button" data-account-tab="overview">Ringkasan</button>
          <button class="flex-1" type="button" data-account-tab="orders">Pesanan</button>
          <button class="flex-1" type="button" data-account-tab="profile">Profil</button>
        </div>

        <div class="mt-6 flex-1">
          <section class="space-y-4" data-account-panel="overview">
            <article class="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">Akses Cepat</p>
              <div class="mt-4 grid gap-3">
                <a class="flex items-center justify-between rounded-2xl border border-cocoa-900/8 bg-sand-50/80 px-4 py-4 text-sm font-semibold text-cocoa-900 transition hover:border-clay-300 hover:text-clay-700" href="${addressHref}" data-account-dismiss>
                  <span>Edit profil dan alamat</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a class="flex items-center justify-between rounded-2xl border border-cocoa-900/8 bg-sand-50/80 px-4 py-4 text-sm font-semibold text-cocoa-900 transition hover:border-clay-300 hover:text-clay-700" href="${ordersHref}" data-account-dismiss>
                  <span>Lihat pesanan saya</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a class="flex items-center justify-between rounded-2xl border border-cocoa-900/8 bg-sand-50/80 px-4 py-4 text-sm font-semibold text-cocoa-900 transition hover:border-clay-300 hover:text-clay-700" href="${exploreHref}" data-account-dismiss>
                  <span>Jelajahi koleksi</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <article class="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">Favorit Terbaru</p>
              <div class="mt-4 space-y-3 text-sm text-muted">
                <div class="flex items-center justify-between rounded-2xl bg-sand-50/80 px-4 py-3">
                  <span>Tas Rotan Bulat Premium</span>
                  <span class="font-semibold text-cocoa-900">Rp 250rb</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-sand-50/80 px-4 py-3">
                  <span>Vas Keramik Minimalis</span>
                  <span class="font-semibold text-cocoa-900">Rp 180rb</span>
                </div>
              </div>
            </article>
          </section>

          <section class="is-hidden space-y-4" data-account-panel="orders">
            <article class="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-cocoa-900">Order #KL-2048</p>
                  <p class="mt-1 text-sm text-muted">Mangkuk Kayu Jati Ukir</p>
                </div>
                <span class="status-pill status-pill--processing">Diproses</span>
              </div>
            </article>
            <article class="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-cocoa-900">Order #KL-1982</p>
                  <p class="mt-1 text-sm text-muted">Tas Rotan Bulat Premium</p>
                </div>
                <span class="status-pill status-pill--delivered">Selesai</span>
              </div>
            </article>
            <a class="btn--light mt-2 w-full" href="${ordersHref}" data-account-dismiss>Lihat Semua Pesanan</a>
          </section>

          <section class="is-hidden space-y-4" data-account-panel="profile">
            <article class="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-soft">
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-clay-700">Info Profil</p>
              <dl class="mt-4 space-y-4 text-sm">
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-muted">Nama</dt>
                  <dd class="font-semibold text-cocoa-900">Nadia Rahma</dd>
                </div>
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-muted">Email</dt>
                  <dd class="font-semibold text-cocoa-900">nadia@karyalokal.id</dd>
                </div>
                <div class="flex items-start justify-between gap-4">
                  <dt class="text-muted">Lokasi</dt>
                  <dd class="font-semibold text-cocoa-900">Bandung, Indonesia</dd>
                </div>
              </dl>
            </article>
            <div class="grid gap-3 sm:grid-cols-2">
              <a class="btn--light w-full" href="${settingsHref}" data-account-dismiss>Pengaturan</a>
              <a class="btn--dark w-full" href="${homeHref}" data-account-dismiss>Keluar</a>
            </div>
            <a class="text-link inline-flex items-center justify-center text-sm" href="${supportHref}" data-account-dismiss>Butuh bantuan akun?</a>
          </section>
        </div>
      </div>
    </aside>
  `;

  body.append(drawer);
}

function initAccountDrawer() {
  const body = document.body;
  const drawer = document.querySelector("[data-account-drawer]");
  const toggle = document.querySelector("[data-account-toggle]");
  if (!body || !drawer || !toggle || body.classList.contains("auth-page")) return;
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const cartToggle = document.querySelector("[data-cart-toggle]");

  const panels = [...drawer.querySelectorAll("[data-account-panel]")];
  const tabs = [...drawer.querySelectorAll("[data-account-tab]")];
  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    body.classList.remove("account-drawer-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  const openDrawer = () => {
    cartDrawer?.classList.remove("is-open");
    body.classList.remove("cart-drawer-open");
    cartToggle?.setAttribute("aria-expanded", "false");
    drawer.classList.add("is-open");
    body.classList.add("account-drawer-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  if (drawer.dataset.bound === "true") return;
  drawer.dataset.bound = "true";

  toggle.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.querySelectorAll("[data-account-close], [data-account-dismiss]").forEach((element) => {
    element.addEventListener("click", closeDrawer);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.accountTab;
      tabs.forEach((item) => item.classList.toggle("active", item === tab));
      panels.forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.accountPanel !== target));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

function initCartDrawer() {
  const body = document.body;
  const drawer = document.querySelector("[data-cart-drawer]");
  const toggle = document.querySelector("[data-cart-toggle]");
  if (!body || !drawer || !toggle || body.classList.contains("auth-page")) return;
  const accountDrawer = document.querySelector("[data-account-drawer]");
  const accountToggle = document.querySelector("[data-account-toggle]");

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    body.classList.remove("cart-drawer-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  const openDrawer = () => {
    accountDrawer?.classList.remove("is-open");
    body.classList.remove("account-drawer-open");
    accountToggle?.setAttribute("aria-expanded", "false");
    drawer.classList.add("is-open");
    body.classList.add("cart-drawer-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  if (drawer.dataset.bound === "true") return;
  drawer.dataset.bound = "true";

  toggle.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.addEventListener("click", (event) => {
    const row = event.target.closest("[data-cart-row]");
    const cart = getCartApi();

    if (event.target.closest("[data-cart-close], [data-cart-dismiss]")) {
      closeDrawer();
      return;
    }

    if (!row || !cart) return;
    const slug = row.dataset.slug;
    const option = row.dataset.option || "";
    const current = cart.getItems().find((item) => item.slug === slug && (item.option || "") === option);
    if (!current) return;

    if (event.target.closest("[data-cart-inc]")) {
      cart.updateQuantity(slug, option, Number(current.quantity) + 1);
    }

    if (event.target.closest("[data-cart-dec]")) {
      if (Number(current.quantity) <= 1) return;
      cart.updateQuantity(slug, option, Number(current.quantity) - 1);
    }

    if (event.target.closest("[data-cart-remove]")) {
      cart.removeItem(slug, option);
    }

    renderCartDrawer();
  });

  getCartApi()?.subscribe?.(() => {
    renderCartDrawer();
    updateCartBadges();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

function initScrollReveal() {
  const revealEls = [...document.querySelectorAll("[data-reveal]")];
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px 200px 0px" });

  revealEls.forEach((el) => observer.observe(el));
}

function setActiveNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === currentPage);
  });
}

function bindProductDetailLinks() {
  const cards = [
    ...document.querySelectorAll("[data-market-card]"),
    ...document.querySelectorAll("[data-popular-carousel] article"),
  ];
  if (!cards.length) return;

  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const detailHref = inPagesDir ? (pagesDepth > 0 ? '../product-detail.html' : 'product-detail.html') : 'pages/product-detail.html';
  const slugify = (value) => (value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.trim();
    if (!title) return;

    const slug = card.dataset.product || slugify(title);
    const url = `${detailHref}?product=${encodeURIComponent(slug)}`;
    card.dataset.product = slug;
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Lihat detail ${title}`);
    card.classList.add("cursor-pointer");

    const openDetail = () => {
      window.location.href = url;
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, textarea")) return;
      openDetail();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDetail();
    });
  });
}

function getSearchCatalog() {
  const cards = [...document.querySelectorAll("[data-market-card]")];
  return cards.map((card) => {
    const title = card.querySelector("h3")?.textContent?.trim() || "";
    return {
      title,
      slug: card.dataset.product || slugFromText(title),
      price: Number(card.dataset.price || 0),
      location: card.dataset.location || "",
      category: card.dataset.category || "",
      search: `${title} ${card.dataset.search || ""}`.toLowerCase(),
    };
  }).filter((item) => item.title);
}

function slugFromText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function searchScore(text, query) {
  const source = String(text || "").toLowerCase();
  const term = String(query || "").toLowerCase().trim();
  if (!term) return 1;
  if (source.includes(term)) return 100;
  const words = term.split(/\s+/).filter(Boolean);
  let score = 0;
  words.forEach((word) => {
    if (source.includes(word)) score += 25;
    else {
      let cursor = 0;
      let matches = 0;
      [...word].forEach((char) => {
        const index = source.indexOf(char, cursor);
        if (index !== -1) {
          matches++;
          cursor = index + 1;
        }
      });
      if (matches >= Math.max(2, Math.ceil(word.length * 0.65))) score += 8;
    }
  });
  return score;
}

function getRecentSearches() {
  try {
    const value = JSON.parse(localStorage.getItem("karyaLokal.searches.v1") || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function saveRecentSearch(query) {
  const value = String(query || "").trim();
  if (!value) return;
  const next = [value, ...getRecentSearches().filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 6);
  localStorage.setItem("karyaLokal.searches.v1", JSON.stringify(next));
}

function initSearchEnhancements() {
  const inputs = [...document.querySelectorAll("[data-site-search]")];
  if (!inputs.length) return;
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const marketplaceHref = inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html';
  const isMarketplace = Boolean(document.querySelector("[data-marketplace]"));
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q");
  if (initialQuery) inputs.forEach((input) => { input.value = initialQuery; });

  inputs.forEach((input) => {
    const wrapper = input.closest("label") || input.parentElement;
    if (!wrapper || wrapper.querySelector("[data-search-panel]")) return;
    wrapper.classList.add("relative");
    const panel = document.createElement("div");
    panel.className = "pointer-events-none absolute left-0 right-0 top-[calc(100%+8px)] z-[70] scale-95 rounded-2xl border border-neutral-100 bg-white p-2 opacity-0 shadow-[0_18px_46px_rgba(15,23,42,0.14)] transition";
    panel.setAttribute("data-search-panel", "");
    wrapper.append(panel);

    const close = () => {
      panel.classList.add("pointer-events-none", "opacity-0", "scale-95");
      panel.classList.remove("opacity-100", "scale-100");
    };
    const open = () => {
      panel.classList.remove("pointer-events-none", "opacity-0", "scale-95");
      panel.classList.add("opacity-100", "scale-100");
    };
    const submitSearch = (query) => {
      const value = String(query || input.value || "").trim();
      if (!value) return;
      saveRecentSearch(value);
      if (!isMarketplace) {
        window.location.href = `${marketplaceHref}?q=${encodeURIComponent(value)}`;
      }
    };
    const render = () => {
      const query = input.value.trim().toLowerCase();
      const catalog = getSearchCatalog();
      const matches = catalog
        .map((item) => ({ ...item, score: searchScore(item.search, query) }))
        .filter((item) => !query || item.score > 0)
        .sort((a, b) => b.score - a.score || a.price - b.price)
        .slice(0, 5);
      const recent = getRecentSearches();
      const rows = query && matches.length
        ? matches.map((item) => `<button class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-orange-50" type="button" data-search-pick="${escapeHtml(item.title)}"><span class="font-semibold text-slate-800">${escapeHtml(item.title)}</span><span class="text-xs text-slate-400">${escapeHtml(item.location)}</span></button>`).join("")
        : recent.map((term) => `<button class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-orange-50" type="button" data-search-pick="${escapeHtml(term)}"><span class="font-semibold text-slate-700">${escapeHtml(term)}</span><span class="text-xs text-slate-400">recent</span></button>`).join("");
      panel.innerHTML = rows || `<p class="px-3 py-3 text-sm font-medium text-slate-500">Ketik nama produk, bahan, lokasi, atau kategori.</p>`;
      open();
    };

    input.addEventListener("focus", render);
    input.addEventListener("input", render);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitSearch();
        close();
      }
      if (event.key === "Escape") close();
    });
    panel.addEventListener("mousedown", (event) => {
      const button = event.target.closest("[data-search-pick]");
      if (!button) return;
      input.value = button.dataset.searchPick;
      submitSearch(button.dataset.searchPick);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      close();
    });
    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) close();
    });
  });
}

function initWishlistButtons() {
  const cart = getCartApi();
  if (!cart?.toggleWishlist) return;
  document.querySelectorAll("[data-market-card]").forEach((card) => {
    if (card.querySelector("[data-wishlist-card]")) return;
    const title = card.querySelector("h3")?.textContent?.trim() || "";
    const slug = card.dataset.product || slugFromText(title);
    card.dataset.product = slug;
    const image = card.querySelector("img")?.getAttribute("src") || "";
    const priceText = card.querySelector(".text-orange-600")?.textContent?.trim() || "";
    const button = document.createElement("button");
    button.className = "absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:text-red-500";
    button.type = "button";
    button.setAttribute("aria-label", `Simpan ${title} ke wishlist`);
    button.setAttribute("data-wishlist-card", "");
    button.innerHTML = `<svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-7-4.5-7-9.3C3 5.1 5.2 3 7.8 3c1.6 0 2.8.8 3.2 1.5C11.4 3.8 12.6 3 14.2 3 16.8 3 19 5.1 19 8.2c0 4.8-7 9.3-7 9.3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    card.querySelector(".relative")?.append(button);
    const update = () => button.classList.toggle("text-red-500", cart.isWishlisted(slug));
    update();
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      cart.toggleWishlist({
        slug,
        title,
        image,
        priceText,
        category: card.dataset.category,
        location: card.dataset.location,
      });
      update();
    });
  });
}

function bindExploreCtas() {
  document.querySelectorAll("[data-explore-shop]").forEach((button) => {
    if (!button.getAttribute("href")) {
      button.setAttribute("href", "marketplace.html");
    }
  });
}

function renderMobileCommerceNav() {
  if (document.querySelector("[data-mobile-commerce-nav]") || document.body.classList.contains("auth-page")) return;
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const links = [
    { label: "Home", href: `${prefix}index.html`, icon: "M3 8.5 8 4l5 4.5V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5Z" },
    { label: "Produk", href: inPagesDir ? (pagesDepth > 0 ? '../marketplace.html' : 'marketplace.html') : 'pages/marketplace.html', icon: "M2 4h12M2 8h12M2 12h12" },
    { label: "Order", href: inPagesDir ? (pagesDepth > 0 ? '../order-tracking.html' : 'order-tracking.html') : 'pages/order-tracking.html', icon: "M3 2h10v12H3V2Zm3 3h4M6 8h4M6 11h2" },
    { label: "Cart", href: inPagesDir ? (pagesDepth > 0 ? '../cart.html' : 'cart.html') : 'pages/cart.html', icon: "M1.5 2h2l1.2 6.2A1.5 1.5 0 0 0 6.2 9.4h5.7a1.5 1.5 0 0 0 1.5-1.2L14 4.5H4.2M6.5 14a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Zm5 0a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Z" },
  ];
  const nav = document.createElement("nav");
  nav.className = "fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-neutral-200 bg-white/95 p-1 shadow-[0_14px_40px_rgba(15,23,42,0.18)] backdrop-blur lg:hidden";
  nav.setAttribute("data-mobile-commerce-nav", "");
  nav.setAttribute("aria-label", "Navigasi mobile");
  nav.innerHTML = links.map((item) => `
    <a class="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold text-slate-500 transition hover:bg-orange-50 hover:text-orange-600" href="${item.href}">
      <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="${item.icon}" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${item.label}
    </a>
  `).join("");
  document.body.append(nav);
  document.body.classList.add("pb-20", "lg:pb-0");
}

function renderMiniProductList(items, emptyText) {
  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const detailHref = inPagesDir ? (pagesDepth > 0 ? '../product-detail.html' : 'product-detail.html') : 'pages/product-detail.html';
  if (!items.length) return `<p class="rounded-2xl bg-sand-50 px-4 py-4 text-sm font-semibold text-muted">${emptyText}</p>`;
  return items.map((item) => `
    <a class="flex items-center gap-3 rounded-2xl bg-sand-50/70 p-3 transition hover:bg-clay-50" href="${detailHref}?product=${encodeURIComponent(item.slug)}">
      <img class="h-14 w-14 rounded-xl object-cover" src="${resolveCartAsset(item.image, inPagesDir ? "../" : "")}" alt="${escapeHtml(item.title)}" />
      <span class="min-w-0 flex-1">
        <strong class="block truncate text-sm text-cocoa-900">${escapeHtml(item.title)}</strong>
        <span class="text-xs text-muted">${escapeHtml(item.priceText || item.location || "Produk lokal")}</span>
      </span>
    </a>
  `).join("");
}

function renderAccountCommerce() {
  const cart = getCartApi();
  if (!cart) return;
  const session = window.KL?.getSession?.();
  const ordersEl = document.querySelector("[data-account-orders]");
  const wishlistEl = document.querySelector("[data-account-wishlist]");
  const recentEl = document.querySelector("[data-account-recent]");
  const notificationsEl = document.querySelector("[data-account-notifications]");
  const summaryOrders = document.querySelector("[data-summary-orders]");
  const summaryActive = document.querySelector("[data-summary-active]");
  const summaryWishlist = document.querySelector("[data-summary-wishlist]");
  const summaryRecent = document.querySelector("[data-summary-recent]");
  const nameTargets = [...document.querySelectorAll("[data-account-name]")];
  const initialTargets = [...document.querySelectorAll("[data-account-initial], [data-profile-initial]")];
  if (!ordersEl && !wishlistEl && !recentEl && !notificationsEl && !summaryOrders) return;

  if (session?.name) {
    nameTargets.forEach((target) => { target.textContent = session.name; });
    initialTargets.forEach((target) => { target.textContent = session.name.trim().charAt(0).toUpperCase(); });
    const [firstName = "", ...restName] = session.name.split(" ");
    const firstInput = document.querySelector("[data-settings-form] [name='firstName']");
    const lastInput = document.querySelector("[data-settings-form] [name='lastName']");
    const emailInput = document.querySelector("[data-settings-form] [name='email']");
    if (firstInput) firstInput.value = firstName || firstInput.value;
    if (lastInput) lastInput.value = restName.join(" ") || lastInput.value;
    if (emailInput) emailInput.value = session.email || emailInput.value;
  }

  const orders = cart.getOrders?.() || [];
  const wishlist = cart.getWishlist?.() || [];
  const recent = cart.getRecentlyViewed?.() || [];
  const activeOrders = orders.filter((order) => !["Selesai", "Dibatalkan"].includes(order.status));

  if (summaryOrders) summaryOrders.textContent = String(orders.length);
  if (summaryActive) summaryActive.textContent = String(activeOrders.length);
  if (summaryWishlist) summaryWishlist.textContent = String(wishlist.length);
  if (summaryRecent) summaryRecent.textContent = String(recent.length);

  if (ordersEl) {
    ordersEl.innerHTML = orders.length ? orders.map((order) => {
      const firstItem = order.items?.[0];
      return `
        <article class="account-order-card">
          <div class="account-order-card__head">
            <div>
              <span class="rounded-sm bg-clay-50 px-2 py-1 text-xs font-bold text-clay-700">${escapeHtml(firstItem?.seller || "Karya Lokal")}</span>
              <span class="ml-2 font-mono text-xs font-semibold text-neutral-500">#${escapeHtml(order.id)}</span>
            </div>
            <span class="text-sm font-bold uppercase text-clay-600">${escapeHtml(order.status || "Diproses")}</span>
          </div>
          <div class="account-order-card__body">
            ${firstItem ? `<img src="${resolveCartAsset(firstItem.image, "../")}" alt="${escapeHtml(firstItem.title)}" />` : ""}
            <div class="min-w-0 flex-1">
              <h3 class="text-base font-bold text-neutral-900">${escapeHtml(firstItem?.title || "Pesanan Karya Lokal")}</h3>
              <p class="mt-1 text-sm text-neutral-500">${order.items?.length || 0} produk - ${escapeHtml(firstItem?.option || "Pilihan utama")}</p>
              <p class="mt-2 text-sm font-semibold text-neutral-700">x${firstItem?.quantity || 1}</p>
            </div>
            <strong class="text-base text-neutral-900">${cart.formatRupiah(firstItem?.price || order.summary?.total || 0)}</strong>
          </div>
          <div class="account-order-card__footer">
            <p class="text-sm leading-6 text-neutral-500">Total Pesanan: <strong class="text-xl text-clay-600">${cart.formatRupiah(order.summary?.total || 0)}</strong></p>
            <div class="flex flex-wrap gap-3">
              ${firstItem ? `<a class="account-btn account-btn--primary" href="product-detail.html?product=${encodeURIComponent(firstItem.slug)}#reviews">Nilai</a>` : ""}
              <a class="account-btn account-btn--ghost" href="order-tracking.html?order=${encodeURIComponent(order.id)}">Lacak</a>
              <a class="account-btn account-btn--ghost" href="marketplace.html">Beli Lagi</a>
            </div>
          </div>
        </article>
      `;
    }).join("") : `<p class="px-6 py-10 text-center text-sm font-semibold text-neutral-500 sm:px-8">Belum ada pesanan. Checkout pertama akan muncul di sini.</p>`;
  }

  if (wishlistEl) {
    wishlistEl.innerHTML = renderMiniProductList(wishlist, "Wishlist masih kosong. Simpan produk favorit dari marketplace.");
  }

  if (recentEl) {
    recentEl.innerHTML = renderMiniProductList(recent, "Belum ada produk yang dilihat.");
  }

  if (notificationsEl) {
    const items = getNotificationItems("../");
    notificationsEl.innerHTML = items.map((item) => `
      <a class="flex gap-3 rounded-2xl border border-cocoa-900/8 bg-white p-4 shadow-soft transition hover:border-clay-300 hover:bg-clay-50" href="${item.href}">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone} text-sm font-bold">${item.type.charAt(0).toUpperCase()}</span>
        <span class="min-w-0 flex-1">
          <span class="flex flex-wrap items-center gap-2">
            <strong class="text-sm text-cocoa-900">${escapeHtml(item.title)}</strong>
            ${item.unread ? `<span class="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">Baru</span>` : ""}
          </span>
          <span class="mt-1 block text-xs leading-5 text-muted">${escapeHtml(item.body)}</span>
        </span>
        <span class="shrink-0 text-[11px] font-semibold text-muted">${escapeHtml(item.time)}</span>
      </a>
    `).join("");
  }
}

function bindCustomerAccountControls() {
  const addressList = document.querySelector("[data-account-addresses]");
  const addressForm = document.querySelector("[data-address-form]");
  const preferenceForm = document.querySelector("[data-preferences-form]");
  const logout = document.querySelector("[data-account-logout]");
  if (!addressList && !addressForm && !preferenceForm && !logout) return;

  const addressKey = "karyaLokal.customerAddresses.v1";
  const preferenceKey = "karyaLokal.customerPreferences.v1";
  const seedAddresses = [
    {
      id: "ADDR-001",
      label: "Rumah",
      recipient: "Budi Santoso",
      city: "Jakarta Selatan",
      postal: "12190",
      detail: "Jl. Kemang Raya No. 18, Bangka, Mampang Prapatan",
      primary: true,
    },
    {
      id: "ADDR-002",
      label: "Kantor",
      recipient: "Budi Santoso",
      city: "Tangerang Selatan",
      postal: "15418",
      detail: "Ruko BSD Sektor 7, lantai 2, dekat pintu lobby",
      primary: false,
    },
  ];

  const readJson = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore blocked storage. The static UI still stays usable.
    }
  };

  const readAddresses = () => {
    const stored = readJson(addressKey, null);
    return Array.isArray(stored) ? stored : seedAddresses.slice();
  };

  const saveAddresses = (addresses) => writeJson(addressKey, addresses);

  const setAddressForm = (address = {}) => {
    if (!addressForm) return;
    addressForm.elements.id.value = address.id || "";
    addressForm.elements.label.value = address.label || "";
    addressForm.elements.recipient.value = address.recipient || "";
    addressForm.elements.city.value = address.city || "";
    addressForm.elements.postal.value = address.postal || "";
    addressForm.elements.detail.value = address.detail || "";
    addressForm.elements.primary.checked = Boolean(address.primary);
  };

  const openAddressForm = (address) => {
    if (!addressForm) return;
    setAddressForm(address);
    addressForm.classList.remove("hidden");
    addressForm.elements.label.focus();
  };

  const closeAddressForm = () => {
    if (!addressForm) return;
    addressForm.reset();
    addressForm.elements.id.value = "";
    addressForm.classList.add("hidden");
  };

  const renderAddresses = () => {
    if (!addressList) return;
    const addresses = readAddresses();
    addressList.innerHTML = addresses.length ? addresses.map((address) => `
      <article class="account-address-card" data-address-id="${escapeHtml(address.id)}">
        <div class="account-address-card__top">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <strong>${escapeHtml(address.recipient)}</strong>
              <span class="text-sm text-neutral-400">| ${escapeHtml(address.label)}</span>
            </div>
            <p>${escapeHtml(address.detail)}<br />${escapeHtml(address.city)}, ID, ${escapeHtml(address.postal)}</p>
            ${address.primary ? `<span class="mt-3 inline-flex rounded-sm border border-clay-300 px-2 py-1 text-xs font-bold text-clay-600">Utama</span>` : ""}
          </div>
          <div class="account-address-actions">
            <button type="button" data-address-edit>Ubah</button>
            ${!address.primary ? `<button type="button" data-address-delete>Hapus</button>` : ""}
            <button type="button" data-address-primary ${address.primary ? "disabled" : ""}>Atur sebagai utama</button>
          </div>
        </div>
      </article>
    `).join("") : `<p class="px-6 py-10 text-center text-sm font-semibold text-neutral-500 sm:px-8">Belum ada alamat. Tambahkan alamat pengiriman utama.</p>`;
  };

  document.querySelector("[data-address-add]")?.addEventListener("click", () => openAddressForm({
    id: "",
    recipient: window.KL?.getSession?.()?.name || "Budi Santoso",
  }));

  document.querySelector("[data-address-cancel]")?.addEventListener("click", closeAddressForm);

  addressForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!addressForm.checkValidity()) {
      addressForm.reportValidity();
      return;
    }
    const data = new FormData(addressForm);
    const nextAddress = {
      id: data.get("id") || `ADDR-${Date.now().toString().slice(-5)}`,
      label: data.get("label"),
      recipient: data.get("recipient"),
      city: data.get("city"),
      postal: data.get("postal"),
      detail: data.get("detail"),
      primary: data.get("primary") === "on",
    };
    let addresses = readAddresses();
    if (nextAddress.primary) {
      addresses = addresses.map((address) => ({ ...address, primary: false }));
    }
    const index = addresses.findIndex((address) => address.id === nextAddress.id);
    if (index >= 0) {
      addresses[index] = nextAddress;
    } else {
      addresses.unshift(nextAddress);
    }
    if (!addresses.some((address) => address.primary) && addresses[0]) addresses[0].primary = true;
    saveAddresses(addresses);
    renderAddresses();
    closeAddressForm();
  });

  addressList?.addEventListener("click", (event) => {
    const row = event.target.closest("[data-address-id]");
    if (!row) return;
    let addresses = readAddresses();
    const address = addresses.find((item) => item.id === row.dataset.addressId);
    if (event.target.closest("[data-address-edit]") && address) {
      openAddressForm(address);
    }
    if (event.target.closest("[data-address-primary]")) {
      addresses = addresses.map((item) => ({ ...item, primary: item.id === row.dataset.addressId }));
      saveAddresses(addresses);
      renderAddresses();
    }
    if (event.target.closest("[data-address-delete]")) {
      addresses = addresses.filter((item) => item.id !== row.dataset.addressId);
      if (!addresses.some((item) => item.primary) && addresses[0]) addresses[0].primary = true;
      saveAddresses(addresses);
      renderAddresses();
      closeAddressForm();
    }
  });

  if (preferenceForm) {
    const preferences = readJson(preferenceKey, {});
    ["emailOrder", "wishlistPromo", "sellerChat"].forEach((key) => {
      if (typeof preferences[key] === "boolean" && preferenceForm.elements[key]) {
        preferenceForm.elements[key].checked = preferences[key];
      }
    });
    const savePreferences = () => {
      const next = {
        emailOrder: Boolean(preferenceForm.elements.emailOrder?.checked),
        wishlistPromo: Boolean(preferenceForm.elements.wishlistPromo?.checked),
        sellerChat: Boolean(preferenceForm.elements.sellerChat?.checked),
      };
      writeJson(preferenceKey, next);
    };
    preferenceForm.addEventListener("change", savePreferences);
    preferenceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      savePreferences();
    });
  }

  logout?.addEventListener("click", () => {
    window.KL?.logout?.();
  });

  renderAddresses();
}

function renderNotificationsPage() {
  const list = document.querySelector("[data-notifications-list]");
  if (!list) return;

  const inPagesDir = window.location.pathname.includes("/pages/");
  const pagesDepth = inPagesDir ? (window.location.pathname.split('/pages/')[1] || '').split('/').length - 1 : 0;
  const prefix = inPagesDir ? (pagesDepth > 0 ? '../../' : '../') : '';
  const items = getNotificationItems(prefix);
  const unread = items.filter((item) => item.unread).length;
  const unreadEl = document.querySelector("[data-notifications-unread]");
  const totalEl = document.querySelector("[data-notifications-total]");

  if (unreadEl) unreadEl.textContent = String(unread);
  if (totalEl) totalEl.textContent = String(items.length);

  list.innerHTML = items.map((item) => `
    <a class="notification-page-card" href="${item.href}">
      <span class="notification-dot ${item.tone}">${item.type.charAt(0).toUpperCase()}</span>
      <span class="min-w-0 flex-1">
        <span class="flex flex-wrap items-center gap-2">
          <strong class="text-base text-slate-950">${escapeHtml(item.title)}</strong>
          ${item.unread ? `<span class="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600">Baru</span>` : ""}
        </span>
        <span class="mt-2 block text-sm leading-7 text-slate-500">${escapeHtml(item.body)}</span>
      </span>
      <span class="shrink-0 text-xs font-bold text-slate-400">${escapeHtml(item.time)}</span>
    </a>
  `).join("");
}

function bindInlineForms() {
  document.querySelectorAll("[data-inline-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const action = form.dataset.inlineForm;

      if (action === "newsletter") {
        alert("Email berhasil didaftarkan. Anda akan menerima update terbaru.");
      }

      if (action === "search") {
        alert("Pencarian demo aktif. Gunakan filter halaman untuk melihat hasil.");
      }

      form.reset();
    });
  });
}

function bindMarketplaceFilters() {
  const container = document.querySelector("[data-marketplace]");
  if (!container) return;

  const allCards = [...container.querySelectorAll("[data-market-card]")];
  const searchInputs = [...document.querySelectorAll("[data-site-search]")];
  const categoryOptions = [...container.querySelectorAll("[data-filter-category]")];
  const locationOptions = [...container.querySelectorAll("[data-filter-location]")];
  const minInput = container.querySelector("[data-price-min]");
  const maxInput = container.querySelector("[data-price-max]");
  const resetBtns = [...container.querySelectorAll("[data-filter-reset]")];
  const visibleText = container.querySelector("[data-results-count]");
  const totalText = container.querySelector("[data-results-total]");
  const sortSelect = container.querySelector("[data-sort]");
  const paginationRow = container.querySelector("[data-pagination]");
  const prevBtn = paginationRow?.querySelector("[data-page-prev]");
  const nextBtn = paginationRow?.querySelector("[data-page-next]");

  const CARDS_PER_PAGE = 6;
  let currentPage = 1;
  let filteredCards = [];
  const initialQuery = new URLSearchParams(window.location.search).get("q");
  if (initialQuery) searchInputs.forEach((input) => { input.value = initialQuery; });

  // --- Filtering ---
  const applyFilters = () => {
    const search = (searchInputs[0]?.value || "").trim().toLowerCase();
    const selectedCategories = categoryOptions.filter((i) => i.checked).map((i) => i.value);
    const selectedLocations = locationOptions.filter((b) => b.classList.contains("active")).map((b) => b.value);
    const minPrice = Number(minInput?.value || 0);
    const maxPrice = Number(maxInput?.value || 0) || Infinity;

    filteredCards = allCards.map((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      return { card, score: searchScore(`${title} ${card.dataset.search || ""}`, search) };
    }).filter(({ card, score }) => {
      const matchesSearch = !search || score > 0;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(card.dataset.category);
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(card.dataset.location);
      const price = Number(card.dataset.price);
      const matchesPrice = price >= minPrice && price <= maxPrice;
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    }).map(({ card, score }) => {
      card.dataset.searchScore = score;
      return card;
    });

    const sortVal = sortSelect?.value || "default";
    if (sortVal === "price-asc") {
      filteredCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortVal === "price-desc") {
      filteredCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else {
      filteredCards.sort((a, b) => Number(b.dataset.searchScore || 0) - Number(a.dataset.searchScore || 0));
    }

    currentPage = 1;
    applyPagination();
  };

  // --- Pagination ---
  const applyPagination = () => {
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const pageCards = filteredCards.slice(start, start + CARDS_PER_PAGE);

    allCards.forEach((card) => card.classList.add("is-hidden"));
    pageCards.forEach((card) => card.classList.remove("is-hidden"));

    if (visibleText) visibleText.textContent = `${filteredCards.length} produk ditampilkan`;
    if (totalText) totalText.textContent = `${allCards.length} produk tersedia`;

    renderPagination(totalPages);
  };

  const renderPagination = (totalPages) => {
    if (!paginationRow) return;

    if (prevBtn) prevBtn.classList.toggle("is-disabled", currentPage === 1);
    if (nextBtn) nextBtn.classList.toggle("is-disabled", currentPage === totalPages);

    paginationRow.querySelectorAll("[data-page-num]").forEach((el) => el.remove());

    getPageNumbers(currentPage, totalPages).forEach((p) => {
      if (p === "...") {
        const el = document.createElement("span");
        el.className = "marketplace-pagination__ellipsis";
        el.setAttribute("data-page-num", "ellipsis");
        el.textContent = "…";
        paginationRow.insertBefore(el, nextBtn);
      } else {
        const isCurrent = p === currentPage;
        const el = document.createElement(isCurrent ? "span" : "button");
        el.className = "marketplace-pagination__page" + (isCurrent ? " is-current" : "");
        el.setAttribute("data-page-num", p);
        el.textContent = p;
        if (!isCurrent) {
          el.type = "button";
          el.addEventListener("click", () => {
            currentPage = p;
            applyPagination();
            container.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
        paginationRow.insertBefore(el, nextBtn);
      }
    });
  };

  function getPageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  }

  // --- Event bindings ---
  categoryOptions.forEach((input) => {
    input.addEventListener("change", () => {
      input.closest(".sidebar-option")?.classList.toggle("active", input.checked);
      applyFilters();
    });
  });

  locationOptions.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      applyFilters();
    });
  });

  [minInput, maxInput, ...searchInputs].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      if (input.matches("[data-site-search]")) {
        searchInputs.forEach((other) => {
          if (other !== input) other.value = input.value;
        });
      }
      applyFilters();
    });
  });

  sortSelect?.addEventListener("change", applyFilters);

  const doReset = () => {
    categoryOptions.forEach((input) => {
      input.checked = false;
      input.closest(".sidebar-option")?.classList.remove("active");
    });
    locationOptions.forEach((button) => button.classList.remove("active"));
    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";
    searchInputs.forEach((input) => { input.value = ""; });
    if (sortSelect) sortSelect.value = "default";
    applyFilters();
  };

  resetBtns.forEach((btn) => btn.addEventListener("click", doReset));

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      applyPagination();
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  nextBtn?.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
    if (currentPage < totalPages) {
      currentPage++;
      applyPagination();
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  applyFilters();
}

function bindServiceFilters() {
  const container = document.querySelector("[data-services]");
  if (!container) return;

  const cards = [...container.querySelectorAll("[data-service-card]")];
  const chips = [...container.querySelectorAll("[data-service-chip]")];
  const search = document.querySelector("[data-site-search]");
  const countLabel = container.querySelector("[data-services-count]");

  cards.forEach((card) => {
    card.setAttribute("aria-label", `Lihat detail ${card.querySelector("h3")?.textContent?.trim() || "jasa"}`);
  });

  const applyFilters = () => {
    const activeChip = chips.find((chip) => chip.classList.contains("active"));
    const tag = activeChip?.dataset.serviceChip || "semua";
    const query = (search?.value || "").trim().toLowerCase();

    let visible = 0;
    cards.forEach((card) => {
      const matchesTag = tag === "semua" || card.dataset.tag === tag;
      const matchesSearch = !query || card.dataset.search.includes(query);
      const shouldShow = matchesTag && matchesSearch;

      card.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) visible += 1;
    });

    if (countLabel) {
      countLabel.textContent = `${visible} jasa aktif`;
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      applyFilters();
    });
  });

  search?.addEventListener("input", applyFilters);
  applyFilters();
}

function bindSettingsForm() {
  const form = document.querySelector("[data-settings-form]");
  if (!form) return;

  const initial = new FormData(form);
  const cancel = form.querySelector("[data-settings-cancel]");
  const status = document.querySelector("[data-settings-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = form.elements.namedItem("firstName")?.value || "";
    const lastName = form.elements.namedItem("lastName")?.value || "";
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName) {
      document.querySelectorAll("[data-account-name]").forEach((target) => { target.textContent = fullName; });
      document.querySelectorAll("[data-account-initial], [data-profile-initial]").forEach((target) => {
        target.textContent = fullName.charAt(0).toUpperCase();
      });
    }
    status?.classList.remove("hidden");
    window.setTimeout(() => status?.classList.add("hidden"), 2400);
  });

  cancel?.addEventListener("click", () => {
    for (const [key, value] of initial.entries()) {
      const field = form.elements.namedItem(key);
      if (field) field.value = value;
    }
    status?.classList.add("hidden");
  });
}

function bindForgotPasswordFlow() {
  const form = document.querySelector("[data-forgot-password]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "auth/verify-code.html";
  });
}

function bindVerificationFlow() {
  const wrapper = document.querySelector("[data-verification]");
  if (!wrapper) return;

  const inputs = [...wrapper.querySelectorAll("[data-code-input]")];
  const submit = wrapper.querySelector("[data-code-submit]");
  const timer = wrapper.querySelector("[data-resend-timer]");

  const updateButton = () => {
    const ready = inputs.every((input) => input.value.trim().length === 1);
    submit.disabled = !ready;
    submit.classList.toggle("btn--light", !ready);
    submit.classList.toggle("btn--primary", ready);
  };

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 1);
      if (input.value && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
      updateButton();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    });
  });

  submit?.addEventListener("click", () => {
    if (submit.disabled) return;
    alert("Kode verifikasi diterima. Silakan lanjut login.");
    window.location.href = "auth/login.html";
  });

  if (timer) {
    let seconds = 59;
    const interval = setInterval(() => {
      seconds -= 1;
      timer.textContent = seconds > 9 ? `00:${seconds}` : `00:0${seconds}`;
      if (seconds <= 0) clearInterval(interval);
    }, 1000);
  }

  updateButton();
}

function bindDashboardTheme() {
  const shell = document.querySelector("[data-dashboard-shell]");
  if (!shell) return;

  const buttons = [...document.querySelectorAll("[data-dashboard-theme]")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.dashboardTheme;
      shell.classList.toggle("dashboard-dark", mode === "dark");
      buttons.forEach((item) => item.classList.toggle("active", item === button));
    });
  });
}
