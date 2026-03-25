import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculatrice de Pourboire — Calcul et Partage de l\'Addition',
  description: 'Calculez le pourboire et partagez l\'addition facilement. Pourcentages rapides, division entre convives. Gratuit.',
  keywords: 'calculatrice pourboire, calcul pourboire, partager addition, diviser addition, tip calculator français',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Pourboire&description=Calculez%20le%20pourboire%20et%20partagez%20l%5C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Pourboire',
  url: 'https://tools4free.site/fr/calculatrice-pourboire',
  description: "Calculez le pourboire et partagez l'addition facilement. Pourcentages rapides. Gratuit.",
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
