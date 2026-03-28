import type { Metadata } from 'next'
import MarkupClient from '../../markup-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

function fmt(n: number): string {
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)
}

const DATA = [
  // markup [10,20,25,30,40,50,100] x cost [25,50,100]
  ...[10, 20, 25, 30, 40, 50, 100].flatMap(markup =>
    [25, 50, 100].map(cost => {
      const sellingPrice = cost * (1 + markup / 100)
      const profit = sellingPrice - cost
      return {
        slug: `${markup}-percent-markup-on-${cost}`,
        markup,
        cost,
        sellingPrice,
        profit,
        title: `${markup}% Markup on $${cost} — Selling Price $${fmt(sellingPrice)}`,
        desc: `${markup}% markup on $${cost} cost = $${fmt(sellingPrice)} selling price with $${fmt(profit)} profit. Calculate any markup instantly.`,
        keywords: `${markup} percent markup on ${cost}, ${markup}% markup $${cost}, markup calculator, selling price calculator`,
      }
    })
  ),
]

export function generateStaticParams() {
  return DATA.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)
  if (!p) return { title: 'Markup Calculator' }

  return {
    title: p.title,
    description: p.desc,
    keywords: p.keywords,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(p.title)}&description=${encodeURIComponent(p.desc)}`] },
  }
}

export default async function MarkupSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)

  const jsonLd = generateToolJsonLd({
    name: p ? `${p.markup}% Markup on $${p.cost} Calculator` : 'Markup Calculator',
    url: `https://tools4free.site/markup/${slug}`,
    description: p ? p.desc : 'Calculate any markup instantly.',
    category: 'BusinessApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {p ? (
        <MarkupClient defaultCost={p.cost} defaultMarkup={p.markup} />
      ) : (
        <MarkupClient />
      )}
    </>
  )
}
