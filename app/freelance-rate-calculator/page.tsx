import type { Metadata } from 'next'
import Client from '../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator — Calculate Your Ideal Hourly Rate Free',
  description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Find out exactly what to charge per hour. Free, no signup.',
  keywords: 'freelance rate calculator, freelance hourly rate, how much to charge freelance, freelance pricing calculator, self employed rate calculator',
  openGraph: { images: ['/api/og?title=Freelance%20Rate%20Calculator&description=Calculate%20your%20ideal%20freelance%20hourly%20rate%20based%20on%20income%20goals%20and%20expenses.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Freelance Rate Calculator',
  url: 'https://tools4free.site/freelance-rate-calculator',
  description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Find out exactly what to charge per hour.',
  category: 'BusinessApplication',
})

export default function FreelanceRateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
