import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculatrice de Pourcentage — Calcul de Pourcentage Gratuit',
  description: 'Calculez des pourcentages facilement. Combien fait X% de Y ? Variation en pourcentage. Calcul de remise. Gratuit.',
  keywords: 'calculatrice pourcentage, calcul pourcentage, pourcentage de, calcul remise, variation pourcentage, combien fait 20 de 500',
}

export default function Page() {
  return <Client />
}
