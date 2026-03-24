import type { Metadata } from 'next'
import Client from '../../qr-generator/client'

export const metadata: Metadata = {
  title: 'Gerador de QR Code Grátis Online',
  description: 'Crie QR codes para URLs, WiFi, email e telefone. Temas de cores. Download PNG grátis. Sem cadastro.',
  keywords: 'gerador qr code, criar qr code, qr code grátis, gerador código qr online',
}

export default function Page() {
  return <Client />
}
