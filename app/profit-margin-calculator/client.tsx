'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A',
  textTransform: 'uppercase', letterSpacing: '.8px',
  display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ProfitMarginClient({
  defaultCost,
  defaultSelling,
  defaultMargin,
}: {
  defaultCost?: number
  defaultSelling?: number
  defaultMargin?: number
} = {}) {
  const [inputMode, setInputMode] = useState<'price' | 'margin'>('price')
  const [cost, setCost] = useState(defaultCost?.toString() || '60')
  const [selling, setSelling] = useState(defaultSelling?.toString() || '100')
  const [targetMargin, setTargetMargin] = useState(defaultMargin?.toString() || '40')

  const result = useMemo(() => {
    const c = parseFloat(cost)
    if (isNaN(c) || c < 0) return null

    if (inputMode === 'price') {
      const s = parseFloat(selling)
      if (isNaN(s) || s < 0) return null
      const profit = s - c
      const margin = s > 0 ? (profit / s) * 100 : 0
      const markup = c > 0 ? (profit / c) * 100 : 0
      return { sellingPrice: s, profit, margin, markup }
    } else {
      const m = parseFloat(targetMargin)
      if (isNaN(m) || m >= 100) return null
      const s = c / (1 - m / 100)
      const profit = s - c
      const markup = c > 0 ? (profit / c) * 100 : 0
      return { sellingPrice: s, profit, margin: m, markup }
    }
  }, [cost, selling, targetMargin, inputMode])

  const costVal = parseFloat(cost) || 0
  const profitVal = result?.profit || 0
  const sellingVal = result?.sellingPrice || 0
  const costPercent = sellingVal > 0 ? (costVal / sellingVal) * 100 : 50
  const profitPercent = sellingVal > 0 ? (profitVal / sellingVal) * 100 : 50

  return (
    <ToolShell name="Profit Margin Calculator" icon="📊" currentPath="/profit-margin-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📊</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Profit Margin Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Profit <span style={{ color: accent }}>Margin</span> Calculator
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate profit margin, markup, and selling price from cost and revenue.</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Mode tabs */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Input Mode</label>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                <button onClick={() => setInputMode('price')} style={{
                  flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none',
                  background: inputMode === 'price' ? accent : '#F5F3EE',
                  color: inputMode === 'price' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>From Cost & Selling Price</button>
                <button onClick={() => setInputMode('margin')} style={{
                  flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                  background: inputMode === 'margin' ? accent : '#F5F3EE',
                  color: inputMode === 'margin' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>From Cost & Target Margin</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Cost input */}
              <div>
                <label style={labelStyle}>Cost ($)</label>
                <input
                  type="number"
                  value={cost}
                  onChange={e => setCost(e.target.value)}
                  placeholder="Enter cost"
                  style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                />
              </div>

              {/* Selling price or target margin */}
              {inputMode === 'price' ? (
                <div>
                  <label style={labelStyle}>Selling Price ($)</label>
                  <input
                    type="number"
                    value={selling}
                    onChange={e => setSelling(e.target.value)}
                    placeholder="Enter selling price"
                    style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                  />
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>Target Margin (%)</label>
                  <input
                    type="number"
                    value={targetMargin}
                    onChange={e => setTargetMargin(e.target.value)}
                    placeholder="Enter desired margin %"
                    style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: inputMode === 'margin' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', gap: 12 }}>
              {/* Selling price (only in margin mode) */}
              {inputMode === 'margin' && (
                <div style={{
                  background: '#fff',
                  borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center',
                }}>
                  <div style={labelStyle}>Selling Price</div>
                  <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: accent }}>
                    ${fmt(result.sellingPrice)}
                  </div>
                </div>
              )}

              {/* Profit */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Profit</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: result.profit >= 0 ? '#16A34A' : '#DC2626' }}>
                  ${fmt(result.profit)}
                </div>
              </div>

              {/* Margin */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Profit Margin</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {fmt(result.margin)}%
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>of selling price</div>
              </div>

              {/* Markup */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Markup</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                  {fmt(result.markup)}%
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>of cost</div>
              </div>
            </div>

            {/* Visual bar: cost vs profit */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 24, marginTop: 16 }}>
              <div style={{ ...labelStyle, marginBottom: 14 }}>Cost vs Profit Breakdown</div>
              <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', height: 40 }}>
                <div style={{
                  width: `${Math.max(costPercent, 2)}%`,
                  background: '#6B6560',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: fm,
                  transition: 'width .3s',
                  minWidth: 60,
                }}>
                  ${fmt(costVal)}
                </div>
                <div style={{
                  width: `${Math.max(profitPercent, 2)}%`,
                  background: profitVal >= 0 ? accent : '#DC2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: fm,
                  transition: 'width .3s',
                  minWidth: 60,
                }}>
                  ${fmt(profitVal)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: '#6B6560', fontWeight: 600 }}>Cost ({fmt(costPercent)}%)</span>
                <span style={{ fontSize: 11, color: accent, fontWeight: 600 }}>Profit ({fmt(profitPercent)}%)</span>
              </div>
            </div>
          </section>
        )}

        {/* Margin vs Markup explanation */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 12 }}>Margin vs Markup Explained</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, color: '#6B6560', lineHeight: 1.7 }}>
              <div>
                <div style={{ fontWeight: 700, color: accent, marginBottom: 4, fontSize: 14 }}>Profit Margin</div>
                <p>Profit as a percentage of the <strong>selling price</strong>.</p>
                <div style={{ background: '#F5F3EE', borderRadius: 8, padding: '8px 12px', marginTop: 8, fontFamily: fm, fontSize: 12 }}>
                  Margin = (Profit / Selling Price) x 100
                </div>
                <p style={{ marginTop: 8 }}>Example: Cost $60, sell $100 → Margin = 40%</p>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#D97706', marginBottom: 4, fontSize: 14 }}>Markup</div>
                <p>Profit as a percentage of the <strong>cost</strong>.</p>
                <div style={{ background: '#F5F3EE', borderRadius: 8, padding: '8px 12px', marginTop: 8, fontFamily: fm, fontSize: 12 }}>
                  Markup = (Profit / Cost) x 100
                </div>
                <p style={{ marginTop: 8 }}>Example: Cost $60, sell $100 → Markup = 66.67%</p>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: accent + '08', borderRadius: 10, border: `1px solid ${accent}20`, fontSize: 13, color: '#6B6560', lineHeight: 1.7 }}>
              <strong style={{ color: '#1C1B18' }}>Key takeaway:</strong> Markup is always a larger number than margin for the same transaction. A 50% margin equals a 100% markup. A 40% margin equals a 66.67% markup. When someone says &quot;we want a 50% margin,&quot; the required markup is 100%, meaning you need to double your cost to reach that margin.
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Profit Margin Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This profit margin calculator helps you understand the true profitability of your products or services. Use the first mode to enter your cost and selling price to see the resulting margin, markup, and profit. Use the second mode to enter your cost and desired margin percentage to find out exactly what selling price you need to charge. Both modes show a visual breakdown of cost versus profit as proportional segments.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding Profit Margin</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Profit margin tells you what percentage of each dollar of revenue is actual profit. A 40 percent margin means you keep 40 cents of every dollar after covering the cost of goods. This is the metric most investors and analysts care about because it shows how efficiently a business converts revenue into profit. Healthy margins vary widely by industry: software companies often achieve 70 to 90 percent gross margins, while grocery stores operate on razor-thin margins of 1 to 3 percent.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Margin vs. Markup: A Common Mistake</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Confusing margin with markup is one of the most expensive pricing errors a business can make. Suppose you buy a product for $60 and want a 40 percent profit. If you mistakenly apply a 40 percent markup, you sell at $84, giving you $24 profit and a 28.6 percent margin, not the 40 percent you wanted. To achieve a true 40 percent margin, you need to sell at $100, which is actually a 66.67 percent markup. This calculator shows both numbers side by side so you always know exactly where you stand.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to focus on markup instead? Try the <a href="/markup-calculator" style={{ color: accent, textDecoration: 'underline' }}>markup calculator</a>. Need to calculate ROI on an investment? Use the <a href="/roi-calculator" style={{ color: accent, textDecoration: 'underline' }}>ROI calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
