import type { Metadata } from 'next'
import SalaryClient from '../../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calcul Salaire Brut Net — Simulateur de Salaire Gratuit France',
  alternates: getAlternates('/salary-calculator'),
  description: 'Convertissez votre salaire brut en net. Charges sociales, impôts, taux effectif. Simulateur France, USA, UK. Gratuit.',
  keywords: 'salaire brut net, calcul salaire net, simulateur salaire, brut en net france, calcul charges salariales, salaire après impôts',
  openGraph: { images: ['/api/og?title=Calcul%20Salaire%20Brut%20Net&description=Convertissez%20votre%20salaire%20brut%20en%20net.%20Charges%20sociales%2C%20imp%C3%B4ts%2C%20taux%20effectif.%20Simulateur%20France%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul Salaire Brut Net',
  url: 'https://tools4free.site/fr/salaire-brut-net',
  description: 'Convertissez votre salaire brut en net. Charges sociales, impôts, taux effectif. Simulateur France, USA, UK. Gratuit.',
  category: 'FinanceApplication',
})

export default function SalaireBrutNetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalaryClient locale="fr" defaultCountry="FR" />
    </>
  )
}
