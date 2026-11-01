/**
 * ================================================================
 *  RETRO 90S GAMING & TOY STORY PORTFOLIO — SCRIPT.JS
 * ================================================================
 * Portofolio Anandita Galuh Sekar Kinanti (AGSK)
 * SMKS Brantas Karangkates Malang — Rekayasa Perangkat Lunak 2026
 * 
 * Features:
 * 1. Cinematic Toy Story Welcome Page (Andy's Cloud Trunk)
 * 2. 2D Interactive Eye-Tracking Character (Vector Face - Zero Emoji)
 * 3. Playable Retro 90s Brick Game Tetris Engine (Canvas LCD Matrix)
 * 4. Interactive CRT DOS Terminal (CLI Commands & Quick Buttons)
 * 5. Game & Watch Multi-Mode Switcher (Buttons И, Б, А, Д)
 * 6. Woody's Pull-String Voice Box (Randomized Dialog)
 * 7. Hamm's Piggy Bank Interactive Coin Collector
 * 8. Toy Story Pizza Planet Claw Random Mission Picker
 * 9. Flying Pizza Planet Rocket on Scroll & Parachuting Army Man
 * 10. 8-Bit Retro Synthesizer (Web Audio API — No External Files)
 * 11. Cartridge 3D Card Physics & Holographic Light Sheen
 * 12. Interactive Dendy Cartridge Eject/Re-seat Mechanical Action
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  RetroAudio.init();
  WelcomeScreen.init();
  HeroEyeTracker.init();
  ProfileData.init();
  ProjectsManager.init();
  Navigation.init();
  ScrollManager.init();
  ScrollObserver.init();
  RetroTvAboutManager.init();
  RetroConsoles.init();
  WoodyVoiceBox.init();
  GameAndWatchModes.init();
  CrtTerminal.init();
  HammPiggy.init();
  ToyClawPicker.init();
  BrickTetrisGame.init();
  ContactForm.init();
  BuzzLaserWrist.init();
  MrPotatoHead.init();
  EtchASketchToy.init();
  RexPeeker.init();
  SlinkyCompanion.init();
  SkillsNotebookManager.init();
  PixoPrompt.init();
});

/* ================================================================
   1.  RETRO 8-BIT AUDIO SYNTHESIZER (WEB AUDIO API)
   ================================================================ */
const RetroAudio = (() => {
  let audioCtx = null;
  let isSoundEnabled = true;

  function init() {
    const saved = localStorage.getItem('retro_sound_pref');
    if (saved !== null) {
      isSoundEnabled = saved === 'true';
    }
    updateUI();

    const toggleBtn = document.getElementById('soundToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('retro_sound_pref', isSoundEnabled);
        updateUI();
        if (isSoundEnabled) {
          playBip(660, 0.08, 'square');
        }
      });
    }

    // Attach gentle retro sound on interactive button/link clicks
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button, .retro-nav-pill, .cartridge-filter-pill, .btn-start-cartridge, .retro-action-pill, .footer-photo-pill');
      if (btn && !btn.closest('#soundToggle') && !btn.closest('#dendyPowerBtn') && !btn.closest('#dendyResetBtn') && !btn.closest('#brickGameConsole') && !btn.closest('#woodyPullString') && !btn.closest('#hammPiggyWidget') && !btn.closest('#btnClawPickRandom')) {
        playBip(587.33, 0.05, 'square');
      }
    });
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) {
        audioCtx = new AudioClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function updateUI() {
    const icon = document.getElementById('soundIcon');
    const text = document.getElementById('soundText');
    const btn  = document.getElementById('soundToggle');
    if (!icon || !btn) return;

    if (isSoundEnabled) {
      icon.className = 'fa-solid fa-volume-high';
      if (text) text.textContent = 'SFX: ON';
      btn.classList.remove('muted');
    } else {
      icon.className = 'fa-solid fa-volume-xmark';
      if (text) text.textContent = 'SFX: OFF';
      btn.classList.add('muted');
    }
  }

  function playBip(freq = 520, duration = 0.06, type = 'square') {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // Classic Famicom / Mario 2-note Coin sound (B5 then E6)
  function playCoin() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.setValueAtTime(0.09, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Mechanical Clack for Cartridge insertion
  function playClack() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Rising Boot/Power Arpeggio
  function playPowerOn() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + (idx * 0.05);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.1);
      });
    } catch (e) {}
  }

  // Pitch Drop Reset sound
  function playResetDrop() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Game & Watch Action Laser Blip
  function playLaser() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // Tetris Line Clear Arpeggio
  function playLineClear() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + (i * 0.05);

        osc.type = 'square';
        osc.frequency.setValueAtTime(f, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.09);
      });
    } catch (e) {}
  }

  // Slinky Dog Bouncy Spring Sound
  function playBoing() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(580, now + 0.12);
      osc.frequency.linearRampToValueAtTime(320, now + 0.22);
      osc.frequency.linearRampToValueAtTime(440, now + 0.32);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  }

  // Rex Squeaky Cartoon Dinosaur Roar
  function playRexRoar() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // Buzz Lightyear Space Laser Blast
  function playLaserBeam() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {}
  }

  // Etch-A-Sketch Powder Erase Static Noise
  function playEtchErase() {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(180, now + 0.08);
      osc.frequency.setValueAtTime(90, now + 0.16);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {}
  }

  // Randy Newman - "You've Got a Friend in Me" (8-bit Synthesizer)
  let themeTimeoutIds = [];
  let isThemePlaying = false;

  function stopToyStoryTheme() {
    themeTimeoutIds.forEach(id => clearTimeout(id));
    themeTimeoutIds = [];
    isThemePlaying = false;
    updateSongButtonUI();
  }

  function toggleToyStoryTheme() {
    if (isThemePlaying) {
      stopToyStoryTheme();
    } else {
      playToyStoryTheme();
    }
  }

  function playToyStoryTheme() {
    if (!isSoundEnabled) return;
    stopToyStoryTheme();
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      isThemePlaying = true;
      updateSongButtonUI();

      const melody = [
        { note: 261.63, dur: 0.25 }, // C4
        { note: 329.63, dur: 0.25 }, // E4
        { note: 392.00, dur: 0.35 }, // G4
        { note: 440.00, dur: 0.20 }, // A4
        { note: 392.00, dur: 0.40 }, // G4
        { note: 329.63, dur: 0.25 }, // E4
        { note: 261.63, dur: 0.50 }, // C4
        { note: 293.66, dur: 0.25 }, // D4
        { note: 329.63, dur: 0.25 }, // E4
        { note: 293.66, dur: 0.35 }, // D4
        { note: 261.63, dur: 0.60 }  // C4
      ];

      let delay = 0;
      melody.forEach(item => {
        const tId = setTimeout(() => {
          if (!isThemePlaying) return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(item.note, now);

          gain.gain.setValueAtTime(0.09, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + item.dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + item.dur);
        }, delay * 1000);

        themeTimeoutIds.push(tId);
        delay += item.dur + 0.08;
      });

      const finishId = setTimeout(() => {
        isThemePlaying = false;
        updateSongButtonUI();
      }, (delay + 0.5) * 1000);
      themeTimeoutIds.push(finishId);

    } catch (e) {
      isThemePlaying = false;
      updateSongButtonUI();
    }
  }

  function updateSongButtonUI() {
    const btn = document.getElementById('btnToyStorySong');
    if (!btn) return;
    const textEl = btn.querySelector('.theme-song-text');
    if (isThemePlaying) {
      btn.classList.add('song-playing');
      if (textEl) textEl.textContent = 'STOP THEME';
    } else {
      btn.classList.remove('song-playing');
      if (textEl) textEl.textContent = 'PLAY THEME';
    }
  }

  return {
    init,
    playBip,
    playCoin,
    playClack,
    playPowerOn,
    playResetDrop,
    playLaser,
    playLineClear,
    playBoing,
    playRexRoar,
    playLaserBeam,
    playEtchErase,
    playToyStoryTheme,
    stopToyStoryTheme,
    toggleToyStoryTheme
  };
})();

/* ================================================================
   2.  WELCOME SCREEN MODAL
   ================================================================ */
const WelcomeScreen = (() => {
  const overlay = document.getElementById('welcomeScreen');
  const btnOpen = document.getElementById('btnOpenToybox');
  const btnSkip = document.getElementById('btnSkipIntro');

  function init() {
    if (!overlay) return;

    if (btnOpen) {
      btnOpen.addEventListener('click', closeWelcome);
    }
    if (btnSkip) {
      btnSkip.addEventListener('click', closeWelcome);
    }

    // Auto dismiss if user scrolls wheel downward
    window.addEventListener('wheel', (e) => {
      if (e.deltaY > 50) closeWelcome();
    }, { once: true, passive: true });
  }

  function closeWelcome() {
    if (!overlay || overlay.classList.contains('closed')) return;
    RetroAudio.playPowerOn();
    overlay.classList.add('closed');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 650);
  }

  return { init };
})();



/* ================================================================
   3. ️ HERO EYE TRACKER (PUPILS FOLLOW CURSOR EVERYWHERE)
   ================================================================ */
