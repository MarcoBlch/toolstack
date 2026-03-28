import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Kg in Pfund Umrechnen — Kilogramm zu Pfund Rechner',
  description: 'Rechne Kilogramm in Pfund (lbs) um und umgekehrt. Auch Gramm, Unzen, Stones. Kostenloser Umrechner.',
  keywords: 'kg in Pfund, Kilogramm in Pfund, kg lbs umrechnen, Gewicht umrechnen, kg zu lbs',
  openGraph: { images: ['/api/og?title=Kg%20in%20Pfund%20Umrechnen&description=Rechne%20Kilogramm%20in%20Pfund%20(lbs)%20um%20und%20umgekehrt.%20Auch%20Gramm%2C%20Unzen%2C%20Stones.%20Kostenloser%20Umrechner.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Kg in Pfund Umrechnen',
  url: 'https://tools4free.site/de/kg-in-pfund',
  description: 'Rechne Kilogramm in Pfund (lbs) um und umgekehrt. Auch Gramm, Unzen, Stones. Kostenloser Umrechner.',
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
