'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const PRESETS = [
  { name: 'Sunset', c1: '#FF6B35', c2: '#E8457A', angle: 135 },
  { name: 'Ocean', c1: '#0EA5E9', c2: '#6366F1', angle: 135 },
  { name: 'Forest', c1: '#22C55E', c2: '#0D9488', angle: 135 },
  { name: 'Midnight', c1: '#1E1B4B', c2: '#312E81', angle: 180 },
  { name: 'Peach', c1: '#FB923C', c2: '#FBBF24', angle: 90 },
  { name: 'Lavender', c1: '#A78BFA', c2: '#EC4899', angle: 135 },
  { name: 'Mint', c1: '#34D399', c2: '#60A5FA', angle: 120 },
  { name: 'Fire', c1: '#EF4444', c2: '#F97316', angle: 90 },
  { name: 'Night', c1: '#0F172A', c2: '#1E3A5F', angle: 180 },
  { name: 'Candy', c1: '#F472B6', c2: '#818CF8', angle: 135 },
  { name: 'Lime', c1: '#84CC16', c2: '#22D3EE', angle: 135 },
  { name: 'Warm', c1: '#F59E0B', c2: '#EF4444', angle: 135 },
]

export default function GradientClient() {
  const [c1, setC1] = useState('#6366F1')
  const [c2, setC2] = useState('#EC4899')
  const [angle, setAngle] = useState(135)
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [copied, setCopied] = useState(false)

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
    : `radial-gradient(circle, ${c1}, ${c2})`

  const css = `background: ${gradient};`

  const copy = useCallback(() => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [css])

  const applyPreset = (p: typeof PRESETS[0]) => {
    setC1(p.c1); setC2(p.c2); setAngle(p.angle); setType('linear')
  }

  const randomize = () => {
    const hex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setC1(hex()); setC2(hex()); setAngle(Math.floor(Math.random() * 360))
  }

  return (
    <ToolShell name="Gradient Generator" icon="◆" currentPath="/gradient-generator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #6366F1, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>G</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>GradientLab</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            CSS gradient <span style={{ background: 'linear-gradient(135deg, #6366F1, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>generator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Pick colors. Copy CSS. Done.</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          {/* Preview */}
          <div>
            <div style={{
              width: '100%', aspectRatio: '16/9', borderRadius: 18,
              background: gradient, border: '1.5px solid #E8E4DB',
              marginBottom: 14, transition: 'background .3s',
            }} />

            {/* CSS Output */}
            <div style={{
              background: '#0E0E11', borderRadius: 14, padding: '18px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 14,
            }}>
              <code style={{ fontFamily: fm, fontSize: 13, color: '#E8E6F0', wordBreak: 'break-all', flex: 1, marginRight: 12 }}>
                {css}
              </code>
              <button onClick={copy} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 8,
                border: 'none', cursor: 'pointer', flexShrink: 0,
                background: copied ? '#22A065' : '#6366F1', color: '#fff',
              }}>{copied ? 'Copied!' : 'Copy CSS'}</button>
            </div>

            {/* Presets */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Presets</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                {PRESETS.map((p) => (
                  <button key={p.name} onClick={() => applyPreset(p)} title={p.name} style={{
                    aspectRatio: '1', borderRadius: 12, cursor: 'pointer',
                    background: `linear-gradient(${p.angle}deg, ${p.c1}, ${p.c2})`,
                    border: '2px solid transparent', transition: 'all .15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, position: 'sticky', top: 20 }}>
            {/* Type */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>Type</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['linear', 'radial'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)} style={{
                    flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px', borderRadius: 8, cursor: 'pointer',
                    border: type === t ? '1.5px solid #6366F1' : '1.5px solid #E8E4DB',
                    background: type === t ? '#6366F108' : 'transparent',
                    color: type === t ? '#6366F1' : '#6B6560',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>Colors</div>
              {[{ label: 'Color 1', val: c1, set: setC1 }, { label: 'Color 2', val: c2, set: setC2 }].map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <input type="color" value={c.val} onChange={e => c.set(e.target.value)}
                    style={{ width: 44, height: 44, border: 'none', borderRadius: 10, cursor: 'pointer', padding: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#9A958A', marginBottom: 2 }}>{c.label}</div>
                    <input type="text" value={c.val} onChange={e => c.set(e.target.value)}
                      style={{
                        width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
                        padding: '6px 10px', fontFamily: fm, fontSize: 13, color: '#1C1B18',
                        background: '#F5F3EE', outline: 'none', textTransform: 'uppercase',
                      }} />
                  </div>
                </div>
              ))}
              <button onClick={() => { const t = c1; setC1(c2); setC2(t) }} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 7,
                border: '1.5px solid #E8E4DB', background: 'transparent', color: '#6B6560',
                cursor: 'pointer', width: '100%', marginTop: 4,
              }}>⇅ Swap colors</button>
            </div>

            {/* Angle */}
            {type === 'linear' && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Angle</span>
                  <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, color: '#6366F1' }}>{angle}°</span>
                </div>
                <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)}
                  style={{ width: '100%', accentColor: '#6366F1' }} />
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  {[0, 45, 90, 135, 180, 270].map(a => (
                    <button key={a} onClick={() => setAngle(a)} style={{
                      flex: 1, fontFamily: fm, fontSize: 11, padding: '5px', borderRadius: 6,
                      border: angle === a ? '1px solid #6366F1' : '1px solid #E8E4DB',
                      background: angle === a ? '#6366F108' : 'transparent',
                      color: angle === a ? '#6366F1' : '#9A958A', cursor: 'pointer',
                    }}>{a}°</button>
                  ))}
                </div>
              </div>
            )}

            {/* Random */}
            <button onClick={randomize} style={{
              fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px', borderRadius: 10,
              border: 'none', background: '#1C1B18', color: '#fff', cursor: 'pointer', width: '100%',
            }}>Randomize</button>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free CSS gradient generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            GradientLab helps you create beautiful CSS gradients without writing code by hand. Choose two colors, set the direction, and instantly preview the result. The tool supports both linear and radial gradient types, letting you switch between them with a single click. Once you are happy with the look, copy the production-ready CSS and paste it straight into your stylesheet or Tailwind config. Everything runs locally in your browser, so your work stays private.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Linear and radial gradients explained</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            A linear gradient transitions between colors along a straight line at a specific angle, making it ideal for backgrounds, hero sections, and banners. A radial gradient radiates outward from a center point, which works well for spotlight effects and circular UI elements. GradientLab lets you control the angle for linear gradients and preview the radial option in real time, so you can compare both styles before committing to one.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Presets, randomization, and copying CSS</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Not sure where to start? Browse 12 handpicked gradient presets curated for modern web design, or hit the Randomize button to discover unexpected color combinations. Each preset is fully editable, so you can use it as a starting point and fine-tune the colors and angle. When you are ready, the one-click copy button places the complete CSS rule on your clipboard, including the fallback background-color for older browsers.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Need to pick exact colors first? Try the <a href="/color-picker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Color Picker</a> to find the perfect HEX or RGB values. Once your design is final, wrap your screenshots with the <a href="/screenshot-mockup" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Screenshot Mockup</a> tool to present your gradient in a polished browser frame for portfolios and social media.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
