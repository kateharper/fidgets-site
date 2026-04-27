// =============================================================
//  OPTION C — Sold blunt, parent arranges sharpening if desired.
//  Karambit-shaped premium items ship UNSHARPENED.
//  Tom's not selling a weapon — he's selling a blunt metal/wood
//  decorative piece. What the parent does with it is their call.
//  Butterfly knives REMAIN excluded — Schedule 1 prohibits the
//  blade-between-2-handles form factor regardless of edge.
// =============================================================
(function () {
  window.PRODUCTS = window.PRODUCTS.filter(p => p.tier !== 'premium');

  const PREMIUM_COLORS = ['silk_aluminium','silk_brass','silk_copper','marble_swirl','wood_walnut','carbon_fibre'];

  window.PRODUCTS.push(
    { id: 'c-spinner', name: 'Aluminium-Effect Heavy Spinner', cat: 'premium', tier: 'premium',
      filament_g: 90, comp_low: 35, comp_avg: 48, comp_high: 80, price: 48,
      blurb: 'Silk Aluminium PLA. Premium spinner, no knife-policy needed.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/34710649/pexels-photo-34710649.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: false },
    { id: 'c-karambit-brass', name: 'Brass Karambit (Ships Blunt)', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 55, comp_avg: 70, comp_high: 105, price: 70,
      blurb: 'Outsourced solid brass karambit. Ships UNSHARPENED. Sharpening is your call (find your own service).',
      bambu_colors: ['silk_brass','silk_copper','silk_aluminium','wood_walnut','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: true,
      sourced: true },
    { id: 'c-karambit-walnut', name: 'Walnut Karambit Trainer', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 50, comp_avg: 65, comp_high: 95, price: 65,
      blurb: 'Solid lathed walnut. No edge possible — wood. Trainer-style.',
      bambu_colors: ['wood_walnut','silk_brass','silk_copper','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: false,
      sourced: true },
    { id: 'c-cube', name: 'Brass-Finish Heavy Cube', cat: 'premium', tier: 'premium',
      filament_g: 110, comp_low: 38, comp_avg: 52, comp_high: 85, price: 52,
      blurb: 'Silk Brass filament, weighted infill.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: false },
    { id: 'c-pyramid', name: 'Galaxy Marble Pyramid', cat: 'premium', tier: 'premium',
      filament_g: 60, comp_low: 32, comp_avg: 42, comp_high: 70, price: 42,
      blurb: 'Galaxy Marble filament. Tetrahedron silhouette.',
      bambu_colors: ['marble_swirl','galaxy','silk_aluminium','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33270189/pexels-photo-33270189.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: false },
    { id: 'c-comb', name: 'Brass Butterfly Comb', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 55, comp_avg: 72, comp_high: 110, price: 72,
      blurb: 'Real metal butterfly form, hair-comb teeth, no blade. Ships ready-to-use (combs are always blunt). No NSW concern.',
      bambu_colors: ['silk_brass','silk_copper','silk_aluminium','wood_walnut','carbon_fibre'],
      image: 'https://images.pexels.com/photos/34710662/pexels-photo-34710662.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, ships_blunt: false, sourced: true },
  );

  const RATE = 0.080;
  window.PRODUCTS.filter(p => p.tier === 'premium').forEach(p => {
    p.filament_cost = p.filament_g ? +(p.filament_g * RATE).toFixed(2) : 0;
    p.margin = +(p.price - p.filament_cost).toFixed(2);
  });

  // Override addToCart: blunt items get a parent-acknowledgement prompt
  const _origAddToCart = window.addToCart;
  window.addToCart = function (productId) {
    const p = window.PRODUCTS.find(x => x.id === productId);
    if (p && p.ships_blunt) {
      const ack = confirm(
        `🔪 SHIPS BLUNT — ${p.name}\n\n` +
        `This item arrives UNSHARPENED. We do not offer a sharpening service.\n\n` +
        `By continuing you confirm:\n` +
        `· You are a parent or 18+ buyer\n` +
        `· Tom is not responsible for any sharpening done after delivery\n` +
        `· Shipping is to a residential address (not a school)\n` +
        `· You understand NSW knife-carry laws apply in public\n\n` +
        `Continue?`
      );
      if (!ack) return;
      alert(`Parent-ack checkout — Stripe Checkout + age-tickbox not yet wired. See SETUP.md.\n\nIn production:\n1. Tickbox required at checkout\n2. Item ships unsharpened with disclaimer card in box\n3. Order proceeds`);
      return;
    }
    if (typeof _origAddToCart === 'function') return _origAddToCart(productId);
  };

  window.OPTION_LABEL = 'Option C — Sold blunt';
})();
