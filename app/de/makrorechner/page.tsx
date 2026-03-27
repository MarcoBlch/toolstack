import type { Metadata } from 'next'
import Client from '../../macro-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/macro-calculator'),
  title: 'Makrorechner — Eiweiß, Kohlenhydrate, Fett Kostenlos',
  description: 'Kostenloser Makrorechner. Berechne deine tägliche Aufnahme von Eiweiß, Kohlenhydraten und Fett. Voreinstellungen für ausgewogen, Low Carb, High Protein, Keto.',
  keywords: 'Makrorechner, Makronährstoffe, Eiweiß pro Tag, Kohlenhydrate, Fett, Keto Diät, High Protein Diät',
  openGraph: { images: ['/api/og?title=Makrorechner&description=Berechne%20deine%20t%C3%A4gliche%20Aufnahme%20von%20Eiwei%C3%9F%2C%20Kohlenhydraten%20und%20Fett'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Makrorechner',
  url: 'https://tools4free.site/de/makrorechner',
  description: 'Kostenloser Makrorechner. Berechne deine tägliche Aufnahme von Eiweiß, Kohlenhydraten und Fett. Voreinstellungen für ausgewogen, Low Carb, High Protein, Keto.',
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
