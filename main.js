import { animate, createTimeline, scrambleText } from 'https://esm.sh/animejs';

// ─── SCRAMBLE — on load + on hover ─────────────────────────────────────────

const scrambleOpts = {
  chars: 'lowercase',
  duration: 700,
  settleDuration: 300,
  perturbation: 0.15,
  cursor: '░▒▓█',
  from: 'left',
  ease: 'out(2)',
};

// Store originals before anything touches the DOM
document.querySelectorAll('.scramble-target').forEach(el => {
  el.dataset.original = el.textContent.trim();
});

// Load-in: staggered scramble reveal
const intro = createTimeline({ delay: 200 });
document.querySelectorAll('.scramble-target').forEach((el, i) => {
  if (!el.dataset.original) return;
  intro.add(el, {
    innerHTML: scrambleText({ ...scrambleOpts, text: el.dataset.original }),
  }, i * 35);
});
intro.init();

// Safety net: hard-restore stuck elements after all staggered anims finish
setTimeout(() => {
  document.querySelectorAll('.scramble-target').forEach(el => {
    if (el.dataset.original && el.textContent.trim() !== el.dataset.original) {
      el.textContent = el.dataset.original;
    }
  });
}, 7000);

// Hover: replay scramble on each element individually
document.querySelectorAll('.scramble-target').forEach(el => {
  el.addEventListener('pointerenter', () => {
    const original = el.dataset.original || el.textContent.trim();
    animate(el, {
      innerHTML: scrambleText({ ...scrambleOpts, text: original }),
    });
  });
});

// ─── MORPH on hover for hero name ──────────────────────────────────────────

const heroName = document.querySelector('.hero-name-morph');
if (heroName) {
  let morphing = false;
  heroName.addEventListener('pointerenter', () => {
    if (morphing) return;
    morphing = true;
    animate(heroName, {
      filter: ['blur(0px)', 'blur(14px)'],
      opacity: [1, 0.6],
      duration: 400,
      ease: 'in(2)',
      onComplete: () => {
        animate(heroName, {
          filter: ['blur(14px)', 'blur(0px)'],
          opacity: [0.6, 1],
          duration: 500,
          ease: 'out(2)',
          onComplete: () => {
            heroName.style.filter = '';
            heroName.style.opacity = '';
            morphing = false;
          }
        });
      }
    });
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
