/* ============================================================
   TradMax — EN/FR i18n
   Load this BEFORE any script that calls t()
   ============================================================ */

const I18N = {
  lang(){
    try {
      const s = localStorage.getItem('tm_lang');
      if(s === 'en' || s === 'fr') return s;
      return ((navigator.language || 'en').toLowerCase().indexOf('fr') === 0) ? 'fr' : 'en';
    } catch(e){ return 'en'; }
  },
  set(l){ try { localStorage.setItem('tm_lang', l); } catch(e){} location.reload(); },
  toggle(){ I18N.set(I18N.lang() === 'en' ? 'fr' : 'en'); },
  /* label shows the language you'd switch TO */
  btnLabel(){ return I18N.lang() === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'; },
  applyStatic(){
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
  }
};

/* key: [English, Français] */
const DICT = {
  /* nav */
  nav_home:   ['Home', 'Accueil'],
  nav_shop:   ['Products', 'Produits'],
  nav_admin:  ['For Sellers', 'Espace Vendeurs'],
  /* hero */
  hero_h1:    ['Wholesale from China to <em>Cameroon</em>, delivered.', 'Le grossiste de la Chine au <em>Cameroun</em>, livré chez vous.'],
  hero_sub:   ['Buy direct from 6,000+ verified Guangzhou factories at true factory prices. We consolidate your goods, handle export paperwork and ship door-to-door — you pay in USD or FCFA and track everything on WhatsApp.', 'Achetez directement auprès de plus de 6 000 usines vérifiées de Guangzhou aux prix usine réels. Nous regroupons vos marchandises, gérons les formalités d\u2019exportation et livrons porte-à-porte — payez en USD ou FCFA et suivez tout sur WhatsApp.'],
  hero_browse:['🛍️ Browse products', '🛍️ Voir les produits'],
  hero_chat:  ['💬 Chat on WhatsApp', '💬 Discuter sur WhatsApp'],
  /* trust bar */
  trust_f_t:  ['6,000+ factories', '6 000+ usines'],
  trust_f_s:  ['Vetted suppliers in every category', 'Fournisseurs vérifiés dans chaque catégorie'],
  trust_s_t:  ['Door-to-door', 'Porte-à-porte'],
  trust_s_s:  ['Consolidation + delivery to Cameroon', 'Regroupement + livraison au Cameroun'],
  trust_p_t:  ['USD & FCFA pricing', 'Prix en USD et FCFA'],
  trust_p_s:  ['Transparent tiered bulk prices', 'Prix de gros par paliers transparents'],
  trust_q_t:  ['QC inspection', 'Contrôle qualité'],
  trust_q_s:  ['We check goods before shipping', 'Nous inspectons avant expédition'],
  /* sections */
  sec_cats:   ['Shop by <span>category</span>', 'Acheter par <span>catégorie</span>'],
  sec_all:    ['All <span>products</span>', 'Tous les <span>produits</span>'],
  ph_search:  ['🔍 Search phones, fabric, solar panels, tiles…', '🔍 Recherchez téléphones, tissus, panneaux solaires, carreaux…'],
  sort_pop:   ['Most popular', 'Les plus populaires'],
  sort_new:   ['Newest', 'Nouveautés'],
  sort_lo:    ['Price: low → high', 'Prix : croissant'],
  sort_hi:    ['Price: high → low', 'Prix : décroissant'],
  sort_rate:  ['Best rated', 'Mieux notés'],
  chip_all:   ['All', 'Tout'],
  sw_label:   ['🎨 colour search', '🎨 recherche par couleur'],
  nores:      ['No products match your search.<br/>Try another keyword or 🎨 colour, or message us on WhatsApp — we can source almost anything.', 'Aucun produit ne correspond à votre recherche.<br/>Essayez un autre mot-clé ou une 🎨 couleur, ou écrivez-nous sur WhatsApp — nous pouvons sourcer presque tout.'],
  cnt_colour: ['colour ≈ ', 'couleur ≈ '],
  cnt_prod:   [' product', ' produit'],
  cnt_prods:  [' products', ' produits'],
  /* cards */
  btn_details:['Details', 'Détails'],
  btn_basket: ['+ Basket', '+ Panier'],
  card_sold:  [' sold', ' vendus'],
  /* drawer */
  drawer_title: ['🧺 Your Quote Basket', '🧺 Mon panier de devis'],
  drawer_empty: ['Your basket is empty.<br/>Add products to request a quote 🧺', 'Votre panier est vide.<br/>Ajoutez des produits pour demander un devis 🧺'],
  moq_short:  ['MOQ', 'Qté min'],
  unit_at:    ['/unit at ', '/unité à '],
  pcs:        [' pcs', ' pièces'],
  tot_goods:  ['Goods', 'Marchandises'],
  tot_ship:   ['Door-to-door shipping (est.)', 'Livraison porte-à-porte (est.)'],
  tot_total:  ['Total', 'Total'],
  btn_send:   ['✅ Send order on WhatsApp', '✅ Envoyer la commande sur WhatsApp'],
  btn_clear:  ['Clear basket', 'Vider le panier'],
  confirm_clear: ['Clear basket?', 'Vider le panier ?'],
  quote_req:  ['request a quote', 'demander un devis'],
  enquiry:    ['Hello TradMax, I have an enquiry.', 'Bonjour TradMax, j’ai une demande.'],
  hello:      ['Hello!', 'Bonjour !'],
  /* footer */
  foot_tag:   ['. Sourcing from ', '. Approvisionnement auprès de '],
  foot_fact:  [' verified Guangzhou factories.', ' usines vérifiées à Guangzhou.'],
  foot_contact: ['Contact', 'Contact'],
  foot_wa:    ['WhatsApp chat', 'Discuter sur WhatsApp'],
  foot_addr:  ['Guangzhou Showroom', 'Showroom de Guangzhou'],
  foot_base:  ['· Prices in USD with indicative FCFA conversion · All transactions confirmed via WhatsApp', '· Prix en USD avec conversion FCFA indicative · Toutes les transactions confirmées via WhatsApp'],
  /* product detail */
  crumb_home: ['Home', 'Accueil'],
  crumb_products: ['Products', 'Produits'],
  also_like:  ['You may also <span>like</span>', 'Vous aimerez <span>aussi</span>'],
  view_all:   ['View all →', 'Voir tout →'],
  th_qty:     ['Order qty', 'Quantité'],
  th_unit:    ['Unit price (USD)', 'Prix unitaire (USD)'],
  th_fcfa:    ['≈ FCFA/unit', '≈ FCFA/unité'],
  qty_plus:   ['+ pcs', '+ pièces'],
  moq_note:   ['(MOQ: ', '(Qté min : '],
  calc_unit:  ['Unit price at this quantity', 'Prix unitaire à cette quantité'],
  btn_add_basket: ['🧺 Add to basket', '🧺 Ajouter au panier'],
  btn_order_wa:   ['💬 Order this on WhatsApp', '💬 Commander sur WhatsApp'],
  not_found_h: ['Product not found 😕', 'Produit introuvable 😕'],
  not_found_p: ['It may have been removed. Browse the full catalogue instead.', 'Il a peut-être été retiré. Parcourez plutôt tout le catalogue.'],
  btn_back:   ['🛍️ Back to products', '🛍️ Retour aux produits'],
  loading:    ['Loading…', 'Chargement…'],
  verified_supplier: ['Verified supplier', 'Fournisseur vérifié'],
  /* product WhatsApp message */
  pdm_intro:  ['I want to order:', 'je souhaite commander :'],
  pdm_unit:   ['Unit price:', 'Prix unitaire :'],
  pdm_total:  ['Estimated total with shipping:', 'Total estimé avec livraison :'],
  pdm_confirm:['Please confirm availability and delivery time to Cameroon.', 'Merci de confirmer la disponibilité et le délai de livraison vers le Cameroun.'],
  ord_intro:  ['Hello TradMax, I want to source products.', 'Bonjour TradMax, je souhaite sourcer des produits.'],
  /* order message (WhatsApp) */
  om_head:    ['*New order — TradMax*', '*Nouvelle commande — TradMax*'],
  om_goods:   ['Goods subtotal:', 'Sous-total marchandises :'],
  om_ship:    ['Door-to-door shipping (est.):', 'Livraison porte-à-porte (est.) :'],
  om_confirm: ['Please confirm availability & delivery time. Thank you!', 'Merci de confirmer la disponibilité et le délai de livraison. Merci !'],
  /* admin */
  ad_h2:      ['List your products on <span>TradMax</span>', 'Vendez vos produits sur <span>TradMax</span>'],
  ad_note:    ['Products you add here are stored in this browser (localStorage) and appear instantly in the shop alongside the main catalogue. Perfect for showing buyers new stock before it goes live everywhere.', 'Les produits ajoutés ici sont enregistrés dans ce navigateur (localStorage) et apparaissent instantanément dans la boutique à côté du catalogue principal. Idéal pour montrer un nouveau stock aux acheteurs avant sa mise en ligne générale.'],
  ad_add:     ['➕ Add a product', '➕ Ajouter un produit'],
  f_name:     ['Product name *', 'Nom du produit *'],
  f_name_ph:  ['e.g. Wireless Earbuds X20', 'ex. Écouteurs sans fil X20'],
  f_cat:      ['Category *', 'Catégorie *'],
  f_icon:     ['Emoji icon', 'Icône emoji'],
  f_color:    ['Colour (for 🎨 colour search)', 'Couleur (pour la 🎨 recherche)'],
  f_moq:      ['MOQ (pcs) *', 'Qté min (pièces) *'],
  f_tiers:    ['Price tiers — quantity breaks in USD per unit *', 'Paliers de prix — quantités en USD par unité *'],
  f_tiers_hint: ['(price drops as quantity grows)', '(le prix baisse quand la quantité augmente)'],
  tier_qty:   ['Qty ≥', 'Qté ≥'],
  add_tier:   ['+ add tier', '+ ajouter un palier'],
  f_supplier: ['Supplier / source', 'Fournisseur / source'],
  f_sup_ph:   ['e.g. Guangzhou Audio Co.', 'ex. Guangzhou Audio Co.'],
  f_tags:     ['Search tags (comma separated)', 'Mots-clés (séparés par des virgules)'],
  f_tags_ph:  ['earbuds, bluetooth, audio', 'écouteurs, bluetooth, audio'],
  f_desc:     ['Description', 'Description'],
  f_desc_ph:  ['Key specs, packaging, OEM options…', 'Caractéristiques, emballage, options OEM…'],
  chk_hot:    ['🔥 Hot', '🔥 Populaire'],
  chk_new:    ['✨ New arrival', '✨ Nouveauté'],
  chk_feat:   ['⭐ Featured', '⭐ En vedette'],
  btn_save:   ['💾 Save product', '💾 Enregistrer le produit'],
  btn_export: ['⬇️ Export my products (JSON)', '⬇️ Exporter mes produits (JSON)'],
  ad_my:      ['📋 My products (', '📋 Mes produits ('],
  ad_none:    ['No custom products yet. Use the form to list your first item.', 'Aucun produit personnalisé pour le moment. Utilisez le formulaire pour créer votre première annonce.'],
  pl_from:    [' · from ', ' · à partir de '],
  alert_tier: ['Add at least one valid price tier (quantity + USD price).', 'Ajoutez au moins un palier de prix valide (quantité + prix USD).'],
  confirm_dup: ['already exists. Add anyway?', 'existe déjà. Ajouter quand même ?'],
  err_storage: ['Could not save to this browser storage.', 'Impossible d\u2019enregistrer dans ce navigateur.'],
  confirm_rm: ['Remove this product?', 'Retirer ce produit ?'],
  btn_rm:     ['Remove', 'Retirer'],
  /* checkout */
  nav_checkout: ['🧺 Basket', '🧺 Panier'],
  btn_checkout: ['✅ Review order & checkout', '✅ Vérifier et commander'],
  btn_quick_wa: ['Skip form — quick WhatsApp order', 'Sans formulaire — commande rapide sur WhatsApp'],
  co_h2:      ['Review your <span>order</span>', 'Vérifiez votre <span>commande</span>'],
  co_note:    ['Fill in your details and we will open WhatsApp with your complete order ready to send. Payment happens on delivery or by transfer — everything is confirmed with us on WhatsApp.', 'Remplissez vos informations et nous ouvrirons WhatsApp avec votre commande complète prête à envoyer. Le paiement se fait à la livraison ou par virement — tout est confirmé avec nous sur WhatsApp.'],
  co_details: ['📋 Your details', '📋 Vos informations'],
  sum_title:  ['📦 Order summary', '📦 Récapitulatif'],
  sum_empty:  ['Your basket is empty.', 'Votre panier est vide.'],
  sum_empty_p:['Browse the shop and add products to your basket first.', 'Parcourez la boutique et ajoutez d\u2019abord des produits au panier.'],
  btn_back_shop: ['← Back to shop', '← Retour à la boutique'],
  f_fullname: ['Full name *', 'Nom complet *'],
  f_fullname_ph: ['e.g. Jean Kamga', 'ex. Jean Kamga'],
  f_phone:    ['WhatsApp number *', 'Numéro WhatsApp *'],
  f_city:     ['Delivery city *', 'Ville de livraison *'],
  city_other: ['Other (specify in notes)', 'Autre (précisez dans les notes)'],
  f_pay:      ['Preferred payment', 'Mode de paiement souhaité'],
  pay_momo:   ['Mobile Money (MTN / Orange) — on delivery', 'Mobile Money (MTN / Orange) — à la livraison'],
  pay_bank:   ['Bank transfer', 'Virement bancaire'],
  pay_cash:   ['Cash on delivery', 'Espèces à la livraison'],
  f_notes:    ['Order notes (optional)', 'Notes de commande (facultatif)'],
  f_notes_ph: ['Landmark, preferred delivery date, sizes/colors breakdown…', 'Repère, date de livraison souhaitée, répartition tailles/couleurs…'],
  btn_place:  ['💬 Send order on WhatsApp', '💬 Envoyer la commande sur WhatsApp'],
  err_form:   ['Please fill in your name and a valid WhatsApp number (at least 8 digits).', 'Veuillez indiquer votre nom et un numéro WhatsApp valide (au moins 8 chiffres).'],
  om_buyer:   ['👤 Buyer:', '👤 Acheteur :'],
  om_wa:      ['📱 WhatsApp:', '📱 WhatsApp :'],
  om_city:    ['🏙️ Deliver to:', '🏙️ Livrer à :'],
  om_pay:     ['💳 Payment:', '💳 Paiement :'],
  om_notes:   ['📝 Notes:', '📝 Notes :'],
  co_done_h:  ['✅ Order sent!', '✅ Commande envoyée !'],
  co_done_p:  ['WhatsApp should have opened with your order. If not, tap the button below. We usually reply within a few hours with confirmation and delivery time.', 'WhatsApp devrait s\u2019être ouvert avec votre commande. Sinon, cliquez sur le bouton ci-dessous. Nous répondons généralement sous quelques heures avec la confirmation et le délai de livraison.'],
  btn_reopen: ['↻ Reopen WhatsApp', '↻ Rouvrir WhatsApp'],
  /* order refs + my-orders page */
  om_ref:     ['Ref:', 'Réf :'],
  co_your_ref:['Your order reference:', 'Votre référence de commande :'],
  nav_orders: ['📦 My Orders', '📦 Mes commandes'],
  or_h2:      ['My <span>orders</span>', 'Mes <span>commandes</span>'],
  or_note:    ['Orders you sent from this browser are kept here with their reference. Quote the reference (e.g. TM-ABC123) on WhatsApp any time and we will give you a status update instantly.', 'Les commandes envoyées depuis ce navigateur sont conservées ici avec leur référence. Citez la référence (ex. TM-ABC123) sur WhatsApp à tout moment et nous vous donnerons immédiatement son statut.'],
  or_none_h:  ['No orders yet.', 'Aucune commande pour le moment.'],
  or_none_p:  ['When you send your first order it will appear here with its tracking reference.', 'Lorsque vous enverrez votre première commande, elle apparaîtra ici avec sa référence de suivi.'],
  btn_start_shop: ['🛍️ Start shopping', '🛍️ Commencer mes achats'],
  st_processing: ['⏳ Processing', '⏳ En cours'],
  btn_track:  ['Ask for update', 'Demander le statut'],
  trk_msg:    ['Hello TradMax, could you give me a status update on my order', 'Bonjour TradMax, pouvez-vous me donner des nouvelles de ma commande'],
  /* how it works + FAQ */
  nav_how:    ['❓ How it works', '❓ Fonctionnement'],
  hw_h2:      ['How <span>TradMax</span> works', 'Comment fonctionne <span>TradMax</span>'],
  hw_intro:   ['You shop like on any online store — we handle everything on the China side: buying from the factories, quality control, export paperwork and shipping to your door in Cameroon.', 'Vous achetez comme sur n\u2019importe quelle boutique en ligne — nous gérons tout côté Chine : achats en usine, contrôle qualité, formalités d\u2019exportation et livraison jusqu\u2019à votre porte au Cameroun.'],
  hw_s1_t:    ['Browse & choose', 'Choisissez'],
  hw_s1_p:    ['Pick products from the catalogue or send us a photo/link of anything you saw in China.', 'Sélectionnez des produits du catalogue ou envoyez-nous une photo / un lien de ce que vous avez vu en Chine.'],
  hw_s2_t:    ['Order your way', 'Commandez à votre façon'],
  hw_s2_p:    ['Add to basket and check out — or just message us directly on WhatsApp.', 'Ajoutez au panier et validez — ou écrivez-nous simplement sur WhatsApp.'],
  hw_s3_t:    ['We buy & inspect', 'Nous achetons et inspectons'],
  hw_s3_p:    ['We purchase at factory price, run QC checks and send you photos before packing.', 'Nous achetons au prix usine, contrôlons la qualité et vous envoyons des photos avant emballage.'],
  hw_s4_t:    ['Consolidate & ship', 'Regroupement et expédition'],
  hw_s4_p:    ['All your goods are packed into one shipment and shipped door-to-door.', 'Toutes vos marchandises sont regroupées dans un seul envoi, livré porte-à-porte.'],
  hw_s5_t:    ['Pay & receive', 'Payez et recevez'],
  hw_s5_p:    ['Pay by Mobile Money, transfer or on delivery — in USD or FCFA.', 'Payez par Mobile Money, virement ou à la livraison — en USD ou FCFA.'],
  hw_ship_t:  ['🚚 Shipping & timing', '🚚 Livraison et délais'],
  hw_ship_p:  ['Sea freight from Guangzhou to Douala then inland delivery typically takes <b style="color:var(--txt)">4–7 weeks</b>. Small high-value items can go by air (1–2 weeks, quoted separately). Consolidation fee is 12% of goods value, minimum $45 — always shown before you confirm.', 'Le fret maritime de Guangzhou à Douala puis la livraison intérieure prennent généralement <b style="color:var(--txt)">4 à 7 semaines</b>. Les petits articles de valeur peuvent partir par avion (1–2 semaines, devis séparé). Les frais de regroupement sont de 12 % de la valeur, minimum 45 $ — toujours affichés avant confirmation.'],
  hw_pay_t:   ['💳 Payment options', '💳 Moyens de paiement'],
  hw_pay_p:   ['<b style="color:var(--txt)">Mobile Money</b> (MTN / Orange) in FCFA on delivery, <b style="color:var(--txt)">bank transfer</b> in USD before shipping, or <b style="color:var(--txt)">cash on delivery</b> in Douala. Every payment is confirmed on WhatsApp with a receipt.', '<b style="color:var(--txt)">Mobile Money</b> (MTN / Orange) en FCFA à la livraison, <b style="color:var(--txt)">virement bancaire</b> en USD avant expédition, ou <b style="color:var(--txt)">espèces à la livraison</b> à Douala. Chaque paiement est confirmé sur WhatsApp avec reçu.'],
  faq_h2:     ['Frequently asked <span>questions</span>', 'Questions <span>fréquentes</span>'],
  faq1_q:     ['What does MOQ mean?', 'Que signifie MOQ ?'],
  faq1_a:     ['MOQ = Minimum Order Quantity — the smallest number of pieces a factory accepts per product. Prices drop as your quantity grows (see the tier table on each product).', 'MOQ = quantité minimale de commande — le plus petit nombre de pièces qu\u2019une usine accepte par produit. Le prix baisse quand la quantité augmente (voir le tableau de paliers sur chaque produit).'],
  faq2_q:     ['Are these really factory prices?', 'Est-ce vraiment le prix usine ?'],
  faq2_a:     ['Yes. We buy directly from vetted factories in Guangzhou wholesale markets, so there is no middleman markup. The tier table shows exactly how the unit price falls as quantity rises.', 'Oui. Nous achetons directement auprès d\u2019usines vérifiées des marchés de gros de Guangzhou, sans intermédiaire. Le tableau de paliers montre précisément la baisse du prix unitaire selon la quantité.'],
  faq3_q:     ['Can I mix different products in one shipment?', 'Puis-je mélanger différents produits dans un envoi ?'],
  faq3_a:     ['Absolutely — that is exactly what our consolidation service is for. Put whatever you need in the basket; everything ships together in one consignment for one shipping fee.', 'Bien sûr — c\u2019est exactement le rôle de notre service de regroupement. Mettez tout ce dont vous avez besoin au panier ; tout part ensemble dans un seul envoi avec un seul frais de transport.'],
  faq4_q:     ['How long does delivery take?', 'Quels sont les délais de livraison ?'],
  faq4_a:     ['Sea freight Guangzhou → Douala usually takes 4–7 weeks door-to-door depending on volume and customs. Air freight for small urgent parcels takes 1–2 weeks. We confirm the exact timeline with every order on WhatsApp.', 'Le fret maritime Guangzhou → Douala prend généralement 4 à 7 semaines porte-à-porte selon le volume et la douane. L\u2019avion pour les petits colis urgents prend 1 à 2 semaines. Nous confirmons le délai exact pour chaque commande sur WhatsApp.'],
  faq5_q:     ['What if something arrives damaged?', 'Que faire si un article arrive endommagé ?'],
  faq5_a:     ['Every item passes QC inspection and we photograph your actual goods before packing. If something is still wrong on arrival, message us on WhatsApp with your order reference (TM-XXXXXX) within 48 hours and we will make it right.', 'Chaque article passe le contrôle qualité et nous photographions vos produits réels avant emballage. Si quelque chose ne va pas à l\u2019arrivée, écrivez-nous sur WhatsApp avec votre référence de commande (TM-XXXXXX) sous 48 heures et nous corrigerons.'],
  faq6_q:     ['I don\u2019t see what I need in the catalogue. Can you source it?', 'Je ne trouve pas ce que je cherche. Pouvez-vous le sourcer ?'],
  faq6_a:     ['Yes! The catalogue is only a sample of 6,000+ factories. Send us a photo, video or description on WhatsApp and we will find it, quote you in USD and FCFA, and add it to your next shipment.', 'Oui ! Le catalogue n\u2019est qu\u2019un échantillon de plus de 6 000 usines. Envoyez-nous une photo, une vidéo ou une description sur WhatsApp : nous le trouvons, vous chiffrons en USD et FCFA, et l\u2019ajoutons à votre prochain envoi.'],
  cta_t:      ['Ready to start?', 'Prêt à commencer ?'],
  cta_p:      ['Message us now — we reply fast, in English or French.', 'Écrivez-nous maintenant — nous répondons vite, en français ou en anglais.']
};

function t(key){
  const e = DICT[key];
  if(!e) return key;
  return e[I18N.lang() === 'fr' ? 1 : 0];
}

/* translate static HTML now (scripts run at end of body) */
I18N.applyStatic();