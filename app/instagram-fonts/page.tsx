import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'

export const metadata: Metadata = {
  title: 'Instagram Fonts Generator — Cool Bio Fonts & Stylish Text',
  description: 'Generate cool fonts for your Instagram bio, captions & stories. Copy & paste stylish text instantly. Free, no signup.',
  keywords: 'instagram fonts, instagram bio fonts, ig fonts',
}

export default function InstagramFontsPage() {
  return <FancyTextClient />
}
