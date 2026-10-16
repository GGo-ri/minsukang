document.getElementById('year').textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute('href')));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => section && navObserver.observe(section));

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
