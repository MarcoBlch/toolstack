import type { Metadata } from 'next'
import Client from '../../currency-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/currency-converter'),
  title: 'Währungsrechner — Kostenloser Wechselkurs Umrechner Online',
  description: 'Rechne zwischen 30+ Weltwährungen um. EUR, USD, GBP, CHF, JPY. Tagesaktuelle Näherungswerte. Kostenlos.',
  keywords: 'Währungsrechner, Wechselkurs, Euro Dollar, Währung umrechnen, Devisenrechner, EUR USD Kurs, Geld umrechnen',
  openGraph: { images: ['/api/og?title=W%C3%A4hrungsrechner&description=Rechne%20zwischen%2030%2B%20Weltw%C3%A4hrungen%20um.%20EUR%2C%20USD%2C%20GBP%2C%20CHF%2C%20JPY.%20Tagesaktuelle%20N%C3%A4herungswerte.%20Kostenl'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Währungsrechner',
  url: 'https://tools4free.site/de/waehrungsrechner',
  description: 'Rechne zwischen 30+ Weltwährungen um. EUR, USD, GBP, CHF, JPY. Tagesaktuelle Näherungswerte. Kostenlos.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
