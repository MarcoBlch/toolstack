import type { Metadata } from 'next'
import Client from '../../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculateur de Calories — Besoins Caloriques Journaliers Gratuit',
  description: 'Calculateur de calories gratuit. Calculez vos besoins caloriques journaliers selon votre âge, poids, taille et activité physique. Métabolisme de base et TDEE.',
  keywords: 'calculateur calories, besoins caloriques, métabolisme de base, TDEE, calories par jour, calcul calories gratuit',
  openGraph: { images: ['/api/og?title=Calculateur%20de%20Calories&description=Calculez%20vos%20besoins%20caloriques%20journaliers%20selon%20votre%20%C3%A2ge%2C%20poids%2C%20taille%20et%20activit%C3%A9%20physique'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur de Calories',
  url: 'https://tools4free.site/fr/calculateur-calories',
  description: 'Calculateur de calories gratuit. Calculez vos besoins caloriques journaliers selon votre âge, poids, taille et activité physique. Métabolisme de base et TDEE.',
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
