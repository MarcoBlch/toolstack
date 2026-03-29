import type { Metadata } from 'next'
import Client from '../../world-clock/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Horloge Mondiale — Heure Actuelle Partout dans le Monde Gratuit',
  description: 'Horloge mondiale gratuite affichant l\'heure actuelle à New York, Londres, Tokyo, Paris, Sydney et plus de 50 villes. Indicateur jour/nuit. En direct.',
  keywords: 'horloge mondiale, heure actuelle, fuseau horaire, heure à Paris, heure à New York, heure internationale',
  alternates: getAlternates('/world-clock'),
  openGraph: { images: ['/api/og?title=Horloge%20Mondiale&description=Heure%20en%20direct%20dans%20plus%20de%2050%20villes.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Horloge Mondiale',
  url: 'https://tools4free.site/fr/horloge-mondiale',
  description: 'Horloge mondiale gratuite affichant l\'heure actuelle en direct dans plus de 50 villes.',
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
