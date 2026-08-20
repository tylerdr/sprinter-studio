import { ImageResponse } from 'next/og'

export const alt = 'Sprinter Studio — the venture studio of Sprinter'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BOARD = '#0e0d0b'
const CHALK = '#f2efe7'
const CHALK_2 = '#b9b3a6'
const CHALK_3 = '#837d70'
const ACCENT = '#8fd8ab'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: BOARD,
          color: CHALK,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '72px 84px',
            borderTop: `6px solid ${ACCENT}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 24,
                letterSpacing: '0.14em',
                color: ACCENT,
                marginBottom: 44,
              }}
            >
              § 01 — THE TWO TRACKS
            </div>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.06,
                fontWeight: 500,
                maxWidth: 980,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Satori trims whitespace between spans — the nbsp is load-bearing. */}
              <span>
                <span style={{ color: ACCENT }}>Two tracks,</span>
                {' one bench.'}
              </span>
              <span>Partner incubations.</span>
              <span>Internal experiments.</span>
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.3,
                color: CHALK_2,
                marginTop: 30,
                maxWidth: 920,
              }}
            >
              Published while unproven — a public record of what we are testing,
              shipping, and stopping.
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: CHALK_3,
              fontFamily: 'monospace',
              fontSize: 24,
              borderTop: `1px solid rgba(242, 239, 231, 0.3)`,
              paddingTop: 28,
            }}
          >
            <span>sprinter.studio</span>
            <span style={{ color: ACCENT }}>the venture studio of Sprinter</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
