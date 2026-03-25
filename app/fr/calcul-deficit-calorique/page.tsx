import type { Metadata } from 'next'
import Client from '../../calorie-deficit/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul Déficit Calorique — Perte de Poids Gratuit',
  description: 'Calcul de déficit calorique gratuit. Combien de temps pour atteindre votre objectif de poids. Apport calorique quotidien sûr et taux de perte de poids.',
  keywords: 'déficit calorique, calcul déficit, perte de poids, calories pour maigrir, combien de temps pour perdre du poids',
  openGraph: { images: ['/api/og?title=Calcul%20D%C3%A9ficit%20Calorique&description=Combien%20de%20temps%20pour%20atteindre%20votre%20objectif%20de%20poids'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul Déficit Calorique',
  url: 'https://tools4free.site/fr/calcul-deficit-calorique',
  description: 'Calcul de déficit calorique gratuit. Combien de temps pour atteindre votre objectif de poids. Apport calorique quotidien sûr et taux de perte de poids.',
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
