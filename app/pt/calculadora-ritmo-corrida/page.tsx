import type { Metadata } from 'next'
import Client from '../../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Ritmo de Corrida Grátis',
  description: 'Calculadora de ritmo de corrida grátis. Calcule seu ritmo, tempo ou distância para qualquer corrida. Tempos de passagem para 5K, 10K, meia maratona, maratona.',
  keywords: 'ritmo corrida, calculadora ritmo, pace running, tempos de passagem, 5K, 10K, meia maratona, maratona, corrida',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Ritmo%20de%20Corrida&description=Calcule%20seu%20ritmo%2C%20tempo%20ou%20dist%C3%A2ncia%20para%20qualquer%20corrida.%20Tempos%20de%20passagem'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Ritmo de Corrida',
  url: 'https://tools4free.site/pt/calculadora-ritmo-corrida',
  description: 'Calculadora de ritmo de corrida grátis. Calcule seu ritmo, tempo ou distância para qualquer corrida. Tempos de passagem para 5K, 10K, meia maratona, maratona.',
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
