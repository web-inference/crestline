/* Crestline — homepage interactions (vanilla, no dependencies) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero intro ---------- */
  var hero = document.querySelector('.cl-hero');
  if (hero) requestAnimationFrame(function () {
    setTimeout(function () { hero.classList.add('is-ready'); }, 80);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var wipes = [];
  function checkWipes() {
    var vh = window.innerHeight;
    for (var i = wipes.length - 1; i >= 0; i--) {
      var r = wipes[i].getBoundingClientRect(); // the layout box is unaffected by clip-path
      if (r.top < vh * 0.9 && r.bottom > 0) { wipes[i].classList.add('is-in'); wipes.splice(i, 1); }
    }
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) {
      // "wipe" elements are fully clipped (clip-path) until revealed, and browsers report a fully clipped element as
      // never intersecting, so an IntersectionObserver would never fire for them. Reveal them by position instead.
      if (el.getAttribute('data-reveal') === 'wipe') wipes.push(el); else io.observe(el);
    });
    checkWipes();
    window.addEventListener('scroll', checkWipes, { passive: true });
    window.addEventListener('resize', checkWipes);
    window.addEventListener('load', checkWipes);
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    if (!end || reduceMotion) return;
    var start = null, dur = 1600;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = '0';
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCounter(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Sticky header + mobile nav ---------- */
  var header = document.querySelector('.cl-header');
  var burger = document.querySelector('.cl-burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.cl-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-driven: header, parallax, timeline ---------- */
  var parallax = document.querySelectorAll('.cl-parallax');
  var timeline = document.querySelector('.cl-timeline');
  var fill = timeline && timeline.querySelector('.cl-timeline__fill');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 40);

    if (!reduceMotion) {
      parallax.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
        var offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
    }

    if (fill) {
      var tr = timeline.getBoundingClientRect();
      var progress = (window.innerHeight * 0.65 - tr.top) / tr.height;
      progress = Math.max(0, Math.min(1, progress));
      fill.style.height = (progress * 100).toFixed(1) + '%';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.cl-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.cl-faq__item').forEach(function (i) {
        i.classList.remove('is-open');
        i.querySelector('.cl-faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Contact form (preview only — Elementor Form handles real submits) ---------- */
  var form = document.querySelector('.cl-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.querySelector('.cl-hp').value) return;
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (f) {
      var valid = f.value.trim() && (f.type !== 'email' || /\S+@\S+\.\S+/.test(f.value));
      f.style.borderColor = valid ? '' : '#b5543c';
      if (!valid) ok = false;
    });
    if (ok) { form.classList.add('is-sent'); form.reset(); }
  });
})();
