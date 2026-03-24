import type { Metadata } from 'next'
import Client from '../../currency-converter/client'

export const metadata: Metadata = {
  title: 'Convertidor de Moneda — Tipo de Cambio Gratis Online',
  description: 'Convierte entre 30+ monedas del mundo. EUR, USD, GBP, MXN, ARS, COP. Tasas aproximadas. Gratis.',
  keywords: 'convertidor moneda, tipo de cambio, euro dolar, conversión moneda, cambio de divisas, dolar a euro',
}

export default function Page() {
  return <Client />
}
