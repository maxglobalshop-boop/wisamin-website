/* ============================================================
   WISAMIN — urgency.js
   ตัวนับถอยหลัง (จริงในเบราว์เซอร์) + ตัวเลขผู้ชม/ยอดขายจำลอง
   ทุกค่าปรับได้ใน config.js
   ============================================================ */
(function () {
  var C = window.WISAMIN_CONFIG;
  var timers = [];  // เก็บ interval ทั้งหมด เพื่อเคลียร์ก่อน re-init (กันซ้อน)

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------- คำนวณเวลาสิ้นสุดโปร ---------- */
  function getDeadline() {
    if (C.promo.countdownMode === 'fixed') {
      return new Date(C.promo.fixedDeadline).getTime();
    }
    // daily: สิ้นสุดเที่ยงคืนของวันนี้
    var end = new Date();
    end.setHours(23, 59, 59, 0);
    return end.getTime();
  }

  function tickCountdown() {
    var diff = getDeadline() - Date.now();
    if (diff < 0) diff = 0;
    var h = Math.floor(diff / 3.6e6);
    var m = Math.floor((diff % 3.6e6) / 6e4);
    var s = Math.floor((diff % 6e4) / 1000);
    document.querySelectorAll('[data-cd="h"]').forEach(function (e) { e.textContent = pad(h); });
    document.querySelectorAll('[data-cd="m"]').forEach(function (e) { e.textContent = pad(m); });
    document.querySelectorAll('[data-cd="s"]').forEach(function (e) { e.textContent = pad(s); });
  }

  /* ---------- นับเลขวิ่ง (counter animation) ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-decimals') || '0') | 0;
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = Number(val.toFixed(decimals)).toLocaleString('th-TH');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = Number(target.toFixed(decimals)).toLocaleString('th-TH');
    }
    requestAnimationFrame(step);
  }
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) { els.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: .4 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- ผู้กำลังชม + ยอดขายวันนี้ (จำลอง) ---------- */
  function initLiveStats() {
    var L = C.liveStats;
    var viewEls = document.querySelectorAll('[data-live="viewing"]');
    var soldEls = document.querySelectorAll('[data-live="soldtoday"]');
    var sold = L.soldTodayBase;

    function jitterViewing() {
      var v = L.viewingBase + Math.floor((Math.random() - 0.5) * 2 * L.viewingJitter);
      viewEls.forEach(function (e) { e.textContent = v.toLocaleString('th-TH'); });
    }
    function driftSold() {
      sold += Math.floor(Math.random() * L.soldTodayDrift);
      soldEls.forEach(function (e) { e.textContent = sold.toLocaleString('th-TH'); });
    }
    if (viewEls.length) { jitterViewing(); timers.push(setInterval(jitterViewing, 3500)); }
    if (soldEls.length) { driftSold(); timers.push(setInterval(driftSold, 6000)); }
  }

  window.initUrgency = function () {
    timers.forEach(clearInterval); timers = [];  // กันตั้ง interval ซ้ำเมื่อเรียกซ้ำ
    tickCountdown();
    timers.push(setInterval(tickCountdown, 1000));
    initCounters();
    initLiveStats();
  };
})();
