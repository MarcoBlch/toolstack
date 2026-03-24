import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Hipoteca — Simulador de Préstamo Gratis',
  description: 'Calcula tu cuota mensual de hipoteca, intereses totales y amortización. Simulador gratuito, sin registro.',
  keywords: 'calculadora hipoteca, simulador hipoteca, calcular cuota hipoteca, prestamo hipotecario calculadora',
}

export default function CalculadoraHipotecaPage() {
  return <MortgageClient />
}
