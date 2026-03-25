import type { Metadata } from 'next'
import Client from '../../timezone-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Zeitzonen Umrechner — Weltzeituhr und Zeitzonenrechner',
  description: 'Rechne Uhrzeiten zwischen Zeitzonen um. Weltzeituhr, MEZ zu EST, Zeitverschiebung. Kostenlos, ohne Anmeldung.',
  keywords: 'Zeitzonen Umrechner, Zeitzonenrechner, Weltzeituhr, Zeitverschiebung, MEZ EST umrechnen, Uhrzeit weltweit',
  openGraph: { images: ['/api/og?title=Zeitzonen%20Umrechner&description=Rechne%20Uhrzeiten%20zwischen%20Zeitzonen%20um.%20Weltzeituhr%2C%20MEZ%20zu%20EST%2C%20Zeitverschiebung.%20Kostenlos%2C%20ohne%20A'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Zeitzonen Umrechner',
  url: 'https://tools4free.site/de/zeitzonen-umrechner',
  description: 'Rechne Uhrzeiten zwischen Zeitzonen um. Weltzeituhr, MEZ zu EST, Zeitverschiebung. Kostenlos, ohne Anmeldung.',
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
