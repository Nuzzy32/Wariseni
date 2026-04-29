document.addEventListener("DOMContentLoaded", function () {
  hydrateSellerChrome();
  renderSalesLineChart();
  renderOverviewProductListings();
  initSellerCustomerChat();
  initSellerProductCrud();
  renderSellerOrders();
});

function hydrateSellerChrome() {
  var session = window.KL && window.KL.getSession && window.KL.getSession();
  var sellerName = session && session.name ? session.name : "Budi Santoso";
  var sellerEmail = session && session.email ? session.email : "seller@karyalokal.id";
  var initials = sellerName.trim().charAt(0).toUpperCase() || "S";

  document.querySelectorAll("[data-seller-name]").forEach(function (node) {
    node.textContent = sellerName;
  });
  document.querySelectorAll("[data-seller-email]").forEach(function (node) {
    node.textContent = sellerEmail;
  });
  document.querySelectorAll("[data-seller-initial]").forEach(function (node) {
    node.textContent = initials;
  });
  document.querySelectorAll("[data-seller-logout]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.KL && window.KL.logout && window.KL.logout();
    });
  });
}

function getSellerFallbackProducts() {
  return [
    {
      id: "PRD-001",
      name: "Tas Rotan Bali Premium",
      category: "Tas & Aksesoris",
      variant: "Natural, Medium",
      stock: 24,
      price: 350000,
      weight: "450 gram",
      dimension: "28 x 12 x 20 cm",
      status: "Aktif",
      image: "../assets/images/marketplace/rattan-bag.png",
      description: "Tas rotan handmade dengan anyaman rapat dan finishing natural untuk aktivitas harian.",
    },
    {
      id: "PRD-002",
      name: "Mug Keramik Glasir Pasir",
      category: "Keramik",
      variant: "Ivory, Sand Beige",
      stock: 18,
      price: 150000,
      weight: "320 gram",
      dimension: "9 x 9 x 10 cm",
      status: "Aktif",
      image: "../assets/images/marketplace/ceramic-mug.png",
      description: "Mug keramik buatan tangan dengan glasir matte yang cocok untuk hadiah premium.",
    },
    {
      id: "PRD-003",
      name: "Kain Batik Tulis Solo",
      category: "Tekstil",
      variant: "Sogan, 2 meter",
      stock: 7,
      price: 850000,
      weight: "260 gram",
      dimension: "200 x 110 cm",
      status: "Review",
      image: "../assets/images/marketplace/batik-cloth.png",
      description: "Batik tulis motif klasik dengan pewarnaan sogan hangat dari perajin Solo.",
    },
  ];
}

function readSellerProducts() {
  try {
    var stored = JSON.parse(localStorage.getItem("karyaSellerProducts") || "null");
    return Array.isArray(stored) ? stored : getSellerFallbackProducts();
  } catch (error) {
    return getSellerFallbackProducts();
  }
}

function saveSellerProducts(products) {
  localStorage.setItem("karyaSellerProducts", JSON.stringify(products));
}

