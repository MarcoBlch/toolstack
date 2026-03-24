import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de IMC — Índice de Masa Corporal Gratis',
  description: 'Calcula tu IMC (Índice de Masa Corporal). Métrico e imperial. Categoría de peso y rango saludable. Gratis.',
  keywords: 'calculadora imc, calcular imc, índice masa corporal, imc mujer, imc hombre, peso ideal',
}

export default function Page() {
  return <Client />
}
