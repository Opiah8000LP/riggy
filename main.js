import { animate, createTimeline, scrambleText } from 'https://esm.sh/animejs';

// ─── SCRAMBLE on hover for all .scramble-target elements ───────────────────

const scrambleDefaults = {
  chars: 'lowercase',
  duration: 600,
  settleDuration: 200,
  perturbation: 0.15,
  cursor: '░▒▓',
  from: 'left',
  ease: 'out(2)',
};

// Intro — stagger scramble everything in on page load
const intro = createTimeline({ delay: 300, defaults: { duration: 700 } });

document.querySelectorAll('.scramble-target').forEach((el, i) => {
  // Skip empty / purely structural elements
  if (!el.textContent.trim()) return;

  // Intro reveal with stagger
  intro.add(el, {
    innerHTML: scrambleText({
      ...scrambleDefaults,
      override: '',        // start from empty
      duration: 800,
      perturbation: 0.2,
      cursor: '░▒▓█',
    }),
  }, i * 40);             // 40ms stagger between elements

  // Hover to replay scramble
  const replay = () => {
    animate(el, {
      innerHTML: scrambleText({
        ...scrambleDefaults,
        text: el.textContent,  // scramble back to current text
      }),
      duration: scrambleDefaults.duration,
    });
  };

  el.addEventListener('pointerenter', replay);
});

intro.init();
