import type { Metadata } from 'next'
import Client from '../../one-rep-max/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur 1RM — Charge Maximale Gratuit',
  alternates: getAlternates('/one-rep-max'),
  description: "Calculateur de 1RM gratuit. Estimez votre charge maximale avec les formules Epley, Brzycki et autres. Tableau de pourcentages pour l'entraînement.",
  keywords: '1RM, calculateur 1RM, charge maximale, répétition maximale, formule Epley, formule Brzycki, musculation',
  openGraph: { images: ['/api/og?title=Calculateur%201RM&description=Estimez%20votre%20charge%20maximale%20avec%20les%20formules%20Epley%2C%20Brzycki%20et%20autres'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur 1RM',
  url: 'https://tools4free.site/fr/calculateur-1rm',
  description: "Calculateur de 1RM gratuit. Estimez votre charge maximale avec les formules Epley, Brzycki et autres. Tableau de pourcentages pour l'entraînement.",
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
