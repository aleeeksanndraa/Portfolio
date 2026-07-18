// Shared behaviors: scroll reveals + tweak var application
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  function revealAll() { els.forEach(function (el) { el.classList.add('in'); }); }
  // If IntersectionObserver is unavailable, just show everything.
  if (!('IntersectionObserver' in window)) { revealAll(); return; }
  try {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
    // Safety net: never leave content hidden if the observer misfires.
    setTimeout(revealAll, 2500);
  } catch (err) { revealAll(); }
})();

// mobile burger menu
(function () {
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav-burger');
  if (!nav || !burger) { return; }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  Array.prototype.forEach.call(nav.querySelectorAll('.nav-links a'), function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();
