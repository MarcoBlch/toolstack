import type { Metadata } from 'next'
import Client from '../../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Generador de Contraseñas Seguras Gratis',
  description: 'Genera contraseñas seguras y aleatorias al instante. Cifrado criptográfico. Nunca almacenadas. Gratis, sin registro.',
  keywords: 'generador contraseñas, contraseña segura, contraseña aleatoria, crear contraseña',
  openGraph: { images: ['/api/og?title=Generador%20de%20Contrase%C3%B1as%20Seguras%20Gratis&description=Genera%20contrase%C3%B1as%20seguras%20y%20aleatorias%20al%20instante.%20Cifrado%20criptogr%C3%A1fico.%20Nunca%20almacenadas.%20Grati'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Contraseñas Seguras Gratis',
  url: 'https://tools4free.site/es/generador-contrasena',
  description: 'Genera contraseñas seguras y aleatorias al instante. Cifrado criptográfico. Nunca almacenadas. Gratis, sin registro.',
  category: 'SecurityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
