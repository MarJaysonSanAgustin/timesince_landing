import fs from 'node:fs';
import path from 'node:path';

// ImageResponse needs the font binary in the standalone bundle.
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
    { name: 'Inter', data: font('Inter-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
  ];
}

export const OG_SIZE = { width: 1200, height: 630 };

/** The design tokens, repeated here because Satori cannot read a stylesheet. */
export const OG = {
  paper: '#F1EFEA',
  ink: '#1B1526',
  muted: '#6C6870',
  line: '#DDD8CE',
} as const;
