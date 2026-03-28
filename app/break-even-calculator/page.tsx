import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Break Even Calculator — Find When Your Business Profits',
  description: 'Calculate your break even point in units and revenue. See contribution margin, break even analysis, and a visual cost-revenue chart. Free, no signup.',
  keywords: 'break even analysis, break even calculator, contribution margin, when business profits, fixed costs variable costs, break even point',
  alternates: getAlternates('/break-even-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Break%20Even%20Calculator&description=Calculate%20your%20break%20even%20point%20in%20units%20and%20revenue.%20See%20contribution%20margin%20and%20visual%20chart.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Break Even Calculator',
  url: 'https://tools4free.site/break-even-calculator',
  description: 'Calculate your break even point in units and revenue. See contribution margin, break even analysis, and a visual cost-revenue chart.',
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
