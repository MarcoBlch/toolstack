import type { Metadata } from 'next'
import CurrencyClient from '../../currency-converter/client'

const RATES: Record<string, number> = {
  EUR: 1, USD: 1.08, GBP: 0.86, JPY: 163, CHF: 0.97, CAD: 1.47,
  AUD: 1.65, CNY: 7.80, INR: 90.5, BRL: 5.45, MXN: 18.5,
  KRW: 1430, SEK: 11.2, NOK: 11.5, DKK: 7.46, PLN: 4.32,
  CZK: 25.2, HUF: 395, RON: 4.97, TRY: 35.0, ZAR: 19.8,
  AED: 3.97, SGD: 1.45, HKD: 8.45, NZD: 1.78, THB: 37.5,
  MAD: 10.8, TND: 3.35, XOF: 655.96, XAF: 655.96, RUB: 97.0,
}

const CURRENCY_NAMES: Record<string, string> = {
  EUR: 'Euro', USD: 'US Dollar', GBP: 'British Pound', JPY: 'Japanese Yen',
  CHF: 'Swiss Franc', CAD: 'Canadian Dollar', AUD: 'Australian Dollar',
  CNY: 'Chinese Yuan', INR: 'Indian Rupee', BRL: 'Brazilian Real',
  MXN: 'Mexican Peso', KRW: 'South Korean Won', SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone', DKK: 'Danish Krone', PLN: 'Polish Zloty',
  CZK: 'Czech Koruna', HUF: 'Hungarian Forint', RON: 'Romanian Leu',
  TRY: 'Turkish Lira', ZAR: 'South African Rand', AED: 'UAE Dirham',
  SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', NZD: 'New Zealand Dollar',
  THB: 'Thai Baht', MAD: 'Moroccan Dirham', TND: 'Tunisian Dinar',
  XOF: 'CFA Franc BCEAO', XAF: 'CFA Franc BEAC', RUB: 'Russian Ruble',
}

function convert(amount: number, from: string, to: string): number {
  return amount / RATES[from] * RATES[to]
}

const EXCHANGES = [
  // Most searched currency pairs × popular amounts
  ...[
    ['USD', 'EUR'], ['EUR', 'USD'], ['GBP', 'USD'], ['USD', 'GBP'],
    ['EUR', 'GBP'], ['GBP', 'EUR'], ['USD', 'JPY'], ['EUR', 'JPY'],
    ['USD', 'CAD'], ['USD', 'AUD'], ['USD', 'CHF'], ['EUR', 'CHF'],
    ['USD', 'INR'], ['EUR', 'INR'], ['GBP', 'INR'],
    ['USD', 'BRL'], ['EUR', 'BRL'],
    ['USD', 'MXN'], ['EUR', 'MXN'],
    ['USD', 'CNY'], ['EUR', 'CNY'],
    ['USD', 'KRW'], ['EUR', 'KRW'],
  ].flatMap(([from, to]) =>
    [1, 10, 50, 100, 500, 1000, 5000, 10000].map(amount => {
      const result = convert(amount, from, to)
      return {
        slug: `${amount}-${from.toLowerCase()}-to-${to.toLowerCase()}`,
        amount,
        from,
        to,
        result: parseFloat(result.toFixed(2)),
        title: `${amount} ${from} to ${to}`,
        desc: `${amount} ${CURRENCY_NAMES[from] || from} = ${result.toFixed(2)} ${CURRENCY_NAMES[to] || to}. Free currency converter with 30+ currencies.`,
      }
    })
  ),
]

export function generateStaticParams() {
  return EXCHANGES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const e = EXCHANGES.find(x => x.slug === slug)
  if (!e) return { title: 'Currency Converter' }

  return {
    title: `${e.title} — ${e.result} ${e.to} | Free Converter`,
    description: e.desc,
    keywords: `${e.amount} ${e.from} to ${e.to}, ${e.from.toLowerCase()} to ${e.to.toLowerCase()} converter, currency converter`,
  }
}

export default async function ExchangeSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = EXCHANGES.find(x => x.slug === slug)
  if (!e) return <CurrencyClient />

  return <CurrencyClient
    defaultAmount={e.amount}
    defaultFrom={e.from}
    defaultTo={e.to}
  />
}
