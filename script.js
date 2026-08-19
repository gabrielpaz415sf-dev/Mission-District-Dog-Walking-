// Mission Mutts — script.js
// The page works fully without JavaScript. This only adds a subtle scroll reveal,
// and it is skipped entirely when the visitor prefers reduced motion.

// Sections fade up once as they scroll into view. The .reveal class is added
// here (not in the HTML) so content is always visible without JS.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var sections = document.querySelectorAll('main > .section');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  sections.forEach(function (section) {
    section.classList.add('reveal');
    observer.observe(section);
  });
})();
