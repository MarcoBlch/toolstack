'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#2563EB'

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

const REFERENCE_TABLE = [
  { markup: 10, margin: 9.09 },
  { markup: 20, margin: 16.67 },
  { markup: 25, margin: 20 },
  { markup: 33, margin: 24.81 },
  { markup: 50, margin: 33.33 },
  { markup: 100, margin: 50 },
  { markup: 200, margin: 66.67 },
  { markup: 300, margin: 75 },
]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function MarkupClient({
  defaultCost,
  defaultMarkup,
}: {
  defaultCost?: number
  defaultMarkup?: number
} = {}) {
  const [cost, setCost] = useState(defaultCost?.toString() || '50')
  const [markup, setMarkup] = useState(defaultMarkup?.toString() || '40')

  const result = useMemo(() => {
    const c = parseFloat(cost)
    const m = parseFloat(markup)
    if (isNaN(c) || isNaN(m) || c < 0 || m < 0) return null

    const sellingPrice = c * (1 + m / 100)
    const profit = sellingPrice - c
    const marginPercent = c > 0 ? (profit / sellingPrice) * 100 : 0

    return { sellingPrice, profit, marginPercent }
  }, [cost, markup])

  return (
    <ToolShell name="Markup Calculator" icon="🔢" currentPath="/markup-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🔢</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Markup Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Markup <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate selling price, profit, and margin from your cost and markup percentage.</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
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

              {/* Markup input */}
              <div>
                <label style={labelStyle}>Markup (%)</label>
                <input
                  type="number"
                  value={markup}
                  onChange={e => setMarkup(e.target.value)}
                  placeholder="Enter markup %"
                  style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {/* Selling price */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Selling Price</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(result.sellingPrice)}
                </div>
              </div>

              {/* Profit */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Profit</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>
                  ${fmt(result.profit)}
                </div>
              </div>

              {/* Margin equivalent */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Margin Equivalent</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                  {fmt(result.marginPercent)}%
                </div>
              </div>
            </div>

            {/* Visual formula */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F5F3EE', border: '1px solid #E8E4DB' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>Cost</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>${fmt(parseFloat(cost) || 0)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>+</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: accent + '10', border: `1px solid ${accent}30` }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>Markup ({markup}%)</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(result.profit)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>=</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>Selling Price</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>${fmt(result.sellingPrice)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reference table */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 14 }}>Markup vs Margin Quick Reference</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: fb }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: accent, fontWeight: 700, fontSize: 12 }}>Markup %</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: '#D97706', fontWeight: 700, fontSize: 12 }}>Margin %</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: '#6B6560', fontWeight: 700, fontSize: 12 }}>Example ($100 cost)</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAF8' : '#fff' }}>
                      <td style={{ padding: '10px 12px', fontFamily: fm, fontWeight: 600, color: accent }}>{row.markup}%</td>
                      <td style={{ padding: '10px 12px', fontFamily: fm, fontWeight: 600, color: '#D97706' }}>{row.margin.toFixed(2)}%</td>
                      <td style={{ padding: '10px 12px', color: '#6B6560' }}>
                        Sell at ${fmt(100 * (1 + row.markup / 100))}, profit ${fmt(100 * row.markup / 100)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Markup Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This markup calculator helps you determine the selling price, profit, and equivalent margin percentage from your cost and desired markup. Simply enter what you paid for an item and the markup percentage you want to apply, and the tool instantly calculates everything you need for pricing decisions.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Markup vs. Margin: What is the Difference?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Markup and margin are two different ways to express the same profit, and confusing them is one of the most common pricing mistakes. Markup is the percentage added to the cost to get the selling price, calculated as (profit / cost) x 100. Margin is the percentage of the selling price that is profit, calculated as (profit / selling price) x 100. For example, if you buy something for $50 and sell it for $70, your markup is 40 percent but your margin is only 28.57 percent. The markup is always a larger number than the margin for the same transaction.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Why Markup Matters for Pricing</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Setting the right markup is critical for business profitability. Too low and you will not cover your overhead costs; too high and you risk losing customers to competitors. Different industries have different standard markups. Grocery stores often work with markups of 10 to 30 percent, while clothing retailers may use 100 to 300 percent. The key is understanding your fixed costs, variable costs, and competitive landscape to choose a markup that keeps you profitable and competitive.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to calculate from the margin side? Try the <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>. Need to figure out your return on investment? Check the <a href="/roi-calculator" style={{ color: accent, textDecoration: 'underline' }}>ROI calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
