import type { Metadata } from 'next'
import BMIClient from './client'

export const metadata: Metadata = {
  title: 'Free BMI Calculator — Body Mass Index, Metric & Imperial',
  description: 'Calculate your BMI instantly. Metric and imperial units. See your BMI category, healthy weight range. Visual BMI scale. Free, no signup.',
  keywords: 'bmi calculator, body mass index, bmi chart, healthy weight, bmi scale, metric imperial bmi',
}

export default function BMIPage() {
  return <BMIClient />
}
