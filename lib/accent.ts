/**
 * The closed set of accents content may use.
 *
 * Content files carry one of these names (zod-validated), never a Tailwind
 * class — Tailwind's scanner cannot see class strings composed at runtime, so
 * anything outside this list would silently render unstyled. The matching
 * `.accent-*` classes live in `app/globals.css`.
 */
export const ACCENTS = ['brand', 'warm', 'calm', 'cool', 'alert', 'neutral'] as const;

export type Accent = (typeof ACCENTS)[number];

/** Literal class strings, so Tailwind and the CSS both keep them. */
export const ACCENT_CLASS: Record<Accent, string> = {
  brand: 'accent-brand',
  warm: 'accent-warm',
  calm: 'accent-calm',
  cool: 'accent-cool',
  alert: 'accent-alert',
  neutral: 'accent-neutral',
};
