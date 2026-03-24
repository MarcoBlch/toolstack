import type { Metadata } from 'next'
import Client from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Calculadora de Imposto — Calcular ICMS e IVA Online Grátis',
  description: 'Calcule impostos facilmente. Preço com e sem imposto. ICMS, IVA, ISS. Alíquotas por estado. Grátis.',
  keywords: 'calculadora imposto, calcular icms, calculadora iva, preço sem imposto, alíquota icms, calcular imposto',
}

export default function Page() {
  return <Client />
}
