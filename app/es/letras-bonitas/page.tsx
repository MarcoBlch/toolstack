import type { Metadata } from 'next'
import Client from '../../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador de Letras Bonitas — Fuentes Instagram Gratis',
  description: 'Convierte tu texto en 20+ estilos Unicode — negrita, cursiva, burbujas y más. Copia y pega en cualquier lugar. Gratis, sin registro.',
  keywords: 'letras bonitas, generador letras, fuentes instagram, letras elegantes, conversor fuentes',
  openGraph: { images: ['/api/og?title=Generador%20de%20Letras%20Bonitas&description=Convierte%20tu%20texto%20en%2020%2B%20estilos%20Unicode%20%E2%80%94%20negrita%2C%20cursiva%2C%20burbujas%20y%20m%C3%A1s.%20Copia%20y%20pega%20en%20cualqu'] },
  alternates: getAlternates('/fancy-text'),
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Letras Bonitas',
  url: 'https://tools4free.site/es/letras-bonitas',
  description: 'Convierte tu texto en 20+ estilos Unicode — negrita, cursiva, burbujas y más. Copia y pega en cualquier lugar. Gratis, sin registro.',
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
