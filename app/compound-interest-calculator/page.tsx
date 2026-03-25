import type { Metadata } from 'next'
import InvestmentClient from '../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Free Investment Growth Tool',
  description: 'Calculate compound interest on your investments. See how your money grows with regular contributions over time. Free, no signup.',
  keywords: 'compound interest calculator, investment growth, compound interest formula, interest calculator',
  openGraph: { images: ['/api/og?title=Compound%20Interest%20Calculator&description=Calculate%20compound%20interest%20on%20your%20investments.%20See%20how%20your%20money%20grows%20with%20regular%20contributions'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compound Interest Calculator',
  url: 'https://tools4free.site/compound-interest-calculator',
  description: 'Calculate compound interest on your investments. See how your money grows with regular contributions over time. Free, no signup.',
  category: 'FinanceApplication',
})

export default function CompoundInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvestmentClient />
    </>
  )
}
