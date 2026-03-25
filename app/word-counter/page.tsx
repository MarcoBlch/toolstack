import type { Metadata } from 'next'
import WordCounterClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Word Counter — Free Online Word & Character Counter Tool',
  description: 'Count words, characters, sentences, paragraphs. See reading time and speaking time. Free, instant, no signup required.',
  keywords: 'word counter, character counter, letter counter, word count tool, reading time calculator',
  openGraph: { images: ['/api/og?title=Word%20Counter&description=Count%20words%2C%20characters%2C%20sentences%2C%20paragraphs.%20See%20reading%20time%20and%20speaking%20time.%20Free%2C%20instant%2C%20n'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Word Counter',
  url: 'https://tools4free.site/word-counter',
  description: 'Count words, characters, sentences, paragraphs. See reading time and speaking time. Free, instant, no signup required.',
  category: 'UtilityApplication',
})

export default function WordCounterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WordCounterClient />
    </>
  )
}
