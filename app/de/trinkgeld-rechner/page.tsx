import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Trinkgeld Rechner — Trinkgeld Berechnen und Rechnung Teilen',
  description: 'Berechne das Trinkgeld und teile die Rechnung einfach. Schnelle Prozentsätze, Aufteilung zwischen Personen. Kostenlos.',
  keywords: 'Trinkgeld Rechner, Trinkgeld berechnen, Rechnung teilen, Restaurant Trinkgeld, wie viel Trinkgeld, Trinkgeld Prozent',
  openGraph: { images: ['/api/og?title=Trinkgeld%20Rechner&description=Berechne%20das%20Trinkgeld%20und%20teile%20die%20Rechnung%20einfach.%20Schnelle%20Prozents%C3%A4tze%2C%20Aufteilung%20zwischen%20Pe'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Trinkgeld Rechner',
  url: 'https://tools4free.site/de/trinkgeld-rechner',
  description: 'Berechne das Trinkgeld und teile die Rechnung einfach. Schnelle Prozentsätze, Aufteilung zwischen Personen. Kostenlos.',
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
