import type { Metadata } from 'next'
import CaseConverterClient from './client'

export const metadata: Metadata = {
  title: 'Text Case Converter — UPPER, lower, Title, camelCase & More',
  description: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, PascalCase and more. Free, instant.',
  keywords: 'case converter, uppercase converter, lowercase converter, title case, camelcase converter, snake case, text case changer',
}

export default function CaseConverterPage() {
  return <CaseConverterClient />
}
