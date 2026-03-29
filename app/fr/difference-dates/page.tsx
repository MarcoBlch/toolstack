import type { Metadata } from 'next'
import Client from '../../date-difference/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur Différence entre Dates Gratuit',
  description: 'Calculez la différence exacte entre deux dates en jours, semaines, mois et années. Inclut les jours ouvrés. Gratuit, aucune inscription.',
  keywords: 'différence entre dates, calculateur dates, jours entre dates, semaines entre dates, jours ouvrés',
  alternates: getAlternates('/date-difference'),
  openGraph: { images: ['/api/og?title=Diff%C3%A9rence%20de%20Dates&description=Calculez%20jours%2C%20semaines%2C%20mois%20entre%20deux%20dates.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur Différence de Dates',
  url: 'https://tools4free.site/fr/difference-dates',
  description: 'Calculez la différence exacte entre deux dates en jours, semaines, mois et années.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
