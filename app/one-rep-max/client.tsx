'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#1D4ED8'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

type WeightUnit = 'kg' | 'lbs'

const trainingPercentages = [
  { pct: 100, reps: '1' },
  { pct: 95, reps: '2' },
  { pct: 90, reps: '4' },
  { pct: 85, reps: '6' },
  { pct: 80, reps: '8' },
  { pct: 75, reps: '10' },
  { pct: 70, reps: '12' },
  { pct: 65, reps: '15' },
  { pct: 60, reps: '18' },
  { pct: 50, reps: '20+' },
]

export default function OneRepMaxClient({
  defaultWeight,
  defaultReps,
}: {
  defaultWeight?: number
  defaultReps?: number
} = {}) {
  const [weight, setWeight] = useState(defaultWeight ?? 100)
  const [reps, setReps] = useState(defaultReps ?? 5)
  const [unit, setUnit] = useState<WeightUnit>('kg')

  const results = useMemo(() => {
    if (weight <= 0 || reps < 1 || reps > 30) return null

    // If reps is 1, 1RM is the weight itself
    if (reps === 1) {
      return {
        epley: weight,
        brzycki: weight,
        lombardi: weight,
        oconner: weight,
        average: weight,
      }
    }

    const epley = weight * (1 + reps / 30)
    const brzycki = weight * (36 / (37 - reps))
    const lombardi = weight * Math.pow(reps, 0.10)
    const oconner = weight * (1 + reps * 0.025)
    const average = (epley + brzycki + lombardi + oconner) / 4

    return { epley, brzycki, lombardi, oconner, average }
  }, [weight, reps])

  const unitBtn = (u: WeightUnit): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === u ? accent : 'transparent',
    color: unit === u ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const fmt = (v: number) => {
    if (unit === 'lbs') {
      return `${(v * 2.20462).toFixed(1)} lbs`
    }
    return `${v.toFixed(1)} kg`
  }

  const formulas = results
    ? [
        { name: 'Epley', value: results.epley },
        { name: 'Brzycki', value: results.brzycki },
        { name: 'Lombardi', value: results.lombardi },
        { name: "O'Conner", value: results.oconner },
      ]
    : []

  return (
    <ToolShell name="1RM Calculator" icon="🏋️" currentPath="/one-rep-max">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏋️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>1RM Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            One Rep Max <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Estimate your 1RM using Epley, Brzycki, Lombardi, and O&apos;Conner formulas. Get training percentages instantly.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Unit</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3, maxWidth: 220 }}>
                <button onClick={() => setUnit('kg')} style={unitBtn('kg')}>kg</button>
                <button onClick={() => setUnit('lbs')} style={unitBtn('lbs')}>lbs</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Weight */}
              <div>
                <label style={labelStyle}>Weight Lifted ({unit})</label>
                <input
                  type="number"
                  value={weight}
                  min={1}
                  onChange={e => setWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Reps */}
              <div>
                <label style={labelStyle}>Reps Performed (1–30)</label>
                <input
                  type="number"
                  value={reps}
                  min={1}
                  max={30}
                  onChange={e => setReps(Math.min(30, Math.max(1, Number(e.target.value))))}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Estimated 1RM - prominent */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Estimated One Rep Max (Average)</div>
              <div style={{ fontSize: 52, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1, marginTop: 4 }}>
                {fmt(results.average)}
              </div>
              <div style={{ fontSize: 13, color: '#9A958A', marginTop: 8 }}>
                Based on {weight} {unit} × {reps} rep{reps > 1 ? 's' : ''}
              </div>
            </div>

            {/* Formula comparison table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>Formula Breakdown</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Formula</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Estimated 1RM</th>
                  </tr>
                </thead>
                <tbody>
                  {formulas.map(f => (
                    <tr key={f.name}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontWeight: 500 }}>{f.name}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{fmt(f.value)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: accent }}>Average</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(results.average)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Training percentage table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>Training Percentages</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>% of 1RM</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Weight</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Approx Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingPercentages.map(row => {
                    const trainingWeight = results.average * (row.pct / 100)
                    const barWidth = row.pct
                    return (
                      <tr key={row.pct}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontWeight: 600, width: '25%' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontFamily: fm, fontSize: 13 }}>{row.pct}%</span>
                            <div style={{
                              height: 6, borderRadius: 3,
                              background: accent,
                              opacity: 0.15 + (row.pct / 100) * 0.85,
                              width: `${barWidth}%`,
                              maxWidth: 60,
                              transition: 'width .3s',
                            }} />
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                          {fmt(trainingWeight)}
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', textAlign: 'right', color: '#6B6560' }}>
                          {row.reps}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 4, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              These are estimates based on mathematical formulas. Actual 1RM may vary depending on training experience, technique, fatigue, and individual factors. Always use a spotter when attempting heavy lifts.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free One Rep Max Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free 1RM calculator to estimate your one rep max from any weight and rep combination. Uses four proven formulas — Epley,
            Brzycki, Lombardi, and O&apos;Conner — then averages them for the most accurate estimate. Instantly see training percentages
            so you know exactly how much weight to load for any rep range.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>How is one rep max calculated?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The Epley formula calculates 1RM as weight × (1 + reps / 30). Brzycki uses weight × (36 / (37 − reps)).
            Lombardi computes weight × reps^0.10, and O&apos;Conner uses weight × (1 + reps × 0.025). Each formula has
            strengths at different rep ranges, so averaging all four gives the most reliable prediction. The calculator
            works for any barbell or dumbbell exercise including bench press, squat, deadlift, and overhead press.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Training with percentages</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Once you know your estimated 1RM, you can program your training using percentages. Heavy singles and doubles at 95–100%
            build maximal strength. Working sets at 80–85% for 6–8 reps develop hypertrophy and strength. Lighter loads at 60–70%
            for 12–18 reps build muscular endurance. The training percentage table updates automatically based on your estimated max.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Strength training goes hand in hand with tracking your body composition and nutrition. Use our <a href="/body-fat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>body fat calculator</a> to monitor changes in fat mass and lean mass as you progress. Pair your training with the <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie calculator</a> to make sure you are eating enough to support muscle growth and recovery.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
