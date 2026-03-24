import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'

export const metadata: Metadata = {
  title: 'Simulateur de Retraite — Calculez votre Épargne Retraite Gratuit',
  description: 'Planifiez votre retraite. Combien épargner par mois, projection de revenus, durée du capital. Gratuit.',
  keywords: 'simulateur retraite, calcul retraite, épargne retraite, planifier retraite, combien épargner pour la retraite',
}

export default function Page() {
  return <Client />
}
