import type { Metadata } from 'next'
import Client from '../../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Desconto — Calcular Descontos e Promoções Grátis',
  alternates: getAlternates('/discount-calculator'),
  description: 'Calcule descontos, promoções e ofertas facilmente. Obtenha o preço final com desconto, a economia e a porcentagem de desconto. Grátis.',
  keywords: 'calculadora desconto, calcular desconto, desconto porcentagem, preço com desconto, calcular promoção, ofertas',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Desconto&description=Calcule%20descontos%2C%20promo%C3%A7%C3%B5es%20e%20ofertas%20facilmente.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Desconto',
  url: 'https://tools4free.site/pt/calculadora-desconto',
  description: 'Calcule descontos, promoções e ofertas facilmente. Obtenha o preço final com desconto, a economia e a porcentagem de desconto. Grátis.',
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
