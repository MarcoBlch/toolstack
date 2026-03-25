import type { Metadata } from 'next'
import TipClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Tip Calculator — Calculate Tip & Split the Bill',
  description: 'Calculate tip and split the bill instantly. See tip amounts at 10%, 15%, 18%, 20%, 25%. Perfect for restaurants. Free, no signup.',
  keywords: 'tip calculator, split the bill, restaurant tip, gratuity calculator, tip percentage, bill splitter',
  openGraph: { images: ['/api/og?title=Free%20Tip%20Calculator&description=Calculate%20tip%20and%20split%20the%20bill%20instantly.%20See%20tip%20amounts%20at%2010%25%2C%2015%25%2C%2018%25%2C%2020%25%2C%2025%25.%20Perfect%20for%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Tip Calculator',
  url: 'https://tools4free.site/tip-calculator',
  description: 'Calculate tip and split the bill instantly. See tip amounts at 10%, 15%, 18%, 20%, 25%. Perfect for restaurants. Free, no signup.',
  category: 'FinanceApplication',
})

export default function TipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TipClient />
    </>
  )
}
