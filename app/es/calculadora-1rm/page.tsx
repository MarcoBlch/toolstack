import type { Metadata } from 'next'
import Client from '../../one-rep-max/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora 1RM — Repetición Máxima Gratis',
  description: 'Calculadora de 1RM gratis. Estima tu repetición máxima con las fórmulas Epley, Brzycki y otras. Tabla de porcentajes para entrenamiento.',
  keywords: '1RM, calculadora 1RM, repetición máxima, carga máxima, fórmula Epley, fórmula Brzycki, musculación',
  openGraph: { images: ['/api/og?title=Calculadora%201RM&description=Estima%20tu%20repetici%C3%B3n%20m%C3%A1xima%20con%20las%20f%C3%B3rmulas%20Epley%2C%20Brzycki%20y%20otras'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora 1RM',
  url: 'https://tools4free.site/es/calculadora-1rm',
  description: 'Calculadora de 1RM gratis. Estima tu repetición máxima con las fórmulas Epley, Brzycki y otras. Tabla de porcentajes para entrenamiento.',
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
