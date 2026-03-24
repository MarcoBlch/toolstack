import type { Metadata } from 'next'
import ImageCompressorClient from '../image-compressor/client'

export const metadata: Metadata = {
  title: 'Compress PNG Online Free',
  description: 'Compress PNG images online for free. Reduce file size up to 80% without losing quality. No upload — runs in your browser.',
  keywords: 'compress png, png compressor',
}

export default function CompressPngPage() {
  return <ImageCompressorClient />
}
