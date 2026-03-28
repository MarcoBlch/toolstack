import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Pourcentage — Calcul de Pourcentage Gratuit',
  alternates: getAlternates('/percentage-calculator'),
  description: 'Calculez des pourcentages facilement. Combien fait X% de Y ? Variation en pourcentage. Calcul de remise. Gratuit.',
  keywords: 'calculatrice pourcentage, calcul pourcentage, pourcentage de, calcul remise, variation pourcentage, combien fait 20 de 500',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Pourcentage&description=Calculez%20des%20pourcentages%20facilement.%20Combien%20fait%20X%25%20de%20Y%20%3F%20Variation%20en%20pourcentage.%20Calcul%20de%20rem'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Pourcentage',
  url: 'https://tools4free.site/fr/calculatrice-pourcentage',
  description: 'Calculez des pourcentages facilement. Combien fait X% de Y ? Variation en pourcentage. Calcul de remise. Gratuit.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
