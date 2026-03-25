import type { Metadata } from 'next'
import ImageCompressorClient from '../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Compress JPEG Online Free',
  description: 'Compress JPEG and JPG images online for free. Reduce file size up to 80%. No upload — runs in your browser.',
  keywords: 'compress jpeg, jpg compressor',
  openGraph: { images: ['/api/og?title=Compress%20JPEG%20Online%20Free&description=Compress%20JPEG%20and%20JPG%20images%20online%20for%20free.%20Reduce%20file%20size%20up%20to%2080%25.%20No%20upload%20%E2%80%94%20runs%20in%20your%20b'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compress JPEG Online Free',
  url: 'https://tools4free.site/compress-jpeg',
  description: 'Compress JPEG and JPG images online for free. Reduce file size up to 80%. No upload — runs in your browser.',
  category: 'DesignApplication',
})

export default function CompressJpegPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImageCompressorClient />
    </>
  )
}
