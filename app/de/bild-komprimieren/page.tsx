import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/image-compressor'),
  title: 'Bild Komprimieren — PNG & JPEG Bilder Verkleinern Kostenlos',
  description: 'Komprimiere Bilder um bis zu 80% ohne Qualitätsverlust. JPEG, PNG, WebP. Alles bleibt im Browser. Kostenlos.',
  keywords: 'Bild komprimieren, Bilder verkleinern, PNG komprimieren, JPEG komprimieren, Bildgröße reduzieren, Bild Komprimierung online',
  openGraph: { images: ['/api/og?title=Bild%20Komprimieren&description=Komprimiere%20Bilder%20um%20bis%20zu%2080%25%20ohne%20Qualit%C3%A4tsverlust.%20JPEG%2C%20PNG%2C%20WebP.%20Alles%20bleibt%20im%20Browser.%20Ko'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Bild Komprimieren',
  url: 'https://tools4free.site/de/bild-komprimieren',
  description: 'Komprimiere Bilder um bis zu 80% ohne Qualitätsverlust. JPEG, PNG, WebP. Alles bleibt im Browser. Kostenlos.',
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
