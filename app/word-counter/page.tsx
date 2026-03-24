import type { Metadata } from 'next'
import WordCounterClient from './client'

export const metadata: Metadata = {
  title: 'Word Counter — Free Online Word & Character Counter Tool',
  description: 'Count words, characters, sentences, paragraphs. See reading time and speaking time. Free, instant, no signup required.',
  keywords: 'word counter, character counter, letter counter, word count tool, reading time calculator',
}

export default function WordCounterPage() {
  return <WordCounterClient />
}
