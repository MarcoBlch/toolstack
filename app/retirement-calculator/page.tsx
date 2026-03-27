import type { Metadata } from 'next'
import RetirementClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Retirement Calculator — Plan Your Savings & Income',
  description: 'Plan your retirement. Calculate total savings, monthly retirement income, and savings gap. Accounts for inflation and returns. Free, no signup.',
  keywords: 'retirement calculator, retirement savings, retirement planner, 4% rule, retirement income, savings calculator, investment calculator',
  openGraph: { images: ['/api/og?title=Free%20Retirement%20Calculator&description=Plan%20your%20retirement.%20Calculate%20total%20savings%2C%20monthly%20retirement%20income%2C%20and%20savings%20gap.%20Accounts%20'] },
  alternates: getAlternates('/retirement-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free Retirement Calculator',
  url: 'https://tools4free.site/retirement-calculator',
  description: 'Plan your retirement. Calculate total savings, monthly retirement income, and savings gap. Accounts for inflation and returns. Free, no signup.',
  category: 'FinanceApplication',
})

export default function RetirementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RetirementClient />
    </>
  )
}
