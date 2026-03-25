import type { Metadata } from 'next'
import ImageCompressorClient from '../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Compress PNG Online Free',
  description: 'Compress PNG images online for free. Reduce file size up to 80% without losing quality. No upload — runs in your browser.',
  keywords: 'compress png, png compressor',
  openGraph: { images: ['/api/og?title=Compress%20PNG%20Online%20Free&description=Compress%20PNG%20images%20online%20for%20free.%20Reduce%20file%20size%20up%20to%2080%25%20without%20losing%20quality.%20No%20upload%20%E2%80%94%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compress PNG Online Free',
  url: 'https://tools4free.site/compress-png',
  description: 'Compress PNG images online for free. Reduce file size up to 80% without losing quality. No upload — runs in your browser.',
  category: 'DesignApplication',
})

export default function CompressPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImageCompressorClient />
    </>
  )
}
