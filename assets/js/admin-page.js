/* ============================================================
   TradMax — admin: add & manage custom products (localStorage)
   ============================================================ */
function initAdmin(){
  renderChrome('admin');

  document.getElementById('f-cat').innerHTML =
    CATEGORIES.map(c => '<option value="' + c.id + '">' + c.icon + ' ' + c.name + '</option>').join('');

  if(!document.querySelector('.tier-row')) addTierRow();
  document.getElementById('tiers-edit').addEventListener('input', renumberTiers);
  document.getElementById('add-form').addEventListener('submit', saveProduct);
  document.getElementById('export-btn').addEventListener('click', exportJson);

  drawMyList();
}

/* ---------- tier rows ---------- */
function addTierRow(q, p){
  const box = document.getElementById('tiers-edit');
  const row = document.createElement('div');
  row.className = 'tier-row';
  row.innerHTML = '<label style="color:var(--mut);font-size:.8rem">' + t('tier_qty') + '</label>' +
    '<input type="number" class="tq" min="1" value="' + (q || '') + '" placeholder="' + (box.children.length ? '100' : '1') + '" required/>' +
    '<label style="color:var(--mut);font-size:.8rem">USD</label>' +
    '<input type="number" class="tp" min="0.01" step="0.01" value="' + (p || '') + '" placeholder="5.90" required/>' +
    '<button type="button" title="✕" onclick="this.parentNode.remove();renumberTiers()">✕</button>';
  box.appendChild(row);
}
function readTiers(){
  const tiers = [];
  document.querySelectorAll('#tiers-edit .tier-row').forEach(r => {
    const q = parseInt(r.querySelector('.tq').value, 10);
    const p = parseFloat(r.querySelector('.tp').value);
    if(q > 0 && p > 0) tiers.push({ q:q, p:p });
  });
  tiers.sort((a,b) => a.q - b.q);
  return tiers;
}
function renumberTiers(){ /* hook for future validation */ }

/* ---------- save ---------- */
function saveProduct(ev){
  ev.preventDefault();
  const tiers = readTiers();
  if(!tiers.length){ alert(t('alert_tier')); return; }

  const list = CUSTOM_PRODUCTS;
  const name = document.getElementById('f-name').value.trim();
  const dup = list.find(p => p.name.toLowerCase() === name.toLowerCase());
  if(dup && !confirm('"' + dup.name + '" ' + t('confirm_dup'))) return;

  const tags = document.getElementById('f-tags').value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const p = {
    id: 'c' + Date.now().toString(36),
    name: name,
    cat: document.getElementById('f-cat').value,
    icon: document.getElementById('f-icon').value.trim() || catById(document.getElementById('f-cat').value).icon,
    moq: Math.max(1, parseInt(document.getElementById('f-moq').value, 10) || 1),
    tiers: tiers,
    rating: 4.6,
    sold: 0,
    supplier: document.getElementById('f-supplier').value.trim() || BIZ.name + ' Direct',
    color: document.getElementById('f-color').value.toUpperCase(),
    tags: tags,
    featured: document.getElementById('f-feat').checked,
    hot: document.getElementById('f-hot').checked,
    isNew: true,
    desc: document.getElementById('f-desc').value.trim(),
    custom: true
  };
  /* keep MOQ aligned with the first tier so pricing math works everywhere */
  if(tiers[0].q > p.moq) p.moq = tiers[0].q;
  p.isNew = document.getElementById('f-new').checked;

  CUSTOM_PRODUCTS.push(p);
  try { localStorage.setItem('tm_custom_products', JSON.stringify(CUSTOM_PRODUCTS)); }
  catch(e){ alert(t('err_storage')); return; }

  ev.target.reset();
  document.getElementById('f-color').value = '#5b7cfa';
  document.getElementById('f-moq').value = 10;
  document.getElementById('tiers-edit').innerHTML = '';
  addTierRow();
  drawMyList();
  TM.badge();
  window.open('product.html?id=' + p.id, '_blank');
}

/* ---------- my products list ---------- */
function removeCustom(id){
  if(!confirm(t('confirm_rm'))) return;
  const i = CUSTOM_PRODUCTS.findIndex(p => p.id === id);
  if(i > -1) CUSTOM_PRODUCTS.splice(i, 1);
  try { localStorage.setItem('tm_custom_products', JSON.stringify(CUSTOM_PRODUCTS)); } catch(e){}
  drawMyList();
}

function drawMyList(){
  const el = document.getElementById('my-list');
  document.getElementById('my-count').textContent = CUSTOM_PRODUCTS.length;
  document.getElementById('my-empty').style.display = CUSTOM_PRODUCTS.length ? 'none' : 'block';
  el.innerHTML = CUSTOM_PRODUCTS.map(p =>
    '<div class="pline">' +
      '<span class="cic" style="background:' + catGrad(p.cat) + '">' + (p.icon || '📦') + '</span>' +
      '<div><b>' + p.name + '</b><small>' + catName(p.cat) + ' · ' + t('moq_short') + ' ' + p.moq.toLocaleString('en-US') + t('pcs') + t('pl_from') + money(p.tiers[p.tiers.length - 1].p) + '/unit</small></div>' +
      '<a href="product.html?id=' + p.id + '">👁️</a>' +
      '<button class="rm" type="button" onclick="removeCustom(\'' + p.id + '\')">' + t('btn_rm') + '</button></div>'
  ).join('');
}

function exportJson(){
  const blob = new Blob([JSON.stringify(CUSTOM_PRODUCTS, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'tradmax-products.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

initAdmin();