'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const CASES = [
  { id: 'upper', name: 'UPPERCASE', fn: (t: string) => t.toUpperCase(), example: 'HELLO WORLD' },
  { id: 'lower', name: 'lowercase', fn: (t: string) => t.toLowerCase(), example: 'hello world' },
  { id: 'title', name: 'Title Case', fn: (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), example: 'Hello World' },
  { id: 'sentence', name: 'Sentence case', fn: (t: string) => { const s = t.toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1).replace(/([.!?]\s+)(\w)/g, (_, p, c) => p + c.toUpperCase()) }, example: 'Hello world. How are you?' },
  { id: 'camel', name: 'camelCase', fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()), example: 'helloWorld' },
  { id: 'pascal', name: 'PascalCase', fn: (t: string) => { const c = t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); return c.charAt(0).toUpperCase() + c.slice(1) }, example: 'HelloWorld' },
  { id: 'snake', name: 'snake_case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''), example: 'hello_world' },
  { id: 'kebab', name: 'kebab-case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''), example: 'hello-world' },
  { id: 'constant', name: 'CONSTANT_CASE', fn: (t: string) => t.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, ''), example: 'HELLO_WORLD' },
  { id: 'dot', name: 'dot.case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '.').replace(/[^a-zA-Z0-9.]/g, ''), example: 'hello.world' },
  { id: 'toggle', name: 'tOGGLE cASE', fn: (t: string) => [...t].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''), example: 'hELLO wORLD' },
  { id: 'alternating', name: 'aLtErNaTiNg', fn: (t: string) => [...t].map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''), example: 'hElLo WoRlD' },
]

export default function CaseConverterClient() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  return (
    <ToolShell name="Case Converter" icon="Aa" currentPath="/case-converter">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#E8457A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>Aa</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>CaseFlip</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Text case <span style={{ color: '#E8457A' }}>converter</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 28 }}>
            Paste your text. Click any case to convert. Click again to copy.
          </p>

          <div style={{ maxWidth: 620, margin: '0 auto 32px', background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={4} style={{
                width: '100%', border: 'none', padding: 18, fontSize: 16, fontFamily: fb,
                color: '#1C1B18', resize: 'none', outline: 'none', background: 'transparent', lineHeight: 1.6,
              }} />
            {input && (
              <div style={{ padding: '6px 16px 10px', borderTop: '1px solid #E8E4DB', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#9A958A' }}>{input.length} chars</span>
                <button onClick={() => setInput('')} style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {CASES.map(c => {
              const result = input ? c.fn(input) : c.example
              const isCopied = copied === c.id
              return (
                <div key={c.id} onClick={() => input && handleCopy(result, c.id)} style={{
                  background: '#fff', borderRadius: 12, padding: '14px 18px',
                  border: `1.5px solid ${isCopied ? '#22A065' : '#E8E4DB'}`,
                  cursor: input ? 'pointer' : 'default', transition: 'all .15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isCopied ? '#22A065' : '#B0AAA0' }}>
                      {isCopied ? 'Copied!' : input ? 'Click to copy' : ''}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 15, fontFamily: ['camel', 'pascal', 'snake', 'kebab', 'constant', 'dot'].includes(c.id) ? fm : fb,
                    color: input ? '#1C1B18' : '#B0AAA0', fontStyle: input ? 'normal' : 'italic',
                    wordBreak: 'break-word', lineHeight: 1.5,
                    overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any,
                  }}>{result}</div>
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free text case converter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            CaseFlip converts text between 12 different cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, tOGGLE cASE, and aLtErNaTiNg case. It is a fast, reliable way for developers to convert variable names, for writers to fix capitalization mistakes, and for content creators to style their text. All processing happens locally in your browser.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Case styles explained for developers</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Different programming languages and frameworks follow different naming conventions. JavaScript typically uses camelCase for variables and PascalCase for classes. Python favors snake_case, while CSS class names and URL slugs use kebab-case. CONSTANT_CASE is the standard for environment variables and configuration constants. Converting between these formats manually is tedious and error-prone, which is exactly why a dedicated converter saves time.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Practical uses beyond coding</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Case conversion is not just for programmers. Writers use Title Case to format headings consistently. Marketers convert text to uppercase for attention-grabbing headlines in email campaigns. If you accidentally leave caps lock on, the lowercase option fixes everything in one click. Sentence case is helpful when you want to normalize pasted text that came in with inconsistent capitalization from different sources.
          </p>

          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Want decorative text styles beyond standard casing? Try the <a href="/fancy-text" style={{ color: '#FF6B35', textDecoration: 'underline' }}>fancy text generator</a> for Unicode fonts. You can also use the <a href="/word-counter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>word counter</a> to check the length of your converted text before publishing.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
