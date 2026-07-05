/* ============================================================
   WISAMIN — quiz.js
   แบบประเมินสั้นๆ → แนะนำสินค้าที่เหมาะ (ให้คำแนะนำเชิงไลฟ์สไตล์)
   ============================================================ */
(function () {
  var QUESTIONS = [
    {
      q: 'เป้าหมายการดูแลตัวเองของคุณคืออะไร?',
      a: [
        { t: 'ออกกำลังกาย / สร้างกล้ามเนื้อ', tag: 'protein' },
        { t: 'เติมสารอาหารให้ครบในแต่ละวัน', tag: 'vitamin' },
        { t: 'ดูแลสุขภาพองค์รวมระยะยาว', tag: 'capsule' },
        { t: 'ดูแลผิวพรรณให้ดูดี', tag: 'collagen' },
      ],
    },
    {
      q: 'ไลฟ์สไตล์ประจำวันของคุณเป็นแบบไหน?',
      a: [
        { t: 'ทำงานหนัก พักผ่อนน้อย', tag: 'vitamin' },
        { t: 'ออกกำลังกายสม่ำเสมอ', tag: 'protein' },
        { t: 'อยู่ในร่มเป็นส่วนใหญ่ โดนแดดน้อย', tag: 'vitamin-d3' },
        { t: 'ทานอาหารไม่ค่อยตรงเวลา', tag: 'probiotic' },
      ],
    },
    {
      q: 'คุณกังวลเรื่องใดมากที่สุด?',
      a: [
        { t: 'ความสดชื่น กระปรี้กระเปร่า', tag: 'vitamin-c' },
        { t: 'ระบบขับถ่าย / ระบบทางเดินอาหาร', tag: 'probiotic' },
        { t: 'สุขภาพหัวใจและสมองเชิงโภชนาการ', tag: 'omega-3' },
        { t: 'รูปร่างและการคุมอาหาร', tag: 'protein' },
      ],
    },
    {
      q: 'คุณชอบรูปแบบผลิตภัณฑ์แบบไหน?',
      a: [
        { t: 'ชงดื่ม รสอร่อย', tag: 'protein' },
        { t: 'แคปซูล/เม็ด ทานง่าย', tag: 'multivitamin' },
        { t: 'ซอฟต์เจล กลืนง่าย', tag: 'omega-3' },
        { t: 'แบบซองพกพาสะดวก', tag: 'collagen' },
      ],
    },
  ];

  var idx = 0, scores = {};

  function el(id) { return document.getElementById(id); }

  function render() {
    var q = QUESTIONS[idx];
    var pct = Math.round((idx) / QUESTIONS.length * 100);
    el('quizProgress').style.width = pct + '%';
    el('quizStep').textContent = 'คำถาม ' + (idx + 1) + ' / ' + QUESTIONS.length;
    el('quizQ').textContent = q.q;
    el('quizA').innerHTML = q.a.map(function (a, i) {
      return '<button class="quiz-opt" data-i="' + i + '">' + a.t + '</button>';
    }).join('');
    el('quizA').querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var tag = q.a[b.getAttribute('data-i')].tag;
        scores[tag] = (scores[tag] || 0) + 1;
        idx++;
        if (idx < QUESTIONS.length) render(); else finish();
      });
    });
  }

  function finish() {
    el('quizProgress').style.width = '100%';
    // เลือกสินค้า: จับคู่ tag ที่ได้คะแนนสูงสุดกับ id หรือ category
    var best = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
    var rec = null;
    for (var i = 0; i < best.length && !rec; i++) {
      var t = best[i];
      rec = getProductById(t) || (window.WISAMIN_PRODUCTS.filter(function (p) { return p.category === t; })[0]);
    }
    if (!rec) rec = getProductById('multivitamin');

    var C = window.WISAMIN_CONFIG;
    el('quizCard').innerHTML =
      '<div class="text-center reveal">' +
        '<span class="eyebrow">ผลลัพธ์สำหรับคุณ</span>' +
        '<h2>เราขอแนะนำ</h2>' +
        '<p class="lead" style="margin:10px auto 26px;max-width:46ch">จากคำตอบของคุณ ตัวเลือกนี้น่าจะเข้ากับไลฟ์สไตล์ของคุณมากที่สุด</p>' +
        '<div style="max-width:320px;margin:0 auto">' + window.productCard(rec) + '</div>' +
        '<div style="margin-top:26px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<a class="btn btn-accent btn-lg" href="product.html?id=' + rec.id + '">ดูสินค้าที่แนะนำ</a>' +
          '<a class="btn btn-line btn-lg" href="' + C.brand.lineUrl + '" target="_blank" rel="noopener">💬 ปรึกษาผู้เชี่ยวชาญฟรี</a>' +
        '</div>' +
        '<p class="note" style="margin-top:16px">อยากได้คำแนะนำเฉพาะบุคคล? แอดไลน์คุยกับทีมของเราได้เลย</p>' +
      '</div>';
    el('quizCard').style.display = 'block';
    el('quizBox').style.display = 'none';
    if (window.initReveal) window.initReveal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!el('quizBox')) return;
    render();
  });
})();
