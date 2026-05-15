// ─── VANILLA SCRAMBLE — no dependencies ────────────────────────────────────

const CHARS = 'abcdefghijklmnopqrstuvwxyz░▒▓█@#$%&';
const DURATION = 600;   // total ms for the scramble
const FPS = 40;         // updates per second

function scramble(el) {
  const original = el.dataset.original;
  if (!original || el._scrambling) return;
  el._scrambling = true;

  const frames = Math.round((DURATION / 1000) * FPS);
  let frame = 0;

  const interval = setInterval(() => {
    frame++;
    const progress = frame / frames; // 0 → 1

    // Each character reveals itself once progress passes its threshold
    el.textContent = original.split('').map((char, i) => {
      if (char === ' ') return ' ';
      const revealAt = i / original.length; // left-to-right reveal
      if (progress >= revealAt + 0.3) return char; // fully revealed
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');

    if (frame >= frames) {
      clearInterval(interval);
      el.textContent = original; // always end on the real text
      el._scrambling = false;
    }
  }, 1000 / FPS);
}

// Store originals and run scramble on load + hover
document.querySelectorAll('.scramble-target').forEach((el, i) => {
  el.dataset.original = el.textContent.trim();

  // Load-in: staggered
  setTimeout(() => scramble(el), 200 + i * 40);

  // Hover
  el.addEventListener('mouseenter', () => scramble(el));
});

// ─── MORPH on hover for hero name ──────────────────────────────────────────

const heroName = document.querySelector('.hero-name-morph');
if (heroName) {
  let morphing = false;
  heroName.style.transition = 'filter 0.4s ease, opacity 0.4s ease';

  heroName.addEventListener('mouseenter', () => {
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
  });
}

// ─── GAME CARD SLIDESHOW ────────────────────────────────────────────────────

document.querySelectorAll('.game-card').forEach(card => {
  const slides = card.querySelectorAll('.game-card-slide');
  if (!slides.length) return;
  let timer = null;
  let idx = 0;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    if (n >= 0) slides[n].classList.add('active');
  }

  card.addEventListener('mouseenter', () => {
    idx = 0;
    showSlide(idx);
    timer = setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 1000);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = null;
    showSlide(-1);
  });
});
