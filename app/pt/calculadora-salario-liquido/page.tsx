import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora Salário Líquido — Bruto para Líquido Grátis',
  description: 'Converta seu salário bruto em líquido. Impostos, INSS, taxa efetiva. Simulador grátis, sem cadastro.',
  keywords: 'calculadora salário líquido, salário bruto líquido, calcular salário líquido, simulador salário, desconto INSS',
}

export default function Page() {
  return <Client />
}
