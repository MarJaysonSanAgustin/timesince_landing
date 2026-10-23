/**
 * APCA (Accessible Perceptual Contrast Algorithm) — the contrast model the app
 * adopted in ADR-012, replacing WCAG 2's luminance crossover.
 *
 * The crossover put blue, teal, green, red and deep orange in black text, at
 * ratios just over white's; APCA puts them in white, as the eye does. Since the
 * site is meant to read as the same product, it has to choose ink the same way.
 *
 * Implements APCA 0.1.9 (W3 draft). Lc is reported signed: positive for dark
 * text on a light ground, negative for the reverse. Callers almost always want
 * the absolute value.
 */

const MAIN_TRC = 2.4;
const R_CO = 0.2126729;
const G_CO = 0.7151522;
const B_CO = 0.072175;

const NORM_BG = 0.56;
const NORM_TXT = 0.57;
const REV_TXT = 0.62;
const REV_BG = 0.65;

const BLK_THRS = 0.022;
const BLK_CLMP = 1.414;
const SCALE_BOW = 1.14;
const SCALE_WOB = 1.14;
const LO_BOW_OFFSET = 0.027;
const LO_WOB_OFFSET = 0.027;
const DELTA_Y_MIN = 0.0005;
const LO_CLIP = 0.1;

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const c = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

/** Screen luminance, with APCA's soft clamp applied to near-blacks. */
function luminance({ r, g, b }: Rgb): number {
  const y =
    R_CO * Math.pow(r / 255, MAIN_TRC) +
    G_CO * Math.pow(g / 255, MAIN_TRC) +
    B_CO * Math.pow(b / 255, MAIN_TRC);
  return y < BLK_THRS ? y + Math.pow(BLK_THRS - y, BLK_CLMP) : y;
}

/**
 * Lightness contrast of `text` on `background`.
 *
 * Positive means dark-on-light, negative light-on-dark. APCA asks Lc 60 of
 * body text, 45 of large text, and allows 30 for placeholders.
 */
export function apcaLc(text: string, background: string): number {
  const txtY = luminance(hexToRgb(text));
  const bgY = luminance(hexToRgb(background));

  if (Math.abs(bgY - txtY) < DELTA_Y_MIN) return 0;

  let sapc: number;
  let output: number;

  if (bgY > txtY) {
    sapc = (Math.pow(bgY, NORM_BG) - Math.pow(txtY, NORM_TXT)) * SCALE_BOW;
    output = sapc < LO_CLIP ? 0 : sapc - LO_BOW_OFFSET;
  } else {
    sapc = (Math.pow(bgY, REV_BG) - Math.pow(txtY, REV_TXT)) * SCALE_WOB;
    output = sapc > -LO_CLIP ? 0 : sapc + LO_WOB_OFFSET;
  }

  return output * 100;
}

/**
 * Black or white on a fill, whichever the eye reads better.
 *
 * This is the app's `EventAccent.inkOn`. Three of its fills sit near the
 * crossover at Lc 55–58 — under the 60 APCA asks of body text — and no ink
 * reaches 60 on them; the palette's floor is pinned by a test rather than
 * pretending the problem away.
 */
export function inkOn(fill: string, dark = '#1B1526', light = '#FFFFFF'): string {
  return Math.abs(apcaLc(dark, fill)) >= Math.abs(apcaLc(light, fill)) ? dark : light;
}

function mix(from: Rgb, to: Rgb, t: number): Rgb {
  return {
    r: from.r + (to.r - from.r) * t,
    g: from.g + (to.g - from.g) * t,
    b: from.b + (to.b - from.b) * t,
  };
}

/**
 * The palest step from a ground toward `ink` that still reads at `targetLc` on
 * BOTH grounds — as quiet as it can be while still being read.
 *
 * Two grounds because one ink has to be right in both places: the paper is the
 * harder of the two in light mode, the card in dark. This is how ADR-013's
 * muted (Lc 67) and faint (Lc 45) are derived rather than hand-picked, which is
 * also what lets the user change the paper without breaking the text.
 */
export function palestReading(
  ink: string,
  paper: string,
  card: string,
  targetLc: number,
  steps = 100,
): string {
  const inkRgb = hexToRgb(ink);
  const paperRgb = hexToRgb(paper);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const candidate = rgbToHex(mix(paperRgb, inkRgb, t));
    if (
      Math.abs(apcaLc(candidate, paper)) >= targetLc &&
      Math.abs(apcaLc(candidate, card)) >= targetLc
    ) {
      return candidate;
    }
  }
  return ink;
}

/** ADR-013's floors. */
export const MUTED_LC = 67;
export const FAINT_LC = 45;
