import type { Metadata } from 'next'
import Base64Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Free Online Base64 Tool',
  description: 'Encode text to Base64 or decode Base64 back to text instantly. Image to Base64 data URI. Free, no signup, 100% local.',
  keywords: 'base64 encode, base64 decode, base64 encoder, base64 decoder, base64 to text, text to base64, image to base64',
  openGraph: { images: ['/api/og?title=Base64%20Encoder%20%26%20Decoder&description=Encode%20text%20to%20Base64%20or%20decode%20Base64%20back%20to%20text%20instantly.%20Image%20to%20Base64%20data%20URI.%20Free%2C%20no%20si'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Base64 Encoder & Decoder',
  url: 'https://tools4free.site/base64',
  description: 'Encode text to Base64 or decode Base64 back to text instantly. Image to Base64 data URI. Free, no signup, 100% local.',
  category: 'DeveloperApplication',
})

export default function Base64Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Base64Client />
    </>
  )
}
