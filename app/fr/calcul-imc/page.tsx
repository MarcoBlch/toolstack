import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul IMC — Calculatrice d\'Indice de Masse Corporelle Gratuit',
  description: 'Calculez votre IMC (Indice de Masse Corporelle). Métrique et impérial. Catégorie de poids et plage saine. Gratuit.',
  keywords: 'calcul imc, calculatrice imc, indice masse corporelle, imc femme, imc homme, calculer son imc',
  openGraph: { images: ['/api/og?title=Calcul%20IMC&description=Calculez%20votre%20IMC%20(Indice%20de%20Masse%20Corporelle).%20M%C3%A9trique%20et%20imp%C3%A9rial.%20Cat%C3%A9gorie%20de%20poids%20et%20plage%20s'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul IMC',
  url: 'https://tools4free.site/fr/calcul-imc',
  description: 'Calculez votre IMC (Indice de Masse Corporelle). Métrique et impérial. Catégorie de poids et plage saine. Gratuit.',
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
