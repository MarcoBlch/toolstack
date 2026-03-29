import type { Metadata } from 'next'
import Client from '../../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Rabattrechner — Rabatte und Angebote Berechnen Kostenlos',
  alternates: getAlternates('/discount-calculator'),
  description: 'Berechnen Sie Rabatte, Preisnachlässe und Sonderangebote einfach. Erhalten Sie den Endpreis nach Rabatt, die Ersparnis und den Rabattprozentsatz. Kostenlos.',
  keywords: 'rabattrechner, rabatt berechnen, prozent rabatt, preisnachlass, angebot berechnen, sale rechner',
  openGraph: { images: ['/api/og?title=Rabattrechner&description=Berechnen%20Sie%20Rabatte%2C%20Preisnachl%C3%A4sse%20und%20Sonderangebote.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rabattrechner',
  url: 'https://tools4free.site/de/rabattrechner',
  description: 'Berechnen Sie Rabatte, Preisnachlässe und Sonderangebote einfach. Erhalten Sie den Endpreis nach Rabatt, die Ersparnis und den Rabattprozentsatz. Kostenlos.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
