import type { Metadata } from 'next'
import QRClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'QR Code Generator — Free QR Codes for URLs, WiFi, Email & More',
  description: 'Generate free QR codes instantly. Support for URLs, WiFi, email, phone, SMS. Color themes, custom sizes. Download PNG. No signup, no watermark.',
  keywords: 'qr code generator, free qr code, qr code maker, wifi qr code, qr code creator',
  openGraph: { images: ['/api/og?title=QR%20Code%20Generator&description=Generate%20free%20QR%20codes%20instantly.%20Support%20for%20URLs%2C%20WiFi%2C%20email%2C%20phone%2C%20SMS.%20Color%20themes%2C%20custom%20si'] },
}

const jsonLd = generateToolJsonLd({
  name: 'QR Code Generator',
  url: 'https://tools4free.site/qr-generator',
  description: 'Generate free QR codes instantly. Support for URLs, WiFi, email, phone, SMS. Color themes, custom sizes. Download PNG. No signup, no watermark.',
  category: 'DesignApplication',
})

export default function QRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QRClient />
    </>
  )
}
