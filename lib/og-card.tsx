import { loadOgFonts } from '@/lib/og-fonts'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

const BOARD = '#0e0d0b'
const CHALK = '#f2efe7'
const CHALK_2 = '#b9b3a6'
const CHALK_3 = '#837d70'
const ACCENT = '#8fd8ab'

/**
 * Shared board-black social card for the home page and /playbook, so each
 * route ships its own image without duplicating the layout.
 */
export async function renderOgCard({
  eyebrow,
  lead,
  rest,
  sub,
}: {
  eyebrow: string
  /** Display line drawn in chalk; `rest` follows it in accent green. */
  lead: string[]
  rest: string
  sub: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: BOARD,
          color: CHALK,
          fontFamily: 'Geist',
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
                fontFamily: 'Geist Mono',
                fontSize: 24,
                letterSpacing: '0.14em',
                color: ACCENT,
                marginBottom: 44,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                fontFamily: 'Fraunces',
                fontSize: 64,
                lineHeight: 1.08,
                fontWeight: 500,
                maxWidth: 1020,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {lead.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span style={{ color: ACCENT }}>{rest}</span>
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.3,
                color: CHALK_2,
                marginTop: 30,
                maxWidth: 960,
              }}
            >
              {sub}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: CHALK_3,
              fontFamily: 'Geist Mono',
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
    { ...ogSize, fonts: [...(await loadOgFonts())] },
  )
}
