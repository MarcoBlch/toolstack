import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: "Convertisseur d'Unités Gratuit en Ligne",
  description: 'Convertissez longueur, poids, température, volume et plus. 8 catégories de conversion. Gratuit, sans inscription.',
  keywords: 'convertisseur unités, conversion unités, kg en lbs, cm en pouces, celsius fahrenheit',
  openGraph: { images: ['/api/og?title=Convertisseur%20d&description=Convertissez%20longueur%2C%20poids%2C%20temp%C3%A9rature%2C%20volume%20et%20plus.%208%20cat%C3%A9gories%20de%20conversion.%20Gratuit%2C%20sans'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertisseur d',
  url: 'https://tools4free.site/fr/convertisseur-unites',
  description: 'Convertissez longueur, poids, température, volume et plus. 8 catégories de conversion. Gratuit, sans inscription.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
