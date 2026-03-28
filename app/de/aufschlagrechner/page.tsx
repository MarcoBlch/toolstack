import type { Metadata } from 'next'
import Client from '../../markup-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Aufschlagrechner — Verkaufspreis Berechnen Kostenlos',
  alternates: getAlternates('/markup-calculator'),
  description: 'Berechnen Sie den Aufschlag und Verkaufspreis aus den Kosten. Bestimmen Sie den optimalen Aufschlagprozentsatz für Ihr Unternehmen. Kostenlos.',
  keywords: 'aufschlagrechner, verkaufspreis berechnen, markup rechner, handelsspanne, preisaufschlag, kalkulationsaufschlag',
  openGraph: { images: ['/api/og?title=Aufschlagrechner&description=Berechnen%20Sie%20den%20Aufschlag%20und%20Verkaufspreis.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Aufschlagrechner',
  url: 'https://tools4free.site/de/aufschlagrechner',
  description: 'Berechnen Sie den Aufschlag und Verkaufspreis aus den Kosten. Bestimmen Sie den optimalen Aufschlagprozentsatz für Ihr Unternehmen. Kostenlos.',
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
