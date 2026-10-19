/* Crestline — booking widget (Calendly-style demo).
 *
 * Demo mode (default): a working date → time → details → confirmation flow. Nothing is sent or booked.
 * Live mode: set window.CRESTLINE_CALENDLY_URL (before this script) to your Calendly link and the demo is
 * replaced by Calendly's real inline widget:
 *   window.CRESTLINE_CALENDLY_URL = 'https://calendly.com/your-name/free-rental-analysis';
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-booking]');
  if (!root) return;

  var CALENDLY_RE = /^https:\/\/calendly\.com\/[A-Za-z0-9_.\-\/]+$/;
  var liveUrl = String(window.CRESTLINE_CALENDLY_URL || '').trim();
  if (liveUrl && CALENDLY_RE.test(liveUrl)) { mountCalendly(liveUrl); return; }
  mountDemo();

  /* ---------------- live Calendly ---------------- */
  function mountCalendly(url) {
    root.textContent = '';
    root.classList.add('cl-book--live');
    var box = document.createElement('div');
    box.className = 'calendly-inline-widget';
    box.setAttribute('data-url', url + '?hide_gdpr_banner=1&primary_color=8b6a35');
    box.style.cssText = 'min-width:320px;height:720px';
    root.appendChild(box);
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }

  /* ---------------- demo ---------------- */
  function mountDemo() {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var SLOT_COUNT = 16; // 9:00 am to 4:30 pm, every 30 minutes

    var addDays = function (d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); };
    var sameDay = function (a, b) { return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); };
    var monthIndex = function (d) { return d.getFullYear() * 12 + d.getMonth(); };

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var firstBookable = addDays(today, 1);
    var lastBookable = addDays(today, 60);
    var view = new Date(firstBookable.getFullYear(), firstBookable.getMonth(), 1);
    var selDate = null;
    var selSlot = null;

    root.innerHTML =
      '<p class="cl-book__kicker">Free Rental Analysis</p>' +
      '<h3 class="cl-h cl-book__title">Book a time to talk</h3>' +
      '<ul class="cl-book__meta">' +
        '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>30 min</li>' +
        '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="1"/><path d="m16 10 5-3v10l-5-3z"/></svg>Phone or video call</li>' +
        '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>Pacific Time</li>' +
      '</ul>' +

      '<div data-step="pick">' +
        '<div class="cl-cal__nav">' +
          '<button type="button" class="cl-cal__arrow" data-prev aria-label="Previous month">‹</button>' +
          '<div class="cl-cal__month" data-month aria-live="polite"></div>' +
          '<button type="button" class="cl-cal__arrow" data-next aria-label="Next month">›</button>' +
        '</div>' +
        '<div class="cl-cal__week" aria-hidden="true"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>' +
        '<div class="cl-cal__grid" role="group" aria-label="Choose a date" data-grid></div>' +
        '<div class="cl-slots">' +
          '<p class="cl-slots__title" data-slots-title aria-live="polite"></p>' +
          '<div class="cl-slots__grid" role="group" aria-label="Available times" data-slots></div>' +
          '<button type="button" class="cl-btn cl-btn--navy cl-book__next" data-to-details hidden>Next <span class="arr">→</span></button>' +
        '</div>' +
      '</div>' +

      '<form data-step="details" class="cl-book__form" novalidate hidden>' +
        '<button type="button" class="cl-book__back" data-back>← Back</button>' +
        '<p class="cl-book__summary" data-summary></p>' +
        '<div class="cl-field"><label for="bk-name">Name</label><input id="bk-name" name="name" type="text" autocomplete="name" required><p class="cl-field__err" data-err="name" role="alert"></p></div>' +
        '<div class="cl-field"><label for="bk-email">Email</label><input id="bk-email" name="email" type="email" autocomplete="email" required><p class="cl-field__err" data-err="email" role="alert"></p></div>' +
        '<div class="cl-field"><label for="bk-address">Property address</label><input id="bk-address" name="address" type="text" autocomplete="street-address"></div>' +
        '<div class="cl-field"><label for="bk-notes">Anything we should know?</label><textarea id="bk-notes" name="notes" rows="3"></textarea></div>' +
        '<button type="submit" class="cl-btn cl-btn--gold">Schedule call <span class="arr">→</span></button>' +
      '</form>' +

      '<div data-step="done" class="cl-book__done" tabindex="-1" hidden>' +
        '<div class="cl-book__check" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>' +
        '<h3 class="cl-h cl-book__title">You’re scheduled</h3>' +
        '<p class="cl-book__summary" data-done-summary></p>' +
        '<p data-done-name></p>' +
        '<button type="button" class="cl-link" data-again>Book another time <span class="arr">→</span></button>' +
      '</div>' +

      '<p class="cl-book__note">Demo only. Nothing is sent and no calendar is booked. Add your Calendly link to make it live.</p>';

    var $ = function (sel) { return root.querySelector(sel); };
    var steps = { pick: $('[data-step="pick"]'), details: $('[data-step="details"]'), done: $('[data-step="done"]') };
    var grid = $('[data-grid]');
    var slotsEl = $('[data-slots]');
    var slotsTitle = $('[data-slots-title]');
    var monthEl = $('[data-month]');
    var prevBtn = $('[data-prev]');
    var nextBtn = $('[data-next]');
    var toDetails = $('[data-to-details]');

    /* ---- helpers ---- */
    function isAvailable(d) {
      var dow = d.getDay();
      return d >= firstBookable && d <= lastBookable && dow > 0 && dow < 6;
    }
    function hash(n) {
      n = (n ^ 61) ^ (n >>> 16);
      n = n + (n << 3);
      n = n ^ (n >>> 4);
      n = Math.imul(n, 0x27d4eb2d);
      n = n ^ (n >>> 15);
      return n >>> 0;
    }
    function slotsFor(d) { // deterministic "already booked" gaps so it looks like a real calendar
      var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
      var out = [], taken = 0;
      for (var i = 0; i < SLOT_COUNT; i++) {
        if (hash(seed * 31 + i) % 100 < 30 && taken < 9) { taken++; continue; }
        out.push(540 + i * 30);
      }
      return out;
    }
    function fmtTime(min) {
      var h = Math.floor(min / 60), m = min % 60;
      return ((h % 12) || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + (h >= 12 ? 'pm' : 'am');
    }
    function fmtDate(d) { return WEEKDAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
    function showStep(name) {
      Object.keys(steps).forEach(function (k) { steps[k].hidden = k !== name; });
    }

    /* ---- calendar ---- */
    function renderCalendar() {
      monthEl.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
      prevBtn.disabled = monthIndex(view) <= monthIndex(firstBookable);
      nextBtn.disabled = monthIndex(view) >= monthIndex(lastBookable);
      grid.textContent = '';
      var lead = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
      var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      var i, el;
      for (i = 0; i < lead; i++) grid.appendChild(document.createElement('span'));
      for (i = 1; i <= days; i++) {
        var d = new Date(view.getFullYear(), view.getMonth(), i);
        var ok = isAvailable(d);
        el = document.createElement('button');
        el.type = 'button';
        el.className = 'cl-cal__day' + (ok ? ' cl-cal__day--on' : '') + (sameDay(d, today) ? ' cl-cal__day--today' : '');
        el.textContent = i;
        el.disabled = !ok;
        el.setAttribute('data-day', i);
        el.setAttribute('aria-label', fmtDate(d) + (ok ? '' : ', unavailable'));
        if (ok) el.setAttribute('aria-pressed', sameDay(d, selDate) ? 'true' : 'false');
        grid.appendChild(el);
      }
    }

    /* ---- time slots ---- */
    function renderSlots() {
      slotsEl.textContent = '';
      toDetails.hidden = true;
      if (!selDate) { slotsTitle.textContent = 'Choose a date to see available times'; return; }
      slotsTitle.textContent = fmtDate(selDate);
      slotsFor(selDate).forEach(function (min) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cl-slot';
        b.textContent = fmtTime(min);
        b.setAttribute('data-min', min);
        b.setAttribute('aria-pressed', selSlot === min ? 'true' : 'false');
        slotsEl.appendChild(b);
      });
      toDetails.hidden = selSlot === null;
    }

    /* ---- events ---- */
    prevBtn.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
    nextBtn.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });

    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.cl-cal__day--on');
      if (!b) return;
      selDate = new Date(view.getFullYear(), view.getMonth(), Number(b.getAttribute('data-day')));
      selSlot = null;
      renderCalendar();
      renderSlots();
    });

    slotsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.cl-slot');
      if (!b) return;
      selSlot = Number(b.getAttribute('data-min'));
      slotsEl.querySelectorAll('.cl-slot').forEach(function (s) { s.setAttribute('aria-pressed', s === b ? 'true' : 'false'); });
      toDetails.hidden = false;
    });

    function summaryText() { return fmtDate(selDate) + ' at ' + fmtTime(selSlot) + ' · 30 min · Pacific Time'; }

    toDetails.addEventListener('click', function () {
      $('[data-summary]').textContent = summaryText();
      showStep('details');
      $('#bk-name').focus();
    });

    $('[data-back]').addEventListener('click', function () { showStep('pick'); });

    var form = steps.details;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var okName = name.length > 0;
      var okEmail = /^\S+@\S+\.\S+$/.test(email);
      form.querySelector('[data-err="name"]').textContent = okName ? '' : 'Please enter your name.';
      form.querySelector('[data-err="email"]').textContent = okEmail ? '' : 'Please enter a valid email address.';
      form.elements.name.setAttribute('aria-invalid', okName ? 'false' : 'true');
      form.elements.email.setAttribute('aria-invalid', okEmail ? 'false' : 'true');
      if (!okName) { form.elements.name.focus(); return; }
      if (!okEmail) { form.elements.email.focus(); return; }
      $('[data-done-summary]').textContent = summaryText();
      $('[data-done-name]').textContent = 'Thank you, ' + name + '. In the live version a calendar invitation would be emailed to you.';
      showStep('done');
      steps.done.focus();
    });

    $('[data-again]').addEventListener('click', function () {
      selDate = null; selSlot = null;
      form.reset();
      form.querySelectorAll('.cl-field__err').forEach(function (p) { p.textContent = ''; });
      renderCalendar(); renderSlots();
      showStep('pick');
    });

    renderCalendar();
    renderSlots();
    showStep('pick');
  }
})();
