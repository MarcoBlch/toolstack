import type { Metadata } from 'next'
import ROIClient from '../../roi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

function fmtDollar(n: number): string {
  return n.toLocaleString('en-US')
}

function fmtRoi(n: number): string {
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)
}

const investments = [1000, 5000, 10000, 25000, 50000, 100000]
const returns = [2000, 10000, 25000, 50000, 100000, 200000]

const DATA = investments.flatMap(inv =>
  returns
    .filter(ret => ret > inv)
    .map(ret => {
      const roi = ((ret - inv) / inv) * 100
      return {
        slug: `${inv}-to-${ret}-roi`,
        investment: inv,
        finalValue: ret,
        roi,
        title: `$${fmtDollar(inv)} to $${fmtDollar(ret)} ROI — ${fmtRoi(roi)}% Return | ROI Calculator`,
        desc: `Investing $${fmtDollar(inv)} and getting $${fmtDollar(ret)} back = ${fmtRoi(roi)}% ROI with $${fmtDollar(ret - inv)} net profit. Calculate any ROI instantly.`,
        keywords: `${fmtDollar(inv)} to ${fmtDollar(ret)} roi, ${fmtRoi(roi)} percent return, roi calculator, return on investment`,
      }
    })
)

export function generateStaticParams() {
  return DATA.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)
  if (!p) return { title: 'ROI Calculator' }

  return {
    title: p.title,
    description: p.desc,
    keywords: p.keywords,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(p.title)}&description=${encodeURIComponent(p.desc)}`] },
  }
}

export default async function ROISEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)

  const jsonLd = generateToolJsonLd({
    name: p ? `$${fmtDollar(p.investment)} to $${fmtDollar(p.finalValue)} ROI Calculator` : 'ROI Calculator',
    url: `https://tools4free.site/roi/${slug}`,
    description: p ? p.desc : 'Calculate return on investment instantly.',
    category: 'BusinessApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {p ? (
        <ROIClient defaultInvestment={p.investment} defaultFinal={p.finalValue} />
      ) : (
        <ROIClient />
      )}
    </>
  )
}
