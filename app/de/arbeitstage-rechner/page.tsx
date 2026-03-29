import type { Metadata } from 'next'
import Client from '../../work-days-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Arbeitstage Rechner Kostenlos',
  description: 'Arbeitstage zwischen zwei Daten berechnen, Wochenenden und Feiertage ausschließen. Feiertage für Deutschland und andere Länder inklusive. Kostenlos.',
  keywords: 'arbeitstage rechner, arbeitstage berechnen, werktage rechner, werktage zwischen daten, feiertage deutschland',
  alternates: getAlternates('/work-days-calculator'),
  openGraph: { images: ['/api/og?title=Arbeitstage%20Rechner&description=Arbeitstage%20zwischen%20Daten.%20Feiertage%20inklusive.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Arbeitstage Rechner',
  url: 'https://tools4free.site/de/arbeitstage-rechner',
  description: 'Arbeitstage zwischen zwei Daten berechnen, Wochenenden und Feiertage ausschließen.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" defaultCountry="DE" />
    </>
  )
}
