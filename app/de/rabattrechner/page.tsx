import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Rabattrechner — Rabatt und Ersparnis Berechnen',
  description: 'Berechne den Rabatt und die Ersparnis schnell. Wie viel spart man bei 20% Rabatt? Kostenloser Rechner.',
  keywords: 'Rabattrechner, Rabatt berechnen, Ersparnis berechnen, Prozent Rabatt, Sale Rechner, Rabatt ausrechnen',
  openGraph: { images: ['/api/og?title=Rabattrechner&description=Berechne%20den%20Rabatt%20und%20die%20Ersparnis%20schnell.%20Wie%20viel%20spart%20man%20bei%2020%25%20Rabatt%3F%20Kostenloser%20Rechne'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rabattrechner',
  url: 'https://tools4free.site/de/rabattrechner',
  description: 'Berechne den Rabatt und die Ersparnis schnell. Wie viel spart man bei 20% Rabatt? Kostenloser Rechner.',
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
