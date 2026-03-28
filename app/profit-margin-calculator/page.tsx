import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Profit Margin Calculator — Margin, Markup & Selling Price',
  description: 'Calculate profit margin, markup, and selling price from cost and revenue. Two modes: from selling price or from target margin. Visual cost vs profit breakdown.',
  keywords: 'profit margin calculator, margin vs markup, selling price calculator, markup calculator, profit calculator, gross margin, business pricing, margin percentage',
  alternates: getAlternates('/profit-margin-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Profit%20Margin%20Calculator&description=Calculate%20profit%20margin%2C%20markup%2C%20and%20selling%20price.%20Visual%20cost%20vs%20profit%20breakdown.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Profit Margin Calculator',
  url: 'https://tools4free.site/profit-margin-calculator',
  description: 'Calculate profit margin, markup, and selling price from cost and revenue. Two modes: from selling price or from target margin. Visual cost vs profit breakdown.',
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
