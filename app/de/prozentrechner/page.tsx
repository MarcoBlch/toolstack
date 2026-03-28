import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/percentage-calculator'),
  title: 'Prozentrechner — Prozent Berechnen Online Kostenlos',
  description: 'Berechne Prozente einfach. Wie viel ist X% von Y? Prozentuale Veränderung, Rabatt berechnen. Kostenlos.',
  keywords: 'Prozentrechner, Prozent berechnen, wieviel Prozent, Prozentrechnung, Rabatt berechnen, prozentuale Veränderung, Dreisatz',
  openGraph: { images: ['/api/og?title=Prozentrechner&description=Berechne%20Prozente%20einfach.%20Wie%20viel%20ist%20X%25%20von%20Y%3F%20Prozentuale%20Ver%C3%A4nderung%2C%20Rabatt%20berechnen.%20Kostenl'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Prozentrechner',
  url: 'https://tools4free.site/de/prozentrechner',
  description: 'Berechne Prozente einfach. Wie viel ist X% von Y? Prozentuale Veränderung, Rabatt berechnen. Kostenlos.',
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
