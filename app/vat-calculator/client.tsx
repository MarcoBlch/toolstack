'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#4338CA'

const labelStyle = {
  fontSize: 11, fontWeight: 600 as const, color: '#9A958A',
  textTransform: 'uppercase' as const, letterSpacing: '.8px',
  display: 'block' as const, marginBottom: 4,
}
const inputStyle = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

type VATPreset = { label: string; rate: number; country: string }

const PRESETS: VATPreset[] = [
  { label: 'France 20%', rate: 20, country: '🇫🇷' },
  { label: 'France 10%', rate: 10, country: '🇫🇷' },
  { label: 'France 5.5%', rate: 5.5, country: '🇫🇷' },
  { label: 'France 2.1%', rate: 2.1, country: '🇫🇷' },
  { label: 'UK 20%', rate: 20, country: '🇬🇧' },
  { label: 'Germany 19%', rate: 19, country: '🇩🇪' },
  { label: 'Spain 21%', rate: 21, country: '🇪🇸' },
  { label: 'Italy 22%', rate: 22, country: '🇮🇹' },
]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function VATClient({
  defaultPrice,
  defaultRate,
  defaultMode,
}: {
  defaultPrice?: number
  defaultRate?: number
  defaultMode?: string
} = {}) {
  const [mode, setMode] = useState<'add' | 'remove'>(defaultMode === 'remove' ? 'remove' : 'add')
  const [price, setPrice] = useState(defaultPrice?.toString() || '100')
  const [rate, setRate] = useState(defaultRate?.toString() || '20')
  const [customRate, setCustomRate] = useState(false)

  const result = useMemo(() => {
    const p = parseFloat(price)
    const r = parseFloat(rate)
    if (isNaN(p) || isNaN(r) || p < 0 || r < 0) return null
    const vatMultiplier = r / 100

    if (mode === 'add') {
      const netPrice = p
      const vatAmount = netPrice * vatMultiplier
      const grossPrice = netPrice + vatAmount
      return { netPrice, vatAmount, grossPrice }
    } else {
      const grossPrice = p
      const netPrice = grossPrice / (1 + vatMultiplier)
      const vatAmount = grossPrice - netPrice
      return { netPrice, vatAmount, grossPrice }
    }
  }, [price, rate, mode])

  const selectPreset = (preset: VATPreset) => {
    setRate(preset.rate.toString())
    setCustomRate(false)
  }

  const enableCustom = () => {
    setCustomRate(true)
  }

  return (
    <ToolShell name="VAT Calculator" icon="🧾" currentPath="/vat-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🧾</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>VAT Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            VAT / Sales <span style={{ color: accent }}>Tax</span> Calculator
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Add or remove VAT from any price. Instant results.</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Mode tabs */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Mode</label>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                <button onClick={() => setMode('add')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none',
                  background: mode === 'add' ? accent : '#F5F3EE',
                  color: mode === 'add' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>+ Add VAT</button>
                <button onClick={() => setMode('remove')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                  background: mode === 'remove' ? accent : '#F5F3EE',
                  color: mode === 'remove' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>− Remove VAT</button>
              </div>
            </div>

            {/* Price input */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{mode === 'add' ? 'Net price (excl. VAT)' : 'Gross price (incl. VAT)'}</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter amount"
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center' as const, borderRadius: 12 }}
              />
            </div>

            {/* VAT rate presets */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>VAT Rate</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {PRESETS.map((p, i) => {
                  const isActive = !customRate && rate === p.rate.toString()
                  return (
                    <button key={i} onClick={() => selectPreset(p)} style={{
                      fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                      borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                      border: isActive ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                      background: isActive ? accent + '10' : '#fff',
                      color: isActive ? accent : '#6B6560',
                      transition: 'all .15s',
                    }}>
                      <span style={{ fontSize: 12 }}>{p.country}</span> {p.label}
                    </button>
                  )
                })}
                <button onClick={enableCustom} style={{
                  fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                  borderRadius: 8, cursor: 'pointer',
                  border: customRate ? `1.5px solid ${accent}` : '1.5px dashed #E8E4DB',
                  background: customRate ? accent + '10' : '#fff',
                  color: customRate ? accent : '#9A958A',
                  transition: 'all .15s',
                }}>
                  Custom
                </button>
              </div>

              {/* Custom rate or show current */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={rate}
                  onChange={e => { setRate(e.target.value); setCustomRate(true) }}
                  onFocus={() => setCustomRate(true)}
                  placeholder="e.g. 20"
                  style={{ ...inputStyle, width: 120, textAlign: 'center' as const, fontFamily: fm, fontWeight: 600 }}
                />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#9A958A' }}>%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {/* Net price */}
              <div style={{
                background: mode === 'add' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Net price (HT)</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'remove' ? accent : '#1C1B18' }}>
                  {fmt(result.netPrice)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>excl. tax</div>
              </div>

              {/* VAT amount */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>VAT amount</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                  {fmt(result.vatAmount)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{rate}% tax</div>
              </div>

              {/* Gross price */}
              <div style={{
                background: mode === 'remove' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Gross price (TTC)</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'add' ? accent : '#1C1B18' }}>
                  {fmt(result.grossPrice)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>incl. tax</div>
              </div>
            </div>

            {/* Visual formula */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: accent + '10', border: `1px solid ${accent}30` }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>Net</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.netPrice)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>+</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#FEF3C7', border: '1px solid #F5E6B8' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>VAT ({rate}%)</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{fmt(result.vatAmount)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>=</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>Gross</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>{fmt(result.grossPrice)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free VAT calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This VAT calculator lets you add or remove value-added tax from any price in seconds. Switch between the two modes depending on whether you are starting with a net price or a gross price that already includes tax. The tool shows the net amount, VAT amount, and gross total side by side, along with a clear visual formula so you can verify the math at a glance.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Country-specific VAT rates</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Pre-set buttons cover the most common VAT rates across Europe, including all four French rates, the UK standard rate, Germany at 19 percent, Spain at 21 percent, and Italy at 22 percent. If your country or rate is not listed, simply type a custom percentage. This flexibility makes the tool useful for freelancers, small businesses, and anyone who handles invoices regularly.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding VAT and sales tax</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            VAT, known as TVA in France, Mehrwertsteuer in Germany, and IVA in Spain and Italy, is a consumption tax applied at each stage of production. For consumers, it appears as a percentage added to the final price. Knowing how to separate net and gross amounts is important for expense tracking, tax filing, and ensuring your invoices are correctly formatted.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to convert gross salary to net pay? Try the <a href="/salary-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>salary calculator</a>. Working with international prices? The <a href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>currency converter</a> handles 30+ currencies.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
