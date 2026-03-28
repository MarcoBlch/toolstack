import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Sales Tax Calculator — Add or Remove US Sales Tax',
  description: 'Add or remove sales tax from any price. Pre-set rates for California, Texas, New York, Florida, and more US states. Calculate net price, tax, and total instantly.',
  keywords: 'sales tax calculator, US sales tax, state tax rates, add sales tax, remove sales tax, California tax, Texas tax, New York tax, tax calculator',
  alternates: getAlternates('/sales-tax-calculator'),
  openGraph: { images: ['/api/og?title=Free%20Sales%20Tax%20Calculator&description=Add%20or%20remove%20US%20sales%20tax%20from%20any%20price.%20Pre-set%20rates%20for%20all%20major%20states.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Sales Tax Calculator',
  url: 'https://tools4free.site/sales-tax-calculator',
  description: 'Add or remove sales tax from any price. Pre-set rates for California, Texas, New York, Florida, and more US states. Calculate net price, tax, and total instantly.',
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
