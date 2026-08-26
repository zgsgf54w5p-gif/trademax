/* ============================================================
   TradMax — jsdom smoke test (no browser needed)
   Run: node tests/smoke.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');
let failures = 0;
function ok(cond, label){
  console.log((cond ? '  ✅' : '  ❌') + ' ' + label);
  if(!cond) failures++;
}

function boot(page, extra, url, lang){
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const dom = new JSDOM(html, {
    url: url || ('http://localhost/' + page),
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const w = dom.window;
  if(lang){ /* must be set BEFORE i18n loads */
    Object.defineProperty(w.navigator, 'language', { value: lang, configurable: true });
  }
  w.scrollTo = () => {};
  const opened = [];
  const alerts = [];
  w.open = u => { opened.push(u); return true; };
  w.alert = m => alerts.push(m);
  w.confirm = () => true;

  /* combine shared + page scripts + inline scripts into ONE eval,
     so const/let bindings share scope like real <script> tags */
  const parts = ['i18n.js','products.js','app.js']
    .map(f => fs.readFileSync(path.join(ROOT,'assets/js',f),'utf8'));
  (extra || []).forEach(f =>
    parts.push(fs.readFileSync(path.join(ROOT,'assets/js',f),'utf8')));
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m => parts.push(m[1]));
  /* re-export block-scoped globals for later w.eval assertions */
  parts.push(';Object.assign(window,{TM:TM,I18N:I18N,t:t,DICT:DICT,BIZ:BIZ,' +
    'getProduct:getProduct,tierPrice:tierPrice,money:money,moneyF:moneyF,' +
    'fcfa:fcfa,allProducts:allProducts,CATEGORIES:CATEGORIES,' +
    'CUSTOM_PRODUCTS:CUSTOM_PRODUCTS,FCFA_RATE:FCFA_RATE});');
  w.eval(parts.join('\n;\n'));

  /* outside-only mode doesn't compile onclick= attributes; emulate them with
     document-level delegation so it also survives dynamic re-renders */
  w.document.addEventListener('click', e => {
    const el = e.target && e.target.closest ? e.target.closest('[onclick]') : null;
    if(el) w.eval(el.getAttribute('onclick'));
  });

  return { dom, w, opened, alerts };
}

/* ---------- 1. homepage renders ---------- */
console.log('\n— index.html —');
{
  const { w } = boot('index.html');
  const g = w.document.getElementById('grid');
  ok(g && g.querySelectorAll('.pcard').length > 20,
     'product grid renders (' + (g ? g.querySelectorAll('.pcard').length : 0) + ' cards)');
  ok(w.document.getElementById('cat-grid').querySelectorAll('.cat-card').length === 8,
     'category grid shows 8 categories');
  ok(w.document.querySelectorAll('#chips .chip').length === 9,
     'filter chips: all + 8 categories');
  ok(w.document.getElementById('site-header').textContent.includes('TradMax'),
     'header chrome rendered');

  /* search filter */
  const q = w.document.getElementById('q');
  q.value = 'earbuds';
  q.dispatchEvent(new w.Event('input', { bubbles:true }));
  const n = w.document.querySelectorAll('#grid .pcard').length;
  ok(n >= 1 && n < 5, 'search "earbuds" narrows results (' + n + ')');

  /* basket add from card opens drawer */
  q.value = ''; q.dispatchEvent(new w.Event('input', { bubbles:true }));
  w.document.querySelector('#grid .pcard .pact button.solid').click();
  ok(w.eval('TM.count()') > 0, 'add-to-basket works (count=' + w.eval('TM.count()') + ')');
  ok(!!w.document.getElementById('tm-drawer'), 'cart drawer opens');
}

