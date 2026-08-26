/* ============================================================
   TradMax — my orders (localStorage) + WhatsApp status updates
   ============================================================ */
function loadOrders(){
  try { return JSON.parse(localStorage.getItem('tm_orders') || '[]'); }
  catch(e){ return []; }
}

function initOrders(){
  renderChrome('orders');
  drawOrders();
}

function drawOrders(){
  const ORDERS = loadOrders();
  const el = document.getElementById('orders-list');
  document.getElementById('orders-count').textContent = '(' + ORDERS.length + ')';

  if(!ORDERS.length){
    el.style.display = 'none';
    document.getElementById('orders-empty').style.display = '';
    return;
  }
  document.getElementById('orders-empty').style.display = 'none';
  el.style.display = '';

  el.innerHTML = ORDERS.map(o => {
    const d = new Date(o.date);
    const when = isNaN(d) ? '' :
      d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
    const items = (o.lines || []).map(l => l.name + ' ×' + l.qty.toLocaleString('en-US')).join(', ');
    const city  = o.buyer && o.buyer.city ? ' · ' + o.buyer.city : '';
    const track = waLink(t('trk_msg') + ' *' + o.ref + '*?');
    return '<div class="ocard">' +
      '<div class="ohead"><b class="oref">📦 ' + o.ref + '</b>' +
        '<span class="ost">' + t('st_processing') + '</span></div>' +
      '<small class="odate">' + when + city + '</small>' +
      '<p class="oitems">' + items + '</p>' +
      '<div class="ofot"><b>' + moneyF(o.total || 0) + '</b>' +
        '<a class="btn ghost sm" target="_blank" rel="noopener" href="' + track + '">💬 ' + t('btn_track') + '</a></div>' +
    '</div>';
  }).join('');
}

initOrders();