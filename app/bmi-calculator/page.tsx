import type { Metadata } from 'next'
import BMIClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free BMI Calculator — Body Mass Index, Metric & Imperial',
  description: 'Calculate your BMI instantly. Metric and imperial units. See your BMI category, healthy weight range. Visual BMI scale. Free, no signup.',
  keywords: 'bmi calculator, body mass index, bmi chart, healthy weight, bmi scale, metric imperial bmi',
  openGraph: { images: ['/api/og?title=Free%20BMI%20Calculator&description=Calculate%20your%20BMI%20instantly.%20Metric%20and%20imperial%20units.%20See%20your%20BMI%20category%2C%20healthy%20weight%20range'] },
  alternates: getAlternates('/bmi-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free BMI Calculator',
  url: 'https://tools4free.site/bmi-calculator',
  description: 'Calculate your BMI instantly. Metric and imperial units. See your BMI category, healthy weight range. Visual BMI scale. Free, no signup.',
  category: 'HealthApplication',
})

export default function BMIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BMIClient />
    </>
  )
}
