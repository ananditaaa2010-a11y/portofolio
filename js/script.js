/**
 * ================================================================
 * ANANDITA GALUH SEKAR KINANTI — THE DEVELOPER JOURNEY
 * Interactive Script Module
 * Pure Vanilla JavaScript • Strictly Zero Emojis
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- AUDIO SYSTEM (Web Audio API - Strictly Zero Emojis) ---
  const AdventureAudio = (() => {
    let ctx = null;

    function getContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      return ctx;
    }

    function playTone(freq, type, duration, gainVal = 0.08) {
      try {
        const audio = getContext();
        if (!audio) return;
        if (audio.state === 'suspended') {
          audio.resume();
        }
        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audio.currentTime);

        gain.gain.setValueAtTime(gainVal, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);

        osc.connect(gain);
        gain.connect(audio.destination);

        osc.start();
        osc.stop(audio.currentTime + duration);
      } catch (err) {
        // Audio policy or unsupported; fail silently
      }
    }

    return {
      playClick: () => playTone(540, 'sine', 0.06, 0.06),
      playSelect: () => playTone(680, 'triangle', 0.09, 0.08),
      playPlace: (pitchMod = 1) => {
        playTone(320 * pitchMod, 'sine', 0.08, 0.12);
        setTimeout(() => playTone(200 * pitchMod, 'triangle', 0.06, 0.08), 25);
      },
      playSuccess: () => {
        playTone(523, 'sine', 0.08, 0.08);
        setTimeout(() => playTone(659, 'sine', 0.08, 0.08), 80);
        setTimeout(() => playTone(784, 'sine', 0.16, 0.08), 160);
      }
    };
  })();

  // --- 1. MOBILE NAVIGATION DRAWER ---
  const navToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      AdventureAudio.playClick();
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 2. SCROLL SPY ACTIVE NAV LINK ---
  const sections = document.querySelectorAll('section[id]');
  
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === '#' + id) {
            item.classList.add('active-nav');
          } else {
            item.classList.remove('active-nav');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // --- 3. THE RADIAL FOLDER BURST SKILLS CONTROLLER ("SKILNYA KELUAR MENCAR-MENCAR DARI FOLDER") ---
  const skillsData = {
    vscode: {
      id: 'vscode',
      name: 'VS Code',
      fileName: 'settings.json',
      fileExt: '.JSON',
      fileSize: '3.4 KB',
      category: 'Editor & Tooling',
      iconImg: 'img/skills/vs.png',
      iconClass: 'fa-solid fa-code',
      iconGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      title: 'Visual Studio Code Workflow',
      role: 'as The Cockpit',
      level: 92,
      levelLabel: '92% • Mastered (Cockpit)',
      desc: 'Konfigurasi lingkungan pengembangan modern, integrasi ekstensi linting ESLint & Prettier, manajemen keyboard shortcuts, dan terminal terpadu untuk kecepatan pengkodean maksimal.',
      tags: ['Workspace Tuning', 'Keyboard Shortcuts', 'Extensions Ecosystem', 'Integrated Terminal', 'Git Lens'],
      projectJump: 'p1'
    },
    openai: {
      id: 'openai',
      name: 'ChatGPT / OpenAI',
      fileName: 'ai-prompt-engine.ts',
      fileExt: '.TS',
      fileSize: '5.8 KB',
      category: 'AI & Prompting',
      iconImg: 'img/skills/openai.svg',
      iconClass: 'fa-solid fa-brain',
      iconGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      title: 'ChatGPT & OpenAI Integration',
      role: 'as The Synthesizer',
      level: 90,
      levelLabel: '90% • Advanced (Synthesizer)',
      desc: 'Pemanfaatan model AI generatif untuk eksplorasi kode, rekayasa prompt sistem (System Prompting), integrasi REST API, dan perancangan antarmuka cerdas generasi baru.',
      tags: ['Prompt Engineering', 'API Integration', 'Intelligent Workflows', 'Generative UI', 'Automated QA'],
      projectJump: 'p2'
    },
    laravel: {
      id: 'laravel',
      name: 'Laravel',
      fileName: 'ServerController.php',
      fileExt: '.PHP',
      fileSize: '15.1 KB',
      category: 'Backend Framework',
      iconImg: 'img/skills/laravel.png',
      iconClass: 'fa-brands fa-laravel',
      iconGradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      title: 'PHP & Laravel Backend Engine',
      role: 'as The Heavy Lifter',
      level: 88,
      levelLabel: '88% • Framework (Heavy Lifter)',
      desc: 'Pengembangan backend berbasis arsitektur Model-View-Controller (MVC), manipulasi basis data dengan Eloquent ORM, migrasi skema tabel, validasi data server-side, dan routing RESTful.',
      tags: ['MVC Architecture', 'Eloquent ORM', 'Blade Engine', 'RESTful API', 'Database Migrations'],
      projectJump: 'p1'
    },
    css: {
      id: 'css',
      name: 'CSS3',
      fileName: 'styles.css',
      fileExt: '.CSS',
      fileSize: '8.6 KB',
      category: 'Styling & Layout',
      iconImg: 'img/skills/css.png',
      iconClass: 'fa-brands fa-css3-alt',
      iconGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      title: 'CSS3 Modern & Visual Animation',
      role: 'as The Stylist',
      level: 92,
      levelLabel: '92% • Advanced (Stylist)',
      desc: 'Tata letak Flexbox dan CSS Grid tingkat lanjut, desain responsif mobile-first, akselerasi animasi hardware berbasis keyframes, dan CSS Custom Properties (Variables).',
      tags: ['CSS Grid & Flexbox', 'Responsive Design', 'Custom Variables', 'Keyframe Animations', 'Glassmorphism'],
      projectJump: 'p2'
    },
    claude: {
      id: 'claude',
      name: 'Claude AI',
      fileName: 'claude-architect.md',
      fileExt: '.MD',
      fileSize: '6.2 KB',
      category: 'AI Reasoning & Logic',
      iconImg: 'img/skills/claude.png',
      iconClass: 'fa-solid fa-asterisk',
      iconGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      title: 'Claude AI Prompt & Logic',
      role: 'as The Logician',
      level: 90,
      levelLabel: '90% • Advanced (Logician)',
      desc: 'Penalaran sistematis, analisis arsitektur basis kode berskala besar, refactoring logika algoritma, dan validasi fungsionalitas modular berstandar industri.',
      tags: ['Architectural Synthesis', 'Deep Code Refactoring', 'Algorithmic Proofing', 'Technical Writing', 'System Logic'],
      projectJump: 'p3'
    },
    figma: {
      id: 'figma',
      name: 'Figma',
      fileName: 'design-system.fig',
      fileExt: '.FIG',
      fileSize: '24.8 MB',
      category: 'UI/UX & Prototyping',
      iconImg: 'img/skills/figma.png',
      iconClass: 'fa-brands fa-figma',
      iconGradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
      title: 'Figma UI/UX & Design System',
      role: 'as The Visionary',
      level: 95,
      levelLabel: '95% • Prototyper (Visionary)',
      desc: 'Merancang wireframe konseptual, User Journey, design system terstruktur dengan Auto Layout dan Component Variants, serta prototipe interaktif realistis sebelum implementasi koding.',
      tags: ['Design System', 'Auto Layout', 'Component Variants', 'High-Fidelity Prototyping', 'User Journey'],
      projectJump: 'p4'
    },
    js: {
      id: 'js',
      name: 'JavaScript',
      fileName: 'engine.js',
      fileExt: '.JS',
      fileSize: '12.4 KB',
      category: 'Frontend Logic',
      iconImg: 'img/skills/js.png',
      iconClass: 'fa-brands fa-js',
      iconGradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      title: 'JavaScript ES6+ & Reactive Engine',
      role: 'as The Speedster',
      level: 90,
      levelLabel: '90% • Advanced (Speedster)',
      desc: 'Menghidupkan interaksi antarmuka yang reaktif, manipulasi DOM dinamis, arsitektur pemrograman asinkron (Promise, Async/Await), penanganan event modern, dan konsumsi REST Web API.',
      tags: ['ES6+ Standards', 'Async / Await', 'DOM Manipulation', 'Event Delegation', 'Web Audio API'],
      projectJump: 'p1'
    },
    alight: {
      id: 'alight',
      name: 'Alight Motion',
      fileName: 'timeline.am',
      fileExt: '.AM',
      fileSize: '18.4 MB',
      category: 'Motion & Animation',
      iconImg: 'img/skills/alight.png',
      iconClass: 'fa-solid fa-film',
      iconGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      title: 'Alight Motion Animation',
      role: 'as The Animator',
      level: 85,
      levelLabel: '85% • Creative (Animator)',
      desc: 'Penyusunan kurva easing keyframe dinamis, visual effects layer, tipografi kinetik, dan transisi motion graphic untuk konten presentasi digital yang memukau.',
      tags: ['Keyframe Curves', 'Motion Graphics', 'Visual FX', 'Kinetic Typography', 'Vector Animation'],
      projectJump: 'p5'
    },
    html: {
      id: 'html',
      name: 'HTML5',
      fileName: 'index.html',
      fileExt: '.HTML',
      fileSize: '4.2 KB',
      category: 'Semantic Markup',
      iconImg: 'img/skills/html.png',
      iconClass: 'fa-brands fa-html5',
      iconGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      title: 'HTML5 Semantic Web Architecture',
      role: 'as The Architecture',
      level: 95,
      levelLabel: '95% • Mastered (Expert)',
      desc: 'Fondasi semantik web berstandar W3C, hierarki konten yang terstruktur rapi, penerapan aksesibilitas web modern (a11y), optimasi SEO on-page, dan pengintegrasian media digital responsif.',
      tags: ['Semantik W3C', 'Web Accessibility (a11y)', 'SEO Optimization', 'Clean Structure', 'Responsive Markup'],
      projectJump: 'p1'
    },
    php: {
      id: 'php',
      name: 'PHP',
      fileName: 'index.php',
      fileExt: '.PHP',
      fileSize: '7.9 KB',
      category: 'Server Programming',
      iconImg: 'img/skills/php.png',
      iconClass: 'fa-brands fa-php',
      iconGradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      title: 'PHP Server Programming',
      role: 'as The Craftsman',
      level: 88,
      levelLabel: '88% • Backend (Craftsman)',
      desc: 'Pemrograman berorientasi objek (OOP), manajemen sesi & autentikasi, konektivitas database PDO/MySQLi, dan sanitasi input keamanan formulir web.',
      tags: ['OOP Patterns', 'PDO Database', 'Session Security', 'Server Routing', 'Form Sanitation'],
      projectJump: 'p1'
    },
    antigravity: {
      id: 'antigravity',
      name: 'Antigravity AI',
      fileName: 'agy.config.json',
      fileExt: '.JSON',
      fileSize: '2.8 KB',
      category: 'Autonomous Coding',
      iconImg: 'img/skills/antigravity.png',
      iconClass: 'fa-solid fa-wand-magic-sparkles',
      iconGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      title: 'Antigravity AI Engine',
      role: 'as The Catalyst',
      level: 92,
      levelLabel: '92% • Agentic (Catalyst)',
      desc: 'Eksplorasi kecerdasan buatan untuk akselerasi alur kerja pengkodean, perancangan antarmuka generatif reaktif, dan otomatisasi tugas teknis komprehensif.',
      tags: ['Agentic Workflows', 'Generative Coding', 'Custom Skills', 'Terminal Automation', 'Rapid Prototyping'],
      projectJump: 'p3'
    },
    github: {
      id: 'github',
      name: 'GitHub',
      fileName: '.github/workflows',
      fileExt: '.YML',
      fileSize: '1.9 KB',
      category: 'Version Control',
      iconImg: 'img/skills/github.png',
      iconClass: 'fa-brands fa-github',
      iconGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      title: 'GitHub & Remote Collaboration',
      role: 'as The Synchronizer',
      level: 92,
      levelLabel: '92% • Versioning (Synchronizer)',
      desc: 'Kolaborasi repositori jarak jauh, manajemen branch & pull request, deployment GitHub Pages, pelacakan issue, dan standarisasi commit convention.',
      tags: ['Remote Repos', 'Pull Request Review', 'GitHub Actions', 'Issue Tracking', 'Commit Hygiene'],
      projectJump: 'p1'
    },
    mysql: {
      id: 'mysql',
      name: 'MySQL',
      fileName: 'schema.sql',
      fileExt: '.SQL',
      fileSize: '11.2 KB',
      category: 'Database Architecture',
      iconImg: 'img/skills/mysql.png',
      iconClass: 'fa-solid fa-database',
      iconGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      title: 'MySQL Relational Database',
      role: 'as The Vault',
      level: 86,
      levelLabel: '86% • Database (The Vault)',
      desc: 'Perancangan skema relasional tabel terstandar, integritas foreign key, query join efisien, agregasi data, dan optimasi performa indeks.',
      tags: ['Relational Schema', 'Indexing & Joins', 'ACID Principles', 'Data Integrity', 'Query Optimization'],
      projectJump: 'p1'
    },
    capcut: {
      id: 'capcut',
      name: 'CapCut',
      fileName: 'project.ccp',
      fileExt: '.CCP',
      fileSize: '32.1 MB',
      category: 'Video & Content',
      iconImg: 'img/skills/capcut.png',
      iconClass: 'fa-solid fa-clapperboard',
      iconGradient: 'linear-gradient(135deg, #1e1b4b 0%, #000000 100%)',
      title: 'CapCut Video Editing',
      role: 'as The Storyteller',
      level: 88,
      levelLabel: '88% • Creative (Storyteller)',
      desc: 'Penyuntingan video ritmis, pemotongan timeline presisi, sinkronisasi audio latar, perataan warna visual, dan pengemasan portofolio video kreatif.',
      tags: ['Video Pacing', 'Timeline Editing', 'Color Grading', 'Sound Design', 'Showcase Reels'],
      projectJump: 'p5'
    },
    python: {
      id: 'python',
      name: 'Python',
      fileName: 'algorithm.py',
      fileExt: '.PY',
      fileSize: '6.8 KB',
      category: 'Algorithm & Logic',
      iconImg: 'img/skills/python.png',
      iconClass: 'fa-brands fa-python',
      iconGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      title: 'Python Algorithmic Problem Solving',
      role: 'as The Tactician',
      level: 85,
      levelLabel: '85% • Logic (Tactician)',
      desc: 'Penulisan skrip pemecahan masalah algoritmis, struktur data dasar hingga menengah, logika simulasi gim klasik, dan otomatisasi tugas komputasi.',
      tags: ['Algorithm Flow', 'Data Structures', 'Game Logic', 'Automation Script', 'Clean Syntax'],
      projectJump: 'p3'
    }
  };

  const skillsOrder = [
    'vscode', 'openai', 'laravel', 'css', 'claude',
    'figma', 'js', 'alight', 'html', 'php',
    'antigravity', 'github', 'mysql', 'capcut', 'python'
  ];
  let currentSkillIndex = 0;

  // Modal elements
  const skillModal = document.getElementById('skillModal');
  const skillModalBackdrop = document.getElementById('skillModalBackdrop');
  const skillModalCloseBtn = document.getElementById('skillModalCloseBtn');
  const skillModalBreadcrumb = document.getElementById('skillModalBreadcrumb');
  const skillModalIcon = document.getElementById('skillModalIcon');
  const skillModalIconWrap = document.getElementById('skillModalIconWrap');
  const skillModalFileName = document.getElementById('skillModalFileName');
  const skillModalFileExt = document.getElementById('skillModalFileExt');
  const skillModalFileSize = document.getElementById('skillModalFileSize');
  const skillModalCategory = document.getElementById('skillModalCategory');
  const skillModalCategoryTag = document.getElementById('skillModalCategoryTag');
  const skillModalTitle = document.getElementById('skillModalTitle');
  const skillModalRole = document.getElementById('skillModalRole');
  const skillModalLevelVal = document.getElementById('skillModalLevelVal');
  const skillModalProfFill = document.getElementById('skillModalProfFill');
  const skillModalDesc = document.getElementById('skillModalDesc');
  const skillModalTags = document.getElementById('skillModalTags');
  const skillModalProjectBtn = document.getElementById('skillModalProjectBtn');
  const skillPrevBtn = document.getElementById('skillPrevBtn');
  const skillNextBtn = document.getElementById('skillNextBtn');
  const skillFileCounter = document.getElementById('skillFileCounter');

  function renderSkillModal(skillId) {
    const data = skillsData[skillId];
    if (!data) return;

    currentSkillIndex = skillsOrder.indexOf(skillId);
    if (currentSkillIndex === -1) currentSkillIndex = 0;

    if (skillModalBreadcrumb) skillModalBreadcrumb.textContent = `~/portfolio/skills/${data.category.toLowerCase().split(' ')[0]}/${data.fileName}`;
    
    // Icon image or FontAwesome fallback
    if (skillModalIconWrap) {
      skillModalIconWrap.style.background = data.iconGradient || 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
      if (data.iconImg) {
        skillModalIconWrap.innerHTML = `<img src="${data.iconImg}" alt="${data.name}" style="width: 32px; height: 32px; object-fit: contain;" />`;
      } else if (skillModalIcon) {
        skillModalIconWrap.innerHTML = '';
        skillModalIcon.className = data.iconClass;
        skillModalIconWrap.appendChild(skillModalIcon);
      }
    }
    
    if (skillModalFileName) skillModalFileName.textContent = data.fileName;
    if (skillModalFileExt) skillModalFileExt.textContent = data.fileExt;
    if (skillModalFileSize) skillModalFileSize.textContent = data.fileSize;
    if (skillModalCategory) skillModalCategory.textContent = data.category;
    if (skillModalCategoryTag) skillModalCategoryTag.textContent = data.category.toUpperCase();
    if (skillModalTitle) skillModalTitle.textContent = data.title;
    if (skillModalRole) skillModalRole.textContent = data.role;
    if (skillModalLevelVal) skillModalLevelVal.textContent = data.levelLabel;

    // Animated bar fill
    if (skillModalProfFill) {
      skillModalProfFill.style.width = '0%';
      setTimeout(() => {
        skillModalProfFill.style.width = `${data.level}%`;
      }, 80);
    }

    if (skillModalDesc) skillModalDesc.textContent = data.desc;

    // Superpowers tags
    if (skillModalTags) {
      skillModalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'skill-power-pill';
        span.textContent = tag;
        skillModalTags.appendChild(span);
      });
    }

    if (skillFileCounter) {
      skillFileCounter.textContent = `Berkas ${currentSkillIndex + 1} dari ${skillsOrder.length}`;
    }
  }

  function openSkillModal(skillId) {
    if (!skillModal) return;
    renderSkillModal(skillId);
    skillModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    AdventureAudio.playSelect();

    if (skillModalCloseBtn) {
      setTimeout(() => skillModalCloseBtn.focus(), 60);
    }
  }

  function closeSkillModal() {
    if (!skillModal) return;
    skillModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function navigateSkill(direction) {
    AdventureAudio.playSelect();
    currentSkillIndex += direction;
    if (currentSkillIndex < 0) currentSkillIndex = skillsOrder.length - 1;
    if (currentSkillIndex >= skillsOrder.length) currentSkillIndex = 0;
    renderSkillModal(skillsOrder[currentSkillIndex]);
  }

  // --- 3B. INTERACTIVE HIERARCHICAL FOLDER BRANCHING CONTROLLER ---
  const skillsBurstStage = document.getElementById('skillsBurstStage');
  const skillsCentralFolder = document.getElementById('skillsCentralFolder');
  const skillsFolderHint = document.getElementById('skillsFolderHint');
  const filterChips = document.querySelectorAll('.branch-filter-chip');
  const categoryFolders = document.querySelectorAll('.category-branch-folder');
  const skillNodes = document.querySelectorAll('.skill-burst-node');
  const treeLines = document.querySelectorAll('.tree-line');

  // Track open/closed state for each of the 4 category folders
  const folderStates = {
    frontend: true,
    backend: true,
    framework: true,
    editing: true
  };

  // --- BASE COORDINATES & RANDOM SCATTER LAYOUT SYSTEM ("acak terus") ---
  const BASE_CATEGORY_COORDS = {
    frontend:  { x: -240, y: -160 },
    backend:   { x:  240, y: -160 },
    framework: { x: -240, y:  160 },
    editing:   { x:  240, y:  160 }
  };

  const BASE_SKILL_OFFSETS = {
    // Frontend children (relative to frontend folder)
    css:        { parent: 'frontend',  angle: -95,  dist: 120 },
    html:       { parent: 'frontend',  angle: -155, dist: 130 },
    js:         { parent: 'frontend',  angle: 175,  dist: 125 },
    // Backend children (relative to backend folder)
    mysql:      { parent: 'backend',   angle: -85,  dist: 120 },
    php:        { parent: 'backend',   angle: -25,  dist: 130 },
    python:     { parent: 'backend',   angle: 20,   dist: 125 },
    // Framework children (relative to framework folder)
    laravel:    { parent: 'framework', angle: 170,  dist: 125 },
    vscode:     { parent: 'framework', angle: -155, dist: 130 },
    github:     { parent: 'framework', angle: 125,  dist: 130 },
    antigravity:{ parent: 'framework', angle: 85,   dist: 135 },
    // Editing children (relative to editing folder)
    figma:      { parent: 'editing',   angle: 10,   dist: 125 },
    capcut:     { parent: 'editing',   angle: -25,  dist: 130 },
    claude:     { parent: 'editing',   angle: 55,   dist: 130 },
    alight:     { parent: 'editing',   angle: 90,   dist: 135 },
    openai:     { parent: 'editing',   angle: 130,  dist: 130 }
  };

  function randomizeScatterLayout() {
    if (!skillsBurstStage) return;

    const currentFolderCoords = {};

    // 1. Randomize 4 Category Folders with playful organic offset & tilt
    categoryFolders.forEach(folder => {
      const fid = folder.dataset.folderId;
      const base = BASE_CATEGORY_COORDS[fid] || { x: 0, y: 0 };

      // Organic random jitter: ±32px horizontal, ±26px vertical, ±10deg rotation
      const jx = (Math.random() - 0.5) * 64;
      const jy = (Math.random() - 0.5) * 52;
      const rot = Number(((Math.random() - 0.5) * 20).toFixed(1));

      const targetX = Math.round(base.x + jx);
      const targetY = Math.round(base.y + jy);

      currentFolderCoords[fid] = { x: targetX, y: targetY };

      folder.style.setProperty('--target-x', `${targetX}px`);
      folder.style.setProperty('--target-y', `${targetY}px`);
      folder.style.setProperty('--scatter-rot', `${rot}deg`);

      // Update SVG lvl1 line connecting central root (480, 370)
      treeLines.forEach(line => {
        if (line.classList.contains('tree-line-lvl1') && line.dataset.folderId === fid) {
          const x2 = 480 + targetX;
          const y2 = 370 + targetY;
          line.setAttribute('x1', '480');
          line.setAttribute('y1', '370');
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());
          const len = Math.hypot(targetX, targetY);
          line.style.setProperty('--line-len', `${len.toFixed(1)}px`);
        }
      });
    });

    // 2. Randomize 15 Skill Nodes relative to their parent
    skillNodes.forEach(node => {
      const sid = node.dataset.skillId;
      const spec = BASE_SKILL_OFFSETS[sid];
      if (!spec) return;

      const parentCoord = currentFolderCoords[spec.parent] || { x: 0, y: 0 };

      // Organic angle jitter: ±15deg, distance jitter: ±18px, tilt: ±14deg
      const angleJitter = (Math.random() - 0.5) * 30;
      const distJitter = (Math.random() - 0.5) * 36;
      const nodeRot = Number(((Math.random() - 0.5) * 28).toFixed(1));

      const finalAngleRad = (spec.angle + angleJitter) * (Math.PI / 180);
      const finalDist = spec.dist + distJitter;

      const skillX = Math.round(parentCoord.x + Math.cos(finalAngleRad) * finalDist);
      const skillY = Math.round(parentCoord.y + Math.sin(finalAngleRad) * finalDist);

      node.style.setProperty('--target-x', `${skillX}px`);
      node.style.setProperty('--target-y', `${skillY}px`);
      node.style.setProperty('--parent-x', `${parentCoord.x}px`);
      node.style.setProperty('--parent-y', `${parentCoord.y}px`);
      node.style.setProperty('--scatter-rot', `${nodeRot}deg`);

      // Update SVG lvl2 line from parent folder to skill leaf
      treeLines.forEach(line => {
        if (line.classList.contains('tree-line-lvl2') && line.dataset.skillId === sid) {
          const x1 = 480 + parentCoord.x;
          const y1 = 370 + parentCoord.y;
          const x2 = 480 + skillX;
          const y2 = 370 + skillY;
          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());
          const len = Math.hypot(skillX - parentCoord.x, skillY - parentCoord.y);
          line.style.setProperty('--line-len', `${len.toFixed(1)}px`);
        }
      });
    });
  }

  // --- SCROLL GATHERING TRIGGER (Folders converge into center as section approaches) ---
  let hasTriggeredGather = false;

  function triggerFolderGatherAnimation() {
    if (hasTriggeredGather || !skillsBurstStage) return;
    hasTriggeredGather = true;

    // Start with gathered/closed state
    skillsBurstStage.classList.remove('is-open');
    skillsBurstStage.classList.add('gathering-active');

    if (typeof AdventureAudio !== 'undefined' && AdventureAudio.playSelect) {
      AdventureAudio.playSelect();
    }

    // After swoosh completes (1800ms), central folder catches and bounces big
    setTimeout(() => {
      skillsBurstStage.classList.add('folder-catch');
      if (typeof AdventureAudio !== 'undefined' && AdventureAudio.playPop) {
        AdventureAudio.playPop();
      }

      setTimeout(() => {
        skillsBurstStage.classList.remove('gathering-active');
        skillsBurstStage.classList.remove('folder-catch');
        updateHintUI(false);
      }, 750);
    }, 1800);
  }

  if (skillsBurstStage && 'IntersectionObserver' in window) {
    const gatherObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Trigger precisely when the skills stage is in clear view
        if (entry.isIntersecting && !hasTriggeredGather) {
          triggerFolderGatherAnimation();
        }
      });
    }, {
      threshold: 0.28
    });

    gatherObserver.observe(skillsBurstStage);
  }

  function updateCategoryFolderDisplay(folderId) {
    const isOpen = folderStates[folderId];
    
    // Update category folder DOM element
    categoryFolders.forEach(folder => {
      if (folder.dataset.folderId === folderId) {
        folder.classList.toggle('is-open-folder', isOpen);
        const btn = folder.querySelector('.category-folder-btn');
        if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });

    // Update lines belonging to this parent folder
    treeLines.forEach(line => {
      if (line.dataset.parentFolder === folderId) {
        line.classList.toggle('parent-is-open', isOpen);
      }
    });

    // Update skill nodes belonging to this parent folder
    skillNodes.forEach(node => {
      if (node.dataset.parentFolder === folderId) {
        node.classList.toggle('parent-is-open', isOpen);
      }
    });
  }

  function toggleCategoryFolder(folderId) {
    folderStates[folderId] = !folderStates[folderId];
    updateCategoryFolderDisplay(folderId);

    // If all folders are closed or opened, update filter chips accordingly
    const allOpen = Object.values(folderStates).every(v => v);
    filterChips.forEach(chip => {
      if (chip.dataset.filter === 'all') {
        chip.classList.toggle('is-active', allOpen);
        chip.setAttribute('aria-selected', allOpen ? 'true' : 'false');
      } else if (chip.dataset.filter === folderId) {
        chip.classList.toggle('is-active', folderStates[folderId]);
        chip.setAttribute('aria-selected', folderStates[folderId] ? 'true' : 'false');
      }
    });
  }

  function setAllFoldersState(isOpen) {
    Object.keys(folderStates).forEach(fid => {
      folderStates[fid] = isOpen;
      updateCategoryFolderDisplay(fid);
    });

    filterChips.forEach(chip => {
      const match = chip.dataset.filter === (isOpen ? 'all' : 'none');
      chip.classList.toggle('is-active', match);
      chip.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    if (skillsBurstStage) {
      skillsBurstStage.classList.remove('filter-frontend', 'filter-backend', 'filter-framework', 'filter-editing');
      skillsBurstStage.classList.add('filter-all');
    }
  }

  function applyCategoryFilter(filterName) {
    if (!skillsBurstStage) return;

    if (filterName === 'all') {
      if (!skillsBurstStage.classList.contains('is-open')) {
        randomizeScatterLayout();
        skillsBurstStage.classList.add('is-open');
        if (skillsCentralFolder) skillsCentralFolder.setAttribute('aria-expanded', 'true');
        updateHintUI(true);
      }
      setAllFoldersState(true);
      return;
    }

    // Open targeted folder, close others for clean focus
    Object.keys(folderStates).forEach(fid => {
      folderStates[fid] = (fid === filterName);
      updateCategoryFolderDisplay(fid);
    });

    filterChips.forEach(chip => {
      const match = chip.dataset.filter === filterName;
      chip.classList.toggle('is-active', match);
      chip.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    skillsBurstStage.classList.remove('filter-all', 'filter-frontend', 'filter-backend', 'filter-framework', 'filter-editing');
    skillsBurstStage.classList.add(`filter-${filterName}`);

    // Ensure stage is open with randomized scatter
    if (!skillsBurstStage.classList.contains('is-open')) {
      randomizeScatterLayout();
      skillsBurstStage.classList.add('is-open');
      if (skillsCentralFolder) skillsCentralFolder.setAttribute('aria-expanded', 'true');
      updateHintUI(true);
    }
  }

  function updateHintUI(isOpen) {
    if (!skillsFolderHint) return;
    const hintText = skillsFolderHint.querySelector('.hint-text');
    const hintIcon = skillsFolderHint.querySelector('.hint-icon');
    if (isOpen) {
      if (hintText) hintText.textContent = 'KLIK SUBFOLDER UNTUK BUKA/TUTUP - KLIK IKON UNTUK DETAIL';
      if (hintIcon) hintIcon.className = 'fa-solid fa-folder-open hint-icon';
    } else {
      if (hintText) hintText.textContent = 'KLIK FOLDER UNTUK MEMBUKA ARSIP KEAHLIAN';
      if (hintIcon) hintIcon.className = 'fa-solid fa-hand-pointer hint-icon';
    }
  }

  if (skillsCentralFolder && skillsBurstStage) {
    // Root folder click: toggles whole tree open/close with fresh random scatter
    skillsCentralFolder.addEventListener('click', () => {
      if (!skillsBurstStage.classList.contains('is-open')) {
        // BURST OUT: Generate fresh organic random arrangement ("acak terus")!
        randomizeScatterLayout();
        skillsBurstStage.classList.add('is-open');
        skillsCentralFolder.setAttribute('aria-expanded', 'true');
        AdventureAudio.playPlace(1.2);
        setAllFoldersState(true);
        updateHintUI(true);
      } else {
        // CLOSE / TUCK BACK IN
        skillsBurstStage.classList.remove('is-open');
        skillsCentralFolder.setAttribute('aria-expanded', 'false');
        AdventureAudio.playSelect();
        updateHintUI(false);
      }
    });

    skillsCentralFolder.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        skillsCentralFolder.click();
      }
    });

    if (skillsFolderHint) {
      skillsFolderHint.addEventListener('click', () => {
        skillsCentralFolder.click();
      });
    }

    // Shuffle Button Click ("Acak Posisi")
    const btnShuffleSkills = document.getElementById('btnShuffleSkills');
    if (btnShuffleSkills) {
      btnShuffleSkills.addEventListener('click', () => {
        AdventureAudio.playPlace(1.3);
        randomizeScatterLayout();
        if (!skillsBurstStage.classList.contains('is-open')) {
          skillsBurstStage.classList.add('is-open');
          skillsCentralFolder.setAttribute('aria-expanded', 'true');
          setAllFoldersState(true);
          updateHintUI(true);
        }
      });
    }

    // Filter Chips Click
    filterChips.forEach(chip => {
      if (chip.id === 'btnShuffleSkills') return;
      chip.addEventListener('click', () => {
        const targetFilter = chip.dataset.filter;
        AdventureAudio.playSelect();
        applyCategoryFilter(targetFilter);
      });
    });

    // 4 Category Subfolders Click: Independent Toggle Open / Close
    categoryFolders.forEach(folder => {
      const folderBtn = folder.querySelector('.category-folder-btn');
      const folderId = folder.dataset.folderId;
      if (folderBtn) {
        folderBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Ensure root is open with randomized scatter
          if (!skillsBurstStage.classList.contains('is-open')) {
            randomizeScatterLayout();
            skillsBurstStage.classList.add('is-open');
            if (skillsCentralFolder) skillsCentralFolder.setAttribute('aria-expanded', 'true');
            updateHintUI(true);
          }

          // Toggle this folder open or closed!
          toggleCategoryFolder(folderId);

          if (folderStates[folderId]) {
            AdventureAudio.playPlace(1.1);
          } else {
            AdventureAudio.playSelect();
          }
        });
      }
    });

    // Skill Nodes Click & Hover Highlighting
    skillNodes.forEach(node => {
      const skillId = node.dataset.skillId;

      // Click: Open skill modal
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        openSkillModal(skillId);
      });

      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSkillModal(skillId);
        }
      });

      // Hover: Highlight connecting line to parent folder
      node.addEventListener('mouseenter', () => {
        treeLines.forEach(line => {
          if (line.dataset.skillId === skillId) {
            line.classList.add('is-highlighted');
          }
        });
      });

      node.addEventListener('mouseleave', () => {
        treeLines.forEach(line => {
          if (line.dataset.skillId === skillId) {
            line.classList.remove('is-highlighted');
          }
        });
      });
    });
  }

  // Modal controls
  if (skillModalCloseBtn) skillModalCloseBtn.addEventListener('click', closeSkillModal);
  if (skillModalBackdrop) skillModalBackdrop.addEventListener('click', closeSkillModal);
  if (skillPrevBtn) skillPrevBtn.addEventListener('click', () => navigateSkill(-1));
  if (skillNextBtn) skillNextBtn.addEventListener('click', () => navigateSkill(1));

  if (skillModalProjectBtn) {
    skillModalProjectBtn.addEventListener('click', () => {
      closeSkillModal();
    });
  }

  // Keyboard navigation for skill modal
  window.addEventListener('keydown', (e) => {
    if (!skillModal || skillModal.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeSkillModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateSkill(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateSkill(1);
    }
  });
  // --- 4. GALLERY PROJECTS LIGHTBOX MODAL & CONFIG HYDRATION ---
  // Build projectData dynamically from CONFIG_PROJECTS (config.js) or fallback
  const projectData = {};
  if (typeof CONFIG_PROJECTS !== 'undefined' && Array.isArray(CONFIG_PROJECTS) && CONFIG_PROJECTS.length > 0) {
    CONFIG_PROJECTS.forEach(p => {
      projectData[p.id] = {
        title: p.title || '',
        category: p.category || '',
        edition: p.edition || '',
        image: p.image || '',
        description: p.description || '',
        tech: Array.isArray(p.tech) ? p.tech.map(t => typeof t === 'string' ? t : (t.name || '')) : [],
        demo: p.demoUrl || '#',
        repo: p.repoUrl || '#'
      };
    });
  } else {
    projectData.p1 = {
      title: 'Sistem Informasi Universitas',
      category: 'Web Portal',
      edition: 'Campus Edition',
      image: 'img/univ.jpg',
      description: 'Website portal informasi komprehensif untuk Universitas Atma Jaya Yogyakarta dengan tata letak bersih, navigasi terstruktur, dan performa responsif.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      demo: 'https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
    projectData.p2 = {
      title: 'Website E-Commerce JCO Donuts',
      category: 'E-Commerce',
      edition: 'Culinary Edition',
      image: 'img/logo baru.png',
      description: 'Desain dan implementasi antarmuka landing page katalog produk donat premium J.CO yang lezat, interaktif, dan ramah pengguna.',
      tech: ['HTML5', 'CSS3', 'E-Commerce UI'],
      demo: 'https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
    projectData.p3 = {
      title: 'Game & Software Python',
      category: 'Python Dev',
      edition: 'Arcade Edition',
      image: 'img/python.jpg',
      description: 'Eksplorasi bahasa pemrograman Python untuk merancang logika interaktif, pengolahan data sederhana, dan pengembangan modul gim klasik.',
      tech: ['Python 3', 'Algorithms', 'Game Dev'],
      demo: 'https://drive.google.com/drive/folders/1OJ7EV6d5vqvGEp53Jp9b5gFa-r3DJKuk?usp=sharing',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
    projectData.p4 = {
      title: 'Design Landing Page Figma',
      category: 'UI/UX Figma',
      edition: 'Concept Edition',
      image: 'img/landing.jpg',
      description: 'Perancangan UI/UX landing page modern di Figma dengan fokus pada hierarki visual, kontras warna yang nyaman, tipografi terstruktur, dan alur prototipe mulus.',
      tech: ['Figma', 'UI/UX', 'Prototyping'],
      demo: 'https://www.figma.com/design/hwiHotD2EtEFiHTnz7G6wJ/E-Commerce-Design?node-id=0-1&t=tHgj5ebnapz78nLI-1',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
    projectData.p5 = {
      title: 'Design Web Batik Khas Yogyakarta',
      category: 'Heritage Web',
      edition: 'Heritage Edition',
      image: 'img/batikbaru.jpg',
      description: 'Perancangan desain toko daring warisan budaya batik khas Yogyakarta yang memadukan nuansa tradisional Nusantara dengan pengalaman belanja digital modern.',
      tech: ['Figma', 'E-Commerce', 'Culture'],
      demo: 'https://docs.google.com/document/d/1IXtKdZZeUXmvzTJlvwLknqLplPBPV6nUzIAECFkfMEw/edit?usp=sharing',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
    projectData.p6 = {
      title: 'Website E-Commerce Qinanthi',
      category: 'Fashion Store',
      edition: 'Fashion Edition',
      image: 'img/qinanthi.png',
      description: 'Konsep platform belanja digital busana dengan katalog produk terstruktur rapi, navigasi pencarian instan, dan antarmuka checkout yang intuitif.',
      tech: ['Figma', 'UI/UX', 'Design System'],
      demo: 'https://drive.google.com/drive/folders/169R3fSfCAHkVx097qVUEvLi55mTc7g70?usp=drive_link',
      repo: 'https://github.com/ananditaaa2010-a11y'
    };
  }

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalImg = document.getElementById('modalProjectImg');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalTechPills = document.getElementById('modalTechPills');
  const modalLiveBtn = document.getElementById('modalLiveDemoBtn');
  const modalRepoBtn = document.getElementById('modalRepoBtn');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalTechPills.innerHTML = '';
    data.tech.forEach(techItem => {
      const span = document.createElement('span');
      span.className = 'tech-pill';
      span.textContent = techItem;
      modalTechPills.appendChild(span);
    });

    modalLiveBtn.href = data.demo;
    modalRepoBtn.href = data.repo;

    projectModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    AdventureAudio.playSelect();
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    AdventureAudio.playClick();
  }

  // Modal close controls
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // --- 4B. 3D COVERFLOW GALLERY CONTROLLER (Zero Emojis, Responsive, Seamless Wrap) ---
  const gallerySection = document.getElementById('gallery');
  const coverflowStage = document.getElementById('coverflowStage');
  const coverflowPagination = document.getElementById('coverflowPagination');
  const coverflowPrevBtn = document.getElementById('coverflowPrevBtn');
  const coverflowNextBtn = document.getElementById('coverflowNextBtn');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const coverflowWrapper = document.getElementById('coverflowWrapper');

  // Hydrate Coverflow Cards & Dots dynamically from CONFIG_PROJECTS (if present)
  if (typeof CONFIG_PROJECTS !== 'undefined' && Array.isArray(CONFIG_PROJECTS) && CONFIG_PROJECTS.length > 0 && coverflowStage) {
    coverflowStage.innerHTML = CONFIG_PROJECTS.map((p, index) => {
      const numStr = p.number || ('#' + String(index + 1).padStart(2, '0'));
      const tapeClass = p.tapeClass || (index % 4 === 0 ? 'tape-cowhide' : index % 4 === 1 ? 'tape-flannel' : index % 4 === 2 ? 'tape-buzz' : 'tape-pizza');
      const tapeTitle = p.tapeTitle || 'Decorative Tape';
      const imgClass = p.imageFit === 'contain' ? 'coverflow-img img-contain-thumb' : 'coverflow-img';
      const catIcon = p.categoryIcon || 'fa-solid fa-layer-group';
      const catText = p.category || 'Project';
      const editionIcon = p.editionIcon || 'fa-solid fa-star';
      const editionText = p.edition || 'Special Edition';
      const statusText = p.status || 'ACTIVE';
      const heroTitle = p.heroTitle || (p.title ? p.title.toUpperCase() : 'PROYEK');

      let techBadgesHtml = '';
      if (Array.isArray(p.tech)) {
        techBadgesHtml = p.tech.map(t => {
          if (typeof t === 'string') {
            return `<span class="tech-badge-pill tech-pill-html"><i class="fa-solid fa-tag"></i> ${t}</span>`;
          }
          const icon = t.icon || 'fa-solid fa-tag';
          const pill = t.pillClass || 'tech-pill-html';
          const name = t.name || '';
          return `<span class="tech-badge-pill ${pill}"><i class="${icon}"></i> ${name}</span>`;
        }).join('');
      }

      const repoBtnHtml = p.repoUrl ? `
                    <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="coverflow-github-btn" aria-label="GitHub Repository ${p.title}" title="Buka GitHub Repository">
                      <i class="fa-brands fa-github"></i>
                    </a>` : '';

      return `
            <article class="coverflow-card" data-index="${index}" data-project-id="${p.id}" role="button" tabindex="0" aria-label="Lihat Proyek ${p.title}">
              <div class="coverflow-card-inner">
                <div class="washi-tape-strip ${tapeClass}" title="${tapeTitle}"></div>
                
                <!-- 3D Volumetric Thumbnail Frame -->
                <div class="coverflow-thumb-frame">
                  <!-- Deep Image Layer -->
                  <div class="parallax-img-container">
                    <img src="${p.image}" alt="${p.title}" class="${imgClass}" loading="lazy" />
                  </div>
                  
                  <!-- Contrast Scrim Gradient -->
                  <div class="parallax-scrim-gradient"></div>

                  <!-- Top Bar: Category Pill & EduMatch Style Circular Action Button -->
                  <div class="parallax-top-bar">
                    <span class="project-category-tag"><i class="${catIcon}"></i> ${catText}</span>
                    <a href="${p.demoUrl || '#'}" target="_blank" rel="noopener noreferrer" class="hero-corner-launch-btn" aria-label="Buka Proyek ${p.title}" title="Buka Proyek Langsung">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>

                  <!-- Volumetric Front Overlay (Tech Pills + Floating Big Title) -->
                  <div class="parallax-volumetric-overlay">
                    <div class="project-tech-badges">
                      ${techBadgesHtml}
                    </div>
                    <h3 class="coverflow-hero-title">${heroTitle}</h3>
                  </div>
                </div>

                <!-- Clean Bottom Info Bar -->
                <div class="coverflow-info-bar">
                  <div class="project-meta-top">
                    <span class="project-edition-label"><i class="${editionIcon}"></i> ${editionText}</span>
                    <span class="project-status-dot"><span class="status-pulse-circle"></span> ${statusText}</span>
                  </div>
                  <p class="coverflow-desc">${p.description}</p>
                  
                  <div class="project-footer-actions">
                    <a href="${p.demoUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn-view-project" aria-label="Lihat Proyek ${p.title}">
                      <span>LIHAT PROYEK</span>
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <button class="coverflow-detail-btn" type="button" aria-label="Detail ${p.title}">
                      <span>DETAIL</span> <i class="fa-solid fa-circle-info"></i>
                    </button>
                    ${repoBtnHtml}
                  </div>
                </div>
              </div>
            </article>`;
    }).join('\n');

    if (coverflowPagination) {
      coverflowPagination.innerHTML = CONFIG_PROJECTS.map((_, i) =>
        `<button class="coverflow-dot${i === 0 ? ' active' : ''}" data-index="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-label="Slide ${i + 1}"></button>`
      ).join('\n');
    }

    if (totalSlidesNum) {
      totalSlidesNum.textContent = String(CONFIG_PROJECTS.length).padStart(2, '0');
    }
  }

  const coverflowCards = Array.from(document.querySelectorAll('.coverflow-card'));
  const coverflowDots = Array.from(document.querySelectorAll('.coverflow-dot'));

  let currentCoverflowIndex = 0;
  const totalCoverflowCards = coverflowCards.length;

  function updateCoverflow(newIndex, playSound = true) {
    if (totalCoverflowCards === 0) return;

    if (typeof resetActiveCardParallax === 'function') {
      resetActiveCardParallax();
    }

    // Wrap around smoothly (modular arithmetic)
    currentCoverflowIndex = ((newIndex % totalCoverflowCards) + totalCoverflowCards) % totalCoverflowCards;

    coverflowCards.forEach((card, i) => {
      let rawDiff = i - currentCoverflowIndex;
      let diff = rawDiff;

      // Find shortest angular distance for wrap-around symmetry
      if (rawDiff > totalCoverflowCards / 2) {
        diff = rawDiff - totalCoverflowCards;
      } else if (rawDiff < -totalCoverflowCards / 2) {
        diff = rawDiff + totalCoverflowCards;
      }

      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next', 'is-hidden');

      if (diff === 0) {
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
        card.tabIndex = 0;
      } else if (diff === -1) {
        card.classList.add('is-prev');
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = 0;
      } else if (diff === 1) {
        card.classList.add('is-next');
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = 0;
      } else if (diff < -1) {
        card.classList.add('is-far-prev');
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = -1;
      } else if (diff > 1) {
        card.classList.add('is-far-next');
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = -1;
      } else {
        card.classList.add('is-hidden');
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = -1;
      }
    });

    // Update pagination dots
    coverflowDots.forEach((dot, dotIdx) => {
      if (dotIdx === currentCoverflowIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Update counter pill display with two digits matching vercel
    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentCoverflowIndex + 1).padStart(2, '0');
    }

    if (playSound && AdventureAudio && AdventureAudio.playPlace) {
      AdventureAudio.playPlace(0.9 + currentCoverflowIndex * 0.08);
    }
  }

  // Card click handlers: Active card opens modal; Side cards rotate to front!
  coverflowCards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // If clicking direct external project link, corner launch button, or GitHub button, let it open naturally without modal intercept
      if (e.target.closest('.btn-view-project') || e.target.closest('.hero-corner-launch-btn') || e.target.closest('.coverflow-github-btn')) {
        return;
      }

      const pId = card.getAttribute('data-project-id');

      // If clicking detail button directly
      if (e.target.closest('.coverflow-detail-btn') || e.target.closest('.coverflow-action-pill')) {
        e.stopPropagation();
        openModal(pId);
        return;
      }

      // If active card is clicked, open modal
      if (card.classList.contains('is-active')) {
        openModal(pId);
      } else if (card.classList.contains('is-prev')) {
        updateCoverflow(currentCoverflowIndex - 1);
      } else if (card.classList.contains('is-next')) {
        updateCoverflow(currentCoverflowIndex + 1);
      } else {
        updateCoverflow(idx);
      }
    });

    // Keyboard Enter / Space support on cards
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.btn-view-project') || e.target.closest('.hero-corner-launch-btn') || e.target.closest('.coverflow-github-btn')) {
          return;
        }
        e.preventDefault();
        const pId = card.getAttribute('data-project-id');
        if (card.classList.contains('is-active')) {
          openModal(pId);
        } else {
          updateCoverflow(idx);
        }
      }
    });
  });

  // Navigation Arrow Buttons
  if (coverflowPrevBtn) {
    coverflowPrevBtn.addEventListener('click', () => {
      updateCoverflow(currentCoverflowIndex - 1);
    });
  }

  if (coverflowNextBtn) {
    coverflowNextBtn.addEventListener('click', () => {
      updateCoverflow(currentCoverflowIndex + 1);
    });
  }

  // Pagination Dots Click
  coverflowDots.forEach((dot, dotIdx) => {
    dot.addEventListener('click', () => {
      updateCoverflow(dotIdx);
    });
  });

  // Keyboard Left / Right navigation when Section 4 is visible
  document.addEventListener('keydown', (e) => {
    // Only engage if modals are closed
    const isProjectModalOpen = projectModal && !projectModal.hasAttribute('hidden');
    const skillModalEl = document.getElementById('skillModal');
    const isSkillModalOpen = skillModalEl && !skillModalEl.hasAttribute('hidden');

    if (isProjectModalOpen || isSkillModalOpen) return;

    if (gallerySection && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      const rect = gallerySection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;

      if (inView) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          updateCoverflow(currentCoverflowIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          updateCoverflow(currentCoverflowIndex + 1);
        }
      }
    }
  });

  // Touch swipe support on mobile devices
  if (coverflowWrapper) {
    let touchStartX = 0;
    let touchStartY = 0;

    coverflowWrapper.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    coverflowWrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            updateCoverflow(currentCoverflowIndex + 1);
          } else {
            updateCoverflow(currentCoverflowIndex - 1);
          }
        }
      }
    }, { passive: true });
  }

  // ================================================================
  // 3D VOLUMETRIC PARALLAX CONTROLLER (EDUMATCH STYLE POP-OUT DEPTH)
  // ================================================================
  let parallaxTargetX = 0;
  let parallaxTargetY = 0;
  let parallaxCurrentX = 0;
  let parallaxCurrentY = 0;
  let parallaxRafId = null;
  let isParallaxHovered = false;

  function applyParallaxFrame() {
    const ease = 0.12;
    parallaxCurrentX += (parallaxTargetX - parallaxCurrentX) * ease;
    parallaxCurrentY += (parallaxTargetY - parallaxCurrentY) * ease;

    const activeCard = document.querySelector('.coverflow-card.is-active');
    if (activeCard) {
      const maxTilt = 8.5; // degrees tilt
      const tiltX = parallaxCurrentX * maxTilt;
      const tiltY = -parallaxCurrentY * maxTilt;

      activeCard.style.setProperty('--px', parallaxCurrentX.toFixed(4));
      activeCard.style.setProperty('--py', parallaxCurrentY.toFixed(4));
      activeCard.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      activeCard.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    }

    if (isParallaxHovered || Math.abs(parallaxTargetX - parallaxCurrentX) > 0.001 || Math.abs(parallaxTargetY - parallaxCurrentY) > 0.001) {
      parallaxRafId = requestAnimationFrame(applyParallaxFrame);
    } else {
      parallaxRafId = null;
    }
  }

  function startParallaxLoop() {
    if (!parallaxRafId) {
      parallaxRafId = requestAnimationFrame(applyParallaxFrame);
    }
  }

  function resetActiveCardParallax() {
    parallaxTargetX = 0;
    parallaxTargetY = 0;
    parallaxCurrentX = 0;
    parallaxCurrentY = 0;
    const activeCard = document.querySelector('.coverflow-card.is-active');
    if (activeCard) {
      activeCard.style.setProperty('--px', '0');
      activeCard.style.setProperty('--py', '0');
      activeCard.style.setProperty('--tilt-x', '0deg');
      activeCard.style.setProperty('--tilt-y', '0deg');
    }
  }

  if (coverflowStage) {
    coverflowStage.addEventListener('mousemove', (e) => {
      const activeCard = document.querySelector('.coverflow-card.is-active');
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      // Track within active card bounds + 25px tolerance
      if (e.clientX >= rect.left - 25 && e.clientX <= rect.right + 25 &&
          e.clientY >= rect.top - 25 && e.clientY <= rect.bottom + 25) {
        isParallaxHovered = true;
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        parallaxTargetX = Math.max(-1, Math.min(1, (e.clientX - cardCenterX) / (rect.width / 2)));
        parallaxTargetY = Math.max(-1, Math.min(1, (e.clientY - cardCenterY) / (rect.height / 2)));
        startParallaxLoop();
      } else if (isParallaxHovered) {
        isParallaxHovered = false;
        parallaxTargetX = 0;
        parallaxTargetY = 0;
        startParallaxLoop();
      }
    });

    coverflowStage.addEventListener('mouseleave', () => {
      isParallaxHovered = false;
      parallaxTargetX = 0;
      parallaxTargetY = 0;
      startParallaxLoop();
    });
  }

  // Initialize coverflow at slide 0 without sound
  updateCoverflow(0, false);

  // --- 5. INTERACTIVE CONTACT FORM ---
  const contactForm = document.getElementById('contactForm');
  const formStatusAlert = document.getElementById('formStatusAlert');

  if (contactForm && formStatusAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !subject || !message) {
        formStatusAlert.className = 'form-status-alert alert-error';
        formStatusAlert.textContent = 'Harap isi semua kolom formulir sebelum mengirim pesan!';
        return;
      }

      AdventureAudio.playSuccess();
      formStatusAlert.className = 'form-status-alert alert-success';
      formStatusAlert.textContent = 'Terima kasih, ' + name + '! Pesan Anda telah berhasil terkirim. Anandita akan segera merespons ke email Anda.';

      contactForm.reset();

      setTimeout(() => {
        formStatusAlert.style.display = 'none';
        formStatusAlert.className = 'form-status-alert';
      }, 7000);
    });
  }

  // --- 6. INTERACTIVE AUDIO ON BUTTONS & MASCOTS ---
  const interactiveBadges = document.querySelectorAll('.mascot-badge-frame, .directional-arrow-plank, .banner-silhouette, .footer-asset-card, .footer-back-to-top, .context-menu-item, .btn-edition-jump');
  interactiveBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      AdventureAudio.playClick();
    });
  });

  // --- 7. FIGMA CANVAS DOCK & SHORTCUT INTERACTION ---
  const dockButtons = document.querySelectorAll('.dock-tool-btn');
  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      AdventureAudio.playClick();
      if (btn.getAttribute('data-dock-action')) {
        dockButtons.forEach(b => b.classList.remove('active-dock'));
        btn.classList.add('active-dock');
      }
    });
  });

  // Keyboard navigation shortcuts: S (Story), C (Cast), P (Stills/Projects), T (Transmission/Contact), V (Select)
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }
    const key = e.key.toUpperCase();
    if (key === 'S') {
      const el = document.getElementById('story');
      if (el) {
        AdventureAudio.playSelect();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (key === 'C') {
      const el = document.getElementById('cast');
      if (el) {
        AdventureAudio.playSelect();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (key === 'P') {
      const el = document.getElementById('gallery');
      if (el) {
        AdventureAudio.playSelect();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (key === 'T') {
      const el = document.getElementById('signpost');
      if (el) {
        AdventureAudio.playSelect();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (key === 'V') {
      const selectBtn = document.querySelector('.dock-tool-btn[data-dock-action="select"]');
      if (selectBtn) {
        AdventureAudio.playSelect();
        dockButtons.forEach(b => b.classList.remove('active-dock'));
        selectBtn.classList.add('active-dock');
      }
    }
  });

  // Desktop Mouse Parallax Tilt for Canvas Bounding Box
  const heroStage = document.getElementById('heroCanvasStage');
  const boundingBox = document.getElementById('canvasBoundingBox');
  const authorCursor = document.getElementById('authorCursor');
  const heroTrack = document.getElementById('heroStayScrollTrack');

  if (heroStage && boundingBox && window.innerWidth > 768) {
    heroStage.addEventListener('mousemove', (e) => {
      if (heroTrack) {
        const rect = heroTrack.getBoundingClientRect();
        if (rect.top < -40) return; // Prioritize clean stay-scroll split during scroll
      }
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltY = x * 6;
      const tiltX = -y * 6;
      boundingBox.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) rotateZ(-4.5deg)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      boundingBox.style.transform = 'rotate(-4.5deg)';
    });
  }

  // --- 8. HERO STAYSCROLL & TEXT PARTING CONTROLLER ---
  const typoPort = document.getElementById('typoPort');
  const typoFolio = document.getElementById('typoFolio');
  const boxEdgeTop = document.getElementById('boxEdgeTop');
  const boxEdgeBottom = document.getElementById('boxEdgeBottom');
  const partingReveal = document.getElementById('partingReveal');
  const contextMenu = document.querySelector('.canvas-floating-context-menu');
  const editionWidget = document.querySelector('.canvas-floating-edition-widget');
  const floatingDock = document.querySelector('.canvas-floating-dock');
  const heroCta = document.querySelector('.hero-cta-buttons');
  const heroTagline = document.querySelector('.hero-storyline-tagline');
  const heroKicker = document.querySelector('.hero-kicker-pill');

  let isHeroTicking = false;

  function updateHeroStayScroll() {
    isHeroTicking = false;
    if (!heroTrack) return;

    // Mobile / small tablet check: disable stayscroll animation as user requested
    if (window.innerWidth <= 768) {
      if (typoPort) { typoPort.style.transform = ''; typoPort.style.opacity = ''; }
      if (typoFolio) { typoFolio.style.transform = ''; typoFolio.style.opacity = ''; }
      if (boxEdgeTop) boxEdgeTop.style.transform = '';
      if (boxEdgeBottom) boxEdgeBottom.style.transform = '';
      if (boundingBox) {
        boundingBox.style.borderLeftColor = '';
        boundingBox.style.borderRightColor = '';
      }
      if (contextMenu) { contextMenu.style.transform = ''; contextMenu.style.opacity = ''; contextMenu.style.pointerEvents = ''; }
      if (editionWidget) { editionWidget.style.transform = ''; editionWidget.style.opacity = ''; editionWidget.style.pointerEvents = ''; }
      if (floatingDock) { floatingDock.style.transform = ''; floatingDock.style.opacity = ''; floatingDock.style.pointerEvents = ''; }
      if (heroCta) { heroCta.style.opacity = ''; heroCta.style.pointerEvents = ''; }
      if (heroTagline) heroTagline.style.opacity = '';
      if (heroKicker) heroKicker.style.opacity = '';
      if (partingReveal) { partingReveal.style.opacity = '0'; partingReveal.style.pointerEvents = 'none'; }
      return;
    }

    const rect = heroTrack.getBoundingClientRect();
    const maxScroll = heroTrack.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    // Progress 0.0 at top of hero, 1.0 when track completes
    const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

    // Parting distance: "text portofolio nya itu ada yang kebawah dan keatas"
    const splitDist = Math.min(window.innerHeight * 0.38, 300);
    const currentSplit = progress * splitDist;

    // 1. "PORT" moves UP (ke atas)
    if (typoPort) {
      const portOpacity = progress > 0.82 ? Math.max(1 - (progress - 0.82) / 0.18, 0) : 1;
      typoPort.style.transform = `translateY(-${currentSplit.toFixed(1)}px)`;
      typoPort.style.opacity = portOpacity;
    }

    // Top bounding box edge moves UP with PORT
    if (boxEdgeTop) {
      boxEdgeTop.style.transform = `translateY(-${currentSplit.toFixed(1)}px)`;
    }

    // 2. "FOLIO" moves DOWN (ke bawah)
    if (typoFolio) {
      const folioOpacity = progress > 0.82 ? Math.max(1 - (progress - 0.82) / 0.18, 0) : 1;
      typoFolio.style.transform = `translateY(${currentSplit.toFixed(1)}px)`;
      typoFolio.style.opacity = folioOpacity;
    }

    // Bottom bounding box edge (with cursor) moves DOWN with FOLIO
    if (boxEdgeBottom) {
      boxEdgeBottom.style.transform = `translateY(${currentSplit.toFixed(1)}px)`;
    }

    // Side borders of bounding box dissolve gently as box parts
    if (boundingBox) {
      const borderAlpha = Math.max(1 - progress * 2.2, 0);
      boundingBox.style.borderLeftColor = `rgba(163, 230, 53, ${borderAlpha})`;
      boundingBox.style.borderRightColor = `rgba(163, 230, 53, ${borderAlpha})`;
    }

    // 3. Surrounding UI elements fade out cleanly as parting begins
    const fadeAlpha = Math.max(1 - progress * 2.2, 0);

    if (contextMenu) {
      contextMenu.style.transform = `translate(${(progress * 60).toFixed(1)}px, -${(progress * 30).toFixed(1)}px)`;
      contextMenu.style.opacity = fadeAlpha;
      contextMenu.style.pointerEvents = fadeAlpha > 0.2 ? 'auto' : 'none';
    }

    if (editionWidget) {
      editionWidget.style.transform = `translate(-${(progress * 60).toFixed(1)}px, ${(progress * 30).toFixed(1)}px)`;
      editionWidget.style.opacity = fadeAlpha;
      editionWidget.style.pointerEvents = fadeAlpha > 0.2 ? 'auto' : 'none';
    }

    if (floatingDock) {
      floatingDock.style.transform = `translateY(${(progress * 60).toFixed(1)}px)`;
      floatingDock.style.opacity = fadeAlpha;
      floatingDock.style.pointerEvents = fadeAlpha > 0.2 ? 'auto' : 'none';
    }

    if (heroCta) {
      heroCta.style.opacity = fadeAlpha;
      heroCta.style.pointerEvents = fadeAlpha > 0.2 ? 'auto' : 'none';
    }

    if (heroTagline) heroTagline.style.opacity = fadeAlpha;
    if (heroKicker) heroKicker.style.opacity = fadeAlpha;

    // 4. Center Parting Reveal Layer emerges as PORT & FOLIO part!
    if (partingReveal) {
      if (progress > 0.12 && progress < 0.94) {
        const revealOpacity = progress < 0.38
          ? (progress - 0.12) / 0.26
          : progress > 0.78
            ? Math.max(1 - (progress - 0.78) / 0.16, 0)
            : 1;
        const revealScale = 0.88 + progress * 0.14;
        partingReveal.style.opacity = revealOpacity.toFixed(2);
        partingReveal.style.transform = `translate(-50%, -50%) scale(${revealScale.toFixed(2)})`;
        partingReveal.style.pointerEvents = 'auto';
      } else {
        partingReveal.style.opacity = '0';
        partingReveal.style.pointerEvents = 'none';
      }
    }
  }

  function requestHeroUpdate() {
    if (!isHeroTicking) {
      isHeroTicking = true;
      requestAnimationFrame(updateHeroStayScroll);
    }
  }

  window.addEventListener('scroll', requestHeroUpdate, { passive: true });
  window.addEventListener('resize', requestHeroUpdate);
  updateHeroStayScroll();

  // --- 9. THE STORY SCROLL CONTROLLER (TEXT HIGHLIGHT, IMAGE GROWTH, POP-IN ELEMENTS) ---
  const storySection = document.getElementById('story');
  const storyPoster = document.getElementById('storyPoster');
  const storyScrollElements = document.querySelectorAll('.story-scroll-elem');
  let storyWords = [];

  // Parse narrative text into animated word spans (Habib Alfino style scroll highlight)
  function prepareStoryScrollText() {
    const textContainers = document.querySelectorAll('.story-lead-paragraph, .story-body-text, .chapter-desc');
    const highlightKeywords = ['UI/UX', 'Figma', 'HTML5', 'CSS3', 'JavaScript', 'frontend', 'API', 'Git', 'GitHub', 'semantik', 'responsif'];

    textContainers.forEach(container => {
      if (!container || (container.dataset && container.dataset.wordsPrepared)) return;
      if (container.dataset) container.dataset.wordsPrepared = 'true';

      const nodes = Array.from(container.childNodes);
      container.innerHTML = '';

      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              container.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'story-word';
              const cleanWord = part.replace(/[.,&()]/g, '');
              if (highlightKeywords.some(k => k.toLowerCase() === cleanWord.toLowerCase())) {
                span.classList.add('word-accent');
              }
              span.textContent = part;
              container.appendChild(span);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const isStrong = node.tagName === 'STRONG';
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              container.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'story-word ' + (isStrong ? 'word-highlight' : '');
              span.textContent = part;
              container.appendChild(span);
            }
          });
        }
      });
    });

    storyWords = Array.from(document.querySelectorAll('.story-word'));
  }

  prepareStoryScrollText();

  let isStoryTicking = false;

  function updateStoryScroll() {
    isStoryTicking = false;
    if (!storySection) return;

    const windowH = window.innerHeight;
    const storyRect = storySection.getBoundingClientRect();

    // 1. Text words highlight reveal (Habib Alfino style)
    const wordTriggerY = windowH * 0.78;
    storyWords.forEach(w => {
      const wRect = w.getBoundingClientRect();
      if (wRect.top <= wordTriggerY && wRect.bottom >= 0) {
        w.classList.add('word-lit');
      } else if (wRect.top > wordTriggerY) {
        w.classList.remove('word-lit');
      }
    });

    // 2. Image starts small and expands ("gambarnya juga kecil terus membesar")
    if (storyPoster) {
      if (storyRect.bottom > 0 && storyRect.top < windowH) {
        const scrollDist = windowH * 0.9;
        const progress = Math.min(Math.max((windowH - storyRect.top) / scrollDist, 0), 1);
        const scale = 0.76 + (progress * 0.25);
        const opacity = 0.5 + (progress * 0.5);

        storyPoster.style.transform = `scale(${scale.toFixed(3)})`;
        storyPoster.style.opacity = opacity.toFixed(2);
      }
    }

    // 3. Staggered pop-in for story elements ("tu kan ada element nah itu dibuat kayak muncul" pas kita scroll")
    const elemTriggerY = windowH * 0.88;
    storyScrollElements.forEach(el => {
      const elRect = el.getBoundingClientRect();
      if (elRect.top <= elemTriggerY && elRect.bottom >= 0) {
        el.classList.add('elem-visible');
      } else if (elRect.top > windowH * 1.05) {
        el.classList.remove('elem-visible');
      }
    });
  }

  function requestStoryUpdate() {
    if (!isStoryTicking) {
      isStoryTicking = true;
      requestAnimationFrame(updateStoryScroll);
    }
  }

  window.addEventListener('scroll', requestStoryUpdate, { passive: true });
  window.addEventListener('resize', requestStoryUpdate);
  updateStoryScroll();

  // --- 10. MATHEMATICS & ALGEBRA FORMULA LOADING SCREEN CONTROLLER ---
  const mathLoadingScreen = document.getElementById('mathLoadingScreen');
  const mathProgressFill = document.getElementById('mathProgressFill');
  const mathProgressNum = document.getElementById('mathProgressNum');
  const mathActiveStep = document.getElementById('mathActiveStep');
  const mathActiveFormula = document.getElementById('mathActiveFormula');
  const mathStatusMsg = document.getElementById('mathStatusMsg');
  const mathStepCounter = document.getElementById('mathStepCounter');
  const mathSkipBtn = document.getElementById('mathSkipBtn');

  if (mathLoadingScreen) {
    const mathSteps = [
      {
        step: 'LANGKAH 1 / 4: PERSAMAAN KUADRATIK & DISKRIMINAN',
        formula: '<span class="formula-var">x</span> = <span class="formula-frac"><span class="formula-num">-b &plusmn; &radic;(b&sup2; - 4ac)</span><span class="formula-den">2a</span></span>',
        status: 'Mengkalkulasi diskriminan D = b&sup2; - 4ac &amp; titik akar...'
      },
      {
        step: 'LANGKAH 2 / 4: IDENTITAS EULER &amp; BILANGAN KOMPLEKS',
        formula: 'e<sup>i&pi;</sup> + 1 = 0',
        status: 'Menyelaraskan konstanta geometri &amp; bilangan imajiner...'
      },
      {
        step: 'LANGKAH 3 / 4: INTEGRAL KALKULUS &amp; VEKTOR ALJABAR',
        formula: '&int;<sub>0</sub><sup>&infin;</sup> e<sup>-x&sup2;</sup> dx = &radic;&pi; / 2',
        status: 'Mengintegrasikan luas kurva kontinu &amp; koordinat kanvas...'
      },
      {
        step: 'LANGKAH 4 / 4: DETERMINAN MATRIKS &amp; TRANSFORMA DIGITAL',
        formula: 'det(A) = ad - bc &ne; 0',
        status: 'Semua rumus terpecahkan! Menyusun antarmuka portofolio...'
      }
    ];

    let currentProgress = 0;
    let stepIndex = 0;
    let isDismissed = false;

    function dismissMathLoader() {
      if (isDismissed) return;
      isDismissed = true;
      mathLoadingScreen.classList.add('is-loaded');
      document.body.classList.add('page-loaded');
      if (AdventureAudio && AdventureAudio.playSuccess) {
        AdventureAudio.playSuccess();
      }
      setTimeout(() => {
        if (mathLoadingScreen && mathLoadingScreen.parentNode) {
          mathLoadingScreen.style.display = 'none';
        }
      }, 700);
    }

    if (mathSkipBtn) {
      mathSkipBtn.addEventListener('click', dismissMathLoader);
    }

    // Allow quick dismissal via keyboard Space or Escape
    document.addEventListener('keydown', (e) => {
      if (!isDismissed && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
        dismissMathLoader();
      }
    });

    const loaderStartTime = performance.now();
    const targetDuration = 2200; // 2.2 seconds smooth solving animation

    function updateLoader(currentTime) {
      if (isDismissed) return;

      const elapsed = currentTime - loaderStartTime;
      const progressFraction = Math.min(elapsed / targetDuration, 1);
      currentProgress = Math.round(progressFraction * 100);

      // Smooth step switching based on percentage
      const newStepIndex = Math.min(Math.floor(progressFraction * 4), 3);
      if (newStepIndex !== stepIndex) {
        stepIndex = newStepIndex;
        const data = mathSteps[stepIndex];
        if (data) {
          if (mathActiveStep) mathActiveStep.textContent = data.step;
          if (mathActiveFormula) mathActiveFormula.innerHTML = data.formula;
          if (mathStatusMsg) mathStatusMsg.innerHTML = data.status;
          if (mathStepCounter) mathStepCounter.textContent = 'LANGKAH ' + (stepIndex + 1) + ' / 4: ' + (stepIndex === 0 ? 'FAKTORISASI' : stepIndex === 1 ? 'EULER' : stepIndex === 2 ? 'INTEGRAL' : 'MATRIKS');
          if (AdventureAudio && AdventureAudio.playPlace) {
            AdventureAudio.playPlace(0.8 + stepIndex * 0.15);
          }
        }
      }

      if (mathProgressFill) mathProgressFill.style.width = currentProgress + '%';
      if (mathProgressNum) mathProgressNum.textContent = String(currentProgress);

      if (progressFraction < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(dismissMathLoader, 250);
      }
    }

    requestAnimationFrame(updateLoader);
  }

  // --- 11. LIVELY ADVENTURE SCROLL ANIMATION & ROCKET COMPANION CONTROLLER ---
  const parallaxItems = Array.from(document.querySelectorAll('.parallax-item'));
  const rocketCompanion = document.getElementById('scrollRocketCompanion');
  const rocketBodyRig = document.getElementById('rocketBodyRig');
  const rocketPctText = document.getElementById('rocketPctText');
  const rocketStatusMsg = document.getElementById('rocketStatusMsg');

  let lastScrollY = window.scrollY;
  let scrollDirectionTimer = null;

  function onLivelyPageScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // 1. Dynamic Parallax Stream
    if (window.innerWidth > 768 && parallaxItems.length > 0) {
      parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed')) || 0.3;
        const yOffset = (currentScrollY * speed) % 300;
        const rot = (currentScrollY * speed * 0.12) % 360;
        item.style.transform = 'translateY(' + yOffset + 'px) rotate(' + rot + 'deg)';
      });
    }

    // 2. Rocket Glider Companion Status & Direction
    if (rocketCompanion) {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollPct = Math.min(Math.max(Math.round((currentScrollY / maxScroll) * 100), 0), 100);

      if (rocketPctText) {
        rocketPctText.textContent = scrollPct + '%';
      }

      if (rocketStatusMsg) {
        if (scrollPct < 15) {
          rocketStatusMsg.textContent = 'Mulai Petualangan!';
        } else if (scrollPct < 38) {
          rocketStatusMsg.textContent = 'Kisah & Perjalanan';
        } else if (scrollPct < 65) {
          rocketStatusMsg.textContent = 'Kotak Keahlian RPL';
        } else if (scrollPct < 85) {
          rocketStatusMsg.textContent = 'Galeri 3D Proyek';
        } else {
          rocketStatusMsg.textContent = 'Ayo Terhubung!';
        }
      }

      // Tilt Rocket based on scroll direction
      if (rocketBodyRig) {
        if (scrollDelta > 2) {
          rocketBodyRig.classList.add('is-scrolling-down');
          rocketBodyRig.classList.remove('is-scrolling-up');
        } else if (scrollDelta < -2) {
          rocketBodyRig.classList.add('is-scrolling-up');
          rocketBodyRig.classList.remove('is-scrolling-down');
        }

        clearTimeout(scrollDirectionTimer);
        scrollDirectionTimer = setTimeout(() => {
          rocketBodyRig.classList.remove('is-scrolling-down', 'is-scrolling-up');
        }, 180);
      }
    }
  }

  window.addEventListener('scroll', onLivelyPageScroll, { passive: true });

  // Rocket Click: Rocket smoothly back to top!
  if (rocketCompanion) {
    rocketCompanion.addEventListener('click', () => {
      if (AdventureAudio && AdventureAudio.playSelect) {
        AdventureAudio.playSelect();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 12. SCROLL REVEAL / ENTER OBSERVER (Strictly Excluding #story / About Us) ---
  const appearItems = Array.from(document.querySelectorAll('.scroll-appear-item, .scroll-appear-bounce'));

  if ('IntersectionObserver' in window && appearItems.length > 0) {
    const appearObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    appearItems.forEach(item => {
      // Ironclad exclusion: Never apply to any element inside #story (About Us)
      if (!item.closest('#story')) {
        appearObserver.observe(item);
      } else {
        item.classList.add('is-in-view');
      }
    });
  } else {
    appearItems.forEach(item => item.classList.add('is-in-view'));
  }

  // Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