const HeroEyeTracker = (() => {
  const pupilLeft = document.getElementById('heroPupilLeft');
  const pupilRight = document.getElementById('heroPupilRight');
  const characterActor = document.getElementById('lcdCharacterActor');

  const MAX_RADIUS = 4.8;
  let isBlinking = false;

  function init() {
    if (!pupilLeft || !pupilRight) return;

    window.addEventListener('mousemove', (e) => {
      trackEyes(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        trackEyes(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      resetEyes();
    });

    scheduleBlink();
  }

  function trackEyes(targetX, targetY) {
    if (isBlinking) return;

    updatePupil(pupilLeft, targetX, targetY);
    updatePupil(pupilRight, targetX, targetY);

    if (characterActor) {
      const rect = characterActor.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;
      const tiltX = Math.max(-10, Math.min(10, (charCenterY - targetY) * 0.018));
      const tiltY = Math.max(-12, Math.min(12, (targetX - charCenterX) * 0.022));
      characterActor.style.transform = `perspective(240px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  }

  function updatePupil(pupilEl, targetX, targetY) {
    if (!pupilEl || !pupilEl.parentElement) return;

    const eyeRect = pupilEl.parentElement.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const dx = targetX - eyeCenterX;
    const dy = targetY - eyeCenterY;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      pupilEl.style.transform = 'translate(0px, 0px)';
      return;
    }

    const angle = Math.atan2(dy, dx);
    const travel = Math.min(MAX_RADIUS, (distance / 160) * MAX_RADIUS);

    const offsetX = Math.cos(angle) * travel;
    const offsetY = Math.sin(angle) * travel;

    pupilEl.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`;
  }

  function resetEyes() {
    if (pupilLeft) pupilLeft.style.transform = 'translate(0px, 0px)';
    if (pupilRight) pupilRight.style.transform = 'translate(0px, 0px)';
    if (characterActor) characterActor.style.transform = 'perspective(240px) rotateX(0deg) rotateY(0deg)';
  }

  function scheduleBlink() {
    const delay = 3500 + Math.random() * 3000;
    setTimeout(() => {
      blink();
      scheduleBlink();
    }, delay);
  }

  function blink() {
    if (!pupilLeft || !pupilRight) return;
    isBlinking = true;

    const eyes = document.querySelectorAll('.char-eye');
    eyes.forEach(eye => {
      eye.style.transition = 'transform 0.08s ease-in-out';
      eye.style.transform = 'scaleY(0.12)';
    });

    setTimeout(() => {
      eyes.forEach(eye => {
        eye.style.transform = 'scaleY(1)';
      });
      setTimeout(() => {
        isBlinking = false;
        eyes.forEach(eye => {
          eye.style.transition = '';
        });
      }, 90);
    }, 130);
  }

  return { init };
})();



/* ================================================================
   4.  PROFILE DATA BINDER
   ================================================================ */
const ProfileData = (() => {
  function init() {
    if (typeof CONFIG_PROFILE === 'undefined') return;

    const map = {
      'detail-location': CONFIG_PROFILE.location,
      'detail-education': CONFIG_PROFILE.education,
      'detail-focus': CONFIG_PROFILE.focus,
      'detail-languages': CONFIG_PROFILE.languages
    };

    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    });

    const cvLink = document.getElementById('cv-link');
    if (cvLink && CONFIG_PROFILE.cvLink) {
      cvLink.setAttribute('href', CONFIG_PROFILE.cvLink);
    }

    if (typeof CONFIG_SOCIAL !== 'undefined') {
      const s = CONFIG_SOCIAL;
      const sMap = {
        'social-email': { href: `mailto:${s.email}`, textId: 'contact-email-val', val: s.email },
        'social-instagram': { href: s.instagram, textId: 'contact-instagram-val', val: '@ananditagaluh' },
        'social-github': { href: s.github, textId: 'contact-github-val', val: 'ananditaaa2010-a11y' },
        'social-linkedin': { href: s.linkedin, textId: 'contact-linkedin-val', val: 'Anandita Galuh Sekar Kinanti' }
      };

      Object.entries(sMap).forEach(([anchorId, data]) => {
        const anchor = document.getElementById(anchorId);
        if (anchor && data.href) {
          anchor.setAttribute('href', data.href);
        }
        const textEl = document.getElementById(data.textId);
        if (textEl && data.val) {
          textEl.textContent = data.val;
        }
      });
    }
  }

  return { init };
})();



/* ================================================================
   5. PINNED HORIZONTAL SCROLL PROJECTS SHOWCASE
   ================================================================ */
const ProjectsManager = (() => {
  const section = document.getElementById('projects');
  const stickyFrame = document.getElementById('projectsStickyFrame');
  const viewport = document.getElementById('projectsTrackViewport');
  const track = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.cartridge-filter-pill');
  const btnPrev = document.getElementById('btnProjectPrev');
  const btnNext = document.getElementById('btnProjectNext');
  const activeIndexEl = document.getElementById('projectActiveIndex');
  const totalCountEl = document.getElementById('projectTotalCount');
  const progressBarFill = document.getElementById('projectTrackProgressFill');
  const rexBubbleNum = document.getElementById('rexCurrentCard');

  let currentFilter = 'all';
  let targetX = 0;
  let currentX = 0;
  let activeIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function init() {
    if (!section || !track || !viewport) return;

    setupCards();
    setupFilters();
    setupNavigationButtons();
    setupKeyboardNavigation();
    setupTouchGestures();
    setupCardClicks();

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', onWindowResize, { passive: true });

    updateCounts();
    requestAnimationFrame(renderLoop);
  }

  function getVisibleCards() {
    return Array.from(track.querySelectorAll('.project-card')).filter(card => {
      return card.style.display !== 'none';
    });
  }

  function setupCards() {
    const cards = track.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'group');
      card.setAttribute('aria-label', 'Proyek ' + (index + 1) + ' dari ' + cards.length);
    });
  }

  function setupFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        setFilter(filter, btn);
      });
    });
  }

  function setFilter(filter, activeBtn) {
    currentFilter = filter;
    filterBtns.forEach(b => b.classList.toggle('active', b === activeBtn));

    const cards = track.querySelectorAll('.project-card');
    cards.forEach(card => {
      const cat = (card.getAttribute('data-category') || '').toLowerCase();
      const match = filter === 'all' || cat === filter.toLowerCase();
      card.style.display = match ? '' : 'none';
    });

    targetX = 0;
    currentX = 0;
    activeIndex = 0;
    updateCounts();
  }

  function setupNavigationButtons() {
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        RetroAudio.playBip();
        prevCard();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        RetroAudio.playBip();
        nextCard();
      });
    }
  }

  function prevCard() {
    goToIndex(activeIndex - 1);
  }

  function nextCard() {
    goToIndex(activeIndex + 1);
  }

  function goToIndex(idx) {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;

    activeIndex = Math.max(0, Math.min(idx, visibleCards.length - 1));

    const card = visibleCards[activeIndex];
    const cardRect = card.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    const targetOffset = (card.offsetLeft) - (viewportRect.width / 2) + (cardRect.width / 2);
    const maxScroll = Math.max(0, track.scrollWidth - viewportRect.width);

    targetX = Math.max(0, Math.min(targetOffset, maxScroll));
    updateCounts();
  }

  function setupKeyboardNavigation() {
    section.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      }
    });
  }

  function setupTouchGestures() {
    viewport.addEventListener('touchstart', (e) => {
      if (!e.touches.length) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!e.changedTouches.length) return;
      const diffX = touchStartX - e.changedTouches[0].clientX;
      const diffY = touchStartY - e.changedTouches[0].clientY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
    }, { passive: true });
  }

  function setupCardClicks() {
    const cards = track.querySelectorAll('.project-card');
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        goToIndex(idx);
      });
    });
  }

  function onWindowScroll() {
    if (!section || !viewport) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollDistance = sectionHeight - windowHeight;
    if (scrollDistance <= 0) return;

    const scrolled = -rect.top;
    if (scrolled >= 0 && scrolled <= scrollDistance) {
      const progress = scrolled / scrollDistance;
      const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      targetX = progress * maxScroll;
      calculateActiveCardFromScroll();
    }
  }

  function onWindowResize() {
    onWindowScroll();
    updateCounts();
  }

  function calculateActiveCardFromScroll() {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;

    const viewportCenter = currentX + (viewport.clientWidth / 2);
    let closestIdx = 0;
    let closestDist = Infinity;

    visibleCards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const dist = Math.abs(viewportCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    if (activeIndex !== closestIdx) {
      activeIndex = closestIdx;
      updateCounts();
    }
  }

  function renderLoop() {
    currentX += (targetX - currentX) * 0.12;

    track.style.transform = 'translate3d(' + (-currentX.toFixed(2)) + 'px, 0, 0)';

    const visibleCards = getVisibleCards();
    const viewportCenter = currentX + (viewport.clientWidth / 2);

    visibleCards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const dist = Math.abs(viewportCenter - cardCenter);
      const maxDist = viewport.clientWidth * 0.6;

      const normDist = Math.min(dist / maxDist, 1);
      const scale = 1.03 - (normDist * 0.05);
      const opacity = 1 - (normDist * 0.25);

      card.style.transform = 'scale(' + scale.toFixed(3) + ')';
      card.style.opacity = opacity.toFixed(3);

      if (idx === activeIndex) {
        card.classList.add('active-card');
      } else {
        card.classList.remove('active-card');
      }
    });

    requestAnimationFrame(renderLoop);
  }

  function updateCounts() {
    const visibleCards = getVisibleCards();
    const total = visibleCards.length;
    const current = Math.min(activeIndex + 1, total);

    if (activeIndexEl) activeIndexEl.textContent = String(current).padStart(2, '0');
    if (totalCountEl) totalCountEl.textContent = String(total).padStart(2, '0');
    if (rexBubbleNum) rexBubbleNum.textContent = String(current);

    if (progressBarFill && total > 1) {
      const pct = (activeIndex / (total - 1)) * 100;
      progressBarFill.style.width = pct.toFixed(1) + '%';
    }
  }

  return {
    init,
    prevCard,
    nextCard,
    goToIndex,
    setFilter
  };
})();

