import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador de Degradado CSS Gratis',
  description: 'Crea hermosos degradados CSS de forma visual. Elige colores, ajusta ángulos, copia el código CSS. Gratis.',
  keywords: 'generador degradado css, degradado css, gradient css, crear degradado',
  openGraph: { images: ['/api/og?title=Generador%20de%20Degradado%20CSS%20Gratis&description=Crea%20hermosos%20degradados%20CSS%20de%20forma%20visual.%20Elige%20colores%2C%20ajusta%20%C3%A1ngulos%2C%20copia%20el%20c%C3%B3digo%20CSS.%20Gr'] },
  alternates: getAlternates('/gradient-generator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Degradado CSS Gratis',
  url: 'https://tools4free.site/es/generador-degradado-css',
  description: 'Crea hermosos degradados CSS de forma visual. Elige colores, ajusta ángulos, copia el código CSS. Gratis.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
