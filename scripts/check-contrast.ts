/**
 * Checks every text/ground pair the site actually renders against APCA's
 * floors — the same model the app uses (ADR-012/013).
 *
 * The point is that the tokens in globals.css are derived, not chosen, so this
 * is what proves they still hold after anyone edits a colour.
 */
import { apcaLc, inkOn, MUTED_LC, FAINT_LC } from '../lib/apca.ts';

const PAPER = '#F1EFEA';
const CARD = '#FFFFFF';
const INK = '#1B1526';
const MUTED = '#6C6870';
const FAINT = '#9B989C';
const UBE = '#5C247A';

const BODY_FLOOR = 60; // APCA for content text
const LARGE_FLOOR = 45;

interface Check {
  what: string;
  fg: string;
  bg: string;
  floor: number;
}

const checks: Check[] = [
  { what: 'ink on paper', fg: INK, bg: PAPER, floor: BODY_FLOOR },
  { what: 'ink on card', fg: INK, bg: CARD, floor: BODY_FLOOR },
  { what: 'muted on paper', fg: MUTED, bg: PAPER, floor: MUTED_LC },
  { what: 'muted on card', fg: MUTED, bg: CARD, floor: MUTED_LC },
  { what: 'faint on paper', fg: FAINT, bg: PAPER, floor: FAINT_LC },
  { what: 'faint on card', fg: FAINT, bg: CARD, floor: FAINT_LC },
  { what: 'ube link on paper', fg: UBE, bg: PAPER, floor: BODY_FLOOR },
  { what: 'ube link on card', fg: UBE, bg: CARD, floor: BODY_FLOOR },
  { what: 'white on ube button', fg: '#FFFFFF', bg: UBE, floor: BODY_FLOOR },
];

const fills: Record<string, string> = {
  brand: '#5E35B1',
  warm: '#FB8C00',
  calm: '#00897B',
  cool: '#1E88E5',
  alert: '#E53935',
  neutral: '#1E1B22',
};

let failures = 0;
const warnings: string[] = [];

console.log('APCA contrast — text on grounds\n');
for (const c of checks) {
  const lc = Math.abs(apcaLc(c.fg, c.bg));
  const ok = lc >= c.floor;
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${c.what.padEnd(22)} Lc ${lc.toFixed(1).padStart(5)}  (floor ${c.floor})`);
}

console.log('\nAPCA contrast — chosen ink on accent fills\n');
for (const [name, fill] of Object.entries(fills)) {
  const ink = inkOn(fill);
  const lc = Math.abs(apcaLc(ink, fill));
  if (lc >= BODY_FLOOR) {
    console.log(`  ok   ${name.padEnd(8)} ${fill}  ink ${ink}  Lc ${lc.toFixed(1)}`);
  } else if (lc >= LARGE_FLOOR) {
    console.log(`  warn ${name.padEnd(8)} ${fill}  ink ${ink}  Lc ${lc.toFixed(1)}  — large text only`);
    warnings.push(`${name} reads at Lc ${lc.toFixed(1)}: headings and icons only, never a paragraph`);
  } else {
    console.log(`  FAIL ${name.padEnd(8)} ${fill}  ink ${ink}  Lc ${lc.toFixed(1)}`);
    failures++;
  }
}

if (warnings.length) {
  console.log('\nKnown limitations, inherited from the app:');
  for (const w of warnings) console.log(`  • ${w}`);
}

if (failures) {
  console.error(`\n${failures} contrast failure(s)\n`);
  process.exit(1);
}
console.log(`\ncontrast ok — ${checks.length + Object.keys(fills).length} pairs, ${warnings.length} warning(s)`);
