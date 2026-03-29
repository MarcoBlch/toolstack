import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Days Until Calculator — How Many Days Until Christmas, New Year?',
  description: 'Free days until calculator. How many days until Christmas, New Year, Halloween, Easter, Valentine\'s Day, and any custom date. Business days included.',
  keywords: 'days until Christmas, how many days until New Year, days until Halloween, days until calculator, how many days until',
  alternates: getAlternates('/days-until'),
  openGraph: { images: ['/api/og?title=Days%20Until%20Calculator&description=How%20many%20days%20until%20Christmas%2C%20New%20Year%2C%20Halloween%3F%20Free%20calculator.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Days Until Calculator',
  url: 'https://tools4free.site/days-until',
  description: 'Free days until calculator. How many days until Christmas, New Year, Halloween, Easter, Valentine\'s Day, and any custom date.',
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
