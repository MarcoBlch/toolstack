import type { Metadata } from 'next'
import DaysUntilClient from '../../days-until/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const DAYS_TO = [
  { slug: 'days-until-christmas',     event: 'christmas',    title: 'How Many Days Until Christmas?' },
  { slug: 'days-until-new-year',      event: 'new-year',     title: 'How Many Days Until New Year?' },
  { slug: 'days-until-halloween',     event: 'halloween',    title: 'How Many Days Until Halloween?' },
  { slug: 'days-until-summer',        event: 'summer',       title: 'How Many Days Until Summer?' },
  { slug: 'days-until-black-friday',  event: 'black-friday', title: 'How Many Days Until Black Friday?' },
  { slug: 'days-until-valentines-day',event: 'valentines',   title: "How Many Days Until Valentine's Day?" },
  { slug: 'days-until-easter',        event: 'easter',       title: 'How Many Days Until Easter?' },
  { slug: 'days-until-thanksgiving',  event: 'thanksgiving', title: 'How Many Days Until Thanksgiving?' },
  { slug: 'days-until-spring',        event: 'spring',       title: 'How Many Days Until Spring?' },
  { slug: 'days-until-winter',        event: 'winter',       title: 'How Many Days Until Winter?' },
]

export function generateStaticParams() {
  return DAYS_TO.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = DAYS_TO.find(d => d.slug === slug)
  if (!entry) return { title: 'Days Until Calculator' }
  const desc = `${entry.title} Find out exactly how many days, hours, and business days remain. Free calculator, updated daily.`
  return {
    title: `${entry.title} Free Days Until Calculator`,
    description: desc,
    keywords: entry.title.toLowerCase().replace('?','') + ', ' + entry.slug.replace(/-/g,' '),
    openGraph: { images: [`/api/og?title=${encodeURIComponent(entry.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function DaysToPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = DAYS_TO.find(d => d.slug === slug)
  const jsonLd = generateToolJsonLd({
    name: entry?.title ?? 'Days Until Calculator',
    url: `https://tools4free.site/days-to/${slug}`,
    description: entry?.title ?? 'Free days until calculator.',
    category: 'UtilityApplication',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DaysUntilClient defaultEvent={entry?.event ?? 'christmas'} />
    </>
  )
}
