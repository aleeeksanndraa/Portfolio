// Shared behaviors: scroll reveals + tweak var application
(function () {
  // scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
    io.observe(el);
  });
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
