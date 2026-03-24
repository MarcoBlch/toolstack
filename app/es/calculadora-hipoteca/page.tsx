import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Hipoteca — Simulador de Préstamo Hipotecario Gratis',
  description: 'Calcula tu cuota mensual de hipoteca, intereses totales y tabla de amortización. Simulador gratuito, sin registro.',
  keywords: 'calculadora hipoteca, simulador hipoteca, calcular cuota hipoteca, simulador préstamo hipotecario, tabla amortización',
}

export default function CalculadoraHipotecaPage() {
  return <MortgageClient />
}
