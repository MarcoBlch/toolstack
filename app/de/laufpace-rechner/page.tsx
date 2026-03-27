import type { Metadata } from 'next'
import Client from '../../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/pace-calculator'),
  title: 'Laufpace Rechner — Lauftempo Berechnen Kostenlos',
  description: 'Kostenloser Laufpace Rechner. Berechne dein Tempo, Zeit oder Distanz für jeden Lauf. Zwischenzeiten für 5K, 10K, Halbmarathon, Marathon.',
  keywords: 'Laufpace, Pace Rechner, Lauftempo, Zwischenzeiten, 5K, 10K, Halbmarathon, Marathon, Laufen',
  openGraph: { images: ['/api/og?title=Laufpace%20Rechner&description=Berechne%20dein%20Tempo%2C%20Zeit%20oder%20Distanz%20f%C3%BCr%20jeden%20Lauf.%20Zwischenzeiten%20f%C3%BCr%205K%2C%2010K%2C%20Halbmarathon%2C%20Marathon'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Laufpace Rechner',
  url: 'https://tools4free.site/de/laufpace-rechner',
  description: 'Kostenloser Laufpace Rechner. Berechne dein Tempo, Zeit oder Distanz für jeden Lauf. Zwischenzeiten für 5K, 10K, Halbmarathon, Marathon.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
