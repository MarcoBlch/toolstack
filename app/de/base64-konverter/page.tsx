import type { Metadata } from 'next'
import Client from '../../base64/client'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Kostenlos Online Kodieren',
  description: 'Kodiere Text zu Base64 oder dekodiere Base64 zurück. Bild zu Data-URI. Kostenlos, privat, läuft lokal.',
  keywords: 'Base64 Encoder, Base64 Decoder, Base64 kodieren, Base64 dekodieren, Base64 Konverter, Base64 online',
}

export default function Page() {
  return <Client />
}
