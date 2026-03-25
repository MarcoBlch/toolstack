import type { Metadata } from 'next'
import RegexClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Regex Tester — Free Online Regular Expression Tester',
  description: 'Test regular expressions in real-time. See matches highlighted instantly. Supports JavaScript regex with flags. Free, no signup.',
  keywords: 'regex tester, regular expression tester, regex online, regex checker, regex validator, regex match',
  openGraph: { images: ['/api/og?title=Regex%20Tester&description=Test%20regular%20expressions%20in%20real-time.%20See%20matches%20highlighted%20instantly.%20Supports%20JavaScript%20regex%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Regex Tester',
  url: 'https://tools4free.site/regex-tester',
  description: 'Test regular expressions in real-time. See matches highlighted instantly. Supports JavaScript regex with flags. Free, no signup.',
  category: 'DeveloperApplication',
})

export default function RegexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RegexClient />
    </>
  )
}
