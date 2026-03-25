import type { Metadata } from 'next'
import SalaryClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Salary Calculator — Gross to Net, Tax Breakdown',
  description: 'Convert gross to net salary instantly. Tax breakdown for France, USA, UK, Germany, Spain. Calculate monthly, weekly, hourly equivalents. Free.',
  keywords: 'salary calculator, gross to net, tax calculator, net salary, income tax, salary breakdown, take home pay, after tax salary',
  openGraph: { images: ['/api/og?title=Free%20Salary%20Calculator&description=Convert%20gross%20to%20net%20salary%20instantly.%20Tax%20breakdown%20for%20France%2C%20USA%2C%20UK%2C%20Germany%2C%20Spain.%20Calculate%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Salary Calculator',
  url: 'https://tools4free.site/salary-calculator',
  description: 'Convert gross to net salary instantly. Tax breakdown for France, USA, UK, Germany, Spain. Calculate monthly, weekly, hourly equivalents. Free.',
  category: 'FinanceApplication',
})

export default function SalaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalaryClient />
    </>
  )
}
