// =============================================================
//  Fidgets — shared catalogue (used by all 3 variants)
//
//  Pricing model (per Simon's directive):
//    - filament_g     : estimated print weight (premium PLA+)
//    - filament_cost  : filament_g * $0.030 (AU PLA+ ~$30/kg)
//    - comp_low/avg/high : Australian online competitor pricing
//                          (Etsy AU, Fun Fidgets, Kaiko, Sensory Tools AU,
//                           The Sensory Store, Amazon AU — researched 2026-04-26)
//    - price          : set to comp_avg, rounded to nearest dollar
// =============================================================

window.COLORS = {
  galaxy:   { name: 'Galaxy purple',     hex: '#8b5cf6' },
  lava:     { name: 'Lava orange',       hex: '#f97316' },
  slime:    { name: 'Slime green',       hex: '#84cc16' },
  bubble:   { name: 'Bubblegum pink',    hex: '#ec4899' },
  sky:      { name: 'Sky blue',          hex: '#38bdf8' },
  midnight: { name: 'Midnight black',    hex: '#0b0b0f' },
  glow:     { name: 'Glow-in-the-dark',  hex: '#bef264' },
  sun:      { name: 'Sunshine yellow',   hex: '#facc15' },
  ice:      { name: 'Ice white',         hex: '#f1f5f9' },
  ruby:     { name: 'Ruby red',          hex: '#e11d48' },
};

