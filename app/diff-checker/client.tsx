'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function diffLines(a: string, b: string): { type: 'same' | 'add' | 'del'; text: string }[] {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const maxLen = Math.max(linesA.length, linesB.length)
  const result: { type: 'same' | 'add' | 'del'; text: string }[] = []

  // Simple LCS-based diff
  const m = linesA.length, n = linesB.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = linesA[i-1] === linesB[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1])

  let i = m, j = n
  const ops: { type: 'same' | 'add' | 'del'; text: string }[] = []
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i-1] === linesB[j-1]) {
      ops.unshift({ type: 'same', text: linesA[i-1] }); i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      ops.unshift({ type: 'add', text: linesB[j-1] }); j--
    } else {
      ops.unshift({ type: 'del', text: linesA[i-1] }); i--
    }
  }
  return ops
}

export default function DiffClient() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')

  const diff = useMemo(() => {
    if (!textA && !textB) return []
    return diffLines(textA, textB)
  }, [textA, textB])

  const adds = diff.filter(d => d.type === 'add').length
  const dels = diff.filter(d => d.type === 'del').length
  const same = diff.filter(d => d.type === 'same').length

  const colors = { add: { bg: '#22A06512', border: '#22A06530', text: '#22A065' }, del: { bg: '#E24B4A12', border: '#E24B4A30', text: '#E24B4A' }, same: { bg: 'transparent', border: 'transparent', text: '#8A88A0' } }

  return (
    <ToolShell name="Diff Checker" icon="≠" currentPath="/diff-checker">
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E11', fontSize: 14, fontWeight: 800 }}>≠</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>DiffCheck</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 28px 12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            Text <span style={{ color: '#F59E0B' }}>diff checker</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 16 }}>Paste two texts. See every difference highlighted.</p>
        </section>

        {/* Stats */}
        {diff.length > 0 && (
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px 12px', display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontFamily: fm, color: '#22A065', background: '#22A06512', padding: '4px 12px', borderRadius: 6 }}>+{adds} added</span>
            <span style={{ fontSize: 12, fontFamily: fm, color: '#E24B4A', background: '#E24B4A12', padding: '4px 12px', borderRadius: 6 }}>-{dels} removed</span>
            <span style={{ fontSize: 12, fontFamily: fm, color: '#8A88A0', background: '#8A88A012', padding: '4px 12px', borderRadius: 6 }}>{same} unchanged</span>
          </section>
        )}

        {/* Input panels */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Original text</div>
            <textarea value={textA} onChange={e => setTextA(e.target.value)} placeholder="Paste original text here..."
              style={{ width: '100%', minHeight: 200, background: '#17171C', border: '1.5px solid #25252E', borderRadius: 12, padding: 16, fontSize: 13, fontFamily: fm, color: '#E8E6F0', resize: 'vertical', outline: 'none', lineHeight: 1.6 }} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Modified text</div>
            <textarea value={textB} onChange={e => setTextB(e.target.value)} placeholder="Paste modified text here..."
              style={{ width: '100%', minHeight: 200, background: '#17171C', border: '1.5px solid #25252E', borderRadius: 12, padding: 16, fontSize: 13, fontFamily: fm, color: '#E8E6F0', resize: 'vertical', outline: 'none', lineHeight: 1.6 }} />
          </div>
        </section>

        {/* Diff output */}
        {diff.length > 0 && (
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px 20px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Differences</div>
            <div style={{ background: '#17171C', borderRadius: 14, border: '1.5px solid #25252E', overflow: 'hidden', maxHeight: 400, overflowY: 'auto' }}>
              {diff.map((d, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '6px 16px', fontFamily: fm, fontSize: 13, lineHeight: 1.6,
                  background: colors[d.type].bg,
                  borderLeft: `3px solid ${d.type === 'same' ? 'transparent' : colors[d.type].text}`,
                }}>
                  <span style={{ color: colors[d.type].text, minWidth: 18, fontSize: 12, fontWeight: 700, userSelect: 'none' }}>
                    {d.type === 'add' ? '+' : d.type === 'del' ? '−' : ' '}
                  </span>
                  <span style={{ color: d.type === 'same' ? '#5A586E' : colors[d.type].text, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {d.text || '\u00A0'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free text diff checker</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            DiffCheck compares two texts line-by-line and highlights every difference. Additions in green, deletions in red, unchanged lines in gray. Uses the Longest Common Subsequence algorithm for accurate results. Perfect for comparing code versions, document revisions, and configuration files. All processing happens locally.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
