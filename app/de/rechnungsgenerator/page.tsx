import type { Metadata } from 'next'
import Client from '../../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Rechnungsgenerator Kostenlos — Rechnung Online Erstellen PDF',
  description: 'Erstelle professionelle Rechnungen sofort. Positionen, Steuern, Rabatte. PDF Download. Ohne Anmeldung, ohne Wasserzeichen.',
  keywords: 'Rechnungsgenerator, Rechnung erstellen kostenlos, Rechnung online, Rechnung Vorlage, Rechnung PDF, kostenlose Rechnung erstellen, Rechnungsvorlage',
  openGraph: { images: ['/api/og?title=Rechnungsgenerator%20Kostenlos&description=Erstelle%20professionelle%20Rechnungen%20sofort.%20Positionen%2C%20Steuern%2C%20Rabatte.%20PDF%20Download.%20Ohne%20Anmeldun'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rechnungsgenerator Kostenlos',
  url: 'https://tools4free.site/de/rechnungsgenerator',
  description: 'Erstelle professionelle Rechnungen sofort. Positionen, Steuern, Rabatte. PDF Download. Ohne Anmeldung, ohne Wasserzeichen.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
