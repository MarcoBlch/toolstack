'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EC4899'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: "'Outfit', -apple-system, sans-serif", color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type Method = 'lmp' | 'conception' | 'ivf'

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toInputValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function DueDateClient({
  defaultMethod,
  defaultDate,
}: {
  defaultMethod?: string
  defaultDate?: string
} = {}) {
  const [method, setMethod] = useState<Method>((defaultMethod as Method) ?? 'lmp')
  const [dateValue, setDateValue] = useState<string>(defaultDate ?? '')
  const [cycleLength, setCycleLength] = useState<number>(28)

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const results = useMemo(() => {
    if (!dateValue) return null

    const inputDate = new Date(dateValue + 'T00:00:00')
    if (isNaN(inputDate.getTime())) return null

    let dueDate: Date
    let conceptionEstimate: Date | null = null
    let lmpEstimate: Date

    if (method === 'lmp') {
      const cycleDiff = cycleLength - 28
      dueDate = addDays(inputDate, 280 + cycleDiff)
      conceptionEstimate = addDays(inputDate, 14 + cycleDiff)
      lmpEstimate = inputDate
    } else if (method === 'conception') {
      dueDate = addDays(inputDate, 266)
      lmpEstimate = addDays(inputDate, -14)
    } else {
      // IVF: day 5 blastocyst, so 266 - 5 = 261 days from transfer
      dueDate = addDays(inputDate, 261)
      lmpEstimate = addDays(inputDate, -19) // 14 + 5 days before transfer
    }

    // Gestational age is counted from LMP estimate
    const gestDays = daysBetween(lmpEstimate, today)
    const gestWeeks = Math.floor(gestDays / 7)
    const gestRemDays = gestDays % 7
    const daysRemaining = daysBetween(today, dueDate)

    // Trimester
    let trimester: number
    let trimesterLabel: string
    let trimesterColor: string
    if (gestWeeks < 13) {
      trimester = 1
      trimesterLabel = '1st Trimester'
      trimesterColor = '#F59E0B'
    } else if (gestWeeks < 28) {
      trimester = 2
      trimesterLabel = '2nd Trimester'
      trimesterColor = '#10B981'
    } else {
      trimester = 3
      trimesterLabel = '3rd Trimester'
      trimesterColor = '#EC4899'
    }

    // Progress: 0-40 weeks = 0-100%
    const progress = Math.min(Math.max((gestDays / 280) * 100, 0), 100)

    // Milestones
    const milestones = [
      { label: 'End of 1st Trimester', week: 12, date: addDays(lmpEstimate, 12 * 7) },
      { label: 'Anatomy Scan', week: 20, date: addDays(lmpEstimate, 20 * 7) },
      { label: 'Viability', week: 24, date: addDays(lmpEstimate, 24 * 7) },
      { label: '3rd Trimester', week: 28, date: addDays(lmpEstimate, 28 * 7) },
      { label: 'Full Term', week: 37, date: addDays(lmpEstimate, 37 * 7) },
      { label: 'Due Date', week: 40, date: dueDate },
    ]

    return {
      dueDate,
      conceptionEstimate,
      gestWeeks,
      gestRemDays,
      gestDays,
      daysRemaining,
      trimester,
      trimesterLabel,
      trimesterColor,
      progress,
      milestones,
    }
  }, [dateValue, method, cycleLength, today])

  const methodLabels: Record<Method, string> = {
    lmp: 'Last Menstrual Period (LMP)',
    conception: 'Conception Date',
    ivf: 'IVF Transfer Date',
  }

  const dateLabel = method === 'lmp'
    ? 'First Day of Last Period'
    : method === 'conception'
      ? 'Conception Date'
      : 'IVF Transfer Date'

  return (
    <ToolShell name="Due Date Calculator" icon="\u{1F930}" currentPath="/due-date-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>{'\u{1F930}'}</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Due Date Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{'\u2190'} All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Due Date <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate your estimated due date, gestational age, and pregnancy milestones.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Method */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Calculation Method</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value as Method)}
                style={selectStyle}
              >
                <option value="lmp">{methodLabels.lmp}</option>
                <option value="conception">{methodLabels.conception}</option>
                <option value="ivf">{methodLabels.ivf}</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: method === 'lmp' ? '1fr 1fr' : '1fr', gap: 16 }}>
              {/* Date */}
              <div>
                <label style={labelStyle}>{dateLabel}</label>
                <input
                  type="date"
                  value={dateValue}
                  max={toInputValue(today)}
                  onChange={e => setDateValue(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Cycle length - only for LMP */}
              {method === 'lmp' && (
                <div>
                  <label style={labelStyle}>Cycle Length (days)</label>
                  <input
                    type="number"
                    value={cycleLength}
                    min={20}
                    max={45}
                    onChange={e => setCycleLength(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {results && results.gestDays >= 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Due date hero */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Estimated Due Date</div>
              <div style={{ fontSize: 32, fontFamily: fm, fontWeight: 700, color: accent, marginBottom: 4 }}>
                {formatDate(results.dueDate)}
              </div>
              <div style={{ fontSize: 13, color: '#6B6560' }}>
                {results.gestWeeks} weeks, {results.gestRemDays} day{results.gestRemDays !== 1 ? 's' : ''} pregnant
              </div>
            </div>

            {/* Days remaining + Trimester */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Days remaining */}
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Days Remaining</div>
                <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.max(results.daysRemaining, 0)}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A' }}>
                  {results.daysRemaining > 0 ? 'days to go' : 'any day now!'}
                </div>
              </div>

              {/* Trimester + conception */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', flex: 1 }}>
                  <div style={labelStyle}>Current Trimester</div>
                  <div style={{
                    display: 'inline-block', marginTop: 4, padding: '4px 14px', borderRadius: 20,
                    background: results.trimesterColor + '18', color: results.trimesterColor,
                    fontSize: 14, fontWeight: 700,
                  }}>
                    {results.trimesterLabel}
                  </div>
                </div>
                {results.conceptionEstimate && (
                  <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', flex: 1 }}>
                    <div style={labelStyle}>Est. Conception</div>
                    <div style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                      {formatShortDate(results.conceptionEstimate)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={labelStyle}>Pregnancy Progress</span>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: accent }}>
                  {results.progress.toFixed(1)}%
                </span>
              </div>
              {/* Bar background */}
              <div style={{ position: 'relative', height: 18, borderRadius: 9, overflow: 'hidden', background: '#F5F3EE' }}>
                {/* Trimester sections background */}
                <div style={{ display: 'flex', height: '100%', position: 'absolute', top: 0, left: 0, width: '100%' }}>
                  <div style={{ width: `${(13 / 40) * 100}%`, background: '#FEF3C720', borderRight: '1px solid #E8E4DB' }} />
                  <div style={{ width: `${(15 / 40) * 100}%`, background: '#D1FAE520', borderRight: '1px solid #E8E4DB' }} />
                  <div style={{ width: `${(12 / 40) * 100}%`, background: '#FCE7F320' }} />
                </div>
                {/* Filled bar */}
                <div style={{
                  width: `${results.progress}%`,
                  height: '100%',
                  borderRadius: 9,
                  background: `linear-gradient(90deg, #F59E0B, #10B981, ${accent})`,
                  transition: 'width 0.4s ease',
                  position: 'relative',
                  zIndex: 1,
                }} />
              </div>
              {/* Trimester labels */}
              <div style={{ display: 'flex', marginTop: 6 }}>
                <div style={{ width: `${(13 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>1st Tri</div>
                <div style={{ width: `${(15 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>2nd Tri</div>
                <div style={{ width: `${(12 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>3rd Tri</div>
              </div>
            </div>

            {/* Milestones timeline */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 16 }}>Key Milestones</div>
              <div style={{ position: 'relative', paddingLeft: 28 }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
                  background: '#E8E4DB',
                }} />
                {results.milestones.map((m, i) => {
                  const isPast = today >= m.date
                  const isCurrent = !isPast && (i === 0 || today >= results.milestones[i - 1].date)
                  return (
                    <div key={m.label} style={{
                      position: 'relative', marginBottom: i < results.milestones.length - 1 ? 20 : 0,
                    }}>
                      {/* Dot */}
                      <div style={{
                        position: 'absolute', left: -24, top: 2,
                        width: 14, height: 14, borderRadius: '50%',
                        background: isPast ? accent : isCurrent ? '#fff' : '#F5F3EE',
                        border: isPast ? `2px solid ${accent}` : isCurrent ? `2px solid ${accent}` : '2px solid #D5D0C8',
                        zIndex: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isPast && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                        )}
                        {isCurrent && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
                        )}
                      </div>
                      {/* Content */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <div style={{
                            fontSize: 14, fontWeight: 600,
                            color: isPast ? '#1C1B18' : isCurrent ? accent : '#9A958A',
                          }}>
                            {m.label}
                          </div>
                          <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>
                            Week {m.week}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 12, fontFamily: fm, color: isPast ? '#6B6560' : '#B0AAA0',
                          textDecoration: isPast ? 'none' : 'none',
                        }}>
                          {formatShortDate(m.date)}
                          {isPast && <span style={{ marginLeft: 6, color: '#10B981', fontSize: 10 }}>{'\u2713'}</span>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
              display: 'flex', alignItems: 'flex-start', gap: 8,
            }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{'\u26A0\uFE0F'}</span>
              <span>This calculator provides estimates only. Please consult your healthcare provider for accurate pregnancy dating.</span>
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Pregnancy Due Date Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Calculate your estimated due date using Naegele&#39;s rule. Enter the first day of your last menstrual period, conception date, or IVF transfer date to see when your baby is expected. This free due date calculator shows your gestational age in weeks and days, which trimester you are in, and key pregnancy milestones such as the end of the first trimester, anatomy scan, viability, and full term dates.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>How is the due date calculated?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            For the LMP method, the due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period, adjusted for cycle length. If your cycle is longer or shorter than 28 days, the calculator adjusts accordingly. For the conception date method, 266 days are added to the date of conception. For IVF transfers, the calculator assumes a day-5 blastocyst transfer and adds 261 days from the transfer date.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Understanding gestational age</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Gestational age counts from the first day of the last menstrual period, even though conception typically occurs about two weeks later. A full-term pregnancy is 37 to 42 weeks. The trimester progress bar shows your progress through each of the three trimesters and the milestones timeline helps track important dates throughout pregnancy.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
