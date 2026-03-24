import type { Metadata } from 'next'
import RegexClient from './client'

export const metadata: Metadata = {
  title: 'Regex Tester — Free Online Regular Expression Tester',
  description: 'Test regular expressions in real-time. See matches highlighted instantly. Supports JavaScript regex with flags. Free, no signup.',
  keywords: 'regex tester, regular expression tester, regex online, regex checker, regex validator, regex match',
}

export default function RegexPage() {
  return <RegexClient />
}
