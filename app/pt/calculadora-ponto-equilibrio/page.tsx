import type { Metadata } from 'next'
import Client from '../../break-even-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Ponto de Equilíbrio Grátis',
  alternates: getAlternates('/break-even-calculator'),
  description: 'Calcule seu ponto de equilíbrio. Determine o volume de vendas necessário para cobrir seus custos fixos e variáveis. Grátis.',
  keywords: 'calculadora ponto equilíbrio, break even, ponto de equilíbrio, custos fixos, custos variáveis, limiar rentabilidade',
  openGraph: { images: ['/api/og?title=Calculadora%20Ponto%20Equil%C3%ADbrio&description=Calcule%20seu%20ponto%20de%20equil%C3%ADbrio%20empresarial.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Ponto de Equilíbrio',
  url: 'https://tools4free.site/pt/calculadora-ponto-equilibrio',
  description: 'Calcule seu ponto de equilíbrio. Determine o volume de vendas necessário para cobrir seus custos fixos e variáveis. Grátis.',
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
