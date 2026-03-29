import type { Metadata } from 'next'
import Client from '../../age-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Idade — Quantos Anos Tenho? Grátis',
  description: 'Calculadora de idade gratuita. Calcule sua idade exata em anos, meses, dias e horas. Signo zodiacal, zodíaco chinês e contagem regressiva até seu próximo aniversário.',
  keywords: 'calculadora de idade, quantos anos tenho, calcular idade, signo zodiacal, idade em dias, aniversário',
  alternates: getAlternates('/age-calculator'),
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Idade&description=Idade%20exata%20em%20anos%2C%20meses%2C%20dias.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Idade',
  url: 'https://tools4free.site/pt/calculadora-idade',
  description: 'Calculadora de idade gratuita. Calcule sua idade exata em anos, meses, dias e horas.',
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
