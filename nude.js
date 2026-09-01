/* ESTEBAN MARCO® — ZH26 · shared behavior */

/* Ticker */
(function () {
  var t = document.getElementById('tk');
  if (t) {
    var items = ['Erstgespräch kostenlos · 15 Minuten', 'Daten bleiben in der Schweiz', 'Pilot zum Festpreis', 'On-Premise statt Cloud', 'Ein Ansprechpartner, der baut'];
    var h = items.map(function (x) { return '<span>' + x + ' <i>·</i></span>'; }).join('');
    t.innerHTML = h + h;
  }
})();

/* Videos nur im Viewport abspielen */
(function () {
  var vids = document.querySelectorAll('video[data-inview]');
  if (!vids.length) return;
  if (!('IntersectionObserver' in window)) { vids.forEach(function (v) { v.play && v.play(); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { v.play && v.play().catch(function () {}); }
      else { v.pause && v.pause(); }
    });
  }, { rootMargin: '120px' });
  vids.forEach(function (v) { io.observe(v); });
})();

/* Animaciones (reveals, contadores y staggered blur-in de texto) */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    document.querySelectorAll('[data-r]').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  if (reduced || !window.gsap) { showAll(); return; }
  gsap.registerPlugin(ScrollTrigger);

  /* Reveals de bloque */
  document.querySelectorAll('[data-r]').forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    gsap.to(el, { innerText: target, duration: 1.6, snap: { innerText: 1 }, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  /* --- Split de palabras (el HTML conserva el texto plano para SEO;
         los spans inline-block no alteran el flujo: sin layout shift) --- */
  function splitWords(el) {
    if (el.dataset.split) return el.querySelectorAll('.wrd');
    el.dataset.split = '1';
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          if (!ch.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); }
            else { var s = document.createElement('span'); s.className = 'wrd'; s.textContent = p; frag.appendChild(s); }
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR' && ch.tagName !== 'SUP') { walk(ch); }
      });
    })(el);
    return el.querySelectorAll('.wrd');
  }

  /* 1) TITULARES: palabra a palabra, blur(10) + y25, stagger 60ms,
        se des-revelan al salir y se repiten al volver a entrar */
  var heads = document.querySelectorAll('h1:not(.sr), h2, .hmeta h3, .st-r h3, .srow h3, .f-news h3');
  heads.forEach(function (el) {
    if (el.closest('.f-mark') || el.closest('.qband')) return;
    var w = splitWords(el);
    if (!w.length) return;
    gsap.set(w, { opacity: 0, filter: 'blur(10px)', y: 25 });
    gsap.to(w, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .8, ease: 'power3.out', stagger: .06,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play reverse play reverse' } });
  });

  /* 2) PÁRRAFOS CORTOS: solo opacity + blur(6), stagger 18ms, delay tras el titular */
  var paras = document.querySelectorAll('.hlede, .pdp-lede, .bn-in p, .stat p, .srow p, .st-r .sub, .f-news p');
  paras.forEach(function (el) {
    var w = splitWords(el);
    if (!w.length) return;
    gsap.set(w, { opacity: 0, filter: 'blur(6px)' });
    gsap.to(w, { opacity: 1, filter: 'blur(0px)', duration: .5, ease: 'power2.out', stagger: .018, delay: .25,
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play reverse play reverse' } });
  });

  /* 3) PÁRRAFO DESTACADO (cita de las fichas): ligado al progreso del scroll —
        de opacity .12 + blur(5) a nítido entre entrar por abajo y llegar al centro */
  document.querySelectorAll('.qband .q').forEach(function (el) {
    var w = splitWords(el);
    if (!w.length) return;
    gsap.fromTo(w,
      { opacity: .12, filter: 'blur(5px)' },
      { opacity: 1, filter: 'blur(0px)', stagger: .04, ease: 'none',
        scrollTrigger: { trigger: el.closest('.qband'), start: 'top bottom', end: 'center center', scrub: true } });
  });
})();

/* Kontakt via mailto */
function kSend(f) {
  var body = 'Name: ' + f.kn.value.trim() + '\nE-Mail: ' + f.ke.value.trim() + '\n\n' + f.km.value.trim();
  window.location.href = 'mailto:info@estebanmarco.ch'
    + '?subject=' + encodeURIComponent('Anfrage — ' + f.kn.value.trim())
    + '&body=' + encodeURIComponent(body);
  var el = document.getElementById('kmsg');
  el && (el.textContent = 'Ihr E-Mail-Programm öffnet sich …');
  return false;
}
