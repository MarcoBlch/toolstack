import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de IVA — Calcular IVA Online Gratis',
  description: 'Calcula el IVA fácilmente. Añade o quita el IVA de cualquier precio. Tasas preconfiguradas para España. Gratis, sin registro.',
  keywords: 'calculadora iva, calcular iva, iva 21, añadir iva, quitar iva, base imponible',
}

export default function CalculadoraIVAPage() {
  return <VATClient />
}