/* ---------- 2. product detail page ---------- */
console.log('\n— product.html?id=e2 —');
{
  const { w } = boot('product.html', ['product-page.js'],
                     'http://localhost/product.html?id=e2');
  ok(w.document.getElementById('pd-name').textContent.includes('Earbuds'), 'product name shown');
  ok(w.document.querySelectorAll('#tiers-body tr').length === 4, '4 price tiers listed');
  ok(w.document.querySelectorAll('#related .pcard').length === 4, 'related products shown');

  const before = w.document.getElementById('c-unit').textContent;
  w.eval('bump(1)');
  ok(w.document.getElementById('c-unit').textContent === before,
     'unit price stable at qty+1 within same tier');
  w.eval('document.getElementById("qty").value = 500; recalc();');
  ok(parseFloat(w.document.getElementById('c-unit').textContent.replace('$','')) < 6,
     'tier discount applied at qty 500 (' + w.document.getElementById('c-unit').textContent + ')');
}

const TM_SHIP = 225.6; /* 12% of $1880 shipping floor/pct */

/* ---------- 3. checkout happy path ---------- */
console.log('\n— checkout.html —');
{
  const { w, opened, alerts } = boot('checkout.html', ['checkout-page.js']);

  ok(w.document.getElementById('co-empty').style.display !== 'none',
     'empty-basket notice shows when cart is empty');

  /* seed cart: e1 @10 (tier $129), e2 @100 (tier $5.9) */
  w.eval('TM.save([{id:"e1",qty:10},{id:"e2",qty:100}])');
  w.eval('drawSummary()');
  ok(w.document.querySelectorAll('#sum-lines .sline').length === 2, 'summary lists 2 lines');
  ok(w.document.getElementById('co-total').textContent.includes('FCFA'),
     'total shows USD · FCFA (' + w.document.getElementById('co-total').textContent.slice(0,28) + '…)');
  ok(Math.abs(w.eval('TM.subtotal()') - (129*10 + 5.9*100)) < 0.01,
     'subtotal math correct ($' + w.eval('TM.subtotal()') + ')');

  /* invalid submit: no name, short phone → blocked */
  const before0 = opened.length;
  w.document.getElementById('buyer-form')
    .dispatchEvent(new w.Event('submit', { bubbles:true, cancelable:true }));
  ok(opened.length === before0 && alerts.length === 1,
     'invalid form blocked with alert, WhatsApp NOT opened');

  /* valid order */
  w.document.getElementById('f-name').value  = 'Jean Kamga';
  w.document.getElementById('f-phone').value = '+237 691 234 567';
  w.document.getElementById('f-city').value  = 'Douala';
  w.document.getElementById('f-pay').value   = 'momo';
  w.document.getElementById('f-notes').value = 'Deliver near Bonamoussadi';
  w.document.getElementById('buyer-form')
    .dispatchEvent(new w.Event('submit', { bubbles:true, cancelable:true }));

  ok(opened.length > before0, 'WhatsApp opened on valid submit');
  const url = opened[opened.length - 1];
  const msg = decodeURIComponent(url.split('?text=')[1] || '');
  ok(url.startsWith('https://wa.me/8616617435017'), 'goes to BIZ WhatsApp number');
  ok(msg.includes('Jean Kamga'),            'message includes buyer name');
  ok(msg.includes('+237 691 234 567'),      'message includes phone');
  ok(msg.includes('Douala'),                'message includes delivery city');
  ok(msg.includes('Mobile Money'),          'message includes payment method');
  ok(msg.includes('Smartphone X15 Pro 256GB × 10'), 'line item 1 correct');
  ok(msg.includes('TWS Wireless Earbuds Pro × 100'), 'line item 2 correct');
  ok(msg.includes('Bonamoussadi'),          'message includes notes');
  ok(msg.toLowerCase().includes('fcfa'),    'message includes FCFA conversion');

  ok(w.eval('TM.count()') === 0, 'cart cleared after sending');
  ok(w.document.getElementById('co-done').style.display !== 'none', 'success view shown');
  ok(w.document.getElementById('reopen-wa').href.startsWith('https://wa.me/'), 'reopen link ready');

  const buyer = JSON.parse(w.localStorage.getItem('tm_buyer'));
  ok(buyer && buyer.name === 'Jean Kamga' && buyer.city === 'Douala',
     'buyer details saved for next visit');

  /* order archived with reference */
  const orders = JSON.parse(w.localStorage.getItem('tm_orders') || '[]');
  ok(orders.length === 1 && /^TM-[0-9A-Z]{4,8}$/.test(orders[0].ref),
     'order archived with valid reference (' + (orders[0] ? orders[0].ref : 'none') + ')');
  ok(orders[0] && orders[0].lines.length === 2 &&
     Math.abs(orders[0].total - (1880 + TM_SHIP)) < 0.01,
     'archived totals correct ($' + (orders[0] ? orders[0].total : '?') + ')');
  ok(msg.includes(orders[0].ref), 'WhatsApp message contains the reference');
  ok(w.document.getElementById('co-ref').textContent === orders[0].ref,
     'success screen shows the reference');
}

