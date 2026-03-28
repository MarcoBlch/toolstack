import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculatrice de Crédit — Simulateur de Prêt Personnel Gratuit',
  alternates: getAlternates('/loan-calculator'),
  description: 'Calculez vos mensualités de crédit, intérêts totaux et tableau d\'amortissement. Crédit conso, auto, étudiant. Gratuit.',
  keywords: 'calculatrice crédit, simulateur prêt personnel, calcul mensualité crédit, simulation crédit conso, crédit auto calcul',
  openGraph: { images: ['/api/og?title=Calculatrice%20de%20Cr%C3%A9dit&description=Calculez%20vos%20mensualit%C3%A9s%20de%20cr%C3%A9dit%2C%20int%C3%A9r%C3%AAts%20totaux%20et%20tableau%20d%5C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculatrice de Crédit',
  url: 'https://tools4free.site/fr/calculatrice-credit',
  description: "Calculez vos mensualités de crédit, intérêts totaux et tableau d'amortissement. Gratuit.",
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
