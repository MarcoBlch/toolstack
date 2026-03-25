import type { Metadata } from 'next'
import CurrencyClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Currency Converter — 30+ World Currencies',
  description: 'Convert between 30+ currencies instantly. EUR, USD, GBP, JPY, CHF, and more. Approximate rates. Free, no signup, no API.',
  keywords: 'currency converter, exchange rate, eur to usd, usd to eur, currency calculator, money converter',
  openGraph: { images: ['/api/og?title=Free%20Currency%20Converter&description=Convert%20between%2030%2B%20currencies%20instantly.%20EUR%2C%20USD%2C%20GBP%2C%20JPY%2C%20CHF%2C%20and%20more.%20Approximate%20rates.%20Free'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Currency Converter',
  url: 'https://tools4free.site/currency-converter',
  description: 'Convert between 30+ currencies instantly. EUR, USD, GBP, JPY, CHF, and more. Approximate rates. Free, no signup, no API.',
  category: 'FinanceApplication',
})

export default function CurrencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CurrencyClient />
    </>
  )
}
