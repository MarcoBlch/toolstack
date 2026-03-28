import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/unit-converter'),
  title: 'Conversor de Unidades Grátis Online',
  description: 'Converta comprimento, peso, temperatura, volume e mais. 8 categorias de conversão. Grátis, sem cadastro.',
  keywords: 'conversor unidades, conversão unidades, kg para libras, cm para polegadas, celsius fahrenheit',
  openGraph: { images: ['/api/og?title=Conversor%20de%20Unidades%20Gr%C3%A1tis%20Online&description=Converta%20comprimento%2C%20peso%2C%20temperatura%2C%20volume%20e%20mais.%208%20categorias%20de%20convers%C3%A3o.%20Gr%C3%A1tis%2C%20sem%20cadas'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Conversor de Unidades Grátis Online',
  url: 'https://tools4free.site/pt/conversor-unidades',
  description: 'Converta comprimento, peso, temperatura, volume e mais. 8 categorias de conversão. Grátis, sem cadastro.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
