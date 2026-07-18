// panel-spy.js — updates the fixed side panel to match the project section in view.
// Pages define window.PANEL_STATES = { key: {title, tag, intro, meta, facts:[[dt,dd],...]} }
// and mark stream regions with data-proj="key".
(function () {
  var states = window.PANEL_STATES;
  if (!states) { return; }
  var live = document.getElementById('gv-live');
  var titleEl = document.querySelector('[data-live-title]');
  var tagEl = document.querySelector('[data-live-tag]');
  var introEl = document.querySelector('[data-live-intro]');
  var metaEl = document.querySelector('[data-live-meta]');
  var factsEl = document.querySelector('[data-live-facts]');
  var cur = null;

  function apply(key) {
    var s = states[key];
    if (!s || key === cur) { return; }
    cur = key;
    if (live) { live.classList.add('gv-live-swap'); }
    setTimeout(function () {
      if (titleEl && s.title != null) { titleEl.innerHTML = s.title; }
      if (tagEl && s.tag != null) { tagEl.innerHTML = s.tag; }
      if (metaEl && s.meta != null) { metaEl.innerHTML = s.meta; }
      if (introEl) {
        if (s.intro) { introEl.style.display = ''; introEl.innerHTML = s.intro; }
        else { introEl.style.display = 'none'; }
      }
      if (factsEl && s.facts) {
        factsEl.innerHTML = s.facts.map(function (f) {
          return '<div class="cs-fact"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
        }).join('');
      }
      if (live) { live.classList.remove('gv-live-swap'); }
    }, 150);
  }

  var secs = [].slice.call(document.querySelectorAll('[data-proj]'));
  if (!secs.length) { return; }

  // Reading-position spy: the active topic is the last section whose top has
  // scrolled above a probe line near the top of the viewport. The panel only
  // switches once you've scrolled through a topic to its end and the next one
  // reaches the top — not while the previous topic still fills the screen.
  function update() {
    var probe = window.innerHeight * 0.12;
    var active = secs[0];
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].getBoundingClientRect().top - probe <= 0) { active = secs[i]; }
    }
    apply(active.getAttribute('data-proj'));
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
