import type { Metadata } from 'next'
import PercentageClient from '../../percentage-calculator/client'

const PERCENTAGES = [
  // "What is X% of Y" — popular combinations
  ...[
    [10, 100], [10, 200], [10, 500], [10, 1000],
    [15, 50], [15, 100], [15, 200], [15, 500],
    [20, 50], [20, 100], [20, 150], [20, 200], [20, 500], [20, 1000],
    [25, 100], [25, 200], [25, 500], [25, 1000],
    [30, 100], [30, 200], [30, 500],
    [33, 100], [33, 300], [33, 500],
    [50, 100], [50, 200], [50, 500], [50, 1000],
    [75, 100], [75, 200],
    // Tip-related
    [15, 25], [15, 30], [15, 40], [15, 50], [15, 60], [15, 75], [15, 100],
    [18, 25], [18, 30], [18, 40], [18, 50], [18, 60], [18, 75], [18, 100],
    [20, 25], [20, 30], [20, 40], [20, 50], [20, 60], [20, 75], [20, 100],
  ].map(([pct, val]) => ({
    slug: `what-is-${pct}-percent-of-${val}`,
    mode: 'whatIs',
    x: pct,
    y: val,
    result: (pct / 100 * val),
    title: `What is ${pct}% of ${val}?`,
    desc: `${pct}% of ${val} = ${(pct / 100 * val)}. Calculate any percentage instantly with our free percentage calculator.`,
  })),
]

export function generateStaticParams() {
  return PERCENTAGES.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = PERCENTAGES.find(x => x.slug === slug)
  if (!p) return { title: 'Percentage Calculator' }

  return {
    title: `${p.title} Answer: ${p.result} — Free Calculator`,
    description: p.desc,
    keywords: `what is ${p.x} percent of ${p.y}, ${p.x}% of ${p.y}, percentage calculator`,
  }
}

export default async function PercentSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = PERCENTAGES.find(x => x.slug === slug)
  if (!p) return <PercentageClient />

  return <PercentageClient
    defaultMode={p.mode}
    defaultX={p.x}
    defaultY={p.y}
  />
}
