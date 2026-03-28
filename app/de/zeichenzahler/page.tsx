import type { Metadata } from 'next'
import Client from '../../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Zeichenzähler — Zeichen und Buchstaben Zählen Online',
  description: 'Zähle Zeichen, Buchstaben, Wörter, Sätze sofort. Mit und ohne Leerzeichen. Lesezeit inklusive. Kostenlos.',
  keywords: 'Zeichenzähler, Zeichen zählen, Buchstaben zählen, Zeichenanzahl, Text Zeichen zählen online, Wörter und Zeichen',
  openGraph: { images: ['/api/og?title=Zeichenz%C3%A4hler&description=Z%C3%A4hle%20Zeichen%2C%20Buchstaben%2C%20W%C3%B6rter%2C%20S%C3%A4tze%20sofort.%20Mit%20und%20ohne%20Leerzeichen.%20Lesezeit%20inklusive.%20Koste'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Zeichenzähler',
  url: 'https://tools4free.site/de/zeichenzahler',
  description: 'Zähle Zeichen, Buchstaben, Wörter, Sätze sofort. Mit und ohne Leerzeichen. Lesezeit inklusive. Kostenlos.',
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
