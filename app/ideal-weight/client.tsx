'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#8B5CF6'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type Gender = 'male' | 'female'
type HeightUnit = 'cm' | 'ftin'
type FrameSize = 'small' | 'medium' | 'large'

interface FormulaResult {
  name: string
  kg: number
  lbs: number
}

export default function IdealWeightClient({
  defaultGender,
  defaultHeight,
}: {
  defaultGender?: string
  defaultHeight?: number
} = {}) {
  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 170)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm')
  const [frame, setFrame] = useState<FrameSize>('medium')

  const results = useMemo(() => {
    const hCm = heightUnit === 'cm' ? heightCm : (heightFt * 12 + heightIn) * 2.54
    if (hCm <= 0) return null

    const totalInches = hCm / 2.54
    const inchesOver60 = totalInches - 60
    const heightM = hCm / 100

    // Devine formula
    const devineKg = gender === 'male'
      ? 50 + 2.3 * inchesOver60
      : 45.5 + 2.3 * inchesOver60

    // Robinson formula
    const robinsonKg = gender === 'male'
      ? 52 + 1.9 * inchesOver60
      : 49 + 1.7 * inchesOver60

    // Miller formula
    const millerKg = gender === 'male'
      ? 56.2 + 1.41 * inchesOver60
      : 53.1 + 1.36 * inchesOver60

    // Hamwi formula
    const hamwiKg = gender === 'male'
      ? 48 + 2.7 * inchesOver60
      : 45.5 + 2.2 * inchesOver60

    // BMI-based healthy range
    const bmiLowKg = 18.5 * heightM * heightM
    const bmiHighKg = 24.9 * heightM * heightM

    const formulas: FormulaResult[] = [
      { name: 'Devine', kg: Math.round(devineKg * 10) / 10, lbs: Math.round(devineKg * 2.205 * 10) / 10 },
      { name: 'Robinson', kg: Math.round(robinsonKg * 10) / 10, lbs: Math.round(robinsonKg * 2.205 * 10) / 10 },
      { name: 'Miller', kg: Math.round(millerKg * 10) / 10, lbs: Math.round(millerKg * 2.205 * 10) / 10 },
      { name: 'Hamwi', kg: Math.round(hamwiKg * 10) / 10, lbs: Math.round(hamwiKg * 2.205 * 10) / 10 },
    ]

    const allKg = formulas.map(f => f.kg)
    const rangeMin = Math.min(...allKg)
    const rangeMax = Math.max(...allKg)

    return {
      formulas,
      rangeMin,
      rangeMax,
      rangeMinLbs: Math.round(rangeMin * 2.205 * 10) / 10,
      rangeMaxLbs: Math.round(rangeMax * 2.205 * 10) / 10,
      bmiLowKg: Math.round(bmiLowKg * 10) / 10,
      bmiHighKg: Math.round(bmiHighKg * 10) / 10,
      bmiLowLbs: Math.round(bmiLowKg * 2.205 * 10) / 10,
      bmiHighLbs: Math.round(bmiHighKg * 2.205 * 10) / 10,
      heightM,
    }
  }, [gender, heightCm, heightFt, heightIn, heightUnit])

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitToggle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '6px 0', border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: 11, fontWeight: 600, fontFamily: fb,
    background: active ? accent : 'transparent',
    color: active ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  // Visual bar helpers
  const barMin = results ? Math.min(results.rangeMin, results.bmiLowKg) - 5 : 40
  const barMax = results ? Math.max(results.rangeMax, results.bmiHighKg) + 5 : 90
  const toPercent = (kg: number) => Math.min(Math.max(((kg - barMin) / (barMax - barMin)) * 100, 0), 100)

  const dotColors: Record<string, string> = {
    Devine: '#3B82F6',
    Robinson: '#22C55E',
    Miller: '#F97316',
    Hamwi: '#EF4444',
  }

  return (
    <ToolShell name="Ideal Weight Calculator" icon="⚖️" currentPath="/ideal-weight">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Ideal Weight Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Ideal weight <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Find your ideal weight using Devine, Robinson, Miller &amp; Hamwi formulas.</p>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Height */}
              <div>
                <label style={labelStyle}>Height</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {heightUnit === 'cm' ? (
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightCm} min={1}
                        onChange={e => setHeightCm(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="e.g. 170"
                      />
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', gap: 6 }}>
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
                  )}
                  <div style={{ display: 'flex', gap: 2, background: '#F5F3EE', borderRadius: 8, padding: 2, minWidth: 80 }}>
                    <button onClick={() => setHeightUnit('cm')} style={unitToggle(heightUnit === 'cm')}>cm</button>
                    <button onClick={() => setHeightUnit('ftin')} style={unitToggle(heightUnit === 'ftin')}>ft/in</button>
                  </div>
                </div>
              </div>

              {/* Frame size */}
              <div>
                <label style={labelStyle}>Frame Size</label>
                <select
                  value={frame}
                  onChange={e => setFrame(e.target.value as FrameSize)}
                  style={selectStyle}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <span style={{ fontSize: 10, color: '#9A958A', marginTop: 2, display: 'block' }}>
                  {frame === 'small' ? 'Subtract ~10%' : frame === 'large' ? 'Add ~10%' : 'Standard estimate'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Ideal weight range — prominent card */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: '28px 22px', textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Your Ideal Weight Range</div>
              <div style={{ fontSize: 46, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1, marginTop: 8 }}>
                {results.rangeMin.toFixed(1)} – {results.rangeMax.toFixed(1)}
                <span style={{ fontSize: 18, fontWeight: 500, color: '#9A958A', marginLeft: 6 }}>kg</span>
              </div>
              <div style={{ fontSize: 15, color: '#6B6560', marginTop: 6, fontFamily: fm }}>
                {results.rangeMinLbs.toFixed(1)} – {results.rangeMaxLbs.toFixed(1)} lbs
              </div>
              {frame !== 'medium' && (
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 8 }}>
                  Adjusted for {frame} frame: {frame === 'small' ? 'subtract' : 'add'} ~10% from these values
                </div>
              )}
            </div>

            {/* Visual bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Formula Comparison</div>
              <div style={{ position: 'relative', height: 40, borderRadius: 10, background: '#F5F3EE', marginTop: 14, overflow: 'visible' }}>
                {/* BMI healthy range band */}
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiLowKg)}%`,
                  width: `${toPercent(results.bmiHighKg) - toPercent(results.bmiLowKg)}%`,
                  top: 0, height: '100%',
                  background: accent + '18',
                  borderRadius: 10,
                }} />

                {/* Formula dots */}
                {results.formulas.map(f => (
                  <div key={f.name} style={{
                    position: 'absolute',
                    left: `${toPercent(f.kg)}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 18, height: 18, borderRadius: '50%',
                    background: dotColors[f.name] || accent,
                    border: '2.5px solid #fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,.15)',
                    zIndex: 2,
                  }} />
                ))}

                {/* BMI low/high markers */}
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiLowKg)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 3, height: 28,
                  background: accent + '60',
                  borderRadius: 2,
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiHighKg)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 3, height: 28,
                  background: accent + '60',
                  borderRadius: 2,
                  zIndex: 1,
                }} />
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14, justifyContent: 'center' }}>
                {results.formulas.map(f => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B6560' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColors[f.name] || accent }} />
                    {f.name} ({f.kg} kg)
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B6560' }}>
                  <div style={{ width: 16, height: 10, borderRadius: 3, background: accent + '18', border: `1px solid ${accent}40` }} />
                  BMI 18.5–24.9
                </div>
              </div>
            </div>

            {/* Results table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Results by Formula</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 14, fontFamily: fb }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>Formula</th>
                    <th style={{ textAlign: 'right', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>Weight (kg)</th>
                    <th style={{ textAlign: 'right', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>Weight (lbs)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.formulas.map(f => (
                    <tr key={f.name}>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', fontWeight: 600, color: '#1C1B18' }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: dotColors[f.name] || accent, marginRight: 8 }} />
                        {f.name}
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{f.kg.toFixed(1)}</td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', textAlign: 'right', fontFamily: fm, color: '#6B6560' }}>{f.lbs.toFixed(1)}</td>
                    </tr>
                  ))}
                  {/* BMI range row */}
                  <tr>
                    <td style={{ padding: '10px 10px', fontWeight: 600, color: accent }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: accent + '40', marginRight: 8 }} />
                      BMI Range
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: accent }}>{results.bmiLowKg.toFixed(1)} – {results.bmiHighKg.toFixed(1)}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontFamily: fm, color: '#6B6560' }}>{results.bmiLowLbs.toFixed(1)} – {results.bmiHighLbs.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Healthy BMI range card */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Healthy BMI Weight Range</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#22C55E' }}>
                  {results.bmiLowKg.toFixed(1)} – {results.bmiHighKg.toFixed(1)}
                </span>
                <span style={{ fontSize: 14, color: '#9A958A' }}>kg</span>
              </div>
              <div style={{ fontSize: 14, color: '#6B6560', marginTop: 4, fontFamily: fm }}>
                {results.bmiLowLbs.toFixed(1)} – {results.bmiHighLbs.toFixed(1)} lbs
              </div>
              <p style={{ fontSize: 12, color: '#9A958A', marginTop: 10, lineHeight: 1.6 }}>
                Based on a BMI of 18.5–24.9 for a height of {heightUnit === 'cm' ? `${heightCm} cm` : `${heightFt}′${heightIn}″`} ({(results.heightM * 100).toFixed(0)} cm / {(results.heightM * 3.281).toFixed(1)} ft).
              </p>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              Ideal weight estimates are approximations based on population-level formulas. Individual ideal weight varies with body composition, muscle mass, bone density, and overall health. Consult a healthcare professional for personalized advice.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free ideal weight calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free ideal weight calculator to find your ideal body weight using four scientifically recognized formulas: Devine, Robinson, Miller, and Hamwi. Each formula estimates ideal weight based on your height and gender. The calculator also shows the healthy BMI weight range (18.5–24.9) for your height, giving you a comprehensive view of your target weight. Compare results across all formulas at a glance with the visual comparison bar. Works in both metric (cm, kg) and imperial (ft/in, lbs) units. No signup required.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>How are ideal weight formulas calculated?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            All four formulas use height in inches above 5 feet (60 inches) as the primary variable. The Devine formula (1974) is the most widely used in clinical settings. Robinson (1983) and Miller (1983) provide alternative estimates, while the Hamwi formula (1964) was one of the earliest methods. Results vary by a few kilograms, so viewing the range across all formulas gives a more realistic target. The BMI-based range uses the standard healthy BMI of 18.5 to 24.9 multiplied by your height in meters squared.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
