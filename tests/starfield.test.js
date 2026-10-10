import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STAR_PALETTE, starBudget, createStars, moveStars, proximityLinks, reconcileStarPool, shouldReseedSky } from '../src/starfield-model.js';

test('mobile and low-power screens have bounded particle counts', () => {
  assert.ok(starBudget(390, 844) <= 52);
  assert.ok(starBudget(1920, 1080) <= 142);
  assert.ok(starBudget(1920, 1080, true) <= 82);
  assert.ok(starBudget(1920, 1080, true) < starBudget(1920, 1080));
});

test('seeded stars have color, direction, radius and depth', () => {
  let seed = 12345;
  const seeded = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const stars = createStars(84, seeded);
  assert.equal(stars.length, 84);
  for (const star of stars) {
    assert.ok(star.x >= 0 && star.x < 1);
    assert.ok(star.y >= 0 && star.y < 1);
    assert.ok(star.depth > 0 && star.depth <= 1);
    assert.ok(STAR_PALETTE.includes(star.color));
    assert.ok(star.radius > 0);
    assert.ok(star.speed > 0);
  }
  assert.ok(new Set(stars.map(s => s.color)).size >= 4);
});

test('flow changes particle positions, without changing quantity', () => {
  const stars = createStars(16, () => 0.35);
  const before = stars.map(star => [star.x, star.y]);
  for (let second = 0; second < 120; second += 1) {
    moveStars(stars, second, 1400, 900, 0.07);
  }
  assert.equal(stars.length, 16);
  assert.ok(stars.some((star, i) => star.x !== before[i][0] || star.y !== before[i][1]));
});

test('connections appear only for nearby stars and fade smoothly over time', () => {
  const points = [
    { x: 25, y: 25 }, { x: 70, y: 55 }, { x: 119, y: 35 },
    { x: 1160, y: 680 },
  ];
  const first = proximityLinks(points, 160, 0);
  const later = proximityLinks(points, 160, 12);
  assert.ok(first.length > 0);
  assert.ok(first.every(link => link.a !== 3 && link.b !== 3));
  assert.ok(first.every(link => link.strength > 0 && link.strength <= 1));
  const shared = first.find(link => later.some(other => other.a === link.a && other.b === link.b));
  assert.ok(shared);
  const match = later.find(link => link.a === shared.a && link.b === shared.b);
  assert.ok(Math.abs(shared.strength - match.strength) > 0.02);
});

test('connection budget and zero-particle fallback remain safe', () => {
  assert.deepEqual(createStars(0), []);
  assert.deepEqual(proximityLinks([], 150, 0), []);
  const points = Array.from({ length: 100 }, (_, i) => ({ x: i * 0.2, y: i * 0.2 }));
  assert.ok(proximityLinks(points, 150, 2, 35).length <= 35);
});


test('resize keeps original star objects and positions', () => {
  const stars = createStars(9, () => 0.25);
  const original = stars[0];
  const before = [original.x, original.y];
  assert.strictEqual(reconcileStarPool(stars, 9), stars);
  reconcileStarPool(stars, 14, () => 0.75);
  assert.equal(stars.length, 14);
  assert.strictEqual(stars[0], original);
  assert.deepEqual([stars[0].x, stars[0].y], before);
  reconcileStarPool(stars, 5);
  assert.equal(stars.length, 5);
  assert.strictEqual(stars[0], original);
});


test('starfield reshuffles after one pixel of width change, including mobile', () => {
  assert.equal(shouldReseedSky(1440, 1439), true);
  assert.equal(shouldReseedSky(1440, 1441), true);
  assert.equal(shouldReseedSky(390, 389), true);
  assert.equal(shouldReseedSky(390, 391), true);
  assert.equal(shouldReseedSky(390, 393), true);
  assert.equal(shouldReseedSky(390, 390), false);
  assert.equal(shouldReseedSky(1440, 1440), false);
  // Height-only toolbar changes preserve width, so they cannot trigger reseeding.
  assert.equal(shouldReseedSky(390, 390), false);
});
