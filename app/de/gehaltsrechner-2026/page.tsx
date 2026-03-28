import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Gehaltsrechner 2026 — Nettolohn Berechnen Deutschland',
  description: 'Berechne dein Nettoeinkommen 2026 in Deutschland. Steuerklasse, Sozialversicherung, Kirchensteuer. Kostenlos.',
  keywords: 'Gehaltsrechner 2026, Nettolohn 2026, Gehaltsrechner Deutschland, Steuerklasse Rechner, Lohnsteuer 2026',
  openGraph: { images: ['/api/og?title=Gehaltsrechner%202026&description=Berechne%20dein%20Nettoeinkommen%202026%20in%20Deutschland.%20Steuerklasse%2C%20Sozialversicherung%2C%20Kirchensteuer.%20K'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gehaltsrechner 2026',
  url: 'https://tools4free.site/de/gehaltsrechner-2026',
  description: 'Berechne dein Nettoeinkommen 2026 in Deutschland. Steuerklasse, Sozialversicherung, Kirchensteuer. Kostenlos.',
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
