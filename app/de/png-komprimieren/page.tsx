import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'PNG Komprimieren — PNG Bilder Verkleinern Online Kostenlos',
  description: 'Komprimiere PNG-Dateien online ohne Qualitätsverlust. Drag & Drop, bis zu 80% kleiner. Kostenlos, im Browser.',
  keywords: 'PNG komprimieren, PNG verkleinern, PNG Dateigröße reduzieren, Bild komprimieren PNG, PNG optimieren',
  openGraph: { images: ['/api/og?title=PNG%20Komprimieren&description=Komprimiere%20PNG-Dateien%20online%20ohne%20Qualit%C3%A4tsverlust.%20Drag%20%26%20Drop%2C%20bis%20zu%2080%25%20kleiner.%20Kostenlos%2C%20im'] },
}

const jsonLd = generateToolJsonLd({
  name: 'PNG Komprimieren',
  url: 'https://tools4free.site/de/png-komprimieren',
  description: 'Komprimiere PNG-Dateien online ohne Qualitätsverlust. Drag & Drop, bis zu 80% kleiner. Kostenlos, im Browser.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
