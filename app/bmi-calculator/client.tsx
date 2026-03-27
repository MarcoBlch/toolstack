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

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type UnitSystem = 'metric' | 'imperial'
type Category = { label: string; color: string }

function getCategory(bmi: number): Category {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3B82F6' }
  if (bmi < 25) return { label: 'Normal', color: '#22C55E' }
  if (bmi < 30) return { label: 'Overweight', color: '#F97316' }
  return { label: 'Obese', color: '#EF4444' }
}

function healthyRange(heightM: number): { low: number; high: number } {
  return {
    low: Math.round(18.5 * heightM * heightM * 10) / 10,
    high: Math.round(24.9 * heightM * heightM * 10) / 10,
  }
}

export default function BMIClient({
  defaultWeight,
  defaultHeight,
  defaultUnit,
}: {
  defaultWeight?: number
  defaultHeight?: number
  defaultUnit?: string
} = {}) {
  const [unit, setUnit] = useState<UnitSystem>((defaultUnit as UnitSystem) ?? 'metric')
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 170)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')

  const results = useMemo(() => {
    let wKg: number
    let hM: number

    if (unit === 'metric') {
      wKg = weightKg
      hM = heightCm / 100
    } else {
      wKg = weightLbs / 2.205
      hM = (heightFt * 12 + heightIn) * 0.0254
    }

    if (wKg <= 0 || hM <= 0) return null

    const bmi = wKg / (hM * hM)
    const category = getCategory(bmi)
    const range = healthyRange(hM)

    return { bmi, category, range, heightM: hM }
  }, [unit, weightKg, weightLbs, heightCm, heightFt, heightIn])

  // Gauge constants
  const gaugeMin = 12
  const gaugeMax = 42
  const sections = [
    { from: 12, to: 18.5, color: '#3B82F6', label: 'Under' },
    { from: 18.5, to: 25, color: '#22C55E', label: 'Normal' },
    { from: 25, to: 30, color: '#F97316', label: 'Over' },
    { from: 30, to: 42, color: '#EF4444', label: 'Obese' },
  ]

  const pointerPos = results
    ? Math.min(Math.max(((results.bmi - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0), 100)
    : 0

  const toggleBtn = (sys: UnitSystem): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === sys ? accent : 'transparent',
    color: unit === sys ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  return (
    <ToolShell name="BMI Calculator" icon="⚖️" currentPath="/bmi-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>BMI Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            BMI <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate your Body Mass Index instantly. Metric and imperial.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Unit System</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('metric')} style={toggleBtn('metric')}>Metric</button>
                <button onClick={() => setUnit('imperial')} style={toggleBtn('imperial')}>Imperial</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Height */}
              {unit === 'metric' ? (
                <div>
                  <label style={labelStyle}>Height (cm)</label>
                  <input
                    type="number" value={heightCm} min={1}
                    onChange={e => setHeightCm(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>Height</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightFt} min={0}
                        onChange={e => setHeightFt(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="ft"
                      />
                      <span style={{ fontSize: 10, color: '#9A958A' }}>feet</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightIn} min={0} max={11}
                        onChange={e => setHeightIn(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="in"
                      />
                      <span style={{ fontSize: 10, color: '#9A958A' }}>inches</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? weightKg : weightLbs}
                  min={1}
                  onChange={e => unit === 'metric' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Age (optional) */}
              <div>
                <label style={labelStyle}>Age (optional)</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(e.target.value)}
                  style={inputStyle}
                  placeholder="e.g. 30"
                />
              </div>

              {/* Gender (optional) */}
              <div>
                <label style={labelStyle}>Gender (optional)</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={selectStyle}>
                  <option value="">— Select —</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* BMI value */}
            <div style={{
              background: results.category.color + '0A',
              border: `1.5px solid ${results.category.color}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Your BMI</div>
              <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: results.category.color }}>
                {results.bmi.toFixed(1)}
              </div>
              <div style={{
                display: 'inline-block', marginTop: 6, padding: '4px 14px', borderRadius: 20,
                background: results.category.color + '18', color: results.category.color,
                fontSize: 14, fontWeight: 700,
              }}>
                {results.category.label}
              </div>
            </div>

            {/* Visual gauge bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={labelStyle}>BMI Scale</div>
              <div style={{ position: 'relative', marginTop: 12, marginBottom: 24 }}>
                {/* Bar */}
                <div style={{ display: 'flex', height: 18, borderRadius: 9, overflow: 'hidden' }}>
                  {sections.map(s => (
                    <div key={s.label} style={{
                      flex: s.to - s.from,
                      background: s.color,
                      position: 'relative',
                    }} />
                  ))}
                </div>
                {/* Pointer */}
                <div style={{
                  position: 'absolute', top: -6, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', transition: 'left .3s',
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                    borderTop: '8px solid #1C1B18',
                  }} />
                </div>
                {/* BMI value above pointer */}
                <div style={{
                  position: 'absolute', top: -24, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', fontSize: 11, fontFamily: fm,
                  fontWeight: 700, color: '#1C1B18', transition: 'left .3s',
                }}>
                  {results.bmi.toFixed(1)}
                </div>
                {/* Labels */}
                <div style={{ display: 'flex', marginTop: 6 }}>
                  {sections.map(s => (
                    <div key={s.label} style={{
                      flex: s.to - s.from, fontSize: 10, color: '#9A958A', textAlign: 'center',
                    }}>
                      {s.label}
                    </div>
                  ))}
                </div>
                {/* Range numbers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {[12, 18.5, 25, 30, 42].map(v => (
                    <span key={v} style={{ fontSize: 9, fontFamily: fm, color: '#B0AAA0' }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Healthy range + info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Healthy Weight Range</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {unit === 'metric'
                    ? `${results.range.low} – ${results.range.high} kg`
                    : `${(results.range.low * 2.205).toFixed(1)} – ${(results.range.high * 2.205).toFixed(1)} lbs`
                  }
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Height</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {unit === 'metric'
                    ? `${heightCm} cm`
                    : `${heightFt}' ${heightIn}"`
                  }
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              BMI is a general indicator. Consult a healthcare professional for personalized advice.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free BMI calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Our BMI calculator determines your Body Mass Index by dividing your weight in kilograms by your height in meters squared. Switch between metric and imperial units depending on what you are comfortable with. The result is displayed on a color-coded gauge that shows exactly where you fall across four standard categories: underweight, normal weight, overweight, and obese.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding BMI categories</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            A BMI below 18.5 is considered underweight, 18.5 to 24.9 falls within the normal range, 25 to 29.9 is classified as overweight, and 30 or above indicates obesity. The calculator also shows your healthy weight range for your specific height, giving you a concrete target if you are working toward a healthier weight. These categories are defined by the World Health Organization.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>BMI limitations and next steps</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            While BMI is a useful screening tool, it does not distinguish between muscle and fat or account for factors like bone density, age, and gender. Athletes with high muscle mass may have an elevated BMI despite being healthy. For a more complete picture of your body composition, consider additional measurements and always consult a healthcare professional for personalized guidance.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Looking for more health metrics? Try our <a href="/ideal-weight" style={{ color: '#FF6B35', textDecoration: 'underline' }}>ideal weight calculator</a>, <a href="/body-fat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>body fat calculator</a>, or <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie calculator</a> for a broader view of your fitness.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
