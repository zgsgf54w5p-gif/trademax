/* ============================================================
   TradMax — shared UI, cart & ordering
   Requires assets/js/i18n.js + assets/js/products.js first
   ============================================================ */

/* ---------- cart (localStorage) ---------- */
const CART_KEY = 'tm_cart';
const TM = {
  cart(){ try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch(e){ return []; } },
  save(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); TM.badge(); },
  add(id, qty){
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const c = TM.cart(); const line = c.find(l => l.id === id);
    if(line) line.qty += qty; else c.push({ id:id, qty:qty });
    TM.save(c);
  },
  setQty(id, qty){
    const c = TM.cart(); const line = c.find(l => l.id === id);
    if(!line) return;
    line.qty = Math.max(1, parseInt(qty, 10) || 1);
    TM.save(c);
  },
  remove(id){ TM.save(TM.cart().filter(l => l.id !== id)); },
  clear(){ TM.save([]); },
  count(){ return TM.cart().reduce((s,l) => s + l.qty, 0); },
  subtotal(){
    return TM.cart().reduce((s,l) => {
      const p = getProduct(l.id);
      return p ? s + tierPrice(p, l.qty) * l.qty : s;
    }, 0);
  },
  /* door-to-door consolidation fee: % of goods, floor at minimum */
  shipping(){ const s = TM.subtotal(); return s ? Math.max(BIZ.shippingDoorMin, s * BIZ.shippingDoorPct) : 0; },
  total(){ return TM.subtotal() + TM.shipping(); },
  badge(){
    document.querySelectorAll('.tm-cart-count').forEach(el => {
      const n = TM.count();
      el.textContent = n; el.style.display = n ? 'inline-flex' : 'none';
    });
  }
};

/* ---------- WhatsApp ---------- */
function waLink(text){ return 'https://wa.me/' + BIZ.whatsapp + '?text=' + encodeURIComponent(text); }

function buildOrderMessage(){
  const L = [t('om_head'), ''];
  TM.cart().forEach(l => {
    const p = getProduct(l.id); if(!p) return;
    const u = tierPrice(p, l.qty);
    L.push('• ' + p.name + ' × ' + l.qty + ' @ ' + money(u) + ' = ' + money(u * l.qty));
  });
  L.push('');
  L.push(t('om_goods') + ' ' + money(TM.subtotal()));
  L.push(t('om_ship') + ' ' + money(TM.shipping()));
  L.push('*' + t('tot_total') + ': ' + money(TM.total()) + ' ≈ ' + fcfa(TM.total()).toLocaleString('en-US') + ' FCFA*');
  L.push('');
  L.push(t('om_confirm'));
  return L.join('\n');
}

