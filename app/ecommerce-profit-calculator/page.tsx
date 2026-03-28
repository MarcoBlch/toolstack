import type { Metadata } from 'next'
import ProfitMarginClient from '../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'E-Commerce Profit Calculator — Calculate Online Store Margins Free',
  description: 'Calculate e-commerce profit margins and markup for your online store. Enter product cost and selling price to see profit, margin percentage, and markup. Free, no signup.',
  keywords: 'ecommerce profit calculator, online store profit, ecommerce margin calculator, shopify profit calculator, online selling profit, ecommerce markup',
  openGraph: { images: ['/api/og?title=E-Commerce%20Profit%20Calculator&description=Calculate%20e-commerce%20profit%20margins%20and%20markup%20for%20your%20online%20store.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'E-Commerce Profit Calculator',
  url: 'https://tools4free.site/ecommerce-profit-calculator',
  description: 'Calculate e-commerce profit margins and markup for your online store. Enter product cost and selling price to see profit, margin percentage, and markup.',
  category: 'BusinessApplication',
})

export default function EcommerceProfitCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProfitMarginClient />
    </>
  )
}
