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

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Client({
  defaultFixed,
  defaultVariable,
  defaultPrice,
}: {
  defaultFixed?: number
  defaultVariable?: number
  defaultPrice?: number
} = {}) {
  const [fixedCosts, setFixedCosts] = useState(defaultFixed ?? 5000)
  const [variableCost, setVariableCost] = useState(defaultVariable ?? 15)
  const [sellingPrice, setSellingPrice] = useState(defaultPrice ?? 40)

  const results = useMemo(() => {
    const contributionMargin = sellingPrice - variableCost
    const contributionMarginRatio = sellingPrice > 0 ? contributionMargin / sellingPrice : 0
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0
    const breakEvenRevenue = breakEvenUnits * sellingPrice
    const isValid = contributionMargin > 0

    return {
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      isValid,
    }
  }, [fixedCosts, variableCost, sellingPrice])

  // Chart data points
  const chartData = useMemo(() => {
    if (!results.isValid) return null
    const maxUnits = Math.max(results.breakEvenUnits * 2, 10)
    const steps = 6
    const points: { units: number; revenue: number; totalCost: number }[] = []
    for (let i = 0; i <= steps; i++) {
      const units = Math.round((maxUnits / steps) * i)
      points.push({
        units,
        revenue: units * sellingPrice,
        totalCost: fixedCosts + units * variableCost,
      })
    }
    return { points, maxUnits, maxValue: Math.max(points[steps].revenue, points[steps].totalCost) }
  }, [results, fixedCosts, variableCost, sellingPrice])

  return (
    <ToolShell name="Break Even Calculator" icon="⚖️" currentPath="/break-even-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Break Even Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Break Even <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Find out exactly when your business starts making a profit.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Fixed Costs / Month ($)</label>
                <input
                  type="number"
                  value={fixedCosts}
                  min={0}
                  step={100}
                  onChange={e => setFixedCosts(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Variable Cost / Unit ($)</label>
                <input
                  type="number"
                  value={variableCost}
                  min={0}
                  step={0.5}
                  onChange={e => setVariableCost(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Selling Price / Unit ($)</label>
                <input
                  type="number"
                  value={sellingPrice}
                  min={0}
                  step={0.5}
                  onChange={e => setSellingPrice(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {!results.isValid && sellingPrice <= variableCost && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#FEF2F2', borderRadius: 10, fontSize: 13, color: '#DC2626' }}>
                Selling price must be greater than variable cost to break even.
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results.isValid && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16,
                padding: 22,
                textAlign: 'center',
              }}>
                <div style={labelStyle}>Break Even Units</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {results.breakEvenUnits.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16,
                padding: 22,
                textAlign: 'center',
              }}>
                <div style={labelStyle}>Break Even Revenue</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(results.breakEvenRevenue)}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Contribution Margin / Unit</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  ${fmt(results.contributionMargin)}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Contribution Margin Ratio</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {(results.contributionMarginRatio * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Visual chart */}
        {results.isValid && chartData && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Cost vs Revenue Chart</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
                Lines cross at the break even point ({results.breakEvenUnits.toLocaleString()} units)
              </p>

              {/* CSS chart */}
              <div style={{ position: 'relative', height: 240, borderLeft: '2px solid #E8E4DB', borderBottom: '2px solid #E8E4DB', marginBottom: 16 }}>
                {/* Y-axis label */}
                <div style={{ position: 'absolute', top: -8, left: -4, fontSize: 10, color: '#9A958A' }}>$</div>

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map(frac => (
                  <div key={frac} style={{
                    position: 'absolute',
                    bottom: `${frac * 100}%`,
                    left: 0,
                    right: 0,
                    borderTop: '1px dashed #F0EDE6',
                  }}>
                    <span style={{ position: 'absolute', left: -4, top: -8, fontSize: 9, color: '#B0AAA0', transform: 'translateX(-100%)', whiteSpace: 'nowrap' }}>
                      ${Math.round(chartData.maxValue * frac).toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Data points and lines - Revenue (green) */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="0.8"
                    points={chartData.points.map(p => {
                      const x = (p.units / chartData.maxUnits) * 100
                      const y = 100 - (p.revenue / chartData.maxValue) * 100
                      return `${x},${y}`
                    }).join(' ')}
                  />
                  <polyline
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="0.8"
                    points={chartData.points.map(p => {
                      const x = (p.units / chartData.maxUnits) * 100
                      const y = 100 - (p.totalCost / chartData.maxValue) * 100
                      return `${x},${y}`
                    }).join(' ')}
                  />
                  {/* Break even point marker */}
                  {(() => {
                    const beX = (results.breakEvenUnits / chartData.maxUnits) * 100
                    const beY = 100 - (results.breakEvenRevenue / chartData.maxValue) * 100
                    return (
                      <circle cx={beX} cy={beY} r="1.5" fill={accent} stroke="#fff" strokeWidth="0.5" />
                    )
                  })()}
                </svg>

                {/* Break even vertical line */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${(results.breakEvenUnits / chartData.maxUnits) * 100}%`,
                  height: '100%',
                  borderLeft: `1.5px dashed ${accent}`,
                  opacity: 0.6,
                }}>
                  <span style={{
                    position: 'absolute',
                    top: -16,
                    left: 4,
                    fontSize: 9,
                    color: accent,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>
                    BE: {results.breakEvenUnits}
                  </span>
                </div>

                {/* X-axis labels */}
                {chartData.points.filter((_, i) => i % 2 === 0).map(p => (
                  <div key={p.units} style={{
                    position: 'absolute',
                    bottom: -18,
                    left: `${(p.units / chartData.maxUnits) * 100}%`,
                    transform: 'translateX(-50%)',
                    fontSize: 9,
                    color: '#B0AAA0',
                  }}>
                    {p.units}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 3, borderRadius: 2, background: '#10B981' }} />
                  <span style={{ color: '#6B6560' }}>Revenue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 3, borderRadius: 2, background: '#EF4444' }} />
                  <span style={{ color: '#6B6560' }}>Total Cost</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
                  <span style={{ color: '#6B6560' }}>Break Even</span>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
                <strong>Formula:</strong> Break Even Units = Fixed Costs / (Selling Price - Variable Cost) = $<span style={{ fontFamily: fm }}>{fmt(fixedCosts)}</span> / $<span style={{ fontFamily: fm }}>{fmt(results.contributionMargin)}</span> = <strong style={{ color: accent }}>{results.breakEvenUnits} units</strong>
              </div>
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free break even analysis calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Every business needs to know its break even point, the exact moment when revenue equals costs and you stop losing money. This break even calculator makes it simple. Enter your monthly fixed costs such as rent, salaries, insurance, and software subscriptions. Add the variable cost you pay for each unit you sell, like materials, packaging, and shipping. Then set your selling price. The calculator instantly shows how many units you must sell and how much revenue you need to cover all your costs.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding contribution margin</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The contribution margin is the difference between your selling price and your variable cost per unit. It tells you how much each sale contributes toward covering your fixed costs. A higher contribution margin means you reach profitability faster. The contribution margin ratio, expressed as a percentage, shows what fraction of every revenue dollar goes toward covering fixed costs and generating profit. Use these numbers to evaluate pricing strategies and compare products.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>When does your business profit?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The visual chart above shows exactly where your revenue line crosses your total cost line. Every unit sold beyond the break even point is pure profit, less variable costs. Use this tool when launching a new product, adjusting prices, planning a promotion, or evaluating whether to take on additional fixed costs like hiring or renting a larger space. Adjust the inputs and watch the break even point shift in real time.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to understand your profit margins? Try our <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>. Need to figure out the right markup? Use the <a href="/markup-calculator" style={{ color: accent, textDecoration: 'underline' }}>markup calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
