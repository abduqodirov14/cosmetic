
/* Aardvark-style fan cards — vanilla JS replica of the GSAP behaviour
   (elastic.out(1, 0.75), 0.85s; hover: straighten + scale, neighbours push 45%/distance) */
(function () {
  if (window.__aflowInitDefined) { window.__aflowInitAll(); return; }
  window.__aflowInitDefined = true;

  var TWO_PI = Math.PI * 2;
  function elasticOut(p) {            /* GSAP elastic.out(1, 0.75) */
    if (p <= 0) return 0; if (p >= 1) return 1;
    var period = 0.75, p3 = 0.1875;
    return Math.pow(2, -10 * p) * Math.sin((p - p3) * (TWO_PI / period)) + 1;
  }
  function rnd(range) { return (Math.random() - 0.5) * range; }

  function init(root) {
    if (!root || root.__aflow) return;
    root.__aflow = true;

    var list  = root.querySelector('[data-flow-list]');
    var items = [].slice.call(root.querySelectorAll('[data-flow-item]'));
    var cards = items.map(function (i) { return i.querySelector('[data-flow-card]'); });
    var n = items.length;
    if (!list || !n) return;

    var reduce     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hoverOn    = root.getAttribute('data-hover') !== 'false';
    var entranceOn = root.getAttribute('data-entrance') !== 'false' && !reduce;
    var tilt   = parseFloat(root.getAttribute('data-tilt'))  || 0;   /* max degrees  (±tilt)  */
    var shift  = parseFloat(root.getAttribute('data-shift')) || 0;   /* max % offset (±shift) */
    var push   = parseFloat(root.getAttribute('data-push'));
    if (isNaN(push)) push = 45;
    var scale  = parseFloat(root.getAttribute('data-scale')) || 1.075;
    var dur    = parseFloat(root.getAttribute('data-duration')) || 850;
    var isDesktop = function () { return window.matchMedia('(min-width: 992px)').matches; };
    var isTouch   = window.matchMedia('(hover: none)').matches;

    /* --- tiny tween engine ------------------------------------ */
    function st(el) { return el.__st || (el.__st = { x: 0, y: 0, r: 0, s: 1, raf: null }); }
    function apply(el) {
      var s = st(el);
      el.style.transform = 'translate(' + s.x + '%,' + s.y + '%) rotate(' + s.r + 'deg) scale(' + s.s + ')';
    }
    function tween(el, to, ms, delay) {
      var s = st(el);
      if (s.raf) { cancelAnimationFrame(s.raf); s.raf = null; }
      if (reduce || ms <= 0) { for (var k in to) s[k] = to[k]; apply(el); return; }
      var from = { x: s.x, y: s.y, r: s.r, s: s.s }, keys = Object.keys(to);
      var t0 = performance.now() + (delay || 0);
      function step(now) {
        var p = (now - t0) / ms;
        if (p < 0) { s.raf = requestAnimationFrame(step); return; }
        if (p > 1) p = 1;
        var e = elasticOut(p);
        for (var i = 0; i < keys.length; i++) { var k = keys[i]; s[k] = from[k] + (to[k] - from[k]) * e; }
        apply(el);
        s.raf = p < 1 ? requestAnimationFrame(step) : null;
      }
      s.raf = requestAnimationFrame(step);
    }

    /* --- initial random pose (same ranges as original) -------- */
    items.forEach(function (it) {
      var s = st(it);
      s.x = rnd(shift * 2); s.y = rnd(shift * 2); s.r = rnd(tilt * 1.5);
      apply(it);
    });
    cards.forEach(function (c) { apply(c); });

    /* --- entrance: drop in from below, elastic, staggered ------ */
    if (entranceOn) {
      var rest = items.map(function (it) { var s = st(it); return { x: s.x, y: s.y, r: s.r }; });
      items.forEach(function (it, i) {
        var s = st(it); s.y = rest[i].y + 150; s.r = rnd(tilt * 1.5); apply(it);
      });
      var play = function () {
        items.forEach(function (it, i) {
          tween(it, { y: rest[i].y, r: rest[i].r }, dur * 1.25, i * 88);
        });
      };
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          if (entries.some(function (e) { return e.isIntersecting; })) { play(); io.disconnect(); }
        }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
        io.observe(list);
      } else { play(); }
    }

    /* --- hover logic ------------------------------------------ */
    var current = 0;
    function newPortion(i) {
      items[i].classList.add('is-active');
      tween(items[i], { x: 0, y: 0, r: 0, s: scale }, dur);
      if (isDesktop()) {
        cards.forEach(function (c, idx) {
          tween(c, { x: idx === i ? 0 : push / (idx - i) }, dur);
        });
      }
    }
    function resetPortion(i) {
      items[i].classList.remove('is-active');
      tween(items[i], { x: rnd(shift * 2), y: rnd(shift * 2), r: rnd(tilt * 2), s: 1 }, dur);
    }
    function resetAll() {
      if (current > 0) resetPortion(current - 1);
      current = 0;
      cards.forEach(function (c) { tween(c, { x: 0 }, dur); });
    }

    if (hoverOn) {
      list.addEventListener('mousemove', function (e) {
        if (!isDesktop() || isTouch) return;
        var rect = list.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        var active = Math.ceil(pct * n);
        if (current !== active && active > 0 && active <= n) {
          if (current !== 0) resetPortion(current - 1);
          current = active;
          newPortion(current - 1);
        }
      });
      list.addEventListener('mouseleave', function () { if (!isTouch) resetAll(); });

      /* touch devices: tap a card to focus it, tap again (or elsewhere) to release */
      items.forEach(function (it, i) {
        it.addEventListener('click', function (e) {
          if (!isTouch) return;
          if (cards[i].tagName === 'A' && current === i + 1) return;   /* 2nd tap follows link */
          if (cards[i].tagName === 'A') e.preventDefault();
          if (current === i + 1) { resetAll(); return; }
          if (current !== 0) resetPortion(current - 1);
          current = i + 1;
          newPortion(i);
        });
      });
      document.addEventListener('click', function (e) {
        if (isTouch && current && !list.contains(e.target)) resetAll();
      });
    }
  }

  window.__aflowInitAll = function () {
    [].forEach.call(document.querySelectorAll('[data-aflow]'), init);
  };
  window.__aflowInitAll();

  /* Shopify theme editor support */
  document.addEventListener('shopify:section:load', function (e) {
    var root = e.target && e.target.querySelector ? e.target.querySelector('[data-aflow]') : null;
    if (root) init(root);
  });
})();
