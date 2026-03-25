import type { Metadata } from 'next'
import EmojiClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Emoji Picker — Copy & Paste Emojis, Search All Emoji',
  description: 'Browse and copy all emojis instantly. Search by name, browse by category. One click to copy. Free, no app needed.',
  keywords: 'emoji picker, emoji copy paste, emoji list, emoji keyboard online, emoji search, all emojis',
  openGraph: { images: ['/api/og?title=Emoji%20Picker&description=Browse%20and%20copy%20all%20emojis%20instantly.%20Search%20by%20name%2C%20browse%20by%20category.%20One%20click%20to%20copy.%20Free%2C%20n'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Emoji Picker',
  url: 'https://tools4free.site/emoji-picker',
  description: 'Browse and copy all emojis instantly. Search by name, browse by category. One click to copy. Free, no app needed.',
  category: 'DesignApplication',
})

export default function EmojiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EmojiClient />
    </>
  )
}
