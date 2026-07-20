document.addEventListener('DOMContentLoaded', () => {
  const htmlRoot = document.documentElement;
  const pages = document.querySelectorAll('.brand-page');
  const navItems = document.querySelectorAll('.nav-item');
  const bookContainer = document.querySelector('.book-container');
  const viewport = document.querySelector('.viewport');
  const sidebar = document.querySelector('.sidebar');
  const btnMenuToggle = document.getElementById('btn-menu-toggle');
  const drawerOverlay = document.getElementById('drawer-overlay');

  let currentPageIndex = 0;

  // ----------------------------------------------------
  // 1. Viewport Scaling (A4 Landscape aspect-ratio)
  // ----------------------------------------------------
  const A4_WIDTH = 1414;
  const A4_HEIGHT = 1000;

  function adjustScale() {
    if (window.matchMedia('print').matches) {
      bookContainer.style.transform = 'none';
      return;
    }

    // Disable scale transform on tablets and mobile screens (< 1280px)
    if (window.innerWidth < 1280) {
      bookContainer.style.transform = 'none';
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    // Calculate scale factor with a 40px buffer margin
    const scaleX = (viewportWidth - 80) / A4_WIDTH;
    const scaleY = (viewportHeight - 80) / A4_HEIGHT;
    const scale = Math.min(scaleX, scaleY, 1.25); // Limit max scale to 1.25x

    bookContainer.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', adjustScale);
  adjustScale();
  setTimeout(adjustScale, 100);

  // ----------------------------------------------------
  // 2. Bilingual Support & Language Switcher
  // ----------------------------------------------------
  const btnLangEn = document.getElementById('btn-lang-en');
  const btnLangAr = document.getElementById('btn-lang-ar');

  function setLanguage(lang) {
    if (lang === 'ar') {
      htmlRoot.classList.remove('lang-en');
      htmlRoot.classList.add('lang-ar');
      htmlRoot.setAttribute('dir', 'rtl');

      if (btnLangAr) btnLangAr.classList.add('active');
      if (btnLangEn) btnLangEn.classList.remove('active');

      localStorage.setItem('midgo-lang', 'ar');
    } else {
      htmlRoot.classList.remove('lang-ar');
      htmlRoot.classList.add('lang-en');
      htmlRoot.setAttribute('dir', 'ltr');

      if (btnLangEn) btnLangEn.classList.add('active');
      if (btnLangAr) btnLangAr.classList.remove('active');

      localStorage.setItem('midgo-lang', 'en');
    }

    // Force scale adjustment on direction change
    adjustScale();
  }

  if (btnLangEn) {
    btnLangEn.addEventListener('click', () => setLanguage('en'));
  }
  if (btnLangAr) {
    btnLangAr.addEventListener('click', () => setLanguage('ar'));
  }

  // Load saved language, defaulting to English
  const savedLang = localStorage.getItem('midgo-lang') || 'en';
  setLanguage(savedLang);

  // ----------------------------------------------------
  // 3. Slide Navigation System & Drawer Autoclose
  // ----------------------------------------------------
  function goToPage(index) {
    if (index < 0 || index >= pages.length) return;

    pages[currentPageIndex].classList.remove('active');
    navItems[currentPageIndex].classList.remove('active');

    currentPageIndex = index;
    pages[currentPageIndex].classList.add('active');
    navItems[currentPageIndex].classList.add('active');

    // Close sidebar drawer on mobile/tablet after navigating
    if (sidebar) {
      sidebar.classList.remove('drawer-open');
    }
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
    }

    // Scroll to the top of the page on mobile to prevent cut-off headers
    window.scrollTo({ top: 0, behavior: 'instant' });

    handlePageEnter(currentPageIndex);
  }

  function nextPage() {
    if (currentPageIndex < pages.length - 1) {
      goToPage(currentPageIndex + 1);
    }
  }

  function prevPage() {
    if (currentPageIndex > 0) {
      goToPage(currentPageIndex - 1);
    }
  }

  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      goToPage(index);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && document.activeElement.tagName !== 'BUTTON' && document.activeElement.tagName !== 'INPUT')) {
      nextPage();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      prevPage();
      e.preventDefault();
    }
  });

  // Set tabIndex dynamically for pages to prevent tab focus overflow
  pages.forEach(page => {
    page.setAttribute('tabindex', '-1');
  });

  function handlePageEnter(pageIndex) {
    // Control Lottie animations based on active page (Page 19 is index 18)
    if (pageIndex === 18) {
      if (lottieAnimEn) lottieAnimEn.play();
      if (lottieAnimAr) lottieAnimAr.play();
    } else {
      if (lottieAnimEn) lottieAnimEn.pause();
      if (lottieAnimAr) lottieAnimAr.pause();
    }
  }

  // ----------------------------------------------------
  // 4. Hamburger Menu Drawer Navigation Logic
  // ----------------------------------------------------
  if (btnMenuToggle && sidebar) {
    btnMenuToggle.addEventListener('click', (e) => {
      sidebar.classList.toggle('drawer-open');
      if (drawerOverlay) {
        drawerOverlay.classList.toggle('active');
      }
      e.stopPropagation(); // Prevent immediate closing from document listener
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('drawer-open')) {
        if (!sidebar.contains(e.target)) {
          sidebar.classList.remove('drawer-open');
          if (drawerOverlay) {
            drawerOverlay.classList.remove('active');
          }
        }
      }
    });

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', () => {
        sidebar.classList.remove('drawer-open');
        drawerOverlay.classList.remove('active');
      });
    }
  }

  // ----------------------------------------------------
  // 5. Mobile Screen Simulator Scoped Swapper (Prevents Cross-Talk)
  // ----------------------------------------------------
  function initMobileSimulators() {
    const scopes = ['.lang-en', '.lang-ar'];

    scopes.forEach(scope => {
      const parent = document.querySelector(`#page-16 ${scope}`);
      if (!parent) return;

      const phoneStates = parent.querySelectorAll('.phone-screen-state');
      const phoneDots = parent.querySelectorAll('.phone-dot');
      const subTabBtns = parent.querySelectorAll('.ui-mobile-sub-btn');

      function setPhoneStateScoped(stateIndex) {
        phoneStates.forEach((state, idx) => {
          if (idx === stateIndex) {
            state.classList.add('active');
          } else {
            state.classList.remove('active');
          }
        });

        phoneDots.forEach((dot, idx) => {
          if (idx === stateIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        subTabBtns.forEach((btn, idx) => {
          if (idx === stateIndex) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }

      phoneDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          setPhoneStateScoped(index);
        });
      });

      subTabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          setPhoneStateScoped(index);
        });
      });

      // Auto-rotate the active visible simulator screen
      setInterval(() => {
        // Only auto-rotate if Page 16 is currently active
        if (currentPageIndex === 15) {
          // Check if parent scope container is currently visible in the DOM
          const style = window.getComputedStyle(parent);
          if (style.display !== 'none') {
            let activeIdx = 0;
            phoneStates.forEach((state, idx) => {
              if (state.classList.contains('active')) {
                activeIdx = idx;
              }
            });
            const nextIdx = (activeIdx + 1) % phoneStates.length;
            setPhoneStateScoped(nextIdx);
          }
        }
      }, 5000);
    });
  }

  // Initialize scoped simulators
  initMobileSimulators();

  // ----------------------------------------------------
  // 6. Fullscreen & Print Controller triggers
  // ----------------------------------------------------
  const btnFullscreen = document.getElementById('btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      // Pre-print: add class hook for CSS overrides
      document.documentElement.classList.add('printing');

      // Use setTimeout to let the class apply before print dialog opens
      setTimeout(() => {
        window.print();

        // Post-print: clean up the class
        // Use both 'afterprint' event and a timeout fallback
        const cleanup = () => {
          document.documentElement.classList.remove('printing');
        };
        window.addEventListener('afterprint', cleanup, { once: true });
        // Fallback for browsers that don't fire afterprint reliably
        setTimeout(cleanup, 2000);
      }, 100);
    });
  }

  // ----------------------------------------------------
  // 7. Page 19: Robust Lottie Player Initialization
  // ----------------------------------------------------
  let lottieAnimEn = null;
  let lottieAnimAr = null;

  function displayLottieFallback(containerEn, containerAr) {
    const fallbackHTML = `
      <div class="lottie-fallback-svg" style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; opacity:0.85; pointer-events:none;">
        <svg viewBox="0 0 100 100" style="width: 80px; height: 80px; fill: var(--bronze);">
          <path d="M50 15 C30 15, 15 30, 15 50 C15 70, 30 85, 50 85 C70 85, 85 70, 85 50 C85 30, 70 15, 50 15 Z M50 25 C63 25, 75 37, 75 50 C75 63, 63 75, 50 75 C37 75, 25 63, 25 50 C25 37, 37 25, 50 25 Z" />
        </svg>
        <span class="en-only" style="font-size:0.75rem; color:rgba(255,255,255,0.4); margin-top:8px; font-family:var(--font-english);">Animation unavailable (Static fallback)</span>
        <span class="ar-only" style="font-size:0.75rem; color:rgba(255,255,255,0.4); margin-top:8px; font-family:var(--font-arabic);">الحركة غير متوفرة (شعار ثابت)</span>
      </div>
    `;
    if (containerEn) containerEn.innerHTML = fallbackHTML;
    if (containerAr) containerAr.innerHTML = fallbackHTML;
  }

  async function initLottiePlayers() {
    const containerEn = document.getElementById('lottie-player-en');
    const containerAr = document.getElementById('lottie-player-ar');

    if (!containerEn && !containerAr) return;

    try {
      const response = await fetch('assets/data.json');
      if (!response.ok) {
        throw new Error(`Failed to load assets/data.json: status ${response.status}`);
      }

      const animData = await response.json();

      if (!animData || typeof animData !== 'object' || !animData.v) {
        throw new Error("Invalid Lottie JSON structure: missing version key 'v'");
      }

      if (typeof lottie !== 'undefined') {
        const loadLottie = (container, data) => {
          let anim = null;
          try {
            anim = lottie.loadAnimation({
              container: container,
              renderer: 'svg',
              loop: true,
              autoplay: false,
              animationData: data
            });

            anim.addEventListener('error', (err) => {
              console.warn("Lottie SVG animation runtime error, reloading using canvas renderer:", err);
              try {
                anim.destroy();
              } catch (destErr) {}
              anim = lottie.loadAnimation({
                container: container,
                renderer: 'canvas',
                loop: true,
                autoplay: false,
                animationData: data
              });
            });
          } catch (err) {
            console.warn("Lottie SVG initialization failed, falling back to canvas:", err.message);
            try {
              if (anim) anim.destroy();
            } catch (destErr) {}
            anim = lottie.loadAnimation({
              container: container,
              renderer: 'canvas',
              loop: true,
              autoplay: false,
              animationData: data
            });
          }
          return anim;
        };

        if (containerEn) {
          lottieAnimEn = loadLottie(containerEn, animData);
        }

        if (containerAr) {
          lottieAnimAr = loadLottie(containerAr, animData);
        }

        bindReplayControls();
      }
    } catch (err) {
      console.warn("Lottie loading/parsing failed, using fallback:", err.message);
      displayLottieFallback(containerEn, containerAr);
    }
  }

  function bindReplayControls() {
    const btnReplayEn = document.getElementById('btn-replay-lottie-en');
    if (btnReplayEn) {
      btnReplayEn.addEventListener('click', () => {
        if (lottieAnimEn) {
          lottieAnimEn.goToAndPlay(0, true);
        }
      });
    }

    const btnReplayAr = document.getElementById('btn-replay-lottie-ar');
    if (btnReplayAr) {
      btnReplayAr.addEventListener('click', () => {
        if (lottieAnimAr) {
          lottieAnimAr.goToAndPlay(0, true);
        }
      });
    }
  }

  initLottiePlayers();

  // ----------------------------------------------------
  // 8. Dynamic Mobile Header Height Measurement
  // Writes to --header-height so CSS consumes it directly.
  // This makes the layout truly dynamic: if the header
  // renders at a different height due to safe-area insets,
  // the viewport padding adapts automatically.
  // ----------------------------------------------------
  function updateHeaderOffset() {
    if (window.innerWidth < 1280) {
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        const measuredHeight = rect.height;
        // Update the CSS variable that controls ALL layout offsets
        document.documentElement.style.setProperty('--header-height', `${measuredHeight}px`);
      }
    } else {
      // On desktop, reset to the default value
      document.documentElement.style.setProperty('--header-height', '48px');
    }
  }

  if (sidebar && typeof ResizeObserver !== 'undefined') {
    const headerObserver = new ResizeObserver(() => {
      updateHeaderOffset();
    });
    headerObserver.observe(sidebar);
  }

  window.addEventListener('resize', updateHeaderOffset);
  window.addEventListener('orientationchange', updateHeaderOffset);
  updateHeaderOffset();
  setTimeout(updateHeaderOffset, 150);
});
