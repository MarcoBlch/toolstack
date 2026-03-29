import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador Lorem Ipsum Gratis',
  description: 'Genera texto Lorem Ipsum. Párrafos, frases o número exacto de palabras. Copia con un clic. Gratis, sin registro.',
  keywords: 'generador lorem ipsum, lorem ipsum, texto de relleno, texto ficticio',
  openGraph: { images: ['/api/og?title=Generador%20Lorem%20Ipsum%20Gratis&description=Genera%20texto%20Lorem%20Ipsum.%20P%C3%A1rrafos%2C%20frases%20o%20n%C3%BAmero%20exacto%20de%20palabras.%20Copia%20con%20un%20clic.%20Gratis%2C%20s'] },
  alternates: getAlternates('/lorem-generator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Generador Lorem Ipsum Gratis',
  url: 'https://tools4free.site/es/generador-lorem',
  description: 'Genera texto Lorem Ipsum. Párrafos, frases o número exacto de palabras. Copia con un clic. Gratis, sin registro.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
