import type { Metadata } from 'next'
import InvoiceClient from '../../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Générateur de Facture Gratuit — Créer une Facture PDF en Ligne',
  alternates: getAlternates('/invoice-generator'),
  description: 'Créez des factures professionnelles gratuitement. Ajoutez vos prestations, la TVA, téléchargez en PDF. Sans inscription.',
  keywords: 'facture gratuite, générateur de facture, créer facture en ligne, modèle facture gratuit, facture pdf, facture auto entrepreneur',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20de%20Facture%20Gratuit&description=Cr%C3%A9ez%20des%20factures%20professionnelles%20gratuitement.%20Ajoutez%20vos%20prestations%2C%20la%20TVA%2C%20t%C3%A9l%C3%A9chargez%20en%20PD'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Facture Gratuit',
  url: 'https://tools4free.site/fr/facture-gratuite',
  description: 'Créez des factures professionnelles gratuitement. Ajoutez vos prestations, la TVA, téléchargez en PDF. Sans inscription.',
  category: 'BusinessApplication',
})

export default function FrInvoicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceClient />
    </>
  )
}
