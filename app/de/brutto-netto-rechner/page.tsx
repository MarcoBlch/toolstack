import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/salary-calculator'),
  title: 'Brutto Netto Rechner — Gehaltsrechner 2026 Kostenlos',
  description: 'Berechne dein Nettogehalt aus dem Bruttogehalt. Steuern, Sozialabgaben, Effektivsteuersatz. Gehaltsrechner Deutschland.',
  keywords: 'Brutto Netto Rechner, Gehaltsrechner, Brutto Netto, Nettolohn berechnen, Gehaltsrechner 2026, Lohnrechner, Nettogehalt berechnen',
  openGraph: { images: ['/api/og?title=Brutto%20Netto%20Rechner&description=Berechne%20dein%20Nettogehalt%20aus%20dem%20Bruttogehalt.%20Steuern%2C%20Sozialabgaben%2C%20Effektivsteuersatz.%20Gehaltsr'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Brutto Netto Rechner',
  url: 'https://tools4free.site/de/brutto-netto-rechner',
  description: 'Berechne dein Nettogehalt aus dem Bruttogehalt. Steuern, Sozialabgaben, Effektivsteuersatz. Gehaltsrechner Deutschland.',
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
