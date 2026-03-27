import type { Metadata } from 'next'
import InvestmentClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Investment Calculator — Compound Interest & Growth',
  description: 'Calculate compound interest and investment growth. See how your money grows with regular contributions. Plan retirement and savings. Free, no signup.',
  keywords: 'investment calculator, compound interest calculator, savings calculator, retirement calculator, investment growth, compound interest',
  openGraph: { images: ['/api/og?title=Free%20Investment%20Calculator&description=Calculate%20compound%20interest%20and%20investment%20growth.%20See%20how%20your%20money%20grows%20with%20regular%20contributio'] },
  alternates: getAlternates('/investment-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free Investment Calculator',
  url: 'https://tools4free.site/investment-calculator',
  description: 'Calculate compound interest and investment growth. See how your money grows with regular contributions. Plan retirement and savings. Free, no signup.',
  category: 'FinanceApplication',
})

export default function InvestmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvestmentClient />
    </>
  )
}
