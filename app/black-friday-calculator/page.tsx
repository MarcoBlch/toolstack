import type { Metadata } from 'next'
import DiscountClient from '../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Black Friday Discount Calculator — Calculate Sale Savings Free',
  description: 'Calculate Black Friday deal savings instantly. Enter the original price and discount percentage to see how much you save and what you actually pay. Free, no signup.',
  keywords: 'black friday calculator, black friday discount, sale calculator, black friday savings, black friday deals calculator, cyber monday calculator',
  openGraph: { images: ['/api/og?title=Black%20Friday%20Discount%20Calculator&description=Calculate%20Black%20Friday%20deal%20savings%20instantly.%20See%20how%20much%20you%20save%20and%20what%20you%20pay.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Black Friday Discount Calculator',
  url: 'https://tools4free.site/black-friday-calculator',
  description: 'Calculate Black Friday deal savings instantly. Enter the original price and discount percentage to see how much you save and what you actually pay. Free, no signup.',
  category: 'BusinessApplication',
})

export default function BlackFridayCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DiscountClient />
    </>
  )
}
