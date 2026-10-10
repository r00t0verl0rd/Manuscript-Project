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


// Small fixed star maps form readable, moving constellations. We connect
// neighbours by index (linear cost), never search all star pairs each frame.
const CONSTELLATION_SHAPES = [
  { x: 0.19, y: 0.29, color: '#a798ff', phase: 0.2,
    points: [[-52,-8],[-23,-38],[21,-43],[50,-12],[26,35],[-17,39]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,5]] },
  { x: 0.79, y: 0.32, color: '#8ecbff', phase: 1.7,
    points: [[-50,-24],[-15,-39],[16,-9],[56,8],[24,39],[-30,32]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,5]] },
  { x: 0.22, y: 0.75, color: '#e5a0ff', phase: 3.1,
    points: [[-38,30],[-29,-24],[0,-47],[35,-22],[52,30],[5,48]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,5]] },
  { x: 0.78, y: 0.76, color: '#80eddd', phase: 4.5,
    points: [[-52,9],[-21,-35],[18,-40],[54,-6],[21,43],[-20,32]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4]] },
];

export function createConstellations(width) {
  // Two compact constellations on narrow screens instead of four.
  const selected = width <= 640 ? [0, 3] : [0, 1, 2, 3];
  return selected.map(index => CONSTELLATION_SHAPES[index]);
}

export function constellationPoints(group, width, height, seconds) {
  // A coordinated orbital movement makes the entire constellation glide.
  // Small rotations keep the connections recognizable rather than noisy.
  const mobile = width <= 640;
  const scale = mobile ? 0.60 : Math.max(0.78, Math.min(1.18, width / 1200));
  const orbitX = Math.sin(seconds * 0.34 + group.phase) * (mobile ? 12 : 30);
  const orbitY = Math.cos(seconds * 0.26 + group.phase) * (mobile ? 9 : 20);
  const rotation = Math.sin(seconds * 0.22 + group.phase) * 0.16;
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  return group.points.map(([localX, localY]) => ({
    x: group.x * width + orbitX + scale * (localX * cos - localY * sin),
    y: group.y * height + orbitY + scale * (localX * sin + localY * cos),
  }));
}
