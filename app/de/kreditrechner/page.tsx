import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Kreditrechner — Monatliche Rate Berechnen Kostenlos',
  description: 'Berechne monatliche Raten, Gesamtzinsen und Tilgungsplan für jeden Kredit. Autokredit, Privatkredit, Studienkredit.',
  keywords: 'Kreditrechner, Kreditrate berechnen, Ratenrechner, Darlehensrechner, Autokredit Rechner, Tilgungsplan, monatliche Rate',
  openGraph: { images: ['/api/og?title=Kreditrechner&description=Berechne%20monatliche%20Raten%2C%20Gesamtzinsen%20und%20Tilgungsplan%20f%C3%BCr%20jeden%20Kredit.%20Autokredit%2C%20Privatkredit%2C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Kreditrechner',
  url: 'https://tools4free.site/de/kreditrechner',
  description: 'Berechne monatliche Raten, Gesamtzinsen und Tilgungsplan für jeden Kredit. Autokredit, Privatkredit, Studienkredit.',
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
