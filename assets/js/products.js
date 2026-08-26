/* ============================================================
   TradMax — Product Catalog
   tiers: quantity breakpoints — price = USD per unit at that qty
   You can also add products any time via admin.html
   ============================================================ */

const CATEGORIES = [
  { id:'electronics', name:'Electronics',              icon:'📱', desc:'Phones, audio, computers & accessories' },
  { id:'fashion',     name:'Fashion & Textiles',       icon:'👗', desc:'Clothing, shoes, bags & fabrics' },
  { id:'machinery',   name:'Machinery & Industrial',   icon:'⚙️', desc:'Factory, farm & construction equipment' },
  { id:'home',        name:'Home & Kitchen',           icon:'🍳', desc:'Appliances, furniture & kitchenware' },
  { id:'beauty',      name:'Beauty & Personal Care',   icon:'💄', desc:'Cosmetics, hair & skincare' },
  { id:'auto',        name:'Auto Parts & Accessories', icon:'🚗', desc:'Parts, tyres & car electronics' },
  { id:'solar',       name:'Solar & Energy',           icon:'☀️', desc:'Panels, batteries & inverters' },
  { id:'building',    name:'Building Materials',       icon:'🧱', desc:'Tiles, doors, sanitary & hardware' }
];

const CAT_GRAD = {
  electronics:'linear-gradient(135deg,#5b7cfa,#8e54e9)',
  fashion:'linear-gradient(135deg,#f953c6,#b91d73)',
  machinery:'linear-gradient(135deg,#f7971e,#ffd200)',
  home:'linear-gradient(135deg,#11998e,#38ef7d)',
  beauty:'linear-gradient(135deg,#ee0979,#ff6a00)',
  auto:'linear-gradient(135deg,#485563,#29323c)',
  solar:'linear-gradient(135deg,#f7971e,#fa709a)',
  building:'linear-gradient(135deg,#8e9eab,#5d6874)'
};

