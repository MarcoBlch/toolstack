import type { Metadata } from 'next'
import Client from '../../countdown/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Countdown Timer — Weihnachten, Neujahr Kostenlos',
  description: 'Countdown Timer kostenlos bis zu jedem Datum. Bis Weihnachten, Neujahr, Geburtstag oder Event. Tage, Stunden, Minuten und Sekunden live.',
  keywords: 'countdown timer, countdown bis weihnachten, countdown neujahr, countdown rechner, tage bis',
  alternates: getAlternates('/countdown'),
  openGraph: { images: ['/api/og?title=Countdown%20Timer&description=Bis%20Weihnachten%2C%20Neujahr%20und%20mehr.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Countdown Timer',
  url: 'https://tools4free.site/de/countdown-timer',
  description: 'Countdown Timer kostenlos bis zu jedem Datum mit Tagen, Stunden, Minuten und Sekunden.',
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
