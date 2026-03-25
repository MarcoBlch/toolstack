import type { Metadata } from 'next'
import DueDateClient from '../../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DUE_DATES = [
  // 12 months of 2026
  ...Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    const name = MONTH_NAMES[i]
    return {
      slug: `conceived-${name.toLowerCase()}-2026`,
      month,
      year: 2026,
      monthName: name,
      defaultDate: `2026-${String(month).padStart(2, '0')}-15`,
      title: `Due Date If Conceived in ${name} 2026`,
    }
  }),
  // 6 months of 2027
  ...Array.from({ length: 6 }, (_, i) => {
    const month = i + 1
    const name = MONTH_NAMES[i]
    return {
      slug: `conceived-${name.toLowerCase()}-2027`,
      month,
      year: 2027,
      monthName: name,
      defaultDate: `2027-${String(month).padStart(2, '0')}-15`,
      title: `Due Date If Conceived in ${name} 2027`,
    }
  }),
]

export function generateStaticParams() {
  return DUE_DATES.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = DUE_DATES.find(d => d.slug === slug)
  if (!entry) return { title: 'Due Date Calculator' }

  const desc = `${entry.title}. Free pregnancy due date calculator based on conception date. Estimated delivery date, trimester info, and milestones.`

  return {
    title: `${entry.title} — Free Calculator`,
    description: desc,
    keywords: `due date ${entry.monthName.toLowerCase()} ${entry.year}, conceived ${entry.monthName.toLowerCase()} ${entry.year}, pregnancy due date calculator, when is my baby due`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(entry.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function DueDatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = DUE_DATES.find(d => d.slug === slug)
  if (!entry) return <DueDateClient />

  const jsonLd = generateToolJsonLd({
    name: entry.title,
    url: `https://tools4free.site/due-date/${entry.slug}`,
    description: `${entry.title}. Free pregnancy due date calculator based on conception date.`,
    category: 'HealthApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DueDateClient
        defaultMethod="conception"
        defaultDate={entry.defaultDate}
      />
    </>
  )
}
