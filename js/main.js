'use strict';

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ---- MOBILE NAV / HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('[data-nav-close]').forEach(el => {
    el.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---- ACTIVE NAV LINK ---- */
(function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

/* ---- COUNTDOWN ---- */
const TARGET = new Date('2026-11-26T17:00:00+05:30');

function pad(n, len = 2) { return String(n).padStart(len, '0'); }

function tick() {
  const cdDays  = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');
  if (!cdDays) return;

  const diff = TARGET - new Date();
  if (diff <= 0) {
    cdDays.textContent  = '000';
    cdHours.textContent = '00';
    cdMins.textContent  = '00';
    cdSecs.textContent  = '00';
    return;
  }

  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5)  / 6e4);
  const s = Math.floor((diff % 6e4)   / 1e3);

  cdDays.textContent  = pad(d, 3);
  cdHours.textContent = pad(h);
  cdMins.textContent  = pad(m);
  cdSecs.textContent  = pad(s);
}

if (document.getElementById('cdDays')) {
  tick();
  setInterval(tick, 1000);
}

/* ---- SCROLL REVEAL ---- */
const srObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      srObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger sibling cards
document.querySelectorAll('.venue-grid .venue-card, .hotel-grid .hotel-card, .timeline .tl-item, .events-preview-grid .event-preview-card').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

document.querySelectorAll('.sr').forEach(el => srObserver.observe(el));
