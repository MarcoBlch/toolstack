import type { Metadata } from 'next'
import VATClient from './client'

export const metadata: Metadata = {
  title: 'Free VAT Calculator — Add or Remove VAT/Sales Tax',
  description: 'Add or remove VAT from any price. Pre-set rates for France, UK, Germany, Spain, Italy. Calculate net, VAT, and gross amounts. Free, no signup.',
  keywords: 'VAT calculator, sales tax calculator, add VAT, remove VAT, TVA, Mehrwertsteuer, IVA, tax inclusive, tax exclusive',
}

export default function VATPage() {
  return <VATClient />
}
