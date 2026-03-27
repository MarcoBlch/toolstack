import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/unit-converter'),
  title: 'Einheiten Umrechner — Kostenlos Einheiten Umrechnen Online',
  description: 'Rechne zwischen allen Einheiten um: Länge, Gewicht, Temperatur, Volumen, Fläche, Geschwindigkeit, Daten, Zeit. Kostenlos, sofort.',
  keywords: 'Einheiten umrechnen, Einheiten Umrechner, kg in Pfund, cm in Zoll, Celsius Fahrenheit, Meilen in km, Umrechner online',
  openGraph: { images: ['/api/og?title=Einheiten%20Umrechner&description=Rechne%20zwischen%20allen%20Einheiten%20um%3A%20L%C3%A4nge%2C%20Gewicht%2C%20Temperatur%2C%20Volumen%2C%20Fl%C3%A4che%2C%20Geschwindigkeit%2C%20Da'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Einheiten Umrechner',
  url: 'https://tools4free.site/de/einheiten-umrechner',
  description: 'Rechne zwischen allen Einheiten um: Länge, Gewicht, Temperatur, Volumen, Fläche, Geschwindigkeit, Daten, Zeit. Kostenlos, sofort.',
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
