import type { Metadata } from 'next'
import Client from '../../days-until/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Wie Viele Tage Bis Weihnachten? Kostenlos',
  description: 'Wie viele Tage bis Weihnachten, Neujahr, Ostern, Geburtstag? Kostenloser Tagesrechner bis zu jedem Ereignis. Arbeitstage und Stunden inklusive.',
  keywords: 'wie viele tage bis weihnachten, tage bis neujahr, tage bis ostern, countdown tage, tage rechner',
  alternates: getAlternates('/days-until'),
  openGraph: { images: ['/api/og?title=Wie%20Viele%20Tage%20Bis&description=Tage%20bis%20Weihnachten%2C%20Neujahr%20und%20mehr.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Wie Viele Tage Bis',
  url: 'https://tools4free.site/de/wie-viele-tage-bis',
  description: 'Kostenloser Tagesrechner bis zu Weihnachten, Neujahr, Ostern und anderen Ereignissen.',
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