function getSellerCustomerChats() {
  return [
    {
      id: "nadia",
      name: "Nadia Rahma",
      initial: "N",
      meta: "Online • Order #KL-20260401",
      product: "Tas Rotan Bali Premium",
      time: "10:24",
      unread: 2,
      preview: "Kak, tas rotannya ready warna natural?",
      messages: [
        { from: "customer", text: "Kak, tas rotannya ready warna natural?", time: "10:20" },
        { from: "customer", text: "Kalau dikirim ke Bandung estimasinya berapa hari ya?", time: "10:24" },
      ],
    },
    {
      id: "raka",
      name: "Raka Pratama",
      initial: "R",
      meta: "Terakhir aktif 12 menit lalu",
      product: "Kain Batik Tulis Solo",
      time: "09:48",
      unread: 1,
      preview: "Motif sogannya bisa request ukuran?",
      messages: [
        { from: "seller", text: "Halo Kak Raka, untuk batik sogan tersedia ukuran 2 meter.", time: "09:31" },
        { from: "customer", text: "Motif sogannya bisa request ukuran?", time: "09:48" },
      ],
    },
    {
      id: "ayu",
      name: "Ayu Lestari",
      initial: "A",
      meta: "Online • Pembeli repeat",
      product: "Mug Keramik Glasir Pasir",
      time: "Kemarin",
      unread: 0,
      preview: "Baik kak, saya checkout sore ini.",
      messages: [
        { from: "customer", text: "Kalau pesan 6 mug bisa dibungkus terpisah?", time: "15:02" },
        { from: "seller", text: "Bisa Kak, nanti kami pakai box satuan dan bubble wrap tambahan.", time: "15:07" },
        { from: "customer", text: "Baik kak, saya checkout sore ini.", time: "15:10" },
      ],
    },
    {
      id: "dewi",
      name: "Dewi Sari",
      initial: "D",
      meta: "Terakhir aktif kemarin",
      product: "Set Keramik Kasongan",
      time: "Selasa",
      unread: 0,
      preview: "Terima kasih, paketnya aman sampai.",
      messages: [
        { from: "customer", text: "Terima kasih, paketnya aman sampai.", time: "Selasa" },
        { from: "seller", text: "Sama-sama Kak Dewi. Semoga produknya cocok untuk hadiah.", time: "Selasa" },
      ],
    },
    {
      id: "budi",
      name: "Budi Hartono",
      initial: "B",
      meta: "Menunggu balasan",
      product: "Songket Palembang Gold",
      time: "Senin",
      unread: 1,
      preview: "Apakah songketnya bisa pakai packing premium?",
      messages: [
        { from: "customer", text: "Apakah songketnya bisa pakai packing premium?", time: "Senin" },
      ],
    },
  ];
}

