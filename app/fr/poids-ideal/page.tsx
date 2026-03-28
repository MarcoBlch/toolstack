import type { Metadata } from 'next'
import Client from '../../ideal-weight/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calcul du Poids Idéal — 4 Formules Gratuit',
  alternates: getAlternates('/ideal-weight'),
  description: 'Calcul du poids idéal gratuit. Trouvez votre poids idéal avec les formules Devine, Robinson, Miller, Hamwi. Fourchette de poids santé selon votre taille.',
  keywords: 'poids idéal, calcul poids idéal, poids santé, formule Devine, poids pour ma taille, IMC normal',
  openGraph: { images: ['/api/og?title=Calcul%20du%20Poids%20Id%C3%A9al&description=Trouvez%20votre%20poids%20id%C3%A9al%20avec%20les%20formules%20Devine%2C%20Robinson%2C%20Miller%2C%20Hamwi'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul du Poids Idéal',
  url: 'https://tools4free.site/fr/poids-ideal',
  description: 'Calcul du poids idéal gratuit. Trouvez votre poids idéal avec les formules Devine, Robinson, Miller, Hamwi. Fourchette de poids santé selon votre taille.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
