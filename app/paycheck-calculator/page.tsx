import type { Metadata } from 'next'
import SalaryClient from '../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Take Home Pay After Taxes',
  description: 'Calculate your take-home pay after taxes. Gross to net salary converter for USA, UK, France, Germany, Spain. Free, no signup.',
  keywords: 'paycheck calculator, take home pay calculator, after tax salary, net pay calculator',
}

export default function PaycheckPage() {
  return <SalaryClient />
}
