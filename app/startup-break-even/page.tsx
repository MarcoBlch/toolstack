import type { Metadata } from 'next'
import Client from '../break-even-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Startup Break Even Calculator — When Will Your Startup Profit?',
  description: 'Find out when your startup will break even and start making a profit. Enter fixed costs, variable costs, and selling price to see the break even point. Free, no signup.',
  keywords: 'startup break even, when will startup profit, break even analysis startup, startup profitability calculator, startup cost calculator',
  openGraph: { images: ['/api/og?title=Startup%20Break%20Even%20Calculator&description=Find%20out%20when%20your%20startup%20will%20break%20even%20and%20start%20making%20a%20profit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Startup Break Even Calculator',
  url: 'https://tools4free.site/startup-break-even',
  description: 'Find out when your startup will break even and start making a profit. Enter fixed costs, variable costs, and selling price to see the break even point.',
  category: 'BusinessApplication',
})

export default function StartupBreakEvenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
