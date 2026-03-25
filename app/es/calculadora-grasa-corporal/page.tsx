import type { Metadata } from 'next'
import Client from '../../body-fat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Grasa Corporal — Método US Navy Gratis',
  description: 'Calculadora de grasa corporal gratis. Método US Navy. Calcula tu porcentaje de grasa corporal, masa grasa y masa magra.',
  keywords: 'calculadora grasa corporal, porcentaje grasa, método US Navy, masa grasa, masa magra, composición corporal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Grasa%20Corporal&description=M%C3%A9todo%20US%20Navy.%20Calcula%20tu%20porcentaje%20de%20grasa%20corporal%2C%20masa%20grasa%20y%20masa%20magra'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Grasa Corporal',
  url: 'https://tools4free.site/es/calculadora-grasa-corporal',
  description: 'Calculadora de grasa corporal gratis. Método US Navy. Calcula tu porcentaje de grasa corporal, masa grasa y masa magra.',
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
