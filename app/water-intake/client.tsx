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
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type WeightUnit = 'kg' | 'lbs'
type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'very_active'
type Climate = 'temperate' | 'hot' | 'cold'

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  moderate: 'Moderate',
  active: 'Active',
  very_active: 'Very Active',
}

const activityBonus: Record<ActivityLevel, number> = {
  sedentary: 0,
  moderate: 500,
  active: 750,
  very_active: 1000,
}

const climateLabels: Record<Climate, string> = {
  temperate: 'Temperate',
  hot: 'Hot',
  cold: 'Cold',
}

const climateBonus: Record<Climate, number> = {
  temperate: 0,
  hot: 500,
  cold: 0,
}

function GlassIcon({ filled, index }: { filled: boolean; index: number }) {
  return (
    <div
      key={index}
      style={{
        width: 30,
        height: 42,
        borderRadius: '0 0 8px 8px',
        border: `2px solid ${filled ? accent : '#E8E4DB'}`,
        borderTop: `2px solid ${filled ? accent : '#E8E4DB'}`,
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
        transition: 'all .3s',
        opacity: filled ? 1 : 0.35,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: filled ? '75%' : '0%',
          background: filled ? accent + '40' : 'transparent',
          transition: 'height .3s',
          borderRadius: '0 0 6px 6px',
        }}
      />
      {/* Water line ripple */}
      {filled && (
        <div
          style={{
            position: 'absolute',
            bottom: '73%',
            left: 0,
            right: 0,
            height: 2,
            background: accent + '60',
            borderRadius: 1,
          }}
        />
      )}
    </div>
  )
}

export default function WaterIntakeClient({
  defaultWeight,
  defaultActivity,
}: {
  defaultWeight?: number
  defaultActivity?: string
} = {}) {
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg')
  const [activity, setActivity] = useState<ActivityLevel>((defaultActivity as ActivityLevel) ?? 'moderate')
  const [climate, setClimate] = useState<Climate>('temperate')
  const [pregnant, setPregnant] = useState(false)

  const results = useMemo(() => {
    const wKg = weightUnit === 'kg' ? weightKg : weightLbs / 2.205
    if (wKg <= 0) return null

    const baseMl = Math.round(wKg * 33)
    const actMl = activityBonus[activity]
    const cliMl = climateBonus[climate]
    const pregMl = pregnant ? 400 : 0
    const totalMl = baseMl + actMl + cliMl + pregMl
    const liters = totalMl / 1000
    const glasses = Math.ceil(totalMl / 250)

    return { baseMl, actMl, cliMl, pregMl, totalMl, liters, glasses }
  }, [weightKg, weightLbs, weightUnit, activity, climate, pregnant])

  const unitToggle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '6px 0', border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: 11, fontWeight: 600, fontFamily: fb,
    background: active ? accent : 'transparent',
    color: active ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const maxGlasses = 15
  const displayGlasses = results ? Math.min(results.glasses, maxGlasses) : 0

  return (
    <ToolShell name="Water Intake Calculator" icon="💧" currentPath="/water-intake">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💧</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Water Intake Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Water intake <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>How much water should you drink daily? Based on weight, activity level, and climate.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Weight */}
              <div>
                <label style={labelStyle}>Weight</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={weightUnit === 'kg' ? weightKg : weightLbs}
                      min={1}
                      onChange={e => {
                        const v = Number(e.target.value)
                        if (weightUnit === 'kg') { setWeightKg(v); setWeightLbs(Math.round(v * 2.205)) }
                        else { setWeightLbs(v); setWeightKg(Math.round(v / 2.205)) }
                      }}
                      style={inputStyle}
                      placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
                    />
                  </div>
                  <div style={{ display: 'flex', background: '#F5F3EE', borderRadius: 8, padding: 2, gap: 2 }}>
                    <button onClick={() => setWeightUnit('kg')} style={unitToggle(weightUnit === 'kg')}>kg</button>
                    <button onClick={() => setWeightUnit('lbs')} style={unitToggle(weightUnit === 'lbs')}>lbs</button>
                  </div>
                </div>
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

              {/* Climate */}
              <div>
                <label style={labelStyle}>Climate</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={climate}
                    onChange={e => setClimate(e.target.value as Climate)}
                    style={selectStyle}
                  >
                    {(Object.keys(climateLabels) as Climate[]).map(key => (
                      <option key={key} value={key}>{climateLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pregnant / Breastfeeding Toggle */}
              <div>
                <label style={labelStyle}>Pregnant / Breastfeeding</label>
                <button
                  onClick={() => setPregnant(!pregnant)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1.5px solid ${pregnant ? accent : '#E8E4DB'}`,
                    borderRadius: 8,
                    background: pregnant ? accent + '12' : '#F5F3EE',
                    color: pregnant ? accent : '#9A958A',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: fb,
                    cursor: 'pointer',
                    transition: 'all .2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{
                    width: 18, height: 18, borderRadius: 4,
                    border: `2px solid ${pregnant ? accent : '#D0CCC4'}`,
                    background: pregnant ? accent : '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#fff', fontWeight: 700, transition: 'all .2s',
                  }}>
                    {pregnant ? '✓' : ''}
                  </span>
                  {pregnant ? 'Yes (+400 ml)' : 'No'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Main result */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Your Daily Water Intake</div>
              <div style={{ fontSize: 56, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {results.liters.toFixed(1)} L
              </div>
              <div style={{
                display: 'inline-block', marginTop: 10, padding: '5px 16px', borderRadius: 20,
                background: accent + '18', color: accent,
                fontSize: 14, fontWeight: 700,
              }}>
                {results.glasses} glasses (250 ml each)
              </div>
            </div>

            {/* Glass visualization */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>Glass Visualization</div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12,
                justifyContent: 'center',
              }}>
                {Array.from({ length: maxGlasses }).map((_, i) => (
                  <GlassIcon key={i} filled={i < displayGlasses} index={i} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#9A958A' }}>
                Each glass = 250 ml &middot; Filled: {displayGlasses} of {maxGlasses}
              </div>
            </div>

            {/* Breakdown */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>Breakdown</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>Base need (weight × 33)</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{results.baseMl} ml</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>Activity bonus</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: results.actMl > 0 ? accent : '#9A958A' }}>+{results.actMl} ml</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>Climate bonus</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: results.cliMl > 0 ? accent : '#9A958A' }}>+{results.cliMl} ml</span>
                </div>
                {pregnant && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, color: '#6B6560' }}>Pregnancy / breastfeeding</span>
                    <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: accent }}>+{results.pregMl} ml</span>
                  </div>
                )}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px', background: accent + '0A', borderRadius: 8,
                  border: `1.5px solid ${accent}25`, marginTop: 4,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1C1B18' }}>Total</span>
                  <span style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: accent }}>{results.totalMl} ml</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              This is an estimate. Individual hydration needs vary. Consult a healthcare professional for personalized advice.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free water intake calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free water intake calculator. Find out how much water you should drink daily based on your body weight, activity level, and climate. Staying properly hydrated supports digestion, energy levels, skin health, and overall well-being. Use this tool to estimate your optimal daily water consumption in liters and glasses.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>How is water intake calculated?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The base recommendation is 33 ml of water per kilogram of body weight. This is adjusted for physical activity, hot climates, and pregnancy or breastfeeding. Active individuals and those in warm environments need more fluids to compensate for water lost through sweat.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Tips for staying hydrated</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Carry a reusable water bottle, drink a glass of water before each meal, and eat water-rich foods like fruits and vegetables. If you exercise, drink extra water before, during, and after your workout. Signs of dehydration include dark urine, fatigue, headache, and dry mouth.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
