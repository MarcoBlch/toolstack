import type { Metadata } from 'next'
import SalaryClient from './client'

export const metadata: Metadata = {
  title: 'Free Salary Calculator — Gross to Net, Tax Breakdown',
  description: 'Convert gross to net salary instantly. Tax breakdown for France, USA, UK, Germany, Spain. Calculate monthly, weekly, hourly equivalents. Free.',
  keywords: 'salary calculator, gross to net, tax calculator, net salary, income tax, salary breakdown, take home pay, after tax salary',
}

export default function SalaryPage() {
  return <SalaryClient />
}
