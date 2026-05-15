import { animate, createTimeline, scrambleText } from 'https://esm.sh/animejs';

// ─── SCRAMBLE on page load only ────────────────────────────────────────────

const scrambleDefaults = {
  chars: 'lowercase',
  duration: 700,
  settleDuration: 200,
  perturbation: 0.15,
  cursor: '░▒▓█',
  from: 'left',
  ease: 'out(2)',
};

const intro = createTimeline({ delay: 300 });

document.querySelectorAll('.scramble-target').forEach((el, i) => {
  if (!el.textContent.trim()) return;
  intro.add(el, {
    innerHTML: scrambleText({
      ...scrambleDefaults,
      override: '',
      duration: 800,
      perturbation: 0.2,
    }),
  }, i * 40);
});

intro.init();

// ─── MORPH on hover for hero name only ─────────────────────────────────────

const heroName = document.querySelector('.hero-name-morph');
if (heroName) {
  heroName.style.animation = 'none'; // stop auto-loop
  heroName.addEventListener('pointerenter', () => {
    heroName.style.animation = 'morphPulse 2s ease-in-out 1';
    heroName.addEventListener('animationend', () => {
      heroName.style.animation = 'none';
    }, { once: true });
  });
}
