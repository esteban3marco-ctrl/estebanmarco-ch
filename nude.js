/* ESTEBAN MARCO® — ZH26 · comportamiento compartido
   Idiomas DE/EN/FR · formulario AJAX · newsletter · animaciones */

/* ---------- i18n ---------- */
var LANG = (function () {
  try { return localStorage.getItem('em-lang') || 'de'; } catch (e) { return 'de'; }
})();

function i18nGet(key) {
  if (LANG === 'de' || !window.I18N) return null;
  var d = window.I18N[LANG];
  return (d && d[key] !== undefined) ? d[key] : null;
}

(function applyLang() {
  if (LANG !== 'de' && window.I18N && window.I18N[LANG]) {
    var d = window.I18N[LANG];
    document.querySelectorAll('[data-i]').forEach(function (el) {
      var v = d[el.getAttribute('data-i')];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i-ph]').forEach(function (el) {
      var v = d[el.getAttribute('data-i-ph')];
      if (v !== undefined) el.setAttribute('placeholder', v);
    });
    document.documentElement.setAttribute('lang', LANG);
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.classList.toggle('on', b.getAttribute('data-lang') === LANG);
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      if (l === LANG) return;
      try { localStorage.setItem('em-lang', l); } catch (e) {}
      location.reload();
    });
  });
})();

/* ---------- Ticker ---------- */
(function () {
  var t = document.getElementById('tk');
  if (!t) return;
  var keys = ['tk1', 'tk2', 'tk3', 'tk4', 'tk5'];
  var DE = {
    tk1: 'Erstgespräch kostenlos · 15 Minuten', tk2: 'Daten bleiben in der Schweiz',
    tk3: 'Pilot zum Festpreis', tk4: 'On-Premise statt Cloud', tk5: 'Ein Ansprechpartner, der baut'
  };
  var items = keys.map(function (k) { return i18nGet(k) || DE[k]; });
  var h = items.map(function (x) { return '<span>' + x + ' <i>·</i></span>'; }).join('');
  t.innerHTML = h + h;
})();

/* ---------- Formulario de contacto (FormSubmit AJAX) ---------- */
(function () {
  var f = document.getElementById('kform');
  if (!f) return;
  var msg = document.getElementById('kmsg');
  var DE = { sending: 'Wird gesendet …', ok: 'Danke! Ihre Nachricht ist unterwegs — ich melde mich innert 24 Stunden.',
             err: 'Senden fehlgeschlagen — schreiben Sie direkt an info@estebanmarco.ch.' };
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (f._honey && f._honey.value) return;
    var btn = f.querySelector('button[type=submit]');
    btn.disabled = true;
    msg.textContent = i18nGet('cta.sending') || DE.sending;
    fetch('https://formsubmit.co/ajax/8762b3d7d4a3f17703cbfe933762346f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: f.name.value.trim(),
        email: f.email.value.trim(),
        message: f.message.value.trim(),
        _subject: 'Anfrage estebanmarco.ch — ' + f.name.value.trim(),
        _template: 'table'
      })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && (j.success === 'true' || j.success === true)) {
        msg.textContent = i18nGet('cta.ok') || DE.ok;
        f.reset();
      } else { throw new Error('formsubmit'); }
    }).catch(function () {
      msg.textContent = i18nGet('cta.err') || DE.err;
    }).finally(function () { btn.disabled = false; });
  });
})();

/* ---------- Newsletter (footer) ---------- */
(function () {
  var f = document.getElementById('nlform');
  if (!f) return;
  var msg = document.getElementById('nlmsg');
  var DE = { sending: 'Wird gesendet …', ok: 'Danke — Sie sind dabei!',
             err: 'Senden fehlgeschlagen — schreiben Sie direkt an info@estebanmarco.ch.' };
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    msg.textContent = i18nGet('cta.sending') || DE.sending;
    fetch('https://formsubmit.co/ajax/8762b3d7d4a3f17703cbfe933762346f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: f.email.value.trim(), _subject: 'Newsletter-Anmeldung estebanmarco.ch', _template: 'table' })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && (j.success === 'true' || j.success === true)) {
        msg.textContent = i18nGet('f.nlok') || DE.ok;
        f.reset();
      } else { throw new Error('formsubmit'); }
    }).catch(function () { msg.textContent = i18nGet('cta.err') || DE.err; });
  });
})();

/* ---------- Videos solo en viewport ---------- */
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

/* ---------- Acordeón ---------- */
(function () {
  document.querySelectorAll('.acc-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var it = btn.parentElement, a = it.querySelector('.acc-a');
      var open = it.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
    });
  });
})();

/* ---------- Animaciones (reveals, contadores, blur-in) ---------- */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    document.querySelectorAll('[data-r]').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  if (reduced || !window.gsap) { showAll(); return; }
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-r]').forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    gsap.to(el, { innerText: target, duration: 1.6, snap: { innerText: 1 }, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  /* split de palabras — el HTML conserva el texto plano (SEO), sin layout shift */
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

  var heads = document.querySelectorAll('h1:not(.sr), h2, .hmeta h3, .st-r h3, .srow h3, .f-news h3');
  heads.forEach(function (el) {
    if (el.closest('.f-mark') || el.closest('.qband')) return;
    var w = splitWords(el);
    if (!w.length) return;
    gsap.set(w, { opacity: 0, filter: 'blur(10px)', y: 25 });
    gsap.to(w, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .8, ease: 'power3.out', stagger: .06,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play reverse play reverse' } });
  });

  var paras = document.querySelectorAll('.hlede, .pdp-lede, .bn-in p, .stat p, .srow p, .st-r .sub, .f-news p');
  paras.forEach(function (el) {
    var w = splitWords(el);
    if (!w.length) return;
    gsap.set(w, { opacity: 0, filter: 'blur(6px)' });
    gsap.to(w, { opacity: 1, filter: 'blur(0px)', duration: .5, ease: 'power2.out', stagger: .018, delay: .25,
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play reverse play reverse' } });
  });

  document.querySelectorAll('.qband .q').forEach(function (el) {
    var w = splitWords(el);
    if (!w.length) return;
    gsap.fromTo(w,
      { opacity: .12, filter: 'blur(5px)' },
      { opacity: 1, filter: 'blur(0px)', stagger: .04, ease: 'none',
        scrollTrigger: { trigger: el.closest('.qband'), start: 'top bottom', end: 'center center', scrub: true } });
  });
})();