/* ================================================================
   6.  SCROLL PROGRESS BAR, ZONE TELEMETRY, ROCKET & PARATROOPER
   ================================================================ */
const ScrollManager = (() => {
  const progressBar = document.getElementById('scrollProgress');
  const rocket = document.getElementById('scrollRocket');
  const paratrooper = document.getElementById('scrollParatrooper');
  const zoneLabel = document.getElementById('zoneLabel');
  const stickers = document.querySelectorAll('.floating-sticker[data-speed]');
  const sections = document.querySelectorAll('section[id]');
  let lastScroll = 0;

  const zoneNames = {
    'home': 'ZONE 1: BERANDA',
    'about': 'ZONE 2: TENTANG',
    'skills': 'ZONE 3: KEAHLIAN',
    'projects': 'ZONE 4: GALERI PROYEK',
    'contact': 'ZONE 5: KONTAK'
  };

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // 1. Update Scroll Bar & Flying Rocket
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    if (rocket) {
      const tilt = Math.min(15, Math.max(-15, (scrollTop - lastScroll) * 0.35));
      rocket.style.transform = `rotate(${tilt.toFixed(1)}deg)`;
    }

    // 2. Paratrooper Glide on Scroll
    if (paratrooper) {
      const glideOffset = (scrollTop * 0.14) % (window.innerHeight - 180);
      paratrooper.style.transform = `translateY(${glideOffset.toFixed(1)}px)`;
    }
    lastScroll = scrollTop;

    // 3. Parallax Drift on Floating Badges
    stickers.forEach(sticker => {
      const speed = parseFloat(sticker.getAttribute('data-speed') || '0.2');
      const offset = (scrollTop * speed) % 80;
      sticker.style.transform = `translateY(${offset.toFixed(1)}px)`;
    });

    // 4. Active Zone Label
    const scrollPos = scrollTop + 220;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        if (zoneLabel && zoneNames[id]) {
          zoneLabel.textContent = zoneNames[id];
        }
      }
    });
  }

  return { init };
})();



/* ================================================================
   7.  PLAYABLE BRICK GAME TETRIS ENGINE (CANVAS LCD)
   ================================================================ */
const BrickTetrisGame = (() => {
  const canvas = document.getElementById('brickGameCanvas');
  const nextCanvas = document.getElementById('tetrisNextCanvas');
  const overlay = document.getElementById('tetrisOverlay');
  const overlayTitle = document.querySelector('#tetrisOverlayMsg .overlay-title');
  const overlaySub = document.querySelector('#tetrisOverlayMsg .overlay-sub');

  const scoreEl = document.getElementById('tetrisScore');
  const linesEl = document.getElementById('tetrisLines');
  const levelEl = document.getElementById('tetrisLevel');
  const statusEl = document.getElementById('tetrisStatus');

  const btnStart = document.getElementById('btnGameStart');
  const btnReset = document.getElementById('btnGameReset');
  const btnLeft = document.getElementById('btnGameLeft');
  const btnRight = document.getElementById('btnGameRight');
  const btnDown = document.getElementById('btnGameDown');
  const btnRotate = document.getElementById('btnGameRotate');
  const soundBtn = document.getElementById('brickSoundBtn');

  if (!canvas) return { init: () => {} };

  const ctx = canvas.getContext('2d');
  const nextCtx = nextCanvas ? nextCanvas.getContext('2d') : null;

  const COLS = 10;
  const ROWS = 20;
  const BLOCK_W = canvas.width / COLS;
  const BLOCK_H = canvas.height / ROWS;

  const SHAPES = [
    [[1, 1, 1, 1]],                    // I
    [[1, 1], [1, 1]],                  // O
    [[0, 1, 0], [1, 1, 1]],            // T
    [[1, 0, 0], [1, 1, 1]],            // J
    [[0, 0, 1], [1, 1, 1]],            // L
    [[0, 1, 1], [1, 1, 0]],            // S
    [[1, 1, 0], [0, 1, 1]]             // Z
  ];

  let grid = createGrid();
  let currentPiece = null;
  let nextPiece = null;
  let score = 0;
  let lines = 0;
  let level = 1;
  let isPlaying = false;
  let isPaused = false;
  let isGameOver = false;
  let dropCounter = 0;
  let dropInterval = 800;
  let lastTime = 0;
  let animId = null;
  let gameSound = true;

  function init() {
    renderEmptyLCD();
    bindControls();
  }

  function createGrid() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  function randomPiece() {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
      shape,
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0
    };
  }

  function bindControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Space', 'KeyA', 'KeyD', 'KeyS', 'KeyW', 'KeyP'];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
          e.preventDefault();
        }
      }

      if (e.key === 'p' || e.key === 'P') {
        togglePause();
        return;
      }

      if (!isPlaying || isPaused || isGameOver) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        drop();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'Space') {
        rotatePiece();
      }
    });

    if (btnLeft)   btnLeft.addEventListener('click', () => { if (isPlaying && !isPaused) moveLeft(); });
    if (btnRight)  btnRight.addEventListener('click', () => { if (isPlaying && !isPaused) moveRight(); });
    if (btnDown)   btnDown.addEventListener('click', () => { if (isPlaying && !isPaused) drop(); });
    if (btnRotate) btnRotate.addEventListener('click', () => {
      if (!isPlaying || isGameOver) {
        startGame();
      } else if (!isPaused) {
        rotatePiece();
      }
    });

    if (btnStart) btnStart.addEventListener('click', () => {
      if (!isPlaying || isGameOver) {
        startGame();
      } else {
        togglePause();
      }
    });

    if (btnReset) btnReset.addEventListener('click', () => {
      resetGame();
    });

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        gameSound = !gameSound;
        const icon = document.getElementById('brickSoundIcon');
        if (icon) icon.className = gameSound ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        if (!isPlaying || isGameOver) startGame();
        else if (isPaused) togglePause();
      });
    }
  }

  function startGame() {
    grid = createGrid();
    score = 0;
    lines = 0;
    level = 1;
    dropInterval = 800;
    isGameOver = false;
    isPaused = false;
    isPlaying = true;

    currentPiece = randomPiece();
    nextPiece = randomPiece();

    updateTelemetry();
    drawNext();

    if (overlay) overlay.classList.add('hidden');
    if (statusEl) {
      statusEl.textContent = 'PLAY';
      statusEl.style.color = '#15803d';
    }

    if (gameSound) RetroAudio.playPowerOn();

    cancelAnimationFrame(animId);
    lastTime = performance.now();
    gameLoop(lastTime);
  }

  function togglePause() {
    if (!isPlaying || isGameOver) return;
    isPaused = !isPaused;

    if (isPaused) {
      if (overlay) overlay.classList.remove('hidden');
      if (overlayTitle) overlayTitle.textContent = 'PAUSED';
      if (overlaySub) overlaySub.textContent = 'KLIK START UNTUK LANJUT';
      if (statusEl) {
        statusEl.textContent = 'PAUSE';
        statusEl.style.color = '#ca8a04';
      }
    } else {
      if (overlay) overlay.classList.add('hidden');
      if (statusEl) {
        statusEl.textContent = 'PLAY';
        statusEl.style.color = '#15803d';
      }
      lastTime = performance.now();
      gameLoop(lastTime);
    }
  }

  function resetGame() {
    cancelAnimationFrame(animId);
    grid = createGrid();
    score = 0;
    lines = 0;
    level = 1;
    isPlaying = false;
    isPaused = false;
    isGameOver = false;

    updateTelemetry();
    renderEmptyLCD();
    if (nextCtx) nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

    if (overlay) overlay.classList.remove('hidden');
    if (overlayTitle) overlayTitle.textContent = 'TETRIS 90s';
    if (overlaySub) overlaySub.textContent = 'TEKAN START / ROTATE';
    if (statusEl) {
      statusEl.textContent = 'READY';
      statusEl.style.color = 'var(--dendy-red)';
    }

    if (gameSound) RetroAudio.playResetDrop();
  }

  function moveLeft() {
    currentPiece.x--;
    if (collide()) currentPiece.x++;
    else if (gameSound) RetroAudio.playBip(440, 0.04);
    draw();
  }

  function moveRight() {
    currentPiece.x++;
    if (collide()) currentPiece.x--;
    else if (gameSound) RetroAudio.playBip(440, 0.04);
    draw();
  }

  function drop() {
    currentPiece.y++;
    if (collide()) {
      currentPiece.y--;
      merge();
      clearLines();
      currentPiece = nextPiece;
      nextPiece = randomPiece();
      drawNext();

      if (collide()) {
        gameOver();
        return;
      }
    } else {
      score += 1;
      updateTelemetry();
    }
    dropCounter = 0;
    draw();
  }

  function rotatePiece() {
    const s = currentPiece.shape;
    const rotated = s[0].map((_, index) => s.map(row => row[index]).reverse());
    const oldShape = currentPiece.shape;
    currentPiece.shape = rotated;

    if (collide()) {
      currentPiece.x++;
      if (collide()) {
        currentPiece.x -= 2;
        if (collide()) {
          currentPiece.x++;
          currentPiece.shape = oldShape;
          return;
        }
      }
    }

    if (gameSound) RetroAudio.playBip(784, 0.05);
    draw();
  }

  function collide() {
    const m = currentPiece.shape;
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[r].length; c++) {
        if (m[r][c] !== 0) {
          const newX = currentPiece.x + c;
          const newY = currentPiece.y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && grid[newY][newX] !== 0) return true;
        }
      }
    }
    return false;
  }

  function merge() {
    const m = currentPiece.shape;
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[r].length; c++) {
        if (m[r][c] !== 0) {
          const y = currentPiece.y + r;
          const x = currentPiece.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            grid[y][x] = 1;
          }
        }
      }
    }
  }

  function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (grid[r].every(val => val !== 0)) {
        grid.splice(r, 1);
        grid.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }

    if (cleared > 0) {
      lines += cleared;
      score += [0, 100, 300, 500, 800][cleared] * level;
      level = Math.floor(lines / 10) + 1;
      dropInterval = Math.max(120, 800 - (level - 1) * 70);

      updateTelemetry();
      if (gameSound) RetroAudio.playLineClear();
    }
  }

  function gameOver() {
    isPlaying = false;
    isGameOver = true;
    cancelAnimationFrame(animId);

    if (overlay) overlay.classList.remove('hidden');
    if (overlayTitle) overlayTitle.textContent = 'GAME OVER';
    if (overlaySub) overlaySub.textContent = `SCORE: ${score} - TEKAN ROTATE`;
    if (statusEl) {
      statusEl.textContent = 'DEAD';
      statusEl.style.color = 'var(--dendy-red)';
    }

    if (gameSound) RetroAudio.playResetDrop();
  }

  function gameLoop(time = 0) {
    if (!isPlaying || isPaused) return;

    const delta = time - lastTime;
    lastTime = time;
    dropCounter += delta;

    if (dropCounter > dropInterval) {
      drop();
    }

    draw();
    animId = requestAnimationFrame(gameLoop);
  }

  function draw() {
    ctx.fillStyle = '#87926b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        drawLCDBlock(ctx, c * BLOCK_W, r * BLOCK_H, BLOCK_W, BLOCK_H, grid[r][c] === 1);
      }
    }

    if (currentPiece) {
      const m = currentPiece.shape;
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[r].length; c++) {
          if (m[r][c] !== 0) {
            const x = (currentPiece.x + c) * BLOCK_W;
            const y = (currentPiece.y + r) * BLOCK_H;
            if (y >= 0) {
              drawLCDBlock(ctx, x, y, BLOCK_W, BLOCK_H, true);
            }
          }
        }
      }
    }
  }

  function drawLCDBlock(targetCtx, x, y, w, h, isFilled) {
    if (isFilled) {
      targetCtx.fillStyle = '#242c23';
      targetCtx.fillRect(x + 1, y + 1, w - 2, h - 2);

      targetCtx.fillStyle = '#87926b';
      targetCtx.fillRect(x + 3, y + 3, w - 6, h - 6);

      targetCtx.fillStyle = '#1c221b';
      targetCtx.fillRect(x + 4.5, y + 4.5, w - 9, h - 9);
    } else {
      targetCtx.fillStyle = 'rgba(36, 44, 35, 0.08)';
      targetCtx.fillRect(x + 1, y + 1, w - 2, h - 2);
    }
  }

  function drawNext() {
    if (!nextCtx || !nextPiece) return;

    nextCtx.fillStyle = '#87926b';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    const m = nextPiece.shape;
    const cellW = 10;
    const cellH = 10;
    const offsetX = (nextCanvas.width - m[0].length * cellW) / 2;
    const offsetY = (nextCanvas.height - m.length * cellH) / 2;

    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[r].length; c++) {
        if (m[r][c] !== 0) {
          drawLCDBlock(nextCtx, offsetX + c * cellW, offsetY + r * cellH, cellW, cellH, true);
        }
      }
    }
  }

  function renderEmptyLCD() {
    ctx.fillStyle = '#87926b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        drawLCDBlock(ctx, c * BLOCK_W, r * BLOCK_H, BLOCK_W, BLOCK_H, false);
      }
    }
  }

  function updateTelemetry() {
    if (scoreEl) scoreEl.textContent = String(score).padStart(5, '0');
    if (linesEl) linesEl.textContent = String(lines).padStart(2, '0');
    if (levelEl) levelEl.textContent = String(level).padStart(2, '0');
  }

  return { init };
})();



