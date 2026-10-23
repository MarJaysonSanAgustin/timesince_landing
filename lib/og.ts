import fs from 'node:fs';
import path from 'node:path';

/**
 * Shared machinery for every OG card.
 *
 * The fonts are read from disk rather than `next/font`: that returns CSS class
 * names, not binaries, and its actual files land at a hashed `.next/` path you
 * must not depend on. Fetching Google Fonts at build time is worse again — it
 * makes builds network-dependent and silently falls back to the wrong face on
 * failure. So the two faces are committed under assets/fonts/ (both OFL) and
 * traced into the standalone bundle by `outputFileTracingIncludes`.
 *
 * ImageResponse re-parses a font on every render, so these are memoized at
 * module scope. If the page count grows past a few hundred, subset them with
 * pyftsubset before adding more weights.
 */

const FONT_DIR = path.join(process.cwd(), 'assets/fonts');
const cache = new Map<string, Buffer>();

function font(file: string): Buffer {
  const hit = cache.get(file);
  if (hit) return hit;
  const data = fs.readFileSync(path.join(FONT_DIR, file));
  cache.set(file, data);
  return data;
}

export function ogFonts() {
  return [
    { name: 'Nunito', data: font('Nunito-ExtraBold.ttf'), weight: 800 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: font('JetBrainsMono-Medium.ttf'), weight: 500 as const, style: 'normal' as const },
  ];
}

export const OG_SIZE = { width: 1200, height: 630 };

/** The design tokens, repeated here because Satori cannot read a stylesheet. */
export const OG = {
  paper: '#F1EFEA',
  card: '#FFFFFF',
  ink: '#1B1526',
  muted: '#6C6870',
  line: '#DDD8CE',
  hair: '#C4BDB0',
  block: '#1E1B22',
  sans: 'Nunito',
  mono: 'JetBrains Mono',
} as const;

export interface OgFrameProps {
  /** The mono line above the title — a serial, a section, a kind. */
  kicker: string;
  title: string;
  /** The stub: label left, value right (ADR-012 rule 5). */
  stubLabel: string;
  stubValue: string;
  /** Flat fill for the block. Defaults to ink, per ADR-013 §2. */
  fill?: string;
  fillInk?: string;
}
