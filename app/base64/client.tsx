'use client'
import { useState, useCallback, useRef } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

export default function Base64Client() {
  const [mode, setMode] = useState<'encode' | 'decode' | 'image'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const process = useCallback((text: string, m: string) => {
    if (!text.trim()) { setOutput(''); setError(''); return }
    try {
      setError('')
      if (m === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(text))))
      } else if (m === 'decode') {
        setOutput(decodeURIComponent(escape(atob(text.trim()))))
      }
    } catch (e: any) {
      setError(m === 'decode' ? 'Invalid Base64 string' : 'Encoding failed')
      setOutput('')
    }
  }, [])

  const handleInput = (text: string) => {
    setInput(text)
    process(text, mode)
  }

  const switchMode = (m: 'encode' | 'decode' | 'image') => {
    setMode(m)
    setInput('')
    setOutput('')
    setError('')
    setImagePreview(null)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setOutput(result)
      setImagePreview(result)
      setInput(file.name)
    }
    reader.readAsDataURL(file)
  }

  const copy = () => {
    if (output) { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  }

  const accent = '#0EA5E9'

  return (
    <ToolShell name="Base64" icon="B64" currentPath="/base64">
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 800, fontFamily: fm }}>B64</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Base64Lab</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Base64 <span style={{ color: accent }}>encoder & decoder</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 20 }}>Encode, decode, or convert images to Base64 data URIs.</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
            {([['encode', 'Encode'], ['decode', 'Decode'], ['image', 'Image → Base64']] as const).map(([m, label]) => (
              <button key={m} onClick={() => switchMode(m)} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 20px', borderRadius: 10, cursor: 'pointer',
                border: mode === m ? `1.5px solid ${accent}` : '1.5px solid #25252E',
                background: mode === m ? accent + '15' : 'transparent',
                color: mode === m ? accent : '#8A88A0',
              }}>{label}</button>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Input */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>
              {mode === 'image' ? 'File' : 'Input'}
            </div>
            {mode === 'image' ? (
              <div onClick={() => fileRef.current?.click()} style={{
                background: '#17171C', border: '2px dashed #25252E', borderRadius: 12,
                padding: '48px 20px', textAlign: 'center', cursor: 'pointer', minHeight: 200,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
                {imagePreview ? (
                  <img src={imagePreview} alt="" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 32, opacity: 0.3, marginBottom: 8 }}>🖼️</div>
                    <div style={{ fontSize: 14, color: '#5A586E' }}>Click to select an image</div>
                  </>
                )}
              </div>
            ) : (
              <textarea value={input} onChange={e => handleInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
                style={{
                  width: '100%', minHeight: 240, background: '#17171C', border: '1.5px solid #25252E',
                  borderRadius: 12, padding: 18, fontSize: 13, fontFamily: fm, color: '#E8E6F0',
                  resize: 'vertical', outline: 'none', lineHeight: 1.7,
                }} />
            )}
          </div>

          {/* Output */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px' }}>Output</span>
              {output && (
                <button onClick={copy} style={{
                  fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '3px 12px', borderRadius: 6, cursor: 'pointer',
                  border: `1px solid ${copied ? '#22A06530' : '#25252E'}`, background: copied ? '#22A06510' : 'transparent',
                  color: copied ? '#22A065' : '#5A586E',
                }}>{copied ? 'Copied!' : 'Copy'}</button>
              )}
            </div>
            <div style={{
              width: '100%', minHeight: 240, background: '#17171C', border: `1.5px solid ${error ? '#E24B4A30' : '#25252E'}`,
              borderRadius: 12, padding: 18, fontSize: 13, fontFamily: fm, lineHeight: 1.7,
              overflow: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-wrap',
            }}>
              {error ? (
                <span style={{ color: '#E24B4A' }}>{error}</span>
              ) : output ? (
                <span style={{ color: '#E8E6F0' }}>{output}</span>
              ) : (
                <span style={{ color: '#5A586E', fontStyle: 'italic' }}>Output will appear here...</span>
              )}
            </div>
            {output && !error && (
              <div style={{ marginTop: 6, fontSize: 11, fontFamily: fm, color: '#5A586E' }}>
                {output.length.toLocaleString()} characters
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Base64 encoder & decoder</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            Base64Lab encodes text to Base64 and decodes Base64 back to readable text. Convert images to Base64 data URIs for embedding in HTML and CSS. Supports UTF-8 characters. All processing happens locally — your data never leaves your browser.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
