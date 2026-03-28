import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Hourly Rate Calculator — Price Your Freelance Services',
  description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. See daily and monthly rates instantly. Free, no signup.',
  keywords: 'freelancer hourly rate, how to price services, billable hours, freelance rate calculator, consulting rate, daily rate calculator',
  alternates: getAlternates('/hourly-rate-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Hourly%20Rate%20Calculator&description=Calculate%20your%20ideal%20freelance%20hourly%20rate%20based%20on%20income%2C%20expenses%2C%20taxes%20and%20billable%20hours.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Hourly Rate Calculator',
  url: 'https://tools4free.site/hourly-rate-calculator',
  description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. See daily and monthly rates instantly.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
