import type { Metadata } from 'next'
import Client from '../../stopwatch/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Online Stoppuhr Kostenlos — Mit Rundenzeiten',
  description: 'Online Stoppuhr kostenlos im Browser. Rundenzeiten aufzeichnen, beste und schlechteste Runde hervorheben. Keine App nötig. Präzision auf Hundertstelsekunden.',
  keywords: 'stoppuhr online, stoppuhr kostenlos, online zeitmesser, rundenzeiten, stoppuhr browser',
  alternates: getAlternates('/stopwatch'),
  openGraph: { images: ['/api/og?title=Online%20Stoppuhr&description=Rundenzeiten%2C%20beste%20und%20schlechteste%20Runde.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Online Stoppuhr',
  url: 'https://tools4free.site/de/stoppuhr',
  description: 'Online Stoppuhr kostenlos mit Rundenzeiten und Präzision auf Hundertstelsekunden.',
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
