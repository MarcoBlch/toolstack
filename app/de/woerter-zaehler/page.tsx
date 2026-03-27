import type { Metadata } from 'next'
import Client from '../../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/word-counter'),
  title: 'Wörter Zählen — Kostenloser Wort und Zeichen Zähler',
  description: 'Zähle Wörter, Zeichen, Sätze, Absätze. Lesezeit und Sprechzeit. Keyword-Dichte. Kostenlos, ohne Anmeldung.',
  keywords: 'Wörter zählen, Zeichen zählen, Wortzähler, Zeichenzähler, Wörter zählen online, Text Zeichen zählen',
  openGraph: { images: ['/api/og?title=W%C3%B6rter%20Z%C3%A4hlen&description=Z%C3%A4hle%20W%C3%B6rter%2C%20Zeichen%2C%20S%C3%A4tze%2C%20Abs%C3%A4tze.%20Lesezeit%20und%20Sprechzeit.%20Keyword-Dichte.%20Kostenlos%2C%20ohne%20Anme'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Wörter Zählen',
  url: 'https://tools4free.site/de/woerter-zaehler',
  description: 'Zähle Wörter, Zeichen, Sätze, Absätze. Lesezeit und Sprechzeit. Keyword-Dichte. Kostenlos, ohne Anmeldung.',
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
