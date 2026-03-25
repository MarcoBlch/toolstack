import type { Metadata } from 'next'
import Client from '../../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Gerador de QR Code Grátis Online',
  description: 'Crie QR codes para URLs, WiFi, email e telefone. Temas de cores. Download PNG grátis. Sem cadastro.',
  keywords: 'gerador qr code, criar qr code, qr code grátis, gerador código qr online',
  openGraph: { images: ['/api/og?title=Gerador%20de%20QR%20Code%20Gr%C3%A1tis%20Online&description=Crie%20QR%20codes%20para%20URLs%2C%20WiFi%2C%20email%20e%20telefone.%20Temas%20de%20cores.%20Download%20PNG%20gr%C3%A1tis.%20Sem%20cadastro.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de QR Code Grátis Online',
  url: 'https://tools4free.site/pt/gerador-qr',
  description: 'Crie QR codes para URLs, WiFi, email e telefone. Temas de cores. Download PNG grátis. Sem cadastro.',
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
