import type { Metadata } from 'next'
import Client from '../../invoice-number-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Generador de Número de Factura Gratis',
  alternates: getAlternates('/invoice-number-generator'),
  description: 'Genera números de factura únicos y profesionales. Personaliza el formato y la secuencia para tu empresa. Gratis.',
  keywords: 'generador número factura, número de factura, numeración factura, crear número factura, factura secuencial, formato factura',
  openGraph: { images: ['/api/og?title=Generador%20N%C3%BAmero%20Factura&description=Genera%20n%C3%BAmeros%20de%20factura%20%C3%BAnicos%20y%20profesionales.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Número de Factura',
  url: 'https://tools4free.site/es/generador-numero-factura',
  description: 'Genera números de factura únicos y profesionales. Personaliza el formato y la secuencia para tu empresa. Gratis.',
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
