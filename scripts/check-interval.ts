/**
 * Tests for lib/interval.ts — the only pure arithmetic on the site, and the
 * part a reader will check against their own calendar.
 *
 * Exists because the first implementation had a real bug: adding a month to
 * the 31st overflows when the target month is shorter, so Jan 31 to Mar 1
 * measured as "1 month, -2 days".
 */
import assert from 'node:assert/strict';
import {
  parseDate,
  daysBetween,
  calendarParts,
  intervalStats,
} from '../lib/interval.ts';

const d = (value: string) => {
  const parsed = parseDate(value);
  assert.ok(parsed, `expected ${value} to parse`);
  return parsed;
};

// ── parsing rejects what Date would silently accept ────────────────────────
assert.equal(parseDate('2026-02-31'), null, '31 February is not a date');
assert.equal(parseDate('2026-02-29'), null, '2026 is not a leap year');
assert.equal(parseDate('nonsense'), null);
assert.equal(parseDate('2026-1-1'), null, 'requires zero padding');
assert.ok(parseDate('2024-02-29'), '2024 is a leap year');

// ── day counting ───────────────────────────────────────────────────────────
assert.equal(daysBetween(d('2026-01-01'), d('2026-01-02')), 1);
assert.equal(daysBetween(d('2025-12-31'), d('2026-01-01')), 1);
assert.equal(daysBetween(d('2024-01-01'), d('2025-01-01')), 366, 'leap year');

// ── calendar months, including the overflow that caused the bug ────────────
assert.deepEqual(calendarParts(d('2026-01-15'), d('2026-02-15')), { months: 1, days: 0 });
assert.deepEqual(calendarParts(d('2026-01-15'), d('2026-02-14')), { months: 0, days: 30 });
assert.deepEqual(calendarParts(d('2026-01-01'), d('2026-03-04')), { months: 2, days: 3 });
assert.deepEqual(calendarParts(d('2026-01-31'), d('2026-03-01')), { months: 1, days: 1 });
assert.deepEqual(calendarParts(d('2026-01-31'), d('2026-02-28')), { months: 0, days: 28 });
assert.deepEqual(calendarParts(d('2026-08-31'), d('2026-09-30')), { months: 0, days: 30 });

// A reader will try their own dates, so sweep a wide range for impossible output.
for (let i = 0; i < 2000; i++) {
  const from = new Date(Date.UTC(2023, 0, 1 + i));
  const to = new Date(Date.UTC(2023, 0, 1 + i + ((i * 7) % 500)));
  const { months, days } = calendarParts(from, to);
  assert.ok(months >= 0 && days >= 0, `negative parts for ${from.toISOString()} → ${to.toISOString()}`);
}

// ── interval statistics ────────────────────────────────────────────────────
const stats = intervalStats(['2026-01-01', '2026-01-11', '2026-01-21'].map(d));
assert.ok(stats);
assert.equal(stats.count, 3);
assert.deepEqual(stats.gaps, [10, 10]);
assert.equal(stats.average, 10);
assert.equal(stats.nextDue?.toISOString().slice(0, 10), '2026-01-31');

assert.deepEqual(
  intervalStats(['2026-01-21', '2026-01-01', '2026-01-21', '2026-01-11'].map(d))?.gaps,
  [10, 10],
  'sorts and de-duplicates',
);
assert.equal(intervalStats([d('2026-01-01')]), null, 'one date has no interval');
assert.equal(intervalStats([]), null);

console.log('interval arithmetic ok — parsing, day counts, calendar months, 2000 fuzzed pairs, stats');
