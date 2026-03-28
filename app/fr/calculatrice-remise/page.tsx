import type { Metadata } from 'next'
import Client from '../../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Remise — Calculer Réductions et Promotions Gratuit',
  alternates: getAlternates('/discount-calculator'),
  description: 'Calculez facilement les remises, réductions et promotions. Obtenez le prix final après remise, le montant économisé et le pourcentage de réduction. Gratuit.',
  keywords: 'calculatrice remise, calcul réduction, calculer promotion, pourcentage remise, prix après remise, calcul soldes',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Remise&description=Calculez%20facilement%20les%20remises%2C%20r%C3%A9ductions%20et%20promotions.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Remise',
  url: 'https://tools4free.site/fr/calculatrice-remise',
  description: 'Calculez facilement les remises, réductions et promotions. Obtenez le prix final après remise, le montant économisé et le pourcentage de réduction. Gratuit.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
