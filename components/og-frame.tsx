import { OG, type OgFrameProps } from '@/lib/og';

/**
 * A TicketPaper for share cards: block ▸ perforation ▸ stub, vertically.
 *
 * This is the one place a full ticket is right — rule 4's "lead with ONE
 * ticket" is exactly a share card. Links elsewhere on the site are stubs.
 *
 * Satori supports a subset of CSS: no repeating backgrounds (so the paper's
 * dots are omitted) and every element that holds children needs an explicit
 * `display: flex`.
 */
export function OgFrame({
  kicker,
  title,
  stubLabel,
  stubValue,
  fill = OG.block,
  fillInk = '#FFFFFF',
}: OgFrameProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        backgroundColor: OG.paper,
        fontFamily: OG.sans,
        fontWeight: 800,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderRadius: 24,
          border: `1px solid ${OG.line}`,
          backgroundColor: OG.card,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '52px 60px',
            backgroundColor: fill,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: OG.mono,
              fontSize: 24,
              letterSpacing: 1,
              color: fillInk,
              fontWeight: 500,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 52 ? 54 : 66,
              lineHeight: 1.12,
              color: fillInk,
            }}
          >
            {title}
          </div>
        </div>

        {/* Satori renders this dashed rule between the block and stub. */}
        <div
          style={{
            display: 'flex',
            height: 1,
            margin: '0 20px',
            borderTop: `2px dashed ${OG.hair}`,
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '34px 60px',
          }}
        >
          <div style={{ display: 'flex', fontFamily: OG.mono, fontWeight: 500, fontSize: 22, color: OG.muted }}>
            {stubLabel}
          </div>
          <div style={{ display: 'flex', fontFamily: OG.mono, fontWeight: 500, fontSize: 22, color: OG.ink }}>
            {stubValue}
          </div>
        </div>
      </div>
    </div>
  );
}
