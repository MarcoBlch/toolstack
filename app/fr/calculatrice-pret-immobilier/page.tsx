import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculatrice de Prêt Immobilier — Simulateur de Mensualités Gratuit',
  description: 'Calculez vos mensualités de prêt immobilier, le coût total des intérêts et le tableau d\'amortissement. Simulateur gratuit, sans inscription.',
  keywords: 'calculatrice prêt immobilier, simulateur prêt immobilier, calcul mensualité, simulation crédit immobilier, tableau amortissement',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Pr%C3%AAt%20Immobilier&description=Calculez%20vos%20mensualit%C3%A9s%20de%20pr%C3%AAt%20immobilier%2C%20le%20co%C3%BBt%20total%20des%20int%C3%A9r%C3%AAts%20et%20le%20tableau%20d%5C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Prêt Immobilier',
  url: 'https://tools4free.site/fr/calculatrice-pret-immobilier',
  description: "Calculez vos mensualités de prêt immobilier, le coût total des intérêts et le tableau d'amortissement. Gratuit.",
  category: 'FinanceApplication',
})

export default function CalculatricePretPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MortgageClient />
    </>
  )
}
