import type { Metadata } from 'next'
import IdealWeightClient from '../../ideal-weight/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const HEIGHTS = [
  ...[150,152,155,157,160,162,165,167,170,172,175,177,180,182,185,187,190,193,195,198,200].map(cm => ({
    slug: `${cm}cm`, height: cm, title: `Ideal Weight for ${cm} cm`,
  })),
  ...([[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[6,0],[6,1],[6,2],[6,3],[6,4]] as [number, number][]).map(([ft, inch]) => ({
    slug: `${ft}ft${inch}`, height: Math.round(ft * 30.48 + inch * 2.54), title: `Ideal Weight for ${ft}'${inch}"`,
  })),
]

export function generateStaticParams() {
  return HEIGHTS.map(h => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = HEIGHTS.find(h => h.slug === slug)
  if (!entry) return { title: 'Ideal Weight Calculator' }

  const desc = `${entry.title}. Calculate your ideal body weight using multiple medical formulas. Free calculator — no signup.`

  return {
    title: `${entry.title} — Free Calculator`,
    description: desc,
    keywords: `${entry.title.toLowerCase()}, ideal weight calculator, healthy weight ${entry.height}cm`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(entry.title)}&description=${encodeURIComponent(desc)}`] },
  }
}

export default async function IdealWeightForPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = HEIGHTS.find(h => h.slug === slug)
  if (!entry) return <IdealWeightClient />

  const jsonLd = generateToolJsonLd({
    name: entry.title,
    url: `https://tools4free.site/ideal-weight-for/${entry.slug}`,
    description: `${entry.title}. Calculate your ideal body weight using multiple medical formulas.`,
    category: 'HealthApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IdealWeightClient defaultHeight={entry.height} />
    </>
  )
}
