// ─── VANILLA SCRAMBLE — load + hover + touch ──────────────────────────────

const CHARS = 'abcdefghijklmnopqrstuvwxyz░▒▓█@#$%&';
const DURATION = 600;
const FPS = 40;

function scramble(el) {
  const original = el.dataset.original;
  if (!original || el._scrambling) return;
  el._scrambling = true;
  const frames = Math.round((DURATION / 1000) * FPS);
  let frame = 0;
  const interval = setInterval(() => {
    frame++;
    const progress = frame / frames;
    el.textContent = original.split('').map((char, i) => {
      if (char === ' ') return ' ';
      const revealAt = i / original.length;
      if (progress >= revealAt + 0.3) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (frame >= frames) {
      clearInterval(interval);
      el.textContent = original;
      el._scrambling = false;
    }
  }, 1000 / FPS);
}

document.querySelectorAll('.scramble-target').forEach((el, i) => {
  el.dataset.original = el.textContent.trim();
  setTimeout(() => scramble(el), 200 + i * 40);
  el.addEventListener('mouseenter', () => scramble(el));
  el.addEventListener('touchstart', () => scramble(el), { passive: true });
});

// ─── MORPH on hover + tap for hero name ───────────────────────────────────

const heroName = document.querySelector('.hero-name-morph');
if (heroName) {
  let morphing = false;
  heroName.style.transition = 'filter 0.4s ease, opacity 0.4s ease';

  function doMorph() {
    if (morphing) return;
    morphing = true;
    heroName.style.filter = 'blur(14px)';
    heroName.style.opacity = '0.6';
    setTimeout(() => {
      heroName.style.filter = 'blur(0px)';
      heroName.style.opacity = '1';
      setTimeout(() => {
        heroName.style.filter = '';
        heroName.style.opacity = '';
        morphing = false;
      }, 500);
    }, 400);
  }

  heroName.addEventListener('mouseenter', doMorph);
  heroName.addEventListener('touchstart', doMorph, { passive: true });
}

// ─── GAME CARD SLIDESHOW — hover + tap ────────────────────────────────────

document.querySelectorAll('.game-card').forEach(card => {
  const slides = card.querySelectorAll('.game-card-slide');
  if (!slides.length) return;
  let timer = null;
  let idx = 0;
  let touchActive = false;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    if (n >= 0) slides[n].classList.add('active');
  }

  function startSlideshow() {
    idx = 0;
    showSlide(idx);
    timer = setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 1000);
  }

  function stopSlideshow() {
    clearInterval(timer);
    timer = null;
    showSlide(-1);
  }

  // Mouse
  card.addEventListener('mouseenter', startSlideshow);
  card.addEventListener('mouseleave', stopSlideshow);

  // Touch: tap to toggle on/off
  card.addEventListener('touchstart', (e) => {
    if (!touchActive) {
      touchActive = true;
      startSlideshow();
    } else {
      touchActive = false;
      stopSlideshow();
    }
  }, { passive: true });
});

// ─── HAMBURGER NAV for mobile ──────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav-open');
    hamburger.classList.toggle('ham-open', open);
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('ham-open');
    });
  });
}
