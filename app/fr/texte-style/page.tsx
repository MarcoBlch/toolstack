import type { Metadata } from 'next'
import Client from '../../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Générateur de Texte Stylé — Polices Instagram Gratuit',
  description: 'Transformez votre texte en 20+ styles Unicode — gras, italique, cursif, bulles et plus. Copiez-collez partout. Gratuit, sans inscription.',
  keywords: 'texte stylé, générateur texte, polices instagram, texte fantaisie, convertisseur police',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20de%20Texte%20Styl%C3%A9&description=Transformez%20votre%20texte%20en%2020%2B%20styles%20Unicode%20%E2%80%94%20gras%2C%20italique%2C%20cursif%2C%20bulles%20et%20plus.%20Copiez-colle'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Texte Stylé',
  url: 'https://tools4free.site/fr/texte-style',
  description: 'Transformez votre texte en 20+ styles Unicode — gras, italique, cursif, bulles et plus. Copiez-collez partout. Gratuit, sans inscription.',
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
