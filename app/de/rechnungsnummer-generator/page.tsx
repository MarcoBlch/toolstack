import type { Metadata } from 'next'
import Client from '../../invoice-number-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Rechnungsnummer Generator Kostenlos',
  alternates: getAlternates('/invoice-number-generator'),
  description: 'Generieren Sie einzigartige und professionelle Rechnungsnummern. Passen Sie das Format und die Sequenz für Ihr Unternehmen an. Kostenlos.',
  keywords: 'rechnungsnummer generator, rechnungsnummer erstellen, rechnungsnummerierung, fortlaufende rechnungsnummer, rechnungsformat',
  openGraph: { images: ['/api/og?title=Rechnungsnummer%20Generator&description=Generieren%20Sie%20einzigartige%20und%20professionelle%20Rechnungsnummern.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rechnungsnummer Generator',
  url: 'https://tools4free.site/de/rechnungsnummer-generator',
  description: 'Generieren Sie einzigartige und professionelle Rechnungsnummern. Passen Sie das Format und die Sequenz für Ihr Unternehmen an. Kostenlos.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
