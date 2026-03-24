import type { Metadata } from 'next'
import SalaryClient from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Calcul Salaire Brut Net — Simulateur Gratuit France',
  description: 'Convertissez votre salaire brut en net. Simulateur de charges sociales et impôts pour la France. Gratuit, sans inscription.',
  keywords: 'salaire brut net, calcul brut net, simulateur salaire, salaire net france, brut en net',
}

export default function SalaireBrutNetPage() {
  return <SalaryClient defaultCountry="FR" />
}
