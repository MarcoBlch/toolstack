import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/lorem-generator'),
  title: 'Lorem Ipsum Generator — Platzhaltertext Kostenlos Generieren',
  description: 'Generiere Lorem Ipsum Platzhaltertext. Absätze, Sätze oder Wortanzahl wählen. Ein Klick zum Kopieren. Kostenlos.',
  keywords: 'Lorem Ipsum Generator, Platzhaltertext, Blindtext Generator, Fülltext, Lorem Ipsum Deutsch, Dummy Text',
  openGraph: { images: ['/api/og?title=Lorem%20Ipsum%20Generator&description=Generiere%20Lorem%20Ipsum%20Platzhaltertext.%20Abs%C3%A4tze%2C%20S%C3%A4tze%20oder%20Wortanzahl%20w%C3%A4hlen.%20Ein%20Klick%20zum%20Kopieren'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Lorem Ipsum Generator',
  url: 'https://tools4free.site/de/lorem-ipsum-generator',
  description: 'Generiere Lorem Ipsum Platzhaltertext. Absätze, Sätze oder Wortanzahl wählen. Ein Klick zum Kopieren. Kostenlos.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
