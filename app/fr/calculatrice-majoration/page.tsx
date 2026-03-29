import type { Metadata } from 'next'
import Client from '../../markup-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Majoration — Calculer Prix de Vente Gratuit',
  alternates: getAlternates('/markup-calculator'),
  description: 'Calculez la majoration et le prix de vente à partir du coût. Déterminez le pourcentage de majoration optimal pour votre entreprise. Gratuit.',
  keywords: 'calculatrice majoration, calcul prix de vente, majoration pourcentage, markup, coefficient multiplicateur, marge commerciale',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Majoration&description=Calculez%20la%20majoration%20et%20le%20prix%20de%20vente%20%C3%A0%20partir%20du%20co%C3%BBt.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Majoration',
  url: 'https://tools4free.site/fr/calculatrice-majoration',
  description: 'Calculez la majoration et le prix de vente à partir du coût. Déterminez le pourcentage de majoration optimal pour votre entreprise. Gratuit.',
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
