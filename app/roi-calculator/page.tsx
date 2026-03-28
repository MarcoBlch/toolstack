import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free ROI Calculator — Return on Investment & Annualized Returns',
  description: 'Calculate return on investment, net profit, and annualized ROI for stocks, real estate, and business. Enter initial and final values to see your ROI instantly.',
  keywords: 'ROI calculator, return on investment, annualized ROI, investment calculator, net profit, stock ROI, real estate ROI, business ROI',
  alternates: getAlternates('/roi-calculator'),
  openGraph: { images: ['/api/og?title=Free%20ROI%20Calculator&description=Calculate%20return%20on%20investment%2C%20net%20profit%2C%20and%20annualized%20ROI%20for%20any%20investment.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free ROI Calculator',
  url: 'https://tools4free.site/roi-calculator',
  description: 'Calculate return on investment, net profit, and annualized ROI for stocks, real estate, and business. Enter initial and final values to see your ROI instantly.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
