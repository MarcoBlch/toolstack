import type { Metadata } from 'next'
import Client from '../../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

function fmtDollar(n: number): string {
  return n.toLocaleString('en-US')
}

const salaries = [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000, 200000]

const DATA = salaries.map(salary => {
  // Approximate hourly rate: salary / 2080 working hours per year
  const approxHourly = salary / 2080
  const hourlyFmt = approxHourly.toFixed(2)
  return {
    slug: `${salary}-salary-to-hourly`,
    salary,
    approxHourly,
    title: `$${fmtDollar(salary)} Salary to Hourly Rate — How Much Per Hour?`,
    desc: `$${fmtDollar(salary)} annual salary is approximately $${hourlyFmt} per hour based on 2,080 working hours per year. Calculate your exact rate with taxes and expenses.`,
    keywords: `${fmtDollar(salary)} salary to hourly, ${fmtDollar(salary)} a year is how much an hour, annual to hourly calculator, salary to hourly rate`,
  }
})

export function generateStaticParams() {
  return DATA.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)
  if (!p) return { title: 'Hourly Rate Calculator' }

  return {
    title: p.title,
    description: p.desc,
    keywords: p.keywords,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(p.title)}&description=${encodeURIComponent(p.desc)}`] },
  }
}

export default async function RateSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = DATA.find(x => x.slug === slug)

  const jsonLd = generateToolJsonLd({
    name: p ? `$${fmtDollar(p.salary)} Salary to Hourly Rate Calculator` : 'Hourly Rate Calculator',
    url: `https://tools4free.site/rate/${slug}`,
    description: p ? p.desc : 'Convert annual salary to hourly rate instantly.',
    category: 'BusinessApplication',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {p ? (
        <Client defaultIncome={p.salary} />
      ) : (
        <Client />
      )}
    </>
  )
}
