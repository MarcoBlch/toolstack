import type { Metadata } from 'next'
import Client from '../../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Formateador JSON Gratis Online',
  description: 'Formatea, valida y minifica JSON al instante. Resaltado de sintaxis y detección de errores. Gratis, sin registro.',
  keywords: 'formateador json, formatter json, validador json, json online, beautifier json',
  openGraph: { images: ['/api/og?title=Formateador%20JSON%20Gratis%20Online&description=Formatea%2C%20valida%20y%20minifica%20JSON%20al%20instante.%20Resaltado%20de%20sintaxis%20y%20detecci%C3%B3n%20de%20errores.%20Gratis%2C%20'] },
  alternates: getAlternates('/json-formatter'),
}

const jsonLd = generateToolJsonLd({
  name: 'Formateador JSON Gratis Online',
  url: 'https://tools4free.site/es/formateador-json',
  description: 'Formatea, valida y minifica JSON al instante. Resaltado de sintaxis y detección de errores. Gratis, sin registro.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
