import type { Metadata } from 'next'
import Client from '../../shipping-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Versandkostenrechner — Versandkosten Berechnen Kostenlos',
  alternates: getAlternates('/shipping-calculator'),
  description: 'Schätzen Sie Versandkosten und Liefergebühren. Vergleichen Sie Versandtarife nach Gewicht, Maßen und Zielort. Kostenlos.',
  keywords: 'versandkostenrechner, versandkosten berechnen, lieferkosten, paketversand kosten, portokosten, versandtarife',
  openGraph: { images: ['/api/og?title=Versandkostenrechner&description=Sch%C3%A4tzen%20Sie%20Versandkosten%20und%20Liefergeb%C3%BChren.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Versandkostenrechner',
  url: 'https://tools4free.site/de/versandkostenrechner',
  description: 'Schätzen Sie Versandkosten und Liefergebühren. Vergleichen Sie Versandtarife nach Gewicht, Maßen und Zielort. Kostenlos.',
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
