import type { Metadata } from 'next'
import SalaryClient from '../salary-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Take Home Pay After Taxes',
  description: 'Calculate your take-home pay after taxes. Gross to net salary converter for USA, UK, France, Germany, Spain. Free, no signup.',
  keywords: 'paycheck calculator, take home pay calculator, after tax salary, net pay calculator',
  openGraph: { images: ['/api/og?title=Paycheck%20Calculator&description=Calculate%20your%20take-home%20pay%20after%20taxes.%20Gross%20to%20net%20salary%20converter%20for%20USA%2C%20UK%2C%20France%2C%20Germany'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Paycheck Calculator',
  url: 'https://tools4free.site/paycheck-calculator',
  description: 'Calculate your take-home pay after taxes. Gross to net salary converter for USA, UK, France, Germany, Spain. Free, no signup.',
  category: 'FinanceApplication',
})

export default function PaycheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalaryClient />
    </>
  )
}