/* ================================================================
   8.  NAVIGATION, SCROLLSPY & MOBILE MENU
   ================================================================ */
const Navigation = (() => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navContainer = document.querySelector('.nav-pills-container');
  const navLinks = document.querySelectorAll('.retro-nav-pill[data-section]');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');

  function init() {
    if (navToggle && navContainer) {
      navToggle.addEventListener('click', () => {
        const isOpen = navContainer.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        RetroAudio.playBip(600, 0.05);
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navContainer.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', false);
        });
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navOffset = navbar ? navbar.offsetHeight + 16 : 80;
          let targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

          // If navigating to skills, scroll directly into the open stay zone
          if (target.id === 'skills') {
            const scrollDistance = target.offsetHeight - window.innerHeight;
            if (scrollDistance > 0) {
              targetPos = target.getBoundingClientRect().top + window.pageYOffset + (scrollDistance * 0.45);
            }
          }

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });

    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
        updateScrollSpy();
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        RetroAudio.playCoin();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  return { init };
})();



/* ================================================================
   9.  INTERACTIVE CONSOLE CONTROLS & CARTRIDGE BOUNCE
   ================================================================ */
const RetroConsoles = (() => {
  function init() {
    const powerBtn = document.getElementById('dendyPowerBtn');
    const resetBtn = document.getElementById('dendyResetBtn');
    const cartridgeSlot = document.getElementById('dendyInsertedCartridge');

    if (cartridgeSlot) {
      cartridgeSlot.addEventListener('click', () => {
        RetroAudio.playClack();
        cartridgeSlot.classList.add('cartridge-ejected');
        setTimeout(() => {
          RetroAudio.playPowerOn();
          cartridgeSlot.classList.remove('cartridge-ejected');
        }, 320);
      });
    }

    if (powerBtn) {
      powerBtn.addEventListener('click', () => {
        RetroAudio.playPowerOn();
        powerBtn.style.transform = 'scale(0.92)';
        setTimeout(() => { powerBtn.style.transform = ''; }, 120);

        const lcd = document.querySelector('.companion-lcd-screen');
        if (lcd) {
          lcd.style.filter = 'brightness(1.5)';
          setTimeout(() => { lcd.style.filter = ''; }, 200);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        RetroAudio.playResetDrop();
        resetBtn.style.transform = 'scale(0.92)';
        setTimeout(() => { resetBtn.style.transform = ''; }, 120);
        ProjectsManager.resetFilter();
      });
    }

    document.querySelectorAll('.comp-round-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        RetroAudio.playLaser();
        btn.style.transform = 'scale(0.88)';
        setTimeout(() => { btn.style.transform = ''; }, 100);
      });
    });
  }

  return { init };
})();



/* ================================================================
   10.  WOODY'S PULL-STRING VOICE BOX (INTERACTIVE TOY FEATURE)
   ================================================================ */
const WoodyVoiceBox = (() => {
  const ring = document.getElementById('pullStringRing');
  const cord = document.getElementById('pullStringCord');
  const bubble = document.getElementById('pullStringBubble');

  const QUOTES = [
    "« Halo, Partner! Selamat datang di markas web Anandita! »",
    "« Menuju tak terbatas... dan melampauinya!  »",
    "« Ada kode yang rapi di setiap proyek ini! »",
    "« Kau punya teman sejati di dalam diriku! »",
    "« Siap menjelajahi karya koding Galuh, Sheriff? »",
    "« Bersiaplah meluncur ke petualangan digital berikutnya! »"
  ];
  let quoteIdx = 0;

  function init() {
    if (!ring) return;

    ring.addEventListener('click', pullString);
  }

  function pullString() {
    RetroAudio.playClack();
    if (cord) cord.style.height = '48px';
    if (ring) ring.style.transform = 'translateY(16px)';

    setTimeout(() => {
      RetroAudio.playLaser();
      if (cord) cord.style.height = '28px';
      if (ring) ring.style.transform = 'translateY(0)';

      quoteIdx = (quoteIdx + 1) % QUOTES.length;
      if (bubble) {
        bubble.textContent = QUOTES[quoteIdx];
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = 'speechPop 0.3s ease';
      }
    }, 180);
  }

  return { init };
})();



/* ================================================================
   11.  GAME & WATCH MULTI-MODE LCD SWITCHER (BUTTONS И, Б, А, Д)
   ================================================================ */
const GameAndWatchModes = (() => {
  const btns = [
    document.getElementById('btnGwInfo'),
    document.getElementById('btnGwBio'),
    document.getElementById('btnGwSkills'),
    document.getElementById('btnGwCv')
  ];
  const panels = {
    info: document.getElementById('gwPanelInfo'),
    bio: document.getElementById('gwPanelBio'),
    skills: document.getElementById('gwPanelSkills'),
    cv: document.getElementById('gwPanelCv')
  };
  const badge = document.getElementById('gwModeBadge');

  const titles = {
    info: 'MODE: FOTO PROFIL',
    bio: 'MODE: BIODATA SEKOLAH',
    skills: 'MODE: SPESIALISASI',
    cv: 'MODE: LEMBAR CV'
  };

  function init() {
    btns.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        switchMode(mode);
      });
    });
  }

  function switchMode(mode) {
    if (!panels[mode]) return;
    RetroAudio.playBip(680, 0.06);

    btns.forEach(b => {
      if (b) b.classList.toggle('active', b.getAttribute('data-mode') === mode);
    });

    Object.entries(panels).forEach(([key, panel]) => {
      if (panel) panel.classList.toggle('active', key === mode);
    });

    if (badge && titles[mode]) {
      badge.textContent = titles[mode];
    }
  }

  return { init };
})();



