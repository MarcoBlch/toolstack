'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const SIZES = [16, 32, 48, 180, 512]
const SHAPES = ['square', 'rounded', 'circle'] as const

const PRESETS = [
  { bg: '#1C1B18', fg: '#FFFFFF' }, { bg: '#3B82F6', fg: '#FFFFFF' },
  { bg: '#22C55E', fg: '#FFFFFF' }, { bg: '#EF4444', fg: '#FFFFFF' },
  { bg: '#8B5CF6', fg: '#FFFFFF' }, { bg: '#F59E0B', fg: '#1C1B18' },
  { bg: '#EC4899', fg: '#FFFFFF' }, { bg: '#0EA5E9', fg: '#FFFFFF' },
  { bg: '#FFFFFF', fg: '#1C1B18' }, { bg: '#FF6B35', fg: '#FFFFFF' },
]

function drawFavicon(canvas: HTMLCanvasElement, size: number, letter: string, bg: string, fg: string, shape: typeof SHAPES[number]) {
  const ctx = canvas.getContext('2d')!
  canvas.width = size
  canvas.height = size
  ctx.clearRect(0, 0, size, size)

  // Background shape
  ctx.fillStyle = bg
  if (shape === 'circle') {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()
  } else if (shape === 'rounded') {
    const r = size * 0.2
    ctx.beginPath()
    ctx.roundRect(0, 0, size, size, r)
    ctx.fill()
  } else {
    ctx.fillRect(0, 0, size, size)
  }

  // Letter
  ctx.fillStyle = fg
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const fontSize = size * 0.55
  ctx.font = `bold ${fontSize}px "Outfit", -apple-system, sans-serif`
  ctx.fillText(letter || 'A', size / 2, size / 2 + size * 0.02)
}

export default function FaviconClient() {
  const [letter, setLetter] = useState('T')
  const [bg, setBg] = useState('#3B82F6')
  const [fg, setFg] = useState('#FFFFFF')
  const [shape, setShape] = useState<typeof SHAPES[number]>('rounded')
  const previewRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (previewRef.current) drawFavicon(previewRef.current, 256, letter, bg, fg, shape)
  }, [letter, bg, fg, shape])

  const downloadAll = useCallback(() => {
    SIZES.forEach(size => {
      const canvas = document.createElement('canvas')
      drawFavicon(canvas, size, letter, bg, fg, shape)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `favicon-${size}x${size}.png`
      a.click()
    })
  }, [letter, bg, fg, shape])

  const downloadSingle = useCallback((size: number) => {
    const canvas = document.createElement('canvas')
    drawFavicon(canvas, size, letter, bg, fg, shape)
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }, [letter, bg, fg, shape])

  return (
    <ToolShell name="Favicon Generator" icon="◨" currentPath="/favicon-generator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>F</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>FaviconForge</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Favicon <span style={{ color: '#3B82F6' }}>generator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Type a letter. Pick colors. Download all sizes.</p>
        </section>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px 40px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          {/* Controls */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 16 }}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>Letter or emoji</label>
                <input type="text" value={letter} maxLength={2} onChange={e => setLetter(e.target.value)}
                  style={{ width: '100%', border: '2px solid #E8E4DB', borderRadius: 12, padding: '16px', fontSize: 32, fontFamily: fb, fontWeight: 800, color: '#1C1B18', textAlign: 'center', background: '#F5F3EE', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                {[{ label: 'Background', val: bg, set: setBg }, { label: 'Text color', val: fg, set: setFg }].map(c => (
                  <div key={c.label}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>{c.label}</label>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input type="color" value={c.val} onChange={e => c.set(e.target.value)}
                        style={{ width: 40, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }} />
                      <input type="text" value={c.val} onChange={e => c.set(e.target.value)}
                        style={{ flex: 1, border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '8px 10px', fontFamily: fm, fontSize: 13, color: '#1C1B18', background: '#F5F3EE', outline: 'none', textTransform: 'uppercase' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 8 }}>Shape</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {SHAPES.map(s => (
                    <button key={s} onClick={() => setShape(s)} style={{
                      flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '10px', borderRadius: 10, cursor: 'pointer',
                      border: shape === s ? '1.5px solid #3B82F6' : '1.5px solid #E8E4DB',
                      background: shape === s ? '#3B82F610' : '#fff', color: shape === s ? '#3B82F6' : '#6B6560',
                    }}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 8 }}>Color presets</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {PRESETS.map((p, i) => (
                    <button key={i} onClick={() => { setBg(p.bg); setFg(p.fg) }} style={{
                      width: 36, height: 36, borderRadius: 8, cursor: 'pointer',
                      background: p.bg, border: bg === p.bg ? '2px solid #3B82F6' : '2px solid #E8E4DB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, color: p.fg,
                    }}>A</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size downloads */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Download individual sizes</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SIZES.map(s => (
                  <button key={s} onClick={() => downloadSingle(s)} style={{
                    fontFamily: fm, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8,
                    border: '1.5px solid #E8E4DB', background: '#fff', color: '#6B6560', cursor: 'pointer',
                  }}>{s}×{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, textAlign: 'center', position: 'sticky', top: 20 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <canvas ref={previewRef} style={{ width: 180, height: 180, borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? 36 : 8, border: '1px solid #E8E4DB' }} />
            </div>
            <div style={{ fontSize: 13, color: '#9A958A', marginBottom: 16 }}>512×512 preview</div>
            <button onClick={downloadAll} style={{
              fontFamily: fb, fontSize: 15, fontWeight: 700, width: '100%', padding: 14, borderRadius: 12,
              border: 'none', background: '#3B82F6', color: '#fff', cursor: 'pointer',
            }}>Download all sizes</button>
            <div style={{ fontSize: 11, color: '#9A958A', marginTop: 8 }}>
              16, 32, 48, 180, 512px PNG files
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free favicon generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            FaviconForge creates favicons from any letter or emoji in seconds. Choose your background color, text color, and shape — square, rounded, or circle — to match your brand identity. The tool generates all standard sizes including 16, 32, 48, 180, and 512 pixels as PNG files. These cover everything from browser tabs to iOS home screen icons and PWA splash screens. All rendering happens locally in your browser.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Favicon sizes and where they are used</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The 16px and 32px favicons appear in browser tabs and bookmarks. The 48px size is used by some desktop browsers for shortcut icons. The 180px version is the Apple Touch Icon displayed when someone saves your site to their iPhone home screen. The 512px icon is required for Progressive Web Apps and Android install prompts. By downloading all sizes at once, you ensure your site looks sharp on every device and platform without extra effort.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Letter and emoji favicons for quick branding</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Not every project needs a custom logo. A single letter or emoji favicon is a fast, effective way to give your website a recognizable identity in crowded browser tab bars. Many well-known brands use a simple initial as their favicon. FaviconForge lets you preview the result at full size before downloading, so you can experiment with different letters, colors, and shapes until you find the combination that feels right.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Use the <a href="/color-picker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Color Picker</a> to find the perfect brand color for your favicon background. After creating your favicon, optimize any other site images with the <a href="/image-compressor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Image Compressor</a> to keep your pages loading fast.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
