import type { Metadata } from 'next'
import LoanClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Loan Calculator — Monthly Payments & Amortization Schedule',
  description: 'Calculate monthly loan payments for personal, car, or student loans. See full amortization schedule. Free, no signup required.',
  keywords: 'loan calculator, monthly payment calculator, amortization schedule, personal loan calculator, car loan calculator, student loan calculator, interest calculator',
  openGraph: { images: ['/api/og?title=Free%20Loan%20Calculator&description=Calculate%20monthly%20loan%20payments%20for%20personal%2C%20car%2C%20or%20student%20loans.%20See%20full%20amortization%20schedule.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Loan Calculator',
  url: 'https://tools4free.site/loan-calculator',
  description: 'Calculate monthly loan payments for personal, car, or student loans. See full amortization schedule. Free, no signup required.',
  category: 'FinanceApplication',
})

export default function LoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoanClient />
    </>
  )
}
