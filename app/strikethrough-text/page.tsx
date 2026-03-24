import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'

export const metadata: Metadata = {
  title: 'Strikethrough Text Generator — Free S\u0336t\u0336r\u0336i\u0336k\u0336e\u0336 Maker',
  description: 'Cross out text with strikethrough Unicode characters. Copy & paste strikethrough text anywhere. Free online generator.',
  keywords: 'strikethrough text, cross out text',
}

export default function StrikethroughTextPage() {
  return <FancyTextClient />
}
