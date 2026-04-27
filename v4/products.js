// =============================================================
//  Fidgets v4 — locked INCYT direction, with:
//   · 3 loss-leader products ($3-4)
//   · 5 premium-only products ($42-72)
//   · Bambu Lab filament palette (10 colours per product)
//   · Existing 27 regular products from v3
//
//  PRICING POLICY (per Simon's directive):
//   - Regular products: comp_avg
//   - Loss-leaders: priced BELOW filament cost on purpose, to draw traffic.
//   - Premium: $42-72 in premium Bambu filaments (silk, wood, marble, CF)
//   - Knife products explicitly NOT included — see ../KNIFE-NOTES.md
//     Replaced with butterfly-comb / karambit-trainer fidgets which are
//     the legal toy-grade equivalents.
// =============================================================

// =============================================================
//  BAMBU LAB FILAMENT PALETTE
//  Hex codes verified against Bambu Lab official PDF + Community Forum
//  10 covering Basic + Silk + Glow + Wood for variety
// =============================================================
window.BAMBU_PALETTE = {
  // PLA Basic — Bambu's everyday line
  jade_white:    { name: 'Jade White',         hex: '#f5f5f0', tier: 'basic' },
  bambu_black:   { name: 'Bambu Black',        hex: '#1a1a1d', tier: 'basic' },
  bambu_red:     { name: 'Bambu Red',          hex: '#c12e1f', tier: 'basic' },
  cyber_yellow:  { name: 'Cyber Yellow',       hex: '#e4bd68', tier: 'basic' },
  cyan_blue:     { name: 'Cyan Blue',          hex: '#0086d6', tier: 'basic' },
  mistletoe:     { name: 'Mistletoe Green',    hex: '#3f8e43', tier: 'basic' },
  magenta:       { name: 'Magenta',            hex: '#ec008c', tier: 'basic' },
  purple:        { name: 'Royal Purple',       hex: '#5e43b7', tier: 'basic' },
  // PLA Silk / Specials
  glow_green:    { name: 'Glow Mint',          hex: '#a3e635', tier: 'special', extra: '+$2' },
  galaxy:        { name: 'Galaxy Purple',      hex: '#7c3aed', tier: 'special', extra: '+$2' },
  // Premium-tier (silk, wood, CF — used for premium products)
  silk_aluminium:{ name: 'Silk Aluminium',     hex: '#a8b0b8', tier: 'premium' },
  silk_brass:    { name: 'Silk Brass',         hex: '#b8923f', tier: 'premium' },
  silk_copper:   { name: 'Silk Copper',        hex: '#a8642a', tier: 'premium' },
  marble_swirl:  { name: 'Marble Swirl',       hex: '#e8e1d4', tier: 'premium' },
  wood_walnut:   { name: 'Walnut Wood-fill',   hex: '#5a3a22', tier: 'premium' },
  carbon_fibre:  { name: 'Carbon Fibre',       hex: '#1c1c1c', tier: 'premium' },
};

// Default colour set every regular product uses (10 colours)
const DEFAULT_COLORS = [
  'jade_white', 'bambu_black', 'bambu_red', 'cyber_yellow', 'cyan_blue',
  'mistletoe', 'magenta', 'purple', 'glow_green', 'galaxy'
];

// Premium colour set (premium materials only)
const PREMIUM_COLORS = [
  'silk_aluminium', 'silk_brass', 'silk_copper', 'marble_swirl', 'wood_walnut', 'carbon_fibre'
];

