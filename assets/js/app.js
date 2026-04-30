(function () {
  'use strict';

  
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

  var bgImages = [
    'assets/images/df76563238df56947a3b7ac4b3423243b5643aed.png',
    'assets/images/3c72c6c67e3cf1df65312494e32414a36d4f14d3.png',
    'assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png',
    'assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png',
    'assets/images/0bfe8a25be9b1574ac37c77c1068bf2566685320.png',
    'assets/images/269ae8e0d913d37f54a4f506a1c361c3221484e3.png',
    'assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png',
    'assets/images/64baf6bfb50ffbe62b3dbb2617d1de675826e7cf.png',
    'assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png',
    'assets/images/9b4a56fce54be094169859886f23fb807948e612.png'
  ];

  
  var QUOTE_INTERVAL = 6000;
  var IMAGE_INTERVAL = 8000;
  var FADE_MS        = 500;
  var SLIDE_MS       = 700;
  var GATE_MS        = 1200;    // gate-open duration (matches CSS)
  var PARTICLE_COUNT = 35;

  
  var overlay         = document.getElementById('authOverlay');
  var container       = document.getElementById('authContainer');
  var imagePanel      = document.querySelector('.image-panel');
  var landing         = document.getElementById('landing');
  var particleLayer   = document.getElementById('particleLayer');
  var loginContent    = document.getElementById('loginContent');
  var registerContent = document.getElementById('registerContent');
  var quoteText       = document.getElementById('quoteText');
  var quoteCite       = document.getElementById('quoteCite');
  var angklungAudio   = document.getElementById('angklungSound');

  if (!overlay || !container || !imagePanel) return;

  var currentQuoteIdx = Math.floor(Math.random() * quotes.length);
  var currentImgIdx   = Math.floor(Math.random() * bgImages.length);
  var isAnimating     = false;
  var gateOpened      = false;
  var quoteTimer, imageTimer;

  
  imagePanel.style.backgroundImage = 'none';

  var layerA = document.createElement('div');
  layerA.className = 'bg-layer active';
  layerA.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';

  var layerB = document.createElement('div');
  layerB.className = 'bg-layer inactive';
  layerB.style.backgroundImage = 'url("' + bgImages[(currentImgIdx + 1) % bgImages.length] + '")';

  imagePanel.insertBefore(layerB, imagePanel.firstChild);
  imagePanel.insertBefore(layerA, imagePanel.firstChild);

  var activeBg = 'a';

  function rotateImage() {
    currentImgIdx = (currentImgIdx + 1) % bgImages.length;
    if (activeBg === 'a') {
      layerB.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';
      layerB.className = 'bg-layer active';
      layerA.className = 'bg-layer inactive';
      activeBg = 'b';
    } else {
      layerA.style.backgroundImage = 'url("' + bgImages[currentImgIdx] + '")';
      layerA.className = 'bg-layer active';
      layerB.className = 'bg-layer inactive';
      activeBg = 'a';
    }
    var img = new Image();
    img.src = bgImages[(currentImgIdx + 1) % bgImages.length];
  }

  
  function setQuote(i) {
    if (quoteText) quoteText.textContent = quotes[i].text;
    if (quoteCite) quoteCite.textContent = quotes[i].cite;
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

  quoteTimer = setInterval(rotateQuote, QUOTE_INTERVAL);
  imageTimer = setInterval(rotateImage, IMAGE_INTERVAL);

  
  function showLogin() {
    if (isAnimating || !container.classList.contains('register-mode')) return;
    isAnimating = true;
    container.classList.add('is-animating');
    registerContent.classList.remove('is-active');
    container.classList.remove('register-mode');
    setTimeout(function () { loginContent.classList.add('is-active'); }, 50);
    setTimeout(function () { isAnimating = false; container.classList.remove('is-animating'); }, SLIDE_MS + 100);
  }

  function showRegister() {
    if (isAnimating || container.classList.contains('register-mode')) return;
    isAnimating = true;
    container.classList.add('is-animating');
    loginContent.classList.remove('is-active');
    container.classList.add('register-mode');
    setTimeout(function () { registerContent.classList.add('is-active'); }, 50);
    setTimeout(function () { isAnimating = false; container.classList.remove('is-animating'); }, SLIDE_MS + 100);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('.toggle-auth-link');
    if (!link) return;
    e.preventDefault();
    if (link.getAttribute('data-target') === 'register') {
      showRegister();
    } else {
      showLogin();
    }
  });

  if (window.location.hash === '#register') {
    loginContent.classList.remove('is-active');
    container.classList.add('register-mode');
    registerContent.classList.add('is-active');
  }

  /* 
     4.  BUNGA JEPUN (FRANGIPANI) PARTICLES
      */
  var petalSVG =
    '<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">' +
      '<g opacity="0.85">' +
        '<ellipse cx="15" cy="8"  rx="4" ry="7.5" fill="#F5D5C5" transform="rotate(0   15 15)"/>' +
        '<ellipse cx="15" cy="8"  rx="4" ry="7.5" fill="#F2C4A8" transform="rotate(72  15 15)"/>' +
        '<ellipse cx="15" cy="8"  rx="4" ry="7.5" fill="#F5D5C5" transform="rotate(144 15 15)"/>' +
        '<ellipse cx="15" cy="8"  rx="4" ry="7.5" fill="#F2C4A8" transform="rotate(216 15 15)"/>' +
        '<ellipse cx="15" cy="8"  rx="4" ry="7.5" fill="#F5D5C5" transform="rotate(288 15 15)"/>' +
        '<circle cx="15" cy="15" r="3" fill="#F0C27A"/>' +
      '</g>' +
    '</svg>';

  function spawnPetals() {
    if (!particleLayer) return;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.className = 'petal';
          el.innerHTML = petalSVG;

          var size    = 18 + Math.random() * 22;                     // 18–40px
          var startX  = Math.random() * 100;                          // % from left
          var driftX  = (Math.random() - 0.5) * 200;                 // px drift left/right
          var spin    = (Math.random() - 0.5) * 720;                 // degrees
          var dur     = 2.5 + Math.random() * 3;                     // 2.5–5.5s

          el.style.left   = startX + '%';
          el.style.top    = '-40px';
          el.style.width  = size + 'px';
          el.style.height = size + 'px';
          el.style.setProperty('--drift-x', driftX + 'px');
          el.style.setProperty('--spin', spin + 'deg');
          el.style.animationDuration = dur + 's';

          particleLayer.appendChild(el);

          setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, dur * 1000 + 200);
        }, idx * 60);  // stagger each petal by 60ms
      })(i);
    }
  }

  
  function initScrollReveal() {
    if (!landing) return;
    var revealEls = landing.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal everything immediately
      for (var i = 0; i < revealEls.length; i++) {
        revealEls[i].classList.add('is-visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < revealEls.length; j++) {
      observer.observe(revealEls[j]);
    }
  }

  /* 
     6.  GATE-OPEN TRANSITION */
  function openGate() {
    if (gateOpened) return;
    gateOpened = true;

    clearInterval(quoteTimer);
    clearInterval(imageTimer);

    if (angklungAudio) {
      angklungAudio.play().catch(function () { /* no audio file — silent fallback */ });
    }

    spawnPetals();

    overlay.classList.add('is-opening');

    setTimeout(function () {
      overlay.classList.add('is-opened');

      document.body.classList.remove('auth-active');

      if (landing) {
        landing.classList.add('is-loaded');
        initScrollReveal();
      }

      document.title = 'Karya Lokal — Platform Kerajinan Indonesia';
    }, GATE_MS);
  }

  
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      openGate();
    });
  }

  var regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var pw  = document.getElementById('reg-password');
      var cpw = document.getElementById('reg-confirm-password');
      if (pw && cpw && pw.value !== cpw.value) {
        alert('Kata sandi tidak cocok. Silakan periksa kembali.');
        return;
      }
      openGate();
    });
  }

  /* 
     8.  PASSWORD VISIBILITY TOGGLE
  */
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

})();
