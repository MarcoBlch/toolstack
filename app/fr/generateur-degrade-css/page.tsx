import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Générateur de Dégradé CSS Gratuit',
  alternates: getAlternates('/gradient-generator'),
  description: 'Créez de magnifiques dégradés CSS visuellement. Choisissez les couleurs, ajustez les angles, copiez le code CSS. Gratuit.',
  keywords: 'générateur dégradé css, dégradé css, gradient css, créer dégradé',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20de%20D%C3%A9grad%C3%A9%20CSS%20Gratuit&description=Cr%C3%A9ez%20de%20magnifiques%20d%C3%A9grad%C3%A9s%20CSS%20visuellement.%20Choisissez%20les%20couleurs%2C%20ajustez%20les%20angles%2C%20copiez%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Dégradé CSS Gratuit',
  url: 'https://tools4free.site/fr/generateur-degrade-css',
  description: 'Créez de magnifiques dégradés CSS visuellement. Choisissez les couleurs, ajustez les angles, copiez le code CSS. Gratuit.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
