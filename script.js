// Mission Dog Walking — script.js
// The page is fully functional without JavaScript: every class used for motion
// is added here at runtime, so with JS off nothing is ever left hidden.
// All of it is skipped when the visitor prefers reduced motion.

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  var doc = document.documentElement;

  /* ---- 1. Sticky header gains depth once you leave the hero ------------ */
  var topbar = document.querySelector('.topbar');
  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- 2. Hero settles in on load ------------------------------------- */
  doc.classList.add('js-motion');

  /* ---- 3. Scroll reveals ---------------------------------------------- */
  if (!('IntersectionObserver' in window)) return;

  // Items inside these grids animate in sequence rather than all at once.
  var GROUPS = '.rates, .steps, .reviews';
  Array.prototype.forEach.call(document.querySelectorAll(GROUPS), function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', i);
      child.classList.add('reveal-item');
    });
  });

  // Everything else reveals on its own as it arrives.
  var SINGLES = [
    '.section__title', '.rates__intro', '.with-photo', '.section-cta',
    '.band__eyebrow', '.band__text', '.section--brand .button',
    '.reviews__summary', '.footer__title', '.footer__text',
    '.footer .button', '.footer__contact'
  ].join(', ');
  Array.prototype.forEach.call(document.querySelectorAll(SINGLES), function (el) {
    el.classList.add('reveal-item');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  Array.prototype.forEach.call(document.querySelectorAll('.reveal-item'), function (el) {
    observer.observe(el);
  });
})();
