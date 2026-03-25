'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#0EA5E9'

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

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14,
  padding: 20, textAlign: 'center',
}

type UnitType = 'kg' | 'lbs'
type Gender = 'male' | 'female'

const DEFICIT_OPTIONS = [250, 500, 750, 1000]

export default function CalorieDeficitClient({
  defaultCurrentWeight,
  defaultGoalWeight,
  defaultTDEE,
  defaultDeficit,
}: {
  defaultCurrentWeight?: number
  defaultGoalWeight?: number
  defaultTDEE?: number
  defaultDeficit?: number
} = {}) {
  const [gender, setGender] = useState<Gender>('male')
  const [unit, setUnit] = useState<UnitType>('kg')
  const [currentWeight, setCurrentWeight] = useState(defaultCurrentWeight ?? 80)
  const [goalWeight, setGoalWeight] = useState(defaultGoalWeight ?? 70)
  const [tdee, setTdee] = useState(defaultTDEE ?? 2000)
  const [deficitPreset, setDeficitPreset] = useState<number | 'custom'>(defaultDeficit ?? 500)
  const [customDeficit, setCustomDeficit] = useState(defaultDeficit ?? 500)

  const deficit = deficitPreset === 'custom' ? customDeficit : deficitPreset

  const results = useMemo(() => {
    if (currentWeight <= 0 || goalWeight <= 0 || tdee <= 0 || deficit <= 0) return null
    if (currentWeight <= goalWeight) return null

    const dailyTarget = tdee - deficit

    // Weekly weight loss
    // 7700 kcal ≈ 1 kg fat, 3500 kcal ≈ 1 lb fat
    const weeklyLoss = unit === 'kg'
      ? (deficit * 7) / 7700
      : (deficit * 7) / 3500

    const totalToLose = currentWeight - goalWeight
    const estimatedWeeks = totalToLose / weeklyLoss
    const estimatedDays = Math.ceil(estimatedWeeks * 7)

    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + estimatedDays)

    const progressPct = Math.min(100, Math.max(0, ((currentWeight - goalWeight) / currentWeight) * 100))

    // Safety check
    const safeMin = gender === 'female' ? 1200 : 1500
    const unsafeWarning = dailyTarget < safeMin
      ? gender === 'female'
        ? 'Warning: Eating below 1,200 calories/day is not recommended for women without medical supervision.'
        : 'Warning: Eating below 1,500 calories/day is not recommended for men without medical supervision.'
      : null

    return {
      dailyTarget,
      weeklyLoss,
      totalToLose,
      estimatedWeeks,
      targetDate,
      progressPct,
      unsafeWarning,
    }
  }, [currentWeight, goalWeight, tdee, deficit, unit, gender])

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitBtn = (u: UnitType): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === u ? accent : 'transparent',
    color: unit === u ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <ToolShell name="Calorie Deficit Calculator" icon="📉" currentPath="/calorie-deficit">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📉</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Calorie Deficit Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Calorie Deficit <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate how long to reach your goal weight with a safe daily calorie target.</p>
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
              <label style={labelStyle}>Unit</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('kg')} style={unitBtn('kg')}>kg</button>
                <button onClick={() => setUnit('lbs')} style={unitBtn('lbs')}>lbs</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Current Weight */}
              <div>
                <label style={labelStyle}>Current Weight ({unit})</label>
                <input
                  type="number" value={currentWeight} min={1}
                  onChange={e => setCurrentWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Goal Weight */}
              <div>
                <label style={labelStyle}>Goal Weight ({unit})</label>
                <input
                  type="number" value={goalWeight} min={1}
                  onChange={e => setGoalWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* TDEE */}
              <div>
                <label style={labelStyle}>TDEE (daily calories)</label>
                <input
                  type="number" value={tdee} min={1}
                  onChange={e => setTdee(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Deficit */}
              <div>
                <label style={labelStyle}>Daily Deficit (cal)</label>
                <select
                  value={deficitPreset}
                  onChange={e => {
                    const v = e.target.value
                    if (v === 'custom') {
                      setDeficitPreset('custom')
                    } else {
                      setDeficitPreset(Number(v))
                    }
                  }}
                  style={selectStyle}
                >
                  {DEFICIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt} cal/day</option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Custom deficit input */}
            {deficitPreset === 'custom' && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Custom Deficit (cal/day)</label>
                <input
                  type="number" value={customDeficit} min={1}
                  onChange={e => setCustomDeficit(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Safety warning */}
            {results.unsafeWarning && (
              <div style={{
                marginBottom: 16, padding: '14px 18px', borderRadius: 12,
                background: '#FEF3C7', border: '1.5px solid #FDE68A',
                fontSize: 13, color: '#92400E', lineHeight: 1.6, fontWeight: 500,
              }}>
                {results.unsafeWarning}
              </div>
            )}

            {/* Daily calorie target — hero card */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 18, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>Daily Calorie Target</div>
              <div style={{ fontSize: 52, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {Math.round(results.dailyTarget).toLocaleString()}
              </div>
              <div style={{ fontSize: 14, color: '#6B6560', marginTop: 6 }}>calories / day</div>
            </div>

            {/* Stat cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={cardStyle}>
                <div style={labelStyle}>Weekly Weight Loss</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {results.weeklyLoss.toFixed(2)} {unit}/week
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>Total to Lose</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {results.totalToLose.toFixed(1)} {unit}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>Estimated Time</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.ceil(results.estimatedWeeks)} weeks
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>Target Date</div>
                <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {formatDate(results.targetDate)}
                </div>
              </div>
            </div>

            {/* Progress bar visualization */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 24px', marginBottom: 16,
            }}>
              <div style={labelStyle}>Weight Loss Progress</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                  {currentWeight} {unit}
                </span>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: accent }}>
                  {goalWeight} {unit}
                </span>
              </div>
              {/* Bar track */}
              <div style={{
                position: 'relative', height: 22, borderRadius: 11,
                background: '#F0EDE6', overflow: 'hidden',
              }}>
                {/* Filled portion */}
                <div style={{
                  height: '100%', borderRadius: 11,
                  background: `linear-gradient(90deg, ${accent}, #38BDF8)`,
                  width: `${results.progressPct}%`,
                  transition: 'width .4s ease',
                  minWidth: 4,
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#9A958A' }}>
                {results.progressPct.toFixed(1)}% of current weight to lose
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: '#F5F3EE', border: '1px solid #E8E4DB',
              fontSize: 12, color: '#6B6560', lineHeight: 1.6,
            }}>
              This calculator provides estimates only. Individual results vary based on metabolism, activity level, and body composition. Consult a healthcare professional before starting any weight loss program.
            </div>
          </section>
        )}

        {/* No results message */}
        {!results && currentWeight > 0 && goalWeight > 0 && currentWeight <= goalWeight && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{
              padding: '16px 20px', borderRadius: 12,
              background: '#EFF6FF', border: '1.5px solid #BFDBFE',
              fontSize: 13, color: '#1E40AF', textAlign: 'center',
            }}>
              Your current weight must be greater than your goal weight to calculate a deficit plan.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Calorie Deficit Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            Use this free calorie deficit calculator to find out how long it will take to reach your goal weight. Enter your current weight, goal weight, and daily calorie expenditure (TDEE) to get a personalized plan with safe daily calorie targets and estimated timelines.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>How Does a Calorie Deficit Work?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            A calorie deficit means eating fewer calories than your body burns each day. When you consistently maintain a deficit, your body uses stored fat for energy, leading to weight loss. A deficit of 500 calories per day typically results in about 0.45 kg (1 lb) of weight loss per week.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>What Is a Safe Calorie Deficit?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            Most health experts recommend a daily deficit of 250 to 1,000 calories. Women should generally not eat fewer than 1,200 calories per day, and men should not go below 1,500 calories per day without medical supervision. A moderate deficit of 500 calories per day is considered safe and sustainable for most people.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>What Is TDEE?</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day including basal metabolism, physical activity, and the thermic effect of food. Knowing your TDEE helps you set an accurate calorie target for weight loss.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