/* ================================================================
   12.  INTERACTIVE CRT DOS TERMINAL CLI
   ================================================================ */
const CrtTerminal = (() => {
  const output = document.getElementById('crtOutput');
  const input = document.getElementById('crtCliInput');
  const sendBtn = document.getElementById('crtCliSend');
  const headerFile = document.getElementById('crtHeaderFile');
  const cmdBtns = document.querySelectorAll('.crt-cmd-btn');
  const led = document.getElementById('floppyLed');

  const COMMANDS = {
    skills: `
      <div class="crt-skill-item"><span class="crt-tag">&gt; HTML5 / CSS3</span><span class="crt-bar">[█████████░] 92%</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; JAVASCRIPT</span><span class="crt-bar">[████████░░] 85%</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; PHP SERVER</span><span class="crt-bar">[███████░░░] 78%</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; FIGMA UI/UX</span><span class="crt-bar">[█████████░] 90%</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; PYTHON LOGIC</span><span class="crt-bar">[████████░░] 82%</span></div>
    `,
    tools: `
      <div class="crt-skill-item"><span class="crt-tag">&gt; FIGMA PROTOTYPE</span><span class="crt-bar">[TERPASANG]</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; VS CODE STUDIO</span><span class="crt-bar">[AKTIF]</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; GIT &amp; GITHUB CLI</span><span class="crt-bar">[CONNECTED]</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; PYTHON RUNTIME</span><span class="crt-bar">[v3.11 READY]</span></div>
    `,
    bio: `
      <div class="crt-skill-item"><span class="crt-tag">&gt; NAMA:</span><span class="crt-bar">Anandita Galuh S.K.</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; KELAS:</span><span class="crt-bar">SMKS Brantas RPL '26</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; LOKASI:</span><span class="crt-bar">Malang, Jawa Timur</span></div>
      <div class="crt-skill-item"><span class="crt-tag">&gt; STATUS:</span><span class="crt-bar">Siap Berpetualang!</span></div>
    `,
    toystory: `
      <div style="color: #fde047; font-size: 0.72rem; line-height: 1.5;">
        &gt; STAR COMMAND RECON // ANDY'S ROOM<br>
        &gt; "Menuju tak terbatas... dan melampauinya!"<br>
        &gt; Sheriff Anandita menjaga setiap baris kode dengan presisi!<br>
        &gt; YOU'VE GOT A FRIEND IN ME! 
      </div>
    `,
    help: `
      <div style="color: #a7f3d0; font-size: 0.68rem; line-height: 1.4;">
        PERINTAH TERSEDIA:<br>
        &bull; <strong>skills</strong> — Tampilkan keahlian koding<br>
        &bull; <strong>tools</strong> — Daftar perangkat &amp; software<br>
        &bull; <strong>bio</strong> — Ringkasan profil siswa<br>
        &bull; <strong>toystory</strong> — Pesan rahasia Toy Story<br>
        &bull; <strong>clear / cls</strong> — Bersihkan layar terminal
      </div>
    `
  };

  function init() {
    if (!output) return;

    cmdBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        cmdBtns.forEach(b => b.classList.toggle('active', b === btn));
        executeCommand(cmd);
      });
    });

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          handleInput();
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', handleInput);
    }
  }

  function handleInput() {
    if (!input) return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;
    executeCommand(cmd);
  }

  function executeCommand(cmd) {
    if (!output) return;
    RetroAudio.playBip(520, 0.05);

    if (led) {
      led.style.background = '#ef4444';
      setTimeout(() => { led.style.background = '#22c55e'; }, 250);
    }

    if (headerFile) {
      headerFile.textContent = `C:\\DOS\\${cmd.toUpperCase()}.EXE`;
    }

    if (cmd === 'clear' || cmd === 'cls') {
      output.innerHTML = '<div style="color: #6ee7b7; font-size: 0.7rem;">&gt; Layar dibersihkan. Ketik "help" untuk bantuan.</div>';
      return;
    }

    if (COMMANDS[cmd]) {
      output.innerHTML = COMMANDS[cmd];
    } else {
      output.innerHTML = `
        <div style="color: #f87171; font-size: 0.7rem; line-height: 1.4;">
          Perintah "${escapeHtml(cmd)}" tidak dikenal.<br>
          Ketik <strong>help</strong> untuk melihat daftar perintah.
        </div>
      `;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return { init };
})();



/* ================================================================
   13.  HAMM'S PIGGY BANK COIN COLLECTOR (INTERACTIVE TOY FEATURE)
   ================================================================ */
const HammPiggy = (() => {
  const widget = document.getElementById('hammPiggyWidget');
  const countEl = document.getElementById('hammCoinCount');
  let coins = 0;

  function init() {
    if (!widget) return;
    const saved = localStorage.getItem('hamm_coins');
    if (saved) {
      coins = parseInt(saved, 10) || 0;
      if (countEl) countEl.textContent = coins;
    }

    widget.addEventListener('click', dropCoin);
  }

  function dropCoin() {
    coins++;
    if (countEl) countEl.textContent = coins;
    localStorage.setItem('hamm_coins', coins);

    RetroAudio.playCoin();

    widget.style.transform = 'scale(0.92)';
    setTimeout(() => { widget.style.transform = ''; }, 140);
  }

  return { init };
})();



/* ================================================================
   14. TOY STORY PIZZA PLANET CLAW RANDOM PICKER
   ================================================================ */
const ToyClawPicker = (() => {
  const btn = document.getElementById('btnClawPickRandom');

  function init() {
    if (!btn) return;
    btn.addEventListener('click', pickRandom);
  }

  function pickRandom() {
    const cards = Array.from(document.querySelectorAll('#projectsGrid .project-card')).filter(c => c.style.display !== 'none');
    if (!cards.length) return;

    RetroAudio.playLaser();

    btn.style.transform = 'translateY(3px) scale(0.96)';
    setTimeout(() => { btn.style.transform = ''; }, 200);

    const randomIdx = Math.floor(Math.random() * cards.length);

    setTimeout(() => {
      RetroAudio.playCoin();
      if (typeof ProjectsManager !== 'undefined' && ProjectsManager.goToIndex) {
        ProjectsManager.goToIndex(randomIdx);
      }

      const randomCard = cards[randomIdx];
      if (randomCard) {
        randomCard.style.borderColor = '#ef4444';
        setTimeout(() => {
          randomCard.style.borderColor = '';
        }, 1200);
      }
    }, 250);
  }

  return { init };
})();



/* ================================================================
   15. ️ RETRO MEMO DISPATCH CONTACT FORM
   ================================================================ */
const ContactForm = (() => {
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');

  function init() {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');

      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        RetroAudio.playResetDrop();
        alert('Harap isi nama, email, dan pesan kamu!');
        return;
      }

      RetroAudio.playCoin();
      if (successBox) {
        successBox.classList.add('show');
        setTimeout(() => {
          successBox.classList.remove('show');
        }, 5000);
      }

      form.reset();
    });
  }

  return { init };
})();



/* ================================================================
   16.  INTERSECTION OBSERVER REVEAL ANIMATIONS
   ================================================================ */
const ScrollObserver = (() => {
  let observer = null;

  function init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible', 'active');
      });
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    observeReveals();

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible', 'active');
      });
    }, 800);
  }

  function observeReveals() {
    if (!observer) return;
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }

  return { init, observeReveals };
})();

/* ================================================================
   17.  BUZZ LIGHTYEAR ARM LASER & FLIP WRIST COMMUNICATOR
   ================================================================ */
const BuzzLaserWrist = (() => {
  const laserBtn = document.getElementById('btnBuzzLaser');
  const laserPulse = document.getElementById('laserBeamPulse');
  const laserStatus = document.getElementById('buzzLaserStatus');
  const flipCover = document.getElementById('buzzFlipCover');
  const commMessage = document.getElementById('buzzCommMessage');

  const commQuotes = [
    "« Star Command: Menuju tak terbatas dan melampauinya! Portofolio Anandita siap dijelajahi! »",
    "« Laporan Misi: Sistem navigasi torn paper beroperasi 100%! »",
    "« Komandan Anandita: Kodingan bersih tanpa celah! Meluncur! »",
    "« Peringatan: Tingkat estetika retro 90s mencapai kapasitas maksimal! »"
  ];
  let quoteIdx = 0;

  function init() {
    if (laserBtn) {
      laserBtn.addEventListener('click', fireLaser);
    }
    if (flipCover) {
      flipCover.addEventListener('click', cycleCommMessage);
    }
  }

  function fireLaser() {
    RetroAudio.playLaserBeam();
    if (laserStatus) {
      laserStatus.textContent = 'PEW-PEW!';
      laserStatus.style.background = '#dc2626';
    }
    if (laserPulse) {
      laserPulse.classList.remove('firing');
      void laserPulse.offsetWidth;
      laserPulse.classList.add('firing');
    }
    setTimeout(() => {
      if (laserStatus) {
        laserStatus.textContent = 'READY';
        laserStatus.style.background = '#1a1a1a';
      }
    }, 450);
  }

  function cycleCommMessage() {
    RetroAudio.playBip(880, 0.05, 'square');
    quoteIdx = (quoteIdx + 1) % commQuotes.length;
    if (commMessage) {
      commMessage.textContent = commQuotes[quoteIdx];
    }
  }

  return { init };
})();



/* ================================================================
   18.  MR. POTATO HEAD INTERCHANGEABLE FEATURES BADGE
   ================================================================ */
