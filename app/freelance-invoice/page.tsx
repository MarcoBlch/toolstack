import type { Metadata } from 'next'
import InvoiceClient from '../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Freelance Invoice Generator — Free Invoice Maker for Freelancers',
  description: 'Create freelance invoices in seconds. Add your services, hours, rates. Download professional PDF. No signup needed.',
  keywords: 'freelance invoice, freelance invoice generator, invoice for freelancers, freelancer invoice template, self employed invoice',
}

export default function FreelanceInvoicePage() {
  return <InvoiceClient />
}
