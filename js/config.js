/* ================================================================
   ✏️  CONFIG.JS — FILE KONFIGURASI PORTOFOLIO TOY STORY THEME
   ================================================================
   Portofolio Anandita Galuh Sekar Kinanti
   Tema: Toy Story (Andy's Room, Woody & Buzz Space Ranger)
   Tanpa Efek Neon & Tanpa Efek Glowing
   ================================================================ */

/* ----------------------------------------------------------------
   👤 PROFIL UTAMA
   ---------------------------------------------------------------- */
const CONFIG_PROFILE = {
  name: "Anandita Galuh Sekar Kinanti",
  nickname: "Galuh",
  initials: "AGSK",
  tagline: "Frontend Developer & UI/UX Designer",
  toyTitle: "Sheriff of Web & Space Ranger of Design",
  greeting: "Halo, Partner! Saya",
  bio: [
    `Saya adalah seorang siswi SMK jurusan <strong>Rekayasa Perangkat Lunak</strong> di SMKS Brantas Karangkates yang memiliki antusiasme tinggi dalam pengembangan web dan perancangan UI/UX. Seperti mainan terbaik di kamar Andy, saya siap berpetualang menciptakan karya digital yang fungsional, menyenangkan, dan berkesan.`,
    `Dalam mengembangkan proyek, saya menguasai <strong>HTML5, CSS3, JavaScript, PHP</strong> untuk membangun antarmuka web yang rapi dan responsif, serta <strong>Figma</strong> untuk mendesain prototipe antarmuka yang user-friendly. Saya juga mempelajari <strong>Python</strong> untuk logika pemrograman dan gim sederhana, serta memanfaatkan <strong>GitHub</strong> untuk kolaborasi dan manajemen kode.`,
  ],

  // Info detail di kartu spesifikasi mainan
  location: "Malang, Jawa Timur",
  education: "SMKS Brantas Karangkates — RPL",
  focus: "Frontend & UI/UX Design",
  languages: "Indonesia, English",

  // Status ketersediaan
  status: "Siswa Aktif RPL SMKS Brantas — Siap Berpetualang (2026)",
  statusOpen: true,

  // Link CV
  cvLink: "files/CV_Anandita Galuh Sekar Kinanti.pdf",
};

/* ----------------------------------------------------------------
   📊 STATISTIK (BLOK MAINAN)
   ---------------------------------------------------------------- */
const CONFIG_STATS = [
  { number: 6, label: "Proyek Selesai", icon: "fa-solid fa-box-open", blockColor: "yellow" },
  { number: 2026, label: "Angkatan SMK", icon: "fa-solid fa-graduation-cap", blockColor: "blue" },
  { number: 100, label: "% Semangat & Dedikasi", icon: "fa-solid fa-rocket", blockColor: "red" },
];

/* ----------------------------------------------------------------
   🔗 SOSIAL MEDIA & KONTAK (KOMUNIKATOR PIZZA PLANET)
   ---------------------------------------------------------------- */
const CONFIG_SOCIAL = {
  email: "ananditaaa2010@gmail.com",
  instagram: "https://www.instagram.com/ananditagaluh?igsh=MWJrYzZyZmdkZHZldg==",
  github: "https://github.com/ananditaaa2010-a11y",
  linkedin: "https://www.linkedin.com/in/anandita-galuh-sekar-kinanti-6063b2384?trk=contact-info",
  twitter: "",
};

/* ----------------------------------------------------------------
   🛠️ KEAHLIAN (KOTAK PERKAKAS MAINAN)
   ---------------------------------------------------------------- */
const CONFIG_SKILLS = {
  categories: [
    {
      theme: "woody",
      icon: "fa-solid fa-hat-cowboy",
      badge: "Woody's Toolkit",
      title: "Frontend Web Craft",
      desc: "Teknologi inti dalam merakit antarmuka web yang kokoh.",
      tags: ["HTML5", "CSS3", "JavaScript", "PHP", "Responsive Design"],
    },
    {
      theme: "buzz",
      icon: "fa-solid fa-rocket",
      badge: "Buzz's Gear",
      title: "Design & Tools",
      desc: "Perlengkapan navigasi desain visual dan manajemen versi.",
      tags: ["Figma", "UI/UX Prototyping", "GitHub", "VS Code", "Python"],
    },
  ],

  bars: [
    { name: "Frontend Development", pct: 88, color: "#E53935", label: "High Precision" },
    { name: "UI / UX Design (Figma)", pct: 90, color: "#6EC828", label: "Pixel Perfect" },
    { name: "Problem Solving & Logic", pct: 82, color: "#FDC02F", label: "Ready to Explore" },
  ],
};

