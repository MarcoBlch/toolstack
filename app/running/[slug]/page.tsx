import type { Metadata } from 'next'
import PaceClient from '../../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const PACES = [
  { slug: '5k-in-20-minutes', distance: 5, time: 20 * 60, title: '5K in 20 Minutes' },
  { slug: '5k-in-25-minutes', distance: 5, time: 25 * 60, title: '5K in 25 Minutes' },
  { slug: '5k-in-30-minutes', distance: 5, time: 30 * 60, title: '5K in 30 Minutes' },
  { slug: '5k-in-35-minutes', distance: 5, time: 35 * 60, title: '5K in 35 Minutes' },
  { slug: '10k-in-45-minutes', distance: 10, time: 45 * 60, title: '10K in 45 Minutes' },
  { slug: '10k-in-50-minutes', distance: 10, time: 50 * 60, title: '10K in 50 Minutes' },
  { slug: '10k-in-60-minutes', distance: 10, time: 60 * 60, title: '10K in 60 Minutes' },
  { slug: '10k-in-70-minutes', distance: 10, time: 70 * 60, title: '10K in 70 Minutes' },
  { slug: 'half-marathon-in-1h30', distance: 21.0975, time: 90 * 60, title: 'Half Marathon in 1:30' },
  { slug: 'half-marathon-in-1h45', distance: 21.0975, time: 105 * 60, title: 'Half Marathon in 1:45' },
  { slug: 'half-marathon-in-2h00', distance: 21.0975, time: 120 * 60, title: 'Half Marathon in 2:00' },
  { slug: 'half-marathon-in-2h15', distance: 21.0975, time: 135 * 60, title: 'Half Marathon in 2:15' },
  { slug: 'marathon-in-3h00', distance: 42.195, time: 180 * 60, title: 'Marathon in 3:00' },
  { slug: 'marathon-in-3h30', distance: 42.195, time: 210 * 60, title: 'Marathon in 3:30' },
  { slug: 'marathon-in-4h00', distance: 42.195, time: 240 * 60, title: 'Marathon in 4:00' },
  { slug: 'marathon-in-4h30', distance: 42.195, time: 270 * 60, title: 'Marathon in 4:30' },
]

export function generateStaticParams() {
  return PACES.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const pace = PACES.find(p => p.slug === slug)
  if (!pace) return { title: 'Pace Calculator' }

  const pacePerKm = pace.time / pace.distance
  const paceMin = Math.floor(pacePerKm / 60)
  const paceSec = Math.round(pacePerKm % 60)
  const desc = `${pace.title} — that's a ${paceMin}:${String(paceSec).padStart(2, '0')}/km pace. Free pace calculator with splits table.`

  return {
    title: `${pace.title} — Pace Calculator`,
    description: desc,
    keywords: `${pace.slug.replace(/-/g, ' ')}, running pace, pace calculator, ${pace.title.toLowerCase()}`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(pace.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function RunningPacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pace = PACES.find(p => p.slug === slug)
  if (!pace) return <PaceClient />

  const jsonLd = generateToolJsonLd({
    name: `${pace.title} — Pace Calculator`,
    url: `https://tools4free.site/running/${pace.slug}`,
    description: `Calculate the pace needed to run ${pace.title}. Free pace calculator with split times.`,
    category: 'HealthApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PaceClient
        defaultDistance={pace.distance}
        defaultTime={pace.time}
      />
    </>
  )
}