const MrPotatoHead = (() => {
  const mustache = document.getElementById('potatoMustache');
  const hat = document.getElementById('potatoHat');
  const btnSwap = document.getElementById('btnSwapPotato');
  const quote = document.getElementById('potatoQuote');

  const mustacheStyles = ['mustache-classic', 'mustache-curly', 'mustache-smile'];
  let currentStyleIdx = 0;

  const quotes = [
    "« Komponen modular seperti UI/UX! »",
    "« Jangan lupa pasang kumisku lagi ya! »",
    "« Desain yang rapi itu seperti wajah yang pas bagian-bagiannya! »",
    "« Tuh kan, kumis baruku kelihatan lebih vintage 90-an! »"
  ];
  let quoteIdx = 0;

  function init() {
    if (mustache) {
      mustache.addEventListener('click', swapMustache);
    }
    if (btnSwap) {
      btnSwap.addEventListener('click', swapMustache);
    }
    if (hat) {
      hat.addEventListener('click', tipHat);
    }
  }

  function swapMustache() {
    RetroAudio.playBip(440, 0.06, 'triangle');
    currentStyleIdx = (currentStyleIdx + 1) % mustacheStyles.length;
    if (mustache) {
      mustache.className = 'potato-mustache ' + mustacheStyles[currentStyleIdx];
    }
    quoteIdx = (quoteIdx + 1) % quotes.length;
    if (quote) {
      quote.textContent = quotes[quoteIdx];
    }
  }

  function tipHat() {
    RetroAudio.playClack();
    if (hat) {
      hat.style.transform = 'translateY(-6px) rotate(-15deg)';
      setTimeout(() => {
        hat.style.transform = '';
      }, 300);
    }
  }

  return { init };
})();



/* ================================================================
   19.  PLAYABLE ETCH-A-SKETCH ("ETCH") RETRO TOY SCREEN
   ================================================================ */
