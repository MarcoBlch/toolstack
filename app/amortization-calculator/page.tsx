import type { Metadata } from 'next'
import LoanClient from '../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Amortization Calculator — Free Loan Schedule Generator',
  description: 'Generate a full amortization schedule for any loan. See monthly payments, principal, interest breakdown. Free, no signup.',
  keywords: 'amortization calculator, amortization schedule, loan schedule, loan amortization table',
}

export default function AmortizationPage() {
  return <LoanClient />
}
