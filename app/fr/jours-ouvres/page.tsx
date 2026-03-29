import type { Metadata } from 'next'
import Client from '../../work-days-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur Jours Ouvrés Gratuit',
  description: 'Calculez le nombre de jours ouvrés entre deux dates en excluant les weekends et les jours fériés. Ajoutez des jours ouvrés à une date. Jours fériés France inclus.',
  keywords: 'calculateur jours ouvrés, jours ouvrables entre dates, jours fériés France, délai jours ouvrés',
  alternates: getAlternates('/work-days-calculator'),
  openGraph: { images: ['/api/og?title=Calculateur%20Jours%20Ouv%C3%A9rs&description=Jours%20ouv%C3%A9rs%20entre%20deux%20dates.%20Jours%20f%C3%A9ri%C3%A9s%20inclus.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur Jours Ouvrés',
  url: 'https://tools4free.site/fr/jours-ouvres',
  description: 'Calculez le nombre de jours ouvrés entre deux dates en excluant les weekends et les jours fériés.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" defaultCountry="FR" />
    </>
  )
}
