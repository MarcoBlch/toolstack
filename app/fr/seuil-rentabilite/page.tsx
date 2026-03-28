import type { Metadata } from 'next'
import Client from '../../break-even-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur Seuil de Rentabilité Gratuit',
  alternates: getAlternates('/break-even-calculator'),
  description: 'Calculez votre seuil de rentabilité. Déterminez le volume de ventes nécessaire pour couvrir vos coûts fixes et variables. Gratuit.',
  keywords: 'seuil de rentabilité, point mort, break even, calcul rentabilité, coûts fixes, coûts variables, volume ventes',
  openGraph: { images: ['/api/og?title=Seuil%20de%20Rentabilit%C3%A9&description=Calculez%20votre%20seuil%20de%20rentabilit%C3%A9%20et%20point%20mort.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur Seuil de Rentabilité',
  url: 'https://tools4free.site/fr/seuil-rentabilite',
  description: 'Calculez votre seuil de rentabilité. Déterminez le volume de ventes nécessaire pour couvrir vos coûts fixes et variables. Gratuit.',
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
