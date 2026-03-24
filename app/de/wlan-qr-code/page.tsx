import type { Metadata } from 'next'
import Client from '../../qr-generator/client'

export const metadata: Metadata = {
  title: 'WLAN QR Code Generator — WiFi Passwort Teilen per QR',
  description: 'Erstelle einen QR Code für dein WLAN-Netzwerk. Gäste scannen und verbinden sich sofort. Kostenlos.',
  keywords: 'WLAN QR Code, WiFi QR Code Generator, WLAN Passwort QR, QR Code WLAN erstellen, WiFi teilen QR',
}

export default function Page() {
  return <Client />
}
