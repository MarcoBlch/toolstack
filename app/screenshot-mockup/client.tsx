'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"

const BACKGROUNDS = [
  { name: 'Purple Blue', css: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Sunset', css: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'Ocean', css: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { name: 'Forest', css: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { name: 'Dark', css: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { name: 'Warm', css: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { name: 'Midnight', css: 'linear-gradient(135deg, #0c0c1d, #1a1a3e)' },
  { name: 'White', css: '#f5f5f5' },
]

const FRAMES = ['browser', 'macos', 'minimal', 'none'] as const

export default function MockupClient() {
  const [image, setImage] = useState<string | null>(null)
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 })
  const [frame, setFrame] = useState<typeof FRAMES[number]>('browser')
  const [bgIdx, setBgIdx] = useState(0)
  const [padding, setPadding] = useState(60)
  const [shadow, setShadow] = useState(true)
  const [dragOver, setDragOver] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadImage = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setImgDims({ w: img.naturalWidth, h: img.naturalHeight })
        setImage(e.target?.result as string)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0])
  }, [loadImage])

  useEffect(() => {
    if (!image || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(800 / img.naturalWidth, 1)
      const iw = Math.round(img.naturalWidth * scale)
      const ih = Math.round(img.naturalHeight * scale)
      const frameH = frame === 'browser' ? 36 : frame === 'macos' ? 28 : frame === 'minimal' ? 4 : 0
      const totalW = iw + padding * 2
      const totalH = ih + frameH + padding * 2

      canvas.width = totalW
      canvas.height = totalH

      // Background
      const bg = BACKGROUNDS[bgIdx]
      if (bg.css.startsWith('linear-gradient')) {
        const colors = bg.css.match(/#[0-9a-f]{6}/gi) || ['#667eea', '#764ba2']
        const grad = ctx.createLinearGradient(0, 0, totalW, totalH)
        grad.addColorStop(0, colors[0])
        grad.addColorStop(1, colors[1] || colors[0])
        ctx.fillStyle = grad
      } else {
        ctx.fillStyle = bg.css
      }
      ctx.fillRect(0, 0, totalW, totalH)

      const x = padding
      const y = padding

      // Shadow
      if (shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.25)'
        ctx.shadowBlur = 40
        ctx.shadowOffsetY = 10
      }

      // Frame
      const radius = 10
      if (frame !== 'none') {
        ctx.fillStyle = frame === 'macos' ? '#E8E4DB' : frame === 'browser' ? '#F5F3EE' : '#E0E0E0'
        ctx.beginPath()
        ctx.roundRect(x, y, iw, frameH, [radius, radius, 0, 0])
        ctx.fill()

        // Reset shadow for dots/buttons
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        if (frame === 'macos' || frame === 'browser') {
          const dotY = y + frameH / 2
          const dotR = 5
          const colors = ['#FF5F57', '#FFBD2E', '#28C840']
          colors.forEach((c, i) => {
            ctx.fillStyle = c
            ctx.beginPath()
            ctx.arc(x + 16 + i * 20, dotY, dotR, 0, Math.PI * 2)
            ctx.fill()
          })
        }

        if (frame === 'browser') {
          // URL bar
          ctx.fillStyle = '#E0DCD4'
          ctx.beginPath()
          ctx.roundRect(x + 90, y + 8, iw - 120, 20, 6)
          ctx.fill()
        }
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      }

      // Image
      if (shadow && frame === 'none') {
        ctx.shadowColor = 'rgba(0,0,0,0.25)'
        ctx.shadowBlur = 40
        ctx.shadowOffsetY = 10
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      }

      if (frame === 'none') {
        ctx.beginPath()
        ctx.roundRect(x, y, iw, ih, radius)
        ctx.clip()
      }
      ctx.drawImage(img, x, y + frameH, iw, ih)
    }
    img.src = image
  }, [image, frame, bgIdx, padding, shadow])

  const download = () => {
    if (!canvasRef.current) return
    const a = document.createElement('a')
    a.href = canvasRef.current.toDataURL('image/png')
    a.download = `mockup-${Date.now()}.png`
    a.click()
  }

  return (
    <ToolShell name="Screenshot Mockup" icon="🖼" currentPath="/screenshot-mockup">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>S</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>ScreenSnap</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 900, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Screenshot <span style={{ color: '#7C3AED' }}>mockup</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Drop a screenshot. Get a beautiful mockup. Download PNG.</p>
        </section>

        <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px 40px' }}>
          {!image ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              style={{
                background: dragOver ? '#7C3AED08' : '#fff',
                border: `2px dashed ${dragOver ? '#7C3AED' : '#E8E4DB'}`,
                borderRadius: 18, padding: '64px 28px', textAlign: 'center',
                cursor: 'pointer', transition: 'all .2s',
              }}
            >
              <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && loadImage(e.target.files[0])} />
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🖼️</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Drop a screenshot here or click to browse</div>
              <div style={{ fontSize: 13, color: '#9A958A' }}>PNG, JPEG, WebP</div>
            </div>
          ) : (
            <div>
              {/* Controls */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
                {/* Frame */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {FRAMES.map(f => (
                    <button key={f} onClick={() => setFrame(f)} style={{
                      fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
                      border: frame === f ? '1.5px solid #7C3AED' : '1.5px solid #E8E4DB',
                      background: frame === f ? '#7C3AED10' : '#fff', color: frame === f ? '#7C3AED' : '#6B6560',
                    }}>{f}</button>
                  ))}
                </div>

                <div style={{ width: 1, height: 24, background: '#E8E4DB' }} />

                {/* Shadow toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B6560', cursor: 'pointer' }}>
                  <input type="checkbox" checked={shadow} onChange={e => setShadow(e.target.checked)} style={{ accentColor: '#7C3AED' }} />
                  Shadow
                </label>

                {/* Padding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: '#9A958A' }}>Padding</span>
                  <input type="range" min="20" max="120" value={padding} onChange={e => setPadding(+e.target.value)}
                    style={{ width: 100, accentColor: '#7C3AED' }} />
                </div>

                <div style={{ flex: 1 }} />

                <button onClick={() => { setImage(null); setImgDims({ w: 0, h: 0 }) }} style={{
                  fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 8,
                  border: '1.5px solid #E8E4DB', background: '#fff', color: '#6B6560', cursor: 'pointer',
                }}>Change image</button>

                <button onClick={download} style={{
                  fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '9px 22px', borderRadius: 10,
                  border: 'none', background: '#7C3AED', color: '#fff', cursor: 'pointer',
                }}>Download PNG</button>
              </div>

              {/* Backgrounds */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {BACKGROUNDS.map((bg, i) => (
                  <button key={i} onClick={() => setBgIdx(i)} title={bg.name} style={{
                    width: 36, height: 36, borderRadius: 10, cursor: 'pointer', background: bg.css,
                    border: bgIdx === i ? '2px solid #7C3AED' : '2px solid #E8E4DB',
                    transform: bgIdx === i ? 'scale(1.1)' : 'scale(1)', transition: 'all .15s',
                  }} />
                ))}
              </div>

              {/* Canvas preview */}
              <div style={{
                background: BACKGROUNDS[bgIdx].css, borderRadius: 18,
                padding: 20, display: 'flex', justifyContent: 'center',
                border: '1px solid #E8E4DB',
              }}>
                <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
              </div>
            </div>
          )}
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free screenshot mockup generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            ScreenSnap frames your screenshots in polished browser and device mockups with just a few clicks. Upload any image, choose a frame style — browser window, macOS window, minimal bar, or no frame — and pick a gradient background. Adjust padding and shadow intensity to get exactly the look you want, then download the result as a high-resolution PNG. All processing happens locally in your browser, so your images stay private.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Frame styles and gradient backgrounds</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The browser frame adds a realistic address bar that makes your screenshot look like a live webpage, which is ideal for product demos and landing page previews. The macOS window style adds the familiar traffic-light buttons for a clean desktop feel. Gradient backgrounds are available in several color combinations, turning a flat screenshot into an eye-catching visual that stands out on social media feeds and presentation slides.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Use cases for screenshot mockups</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Designers use mockups in portfolio case studies to present their work professionally. Developers include them in documentation and README files to show users what an application looks like. Marketers use framed screenshots in blog posts, newsletters, and social media campaigns to drive engagement. A well-framed screenshot communicates quality and builds trust far more effectively than a raw screen capture pasted into a document.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Before uploading your mockup, reduce the file size with the <a href="/image-compressor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Image Compressor</a> to keep page loads fast. Want to create the gradient background separately? Use the <a href="/gradient-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Gradient Generator</a> to design custom CSS gradients for your site.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
