import type { Metadata } from 'next'
import Client from '../../ideal-weight/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/ideal-weight'),
  title: 'Idealgewicht Rechner — 4 Formeln Kostenlos',
  description: 'Kostenloser Idealgewicht Rechner. Finde dein Idealgewicht mit den Formeln von Devine, Robinson, Miller, Hamwi. Gesunder BMI-Bereich für deine Größe.',
  keywords: 'Idealgewicht, Idealgewicht Rechner, gesundes Gewicht, Devine Formel, Normalgewicht, Idealgewicht berechnen',
  openGraph: { images: ['/api/og?title=Idealgewicht%20Rechner&description=Finde%20dein%20Idealgewicht%20mit%20den%20Formeln%20von%20Devine%2C%20Robinson%2C%20Miller%2C%20Hamwi'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Idealgewicht Rechner',
  url: 'https://tools4free.site/de/idealgewicht-rechner',
  description: 'Kostenloser Idealgewicht Rechner. Finde dein Idealgewicht mit den Formeln von Devine, Robinson, Miller, Hamwi. Gesunder BMI-Bereich für deine Größe.',
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
