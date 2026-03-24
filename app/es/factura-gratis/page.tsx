import type { Metadata } from 'next'
import InvoiceClient from '../../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Generador de Facturas Gratis — Crear Factura PDF Online',
  description: 'Crea facturas profesionales gratis. Agrega productos, impuestos, descuentos. Descarga en PDF. Sin registro.',
  keywords: 'factura gratis, generador de facturas, crear factura online, plantilla factura gratis, factura pdf, factura freelance',
}

export default function EsInvoicePage() {
  return <InvoiceClient />
}
