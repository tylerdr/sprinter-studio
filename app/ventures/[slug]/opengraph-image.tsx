import { stageConfig, ventures } from '@/app/data/ventures'
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
  const accentColor = venture ? stageConfig[venture.stage].hex : '#00ff88'
  const name = venture?.name ?? 'Sprinter Studio'
  const description =
    venture?.description ??
    'The AI venture factory for a live portfolio of AI-native ventures.'

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
                fontWeight: 800,
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
                color: '#a3a3a3',
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
              color: '#737373',
              fontFamily: 'monospace',
              fontSize: 24,
            }}
          >
            <span>sprinter.studio</span>
            <span style={{ color: accentColor }}>AI venture factory</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
