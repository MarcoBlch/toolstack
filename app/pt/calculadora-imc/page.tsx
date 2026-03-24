import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de IMC — Índice de Massa Corporal Grátis',
  description: 'Calcule seu IMC (Índice de Massa Corporal). Métrico e imperial. Categoria de peso e faixa saudável. Grátis.',
  keywords: 'calculadora imc, calcular imc, índice massa corporal, imc mulher, imc homem, peso ideal',
}

export default function Page() {
  return <Client />
}
