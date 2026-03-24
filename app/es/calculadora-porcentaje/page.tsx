import type { Metadata } from 'next'
import PercentageClient from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Porcentaje — ¿Cuánto es X% de Y?',
  description: 'Calcula porcentajes al instante. ¿Cuánto es X% de Y? Cambio porcentual, diferencia. Tres modos. Gratis, sin registro.',
  keywords: 'calculadora porcentaje, calcular porcentaje, cuanto es el porcentaje, porcentaje de descuento',
}

export default function CalculadoraPorcentajePage() {
  return <PercentageClient />
}
