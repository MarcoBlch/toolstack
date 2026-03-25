'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EF4444'

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
type WeightUnit = 'kg' | 'lbs'
type HeightUnit = 'cm' | 'ftin'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  light: 'Lightly active (1-3 days/week)',
  moderate: 'Moderately active (3-5 days/week)',
  very: 'Very active (6-7 days/week)',
  extra: 'Extra active (very hard exercise/physical job)',
}

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
}

export default function CalorieClient({
  defaultGender,
  defaultAge,
  defaultWeight,
  defaultHeight,
  defaultActivity,
}: {
  defaultGender?: string
  defaultAge?: number
  defaultWeight?: number
  defaultHeight?: number
  defaultActivity?: string
} = {}) {
  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [age, setAge] = useState(defaultAge ?? 30)
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg')
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm')
  const [activity, setActivity] = useState<ActivityLevel>((defaultActivity as ActivityLevel) ?? 'moderate')

  const results = useMemo(() => {
    const wKg = weightUnit === 'kg' ? weightKg : weightLbs / 2.205
    const hCm = heightUnit === 'cm' ? heightCm : (heightFt * 12 + heightIn) * 2.54

    if (wKg <= 0 || hCm <= 0 || age <= 0) return null

    const bmr = gender === 'male'
      ? (10 * wKg) + (6.25 * hCm) - (5 * age) + 5
      : (10 * wKg) + (6.25 * hCm) - (5 * age) - 161

    const tdee = bmr * activityMultipliers[activity]
    const loseSlow = tdee - 500
    const loseFast = tdee - 1000
    const gain = tdee + 500

    return { bmr, tdee, loseSlow, loseFast, gain }
  }, [gender, age, weightKg, weightLbs, weightUnit, heightCm, heightFt, heightIn, heightUnit, activity])

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

  // Bar max for visual
  const maxCal = results ? Math.max(results.gain, 3500) : 3500

  return (
    <ToolShell name="Calorie Calculator" icon="🔥" currentPath="/calorie-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🔥</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Calorie Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Calorie <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate your daily calorie needs. BMR and TDEE using the Mifflin-St Jeor equation.</p>
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
              {/* Age */}
              <div>
                <label style={labelStyle}>Age</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(Number(e.target.value))}
                  style={inputStyle}
                  placeholder="e.g. 30"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label style={labelStyle}>Activity Level</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={activity}
                    onChange={e => setActivity(e.target.value as ActivityLevel)}
                    style={selectStyle}
                  >
                    {(Object.keys(activityLabels) as ActivityLevel[]).map(key => (
                      <option key={key} value={key}>{activityLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label style={labelStyle}>Weight</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={weightUnit === 'kg' ? weightKg : weightLbs}
                      min={1}
                      onChange={e => weightUnit === 'kg' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 2, background: '#F5F3EE', borderRadius: 8, padding: 2, minWidth: 80 }}>
                    <button onClick={() => setWeightUnit('kg')} style={unitToggle(weightUnit === 'kg')}>kg</button>
                    <button onClick={() => setWeightUnit('lbs')} style={unitToggle(weightUnit === 'lbs')}>lbs</button>
                  </div>
                </div>
              </div>

              {/* Height */}
              <div>
                <label style={labelStyle}>Height</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {heightUnit === 'cm' ? (
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightCm} min={1}
                        onChange={e => setHeightCm(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="cm"
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
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* BMR + TDEE top cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* BMR */}
              <div style={{
                background: '#fff',
                border: '1.5px solid #E8E4DB',
                borderRadius: 16, padding: 22, textAlign: 'center',
              }}>
                <div style={labelStyle}>BMR (Basal Metabolic Rate)</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.round(results.bmr).toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>calories/day</div>
              </div>

              {/* TDEE */}
              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16, padding: 22, textAlign: 'center',
              }}>
                <div style={labelStyle}>TDEE (Daily Calories)</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {Math.round(results.tdee).toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>calories/day</div>
              </div>
            </div>

            {/* Calorie goals */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Daily Calorie Goals</div>

              {/* Visual bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
                {/* Lose weight fast */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>Lose weight fast</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>-1000 cal/day (~1 kg/week)</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #EF4444, #F87171)',
                      width: `${Math.max((results.loseFast / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(Math.max(results.loseFast, 0)).toLocaleString()} cal
                    </div>
                  </div>
                </div>

                {/* Lose weight */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>Lose weight</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>-500 cal/day (~0.5 kg/week)</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #F97316, #FB923C)',
                      width: `${Math.max((results.loseSlow / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(Math.max(results.loseSlow, 0)).toLocaleString()} cal
                    </div>
                  </div>
                </div>

                {/* Maintain */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>Maintain weight</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>your TDEE</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
                      width: `${Math.max((results.tdee / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(results.tdee).toLocaleString()} cal
                    </div>
                  </div>
                </div>

                {/* Gain weight */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>Gain weight</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>+500 cal/day (~0.5 kg/week)</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                      width: `${Math.max((results.gain / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(results.gain).toLocaleString()} cal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              Calorie estimates are based on the Mifflin-St Jeor equation. Individual needs vary. Consult a healthcare professional or registered dietitian for personalized advice.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free calorie calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free calorie calculator to estimate your daily calorie needs. Uses the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on your age, gender, weight, height, and activity level. Get personalized calorie targets for weight loss, maintenance, or weight gain. No signup required.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
