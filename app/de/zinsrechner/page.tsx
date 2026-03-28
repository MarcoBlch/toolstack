import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/investment-calculator'),
  title: 'Zinsrechner — Zinseszins Berechnen Kostenlos',
  description: 'Berechne Zinseszins und Vermögenswachstum. Monatliche Einzahlung, Rendite, Laufzeit. Kostenloser Zinsrechner.',
  keywords: 'Zinsrechner, Zinseszinsrechner, Zinseszins berechnen, Sparrechner, Renditerechner, Vermögensaufbau Rechner, Geldanlage Rechner',
  openGraph: { images: ['/api/og?title=Zinsrechner&description=Berechne%20Zinseszins%20und%20Verm%C3%B6genswachstum.%20Monatliche%20Einzahlung%2C%20Rendite%2C%20Laufzeit.%20Kostenloser%20Zin'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Zinsrechner',
  url: 'https://tools4free.site/de/zinsrechner',
  description: 'Berechne Zinseszins und Vermögenswachstum. Monatliche Einzahlung, Rendite, Laufzeit. Kostenloser Zinsrechner.',
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
