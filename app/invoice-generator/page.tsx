import type { Metadata } from 'next'
import InvoiceClient from './client'

export const metadata: Metadata = {
  title: 'Free Invoice Generator — Create & Download PDF Invoices Online',
  description: 'Create professional invoices instantly. Add line items, tax, discounts. Download as PDF. No signup, no watermark. 100% free.',
  keywords: 'invoice generator, free invoice, invoice maker, create invoice online, invoice template, pdf invoice generator, facture gratuite',
}

export default function InvoicePage() {
  return <InvoiceClient />
}