/* ----------------------------------------------------------------
   💼 KOLEKSI PROYEK (TOY BOX COLLECTION)
   ---------------------------------------------------------------- */
const CONFIG_PROJECTS = [
  {
    title: "Sistem Informasi Universitas",
    desc: "Website portal informasi komprehensif untuk Universitas Atma Jaya Yogyakarta dengan tata letak bersih dan navigasi informatif.",
    tags: ["HTML", "CSS", "Web Design"],
    category: "Web",
    img: "img/univ.jpg",
    edition: "Campus Edition",
    scale: "1",
    fit: "cover",
    link: "https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link",
  },
  {
    title: "Website E-Commerce JCO Donuts",
    desc: "Desain dan implementasi antarmuka landing page katalog produk donat premium J.CO yang lezat dan interaktif.",
    tags: ["HTML", "CSS", "E-Commerce"],
    category: "Web App",
    img: "img/logo baru.png",
    edition: "Sweet Edition",
    scale: "0.85",
    fit: "contain",
    link: "https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link",
  },
  {
    title: "Game & Software Python",
    desc: "Eksplorasi bahasa pemrograman Python untuk merancang logika interaktif dan pengembangan gim sederhana yang seru.",
    tags: ["Python", "Logic", "Game Dev"],
    category: "Python",
    img: "img/python.jpg",
    edition: "Arcade Edition",
    scale: "1",
    fit: "cover",
    link: "https://drive.google.com/drive/folders/1OJ7EV6d5vqvGEp53Jp9b5gFa-r3DJKuk?usp=sharing",
  },
  {
    title: "Design Landing Page Figma",
    desc: "Perancangan UI/UX landing page modern di Figma dengan fokus pada hierarki visual, tipografi, dan pengalaman pengguna optimal.",
    tags: ["Figma", "UI/UX", "Prototype"],
    category: "Design Web",
    img: "img/landing.jpg",
    edition: "Concept Edition",
    scale: "1",
    fit: "cover",
    link: "https://www.figma.com/design/hwiHotD2EtEFiHTnz7G6wJ/E-Commerce-Design?node-id=0-1&t=tHgj5ebnapz78nLI-1",
  },
  {
    title: "Design Web Batik Khas Yogyakarta",
    desc: "Perancangan desain toko daring warisan budaya batik khas Yogyakarta yang memadukan nuansa tradisional dengan gaya modern.",
    tags: ["Figma", "Culture", "E-Commerce"],
    category: "Design Web",
    img: "img/batikbaru.jpg",
    edition: "Heritage Edition",
    scale: "1",
    fit: "cover",
    link: "https://docs.google.com/document/d/1IXtKdZZeUXmvzTJlvwLknqLplPBPV6nUzIAECFkfMEw/edit?usp=sharing",
  },
  {
    title: "Website E-Commerce Qinanthi",
    desc: "Konsep platform belanja digital dengan sistem katalog produk yang terstruktur rapi, elegan, dan mudah dinavigasi oleh pengguna.",
    tags: ["Figma", "E-Commerce", "UI/UX"],
    category: "Web",
    img: "img/qinanthi.png",
    edition: "Store Edition",
    scale: "1",
    fit: "cover",
    link: "https://www.figma.com/design/hwiHotD2EtEFiHTnz7G6wJ/E-Commerce-Design?node-id=0-1&t=AgTP4Hqli09JAkjF-1",
  },
];

/* ----------------------------------------------------------------
   🎨 WARNA TEMA TOY STORY (SOLID & CRISP — TANPA NEON & GLOW)
   ---------------------------------------------------------------- */
const CONFIG_THEME = {
  skyBlue: "#48A6E9", // Andy's wallpaper sky
  cloudWhite: "#FFFFFF", // Fluffy Andy clouds
  woodyYellow: "#FDC02F", // Toy Story yellow
  woodyRed: "#E53935", // Bandana red
  buzzGreen: "#6EC828", // Space Ranger lime green
  buzzPurple: "#7E3BB0", // Space Ranger purple
  toyBorder: "#2B2D42", // Bold cartoon toy outline
  woodFloor: "#C68642", // Andy's wooden floor
};
