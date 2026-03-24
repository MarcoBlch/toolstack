import type { Metadata } from 'next'
import ImageCompressorClient from './client'

export const metadata: Metadata = {
  title: 'Image Compressor — Free Online PNG & JPEG Compression Tool',
  description: 'Compress images instantly in your browser. Reduce file size by up to 80% without losing quality. Supports JPEG, PNG, WebP. No upload to server.',
  keywords: 'image compressor, compress png, compress jpeg, reduce image size, image optimizer, photo compressor online free',
}

export default function ImageCompressorPage() {
  return <ImageCompressorClient />
}
