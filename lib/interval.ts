/**
 * Date arithmetic for the browser tools.
 *
 * Pure functions on UTC midnights, deliberately: a calculator that gives a
 * different answer depending on the reader's timezone is worse than no
 * calculator. Every input is treated as a calendar date, not an instant.
 */

export const DAY_MS = 86_400_000;

/** Parse a yyyy-mm-dd value to a UTC midnight, or null if it is not one. */
export function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  // Rejects things like 2026-02-31, which Date would otherwise roll forward.
  return date.toISOString().slice(0, 10) === value ? date : null;
}

export function todayUtc(): Date {
  return new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

/**
 * Whole calendar months between two dates, then the days left over — which is
 * what people mean by "two months and three days", and is not days / 30.
 */
export function calendarParts(from: Date, to: Date): { months: number; days: number } {
  let months =
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  if (to.getUTCDate() < from.getUTCDate()) months -= 1;

  const anchor = new Date(from.getTime());
  const targetDay = anchor.getUTCDate();
  anchor.setUTCMonth(anchor.getUTCMonth() + months);

  // Adding a month to the 31st overflows when the target month is shorter:
  // Jan 31 + 1 month becomes Mar 3, which then measures as negative days.
  // Clamp back to the last day of the month we meant, as a person would.
  if (anchor.getUTCDate() !== targetDay) anchor.setUTCDate(0);

  return { months, days: daysBetween(anchor, to) };
}

/** "2 months, 3 days" — or "today". */
export function describeGap(days: number, from: Date, to: Date): string {
  if (days === 0) return 'today';
  const { months, days: rest } = calendarParts(from, to);
  const parts: string[] = [];
  if (months) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? 'day' : 'days'}`);
  return parts.length ? parts.join(', ') : `${days} ${days === 1 ? 'day' : 'days'}`;
}

export interface IntervalStats {
  count: number;
  gaps: number[];
  average: number;
  shortest: number;
  longest: number;
  /** Last date plus the average gap. */
  nextDue: Date | null;
}

/** Sorts, de-duplicates, and measures the gaps between a run of dates. */
export function intervalStats(dates: Date[]): IntervalStats | null {
  const unique = [...new Map(dates.map((d) => [d.getTime(), d])).values()].sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  if (unique.length < 2) return null;

  const gaps: number[] = [];
  for (let i = 1; i < unique.length; i++) gaps.push(daysBetween(unique[i - 1], unique[i]));

  const average = gaps.reduce((sum, g) => sum + g, 0) / gaps.length;
  const last = unique[unique.length - 1];
  const nextDue = new Date(last.getTime() + Math.round(average) * DAY_MS);

  return {
    count: unique.length,
    gaps,
    average,
    shortest: Math.min(...gaps),
    longest: Math.max(...gaps),
    nextDue,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
