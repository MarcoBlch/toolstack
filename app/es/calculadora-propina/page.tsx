import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Propina — Calcular Propina y Dividir Cuenta',
  description: 'Calcula la propina y divide la cuenta fácilmente. Porcentajes rápidos, división entre comensales. Gratis.',
  keywords: 'calculadora propina, calcular propina, dividir cuenta, propina restaurante, cuanto dejar de propina',
}

export default function Page() {
  return <Client />
}
