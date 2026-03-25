import type { Metadata } from 'next'
import InvoiceClient from '../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Invoice Template — Professional Invoice PDF Download',
  description: 'Use our free invoice template to create professional invoices. Fill in details, download as PDF. No signup, no software needed.',
  keywords: 'free invoice template, invoice template, invoice template pdf, simple invoice template, blank invoice template',
  openGraph: { images: ['/api/og?title=Free%20Invoice%20Template&description=Use%20our%20free%20invoice%20template%20to%20create%20professional%20invoices.%20Fill%20in%20details%2C%20download%20as%20PDF.%20No%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Invoice Template',
  url: 'https://tools4free.site/invoice-template',
  description: 'Use our free invoice template to create professional invoices. Fill in details, download as PDF. No signup, no software needed.',
  category: 'BusinessApplication',
})

export default function InvoiceTemplatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceClient />
    </>
  )
}
