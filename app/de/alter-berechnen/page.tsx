import type { Metadata } from 'next'
import Client from '../../age-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Alter Berechnen — Wie Alt Bin Ich? Kostenlos',
  description: 'Alter berechnen kostenlos: genaues Alter in Jahren, Monaten und Tagen. Nächster Geburtstag, Sternzeichen, chinesisches Tierkreiszeichen. Kein Download nötig.',
  keywords: 'alter berechnen, wie alt bin ich, altersrechner, geburtsdatum rechner, sternzeichen berechnen',
  alternates: getAlternates('/age-calculator'),
  openGraph: { images: ['/api/og?title=Alter%20Berechnen&description=Genaues%20Alter%20in%20Jahren%2C%20Monaten%20und%20Tagen.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Altersrechner',
  url: 'https://tools4free.site/de/alter-berechnen',
  description: 'Alter kostenlos berechnen: genaues Alter in Jahren, Monaten und Tagen.',
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
