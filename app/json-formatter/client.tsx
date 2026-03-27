'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fm = "'JetBrains Mono', monospace"
const fb = "'Outfit', -apple-system, sans-serif"

function syntaxHighlight(json: string): string {
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'json-number'
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'json-key' : 'json-string'
    } else if (/true|false/.test(match)) {
      cls = 'json-bool'
    } else if (/null/.test(match)) {
      cls = 'json-null'
    }
    return `<span class="${cls}">${match}</span>`
  })
}

export default function JSONFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'format' | 'minify' | 'validate'>('format')
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)

  const process = useCallback(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      const parsed = JSON.parse(input)
      setError('')
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, indent))
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        setOutput(JSON.stringify(parsed, null, indent))
      }
    } catch (e: any) {
      setError(e.message || 'Invalid JSON')
      setOutput('')
    }
  }, [input, mode, indent])

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleSample = () => {
    const sample = JSON.stringify({
      name: "Tools4Free",
      version: "1.0.0",
      tools: ["FancyText", "QRDrop", "PassForge", "WordTool", "JSONPretty"],
      config: { theme: "dark", language: "en", premium: false },
      stats: { users: 12847, rating: 4.9 }
    })
    setInput(sample)
    setTimeout(() => {
      try {
        setOutput(JSON.stringify(JSON.parse(sample), null, indent))
        setError('')
      } catch {}
    }, 50)
  }

  return (
    <ToolShell name="JSON Formatter" icon="{ }" currentPath="/json-formatter">
      <style>{`
        .json-key { color: #8B5CF6; }
        .json-string { color: #22A065; }
        .json-number { color: #E8457A; }
        .json-bool { color: #3B82F6; }
        .json-null { color: #9A958A; }
      `}</style>
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: fm }}>{'{ }'}</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>JSONPretty</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 28px 12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            JSON <span style={{ color: '#8B5CF6' }}>formatter</span> & validator
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 20 }}>Paste your JSON. Format, minify, or validate instantly.</p>
        </section>

        {/* Controls bar */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['format', 'minify', 'validate'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setTimeout(process, 50) }} style={{
              fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
              border: mode === m ? '1.5px solid #8B5CF6' : '1.5px solid #25252E',
              background: mode === m ? '#8B5CF615' : 'transparent', color: mode === m ? '#8B5CF6' : '#8A88A0',
            }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: '#5A586E' }}>Indent:</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)} style={{
              fontFamily: fm, fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
              border: indent === n ? '1px solid #8B5CF6' : '1px solid #25252E',
              background: indent === n ? '#8B5CF615' : 'transparent', color: indent === n ? '#8B5CF6' : '#5A586E',
            }}>{n}</button>
          ))}
          <button onClick={handleSample} style={{
            fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
            border: '1px solid #25252E', background: 'transparent', color: '#5A586E',
          }}>Sample JSON</button>
        </section>

        {/* Editor panels */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Input</div>
            <textarea value={input} onChange={e => { setInput(e.target.value); setTimeout(process, 50) }}
              placeholder='Paste your JSON here...'
              style={{
                width: '100%', minHeight: 400, background: '#17171C', border: '1.5px solid #25252E', borderRadius: 12,
                padding: 18, fontSize: 13, fontFamily: fm, color: '#E8E6F0', resize: 'vertical', outline: 'none', lineHeight: 1.7,
              }} />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px' }}>Output</span>
              {output && (
                <button onClick={handleCopy} style={{
                  fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
                  border: `1px solid ${copied ? '#22A06530' : '#25252E'}`, background: copied ? '#22A06510' : 'transparent',
                  color: copied ? '#22A065' : '#5A586E',
                }}>{copied ? 'Copied!' : 'Copy'}</button>
              )}
            </div>
            <div style={{
              width: '100%', minHeight: 400, background: '#17171C', border: `1.5px solid ${error ? '#E24B4A30' : '#25252E'}`,
              borderRadius: 12, padding: 18, fontSize: 13, fontFamily: fm, lineHeight: 1.7, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {error ? (
                <div style={{ color: '#E24B4A' }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Invalid JSON</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{error}</div>
                </div>
              ) : output ? (
                <div dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }} />
              ) : (
                <span style={{ color: '#5A586E', fontStyle: 'italic' }}>Formatted output will appear here...</span>
              )}
            </div>
            {output && !error && (
              <div style={{ marginTop: 8, fontSize: 11, fontFamily: fm, color: '#5A586E' }}>
                {output.length.toLocaleString()} chars · {output.split('\n').length} lines
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free JSON formatter, validator & minifier</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            JSONPretty formats, validates, and minifies JSON instantly in your browser. It features syntax highlighting with color-coded keys, strings, numbers, booleans, and null values. Choose between 2-space or 4-space indentation depending on your preference. All processing happens locally so your data never leaves your device. It is ideal for debugging API responses, formatting configuration files, and cleaning up messy JSON data from any source.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>JSON validation and error detection</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            When your JSON is invalid, the formatter shows a clear error message pointing to the problem. Common issues include trailing commas, missing quotes around keys, single quotes instead of double quotes, and unescaped special characters. Catching these errors early saves time when debugging webhooks, API integrations, or configuration files. The validator checks your JSON against the specification so you can fix syntax issues before they cause runtime failures.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Beautifying vs. minifying JSON</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            Beautified JSON with proper indentation is easier to read and review, which makes it the preferred format during development and debugging. Minified JSON removes all whitespace and line breaks, reducing file size for production use where bandwidth matters. JSONPretty lets you switch between both modes instantly, so you can format for readability when inspecting data and minify when you need the most compact representation.
          </p>

          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8, marginTop: 16 }}>
            Need to encode JSON data for transport? The <a href="/base64" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Base64 encoder</a> converts it to a safe string format. For testing patterns within your JSON values, the <a href="/regex-tester" style={{ color: '#FF6B35', textDecoration: 'underline' }}>regex tester</a> lets you validate strings against any pattern.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
