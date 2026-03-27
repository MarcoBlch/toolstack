import type { Metadata } from 'next'
import Client from '../../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Contador de Palabras y Caracteres Gratis',
  description: 'Cuenta palabras, caracteres, frases y párrafos de tu texto. Tiempo de lectura y densidad de palabras clave. Gratis.',
  keywords: 'contador palabras, contador caracteres, contar palabras, número de palabras',
  openGraph: { images: ['/api/og?title=Contador%20de%20Palabras%20y%20Caracteres%20Gratis&description=Cuenta%20palabras%2C%20caracteres%2C%20frases%20y%20p%C3%A1rrafos%20de%20tu%20texto.%20Tiempo%20de%20lectura%20y%20densidad%20de%20palabras'] },
  alternates: getAlternates('/word-counter'),
}

const jsonLd = generateToolJsonLd({
  name: 'Contador de Palabras y Caracteres Gratis',
  url: 'https://tools4free.site/es/contador-palabras',
  description: 'Cuenta palabras, caracteres, frases y párrafos de tu texto. Tiempo de lectura y densidad de palabras clave. Gratis.',
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
