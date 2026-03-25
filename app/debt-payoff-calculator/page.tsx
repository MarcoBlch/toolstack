import type { Metadata } from 'next'
import LoanClient from '../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator — When Will I Be Debt Free?',
  description: 'Calculate when you will be debt free. See your payoff date, total interest, and amortization schedule. Free, no signup.',
  keywords: 'debt payoff calculator, debt free calculator, loan payoff, when will i be debt free',
  openGraph: { images: ['/api/og?title=Debt%20Payoff%20Calculator&description=Calculate%20when%20you%20will%20be%20debt%20free.%20See%20your%20payoff%20date%2C%20total%20interest%2C%20and%20amortization%20schedul'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Debt Payoff Calculator',
  url: 'https://tools4free.site/debt-payoff-calculator',
  description: 'Calculate when you will be debt free. See your payoff date, total interest, and amortization schedule. Free, no signup.',
  category: 'FinanceApplication',
})

export default function DebtPayoffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoanClient />
    </>
  )
}
