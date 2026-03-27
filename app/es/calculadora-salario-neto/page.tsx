import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora Salario Neto — Bruto a Neto Gratis',
  description: 'Convierte tu salario bruto a neto. Impuestos, seguridad social, tasa efectiva. Simulador para España, USA, UK. Gratis.',
  keywords: 'calculadora salario neto, salario bruto a neto, calcular sueldo neto, simulador salario, sueldo neto españa',
  openGraph: { images: ['/api/og?title=Calculadora%20Salario%20Neto&description=Convierte%20tu%20salario%20bruto%20a%20neto.%20Impuestos%2C%20seguridad%20social%2C%20tasa%20efectiva.%20Simulador%20para%20Espa%C3%B1a'] },
  alternates: getAlternates('/salary-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora Salario Neto',
  url: 'https://tools4free.site/es/calculadora-salario-neto',
  description: 'Convierte tu salario bruto a neto. Impuestos, seguridad social, tasa efectiva. Simulador para España, USA, UK. Gratis.',
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
