import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'

export const metadata: Metadata = {
  title: 'Cursive Text Generator — Free Fancy Cursive Font',
  description: 'Convert your text to beautiful cursive and script fonts. Copy & paste anywhere. Free online cursive text generator.',
  keywords: 'cursive text, cursive font, script text',
}

export default function CursiveTextPage() {
  return <FancyTextClient />
}
