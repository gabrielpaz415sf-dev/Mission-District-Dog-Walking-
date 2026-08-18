// Bryant Street Buddies — script.js
// The page works fully without JavaScript. This only adds tap-to-wag on touch
// devices (desktop already wags on hover via CSS) and respects reduced motion.
(function () {
  var mascot = document.querySelector('.mascot');
  if (!mascot) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  mascot.addEventListener('click', function () {
    if (reduceMotion.matches) return;
    mascot.classList.remove('is-wagging');
    void mascot.offsetWidth; // restart the animation if tapped mid-wag
    mascot.classList.add('is-wagging');
  });

  // animationend bubbles up from the #tail group inside the SVG.
  mascot.addEventListener('animationend', function () {
    mascot.classList.remove('is-wagging');
  });
})();
