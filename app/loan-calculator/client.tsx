'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const ACCENT = '#DC2626'

type AmortRow = {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function LoanClient({
  defaultAmount,
  defaultRate,
  defaultMonths,
}: {
  defaultAmount?: number
  defaultRate?: number
  defaultMonths?: number
} = {}) {
  const [amount, setAmount] = useState(defaultAmount ?? 15000)
  const [rate, setRate] = useState(defaultRate ?? 5.5)
  const [termValue, setTermValue] = useState(defaultMonths ? defaultMonths : 5)
  const [termUnit, setTermUnit] = useState<'years' | 'months'>(defaultMonths ? 'months' : 'years')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [showAll, setShowAll] = useState(false)

  const months = termUnit === 'years' ? termValue * 12 : termValue

  const calc = useMemo(() => {
    if (amount <= 0 || rate < 0 || months <= 0) {
      return { monthly: 0, totalInterest: 0, totalPaid: 0, payoffDate: '', schedule: [] as AmortRow[] }
    }

    const r = rate / 100 / 12
    let monthly: number

    if (r === 0) {
      monthly = amount / months
    } else {
      monthly = amount * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
    }

    const schedule: AmortRow[] = []
    let balance = amount

    for (let i = 1; i <= months; i++) {
      const interestPart = balance * r
      const principalPart = monthly - interestPart
      balance = Math.max(0, balance - principalPart)

      schedule.push({
        month: i,
        payment: monthly,
        principal: principalPart,
        interest: interestPart,
        balance,
      })
    }

    const totalPaid = monthly * months
    const totalInterest = totalPaid - amount

    const start = new Date(startDate)
    start.setMonth(start.getMonth() + months)
    const payoffDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return { monthly, totalInterest, totalPaid, payoffDate, schedule }
  }, [amount, rate, months, startDate])

  const fmt = (n: number) => {
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

  const visibleSchedule = showAll ? calc.schedule : calc.schedule.slice(0, 12)

  // Find max payment for bar chart scaling
  const maxPayment = calc.schedule.length > 0 ? calc.schedule[0].payment : 1

  return (
    <ToolShell name="Loan Calculator" icon="🏦" currentPath="/loan-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🏦</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Loan Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Main content */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>

          {/* Input card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Loan Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Loan Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                  step={0.1}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>Loan Term</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="number"
                    value={termValue}
                    onChange={e => setTermValue(Number(e.target.value))}
                    style={{ ...inputStyle, flex: 1 }}
                    min={1}
                  />
                  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                    <button
                      onClick={() => { if (termUnit === 'months') { setTermUnit('years'); setTermValue(Math.max(1, Math.round(termValue / 12))) } }}
                      style={{
                        padding: '8px 12px', fontSize: 12, fontWeight: 600, fontFamily: fb, cursor: 'pointer',
                        border: 'none', background: termUnit === 'years' ? ACCENT : '#F5F3EE',
                        color: termUnit === 'years' ? '#fff' : '#9A958A',
                      }}
                    >
                      Yrs
                    </button>
                    <button
                      onClick={() => { if (termUnit === 'years') { setTermUnit('months'); setTermValue(termValue * 12) } }}
                      style={{
                        padding: '8px 12px', fontSize: 12, fontWeight: 600, fontFamily: fb, cursor: 'pointer',
                        border: 'none', background: termUnit === 'months' ? ACCENT : '#F5F3EE',
                        color: termUnit === 'months' ? '#fff' : '#9A958A',
                      }}
                    >
                      Mo
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Results card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Results</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Monthly Payment</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmt(calc.monthly)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Total Interest</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {fmt(calc.totalInterest)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Total Amount Paid</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {fmt(calc.totalPaid)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>Payoff Date</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1B18' }}>
                  {calc.payoffDate}
                </div>
              </div>
            </div>

            {/* Principal vs Interest bar chart */}
            <div style={{ marginBottom: 8 }}>
              <div style={labelStyle}>Principal vs Interest</div>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                <div style={{
                  width: `${calc.totalPaid > 0 ? (amount / calc.totalPaid) * 100 : 50}%`,
                  background: ACCENT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: fm,
                  minWidth: 40,
                }}>
                  {fmt(amount)}
                </div>
                <div style={{
                  flex: 1,
                  background: '#FECACA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: ACCENT, fontSize: 11, fontWeight: 700, fontFamily: fm,
                  minWidth: 40,
                }}>
                  {fmt(calc.totalInterest)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: '#9A958A' }}>Principal</span>
                <span style={{ fontSize: 10, color: '#9A958A' }}>Interest</span>
              </div>
            </div>
          </div>

          {/* Amortization schedule */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Amortization Schedule</div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #E8E4DB' }}>
                    {['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} style={{
                        ...labelStyle, padding: '8px 10px', textAlign: h === 'Month' ? 'left' : 'right',
                        fontFamily: fb,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleSchedule.map((row, idx) => (
                    <tr key={row.month} style={{
                      borderBottom: idx < visibleSchedule.length - 1 ? '1px solid #F0EDE6' : 'none',
                    }}>
                      <td style={{ padding: '9px 10px', fontWeight: 600, fontFamily: fm, fontSize: 12 }}>
                        {row.month}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12 }}>
                        {fmt(row.payment)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, color: ACCENT }}>
                        {fmt(row.principal)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, color: '#9A958A' }}>
                        {fmt(row.interest)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, fontWeight: 600 }}>
                        {fmt(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {calc.schedule.length > 12 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                style={{
                  display: 'block', width: '100%', marginTop: 12, padding: '10px', fontSize: 13,
                  fontWeight: 600, fontFamily: fb, color: ACCENT, background: '#FEF2F2',
                  border: '1.5px solid #FECACA', borderRadius: 10, cursor: 'pointer',
                }}
              >
                Show all {calc.schedule.length} months
              </button>
            )}
            {showAll && calc.schedule.length > 12 && (
              <button
                onClick={() => setShowAll(false)}
                style={{
                  display: 'block', width: '100%', marginTop: 12, padding: '10px', fontSize: 13,
                  fontWeight: 600, fontFamily: fb, color: '#9A958A', background: '#F5F3EE',
                  border: '1.5px solid #E8E4DB', borderRadius: 10, cursor: 'pointer',
                }}
              >
                Show first 12 months
              </button>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free loan calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free loan calculator. Calculate monthly payments for personal loans, car loans, student loans. See full amortization schedule with principal and interest breakdown. Enter your loan amount, interest rate, and term to instantly see your monthly payment and total cost. Toggle between years and months for the loan term, and set a custom start date to see your exact payoff date. The amortization table shows how each payment is split between principal and interest, so you can understand exactly where your money goes. All calculations happen in your browser — no data is sent anywhere. No signup required.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
