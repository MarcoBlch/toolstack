import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Calcul TVA — Ajouter ou Enlever la TVA en Ligne Gratuit',
  description: 'Calculez la TVA facilement. Prix HT vers TTC ou TTC vers HT. Taux France: 20%, 10%, 5.5%, 2.1%. Gratuit.',
  keywords: 'calcul tva, calculatrice tva, prix ht ttc, tva 20, ajouter tva, enlever tva, tva france, calcul tva en ligne',
}

export default function CalculTVAPage() {
  return <VATClient />
}
