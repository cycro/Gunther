// Utility: throttle
function throttle(fn, wait = 100) {
  let last = 0; let timeout; let storedArgs; let storedThis;
  return function(...args) {
    const now = Date.now();
    storedArgs = args; storedThis = this;
    if (now - last >= wait) {
      last = now; fn.apply(storedThis, storedArgs);
    } else if (!timeout) {
      timeout = setTimeout(() => { last = Date.now(); timeout = null; fn.apply(storedThis, storedArgs); }, wait - (now - last));
    }
  }
}

// Theme Toggle & Persistenz
function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;
  if (stored === 'dark' || (!stored && prefersDark)) html.classList.add('dark');
  updateThemeMeta();
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      html.classList.toggle('dark');
      html.classList.add('theme-transition');
      setTimeout(()=> html.classList.remove('theme-transition'), 700);
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      btn.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
      updateThemeMeta();
    });
  }
}

function updateThemeMeta() {
  const meta = document.getElementById('meta-theme-color');
  if (meta) meta.setAttribute('content', document.documentElement.classList.contains('dark') ? '#0f1115' : '#667eea');
}

// Mobile Navigation Toggle (erweitert für ARIA)
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      const active = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', active);
      hamburger.setAttribute('aria-expanded', active ? 'true' : 'false');
      document.body.style.overflow = (active && window.innerWidth < 769) ? 'hidden' : '';
    };
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keypress', e => { if (e.key === 'Enter') toggleMenu(); });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }));
  }
});

// Smooth Scrolling für Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    }
  });
});

// Header Veränderung bei Scroll
window.addEventListener('scroll', throttle(function() {
  const header = document.querySelector('header');
  if (!header) return;
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.92)';
    header.style.boxShadow = '0 4px 24px -6px rgba(0,0,0,0.12)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.85)';
    header.style.boxShadow = 'none';
  }
  if (document.documentElement.classList.contains('dark')) {
    if (window.scrollY > 100) header.style.background = 'rgba(15,17,21,0.85)'; else header.style.background = 'rgba(15,17,21,0.8)';
  }
}, 80));

// Scroll Progress Bar
function updateScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTop / scrollHeight) * 100;
  progress.style.width = percent + '%';
}
window.addEventListener('scroll', throttle(updateScrollProgress, 30));

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 600) backToTopBtn.classList.add('show'); else backToTopBtn.classList.remove('show');
  }, 80));
}

// Kontakt Formular Handling (mit Feedback Element)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = form.querySelector('.form-feedback');
    const submitButton = form.querySelector('.submit-button');

    function showFeedback(msg, type = 'info') {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.style.color = type === 'error' ? '#e11d48' : (type === 'success' ? '#059669' : 'inherit');
    }

    if (!name || !email || !message) { showFeedback('Bitte alle Felder ausfüllen.', 'error'); return; }
    if (!isValidEmail(email)) { showFeedback('Ungültige E-Mail-Adresse.', 'error'); return; }

    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    showFeedback('Sende Nachricht...', 'info');

    setTimeout(() => {
      showFeedback('Danke für Ihre Nachricht! Ich melde mich bald.', 'success');
      form.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1400);
  });
}

// Email validation
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

// Scroll Animation (IntersectionObserver)
function initReveal() {
  const elements = document.querySelectorAll('.service-card, .about-text, .contact-info, .placeholder-image');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(32px)'; el.style.transition = 'opacity .7s ease, transform .7s ease'; observer.observe(el); });
}

// Active Nav Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  let current = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom > 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === `#${current}`); });
}
window.addEventListener('scroll', throttle(updateActiveNavLink, 120));

// Typing Effekt (leicht optimiert)
function typeWriter(element, text, speed = 100) {
  if (!element) return;
  let i = 0; element.innerHTML = '';
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i); i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Testimonials Slider
function initTestimonials() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;
  const items = Array.from(slider.querySelectorAll('.testimonial'));
  const dotsContainer = document.querySelector('.testimonial-dots');
  let index = 0; let autoTimer;

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Testimonial ${i+1}`);
      btn.addEventListener('click', () => setIndex(i, true));
      dotsContainer.appendChild(btn);
    });
  }

  function setIndex(i, manual=false) {
    index = (i + items.length) % items.length;
    items.forEach((el, idx) => el.classList.toggle('active', idx === index));
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
    if (manual) restartAuto();
  }

  function next() { setIndex(index + 1); }

  function startAuto() { autoTimer = setInterval(next, 5000); }
  function restartAuto() { clearInterval(autoTimer); startAuto(); }

  renderDots();
  setIndex(0);
  startAuto();

  // Pause bei Hover / Fokus
  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', restartAuto);
  slider.addEventListener('focusin', () => clearInterval(autoTimer));
  slider.addEventListener('focusout', restartAuto);
}

// Tilt Effekt für Karten (leichtes Parallax)
function initTilt() {
  const cards = document.querySelectorAll('.service-card');
  const maxTilt = 8;
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * (maxTilt * 2);
      const rotateX = ((y / rect.height) - 0.5) * (maxTilt * -2);
      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Hero Parallax (subtil)
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', throttle(() => {
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = (offset * 0.4) + 'px';
  }, 50));
}

// Jahreszahl setzen
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// Initialisierung nach Laden
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 60);
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.getAttribute('data-original') || heroTitle.textContent;
    heroTitle.setAttribute('data-original', originalText);
    setTimeout(() => { typeWriter(heroTitle, originalText, 120); }, 400);
  }
  initTheme();
  initReveal();
  initTestimonials();
  initTilt();
  initHeroParallax();
  setYear();
  updateScrollProgress();
  updateActiveNavLink();
});

// Resize Handling
function handleResize() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (window.innerWidth > 768 && navMenu && hamburger) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
}
window.addEventListener('resize', throttle(handleResize, 150));