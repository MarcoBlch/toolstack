import type { Metadata } from 'next'
import MarkdownClient from './client'

export const metadata: Metadata = {
  title: 'Markdown Editor — Free Online Markdown Preview & Editor',
  description: 'Write Markdown, see live HTML preview. Export as HTML. Syntax guide included. Free, instant, no signup.',
  keywords: 'markdown editor, markdown preview, markdown to html, online markdown editor, markdown converter',
}

export default function MarkdownPage() {
  return <MarkdownClient />
}
