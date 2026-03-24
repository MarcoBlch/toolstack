import type { Metadata } from 'next'
import WordCounterClient from '../word-counter/client'

export const metadata: Metadata = {
  title: 'Character Counter — Count Letters Online',
  description: 'Count characters, letters, words and sentences in your text. Free online character counter. No signup.',
  keywords: 'character counter, letter counter',
}

export default function CharacterCounterPage() {
  return <WordCounterClient />
}
