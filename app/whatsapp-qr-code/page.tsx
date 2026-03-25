import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'WhatsApp QR Code Generator',
  description: 'Create a QR code that opens a WhatsApp chat with your number. Free WhatsApp QR code generator, no signup.',
  keywords: 'whatsapp qr code, wa.me qr',
  openGraph: { images: ['/api/og?title=WhatsApp%20QR%20Code%20Generator&description=Create%20a%20QR%20code%20that%20opens%20a%20WhatsApp%20chat%20with%20your%20number.%20Free%20WhatsApp%20QR%20code%20generator%2C%20no%20si'] },
}

const jsonLd = generateToolJsonLd({
  name: 'WhatsApp QR Code Generator',
  url: 'https://tools4free.site/whatsapp-qr-code',
  description: 'Create a QR code that opens a WhatsApp chat with your number. Free WhatsApp QR code generator, no signup.',
  category: 'DesignApplication',
})

export default function WhatsAppQRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QRGeneratorClient />
    </>
  )
}
