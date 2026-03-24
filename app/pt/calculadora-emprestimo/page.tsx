import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Empréstimo — Simulador de Crédito Grátis',
  description: 'Calcule suas parcelas, juros totais e tabela de amortização. Empréstimo pessoal, auto, estudantil. Grátis.',
  keywords: 'calculadora empréstimo, simulador empréstimo, calcular parcela empréstimo, simulador crédito pessoal',
}

export default function Page() {
  return <Client />
}
