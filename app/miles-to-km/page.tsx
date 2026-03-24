import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'

export const metadata: Metadata = {
  title: 'Miles to Km Converter',
  description: 'Convert miles to kilometers instantly. Free miles to km calculator. No signup, works offline.',
  keywords: 'miles to km, miles to kilometers',
}

export default function MilesToKmPage() {
  return <UnitConverterClient />
}
