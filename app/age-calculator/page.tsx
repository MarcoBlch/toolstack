import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Age Calculator — How Old Am I? Free Exact Age Calculator',
  description: 'Free age calculator. Calculate your exact age in years, months, days, and hours. Find your zodiac sign, Chinese zodiac, and days until your next birthday.',
  keywords: 'age calculator, how old am I, exact age, birthday calculator, zodiac sign calculator, age in days, years months days',
  alternates: getAlternates('/age-calculator'),
  openGraph: { images: ['/api/og?title=Age%20Calculator&description=Calculate%20your%20exact%20age%20in%20years%2C%20months%2C%20days%2C%20hours.%20Zodiac%20sign%20%26%20birthday%20countdown.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Age Calculator',
  url: 'https://tools4free.site/age-calculator',
  description: 'Free age calculator. Calculate your exact age in years, months, days, and hours. Find your zodiac sign, Chinese zodiac, and days until your next birthday.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
