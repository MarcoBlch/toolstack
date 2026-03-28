import type { Metadata } from 'next'
import InvoiceClient from '../../invoice-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador de Facturas Gratis — Crear Factura PDF Online',
  description: 'Crea facturas profesionales gratis. Agrega productos, impuestos, descuentos. Descarga en PDF. Sin registro.',
  keywords: 'factura gratis, generador de facturas, crear factura online, plantilla factura gratis, factura pdf, factura freelance',
  openGraph: { images: ['/api/og?title=Generador%20de%20Facturas%20Gratis&description=Crea%20facturas%20profesionales%20gratis.%20Agrega%20productos%2C%20impuestos%2C%20descuentos.%20Descarga%20en%20PDF.%20Sin%20re'] },
  alternates: getAlternates('/invoice-generator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Facturas Gratis',
  url: 'https://tools4free.site/es/factura-gratis',
  description: 'Crea facturas profesionales gratis. Agrega productos, impuestos, descuentos. Descarga en PDF. Sin registro.',
  category: 'BusinessApplication',
})

export default function EsInvoicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceClient locale="es" />
    </>
  )
}
