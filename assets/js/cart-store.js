(function () {
  "use strict";

  const CART_KEY = "karyaLokal.cart.v1";
  const CHECKOUT_KEY = "karyaLokal.checkout.v1";
  const ORDER_KEY = "karyaLokal.lastOrder.v1";
  const ORDERS_KEY = "karyaLokal.orders.v1";
  const WISHLIST_KEY = "karyaLokal.wishlist.v1";
  const RECENT_KEY = "karyaLokal.recentlyViewed.v1";
  const REVIEWS_KEY = "karyaLokal.reviews.v1";
  const subscribers = new Set();

  const seedItems = [
    {
      slug: "tas-rotan-bulat-premium",
      title: "Tas Rotan Bulat Premium",
      seller: "Anyaman Nusantara",
      option: "Medium",
      image: "assets/images/marketplace/rattan-bag.png",
      price: 250000,
      quantity: 1,
    },
    {
      slug: "mug-keramik-hand-made-bali",
      title: "Mug Keramik Hand-made Bali",
      seller: "Ubud Clay Studio",
      option: "Krem",
      image: "assets/images/marketplace/ceramic-mug.png",
      price: 150000,
      quantity: 1,
    },
    {
      slug: "mangkuk-kayu-jati-ukir",
      title: "Mangkuk Kayu Jati Ukir",
      seller: "Kriya Kayu Jepara",
      option: "20 cm",
      image: "assets/images/marketplace/wooden-decor.png",
      price: 85000,
      quantity: 1,
    },
  ];

  const readJson = (key, fallback) => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const writeJson = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  };

  const normalizeImage = (src) => String(src || "").replace(/^(\.\.\/)+/, "");
  const clampQty = (value) => Math.max(1, Math.min(99, Number(value) || 1));
  const moneyToNumber = (value) => Number(String(value || "").replace(/[^\d]/g, "")) || 0;

  function getItems() {
    const stored = readJson(CART_KEY, null);
    if (Array.isArray(stored)) return stored;
    writeJson(CART_KEY, seedItems);
    return seedItems;
  }

  function setItems(items) {
    writeJson(CART_KEY, items);
    subscribers.forEach((callback) => callback(items));
  }

  function addItem(item) {
    const items = getItems();
    const slug = item.slug || slugify(item.title);
    const option = item.option || "";
    const existing = items.find((entry) => entry.slug === slug && (entry.option || "") === option);

    if (existing) {
      existing.quantity = clampQty(existing.quantity + clampQty(item.quantity));
    } else {
      items.push({
        slug,
        title: item.title,
        seller: item.seller || "Karya Lokal",
        option,
        image: normalizeImage(item.image),
        price: Number(item.price) || moneyToNumber(item.priceText),
        quantity: clampQty(item.quantity),
      });
    }

    setItems(items);
    return getSummary(items);
  }

  function updateQuantity(slug, option, quantity) {
    const items = getItems().map((item) => {
      if (item.slug === slug && (item.option || "") === (option || "")) {
        return { ...item, quantity: clampQty(quantity) };
      }
      return item;
    });
    setItems(items);
    return getSummary(items);
  }

  function removeItem(slug, option) {
    const items = getItems().filter((item) => !(item.slug === slug && (item.option || "") === (option || "")));
    setItems(items);
    return getSummary(items);
  }

  function clearCart() {
    setItems([]);
  }

  function getSummary(items = getItems(), checkout = getCheckout()) {
    const subtotal = items.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0);
    const quantity = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
    const artisanCount = new Set(items.map((item) => item.seller).filter(Boolean)).size;
    const shipping = getShippingCost(checkout.shipping, subtotal);
    const discount = checkout.promo === "KARYA10" ? Math.round(subtotal * 0.1) : 0;
    return {
      subtotal,
      quantity,
      artisanCount,
      shipping,
      discount,
      total: Math.max(0, subtotal + shipping - discount),
    };
  }

  function getShippingCost(type = "regular", subtotal = 0) {
    if (type === "free" && subtotal >= 2000000) return 0;
    if (type === "express") return 45000;
    return 25000;
  }

  function getCheckout() {
    return {
      shipping: "regular",
      promo: "",
      ...(readJson(CHECKOUT_KEY, {}) || {}),
    };
  }

  function setCheckout(update) {
    const checkout = { ...getCheckout(), ...update };
    writeJson(CHECKOUT_KEY, checkout);
    subscribers.forEach((callback) => callback(getItems()));
    return checkout;
  }

  function createOrder(customer) {
    const items = getItems();
    const checkout = getCheckout();
    const summary = getSummary(items, checkout);
    const order = {
      id: `KL-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer,
      checkout,
      items,
      summary,
      status: "Menunggu Pembayaran",
      trackingNumber: `KRY${Date.now().toString().slice(-8)}`,
    };
    writeJson(ORDER_KEY, order);
    writeJson(ORDERS_KEY, [order, ...getOrders()]);
    clearCart();
    return order;
  }

  function getLastOrder() {
    return readJson(ORDER_KEY, null);
  }

  function getOrders() {
    const orders = readJson(ORDERS_KEY, null);
    if (Array.isArray(orders)) return orders;
    const lastOrder = getLastOrder();
    return lastOrder ? [lastOrder] : [];
  }

  function updateOrderStatus(orderId, status) {
    const orders = getOrders().map((order) => (
      order.id === orderId ? { ...order, status } : order
    ));
    writeJson(ORDERS_KEY, orders);
    if (orders[0]) writeJson(ORDER_KEY, orders[0]);
    subscribers.forEach((callback) => callback(getItems()));
    return orders;
  }

  function getWishlist() {
    const list = readJson(WISHLIST_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function isWishlisted(slug) {
    return getWishlist().some((item) => item.slug === slug);
  }

  function toggleWishlist(product) {
    const list = getWishlist();
    const slug = product.slug;
    const exists = list.some((item) => item.slug === slug);
    const next = exists
      ? list.filter((item) => item.slug !== slug)
      : [{ ...product, image: normalizeImage(product.image) }, ...list].slice(0, 24);
    writeJson(WISHLIST_KEY, next);
    subscribers.forEach((callback) => callback(getItems()));
    return !exists;
  }

  function addRecentlyViewed(product) {
    const slug = product.slug;
    if (!slug) return getRecentlyViewed();
    const current = getRecentlyViewed().filter((item) => item.slug !== slug);
    const next = [{ ...product, image: normalizeImage(product.image), viewedAt: new Date().toISOString() }, ...current].slice(0, 8);
    writeJson(RECENT_KEY, next);
    return next;
  }

  function getRecentlyViewed() {
    const list = readJson(RECENT_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function getReviews(slug) {
    const reviews = readJson(REVIEWS_KEY, {});
    return Array.isArray(reviews[slug]) ? reviews[slug] : [];
  }

  function addReview(slug, review) {
    const reviews = readJson(REVIEWS_KEY, {});
    const entry = {
      id: `RV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      name: review.name || "Pembeli Karya Lokal",
      rating: Math.max(1, Math.min(5, Number(review.rating) || 5)),
      text: review.text || "",
    };
    reviews[slug] = [entry, ...(Array.isArray(reviews[slug]) ? reviews[slug] : [])].slice(0, 20);
    writeJson(REVIEWS_KEY, reviews);
    return reviews[slug];
  }

  function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }

  function formatRupiah(value) {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  }

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, " dan ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  window.KaryaCart = {
    addItem,
    addRecentlyViewed,
    addReview,
    clearCart,
    createOrder,
    formatRupiah,
    getCheckout,
    getItems,
    getLastOrder,
    getOrders,
    getRecentlyViewed,
    getReviews,
    getSummary,
    getWishlist,
    isWishlisted,
    moneyToNumber,
    removeItem,
    setCheckout,
    subscribe,
    toggleWishlist,
    updateOrderStatus,
    updateQuantity,
  };
}());
