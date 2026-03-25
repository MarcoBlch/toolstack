import type { Metadata } from 'next'
import PercentageClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Percentage Calculator — What is X% of Y?',
  description: 'Calculate percentages instantly. What is X% of Y? Percentage change? X is what percent of Y? Three modes. Free, no signup.',
  keywords: 'percentage calculator, what is x percent of y, percentage change, percentage difference, percent calculator, tip calculator',
  openGraph: { images: ['/api/og?title=Free%20Percentage%20Calculator&description=Calculate%20percentages%20instantly.%20What%20is%20X%25%20of%20Y%3F%20Percentage%20change%3F%20X%20is%20what%20percent%20of%20Y%3F%20Three%20m'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Percentage Calculator',
  url: 'https://tools4free.site/percentage-calculator',
  description: 'Calculate percentages instantly. What is X% of Y? Percentage change? X is what percent of Y? Three modes. Free, no signup.',
  category: 'FinanceApplication',
})

export default function PercentagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PercentageClient />
    </>
  )
}
