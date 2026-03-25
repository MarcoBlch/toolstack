import type { Metadata } from 'next'
import InvoiceClient from '../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Freelance Invoice Generator — Free Invoice Maker for Freelancers',
  description: 'Create freelance invoices in seconds. Add your services, hours, rates. Download professional PDF. No signup needed.',
  keywords: 'freelance invoice, freelance invoice generator, invoice for freelancers, freelancer invoice template, self employed invoice',
  openGraph: { images: ['/api/og?title=Freelance%20Invoice%20Generator&description=Create%20freelance%20invoices%20in%20seconds.%20Add%20your%20services%2C%20hours%2C%20rates.%20Download%20professional%20PDF.%20No'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Freelance Invoice Generator',
  url: 'https://tools4free.site/freelance-invoice',
  description: 'Create freelance invoices in seconds. Add your services, hours, rates. Download professional PDF. No signup needed.',
  category: 'BusinessApplication',
})

export default function FreelanceInvoicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceClient />
    </>
  )
}
