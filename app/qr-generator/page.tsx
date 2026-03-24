import type { Metadata } from 'next'
import QRClient from './client'

export const metadata: Metadata = {
  title: 'QR Code Generator — Free QR Codes for URLs, WiFi, Email & More',
  description: 'Generate free QR codes instantly. Support for URLs, WiFi, email, phone, SMS. Color themes, custom sizes. Download PNG. No signup, no watermark.',
  keywords: 'qr code generator, free qr code, qr code maker, wifi qr code, qr code creator',
}

export default function QRPage() {
  return <QRClient />
}
