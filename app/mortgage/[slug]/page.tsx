import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const MORTGAGES = [
  // Popular loan amounts
  ...[100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 1000000].map(amount => ({
    slug: `${(amount / 1000)}k-mortgage-payment`,
    amount,
    rate: 3.5,
    years: 25,
    down: Math.round(amount * 0.2),
    title: `$${(amount / 1000).toFixed(0)}k Mortgage Payment Calculator`,
    desc: `Calculate monthly payment for a $${(amount / 1000).toFixed(0)}k mortgage. See total interest, amortization breakdown, and compare rates.`,
  })),
  // Popular rates
  ...[2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8].map(rate => ({
    slug: `mortgage-rate-${rate}`,
    amount: 300000,
    rate,
    years: 25,
    down: 60000,
    title: `Mortgage Calculator at ${rate}% Interest Rate`,
    desc: `Calculate mortgage payments at ${rate}% interest rate. See monthly payment, total interest, and amortization for a $300k loan.`,
  })),
  // Popular terms
  ...[10, 15, 20, 30].map(years => ({
    slug: `${years}-year-mortgage`,
    amount: 300000,
    rate: 3.5,
    years,
    down: 60000,
    title: `${years}-Year Mortgage Calculator`,
    desc: `Calculate payments for a ${years}-year mortgage. Compare monthly payment and total interest for a $300k loan at 3.5%.`,
  })),
]

export function generateStaticParams() {
  return MORTGAGES.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = MORTGAGES.find(x => x.slug === slug)
  if (!m) return { title: 'Mortgage Calculator' }

  return {
    title: `${m.title} — Free Mortgage Calculator`,
    description: m.desc,
    keywords: `${m.slug.replace(/-/g, ' ')}, mortgage calculator, monthly payment, amortization`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(m.title)}&description=${encodeURIComponent(m.desc)}`] },
  }
}

export default async function MortgageSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = MORTGAGES.find(x => x.slug === slug)
  if (!m) return <MortgageClient />

  return <MortgageClient
    defaultAmount={m.amount}
    defaultRate={m.rate}
    defaultYears={m.years}
    defaultDown={m.down}
  />
}
