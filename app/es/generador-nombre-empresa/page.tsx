import type { Metadata } from 'next'
import Client from '../../business-name-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador de Nombres de Empresa Gratis',
  alternates: getAlternates('/business-name-generator'),
  description: 'Genera nombres de empresa creativos y únicos. Encuentra el nombre perfecto para tu negocio, startup o marca. Gratis.',
  keywords: 'generador nombre empresa, nombres de negocio, nombre para empresa, nombre startup, nombre marca, ideas nombre empresa',
  openGraph: { images: ['/api/og?title=Generador%20Nombre%20Empresa&description=Genera%20nombres%20de%20empresa%20creativos%20y%20%C3%BAnicos.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Nombres de Empresa',
  url: 'https://tools4free.site/es/generador-nombre-empresa',
  description: 'Genera nombres de empresa creativos y únicos. Encuentra el nombre perfecto para tu negocio, startup o marca. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
