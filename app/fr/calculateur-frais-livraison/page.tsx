import type { Metadata } from 'next'
import Client from '../../shipping-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur de Frais de Livraison Gratuit',
  alternates: getAlternates('/shipping-calculator'),
  description: 'Estimez les frais de livraison et d\'expédition. Comparez les coûts d\'envoi selon le poids, les dimensions et la destination. Gratuit.',
  keywords: 'calculateur frais livraison, frais expédition, coût envoi colis, tarif livraison, estimation frais de port, calcul transport',
  openGraph: { images: ['/api/og?title=Calculateur%20Frais%20Livraison&description=Estimez%20les%20frais%20de%20livraison%20et%20d%27exp%C3%A9dition.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur de Frais de Livraison',
  url: 'https://tools4free.site/fr/calculateur-frais-livraison',
  description: 'Estimez les frais de livraison et d\'expédition. Comparez les coûts d\'envoi selon le poids, les dimensions et la destination. Gratuit.',
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
