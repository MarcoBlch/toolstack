import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Discount Calculator — Sale Price, Stack Discounts & More',
  description: 'Calculate discounts, find original prices, or determine discount percentages. Stack multiple discounts, see savings instantly. Perfect for Black Friday and sales. Free, no signup.',
  keywords: 'discount calculator, sale price calculator, Black Friday calculator, stack discounts, percentage off, original price finder, how much do I save',
  alternates: getAlternates('/discount-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Discount%20Calculator&description=Calculate%20discounts%2C%20find%20original%20prices%2C%20or%20determine%20discount%20percentages.%20Stack%20multiple%20discounts.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Discount Calculator',
  url: 'https://tools4free.site/discount-calculator',
  description: 'Calculate discounts, find original prices, or determine discount percentages. Stack multiple discounts, see savings instantly.',
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
