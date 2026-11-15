document.getElementById('year').textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute('href')));

let scrollLock = null;

function setCurrent(current) {
  sections.forEach((section) => section && section.classList.toggle('is-current', section === current));
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', !!current && link.getAttribute('href') === `#${current.id}`);
  });
}

function updateCurrent() {
  if (scrollLock) return;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return setCurrent(sections[sections.length - 1]);
  const line = document.querySelector('.site-header').offsetHeight + 60;
  let current = null;
  sections.forEach((section) => {
    if (section && section.getBoundingClientRect().top <= line) current = section;
  });
  setCurrent(current);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateCurrent();
    ticking = false;
  });
}, { passive: true });
window.addEventListener('resize', updateCurrent);
['wheel', 'touchstart', 'keydown'].forEach((type) => {
  window.addEventListener(type, () => {
    scrollLock = null;
  }, { passive: true });
});
updateCurrent();

const revealTargets = document.querySelectorAll('.section, .project');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: '0px 0px -10% 0px' }
);

revealTargets.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function smoothScrollTo(target) {
  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const end = Math.min(
    target.getBoundingClientRect().top + start - offset,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const distance = end - start;
  const duration = Math.min(1100, Math.max(500, Math.abs(distance) * 0.5));
  const startTime = performance.now();

  document.documentElement.style.scrollBehavior = 'auto';

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOut(progress));
    if (progress < 1) return requestAnimationFrame(step);
    document.documentElement.style.scrollBehavior = '';
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (sections.includes(target)) {
      scrollLock = target;
      setCurrent(target);
    }
    smoothScrollTo(target);
    history.replaceState(null, '', link.getAttribute('href'));
  });
});
