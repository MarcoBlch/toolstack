import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Jubilación — Planifica tu Retiro Gratis',
  description: 'Planifica tu jubilación. Cuánto ahorrar por mes, proyección de ingresos, duración del capital. Gratis.',
  keywords: 'calculadora jubilación, plan de retiro, ahorro jubilación, planificar jubilación, cuánto ahorrar para jubilarme',
}

export default function Page() {
  return <Client />
}
