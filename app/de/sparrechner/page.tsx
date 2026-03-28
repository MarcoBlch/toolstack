import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Sparrechner — Sparplan Berechnen mit Zinseszins',
  description: 'Berechne wie dein Sparplan wächst. Monatliche Einzahlung, Zinseszins, Laufzeit. Kostenloser Sparrechner.',
  keywords: 'Sparrechner, Sparplan Rechner, Sparplan berechnen, Zinseszins Sparplan, ETF Sparplan Rechner, Vermögensaufbau',
  openGraph: { images: ['/api/og?title=Sparrechner&description=Berechne%20wie%20dein%20Sparplan%20w%C3%A4chst.%20Monatliche%20Einzahlung%2C%20Zinseszins%2C%20Laufzeit.%20Kostenloser%20Sparrech'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Sparrechner',
  url: 'https://tools4free.site/de/sparrechner',
  description: 'Berechne wie dein Sparplan wächst. Monatliche Einzahlung, Zinseszins, Laufzeit. Kostenloser Sparrechner.',
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