const PRODUCTS = [
 {id:'e1',name:'Smartphone X15 Pro 256GB',cat:'electronics',icon:'📱',moq:5,tiers:[{q:1,p:138},{q:10,p:129},{q:50,p:121},{q:200,p:114}],rating:4.8,sold:12400,supplier:'Shenzhen Tech Industrial Co.',color:'#2b2d42',tags:['phone','smartphone','mobile','x15','android'],featured:true,hot:true,desc:'6.7-inch AMOLED display, 8GB RAM + 256GB storage, 108MP AI camera, dual SIM, 5000mAh fast-charge battery. Factory unlocked, 1-year warranty.'},
 {id:'e2',name:'TWS Wireless Earbuds Pro',cat:'electronics',icon:'🎧',moq:20,tiers:[{q:20,p:6.8},{q:100,p:5.9},{q:500,p:5.2},{q:2000,p:4.6}],rating:4.7,sold:45200,supplier:'Guangzhou Sound Electronics',color:'#1c1c24',tags:['earbuds','headphones','bluetooth','audio','tws'],featured:true,hot:true,desc:'Bluetooth 5.3, active noise cancellation, 30h playtime with charging case, touch controls. Custom logo printing available.'},
 {id:'e3',name:'Laptop 15.6in i7 16GB SSD',cat:'electronics',icon:'💻',moq:3,tiers:[{q:3,p:398},{q:10,p:379},{q:30,p:365}],rating:4.8,sold:5600,supplier:'Huaqiang Computer Tech',color:'#3d4451',tags:['laptop','computer','notebook','i7'],featured:true,desc:'Intel i7, 16GB RAM, 512GB NVMe SSD, full-HD IPS screen, backlit keyboard. Windows 11 pre-installed, bulk packaging.'},
 {id:'e4',name:'Smart Watch Fitness Tracker',cat:'electronics',icon:'⌚',moq:10,tiers:[{q:10,p:12.5},{q:50,p:10.8},{q:200,p:9.6}],rating:4.6,sold:22800,supplier:'Shenzhen Tech Industrial Co.',color:'#111318',tags:['watch','smartwatch','fitness','tracker'],isNew:true,desc:'1.85-inch AMOLED, heart-rate & SpO2 monitoring, 100+ sport modes, IP68 waterproof, calls & notifications.'},
 {id:'f1',name:'Men Casual Sneakers (Bulk)',cat:'fashion',icon:'👟',moq:24,tiers:[{q:24,p:8.9},{q:120,p:7.8},{q:600,p:6.9}],rating:4.7,sold:33100,supplier:'Quanzhou Footwear Group',color:'#d8d3c8',tags:['shoes','sneakers','footwear','men'],featured:true,hot:true,desc:'Breathable knit upper, anti-slip rubber sole, sizes 39-45 mixed. Assorted colors per carton, OEM branding welcome.'},
 {id:'f2',name:'African Print Wax Fabric 6yd',cat:'fashion',icon:'🧵',moq:50,tiers:[{q:50,p:3.2},{q:300,p:2.8},{q:1000,p:2.4}],rating:4.9,sold:58900,supplier:'Hangzhou Textile United',color:'#c0392b',tags:['fabric','wax','ankara','textile','print'],featured:true,desc:'100% cotton, 6 yards per piece, vivid wax prints that keep color after washing. Designs can be customized for the Central African market.'},
 {id:'f3',name:'Ladies Handbag PU Leather',cat:'fashion',icon:'👜',moq:12,tiers:[{q:12,p:9.5},{q:60,p:8.2},{q:300,p:7.4}],rating:4.6,sold:12700,supplier:'Guangzhou BagCraft Co.',color:'#6d4c41',tags:['bag','handbag','purse','ladies'],desc:'Premium PU leather, gold-tone hardware, spacious inner compartments. Mixed colors per dozen, dust bags included.'},
 {id:'f4',name:'Kids Clothing Set (Assorted)',cat:'fashion',icon:'🧒',moq:50,tiers:[{q:50,p:4.5},{q:200,p:3.9},{q:1000,p:3.4}],rating:4.7,sold:9800,supplier:'Foshan Kidswear Factory',color:'#e67e22',tags:['kids','children','clothes','set'],isNew:true,desc:'Soft cotton 2-piece sets, ages 2-12 mixed. Cartoon prints, export-grade stitching, mixed cartons available.'},
 {id:'m1',name:'Diesel Generator 10kW Silent',cat:'machinery',icon:'🔌',moq:1,tiers:[{q:1,p:1450},{q:3,p:1390},{q:10,p:1320}],rating:4.8,sold:2100,supplier:'Weifang Power Machinery',color:'#37474f',tags:['generator','diesel','power','10kw'],featured:true,hot:true,desc:'Silent canopy type, 10kW rated output, electric start, AVR voltage regulation. Ideal for shops and homes in Cameroon. Spare parts kit included.'},
 {id:'m2',name:'Concrete Mixer Machine 350L',cat:'machinery',icon:'🏗️',moq:1,tiers:[{q:1,p:890},{q:5,p:850},{q:20,p:810}],rating:4.7,sold:3400,supplier:'Zhengzhou Construction Equipment',color:'#c47f17',tags:['mixer','concrete','construction','cement'],desc:'350L drum, diesel or electric motor options, heavy-duty steel frame with wheels. Perfect for construction sites.'},
 {id:'m3',name:'Farm Tractor 45HP 4WD',cat:'machinery',icon:'🚜',moq:1,tiers:[{q:1,p:7900},{q:3,p:7600},{q:10,p:7300}],rating:4.9,sold:640,supplier:'Luoyang Agricultural Machinery',color:'#2e7d32',tags:['tractor','farm','agriculture','45hp'],featured:true,desc:'45HP 4-wheel drive, power steering, dual-stage clutch. Optional plough, trailer and harrow attachments. ROPS safety cabin.'},
 {id:'m4',name:'Industrial Sewing Machine',cat:'machinery',icon:'🪡',moq:5,tiers:[{q:5,p:165},{q:20,p:152},{q:100,p:142}],rating:4.6,sold:8900,supplier:'Dongguan Stitch Equipment',color:'#546e7a',tags:['sewing','machine','tailor','industrial'],desc:'Lockstitch straight sewing, servo motor, automatic oiling, speed up to 5000 spm. Table and stand included.'}
];

