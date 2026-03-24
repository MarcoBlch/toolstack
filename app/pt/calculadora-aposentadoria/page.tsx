import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Aposentadoria — Planeje sua Aposentadoria Grátis',
  description: 'Planeje sua aposentadoria. Quanto poupar por mês, projeção de renda, duração do capital. Grátis.',
  keywords: 'calculadora aposentadoria, planejar aposentadoria, poupança aposentadoria, quanto poupar para aposentar, simulador aposentadoria',
}

export default function Page() {
  return <Client />
}
