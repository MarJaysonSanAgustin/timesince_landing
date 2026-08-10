import { ImageResponse } from 'next/og';
import { SITE } from '../lib/site';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle at 50% 25%, #f3e8ff 0%, #ffffff 55%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 88,
            height: 88,
            borderRadius: 24,
            backgroundImage: 'linear-gradient(135deg, #9333ea, #3b82f6)',
            marginBottom: 28,
          }}
        />
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, color: '#111827' }}>
          {SITE.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            fontWeight: 700,
            color: '#111827',
            textAlign: 'center',
            maxWidth: 880,
            marginTop: 16,
          }}
        >
          Consistency without the anxiety.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#6b7280', marginTop: 20 }}>
          No streaks &middot; No pressure &middot; No guilt
        </div>
      </div>
    ),
    { ...size }
  );
}
