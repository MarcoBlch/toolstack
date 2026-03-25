import type { Metadata } from 'next'
import Client from '../../body-fat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul de Masse Grasse — Méthode US Navy Gratuit',
  description: 'Calcul de masse grasse gratuit. Méthode US Navy. Calculez votre pourcentage de graisse corporelle, masse grasse et masse maigre.',
  keywords: 'calcul masse grasse, taux de graisse corporelle, méthode US Navy, masse grasse, masse maigre, composition corporelle',
  openGraph: { images: ['/api/og?title=Calcul%20de%20Masse%20Grasse&description=M%C3%A9thode%20US%20Navy.%20Calculez%20votre%20pourcentage%20de%20graisse%20corporelle%2C%20masse%20grasse%20et%20masse%20maigre'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul de Masse Grasse',
  url: 'https://tools4free.site/fr/calcul-masse-grasse',
  description: 'Calcul de masse grasse gratuit. Méthode US Navy. Calculez votre pourcentage de graisse corporelle, masse grasse et masse maigre.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
