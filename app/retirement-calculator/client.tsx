'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const ACCENT = '#7C3AED'

export default function RetirementClient({
  defaultAge,
  defaultRetAge,
  defaultSavings,
  defaultContribution,
}: {
  defaultAge?: number
  defaultRetAge?: number
  defaultSavings?: number
  defaultContribution?: number
} = {}) {
  const [currentAge, setCurrentAge] = useState(defaultAge ?? 30)
  const [retirementAge, setRetirementAge] = useState(defaultRetAge ?? 65)
  const [currentSavings, setCurrentSavings] = useState(defaultSavings ?? 20000)
  const [monthlyContribution, setMonthlyContribution] = useState(defaultContribution ?? 500)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [inflation, setInflation] = useState(2)
  const [desiredIncome, setDesiredIncome] = useState(3000)

  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge)
    const realReturn = (1 + annualReturn / 100) / (1 + inflation / 100) - 1
    const monthlyReal = realReturn / 12

    // Calculate total savings at retirement (future value with contributions)
    let totalSavings: number
    if (monthlyReal === 0) {
      totalSavings = currentSavings + monthlyContribution * yearsToRetirement * 12
    } else {
      // FV of existing savings
      const fvSavings = currentSavings * Math.pow(1 + monthlyReal, yearsToRetirement * 12)
      // FV of monthly contributions
      const fvContrib = monthlyContribution * ((Math.pow(1 + monthlyReal, yearsToRetirement * 12) - 1) / monthlyReal)
      totalSavings = fvSavings + fvContrib
    }

    // 4% rule: safe annual withdrawal = 4% of total, divided by 12
    const monthlyIncome = (totalSavings * 0.04) / 12

    // Gap analysis
    const gap = monthlyIncome - desiredIncome
    const hasGap = gap < 0

    // Years money will last (drawing desiredIncome/month with continued returns)
    let yearsLast: number
    const monthlyWithdrawal = desiredIncome
    if (monthlyWithdrawal <= 0) {
      yearsLast = 999
    } else if (monthlyReal <= 0) {
      yearsLast = totalSavings / (monthlyWithdrawal * 12)
    } else {
      // N = -ln(1 - B*r/W) / ln(1+r) where B=balance, r=monthly rate, W=monthly withdrawal
      const ratio = (totalSavings * monthlyReal) / monthlyWithdrawal
      if (ratio >= 1) {
        yearsLast = 999 // Money never runs out
      } else {
        const nMonths = -Math.log(1 - ratio) / Math.log(1 + monthlyReal)
        yearsLast = nMonths / 12
      }
    }

    // Additional monthly savings needed to reach desired income
    let additionalNeeded = 0
    if (hasGap) {
      // Target savings = (desiredIncome * 12) / 0.04
      const targetSavings = (desiredIncome * 12) / 0.04
      const shortfall = targetSavings - totalSavings
      if (shortfall > 0 && yearsToRetirement > 0) {
        if (monthlyReal === 0) {
          additionalNeeded = shortfall / (yearsToRetirement * 12)
        } else {
          // PMT = shortfall * r / ((1+r)^n - 1)
          additionalNeeded = shortfall * monthlyReal / (Math.pow(1 + monthlyReal, yearsToRetirement * 12) - 1)
        }
      }
    }

    // Growth snapshots every 5 years for chart
    const snapshots: { age: number; savings: number }[] = []
    let runBalance = currentSavings
    for (let y = 0; y <= yearsToRetirement; y++) {
      if (y % 5 === 0 || y === yearsToRetirement) {
        snapshots.push({ age: currentAge + y, savings: runBalance })
      }
      for (let m = 0; m < 12; m++) {
        runBalance = runBalance * (1 + monthlyReal) + monthlyContribution
      }
    }
    // Add final point if not already there
    if (snapshots.length > 0 && snapshots[snapshots.length - 1].age !== retirementAge) {
      snapshots.push({ age: retirementAge, savings: runBalance })
    }

    return {
      totalSavings,
      monthlyIncome,
      gap,
      hasGap,
      yearsLast,
      additionalNeeded,
      snapshots,
      yearsToRetirement,
    }
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflation, desiredIncome])

  const fmtMoney = (n: number) => {
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M'
    return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const fmtMoneyExact = (n: number) => {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '10px 12px',
    fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4,
  }

  const maxSavings = calc.snapshots.length > 0
    ? Math.max(...calc.snapshots.map(s => s.savings))
    : 1

  return (
    <ToolShell name="Retirement Calculator" icon="🏖️" currentPath="/retirement-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🏖️</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Retirement Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Main content */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>

          {/* Input card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Your Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Current Age</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={e => setCurrentAge(Number(e.target.value))}
                  style={inputStyle}
                  min={18}
                  max={80}
                />
              </div>
              <div>
                <label style={labelStyle}>Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={e => setRetirementAge(Number(e.target.value))}
                  style={inputStyle}
                  min={currentAge + 1}
                  max={100}
                />
              </div>
              <div>
                <label style={labelStyle}>Current Savings ($)</label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={e => setCurrentSavings(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>Monthly Contribution ($)</label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>Expected Annual Return (%)</label>
                <input
                  type="number"
                  value={annualReturn}
                  onChange={e => setAnnualReturn(Number(e.target.value))}
                  style={inputStyle}
                  step={0.5}
                  min={0}
                  max={30}
                />
              </div>
              <div>
                <label style={labelStyle}>Expected Inflation (%)</label>
                <input
                  type="number"
                  value={inflation}
                  onChange={e => setInflation(Number(e.target.value))}
                  style={inputStyle}
                  step={0.5}
                  min={0}
                  max={20}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Desired Monthly Income in Retirement ($)</label>
                <input
                  type="number"
                  value={desiredIncome}
                  onChange={e => setDesiredIncome(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Results card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Results</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#F5F3FF', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Total Savings at Retirement</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmtMoney(calc.totalSavings)}
                </div>
              </div>
              <div style={{ background: '#F5F3FF', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Monthly Income (4% Rule)</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmtMoneyExact(calc.monthlyIncome)}
                </div>
              </div>
              <div style={{
                background: calc.hasGap ? '#FEF2F2' : '#F0FDF4', borderRadius: 12, padding: 16, textAlign: 'center',
              }}>
                <div style={labelStyle}>
                  {calc.hasGap ? 'Monthly Shortfall' : 'Monthly Surplus'}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700, fontFamily: fm,
                  color: calc.hasGap ? '#DC2626' : '#16A34A',
                }}>
                  {calc.hasGap ? '-' : '+'}{fmtMoneyExact(Math.abs(calc.gap))}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Years Money Will Last</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {calc.yearsLast >= 999 ? '∞ (forever)' : calc.yearsLast.toFixed(1) + ' yrs'}
                </div>
              </div>
            </div>

            {/* Advice */}
            {calc.hasGap && (
              <div style={{
                background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 12, padding: 16,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#C2410C', marginBottom: 4 }}>
                  Savings Gap Alert
                </div>
                <div style={{ fontSize: 13, color: '#9A3412', lineHeight: 1.6 }}>
                  You need to save <strong style={{ fontFamily: fm }}>{fmtMoneyExact(calc.additionalNeeded)}</strong> more per month
                  (total <strong style={{ fontFamily: fm }}>{fmtMoneyExact(monthlyContribution + calc.additionalNeeded)}</strong>/month)
                  to reach your desired retirement income of {fmtMoneyExact(desiredIncome)}/month.
                </div>
              </div>
            )}

            {!calc.hasGap && (
              <div style={{
                background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: 16,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A', marginBottom: 4 }}>
                  On Track!
                </div>
                <div style={{ fontSize: 13, color: '#15803D', lineHeight: 1.6 }}>
                  At your current savings rate, you will exceed your desired monthly retirement income of {fmtMoneyExact(desiredIncome)} by {fmtMoneyExact(calc.gap)}/month.
                </div>
              </div>
            )}

            {/* Growth chart */}
            <div>
              <div style={{ ...labelStyle, marginBottom: 12 }}>Savings Growth Over Time</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 180, paddingBottom: 24, position: 'relative' }}>
                {calc.snapshots.map((snap, idx) => {
                  const pct = maxSavings > 0 ? (snap.savings / maxSavings) * 100 : 0
                  return (
                    <div key={idx} style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                      position: 'relative', height: '100%', justifyContent: 'flex-end',
                    }}>
                      <div style={{
                        fontSize: 9, fontWeight: 700, fontFamily: fm, color: ACCENT,
                        marginBottom: 4, whiteSpace: 'nowrap',
                      }}>
                        {fmtMoney(snap.savings)}
                      </div>
                      <div style={{
                        width: '100%', maxWidth: 48,
                        height: `${Math.max(pct, 2)}%`,
                        background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}88)`,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height .3s ease',
                      }} />
                      <div style={{
                        fontSize: 10, fontWeight: 600, color: '#9A958A', marginTop: 4,
                        position: 'absolute', bottom: 0,
                      }}>
                        {snap.age}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign: 'center', fontSize: 10, color: '#9A958A', marginTop: 4 }}>
                Age
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Summary</div>
            <div style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <span>Years until retirement:</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{calc.yearsToRetirement}</span>
                <span>Total months contributing:</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{calc.yearsToRetirement * 12}</span>
                <span>Total contributions:</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{fmtMoney(monthlyContribution * calc.yearsToRetirement * 12)}</span>
                <span>Investment growth:</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right', color: '#16A34A' }}>
                  {fmtMoney(calc.totalSavings - currentSavings - monthlyContribution * calc.yearsToRetirement * 12)}
                </span>
                <span>Real return rate (after inflation):</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>
                  {(((1 + annualReturn / 100) / (1 + inflation / 100) - 1) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free retirement calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free retirement calculator. Plan your retirement savings. See how much you need to save monthly to retire comfortably. Accounts for inflation and investment returns. Enter your current age, target retirement age, existing savings, and monthly contribution to see your projected retirement savings. Uses the 4% rule to estimate sustainable monthly income from your portfolio. Get a clear picture of any savings gap and exactly how much more you need to save each month to meet your goals. The growth chart shows your savings trajectory over time. All calculations are adjusted for inflation to give you real purchasing-power numbers. Everything runs in your browser — no data is sent anywhere. No signup required.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
