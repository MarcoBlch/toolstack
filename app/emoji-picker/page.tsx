import type { Metadata } from 'next'
import EmojiClient from './client'

export const metadata: Metadata = {
  title: 'Emoji Picker — Copy & Paste Emojis, Search All Emoji',
  description: 'Browse and copy all emojis instantly. Search by name, browse by category. One click to copy. Free, no app needed.',
  keywords: 'emoji picker, emoji copy paste, emoji list, emoji keyboard online, emoji search, all emojis',
}

export default function EmojiPage() {
  return <EmojiClient />
}
