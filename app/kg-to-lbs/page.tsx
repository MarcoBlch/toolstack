import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'

export const metadata: Metadata = {
  title: 'Kg to Lbs Converter',
  description: 'Convert kilograms to pounds instantly. Free kg to lbs calculator. No signup, works offline.',
  keywords: 'kg to lbs, kilograms to pounds',
}

export default function KgToLbsPage() {
  return <UnitConverterClient />
}
