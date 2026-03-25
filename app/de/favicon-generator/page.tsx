import type { Metadata } from 'next'
import Client from '../../favicon-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Favicon Generator — Favicon aus Text oder Emoji Erstellen',
  description: 'Generiere Favicons aus Buchstaben oder Emojis. Alle Größen (16, 32, 48, 180, 512). PNG Download. Kostenlos.',
  keywords: 'Favicon Generator, Favicon erstellen, ICO Generator, Favicon aus Text, App Icon erstellen, Favicon kostenlos',
  openGraph: { images: ['/api/og?title=Favicon%20Generator&description=Generiere%20Favicons%20aus%20Buchstaben%20oder%20Emojis.%20Alle%20Gr%C3%B6%C3%9Fen%20(16%2C%2032%2C%2048%2C%20180%2C%20512).%20PNG%20Download.%20Kos'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Favicon Generator',
  url: 'https://tools4free.site/de/favicon-generator',
  description: 'Generiere Favicons aus Buchstaben oder Emojis. Alle Größen (16, 32, 48, 180, 512). PNG Download. Kostenlos.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
