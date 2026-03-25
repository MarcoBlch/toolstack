import type { Metadata } from 'next'
import LoanClient from '../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Amortization Calculator — Free Loan Schedule Generator',
  description: 'Generate a full amortization schedule for any loan. See monthly payments, principal, interest breakdown. Free, no signup.',
  keywords: 'amortization calculator, amortization schedule, loan schedule, loan amortization table',
  openGraph: { images: ['/api/og?title=Amortization%20Calculator&description=Generate%20a%20full%20amortization%20schedule%20for%20any%20loan.%20See%20monthly%20payments%2C%20principal%2C%20interest%20breakd'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Amortization Calculator',
  url: 'https://tools4free.site/amortization-calculator',
  description: 'Generate a full amortization schedule for any loan. See monthly payments, principal, interest breakdown. Free, no signup.',
  category: 'FinanceApplication',
})

export default function AmortizationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoanClient />
    </>
  )
}
