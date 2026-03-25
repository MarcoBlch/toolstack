import type { Metadata } from 'next'
import InvoiceClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Invoice Generator — Create & Download PDF Invoices Online',
  description: 'Create professional invoices instantly. Add line items, tax, discounts. Download as PDF. No signup, no watermark. 100% free.',
  keywords: 'invoice generator, free invoice, invoice maker, create invoice online, invoice template, pdf invoice generator, facture gratuite',
  openGraph: { images: ['/api/og?title=Free%20Invoice%20Generator&description=Create%20professional%20invoices%20instantly.%20Add%20line%20items%2C%20tax%2C%20discounts.%20Download%20as%20PDF.%20No%20signup%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Invoice Generator',
  url: 'https://tools4free.site/invoice-generator',
  description: 'Create professional invoices instantly. Add line items, tax, discounts. Download as PDF. No signup, no watermark. 100% free.',
  category: 'BusinessApplication',
})

export default function InvoicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceClient />
    </>
  )
}