PRODUCTS.push(
 {id:'h1',name:'Nonstick Cookware Set 12pc',cat:'home',icon:'🍳',moq:10,tiers:[{q:10,p:18.5},{q:50,p:16.2},{q:200,p:14.8}],rating:4.7,sold:15600,supplier:'Yangjiang Cookware Group',color:'#1565c0',tags:['cookware','pots','pans','kitchen'],featured:true,desc:'12-piece granite nonstick set: pots, pans, lids and utensils. Works on gas & electric stoves, healthy stone coating.'},
 {id:'h2',name:'Chest Freezer 300L Dual Door',cat:'home',icon:'🧊',moq:2,tiers:[{q:2,p:265},{q:10,p:249},{q:40,p:238}],rating:4.8,sold:4300,supplier:'Hefei Appliance Works',color:'#90a4ae',tags:['freezer','fridge','chest','appliance'],hot:true,desc:'300L capacity, dual doors, low-power compressor tuned for hot climates, R600a eco gas. 110V/220V versions available.'},
 {id:'h3',name:'Modern Sofa Set 3+2 Fabric',cat:'home',icon:'🛋️',moq:2,tiers:[{q:2,p:385},{q:10,p:362},{q:30,p:345}],rating:4.6,sold:1900,supplier:'Foshan Home Furniture',color:'#8d6e63',tags:['sofa','furniture','living','set'],desc:'3-seater + 2-seater, solid wood frame, high-density foam, stain-resistant linen fabric. Multiple colors, flat-pack export packing.'},
 {id:'h4',name:'Ceramic Dinner Set 48pc',cat:'home',icon:'🍽️',moq:20,tiers:[{q:20,p:22},{q:100,p:19.5},{q:400,p:17.9}],rating:4.7,sold:7600,supplier:'Chaozhou Porcelain Co.',color:'#eceff1',tags:['dinner set','plates','ceramic','porcelain'],desc:'48 pieces serving 8 people: dinner plates, bowls, cups. Elegant gold-rim design, microwave & dishwasher safe.'},
 {id:'b1',name:'Human Hair Bundles 10in',cat:'beauty',icon:'💇‍♀️',moq:10,tiers:[{q:10,p:28},{q:50,p:25.5},{q:200,p:23.8}],rating:4.9,sold:41200,supplier:'Xuchang Hair Products',color:'#4e342e',tags:['hair','bundles','human hair','weave'],featured:true,hot:true,desc:'100% virgin human hair, 10-inch bundles, soft and full, no shedding. Lengths 8-30in available, popular grades for African market.'},
 {id:'b2',name:'Shea Body Lotion 500ml (Bulk)',cat:'beauty',icon:'🧴',moq:100,tiers:[{q:100,p:1.35},{q:500,p:1.15},{q:2000,p:0.98}],rating:4.6,sold:62400,supplier:'Guangzhou Cosmetics Group',color:'#a1887f',tags:['lotion','skincare','shea','body'],desc:'Shea butter & vitamin E formula, 500ml pump bottle. Private-label and custom fragrance available on 2000+ orders.'},
 {id:'b3',name:'Makeup Palette 35 Colors',cat:'beauty',icon:'💄',moq:24,tiers:[{q:24,p:4.2},{q:120,p:3.6},{q:500,p:3.2}],rating:4.5,sold:18900,supplier:'Yiwu Beauty Imports',color:'#ad1457',tags:['makeup','palette','eyeshadow','cosmetics'],isNew:true,desc:'35 highly-pigmented shades: mattes, shimmers and glitters. Long-wear formula, mirror included, custom palette cases available.'},
 {id:'a1',name:'Car Tyre 205/55R16 All-Season',cat:'auto',icon:'🛞',moq:20,tiers:[{q:20,p:38},{q:100,p:35},{q:400,p:32.5}],rating:4.7,sold:26400,supplier:'Qingdao Rubber Industries',color:'#263238',tags:['tyre','tire','car','205 55 16'],featured:true,desc:'All-season radial tyre, strong sidewalls for rough roads, sizes 13-20 inch available. DOT & ECE certified, mixed sizes per container.'},
 {id:'a2',name:'Car Audio Android Player 9in',cat:'auto',icon:'📻',moq:10,tiers:[{q:10,p:52},{q:50,p:47},{q:200,p:43}],rating:4.6,sold:9700,supplier:'Shenzhen CarTech Electronics',color:'#0d47a1',tags:['car audio','player','android','gps','radio'],desc:'9-inch Android head unit, GPS, WiFi, Bluetooth, reverse camera input. Plug-and-play harnesses for popular models.'},
 {id:'a3',name:'Lithium Car Battery 12V 60Ah',cat:'auto',icon:'🔋',moq:10,tiers:[{q:10,p:68},{q:50,p:62},{q:200,p:58}],rating:4.8,sold:5300,supplier:'Huizhou Power Cell Co.',color:'#1b5e20',tags:['battery','car battery','lithium','12v'],desc:'LiFePO4 12V 60Ah, 2000+ charge cycles, works in high temperatures, built-in BMS protection. Maintenance-free.'},
 {id:'s1',name:'Solar Panel 550W Mono Half-Cut',cat:'solar',icon:'☀️',moq:10,tiers:[{q:10,p:98},{q:50,p:91},{q:200,p:86}],rating:4.9,sold:18700,supplier:'Jiangsu Suntech Partners',color:'#01579b',tags:['solar','panel','550w','photovoltaic'],featured:true,hot:true,desc:'550W monocrystalline half-cut cells, 21% efficiency, IP67 junction box, 25-year performance warranty. Pallet & container pricing.'},
 {id:'s2',name:'Lithium Battery 48V 100Ah',cat:'solar',icon:'🔆',moq:2,tiers:[{q:2,p:890},{q:10,p:845},{q:40,p:810}],rating:4.8,sold:3200,supplier:'Dongguan Energy Storage',color:'#00695c',tags:['battery','lithium','48v','inverter','storage'],featured:true,desc:'48V 100Ah (5.1kWh) LiFePO4 wall-mount battery, smart BMS, LCD display, compatible with all major inverters. 10-year design life.'},
 {id:'s3',name:'Solar Street Light 200W LED',cat:'solar',icon:'💡',moq:10,tiers:[{q:10,p:42},{q:50,p:38},{q:200,p:34}],rating:4.7,sold:14300,supplier:'Yangzhou Solar Lighting',color:'#37474f',tags:['solar','street light','led','outdoor'],isNew:true,desc:'All-in-one 200W solar street light, radar motion sensor, remote control, IP66 waterproof, lights 12+ hours per night.'},
 {id:'g1',name:'Porcelain Floor Tiles 60x60cm',cat:'building',icon:'🧱',moq:200,tiers:[{q:200,p:5.8},{q:1000,p:5.2},{q:5000,p:4.8}],rating:4.7,sold:38900,supplier:'Foshan Ceramics City',color:'#795548',tags:['tiles','floor','porcelain','60x60'],featured:true,desc:'Polished glazed porcelain 60x60cm, grade AAA, anti-slip surface. Many designs in stock; full container = best price per m2.'},
 {id:'g2',name:'Steel Security Door with Frame',cat:'building',icon:'🚪',moq:10,tiers:[{q:10,p:96},{q:50,p:88},{q:200,p:82}],rating:4.6,sold:6800,supplier:'Yongkang Door Industry',color:'#455a64',tags:['door','security','steel','frame'],desc:'Reinforced steel security door, multi-point locking, powder-coated finish. Sizes customizable, foam-filled for sound & heat.'},
 {id:'g3',name:'PVC Plumbing Pipes & Fittings',cat:'building',icon:'🚿',moq:50,tiers:[{q:50,p:2.9},{q:300,p:2.5},{q:1000,p:2.2}],rating:4.5,sold:11200,supplier:'Zhejiang Pipe Manufacturing',color:'#0277bd',tags:['pipes','pvc','plumbing','fittings'],desc:'UPVC pressure pipes & fittings, 20-160mm diameters, hot climates rated. Full range: elbows, tees, couplings, valves.'}
);

