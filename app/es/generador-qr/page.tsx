import type { Metadata } from 'next'
import Client from '../../qr-generator/client'

export const metadata: Metadata = {
  title: 'Generador de Código QR Gratis Online',
  description: 'Crea códigos QR para URLs, WiFi, email y teléfono. Temas de color. Descarga PNG gratis. Sin registro.',
  keywords: 'generador qr, crear código qr, qr gratis, generador código qr online',
}

export default function Page() {
  return <Client />
}
