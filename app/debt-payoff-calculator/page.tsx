import type { Metadata } from 'next'
import LoanClient from '../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator — When Will I Be Debt Free?',
  description: 'Calculate when you will be debt free. See your payoff date, total interest, and amortization schedule. Free, no signup.',
  keywords: 'debt payoff calculator, debt free calculator, loan payoff, when will i be debt free',
}

export default function DebtPayoffPage() {
  return <LoanClient />
}
