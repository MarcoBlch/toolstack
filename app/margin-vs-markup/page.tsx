import type { Metadata } from 'next'
import ProfitMarginClient from '../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Margin vs Markup Calculator — Understand the Difference Free',
  description: 'Understand the difference between margin and markup with this free calculator. Enter cost and selling price to see both profit margin and markup side by side. No signup needed.',
  keywords: 'margin vs markup, markup vs margin, profit margin calculator, markup calculator, margin markup difference, margin to markup converter',
  openGraph: { images: ['/api/og?title=Margin%20vs%20Markup%20Calculator&description=Understand%20the%20difference%20between%20margin%20and%20markup.%20See%20both%20side%20by%20side.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Margin vs Markup Calculator',
  url: 'https://tools4free.site/margin-vs-markup',
  description: 'Understand the difference between margin and markup with this free calculator. Enter cost and selling price to see both profit margin and markup side by side.',
  category: 'BusinessApplication',
})

export default function MarginVsMarkupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProfitMarginClient />
    </>
  )
}
