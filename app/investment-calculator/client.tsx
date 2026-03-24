'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#2563EB'

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

export default function InvestmentClient({
  defaultInitial,
  defaultMonthly,
  defaultRate,
  defaultYears,
}: {
  defaultInitial?: number
  defaultMonthly?: number
  defaultRate?: number
  defaultYears?: number
} = {}) {
  const [initial, setInitial] = useState(defaultInitial ?? 10000)
  const [monthly, setMonthly] = useState(defaultMonthly ?? 500)
  const [rate, setRate] = useState(defaultRate ?? 7)
  const [years, setYears] = useState(defaultYears ?? 20)
  const [compFreq, setCompFreq] = useState<'monthly' | 'quarterly' | 'annually'>('monthly')

  const freqMap = { monthly: 12, quarterly: 4, annually: 1 }

  const results = useMemo(() => {
    const n = freqMap[compFreq]
    const r = rate / 100
    const t = years

    // FV = P(1+r/n)^(nt) + PMT * [((1+r/n)^(nt) - 1) / (r/n)]
    // PMT must be adjusted: contributions are monthly, compounding may differ
    // We'll compute year-by-year for the chart, accumulating monthly contributions

    const schedule: { year: number; contributions: number; interest: number; balance: number }[] = []

    let balance = initial
    let totalContributions = initial

    for (let y = 1; y <= years; y++) {
      // Process 12 months in this year
      for (let m = 0; m < 12; m++) {
        // Add monthly contribution at start of month
        if (y > 1 || m > 0) {
          balance += monthly
          totalContributions += monthly
        }
        // Apply compounding based on frequency
        if (compFreq === 'monthly') {
          balance *= (1 + r / 12)
        } else if (compFreq === 'quarterly' && (m + 1) % 3 === 0) {
          balance *= (1 + r / 4)
        } else if (compFreq === 'annually' && m === 11) {
          balance *= (1 + r)
        }
      }

      schedule.push({
        year: y,
        contributions: totalContributions,
        interest: balance - totalContributions,
        balance,
      })
    }

    const finalBalance = balance
    const totalInterest = finalBalance - totalContributions
    const interestPct = finalBalance > 0 ? (totalInterest / finalBalance) * 100 : 0

    return { finalBalance, totalContributions, totalInterest, interestPct, schedule }
  }, [initial, monthly, rate, years, compFreq])

  const maxBalance = useMemo(() => {
    return Math.max(...results.schedule.map(s => s.balance), 1)
  }, [results.schedule])

  return (
    <ToolShell name="Investment Calculator" icon="📈" currentPath="/investment-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📈</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Investment Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Investment <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>See how your money grows with compound interest over time.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Initial Investment</label>
                <input
                  type="number" value={initial} min={0}
                  onChange={e => setInitial(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Monthly Contribution</label>
                <input
                  type="number" value={monthly} min={0}
                  onChange={e => setMonthly(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Annual Return Rate (%)</label>
                <input
                  type="number" value={rate} min={0} step={0.1}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Compound Frequency</label>
                <select value={compFreq} onChange={e => setCompFreq(e.target.value as 'monthly' | 'quarterly' | 'annually')} style={selectStyle}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={labelStyle}>Time Period: {years} years</label>
              <input
                type="range" min={1} max={40} value={years}
                onChange={e => setYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: accent }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9A958A' }}>
                <span>1 yr</span><span>10</span><span>20</span><span>30</span><span>40 yrs</span>
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
              <div style={labelStyle}>Final Balance</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>
                {fmt(results.finalBalance)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Total Contributions</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalContributions)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Total Interest Earned</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalInterest)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={labelStyle}>Interest as % of Final Balance</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.interestPct.toFixed(1)}%
              </div>
              <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: '#E8E4DB', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(results.interestPct, 100)}%`, background: accent, borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Growth Chart */}
        {results.schedule.length > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Year-by-Year Growth</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>Contributions vs interest earned over time</p>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
                  <span style={{ color: '#6B6560' }}>Contributions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent + '40' }} />
                  <span style={{ color: '#6B6560' }}>Interest</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {results.schedule.map(s => {
                  const contribPct = (s.contributions / maxBalance) * 100
                  const interestPct = (s.interest / maxBalance) * 100
                  return (
                    <div key={s.year} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, fontSize: 11, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        Y{s.year}
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', background: '#F5F3EE' }}>
                        <div style={{ width: `${contribPct}%`, background: accent, transition: 'width .3s', minWidth: s.contributions > 0 ? 1 : 0 }} />
                        <div style={{ width: `${interestPct}%`, background: accent + '40', transition: 'width .3s', minWidth: s.interest > 0 ? 1 : 0 }} />
                      </div>
                      <div style={{ width: 90, fontSize: 10, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        {fmt(s.balance)}
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free compound interest and investment calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free compound interest and investment calculator. See how your money grows over time with regular contributions. Plan your retirement, savings goals, and investment strategy.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
