import type { Metadata } from 'next'
import DiffClient from './client'

export const metadata: Metadata = {
  title: 'Text Diff Checker — Free Online Text Compare Tool',
  description: 'Compare two texts and see differences highlighted. Additions in green, deletions in red. Side-by-side or inline. Free, no signup.',
  keywords: 'diff checker, text compare, text diff, compare two texts, find differences, code diff online',
}

export default function DiffPage() {
  return <DiffClient />
}
