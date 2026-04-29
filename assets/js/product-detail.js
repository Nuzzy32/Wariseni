(function () {
  const sellerImages = {
    textile: "../assets/images/0a786b17ad9c47ca2d8136bacb46d840c330f804.png",
    wood: "../assets/images/topbar-avatar.png",
    ceramic: "../assets/images/970ca51f6e5bd7482ecaf867242a53fb6b7dd6bd.png",
    care: "../assets/images/2dbd1dfe105eeb2db4105ee1186932846494be5e.png",
  };

  const catalog = {
    "kain-batik-tulis-solo": {
      title: "Kain Batik Tulis Solo",
      category: "Fashion",
      price: "Rp 1.200.000",
      meta: "Terjual 86 kali bulan ini",
      stock: "Stok Tersedia",
      rating: "5.0",
      reviews: "48",
      location: "Solo",
      images: [
        "../assets/images/marketplace/batik-cloth.png",
        "../assets/images/df76563238df56947a3b7ac4b3423243b5643aed.png",
        "../assets/images/9b4a56fce54be094169859886f23fb807948e612.png",
        "../assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png",
      ],
      alt: "Kain Batik Tulis Solo motif Parang klasik.",
      description: "Kain batik tulis asli dari Solo dengan motif Parang klasik. Dikerjakan memakai canting, malam, dan pewarna alami sehingga tiap helai punya karakter visual yang unik.",
      options: { title: "Motif", values: ["Parang", "Kawung", "Sido Mukti"] },
      seller: { name: "Toko Tony", location: "Solo, Jawa Tengah", products: "42 produk", rating: "4.9 rating", image: sellerImages.textile },
      storyTitle: "Tradisi Laweyan",
      story: "Kampung Batik Laweyan adalah salah satu sentra batik tertua di Indonesia. Proses batik tulisnya lambat, presisi, dan menjaga pola warisan keluarga pengrajin.",
      specs: [
        ["Material", "Katun primis 100%"],
        ["Teknik", "Batik tulis tradisional"],
        ["Motif", "Parang klasik"],
        ["Pewarna", "Alami: mengkudu, indigo, jolawe"],
        ["Ukuran", "250 cm x 110 cm"],
        ["Asal", "Kampung Batik Laweyan, Solo"],
        ["Pengerjaan", "3-4 bulan per lembar"],
      ],
      related: ["songket-palembang-gold", "sarung-tenun-lurik-solo", "kain-tenun-ikat-endek-bali"],
    },
    "mug-keramik-hand-made-bali": {
      title: "Mug Keramik Hand-made Bali",
      category: "Keramik",
      price: "Rp 150.000",
      meta: "Terjual 124 kali bulan ini",
      stock: "Sisa 18 pcs",
      rating: "4.8",
      reviews: "36",
      location: "Bali",
      images: [
        "../assets/images/marketplace/ceramic-mug.png",
        "../assets/images/9ab933d51d82d72684a56b37945b280ce85af9c7.png",
        "../assets/images/b175be3288918b1740487725749bb77976010078.png",
        "../assets/images/cacb426a240743fd39b8573f2accfd858d560210.png",
      ],
      alt: "Mug keramik handmade warna krem.",
      description: "Mug keramik handmade dari studio kecil di Ubud. Glasir dibuat tipis agar tekstur tanah liat tetap terasa, cocok untuk kopi pagi atau teh sore.",
      options: { title: "Warna Glasir", values: ["Krem", "Sage", "Terracotta"] },
      seller: { name: "Ubud Clay Studio", location: "Ubud, Bali", products: "31 produk", rating: "4.8 rating", image: sellerImages.ceramic },
      storyTitle: "Dibakar dalam Batch Kecil",
      story: "Setiap mug dibentuk manual lalu dibakar dalam batch kecil. Perbedaan titik glasir, noda kecil, dan tepian yang tidak seragam adalah bagian dari karakter keramik handmade.",
      specs: [
        ["Material", "Stoneware food grade"],
        ["Kapasitas", "320 ml"],
        ["Teknik", "Wheel thrown dan hand finishing"],
        ["Finishing", "Glasir matte food safe"],
        ["Perawatan", "Aman untuk microwave dan dishwasher"],
        ["Asal", "Ubud, Bali"],
      ],
      related: ["gerabah-kasongan-yogyakarta", "tembikar-dekoratif-glazur", "mangkuk-kayu-jati-ukir"],
    },
    "tas-rotan-bulat-premium": {
      title: "Tas Rotan Bulat Premium",
      category: "Aksesoris",
      price: "Rp 250.000",
      meta: "Favorit untuk hadiah dan liburan",
      stock: "Stok Tersedia",
      rating: "4.9",
      reviews: "64",
      location: "Lombok",
      images: [
        "../assets/images/marketplace/rattan-bag.png",
        "../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png",
        "../assets/images/269ae8e0d913d37f54a4f506a1c361c3221484e3.png",
        "../assets/images/9b4a56fce54be094169859886f23fb807948e612.png",
      ],
      alt: "Tas rotan bulat anyaman.",
      description: "Tas rotan bulat dengan anyaman rapat, lapisan kain batik, dan tali kulit sintetis yang nyaman dipakai harian.",
      options: { title: "Ukuran", values: ["Small", "Medium", "Large"] },
      seller: { name: "Anyaman Nusantara", location: "Lombok, NTB", products: "27 produk", rating: "4.9 rating", image: sellerImages.textile },
      storyTitle: "Anyaman Rotan Lombok",
      story: "Rotan dipilah, dikeringkan, lalu dianyam manual oleh kelompok pengrajin perempuan. Bentuk bulat dibuat dengan cetakan kayu agar struktur tetap rapi.",
      specs: [
        ["Material", "Rotan natural dan lining katun"],
        ["Diameter", "20 cm"],
        ["Tali", "Kulit sintetis adjustable"],
        ["Closure", "Kancing kait"],
        ["Asal", "Lombok"],
      ],
      related: ["tas-kanvas-motif-batik", "topi-anyam-pandan-bali", "wayang-kulit-purwa"],
    },
    "mangkuk-kayu-jati-ukir": {
      title: "Mangkuk Kayu Jati Ukir",
      category: "Home Decor",
      price: "Rp 85.000",
      meta: "Finishing food grade",
      stock: "Stok Tersedia",
      rating: "4.7",
      reviews: "22",
      location: "Jepara",
      images: [
        "../assets/images/marketplace/wooden-decor.png",
        "../assets/images/45c1b9ce24d767168e8a6917143a8d3ff8224b2f.png",
        "../assets/images/6e23bb4dcba88f8a1e85aa28787abd9e63c93907.png",
        "../assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png",
      ],
      alt: "Mangkuk kayu jati ukir.",
      description: "Mangkuk kayu jati dengan ukiran halus dan finishing food grade. Bisa dipakai untuk buah, snack kering, atau aksen meja makan.",
      options: { title: "Diameter", values: ["16 cm", "20 cm", "24 cm"] },
      seller: { name: "Kriya Kayu Jepara", location: "Jepara, Jawa Tengah", products: "35 produk", rating: "4.8 rating", image: sellerImages.wood },
      storyTitle: "Jati dari Bengkel Jepara",
      story: "Kayu jati diproses dari sisa produksi furnitur lokal. Pengrajin membentuk ulang potongan kayu menjadi objek rumah yang tahan lama.",
      specs: [
        ["Material", "Kayu jati solid"],
        ["Finishing", "Natural oil food grade"],
        ["Diameter", "20 cm"],
        ["Perawatan", "Lap kering, hindari rendam air"],
        ["Asal", "Jepara"],
      ],
      related: ["set-peralatan-makan-bambu", "topeng-kayu-ukiran-jepara", "hiasan-dinding-kulit-ukir"],
    },
    "songket-palembang-gold": {
      title: "Songket Palembang Gold",
      category: "Fashion",
      price: "Rp 2.500.000",
      meta: "Benang emas premium",
      stock: "Sisa 4 kain",
      rating: "4.9",
      reviews: "29",
      location: "Palembang",
      images: [
        "../assets/images/marketplace/songket-fabric.png",
        "../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png",
        "../assets/images/9b4a56fce54be094169859886f23fb807948e612.png",
        "../assets/images/df76563238df56947a3b7ac4b3423243b5643aed.png",
      ],
      alt: "Songket Palembang warna emas.",
      description: "Songket Palembang dengan kilau benang emas dan motif klasik. Kain ini dirancang untuk acara formal, hantaran, atau koleksi textile heritage.",
      options: { title: "Motif", values: ["Lepus", "Bungo Inten", "Nampan Perak"] },
      seller: { name: "Rumah Songket Sriwijaya", location: "Palembang, Sumatera Selatan", products: "18 produk", rating: "4.9 rating", image: sellerImages.textile },
      storyTitle: "Kilau Tenun Palembang",
      story: "Motif songket dibuat melalui tenun manual dengan sisipan benang metalik. Setiap helai membutuhkan konsentrasi tinggi agar pola simetris dan padat.",
      specs: [
        ["Material", "Sutra campuran dan benang emas"],
        ["Teknik", "Tenun songket manual"],
        ["Ukuran", "200 cm x 90 cm"],
        ["Asal", "Palembang"],
        ["Pengerjaan", "6-8 minggu"],
      ],
      related: ["kain-batik-tulis-solo", "kain-tenun-ikat-endek-bali", "kebaya-encim-batik-modern"],
    },
    "sabun-organik-kopi": {
      title: "Sabun Organik Kopi",
      category: "Perawatan",
      price: "Rp 35.000",
      meta: "Scrub kopi Gayo",
      stock: "Stok Tersedia",
      rating: "4.6",
      reviews: "58",
      location: "Aceh",
      images: [
        "../assets/images/marketplace/natural-soap.png",
        "../assets/images/2db159e91dfe7ca806ae7ad767ea0142e75bd374.png",
        "../assets/images/3356f79928bd4afcb126581479e6d5a44c953307.png",
        "../assets/images/0a71935945cc4cb3d3b65c8f3e5de9ba14f37a59.png",
      ],
      alt: "Sabun organik kopi.",
      description: "Sabun natural dengan bubuk kopi arabika Gayo sebagai eksfoliasi lembut. Aromanya hangat dan cocok untuk rutinitas mandi pagi.",
      options: { title: "Paket", values: ["1 pcs", "3 pcs", "6 pcs"] },
      seller: { name: "Gayo Botanical", location: "Aceh Tengah", products: "16 produk", rating: "4.7 rating", image: sellerImages.care },
      storyTitle: "Kopi Gayo untuk Perawatan Harian",
      story: "Bubuk kopi diambil dari petani lokal, lalu dipadukan dengan minyak kelapa dan shea butter untuk sabun yang lembut di kulit.",
      specs: [
        ["Berat", "90 gram"],
        ["Bahan utama", "Kopi arabika Gayo, minyak kelapa, shea butter"],
        ["Aroma", "Kopi hangat"],
        ["Jenis kulit", "Normal hingga berminyak"],
        ["Asal", "Aceh Tengah"],
      ],
      related: ["minyak-esensial-melati-bali", "mug-keramik-hand-made-bali", "set-peralatan-makan-bambu"],
    },
    "gerabah-kasongan-yogyakarta": {
      title: "Gerabah Kasongan Yogyakarta",
      category: "Keramik",
      price: "Rp 95.000",
      meta: "Dibakar tradisional",
      stock: "Stok Tersedia",
      rating: "4.7",
      reviews: "31",
      location: "Yogya",
      images: ["../assets/images/b175be3288918b1740487725749bb77976010078.png", "../assets/images/marketplace/ceramic-mug.png", "../assets/images/9ab933d51d82d72684a56b37945b280ce85af9c7.png", "../assets/images/cacb426a240743fd39b8573f2accfd858d560210.png"],
      alt: "Gerabah Kasongan Yogyakarta.",
      description: "Gerabah Kasongan berbahan tanah liat lokal dengan pembakaran tradisional. Bentuknya sederhana, cocok untuk vas meja atau dekor natural.",
      options: { title: "Finishing", values: ["Natural", "Hitam Doff", "Terracotta"] },
      seller: { name: "Kasongan Clay House", location: "Bantul, Yogyakarta", products: "24 produk", rating: "4.7 rating", image: sellerImages.ceramic },
      storyTitle: "Tanah Liat Kasongan",
      story: "Kasongan dikenal sebagai kampung gerabah. Setiap produk dibentuk, dijemur, dan dibakar dengan ritme kerja bengkel keluarga.",
      specs: [["Material", "Tanah liat Kasongan"], ["Teknik", "Hand-built"], ["Tinggi", "18 cm"], ["Finishing", "Terracotta natural"], ["Asal", "Yogyakarta"]],
      related: ["tembikar-dekoratif-glazur", "mug-keramik-hand-made-bali", "mangkuk-kayu-jati-ukir"],
    },
    "wayang-kulit-purwa": {
      title: "Wayang Kulit Purwa",
      category: "Aksesoris",
      price: "Rp 750.000",
      meta: "Ukiran tangan dalang senior",
      stock: "Sisa 7 karya",
      rating: "5.0",
      reviews: "17",
      location: "Yogya",
      images: ["../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png", "../assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png", "../assets/images/6e23bb4dcba88f8a1e85aa28787abd9e63c93907.png", "../assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png"],
      alt: "Wayang kulit Purwa.",
      description: "Wayang kulit Purwa untuk dekor dinding, koleksi seni, atau hadiah budaya. Detail tatahannya dibuat manual dengan pewarna tradisional.",
      options: { title: "Karakter", values: ["Arjuna", "Srikandi", "Gatotkaca"] },
      seller: { name: "Sanggar Tatah Purwa", location: "Yogyakarta", products: "21 produk", rating: "5.0 rating", image: sellerImages.wood },
      storyTitle: "Tatah Sungging Yogya",
      story: "Kulit diproses, ditatah, lalu disungging dengan warna bertahap. Proses ini menjaga proporsi karakter pewayangan klasik.",
      specs: [["Material", "Kulit kerbau dan gagang tanduk"], ["Teknik", "Tatah sungging manual"], ["Tinggi", "55 cm"], ["Asal", "Yogyakarta"], ["Pengerjaan", "2-3 minggu"]],
      related: ["hiasan-dinding-kulit-ukir", "topeng-kayu-ukiran-jepara", "tas-rotan-bulat-premium"],
    },
    "topi-anyam-pandan-bali": {
      title: "Topi Anyam Pandan Bali",
      category: "Aksesoris",
      price: "Rp 65.000",
      meta: "Ringan untuk cuaca tropis",
      stock: "Stok Tersedia",
      rating: "4.5",
      reviews: "44",
      location: "Bali",
      images: ["../assets/images/269ae8e0d913d37f54a4f506a1c361c3221484e3.png", "../assets/images/marketplace/rattan-bag.png", "../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png", "../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png"],
      alt: "Topi anyam pandan Bali.",
      description: "Topi anyam dari daun pandan kering. Bobotnya ringan, nyaman untuk pantai, kebun, atau aktivitas harian di luar ruang.",
      options: { title: "Ukuran", values: ["S-M", "M-L"] },
      seller: { name: "Pandan Bali Craft", location: "Gianyar, Bali", products: "19 produk", rating: "4.6 rating", image: sellerImages.textile },
      storyTitle: "Anyaman Pandan Pesisir",
      story: "Daun pandan dikeringkan lalu dianyam mengikuti pola radial. Tiap topi membutuhkan pengeringan yang cukup agar bentuknya kuat.",
      specs: [["Material", "Daun pandan kering"], ["Diameter", "38 cm"], ["Berat", "120 gram"], ["Asal", "Bali"], ["Perawatan", "Simpan kering"]],
      related: ["tas-rotan-bulat-premium", "tas-kanvas-motif-batik", "kain-tenun-ikat-endek-bali"],
    },
    "set-peralatan-makan-bambu": {
      title: "Set Peralatan Makan Bambu",
      category: "Home Decor",
      price: "Rp 120.000",
      meta: "Ramah lingkungan",
      stock: "Stok Tersedia",
      rating: "4.8",
      reviews: "53",
      location: "Bali",
      images: ["../assets/images/0a71935945cc4cb3d3b65c8f3e5de9ba14f37a59.png", "../assets/images/marketplace/wooden-decor.png", "../assets/images/45c1b9ce24d767168e8a6917143a8d3ff8224b2f.png", "../assets/images/2db159e91dfe7ca806ae7ad767ea0142e75bd374.png"],
      alt: "Set peralatan makan bambu.",
      description: "Set makan bambu untuk pemakaian ringan di rumah. Permukaannya halus, tahan lama, dan memberi nuansa natural di meja makan.",
      options: { title: "Paket", values: ["2 orang", "4 orang", "6 orang"] },
      seller: { name: "Bali Bamboo Works", location: "Tabanan, Bali", products: "28 produk", rating: "4.8 rating", image: sellerImages.wood },
      storyTitle: "Bambu Cepat Tumbuh",
      story: "Bambu dipilih karena tumbuh cepat dan mudah diperbarui. Pengrajin mengeringkan batang sebelum dipotong agar tidak mudah melengkung.",
      specs: [["Material", "Bambu laminasi"], ["Isi", "Piring, sendok, garpu, sumpit"], ["Finishing", "Food grade coating"], ["Asal", "Bali"], ["Perawatan", "Cuci manual"]],
      related: ["mangkuk-kayu-jati-ukir", "sabun-organik-kopi", "minyak-esensial-melati-bali"],
    },
    "sarung-tenun-lurik-solo": {
      title: "Sarung Tenun Lurik Solo",
      category: "Fashion",
      price: "Rp 350.000",
      meta: "Tenun tangan tradisional",
      stock: "Sisa 12 kain",
      rating: "4.8",
      reviews: "41",
      location: "Solo",
      images: ["../assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png", "../assets/images/marketplace/batik-cloth.png", "../assets/images/9b4a56fce54be094169859886f23fb807948e612.png", "../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png"],
      alt: "Sarung tenun lurik Solo.",
      description: "Sarung tenun lurik dengan garis klasik khas Solo. Kainnya adem, jatuh, dan mudah dipadukan untuk tampilan tradisional maupun kasual.",
      options: { title: "Warna", values: ["Cokelat", "Navy", "Hitam"] },
      seller: { name: "Lurik Laweyan", location: "Solo, Jawa Tengah", products: "25 produk", rating: "4.8 rating", image: sellerImages.textile },
      storyTitle: "Garis Lurik yang Tenang",
      story: "Lurik dikenal lewat garis ritmis yang sederhana. Pola ini ditenun manual dengan alat tenun bukan mesin oleh pengrajin Solo.",
      specs: [["Material", "Katun tenun"], ["Teknik", "ATBM"], ["Ukuran", "210 cm x 115 cm"], ["Asal", "Solo"], ["Perawatan", "Cuci lembut"]],
      related: ["kain-batik-tulis-solo", "songket-palembang-gold", "kebaya-encim-batik-modern"],
    },
    "hiasan-dinding-kulit-ukir": {
      title: "Hiasan Dinding Kulit Ukir",
      category: "Home Decor",
      price: "Rp 180.000",
      meta: "Motif batik mega mendung",
      stock: "Stok Tersedia",
      rating: "4.6",
      reviews: "20",
      location: "Solo",
      images: ["../assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png", "../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png", "../assets/images/6e23bb4dcba88f8a1e85aa28787abd9e63c93907.png", "../assets/images/marketplace/wooden-decor.png"],
      alt: "Hiasan dinding kulit ukir.",
      description: "Panel kulit ukir untuk aksen dinding. Motifnya terinspirasi mega mendung dan diberi finishing matte agar tidak memantulkan cahaya berlebihan.",
      options: { title: "Ukuran", values: ["30 x 40 cm", "40 x 60 cm"] },
      seller: { name: "Seni Kulit Solo", location: "Solo, Jawa Tengah", products: "14 produk", rating: "4.7 rating", image: sellerImages.wood },
      storyTitle: "Kulit Ukir untuk Ruang Modern",
      story: "Panel ini membawa teknik tatah kulit ke bentuk yang lebih minimal sehingga mudah masuk ke interior modern.",
      specs: [["Material", "Kulit sapi nabati"], ["Teknik", "Tatah manual"], ["Frame", "Kayu ringan"], ["Asal", "Solo"], ["Pemasangan", "Siap gantung"]],
      related: ["wayang-kulit-purwa", "topeng-kayu-ukiran-jepara", "mangkuk-kayu-jati-ukir"],
    },
    "tembikar-dekoratif-glazur": {
      title: "Tembikar Dekoratif Glazur",
      category: "Keramik",
      price: "Rp 200.000",
      meta: "Glazur celadon",
      stock: "Sisa 9 pcs",
      rating: "4.7",
      reviews: "18",
      location: "Yogya",
      images: ["../assets/images/b175be3288918b1740487725749bb77976010078.png", "../assets/images/9ab933d51d82d72684a56b37945b280ce85af9c7.png", "../assets/images/marketplace/ceramic-mug.png", "../assets/images/cacb426a240743fd39b8573f2accfd858d560210.png"],
      alt: "Tembikar dekoratif glazur.",
      description: "Tembikar dekoratif dengan glazur celadon. Cocok sebagai vas kering, aksen rak, atau elemen styling meja.",
      options: { title: "Bentuk", values: ["Vas", "Bowl", "Pitcher"] },
      seller: { name: "Kasongan Clay House", location: "Bantul, Yogyakarta", products: "24 produk", rating: "4.7 rating", image: sellerImages.ceramic },
      storyTitle: "Glazur Celadon Kasongan",
      story: "Glazur diaplikasikan tipis agar bentuk gerabah tetap menjadi pusat perhatian. Hasil akhirnya punya variasi warna natural dari proses pembakaran.",
      specs: [["Material", "Tanah liat dan glazur"], ["Tinggi", "22 cm"], ["Fungsi", "Dekoratif"], ["Asal", "Yogyakarta"], ["Perawatan", "Lap lembut"]],
      related: ["gerabah-kasongan-yogyakarta", "mug-keramik-hand-made-bali", "set-peralatan-makan-bambu"],
    },
    "tas-kanvas-motif-batik": {
      title: "Tas Kanvas Motif Batik",
      category: "Aksesoris",
      price: "Rp 175.000",
      meta: "Kanvas tebal daily use",
      stock: "Stok Tersedia",
      rating: "4.8",
      reviews: "47",
      location: "Solo",
      images: ["../assets/images/9b4a56fce54be094169859886f23fb807948e612.png", "../assets/images/marketplace/batik-cloth.png", "../assets/images/dfddcca739dac8c74aa01423424a9277624961b5.png", "../assets/images/269ae8e0d913d37f54a4f506a1c361c3221484e3.png"],
      alt: "Tas kanvas motif batik Solo.",
      description: "Tas kanvas tebal dengan panel batik. Kompartemennya cukup untuk laptop kecil, buku, dan kebutuhan harian.",
      options: { title: "Motif", values: ["Parang", "Kawung", "Mega Mendung"] },
      seller: { name: "Batik Keraton Goods", location: "Solo, Jawa Tengah", products: "32 produk", rating: "4.8 rating", image: sellerImages.textile },
      storyTitle: "Batik untuk Barang Harian",
      story: "Potongan kain batik digunakan sebagai panel utama agar motif tradisional tetap hadir di barang yang fungsional.",
      specs: [["Material", "Kanvas 12 oz dan panel batik"], ["Ukuran", "36 x 40 cm"], ["Tali", "Webbing katun"], ["Kapasitas", "Laptop 13 inci"], ["Asal", "Solo"]],
      related: ["tas-rotan-bulat-premium", "topi-anyam-pandan-bali", "kain-batik-tulis-solo"],
    },
    "minyak-esensial-melati-bali": {
      title: "Minyak Esensial Melati Bali",
      category: "Perawatan",
      price: "Rp 85.000",
      meta: "Aromaterapi melati",
      stock: "Stok Tersedia",
      rating: "4.9",
      reviews: "61",
      location: "Bali",
      images: ["../assets/images/2db159e91dfe7ca806ae7ad767ea0142e75bd374.png", "../assets/images/3356f79928bd4afcb126581479e6d5a44c953307.png", "../assets/images/marketplace/natural-soap.png", "../assets/images/0a71935945cc4cb3d3b65c8f3e5de9ba14f37a59.png"],
      alt: "Minyak esensial melati Bali.",
      description: "Minyak esensial melati untuk diffuser, campuran carrier oil, atau ritual relaksasi. Aromanya floral lembut dan tidak menusuk.",
      options: { title: "Volume", values: ["10 ml", "30 ml", "50 ml"] },
      seller: { name: "Bali Botanical Lab", location: "Ubud, Bali", products: "22 produk", rating: "4.9 rating", image: sellerImages.care },
      storyTitle: "Aroma Melati Lokal",
      story: "Bunga melati dipanen pagi hari saat aromanya paling kuat, lalu diproses dalam batch kecil untuk menjaga konsistensi wangi.",
      specs: [["Volume", "10 ml"], ["Aroma", "Melati floral"], ["Penggunaan", "Diffuser atau campuran carrier oil"], ["Bahan", "Essential oil blend"], ["Asal", "Bali"]],
      related: ["sabun-organik-kopi", "set-peralatan-makan-bambu", "topi-anyam-pandan-bali"],
    },
    "topeng-kayu-ukiran-jepara": {
      title: "Topeng Kayu Ukiran Jepara",
      category: "Home Decor",
      price: "Rp 450.000",
      meta: "Ukiran tangan pengrajin senior",
      stock: "Sisa 6 karya",
      rating: "4.9",
      reviews: "24",
      location: "Jepara",
      images: ["../assets/images/6e23bb4dcba88f8a1e85aa28787abd9e63c93907.png", "../assets/images/marketplace/wooden-decor.png", "../assets/images/e994f7ce98979bfe05ee3151dbaeb37f3e2d8c99.png", "../assets/images/45c1b9ce24d767168e8a6917143a8d3ff8224b2f.png"],
      alt: "Topeng kayu ukiran Jepara.",
      description: "Topeng kayu ukiran Jepara dengan detail ekspresi yang kuat. Cocok untuk focal point dinding ruang tamu atau studio.",
      options: { title: "Finishing", values: ["Natural", "Dark Walnut", "Antique"] },
      seller: { name: "Kriya Kayu Jepara", location: "Jepara, Jawa Tengah", products: "35 produk", rating: "4.8 rating", image: sellerImages.wood },
      storyTitle: "Ukiran Ekspresif Jepara",
      story: "Teknik ukir Jepara memberi kedalaman pada ekspresi topeng. Finishing dibuat natural agar serat kayu tetap terlihat.",
      specs: [["Material", "Kayu mahoni"], ["Teknik", "Ukir manual"], ["Ukuran", "32 x 22 cm"], ["Finishing", "Natural wax"], ["Asal", "Jepara"]],
      related: ["wayang-kulit-purwa", "hiasan-dinding-kulit-ukir", "mangkuk-kayu-jati-ukir"],
    },
    "kain-tenun-ikat-endek-bali": {
      title: "Kain Tenun Ikat Endek Bali",
      category: "Fashion",
      price: "Rp 850.000",
      meta: "Tenun ikat tradisional Bali",
      stock: "Sisa 8 kain",
      rating: "4.8",
      reviews: "27",
      location: "Bali",
      images: ["../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png", "../assets/images/marketplace/batik-cloth.png", "../assets/images/4e220a2511b3c2934147afea453ec2912b42f9e7.png", "../assets/images/df76563238df56947a3b7ac4b3423243b5643aed.png"],
      alt: "Kain tenun ikat Endek Bali.",
      description: "Kain Endek Bali dengan warna kaya dan pola ikat yang tegas. Cocok dijahit menjadi outer, kain lilit, atau koleksi tekstil.",
      options: { title: "Warna", values: ["Marun", "Indigo", "Hijau"] },
      seller: { name: "Endek Bali Atelier", location: "Gianyar, Bali", products: "20 produk", rating: "4.8 rating", image: sellerImages.textile },
      storyTitle: "Pola Ikat Endek",
      story: "Benang diikat dan diwarna sebelum ditenun. Pergeseran kecil pada pola menjadi tanda proses manual yang autentik.",
      specs: [["Material", "Katun tenun"], ["Teknik", "Ikat pakan"], ["Ukuran", "220 cm x 105 cm"], ["Asal", "Bali"], ["Perawatan", "Cuci terpisah"]],
      related: ["songket-palembang-gold", "kain-batik-tulis-solo", "sarung-tenun-lurik-solo"],
    },
    "kebaya-encim-batik-modern": {
      title: "Kebaya Encim Batik Modern",
      category: "Fashion",
      price: "Rp 475.000",
      meta: "Siluet ringan untuk harian",
      stock: "Stok Tersedia",
      rating: "4.7",
      reviews: "33",
      location: "Yogya",
      images: ["../assets/images/45c1b9ce24d767168e8a6917143a8d3ff8224b2f.png", "../assets/images/marketplace/batik-cloth.png", "../assets/images/9b4a56fce54be094169859886f23fb807948e612.png", "../assets/images/8a4d9c06b4f444d3c1935573f7f1e3443127ffcd.png"],
      alt: "Kebaya encim batik modern Yogyakarta.",
      description: "Kebaya encim dengan potongan modern dan kain ringan. Detail batik dibuat subtle agar mudah dipakai untuk acara semi-formal.",
      options: { title: "Ukuran", values: ["S", "M", "L", "XL"] },
      seller: { name: "Yogya Heritage Wear", location: "Yogyakarta", products: "29 produk", rating: "4.7 rating", image: sellerImages.textile },
      storyTitle: "Kebaya untuk Ritme Modern",
      story: "Desain mempertahankan garis encim klasik, tetapi bahan dan potongan dibuat lebih ringan untuk kebutuhan hari ini.",
      specs: [["Material", "Katun viscose"], ["Detail", "Bordir dan panel batik"], ["Ukuran", "S sampai XL"], ["Asal", "Yogyakarta"], ["Perawatan", "Cuci tangan"]],
      related: ["kain-batik-tulis-solo", "songket-palembang-gold", "kain-tenun-ikat-endek-bali"],
    },
  };

  const aliases = {
    "mangkuk-kayu-jati-solid": "mangkuk-kayu-jati-ukir",
    "tas-rotan-bali-premium": "tas-rotan-bulat-premium",
    "vas-keramik-minimalis": "tembikar-dekoratif-glazur",
  };

  function getProduct() {
    const params = new URLSearchParams(window.location.search);
    const rawSlug = params.get("product") || "kain-batik-tulis-solo";
    const slug = aliases[rawSlug] || rawSlug;
    const product = catalog[slug] || catalog["kain-batik-tulis-solo"];
    return { ...product, slug: catalog[slug] ? slug : "kain-batik-tulis-solo" };
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderThumbs(product) {
    const main = document.querySelector("[data-product-image]");
    const thumbs = document.querySelector("[data-product-thumbs]");
    if (!main || !thumbs) return;

    main.src = product.images[0];
    main.alt = product.alt;
    thumbs.innerHTML = product.images.map((src, index) => `
      <button class="overflow-hidden rounded-2xl border-2 ${index === 0 ? "border-clay-500 shadow-soft" : "border-transparent"} transition hover:border-clay-300 focus-visible:border-clay-500" type="button" data-thumb="${index}" aria-label="Lihat gambar produk ${index + 1}">
        <img loading="lazy" class="h-20 w-full object-cover sm:h-24" src="${src}" alt="" />
      </button>
    `).join("");

    thumbs.querySelectorAll("[data-thumb]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.thumb || 0);
        main.src = product.images[index] || product.images[0];
        thumbs.querySelectorAll("[data-thumb]").forEach((item) => {
          item.classList.remove("border-clay-500", "shadow-soft");
          item.classList.add("border-transparent");
        });
        button.classList.remove("border-transparent");
        button.classList.add("border-clay-500", "shadow-soft");
      });
    });
  }

  function renderOptions(product) {
    const wrapper = document.querySelector("[data-product-options]");
    if (!wrapper || !product.options) return;

    wrapper.innerHTML = `
      <p class="text-sm font-semibold text-cocoa-900">${product.options.title}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        ${product.options.values.map((value, index) => `<button class="chip ${index === 0 ? "active" : ""}" type="button">${value}</button>`).join("")}
      </div>
    `;

    wrapper.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        wrapper.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  function renderSpecs(product) {
    const specs = document.querySelector("[data-product-specs]");
    if (!specs) return;

    specs.innerHTML = product.specs.map(([label, value], index) => `
      <div class="flex gap-4 ${index === product.specs.length - 1 ? "" : "border-b border-cocoa-900/8 pb-4"}">
        <dt class="w-36 shrink-0 font-semibold text-muted">${label}</dt>
        <dd class="text-cocoa-900">${value}</dd>
      </div>
    `).join("");
  }

  function renderRelated(product) {
    const wrapper = document.querySelector("[data-product-related]");
    if (!wrapper) return;

    wrapper.innerHTML = product.related.map((slug) => {
      const item = catalog[slug];
      if (!item) return "";
      return `
        <a class="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-sand-50 focus-visible:bg-sand-50" href="product-detail.html?product=${encodeURIComponent(slug)}">
          <img loading="lazy" class="h-16 w-16 rounded-xl object-cover" src="${item.images[0]}" alt="${item.title}" />
          <div class="flex-1">
            <p class="text-sm font-semibold text-cocoa-900">${item.title}</p>
            <p class="text-xs text-muted">${item.price}</p>
          </div>
        </a>
      `;
    }).join("");
  }

  function renderStoredReviews(product) {
    const wrapper = document.querySelector("[data-buyer-reviews]");
    const cart = window.KaryaCart;
    if (!wrapper || !cart?.getReviews) return;

    const localReviews = cart.getReviews(product.slug);
    if (!localReviews.length) return;
    const markup = localReviews.map((review) => `
      <div class="rounded-2xl border border-cocoa-900/8 bg-white p-5 shadow-soft">
        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-clay-50 text-xs font-semibold text-clay-700">${review.name.slice(0, 2).toUpperCase()}</span>
          <div>
          <strong class="text-sm text-cocoa-900">${escapeHtml(review.name)}</strong>
            <div class="text-sm text-gold">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
          </div>
          <span class="ml-auto text-xs text-muted">baru saja</span>
        </div>
        <p class="mt-3 text-sm leading-7 text-muted">${escapeHtml(review.text)}</p>
      </div>
    `).join("");
    wrapper.insertAdjacentHTML("afterbegin", markup);
  }

  function bindQuantity() {
    const qtyInput = document.querySelector("[data-qty-input]");
    const minus = document.querySelector("[data-qty-minus]");
    const plus = document.querySelector("[data-qty-plus]");
    if (!qtyInput || !minus || !plus) return;

    const setValue = (value) => {
      qtyInput.value = Math.max(1, Math.min(10, Number(value) || 1));
    };

    minus.addEventListener("click", () => setValue(Number(qtyInput.value) - 1));
    plus.addEventListener("click", () => setValue(Number(qtyInput.value) + 1));
    qtyInput.addEventListener("input", () => setValue(qtyInput.value));
  }

  function showToast(message) {
    let toast = document.querySelector("[data-product-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-cocoa-900 px-5 py-3 text-sm font-semibold text-white shadow-float";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.setAttribute("data-product-toast", "");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.style.opacity = "0";
    }, 2600);
  }

  function bindFeedback(product) {
    const wishlistButton = document.querySelector("[data-wishlist]");
    const wishlistLabel = document.querySelector("[data-wishlist-label]");
    const cart = window.KaryaCart;
    const updateWishlist = () => {
      if (!cart?.isWishlisted || !wishlistButton || !wishlistLabel) return;
      const active = cart.isWishlisted(product.slug);
      wishlistButton.classList.toggle("text-red-500", active);
      wishlistLabel.textContent = active ? "Tersimpan" : "Simpan";
    };

    document.querySelector("[data-add-cart]")?.addEventListener("click", () => {
      const qty = Number(document.querySelector("[data-qty-input]")?.value || "1");
      const selectedOption = document.querySelector("[data-product-options] .chip.active")?.textContent?.trim() || "";
      window.KaryaCart?.addItem?.({
        slug: product.slug,
        title: product.title,
        seller: product.seller.name,
        option: selectedOption,
        image: product.images[0],
        priceText: product.price,
        quantity: qty,
      });
      showToast(`${qty} ${product.title} masuk keranjang.`);
    });

    document.querySelector("[data-buy-now]")?.addEventListener("click", () => {
      const qty = Number(document.querySelector("[data-qty-input]")?.value || "1");
      const selectedOption = document.querySelector("[data-product-options] .chip.active")?.textContent?.trim() || "";
      window.KaryaCart?.addItem?.({
        slug: product.slug,
        title: product.title,
        seller: product.seller.name,
        option: selectedOption,
        image: product.images[0],
        priceText: product.price,
        quantity: qty,
      });
    });

    wishlistButton?.addEventListener("click", () => {
      const active = cart?.toggleWishlist?.({
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        priceText: product.price,
        category: product.category,
        location: product.location,
      });
      updateWishlist();
      showToast(active ? `${product.title} disimpan ke wishlist.` : `${product.title} dihapus dari wishlist.`);
    });

    document.querySelector("[data-review-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const text = form.review.value.trim();
      if (!text) return;
      const canReview = (cart?.getOrders?.() || []).some((order) => (
        order.status === "Selesai" && order.items?.some((item) => item.slug === product.slug)
      ));
      if (!canReview) {
        showToast("Review dibuka setelah order produk ini berstatus selesai.");
        return;
      }
      const session = window.KL?.getSession?.();
      cart?.addReview?.(product.slug, {
        name: session?.name || "Pembeli Karya Lokal",
        rating: form.rating.value,
        text,
      });
      form.reset();
      showToast("Ulasan berhasil ditambahkan.");
      window.location.reload();
    });

    updateWishlist();
  }

  function renderProduct() {
    const product = getProduct();
    document.title = `${product.title} - Karya Lokal`;
    setText("[data-product-title]", product.title);
    setText("[data-product-category]", product.category);
    setText("[data-product-rating]", product.rating);
    setText("[data-product-reviews]", product.reviews);
    setText("[data-product-description]", product.description);
    setText("[data-product-price]", product.price);
    setText("[data-product-meta]", product.meta);
    setText("[data-product-stock]", product.stock);
    setText("[data-product-story-title]", product.storyTitle);
    setText("[data-product-story]", product.story);
    setText("[data-seller-name]", product.seller.name);
    setText("[data-seller-location]", product.seller.location);
    setText("[data-seller-products]", product.seller.products);
    setText("[data-seller-rating]", product.seller.rating);

    const sellerImage = document.querySelector("[data-seller-image]");
    if (sellerImage) {
      sellerImage.src = product.seller.image;
      sellerImage.alt = product.seller.name;
    }

    renderThumbs(product);
    renderOptions(product);
    renderSpecs(product);
    renderRelated(product);
    window.KaryaCart?.addRecentlyViewed?.({
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      priceText: product.price,
      category: product.category,
      location: product.location,
    });
    renderStoredReviews(product);
    bindQuantity();
    bindFeedback(product);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProduct);
  } else {
    renderProduct();
  }
}());
