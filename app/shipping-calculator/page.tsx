import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Shipping Calculator — Estimate Costs, Dimensional Weight & Carrier Comparison',
  description: 'Calculate shipping costs by weight and dimensions. Compare economy, standard, and express rates. Dimensional weight calculator with carrier estimates for domestic and international shipping.',
  keywords: 'shipping calculator, shipping cost estimator, dimensional weight calculator, compare shipping carriers, international shipping cost, package weight calculator',
  alternates: getAlternates('/shipping-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Shipping%20Calculator&description=Estimate%20shipping%20costs%20by%20weight%20and%20dimensions.%20Compare%20carriers%20and%20delivery%20speeds.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Shipping Calculator',
  url: 'https://tools4free.site/shipping-calculator',
  description: 'Calculate shipping costs by weight and dimensions. Compare economy, standard, and express rates with dimensional weight calculations.',
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
