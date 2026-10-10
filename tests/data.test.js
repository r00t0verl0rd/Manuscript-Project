import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ideas, roadmapStages, sortedIdeas, shortenId, dateLabel, partners } from '../src/data.js';
import en from '../locales/en.json' with { type: 'json' };
import ru from '../locales/ru.json' with { type: 'json' };

test('original ideas and stages are preserved', () => {
  assert.equal(ideas.length, 10);
  assert.equal(roadmapStages.length, 10);
  assert.equal(ideas[0].likes, 12950);
  assert.equal(ideas[1].likes, 13501);
  assert.equal(partners.length, 5);
});

test('all original sort modes still work', () => {
  assert.equal(sortedIdeas('diamonds_desc')[0].likes, 13501);
  assert.equal(sortedIdeas('diamonds_asc')[0].likes, 6100);
  assert.equal(sortedIdeas('created_desc')[0].likes, 12770);
});

test('date and id format remains unchanged', () => {
  assert.equal(shortenId('1234567890'), '1234...7890');
  assert.match(dateLabel(Date.now()), /^\\d{4}-\\d{2}-\\d{2}$/);
});

test('RU/EN translations have identical keys', () => {
  assert.deepEqual(Object.keys(ru).sort(), Object.keys(en).sort());
  for (let i = 1; i <= 10; i++) {
    assert.ok(en[`idea_${i}_text`]);
    assert.ok(ru[`idea_${i}_text`]);
  }
});
