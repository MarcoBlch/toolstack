import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculatrice de Prêt Immobilier — Simulateur de Mensualités Gratuit',
  description: 'Calculez vos mensualités de prêt immobilier, le coût total des intérêts et le tableau d\'amortissement. Simulateur gratuit, sans inscription.',
  keywords: 'calculatrice prêt immobilier, simulateur prêt immobilier, calcul mensualité, simulation crédit immobilier, tableau amortissement',
}

export default function CalculatricePretPage() {
  return <MortgageClient />
}
