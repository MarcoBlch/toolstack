import type { Metadata } from 'next'
import UnitConverterClient from './client'

export const metadata: Metadata = {
  title: 'Unit Converter — Free Online Conversion Calculator',
  description: 'Convert between any units instantly: length, weight, temperature, volume, area, speed, data, time. Free, fast, no signup.',
  keywords: 'unit converter, kg to lbs, cm to inches, celsius to fahrenheit, miles to km, oz to ml, unit conversion calculator',
}

export default function UnitConverterPage() {
  return <UnitConverterClient />
}
