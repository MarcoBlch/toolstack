import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'WiFi QR Code Generator — Share WiFi Password',
  description: 'Create a QR code for your WiFi network. Guests scan to connect instantly. Free WiFi QR code generator, no signup.',
  keywords: 'wifi qr code, wifi password qr',
  openGraph: { images: ['/api/og?title=WiFi%20QR%20Code%20Generator&description=Create%20a%20QR%20code%20for%20your%20WiFi%20network.%20Guests%20scan%20to%20connect%20instantly.%20Free%20WiFi%20QR%20code%20generato'] },
}

const jsonLd = generateToolJsonLd({
  name: 'WiFi QR Code Generator',
  url: 'https://tools4free.site/wifi-qr-code',
  description: 'Create a QR code for your WiFi network. Guests scan to connect instantly. Free WiFi QR code generator, no signup.',
  category: 'DesignApplication',
})

export default function WifiQRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QRGeneratorClient />
    </>
  )
}
