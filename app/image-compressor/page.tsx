import type { Metadata } from 'next'
import ImageCompressorClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Image Compressor — Free Online PNG & JPEG Compression Tool',
  description: 'Compress images instantly in your browser. Reduce file size by up to 80% without losing quality. Supports JPEG, PNG, WebP. No upload to server.',
  keywords: 'image compressor, compress png, compress jpeg, reduce image size, image optimizer, photo compressor online free',
  openGraph: { images: ['/api/og?title=Image%20Compressor&description=Compress%20images%20instantly%20in%20your%20browser.%20Reduce%20file%20size%20by%20up%20to%2080%25%20without%20losing%20quality.%20Sup'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Image Compressor',
  url: 'https://tools4free.site/image-compressor',
  description: 'Compress images instantly in your browser. Reduce file size by up to 80% without losing quality. Supports JPEG, PNG, WebP. No upload to server.',
  category: 'DesignApplication',
})

export default function ImageCompressorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ImageCompressorClient />
    </>
  )
}
