'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#16A34A'
const carbColor = '#F59E0B'
const fatColor = '#EF4444'

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

type Goal = 'Balanced' | 'Low Carb' | 'High Protein' | 'Keto' | 'Custom'

const presets: Record<Exclude<Goal, 'Custom'>, { protein: number; carbs: number; fat: number }> = {
  Balanced: { protein: 30, carbs: 40, fat: 30 },
  'Low Carb': { protein: 40, carbs: 20, fat: 40 },
  'High Protein': { protein: 40, carbs: 35, fat: 25 },
  Keto: { protein: 25, carbs: 5, fat: 70 },
}

export default function MacroClient({
  defaultCalories,
  defaultGoal,
}: {
  defaultCalories?: number
  defaultGoal?: string
} = {}) {
  const [calories, setCalories] = useState(defaultCalories ?? 2000)
  const [goal, setGoal] = useState<Goal>((defaultGoal as Goal) ?? 'Balanced')
  const [customProtein, setCustomProtein] = useState(30)
  const [customCarbs, setCustomCarbs] = useState(40)
  const [customFat, setCustomFat] = useState(30)

  const ratios = useMemo(() => {
    if (goal === 'Custom') {
      return { protein: customProtein, carbs: customCarbs, fat: customFat }
    }
    return presets[goal]
  }, [goal, customProtein, customCarbs, customFat])

  const macros = useMemo(() => {
    const cal = Math.max(0, calories)
    const proteinCal = cal * (ratios.protein / 100)
    const carbsCal = cal * (ratios.carbs / 100)
    const fatCal = cal * (ratios.fat / 100)
    return {
      protein: { grams: Math.round(proteinCal / 4), calories: Math.round(proteinCal) },
      carbs: { grams: Math.round(carbsCal / 4), calories: Math.round(carbsCal) },
      fat: { grams: Math.round(fatCal / 9), calories: Math.round(fatCal) },
    }
  }, [calories, ratios])

  function handleCustomSlider(macro: 'protein' | 'carbs' | 'fat', newValue: number) {
    const others: ('protein' | 'carbs' | 'fat')[] =
      macro === 'protein' ? ['carbs', 'fat'] :
      macro === 'carbs' ? ['protein', 'fat'] :
      ['protein', 'carbs']

    const current = { protein: customProtein, carbs: customCarbs, fat: customFat }
    const remaining = 100 - newValue
    const othersSum = current[others[0]] + current[others[1]]

    let newOther0: number
    let newOther1: number

    if (othersSum === 0) {
      newOther0 = Math.round(remaining / 2)
      newOther1 = remaining - newOther0
    } else {
      newOther0 = Math.round((current[others[0]] / othersSum) * remaining)
      newOther1 = remaining - newOther0
    }

    newOther0 = Math.max(0, Math.min(100, newOther0))
    newOther1 = Math.max(0, Math.min(100, newOther1))

    const updated = { ...current, [macro]: newValue, [others[0]]: newOther0, [others[1]]: newOther1 }
    setCustomProtein(updated.protein)
    setCustomCarbs(updated.carbs)
    setCustomFat(updated.fat)
  }

  const donutGradient = `conic-gradient(
    ${accent} 0deg ${ratios.protein * 3.6}deg,
    ${carbColor} ${ratios.protein * 3.6}deg ${(ratios.protein + ratios.carbs) * 3.6}deg,
    ${fatColor} ${(ratios.protein + ratios.carbs) * 3.6}deg 360deg
  )`

  return (
    <ToolShell name="Macro Calculator" icon="🥗" currentPath="/macro-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🥗</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Macro Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Macro <span style={{ color: accent }}>calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Calculate your daily protein, carbs, and fat intake. Choose a preset or customize your split.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Calories */}
              <div>
                <label style={labelStyle}>Daily Calories</label>
                <input
                  type="number"
                  value={calories}
                  min={0}
                  onChange={e => setCalories(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Goal */}
              <div>
                <label style={labelStyle}>Goal / Preset</label>
                <select
                  value={goal}
                  onChange={e => {
                    const g = e.target.value as Goal
                    setGoal(g)
                    if (g !== 'Custom') {
                      const p = presets[g]
                      setCustomProtein(p.protein)
                      setCustomCarbs(p.carbs)
                      setCustomFat(p.fat)
                    }
                  }}
                  style={selectStyle}
                >
                  <option value="Balanced">Balanced</option>
                  <option value="Low Carb">Low Carb</option>
                  <option value="High Protein">High Protein</option>
                  <option value="Keto">Keto</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Custom sliders */}
            {goal === 'Custom' && (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {([
                  { key: 'protein' as const, label: 'Protein', color: accent, value: customProtein },
                  { key: 'carbs' as const, label: 'Carbs', color: carbColor, value: customCarbs },
                  { key: 'fat' as const, label: 'Fat', color: fatColor, value: customFat },
                ]).map(s => (
                  <div key={s.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>{s.label}</label>
                      <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 700, color: s.color }}>{s.value}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={s.value}
                      onChange={e => handleCustomSlider(s.key, Number(e.target.value))}
                      style={{
                        width: '100%', height: 6, cursor: 'pointer',
                        accentColor: s.color,
                      }}
                    />
                  </div>
                ))}
                <div style={{ fontSize: 11, color: '#9A958A', textAlign: 'right' }}>
                  Total: {customProtein + customCarbs + customFat}%
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          {/* Donut chart */}
          <div style={{
            background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB',
            padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16,
          }}>
            <div style={labelStyle}>Macro Split</div>
            <div style={{ position: 'relative', width: 180, height: 180, marginTop: 12, marginBottom: 16 }}>
              <div style={{
                width: 180, height: 180, borderRadius: '50%',
                background: donutGradient,
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 100, height: 100, borderRadius: '50%', background: '#fff',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>{calories}</div>
                <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>kcal</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
              {[
                { label: 'Protein', color: accent },
                { label: 'Carbs', color: carbColor },
                { label: 'Fat', color: fatColor },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
                  <span style={{ color: '#6B6560' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Macro cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Protein', color: accent, grams: macros.protein.grams, cal: macros.protein.calories, pct: ratios.protein },
              { label: 'Carbs', color: carbColor, grams: macros.carbs.grams, cal: macros.carbs.calories, pct: ratios.carbs },
              { label: 'Fat', color: fatColor, grams: macros.fat.grams, cal: macros.fat.calories, pct: ratios.fat },
            ].map(m => (
              <div key={m.label} style={{
                background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14,
                padding: 20, textAlign: 'center',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: m.color,
                  margin: '0 auto 8px',
                }} />
                <div style={labelStyle}>{m.label}</div>
                <div style={{ fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#1C1B18', lineHeight: 1.1 }}>
                  {m.grams}<span style={{ fontSize: 14, fontWeight: 500, color: '#9A958A' }}>g</span>
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4 }}>
                  {m.cal} kcal &middot; {m.pct}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Macro Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Use this free macro calculator to find your ideal daily intake of protein, carbohydrates, and fat. Whether you follow a balanced diet, low carb, high protein, keto, or a fully custom macro split, this tool instantly calculates the grams you need. Macronutrients are the foundation of any nutrition plan -- protein supports muscle recovery and growth at 4 calories per gram, carbohydrates fuel your workouts and daily energy at 4 calories per gram, and dietary fat supports hormone production and nutrient absorption at 9 calories per gram.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Choosing the Right Macro Split</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The balanced preset (30/40/30) works well for general health and moderate exercise. A high protein split (40/35/25) supports muscle building and recovery, especially during strength training. The keto preset (25/5/70) drastically reduces carbs to promote fat adaptation. If none of these fit your needs, the custom mode lets you drag sliders to set your exact percentages while keeping the total locked at 100%.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Why Macros Matter for Your Goals</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Tracking macros rather than just total calories gives you more control over body composition. Two people eating 2,000 calories can see very different results depending on their protein-to-fat ratio. Higher protein intake preserves lean muscle during a calorie deficit, while adequate carbohydrates maintain training performance. Adjusting your macro split based on your goals is one of the most effective nutrition strategies available.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Need to find your daily calorie target first? Use our <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie calculator</a> to determine your TDEE, then come back here to split those calories into macros. If you are planning to lose weight, the <a href="/calorie-deficit" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie deficit calculator</a> can help you set a safe daily target and timeline.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
