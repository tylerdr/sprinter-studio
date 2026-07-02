import { ventures } from '@/app/data/ventures'
import { ImageResponse } from 'next/og'

export const alt = 'Sprinter Studio — The AI Venture Factory'
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
                fontSize: 76,
                lineHeight: 1.02,
                fontWeight: 800,
                maxWidth: 980,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>One Founder.</span>
              <span>
                <span style={{ color: ACCENT }}>{ventures.length} Ventures.</span>{' '}
                Zero Employees.
              </span>
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.3,
                color: '#a3a3a3',
                marginTop: 32,
                maxWidth: 900,
              }}
            >
              A real venture factory where AI agents build, deploy, and grow
              software companies around the clock.
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
            <span style={{ color: ACCENT }}>AI venture factory</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
