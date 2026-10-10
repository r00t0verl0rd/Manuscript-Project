import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STAR_PALETTE, starBudget, createStars, createConstellations, constellationPoints } from '../src/starfield-model.js';

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


test('constellations use sparse fixed edges and a bounded mobile count', () => {
  const desktop = createConstellations(1440);
  const mobile = createConstellations(390);
  assert.equal(desktop.length, 4);
  assert.equal(mobile.length, 2);
  for (const group of desktop) {
    assert.equal(group.points.length, 6);
    assert.ok(group.edges.length <= 7);
    for (const [start, end] of group.edges) {
      assert.ok(start >= 0 && start < group.points.length);
      assert.ok(end >= 0 && end < group.points.length);
    }
  }
});

test('entire connected constellation visibly changes position over time', () => {
  const [constellation] = createConstellations(1440);
  const before = constellationPoints(constellation, 1440, 900, 0);
  const after = constellationPoints(constellation, 1440, 900, 12);
  assert.equal(before.length, after.length);
  assert.ok(Math.hypot(after[0].x - before[0].x, after[0].y - before[0].y) > 8);
  const beforeDistance = Math.hypot(before[0].x - before[1].x, before[0].y - before[1].y);
  const afterDistance = Math.hypot(after[0].x - after[1].x, after[0].y - after[1].y);
  assert.ok(Math.abs(beforeDistance - afterDistance) < 0.000001);
});
