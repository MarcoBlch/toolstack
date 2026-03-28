import type { Metadata } from 'next'
import Client from '../../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/calorie-calculator'),
  title: 'Kalorienrechner — Täglicher Kalorienbedarf Kostenlos',
  description: 'Kostenloser Kalorienrechner. Berechne deinen täglichen Kalorienbedarf nach Alter, Gewicht, Größe und Aktivitätslevel. Grundumsatz und Gesamtumsatz mit Mifflin-St-Jeor.',
  keywords: 'Kalorienrechner, Kalorienbedarf, Grundumsatz, Gesamtumsatz, Kalorien pro Tag, Kalorienrechner kostenlos',
  openGraph: { images: ['/api/og?title=Kalorienrechner&description=Berechne%20deinen%20t%C3%A4glichen%20Kalorienbedarf%20nach%20Alter%2C%20Gewicht%2C%20Gr%C3%B6%C3%9Fe%20und%20Aktivit%C3%A4tslevel'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Kalorienrechner',
  url: 'https://tools4free.site/de/kalorienrechner',
  description: 'Kostenloser Kalorienrechner. Berechne deinen täglichen Kalorienbedarf nach Alter, Gewicht, Größe und Aktivitätslevel. Grundumsatz und Gesamtumsatz mit Mifflin-St-Jeor.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
