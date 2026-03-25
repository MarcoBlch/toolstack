'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#D97706'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

type UnitSystem = 'metric' | 'imperial'
type Gender = 'male' | 'female'

interface CategoryInfo {
  label: string
  color: string
  range: string
}

function getCategory(bf: number, gender: Gender): CategoryInfo {
  if (gender === 'male') {
    if (bf <= 5) return { label: 'Essential Fat', color: '#3B82F6', range: '2–5%' }
    if (bf <= 13) return { label: 'Athlete', color: '#22C55E', range: '6–13%' }
    if (bf <= 17) return { label: 'Fitness', color: '#16A34A', range: '14–17%' }
    if (bf <= 24) return { label: 'Average', color: '#F97316', range: '18–24%' }
    return { label: 'Obese', color: '#EF4444', range: '25%+' }
  } else {
    if (bf <= 13) return { label: 'Essential Fat', color: '#3B82F6', range: '10–13%' }
    if (bf <= 20) return { label: 'Athlete', color: '#22C55E', range: '14–20%' }
    if (bf <= 24) return { label: 'Fitness', color: '#16A34A', range: '21–24%' }
    if (bf <= 31) return { label: 'Average', color: '#F97316', range: '25–31%' }
    return { label: 'Obese', color: '#EF4444', range: '32%+' }
  }
}

const maleSections = [
  { from: 2, to: 5, color: '#3B82F6', label: 'Essential' },
  { from: 5, to: 13, color: '#22C55E', label: 'Athlete' },
  { from: 13, to: 17, color: '#16A34A', label: 'Fitness' },
  { from: 17, to: 24, color: '#F97316', label: 'Average' },
  { from: 24, to: 45, color: '#EF4444', label: 'Obese' },
]

const femaleSections = [
  { from: 10, to: 13, color: '#3B82F6', label: 'Essential' },
  { from: 13, to: 20, color: '#22C55E', label: 'Athlete' },
  { from: 20, to: 24, color: '#16A34A', label: 'Fitness' },
  { from: 24, to: 31, color: '#F97316', label: 'Average' },
  { from: 31, to: 50, color: '#EF4444', label: 'Obese' },
]

