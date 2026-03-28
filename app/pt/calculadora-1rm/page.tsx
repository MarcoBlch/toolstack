import type { Metadata } from 'next'
import Client from '../../one-rep-max/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/one-rep-max'),
  title: 'Calculadora 1RM — Repetição Máxima Grátis',
  description: 'Calculadora de 1RM grátis. Estime sua repetição máxima com as fórmulas Epley, Brzycki e outras. Tabela de porcentagens para treino.',
  keywords: '1RM, calculadora 1RM, repetição máxima, carga máxima, fórmula Epley, fórmula Brzycki, musculação',
  openGraph: { images: ['/api/og?title=Calculadora%201RM&description=Estime%20sua%20repeti%C3%A7%C3%A3o%20m%C3%A1xima%20com%20as%20f%C3%B3rmulas%20Epley%2C%20Brzycki%20e%20outras'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora 1RM',
  url: 'https://tools4free.site/pt/calculadora-1rm',
  description: 'Calculadora de 1RM grátis. Estime sua repetição máxima com as fórmulas Epley, Brzycki e outras. Tabela de porcentagens para treino.',
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
