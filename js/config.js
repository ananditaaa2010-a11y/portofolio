/* ================================================================
   CONFIG.JS - KONFIGURASI DAFTAR PROYEK PORTOFOLIO
   ================================================================
   Portofolio Anandita Galuh Sekar Kinanti
   Ubah judul, gambar, deskripsi, teknologi, dan link proyek di sini!
   Semua perubahan di file ini akan otomatis diperbarui di web.
   Strictly Zero Emojis.
   ================================================================ */

const CONFIG_PROJECTS = [
  {
    id: "p1",
    number: "#01",
    title: "Sistem Informasi Universitas",
    heroTitle: "SISTEM INFORMASI UNIVERSITAS",
    category: "Web Portal",
    categoryIcon: "fa-solid fa-globe",
    edition: "Campus Edition",
    editionIcon: "fa-solid fa-graduation-cap",
    status: "ACTIVE",
    tapeClass: "tape-cowhide",
    tapeTitle: "Cowhide Tape",
    image: "img/univ.jpg",
    imageFit: "cover",
    description: "Website portal informasi komprehensif untuk Universitas Atma Jaya Yogyakarta dengan tata letak bersih, navigasi terstruktur, dan performa responsif.",
    tech: [
      { name: "HTML5", icon: "fa-brands fa-html5", pillClass: "tech-pill-html" },
      { name: "CSS3", icon: "fa-brands fa-css3-alt", pillClass: "tech-pill-css" },
      { name: "JavaScript", icon: "fa-brands fa-js", pillClass: "tech-pill-js" }
    ],
    demoUrl: "https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  },
  {
    id: "p2",
    number: "#02",
    title: "Website E-Commerce JCO Donuts",
    heroTitle: "JCO DONUTS E-COMMERCE",
    category: "E-Commerce",
    categoryIcon: "fa-solid fa-cookie-bite",
    edition: "Culinary Edition",
    editionIcon: "fa-solid fa-store",
    status: "ACTIVE",
    tapeClass: "tape-flannel",
    tapeTitle: "Woody Flannel Tape",
    image: "img/logo baru.png",
    imageFit: "contain",
    description: "Desain dan implementasi antarmuka landing page katalog produk donat premium J.CO yang lezat, interaktif, dan ramah pengguna.",
    tech: [
      { name: "HTML5", icon: "fa-brands fa-html5", pillClass: "tech-pill-html" },
      { name: "CSS3", icon: "fa-brands fa-css3-alt", pillClass: "tech-pill-css" },
      { name: "E-Commerce UI", icon: "fa-solid fa-basket-shopping", pillClass: "tech-pill-design" }
    ],
    demoUrl: "https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  },
  {
    id: "p3",
    number: "#03",
    title: "Game & Software Python",
    heroTitle: "GAME & SOFTWARE PYTHON",
    category: "Python Dev",
    categoryIcon: "fa-brands fa-python",
    edition: "Arcade Edition",
    editionIcon: "fa-solid fa-gamepad",
    status: "ACTIVE",
    tapeClass: "tape-buzz",
    tapeTitle: "Buzz Space Ranger Tape",
    image: "img/python.jpg",
    imageFit: "cover",
    description: "Eksplorasi bahasa pemrograman Python untuk merancang logika interaktif, pengolahan data sederhana, dan pengembangan modul gim klasik.",
    tech: [
      { name: "Python 3", icon: "fa-brands fa-python", pillClass: "tech-pill-python" },
      { name: "Algorithms", icon: "fa-solid fa-microchip", pillClass: "tech-pill-algo" },
      { name: "Game Dev", icon: "fa-solid fa-ghost", pillClass: "tech-pill-game" }
    ],
    demoUrl: "https://drive.google.com/drive/folders/1OJ7EV6d5vqvGEp53Jp9b5gFa-r3DJKuk?usp=sharing",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  },
  {
    id: "p4",
    number: "#04",
    title: "Design Landing Page Figma",
    heroTitle: "LANDING PAGE FIGMA",
    category: "UI/UX Figma",
    categoryIcon: "fa-brands fa-figma",
    edition: "Concept Edition",
    editionIcon: "fa-solid fa-pen-ruler",
    status: "ACTIVE",
    tapeClass: "tape-pizza",
    tapeTitle: "Pizza Planet Tape",
    image: "img/landing.jpg",
    imageFit: "cover",
    description: "Perancangan UI/UX landing page modern di Figma dengan fokus pada hierarki visual, kontras warna yang nyaman, tipografi terstruktur, dan alur prototipe mulus.",
    tech: [
      { name: "Figma", icon: "fa-brands fa-figma", pillClass: "tech-pill-figma" },
      { name: "UI/UX", icon: "fa-solid fa-layer-group", pillClass: "tech-pill-ui" },
      { name: "Prototyping", icon: "fa-solid fa-bezier-curve", pillClass: "tech-pill-proto" }
    ],
    demoUrl: "https://www.figma.com/design/hwiHotD2EtEFiHTnz7G6wJ/E-Commerce-Design?node-id=0-1&t=tHgj5ebnapz78nLI-1",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  },
  {
    id: "p5",
    number: "#05",
    title: "Design Web Batik Khas Yogyakarta",
    heroTitle: "BATIK KHAS YOGYAKARTA",
    category: "Heritage Web",
    categoryIcon: "fa-solid fa-palette",
    edition: "Heritage Edition",
    editionIcon: "fa-solid fa-gem",
    status: "ACTIVE",
    tapeClass: "tape-cowhide",
    tapeTitle: "Cowhide Tape",
    image: "img/batikbaru.jpg",
    imageFit: "cover",
    description: "Perancangan desain toko daring warisan budaya batik khas Yogyakarta yang memadukan nuansa tradisional Nusantara dengan pengalaman belanja digital modern.",
    tech: [
      { name: "Figma", icon: "fa-brands fa-figma", pillClass: "tech-pill-figma" },
      { name: "E-Commerce", icon: "fa-solid fa-bag-shopping", pillClass: "tech-pill-design" },
      { name: "Culture", icon: "fa-solid fa-feather", pillClass: "tech-pill-culture" }
    ],
    demoUrl: "https://docs.google.com/document/d/1IXtKdZZeUXmvzTJlvwLknqLplPBPV6nUzIAECFkfMEw/edit?usp=sharing",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  },
  {
    id: "p6",
    number: "#06",
    title: "Website E-Commerce Qinanthi",
    heroTitle: "QINANTHI FASHION STORE",
    category: "Fashion Store",
    categoryIcon: "fa-solid fa-shirt",
    edition: "Fashion Edition",
    editionIcon: "fa-solid fa-vest-patches",
    status: "ACTIVE",
    tapeClass: "tape-flannel",
    tapeTitle: "Woody Flannel Tape",
    image: "img/qinanthi.png",
    imageFit: "cover",
    description: "Konsep platform belanja digital busana dengan katalog produk terstruktur rapi, navigasi pencarian instan, dan antarmuka checkout yang intuitif.",
    tech: [
      { name: "Figma", icon: "fa-brands fa-figma", pillClass: "tech-pill-figma" },
      { name: "UI/UX", icon: "fa-solid fa-crop-simple", pillClass: "tech-pill-ui" },
      { name: "Design System", icon: "fa-solid fa-swatchbook", pillClass: "tech-pill-proto" }
    ],
    demoUrl: "https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link",
    repoUrl: "https://github.com/ananditaaa2010-a11y"
  }
];

// Pastikan konfigurasi dapat diakses secara global di browser & script.js
if (typeof window !== 'undefined') {
  window.CONFIG_PROJECTS = CONFIG_PROJECTS;
}
if (typeof globalThis !== 'undefined') {
  globalThis.CONFIG_PROJECTS = CONFIG_PROJECTS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG_PROJECTS };
}