window.PRODUCTS = [
  // =============================================================
  //  LOSS-LEADER TIER — $3-4, advertised everywhere
  // =============================================================
  {
    id: 'mini-spinner', name: 'Mini Spinner', cat: 'loss-leader', tier: 'loss',
    filament_g: 8, comp_low: 4, comp_avg: 7, comp_high: 12, price: 3,
    blurb: 'Pocket-sized 2-arm spinner. The "try Tom\'s fidgets" intro.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/422290/pexels-photo-422290.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'tiny-worm', name: 'Tiny Worm', cat: 'loss-leader', tier: 'loss',
    filament_g: 5, comp_low: 3, comp_avg: 5, comp_high: 9, price: 3,
    blurb: 'A 4cm wiggly worm. First fidget for first-time customers.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 50%, rgba(252,211,77,0.5), transparent 60%), radial-gradient(circle at 80% 40%, rgba(132,204,22,0.45), transparent 60%)',
    icon: 'worm',
  },
  {
    id: 'mini-clicker', name: 'Mini Clicker', cat: 'loss-leader', tier: 'loss',
    filament_g: 7, comp_low: 4, comp_avg: 6, comp_high: 10, price: 4,
    blurb: 'Single-button clicker. Perfectly satisfying. $4 to get hooked.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=600',
  },

  // =============================================================
  //  REGULAR TIER — 27 products (carried over from v3)
  // =============================================================
  // SPINNERS
  { id: 'spinner-3', name: 'Three-Arm Spinner', cat: 'spinner', tier: 'regular',
    filament_g: 35, comp_low: 6, comp_avg: 9, comp_high: 14, price: 9,
    blurb: 'The classic. Triple-bearing, buttery spin.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/422290/pexels-photo-422290.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'spinner-6', name: 'Six-Arm Mega Spinner', cat: 'spinner', tier: 'regular',
    filament_g: 55, comp_low: 9, comp_avg: 14, comp_high: 22, price: 14,
    blurb: 'More arms, longer spin. Whirring satisfaction.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'star-spinner', name: 'Star Spinner', cat: 'spinner', tier: 'regular',
    filament_g: 40, comp_low: 7, comp_avg: 11, comp_high: 18, price: 11,
    blurb: 'Five-pointed, weighted tips, hypnotic.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/34710663/pexels-photo-34710663.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'metal-spinner', name: 'Metallic-Finish Spinner', cat: 'spinner', tier: 'regular',
    filament_g: 60, comp_low: 12, comp_avg: 18, comp_high: 32, price: 18,
    blurb: 'Silk metallic filament. Looks like polished steel.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/33633049/pexels-photo-33633049.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // CUBES
  { id: 'fidget-cube', name: 'Print-in-Place Fidget Cube', cat: 'cube', tier: 'regular',
    filament_g: 75, comp_low: 14, comp_avg: 20, comp_high: 30, price: 20,
    blurb: 'Six sides of buttons, dials and switches.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Print_in_place_Fidget_Cube.jpg' },
  { id: 'infinity-cube', name: 'Infinity Cube', cat: 'cube', tier: 'regular',
    filament_g: 50, comp_low: 10, comp_avg: 15, comp_high: 24, price: 15,
    blurb: 'Folds and unfolds forever. The desk classic.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Fidget_cube_yellow_and_white.jpg' },
  { id: 'gear-cube', name: 'Gear Cube', cat: 'cube', tier: 'regular',
    filament_g: 65, comp_low: 12, comp_avg: 17, comp_high: 25, price: 17,
    blurb: 'Interlocking gears. Click-click-click.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/9242925/pexels-photo-9242925.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // ARTICULATED
  { id: 'dragon', name: 'Articulated Dragon', cat: 'articulated', tier: 'regular',
    filament_g: 130, comp_low: 22, comp_avg: 30, comp_high: 50, price: 30,
    blurb: 'Big flexi dragon &mdash; the showstopper.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(132,204,22,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.4), transparent 60%)',
    icon: 'dragon' },
  { id: 'snake', name: 'Articulated Snake', cat: 'articulated', tier: 'regular',
    filament_g: 45, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Wiggle, drape, wear as a bracelet.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(132,204,22,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.45), transparent 60%)',
    icon: 'snake' },
  { id: 'octopus', name: 'Articulated Octopus', cat: 'articulated', tier: 'regular',
    filament_g: 80, comp_low: 14, comp_avg: 19, comp_high: 28, price: 19,
    blurb: 'Eight tentacles of squishy print-in-place fun.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 50% 30%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.5), transparent 60%)',
    icon: 'octopus' },
  { id: 'axolotl', name: 'Articulated Axolotl', cat: 'articulated', tier: 'regular',
    filament_g: 60, comp_low: 12, comp_avg: 17, comp_high: 24, price: 17,
    blurb: 'Smiley pink axolotl with floppy gills.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 40%, rgba(244,114,182,0.6), transparent 60%), radial-gradient(circle at 80% 60%, rgba(252,211,77,0.4), transparent 60%)',
    icon: 'axolotl' },
  { id: 'worm', name: 'Wiggle Worm', cat: 'articulated', tier: 'regular',
    filament_g: 18, comp_low: 5, comp_avg: 8, comp_high: 12, price: 8,
    blurb: 'Pocket-sized stress relief. Free wiggles.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 50%, rgba(252,211,77,0.55), transparent 60%), radial-gradient(circle at 80% 40%, rgba(132,204,22,0.5), transparent 60%)',
    icon: 'worm' },
  { id: 'lizard', name: 'Mini Lizard', cat: 'articulated', tier: 'regular',
    filament_g: 25, comp_low: 6, comp_avg: 10, comp_high: 16, price: 10,
    blurb: 'Tiny flexi lizard. Fits in any pencil case.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(22,163,74,0.5), transparent 60%)',
    icon: 'lizard' },

  // SLIDERS
  { id: 'slider', name: 'Magnetic-Feel Slider', cat: 'slider', tier: 'regular',
    filament_g: 45, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Smooth as silk. Slides from one end to the other.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'gyro-ring', name: 'Gyro Ring', cat: 'slider', tier: 'regular',
    filament_g: 22, comp_low: 7, comp_avg: 11, comp_high: 16, price: 11,
    blurb: 'Spins on your finger. Discreet desk fidget.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/8145711/pexels-photo-8145711.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'spinner-ring', name: 'Spinner Fidget Ring', cat: 'slider', tier: 'regular',
    filament_g: 8, comp_low: 9, comp_avg: 13, comp_high: 22, price: 13,
    blurb: 'Wearable spinner. Looks like jewellery.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/14064918/pexels-photo-14064918.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'rolling-maze', name: 'Rolling Ball Maze', cat: 'slider', tier: 'regular',
    filament_g: 70, comp_low: 13, comp_avg: 18, comp_high: 28, price: 18,
    blurb: 'Tilt and twist to roll the ball through.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.45), transparent 60%)',
    icon: 'maze' },
  { id: 'spiky-roller', name: 'Spiky Sensory Roller', cat: 'slider', tier: 'regular',
    filament_g: 35, comp_low: 9, comp_avg: 13, comp_high: 22, price: 13,
    blurb: 'Tactile spikes for high-input sensory feedback.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/4114512/pexels-photo-4114512.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'spiral-cone', name: 'Spiral Cone', cat: 'slider', tier: 'regular',
    filament_g: 30, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Print-in-place spiral that twirls between your fingers.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.55), transparent 60%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.5), transparent 60%)',
    icon: 'spiral' },

  // PUZZLES
  { id: 'hex-flexi', name: 'Hex Flexi', cat: 'puzzle', tier: 'regular',
    filament_g: 40, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Hexagonal mesh that folds into a thousand shapes.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.55), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.5), transparent 60%)',
    icon: 'hex' },
  { id: 'magic-snake', name: 'Magic Snake', cat: 'puzzle', tier: 'regular',
    filament_g: 55, comp_low: 10, comp_avg: 14, comp_high: 22, price: 14,
    blurb: 'Twist 24 segments into anything you can imagine.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 50%, rgba(225,29,72,0.55), transparent 60%), radial-gradient(circle at 80% 40%, rgba(252,211,77,0.5), transparent 60%)',
    icon: 'magicsnake' },
  { id: 'twist-puzzle', name: 'Twist Puzzle', cat: 'puzzle', tier: 'regular',
    filament_g: 38, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Tangle-style endless loop. Always something to twist.',
    bambu_colors: DEFAULT_COLORS,
    glow: 'radial-gradient(circle at 30% 30%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(circle at 80% 70%, rgba(132,204,22,0.5), transparent 60%)',
    icon: 'twist' },
  { id: 'chain', name: 'Bike-Chain Fidget', cat: 'puzzle', tier: 'regular',
    filament_g: 42, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Interlocking links. Drape, swing, click.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/A_%22bike_chain%22_type_fidget_toy.jpg' },
  { id: 'twisting-egg', name: 'Twisting Egg', cat: 'puzzle', tier: 'regular',
    filament_g: 50, comp_low: 11, comp_avg: 15, comp_high: 24, price: 15,
    blurb: 'Egg-shaped twist puzzle. Smoother than a Rubik\'s cube.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/6979267/pexels-photo-6979267.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // GADGETS
  { id: 'gear-fidget', name: 'Pocket Gear Fidget', cat: 'gadget', tier: 'regular',
    filament_g: 32, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Three interlocking gears in a card-sized frame.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'clicker', name: 'Clicker Fidget', cat: 'gadget', tier: 'regular',
    filament_g: 18, comp_low: 7, comp_avg: 10, comp_high: 16, price: 10,
    blurb: 'Mechanical-keyboard click on demand.',
    bambu_colors: DEFAULT_COLORS,
    image: 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // SOURCED
  { id: 'fidget-blanket', name: 'Sensory Fidget Blanket', cat: 'sourced', tier: 'regular',
    filament_g: 0, comp_low: 35, comp_avg: 45, comp_high: 65, price: 45,
    sourced: true,
    blurb: 'Sewn lap blanket with zips, beads, ribbons and buttons.',
    bambu_colors: ['galaxy','cyan_blue','magenta','cyber_yellow'],
    image: 'https://images.pexels.com/photos/17219698/pexels-photo-17219698.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // =============================================================
  //  PREMIUM TIER — subscriber-only · $42-72
  //  Materials: Bambu Silk Metallic, Wood-fill, Carbon Fibre, Marble
  //  KNIFE PRODUCTS replaced with legal trainer / comb equivalents
  //  (see ../KNIFE-NOTES.md for the why)
  // =============================================================
  {
    id: 'premium-spinner', name: 'Aluminium-Effect Heavy Spinner', cat: 'premium', tier: 'premium',
    filament_g: 90, comp_low: 35, comp_avg: 48, comp_high: 80, price: 48,
    blurb: 'Premium Silk Aluminium PLA. Heavy-feel, mirror finish, 4-minute spin.',
    bambu_colors: PREMIUM_COLORS,
    image: 'https://images.pexels.com/photos/34710649/pexels-photo-34710649.jpeg?auto=compress&cs=tinysrgb&w=800',
    premium: true,
  },
  {
    id: 'premium-balisong', name: 'Marbled Balisong Comb', cat: 'premium', tier: 'premium',
    filament_g: 55, comp_low: 45, comp_avg: 59, comp_high: 90, price: 59,
    blurb: 'Butterfly-knife flipping motion. Comb teeth, no blade. 100% legal trainer / fidget.',
    bambu_colors: PREMIUM_COLORS,
    image: 'https://images.pexels.com/photos/34710662/pexels-photo-34710662.jpeg?auto=compress&cs=tinysrgb&w=800',
    premium: true,
  },
  {
    id: 'premium-karambit', name: 'Walnut Karambit Trainer', cat: 'premium', tier: 'premium',
    filament_g: 65, comp_low: 50, comp_avg: 65, comp_high: 95, price: 65,
    blurb: 'Curved finger-flow trainer in Walnut Wood-fill PLA. No edge. Legal toy-grade.',
    bambu_colors: ['wood_walnut', 'silk_brass', 'silk_copper', 'carbon_fibre'],
    image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
    premium: true,
  },
  {
    id: 'premium-cube', name: 'Brass-Finish Heavy Cube', cat: 'premium', tier: 'premium',
    filament_g: 110, comp_low: 38, comp_avg: 52, comp_high: 85, price: 52,
    blurb: 'Silk Brass filament, heavy infill, weighted feel. The desk-trophy fidget.',
    bambu_colors: PREMIUM_COLORS,
    image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
    premium: true,
  },
  {
    id: 'premium-pyramid', name: 'Galaxy Marble Pyramid', cat: 'premium', tier: 'premium',
    filament_g: 60, comp_low: 32, comp_avg: 42, comp_high: 70, price: 42,
    blurb: 'Galaxy Marble special filament. Tetrahedron silhouette, swirled finish.',
    bambu_colors: ['marble_swirl', 'galaxy', 'silk_aluminium', 'carbon_fibre'],
    image: 'https://images.pexels.com/photos/33270189/pexels-photo-33270189.jpeg?auto=compress&cs=tinysrgb&w=800',
    premium: true,
  },
];

// =============================================================
//  BUNDLES
// =============================================================
window.BUNDLES = [
  { id: 'starter',   name: 'Starter Pack',     blurb: 'Pick 1 spinner + 1 cube + 1 articulated. Saves $4.',                contents: '1 spinner · 1 cube · 1 articulated',  price: 30, retail: 34, pop: 'Most popular', accent: 'fuchsia' },
  { id: 'articulated', name: 'Articulated Trio', blurb: 'Any 3 articulated creatures. Plus 50% off your next order.',     contents: '3 articulated · 50% off next',         price: 35, retail: 50, accent: 'lime' },
  { id: 'spinner-stack', name: 'Spinner Stack',  blurb: 'Three spinners — mix and match the four spinner styles.',         contents: '3 spinners',                           price: 25, retail: 31, accent: 'sky' },
  { id: 'class-pack', name: 'Class Pack',        blurb: 'Five fidgets for the gang. Birthday party loot bags sorted.',     contents: '5 fidgets · party-ready',              price: 40, retail: 55, accent: 'amber' },
  { id: 'mega',      name: 'Mega Pack',         blurb: 'Pick any 8 fidgets. Best $/fidget on the site.',                  contents: '8 fidgets · best value',               price: 80, retail: 120, pop: 'Best value', accent: 'violet' },
];

// =============================================================
//  PREMIUM SUBSCRIPTION — $5/month
// =============================================================
window.SUBSCRIPTION = {
  price_monthly: 5,
  signup_credit: 15,
  monthly_credit: 10,
  benefits: [
    '$15 instant credit on signup',
    '$10 credit every month, no questions',
    'Premium-only fidget collection (5 items, $42–$72)',
    'Skip-the-queue priority printing',
    'Early access to new releases',
    'Free shipping on orders > $30',
  ],
};

// =============================================================
//  REFERRAL PROGRAMME — earn $10 credit per 5 friend signups
// =============================================================
window.REFERRAL = {
  reward_amount: 10,
  friends_required: 5,
  description: 'Share your code. When 5 friends order their first fidget using it, you get $10 credit.',
};

// =============================================================
//  Calculated columns
// =============================================================
const FILAMENT_RATES = { regular: 0.030, loss: 0.030, premium: 0.080 }; // premium silk/wood ~$80/kg
window.PRODUCTS.forEach(p => {
  const rate = FILAMENT_RATES[p.tier] || 0.030;
  p.filament_cost = +(p.filament_g * rate).toFixed(2);
  p.margin = +(p.price - p.filament_cost).toFixed(2);
});
