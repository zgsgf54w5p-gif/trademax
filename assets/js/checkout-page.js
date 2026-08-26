/* ============================================================
   TradMax — checkout: buyer details + WhatsApp order
   ============================================================ */
let LAST_ORDER = '';

function loadOrders(){
  try { return JSON.parse(localStorage.getItem('tm_orders') || '[]'); }
  catch(e){ return []; }
}

const CITIES = ['Douala','Yaoundé','Bafoussam','Bamenda','Garoua','Maroua',
                'Ngaoundéré','Bertoua','Buea','Limbe','Kribi','Ebolowa',
                'Kumba','Dschang'];

function initCheckout(){
  renderChrome('basket');

  const sel = document.getElementById('f-city');
  sel.innerHTML = CITIES.map(c => '<option value="' + c + '">' + c + '</option>').join('') +
    '<option value="__other">' + t('city_other') + '</option>';

  /* prefill from last order */
  try {
    const b = JSON.parse(localStorage.getItem('tm_buyer') || 'null');
    if(b){
      document.getElementById('f-name').value  = b.name  || '';
      document.getElementById('f-phone').value = b.phone || '';
      const opt = Array.prototype.find.call(sel.options, o => o.value === b.city);
      sel.value = opt ? b.city : '__other';
      if(b.pay)  document.getElementById('f-pay').value   = b.pay;
      document.getElementById('f-notes').value = b.notes || '';
    }
  } catch(e){}

  drawSummary();
  document.getElementById('buyer-form').addEventListener('submit', placeOrder);
}

/* ---------- summary ---------- */
function drawSummary(){
  const c = TM.cart();
  const empty = !c.length;
  document.getElementById('co-main').style.display  = empty ? 'none' : '';
  document.getElementById('co-empty').style.display = empty ? '' : 'none';
  if(empty){ TM.badge(); return; }

  document.getElementById('sum-lines').innerHTML = c.map(l => {
    const p = getProduct(l.id); if(!p) return '';
    const u = tierPrice(p, l.qty);
    return '<div class="sline">' +
      '<span class="cic" style="background:' + catGrad(p.cat) + '">' + (p.icon || '📦') + '</span>' +
      '<div><b>' + p.name + '</b><small>' + l.qty.toLocaleString('en-US') + ' × ' + money(u) + '</small></div>' +
      '<b>' + money(u * l.qty) + '</b></div>';
  }).join('');

  document.getElementById('co-goods').textContent = money(TM.subtotal());
  document.getElementById('co-ship').textContent  = money(TM.shipping());
  document.getElementById('co-total').innerHTML   = moneyF(TM.total()) ;
  TM.badge();
}

/* ---------- submit ---------- */
function placeOrder(ev){
  ev.preventDefault();

  const nameIn  = document.getElementById('f-name');
  const phoneIn = document.getElementById('f-phone');
  const sel     = document.getElementById('f-city');
  const pay     = document.getElementById('f-pay');
  const notes   = document.getElementById('f-notes').value.trim();

  const name  = nameIn.value.trim();
  const phone = phoneIn.value.trim();
  const okPhone = (phone.match(/\d/g) || []).length >= 8;

  nameIn.classList.toggle('bad', !name);
  phoneIn.classList.toggle('bad', !okPhone);
  if(!name || !okPhone){ alert(t('err_form')); return; }

  const city   = sel.value === '__other' ? t('city_other') : sel.value;
  const payTxt = pay.options[pay.selectedIndex].text;

  const REF = 'TM-' + Date.now().toString(36).toUpperCase().slice(-6);

  const L = [t('om_head'), '',
    t('om_ref')   + ' *' + REF + '*',
    t('om_buyer')  + ' ' + name,
    t('om_wa')     + ' ' + phone,
    t('om_city')   + ' ' + city,
    t('om_pay')    + ' ' + payTxt, ''];

  TM.cart().forEach(l => {
    const p = getProduct(l.id); if(!p) return;
    const u = tierPrice(p, l.qty);
    L.push('• ' + p.name + ' × ' + l.qty + ' @ ' + money(u) + ' = ' + money(u * l.qty));
  });

  L.push('');
  L.push(t('om_goods') + ' ' + money(TM.subtotal()));
  L.push(t('om_ship')  + ' ' + money(TM.shipping()));
  L.push('*' + t('tot_total') + ': ' + money(TM.total()) + ' ≈ ' + fcfa(TM.total()).toLocaleString('en-US') + ' FCFA*');
  if(notes) { L.push(''); L.push(t('om_notes') + ' ' + notes); }
  L.push('', t('om_confirm'));

  LAST_ORDER = L.join('\n');

  /* archive the order for the buyer's "My Orders" page */
  const lines = TM.cart().map(l => {
    const p = getProduct(l.id);
    return p ? { id:p.id, name:p.name, icon:p.icon, qty:l.qty, unit:tierPrice(p, l.qty) } : null;
  }).filter(Boolean);
  try {
    const ORDERS = loadOrders();
    ORDERS.unshift({
      ref:REF, date:new Date().toISOString(), lines:lines,
      goods:TM.subtotal(), ship:TM.shipping(), total:TM.total(),
      buyer:{ name:name, phone:phone, city:sel.value, pay:pay.value },
      notes:notes
    });
    localStorage.setItem('tm_orders', JSON.stringify(ORDERS));
  } catch(e){}

  try {
    localStorage.setItem('tm_buyer', JSON.stringify({
      name:name, phone:phone, city:sel.value, pay:pay.value, notes:notes
    }));
  } catch(e){}

  window.open(waLink(LAST_ORDER), '_blank');
  TM.clear();

  /* swap to success view */
  document.getElementById('co-main').style.display  = 'none';
  document.getElementById('co-done').style.display  = '';
  document.getElementById('co-ref').textContent     = REF;
  document.getElementById('reopen-wa').href = waLink(LAST_ORDER);
  window.scrollTo({ top:0, behavior:'smooth' });
}

initCheckout();