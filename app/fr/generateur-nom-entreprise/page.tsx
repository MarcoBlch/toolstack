import type { Metadata } from 'next'
import Client from '../../business-name-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Générateur de Nom d\'Entreprise Gratuit',
  alternates: getAlternates('/business-name-generator'),
  description: 'Générez des noms d\'entreprise créatifs et uniques. Trouvez le nom parfait pour votre société, startup ou marque. Gratuit.',
  keywords: 'générateur nom entreprise, nom de société, trouver nom entreprise, nom startup, nom marque, idée nom entreprise',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20Nom%20Entreprise&description=G%C3%A9n%C3%A9rez%20des%20noms%20d%27entreprise%20cr%C3%A9atifs%20et%20uniques.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Nom d\'Entreprise',
  url: 'https://tools4free.site/fr/generateur-nom-entreprise',
  description: 'Générez des noms d\'entreprise créatifs et uniques. Trouvez le nom parfait pour votre société, startup ou marque. Gratuit.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
