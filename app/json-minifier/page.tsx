import type { Metadata } from 'next'
import JSONFormatterClient from '../json-formatter/client'

export const metadata: Metadata = {
  title: 'JSON Minifier — Compress JSON',
  description: 'Minify and compress JSON online. Remove whitespace and reduce file size. Free JSON minifier, no signup.',
  keywords: 'json minifier, minify json',
}

export default function JsonMinifierPage() {
  return <JSONFormatterClient />
}
