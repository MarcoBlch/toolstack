import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Financiamento Imobiliário — Simulador Grátis',
  description: 'Calcule suas parcelas de financiamento imobiliário, juros totais e tabela de amortização. Simulador gratuito, sem cadastro.',
  keywords: 'calculadora financiamento, simulador financiamento imobiliário, calcular parcela, simulador de crédito, tabela amortização',
}

export default function Page() {
  return <Client />
}