export default function BodyFatClient({
  defaultGender,
  defaultWeight,
  defaultHeight,
  defaultWaist,
  defaultNeck,
}: {
  defaultGender?: string
  defaultWeight?: number
  defaultHeight?: number
  defaultWaist?: number
  defaultNeck?: number
} = {}) {
  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [unit, setUnit] = useState<UnitSystem>('metric')

  // Metric values
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 80)
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 175)
  const [waistCm, setWaistCm] = useState(defaultWaist ?? 85)
  const [neckCm, setNeckCm] = useState(defaultNeck ?? 38)
  const [hipCm, setHipCm] = useState(95)

  // Imperial values
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 176)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [waistIn, setWaistIn] = useState(defaultWaist ?? 33.5)
  const [neckIn, setNeckIn] = useState(defaultNeck ?? 15)
  const [hipIn, setHipIn] = useState(37.5)

  const results = useMemo(() => {
    let hCm: number
    let wCm: number
    let nCm: number
    let hiCm: number
    let wKg: number

    if (unit === 'metric') {
      hCm = heightCm
      wCm = waistCm
      nCm = neckCm
      hiCm = hipCm
      wKg = weightKg
    } else {
      hCm = (heightFt * 12 + heightIn) * 2.54
      wCm = waistIn * 2.54
      nCm = neckIn * 2.54
      hiCm = hipIn * 2.54
      wKg = weightLbs / 2.205
    }

    if (hCm <= 0 || wCm <= 0 || nCm <= 0 || wKg <= 0) return null
    if (gender === 'female' && hiCm <= 0) return null

    // US Navy formula (measurements in cm)
    let bf: number
    if (gender === 'male') {
      const diff = wCm - nCm
      if (diff <= 0) return null
      bf = 86.010 * Math.log10(diff) - 70.041 * Math.log10(hCm) + 36.76
    } else {
      const sum = wCm + hiCm - nCm
      if (sum <= 0) return null
      bf = 163.205 * Math.log10(sum) - 97.684 * Math.log10(hCm) - 78.387
    }

    if (bf < 0) bf = 0
    if (bf > 60) bf = 60

    const category = getCategory(bf, gender)
    const fatMassKg = (bf / 100) * wKg
    const leanMassKg = wKg - fatMassKg

    return { bf, category, fatMassKg, leanMassKg, wKg }
  }, [unit, gender, weightKg, weightLbs, heightCm, heightFt, heightIn, waistCm, waistIn, neckCm, neckIn, hipCm, hipIn])

  const sections = gender === 'male' ? maleSections : femaleSections
  const gaugeMin = sections[0].from
  const gaugeMax = sections[sections.length - 1].to

  const pointerPos = results
    ? Math.min(Math.max(((results.bf - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0), 100)
    : 0

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitBtn = (sys: UnitSystem): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === sys ? accent : 'transparent',
    color: unit === sys ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const boundaryValues = sections.map(s => s.from)
  boundaryValues.push(sections[sections.length - 1].to)
  const uniqueBoundaries = [...new Set(boundaryValues)]

  return (
    <ToolShell name="Body Fat Calculator" icon="📊" currentPath="/body-fat-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📊</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Body Fat Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Body Fat <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>US Navy method. Calculate body fat percentage, fat mass, and lean mass.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Gender toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Gender</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setGender('male')} style={genderBtn('male')}>Male</button>
                <button onClick={() => setGender('female')} style={genderBtn('female')}>Female</button>
              </div>
            </div>

            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Unit System</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('metric')} style={unitBtn('metric')}>Metric (cm / kg)</button>
                <button onClick={() => setUnit('imperial')} style={unitBtn('imperial')}>Imperial (in / lbs)</button>
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

              {/* Waist */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? 'Waist at navel (cm)' : 'Waist at navel (in)'}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? waistCm : waistIn}
                  min={1}
                  step={0.1}
                  onChange={e => unit === 'metric' ? setWaistCm(Number(e.target.value)) : setWaistIn(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Neck */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? 'Neck (cm)' : 'Neck (in)'}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? neckCm : neckIn}
                  min={1}
                  step={0.1}
                  onChange={e => unit === 'metric' ? setNeckCm(Number(e.target.value)) : setNeckIn(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Hip - only for females */}
              {gender === 'female' && (
                <div>
                  <label style={labelStyle}>{unit === 'metric' ? 'Hip (cm)' : 'Hip (in)'}</label>
                  <input
                    type="number"
                    value={unit === 'metric' ? hipCm : hipIn}
                    min={1}
                    step={0.1}
                    onChange={e => unit === 'metric' ? setHipCm(Number(e.target.value)) : setHipIn(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Body fat value */}
            <div style={{
              background: results.category.color + '0A',
              border: `1.5px solid ${results.category.color}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Your Body Fat</div>
              <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: results.category.color }}>
                {results.bf.toFixed(1)}%
              </div>
              <div style={{
                display: 'inline-block', marginTop: 6, padding: '4px 14px', borderRadius: 20,
                background: results.category.color + '18', color: results.category.color,
                fontSize: 14, fontWeight: 700,
              }}>
                {results.category.label} ({results.category.range})
              </div>
            </div>

            {/* Visual gauge bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Body Fat Scale</div>
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
                {/* BF value above pointer */}
                <div style={{
                  position: 'absolute', top: -24, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', fontSize: 11, fontFamily: fm,
                  fontWeight: 700, color: '#1C1B18', transition: 'left .3s',
                }}>
                  {results.bf.toFixed(1)}%
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
                  {uniqueBoundaries.map(v => (
                    <span key={v} style={{ fontSize: 9, fontFamily: fm, color: '#B0AAA0' }}>{v}%</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fat mass & Lean mass */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Fat Mass</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#F97316' }}>
                  {unit === 'metric'
                    ? `${results.fatMassKg.toFixed(1)} kg`
                    : `${(results.fatMassKg * 2.205).toFixed(1)} lbs`
                  }
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Lean Mass</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#22C55E' }}>
                  {unit === 'metric'
                    ? `${results.leanMassKg.toFixed(1)} kg`
                    : `${(results.leanMassKg * 2.205).toFixed(1)} lbs`
                  }
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              The US Navy method provides an estimate. Results may vary based on individual body composition. Consult a healthcare professional for personalized advice.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Body Fat Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free body fat calculator using the US Navy method. Calculate your body fat percentage, fat mass, and lean mass instantly.
            The US Navy body fat formula uses circumference measurements of your waist, neck, and height (plus hips for women) to estimate
            body fat percentage. This method is widely used by the military and fitness professionals as a reliable body composition assessment.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>How is body fat calculated?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            For men, the formula is: 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76.
            For women, it includes hip measurement: 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387.
            All measurements are in centimeters. The calculator also shows your fat mass and lean mass based on your total body weight.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Body fat categories</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Body fat ranges differ by gender. For men: Essential Fat (2–5%), Athlete (6–13%), Fitness (14–17%), Average (18–24%), and Obese (25%+).
            For women: Essential Fat (10–13%), Athlete (14–20%), Fitness (21–24%), Average (25–31%), and Obese (32%+).
            Maintaining a healthy body fat percentage supports cardiovascular health, energy levels, and overall fitness.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
