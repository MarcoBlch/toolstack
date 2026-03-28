'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EF4444'

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

const modes = [
  { key: 'calculate', label: 'Calculate Discount' },
  { key: 'findOriginal', label: 'Find Original Price' },
  { key: 'findPercent', label: 'Find Discount %' },
] as const

type Mode = typeof modes[number]['key']

const quickDiscounts = [10, 15, 20, 25, 30, 40, 50, 70]

export default function Client({
  defaultMode,
  defaultOriginal,
  defaultDiscount,
  defaultFinal,
}: {
  defaultMode?: string
  defaultOriginal?: number
  defaultDiscount?: number
  defaultFinal?: number
} = {}) {
  const [mode, setMode] = useState<Mode>((defaultMode as Mode) ?? 'calculate')
  const [originalPrice, setOriginalPrice] = useState(defaultOriginal ?? 100)
  const [discountPct, setDiscountPct] = useState(defaultDiscount ?? 20)
  const [finalPrice, setFinalPrice] = useState(defaultFinal ?? 80)

  // Stack discounts
  const [firstDiscount, setFirstDiscount] = useState(20)
  const [secondDiscount, setSecondDiscount] = useState(10)

  const results = useMemo(() => {
    if (mode === 'calculate') {
      const saved = originalPrice * (discountPct / 100)
      const final_ = originalPrice - saved
      return { originalPrice, finalPrice: final_, saved, discountPct }
    }
    if (mode === 'findOriginal') {
      const original = discountPct < 100 ? finalPrice / (1 - discountPct / 100) : 0
      const saved = original - finalPrice
      return { originalPrice: original, finalPrice, saved, discountPct }
    }
    // findPercent
    const pct = originalPrice > 0 ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0
    const saved = originalPrice - finalPrice
    return { originalPrice, finalPrice, saved, discountPct: pct }
  }, [mode, originalPrice, discountPct, finalPrice])

  const stackResult = useMemo(() => {
    const afterFirst = 1 - firstDiscount / 100
    const afterSecond = afterFirst * (1 - secondDiscount / 100)
    const totalDiscount = (1 - afterSecond) * 100
    return { totalDiscount, multiplier: afterSecond }
  }, [firstDiscount, secondDiscount])

  return (
    <ToolShell name="Discount Calculator" icon="🏷️" currentPath="/discount-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏷️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Discount Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Discount <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate discounts, find original prices, and stack sale savings.</p>
        </section>

        {/* Mode tabs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {modes.map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: fb,
                  border: mode === m.key ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                  borderRadius: 10,
                  background: mode === m.key ? accent + '12' : '#fff',
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
              {/* Mode: Calculate Discount */}
              {mode === 'calculate' && (
                <>
                  <div>
                    <label style={labelStyle}>Original Price ($)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      min={0}
                      step={1}
                      onChange={e => setOriginalPrice(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Discount (%)</label>
                    <input
                      type="number"
                      value={discountPct}
                      min={0}
                      max={100}
                      onChange={e => setDiscountPct(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                </>
              )}

              {/* Mode: Find Original Price */}
              {mode === 'findOriginal' && (
                <>
                  <div>
                    <label style={labelStyle}>Final Price ($)</label>
                    <input
                      type="number"
                      value={finalPrice}
                      min={0}
                      step={1}
                      onChange={e => setFinalPrice(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Discount (%)</label>
                    <input
                      type="number"
                      value={discountPct}
                      min={0}
                      max={99.99}
                      step={1}
                      onChange={e => setDiscountPct(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                </>
              )}

              {/* Mode: Find Discount % */}
              {mode === 'findPercent' && (
                <>
                  <div>
                    <label style={labelStyle}>Original Price ($)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      min={0}
                      step={1}
                      onChange={e => setOriginalPrice(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Final Price ($)</label>
                    <input
                      type="number"
                      value={finalPrice}
                      min={0}
                      step={1}
                      onChange={e => setFinalPrice(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Quick discount buttons */}
            {(mode === 'calculate' || mode === 'findOriginal') && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Quick Discount</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {quickDiscounts.map(d => (
                    <button
                      key={d}
                      onClick={() => setDiscountPct(d)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: fb,
                        border: discountPct === d ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                        borderRadius: 8,
                        background: discountPct === d ? accent + '12' : '#F5F3EE',
                        color: discountPct === d ? accent : '#6B6560',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      {d}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          {/* Price tag visual */}
          <div style={{
            background: accent + '0A',
            border: `1.5px solid ${accent}25`,
            borderRadius: 16,
            padding: 28,
            textAlign: 'center',
            marginBottom: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={labelStyle}>Original</div>
                <div style={{
                  fontSize: 28,
                  fontFamily: fm,
                  fontWeight: 700,
                  color: '#9A958A',
                  textDecoration: 'line-through',
                  textDecorationColor: accent,
                }}>
                  ${fmt(results.originalPrice)}
                </div>
              </div>
              <div style={{ fontSize: 28, color: accent, fontWeight: 300 }}>→</div>
              <div>
                <div style={labelStyle}>Final Price</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(results.finalPrice)}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>You Save</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#10B981' }}>
                ${fmt(results.saved)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Discount</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                {results.discountPct.toFixed(1)}%
              </div>
            </div>
          </div>
        </section>

        {/* Stack Discounts */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Stack Discounts</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
              See the real total discount when two sales are stacked
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>First Discount (%)</label>
                <input
                  type="number"
                  value={firstDiscount}
                  min={0}
                  max={100}
                  onChange={e => setFirstDiscount(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div style={{ fontSize: 18, color: '#9A958A', fontWeight: 600, paddingBottom: 10 }}>+</div>
              <div>
                <label style={labelStyle}>Second Discount (%)</label>
                <input
                  type="number"
                  value={secondDiscount}
                  min={0}
                  max={100}
                  onChange={e => setSecondDiscount(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{
              background: accent + '08',
              border: `1.5px solid ${accent}20`,
              borderRadius: 14,
              padding: 20,
              textAlign: 'center',
            }}>
              <div style={labelStyle}>Real Total Discount</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>
                {stackResult.totalDiscount.toFixed(1)}%
              </div>
              <p style={{ fontSize: 12, color: '#6B6560', marginTop: 8 }}>
                Extra {secondDiscount}% off already {firstDiscount}% off = {stackResult.totalDiscount.toFixed(1)}% total (not {firstDiscount + secondDiscount}%)
              </p>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
              <strong>How it works:</strong> The first discount reduces the price to {(100 - firstDiscount)}% of original. The second discount then takes {secondDiscount}% off <em>that</em> reduced price. So you pay {(100 - firstDiscount)}% &times; {(100 - secondDiscount)}% = <strong style={{ color: accent }}>{(stackResult.multiplier * 100).toFixed(1)}%</strong> of the original, saving <strong style={{ color: accent }}>{stackResult.totalDiscount.toFixed(1)}%</strong> total.
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free discount calculator for every sale</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Whether you are shopping on Black Friday, browsing an end-of-season clearance, or comparing deals at different stores, this discount calculator shows you exactly what you will pay and how much you save. Choose from three modes depending on what you already know. If you have the original price and the discount percentage, use the default mode to see the final price. If you know the sale price and the discount but want to find the original tag price, switch to Find Original Price. And if you see both the original and sale price but want to know the exact percentage off, use Find Discount Percent. Quick-select pills for common discount amounts let you compare savings in a single click.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Stack discounts the smart way</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Many retailers offer stacked discounts: an extra 20 percent off already reduced items, for example. A common mistake is to simply add the two percentages together, but that overstates the real savings. When you take 20 percent off and then another 10 percent off, the true total discount is 28 percent, not 30 percent. The Stack Discounts section below the main calculator shows you the real combined discount so you know the actual deal you are getting. Use it to compare coupon combinations, loyalty discounts on top of sales, or any scenario where multiple discounts apply.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Sale price and savings at a glance</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The visual price tag at the top shows the original price with a strikethrough next to the final price so you can see the impact of the discount at a glance. This is useful when comparing items side by side or sharing a deal with friends. All calculations happen instantly in your browser with no server calls and no data stored. Bookmark this page for your next shopping trip.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to work with percentages more generally? Try our <a href="/percentage-calculator" style={{ color: accent, textDecoration: 'underline' }}>percentage calculator</a>. Running a business and want to know your margins? Use the <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
