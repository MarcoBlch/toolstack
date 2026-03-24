import type { Metadata } from 'next'
import LoremClient from './client'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Free Placeholder Text Generator',
  description: 'Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words. Copy instantly. Free, no signup.',
  keywords: 'lorem ipsum generator, placeholder text, dummy text generator, random text generator, lipsum',
}

export default function LoremPage() {
  return <LoremClient />
}
