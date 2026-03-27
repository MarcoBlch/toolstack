'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EA580C'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const tipPresets = [10, 15, 18, 20, 25]
const comparisonRates = [10, 15, 18, 20, 25]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function TipClient({
  defaultBill,
  defaultTip,
  defaultPeople,
}: {
  defaultBill?: number
  defaultTip?: number
  defaultPeople?: number
} = {}) {
  const [bill, setBill] = useState(defaultBill ?? 50)
  const [tip, setTip] = useState(defaultTip ?? 15)
  const [people, setPeople] = useState(defaultPeople ?? 1)
  const [roundUp, setRoundUp] = useState(false)

  const results = useMemo(() => {
    const tipAmount = bill * (tip / 100)
    let total = bill + tipAmount
    if (roundUp) total = Math.ceil(total)
    const actualTip = total - bill
    const perPerson = people > 0 ? total / people : total

    return { tipAmount: actualTip, total, perPerson }
  }, [bill, tip, people, roundUp])

  const comparison = useMemo(() => {
    return comparisonRates.map(rate => {
      const tipAmt = bill * (rate / 100)
      let total = bill + tipAmt
      const perP = people > 0 ? total / people : total
      return { rate, tipAmount: tipAmt, total, perPerson: perP }
    })
  }, [bill, people])

  return (
    <ToolShell name="Tip Calculator" icon="🍽️" currentPath="/tip-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🍽️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Tip Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Tip <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate tip and split the bill instantly.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Bill Amount ($)</label>
                <input
                  type="number"
                  value={bill}
                  min={0}
                  step={0.01}
                  onChange={e => setBill(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Tip Percentage: {tip}%</label>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={tip}
                  onChange={e => setTip(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, ${accent} ${(tip / 30) * 100}%, #E8E4DB ${(tip / 30) * 100}%)`,
                    outline: 'none',
                    cursor: 'pointer',
                    marginBottom: 12,
                  }}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tipPresets.map(p => (
                    <button
                      key={p}
                      onClick={() => setTip(p)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: fb,
                        border: tip === p ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                        borderRadius: 8,
                        background: tip === p ? accent + '12' : '#F5F3EE',
                        color: tip === p ? accent : '#6B6560',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Number of People</label>
                <input
                  type="number"
                  value={people}
                  min={1}
                  onChange={e => setPeople(Math.max(1, Number(e.target.value)))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Round Up Total</label>
                <button
                  onClick={() => setRoundUp(!roundUp)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: fb,
                    border: roundUp ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                    borderRadius: 8,
                    background: roundUp ? accent + '12' : '#F5F3EE',
                    color: roundUp ? accent : '#6B6560',
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {roundUp ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: people > 1 ? '1fr 1fr 1fr' : '1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16,
              padding: 22,
              textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>Total with Tip</div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.total)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Tip Amount</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.tipAmount)}
              </div>
            </div>

            {people > 1 && (
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Per Person</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(results.perPerson)}
                </div>
              </div>
            )}

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Bill Amount</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(bill)}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Quick Comparison</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
              Tip amounts at different percentages for a ${fmt(bill)} bill
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: fb }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>Tip %</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>Tip</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>Total</th>
                  {people > 1 && (
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>Per Person</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {comparison.map(row => {
                  const isActive = row.rate === tip
                  return (
                    <tr
                      key={row.rate}
                      onClick={() => setTip(row.rate)}
                      style={{
                        cursor: 'pointer',
                        background: isActive ? accent + '0A' : 'transparent',
                        transition: 'background .15s',
                      }}
                    >
                      <td style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        {row.rate}%
                        {isActive && <span style={{ marginLeft: 6, fontSize: 10, color: accent }}>selected</span>}
                      </td>
                      <td style={{
                        textAlign: 'right', padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        ${fmt(row.tipAmount)}
                      </td>
                      <td style={{
                        textAlign: 'right', padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        ${fmt(row.total)}
                      </td>
                      {people > 1 && (
                        <td style={{
                          textAlign: 'right', padding: '10px 12px',
                          borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? accent : '#1C1B18',
                        }}>
                          ${fmt(row.perPerson)}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free tip calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Our tip calculator takes the guesswork out of tipping at restaurants, bars, cafes, and for delivery or personal services. Enter your bill amount, select a tip percentage using the slider or quick presets, and see the tip amount and total instantly. If you are dining with friends, set the number of people to split the bill evenly so everyone knows exactly what they owe.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Tipping customs and quick comparison</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Tipping norms vary widely. In the United States, 18 to 20 percent is standard for table service, while 10 to 15 percent is common in many European countries. The comparison table shows your bill at five common tip percentages side by side, making it easy to pick the right amount without mental math. You can click any row to select that rate.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Splitting bills and rounding up</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The bill-splitting feature divides the total evenly among your group so nobody overpays or underpays. Enable the round-up option to bump the total to the next whole dollar, which simplifies cash payments and often results in a slightly more generous tip for your server. Both features work together seamlessly for any group size.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to understand the math behind percentages? Visit our <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>percentage calculator</a>. Traveling abroad and need to convert currencies? The <a href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>currency converter</a> has you covered.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
