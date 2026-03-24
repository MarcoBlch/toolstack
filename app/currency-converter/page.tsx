import type { Metadata } from 'next'
import CurrencyClient from './client'

export const metadata: Metadata = {
  title: 'Free Currency Converter — 30+ World Currencies',
  description: 'Convert between 30+ currencies instantly. EUR, USD, GBP, JPY, CHF, and more. Approximate rates. Free, no signup, no API.',
  keywords: 'currency converter, exchange rate, eur to usd, usd to eur, currency calculator, money converter',
}

export default function CurrencyPage() {
  return <CurrencyClient />
}
