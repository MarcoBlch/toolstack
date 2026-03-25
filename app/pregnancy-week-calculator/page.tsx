import type { Metadata } from 'next'
import DueDateClient from '../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Pregnancy Week Calculator — How Many Weeks Pregnant Am I?',
  description: 'Free pregnancy week calculator. Find out how many weeks pregnant you are. Gestational age, trimester, and milestone tracking.',
  keywords: 'how many weeks pregnant, pregnancy week calculator, gestational age, pregnancy weeks, weeks pregnant calculator',
  openGraph: { images: ['/api/og?title=Pregnancy%20Week%20Calculator&description=Find%20out%20how%20many%20weeks%20pregnant%20you%20are'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Pregnancy Week Calculator',
  url: 'https://tools4free.site/pregnancy-week-calculator',
  description: 'Free pregnancy week calculator. Find out how many weeks pregnant you are. Gestational age, trimester, and milestone tracking.',
  category: 'HealthApplication',
})

export default function PregnancyWeekPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DueDateClient />
    </>
  )
}
