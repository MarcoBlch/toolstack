import type { Metadata } from 'next'
import Client from '../../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Margem de Lucro Grátis',
  alternates: getAlternates('/profit-margin-calculator'),
  description: 'Calcule sua margem de lucro, margem bruta e margem líquida. Determine o preço de venda ideal para maximizar seus lucros. Grátis.',
  keywords: 'calculadora margem lucro, margem de lucro, margem bruta, margem líquida, calcular rentabilidade, preço de venda',
  openGraph: { images: ['/api/og?title=Calculadora%20Margem%20Lucro&description=Calcule%20sua%20margem%20de%20lucro%2C%20margem%20bruta%20e%20l%C3%ADquida.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Margem de Lucro',
  url: 'https://tools4free.site/pt/calculadora-margem-lucro',
  description: 'Calcule sua margem de lucro, margem bruta e margem líquida. Determine o preço de venda ideal para maximizar seus lucros. Grátis.',
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
