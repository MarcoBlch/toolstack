import type { Metadata } from 'next'
import Client from '../../weeks-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur de Semaines entre Dates Gratuit',
  description: 'Calculez le nombre de semaines entre deux dates ou trouvez une date X semaines dans le futur. Gratuit, résultat instantané.',
  keywords: 'calculateur semaines, semaines entre dates, combien de semaines, ajouter semaines date',
  alternates: getAlternates('/weeks-calculator'),
  openGraph: { images: ['/api/og?title=Calculateur%20de%20Semaines&description=Semaines%20entre%20deux%20dates%20ou%20ajouter%20semaines.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur de Semaines',
  url: 'https://tools4free.site/fr/calculateur-semaines',
  description: 'Calculez le nombre de semaines entre deux dates ou trouvez une date X semaines dans le futur.',
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
