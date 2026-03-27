import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Propina — Calcular Propina y Dividir Cuenta',
  description: 'Calcula la propina y divide la cuenta fácilmente. Porcentajes rápidos, división entre comensales. Gratis.',
  keywords: 'calculadora propina, calcular propina, dividir cuenta, propina restaurante, cuanto dejar de propina',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Propina&description=Calcula%20la%20propina%20y%20divide%20la%20cuenta%20f%C3%A1cilmente.%20Porcentajes%20r%C3%A1pidos%2C%20divisi%C3%B3n%20entre%20comensales.%20Gr'] },
  alternates: getAlternates('/tip-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Propina',
  url: 'https://tools4free.site/es/calculadora-propina',
  description: 'Calcula la propina y divide la cuenta fácilmente. Porcentajes rápidos, división entre comensales. Gratis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
