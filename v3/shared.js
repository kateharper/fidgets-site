// =============================================================
//  Shared rendering across variants A / B / C.
//  Each variant defines window.__ICONS__ and window.__VARIANT__,
//  then calls initVariant(). All three emit identical DOM
//  structure (.pcard, .bcard, .fpill) — variants style with CSS.
// =============================================================

function svgFor(p) {
  const ico = (window.__ICONS__ || {})[p.icon];
  if (!ico) return '';
  return `<svg viewBox="0 0 120 120" class="pcard-svg">${ico}</svg>`;
}

function stageHTML(p) {
  if (p.image) {
    return `<div class="pcard-img aspect-square overflow-hidden relative">
      <img src="${p.image}" alt="${p.name}" loading="lazy" onload="this.classList.add('loaded')" />
    </div>`;
  }
  // SVG card with glow tint
  return `<div class="pcard-img svg-stage aspect-square overflow-hidden flex items-center justify-center relative" style="--glow:${p.glow || ''}">
    ${svgFor(p)}
  </div>`;
}

function renderProducts(filter='all') {
  const list = filter === 'all' ? window.PRODUCTS : window.PRODUCTS.filter(p => p.cat === filter);
  const grid = document.getElementById('product-grid');
  grid.innerHTML = list.map(p => `
    <article class="pcard rounded-xl overflow-hidden flex flex-col" data-id="${p.id}">
      <div class="relative">
        ${stageHTML(p)}
        <div class="pcard-tag tag absolute top-3 left-3 bg-black/75 text-white2 px-2.5 py-1 rounded backdrop-blur-md">${p.cat}</div>
        ${p.sourced ? `<div class="tag absolute top-3 right-3 bg-electric/15 text-electric px-2.5 py-1 rounded backdrop-blur-md">SEWN</div>` : ''}
      </div>
      <div class="pcard-body p-5 flex-1 flex flex-col">
        <div class="flex items-start justify-between gap-3 mb-1.5">
          <h3 class="pcard-name font-semibold text-base leading-snug">${p.name}</h3>
          <div class="pcard-price font-bold text-base whitespace-nowrap">$${p.price}</div>
        </div>
        <p class="pcard-blurb text-sm text-muted mb-4 flex-1">${p.blurb}</p>
        <div class="pcard-swatches flex items-center gap-1.5 mb-4">
          ${p.colors.map(c => `<span class="sw" style="background:${window.COLORS[c].hex}" title="${window.COLORS[c].name}"></span>`).join('')}
        </div>
        <button onclick="buy('${p.id}')" class="pcard-cta btn btn-fill w-full py-2.5 rounded text-sm">Add to cart &rarr;</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.pcard').forEach(el => observer.observe(el));
}

function renderBundles() {
  const grid = document.getElementById('bundle-grid');
  if (!grid) return;
  grid.innerHTML = window.BUNDLES.map(b => `
    <article class="bcard accent-${b.accent} rounded-xl overflow-hidden flex flex-col p-6 relative" style="background: linear-gradient(180deg, var(--accent-bg) 0%, transparent 70%); border: 1px solid var(--accent);">
      ${b.pop ? `<div class="tag absolute top-4 right-4" style="color: var(--accent);">${b.pop}</div>` : ''}
      <div class="tag mb-2" style="color: var(--accent);">${b.contents}</div>
      <h3 class="display font-bold text-2xl mb-2">${b.name}</h3>
      <p class="text-muted text-sm mb-6 flex-1">${b.blurb}</p>
      <div class="flex items-baseline gap-3 mb-5">
        <div class="display font-bold text-3xl">$${b.price}</div>
        <div class="text-muted text-sm line-through">$${b.retail}</div>
        <div class="tag" style="color: var(--accent);">SAVE $${b.retail - b.price}</div>
      </div>
      <button onclick="buyBundle('${b.id}')" class="btn btn-line w-full py-2.5 rounded text-sm">Add bundle &rarr;</button>
    </article>
  `).join('');
}

function renderFilters() {
  const cats = ['all', ...new Set(window.PRODUCTS.map(p => p.cat))];
  const labels = { all: 'All', spinner: 'Spinners', cube: 'Cubes', articulated: 'Articulated', slider: 'Sliders', puzzle: 'Puzzles', gadget: 'Gadgets', sourced: 'Sewn' };
  const f = document.getElementById('filters');
  f.innerHTML = cats.map((c,i) => `<button class="fpill ${i===0?'on':''} px-3.5 py-1.5 rounded" data-filter="${c}">${labels[c]||c}</button>`).join('');
  f.querySelectorAll('.fpill').forEach(btn => btn.addEventListener('click', () => {
    f.querySelectorAll('.fpill').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    renderProducts(btn.dataset.filter);
  }));
}

// Stripe Payment Links — paste real URLs to enable
window.STRIPE_PAYMENT_LINKS = {};

window.buy = function(productId) {
  const link = window.STRIPE_PAYMENT_LINKS[productId];
  if (link) { window.location.href = link; return; }
  const p = window.PRODUCTS.find(x => x.id === productId);
  alert(`${p.name} — $${p.price}\n\nStripe checkout not yet configured. (See SETUP.md.)`);
};

window.buyBundle = function(bundleId) {
  const b = window.BUNDLES.find(x => x.id === bundleId);
  alert(`${b.name} — $${b.price}\n\nBundle checkout not yet configured. (See SETUP.md.)`);
};

// Reveal observer (used by all variants)
window.observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });

window.initVariant = function() {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderFilters();
  renderProducts('all');
  renderBundles();
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};
