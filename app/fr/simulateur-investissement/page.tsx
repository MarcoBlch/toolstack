import type { Metadata } from 'next'
import InvestmentClient from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: "Simulateur d'Investissement — Intérêts Composés Gratuit",
  description: "Simulez la croissance de vos investissements avec les intérêts composés. Contributions mensuelles, rendement annuel. Gratuit, sans inscription.",
  keywords: 'simulateur investissement, interets composes, calcul interets composes, placement financier simulateur',
}

export default function SimulateurInvestissementPage() {
  return <InvestmentClient />
}
