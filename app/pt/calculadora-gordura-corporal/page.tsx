import type { Metadata } from 'next'
import Client from '../../body-fat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/body-fat-calculator'),
  title: 'Calculadora de Gordura Corporal — Método US Navy Grátis',
  description: 'Calculadora de gordura corporal grátis. Método US Navy. Calcule seu percentual de gordura corporal, massa gorda e massa magra.',
  keywords: 'calculadora gordura corporal, percentual gordura, método US Navy, massa gorda, massa magra, composição corporal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Gordura%20Corporal&description=M%C3%A9todo%20US%20Navy.%20Calcule%20seu%20percentual%20de%20gordura%20corporal%2C%20massa%20gorda%20e%20massa%20magra'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Gordura Corporal',
  url: 'https://tools4free.site/pt/calculadora-gordura-corporal',
  description: 'Calculadora de gordura corporal grátis. Método US Navy. Calcule seu percentual de gordura corporal, massa gorda e massa magra.',
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
