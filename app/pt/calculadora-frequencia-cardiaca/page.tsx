import type { Metadata } from 'next'
import Client from '../../heart-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Frequência Cardíaca Grátis',
  description: 'Calculadora de zonas de frequência cardíaca grátis. Zonas de queima de gordura, cardio e VO2 máx. Métodos Karvonen e simples.',
  keywords: 'frequência cardíaca, zonas cardíacas, zona queima gordura, zona cardio, VO2 máx, método Karvonen, FC máxima',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Frequ%C3%AAncia%20Card%C3%ADaca&description=Zonas%20de%20queima%20de%20gordura%2C%20cardio%20e%20VO2%20m%C3%A1x.%20M%C3%A9todos%20Karvonen%20e%20simples'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Frequência Cardíaca',
  url: 'https://tools4free.site/pt/calculadora-frequencia-cardiaca',
  description: 'Calculadora de zonas de frequência cardíaca grátis. Zonas de queima de gordura, cardio e VO2 máx. Métodos Karvonen e simples.',
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
