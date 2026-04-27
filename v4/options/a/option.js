// =============================================================
//  OPTION A — Drop knife shapes entirely.
//  Premium tier becomes 5 conventional non-knife fidgets.
//  No age gate, no parent flow, no special checkout.
//  Cleanest legally: no NSW Schedule 1 weapons concerns.
// =============================================================
(function () {
  // Strip existing premium products
  window.PRODUCTS = window.PRODUCTS.filter(p => p.tier !== 'premium');

  const PREMIUM_COLORS = ['silk_aluminium','silk_brass','silk_copper','marble_swirl','wood_walnut','carbon_fibre'];

  window.PRODUCTS.push(
    { id: 'a-spinner', name: 'Aluminium-Effect Heavy Spinner', cat: 'premium', tier: 'premium',
      filament_g: 90, comp_low: 35, comp_avg: 48, comp_high: 80, price: 48,
      blurb: 'Silk Aluminium PLA. Heavy, mirror finish, 4-minute spin.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/34710649/pexels-photo-34710649.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true },
    { id: 'a-cube', name: 'Brass-Finish Heavy Cube', cat: 'premium', tier: 'premium',
      filament_g: 110, comp_low: 38, comp_avg: 52, comp_high: 85, price: 52,
      blurb: 'Silk Brass filament, weighted infill. The desk-trophy fidget.',
      bambu_colors: PREMIUM_COLORS,
      image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true },
    { id: 'a-pyramid', name: 'Galaxy Marble Pyramid', cat: 'premium', tier: 'premium',
      filament_g: 60, comp_low: 32, comp_avg: 42, comp_high: 70, price: 42,
      blurb: 'Galaxy Marble filament. Tetrahedron silhouette, swirled finish.',
      bambu_colors: ['marble_swirl','galaxy','silk_aluminium','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33270189/pexels-photo-33270189.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true },
    { id: 'a-worry', name: 'Walnut Worry Stone', cat: 'premium', tier: 'premium',
      filament_g: 50, comp_low: 28, comp_avg: 38, comp_high: 60, price: 38,
      blurb: 'Walnut Wood-fill PLA. Pebble silhouette, oil-rubbed finish.',
      bambu_colors: ['wood_walnut','silk_brass','silk_copper','carbon_fibre'],
      image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true },
    { id: 'a-comb', name: 'Brass Butterfly Comb', cat: 'premium', tier: 'premium',
      filament_g: 0, comp_low: 55, comp_avg: 72, comp_high: 110, price: 72,
      blurb: 'Real metal butterfly form &mdash; hair-comb teeth, no blade. The flipping motion, fully legal. Outsourced solid brass.',
      bambu_colors: ['silk_brass','silk_copper','silk_aluminium','wood_walnut','carbon_fibre'],
      image: 'https://images.pexels.com/photos/34710662/pexels-photo-34710662.jpeg?auto=compress&cs=tinysrgb&w=800',
      premium: true, sourced: true },
  );

  // Recalc filament cost @ premium rate
  const RATE = 0.080;
  window.PRODUCTS.filter(p => p.tier === 'premium').forEach(p => {
    p.filament_cost = +(p.filament_g * RATE).toFixed(2);
    p.margin = +(p.price - p.filament_cost).toFixed(2);
  });

  window.OPTION_LABEL = 'Option A — No knives';
})();
