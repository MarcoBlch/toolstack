'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#7C3AED'

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

export default function ROIClient({
  defaultInvestment,
  defaultFinal,
  defaultYears,
}: {
  defaultInvestment?: number
  defaultFinal?: number
  defaultYears?: number
} = {}) {
  const [investment, setInvestment] = useState(defaultInvestment?.toString() || '10000')
  const [finalValue, setFinalValue] = useState(defaultFinal?.toString() || '15000')
  const [timePeriod, setTimePeriod] = useState(defaultYears?.toString() || '')
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years')

  const result = useMemo(() => {
    const inv = parseFloat(investment)
    const fin = parseFloat(finalValue)
    if (isNaN(inv) || isNaN(fin) || inv <= 0) return null

    const netProfit = fin - inv
    const roi = (netProfit / inv) * 100

    let annualizedRoi: number | null = null
    const tp = parseFloat(timePeriod)
    if (!isNaN(tp) && tp > 0) {
      const years = timeUnit === 'months' ? tp / 12 : tp
      if (years > 0) {
        annualizedRoi = (Math.pow(1 + roi / 100, 1 / years) - 1) * 100
      }
    }

    return { netProfit, roi, annualizedRoi }
  }, [investment, finalValue, timePeriod, timeUnit])

  const inv = parseFloat(investment) || 0
  const fin = parseFloat(finalValue) || 0
  const maxVal = Math.max(inv, fin, 1)

  return (
    <ToolShell name="ROI Calculator" icon="💹" currentPath="/roi-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💹</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>ROI Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Return on <span style={{ color: accent }}>Investment</span> Calculator
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate ROI, net profit, and annualized returns for any investment.</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {/* Initial investment */}
              <div>
                <label style={labelStyle}>Initial Investment ($)</label>
                <input
                  type="number"
                  value={investment}
                  onChange={e => setInvestment(e.target.value)}
                  placeholder="10,000"
                  style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                />
              </div>

              {/* Final value */}
              <div>
                <label style={labelStyle}>Final Value ($)</label>
                <input
                  type="number"
                  value={finalValue}
                  onChange={e => setFinalValue(e.target.value)}
                  placeholder="15,000"
                  style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
                />
              </div>
            </div>

            {/* Time period (optional) */}
            <div>
              <label style={labelStyle}>Time Period (optional, for annualized ROI)</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={e => setTimePeriod(e.target.value)}
                  placeholder="e.g. 3"
                  style={{ ...inputStyle, width: 140, textAlign: 'center', fontFamily: fm, fontWeight: 600 }}
                />
                <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                  <button onClick={() => setTimeUnit('years')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none',
                    background: timeUnit === 'years' ? accent : '#F5F3EE',
                    color: timeUnit === 'years' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>Years</button>
                  <button onClick={() => setTimeUnit('months')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                    background: timeUnit === 'months' ? accent : '#F5F3EE',
                    color: timeUnit === 'months' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>Months</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: result.annualizedRoi !== null ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: 12 }}>
              {/* ROI */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>ROI</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: result.roi >= 0 ? accent : '#DC2626' }}>
                  {result.roi >= 0 ? '+' : ''}{fmt(result.roi)}%
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>total return</div>
              </div>

              {/* Net profit */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>Net Profit</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: result.netProfit >= 0 ? '#16A34A' : '#DC2626' }}>
                  {result.netProfit >= 0 ? '+' : ''}${fmt(result.netProfit)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>final - initial</div>
              </div>

              {/* Annualized ROI */}
              {result.annualizedRoi !== null && (
                <div style={{
                  background: '#fff',
                  borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
                }}>
                  <div style={labelStyle}>Annualized ROI</div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                    {result.annualizedRoi >= 0 ? '+' : ''}{fmt(result.annualizedRoi)}%
                  </div>
                  <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>per year</div>
                </div>
              )}
            </div>

            {/* Visual bar */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 24, marginTop: 16 }}>
              <div style={{ ...labelStyle, marginBottom: 14 }}>Investment vs Return</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Initial investment bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6B6560' }}>Initial Investment</span>
                    <span style={{ fontSize: 12, fontFamily: fm, fontWeight: 600, color: '#6B6560' }}>${fmt(inv)}</span>
                  </div>
                  <div style={{ height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: accent + '40',
                      width: `${Math.max((inv / maxVal) * 100, 2)}%`,
                      transition: 'width .3s',
                    }} />
                  </div>
                </div>
                {/* Final value bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6B6560' }}>Final Value</span>
                    <span style={{ fontSize: 12, fontFamily: fm, fontWeight: 600, color: fin >= inv ? '#16A34A' : '#DC2626' }}>${fmt(fin)}</span>
                  </div>
                  <div style={{ height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: fin >= inv ? '#16A34A' : '#DC2626',
                      width: `${Math.max((fin / maxVal) * 100, 2)}%`,
                      transition: 'width .3s',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free ROI Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This return on investment calculator helps you measure the profitability of any investment. Enter your initial investment amount and the final value to instantly see your total ROI as a percentage and net profit in dollars. Optionally add a time period to calculate annualized returns, which makes it easy to compare investments of different durations on a level playing field.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>ROI for Stocks and Securities</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            For stock market investments, ROI helps you evaluate how well your portfolio is performing. If you bought shares worth $10,000 and they are now worth $15,000, your ROI is 50 percent. But the annualized figure is what truly matters for comparison. A 50 percent return over one year is exceptional, while the same return over ten years is roughly 4.1 percent annually, which barely beats inflation. Always use annualized ROI when comparing investments held for different lengths of time.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>ROI for Real Estate</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Real estate investors use ROI to evaluate property purchases. When calculating real estate ROI, your initial investment should include the down payment, closing costs, and any renovation expenses. The final value should reflect the current market value or sale price. Remember to factor in ongoing costs like property taxes, insurance, and maintenance. A typical rental property ROI ranges from 8 to 12 percent annually when factoring in both appreciation and rental income.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>ROI for Business Decisions</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Businesses use ROI to evaluate marketing campaigns, equipment purchases, new hires, and expansion plans. A marketing campaign that costs $5,000 and generates $20,000 in revenue has a 300 percent ROI. However, smart decision-makers also consider opportunity cost, or what they could have earned by investing the same money elsewhere.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Planning for retirement? Try the <a href="/retirement-calculator" style={{ color: accent, textDecoration: 'underline' }}>retirement calculator</a>. Want to see compound growth? Use the <a href="/compound-interest-calculator" style={{ color: accent, textDecoration: 'underline' }}>compound interest calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
