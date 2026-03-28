'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#0891B2'

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
  defaultIncome,
  defaultHours,
  defaultVacation,
}: {
  defaultIncome?: number
  defaultHours?: number
  defaultVacation?: number
} = {}) {
  const [income, setIncome] = useState(defaultIncome ?? 60000)
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHours ?? 40)
  const [vacationWeeks, setVacationWeeks] = useState(defaultVacation ?? 4)
  const [billablePct, setBillablePct] = useState(75)
  const [monthlyExpenses, setMonthlyExpenses] = useState(500)
  const [taxRate, setTaxRate] = useState(25)

  const results = useMemo(() => {
    const workingWeeks = 52 - vacationWeeks
    const totalWorkHours = workingWeeks * hoursPerWeek
    const billableHours = totalWorkHours * (billablePct / 100)
    const annualExpenses = monthlyExpenses * 12
    const requiredGrossRevenue = (income + annualExpenses) / (1 - taxRate / 100)
    const hourlyRate = billableHours > 0 ? requiredGrossRevenue / billableHours : 0
    const dailyRate = hourlyRate * 8
    const monthlyRate = dailyRate * 22
    const taxAmount = requiredGrossRevenue * (taxRate / 100)

    return {
      workingWeeks,
      totalWorkHours,
      billableHours,
      requiredGrossRevenue,
      hourlyRate,
      dailyRate,
      monthlyRate,
      annualExpenses,
      taxAmount,
    }
  }, [income, hoursPerWeek, vacationWeeks, billablePct, monthlyExpenses, taxRate])

  return (
    <ToolShell name="Hourly Rate Calculator" icon="⏰" currentPath="/hourly-rate-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⏰</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Hourly Rate Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Hourly Rate <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate the perfect freelance rate to hit your income goals.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Desired Annual Income ($)</label>
                <input
                  type="number"
                  value={income}
                  min={0}
                  step={1000}
                  onChange={e => setIncome(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Work Hours per Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  min={1}
                  max={80}
                  onChange={e => setHoursPerWeek(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Vacation Weeks per Year</label>
                <input
                  type="number"
                  value={vacationWeeks}
                  min={0}
                  max={51}
                  onChange={e => setVacationWeeks(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Billable Percentage (%)</label>
                <input
                  type="number"
                  value={billablePct}
                  min={1}
                  max={100}
                  onChange={e => setBillablePct(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Monthly Expenses ($)</label>
                <input
                  type="number"
                  value={monthlyExpenses}
                  min={0}
                  step={100}
                  onChange={e => setMonthlyExpenses(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  min={0}
                  max={60}
                  onChange={e => setTaxRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16,
              padding: 22,
              textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>Your Hourly Rate</div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.hourlyRate)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Daily Rate (8h)</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.dailyRate)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Monthly Rate</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.monthlyRate)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Gross Revenue</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.requiredGrossRevenue)}
              </div>
            </div>
          </div>
        </section>

        {/* Hours breakdown */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Working Weeks</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.workingWeeks}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Total Work Hours</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.totalWorkHours.toLocaleString()}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>Billable Hours</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                {results.billableHours.toLocaleString()}
              </div>
            </div>
          </div>
        </section>

        {/* Visual breakdown card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Revenue Breakdown</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
              How your required gross revenue of ${fmt(results.requiredGrossRevenue)} breaks down
            </p>

            {/* Stacked bar */}
            {(() => {
              const total = results.requiredGrossRevenue || 1
              const incomePct = (income / total) * 100
              const expensesPct = (results.annualExpenses / total) * 100
              const taxPct = (results.taxAmount / total) * 100
              return (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                    <div style={{ width: `${incomePct}%`, background: accent, transition: 'width .3s' }} />
                    <div style={{ width: `${expensesPct}%`, background: '#F59E0B', transition: 'width .3s' }} />
                    <div style={{ width: `${taxPct}%`, background: '#EF4444', transition: 'width .3s' }} />
                  </div>
                </div>
              )
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: accent, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>Take-Home Income</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(income)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#F59E0B', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>Annual Expenses</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(results.annualExpenses)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#EF4444', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>Taxes</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(results.taxAmount)}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
              <strong>Formula:</strong> ($<span style={{ fontFamily: fm }}>{fmt(income)}</span> income + $<span style={{ fontFamily: fm }}>{fmt(results.annualExpenses)}</span> expenses) / (1 - <span style={{ fontFamily: fm }}>{taxRate}%</span> tax) = $<span style={{ fontFamily: fm }}>{fmt(results.requiredGrossRevenue)}</span> gross revenue / <span style={{ fontFamily: fm }}>{results.billableHours.toLocaleString()}</span> billable hours = <strong style={{ color: accent }}>${fmt(results.hourlyRate)}/hr</strong>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free freelancer hourly rate calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Setting the right freelance hourly rate is one of the most important decisions you will make as a self-employed professional. Charge too little and you will struggle to cover your expenses and taxes. Charge too much and you may lose clients. This calculator takes the guesswork out of pricing by working backward from your desired take-home income. Enter what you want to earn, your expected expenses, your tax rate, and how many hours you can realistically bill, and the tool instantly computes the minimum hourly rate you need to charge.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding billable hours</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Not every hour you work is billable. Administrative tasks, marketing, invoicing, networking, and professional development all eat into your week. Most freelancers find that only 60 to 80 percent of their working hours are actually billable. The billable percentage slider lets you model this accurately so your rate reflects reality, not wishful thinking. Vacation weeks are also subtracted from the year to give you a true picture of available working time.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>How to price your services</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Your hourly rate is a starting point. Many freelancers convert it into project-based pricing, day rates, or monthly retainers. The daily and monthly rate outputs make this easy. Remember to revisit your rate annually as expenses, tax brackets, and your skill level change. Use the revenue breakdown chart to see exactly where your money goes and identify opportunities to keep more of what you earn.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to create professional invoices? Try our <a href="/invoice-generator" style={{ color: accent, textDecoration: 'underline' }}>invoice generator</a>. Want to understand your salary breakdown? Use the <a href="/salary-calculator" style={{ color: accent, textDecoration: 'underline' }}>salary calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
