import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Simulateur de Retraite — Calculez votre Épargne Retraite Gratuit',
  description: 'Planifiez votre retraite. Combien épargner par mois, projection de revenus, durée du capital. Gratuit.',
  keywords: 'simulateur retraite, calcul retraite, épargne retraite, planifier retraite, combien épargner pour la retraite',
  openGraph: { images: ['/api/og?title=Simulateur%20de%20Retraite&description=Planifiez%20votre%20retraite.%20Combien%20%C3%A9pargner%20par%20mois%2C%20projection%20de%20revenus%2C%20dur%C3%A9e%20du%20capital.%20Gratui'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Simulateur de Retraite',
  url: 'https://tools4free.site/fr/simulateur-retraite',
  description: 'Planifiez votre retraite. Combien épargner par mois, projection de revenus, durée du capital. Gratuit.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
