import type { Metadata } from 'next'
import InvestmentClient from '../../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: "Simulateur d'Investissement — Calcul Intérêts Composés Gratuit",
  description: "Simulez la croissance de vos investissements avec les intérêts composés. Contribution mensuelle, rendement annuel. Gratuit.",
  keywords: 'simulateur investissement, calcul intérêts composés, simulateur placement, épargne composée, rendement investissement',
  openGraph: { images: ['/api/og?title=Simulateur%20d&description=Simulez%20la%20croissance%20de%20vos%20investissements%20avec%20les%20int%C3%A9r%C3%AAts%20compos%C3%A9s.%20Contribution%20mensuelle%2C%20ren'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Simulateur d',
  url: 'https://tools4free.site/fr/simulateur-investissement',
  description: 'Simulez la croissance de vos investissements avec les intérêts composés. Contribution mensuelle, rendement annuel. Gratuit.',
  category: 'FinanceApplication',
})

export default function SimulateurInvestissementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvestmentClient />
    </>
  )
}
