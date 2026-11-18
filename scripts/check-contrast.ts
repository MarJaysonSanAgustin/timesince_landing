/**
 * Checks every text/ground pair the site actually renders against APCA's
 * floors — the same model the app uses (ADR-012/013).
 *
 * The point is that the tokens in globals.css are derived, not chosen, so this
 * is what proves they still hold after anyone edits a colour.
 */
import { apcaLc, inkOn, MUTED_LC, FAINT_LC } from '../lib/apca.ts';

interface Theme {
  name: string;
  paper: string;
  card: string;
  ink: string;
  muted: string;
  faint: string;
  /** Links and button fills. */
  ube: string;
  /** Text on a ube fill. */
  onUbe: string;
  /**
   * The dot printed on the paper. Text crossing one sits on THIS, not on the
   * paper colour — which is why prose belongs on a sheet, never on the dots.
   */
  dot: string;
}

/** Both themes, checked identically. Dark drifting silently is the risk. */
const THEMES: Theme[] = [
  {
    name: 'light',
    paper: '#F1EFEA', card: '#FFFFFF', ink: '#1B1526',
    muted: '#6C6870', faint: '#9B989C', ube: '#5C247A', onUbe: '#FFFFFF', // --color-on-ube
    dot: '#D2CEC6',
  },
  {
    name: 'dark',
    paper: '#0F0D13', card: '#2A2631', ink: '#F2EEFF',
    muted: '#C7C3D2', faint: '#9E9BA8', ube: '#D0B4DE', onUbe: '#1B1526', // --color-on-ube
    dot: '#1E1C22',
  },
];

const BODY_FLOOR = 60; // APCA for content text
const LARGE_FLOOR = 45;

interface Check {
  what: string;
  fg: string;
  bg: string;
  floor: number;
}

function checksFor(t: Theme): Check[] {
  return [
    { what: 'ink on paper', fg: t.ink, bg: t.paper, floor: BODY_FLOOR },
    { what: 'ink on card', fg: t.ink, bg: t.card, floor: BODY_FLOOR },
    { what: 'muted on paper', fg: t.muted, bg: t.paper, floor: MUTED_LC },
    { what: 'muted on card', fg: t.muted, bg: t.card, floor: MUTED_LC },
    { what: 'faint on paper', fg: t.faint, bg: t.paper, floor: FAINT_LC },
    { what: 'faint on card', fg: t.faint, bg: t.card, floor: FAINT_LC },
    { what: 'ube link on paper', fg: t.ube, bg: t.paper, floor: BODY_FLOOR },
    { what: 'ube link on card', fg: t.ube, bg: t.card, floor: BODY_FLOOR },
    { what: 'text on ube fill', fg: t.onUbe, bg: t.ube, floor: BODY_FLOOR },
    // Headings are large text, so they may cross a dot. Body and secondary
    // text must not — that is what .sheet is for, and these two record why.
    { what: 'ink on a dot (large only)', fg: t.ink, bg: t.dot, floor: LARGE_FLOOR },
  ];
}

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

let pairCount = 0;
for (const theme of THEMES) {
  console.log(`APCA contrast — text on grounds (${theme.name})\n`);
  for (const c of checksFor(theme)) {
    const lc = Math.abs(apcaLc(c.fg, c.bg));
    const ok = lc >= c.floor;
    if (!ok) failures++;
    pairCount++;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${c.what.padEnd(22)} Lc ${lc.toFixed(1).padStart(5)}  (floor ${c.floor})`);
  }
  console.log();
}

console.log('APCA contrast — chosen ink on accent fills (same in both themes)\n');
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

// Record the measurement that drove the sheet, rather than leaving it in a
// commit message nobody re-reads.
console.log('Why prose is never set on the dotted ground\n');
for (const theme of THEMES) {
  const mutedOnDot = Math.abs(apcaLc(theme.muted, theme.dot));
  const faintOnDot = Math.abs(apcaLc(theme.faint, theme.dot));
  console.log(
    `  ${theme.name.padEnd(5)} muted on a dot Lc ${mutedOnDot.toFixed(1)}, ` +
      `faint Lc ${faintOnDot.toFixed(1)} — floors are ${MUTED_LC} and ${FAINT_LC}`,
  );
}
console.log('  Prose sits on .sheet, so neither figure is what a reader gets.\n');

if (warnings.length) {
  console.log('\nKnown limitations, inherited from the app:');
  for (const w of warnings) console.log(`  • ${w}`);
}

if (failures) {
  console.error(`\n${failures} contrast failure(s)\n`);
  process.exit(1);
}
console.log(`\ncontrast ok — ${pairCount + Object.keys(fills).length} pairs across ${THEMES.length} themes, ${warnings.length} warning(s)`);
