import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'

export const metadata: Metadata = {
  title: 'Calcul IMC — Calculatrice d\'Indice de Masse Corporelle Gratuit',
  description: 'Calculez votre IMC (Indice de Masse Corporelle). Métrique et impérial. Catégorie de poids et plage saine. Gratuit.',
  keywords: 'calcul imc, calculatrice imc, indice masse corporelle, imc femme, imc homme, calculer son imc',
}

export default function Page() {
  return <Client />
}