window.PRODUCTS = [
  // =============================================================
  //  SPINNERS
  // =============================================================
  {
    id: 'spinner-3', name: 'Three-Arm Spinner', cat: 'spinner',
    filament_g: 35, comp_low: 6, comp_avg: 9, comp_high: 14, price: 9,
    blurb: 'The classic. Triple-bearing, buttery spin.',
    colors: ['galaxy','lava','slime','sky','midnight'],
    image: 'https://images.pexels.com/photos/422290/pexels-photo-422290.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'spinner-6', name: 'Six-Arm Mega Spinner', cat: 'spinner',
    filament_g: 55, comp_low: 9, comp_avg: 14, comp_high: 22, price: 14,
    blurb: 'More arms, longer spin. Whirring satisfaction.',
    colors: ['midnight','sky','lava','glow'],
    image: 'https://images.pexels.com/photos/33270195/pexels-photo-33270195.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'star-spinner', name: 'Star Spinner', cat: 'spinner',
    filament_g: 40, comp_low: 7, comp_avg: 11, comp_high: 18, price: 11,
    blurb: 'Five-pointed, weighted tips, hypnotic.',
    colors: ['sun','bubble','ice','glow'],
    image: 'https://images.pexels.com/photos/34710663/pexels-photo-34710663.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'metal-spinner', name: 'Heavy Metal Spinner', cat: 'spinner',
    filament_g: 60, comp_low: 12, comp_avg: 18, comp_high: 32, price: 18,
    blurb: 'Premium metallic finish. Spins for an eternity.',
    colors: ['midnight','ice','sun'],
    image: 'https://images.pexels.com/photos/33633049/pexels-photo-33633049.jpeg?auto=compress&cs=tinysrgb&w=800',
  },

  // =============================================================
  //  CUBES
  // =============================================================
  {
    id: 'fidget-cube', name: 'Print-in-Place Fidget Cube', cat: 'cube',
    filament_g: 75, comp_low: 14, comp_avg: 20, comp_high: 30, price: 20,
    blurb: 'Six sides of buttons, dials and switches.',
    colors: ['midnight','galaxy','sky','slime','bubble'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Print_in_place_Fidget_Cube.jpg',
  },
  {
    id: 'infinity-cube', name: 'Infinity Cube', cat: 'cube',
    filament_g: 50, comp_low: 10, comp_avg: 15, comp_high: 24, price: 15,
    blurb: 'Folds and unfolds forever. The desk classic.',
    colors: ['ice','midnight','galaxy','lava'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Fidget_cube_yellow_and_white.jpg',
  },
  {
    id: 'gear-cube', name: 'Gear Cube', cat: 'cube',
    filament_g: 65, comp_low: 12, comp_avg: 17, comp_high: 25, price: 17,
    blurb: 'Interlocking gears. Click-click-click.',
    colors: ['sun','sky','bubble','midnight'],
    image: 'https://images.pexels.com/photos/9242925/pexels-photo-9242925.jpeg?auto=compress&cs=tinysrgb&w=800',
  },

  // =============================================================
  //  ARTICULATED — biggest sellers, premium pricing
  // =============================================================
  {
    id: 'dragon', name: 'Articulated Dragon', cat: 'articulated',
    filament_g: 130, comp_low: 22, comp_avg: 30, comp_high: 50, price: 30,
    blurb: 'Big flexi dragon &mdash; the showstopper.',
    colors: ['galaxy','slime','lava','glow','midnight'],
    image: 'https://images.pexels.com/photos/20688553/pexels-photo-20688553.jpeg?auto=compress&cs=tinysrgb&w=800',
    glow: 'radial-gradient(circle at 30% 30%, rgba(132,204,22,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.4), transparent 60%)',
    icon: 'dragon',
  },
  {
    id: 'snake', name: 'Articulated Snake', cat: 'articulated',
    filament_g: 45, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Wiggle, drape, wear as a bracelet.',
    colors: ['slime','lava','bubble','sky'],
    image: 'https://images.pexels.com/photos/19871842/pexels-photo-19871842.jpeg?auto=compress&cs=tinysrgb&w=800',
    glow: 'radial-gradient(circle at 30% 30%, rgba(132,204,22,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.45), transparent 60%)',
    icon: 'snake',
  },
  {
    id: 'octopus', name: 'Articulated Octopus', cat: 'articulated',
    filament_g: 80, comp_low: 14, comp_avg: 19, comp_high: 28, price: 19,
    blurb: 'Eight tentacles of squishy print-in-place fun.',
    colors: ['bubble','galaxy','sky','glow'],
    glow: 'radial-gradient(circle at 50% 30%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.5), transparent 60%)',
    icon: 'octopus',
    image: 'https://images.pexels.com/photos/30275792/pexels-photo-30275792.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'axolotl', name: 'Articulated Axolotl', cat: 'articulated',
    filament_g: 60, comp_low: 12, comp_avg: 17, comp_high: 24, price: 17,
    blurb: 'Smiley pink axolotl with floppy gills.',
    colors: ['bubble','ice','galaxy','sun'],
    glow: 'radial-gradient(circle at 30% 40%, rgba(244,114,182,0.6), transparent 60%), radial-gradient(circle at 80% 60%, rgba(252,211,77,0.4), transparent 60%)',
    icon: 'axolotl',
    image: 'https://images.pexels.com/photos/19149826/pexels-photo-19149826.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'worm', name: 'Wiggle Worm', cat: 'articulated',
    filament_g: 18, comp_low: 5, comp_avg: 8, comp_high: 12, price: 8,
    blurb: 'Pocket-sized stress relief. Free wiggles.',
    colors: ['slime','bubble','sun','sky'],
    glow: 'radial-gradient(circle at 30% 50%, rgba(252,211,77,0.55), transparent 60%), radial-gradient(circle at 80% 40%, rgba(132,204,22,0.5), transparent 60%)',
    icon: 'worm',
  },
  {
    id: 'lizard', name: 'Mini Lizard', cat: 'articulated',
    filament_g: 25, comp_low: 6, comp_avg: 10, comp_high: 16, price: 10,
    blurb: 'Tiny flexi lizard. Fits in any pencil case.',
    colors: ['slime','lava','sky','galaxy'],
    glow: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(22,163,74,0.5), transparent 60%)',
    icon: 'lizard',
  },

  // =============================================================
  //  SLIDERS, RINGS & ROLLERS
  // =============================================================
  {
    id: 'slider', name: 'Magnetic-Feel Slider', cat: 'slider',
    filament_g: 45, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Smooth as silk. Slides from one end to the other.',
    colors: ['midnight','ice','sky','galaxy'],
    image: 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'gyro-ring', name: 'Gyro Ring', cat: 'slider',
    filament_g: 22, comp_low: 7, comp_avg: 11, comp_high: 16, price: 11,
    blurb: 'Spins on your finger. Discreet desk fidget.',
    colors: ['midnight','galaxy','lava','ruby'],
    image: 'https://images.pexels.com/photos/8145711/pexels-photo-8145711.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'spinner-ring', name: 'Spinner Fidget Ring', cat: 'slider', // NEW
    filament_g: 8, comp_low: 9, comp_avg: 13, comp_high: 22, price: 13,
    blurb: 'Wearable spinner. Looks like jewellery, fidgets like a champ.',
    colors: ['ice','midnight','galaxy','sun','ruby'],
    image: 'https://images.pexels.com/photos/14064918/pexels-photo-14064918.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'rolling-maze', name: 'Rolling Ball Maze', cat: 'slider',
    filament_g: 70, comp_low: 13, comp_avg: 18, comp_high: 28, price: 18,
    blurb: 'Tilt and twist to roll the ball through.',
    colors: ['sky','sun','bubble','glow'],
    glow: 'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.5), transparent 60%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.45), transparent 60%)',
    icon: 'maze',
  },
  {
    id: 'spiky-roller', name: 'Spiky Sensory Roller', cat: 'slider', // NEW
    filament_g: 35, comp_low: 9, comp_avg: 13, comp_high: 22, price: 13,
    blurb: 'Tactile spikes for high-input sensory feedback.',
    colors: ['lava','bubble','sky','glow'],
    image: 'https://images.pexels.com/photos/4114512/pexels-photo-4114512.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'spiral-cone', name: 'Spiral Cone', cat: 'slider', // NEW
    filament_g: 30, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Print-in-place spiral that twirls between your fingers.',
    colors: ['galaxy','sky','sun','glow'],
    glow: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.55), transparent 60%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.5), transparent 60%)',
    icon: 'spiral',
  },

  // =============================================================
  //  PUZZLES & CHAINS
  // =============================================================
  {
    id: 'hex-flexi', name: 'Hex Flexi', cat: 'puzzle',
    filament_g: 40, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Hexagonal mesh that folds into a thousand shapes.',
    colors: ['galaxy','slime','sky','lava'],
    glow: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.55), transparent 60%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.5), transparent 60%)',
    icon: 'hex',
  },
  {
    id: 'magic-snake', name: 'Magic Snake', cat: 'puzzle',
    filament_g: 55, comp_low: 10, comp_avg: 14, comp_high: 22, price: 14,
    blurb: 'Twist 24 segments into anything you can imagine.',
    colors: ['ruby','sun','sky','midnight'],
    glow: 'radial-gradient(circle at 30% 50%, rgba(225,29,72,0.55), transparent 60%), radial-gradient(circle at 80% 40%, rgba(252,211,77,0.5), transparent 60%)',
    icon: 'magicsnake',
  },
  {
    id: 'twist-puzzle', name: 'Twist Puzzle', cat: 'puzzle',
    filament_g: 38, comp_low: 8, comp_avg: 12, comp_high: 18, price: 12,
    blurb: 'Tangle-style endless loop. Always something to twist.',
    colors: ['bubble','slime','galaxy','ice'],
    glow: 'radial-gradient(circle at 30% 30%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(circle at 80% 70%, rgba(132,204,22,0.5), transparent 60%)',
    icon: 'twist',
  },
  {
    id: 'chain', name: 'Bike-Chain Fidget', cat: 'puzzle',
    filament_g: 42, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Interlocking links. Drape, swing, click.',
    colors: ['midnight','ice','galaxy','sun'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/A_%22bike_chain%22_type_fidget_toy.jpg',
  },
  {
    id: 'twisting-egg', name: 'Twisting Egg', cat: 'puzzle', // NEW
    filament_g: 50, comp_low: 11, comp_avg: 15, comp_high: 24, price: 15,
    blurb: 'Egg-shaped twist puzzle. Smoother than a Rubik\'s cube.',
    colors: ['ice','sun','bubble','sky'],
    image: 'https://images.pexels.com/photos/6979267/pexels-photo-6979267.jpeg?auto=compress&cs=tinysrgb&w=800',
  },

  // =============================================================
  //  GADGETS — gear / clicker (NEW category-ish)
  // =============================================================
  {
    id: 'gear-fidget', name: 'Pocket Gear Fidget', cat: 'gadget', // NEW
    filament_g: 32, comp_low: 9, comp_avg: 13, comp_high: 20, price: 13,
    blurb: 'Three interlocking gears in a card-sized frame.',
    colors: ['sun','sky','bubble','midnight'],
    image: 'https://images.pexels.com/photos/33633043/pexels-photo-33633043.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'clicker', name: 'Clicker Fidget', cat: 'gadget', // NEW
    filament_g: 18, comp_low: 7, comp_avg: 10, comp_high: 16, price: 10,
    blurb: 'Mechanical-keyboard click on demand. Quietly addictive.',
    colors: ['midnight','ice','ruby','sun'],
    image: 'https://images.pexels.com/photos/776116/pexels-photo-776116.jpeg?auto=compress&cs=tinysrgb&w=800',
  },

  // =============================================================
  //  SOURCED — not 3D-printed (sewn)
  // =============================================================
  {
    id: 'fidget-blanket', name: 'Sensory Fidget Blanket', cat: 'sourced', // NEW
    filament_g: 0, comp_low: 35, comp_avg: 45, comp_high: 65, price: 45,
    sourced: true,
    blurb: 'Sewn lap blanket with zips, beads, ribbons and buttons. Calming.',
    colors: ['galaxy','sky','bubble','sun'],
    image: 'https://images.pexels.com/photos/17219698/pexels-photo-17219698.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// =============================================================
//  BUNDLES — five packages (Simon's spec: ~5 different)
// =============================================================
window.BUNDLES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    blurb: 'Pick 1 spinner + 1 cube + 1 articulated. Saves $4 on individual prices.',
    contents: '1 spinner · 1 cube · 1 articulated',
    price: 30, retail: 34,
    pop: 'Most popular',
    accent: 'fuchsia',
  },
  {
    id: 'articulated',
    name: 'Articulated Trio',
    blurb: 'Any 3 articulated creatures (dragon, snake, octopus, axolotl, lizard, worm). 50% off your next order.',
    contents: '3 articulated · 50% off next',
    price: 35, retail: 50,
    accent: 'lime',
  },
  {
    id: 'spinner-stack',
    name: 'Spinner Stack',
    blurb: 'Three spinners — mix and match the four spinner styles.',
    contents: '3 spinners',
    price: 25, retail: 31,
    accent: 'sky',
  },
  {
    id: 'class-pack',
    name: 'Class Pack',
    blurb: 'Five fidgets for the whole gang. Perfect for class gifts or birthday party loot bags.',
    contents: '5 fidgets · party-ready',
    price: 40, retail: 55,
    accent: 'amber',
  },
  {
    id: 'mega',
    name: 'Mega Pack',
    blurb: 'Pick any 8 fidgets. The serious starter kit. Best $/fidget on the site.',
    contents: '8 fidgets · best value',
    price: 80, retail: 120,
    pop: 'Best value',
    accent: 'violet',
  },
];

// Calculated columns (filament cost @ $0.030/g)
window.PRODUCTS.forEach(p => {
  p.filament_cost = +(p.filament_g * 0.030).toFixed(2);
  p.margin = +(p.price - p.filament_cost).toFixed(2);
});
