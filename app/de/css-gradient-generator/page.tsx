import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/gradient-generator'),
  title: 'CSS Gradient Generator — Farbverlauf Erstellen Kostenlos',
  description: 'Erstelle schöne CSS-Farbverläufe visuell. Farben wählen, Winkel einstellen, CSS-Code kopieren. Kostenlos.',
  keywords: 'CSS Gradient Generator, Farbverlauf erstellen, CSS Farbverlauf, Gradient Maker, Farbverlauf Generator, CSS linear-gradient',
  openGraph: { images: ['/api/og?title=CSS%20Gradient%20Generator&description=Erstelle%20sch%C3%B6ne%20CSS-Farbverl%C3%A4ufe%20visuell.%20Farben%20w%C3%A4hlen%2C%20Winkel%20einstellen%2C%20CSS-Code%20kopieren.%20Koste'] },
}

const jsonLd = generateToolJsonLd({
  name: 'CSS Gradient Generator',
  url: 'https://tools4free.site/de/css-gradient-generator',
  description: 'Erstelle schöne CSS-Farbverläufe visuell. Farben wählen, Winkel einstellen, CSS-Code kopieren. Kostenlos.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
