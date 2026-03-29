import type { Metadata } from 'next'
import Client from '../../date-difference/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Tage Zwischen Zwei Daten Berechnen Kostenlos',
  description: 'Tage, Wochen, Monate und Jahre zwischen zwei Daten berechnen. Arbeitstage inklusive. Kostenlos, sofortiges Ergebnis ohne Anmeldung.',
  keywords: 'tage zwischen daten, datumsrechner, tage berechnen, datum differenz, arbeitstage rechner',
  alternates: getAlternates('/date-difference'),
  openGraph: { images: ['/api/og?title=Tage%20Zwischen%20Daten&description=Tage%2C%20Wochen%20und%20Monate%20zwischen%20zwei%20Daten.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Datumsrechner — Tage Zwischen Daten',
  url: 'https://tools4free.site/de/tage-zwischen-daten',
  description: 'Tage, Wochen und Monate zwischen zwei Daten kostenlos berechnen.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
