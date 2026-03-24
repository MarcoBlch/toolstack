import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'

export const metadata: Metadata = {
  title: 'WhatsApp QR Code Generator',
  description: 'Create a QR code that opens a WhatsApp chat with your number. Free WhatsApp QR code generator, no signup.',
  keywords: 'whatsapp qr code, wa.me qr',
}

export default function WhatsAppQRPage() {
  return <QRGeneratorClient />
}
