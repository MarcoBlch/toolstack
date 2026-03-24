import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Code — Free QR for Menus',
  description: 'Generate a QR code linking to your restaurant menu. Customers scan to view. Free menu QR code generator.',
  keywords: 'menu qr code, restaurant qr',
}

export default function MenuQRPage() {
  return <QRGeneratorClient />
}
