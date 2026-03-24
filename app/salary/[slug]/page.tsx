import type { Metadata } from 'next'
import SalaryClient from '../../salary-calculator/client'

const COUNTRIES = [
  { code: 'FR', slug: 'france', label: 'France', currency: '€' },
  { code: 'US', slug: 'usa', label: 'USA', currency: '$' },
  { code: 'UK', slug: 'uk', label: 'UK', currency: '£' },
]

const SALARIES = [
  ...[25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 70000, 80000, 90000, 100000].flatMap(salary =>
    COUNTRIES.map(c => ({
      slug: `${(salary / 1000).toFixed(0)}k-salary-${c.slug}`,
      salary,
      country: c.code,
      title: `${c.currency}${(salary / 1000).toFixed(0)}k Salary After Tax in ${c.label}`,
      desc: `Calculate net salary for ${c.currency}${(salary / 1000).toFixed(0)},000 gross in ${c.label}. See tax breakdown, effective rate, and monthly equivalent. Free.`,
    }))
  ),
]

export function generateStaticParams() {
  return SALARIES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = SALARIES.find(x => x.slug === slug)
  if (!s) return { title: 'Salary Calculator' }

  return {
    title: `${s.title} — Free Salary Calculator`,
    description: s.desc,
    keywords: `${s.slug.replace(/-/g, ' ')}, salary calculator, gross to net, tax breakdown`,
  }
}

export default async function SalarySEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = SALARIES.find(x => x.slug === slug)
  if (!s) return <SalaryClient />

  return <SalaryClient
    defaultSalary={s.salary}
    defaultCountry={s.country}
    defaultPeriod="annual"
  />
}
