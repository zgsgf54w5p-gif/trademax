/* ============================================================
   TradMax — product detail page logic
   ============================================================ */
let P = null;

function initProductPage(){
  renderChrome('shop');
  const id = new URLSearchParams(location.search).get('id');
  P = getProduct(id);
  if(!P){
    document.getElementById('pd').innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:60px 0">' +
        '<h1>' + t('not_found_h') + '</h1>' +
        '<p style="color:var(--mut);margin:12px 0 22px">' + t('not_found_p') + '</p>' +
        '<a class="btn solid" href="index.html#shop" style="width:auto">' + t('btn_back') + '</a></div>';
    return;
  }

  document.title = P.name + ' — ' + BIZ.name;
  document.getElementById('crumbs').innerHTML =
    '<a href="index.html">' + t('crumb_home') + '</a> › <a href="index.html#shop">' + t('crumb_products') + '</a> › <a href="index.html#shop" onclick="setCat(\'' + P.cat + '\')">' + catName(P.cat) + '</a> › ' + P.name;

  const thumb = document.getElementById('pd-thumb');
  thumb.style.background = catGrad(P.cat);
  thumb.querySelector('.pemoji').textContent = P.icon || '📦';

  document.getElementById('pd-name').innerHTML = badges(P) + ' ' + P.name;
  document.getElementById('pd-sup').textContent = '🏭 ' + (P.supplier || t('verified_supplier'));
  document.getElementById('pd-rate').innerHTML = '<span class="st">' + stars(P.rating || 4.5) + '</span> ' + (P.rating || 4.5) + ' · ' + fmtNum(P.sold || 0) + t('card_sold');
  document.getElementById('pd-desc').textContent = P.desc || '';

  const tb = document.getElementById('tiers-body');
  tb.innerHTML = P.tiers.map(tr =>
    '<tr data-q="' + tr.q + '"><td>' + tr.q.toLocaleString('en-US') + t('qty_plus') + '</td><td><b>' + money(tr.p) + '</b></td><td style="color:#7fd49a">' + fcfa(tr.p).toLocaleString('en-US') + '</td></tr>'
  ).join('');

  const q = document.getElementById('qty');
  q.min = P.moq; q.value = P.moq;
  document.getElementById('moq-note').textContent = t('moq_note') + P.moq.toLocaleString('en-US') + t('pcs') + ')';
  q.addEventListener('input', recalc);

  recalc();

  /* related: same category first, then featured */
  const rel = allProducts().filter(x => x.id !== P.id && x.cat === P.cat)
    .concat(allProducts().filter(x => x.id !== P.id && x.cat !== P.cat && x.featured))
    .slice(0, 4);
  document.getElementById('related').innerHTML = rel.map(productCard).join('');
}

function setCat(c){ try { sessionStorage.setItem('tm_cat', c); } catch(e){} location.href = 'index.html#shop'; }

function curQty(){
  let n = parseInt(document.getElementById('qty').value, 10);
  if(isNaN(n)) n = P.moq;
  return Math.max(P.moq, n);
}
function bump(d){
  const q = document.getElementById('qty');
  q.value = Math.max(P.moq, curQty() + d);
  recalc();
}

function recalc(){
  if(!P) return;
  const qty = curQty();
  const unit = tierPrice(P, qty);
  const goods = unit * qty;
  const ship = Math.max(BIZ.shippingDoorMin, goods * BIZ.shippingDoorPct);
  document.getElementById('qty').value = qty;

  /* highlight active tier row */
  document.querySelectorAll('#tiers-body tr').forEach(tr => {
    tr.classList.toggle('hit', qty >= parseInt(tr.dataset.q, 10));
  });

  document.getElementById('c-unit').textContent = money(unit);
  document.getElementById('c-goods').textContent = money(goods) + ' · ' + fcfa(goods).toLocaleString('en-US') + ' FCFA';
  document.getElementById('c-ship').textContent = money(ship);
  document.getElementById('c-total').innerHTML = money(goods + ship) + ' <small style="color:#7fd49a;font-weight:600">≈ ' + fcfa(goods + ship).toLocaleString('en-US') + ' FCFA</small>';

  const msg = 'Hello ' + BIZ.name + ', ' + t('pdm_intro') + '\n\n• ' + P.name + ' × ' + qty +
    '\n' + t('pdm_unit') + ' ' + money(unit) + '\n' + t('tot_goods') + ': ' + money(goods) +
    '\n' + t('pdm_total') + ' ' + money(goods + ship) +
    '\n\n' + t('pdm_confirm');
  document.getElementById('pd-wa').href = waLink(msg);
}

function addNow(){
  TM.add(P.id, curQty());
  TM.openCart();
}

initProductPage();