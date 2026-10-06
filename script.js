const header = document.getElementById('siteHeader');
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

function closeMenu() {
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
  header?.classList.remove('menu-active');
  document.body.classList.remove('menu-open');
}

toggle?.addEventListener('click', () => {
  const open = !nav?.classList.contains('open');
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('open', open);
  header?.classList.toggle('menu-active', open);
  document.body.classList.toggle('menu-open', open);
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
  revealObserver.observe(el);
});

// Piccolo effetto di coriandoli solo all'apertura: visibile, ma non invadente.
const confetti = document.getElementById('confetti');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (confetti && !reducedMotion) {
  const colors = ['#e30613', '#ffffff', '#f6c945', '#3a6ea5', '#151515'];
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    piece.style.animationDuration = `${5.5 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 2.7}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }
  window.setTimeout(() => confetti.replaceChildren(), 11000);
}

// Parallax leggerissimo nella hero, disattivato su dispositivi che preferiscono meno movimento.
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto && !reducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking && window.scrollY < window.innerHeight) {
      window.requestAnimationFrame(() => {
        heroPhoto.style.translate = `0 ${window.scrollY * 0.08}px`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
