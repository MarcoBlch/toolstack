import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Préstamo — Simulador de Crédito Gratis',
  description: 'Calcula tus cuotas mensuales, intereses totales y tabla de amortización. Préstamo personal, auto, estudiantil. Gratis.',
  keywords: 'calculadora préstamo, simulador crédito, calcular cuota préstamo, simulador préstamo personal, tabla amortización',
}

export default function Page() {
  return <Client />
}
