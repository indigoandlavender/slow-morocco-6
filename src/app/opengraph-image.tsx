import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Festivals Morocco - Art & Cultural Events Search'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf9f7',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#E53935',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <span style={{ color: 'white', fontSize: 32, fontWeight: 700 }}>F</span>
          </div>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            <span style={{ color: '#E53935' }}>Festival</span>s Morocco
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: '#737373',
            textAlign: 'center',
            maxWidth: 800,
            fontFamily: 'monospace',
          }}
        >
          Discover art exhibitions, cultural festivals, music events, and heritage celebrations across Morocco
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
