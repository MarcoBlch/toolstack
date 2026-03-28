import type { Metadata } from 'next'
import Client from '../../vat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/vat-calculator'),
  title: 'Mehrwertsteuer Rechner — MwSt Berechnen Netto Brutto',
  description: 'Berechne die Mehrwertsteuer einfach. Netto zu Brutto oder Brutto zu Netto. MwSt 19%, 7%. Kostenloser Rechner.',
  keywords: 'Mehrwertsteuer Rechner, MwSt Rechner, Netto Brutto Rechner, MwSt berechnen, 19% MwSt, Mehrwertsteuer berechnen, Umsatzsteuer Rechner',
  openGraph: { images: ['/api/og?title=Mehrwertsteuer%20Rechner&description=Berechne%20die%20Mehrwertsteuer%20einfach.%20Netto%20zu%20Brutto%20oder%20Brutto%20zu%20Netto.%20MwSt%2019%25%2C%207%25.%20Kostenloser'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Mehrwertsteuer Rechner',
  url: 'https://tools4free.site/de/mehrwertsteuer-rechner',
  description: 'Berechne die Mehrwertsteuer einfach. Netto zu Brutto oder Brutto zu Netto. MwSt 19%, 7%. Kostenloser Rechner.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
