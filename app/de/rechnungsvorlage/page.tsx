import type { Metadata } from 'next'
import Client from '../../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Rechnungsvorlage Kostenlos — Rechnung Vorlage PDF Download',
  description: 'Nutze unsere kostenlose Rechnungsvorlage. Daten eingeben, PDF herunterladen. Professionell, ohne Anmeldung.',
  keywords: 'Rechnungsvorlage, Rechnung Vorlage, kostenlose Rechnungsvorlage, Rechnung Muster, Rechnungsvorlage PDF, Rechnung schreiben',
  openGraph: { images: ['/api/og?title=Rechnungsvorlage%20Kostenlos&description=Nutze%20unsere%20kostenlose%20Rechnungsvorlage.%20Daten%20eingeben%2C%20PDF%20herunterladen.%20Professionell%2C%20ohne%20Anm'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rechnungsvorlage Kostenlos',
  url: 'https://tools4free.site/de/rechnungsvorlage',
  description: 'Nutze unsere kostenlose Rechnungsvorlage. Daten eingeben, PDF herunterladen. Professionell, ohne Anmeldung.',
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
