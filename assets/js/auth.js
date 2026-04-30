/* ===========================
   Auth Page — Karya Lokal
   Sliding Panel Swap + Rotating Quotes & Images
   =========================== */

(function () {
  'use strict';

  var staleHeader = document.querySelector('.figma-header');
  if (staleHeader) staleHeader.remove();
  if (document.body) document.body.classList.remove('figma-header-ready');

  /* -------------------------------------------------------
     Data: Indonesian craft & heritage quotes
     ------------------------------------------------------- */
  var quotes = [
    { text: '"Setiap goresan tangan adalah cerita yang abadi dari Nusantara."',                         cite: '— Pepatah Nusantara' },
    { text: '"Bersama Karya Lokal, kerajinan tangan saya menjangkau pecinta seni di seluruh nusantara."', cite: '— Siti Aminah, Pengrajin Tenun' },
    { text: '"Batik bukan sekadar kain, ia adalah doa yang diukir dengan malam dan canting."',           cite: '— Pepatah Jawa' },
    { text: '"Kerajinan tangan adalah jembatan antara warisan leluhur dan masa depan bangsa."',           cite: '— Pramoedya Ananta Toer' },
    { text: '"Di setiap helai tenun tersimpan kisah perempuan Indonesia yang tak pernah padam."',         cite: '— Ibu Marta, Pengrajin Ulos' },
    { text: '"Tangan yang terampil menciptakan keindahan, hati yang tulus menjaga tradisi."',             cite: '— Filosofi Pengrajin' },
    { text: '"Seni kerajinan adalah napas budaya yang menghidupkan identitas bangsa."',                   cite: '— Ki Hajar Dewantara' },
    { text: '"Dari tanah liat hingga gerabah indah, tangan manusia mengubah bumi menjadi karya seni."',  cite: '— Pengrajin Kasongan, Yogyakarta' },
    { text: '"Warisan budaya bukan untuk disimpan di museum, tapi untuk hidup di tangan para perajin."',  cite: '— Filosofi Nusantara' },
    { text: '"Karya lokal bukan sekadar produk, ia adalah cerita, identitas, dan kebanggaan."',           cite: '— Komunitas Pengrajin Indonesia' },
    { text: '"Setiap ukiran kayu Jepara menyimpan semangat para pengukir yang tak kenal lelah."',         cite: '— Pak Sugeng, Pengukir Jepara' },
    { text: '"Songket adalah emas yang ditenun, mengalir dari generasi ke generasi."',                    cite: '— Pepatah Palembang' }
  ];

  /* -------------------------------------------------------
     Data: Background images
     ------------------------------------------------------- */
  var bgImages = [
    '../assets/images/df76563238df56947a3b7ac4b3423243b5643aed.png',
    '../assets/images/3c72c6c67e3cf1df65312494e32414a36d4f14d3.png',
    '../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png',
    '../assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png',
    '../assets/images/0bfe8a25be9b1574ac37c77c1068bf2566685320.png',
    '../assets/images/269ae8e0d913d37f54a4f506a1c361c3221484e3.png',
    '../assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png',
    '../assets/images/64baf6bfb50ffbe62b3dbb2617d1de675826e7cf.png',
    '../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png',
    '../assets/images/9b4a56fce54be094169859886f23fb807948e612.png'
  ];

  var QUOTE_INTERVAL = 6000;
  var IMAGE_INTERVAL = 8000;
  var FADE_MS        = 500;
  var SLIDE_MS       = 700;   // must match --slide-duration in CSS

  /* -------------------------------------------------------
     DOM references
     ------------------------------------------------------- */
  var container       = document.getElementById('authContainer');
  var imagePanel      = document.querySelector('.image-panel');
  var loginContent    = document.getElementById('loginContent');
  var registerContent = document.getElementById('registerContent');
  var quoteText       = document.getElementById('quoteText');
  var quoteCite       = document.getElementById('quoteCite');

  if (!container || !imagePanel) return;

  var currentQuoteIdx = Math.floor(Math.random() * quotes.length);
  var currentImgIdx   = Math.floor(Math.random() * bgImages.length);
  var isAnimating     = false;

  /* -------------------------------------------------------
     1. Background image crossfade setup
     ------------------------------------------------------- */
  function initBgLayers() {
    imagePanel.style.backgroundImage = 'none';

    var layerA = document.createElement('div');
    layerA.className = 'bg-layer active';
    layerA.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';

    var layerB = document.createElement('div');
    layerB.className = 'bg-layer inactive';
    layerB.style.backgroundImage = 'url("' + bgImages[(currentImgIdx + 1) % bgImages.length] + '")';

    imagePanel.insertBefore(layerB, imagePanel.firstChild);
    imagePanel.insertBefore(layerA, imagePanel.firstChild);

    return { a: layerA, b: layerB, which: 'a' };
  }

  var layers = initBgLayers();

  function rotateImage() {
    currentImgIdx = (currentImgIdx + 1) % bgImages.length;
    var next = (currentImgIdx + 1) % bgImages.length;

    if (layers.which === 'a') {
      layers.b.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';
      layers.b.className = 'bg-layer active';
      layers.a.className = 'bg-layer inactive';
      layers.which = 'b';
    } else {
      layers.a.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';
      layers.a.className = 'bg-layer active';
      layers.b.className = 'bg-layer inactive';
      layers.which = 'a';
    }

    var img = new Image();
    img.src = bgImages[next];
  }

  /* -------------------------------------------------------
     2. Quote rotation
     ------------------------------------------------------- */
  function setQuote(idx) {
    if (!quoteText || !quoteCite) return;
    quoteText.textContent = quotes[idx].text;
    quoteCite.textContent = quotes[idx].cite;
  }

  setQuote(currentQuoteIdx);

  function rotateQuote() {
    if (!quoteText || !quoteCite) return;
    quoteText.style.opacity = '0';
    quoteCite.style.opacity = '0';

    setTimeout(function () {
      currentQuoteIdx = (currentQuoteIdx + 1) % quotes.length;
      setQuote(currentQuoteIdx);
      quoteText.style.opacity = '1';
      quoteCite.style.opacity = '1';
    }, FADE_MS);
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    setInterval(rotateQuote, QUOTE_INTERVAL);
    setInterval(rotateImage, IMAGE_INTERVAL);
  }

  /* -------------------------------------------------------
     3. Sliding Panel Swap
     ------------------------------------------------------- */
  function showLogin() {
    if (isAnimating) return;
    if (!container.classList.contains('register-mode')) return;

    isAnimating = true;
    container.classList.add('is-animating');

    registerContent.classList.remove('is-active');

    container.classList.remove('register-mode');

    document.title = 'Masuk — Karya Lokal';

    setTimeout(function () {
      loginContent.classList.add('is-active');
    }, 50);

    setTimeout(function () {
      isAnimating = false;
      container.classList.remove('is-animating');
    }, SLIDE_MS + 100);
  }

  function showRegister() {
    if (isAnimating) return;
    if (container.classList.contains('register-mode')) return;

    isAnimating = true;
    container.classList.add('is-animating');

    loginContent.classList.remove('is-active');

    container.classList.add('register-mode');

    document.title = 'Daftar — Karya Lokal';

    setTimeout(function () {
      registerContent.classList.add('is-active');
    }, 50);

    setTimeout(function () {
      isAnimating = false;
      container.classList.remove('is-animating');
    }, SLIDE_MS + 100);
  }

  /* -------------------------------------------------------
     4. Toggle links — event delegation
     ------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.toggle-auth-link');
    if (!link) return;

    e.preventDefault();
    var target = link.getAttribute('data-target');

    if (target === 'register') {
      showRegister();
      history.replaceState(null, '', '#register');
    } else {
      showLogin();
      history.replaceState(null, '', '#login');
    }
  });

  /* -------------------------------------------------------
     5. Handle URL hash on load (#register)
     ------------------------------------------------------- */
  if (window.location.hash === '#register') {
    // instant switch — skip animation
    loginContent.classList.remove('is-active');
    container.classList.add('register-mode');
    registerContent.classList.add('is-active');
    document.title = 'Daftar — Karya Lokal';
  }

  /* -------------------------------------------------------
     6. Password visibility toggle
     ------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.toggle-password');
    if (!btn) return;

    var input  = document.getElementById(btn.getAttribute('data-target'));
    if (!input) return;

    var eyeOff = btn.querySelector('.eye-off');
    var eyeOn  = btn.querySelector('.eye-on');

    if (input.type === 'password') {
      input.type = 'text';
      if (eyeOff) eyeOff.style.display = 'none';
      if (eyeOn)  eyeOn.style.display  = 'block';
    } else {
      input.type = 'password';
      if (eyeOff) eyeOff.style.display = 'block';
      if (eyeOn)  eyeOn.style.display  = 'none';
    }
  });

  /* -------------------------------------------------------
     7. Form submit handlers
     ------------------------------------------------------- */
  /* Login form submit is handled inline in login.html to avoid double-registration */

  var regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var pw  = document.getElementById('reg-password');
      var cpw = document.getElementById('reg-confirm-password');

      if (pw && cpw && pw.value !== cpw.value) {
        // Show inline error instead of alert
        var existing = cpw.parentElement.parentElement.querySelector('.field-error');
        if (!existing) {
          var err = document.createElement('p');
          err.className = 'field-error mt-1 text-xs font-medium text-red-600';
          err.setAttribute('role', 'alert');
          err.textContent = 'Kata sandi tidak cocok. Silakan periksa kembali.';
          cpw.parentElement.parentElement.appendChild(err);
          cpw.parentElement.classList.add('border-red-300');
          setTimeout(function () {
            if (err.parentNode) err.remove();
            cpw.parentElement.classList.remove('border-red-300');
          }, 4000);
        }
        cpw.focus();
        return;
      }

      regForm.reset();
      window.location.href = 'verify-code.html';
    });
  }

})();
