import type { Metadata } from 'next'
import Client from '../../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Générateur de QR Code Gratuit en Ligne',
  description: 'Créez des QR codes pour URLs, WiFi, email et téléphone. Thèmes de couleurs. Téléchargement PNG gratuit. Sans inscription.',
  keywords: 'générateur qr code, créer qr code, qr code gratuit, générateur code qr en ligne',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20de%20QR%20Code%20Gratuit%20en%20Ligne&description=Cr%C3%A9ez%20des%20QR%20codes%20pour%20URLs%2C%20WiFi%2C%20email%20et%20t%C3%A9l%C3%A9phone.%20Th%C3%A8mes%20de%20couleurs.%20T%C3%A9l%C3%A9chargement%20PNG%20gratu'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de QR Code Gratuit en Ligne',
  url: 'https://tools4free.site/fr/generateur-qr-code',
  description: 'Créez des QR codes pour URLs, WiFi, email et téléphone. Thèmes de couleurs. Téléchargement PNG gratuit. Sans inscription.',
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
