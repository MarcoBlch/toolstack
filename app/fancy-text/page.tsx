import type { Metadata } from 'next'
import FancyTextClient from './client'

export const metadata: Metadata = {
  title: 'Fancy Text Generator ✦ Cool Fonts for Instagram, TikTok & Bio',
  description: 'Free fancy text generator. Convert text into 20+ Unicode font styles — bold, italic, cursive, bubble, aesthetic & more. Copy & paste anywhere. No signup.',
  keywords: 'fancy text generator, instagram fonts, cool text, font changer, unicode text, aesthetic text, cursive text generator',
}

export default function FancyTextPage() {
  return <FancyTextClient />
}
