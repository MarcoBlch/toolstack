'use client'
import { useState, useMemo, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function generateShades(hex: string, count: number = 7): string[] {
  const [r, g, b] = hexToRgb(hex)
  return Array.from({ length: count }, (_, i) => {
    const factor = 1 - (i / (count - 1)) * 0.85
    return rgbToHex(Math.round(r * factor), Math.round(g * factor), Math.round(b * factor))
  })
}

function generateTints(hex: string, count: number = 7): string[] {
  const [r, g, b] = hexToRgb(hex)
  return Array.from({ length: count }, (_, i) => {
    const factor = i / (count - 1)
    return rgbToHex(Math.round(r + (255 - r) * factor), Math.round(g + (255 - g) * factor), Math.round(b + (255 - b) * factor))
  })
}

function complementary(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  return rgbToHex(255 - r, 255 - g, 255 - b)
}

function analogous(hex: string): [string, string] {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)
  const hslToHex = (h: number, s: number, l: number) => {
    const hh = ((h % 360) + 360) % 360
    const c = document.createElement('canvas').getContext('2d')!
    c.fillStyle = `hsl(${hh}, ${s}%, ${l}%)`
    return c.fillStyle
  }
  return [hslToHex(h - 30, s, l), hslToHex(h + 30, s, l)]
}

export default function ColorClient({
  defaultColor,
}: {
  defaultColor?: string
} = {}) {
  const [color, setColor] = useState(defaultColor || '#3B82F6')
  const [copied, setCopied] = useState<string | null>(null)

  const [r, g, b] = useMemo(() => hexToRgb(color), [color])
  const [h, s, l] = useMemo(() => rgbToHsl(r, g, b), [r, g, b])
  const shades = useMemo(() => generateShades(color), [color])
  const tints = useMemo(() => generateTints(color), [color])
  const comp = useMemo(() => complementary(color), [color])

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1200)
  }, [])

  const ValueRow = ({ label, value }: { label: string; value: string }) => (
    <div onClick={() => copy(value)} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
      background: copied === value ? '#22A06508' : 'transparent',
      border: `1px solid ${copied === value ? '#22A06530' : '#E8E4DB'}`,
      marginBottom: 6, transition: 'all .15s',
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{label}</span>
      <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 600, color: copied === value ? '#22A065' : '#1C1B18' }}>
        {copied === value ? 'Copied!' : value}
      </span>
    </div>
  )

  return (
    <ToolShell name="Color Picker" icon="🎨" currentPath="/color-picker">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🎨</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>ColorPick</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Color <span style={{ color }}>picker</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Pick a color. Get every format. Generate palettes.</p>
        </section>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px 40px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          {/* Left: picker + palettes */}
          <div>
            {/* Big color block + picker */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 16 }}>
              <div style={{ width: '100%', height: 160, borderRadius: 14, background: color, marginBottom: 16, border: '1px solid #E8E4DB' }} />
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)}
                  style={{ width: 56, height: 56, border: 'none', borderRadius: 12, cursor: 'pointer', padding: 0 }} />
                <input type="text" value={color} onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) setColor(e.target.value) }}
                  style={{ flex: 1, border: '2px solid #E8E4DB', borderRadius: 12, padding: '14px 16px', fontFamily: fm, fontSize: 20, fontWeight: 700, color: '#1C1B18', textAlign: 'center', background: '#F5F3EE', outline: 'none', textTransform: 'uppercase' }} />
              </div>
            </div>

            {/* Shades */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Shades (darker)</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {shades.map((c, i) => (
                  <div key={i} onClick={() => { setColor(c); copy(c) }} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 10, background: c, cursor: 'pointer',
                    border: `2px solid ${color === c ? '#1C1B18' : 'transparent'}`,
                    transition: 'all .15s',
                  }} title={c} />
                ))}
              </div>
            </div>

            {/* Tints */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Tints (lighter)</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {tints.map((c, i) => (
                  <div key={i} onClick={() => { setColor(c); copy(c) }} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 10, background: c, cursor: 'pointer',
                    border: `2px solid ${color === c ? '#1C1B18' : '#E8E4DB'}`,
                    transition: 'all .15s',
                  }} title={c} />
                ))}
              </div>
            </div>

            {/* Complementary */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Complementary</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div onClick={() => copy(color)} style={{ flex: 1, height: 48, borderRadius: 10, background: color, cursor: 'pointer', border: '1px solid #E8E4DB' }} title={color} />
                <div onClick={() => { setColor(comp); copy(comp) }} style={{ flex: 1, height: 48, borderRadius: 10, background: comp, cursor: 'pointer', border: '1px solid #E8E4DB' }} title={comp} />
              </div>
            </div>
          </div>

          {/* Right: values */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, position: 'sticky', top: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 14 }}>
              Color values <span style={{ fontSize: 10, color: '#B0AAA0' }}>(click to copy)</span>
            </div>
            <ValueRow label="HEX" value={color.toUpperCase()} />
            <ValueRow label="RGB" value={`rgb(${r}, ${g}, ${b})`} />
            <ValueRow label="HSL" value={`hsl(${h}, ${s}%, ${l}%)`} />
            <ValueRow label="CSS" value={`background: ${color};`} />
            <ValueRow label="Tailwind" value={`bg-[${color}]`} />

            <div style={{ marginTop: 16, padding: '14px', borderRadius: 12, background: '#F5F3EE' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                <div><span style={{ color: '#9A958A' }}>Red:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{r}</span></div>
                <div><span style={{ color: '#9A958A' }}>Green:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{g}</span></div>
                <div><span style={{ color: '#9A958A' }}>Blue:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{b}</span></div>
                <div><span style={{ color: '#9A958A' }}>Hue:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{h}°</span></div>
                <div><span style={{ color: '#9A958A' }}>Sat:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{s}%</span></div>
                <div><span style={{ color: '#9A958A' }}>Light:</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{l}%</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free color picker & converter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            ColorPick is a free online color picker that lets you choose any color and instantly view its value in HEX, RGB, HSL, CSS, and Tailwind formats. Click any value to copy it to your clipboard. The tool also generates shades, tints, and complementary colors so you can build a complete palette without switching between apps. Everything runs in your browser, meaning your selections are never sent to a server.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Understanding color formats</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            HEX codes are the most common format for web colors, using six characters to represent red, green, and blue channels. RGB breaks the same information into three decimal values, which is useful for JavaScript and CSS functions. HSL describes color by hue, saturation, and lightness, making it easier to create consistent palettes because you can adjust brightness without changing the base hue. ColorPick displays all three formats simultaneously so you always have the one you need.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Shades, tints, and complementary colors</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Shades are created by mixing a color with black, producing darker variations that work well for text, borders, and hover states. Tints mix the color with white, giving you lighter options ideal for backgrounds and subtle accents. Complementary colors sit on the opposite side of the color wheel and create strong visual contrast when paired together. ColorPick generates all of these automatically from your selected color.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Once you have chosen your palette, use the <a href="/gradient-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Gradient Generator</a> to blend your colors into smooth CSS gradients. You can also apply your brand color to a custom <a href="/favicon-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Favicon</a> to keep your website identity consistent across browser tabs.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
