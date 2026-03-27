import type { Metadata } from 'next'
import Client from '../../one-rep-max/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/one-rep-max'),
  title: '1RM Rechner — Maximalgewicht Berechnen Kostenlos',
  description: 'Kostenloser 1RM Rechner. Schätze dein Maximalgewicht mit den Formeln von Epley, Brzycki und anderen. Prozent-Tabelle für das Training.',
  keywords: '1RM, 1RM Rechner, Maximalgewicht, Maximalwiederholung, Epley Formel, Brzycki Formel, Krafttraining',
  openGraph: { images: ['/api/og?title=1RM%20Rechner&description=Sch%C3%A4tze%20dein%20Maximalgewicht%20mit%20den%20Formeln%20von%20Epley%2C%20Brzycki%20und%20anderen'] },
}

const jsonLd = generateToolJsonLd({
  name: '1RM Rechner',
  url: 'https://tools4free.site/de/1rm-rechner',
  description: 'Kostenloser 1RM Rechner. Schätze dein Maximalgewicht mit den Formeln von Epley, Brzycki und anderen. Prozent-Tabelle für das Training.',
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
