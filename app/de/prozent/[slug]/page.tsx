import type { Metadata } from 'next'
import PercentageClient from '../../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const PERCENTAGES_DE = [
  ...[
    [5,100],[10,50],[10,100],[10,200],[10,500],[15,100],[15,200],
    [20,50],[20,100],[20,200],[20,500],[25,100],[25,200],[30,100],
    [33,100],[50,100],[50,200],[50,500],[75,100],[19,100],[19,500],
    [7,100],[7,500],
  ].map(([pct, val]) => ({
    slug: `wieviel-ist-${pct}-prozent-von-${val}`,
    x: pct,
    y: val,
    title: `Wieviel ist ${pct}% von ${val}?`,
    result: (pct / 100 * val),
  })),
]

export function generateStaticParams() {
  return PERCENTAGES_DE.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = PERCENTAGES_DE.find(x => x.slug === slug)
  if (!p) return { title: 'Prozentrechner' }
  return {
    title: `Wieviel ist ${p.x}% von ${p.y}? = ${p.result} — Prozentrechner`,
    description: `${p.x}% von ${p.y} = ${p.result}. Kostenloser Prozentrechner online. Prozente schnell berechnen.`,
    keywords: `wieviel ist ${p.x} prozent von ${p.y}, ${p.x}% von ${p.y}, Prozentrechner`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(p.x + '% von ' + p.y + ' = ' + p.result)}&description=${encodeURIComponent('Kostenloser Prozentrechner online.')}`] },
  }
}

export default async function ProzentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = PERCENTAGES_DE.find(x => x.slug === slug)
  if (!p) return <PercentageClient locale="de" />
  return <PercentageClient locale="de" defaultMode="whatIs" defaultX={p.x} defaultY={p.y} />
}
