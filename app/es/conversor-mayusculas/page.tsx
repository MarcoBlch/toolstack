import type { Metadata } from 'next'
import Client from '../../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Conversor Mayúsculas Minúsculas Gratis',
  description: 'Convierte entre MAYÚSCULAS, minúsculas, Título, camelCase, snake_case y más. Gratis, sin registro.',
  keywords: 'conversor mayúsculas, mayúsculas minúsculas, convertir mayúsculas, cambiar caja texto',
  openGraph: { images: ['/api/og?title=Conversor%20May%C3%BAsculas%20Min%C3%BAsculas%20Gratis&description=Convierte%20entre%20MAY%C3%9ASCULAS%2C%20min%C3%BAsculas%2C%20T%C3%ADtulo%2C%20camelCase%2C%20snake_case%20y%20m%C3%A1s.%20Gratis%2C%20sin%20registro.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Conversor Mayúsculas Minúsculas Gratis',
  url: 'https://tools4free.site/es/conversor-mayusculas',
  description: 'Convierte entre MAYÚSCULAS, minúsculas, Título, camelCase, snake_case y más. Gratis, sin registro.',
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
