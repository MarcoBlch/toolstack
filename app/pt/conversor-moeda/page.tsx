import type { Metadata } from 'next'
import Client from '../../currency-converter/client'

export const metadata: Metadata = {
  title: 'Conversor de Moeda — Taxa de Câmbio Grátis Online',
  description: 'Converta entre 30+ moedas do mundo. EUR, USD, BRL, GBP, JPY. Taxas aproximadas. Grátis.',
  keywords: 'conversor moeda, taxa de câmbio, dólar para real, euro para real, conversão moeda, câmbio hoje',
}

export default function Page() {
  return <Client />
}
