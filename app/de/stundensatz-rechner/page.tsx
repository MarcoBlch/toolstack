import type { Metadata } from 'next'
import Client from '../../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Stundensatz Rechner — Freiberufler Stundenlohn Kostenlos',
  alternates: getAlternates('/hourly-rate-calculator'),
  description: 'Berechnen Sie Ihren idealen Stundensatz als Freiberufler oder Berater. Bestimmen Sie den Tarif, der Ihre Kosten und Einkommensziele deckt. Kostenlos.',
  keywords: 'stundensatz rechner, freiberufler stundenlohn, stundensatz berechnen, honorar berechnen, freelancer tarif, berater stundensatz',
  openGraph: { images: ['/api/og?title=Stundensatz%20Rechner&description=Berechnen%20Sie%20Ihren%20idealen%20Stundensatz%20als%20Freiberufler.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Stundensatz Rechner',
  url: 'https://tools4free.site/de/stundensatz-rechner',
  description: 'Berechnen Sie Ihren idealen Stundensatz als Freiberufler oder Berater. Bestimmen Sie den Tarif, der Ihre Kosten und Einkommensziele deckt. Kostenlos.',
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