/* ---------- shared chrome ---------- */
function renderChrome(active){
  const hdr = document.getElementById('site-header');
  if(hdr){
    const links = [
      { id:'home',  href:'index.html',       label:t('nav_home') },
      { id:'shop',  href:'index.html#shop',  label:t('nav_shop') },
      { id:'how',   href:'how.html',         label:t('nav_how') },
      { id:'admin', href:'admin.html',       label:t('nav_admin') },
      { id:'basket', href:'checkout.html',   label:t('nav_checkout') },
      { id:'orders', href:'orders.html',     label:t('nav_orders') }
    ];
    hdr.innerHTML =
      '<div class="wrap topbar">' +
        '<a class="brand" href="index.html">' +
          '<img src="assets/img/logo.svg" alt="' + BIZ.name + '" />' +
          '<span class="brand-txt"><strong>' + BIZ.name + '</strong><small>' + BIZ.tagline + '</small></span>' +
        '</a>' +
        '<nav class="nav">' +
          links.map(l => '<a href="' + l.href + '"' + (l.id === active ? ' class="on"' : '') + '>' + l.label + '</a>').join('') +
          '<a class="wa" href="' + waLink(t('enquiry')) + '" target="_blank" rel="noopener">💬 WhatsApp</a>' +
          '<button class="cart-btn" type="button" onclick="TM.openCart()" aria-label="basket">🧺 <span class="tm-cart-count" style="display:none">0</span></button>' +
          '<button class="lang-btn" type="button" onclick="I18N.toggle()" title="Langue / Language">' + I18N.btnLabel() + '</button>' +
        '</nav>' +
      '</div>';
  }
  const ftr = document.getElementById('site-footer');
  if(ftr){
    ftr.innerHTML =
      '<div class="wrap foot-grid">' +
        '<div><img class="foot-logo" src="assets/img/logo.svg" alt=""/><p><strong>' + BIZ.name + '</strong> — ' + BIZ.tagline + t('foot_tag') + BIZ.factories + t('foot_fact') + '</p></div>' +
        '<div><h4>' + t('foot_contact') + '</h4><p>📞 <a href="tel:' + BIZ.phoneTel + '">' + BIZ.phoneDisplay + '</a><br/>💬 <a href="' + waLink(t('hello')) + '" target="_blank" rel="noopener">' + t('foot_wa') + '</a><br/>✉️ <a href="mailto:' + BIZ.email + '">' + BIZ.email + '</a></p></div>' +
        '<div><h4>' + t('foot_addr') + '</h4><p>' + BIZ.addressEn.replace(/, /g, '<br/>') + '</p></div>' +
      '</div>' +
      '<div class="wrap foot-base">© ' + new Date().getFullYear() + ' ' + BIZ.name + ' ' + t('foot_base') + '</div>';
  }
  TM.badge();
}

