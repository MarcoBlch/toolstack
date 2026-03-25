import type { Metadata } from 'next'
import DueDateClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Pregnancy Due Date Calculator — Estimated Due Date & Milestones',
  description: 'Free pregnancy due date calculator. Calculate your estimated due date based on last period, conception date, or IVF transfer. See trimester milestones and gestational age.',
  keywords: 'due date calculator, pregnancy calculator, estimated due date, gestational age, pregnancy weeks, trimester calculator, naegele rule, pregnancy milestones',
  openGraph: { images: ['/api/og?title=Free%20Due%20Date%20Calculator&description=Calculate%20your%20estimated%20due%20date.%20Trimester%20milestones%20and%20gestational%20age'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Pregnancy Due Date Calculator',
  url: 'https://tools4free.site/due-date-calculator',
  description: 'Free pregnancy due date calculator. Calculate your estimated due date based on last period, conception date, or IVF transfer. See trimester milestones and gestational age.',
  category: 'HealthApplication',
})

export default function DueDatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DueDateClient />
    </>
  )
}
