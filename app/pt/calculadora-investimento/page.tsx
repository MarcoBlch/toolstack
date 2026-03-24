import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Investimento — Juros Compostos Grátis',
  description: 'Simule o crescimento dos seus investimentos com juros compostos. Aportes mensais, rendimento anual. Grátis.',
  keywords: 'calculadora investimento, juros compostos, simulador investimento, calculadora poupança, rendimento investimento',
}

export default function Page() {
  return <Client />
}
