import type { Metadata } from 'next'
import InvoiceClient from '../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Free Invoice Template — Professional Invoice PDF Download',
  description: 'Use our free invoice template to create professional invoices. Fill in details, download as PDF. No signup, no software needed.',
  keywords: 'free invoice template, invoice template, invoice template pdf, simple invoice template, blank invoice template',
}

export default function InvoiceTemplatePage() {
  return <InvoiceClient />
}
