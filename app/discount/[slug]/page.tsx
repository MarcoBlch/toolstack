import type { Metadata } from 'next'
import DiscountClient from '../../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

function fmt(n: number): string {
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)
}

const DATA = [
  // 5% off
  ...[10, 25, 50, 100, 200, 500].map(y => ({ x: 5, y })),
  // 10% off
  ...[10, 25, 50, 100, 200, 500, 1000].map(y => ({ x: 10, y })),
  // 15% off
  ...[25, 50, 100, 200, 500].map(y => ({ x: 15, y })),
  // 20% off
  ...[25, 50, 100, 200, 500, 1000].map(y => ({ x: 20, y })),
  // 25% off
  ...[25, 50, 100, 200, 500, 1000].map(y => ({ x: 25, y })),
  // 30% off
  ...[25, 50, 100, 200, 500, 1000].map(y => ({ x: 30, y })),
  // 40% off
  ...[50, 100, 200, 500, 1000].map(y => ({ x: 40, y })),
  // 50% off
  ...[25, 50, 100, 200, 500, 1000].map(y => ({ x: 50, y })),
  // 60% off
  ...[50, 100, 200, 500].map(y => ({ x: 60, y })),
  // 70% off
  ...[50, 100, 200, 500].map(y => ({ x: 70, y })),
  // 75% off
  ...[100, 200, 500, 1000].map(y => ({ x: 75, y })),
].map(({ x, y }) => {
  const savings = y * (x / 100)
  const final_ = y - savings
  return {
    slug: `${x}-percent-off-${y}`,
    x,
    y,
    savings,
    final: final_,
    title: `${x}% Off $${y} — Save $${fmt(savings)} | Discount Calculator`,
    desc: `${x}% off $${y} = $${fmt(savings)} discount. You pay $${fmt(final_)}. Calculate any discount instantly.`,
    keywords: `${x} percent off ${y}, ${x}% off $${y}, ${x} percent off ${y} dollars, discount calculator`,
  }
})

export function generateStaticParams() {
  return DATA.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)
  if (!p) return { title: 'Discount Calculator' }

  return {
    title: p.title,
    description: p.desc,
    keywords: p.keywords,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(p.title)}&description=${encodeURIComponent(p.desc)}`] },
  }
}

export default async function DiscountSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)

  const jsonLd = generateToolJsonLd({
    name: p ? `${p.x}% Off $${p.y} Discount Calculator` : 'Discount Calculator',
    url: `https://tools4free.site/discount/${slug}`,
    description: p ? p.desc : 'Calculate any discount instantly.',
    category: 'BusinessApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {p ? (
        <DiscountClient defaultOriginal={p.y} defaultDiscount={p.x} />
      ) : (
        <DiscountClient />
      )}
    </>
  )
}
