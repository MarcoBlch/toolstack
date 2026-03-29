import type { Metadata } from 'next'
import AgeClient from '../../age-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const AGE_SLUGS = [1960,1965,1970,1975,1980,1985,1988,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010].map(year => ({
  slug: `born-in-${year}`,
  year,
  defaultBirthDate: `${year}-07-01`,
  title: `How Old Am I If I Was Born in ${year}?`,
  desc: `Age calculator for someone born in ${year}. See exact years, months, days, total days lived, zodiac sign, and next birthday countdown.`,
}))

export function generateStaticParams() {
  return AGE_SLUGS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = AGE_SLUGS.find(s => s.slug === slug)
  if (!entry) return { title: 'Age Calculator' }
  return {
    title: `${entry.title} — Free Age Calculator`,
    description: entry.desc,
    keywords: `how old am I if born in ${entry.year}, age calculator ${entry.year}, born in ${entry.year} how old`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(entry.title)}&description=${encodeURIComponent(entry.desc)}`] },
  }
}

export default async function AgePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = AGE_SLUGS.find(s => s.slug === slug)
  const jsonLd = generateToolJsonLd({
    name: entry?.title ?? 'Age Calculator',
    url: `https://tools4free.site/age/${slug}`,
    description: entry?.desc ?? 'Free age calculator.',
    category: 'UtilityApplication',
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AgeClient defaultBirthDate={entry?.defaultBirthDate ?? ''} />
    </>
  )
}
