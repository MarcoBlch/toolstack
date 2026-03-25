import type { Metadata } from 'next'
import QRGeneratorClient from '../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Code — Free QR for Menus',
  description: 'Generate a QR code linking to your restaurant menu. Customers scan to view. Free menu QR code generator.',
  keywords: 'menu qr code, restaurant qr',
  openGraph: { images: ['/api/og?title=Restaurant%20Menu%20QR%20Code&description=Generate%20a%20QR%20code%20linking%20to%20your%20restaurant%20menu.%20Customers%20scan%20to%20view.%20Free%20menu%20QR%20code%20genera'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Restaurant Menu QR Code',
  url: 'https://tools4free.site/menu-qr-code',
  description: 'Generate a QR code linking to your restaurant menu. Customers scan to view. Free menu QR code generator.',
  category: 'DesignApplication',
})

export default function MenuQRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QRGeneratorClient />
    </>
  )
}
