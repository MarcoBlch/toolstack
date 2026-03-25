import type { Metadata } from 'next'
import LoremClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Free Placeholder Text Generator',
  description: 'Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words. Copy instantly. Free, no signup.',
  keywords: 'lorem ipsum generator, placeholder text, dummy text generator, random text generator, lipsum',
  openGraph: { images: ['/api/og?title=Lorem%20Ipsum%20Generator&description=Generate%20lorem%20ipsum%20placeholder%20text.%20Choose%20paragraphs%2C%20sentences%2C%20or%20words.%20Copy%20instantly.%20Free%2C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Lorem Ipsum Generator',
  url: 'https://tools4free.site/lorem-generator',
  description: 'Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words. Copy instantly. Free, no signup.',
  category: 'UtilityApplication',
})

export default function LoremPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoremClient />
    </>
  )
}
