import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Générateur Lorem Ipsum Gratuit',
  alternates: getAlternates('/lorem-generator'),
  description: 'Générez du texte Lorem Ipsum. Paragraphes, phrases ou nombre de mots exact. Copie en un clic. Gratuit, sans inscription.',
  keywords: 'générateur lorem ipsum, lorem ipsum, texte de remplissage, faux texte',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20Lorem%20Ipsum%20Gratuit&description=G%C3%A9n%C3%A9rez%20du%20texte%20Lorem%20Ipsum.%20Paragraphes%2C%20phrases%20ou%20nombre%20de%20mots%20exact.%20Copie%20en%20un%20clic.%20Gratui'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur Lorem Ipsum Gratuit',
  url: 'https://tools4free.site/fr/generateur-lorem-ipsum',
  description: 'Générez du texte Lorem Ipsum. Paragraphes, phrases ou nombre de mots exact. Copie en un clic. Gratuit, sans inscription.',
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
