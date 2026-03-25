import type { Metadata } from 'next'
import Client from '../../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Compteur de Mots et Caractères Gratuit',
  description: 'Comptez les mots, caractères, phrases et paragraphes de votre texte. Temps de lecture et densité de mots-clés. Gratuit.',
  keywords: 'compteur mots, compteur caractères, compter mots, nombre de mots',
  openGraph: { images: ['/api/og?title=Compteur%20de%20Mots%20et%20Caract%C3%A8res%20Gratuit&description=Comptez%20les%20mots%2C%20caract%C3%A8res%2C%20phrases%20et%20paragraphes%20de%20votre%20texte.%20Temps%20de%20lecture%20et%20densit%C3%A9%20de%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compteur de Mots et Caractères Gratuit',
  url: 'https://tools4free.site/fr/compteur-mots',
  description: 'Comptez les mots, caractères, phrases et paragraphes de votre texte. Temps de lecture et densité de mots-clés. Gratuit.',
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
