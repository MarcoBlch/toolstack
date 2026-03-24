import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Calcul TVA — Ajouter ou Enlever la TVA Gratuit',
  description: 'Calculez la TVA facilement. Ajoutez ou enlevez la TVA de n\'importe quel prix. Taux pré-configurés pour la France. Gratuit, sans inscription.',
  keywords: 'calcul tva, calculatrice tva, tva 20, ajouter tva, enlever tva, ht ttc',
}

export default function CalculTVAPage() {
  return <VATClient />
}
