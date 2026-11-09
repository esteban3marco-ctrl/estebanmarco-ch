// estebanmarco.ch v5: menú, cabecera, entradas al hacer scroll, acordeón, modales de caso y formulario.
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');

  // cabecera con fondo al bajar
  var hdr = d.querySelector('.hdr');
  function onScroll() { hdr && hdr.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // menú
  d.querySelectorAll('[data-menu]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = !root.classList.contains('menu-open');
      root.classList.toggle('menu-open', open);
      d.querySelector('.burger').setAttribute('aria-expanded', open);
    });
  });
  d.querySelectorAll('.menu a').forEach(function (a) {
    a.addEventListener('click', function () { root.classList.remove('menu-open'); });
  });

  // entradas al hacer scroll; lo que ya está en pantalla al cargar se enseña enseguida
  var els = [].slice.call(d.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 1200);
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // acordeón
  d.querySelectorAll('.qa button').forEach(function (b) {
    b.addEventListener('click', function () {
      var qa = b.parentNode, open = !qa.classList.contains('open');
      qa.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
    });
  });

  // modales
  function openModal(id) { var m = d.getElementById(id); if (m) { m.classList.add('open'); var f = m.querySelector('input,button.x'); f && f.focus(); } }
  function closeAll() { d.querySelectorAll('.modal.open').forEach(function (m) { m.classList.remove('open'); }); }
  d.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); openModal(b.getAttribute('data-open')); });
  });
  d.querySelectorAll('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('.x')) closeAll(); });
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); root.classList.remove('menu-open'); } });

  // formulario de contacto (FormSubmit, mismo endpoint que la web anterior)
  var form = d.getElementById('contact-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type=submit]'), ok = form.querySelector('.form-ok');
    btn.disabled = true; btn.style.opacity = .5;
    fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function () { ok.textContent = form.dataset.ok; ok.style.display = 'block'; form.reset(); })
      .catch(function () { ok.textContent = form.dataset.err; ok.style.display = 'block'; })
      .finally(function () { btn.disabled = false; btn.style.opacity = 1; });
  });
})();
