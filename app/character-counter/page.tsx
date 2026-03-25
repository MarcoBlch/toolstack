import type { Metadata } from 'next'
import WordCounterClient from '../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Character Counter — Count Letters Online',
  description: 'Count characters, letters, words and sentences in your text. Free online character counter. No signup.',
  keywords: 'character counter, letter counter',
  openGraph: { images: ['/api/og?title=Character%20Counter&description=Count%20characters%2C%20letters%2C%20words%20and%20sentences%20in%20your%20text.%20Free%20online%20character%20counter.%20No%20signu'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Character Counter',
  url: 'https://tools4free.site/character-counter',
  description: 'Count characters, letters, words and sentences in your text. Free online character counter. No signup.',
  category: 'UtilityApplication',
})

export default function CharacterCounterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WordCounterClient />
    </>
  )
}
