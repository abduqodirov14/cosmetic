
  (function () {
    function initCurvedStats(root) {
      if (!root || root.dataset.csReady === '1') return;
      root.dataset.csReady = '1';

      var svg = root.querySelector('svg');
      var path = svg.querySelector('path');
      var textPath = svg.querySelector('textPath');
      var copySrc = svg.querySelector('[data-cs-copy]');
      var cfg = JSON.parse(root.querySelector('[data-cs-config]').textContent);
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      var copyLen = 0, pathLen = 0, ticking = false, built = false;
      var sign = cfg.direction === 'ltr' ? 1 : -1;

      function isMobile() { return window.innerWidth < 750; }

      function buildPath() {
        var w = root.clientWidth || 1;
        var h = svg.getBoundingClientRect().height; // may be 0 — text then centres on the section's edge
        var a = isMobile() ? cfg.amplitudeMobile : cfg.amplitude;
        var pad = cfg.overflow;
        var mid = h / 2;
        var d;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

        if (cfg.shape === 'arch') {
          // Quadratic arch: apex sits at mid - a
          d = 'M' + (-pad) + ',' + (mid + a) + ' Q' + (w / 2) + ',' + (mid - 3 * a) + ' ' + (w + pad) + ',' + (mid + a);
        } else if (cfg.shape === 'bowl') {
          d = 'M' + (-pad) + ',' + (mid - a) + ' Q' + (w / 2) + ',' + (mid + 3 * a) + ' ' + (w + pad) + ',' + (mid - a);
        } else if (cfg.shape === 'rise') {
          // Gentle rise left → right (closest to the Aardvark reference)
          d = 'M' + (-pad) + ',' + (mid + a) + ' C' + (w * 0.35) + ',' + (mid + a) + ' ' + (w * 0.65) + ',' + (mid - a) + ' ' + (w + pad) + ',' + (mid - a);
        } else {
          // S-wave
          d = 'M' + (-pad) + ',' + (mid + a) + ' C' + (w * 0.3) + ',' + (mid - a) + ' ' + (w * 0.7) + ',' + (mid + a) + ' ' + (w + pad) + ',' + (mid - a);
        }
        path.setAttribute('d', d);
        pathLen = path.getTotalLength();
      }

      function appendCopy() {
        var kids = copySrc.childNodes;
        for (var i = 0; i < kids.length; i++) {
          textPath.appendChild(kids[i].cloneNode(true));
        }
      }

      function buildText() {
        while (textPath.firstChild) textPath.removeChild(textPath.firstChild);
        appendCopy();
        copyLen = textPath.getComputedTextLength();
        if (!copyLen) return;
        // Keep a single sentence. Never duplicate it to fill the path.
        built = true;
      }

      function scrollDistance() {
        var r = root.getBoundingClientRect();
        return (window.innerHeight - r.top) * cfg.speed;
      }

      function render() {
        ticking = false;
        if (!built || !copyLen) return;
        var r = root.getBoundingClientRect();
        var total = pathLen + copyLen;
        var distance;

        if (cfg.mode === 'fit') {
          // One complete pass over the visible scroll range, reversible on scroll up.
          var travel = Math.max(1, window.innerHeight + r.height);
          var progress = Math.max(0, Math.min(1, (window.innerHeight - r.top) / travel));
          distance = progress * total;
        } else {
          // Stop at either end instead of wrapping back to the beginning.
          distance = Math.max(0, Math.min(total, scrollDistance()));
        }
        var offset = sign === -1 ? pathLen - distance : -copyLen + distance;
        if (reduce) offset = Math.max(0, (pathLen - copyLen) / 2);
        textPath.setAttribute('startOffset', offset);
      }

      function requestRender() {
        if (!ticking) { ticking = true; requestAnimationFrame(render); }
      }

      function rebuild() {
        buildPath();
        buildText();
        render();
      }

      function start() {
        rebuild();
        window.addEventListener('scroll', requestRender, { passive: true });
        window.addEventListener('resize', rebuild);
        if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(root);

      }

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start);
      } else {
        start();
      }
    }

    function initAll() {
      document.querySelectorAll('[data-curved-stats]').forEach(initCurvedStats);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }

    // Theme editor support
    document.addEventListener('shopify:section:load', function (e) {
      var el = e.target.querySelector('[data-curved-stats]');
      if (el) { el.dataset.csReady = ''; initCurvedStats(el); }
    });
  })();
