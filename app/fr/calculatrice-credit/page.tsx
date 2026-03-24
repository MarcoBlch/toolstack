import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Calculatrice de Crédit — Simulateur de Prêt Personnel Gratuit',
  description: 'Calculez vos mensualités de crédit, intérêts totaux et tableau d\'amortissement. Crédit conso, auto, étudiant. Gratuit.',
  keywords: 'calculatrice crédit, simulateur prêt personnel, calcul mensualité crédit, simulation crédit conso, crédit auto calcul',
}

export default function Page() {
  return <Client />
}
