import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Tilgungsrechner — Tilgungsplan Erstellen Kostenlos',
  description: 'Erstelle einen detaillierten Tilgungsplan für deinen Kredit oder deine Baufinanzierung. Kostenlos, ohne Anmeldung.',
  keywords: 'Tilgungsrechner, Tilgungsplan, Tilgungsplan erstellen, Annuitätenrechner, Sondertilgung berechnen',
  openGraph: { images: ['/api/og?title=Tilgungsrechner&description=Erstelle%20einen%20detaillierten%20Tilgungsplan%20f%C3%BCr%20deinen%20Kredit%20oder%20deine%20Baufinanzierung.%20Kostenlos%2C%20o'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Tilgungsrechner',
  url: 'https://tools4free.site/de/tilgungsrechner',
  description: 'Erstelle einen detaillierten Tilgungsplan für deinen Kredit oder deine Baufinanzierung. Kostenlos, ohne Anmeldung.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
