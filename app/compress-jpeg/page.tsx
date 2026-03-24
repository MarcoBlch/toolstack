import type { Metadata } from 'next'
import ImageCompressorClient from '../image-compressor/client'

export const metadata: Metadata = {
  title: 'Compress JPEG Online Free',
  description: 'Compress JPEG and JPG images online for free. Reduce file size up to 80%. No upload — runs in your browser.',
  keywords: 'compress jpeg, jpg compressor',
}

export default function CompressJpegPage() {
  return <ImageCompressorClient />
}
