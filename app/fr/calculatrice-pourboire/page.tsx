import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'

export const metadata: Metadata = {
  title: 'Calculatrice de Pourboire — Calcul et Partage de l\'Addition',
  description: 'Calculez le pourboire et partagez l\'addition facilement. Pourcentages rapides, division entre convives. Gratuit.',
  keywords: 'calculatrice pourboire, calcul pourboire, partager addition, diviser addition, tip calculator français',
}

export default function Page() {
  return <Client />
}
