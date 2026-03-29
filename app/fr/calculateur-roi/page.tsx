import type { Metadata } from 'next'
import Client from '../../roi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur ROI — Retour sur Investissement Gratuit',
  alternates: getAlternates('/roi-calculator'),
  description: 'Calculez votre retour sur investissement (ROI). Analysez la rentabilité de vos investissements et comparez différentes opportunités. Gratuit.',
  keywords: 'calculateur roi, retour sur investissement, calcul roi, rentabilité investissement, rendement, analyse investissement',
  openGraph: { images: ['/api/og?title=Calculateur%20ROI&description=Calculez%20votre%20retour%20sur%20investissement%20(ROI).%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur ROI',
  url: 'https://tools4free.site/fr/calculateur-roi',
  description: 'Calculez votre retour sur investissement (ROI). Analysez la rentabilité de vos investissements et comparez différentes opportunités. Gratuit.',
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
