import type { Metadata } from 'next'
import MortgageClient from '../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Down Payment Calculator — How Much Do You Need?',
  description: 'Calculate how much down payment you need for a mortgage. See how down payment affects monthly payments and total interest. Free.',
  keywords: 'down payment calculator, mortgage down payment, how much down payment, home buying calculator',
}

export default function DownPaymentPage() {
  return <MortgageClient />
}
