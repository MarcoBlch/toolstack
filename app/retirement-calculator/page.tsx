import type { Metadata } from 'next'
import RetirementClient from './client'

export const metadata: Metadata = {
  title: 'Free Retirement Calculator — Plan Your Savings & Income',
  description: 'Plan your retirement. Calculate total savings, monthly retirement income, and savings gap. Accounts for inflation and returns. Free, no signup.',
  keywords: 'retirement calculator, retirement savings, retirement planner, 4% rule, retirement income, savings calculator, investment calculator',
}

export default function RetirementPage() {
  return <RetirementClient />
}
