import type { Metadata } from 'next'
import Client from '../../water-intake/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/water-intake'),
  title: 'Wasserbedarf Rechner — Tägliche Trinkmenge Kostenlos',
  description: 'Kostenloser Wasserbedarf Rechner. Wie viel Wasser solltest du täglich trinken? Basierend auf Gewicht, Aktivitätslevel und Klima.',
  keywords: 'Wasserbedarf, Wasserbedarf Rechner, wie viel Wasser trinken, Trinkmenge pro Tag, Flüssigkeitsbedarf',
  openGraph: { images: ['/api/og?title=Wasserbedarf%20Rechner&description=Wie%20viel%20Wasser%20solltest%20du%20t%C3%A4glich%20trinken%3F%20Basierend%20auf%20Gewicht%2C%20Aktivit%C3%A4tslevel%20und%20Klima'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Wasserbedarf Rechner',
  url: 'https://tools4free.site/de/wasserbedarf-rechner',
  description: 'Kostenloser Wasserbedarf Rechner. Wie viel Wasser solltest du täglich trinken? Basierend auf Gewicht, Aktivitätslevel und Klima.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
