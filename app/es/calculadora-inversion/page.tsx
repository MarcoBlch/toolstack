import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Inversión — Interés Compuesto Gratis',
  description: 'Simula el crecimiento de tus inversiones con interés compuesto. Aportes mensuales, rendimiento anual. Gratis.',
  keywords: 'calculadora inversión, interés compuesto, simulador inversión, calculadora ahorro, rendimiento inversión',
}

export default function Page() {
  return <Client />
}
