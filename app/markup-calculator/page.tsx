import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Markup Calculator — Calculate Selling Price, Profit & Margin',
  description: 'Calculate selling price from cost and markup percentage. See profit amount and equivalent margin. Includes markup vs margin reference table. Free, no signup.',
  keywords: 'markup calculator, markup vs margin, selling price calculator, profit calculator, cost markup, pricing calculator, margin equivalent, business pricing',
  alternates: getAlternates('/markup-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Markup%20Calculator&description=Calculate%20selling%20price%20from%20cost%20and%20markup.%20See%20profit%20and%20margin%20equivalent.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Markup Calculator',
  url: 'https://tools4free.site/markup-calculator',
  description: 'Calculate selling price from cost and markup percentage. See profit amount and equivalent margin. Includes markup vs margin reference table. Free, no signup.',
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
