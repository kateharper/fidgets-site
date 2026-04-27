// =============================================================
//  OPTION B — Parent-to-parent (adult collection).
//  Premium tier ships only to verified adults.
//  Karambit shapes OK in NSW (no Schedule 1 listing for karambits;
//  general knife laws still apply for public carry).
//  Butterfly knives REMAIN excluded — Schedule 1 blanket ban,
//  prohibited in any material with blade form, even for adults.
// =============================================================
(function () {
  window.PRODUCTS = window.PRODUCTS.filter(p => p.tier !== 'premium');

  const PREMIUM_COLORS  = ['silk_aluminium','silk_brass','silk_copper','marble_swirl','wood_walnut','carbon_fibre'];

  window.PRODUCTS.push(
    { id: 'b-spinner', name: 'Aluminium-Effect Heavy Spinner', cat: 'premium', tier: 'premium',
      filament_g: 90, comp_low: 35, comp_avg: 48, comp_high: 80, price: 48,
      blurb: 'Silk Aluminium PLA. The headline premium spinner.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/34710649/pexels-photo-34710649.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: false },
    { id: 'b-karambit-brass', name: 'Solid Brass Karambit Trainer', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 60, comp_avg: 75, comp_high: 110, price: 75,
      blurb: 'Outsourced solid brass, lathed and polished. No edge — finger-flow trainer. Adult-only.',
      bambu_colors: ['silk_brass','silk_copper','silk_aluminium','wood_walnut','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: true,
      sourced: true },
    { id: 'b-karambit-walnut', name: 'Lathed Walnut Karambit Trainer', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 50, comp_avg: 65, comp_high: 95, price: 65,
      blurb: 'Solid lathed walnut. Curved finger-flow trainer. Adult-only.',
      bambu_colors: ['wood_walnut','silk_brass','silk_copper','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: true,
      sourced: true },
    { id: 'b-cube', name: 'Brass-Finish Heavy Cube', cat: 'premium', tier: 'premium',
      filament_g: 110, comp_low: 38, comp_avg: 52, comp_high: 85, price: 52,
      blurb: 'Silk Brass filament, weighted infill.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: false },
    { id: 'b-pyramid', name: 'Galaxy Marble Pyramid', cat: 'premium', tier: 'premium',
      filament_g: 60, comp_low: 32, comp_avg: 42, comp_high: 70, price: 42,
      blurb: 'Galaxy Marble filament. Tetrahedron silhouette.',
      bambu_colors: ['marble_swirl','galaxy','silk_aluminium','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33270189/pexels-photo-33270189.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: false },
    { id: 'b-comb', name: 'Brass Butterfly Comb', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 55, comp_avg: 72, comp_high: 110, price: 72,
      blurb: 'Real metal butterfly form, hair-comb teeth, no blade. Fully legal under NSW Schedule 1 (no blade, no age gate needed). Outsourced solid brass.',
      bambu_colors: ['silk_brass','silk_copper','silk_aluminium','wood_walnut','carbon_fibre'],
      image: 'https://images.pexels.com/photos/34710662/pexels-photo-34710662.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, adult_only: false, sourced: true },
  );

  const RATE = 0.080;
  window.PRODUCTS.filter(p => p.tier === 'premium').forEach(p => {
    p.filament_cost = p.filament_g ? +(p.filament_g * RATE).toFixed(2) : 0;
    p.margin = +(p.price - p.filament_cost).toFixed(2);
  });

  // Override addToCart: adult-only items require age gate
  const _origAddToCart = window.addToCart;
  window.addToCart = function (productId) {
    const p = window.PRODUCTS.find(x => x.id === productId);
    if (p && p.adult_only) {
      const verify = confirm(
        `🔞 ADULT-ONLY ITEM — ${p.name}\n\n` +
        `Karambit-shaped items ship only to verified adult buyers (18+).\n\n` +
        `By clicking OK you confirm:\n` +
        `· You are 18 or older\n` +
        `· Shipping is to a residential address (NOT a school)\n` +
        `· You acknowledge the NSW knife-carry rules apply in public\n\n` +
        `Continue to age-verify checkout?`
      );
      if (!verify) return;
      alert(`Age-verify checkout — Stripe + Stripe Identity not yet wired. See SETUP.md.\n\nIn production:\n1. ID upload via Stripe Identity\n2. ID-on-delivery tick at the carrier\n3. Order proceeds`);
      return;
    }
    if (typeof _origAddToCart === 'function') return _origAddToCart(productId);
  };

  window.OPTION_LABEL = 'Option B — Parent-to-parent';
})();