function initSellerCustomerChat() {
  var list = document.querySelector("[data-customer-list]");
  var thread = document.querySelector("[data-customer-thread]");
  var form = document.querySelector("[data-customer-composer]");
  var input = document.querySelector("[data-customer-input]");
  if (!list || !thread || !form || !input) return;

  var chats = getSellerCustomerChats();
  var activeId = chats[0].id;

  function activeChat() {
    return chats.find(function (chat) {
      return chat.id === activeId;
    }) || chats[0];
  }

  function renderList() {
    list.innerHTML = chats
      .map(function (chat) {
        var active = chat.id === activeId;
        return (
          '<button class="flex min-h-[92px] w-full items-center gap-3 rounded-3xl p-3 text-left transition ' +
          (active ? "bg-cocoa-900 text-white shadow-soft" : "bg-white text-cocoa-900 hover:bg-clay-50") +
          '" type="button" data-customer-chat="' +
          sellerEsc(chat.id) +
          '">' +
          '<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ' +
          (active ? "bg-white/15 text-white" : "bg-clay-50 text-clay-700") +
          ' text-sm font-extrabold">' +
          sellerEsc(chat.initial) +
          "</span>" +
          '<span class="min-w-0 flex-1">' +
          '<span class="flex items-center justify-between gap-3"><strong class="truncate text-sm">' +
          sellerEsc(chat.name) +
          '</strong><span class="shrink-0 text-xs ' +
          (active ? "text-white/60" : "text-muted") +
          '">' +
          sellerEsc(chat.time) +
          "</span></span>" +
          '<span class="mt-1 block truncate text-xs ' +
          (active ? "text-white/70" : "text-muted") +
          '">' +
          sellerEsc(chat.preview) +
          "</span>" +
          '<span class="mt-2 inline-flex max-w-full truncate rounded-full px-2.5 py-1 text-[11px] font-bold ' +
          (active ? "bg-white/10 text-white" : "bg-sand-50 text-clay-700") +
          '">' +
          sellerEsc(chat.product) +
          "</span>" +
          "</span>" +
          (chat.unread ? '<span class="flex h-6 min-w-6 items-center justify-center rounded-full bg-clay-600 px-1 text-xs font-extrabold text-white">' + chat.unread + "</span>" : "") +
          "</button>"
        );
      })
      .join("");
  }

  function renderThread() {
    var chat = activeChat();
    var name = document.querySelector("[data-customer-active-name]");
    var meta = document.querySelector("[data-customer-active-meta]");
    var initial = document.querySelector("[data-customer-active-initial]");
    if (name) name.textContent = chat.name;
    if (meta) meta.textContent = chat.meta;
    if (initial) initial.textContent = chat.initial;

    thread.innerHTML = chat.messages
      .map(function (message) {
        var seller = message.from === "seller";
        return (
          '<div class="flex ' +
          (seller ? "justify-end" : "justify-start") +
          '">' +
          '<div class="max-w-[78%] rounded-[1.35rem] px-4 py-3 text-sm leading-6 shadow-soft ' +
          (seller ? "rounded-br-md bg-cocoa-900 text-white" : "rounded-bl-md bg-white text-cocoa-900") +
          '">' +
          '<p>' +
          sellerEsc(message.text) +
          "</p>" +
          '<p class="mt-1 text-[11px] font-semibold ' +
          (seller ? "text-white/55" : "text-muted") +
          '">' +
          sellerEsc(message.time) +
          "</p>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    thread.scrollTop = thread.scrollHeight;
  }

  list.addEventListener("click", function (event) {
    var button = event.target.closest("[data-customer-chat]");
    if (!button) return;
    activeId = button.dataset.customerChat;
    var chat = activeChat();
    chat.unread = 0;
    renderList();
    renderThread();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value = input.value.trim();
    if (!value) return;
    activeChat().messages.push({
      from: "seller",
      text: value,
      time: "Baru saja",
    });
    activeChat().preview = value;
    activeChat().time = "Baru";
    input.value = "";
    renderList();
    renderThread();
  });

  renderList();
  renderThread();
}

function renderOverviewProductListings() {
  var wrapper = document.querySelector("[data-overview-products]");
  if (!wrapper) return;
  var products = readSellerProducts();
  wrapper.innerHTML = products
    .map(function (item) {
      var statusClass = item.status === "Aktif" && Number(item.stock) > 0
        ? "bg-emerald-50 text-emerald-700"
        : item.status === "Review"
          ? "bg-sky-50 text-sky-700"
          : "bg-amber-50 text-amber-700";
      return (
        '<a class="flex items-center gap-4 rounded-3xl border border-cocoa-900/8 bg-white p-3 transition hover:border-clay-200 hover:bg-sand-50" href="seller-products.html">' +
        '<img class="h-16 w-16 rounded-2xl object-cover" src="' +
        sellerEsc(item.image) +
        '" alt="' +
        sellerEsc(item.name) +
        '" />' +
        '<div class="min-w-0 flex-1">' +
        '<p class="truncate text-sm font-extrabold text-cocoa-900">' +
        sellerEsc(item.name) +
        "</p>" +
        '<p class="mt-1 text-xs text-muted">' +
        sellerEsc(item.category) +
        " • " +
        Number(item.stock || 0) +
        " stok</p>" +
        "</div>" +
        '<span class="rounded-full px-3 py-1 text-xs font-bold ' +
        statusClass +
        '">' +
        sellerEsc(Number(item.stock) <= 0 ? "Habis" : item.status) +
        "</span>" +
        "</a>"
      );
    })
    .join("");
}

function renderSalesLineChart() {
  var root = document.querySelector("[data-sales-chart]");
  if (!root) return;

  var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  var revenue = [4.6, 5.8, 5.1, 7.2, 8.4, 7.7, 9.3, 10.8, 9.9, 11.6, 12.4, 14.1];
  var orders = [12, 16, 14, 19, 21, 20, 24, 27, 25, 29, 31, 35];
  var width = 760;
  var height = 280;
  var pad = { top: 24, right: 28, bottom: 42, left: 48 };
  var plotW = width - pad.left - pad.right;
  var plotH = height - pad.top - pad.bottom;
  var maxRevenue = Math.max.apply(null, revenue) * 1.15;
  var maxOrders = Math.max.apply(null, orders) * 1.15;

  function point(value, index, max) {
    var x = pad.left + (plotW / (months.length - 1)) * index;
    var y = pad.top + plotH - (value / max) * plotH;
    return { x: x, y: y };
  }

  function pathFor(values, max) {
    return values
      .map(function (value, index) {
        var p = point(value, index, max);
        return (index ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1);
      })
      .join(" ");
  }

  function gridLines() {
    return [0, 0.25, 0.5, 0.75, 1]
      .map(function (ratio) {
        var y = pad.top + plotH - plotH * ratio;
        var label = Math.round(maxRevenue * ratio);
        return '<line x1="' + pad.left + '" y1="' + y.toFixed(1) + '" x2="' + (width - pad.right) + '" y2="' + y.toFixed(1) + '" stroke="rgba(29,18,14,0.08)" /><text x="12" y="' + (y + 4).toFixed(1) + '" fill="#7c655b" font-size="11" font-weight="700">Rp ' + label + 'jt</text>';
      })
      .join("");
  }

  function monthLabels() {
    return months
      .map(function (month, index) {
        var p = point(0, index, maxRevenue);
        return '<text x="' + p.x.toFixed(1) + '" y="' + (height - 12) + '" text-anchor="middle" fill="#7c655b" font-size="11" font-weight="700">' + month + "</text>";
      })
      .join("");
  }

  function hitDots() {
    return months
      .map(function (month, index) {
        var p = point(revenue[index], index, maxRevenue);
        return '<circle class="cursor-pointer opacity-0 transition hover:opacity-100 focus:opacity-100" tabindex="0" role="button" aria-label="' + month + ': omzet Rp ' + revenue[index] + ' juta, ' + orders[index] + ' order" data-chart-point data-month="' + month + '" data-revenue="' + revenue[index] + '" data-orders="' + orders[index] + '" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="11" fill="#c45320" fill-opacity="0.18" stroke="#c45320" stroke-width="2" />';
      })
      .join("");
  }

  root.innerHTML =
    '<svg class="h-full w-full" viewBox="0 0 ' +
    width +
    " " +
    height +
    '" fill="none" aria-label="Line chart performa penjualan bulanan">' +
    gridLines() +
    monthLabels() +
    '<path d="' +
    pathFor(revenue, maxRevenue) +
    '" stroke="#c45320" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />' +
    '<path d="' +
    pathFor(orders, maxOrders) +
    '" stroke="#1f8a63" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 8" />' +
    revenue
      .map(function (value, index) {
        var p = point(value, index, maxRevenue);
        return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4.5" fill="#fff" stroke="#c45320" stroke-width="3" />';
      })
      .join("") +
    hitDots() +
    "</svg>" +
    '<div class="pointer-events-none absolute left-4 top-4 hidden rounded-2xl border border-cocoa-900/8 bg-white px-4 py-3 text-xs shadow-card" data-chart-tooltip><p class="font-extrabold text-cocoa-900" data-chart-tooltip-month></p><p class="mt-1 text-muted"><span class="font-bold text-clay-700" data-chart-tooltip-revenue></span> omzet</p><p class="mt-1 text-muted"><span class="font-bold text-emerald-700" data-chart-tooltip-orders></span> order</p></div>';

  var tooltip = root.querySelector("[data-chart-tooltip]");
  var tooltipMonth = root.querySelector("[data-chart-tooltip-month]");
  var tooltipRevenue = root.querySelector("[data-chart-tooltip-revenue]");
  var tooltipOrders = root.querySelector("[data-chart-tooltip-orders]");

  function showTooltip(target) {
    if (!tooltip) return;
    tooltipMonth.textContent = target.dataset.month;
    tooltipRevenue.textContent = "Rp " + target.dataset.revenue + "jt";
    tooltipOrders.textContent = target.dataset.orders;
    tooltip.classList.remove("hidden");
    tooltip.style.left = Math.min(Number(target.getAttribute("cx")) + 18, width - 148) / width * 100 + "%";
    tooltip.style.top = Math.max(Number(target.getAttribute("cy")) - 54, 12) / height * 100 + "%";
  }

  root.querySelectorAll("[data-chart-point]").forEach(function (pointEl) {
    pointEl.addEventListener("mouseenter", function () { showTooltip(pointEl); });
    pointEl.addEventListener("focus", function () { showTooltip(pointEl); });
    pointEl.addEventListener("mouseleave", function () { tooltip && tooltip.classList.add("hidden"); });
    pointEl.addEventListener("blur", function () { tooltip && tooltip.classList.add("hidden"); });
  });
}

function sellerEsc(value) {
  return String(value || "").replace(/[&<>"']/g, function (char) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
}

function sellerRupiah(value) {
  if (window.KaryaCart && window.KaryaCart.formatRupiah) return window.KaryaCart.formatRupiah(value);
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function productBadge(status, stock) {
  if (Number(stock) <= 0) return '<span class="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Stok Habis</span>';
  if (status === "Aktif") return '<span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Aktif</span>';
  if (status === "Review") return '<span class="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">Review</span>';
  return '<span class="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Draft</span>';
}

function updateProductSummary(products) {
  var active = products.filter(function (item) {
    return item.status === "Aktif" && Number(item.stock) > 0;
  }).length;
  var ready = products.filter(function (item) {
    return Number(item.stock) > 0;
  }).length;
  var drafts = products.filter(function (item) {
    return item.status !== "Aktif";
  }).length;

  var totalEl = document.querySelector("[data-product-total]");
  var readyEl = document.querySelector("[data-product-ready]");
  var draftTotalEl = document.querySelector("[data-product-draft-total]");
  var dashboardProducts = document.querySelector("[data-dashboard-products]");
  var dashboardDrafts = document.querySelector("[data-dashboard-product-drafts]");
  if (totalEl) totalEl.textContent = products.length;
  if (readyEl) readyEl.textContent = ready;
  if (draftTotalEl) draftTotalEl.textContent = drafts;
  if (dashboardProducts) dashboardProducts.textContent = active;
  if (dashboardDrafts) dashboardDrafts.textContent = drafts + " draft/review";
}

function renderSellerProductTable() {
  var tableBody = document.querySelector("[data-product-table]");
  var products = readSellerProducts();
  updateProductSummary(products);
  if (!tableBody) return;

  tableBody.innerHTML = products
    .map(function (item) {
      return (
        '<tr class="border-t border-cocoa-900/8 align-middle" data-product-id="' +
        sellerEsc(item.id) +
        '">' +
        '<td class="min-w-[280px] px-6 py-5"><div class="flex items-center gap-3">' +
        '<img class="h-16 w-16 rounded-2xl object-cover" src="' +
        sellerEsc(item.image) +
        '" alt="' +
        sellerEsc(item.name) +
        '" />' +
        '<div><p class="font-semibold text-cocoa-900">' +
        sellerEsc(item.name) +
        '</p><p class="mt-1 text-xs text-muted">' +
        sellerEsc(item.category) +
        "</p></div>" +
        "</div></td>" +
        '<td class="px-6 py-5 text-muted">' +
        sellerEsc(item.variant) +
        "</td>" +
        '<td class="px-6 py-5 font-semibold text-cocoa-900">' +
        Number(item.stock || 0) +
        "</td>" +
        '<td class="px-6 py-5 font-semibold text-clay-700">' +
        sellerRupiah(item.price) +
        "</td>" +
        '<td class="px-6 py-5 text-muted">' +
        sellerEsc(item.weight) +
        "</td>" +
        '<td class="px-6 py-5 text-muted">' +
        sellerEsc(item.dimension) +
        "</td>" +
        '<td class="px-6 py-5">' +
        productBadge(item.status, item.stock) +
        "</td>" +
        '<td class="min-w-[170px] px-6 py-5"><div class="flex flex-col gap-2 sm:flex-row sm:justify-end">' +
        '<button class="inline-flex min-h-10 min-w-20 items-center justify-center rounded-full border border-cocoa-900/10 px-4 text-sm font-semibold text-cocoa-900 transition hover:border-clay-300 hover:text-clay-700" type="button" data-product-edit>Edit</button>' +
        '<button class="inline-flex min-h-10 min-w-20 items-center justify-center rounded-full border border-red-100 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100" type="button" data-product-delete>Hapus</button>' +
        "</div></td>" +
        "</tr>"
      );
    })
    .join("");
}

function initSellerProductCrud() {
  renderSellerProductTable();

  var tableBody = document.querySelector("[data-product-table]");
  var modal = document.querySelector("[data-product-modal]");
  var form = document.querySelector("[data-product-form]");
  var addButton = document.querySelector("[data-product-add]");
  var modalTitle = document.querySelector("[data-product-modal-title]");
  if (!tableBody || !modal || !form) return;

  function collectFormProduct() {
    var data = new FormData(form);
    return {
      id: data.get("id") || "PRD-" + Date.now().toString().slice(-6),
      name: data.get("name"),
      category: data.get("category"),
      variant: data.get("variant"),
      stock: Number(data.get("stock") || 0),
      price: Number(data.get("price") || 0),
      weight: data.get("weight"),
      dimension: data.get("dimension"),
      status: data.get("status"),
      image: data.get("image"),
      description: data.get("description"),
    };
  }

  function updatePreview() {
    var product = collectFormProduct();
    var image = document.querySelector("[data-product-preview-image]");
    var category = document.querySelector("[data-product-preview-category]");
    var name = document.querySelector("[data-product-preview-name]");
    var description = document.querySelector("[data-product-preview-description]");
    var price = document.querySelector("[data-product-preview-price]");
    var stock = document.querySelector("[data-product-preview-stock]");
    if (image) image.src = product.image || "../assets/images/marketplace/rattan-bag.png";
    if (category) category.textContent = product.category || "Kategori";
    if (name) name.textContent = product.name || "Nama Produk";
    if (description) description.textContent = product.description || "Deskripsi produk akan tampil di sini.";
    if (price) price.textContent = sellerRupiah(product.price || 0);
    if (stock) stock.textContent = Number(product.stock || 0) + " stok";
  }

  function setFormProduct(product) {
    form.elements.id.value = product.id || "";
    form.elements.name.value = product.name || "";
    form.elements.category.value = product.category || "Tas & Aksesoris";
    form.elements.variant.value = product.variant || "";
    form.elements.status.value = product.status || "Aktif";
    form.elements.price.value = product.price || "";
    form.elements.stock.value = product.stock || "";
    form.elements.weight.value = product.weight || "";
    form.elements.dimension.value = product.dimension || "";
    form.elements.image.value = product.image || "../assets/images/marketplace/rattan-bag.png";
    form.elements.description.value = product.description || "";
    updatePreview();
  }

  function openProductModal(product) {
    if (modalTitle) modalTitle.textContent = product && product.id ? "Edit Produk" : "Tambah Produk";
    setFormProduct(product || {});
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(function () {
      form.elements.name.focus();
    }, 50);
  }

  function closeProductModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    form.reset();
  }

  addButton &&
    addButton.addEventListener("click", function () {
      openProductModal({ status: "Aktif", image: "../assets/images/marketplace/rattan-bag.png" });
    });

  modal.querySelectorAll("[data-product-close]").forEach(function (button) {
    button.addEventListener("click", closeProductModal);
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeProductModal();
  });

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var product = collectFormProduct();
    var products = readSellerProducts();
    var existingIndex = products.findIndex(function (item) {
      return item.id === product.id;
    });
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.unshift(product);
    }
    saveSellerProducts(products);
    renderSellerProductTable();
    closeProductModal();
  });

  tableBody.addEventListener("click", function (event) {
    var row = event.target.closest("[data-product-id]");
    if (!row) return;
    var products = readSellerProducts();
    var product = products.find(function (item) {
      return item.id === row.dataset.productId;
    });
    if (event.target.closest("[data-product-edit]") && product) {
      openProductModal(product);
    }
    if (event.target.closest("[data-product-delete]") && product) {
      saveSellerProducts(
        products.filter(function (item) {
          return item.id !== product.id;
        })
      );
      renderSellerProductTable();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeProductModal();
  });
}

function getFallbackSellerOrders() {
  return [
    {
      id: "KL-20260401",
      product: "Tas Rotan Bali Premium",
      buyer: "Nadia Rahma",
      status: "Diproses",
      total: 1250000,
      date: "29 Apr, 10:24",
    },
    {
      id: "KL-20260398",
      product: "Kain Batik Tulis Solo",
      buyer: "Raka Pratama",
      status: "Dikirim",
      total: 1200000,
      date: "28 Apr, 16:05",
    },
    {
      id: "KL-20260395",
      product: "Tas Kain Batik Solo",
      buyer: "Ayu Lestari",
      status: "Selesai",
      total: 975000,
      date: "27 Apr, 09:41",
    },
  ];
}

function getSellerOrders() {
  var cart = window.KaryaCart;
  if (!cart || !cart.getOrders) return getFallbackSellerOrders();
  var orders = cart.getOrders();
  if (!orders.length) return getFallbackSellerOrders();
  return orders.map(function (order) {
    var item = (order.items && order.items[0]) || {};
    return {
      id: order.id,
      product: item.title || "Pesanan Karya Lokal",
      buyer: (order.customer && order.customer.name) || "Customer",
      status: order.status || "Diproses",
      total: (order.summary && order.summary.total) || 0,
      date: order.createdAt ? new Date(order.createdAt).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "Hari ini",
    };
  });
}

function orderBadge(status) {
  if (status === "Selesai") return "bg-emerald-100 text-emerald-700";
  if (status === "Dikirim") return "bg-sky-100 text-sky-700";
  if (status === "Menunggu Pembayaran") return "bg-amber-100 text-amber-700";
  return "bg-clay-50 text-clay-700";
}

function renderSellerOrders() {
  var orders = getSellerOrders();
  var revenue = orders.reduce(function (total, order) {
    return total + Number(order.total || 0);
  }, 0);
  var active = orders.filter(function (order) {
    return order.status !== "Selesai";
  }).length;

  var revenueEl = document.querySelector("[data-dashboard-revenue]");
  var activeEl = document.querySelector("[data-dashboard-active-orders]");
  if (revenueEl) revenueEl.textContent = sellerRupiah(revenue || 8400000);
  if (activeEl) activeEl.textContent = active || 3;

  document.querySelectorAll("[data-dashboard-orders]").forEach(function (body) {
    var limit = Number(body.dataset.limit || orders.length);
    body.innerHTML = orders
      .slice(0, limit)
      .map(function (order) {
        return (
          '<tr class="border-t border-cocoa-900/8">' +
          '<td class="px-6 py-4 font-mono text-xs text-muted">#' +
          sellerEsc(order.id) +
          "</td>" +
          '<td class="px-6 py-4 font-semibold text-cocoa-900">' +
          sellerEsc(order.product) +
          "</td>" +
          '<td class="px-6 py-4 text-muted">' +
          sellerEsc(order.buyer) +
          "</td>" +
          '<td class="px-6 py-4 text-muted">' +
          sellerEsc(order.date) +
          "</td>" +
          '<td class="px-6 py-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold ' +
          orderBadge(order.status) +
          '">' +
          sellerEsc(order.status) +
          "</span></td>" +
          '<td class="px-6 py-4 text-right font-semibold text-cocoa-900">' +
          sellerRupiah(order.total) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
  });
}
