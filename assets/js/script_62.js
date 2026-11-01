
  (function () {
    var root = document.getElementById('cpr-hs-template--27508218462251__cpr_hero_scroll_7_9BNbMM');
    if (!root) return;
    var ticking = false;
    function update() {
      ticking = false;
      var r = root.getBoundingClientRect();
      var range = root.offsetHeight - window.innerHeight;   // scrollable distance while pinned
      var p = range > 0 ? -r.top / range : 1;
      p = Math.max(0, Math.min(1, p));
      root.style.setProperty('--p', p.toFixed(4));
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    document.addEventListener('shopify:section:load', function (e) { if (e.target.contains(root)) update(); });
  })();
