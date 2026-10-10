import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STAR_PALETTE, starBudget, createStars } from '../src/starfield-model.js';

test('mobile and low-power screens have bounded particle counts', () => {
  assert.ok(starBudget(390, 844) <= 52);
  assert.ok(starBudget(1920, 1080) <= 142);
  assert.ok(starBudget(1920, 1080, true) <= 82);
  assert.ok(starBudget(1920, 1080, true) < starBudget(1920, 1080));
});

test('a seeded source generates normalized, coloured depth layers', () => {
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
  }
  assert.ok(new Set(stars.map(s => s.color)).size >= 4);
});

test('zero particles yields an empty field', () => {
  assert.deepEqual(createStars(0), []);
});
