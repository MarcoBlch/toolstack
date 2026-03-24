import type { Metadata } from 'next'
import InvestmentClient from '../investment-calculator/client'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Free Investment Growth Tool',
  description: 'Calculate compound interest on your investments. See how your money grows with regular contributions over time. Free, no signup.',
  keywords: 'compound interest calculator, investment growth, compound interest formula, interest calculator',
}

export default function CompoundInterestPage() {
  return <InvestmentClient />
}