const EtchASketchToy = (() => {
  const container = document.getElementById('etchASketchToy');
  const canvas = document.getElementById('etchCanvas');
  const btnDraw = document.getElementById('btnEtchDraw');
  const btnShake = document.getElementById('btnEtchShake');
  const knobLeft = document.getElementById('etchKnobLeft');
  const knobRight = document.getElementById('etchKnobRight');

  let ctx = null;
  let isDrawing = false;
  let lastX = 140;
  let lastY = 75;

  function init() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    clearCanvas();

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
      isDrawing = true;
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      drawLine(lastX, lastY, x, y);
      lastX = x;
      lastY = y;
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', stopDraw);

    if (btnDraw) {
      btnDraw.addEventListener('click', autoDrawAGSK);
    }
    if (btnShake) {
      btnShake.addEventListener('click', shakeScreen);
    }
  }

  function clearCanvas() {
    if (!ctx) return;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function startDraw(e) {
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    isDrawing = true;
  }

  function draw(e) {
    if (!isDrawing || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }

  function stopDraw() {
    isDrawing = false;
  }

  function drawLine(x1, y1, x2, y2) {
    if (!ctx) return;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    if (knobLeft) knobLeft.style.transform = 'rotate(' + ((x2 * 3) % 360) + 'deg)';
    if (knobRight) knobRight.style.transform = 'rotate(' + ((y2 * 3) % 360) + 'deg)';
  }

  function autoDrawAGSK() {
    clearCanvas();
    RetroAudio.playBip(520, 0.08, 'triangle');

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.6;
    ctx.font = 'bold 26px "Pixelify Sans", monospace';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText('AGSK 2026', canvas.width / 2, canvas.height / 2 + 10);
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  }

  function shakeScreen() {
    RetroAudio.playEtchErase();
    if (container) {
      container.classList.remove('etch-shaking');
      void container.offsetWidth;
      container.classList.add('etch-shaking');
    }
    setTimeout(() => {
      clearCanvas();
    }, 220);
  }

  return { init };
})();



/* ================================================================
   20.  REX THE NERVOUS DINOSAUR CORNER ACTOR
   ================================================================ */
const RexPeeker = (() => {
  const actor = document.getElementById('rexCornerActor');
  const bubble = document.getElementById('rexSpeechBubble');

  const quotes = [
    "« Wah! Ada 6 kaset proyek keren! Untung kodenya Anandita rapi, jadi aku nggak panik! »",
    "« Aku bukan dinosaurus pemarah, aku dinosaurus pecinta frontend web! »",
    "« Jangan klik kasetnya terlalu keras ya... eh ternyata responsif banget! »",
    "« Aku paling suka proyek Python dan desain e-commerce donatnya! »"
  ];
  let quoteIndex = 0;

  function init() {
    if (!actor) return;
    actor.addEventListener('click', () => {
      RetroAudio.playRexRoar();
      quoteIndex = (quoteIndex + 1) % quotes.length;
      if (bubble) {
        bubble.textContent = quotes[quoteIndex];
      }
      actor.style.transform = 'scale(1.05) translateY(-4px)';
      setTimeout(() => {
        actor.style.transform = '';
      }, 200);
    });
  }

  return { init };
})();



/* ================================================================
   21.  SLINKY DOG DYNAMIC ELASTIC SCROLL BUDDY
   ================================================================ */
const SlinkyCompanion = (() => {
  const rig = document.getElementById('slinkyDogRig');
  const btn = document.getElementById('btnSlinkyBoing');
  const bubble = document.getElementById('slinkySpeechBubble');

  const quotes = [
    "Golly bob howdy! Gulir terus ke bawah, Partner!",
    "Pegas punggungku meregang sejauh kode Anandita berjalan!",
    "Woody selalu bilang: pantang menyerah sebelum tuntas!",
    "Klik tombol lagu di navbar untuk melodi nostalgia!",
    "Guk guk! Coba mainkan gim Tetris dan terminal DOS di atas!"
  ];
  let quoteIndex = 0;

  function init() {
    if (rig) {
      rig.addEventListener('click', doBoing);
    }
    if (btn) {
      btn.addEventListener('click', doBoing);
    }
  }

  function doBoing() {
    RetroAudio.playBoing();
    if (rig) {
      rig.classList.remove('boing-active');
      void rig.offsetWidth;
      rig.classList.add('boing-active');
    }
    quoteIndex = (quoteIndex + 1) % quotes.length;
    if (bubble) {
      bubble.textContent = quotes[quoteIndex];
      bubble.style.transform = 'scale(1.05)';
      setTimeout(() => {
        bubble.style.transform = '';
      }, 250);
    }
  }

  return { init };
})();



/* ================================================================
   22. 3D CLOSED-TO-OPEN PAPER / NOTEBOOK SKILLS ANIMATION
   ================================================================ */
const SkillsNotebookManager = (() => {
  const section = document.getElementById('skills');
  const stickyFrame = document.getElementById('skillsStickyFrame');
  const stage = document.getElementById('skills3dStage');
  const notebook = document.getElementById('cosmicNotebook');
  const cover = document.getElementById('notebookCoverFlipper');
  const tabsContainer = document.getElementById('skillsCategoryTabs');
  const tabs = document.querySelectorAll('.skills-cat-tab');
  const iconsStage = document.getElementById('skillsIconsStage');
  const iconsGrid = document.getElementById('skillsIconsGrid');
  const promptEmpty = document.getElementById('skillsPromptEmpty');
  const tooltipHud = document.getElementById('techTooltipHud');
  const hudName = document.getElementById('hudTechName');
  const claspIcon = document.getElementById('coverClaspIcon');

  let currentCategory = null;
  let isTransitioning = false;
  let hasRevealedTabs = false;
  let soundPlayedOpen = false;
  let soundPlayedClose = false;

  // Physics lerp state
  let currentCoverAngle = 0;
  let targetCoverAngle = 0;
  let currentShiftX = -211;
  let targetShiftX = -211;
  let currentLiftY = 55;
  let targetLiftY = 55;
  let currentLeftOpacity = 0;
  let targetLeftOpacity = 0;

  const techData = {
    frontend: [
      { name: 'HTML5', icon: 'fa-brands fa-html5', accent: '#e34f26' },
      { name: 'CSS3', icon: 'fa-brands fa-css3-alt', accent: '#1572b6' },
      { name: 'JavaScript', icon: 'fa-brands fa-js', accent: '#eab308' },
      { name: 'React', icon: 'fa-brands fa-react', accent: '#0284c7' },
      { name: 'TypeScript', glyph: 'TS', accent: '#2563eb' },
      { name: 'Next.js', glyph: 'N', accent: '#0f172a' }
    ],
    backend: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js', accent: '#16a34a' },
      { name: 'PHP', icon: 'fa-brands fa-php', accent: '#4f46e5' },
      { name: 'Python', icon: 'fa-brands fa-python', accent: '#2563eb' },
      { name: 'Laravel', icon: 'fa-brands fa-laravel', accent: '#dc2626' },
      { name: 'MySQL', icon: 'fa-solid fa-database', accent: '#0284c7' },
      { name: 'PostgreSQL', icon: 'fa-solid fa-server', accent: '#1d4ed8' },
      { name: 'MongoDB', icon: 'fa-solid fa-leaf', accent: '#15803d' },
      { name: 'Supabase', icon: 'fa-solid fa-bolt', accent: '#059669' }
    ],
    tools: [
      { name: 'Git', icon: 'fa-brands fa-git-alt', accent: '#ea580c' },
      { name: 'GitHub', icon: 'fa-brands fa-github', accent: '#0f172a' },
      { name: 'VS Code', icon: 'fa-solid fa-code', accent: '#0284c7' },
      { name: 'Figma', icon: 'fa-brands fa-figma', accent: '#ea580c' },
      { name: 'Postman', icon: 'fa-solid fa-paper-plane', accent: '#f97316' },
      { name: 'Docker', icon: 'fa-brands fa-docker', accent: '#0284c7' },
      { name: 'Vercel', glyph: '▲', accent: '#0f172a' },
      { name: 'Netlify', icon: 'fa-solid fa-cloud-arrow-up', accent: '#0d9488' }
    ]
  };

  function init() {
    if (!section || !notebook || !cover) return;

    setupCategoryTabs();
    setupScrollPhysics();
    requestAnimationFrame(renderLoop);
  }

  function setupScrollPhysics() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      targetCoverAngle = -180;
      targetShiftX = 0;
      targetLiftY = 0;
      targetLeftOpacity = 1;
      currentCoverAngle = -180;
      currentShiftX = 0;
      currentLiftY = 0;
      currentLeftOpacity = 1;
      revealCategoryMenu();
      return;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    updateScrollProgress();
  }

  function updateScrollProgress() {
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const scrollDistance = sectionHeight - windowHeight;

    if (scrollDistance <= 0) return;

    // Scrolled distance within the section
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

    const isMobile = window.innerWidth <= 768;
    const maxShiftX = isMobile ? 0 : -211;
    const maxLiftY = isMobile ? 35 : 55;

    // Generous Stay Zone:
    // Zone 1 (0.00 to 0.28): Closed notebook rises from bottom & cover opens (0deg -> -180deg)
    // Zone 2 (0.28 to 0.75): STAY ZONE - fully open (-180deg), centered, category tabs revealed & fully interactive
    // Zone 3 (0.75 to 0.98): Smoothly closing (-180deg -> 0deg) as user scrolls away to projects
    let t = 0; // 0 = fully closed, 1 = fully open

    if (progress < 0.04) {
      t = 0;
    } else if (progress >= 0.04 && progress < 0.28) {
      t = (progress - 0.04) / 0.24;
    } else if (progress >= 0.28 && progress <= 0.75) {
      t = 1; // Locked stay zone!
    } else if (progress > 0.75 && progress <= 0.98) {
      t = 1 - ((progress - 0.75) / 0.23);
    } else {
      t = 0;
    }

    // Smooth cubic easing applied to normalized progress
    const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    targetCoverAngle = -180 * easeT;
    targetShiftX = maxShiftX * (1 - easeT);
    targetLiftY = maxLiftY * (1 - easeT);
    targetLeftOpacity = isMobile ? 0 : easeT;
  }

  function renderLoop() {
    const isStationary = Math.abs(targetCoverAngle - currentCoverAngle) < 0.05 &&
                         Math.abs(targetShiftX - currentShiftX) < 0.05 &&
                         Math.abs(targetLiftY - currentLiftY) < 0.05 &&
                         Math.abs(targetLeftOpacity - currentLeftOpacity) < 0.02;

    if (!isStationary) {
      currentCoverAngle += (targetCoverAngle - currentCoverAngle) * 0.14;
      currentShiftX += (targetShiftX - currentShiftX) * 0.14;
      currentLiftY += (targetLiftY - currentLiftY) * 0.14;
      currentLeftOpacity += (targetLeftOpacity - currentLeftOpacity) * 0.14;

      if (notebook) {
        notebook.style.transform = 'translate3d(' + currentShiftX.toFixed(1) + 'px, ' + currentLiftY.toFixed(1) + 'px, 0)';
      }

      if (cover) {
        cover.style.transform = 'rotateY(' + currentCoverAngle.toFixed(2) + 'deg)';
      }

      const leftPage = document.querySelector('.notebook-page.page-left');
      if (leftPage && window.innerWidth > 768) {
        leftPage.style.opacity = currentLeftOpacity.toFixed(2);
      }
    }

    // Dynamic lock clasp toggle
    if (claspIcon) {
      if (currentCoverAngle <= -25) {
        if (!claspIcon.classList.contains('fa-unlock')) {
          claspIcon.className = 'fa-solid fa-unlock cover-clasp-icon';
        }
      } else {
        if (!claspIcon.classList.contains('fa-lock')) {
          claspIcon.className = 'fa-solid fa-lock cover-clasp-icon';
        }
      }
    }

    // Audio cue on crossing halfway mark
    if (currentCoverAngle <= -90 && !soundPlayedOpen) {
      soundPlayedOpen = true;
      soundPlayedClose = false;
      if (typeof RetroAudio !== 'undefined' && RetroAudio.playPowerOn) {
        RetroAudio.playPowerOn();
      }
    } else if (currentCoverAngle > -90 && !soundPlayedClose) {
      soundPlayedClose = true;
      soundPlayedOpen = false;
      if (typeof RetroAudio !== 'undefined' && RetroAudio.playResetDrop) {
        RetroAudio.playResetDrop();
      }
    }

    // Category Tabs reveal threshold
    if (currentCoverAngle <= -130) {
      if (!hasRevealedTabs) {
        hasRevealedTabs = true;
        revealCategoryMenu();
      }
    } else if (currentCoverAngle > -70) {
      if (hasRevealedTabs) {
        hasRevealedTabs = false;
        hideCategoryMenu();
      }
    }

    requestAnimationFrame(renderLoop);
  }

  function revealCategoryMenu() {
    if (!tabsContainer) return;
    tabsContainer.classList.add('tabs-revealed');

    tabs.forEach((tab, index) => {
      setTimeout(() => {
        tab.classList.add('tab-visible');
        if (typeof RetroAudio !== 'undefined' && RetroAudio.playBip) {
          RetroAudio.playBip();
        }
      }, index * 100);
    });

    if (currentCategory && techData[currentCategory]) {
      const activeTab = document.querySelector('.skills-cat-tab[data-category="' + currentCategory + '"]');
      if (activeTab) {
        tabs.forEach(t => t.classList.toggle('active-tab', t === activeTab));
        renderNewIcons(currentCategory);
      }
    }
  }

  function hideCategoryMenu() {
    if (!tabsContainer) return;
    tabsContainer.classList.remove('tabs-revealed');
    tabs.forEach(tab => tab.classList.remove('tab-visible'));
  }

  function setupCategoryTabs() {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-category');
        selectCategory(cat, tab);
      });

      tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const cat = tab.getAttribute('data-category');
          selectCategory(cat, tab);
        }
      });
    });
  }

  function selectCategory(category, activeBtn) {
    if (!category || !techData[category] || isTransitioning) return;
    if (currentCategory === category && iconsGrid && iconsGrid.children.length > 0) return;

    isTransitioning = true;
    currentCategory = category;

    if (typeof RetroAudio !== 'undefined' && RetroAudio.playCoin) {
      RetroAudio.playCoin();
    }

    tabs.forEach(tab => {
      const isSelected = tab === activeBtn;
      tab.classList.toggle('active-tab', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (promptEmpty) {
      promptEmpty.style.opacity = '0';
      promptEmpty.style.pointerEvents = 'none';
      setTimeout(() => {
        promptEmpty.style.display = 'none';
      }, 150);
    }

    const oldIcons = iconsGrid ? iconsGrid.querySelectorAll('.tech-pop-item') : [];
    if (oldIcons.length > 0) {
      oldIcons.forEach(item => item.classList.add('vanishing'));
      setTimeout(() => {
        renderNewIcons(category);
      }, 150);
    } else {
      renderNewIcons(category);
    }
  }

  function renderNewIcons(category) {
    if (!iconsGrid) return;
    iconsGrid.innerHTML = '';

    const list = techData[category] || [];

    list.forEach((tech, index) => {
      const item = document.createElement('div');
      item.className = 'tech-pop-item';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', tech.name + ' - Keahlian ' + category.toUpperCase());
      item.style.setProperty('--pop-delay', (index * 0.08) + 's');
      item.style.setProperty('--tech-accent', tech.accent || '#8b5cf6');

      const face = document.createElement('div');
      face.className = 'tech-token-face';

      const iconWrap = document.createElement('div');
      iconWrap.className = 'tech-icon-holder';
      iconWrap.style.color = tech.accent || '#1a1a1a';

      if (tech.icon) {
        const iconEl = document.createElement('i');
        iconEl.className = tech.icon;
        iconWrap.appendChild(iconEl);
      } else if (tech.glyph) {
        const glyphEl = document.createElement('span');
        glyphEl.className = 'tech-text-glyph';
        glyphEl.textContent = tech.glyph;
        iconWrap.appendChild(glyphEl);
      }

      const nameEl = document.createElement('span');
      nameEl.className = 'tech-token-name';
      nameEl.textContent = tech.name;

      face.appendChild(iconWrap);
      face.appendChild(nameEl);
      item.appendChild(face);

      const showHud = () => {
        if (hudName) {
          hudName.textContent = '[' + tech.name.toUpperCase() + '] // ' + category.toUpperCase() + ' STACK';
        }
        if (tooltipHud) tooltipHud.classList.add('hud-active');
        if (typeof RetroAudio !== 'undefined' && RetroAudio.playBip) {
          RetroAudio.playBip();
        }
      };

      const resetHud = () => {
        if (hudName) {
          hudName.textContent = 'KATEGORI: ' + category.toUpperCase() + ' (' + list.length + ' TEKNOLOGI)';
        }
        if (tooltipHud) tooltipHud.classList.remove('hud-active');
      };

      item.addEventListener('mouseenter', showHud);
      item.addEventListener('focus', showHud);
      item.addEventListener('mouseleave', resetHud);
      item.addEventListener('blur', resetHud);

      iconsGrid.appendChild(item);

      setTimeout(() => {
        item.classList.add('emerged');
      }, 30 + index * 45);
    });

    if (hudName) {
      hudName.textContent = 'KATEGORI: ' + category.toUpperCase() + ' (' + list.length + ' TEKNOLOGI)';
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 30 + list.length * 45 + 60);
  }

  return {
    init,
    selectCategory
  };
})();

/* ================================================================
   23. RETRO TV ABOUT MANAGER (HORIZONTAL CRT SCROLL SHOWCASE)
   ================================================================ */
const RetroTvAboutManager = (() => {
  let section = null;
  let tvAppliance = null;
  let pagesTrack = null;
  let channelEl = null;
  let knobEl = null;
  let powerLed = null;
  let slides = [];
  let centerPill = null;
  let centerPillText = null;
  let pips = [];

  let currentTrackP = 0;
  let targetTrackP = 0;
  let currentScale = 1.0;
  let targetScale = 1.0;
  let currentChannel = 1;
  let isTicking = false;
  let prefersReducedMotion = false;

  function init() {
    section = document.getElementById('about');
    tvAppliance = document.getElementById('retroTvAppliance');
    pagesTrack = document.getElementById('tvPagesTrack');
    channelEl = document.getElementById('tvCurrentChannel');
    knobEl = document.getElementById('tvKnobChannel');
    powerLed = document.getElementById('tvPowerLed');
    centerPill = document.getElementById('tvCenterPill');
    centerPillText = document.getElementById('tvCenterPillText');

    if (pagesTrack) {
      slides = pagesTrack.querySelectorAll('.tv-page-slide');
    }
    pips = document.querySelectorAll('.tv-pip-item');

    if (!section || !tvAppliance || !pagesTrack) return;

    prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (knobEl) {
      knobEl.addEventListener('click', () => {
        if (typeof RetroAudio !== 'undefined' && RetroAudio.playBip) {
          RetroAudio.playBip(620, 0.05);
        }
      });
    }

    // Allow clicking on CRT channel pips to jump directly to that page
    if (pips && pips.length) {
      pips.forEach(pip => {
        pip.addEventListener('click', () => {
          const p = parseInt(pip.getAttribute('data-page'), 10);
          if (!isNaN(p) && section) {
            const scrollDistance = section.offsetHeight - window.innerHeight;
            const targetPcts = [0.04, 0.34, 0.66, 0.92];
            const chosenPct = targetPcts[p - 1] !== undefined ? targetPcts[p - 1] : 0.04;
            const targetScroll = section.offsetTop + (scrollDistance * chosenPct);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            if (typeof RetroAudio !== 'undefined' && RetroAudio.playBip) {
              RetroAudio.playBip(580 + p * 35, 0.05);
            }
          }
        });
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    onScroll();
  }

  function onScroll() {
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;

    let progress = 0;
    if (scrollDistance > 0) {
      progress = (-rect.top) / scrollDistance;
    }
    progress = Math.min(1, Math.max(0, progress));

    // Calculate targetTrackP (0 to 3), targetScale (0.96 to 1.0), and channel (1 to 4)
    let trackP = 0;
    let ch = 1;
    let scale = 1.0;

    if (progress < 0.08) {
      trackP = 0;
      ch = 1;
      scale = 1.0 - (progress / 0.08) * 0.04;
    } else if (progress < 0.28) {
      const t = (progress - 0.08) / 0.20;
      const ease = t * t * (3 - 2 * t);
      trackP = 0 + ease * 1;
      ch = t < 0.5 ? 1 : 2;
      scale = 0.96;
    } else if (progress < 0.40) {
      trackP = 1;
      ch = 2;
      scale = 0.96;
    } else if (progress < 0.60) {
      const t = (progress - 0.40) / 0.20;
      const ease = t * t * (3 - 2 * t);
      trackP = 1 + ease * 1;
      ch = t < 0.5 ? 2 : 3;
      scale = 0.96;
    } else if (progress < 0.72) {
      trackP = 2;
      ch = 3;
      scale = 0.96;
    } else if (progress < 0.90) {
      const t = (progress - 0.72) / 0.18;
      const ease = t * t * (3 - 2 * t);
      trackP = 2 + ease * 1;
      ch = t < 0.5 ? 3 : 4;
      scale = 0.96;
    } else if (progress < 0.94) {
      trackP = 3;
      ch = 4;
      scale = 0.96;
    } else {
      trackP = 3;
      ch = 4;
      const u = (progress - 0.94) / 0.06;
      scale = 0.96 + u * 0.04; // Smooth scale back to original 1.0
    }

    targetTrackP = trackP;
    targetScale = scale;

    if (ch !== currentChannel) {
      currentChannel = ch;
      if (channelEl) {
        channelEl.textContent = '0' + ch;
      }
      if (typeof RetroAudio !== 'undefined' && RetroAudio.playBip && progress > 0.02 && progress < 0.98) {
        RetroAudio.playBip(480 + ch * 40, 0.04);
      }
    }

    if (powerLed) {
      const inView = rect.bottom > 50 && rect.top < window.innerHeight - 50;
      powerLed.classList.toggle('on', inView);
    }

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateLoop);
    }
  }

  function updateLoop() {
    if (prefersReducedMotion) {
      currentTrackP = targetTrackP;
      currentScale = targetScale;
    } else {
      currentTrackP += (targetTrackP - currentTrackP) * 0.22;
      currentScale += (targetScale - currentScale) * 0.22;

      if (Math.abs(targetTrackP - currentTrackP) < 0.001) currentTrackP = targetTrackP;
      if (Math.abs(targetScale - currentScale) < 0.001) currentScale = targetScale;
    }

    // 1. Horizontal slide translation
    const translateX = -(currentTrackP * 25);
    if (pagesTrack) {
      pagesTrack.style.transform = `translateX(${translateX.toFixed(3)}%)`;
    }

    // 2. 3D perspective angle facing towards center
    const isMobile = window.innerWidth <= 650;
    const baseRotY = isMobile ? -3.0 : -7.5;
    const baseRotX = isMobile ? 1.5 : 3.0;
    const microTiltY = baseRotY + ((currentTrackP / 3) * 1.5 - 0.75);

    if (tvAppliance) {
      tvAppliance.style.transform = `scale(${currentScale.toFixed(4)}) rotateY(${microTiltY.toFixed(2)}deg) rotateX(${baseRotX.toFixed(2)}deg)`;
    }

    // 3. Rotary knob rotation
    if (knobEl) {
      const rotation = currentTrackP * 90;
      knobEl.style.transform = `rotate(${rotation.toFixed(1)}deg)`;
    }

    // 4. Center Alignment & Screen Feedback Effects
    const centerIdx = Math.round(currentTrackP);
    const distFromCenter = Math.abs(currentTrackP - centerIdx);
    const isCentered = distFromCenter < 0.12;

    // Toggle active center state on individual page slides
    if (slides && slides.length) {
      slides.forEach((slide, idx) => {
        const isCurrent = (idx === centerIdx) && isCentered;
        slide.classList.toggle('is-centered', isCurrent);
      });
    }

    // Update Top CRT Center OSD HUD
    if (centerPill && centerPillText) {
      if (isCentered) {
        centerPill.classList.add('is-locked');
        centerPill.classList.remove('is-shifting');
        const pageNames = [
          '01 // PROFIL UTAMA',
          '02 // LATAR BELAKANG',
          '03 // KEAHLIAN & KARYA',
          '04 // PRINSIP & VISI'
        ];
        centerPillText.textContent = `HALAMAN ${pageNames[centerIdx] || '01'} // TERFOKUS DI TENGAH`;
      } else {
        centerPill.classList.remove('is-locked');
        centerPill.classList.add('is-shifting');
        centerPillText.textContent = 'MENGGESER KE HALAMAN BERIKUTNYA...';
      }
    }

    // Update Bottom CRT Channel Pips Timeline
    if (pips && pips.length) {
      pips.forEach((pip, idx) => {
        pip.classList.toggle('active', idx === centerIdx);
      });
    }

    if (Math.abs(targetTrackP - currentTrackP) > 0.001 || Math.abs(targetScale - currentScale) > 0.001) {
      requestAnimationFrame(updateLoop);
    } else {
      isTicking = false;
    }
  }

  return { init };
})();

/* ================================================================
   24. PIXO GHOST COMPANION INTERACTION
   ================================================================ */
const PixoPrompt = (() => {
  const ghost = document.getElementById('lcdCharacterActor');
  const bubble = document.getElementById('ghostSpeechBubble');

  const greetingReplies = [
    'Halo! Aku Pixo, asisten karya Anandita!',
    'Semua proyek web dibuat dengan cinta & kode!',
    'Anandita siap berkolaborasi untuk proyek kreatif!',
    'Gulir ke bawah untuk membuka buku keahlian 3D!',
    'Terima kasih sudah berkunjung ke portofolio ini!'
  ];
  let replyIdx = 0;

  function init() {
    if (ghost && bubble) {
      ghost.addEventListener('click', () => {
        if (typeof RetroAudio !== 'undefined' && RetroAudio.playCoin) {
          RetroAudio.playCoin();
        }
        showBubbleMessage(greetingReplies[replyIdx % greetingReplies.length]);
        replyIdx++;
      });
    }
  }

  function showBubbleMessage(msg) {
    if (!bubble) return;
    bubble.textContent = msg;
    bubble.style.transform = 'scale(1.08) translateY(-4px)';
    setTimeout(() => {
      bubble.style.transform = '';
    }, 280);
  }

  return { init };
})();
