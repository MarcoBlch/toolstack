'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#D97706'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

type Mode = 'whatIs' | 'whatPercent' | 'change'

const modes: { key: Mode; label: string }[] = [
  { key: 'whatIs', label: 'What is X% of Y?' },
  { key: 'whatPercent', label: 'X is what % of Y?' },
  { key: 'change', label: '% change from X to Y' },
]

const presets = [5, 10, 15, 20, 25, 33, 50, 75]

export default function PercentageClient({
  defaultMode,
  defaultX,
  defaultY,
}: {
  defaultMode?: string
  defaultX?: number
  defaultY?: number
} = {}) {
  const [mode, setMode] = useState<Mode>((defaultMode as Mode) ?? 'whatIs')
  const [x, setX] = useState(defaultX ?? 10)
  const [y, setY] = useState(defaultY ?? 200)

  const result = useMemo(() => {
    if (mode === 'whatIs') {
      return (x / 100) * y
    }
    if (mode === 'whatPercent') {
      if (y === 0) return 0
      return (x / y) * 100
    }
    // change
    if (x === 0) return 0
    return ((y - x) / Math.abs(x)) * 100
  }, [mode, x, y])

  const resultLabel = useMemo(() => {
    if (mode === 'whatIs') return `${x}% of ${y} is`
    if (mode === 'whatPercent') return `${x} is this % of ${y}`
    return `Change from ${x} to ${y}`
  }, [mode, x, y])

  const formatResult = (val: number) => {
    const s = val % 1 === 0 ? val.toString() : val.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
    if (mode === 'change') {
      return (val >= 0 ? '+' : '') + s + '%'
    }
    if (mode === 'whatPercent') {
      return s + '%'
    }
    return s
  }

  const xLabel = mode === 'whatIs' ? 'Percentage (X)' : mode === 'whatPercent' ? 'Value (X)' : 'Old Value (X)'
  const yLabel = mode === 'whatIs' ? 'Number (Y)' : mode === 'whatPercent' ? 'Total (Y)' : 'New Value (Y)'

  return (
    <ToolShell name="Percentage Calculator" icon="%" currentPath="/percentage-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>%</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Percentage Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Percentage <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate percentages instantly with three different modes.</p>
        </section>

        {/* Mode tabs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {modes.map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  flex: 1,
                  minWidth: 140,
                  padding: '10px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: fb,
                  border: mode === m.key ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                  borderRadius: 10,
                  background: mode === m.key ? accent + '0F' : '#fff',
                  color: mode === m.key ? accent : '#6B6560',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{xLabel}</label>
                <input
                  type="number"
                  value={x}
                  onChange={e => setX(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{yLabel}</label>
                <input
                  type="number"
                  value={y}
                  onChange={e => setY(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Quick presets - only for whatIs mode */}
            {mode === 'whatIs' && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Quick Presets</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setX(p)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: fb,
                        border: x === p ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                        borderRadius: 8,
                        background: x === p ? accent + '12' : '#F5F3EE',
                        color: x === p ? accent : '#6B6560',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Result */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{
            background: accent + '0A',
            border: `1.5px solid ${accent}25`,
            borderRadius: 18,
            padding: 32,
            textAlign: 'center',
          }}>
            <div style={labelStyle}>{resultLabel}</div>
            <div style={{
              fontSize: 48,
              fontFamily: fm,
              fontWeight: 700,
              color: accent,
              marginTop: 8,
            }}>
              {formatResult(result)}
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free percentage calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This percentage calculator handles the three most common percentage questions in one tool. Use the first mode to find what a specific percentage of any number is, the second mode to determine what proportion one number is of another, and the third mode to calculate the percentage change between two values. Quick preset buttons let you tap common percentages without typing.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Everyday percentage math</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Percentages come up constantly in daily life: calculating discounts while shopping, figuring out how much to tip, understanding interest rates on loans, or tracking the growth of your savings. Rather than pulling out a formula each time, this calculator gives you instant answers. Just pick your mode, enter two numbers, and the result appears immediately.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Percentage change vs. percentage difference</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Percentage change measures how much a value has increased or decreased relative to its original amount. A positive result means growth, while a negative result indicates a decline. This is especially useful for tracking price changes, investment returns, or comparing performance metrics over different time periods in a clear and standardized way.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to apply percentages to real financial scenarios? Try the <a href="/mortgage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>mortgage calculator</a> for home loan math, the <a href="/tip-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>tip calculator</a> for restaurant bills, or the <a href="/vat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>VAT calculator</a> for sales tax.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
