/* =====================================================================
   ESTEBAN MARCO — service page motion
   Light layer: hero film, quiet reveals, capability stagger, in-view
   video. Same restraint as the home. Reads without JS.
   Reveals are created only after the preloader clears, so nothing
   plays behind it.
   ===================================================================== */
(function () {
  'use strict';
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  window.__kpAlive = true;
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Grain — one seeded tile, offset on a timer */
  (function grain() {
    if (REDUCED) return;
    var S = 150, c = document.createElement('canvas'); c.width = c.height = S;
    var ctx = c.getContext('2d'), img = ctx.createImageData(S, S), d = img.data, seed = 19980411;
    function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
    for (var i = 0; i < d.length; i += 4) { var v = 120 + rnd() * 70; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    ctx.putImageData(img, 0, 0);
    var el = document.createElement('div'); el.className = 'grain';
    el.style.backgroundImage = 'url(' + c.toDataURL('image/png') + ')';
    document.body.appendChild(el);
    var steps = [[0,0],[-17,9],[11,-14],[-7,16],[14,6],[-13,-11],[6,13],[-15,-4]], k = 0, id = null;
    function run() { if (id) return; id = setInterval(function () { k = (k + 1) % steps.length;
      el.style.backgroundPosition = steps[k][0] + 'px ' + steps[k][1] + 'px'; }, 110); }
    function stop() { if (id) { clearInterval(id); id = null; } }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : run(); });
    run();
  })();

  /* Nav turns solid past the hero */
  (function nav() {
    var n = document.getElementById('nav'), hero = document.querySelector('.shero');
    if (!n || !hero) return;
    ScrollTrigger.create({ trigger: hero, start: 'bottom top+=80',
      onEnter: function () { n.classList.add('solid'); },
      onLeaveBack: function () { n.classList.remove('solid'); } });
  })();

  /* Reveals — line masks, quiet rises, capability stagger.
     Created after the preloader, triggers at ~82% so the element is
     actually on screen when it starts to move. */
  function reveals() {
    gsap.utils.toArray('.mask').forEach(function (m) {
      var inner = m.querySelector('span'); if (!inner) return;
      gsap.to(inner, { y: '0%', duration: REDUCED ? 0 : 1.35, ease: 'expo.out',
        scrollTrigger: { trigger: m, start: 'top 82%', once: true } });
    });
    gsap.utils.toArray('[data-rise]').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 26, duration: REDUCED ? 0 : 1.05, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    });
    var caps = document.querySelectorAll('.cap');
    if (caps.length) {
      gsap.to(caps, { opacity: 1, duration: REDUCED ? 0 : 0.7, ease: 'power2.out',
        stagger: REDUCED ? 0 : 0.05,
        scrollTrigger: { trigger: '.caps', start: 'top 80%', once: true } });
    }
  }

  /* Hero film gentle parallax */
  (function heroParallax() {
    var bg = document.querySelector('.shero .sbg'); if (!bg || REDUCED) return;
    gsap.to(bg, { yPercent: 12, scale: 1.07, ease: 'none',
      scrollTrigger: { trigger: '.shero', start: 'top top', end: 'bottom top', scrub: true } });
  })();

  /* Play video only while on screen */
  function inview(v) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) {
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause(); }); }, { rootMargin: '150px' }).observe(v);
    } else { v.play().catch(function () {}); }
  }
  document.querySelectorAll('video[data-inview]').forEach(inview);

  /* Preloader — the reveals start once it has cleared */
  (function pre() {
    var bar = document.querySelector('#pre .ld i');
    var started = false;
    function done() {
      if (started) return;
      started = true;
      document.body.classList.add('done');
      ScrollTrigger.refresh();
      reveals();
    }
    function finish() {
      document.body.classList.add('ready');
      setTimeout(done, 800);
    }
    if (!bar || REDUCED) { document.body.classList.add('ready'); done(); return; }
    setTimeout(done, 4000); /* safety net — never hold the page hostage */
    gsap.to(bar, { scaleX: 1, duration: 1.0, ease: 'power2.inOut', onComplete: finish });
  })();

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();

/* ===== shared: in-page demo modal + accordion (self-contained) ===== */
(function () {
  'use strict';
  function closeModal(m) {
    m.classList.remove('open');
    m.querySelector('iframe').src = 'about:blank';
    document.documentElement.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-demo]');
    if (a) {
      e.preventDefault();
      var m = document.getElementById('demoModal');
      if (!m) {
        m = document.createElement('div');
        m.id = 'demoModal';
        m.innerHTML = '<button class="dm-close" type="button" aria-label="Schliessen">✕</button><iframe title="Live-Demo"></iframe>';
        document.body.appendChild(m);
        m.querySelector('.dm-close').addEventListener('click', function () { closeModal(m); });
      }
      m.querySelector('iframe').src = a.getAttribute('href');
      m.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      return;
    }
    var q = e.target.closest && e.target.closest('.acc-q');
    if (q) {
      var it = q.parentElement, p = it.querySelector('.acc-a');
      var open = it.classList.toggle('open');
      p.style.maxHeight = open ? p.scrollHeight + 'px' : '0px';
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var m = document.getElementById('demoModal');
    if (m && m.classList.contains('open')) closeModal(m);
  });
})();
