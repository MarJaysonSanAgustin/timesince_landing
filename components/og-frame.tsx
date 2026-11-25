import { OG } from '@/lib/og';

interface OgFrameProps {
  kicker: string;
  title: string;
  label: string;
  value: string;
}

export function OgFrame({ kicker, title, label, value }: OgFrameProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px 76px',
        backgroundColor: OG.paper,
        color: OG.ink,
        fontFamily: 'Inter',
        fontWeight: 400,
      }}
    >
      <div style={{ display: 'flex', fontSize: 23, color: OG.muted }}>{kicker}</div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 64 ? 62 : 76,
          lineHeight: 1.08,
          letterSpacing: -2.5,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `1px solid ${OG.line}`,
          paddingTop: 22,
          color: OG.muted,
          fontSize: 22,
        }}
      >
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
