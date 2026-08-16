import { ImageResponse } from 'next/og'

export const alt = 'Sprinter Studio — the venture studio of Sprinter'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ACCENT = '#00ff88'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0a',
          color: '#f5f5f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ width: 22, height: '100%', backgroundColor: ACCENT }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '72px 84px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                width: 84,
                height: 6,
                backgroundColor: ACCENT,
                marginBottom: 44,
              }}
            />
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.04,
                fontWeight: 800,
                maxWidth: 980,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Satori trims whitespace between spans — the nbsp is load-bearing. */}
              <span>
                <span style={{ color: ACCENT }}>Two tracks,</span>
                {' one bench.'}
              </span>
              <span>Partner incubations.</span>
              <span>Internal experiments.</span>
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.3,
                color: '#a3a3a3',
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
              color: '#737373',
              fontFamily: 'monospace',
              fontSize: 24,
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
