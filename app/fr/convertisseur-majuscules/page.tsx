import type { Metadata } from 'next'
import Client from '../../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Convertisseur Majuscules Minuscules Gratuit',
  description: 'Convertissez entre MAJUSCULES, minuscules, Titre, camelCase, snake_case et plus. Gratuit, sans inscription.',
  keywords: 'convertisseur majuscules, majuscules minuscules, convertir casse, changeur casse',
  openGraph: { images: ['/api/og?title=Convertisseur%20Majuscules%20Minuscules%20Gratuit&description=Convertissez%20entre%20MAJUSCULES%2C%20minuscules%2C%20Titre%2C%20camelCase%2C%20snake_case%20et%20plus.%20Gratuit%2C%20sans%20inscr'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertisseur Majuscules Minuscules Gratuit',
  url: 'https://tools4free.site/fr/convertisseur-majuscules',
  description: 'Convertissez entre MAJUSCULES, minuscules, Titre, camelCase, snake_case et plus. Gratuit, sans inscription.',
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
