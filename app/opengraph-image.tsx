import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The share card, as a ticket on paper.
 *
 * Flat fills only (ADR-012 rule 8) — the gradient wash this replaced was the
 * most-shared image on the site and the least like the app. The dotted ground
 * is painted as a repeating radial-gradient because that is the paper's rule,
 * not a fill.
 *
 * Still set in a system sans rather than the app's face: ImageResponse cannot
 * reach a next/font, and committing a subset TTF is Phase 2 work.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F1EFEA',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D2CEC6 1.6px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 960,
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid #E2DED6',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* The block. Ink, not colour — this is about the app, not a counter. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: '56px 64px',
              backgroundColor: '#1E1B22',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                letterSpacing: 2,
                color: '#9B989C',
                fontFamily: 'monospace',
              }}
            >
              TIMESINCE · NO. 001
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 68,
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              How long since you last did it?
            </div>
          </div>

          {/* Perforation. */}
          <div
            style={{
              display: 'flex',
              height: 1,
              borderTop: '2px dashed #D8D3CA',
            }}
          />

          {/* The stub: label left, value right. */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '36px 64px',
            }}
          >
            <div style={{ display: 'flex', fontSize: 26, color: '#6C6870' }}>
              Chores · Medication · Quitting · Anything
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontFamily: 'monospace',
                color: '#6C6870',
              }}
            >
              NO STREAKS
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
