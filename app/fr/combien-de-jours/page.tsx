import type { Metadata } from 'next'
import Client from '../../days-until/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Combien de Jours Avant Noël ? Calculateur Gratuit',
  description: 'Combien de jours avant Noël, Nouvel An, Halloween, Pâques ou toute date ? Calculateur de jours gratuit avec jours ouvrés. Résultat instantané.',
  keywords: 'combien de jours avant Noël, jours avant Nouvel An, calculateur jours, combien de jours avant',
  alternates: getAlternates('/days-until'),
  openGraph: { images: ['/api/og?title=Combien%20de%20Jours&description=Jours%20avant%20No%C3%ABl%2C%20Nouvel%20An%2C%20Halloween%20et%20plus.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Combien de Jours',
  url: 'https://tools4free.site/fr/combien-de-jours',
  description: 'Combien de jours avant Noël, Nouvel An, Halloween ou toute date personnalisée.',
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
