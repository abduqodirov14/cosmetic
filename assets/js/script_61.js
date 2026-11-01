
  (function () {
    function initOne(section) {
      if (section.dataset.svInit === 'true') return;
      var video = section.querySelector('video');
      var sticky = section.querySelector('.sv-sticky');
      if (!video || !sticky) return;
      section.dataset.svInit = 'true';

      var mode = section.dataset.mode;

      /* --- Desktop / mobile source switching --- */
      var desktopSrc = video.dataset.desktop || '';
      var mobileSrc = video.dataset.mobile || '';
      if (mobileSrc.indexOf('http') !== 0) mobileSrc = desktopSrc; /* mobile not set yet -> use desktop */
      var mq = window.matchMedia('(max-width: 749px)');

      function applySrc() {
        var want = mq.matches ? mobileSrc : desktopSrc;
        if (video.getAttribute('src') !== want) {
          video.setAttribute('src', want);
          video.load();
        }
      }

      /* --- Pause while any theme overlay/scroll-lock is active.
             Add your theme's class names here if different. --- */
      function bodyLocked() {
        var b = document.body;
        if (!b) return false;
        if (
          b.classList.contains('overflow-hidden') ||
          b.classList.contains('menu-open') ||
          b.classList.contains('drawer-open') ||
          b.classList.contains('modal-open') ||
          b.classList.contains('no-scroll')
        ) return true;
        if (b.style.overflow === 'hidden') return true;
        var cs = getComputedStyle(b);
        if (cs.overflow === 'hidden' || cs.overflowY === 'hidden') return true;
        return false;
      }

      /* --- Autoplay-when-visible mode --- */
      if (mode === 'autoplay') {
        applySrc();
        if (mq.addEventListener) { mq.addEventListener('change', applySrc); } else { mq.addListener(applySrc); }
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !bodyLocked()) { video.play().catch(function () {}); }
            else { video.pause(); }
          });
        }, { threshold: 0.25 }).observe(section);
        return;
      }

      /* --- Scrub-with-scroll mode --- */
      var duration = 0;
      var target = 0;
      var current = 0;
      var active = false;
      var rafId = null;

      /* If any ancestor still has overflow: hidden, position: sticky is dead —
         switch to JS-driven pinning instead.
         IMPORTANT: stop before body/html so we never fight the theme's
         menu scroll-lock (which lives on body/html). */
      function stickyBroken() {
        var node = section.parentElement;
        while (node && node !== document.body && node !== document.documentElement) {
          var cs = getComputedStyle(node);
          if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') return true;
          node = node.parentElement;
        }
        return false;
      }
      var jsPin = stickyBroken();
      if (jsPin) {
        sticky.style.position = 'absolute';
        sticky.style.top = '0';
        sticky.style.left = '0';
        sticky.style.width = '100%';
      }

      function updatePin(rect) {
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          sticky.style.position = 'fixed';
          sticky.style.top = '0';
          sticky.style.bottom = '';
          sticky.style.left = rect.left + 'px';
          sticky.style.width = rect.width + 'px';
        } else if (rect.bottom < window.innerHeight) {
          sticky.style.position = 'absolute';
          sticky.style.top = 'auto';
          sticky.style.bottom = '0';
          sticky.style.left = '0';
          sticky.style.width = '100%';
        } else {
          sticky.style.position = 'absolute';
          sticky.style.top = '0';
          sticky.style.bottom = '';
          sticky.style.left = '0';
          sticky.style.width = '100%';
        }
      }

      video.addEventListener('loadedmetadata', function () {
        duration = video.duration;
        if (current > duration) current = duration;
        if (target > duration) target = duration;
      });

      applySrc();
      if (mq.addEventListener) { mq.addEventListener('change', applySrc); } else { mq.addListener(applySrc); }

      /* iOS: a one-time play/pause on first touch unlocks programmatic seeking */
      window.addEventListener('touchstart', function () {
        video.play().then(function () { video.pause(); }).catch(function () {});
      }, { once: true, passive: true });

      function tick() {
        /* If the theme opened a menu/modal, stop scrubbing and yield. */
        if (bodyLocked()) {
          active = false;
          if (rafId) cancelAnimationFrame(rafId);
          return;
        }

        var rect = section.getBoundingClientRect();
        if (jsPin) updatePin(rect);

        var scrollable = rect.height - window.innerHeight;
        if (scrollable > 0 && duration) {
          var progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
          target = progress * duration;
        }

        current += (target - current) * 0.15;
        if (Math.abs(target - current) < 0.001) current = target;
        if (duration && !video.seeking && Math.abs(video.currentTime - current) > 0.01) {
          try { video.currentTime = current; } catch (e) {}
        }
        if (active) rafId = requestAnimationFrame(tick);
      }

      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !active && !bodyLocked()) { active = true; tick(); }
          else if (!e.isIntersecting) { active = false; if (rafId) cancelAnimationFrame(rafId); }
        });
      }, { rootMargin: '25% 0px' }).observe(section);
    }

    function initAll() {
      document.querySelectorAll('.sv-scroll-video').forEach(initOne);
    }

    initAll();
    document.addEventListener('shopify:section:load', initAll);
  })();
