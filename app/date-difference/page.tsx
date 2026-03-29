import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Days Between Two Dates',
  description: 'Free date difference calculator. Calculate exact days, weeks, months, years between two dates. Includes business days calculator. Instant results.',
  keywords: 'date difference calculator, days between dates, weeks between dates, months between dates, business days calculator, how many days between',
  alternates: getAlternates('/date-difference'),
  openGraph: { images: ['/api/og?title=Date%20Difference%20Calculator&description=Calculate%20exact%20days%2C%20weeks%2C%20months%20between%20two%20dates.%20Business%20days%20included.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Date Difference Calculator',
  url: 'https://tools4free.site/date-difference',
  description: 'Free date difference calculator. Calculate exact days, weeks, months, years between two dates. Includes business days calculator.',
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
