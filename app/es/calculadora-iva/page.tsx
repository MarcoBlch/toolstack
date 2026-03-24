import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de IVA — Calcular IVA Online Gratis',
  description: 'Calcula el IVA fácilmente. Precio sin IVA a precio con IVA y viceversa. IVA España 21%, Alemania 19%. Gratis.',
  keywords: 'calculadora iva, calcular iva, iva 21, precio sin iva, precio con iva, calcular iva españa, iva incluido',
}

export default function CalculadoraIVAPage() {
  return <VATClient />
}
