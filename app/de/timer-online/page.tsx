import type { Metadata } from 'next'
import Client from '../../timer/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Timer Online Kostenlos — Mit Alarmsignal',
  description: 'Online Timer kostenlos bis zu 99 Stunden. Schnellauswahl: 1, 2, 3, 5, 10, 15, 30 Minuten. Alarmsignal beim Ablauf. Keine App nötig.',
  keywords: 'timer online, timer kostenlos, online küchenuhr, countdown timer minuten, wecker online',
  alternates: getAlternates('/timer'),
  openGraph: { images: ['/api/og?title=Timer%20Online&description=Bis%2099%20Stunden.%20Alarmsignal.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Timer Online',
  url: 'https://tools4free.site/de/timer-online',
  description: 'Online Timer kostenlos bis zu 99 Stunden mit Alarmsignal.',
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
