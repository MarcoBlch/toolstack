import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Work Days Calculator — Business Days Between Dates',
  description: 'Free work days calculator. Calculate business days between two dates excluding weekends and public holidays. Add working days to a date. US, UK, FR, DE holidays.',
  keywords: 'work days calculator, business days between dates, working days calculator, business days calculator, exclude weekends, add business days',
  alternates: getAlternates('/work-days-calculator'),
  openGraph: { images: ['/api/og?title=Work%20Days%20Calculator&description=Business%20days%20between%20dates.%20Excludes%20weekends%20%26%20public%20holidays.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Work Days Calculator',
  url: 'https://tools4free.site/work-days-calculator',
  description: 'Free work days calculator. Calculate business days between two dates excluding weekends and public holidays.',
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
