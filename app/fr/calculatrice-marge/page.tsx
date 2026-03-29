import type { Metadata } from 'next'
import Client from '../../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Marge — Calculer Marge Bénéficiaire Gratuit',
  alternates: getAlternates('/profit-margin-calculator'),
  description: 'Calculez votre marge bénéficiaire, marge brute et marge nette. Déterminez le prix de vente optimal pour maximiser vos profits. Gratuit.',
  keywords: 'calculatrice marge, marge bénéficiaire, calcul marge brute, marge nette, taux de marge, calcul profit',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Marge&description=Calculez%20votre%20marge%20b%C3%A9n%C3%A9ficiaire%2C%20marge%20brute%20et%20marge%20nette.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Marge',
  url: 'https://tools4free.site/fr/calculatrice-marge',
  description: 'Calculez votre marge bénéficiaire, marge brute et marge nette. Déterminez le prix de vente optimal pour maximiser vos profits. Gratuit.',
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
