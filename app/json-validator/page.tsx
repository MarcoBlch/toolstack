import type { Metadata } from 'next'
import JSONFormatterClient from '../json-formatter/client'

export const metadata: Metadata = {
  title: 'JSON Validator — Check JSON Online',
  description: 'Validate your JSON online instantly. Find syntax errors with clear error messages. Free JSON validator, no signup.',
  keywords: 'json validator, validate json',
}

export default function JsonValidatorPage() {
  return <JSONFormatterClient />
}
