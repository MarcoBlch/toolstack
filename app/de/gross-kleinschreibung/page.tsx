import type { Metadata } from 'next'
import Client from '../../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/case-converter'),
  title: 'Groß- und Kleinschreibung Umwandeln — Text Konverter',
  description: 'Wandle Text um: GROSSBUCHSTABEN, kleinbuchstaben, Titel, camelCase, snake_case und mehr. Kostenlos, ein Klick Kopieren.',
  keywords: 'Groß Kleinschreibung umwandeln, Text Konverter, Großbuchstaben, Kleinbuchstaben, Text umwandeln, Schreibweise ändern',
  openGraph: { images: ['/api/og?title=Gro%C3%9F-%20und%20Kleinschreibung%20Umwandeln&description=Wandle%20Text%20um%3A%20GROSSBUCHSTABEN%2C%20kleinbuchstaben%2C%20Titel%2C%20camelCase%2C%20snake_case%20und%20mehr.%20Kostenlos%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Groß- und Kleinschreibung Umwandeln',
  url: 'https://tools4free.site/de/gross-kleinschreibung',
  description: 'Wandle Text um: GROSSBUCHSTABEN, kleinbuchstaben, Titel, camelCase, snake_case und mehr. Kostenlos, ein Klick Kopieren.',
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
