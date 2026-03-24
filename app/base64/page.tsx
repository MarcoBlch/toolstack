import type { Metadata } from 'next'
import Base64Client from './client'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Free Online Base64 Tool',
  description: 'Encode text to Base64 or decode Base64 back to text instantly. Image to Base64 data URI. Free, no signup, 100% local.',
  keywords: 'base64 encode, base64 decode, base64 encoder, base64 decoder, base64 to text, text to base64, image to base64',
}

export default function Base64Page() {
  return <Base64Client />
}
