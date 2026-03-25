import type { Metadata } from 'next'
import MortgageClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator — Monthly Payment & Amortization',
  description: 'Calculate your monthly mortgage payment, total interest, and see an amortization breakdown. Compare rates and loan terms. Free, no signup.',
  keywords: 'mortgage calculator, monthly payment calculator, amortization schedule, home loan calculator, interest rate calculator, mortgage payment',
  openGraph: { images: ['/api/og?title=Free%20Mortgage%20Calculator&description=Calculate%20your%20monthly%20mortgage%20payment%2C%20total%20interest%2C%20and%20see%20an%20amortization%20breakdown.%20Compare%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Mortgage Calculator',
  url: 'https://tools4free.site/mortgage-calculator',
  description: 'Calculate your monthly mortgage payment, total interest, and see an amortization breakdown. Compare rates and loan terms. Free, no signup.',
  category: 'FinanceApplication',
})

export default function MortgagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MortgageClient />
    </>
  )
}
