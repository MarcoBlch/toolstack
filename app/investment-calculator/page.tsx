import type { Metadata } from 'next'
import InvestmentClient from './client'

export const metadata: Metadata = {
  title: 'Free Investment Calculator — Compound Interest & Growth',
  description: 'Calculate compound interest and investment growth. See how your money grows with regular contributions. Plan retirement and savings. Free, no signup.',
  keywords: 'investment calculator, compound interest calculator, savings calculator, retirement calculator, investment growth, compound interest',
}

export default function InvestmentPage() {
  return <InvestmentClient />
}
