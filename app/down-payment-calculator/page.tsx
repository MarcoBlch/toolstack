import type { Metadata } from 'next'
import MortgageClient from '../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Down Payment Calculator — How Much Do You Need?',
  description: 'Calculate how much down payment you need for a mortgage. See how down payment affects monthly payments and total interest. Free.',
  keywords: 'down payment calculator, mortgage down payment, how much down payment, home buying calculator',
  openGraph: { images: ['/api/og?title=Down%20Payment%20Calculator&description=Calculate%20how%20much%20down%20payment%20you%20need%20for%20a%20mortgage.%20See%20how%20down%20payment%20affects%20monthly%20paymen'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Down Payment Calculator',
  url: 'https://tools4free.site/down-payment-calculator',
  description: 'Calculate how much down payment you need for a mortgage. See how down payment affects monthly payments and total interest. Free.',
  category: 'FinanceApplication',
})

export default function DownPaymentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MortgageClient />
    </>
  )
}
