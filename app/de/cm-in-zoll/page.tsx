import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'CM in Zoll Umrechnen — Zentimeter zu Zoll Rechner',
  description: 'Rechne Zentimeter in Zoll (Inches) um und umgekehrt. Auch mm, Meter, Fuß, Yards. Kostenloser Umrechner.',
  keywords: 'cm in Zoll, Zentimeter in Zoll, cm Zoll umrechnen, Länge umrechnen, cm to inches',
  openGraph: { images: ['/api/og?title=CM%20in%20Zoll%20Umrechnen&description=Rechne%20Zentimeter%20in%20Zoll%20(Inches)%20um%20und%20umgekehrt.%20Auch%20mm%2C%20Meter%2C%20Fu%C3%9F%2C%20Yards.%20Kostenloser%20Umrechn'] },
}

const jsonLd = generateToolJsonLd({
  name: 'CM in Zoll Umrechnen',
  url: 'https://tools4free.site/de/cm-in-zoll',
  description: 'Rechne Zentimeter in Zoll (Inches) um und umgekehrt. Auch mm, Meter, Fuß, Yards. Kostenloser Umrechner.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
