import type { Metadata } from 'next'
import Client from '../../markup-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Markup Grátis',
  alternates: getAlternates('/markup-calculator'),
  description: 'Calcule o markup e o preço de venda a partir do custo. Determine a porcentagem de markup ideal para o seu negócio. Grátis.',
  keywords: 'calculadora markup, calcular preço de venda, markup porcentagem, margem comercial, custo mais margem, índice markup',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Markup&description=Calcule%20o%20markup%20e%20o%20pre%C3%A7o%20de%20venda%20a%20partir%20do%20custo.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Markup',
  url: 'https://tools4free.site/pt/calculadora-markup',
  description: 'Calcule o markup e o preço de venda a partir do custo. Determine a porcentagem de markup ideal para o seu negócio. Grátis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