/* ---------- cart drawer ---------- */
TM.openCart = function(){
  let d = document.getElementById('tm-drawer');
  if(!d){
    d = document.createElement('div');
    d.id = 'tm-drawer';
    d.innerHTML =
      '<div class="drawer-mask" onclick="TM.closeCart()"></div>' +
      '<aside class="drawer"><header><h3>' + t('drawer_title') + '</h3>' +
        '<button class="x" type="button" onclick="TM.closeCart()">✕</button></header>' +
        '<div class="drawer-body" id="tm-drawer-body"></div>' +
        '<footer class="drawer-foot" id="tm-drawer-foot"></footer></aside>';
    document.body.appendChild(d);
  }
  TM.renderDrawer();
  d.classList.add('open');
};
TM.closeCart = function(){ const d = document.getElementById('tm-drawer'); if(d) d.classList.remove('open'); };
TM.renderDrawer = function(){
  const body = document.getElementById('tm-drawer-body');
  const foot = document.getElementById('tm-drawer-foot');
  if(!body) return;
  const c = TM.cart();
  if(!c.length){
    body.innerHTML = '<p class="empty">' + t('drawer_empty') + '</p>';
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = c.map(l => {
    const p = getProduct(l.id); if(!p) return '';
    const u = tierPrice(p, l.qty);
    return '<div class="dline" data-id="' + p.id + '">' +
      '<span class="dicon" style="background:' + catGrad(p.cat) + '">' + (p.icon || '📦') + '</span>' +
      '<div class="dinfo"><strong>' + p.name + '</strong>' +
        '<small>' + t('moq_short') + ' ' + p.moq + ' · ' + money(u) + t('unit_at') + l.qty + t('pcs') + '</small>' +
        '<div class="qty-row"><button type="button" onclick="TM.bump(\'' + p.id + '\',-1)">−</button>' +
        '<input type="number" min="' + p.moq + '" value="' + l.qty + '" onchange="TM.setQty(\'' + p.id + '\', this.value)"/>' +
        '<button type="button" onclick="TM.bump(\'' + p.id + '\',1)">+</button>' +
        '<span class="dline-total">' + money(u * l.qty) + '</span></div></div>' +
      '<button class="del" type="button" title="✕" onclick="TM.remove(\'' + p.id + '\');TM.renderDrawer()">🗑️</button></div>';
  }).join('');
  foot.innerHTML =
    '<div class="tot"><span>' + t('tot_goods') + '</span><b>' + money(TM.subtotal()) + '</b></div>' +
    '<div class="tot"><span>' + t('tot_ship') + '</span><b>' + money(TM.shipping()) + '</b></div>' +
    '<div class="tot grand"><span>' + t('tot_total') + '</span><b>' + moneyF(TM.total()) + '</b></div>' +
    '<a class="btn solid big" href="checkout.html">' + t('btn_checkout') + '</a>' +
    '<a class="quick-wa" href="' + waLink(buildOrderMessage()) + '" target="_blank" rel="noopener">💬 ' + t('btn_quick_wa') + '</a>' +
    '<button class="linkish" type="button" onclick="if(confirm(t(\'confirm_clear\'))){TM.clear();TM.renderDrawer();}">' + t('btn_clear') + '</button>';
};
TM.bump = function(id, dir){
  const l = TM.cart().find(x => x.id === id); if(!l) return;
  const p = getProduct(id);
  l.qty = Math.max(p ? p.moq : 1, l.qty + dir);
  TM.save(TM.cart()); TM.renderDrawer();
};

/* ---------- product card ---------- */
function stars(r){
  const f = Math.round(r);
  return '★★★★★'.slice(0, f) + '☆☆☆☆☆'.slice(0, 5 - f);
}
function badges(p){
  const b = [];
  if(p.hot) b.push('<i class="bd hot">🔥 ' + t('chk_hot').replace('🔥 ', '') + '</i>');
  if(p.isNew) b.push('<i class="bd new">✨ ' + t('chk_new').replace('✨ ', '') + '</i>');
  if(b.length) return '<span class="bds">' + b.join('') + '</span>';
  return '';
}
function productCard(p){
  const from = p.tiers[p.tiers.length - 1].p;
  return '<article class="pcard" data-id="' + p.id + '">' +
    badges(p) +
    '<a class="pthumb" style="background:' + catGrad(p.cat) + '" href="product.html?id=' + p.id + '">' +
      '<span class="pemoji">' + (p.icon || '📦') + '</span></a>' +
    '<div class="pbody">' +
      '<a class="pname" href="product.html?id=' + p.id + '">' + p.name + '</a>' +
      '<p class="psup">' + (p.supplier || t('verified_supplier')) + '</p>' +
      '<p class="prate"><span class="st">' + stars(p.rating || 4.5) + '</span> ' + (p.rating || 4.5) + ' · ' + fmtNum(p.sold || 0) + t('card_sold') + '</p>' +
      '<div class="pprice"><b>' + money(from) + '</b><small>/unit · ' + t('moq_short') + ' ' + p.moq + t('pcs') + '<br/><em>≈ ' + fcfa(from).toLocaleString('en-US') + ' FCFA</em></small></div>' +
      '<div class="pact">' +
        '<a class="btn ghost sm" href="product.html?id=' + p.id + '">' + t('btn_details') + '</a>' +
        '<button class="btn solid sm" type="button" onclick="TM.add(\'' + p.id + '\',' + p.moq + ');TM.openCart()">' + t('btn_basket') + '</button>' +
      '</div></div></article>';
}

/* ---------- colour-scan palette (uses colorDist from products.js) ---------- */
const SCAN_COLORS = ['#e53935','#f57c00','#fdd835','#43a047','#00acc1','#1e88e5','#5e35b1','#ec407a','#795548','#212121','#ffffff'];
function scanSwatches(){
  return '<div class="swatches" title="' + t('sw_label') + '">' +
    SCAN_COLORS.map(c => '<button type="button" class="sw" data-c="' + c + '" style="background:' + c + '" aria-label="colour ' + c + '"></button>').join('') +
    '<span class="sw-label">' + t('sw_label') + '</span></div>';
}
function matchesScan(p, hex){
  return !!hex && !!p.color && colorDist(p.color, hex) < 120;
}