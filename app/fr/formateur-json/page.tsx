import type { Metadata } from 'next'
import Client from '../../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Formateur JSON en Ligne Gratuit',
  alternates: getAlternates('/json-formatter'),
  description: 'Formatez, validez et minifiez du JSON instantanément. Coloration syntaxique et détection des erreurs. Gratuit, sans inscription.',
  keywords: 'formateur json, formatter json, validateur json, json en ligne, beautifier json',
  openGraph: { images: ['/api/og?title=Formateur%20JSON%20en%20Ligne%20Gratuit&description=Formatez%2C%20validez%20et%20minifiez%20du%20JSON%20instantan%C3%A9ment.%20Coloration%20syntaxique%20et%20d%C3%A9tection%20des%20erreurs'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Formateur JSON en Ligne Gratuit',
  url: 'https://tools4free.site/fr/formateur-json',
  description: 'Formatez, validez et minifiez du JSON instantanément. Coloration syntaxique et détection des erreurs. Gratuit, sans inscription.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