/* ---------- helpers ---------- */
const FCFA_RATE = 620; /* indicative XAF per USD */
function tierPrice(p, qty){ let t = p.tiers[0]; for(const x of p.tiers){ if(qty >= x.q) t = x; } return t.p; }
function fcfa(usd){ return Math.round(usd * FCFA_RATE); }
function money(usd){ return '$' + (Math.round(usd*100)/100).toLocaleString('en-US',{minimumFractionDigits:2}); }
function moneyF(usd){ return money(usd) + ' · ' + fcfa(usd).toLocaleString('en-US') + ' FCFA'; }
function fmtNum(n){ return n >= 1000 ? (n/1000).toFixed(n>=10000?0:1).replace('.0','') + 'k' : '' + n; }

let CUSTOM_PRODUCTS = [];
try { CUSTOM_PRODUCTS = JSON.parse(localStorage.getItem('tm_custom_products') || '[]'); } catch(e) { CUSTOM_PRODUCTS = []; }
function allProducts(){ return PRODUCTS.concat(CUSTOM_PRODUCTS); }
function getProduct(id){ return allProducts().find(p => p.id === id); }
function catById(id){ return CATEGORIES.find(c => c.id === id); }
function catName(id){ const c = catById(id); return c ? c.name : (id || ''); }
function catGrad(id){ return CAT_GRAD[id] || 'linear-gradient(135deg,#667eea,#764ba2)'; }

/* color distance for image-scan search (0 = perfect match) */
function hexRgb(h){ h = h.replace('#',''); return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)]; }
function colorDist(a, b){ const A = hexRgb(a), B = hexRgb(b); return Math.sqrt((A[0]-B[0])**2 + (A[1]-B[1])**2 + (A[2]-B[2])**2); }

/* Business constants — TradMax */
const BIZ = {
  name: 'TradMax',
  tagline: 'China \u2194 Cameroon, Delivered',
  whatsapp: '8616617435017',
  phoneDisplay: '+86 166 1743 5017',
  phoneTel: '+8616617435017',
  email: 'freshmandre6@gmail.com',
  addressZh: '\u5E7F\u5DDE\u5E02\u8D8A\u79C0\u533A\u5E7F\u56ED\u897F\u8DEF27\u53F7\u56FD\u592A\u56FD\u9645\u5546\u8D38\u57CE\u4E09\u697CC\u533A\u0043\u0031\u0030\u0037\u6863',
  addressEn: 'Stall C107, Zone C, 3rd Floor, Guotai International Trade City, No.27 Guangyuan West Road, Yuexiu District, Guangzhou, China',
  factories: '6,000+',
  shippingDoorPct: 0.12, /* TradMax door-to-door consolidation fee */
  shippingDoorMin: 45
};
