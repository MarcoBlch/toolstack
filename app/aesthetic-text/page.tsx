import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'

export const metadata: Metadata = {
  title: 'Aesthetic Text Generator — Vaporwave & Spaced Fonts',
  description: 'Create aesthetic vaporwave text with wide spacing. Copy & paste stylish spaced-out text for social media. Free generator.',
  keywords: 'aesthetic text, vaporwave text, spaced text',
}

export default function AestheticTextPage() {
  return <FancyTextClient />
}
