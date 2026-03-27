import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/retirement-calculator'),
  title: 'Rentenrechner — Altersvorsorge Planen Kostenlos',
  description: 'Plane deine Altersvorsorge. Wie viel monatlich sparen, Einkommensprojektion, Kapitaldauer. Kostenloser Rechner.',
  keywords: 'Rentenrechner, Altersvorsorge Rechner, Rente berechnen, Rentenvorsorge planen, Sparrechner Rente, Rentenlücke berechnen',
  openGraph: { images: ['/api/og?title=Rentenrechner&description=Plane%20deine%20Altersvorsorge.%20Wie%20viel%20monatlich%20sparen%2C%20Einkommensprojektion%2C%20Kapitaldauer.%20Kostenlos'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Rentenrechner',
  url: 'https://tools4free.site/de/rentenrechner',
  description: 'Plane deine Altersvorsorge. Wie viel monatlich sparen, Einkommensprojektion, Kapitaldauer. Kostenloser Rechner.',
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
