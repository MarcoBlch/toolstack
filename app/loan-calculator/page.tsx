import type { Metadata } from 'next'
import LoanClient from './client'

export const metadata: Metadata = {
  title: 'Free Loan Calculator — Monthly Payments & Amortization Schedule',
  description: 'Calculate monthly loan payments for personal, car, or student loans. See full amortization schedule. Free, no signup required.',
  keywords: 'loan calculator, monthly payment calculator, amortization schedule, personal loan calculator, car loan calculator, student loan calculator, interest calculator',
}

export default function LoanPage() {
  return <LoanClient />
}
