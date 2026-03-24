import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'

export const metadata: Metadata = {
  title: 'WiFi QR Code Generator — Share WiFi Password',
  description: 'Create a QR code for your WiFi network. Guests scan to connect instantly. Free WiFi QR code generator, no signup.',
  keywords: 'wifi qr code, wifi password qr',
}

export default function WifiQRPage() {
  return <QRGeneratorClient />
}
