/* ============================================================
   WISAMIN — render.js
   ฟังก์ชันสร้างการ์ดสินค้า / กริด (ใช้ร่วมหลายหน้า)
   ============================================================ */
(function () {
  function stars(r) {
    var full = Math.round(r);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  }
  function money(n) { return '฿' + Number(n).toLocaleString('th-TH'); }

  /* การ์ดสินค้า 1 ชิ้น */
  window.productCard = function (p) {
    var badge = p.badge
      ? '<span class="product-badge ' + (/ขายดี|อันดับ 1/.test(p.badge) ? 'hot' : '') + '">' + p.badge + '</span>'
      : '';
    var stockPct = Math.max(6, Math.min(100, Math.round(p.stock)));
    var thumbInner = p.image
      ? '<img class="product-photo" src="' + p.image + '" alt="' + p.name + '" loading="lazy">'
      : '<div class="mini-jar" style="background:linear-gradient(160deg,' + p.color + ',' + shade(p.color) + ')">' + p.categoryLabel + '</div>';
    return '' +
      '<a class="product-card reveal" href="product.html?id=' + p.id + '">' +
        '<div class="product-thumb" style="background:linear-gradient(160deg,' + p.color + '22,' + p.color + '10)">' +
          badge + thumbInner +
        '</div>' +
        '<div class="product-body">' +
          '<span class="product-cat">' + p.categoryLabel + '</span>' +
          '<div class="product-name">' + p.name + '</div>' +
          '<div class="product-sub">' + p.short + '</div>' +
          '<div class="product-rating"><span class="stars">' + stars(p.rating) + '</span> ' + p.rating + ' (' + p.reviews.toLocaleString('th-TH') + ')</div>' +
          '<div class="price-row"><span class="price-now">' + money(p.price) + '</span>' +
            (p.oldPrice ? '<span class="price-old">' + money(p.oldPrice) + '</span>' : '') +
            '<span class="price-unit">' + p.unit + '</span></div>' +
          '<div class="stock-bar"><i style="width:' + stockPct + '%"></i></div>' +
          '<div class="stock-hint">🔥 เหลือเพียง ' + p.stock + ' ชิ้น</div>' +
          '<span class="btn btn-accent btn-block">ดูสินค้า</span>' +
        '</div>' +
      '</a>';
  };

  window.renderGrid = function (selector, list) {
    var host = document.querySelector(selector);
    if (!host) return;
    host.innerHTML = list.map(window.productCard).join('');
  };

  /* ทำสีให้เข้มขึ้นสำหรับ gradient */
  function shade(hex) {
    var h = hex.replace('#', '');
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    r = Math.round(r * .7); g = Math.round(g * .7); b = Math.round(b * .7);
    return '#' + [r, g, b].map(function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
  }
  window.shadeColor = shade;
  window.starStr = stars;
  window.moneyStr = money;
})();
