// The space field is deliberately framework-free so we can test its limits.
export const STAR_PALETTE = Object.freeze([
  '#89fff0', // sea-glass turquoise
  '#78c9ff', // ice blue
  '#ad9aff', // soft neon violet
  '#ef9dff', // orchid
  '#ffb36b', // orange amber
  '#ffe6ae', // warm solar gold
  '#a5f7bf', // spring mint
]);

export function starBudget(width, height, lowPower = false) {
  const mobile = width <= 640;
  const maximum = mobile ? 52 : lowPower ? 82 : 142;
  const minimum = mobile ? 22 : 36;
  const area = Math.max(0, width) * Math.max(0, height);
  const density = mobile ? 8500 : 12800;
  const estimate = Math.round((area / density) * (lowPower ? 0.72 : 1));
  return Math.max(minimum, Math.min(maximum, estimate));
}

export function createStars(count, random = Math.random) {
  return Array.from({ length: Math.max(0, Math.floor(count)) }, () => {
    const depth = 0.17 + random() * 0.83;
    return {
      x: random(), y: random(), depth,
      radius: (0.52 + random() * 1.12) * (0.72 + depth * 0.35),
      opacity: 0.34 + random() * 0.56,
      phase: random() * Math.PI * 2,
      pulse: 0.38 + random() * 1.0,
      drift: (random() - 0.3) * (0.00012 + depth * 0.00024),
      color: STAR_PALETTE[Math.floor(random() * STAR_PALETTE.length)],
    };
  });
}
