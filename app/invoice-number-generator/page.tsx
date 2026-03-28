import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Invoice Number Generator — Sequential, Date-based & Custom Formats',
  description: 'Generate professional invoice numbers in sequential, date-based, random, or custom prefix formats. Auto-increment, zero-padded, and ready to copy. Free online tool.',
  keywords: 'invoice number generator, invoice number format, invoice numbering system, auto-increment invoice, sequential invoice numbers, invoice number template',
  alternates: getAlternates('/invoice-number-generator'),
  openGraph: { images: ['/api/og?title=Free%20Invoice%20Number%20Generator&description=Generate%20professional%20invoice%20numbers%20in%20sequential%2C%20date-based%2C%20random%2C%20or%20custom%20formats.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Invoice Number Generator',
  url: 'https://tools4free.site/invoice-number-generator',
  description: 'Generate professional invoice numbers in sequential, date-based, random, or custom prefix formats. Auto-increment, zero-padded, and ready to copy.',
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
