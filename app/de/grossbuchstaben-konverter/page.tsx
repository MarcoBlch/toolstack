import type { Metadata } from 'next'
import Client from '../../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Großbuchstaben Konverter — Text in GROSSBUCHSTABEN Umwandeln',
  description: 'Wandle jeden Text in GROSSBUCHSTABEN um. Auch Kleinbuchstaben, Titel, camelCase verfügbar. Kostenlos.',
  keywords: 'Großbuchstaben umwandeln, Text Großbuchstaben, CAPS Konverter, Großschreibung, Text umwandeln, Kleinbuchstaben',
  openGraph: { images: ['/api/og?title=Gro%C3%9Fbuchstaben%20Konverter&description=Wandle%20jeden%20Text%20in%20GROSSBUCHSTABEN%20um.%20Auch%20Kleinbuchstaben%2C%20Titel%2C%20camelCase%20verf%C3%BCgbar.%20Kostenlos'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Großbuchstaben Konverter',
  url: 'https://tools4free.site/de/grossbuchstaben-konverter',
  description: 'Wandle jeden Text in GROSSBUCHSTABEN um. Auch Kleinbuchstaben, Titel, camelCase verfügbar. Kostenlos.',
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
