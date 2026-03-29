import type { Metadata } from 'next'
import CountdownClient from '../../countdown/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const COUNTDOWNS = [
  { slug: 'christmas-2026',       date: '2026-12-25', name: 'Christmas 2026',       title: 'Countdown to Christmas 2026' },
  { slug: 'new-year-2027',        date: '2027-01-01', name: 'New Year 2027',        title: 'Countdown to New Year 2027' },
  { slug: 'halloween-2026',       date: '2026-10-31', name: 'Halloween 2026',       title: 'Countdown to Halloween 2026' },
  { slug: 'valentines-day-2027',  date: '2027-02-14', name: "Valentine's Day 2027", title: "Countdown to Valentine's Day 2027" },
  { slug: 'black-friday-2026',    date: '2026-11-27', name: 'Black Friday 2026',    title: 'Countdown to Black Friday 2026' },
  { slug: 'easter-2027',          date: '2027-03-28', name: 'Easter 2027',          title: 'Countdown to Easter 2027' },
  { slug: 'summer-2026',          date: '2026-06-21', name: 'Summer 2026',          title: 'Countdown to Summer 2026' },
  { slug: 'spring-2027',          date: '2027-03-20', name: 'Spring 2027',          title: 'Countdown to Spring 2027' },
  { slug: 'thanksgiving-2026',    date: '2026-11-26', name: 'Thanksgiving 2026',    title: 'Countdown to Thanksgiving 2026' },
  { slug: 'mothers-day-2027',     date: '2027-05-09', name: "Mother's Day 2027",    title: "Countdown to Mother's Day 2027" },
  { slug: 'fathers-day-2026',     date: '2026-06-21', name: "Father's Day 2026",    title: "Countdown to Father's Day 2026" },
  { slug: 'new-year-2028',        date: '2028-01-01', name: 'New Year 2028',        title: 'Countdown to New Year 2028' },
]

export function generateStaticParams() {
  return COUNTDOWNS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = COUNTDOWNS.find(c => c.slug === slug)
  if (!entry) return { title: 'Countdown Timer' }
  const desc = `Live countdown to ${entry.name}. See exact days, hours, minutes, and seconds remaining.`
  return {
    title: `${entry.title} — Live Countdown`,
    description: desc,
    keywords: `countdown to ${entry.name}, days until ${entry.name}, ${entry.name} countdown`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(entry.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function CountdownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = COUNTDOWNS.find(c => c.slug === slug)
  const jsonLd = generateToolJsonLd({
    name: entry?.title ?? 'Countdown Timer',
    url: `https://tools4free.site/countdown-to/${slug}`,
    description: `Live countdown to ${entry?.name ?? 'an event'}.`,
    category: 'UtilityApplication',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CountdownClient defaultDate={entry?.date ?? ''} defaultName={entry?.name ?? ''} />
    </>
  )
}
