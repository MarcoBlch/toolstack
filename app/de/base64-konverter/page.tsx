import type { Metadata } from 'next'
import Client from '../../base64/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Kostenlos Online Kodieren',
  description: 'Kodiere Text zu Base64 oder dekodiere Base64 zurück. Bild zu Data-URI. Kostenlos, privat, läuft lokal.',
  keywords: 'Base64 Encoder, Base64 Decoder, Base64 kodieren, Base64 dekodieren, Base64 Konverter, Base64 online',
  openGraph: { images: ['/api/og?title=Base64%20Encoder%20%26%20Decoder&description=Kodiere%20Text%20zu%20Base64%20oder%20dekodiere%20Base64%20zur%C3%BCck.%20Bild%20zu%20Data-URI.%20Kostenlos%2C%20privat%2C%20l%C3%A4uft%20loka'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Base64 Encoder & Decoder',
  url: 'https://tools4free.site/de/base64-konverter',
  description: 'Kodiere Text zu Base64 oder dekodiere Base64 zurück. Bild zu Data-URI. Kostenlos, privat, läuft lokal.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
