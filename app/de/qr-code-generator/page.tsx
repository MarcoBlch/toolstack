import type { Metadata } from 'next'
import Client from '../../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/qr-generator'),
  title: 'QR Code Generator Kostenlos — QR Code Erstellen Online',
  description: 'Erstelle kostenlose QR Codes für URLs, WLAN, E-Mail, Telefon. Farbthemen, PNG Download. Ohne Anmeldung, ohne Wasserzeichen.',
  keywords: 'QR Code Generator, QR Code erstellen, kostenloser QR Code, WLAN QR Code, QR Code Generator kostenlos online',
  openGraph: { images: ['/api/og?title=QR%20Code%20Generator%20Kostenlos&description=Erstelle%20kostenlose%20QR%20Codes%20f%C3%BCr%20URLs%2C%20WLAN%2C%20E-Mail%2C%20Telefon.%20Farbthemen%2C%20PNG%20Download.%20Ohne%20Anmeldu'] },
}

const jsonLd = generateToolJsonLd({
  name: 'QR Code Generator Kostenlos',
  url: 'https://tools4free.site/de/qr-code-generator',
  description: 'Erstelle kostenlose QR Codes für URLs, WLAN, E-Mail, Telefon. Farbthemen, PNG Download. Ohne Anmeldung, ohne Wasserzeichen.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
