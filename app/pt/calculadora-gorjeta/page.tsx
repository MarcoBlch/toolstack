import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Gorjeta — Calcular Gorjeta e Dividir Conta',
  description: 'Calcule a gorjeta e divida a conta facilmente. Percentuais rápidos, divisão entre pessoas. Grátis.',
  keywords: 'calculadora gorjeta, calcular gorjeta, dividir conta, gorjeta restaurante, quanto dar de gorjeta',
}

export default function Page() {
  return <Client />
}
