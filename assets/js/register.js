/* ===========================
   Register Page — Karya Lokal
   =========================== */

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

  var imagePanel = document.querySelector('.image-panel');
  var quoteText  = document.getElementById('quoteText');
  var quoteCite  = document.getElementById('quoteCite');

  if (!imagePanel) return;

  var currentQuoteIdx = Math.floor(Math.random() * quotes.length);
  var currentImgIdx   = Math.floor(Math.random() * bgImages.length);

  /* --- Background image crossfade --- */
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

  /* --- Quote rotation --- */
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

  setInterval(rotateQuote, QUOTE_INTERVAL);
  setInterval(rotateImage, IMAGE_INTERVAL);

  /* --- Password visibility toggle --- */
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

  /* --- Register form submit --- */
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
      alert('Pendaftaran berhasil! (Hubungkan ke backend Anda.)');
      regForm.reset();
    });
  }

})();
