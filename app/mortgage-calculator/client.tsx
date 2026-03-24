'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function MortgageClient({
  defaultAmount,
  defaultRate,
  defaultYears,
  defaultDown,
}: {
  defaultAmount?: number
  defaultRate?: number
  defaultYears?: number
  defaultDown?: number
} = {}) {
  const [amount, setAmount] = useState(defaultAmount ?? 250000)
  const [rate, setRate] = useState(defaultRate ?? 3.5)
  const [years, setYears] = useState(defaultYears ?? 25)
  const [down, setDown] = useState(defaultDown ?? 50000)

  const results = useMemo(() => {
    const principal = Math.max(amount - down, 0)
    const monthlyRate = rate / 12 / 100
    const totalMonths = years * 12

    if (principal <= 0) return { monthly: 0, totalInterest: 0, totalPaid: 0, ltv: 0, schedule: [] }

    let monthly: number
    if (monthlyRate === 0) {
      monthly = principal / totalMonths
    } else {
      monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    const totalPaid = monthly * totalMonths
    const totalInterest = totalPaid - principal
    const ltv = amount > 0 ? ((principal / amount) * 100) : 0

    // Yearly amortization schedule
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = []
    let balance = principal
    for (let y = 1; y <= years; y++) {
      let yearPrincipal = 0
      let yearInterest = 0
      for (let m = 0; m < 12; m++) {
        if (balance <= 0) break
        const intPayment = balance * monthlyRate
        const princPayment = Math.min(monthly - intPayment, balance)
        yearInterest += intPayment
        yearPrincipal += princPayment
        balance -= princPayment
      }
      schedule.push({ year: y, principalPaid: yearPrincipal, interestPaid: yearInterest, balance: Math.max(balance, 0) })
    }

    return { monthly, totalInterest, totalPaid, ltv, schedule }
  }, [amount, rate, years, down])

  const maxYearPayment = useMemo(() => {
    return Math.max(...results.schedule.map(s => s.principalPaid + s.interestPaid), 1)
  }, [results.schedule])

  return (
    <ToolShell name="Mortgage Calculator" icon="🏠" currentPath="/mortgage-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏠</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Mortgage Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Mortgage <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate your monthly payment, total interest, and amortization.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Loan Amount</label>
                <input
                  type="number" value={amount} min={0}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Down Payment</label>
                <input
                  type="number" value={down} min={0}
                  onChange={e => setDown(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Interest Rate (%)</label>
                <input
                  type="number" value={rate} min={0} step={0.1}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Loan Term (Years)</label>
                <select value={years} onChange={e => setYears(Number(e.target.value))} style={selectStyle}>
                  {[10, 15, 20, 25, 30].map(y => (
                    <option key={y} value={y}>{y} years</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A', border: `1.5px solid ${accent}25`, borderRadius: 16, padding: 22, textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>Monthly Payment</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>
                {fmt(results.monthly)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Total Interest</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalInterest)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Total Amount Paid</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalPaid)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={labelStyle}>Loan-to-Value Ratio</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.ltv.toFixed(1)}%
              </div>
              <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: '#E8E4DB', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(results.ltv, 100)}%`, background: accent, borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Amortization Chart */}
        {results.schedule.length > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Amortization Breakdown</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>Principal vs interest per year</p>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
                  <span style={{ color: '#6B6560' }}>Principal</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent + '40' }} />
                  <span style={{ color: '#6B6560' }}>Interest</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {results.schedule.map(s => {
                  const total = s.principalPaid + s.interestPaid
                  const principalPct = (s.principalPaid / maxYearPayment) * 100
                  const interestPct = (s.interestPaid / maxYearPayment) * 100
                  return (
                    <div key={s.year} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, fontSize: 11, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        Y{s.year}
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', background: '#F5F3EE' }}>
                        <div style={{ width: `${principalPct}%`, background: accent, transition: 'width .3s', minWidth: total > 0 ? 1 : 0 }} />
                        <div style={{ width: `${interestPct}%`, background: accent + '40', transition: 'width .3s', minWidth: total > 0 ? 1 : 0 }} />
                      </div>
                      <div style={{ width: 80, fontSize: 10, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        {fmt(total)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free mortgage calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free mortgage calculator. Calculate your monthly payment, total interest, and amortization schedule. Compare rates and loan terms. Works for any country and currency.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
