import type { Metadata } from 'next'
import BMIClient from '../../bmi-calculator/client'

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

const BMIS = [
  // Popular height/weight combinations (metric)
  ...[150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200].flatMap(cm =>
    [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(kg => {
      const bmi = kg / ((cm / 100) ** 2)
      return {
        slug: `bmi-${cm}cm-${kg}kg`,
        height: cm,
        weight: kg,
        bmi: parseFloat(bmi.toFixed(1)),
        category: bmiCategory(bmi),
        title: `BMI for ${cm}cm ${kg}kg`,
        desc: `BMI for ${cm}cm and ${kg}kg is ${bmi.toFixed(1)} (${bmiCategory(bmi)}). Calculate your Body Mass Index free.`,
      }
    })
  ),
]

export function generateStaticParams() {
  return BMIS.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const b = BMIS.find(x => x.slug === slug)
  if (!b) return { title: 'BMI Calculator' }

  return {
    title: `${b.title} — BMI ${b.bmi} (${b.category})`,
    description: b.desc,
    keywords: `bmi ${b.height}cm ${b.weight}kg, bmi calculator, body mass index ${b.height} ${b.weight}`,
  }
}

export default async function BMISEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const b = BMIS.find(x => x.slug === slug)
  if (!b) return <BMIClient />

  return <BMIClient
    defaultWeight={b.weight}
    defaultHeight={b.height}
    defaultUnit="metric"
  />
}
