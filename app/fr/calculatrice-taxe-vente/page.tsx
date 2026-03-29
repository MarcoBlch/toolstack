import type { Metadata } from 'next'
import Client from '../../sales-tax-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Taxe de Vente Gratuit',
  alternates: getAlternates('/sales-tax-calculator'),
  description: 'Calculez la taxe de vente sur vos achats. Obtenez le montant de la taxe et le prix total TTC. Fonctionne pour tous les taux de taxation. Gratuit.',
  keywords: 'calculatrice taxe vente, calcul taxe, prix TTC, montant taxe, taux taxation, taxe sur les ventes',
  openGraph: { images: ['/api/og?title=Calculatrice%20Taxe%20de%20Vente&description=Calculez%20la%20taxe%20de%20vente%20sur%20vos%20achats.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Taxe de Vente',
  url: 'https://tools4free.site/fr/calculatrice-taxe-vente',
  description: 'Calculez la taxe de vente sur vos achats. Obtenez le montant de la taxe et le prix total TTC. Fonctionne pour tous les taux de taxation. Gratuit.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
