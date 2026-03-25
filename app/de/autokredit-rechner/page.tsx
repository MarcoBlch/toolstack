import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Autokredit Rechner — Kfz Finanzierung Berechnen',
  description: 'Berechne die monatliche Rate für deinen Autokredit. Laufzeit, Zinsen, Gesamtkosten. Kostenloser Rechner.',
  keywords: 'Autokredit Rechner, Kfz Finanzierung, Autofinanzierung berechnen, Autokredit monatliche Rate, Auto Ratenrechner',
  openGraph: { images: ['/api/og?title=Autokredit%20Rechner&description=Berechne%20die%20monatliche%20Rate%20f%C3%BCr%20deinen%20Autokredit.%20Laufzeit%2C%20Zinsen%2C%20Gesamtkosten.%20Kostenloser%20Rech'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Autokredit Rechner',
  url: 'https://tools4free.site/de/autokredit-rechner',
  description: 'Berechne die monatliche Rate für deinen Autokredit. Laufzeit, Zinsen, Gesamtkosten. Kostenloser Rechner.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
