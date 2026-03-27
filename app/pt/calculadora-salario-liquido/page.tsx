import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/salary-calculator'),
  title: 'Calculadora Salário Líquido — Bruto para Líquido Grátis',
  description: 'Converta seu salário bruto em líquido. Impostos, INSS, taxa efetiva. Simulador grátis, sem cadastro.',
  keywords: 'calculadora salário líquido, salário bruto líquido, calcular salário líquido, simulador salário, desconto INSS',
  openGraph: { images: ['/api/og?title=Calculadora%20Sal%C3%A1rio%20L%C3%ADquido&description=Converta%20seu%20sal%C3%A1rio%20bruto%20em%20l%C3%ADquido.%20Impostos%2C%20INSS%2C%20taxa%20efetiva.%20Simulador%20gr%C3%A1tis%2C%20sem%20cadastro.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora Salário Líquido',
  url: 'https://tools4free.site/pt/calculadora-salario-liquido',
  description: 'Converta seu salário bruto em líquido. Impostos, INSS, taxa efetiva. Simulador grátis, sem cadastro.',
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
