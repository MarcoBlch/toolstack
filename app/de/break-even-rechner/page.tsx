import type { Metadata } from 'next'
import Client from '../../break-even-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Break-Even-Rechner — Gewinnschwelle Berechnen Kostenlos',
  alternates: getAlternates('/break-even-calculator'),
  description: 'Berechnen Sie Ihre Gewinnschwelle. Bestimmen Sie das erforderliche Verkaufsvolumen zur Deckung Ihrer fixen und variablen Kosten. Kostenlos.',
  keywords: 'break even rechner, gewinnschwelle, break even point, fixkosten, variable kosten, kostendeckung berechnen',
  openGraph: { images: ['/api/og?title=Break-Even-Rechner&description=Berechnen%20Sie%20Ihre%20Gewinnschwelle%20und%20Break-Even-Point.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Break-Even-Rechner',
  url: 'https://tools4free.site/de/break-even-rechner',
  description: 'Berechnen Sie Ihre Gewinnschwelle. Bestimmen Sie das erforderliche Verkaufsvolumen zur Deckung Ihrer fixen und variablen Kosten. Kostenlos.',
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
