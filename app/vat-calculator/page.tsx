import type { Metadata } from 'next'
import VATClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free VAT Calculator — Add or Remove VAT/Sales Tax',
  description: 'Add or remove VAT from any price. Pre-set rates for France, UK, Germany, Spain, Italy. Calculate net, VAT, and gross amounts. Free, no signup.',
  keywords: 'VAT calculator, sales tax calculator, add VAT, remove VAT, TVA, Mehrwertsteuer, IVA, tax inclusive, tax exclusive',
  openGraph: { images: ['/api/og?title=Free%20VAT%20Calculator&description=Add%20or%20remove%20VAT%20from%20any%20price.%20Pre-set%20rates%20for%20France%2C%20UK%2C%20Germany%2C%20Spain%2C%20Italy.%20Calculate%20net'] },
  alternates: getAlternates('/vat-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free VAT Calculator',
  url: 'https://tools4free.site/vat-calculator',
  description: 'Add or remove VAT from any price. Pre-set rates for France, UK, Germany, Spain, Italy. Calculate net, VAT, and gross amounts. Free, no signup.',
  category: 'FinanceApplication',
})

export default function VATPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VATClient />
    </>
  )
}
