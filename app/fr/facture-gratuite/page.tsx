import type { Metadata } from 'next'
import InvoiceClient from '../../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Générateur de Facture Gratuit — Créer une Facture PDF en Ligne',
  description: 'Créez des factures professionnelles gratuitement. Ajoutez vos prestations, la TVA, téléchargez en PDF. Sans inscription.',
  keywords: 'facture gratuite, générateur de facture, créer facture en ligne, modèle facture gratuit, facture pdf, facture auto entrepreneur',
}

export default function FrInvoicePage() {
  return <InvoiceClient />
}
