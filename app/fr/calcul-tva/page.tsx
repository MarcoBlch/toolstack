import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul TVA — Ajouter ou Enlever la TVA en Ligne Gratuit',
  description: 'Calculez la TVA facilement. Prix HT vers TTC ou TTC vers HT. Taux France: 20%, 10%, 5.5%, 2.1%. Gratuit.',
  keywords: 'calcul tva, calculatrice tva, prix ht ttc, tva 20, ajouter tva, enlever tva, tva france, calcul tva en ligne',
  openGraph: { images: ['/api/og?title=Calcul%20TVA&description=Calculez%20la%20TVA%20facilement.%20Prix%20HT%20vers%20TTC%20ou%20TTC%20vers%20HT.%20Taux%20France%3A%2020%25%2C%2010%25%2C%205.5%25%2C%202.1%25.%20Grat'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul TVA',
  url: 'https://tools4free.site/fr/calcul-tva',
  description: 'Calculez la TVA facilement. Prix HT vers TTC ou TTC vers HT. Taux France: 20%, 10%, 5.5%, 2.1%. Gratuit.',
  category: 'FinanceApplication',
})

export default function CalculTVAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VATClient />
    </>
  )
}
