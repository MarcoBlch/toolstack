import type { Metadata } from 'next'
import JSONFormatterClient from './client'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Free Online JSON Beautifier',
  description: 'Format, validate, and minify JSON instantly. Syntax highlighting, error detection, tree view. Free, no signup.',
  keywords: 'json formatter, json validator, json beautifier, json minifier, json pretty print, json viewer',
}

export default function JSONFormatterPage() {
  return <JSONFormatterClient />
}
