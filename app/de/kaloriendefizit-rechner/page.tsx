import type { Metadata } from 'next'
import Client from '../../calorie-deficit/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/calorie-deficit'),
  title: 'Kaloriendefizit Rechner — Abnehmen Kostenlos',
  description: 'Kostenloser Kaloriendefizit Rechner. Wie lange bis zum Wunschgewicht? Sichere tägliche Kalorienzufuhr und wöchentliche Gewichtsabnahme.',
  keywords: 'Kaloriendefizit, Kaloriendefizit Rechner, Abnehmen, Kalorien zum Abnehmen, wie lange abnehmen',
  openGraph: { images: ['/api/og?title=Kaloriendefizit%20Rechner&description=Wie%20lange%20bis%20zum%20Wunschgewicht%3F%20Sichere%20t%C3%A4gliche%20Kalorienzufuhr%20und%20w%C3%B6chentliche%20Gewichtsabnahme'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Kaloriendefizit Rechner',
  url: 'https://tools4free.site/de/kaloriendefizit-rechner',
  description: 'Kostenloser Kaloriendefizit Rechner. Wie lange bis zum Wunschgewicht? Sichere tägliche Kalorienzufuhr und wöchentliche Gewichtsabnahme.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
