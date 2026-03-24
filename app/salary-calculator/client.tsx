'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#7C3AED'

const labelStyle = {
  fontSize: 11, fontWeight: 600 as const, color: '#9A958A',
  textTransform: 'uppercase' as const, letterSpacing: '.8px',
  display: 'block' as const, marginBottom: 4,
}
const inputStyle = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}
const selectStyle = {
  ...inputStyle, cursor: 'pointer',
  appearance: 'none' as const, WebkitAppearance: 'none' as const,
}

type TaxResult = { incomeTax: number; socialCharges: number; net: number }

function calcFrance(annual: number): TaxResult {
  const socialRate = 0.22
  const socialCharges = annual * socialRate
  const taxable = annual - socialCharges
  let tax = 0
  const brackets = [
    { limit: 11294, rate: 0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.30 },
    { limit: 177106, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ]
  let prev = 0
  for (const b of brackets) {
    if (taxable <= prev) break
    const slice = Math.min(taxable, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  return { incomeTax: tax, socialCharges, net: annual - socialCharges - tax }
}

function calcUSA(annual: number): TaxResult {
  const brackets = [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // FICA: Social Security 6.2% (up to 168600) + Medicare 1.45%
  const ss = Math.min(annual, 168600) * 0.062
  const medicare = annual * 0.0145
  const socialCharges = ss + medicare
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcUK(annual: number): TaxResult {
  const brackets = [
    { limit: 12570, rate: 0 },
    { limit: 50270, rate: 0.20 },
    { limit: 125140, rate: 0.40 },
    { limit: Infinity, rate: 0.45 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // NI: 13.25% on 12570-50270, 3.25% above 50270
  let ni = 0
  if (annual > 12570) {
    ni += Math.min(annual, 50270) - 12570
    ni *= 0.1325
    if (annual > 50270) {
      ni += (annual - 50270) * 0.0325
    }
  }
  return { incomeTax: tax, socialCharges: ni, net: annual - tax - ni }
}

function calcGermany(annual: number): TaxResult {
  let tax = 0
  if (annual <= 11604) {
    tax = 0
  } else if (annual <= 66760) {
    // Progressive from 14% to 42%
    const taxable = annual - 11604
    const range = 66760 - 11604
    const avgRate = 0.14 + (0.42 - 0.14) * (taxable / range) / 2
    tax = taxable * avgRate
  } else if (annual <= 277825) {
    // First zone
    const zone1 = 66760 - 11604
    const avgRate1 = 0.14 + (0.42 - 0.14) * 0.5
    tax = zone1 * avgRate1 + (annual - 66760) * 0.42
  } else {
    const zone1 = 66760 - 11604
    const avgRate1 = 0.14 + (0.42 - 0.14) * 0.5
    tax = zone1 * avgRate1 + (277825 - 66760) * 0.42 + (annual - 277825) * 0.45
  }
  // Social charges ~20% (pension, health, unemployment, nursing care) capped
  const socialCharges = annual * 0.20
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcSpain(annual: number): TaxResult {
  const brackets = [
    { limit: 12450, rate: 0.19 },
    { limit: 20200, rate: 0.24 },
    { limit: 35200, rate: 0.30 },
    { limit: 60000, rate: 0.37 },
    { limit: 300000, rate: 0.45 },
    { limit: Infinity, rate: 0.47 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // Social security ~6.35%
  const socialCharges = annual * 0.0635
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcFlat(annual: number, rate: number): TaxResult {
  const tax = annual * (rate / 100)
  return { incomeTax: tax, socialCharges: 0, net: annual - tax }
}

const COUNTRIES = [
  { id: 'france', name: 'France', flag: '🇫🇷' },
  { id: 'usa', name: 'USA', flag: '🇺🇸' },
  { id: 'uk', name: 'UK', flag: '🇬🇧' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪' },
  { id: 'spain', name: 'Spain', flag: '🇪🇸' },
  { id: 'flat', name: 'Simple flat rate', flag: '📊' },
]

const PERIODS = [
  { id: 'annual', name: 'Annual', divisor: 1 },
  { id: 'monthly', name: 'Monthly', divisor: 12 },
  { id: 'weekly', name: 'Weekly', divisor: 52 },
  { id: 'hourly', name: 'Hourly', divisor: 2080 },
]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SalaryClient({
  defaultSalary,
  defaultCountry,
  defaultPeriod,
}: {
  defaultSalary?: number
  defaultCountry?: string
  defaultPeriod?: string
} = {}) {
  const [salary, setSalary] = useState(defaultSalary?.toString() || '45000')
  const [country, setCountry] = useState(defaultCountry || 'france')
  const [period, setPeriod] = useState(defaultPeriod || 'annual')
  const [flatRate, setFlatRate] = useState('30')

  const result = useMemo(() => {
    const raw = parseFloat(salary)
    if (isNaN(raw) || raw < 0) return null
    const periodObj = PERIODS.find(p => p.id === period)!
    const annual = raw * periodObj.divisor

    let res: TaxResult
    switch (country) {
      case 'france': res = calcFrance(annual); break
      case 'usa': res = calcUSA(annual); break
      case 'uk': res = calcUK(annual); break
      case 'germany': res = calcGermany(annual); break
      case 'spain': res = calcSpain(annual); break
      case 'flat': res = calcFlat(annual, parseFloat(flatRate) || 0); break
      default: res = calcFrance(annual)
    }
    return { annual, ...res }
  }, [salary, country, period, flatRate])

  const totalDeductions = result ? result.incomeTax + result.socialCharges : 0
  const effectiveRate = result && result.annual > 0 ? (totalDeductions / result.annual) * 100 : 0
  const periodDivisor = PERIODS.find(p => p.id === period)?.divisor || 1

  return (
    <ToolShell name="Salary Calculator" icon="💰" currentPath="/salary-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💰</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Salary Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Gross to <span style={{ color: accent }}>Net</span> Salary
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>See your take-home pay after taxes and social charges.</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Gross salary */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Gross salary</label>
              <input
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder="Enter gross salary"
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center' as const, borderRadius: 12 }}
              />
            </div>

            {/* Period */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Period</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {PERIODS.map(p => (
                  <button key={p.id} onClick={() => setPeriod(p.id)} style={{
                    flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '9px 8px',
                    borderRadius: 10, cursor: 'pointer',
                    border: period === p.id ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                    background: period === p.id ? accent + '10' : '#fff',
                    color: period === p.id ? accent : '#6B6560',
                  }}>{p.name}</button>
                ))}
              </div>
            </div>

            {/* Country */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Country / tax system</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {COUNTRIES.map(c => (
                  <button key={c.id} onClick={() => setCountry(c.id)} style={{
                    fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '8px 14px',
                    borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                    border: country === c.id ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                    background: country === c.id ? accent + '10' : '#fff',
                    color: country === c.id ? accent : '#6B6560',
                  }}><span>{c.flag}</span> {c.name}</button>
                ))}
              </div>
            </div>

            {/* Flat rate custom field */}
            {country === 'flat' && (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Custom tax rate (%)</label>
                <input
                  type="number"
                  value={flatRate}
                  onChange={e => setFlatRate(e.target.value)}
                  placeholder="e.g. 30"
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {result && result.annual > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Main result cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>Net salary</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.net / periodDivisor)}</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>per {period === 'annual' ? 'year' : period === 'monthly' ? 'month' : period === 'weekly' ? 'week' : 'hour'}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>Total tax</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: '#E04848' }}>{fmt(totalDeductions / periodDivisor)}</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>deducted</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>Effective rate</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{effectiveRate.toFixed(1)}%</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>of gross</div>
              </div>
            </div>

            {/* Breakdown bar */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 20 }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>Breakdown</div>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                <div style={{ width: `${(result.net / result.annual) * 100}%`, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                  Net {((result.net / result.annual) * 100).toFixed(0)}%
                </div>
                {result.incomeTax > 0 && (
                  <div style={{ width: `${(result.incomeTax / result.annual) * 100}%`, background: '#E04848', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                    Tax {((result.incomeTax / result.annual) * 100).toFixed(0)}%
                  </div>
                )}
                {result.socialCharges > 0 && (
                  <div style={{ width: `${(result.socialCharges / result.annual) * 100}%`, background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                    Social {((result.socialCharges / result.annual) * 100).toFixed(0)}%
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: '#6B6560' }}>
                <span>Gross: {fmt(result.annual / periodDivisor)}</span>
                <span>Net: {fmt(result.net / periodDivisor)}</span>
              </div>
            </div>

            {/* Equivalents table */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 20 }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>Equivalents</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8E4DB' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>Period</th>
                    <th style={{ textAlign: 'right', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>Gross</th>
                    <th style={{ textAlign: 'right', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>Net</th>
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td style={{ padding: '10px 0', fontWeight: period === p.id ? 700 : 400, color: period === p.id ? accent : '#1C1B18' }}>{p.name}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: fm, fontWeight: 500 }}>{fmt(result.annual / p.divisor)}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.net / p.divisor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div style={{ background: '#FFFBEB', borderRadius: 10, border: '1px solid #F5E6B8', padding: '12px 16px', fontSize: 12, color: '#92722A', lineHeight: 1.6 }}>
              ⚠️ This is an estimate. Consult a tax professional for exact figures. Tax rules vary by situation (marital status, deductions, region, etc.).
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free salary calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free salary calculator. Convert gross to net salary. See your tax breakdown for France, USA, UK, Germany, Spain. Calculate monthly, weekly, and hourly equivalents.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
