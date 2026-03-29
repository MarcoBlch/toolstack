import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Weeks Calculator — Weeks Between Dates & Add Weeks to a Date',
  description: 'Free weeks calculator. Calculate how many weeks between two dates, or find the date X weeks from today. Instant results with remaining days.',
  keywords: 'weeks calculator, weeks between dates, how many weeks between, add weeks to date, weeks from today, weeks from now',
  alternates: getAlternates('/weeks-calculator'),
  openGraph: { images: ['/api/og?title=Weeks%20Calculator&description=Weeks%20between%20two%20dates%20or%20add%20weeks%20to%20a%20date.%20Instant%20results.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Weeks Calculator',
  url: 'https://tools4free.site/weeks-calculator',
  description: 'Free weeks calculator. Calculate weeks between two dates or find the date X weeks from today.',
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
