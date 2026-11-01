
(function () {
  var root = document.getElementById('rc-template--27508218462251__hocl_ritual_cloud_2_YQKz9w');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';

  /* ---------- Settings you may want to change ---------- */
  var CONFIG = {
    wordSizes: { 1: 15, 2: 22, 3: 30 }, // px for size 1 / 2 / 3
    rotationSpeed: 0.0016,              // higher = spins faster
    linksPerWord: 2,                    // how many lines leave each word
    navigateDelayMs: 750,               // wait for the spin before opening the link
    tiltLimit: 0.6,                     // how far the cloud can tip up/down
    flatten: 0.62                       // 1 = round sphere, lower = wider oval
  };

  /* ---------- Read the words ---------- */
  var words;
  try {
    words = JSON.parse(root.querySelector('.rc-data').textContent)
      .filter(function (w) { return w.word; });
  } catch (e) { return; }
  if (!words.length) return;

  var stage = root.querySelector('.rc-stage');
  var canvas = root.querySelector('.rc-lines');
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0, H = 0;
  var rotY = 0.4, rotX = -0.15;
  var velY = reduceMotion ? 0 : CONFIG.rotationSpeed, velX = 0;
  var hovered = null, selected = null;
  var dragging = false, lastX = 0, lastY = 0, dragDistance = 0;
  var visible = true;

  /* Places every word evenly on a sphere and creates its button */
  function buildWords() {
    var n = words.length, golden = Math.PI * (3 - Math.sqrt(5));
    words.forEach(function (w, i) {
      var y = n > 1 ? 1 - (i / (n - 1)) * 2 : 0;
      var r = Math.sqrt(1 - y * y), theta = golden * i;
      w.x = Math.cos(theta) * r; w.y = y; w.z = Math.sin(theta) * r;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rc-word';
      btn.textContent = '/' + w.word;
      btn.style.fontSize = (CONFIG.wordSizes[w.size] || CONFIG.wordSizes[1]) + 'px';
      if (w.productName) btn.setAttribute('aria-label', '/' + w.word + ' — shop ' + w.productName);

      btn.addEventListener('mouseenter', function () { hovered = w; btn.classList.add('is-hot'); });
      btn.addEventListener('mouseleave', function () { if (hovered === w) hovered = null; btn.classList.remove('is-hot'); });
      btn.addEventListener('focus', function () { hovered = w; });
      btn.addEventListener('blur', function () { if (hovered === w) hovered = null; });
      btn.addEventListener('click', function (e) {
        if (dragDistance > 6) { e.preventDefault(); return; } // it was a drag, not a click
        selectWord(w, false);
      });

      stage.appendChild(btn);
      w.el = btn;
    });
  }

  /* Works out which words are joined by lines (nearest neighbours) */
  var links = [];
  function buildLinks() {
    words.forEach(function (a, i) {
      words.map(function (b, j) {
        return { j: j, d: Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2) };
      })
      .filter(function (o) { return o.j !== i; })
      .sort(function (p, q) { return p.d - q.d; })
      .slice(0, CONFIG.linksPerWord)
      .forEach(function (o) {
        var exists = links.some(function (l) { return l[0] === o.j && l[1] === i; });
        if (!exists) links.push([i, o.j]);
      });
    });
  }

  /* Measures the stage and the words whenever the size changes */
  function resize() {
    var box = stage.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    W = box.width; H = box.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    words.forEach(function (w) { w.bw = w.el.offsetWidth; w.bh = w.el.offsetHeight; });
  }

  /* Converts the 3D positions into screen positions for the current rotation */
  function project() {
    var cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
    var radius = Math.min(W * 0.42, H * 0.62);
    words.forEach(function (w) {
      var x = w.x * cy - w.z * sy, z = w.x * sy + w.z * cy;
      var y2 = w.y * cx - z * sx, z2 = w.y * sx + z * cx;
      var perspective = 2.4 / (2.4 - z2);
      w.sx = W / 2 + x * radius * perspective * 1.05;
      w.sy = H / 2 + y2 * radius * perspective * CONFIG.flatten;
      w.depth = (z2 + 1) / 2;          // 0 = back, 1 = front
      w.scale = 0.62 + w.depth * 0.5;
    });
  }

  /* Draws the thin lines between linked words */
  function drawLines() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = getComputedStyle(root).getPropertyValue('--rc-line').trim();
    ctx.lineWidth = 1;
    links.forEach(function (l) {
      var a = words[l[0]], b = words[l[1]];
      ctx.globalAlpha = 0.25 + ((a.depth + b.depth) / 2) * 0.75;
      ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  /* Moves, scales and fades each word button */
  function placeWords() {
    words.forEach(function (w) {
      var active = (w === hovered || w === selected);
      var s = active ? Math.max(w.scale, 1) : w.scale;
      w.el.style.transform = 'translate(' + (w.sx - w.bw / 2) + 'px,' + (w.sy - w.bh / 2) + 'px) scale(' + s + ')';
      w.el.style.opacity = active ? 1 : 0.28 + w.depth * 0.72;
      w.el.style.zIndex = active ? 999 : Math.round(w.depth * 100);
    });
  }

  /* One animation frame: rotate a little, then redraw */
  function tick() {
    if (visible) {
      if (!dragging) {
        var target = hovered ? 0 : (reduceMotion ? 0 : CONFIG.rotationSpeed);
        velY += (target - velY) * 0.06;   // ease to a stop on hover, ease back after
        velX *= 0.94;                      // tilt slows down on its own
        rotY += velY;
        rotX = Math.max(-CONFIG.tiltLimit, Math.min(CONFIG.tiltLimit, rotX + velX));
      }
      project(); drawLines(); placeWords();
    }
    requestAnimationFrame(tick);
  }

  /* Spins the cloud so the given word faces the front (about 0.7s) */
  function spinWordToFront(w) {
    var target = Math.atan2(w.x, w.z);
    var delta = ((target - rotY + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
    if (reduceMotion) { rotY += delta; return; }
    var start = rotY, t0 = performance.now();
    (function step(t) {
      var k = Math.min(1, (t - t0) / 700), eased = 1 - Math.pow(1 - k, 3);
      rotY = start + delta * eased; velY = 0;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* Highlights a word, spins it to the front, then opens its product page */
  function selectWord(w, highlightOnly) {
    if (selected) selected.el.classList.remove('is-selected');
    selected = w;
    w.el.classList.add('is-selected');
    spinWordToFront(w);
    if (highlightOnly || !w.url) return;
    setTimeout(function () { window.location.href = w.url; }, reduceMotion ? 0 : CONFIG.navigateDelayMs);
  }

  /* Drag to spin (mouse and touch) */
  stage.addEventListener('pointerdown', function (e) {
    dragging = true; dragDistance = 0; lastX = e.clientX; lastY = e.clientY;
    stage.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    dragDistance += Math.abs(dx) + Math.abs(dy);
    rotY += dx * 0.006;
    rotX = Math.max(-CONFIG.tiltLimit, Math.min(CONFIG.tiltLimit, rotX + dy * 0.004));
    velY = dx * 0.0009; velX = dy * 0.0004;
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener('pointerup', function () {
    dragging = false; stage.classList.remove('is-dragging');
  });

  /* Pause when scrolled out of view */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(stage);
  }

  /* Theme editor: clicking a block in the sidebar highlights that word (no navigation) */
  document.addEventListener('shopify:block:select', function (e) {
    var w = words.find(function (x) { return x.blockId === e.detail.blockId; });
    if (w) selectWord(w, true);
  });

  /* Start */
  buildWords();
  buildLinks();
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();
