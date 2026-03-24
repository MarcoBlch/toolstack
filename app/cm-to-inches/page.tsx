import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'

export const metadata: Metadata = {
  title: 'CM to Inches Converter',
  description: 'Convert centimeters to inches instantly. Free cm to inches calculator. No signup, works offline.',
  keywords: 'cm to inches, centimeters to inches',
}

export default function CmToInchesPage() {
  return <UnitConverterClient />
}
