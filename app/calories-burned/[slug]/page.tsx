import type { Metadata } from 'next'
import CaloriesBurnedClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

const ACTIVITIES = [
  { slug: 'calories-burned-walking-30-min', activity: 'Walking', minutes: 30, metValue: 3.5, title: 'Calories Burned Walking 30 Minutes' },
  { slug: 'calories-burned-walking-1-hour', activity: 'Walking', minutes: 60, metValue: 3.5, title: 'Calories Burned Walking 1 Hour' },
  { slug: 'calories-burned-running-30-min', activity: 'Running', minutes: 30, metValue: 9.8, title: 'Calories Burned Running 30 Minutes' },
  { slug: 'calories-burned-running-1-hour', activity: 'Running', minutes: 60, metValue: 9.8, title: 'Calories Burned Running 1 Hour' },
  { slug: 'calories-burned-cycling-30-min', activity: 'Cycling', minutes: 30, metValue: 7.5, title: 'Calories Burned Cycling 30 Minutes' },
  { slug: 'calories-burned-cycling-1-hour', activity: 'Cycling', minutes: 60, metValue: 7.5, title: 'Calories Burned Cycling 1 Hour' },
  { slug: 'calories-burned-swimming-30-min', activity: 'Swimming', minutes: 30, metValue: 8.0, title: 'Calories Burned Swimming 30 Minutes' },
  { slug: 'calories-burned-swimming-1-hour', activity: 'Swimming', minutes: 60, metValue: 8.0, title: 'Calories Burned Swimming 1 Hour' },
  { slug: 'calories-burned-yoga-30-min', activity: 'Yoga', minutes: 30, metValue: 3.0, title: 'Calories Burned Yoga 30 Minutes' },
  { slug: 'calories-burned-yoga-1-hour', activity: 'Yoga', minutes: 60, metValue: 3.0, title: 'Calories Burned Yoga 1 Hour' },
  { slug: 'calories-burned-weightlifting-30-min', activity: 'Weightlifting', minutes: 30, metValue: 6.0, title: 'Calories Burned Weightlifting 30 Minutes' },
  { slug: 'calories-burned-weightlifting-1-hour', activity: 'Weightlifting', minutes: 60, metValue: 6.0, title: 'Calories Burned Weightlifting 1 Hour' },
  { slug: 'calories-burned-hiit-30-min', activity: 'HIIT', minutes: 30, metValue: 12.0, title: 'Calories Burned HIIT 30 Minutes' },
  { slug: 'calories-burned-dancing-30-min', activity: 'Dancing', minutes: 30, metValue: 5.5, title: 'Calories Burned Dancing 30 Minutes' },
  { slug: 'calories-burned-hiking-1-hour', activity: 'Hiking', minutes: 60, metValue: 6.0, title: 'Calories Burned Hiking 1 Hour' },
  { slug: 'calories-burned-jump-rope-30-min', activity: 'Jump Rope', minutes: 30, metValue: 11.0, title: 'Calories Burned Jump Rope 30 Minutes' },
  { slug: 'calories-burned-rowing-30-min', activity: 'Rowing', minutes: 30, metValue: 7.0, title: 'Calories Burned Rowing 30 Minutes' },
  { slug: 'calories-burned-pilates-1-hour', activity: 'Pilates', minutes: 60, metValue: 3.5, title: 'Calories Burned Pilates 1 Hour' },
  { slug: 'calories-burned-elliptical-30-min', activity: 'Elliptical', minutes: 30, metValue: 5.0, title: 'Calories Burned Elliptical 30 Minutes' },
  { slug: 'calories-burned-stairs-30-min', activity: 'Climbing Stairs', minutes: 30, metValue: 9.0, title: 'Calories Burned Climbing Stairs 30 Minutes' },
]

export function generateStaticParams() {
  return ACTIVITIES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const act = ACTIVITIES.find(a => a.slug === slug)
  if (!act) return { title: 'Calories Burned Calculator' }

  const desc = `How many calories does ${act.activity.toLowerCase()} burn in ${act.minutes} minutes? Free calculator with MET-based formula. Adjust by body weight.`

  return {
    title: `${act.title} — Free Calculator`,
    description: desc,
    keywords: `${act.slug.replace(/-/g, ' ')}, calories burned ${act.activity.toLowerCase()}, ${act.activity.toLowerCase()} calorie burn`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(act.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function CaloriesBurnedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const act = ACTIVITIES.find(a => a.slug === slug)
  if (!act) return <CaloriesBurnedClient activity="Walking" minutes={30} metValue={3.5} title="Calories Burned Calculator" />

  const jsonLd = generateToolJsonLd({
    name: act.title,
    url: `https://tools4free.site/calories-burned/${act.slug}`,
    description: `Calculate calories burned doing ${act.activity.toLowerCase()} for ${act.minutes} minutes. Free MET-based calculator.`,
    category: 'HealthApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaloriesBurnedClient
        activity={act.activity}
        minutes={act.minutes}
        metValue={act.metValue}
        title={act.title}
      />
    </>
  )
}
