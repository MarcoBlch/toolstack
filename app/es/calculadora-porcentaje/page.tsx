import type { Metadata } from 'next'
import PercentageClient from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Porcentaje — ¿Cuánto es X% de Y? Gratis',
  description: 'Calcula porcentajes fácilmente. ¿Cuánto es X% de Y? Cambio porcentual, descuento. Calculadora gratis.',
  keywords: 'calculadora porcentaje, calcular porcentaje, cuánto es el 20 de 500, porcentaje de descuento, variación porcentual',
}

export default function CalculadoraPorcentajePage() {
  return <PercentageClient />
}
