import type { Metadata } from 'next'
import SalaryClient from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Calcul Salaire Brut Net — Simulateur de Salaire Gratuit France',
  description: 'Convertissez votre salaire brut en net. Charges sociales, impôts, taux effectif. Simulateur France, USA, UK. Gratuit.',
  keywords: 'salaire brut net, calcul salaire net, simulateur salaire, brut en net france, calcul charges salariales, salaire après impôts',
}

export default function SalaireBrutNetPage() {
  return <SalaryClient defaultCountry="FR" />
}
