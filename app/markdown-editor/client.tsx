'use client'
import { useState, useMemo, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // headings
    .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    // bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // code
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // links and images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // blockquote
    .replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
    // hr
    .replace(/^---$/gm, '<hr/>')
    // unordered list
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    // ordered list
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // paragraphs
    .replace(/\n\n/g, '</p><p>')

  return '<p>' + html + '</p>'
}

const SAMPLE = `# Welcome to MarkdownPad

Write **Markdown** on the left, see the *live preview* on the right.

## Features

- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://tools4free.site) and images
- Code blocks with \`inline code\`
- Headings, lists, blockquotes
- Horizontal rules

> This is a blockquote. It looks great.

### Code Example

\`\`\`
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

---

Made with MarkdownPad on **tools4free.site**`

export default function MarkdownClient() {
  const [input, setInput] = useState(SAMPLE)
  const [copied, setCopied] = useState(false)

  const html = useMemo(() => parseMarkdown(input), [input])

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [html])

  const previewStyles = `
    h1 { font-size: 28px; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.5px; }
    h2 { font-size: 22px; font-weight: 700; margin: 20px 0 10px; }
    h3 { font-size: 18px; font-weight: 700; margin: 16px 0 8px; }
    p { margin: 0 0 12px; line-height: 1.7; }
    strong { font-weight: 700; }
    em { font-style: italic; }
    del { text-decoration: line-through; opacity: 0.6; }
    a { color: #3B82F6; text-decoration: underline; }
    code { font-family: ${fm}; font-size: 13px; background: #F0EDE5; padding: 2px 6px; border-radius: 4px; }
    pre { background: #1C1B18; color: #E8E6F0; padding: 16px; border-radius: 10px; overflow-x: auto; margin: 12px 0; }
    pre code { background: none; padding: 0; color: inherit; }
    blockquote { border-left: 3px solid #E8E4DB; padding-left: 16px; color: #6B6560; margin: 12px 0; font-style: italic; }
    ul { padding-left: 24px; margin: 8px 0; }
    li { margin: 4px 0; line-height: 1.6; }
    hr { border: none; border-top: 1px solid #E8E4DB; margin: 20px 0; }
    img { border-radius: 8px; margin: 8px 0; }
  `

  return (
    <ToolShell name="Markdown Editor" icon="M↓" currentPath="/markdown-editor">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#1C1B18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: fm }}>M↓</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>MarkdownPad</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={copyHtml} style={{
              fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 16px', borderRadius: 8,
              border: '1.5px solid #E8E4DB', background: copied ? '#22A06510' : '#fff',
              color: copied ? '#22A065' : '#6B6560', cursor: 'pointer',
            }}>{copied ? 'Copied HTML!' : 'Copy HTML'}</button>
            <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
          </div>
        </nav>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 'calc(100vh - 160px)' }}>
          {/* Editor */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Markdown</div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              style={{
                flex: 1, width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 14,
                padding: 20, fontSize: 14, fontFamily: fm, color: '#1C1B18',
                background: '#fff', outline: 'none', resize: 'none', lineHeight: 1.7,
                minHeight: 500,
              }} />
          </div>

          {/* Preview */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Preview</div>
            <div style={{
              flex: 1, border: '1.5px solid #E8E4DB', borderRadius: 14,
              padding: 24, background: '#fff', overflow: 'auto', minHeight: 500,
            }}>
              <style>{previewStyles}</style>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free online markdown editor</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            MarkdownPad is a free split-pane Markdown editor with live preview. Write Markdown on the left, see formatted HTML on the right. Supports headings, bold, italic, strikethrough, links, images, code blocks, blockquotes, lists, and horizontal rules. Copy the generated HTML with one click. No signup needed.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