/* ---------- 4. admin still works ---------- */
console.log('\n— admin.html —');
{
  const { w } = boot('admin.html', ['admin-page.js']);
  ok(w.document.getElementById('f-cat').options.length === 8, 'category dropdown populated');
  ok(w.document.querySelectorAll('#tiers-edit .tier-row').length === 1,
     'tier editor starts with 1 row');
}

/* ---------- 5. my-orders page ---------- */
console.log('\n— orders.html —');
{
  const { w } = boot('orders.html', ['orders-page.js']);
  ok(w.document.getElementById('orders-empty').style.display !== 'none' &&
     w.document.getElementById('orders-list').style.display === 'none',
     'empty state shown for new visitor');

  /* seed two archived orders, re-render */
  /* seed two archived orders, newest FIRST (as checkout's unshift stores them) */
  const seed = [
    { ref:'TM-TEST02', date:new Date('2026-02-02').toISOString(),
      lines:[{ name:'Porcelain Floor Tiles 60x60cm', qty:1000, unit:5.2 }],
      goods:5200, ship:624, total:5824, buyer:{ city:'Yaoundé' }, notes:'' },
    { ref:'TM-TEST01', date:new Date('2026-01-15').toISOString(),
      lines:[{ name:'Smartphone X15 Pro 256GB', qty:10, unit:129 }],
      goods:1290, ship:154.8, total:1444.8,
      buyer:{ city:'Douala' }, notes:'' }
  ];
  w.localStorage.setItem('tm_orders', JSON.stringify(seed));
  w.initOrders();

  ok(w.document.getElementById('orders-count').textContent === '(2)', 'order count shows (2)');
  const cards = w.document.querySelectorAll('.ocard');
  ok(cards.length === 2, 'renders 2 order cards');
  ok(cards[0].textContent.includes('TM-TEST02'), 'most recent order listed first');
  ok(cards[1].textContent.includes('FCFA'), 'totals displayed in FCFA too');
  ok(cards[0].querySelector('.ost') !== null, 'status badge present');
  const trackLink = cards[0].querySelector('a[href*="wa.me"]');
  ok(trackLink && decodeURIComponent(trackLink.href).includes('TM-TEST02'),
     'track button opens WhatsApp quoting the reference');
}

/* ---------- 6. how it works / FAQ page ---------- */
console.log('\n— how.html —');
{
  const { w } = boot('how.html');
  ok(w.document.querySelectorAll('.step').length === 5, '5 "how it works" steps render');
  ok(w.document.querySelectorAll('.faq details').length === 6, '6 FAQ items present');
  ok(w.document.querySelector('.faq details summary').textContent.includes('MOQ'),
     'first FAQ is about MOQ');
  ok(w.document.getElementById('hw-wa').href.startsWith('https://wa.me/'),
     'CTA WhatsApp link wired to BIZ number');
  const activeNav = w.document.querySelector('.nav a.on');
  ok(activeNav && activeNav.getAttribute('href') === 'how.html',
     'nav marks How-it-works as active');
  /* i18n: FR translation applies (fresh window, fr browser language) */
  const { w: w2 } = boot('how.html', null, null, 'fr-FR');
  ok(w2.document.querySelector('.faq details summary').textContent.indexOf('MOQ') !== -1 &&
     w2.document.getElementById('hw-wa').textContent.includes('Discuter'),
     'FR locale translates the page');
}

console.log('\n' + (failures ? '❌ ' + failures + ' FAILURE(S)' : '🎉 ALL CHECKS PASSED'));
process.exit(failures ? 1 : 0);

