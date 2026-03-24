import type { Metadata } from 'next'
import FaviconClient from './client'

export const metadata: Metadata = {
  title: 'Favicon Generator — Free Icon Maker from Text or Image',
  description: 'Generate favicons from a letter, emoji, or uploaded image. Download all sizes (16, 32, 48, 180, 512). Free, instant.',
  keywords: 'favicon generator, favicon maker, ico generator, favicon from text, app icon generator, favicon creator',
}

export default function FaviconPage() {
  return <FaviconClient />
}
