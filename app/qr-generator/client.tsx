'use client'
import { useState, useEffect, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const PRESETS = [
  { id: 'url', label: 'URL', icon: '🔗', placeholder: 'https://example.com', prefix: '' },
  { id: 'text', label: 'Text', icon: '📝', placeholder: 'Any text to encode', prefix: '' },
  { id: 'wifi', label: 'WiFi', icon: '📶', placeholder: 'Network name', prefix: '' },
  { id: 'email', label: 'Email', icon: '✉', placeholder: 'hello@example.com', prefix: 'mailto:' },
  { id: 'phone', label: 'Phone', icon: '📞', placeholder: '+1 555 0100', prefix: 'tel:' },
]

const COLORS = [
  { fg: '#000000', bg: '#FFFFFF', name: 'Classic' },
  { fg: '#1A1A2E', bg: '#F0F0F5', name: 'Midnight' },
  { fg: '#2D6A4F', bg: '#F0FFF4', name: 'Forest' },
  { fg: '#7B2D8E', bg: '#FBF0FF', name: 'Violet' },
  { fg: '#C0392B', bg: '#FFF5F5', name: 'Ruby' },
  { fg: '#1565C0', bg: '#F0F7FF', name: 'Ocean' },
]

const fb = "'Outfit', sans-serif"

export default function QRClient() {
  const [mode, setMode] = useState('url')
  const [input, setInput] = useState('')
  const [wifiPass, setWifiPass] = useState('')
  const [colorIdx, setColorIdx] = useState(0)
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if ((window as any).QRious) { setLoaded(true); return }
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js'
    s.onload = () => setLoaded(true)
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!loaded || !input.trim()) { setQrUrl(null); return }
    const preset = PRESETS.find(p => p.id === mode)!
    let payload = mode === 'wifi' ? `WIFI:T:WPA;S:${input};P:${wifiPass};;` : (preset.prefix + input.trim())
    const qr = new (window as any).QRious({ value: payload, size: 300, foreground: COLORS[colorIdx].fg, background: COLORS[colorIdx].bg, level: 'M', padding: 16 })
    setQrUrl(qr.toDataURL('image/png'))
  }, [loaded, input, wifiPass, mode, colorIdx])

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a'); a.href = qrUrl; a.download = `qr-${Date.now()}.png`; a.click()
  }

  return (
    <ToolShell name="QR Generator" icon="◫" currentPath="/qr-generator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#1A6B4E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>Q</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>QRDrop</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            QR codes that <em style={{ color: '#1A6B4E' }}>just work</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 24 }}>Free. No signup. No watermark. Download as PNG.</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 40px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              {PRESETS.map(p => (
                <button key={p.id} onClick={() => { setMode(p.id); setInput(''); setWifiPass('') }} style={{
                  fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
                  border: mode === p.id ? '1.5px solid #1A6B4E' : '1.5px solid #E8E4DB',
                  background: mode === p.id ? '#1A6B4E0C' : '#fff', color: mode === p.id ? '#1A6B4E' : '#6B6560',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}><span style={{ fontSize: 14 }}>{p.icon}</span> {p.label}</button>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 8 }}>
                {mode === 'wifi' ? 'Network name' : PRESETS.find(p => p.id === mode)!.label}
              </label>
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder={PRESETS.find(p => p.id === mode)!.placeholder}
                style={{ width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10, padding: '12px 14px', fontSize: 16, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none' }} />
              {mode === 'wifi' && (
                <div style={{ marginTop: 12 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>Password</label>
                  <input type="text" value={wifiPass} onChange={e => setWifiPass(e.target.value)} placeholder="WiFi password"
                    style={{ width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10, padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none' }} />
                </div>
              )}
            </div>

            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 10 }}>Color</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLORS.map((c, i) => (
                  <button key={i} onClick={() => setColorIdx(i)} title={c.name} style={{
                    width: 36, height: 36, borderRadius: 10, cursor: 'pointer',
                    border: colorIdx === i ? '2px solid #1A6B4E' : '2px solid #E8E4DB',
                    background: `linear-gradient(135deg, ${c.fg} 50%, ${c.bg} 50%)`,
                    transform: colorIdx === i ? 'scale(1.1)' : 'scale(1)',
                  }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, textAlign: 'center', position: 'sticky', top: 20 }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: 14, background: qrUrl ? COLORS[colorIdx].bg : '#F5F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden', border: '1px solid #E8E4DB' }}>
              {qrUrl ? <img src={qrUrl} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: 13, color: '#B0AAA0' }}>Your QR code here</span>}
            </div>
            <button onClick={download} disabled={!qrUrl} style={{
              fontFamily: fb, fontSize: 15, fontWeight: 700, width: '100%', padding: 14, borderRadius: 12,
              border: 'none', cursor: qrUrl ? 'pointer' : 'default',
              background: qrUrl ? '#1A6B4E' : '#E8E4DB', color: qrUrl ? '#fff' : '#9A958A',
            }}>Download PNG — Free</button>
          </div>
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free QR code generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            QRDrop generates QR codes instantly for URLs, plain text, WiFi networks, email addresses, phone numbers, and SMS. Customize colors, download as high-res PNG. No signup, no watermark, no limits. Everything runs in your browser — your data never leaves your device.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
