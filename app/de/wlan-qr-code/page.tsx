import type { Metadata } from 'next'
import Client from '../../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'WLAN QR Code Generator — WiFi Passwort Teilen per QR',
  description: 'Erstelle einen QR Code für dein WLAN-Netzwerk. Gäste scannen und verbinden sich sofort. Kostenlos.',
  keywords: 'WLAN QR Code, WiFi QR Code Generator, WLAN Passwort QR, QR Code WLAN erstellen, WiFi teilen QR',
  openGraph: { images: ['/api/og?title=WLAN%20QR%20Code%20Generator&description=Erstelle%20einen%20QR%20Code%20f%C3%BCr%20dein%20WLAN-Netzwerk.%20G%C3%A4ste%20scannen%20und%20verbinden%20sich%20sofort.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'WLAN QR Code Generator',
  url: 'https://tools4free.site/de/wlan-qr-code',
  description: 'Erstelle einen QR Code für dein WLAN-Netzwerk. Gäste scannen und verbinden sich sofort. Kostenlos.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
