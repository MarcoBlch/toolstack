import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora Salario Neto — Bruto a Neto Gratis',
  description: 'Convierte tu salario bruto a neto. Impuestos, seguridad social, tasa efectiva. Simulador para España, USA, UK. Gratis.',
  keywords: 'calculadora salario neto, salario bruto a neto, calcular sueldo neto, simulador salario, sueldo neto españa',
}

export default function Page() {
  return <Client />
}
