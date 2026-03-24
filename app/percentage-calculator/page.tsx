import type { Metadata } from 'next'
import PercentageClient from './client'

export const metadata: Metadata = {
  title: 'Free Percentage Calculator — What is X% of Y?',
  description: 'Calculate percentages instantly. What is X% of Y? Percentage change? X is what percent of Y? Three modes. Free, no signup.',
  keywords: 'percentage calculator, what is x percent of y, percentage change, percentage difference, percent calculator, tip calculator',
}

export default function PercentagePage() {
  return <PercentageClient />
}
