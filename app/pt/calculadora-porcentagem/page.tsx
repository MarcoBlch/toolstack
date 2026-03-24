import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Porcentagem — Quanto é X% de Y? Grátis',
  description: 'Calcule porcentagens facilmente. Quanto é X% de Y? Variação percentual, desconto. Calculadora grátis.',
  keywords: 'calculadora porcentagem, calcular porcentagem, quanto é 20 de 500, porcentagem de desconto, variação percentual',
}

export default function Page() {
  return <Client />
}
