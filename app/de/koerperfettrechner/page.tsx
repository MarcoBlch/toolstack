import type { Metadata } from 'next'
import Client from '../../body-fat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/body-fat-calculator'),
  title: 'Körperfettrechner — US Navy Methode Kostenlos',
  description: 'Kostenloser Körperfettrechner. US Navy Methode. Berechne deinen Körperfettanteil, Fettmasse und Magermasse.',
  keywords: 'Körperfettrechner, Körperfettanteil, US Navy Methode, Fettmasse, Magermasse, Körperzusammensetzung',
  openGraph: { images: ['/api/og?title=K%C3%B6rperfettrechner&description=US%20Navy%20Methode.%20Berechne%20deinen%20K%C3%B6rperfettanteil%2C%20Fettmasse%20und%20Magermasse'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Körperfettrechner',
  url: 'https://tools4free.site/de/koerperfettrechner',
  description: 'Kostenloser Körperfettrechner. US Navy Methode. Berechne deinen Körperfettanteil, Fettmasse und Magermasse.',
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
