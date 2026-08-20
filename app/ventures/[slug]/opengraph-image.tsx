import { stageConfig, trackConfig, ventures } from '@/app/data/ventures'
import { ImageResponse } from 'next/og'

export const alt = 'Sprinter Studio venture'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }))
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const venture = ventures.find((v) => v.slug === slug)
  const accentColor = venture ? stageConfig[venture.stage].hex : '#8fd8ab'
  const name = venture?.name ?? 'Sprinter Studio'
  const trackLabel = venture
    ? trackConfig[venture.track].label
    : 'the venture studio of Sprinter'
  const description =
    venture?.description ??
    'An experiment record from Sprinter Studio, the venture studio of Sprinter.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0e0d0b',
          color: '#f2efe7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 22,
            height: '100%',
            backgroundColor: accentColor,
          }}
        />
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
                backgroundColor: accentColor,
                marginBottom: 44,
              }}
            />
            <div
              style={{
                fontSize: 84,
                lineHeight: 0.94,
                fontWeight: 500,
                letterSpacing: 0,
                maxWidth: 940,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.25,
                color: '#b9b3a6',
                marginTop: 32,
                maxWidth: 900,
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#837d70',
              fontFamily: 'monospace',
              fontSize: 24,
            }}
          >
            <span>sprinter.studio</span>
            <span style={{ color: accentColor }}>{trackLabel}</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
