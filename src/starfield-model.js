// Lightweight particle network inspired by the original main-branch particles.js
// proximity links. All maths are framework-independent and unit-testable.
export const STAR_PALETTE = Object.freeze([
  '#82fbe4', // sea-glass green
  '#00ddff', // electric cyan
  '#86bbff', // cool blue
  '#ad8aff', // blue-violet
  '#db89ff', // orchid neon
  '#ffad61', // warm orange
  '#ffe0a0', // solar gold
  '#b9f29b', // spring green
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
      radius: (0.60 + random() * 1.35) * (0.72 + depth * 0.35),
      opacity: 0.48 + random() * 0.48,
      phase: random() * Math.PI * 2,
      pulse: 0.38 + random() * 1.0,
      angle: random() * Math.PI * 2,
      speed: 2.4 + random() * 4.6, // px/sec, with slow wandering
      color: STAR_PALETTE[Math.floor(random() * STAR_PALETTE.length)],
    };
  });
}

// Flowing, independent particle trajectories. Connections emerge naturally
// as neighbours enter and leave each other's radius.
export function moveStars(stars, seconds, width, height, elapsedSeconds) {
  if (!elapsedSeconds || !stars.length) return;
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  const dt = Math.max(0, Math.min(0.08, elapsedSeconds));
  for (const star of stars) {
    const direction = star.angle +
      Math.sin(seconds * 0.31 + star.phase) * 0.70 +
      Math.cos(seconds * 0.17 + star.phase * 1.3) * 0.18;
    const motion = star.speed * (0.6 + 0.40 * star.depth) * dt;
    star.x += Math.cos(direction) * motion / w;
    star.y += Math.sin(direction) * motion / h;
    if (star.x < -0.025) star.x += 1.05;
    if (star.x > 1.025) star.x -= 1.05;
    if (star.y < -0.025) star.y += 1.05;
    if (star.y > 1.025) star.y -= 1.05;
  }
}

// Spatial hash: each particle checks only its own/adjacent cells, avoiding
// an all-to-all scan. Each link fades according to both distance and a
// deterministic slow phase, creating varied links with no sudden popping.
export function proximityLinks(positions, radius, seconds, limit = 260) {
  if (radius <= 0 || positions.length < 2 || limit <= 0) return [];
  const cells = new Map();
  const size = radius;
  const links = [];
  const radiusSq = radius * radius;
  const key = (x, y) => x + ',' + y;

  for (let i = 0; i < positions.length; i += 1) {
    const p = positions[i];
    const gx = Math.floor(p.x / size);
    const gy = Math.floor(p.y / size);

    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        const bucket = cells.get(key(gx + dx, gy + dy));
        if (!bucket) continue;
        for (const j of bucket) {
          const other = positions[j];
          const vx = p.x - other.x;
          const vy = p.y - other.y;
          const distanceSq = vx * vx + vy * vy;
          if (distanceSq >= radiusSq) continue;

          const distance = Math.sqrt(distanceSq);
          const proximity = Math.pow(1 - distance / radius, 1.15);
          // Pair-specific offset means each connection breathes at a different
          // time; smooth fade and random timing, never frame-by-frame random.
          const phase = ((i * 47.53 + j * 13.37) % 6.283185);
          const cycle = (Math.sin(seconds * 0.36 + phase) + 1) * 0.5;
          const strength = proximity * (0.16 + 0.84 * cycle);
          if (strength > 0.013) links.push({ a: i, b: j, strength });
          if (links.length >= limit) return links;
        }
      }
    }

    const own = key(gx, gy);
    const bucket = cells.get(own);
    if (bucket) bucket.push(i);
    else cells.set(own, [i]);
  }
  return links;
}


// Preserve the existing stars and their positions through viewport changes.
export function reconcileStarPool(stars, desired, random = Math.random) {
  const size = Math.max(0, Math.floor(Number.isFinite(desired) ? desired : 0));
  if (stars.length > size) stars.length = size;
  else if (stars.length < size) stars.push(...createStars(size - stars.length, random));
  return stars;
}


// Every 1 CSS pixel of horizontal change create a fresh star layout,
// including mobile orientation/layout resizing. Height-only changes (e.g.
// the mobile address bar collapsing on scroll) do not reshuffle the sky.
export function shouldReseedSky(previousWidth, nextWidth) {
  return Math.abs(nextWidth - previousWidth) >= 1;
}
