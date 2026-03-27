import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de IMC — Índice de Masa Corporal Gratis',
  description: 'Calcula tu IMC (Índice de Masa Corporal). Métrico e imperial. Categoría de peso y rango saludable. Gratis.',
  keywords: 'calculadora imc, calcular imc, índice masa corporal, imc mujer, imc hombre, peso ideal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20IMC&description=Calcula%20tu%20IMC%20(%C3%8Dndice%20de%20Masa%20Corporal).%20M%C3%A9trico%20e%20imperial.%20Categor%C3%ADa%20de%20peso%20y%20rango%20saludable.%20G'] },
  alternates: getAlternates('/bmi-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de IMC',
  url: 'https://tools4free.site/es/calculadora-imc',
  description: 'Calcula tu IMC (Índice de Masa Corporal). Métrico e imperial. Categoría de peso y rango saludable. Gratis.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
