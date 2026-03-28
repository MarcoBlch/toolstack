import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/bmi-calculator'),
  title: 'Calculadora de IMC — Índice de Massa Corporal Grátis',
  description: 'Calcule seu IMC (Índice de Massa Corporal). Métrico e imperial. Categoria de peso e faixa saudável. Grátis.',
  keywords: 'calculadora imc, calcular imc, índice massa corporal, imc mulher, imc homem, peso ideal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20IMC&description=Calcule%20seu%20IMC%20(%C3%8Dndice%20de%20Massa%20Corporal).%20M%C3%A9trico%20e%20imperial.%20Categoria%20de%20peso%20e%20faixa%20saud%C3%A1vel.%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de IMC',
  url: 'https://tools4free.site/pt/calculadora-imc',
  description: 'Calcule seu IMC (Índice de Massa Corporal). Métrico e imperial. Categoria de peso e faixa saudável. Grátis.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
