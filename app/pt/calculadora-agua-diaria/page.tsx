import type { Metadata } from 'next'
import Client from '../../water-intake/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/water-intake'),
  title: 'Calculadora de Água Diária Grátis',
  description: 'Calculadora de água diária grátis. Quanta água você deve beber por dia? Baseado no peso, nível de atividade e clima.',
  keywords: 'quanta água beber, calculadora água diária, hidratação, água por dia, necessidade de água, ingestão de água',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20%C3%81gua%20Di%C3%A1ria&description=Quanta%20%C3%A1gua%20voc%C3%AA%20deve%20beber%20por%20dia%3F%20Baseado%20no%20peso%2C%20n%C3%ADvel%20de%20atividade%20e%20clima'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Água Diária',
  url: 'https://tools4free.site/pt/calculadora-agua-diaria',
  description: 'Calculadora de água diária grátis. Quanta água você deve beber por dia? Baseado no peso, nível de atividade e clima.',
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
