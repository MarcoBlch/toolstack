import type { Metadata } from 'next'
import InvestmentClient from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: "Simulateur d'Investissement — Calcul Intérêts Composés Gratuit",
  description: "Simulez la croissance de vos investissements avec les intérêts composés. Contribution mensuelle, rendement annuel. Gratuit.",
  keywords: 'simulateur investissement, calcul intérêts composés, simulateur placement, épargne composée, rendement investissement',
}

export default function SimulateurInvestissementPage() {
  return <InvestmentClient />
}
