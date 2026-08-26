/* =====================================================================
   ESTEBAN MARCO — estebanmarco.ch · motion layer
   GSAP 3.12 + ScrollTrigger

   Rules of the house:
   · Every motion is slow, single-direction and interruptible.
   · Scroll reveals wait for the intro — nothing plays behind the curtain.
   · If GSAP never loads, the page still reads (see .fallback in the CSS).
   ===================================================================== */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  window.__kpAlive = true;

  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1 · GRAIN — one seeded noise tile, offset on a timer.
     Cheaper than any canvas loop and it never touches the main thread
     during scroll.
     --------------------------------------------------------------- */
  function grain() {
    if (REDUCED) return;
    var S = 150, c = document.createElement('canvas');
    c.width = c.height = S;
    var ctx = c.getContext('2d'), img = ctx.createImageData(S, S), d = img.data;
    var seed = 19980411;
    function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
    for (var i = 0; i < d.length; i += 4) {
      var v = 120 + rnd() * 70;
      d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    var el = document.createElement('div');
    el.className = 'grain';
    el.style.backgroundImage = 'url(' + c.toDataURL('image/png') + ')';
    document.body.appendChild(el);
    var steps = [[0,0],[-17,9],[11,-14],[-7,16],[14,6],[-13,-11],[6,13],[-15,-4]], k = 0, id = null;
    function run() { if (id) return; id = setInterval(function () {
      k = (k + 1) % steps.length;
      el.style.backgroundPosition = steps[k][0] + 'px ' + steps[k][1] + 'px';
    }, 110); }
    function stop() { if (id) { clearInterval(id); id = null; } }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : run(); });
    run();
  }

  /* ---------------------------------------------------------------
     2 · NAV — turns solid once the hero is behind us
     --------------------------------------------------------------- */
  function nav() {
    var n = document.getElementById('nav'), hero = document.querySelector('.heroX');
    if (!n || !hero) return;
    ScrollTrigger.create({
      trigger: hero, start: 'bottom top+=80',
      onEnter: function () { n.classList.add('solid'); },
      onLeaveBack: function () { n.classList.remove('solid'); }
    });
  }

  /* ---------------------------------------------------------------
     3 · REVEALS — created only AFTER the intro curtain has lifted,
     so nothing fires while the page is still covered. Triggers sit at
     ~80% of the viewport: the element is properly on screen before it
     starts to move, instead of animating the moment a pixel peeks in.
     --------------------------------------------------------------- */
  function masks() {
    gsap.utils.toArray('.mask').forEach(function (m) {
      var inner = m.querySelector('span');
      if (!inner) return;
      gsap.to(inner, {
        y: '0%', duration: REDUCED ? 0 : 1.35, ease: 'expo.out',
        scrollTrigger: { trigger: m, start: 'top 82%', once: true }
      });
    });
  }

  /* Word-by-word: used once, on the manifesto, so it stays special. */
  function words() {
    gsap.utils.toArray('[data-words]').forEach(function (el) {
      var ws = el.querySelectorAll('.w');
      if (!ws.length) return;
      gsap.to(ws, {
        opacity: 1, y: 0, duration: REDUCED ? 0 : 1.1, ease: 'power2.out',
        stagger: REDUCED ? 0 : 0.045,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true }
      });
    });
  }

  /* Generic quiet rise for blocks */
  function rises() {
    gsap.utils.toArray('[data-rise]').forEach(function (el) {
      gsap.from(el, {
        opacity: 0, y: 26, duration: REDUCED ? 0 : 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true }
      });
    });
  }

  /* Figures count up once truly in view. The HTML carries the final
     value, so crawlers and no-JS visitors read "80%", never "0%". */
  function figures() {
    if (REDUCED) return; /* keep the static final values */
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var to = parseFloat(el.dataset.count), o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, {
        v: to, duration: 1.9, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(o.v); },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });
  }

  /* Everything above, bundled — called once the intro is done. */
  function reveals() {
    masks(); words(); rises(); figures();
  }

  /* ---------------------------------------------------------------
     4 · HERO — the film simply plays. A slow scale parallax keeps it
     alive as you begin to scroll; no pin, no scrubbing.
     --------------------------------------------------------------- */
  function hero() {
    var h = document.querySelector('.heroX');
    var v = document.getElementById('herovid');
    if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (!h || REDUCED) return;
    if (v) gsap.to(v, {
      yPercent: 10, scale: 1.06, ease: 'none',
      scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------------
     GALLERY RAIL — five services glide horizontally as framed cards.
     The wrapper is pinned, the track moves; media settles from a tilt
     and its footage drifts in counter-parallax. Snap per panel.

     Timing notes:
     · 1.35 viewport-heights of scroll per panel — a single wheel
       flick no longer skips a whole service.
     · Snap is directional with a longer settle delay, so it finishes
       your gesture instead of racing ahead of it.
     --------------------------------------------------------------- */
  function rail() {
    var wrap = document.querySelector('.railwrap');
    if (!wrap) return;
    var track = wrap.querySelector('.rail');
    var panels = gsap.utils.toArray('.rpanel', track);
    if (!track || panels.length < 2) return;

    var prog = document.querySelector('.rprog');
    var bar = document.querySelector('.rprog .bar i');
    var idx = document.querySelector('.rprog .idx b');
    var tot = document.querySelector('.rprog .idx .tot');
    if (tot) tot.textContent = String(panels.length).padStart(2, '0');

    var mm = gsap.matchMedia();
    mm.add('(min-width: 941px) and (prefers-reduced-motion: no-preference)', function () {
      var N = panels.length;

      /* deck of full-screen films: each panel is a stacked layer; the next
         one wipes in from the right OVER the previous, so two videos never
         sit side by side and no seam is ever visible. */
      panels.forEach(function (p, i) {
        gsap.set(p, { zIndex: i + 1 });
        if (i > 0) gsap.set(p, { xPercent: 100 });
      });
      gsap.set(panels[0].querySelectorAll('[data-r]'), { opacity: 1, y: 0 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap, pin: true, start: 'top top',
          end: function () { return '+=' + Math.round((N - 1) * window.innerHeight * 1.35); },
          scrub: 0.85, invalidateOnRefresh: true, anticipatePin: 1,
          snap: {
            snapTo: 1 / (N - 1), directional: true,
            duration: { min: 0.25, max: 0.6 }, delay: 0.15, ease: 'power2.inOut'
          },
          onToggle: function (s) { if (prog) prog.classList.toggle('on', s.isActive); },
          onUpdate: function (s) {
            if (bar) gsap.set(bar, { scaleX: s.progress });
            if (idx) idx.textContent = String(
              Math.min(N, Math.round(s.progress * (N - 1)) + 1)
            ).padStart(2, '0');
          }
        }
      });

      panels.forEach(function (p, i) {
        if (i === 0) return;
        var seg = i - 1;
        var vid = p.querySelector('.rbg video');
        var mock = p.querySelector('.mockwin');
        var items = p.querySelectorAll('[data-r]');
        /* the wipe itself */
        tl.fromTo(p, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: 'none' }, seg);
        /* the footage inside lags a little behind the frame — parallax door */
        if (vid) tl.fromTo(vid, { xPercent: -12 }, { xPercent: 0, duration: 1, ease: 'none' }, seg);
        /* the film being covered settles back quietly */
        tl.fromTo(panels[i - 1], { scale: 1 }, { scale: 0.94, duration: 1, ease: 'none' }, seg);
        if (items.length) tl.fromTo(items, { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.045, ease: 'none' }, seg + 0.6);
        if (mock) tl.fromTo(mock, { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, seg + 0.58);
      });

      return function () {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
        panels.forEach(function (p) {
          gsap.set(p, { clearProps: 'all' });
          gsap.set(p.querySelectorAll('[data-r]'), { clearProps: 'all' });
          var v = p.querySelector('.rbg video'); if (v) gsap.set(v, { clearProps: 'all' });
          var mk = p.querySelector('.mockwin'); if (mk) gsap.set(mk, { clearProps: 'all' });
        });
      };
    });

    mm.add('(max-width: 940px),(prefers-reduced-motion: reduce)', function () {
      gsap.utils.toArray('[data-r]').forEach(function (el) { gsap.set(el, { opacity: 1, y: 0 }); });
      return function () {};
    });
  }

  /* The window behind the privacy chapter fades in once we arrive. */
  function sanctuaryBg() {
    var s = document.querySelector('.sanctuary');
    if (!s) return;
    ScrollTrigger.create({
      trigger: s, start: 'top 70%',
      onEnter: function () { s.classList.add('lit'); },
      onLeaveBack: function () { s.classList.remove('lit'); }
    });
  }

  /* Footage plays only while its panel is on screen. */
  function inviewVideo() {
    document.querySelectorAll('video[data-inview]').forEach(function (v) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
            else v.pause();
          });
        }, { rootMargin: '150px' }).observe(v);
      } else { v.play().catch(function () {}); }
    });
  }

  /* ---------------------------------------------------------------
     THE INVERSION — the site opens in daylight and closes around the
     client in the privacy chapter. Tonal, not a flash: a token swap
     so every child follows.
     --------------------------------------------------------------- */
  function inversion() {
    var s = document.querySelector('.sanctuary');
    if (!s) return;
    var dark = {
      '--surface': 'var(--forest)', '--on-surface': 'var(--bone)',
      '--f80': 'var(--b80)', '--f60': 'var(--b60)', '--f40': 'var(--b40)',
      '--f20': 'var(--b20)', '--f12': 'var(--b12)', '--f06': 'var(--b06)'
    };
    var light = {
      '--surface': 'var(--bone)', '--on-surface': 'var(--ink)',
      '--f80': 'var(--i80)', '--f60': 'var(--i60)', '--f40': 'var(--i40)',
      '--f20': 'var(--i20)', '--f12': 'var(--i12)', '--f06': 'var(--i06)'
    };
    function apply(vars) {
      var root = document.documentElement;
      Object.keys(vars).forEach(function (k) { root.style.setProperty(k, vars[k]); });
    }
    ScrollTrigger.create({
      trigger: s, start: 'top 62%', end: 'bottom 38%',
      onEnter: function () { apply(dark); },
      onEnterBack: function () { apply(dark); },
      onLeave: function () { apply(light); },
      onLeaveBack: function () { apply(light); }
    });
  }

  /* ---------------------------------------------------------------
     INTRO — the monogram draws, the name resolves, then an iris opens
     on the hero. Scroll is locked while the curtain is up, and the
     reveals are created only afterwards, so nothing has already
     played by the time the page appears.
     --------------------------------------------------------------- */
  function intro() {
    var el = document.getElementById('intro');
    var playHero = function () { var v = document.getElementById('herovid');
      if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } };
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      document.body.classList.add('done');
      document.documentElement.style.overflow = '';
      playHero();
      ScrollTrigger.refresh();
      reveals();
    }
    if (!el || REDUCED) { finish(); return; }

    /* Hold the page still while it is covered. */
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    /* Safety net: never leave the page locked. */
    setTimeout(finish, 7000);

    var ring  = el.querySelector('.im-ring');
    var ks    = el.querySelectorAll('.im-k');
    var emTxt = el.querySelector('.im-em');
    var names = el.querySelectorAll('.intro-name .im-w > span');
    var sub   = el.querySelector('.intro-sub > span');
    var bar   = el.querySelector('.intro-bar i');
    var stage = el.querySelector('.intro-stage');
    var front = el.querySelector('.intro-panel.front');
    var back  = el.querySelector('.intro-panel.back');

    /* Prime the strokes for a self-drawing effect */
    [ring].concat([].slice.call(ks)).forEach(function (s) {
      if (!s) return;
      var len = 240;
      try { len = s.getTotalLength(); } catch (e) {}
      gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
    });

    gsap.timeline({ onComplete: finish })
      .to(ring,  { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' })
      .to(ks,    { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.55')
      .to(emTxt, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.45')
      .to(names, { y: '0%', duration: 0.95, ease: 'expo.out', stagger: 0.1 }, '-=0.3')
      .to(sub,   { y: '0%', duration: 0.7, ease: 'expo.out' }, '-=0.55')
      .to(bar,   { scaleX: 1, duration: 0.95, ease: 'power1.inOut' }, '-=0.55')
      .to({}, { duration: 0.4 })                                    /* hold */
      .to(stage, { opacity: 0, duration: 0.45, ease: 'power2.in' })
      .add(playHero)
      /* IRIS: the page is revealed through a shrinking circle centred on
         the logo — an aperture closing on the panel, not a curtain. */
      .set(front, { clipPath: 'circle(150% at 50% 42%)' })
      .set(back,  { clipPath: 'circle(150% at 50% 42%)' })
      .to(front, { clipPath: 'circle(0% at 50% 42%)', duration: 1.15, ease: 'expo.inOut' })
      .to(back,  { clipPath: 'circle(0% at 50% 42%)', duration: 1.15, ease: 'expo.inOut' }, '-=0.95');
  }

  /* ---------------------------------------------------------------
     PRODUCT MOCKS — the working tool, looping quietly over the film.
     This is the identity move: er baut, nicht berät.
     --------------------------------------------------------------- */
  function mocks() {
    /* SEO — the SERP where your row climbs to Rang 1 */
    var serp = document.querySelector('[data-mock="serp"]');
    if (serp) {
      var rows = serp.querySelectorAll('.srow');
      var you = serp.querySelector('.srow.you');
      var pin = serp.querySelector('.spin');
      if (you && rows.length === 3 && pin) {
        if (REDUCED) { gsap.set(pin, { opacity: 1, scale: 1 }); }
        else {
          var H = you.offsetHeight + 8;
          gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
            .set(you, { y: H * 2 }).set([rows[1], rows[2]], { y: -H })
            .set(pin, { opacity: 0, scale: 0.6 })
            .to({}, { duration: 0.8 })
            .to([you, rows[1], rows[2]], { y: 0, duration: 1.05, ease: 'power3.inOut' })
            .to(pin, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' })
            .to({}, { duration: 2.0 })
            .to(serp.querySelector('.mwbody'), { opacity: 0, duration: 0.35 })
            .set(serp.querySelector('.mwbody'), { opacity: 1, delay: 0.1 });
        }
      }
    }
    /* KI — fields check themselves, then the booking line lands */
    var scan = document.querySelector('[data-mock="scan"]');
    if (scan) {
      var chks = scan.querySelectorAll('.mchk');
      var bk = scan.querySelector('.mbk');
      if (REDUCED) { gsap.set(chks, { scale: 1 }); gsap.set(bk, { opacity: 1 }); }
      else {
        gsap.timeline({ repeat: -1, repeatDelay: 1.6 })
          .set(chks, { scale: 0 }).set(bk, { opacity: 0 })
          .to({}, { duration: 0.9 })
          .to(chks, { scale: 1, duration: 0.35, ease: 'back.out(2.4)', stagger: 0.55 })
          .to(bk, { opacity: 1, duration: 0.5 }, '+=0.2')
          .to({}, { duration: 2.2 });
      }
    }
    /* SW — the nightly job writes its log */
    var term = document.querySelector('[data-mock="term"]');
    if (term) {
      var lines = term.querySelectorAll('.tl');
      if (REDUCED) { gsap.set(lines, { opacity: 1, x: 0 }); }
      else {
        gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
          .set(lines, { opacity: 0, x: -6 })
          .to({}, { duration: 0.6 })
          .to(lines, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.55 })
          .to({}, { duration: 2.4 });
      }
    }
  }

  /* ---------------------------------------------------------------
     CONTACT — Netlify Forms over fetch, direct e-mail as safety net.
     --------------------------------------------------------------- */
  function contact() {
    var f = document.querySelector('form.kform');
    if (!f) return;
    var msg = document.getElementById('kmsg');
    var btn = f.querySelector('button[type="submit"]');
    function t(k, fb) { return (window.emT && window.emT(k)) || fb; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn) btn.disabled = true;
      var data = new FormData(f);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        if (msg) { msg.textContent = t('cta.ok', 'Danke — Ihre Nachricht ist unterwegs. Ich melde mich innert 24 Stunden.'); msg.classList.remove('err'); }
        f.reset();
      }).catch(function () {
        if (msg) { msg.textContent = t('cta.err', 'Senden hat nicht geklappt — schreiben Sie direkt an info@estebanmarco.ch.'); msg.classList.add('err'); }
      }).then(function () {
        if (btn) btn.disabled = false;
      });
    });
  }

  function init() {
    grain(); nav();
    /* Pinned triggers created top-to-bottom so pin-spacing stacks right. */
    hero(); rail(); sanctuaryBg(); inviewVideo();
    inversion();
    mocks();
    contact();
    intro();   /* creates the scroll reveals once the curtain lifts */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
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
