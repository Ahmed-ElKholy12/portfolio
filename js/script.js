/* ================================================================
   Ahmed El Kholy Portfolio — script.js
   Theme · Mobile menu · Navbar scroll · Reveal · Contact form
   (Skill ticker is pure CSS — no JS required)
================================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────
     THEME
  ────────────────────────────────────── */
  const themeBtn  = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');

  const SUN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>  <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64"  y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/> <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>`;

  const MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  function applyTheme(light) {
    document.body.classList.toggle('light', light);
    if (themeIcon) themeIcon.innerHTML = light ? MOON : SUN;
  }

  applyTheme(localStorage.getItem('theme') === 'light');

  themeBtn && themeBtn.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  /* ──────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────── */
  const mobBtn  = document.getElementById('mob-btn');
  const mobMenu = document.getElementById('mob-menu');

  mobBtn && mobBtn.addEventListener('click', () => {
    mobMenu.classList.toggle('open');
    mobBtn.textContent = mobMenu.classList.contains('open') ? '✕' : '☰';
  });

  document.querySelectorAll('#mob-menu .nav-link').forEach(l => {
    l.addEventListener('click', () => {
      mobMenu.classList.remove('open');
      mobBtn.textContent = '☰';
    });
  });

  /* ──────────────────────────────────────
     NAVBAR SCROLL OPACITY
  ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  /* ──────────────────────────────────────
     ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(
          `.nav-links .nav-link[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-72px 0px -55% 0px', threshold: 0 });

  sections.forEach(s => sectionObs.observe(s));

  /* ──────────────────────────────────────
     REVEAL ON SCROLL
  ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  /* ──────────────────────────────────────
     CONTACT FORM DEMO
  ────────────────────────────────────── */
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    if (feedback) {
      feedback.className = 'f-feedback ok';
      feedback.textContent =
        `Thanks ${name}! This is a demo — use Email or WhatsApp for real contact.`;
    }
    setTimeout(() => {
      form.reset();
      if (feedback) { feedback.className = 'f-feedback'; feedback.textContent = ''; }
    }, 4000);
  });

})();
