'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const COMMON = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL', pattern: 'https?://[^\\s/$.?#].[^\\s]*', flags: 'gi' },
  { name: 'Phone', pattern: '\\+?[\\d\\s\\-().]{7,15}', flags: 'g' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Hex color', pattern: '#[0-9a-fA-F]{3,8}\\b', flags: 'g' },
  { name: 'Date', pattern: '\\d{4}[-/]\\d{2}[-/]\\d{2}', flags: 'g' },
  { name: 'HTML tag', pattern: '<[^>]+>', flags: 'g' },
  { name: 'Digits only', pattern: '\\d+', flags: 'g' },
]

export default function RegexClient() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('Hello world! My email is john@example.com and my site is https://example.com. Call me at +1-555-0123.')
  const [error, setError] = useState('')

  const { highlighted, matchCount, matches } = useMemo(() => {
    if (!pattern) return { highlighted: text, matchCount: 0, matches: [] as string[] }
    try {
      const regex = new RegExp(pattern, flags)
      setError('')
      const matchArr: string[] = []
      let result
      const tempRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      while ((result = tempRegex.exec(text)) !== null) {
        matchArr.push(result[0])
        if (!flags.includes('g')) break
      }

      // Build highlighted HTML
      const parts: string[] = []
      let lastIdx = 0
      const highlightRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      let m
      while ((m = highlightRegex.exec(text)) !== null) {
        if (m.index > lastIdx) parts.push(escHtml(text.slice(lastIdx, m.index)))
        parts.push(`<mark style="background:#F59E0B33;color:#F59E0B;border-radius:2px;padding:0 1px">${escHtml(m[0])}</mark>`)
        lastIdx = m.index + m[0].length
        if (!flags.includes('g')) break
        if (m[0].length === 0) { highlightRegex.lastIndex++; }
      }
      if (lastIdx < text.length) parts.push(escHtml(text.slice(lastIdx)))

      return { highlighted: parts.join(''), matchCount: matchArr.length, matches: matchArr }
    } catch (e: any) {
      setError(e.message || 'Invalid regex')
      return { highlighted: escHtml(text), matchCount: 0, matches: [] as string[] }
    }
  }, [pattern, flags, text])

  const applyCommon = (c: typeof COMMON[0]) => { setPattern(c.pattern); setFlags(c.flags) }

  return (
    <ToolShell name="Regex Tester" icon="/.*/" currentPath="/regex-tester">
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E11', fontSize: 10, fontWeight: 800, fontFamily: fm }}>.*</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>RegexPal</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '24px 28px 12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            Regex <span style={{ color: '#F59E0B' }}>tester</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 16 }}>Write regex. See matches highlighted in real-time.</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 14px' }}>
          {/* Regex input */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 20, color: '#5A586E', fontFamily: fm }}>/</span>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              style={{
                flex: 1, background: '#17171C', border: `1.5px solid ${error ? '#E24B4A40' : '#25252E'}`,
                borderRadius: 10, padding: '12px 14px', fontSize: 15, fontFamily: fm, color: '#F59E0B',
                outline: 'none',
              }} />
            <span style={{ fontSize: 20, color: '#5A586E', fontFamily: fm }}>/</span>
            <input type="text" value={flags} onChange={e => setFlags(e.target.value)}
              style={{
                width: 60, background: '#17171C', border: '1.5px solid #25252E', borderRadius: 10,
                padding: '12px', fontSize: 15, fontFamily: fm, color: '#8A88A0', outline: 'none', textAlign: 'center',
              }} />
            {matchCount > 0 && (
              <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 700, color: '#F59E0B', background: '#F59E0B15', padding: '8px 14px', borderRadius: 8 }}>
                {matchCount} match{matchCount !== 1 ? 'es' : ''}
              </span>
            )}
          </div>

          {error && (
            <div style={{ fontSize: 12, color: '#E24B4A', fontFamily: fm, marginBottom: 10, padding: '8px 12px', background: '#E24B4A10', borderRadius: 8 }}>
              {error}
            </div>
          )}

          {/* Common patterns */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {COMMON.map(c => (
              <button key={c.name} onClick={() => applyCommon(c)} style={{
                fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 7,
                border: '1px solid #25252E', background: 'transparent', color: '#8A88A0', cursor: 'pointer',
              }}>{c.name}</button>
            ))}
          </div>

          {/* Test string with highlights */}
          <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Test string</div>
          <textarea value={text} onChange={e => setText(e.target.value)}
            style={{
              width: '100%', minHeight: 100, background: '#17171C', border: '1.5px solid #25252E',
              borderRadius: 12, padding: 16, fontSize: 13, fontFamily: fm, color: '#E8E6F0',
              resize: 'vertical', outline: 'none', lineHeight: 1.7, marginBottom: 12,
            }} />

          <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Result</div>
          <div style={{
            background: '#17171C', borderRadius: 12, border: '1.5px solid #25252E', padding: 16,
            fontFamily: fm, fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 80,
          }} dangerouslySetInnerHTML={{ __html: highlighted }} />

          {/* Match list */}
          {matches.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>Matches</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {matches.map((m, i) => (
                  <span key={i} style={{
                    fontFamily: fm, fontSize: 12, padding: '4px 10px', borderRadius: 6,
                    background: '#F59E0B15', border: '1px solid #F59E0B30', color: '#F59E0B',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free regex tester</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            RegexPal tests regular expressions in real time with instant match highlighting. It supports all JavaScript regex flags including global, case-insensitive, multiline, dotAll, and Unicode modes. The tool includes built-in common patterns for email addresses, URLs, phone numbers, IP addresses, hex colors, dates, and HTML tags. All testing runs locally in your browser so your data stays completely private.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Understanding regular expressions</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            Regular expressions are patterns used to match character combinations in strings. They are a fundamental tool in programming for tasks like input validation, search and replace operations, and data extraction. A regex pattern can be as simple as matching a literal word or as sophisticated as parsing nested structures. Learning regex takes practice, and having a live tester that shows matches as you type makes the process much faster and more intuitive.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Live highlighting and pattern library</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            As you type your regex pattern, every match in the test string is highlighted immediately. This instant feedback loop helps you refine patterns quickly without running a separate script or reloading a page. The built-in pattern library provides tested starting points for common validation tasks, so you do not have to write email or URL patterns from scratch. Click any preset to load it and see how it matches against your test text.
          </p>

          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8, marginTop: 16 }}>
            After building your regex, use the <a href="/diff-checker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>diff checker</a> to compare text before and after applying your pattern. For formatting JSON data that your regex might extract, the <a href="/json-formatter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>JSON formatter</a> beautifies it with syntax highlighting.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}

function escHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
