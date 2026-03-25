import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Baufinanzierung Rechner — Kreditrate Berechnen Kostenlos',
  description: 'Berechne deine monatliche Kreditrate, Gesamtzinsen und Tilgungsplan für deine Baufinanzierung. Kostenloser Rechner.',
  keywords: 'Baufinanzierung Rechner, Kreditrechner Immobilie, Hypothekenrechner, Baufinanzierung berechnen, Tilgungsrechner, monatliche Rate berechnen',
  openGraph: { images: ['/api/og?title=Baufinanzierung%20Rechner&description=Berechne%20deine%20monatliche%20Kreditrate%2C%20Gesamtzinsen%20und%20Tilgungsplan%20f%C3%BCr%20deine%20Baufinanzierung.%20Koste'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Baufinanzierung Rechner',
  url: 'https://tools4free.site/de/baufinanzierung-rechner',
  description: 'Berechne deine monatliche Kreditrate, Gesamtzinsen und Tilgungsplan für deine Baufinanzierung. Kostenloser Rechner.',
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
