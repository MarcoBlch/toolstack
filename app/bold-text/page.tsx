import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'

export const metadata: Metadata = {
  title: 'Bold Text Generator — Unicode Bold Letters',
  description: 'Generate bold Unicode text you can copy & paste anywhere. Works on Instagram, Twitter, Facebook & more. Free bold font generator.',
  keywords: 'bold text, bold letters, bold font',
}

export default function BoldTextPage() {
  return <FancyTextClient />
}
