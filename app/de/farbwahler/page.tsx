import type { Metadata } from 'next'
import Client from '../../color-picker/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Farbwähler — HEX, RGB, HSL Farbcode Kostenlos',
  description: 'Wähle eine Farbe. Erhalte HEX, RGB, HSL Werte. Generiere Schattierungen, Tönungen und Komplementärfarben.',
  keywords: 'Farbwähler, Color Picker, HEX Farbcode, RGB zu HEX, Farbcode ermitteln, Farben umrechnen, Farbpalette',
  openGraph: { images: ['/api/og?title=Farbw%C3%A4hler&description=W%C3%A4hle%20eine%20Farbe.%20Erhalte%20HEX%2C%20RGB%2C%20HSL%20Werte.%20Generiere%20Schattierungen%2C%20T%C3%B6nungen%20und%20Komplement%C3%A4rfa'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Farbwähler',
  url: 'https://tools4free.site/de/farbwahler',
  description: 'Wähle eine Farbe. Erhalte HEX, RGB, HSL Werte. Generiere Schattierungen, Tönungen und Komplementärfarben.',
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
