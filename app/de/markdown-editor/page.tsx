import type { Metadata } from 'next'
import Client from '../../markdown-editor/client'

export const metadata: Metadata = {
  title: 'Markdown Editor — Online Markdown Vorschau Kostenlos',
  description: 'Schreibe Markdown, sieh live die HTML-Vorschau. HTML exportieren. Split-Pane Editor. Kostenlos.',
  keywords: 'Markdown Editor, Markdown online, Markdown Vorschau, Markdown zu HTML, Markdown Editor kostenlos, Markdown schreiben',
}

export default function Page() {
  return <Client />
}
