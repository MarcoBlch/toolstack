import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculatrice de Prêt Immobilier — Simulateur Gratuit',
  description: 'Calculez vos mensualités de prêt immobilier, le coût total des intérêts et l\'amortissement. Simulateur gratuit, sans inscription.',
  keywords: 'calculatrice pret immobilier, simulateur pret immobilier, calcul mensualite, simulateur credit immobilier gratuit',
}

export default function CalculatricePretPage() {
  return <MortgageClient />
}
