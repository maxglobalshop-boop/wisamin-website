/* ============================================================
   WISAMIN — main.js
   ฉีด header / footer / ปุ่ม LINE ลอย / social-proof toast
   + จัดการเมนูมือถือ + scroll reveal
   ============================================================ */
(function () {
  var C = window.WISAMIN_CONFIG;
  var B = C.brand;

  /* ---------- รายการเมนู ---------- */
  var NAV = [
    { href: 'shop.html', label: 'สินค้าทั้งหมด' },
    { href: 'bundle.html', label: 'เซ็ตสุดคุ้ม' },
    { href: 'quiz.html', label: 'ทำแบบทดสอบ' },
    { href: 'science.html', label: 'คุณภาพ' },
    { href: 'reviews.html', label: 'รีวิว' },
    { href: 'blog.html', label: 'บทความ' },
  ];

  /* ---------- แถบเร่งด่วน + Header ---------- */
  function buildHeader() {
    var host = document.querySelector('[data-header]');
    if (!host) return;
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + '</a></li>';
    }).join('');

    host.innerHTML =
      '<div class="urgency-bar" data-urgency-bar>' +
        '⚡ ' + C.promo.bannerText + ' — เหลือเวลาอีก ' +
        '<strong><span class="cd" data-cd="h">00</span>:<span class="cd" data-cd="m">00</span>:<span class="cd" data-cd="s">00</span></strong>' +
      '</div>' +
      '<header class="site-header"><div class="container"><nav class="nav">' +
        '<a class="brand" href="index.html">' +
          '<span class="logo-mark">W</span>' +
          '<span>' + B.nameTH + '<small>' + B.nameEN + '</small></span>' +
        '</a>' +
        '<ul class="nav-links" data-nav-links>' + links + '</ul>' +
        '<div class="nav-actions">' +
          '<a class="btn btn-line" href="' + B.lineUrl + '" target="_blank" rel="noopener">' +
            '<span class="li" style="width:20px;height:20px;border-radius:5px;background:#fff;color:var(--line-green);display:grid;place-items:center;font-weight:800;font-size:.7rem">L</span>' +
            C.cta.lineText + '</a>' +
          '<button class="nav-toggle" data-nav-toggle aria-label="เมนู"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav></div></header>';

    var toggle = host.querySelector('[data-nav-toggle]');
    var linksEl = host.querySelector('[data-nav-links]');
    toggle.addEventListener('click', function () { linksEl.classList.toggle('open'); });
    linksEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { linksEl.classList.remove('open'); });
    });
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var host = document.querySelector('[data-footer]');
    if (!host) return;
    host.innerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="brand" style="color:#fff"><span class="logo-mark">W</span><span>' + B.nameTH + '<small style="color:#9aa08d">' + B.nameEN + '</small></span></div>' +
            '<p>' + B.tagline + ' ผลิตภัณฑ์เสริมอาหารคุณภาพ สำหรับคนรักสุขภาพยุคใหม่</p>' +
            '<a class="btn btn-line" href="' + B.lineUrl + '" target="_blank" rel="noopener">💬 ' + C.cta.lineText + '</a>' +
          '</div>' +
          '<div><h4>สินค้า</h4><ul>' +
            '<li><a href="shop.html?cat=protein">โปรตีน</a></li>' +
            '<li><a href="shop.html?cat=collagen">คอลลาเจน</a></li>' +
            '<li><a href="shop.html?cat=vitamin">วิตามิน</a></li>' +
            '<li><a href="shop.html?cat=fiber">ไฟเบอร์</a></li>' +
            '<li><a href="bundle.html">เซ็ตสุดคุ้ม</a></li>' +
          '</ul></div>' +
          '<div><h4>เกี่ยวกับเรา</h4><ul>' +
            '<li><a href="about.html">เรื่องราวแบรนด์</a></li>' +
            '<li><a href="science.html">คุณภาพ & มาตรฐาน</a></li>' +
            '<li><a href="reviews.html">รีวิวลูกค้า</a></li>' +
            '<li><a href="blog.html">บทความสุขภาพ</a></li>' +
            '<li><a href="faq.html">คำถามพบบ่อย</a></li>' +
          '</ul></div>' +
          '<div><h4>ติดต่อเรา</h4><ul>' +
            '<li><a href="' + B.lineUrl + '" target="_blank" rel="noopener">LINE: @wisamin</a></li>' +
            '<li><a href="mailto:' + B.email + '">' + B.email + '</a></li>' +
            '<li>โทร ' + B.phone + '</li>' +
            '<li>' + B.hours + '</li>' +
            '<li><a href="contact.html">หน้าติดต่อ</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-disclaimer">' +
          '<p>* ผลิตภัณฑ์เสริมอาหาร ไม่มีผลในการป้องกันหรือรักษาโรค ควรกินอาหารหลากหลายครบ 5 หมู่ ในสัดส่วนที่เหมาะสมเป็นประจำ</p>' +
          '<p>* ผลลัพธ์อาจแตกต่างกันไปในแต่ละบุคคล ควรปรึกษาแพทย์หรือเภสัชกรก่อนบริโภคหากมีโรคประจำตัวหรือกำลังตั้งครรภ์</p>' +
          '<p>เลขที่ อย.: ' + B.fdaNo + ' &nbsp;|&nbsp; © ' + '2026 ' + B.nameEN + '. สงวนลิขสิทธิ์.</p>' +
        '</div>' +
      '</div></footer>';
  }

  /* ---------- ปุ่ม LINE ลอย ---------- */
  function buildLineFloat() {
    if (document.querySelector('.line-float')) return;
    var a = document.createElement('a');
    a.className = 'line-float';
    a.href = B.lineUrl; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '<span class="li">L</span><span class="txt">' + C.cta.lineText + '</span>';
    document.body.appendChild(a);
  }

  /* ---------- Social proof toast ---------- */
  function startSocialProof() {
    var sp = C.socialProof;
    if (!sp.enabled) return;
    var el = document.createElement('div');
    el.className = 'sp-toast';
    document.body.appendChild(el);
    var products = (window.WISAMIN_PRODUCTS || []).map(function (p) { return p.name; });
    if (!products.length) products = ['วิตามินรวม', 'เวย์โปรตีน', 'วิตามินซี'];

    function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
    function show() {
      var mins = 1 + Math.floor(Math.random() * sp.minsAgoMax);
      el.innerHTML = '<div class="sp-ic">🛍️</div><div><b>' + pick(sp.names) + ' จาก ' + pick(sp.cities) + '</b>' +
        '<small>เพิ่งสั่งซื้อ ' + pick(products) + ' · เมื่อ ' + mins + ' นาทีที่แล้ว</small></div>';
      el.classList.add('show');
      setTimeout(function () { el.classList.remove('show'); }, 4500);
    }
    setTimeout(show, 4000);
    setInterval(show, sp.intervalMs);
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }
  window.initReveal = initReveal;

  /* ---------- helper: LINE CTA block (ใช้ในหลายหน้า) ---------- */
  window.lineCtaBlock = function () {
    return '<section class="cta-final"><div class="container text-center reveal">' +
      '<span class="eyebrow" style="background:rgba(255,255,255,.12);color:#fff">ข้อเสนอพิเศษ</span>' +
      '<h2>อย่าปล่อยให้สุขภาพดีๆ ต้องรอ</h2>' +
      '<p class="lead" style="max-width:52ch;margin:14px auto 0">' + C.cta.lineSub + '</p>' +
      '<div class="countdown-big" data-countdown-big>' +
        '<div class="cd-unit"><b data-cd="h">00</b><span>ชั่วโมง</span></div>' +
        '<div class="cd-unit"><b data-cd="m">00</b><span>นาที</span></div>' +
        '<div class="cd-unit"><b data-cd="s">00</b><span>วินาที</span></div>' +
      '</div>' +
      '<a class="btn btn-line btn-lg" href="' + B.lineUrl + '" target="_blank" rel="noopener">💬 ' + C.cta.lineTextLong + '</a>' +
      '<p class="note" style="color:#aeb39f;margin-top:14px">ส่วนลดพิเศษเฉพาะลูกค้าที่แอดไลน์ในช่วงโปรโมชันเท่านั้น</p>' +
    '</div></section>';
  };

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildHeader();
    buildFooter();
    buildLineFloat();
    startSocialProof();
    initReveal();
    if (window.initUrgency) window.initUrgency();
  });
})();
