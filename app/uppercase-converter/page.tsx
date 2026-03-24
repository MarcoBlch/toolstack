import type { Metadata } from 'next'
import CaseConverterClient from '../case-converter/client'

export const metadata: Metadata = {
  title: 'Uppercase Converter — Text to ALL CAPS',
  description: 'Convert any text to UPPERCASE instantly. Free online caps converter. Copy & paste, no signup.',
  keywords: 'uppercase converter, caps converter',
}

export default function UppercaseConverterPage() {
  return <CaseConverterClient />
}
