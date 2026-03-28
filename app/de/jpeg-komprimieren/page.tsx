import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JPEG Komprimieren — JPG Bilder Verkleinern Online Kostenlos',
  description: 'Komprimiere JPEG/JPG-Bilder um bis zu 80%. Qualitätsregler, Drag & Drop. Alles im Browser. Kostenlos.',
  keywords: 'JPEG komprimieren, JPG komprimieren, JPG verkleinern, Foto komprimieren, JPEG Dateigröße reduzieren',
  openGraph: { images: ['/api/og?title=JPEG%20Komprimieren&description=Komprimiere%20JPEG%2FJPG-Bilder%20um%20bis%20zu%2080%25.%20Qualit%C3%A4tsregler%2C%20Drag%20%26%20Drop.%20Alles%20im%20Browser.%20Kostenlos'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JPEG Komprimieren',
  url: 'https://tools4free.site/de/jpeg-komprimieren',
  description: 'Komprimiere JPEG/JPG-Bilder um bis zu 80%. Qualitätsregler, Drag & Drop. Alles im Browser. Kostenlos.',
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
