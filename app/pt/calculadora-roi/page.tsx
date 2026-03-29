import type { Metadata } from 'next'
import Client from '../../roi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora ROI — Retorno sobre Investimento Grátis',
  alternates: getAlternates('/roi-calculator'),
  description: 'Calcule seu retorno sobre investimento (ROI). Analise a rentabilidade dos seus investimentos e compare diferentes oportunidades. Grátis.',
  keywords: 'calculadora roi, retorno sobre investimento, calcular roi, rentabilidade investimento, rendimento, análise investimento',
  openGraph: { images: ['/api/og?title=Calculadora%20ROI&description=Calcule%20seu%20retorno%20sobre%20investimento%20(ROI).%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora ROI',
  url: 'https://tools4free.site/pt/calculadora-roi',
  description: 'Calcule seu retorno sobre investimento (ROI). Analise a rentabilidade dos seus investimentos e compare diferentes oportunidades. Grátis.',
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
