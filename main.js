/* =============================================================
   main.js — Vanilla JavaScript for 최범규's personal website
   ============================================================= */

'use strict';

// =============================================================
// 0. Hero Canvas — Animated Orb Background
// =============================================================
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');

  // Multi-color orbs — blues, indigo, violet, teal, pink
  // Higher opacity + mix-blend-mode:multiply (set in CSS) = vivid aurora look
  const ORBS = [
    // Blues
    { x: 0.12, y: 0.20, r: 0.48, vx:  0.00022, vy:  0.00014, opacity: 0.38, hue: 212 },
    { x: 0.78, y: 0.15, r: 0.40, vx: -0.00016, vy:  0.00020, opacity: 0.32, hue: 200 },
    // Indigo / violet
    { x: 0.60, y: 0.65, r: 0.44, vx:  0.00013, vy: -0.00018, opacity: 0.30, hue: 252 },
    { x: 0.88, y: 0.50, r: 0.34, vx: -0.00018, vy: -0.00012, opacity: 0.28, hue: 270 },
    // Teal / cyan
    { x: 0.22, y: 0.75, r: 0.38, vx:  0.00017, vy:  0.00010, opacity: 0.28, hue: 180 },
    // Pink / rose
    { x: 0.70, y: 0.82, r: 0.32, vx: -0.00014, vy:  0.00016, opacity: 0.24, hue: 330 },
    { x: 0.40, y: 0.35, r: 0.36, vx:  0.00010, vy: -0.00013, opacity: 0.26, hue: 290 },
    // Deep blue accent
    { x: 0.92, y: 0.25, r: 0.28, vx: -0.00020, vy:  0.00011, opacity: 0.22, hue: 225 },
  ];

  // Logical dimensions (CSS pixels)
  let W = 0, H = 0;
  let isVisible = true;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawOrb(orb) {
    const cx = orb.x * W;
    const cy = orb.y * H;
    const base = Math.min(W, H);
    const r    = orb.r * base;

    // Saturated core fading to transparent edge — creates rich color
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0.00, 'hsla(' + orb.hue + ', 90%, 58%, ' + orb.opacity + ')');
    grd.addColorStop(0.30, 'hsla(' + orb.hue + ', 85%, 62%, ' + (orb.opacity * 0.75) + ')');
    grd.addColorStop(0.60, 'hsla(' + orb.hue + ', 80%, 65%, ' + (orb.opacity * 0.35) + ')');
    grd.addColorStop(1.00, 'hsla(' + orb.hue + ', 75%, 68%, 0)');

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    if (isVisible) {
      ORBS.forEach(function (orb) {
        drawOrb(orb);
        orb.x += orb.vx;
        orb.y += orb.vy;
        // Soft bounce at boundaries
        if (orb.x < -0.15) { orb.x = -0.15; orb.vx =  Math.abs(orb.vx); }
        if (orb.x >  1.15) { orb.x =  1.15; orb.vx = -Math.abs(orb.vx); }
        if (orb.y < -0.15) { orb.y = -0.15; orb.vy =  Math.abs(orb.vy); }
        if (orb.y >  1.15) { orb.y =  1.15; orb.vy = -Math.abs(orb.vy); }
      });
    }

    requestAnimationFrame(tick);
  }

  // Pause rendering when hero is off-screen (battery / performance)
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(heroSection);
  }

  resize();
  tick();

  window.addEventListener('resize', function () {
    resize();
  }, { passive: true });
})();




// =============================================================
// 1. Navigation — Scroll Color Transition
// =============================================================
(function initNav() {
  const nav = document.getElementById('global-nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY >= 200) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on init in case the page loads already scrolled
  onScroll();
})();


// =============================================================
// 2. Navigation — Smooth Scroll for Anchor Links
// =============================================================
(function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, #btn-contact');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Close mobile menu if open
      const hamburger = document.getElementById('nav-hamburger');
      const mobileMenu = document.getElementById('mobile-menu');
      if (hamburger && mobileMenu && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  });
})();


// =============================================================
// 3. Navigation — Hamburger Menu Toggle
// =============================================================
(function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    hamburger.setAttribute('aria-expanded', String(nextState));
    mobileMenu.hidden = !nextState;
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    const nav = document.getElementById('global-nav');
    if (!nav) return;
    if (!nav.contains(e.target) && hamburger.getAttribute('aria-expanded') === 'true') {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    }
  });
})();


// =============================================================
// 4. Scroll Reveal — Intersection Observer
// =============================================================
(function initScrollReveal() {
  // Respect reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    // Show all elements immediately without animation
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately if IO not supported
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after reveal — no need to re-animate
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();


// =============================================================
// 5. npx Copy Button
// =============================================================
(function initCopyButton() {
  const copyBtn = document.getElementById('copy-btn');
  const npxCode = document.getElementById('npx-code');
  if (!copyBtn || !npxCode) return;

  const originalText = '복사';
  const successText = '복사됨 ✓';
  let resetTimer = null;

  copyBtn.addEventListener('click', function () {
    const textToCopy = npxCode.textContent.trim();

    if (!navigator.clipboard) {
      // Clipboard API not available — fail silently
      return;
    }

    navigator.clipboard.writeText(textToCopy).then(function () {
      // Success feedback
      copyBtn.textContent = successText;

      // Clear any pending reset
      if (resetTimer) {
        clearTimeout(resetTimer);
      }

      // Reset after 1.5 seconds
      resetTimer = setTimeout(function () {
        copyBtn.textContent = originalText;
        resetTimer = null;
      }, 1500);
    }).catch(function () {
      // Fail silently — no error UI
    });
  });
})();
