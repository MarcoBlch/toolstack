import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? 'Tools4Free'
  const description = searchParams.get('description') ?? 'Free online tools'

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
          backgroundColor: '#FAFAF8',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              backgroundColor: '#1C1B18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#1C1B18' }}>
            Tools4Free
          </span>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#1C1B18',
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.2,
            letterSpacing: '-1px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 24,
            color: '#5C5850',
            textAlign: 'center',
            maxWidth: '70%',
            marginTop: 16,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: '#9A958A',
          }}
        >
          Free forever · No signup · No tracking
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
