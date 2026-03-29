import type { Metadata } from 'next'
import Client from '../../roi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora ROI — Retorno de Inversión Gratis',
  alternates: getAlternates('/roi-calculator'),
  description: 'Calcula tu retorno de inversión (ROI). Analiza la rentabilidad de tus inversiones y compara diferentes oportunidades. Gratis.',
  keywords: 'calculadora roi, retorno de inversión, calcular roi, rentabilidad inversión, rendimiento, análisis inversión',
  openGraph: { images: ['/api/og?title=Calculadora%20ROI&description=Calcula%20tu%20retorno%20de%20inversi%C3%B3n%20(ROI).%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora ROI',
  url: 'https://tools4free.site/es/calculadora-roi',
  description: 'Calcula tu retorno de inversión (ROI). Analiza la rentabilidad de tus inversiones y compara diferentes oportunidades. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
