import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'

export const metadata: Metadata = {
  title: 'Celsius to Fahrenheit Converter',
  description: 'Convert Celsius to Fahrenheit instantly. Free temperature converter. No signup, works offline.',
  keywords: 'celsius to fahrenheit, c to f',
}

export default function CelsiusToFahrenheitPage() {
  return <UnitConverterClient />
}
