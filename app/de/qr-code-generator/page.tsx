import type { Metadata } from 'next'
import Client from '../../qr-generator/client'

export const metadata: Metadata = {
  title: 'QR Code Generator Kostenlos — QR Code Erstellen Online',
  description: 'Erstelle kostenlose QR Codes für URLs, WLAN, E-Mail, Telefon. Farbthemen, PNG Download. Ohne Anmeldung, ohne Wasserzeichen.',
  keywords: 'QR Code Generator, QR Code erstellen, kostenloser QR Code, WLAN QR Code, QR Code Generator kostenlos online',
}

export default function Page() {
  return <Client />
}
