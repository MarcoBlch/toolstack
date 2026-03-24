import type { Metadata } from 'next'
import Client from '../../qr-generator/client'

export const metadata: Metadata = {
  title: 'Générateur de QR Code Gratuit en Ligne',
  description: 'Créez des QR codes pour URLs, WiFi, email et téléphone. Thèmes de couleurs. Téléchargement PNG gratuit. Sans inscription.',
  keywords: 'générateur qr code, créer qr code, qr code gratuit, générateur code qr en ligne',
}

export default function Page() {
  return <Client />
}
