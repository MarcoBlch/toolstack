import type { Metadata } from 'next'
import MortgageClient from './client'

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator — Monthly Payment & Amortization',
  description: 'Calculate your monthly mortgage payment, total interest, and see an amortization breakdown. Compare rates and loan terms. Free, no signup.',
  keywords: 'mortgage calculator, monthly payment calculator, amortization schedule, home loan calculator, interest rate calculator, mortgage payment',
}

export default function MortgagePage() {
  return <MortgageClient />
}
