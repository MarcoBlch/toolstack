'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#DC2626'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

type Method = 'simple' | 'karvonen'

interface Zone {
  zone: number
  name: string
  lowPct: number
  highPct: number
  color: string
  purpose: string
}

const ZONES: Zone[] = [
  { zone: 1, name: 'Recovery',  lowPct: 50, highPct: 60, color: '#3B82F6', purpose: 'Warm-up, recovery' },
  { zone: 2, name: 'Fat Burn',  lowPct: 60, highPct: 70, color: '#22C55E', purpose: 'Fat burning, endurance' },
  { zone: 3, name: 'Aerobic',   lowPct: 70, highPct: 80, color: '#F59E0B', purpose: 'Cardiovascular fitness' },
  { zone: 4, name: 'Anaerobic', lowPct: 80, highPct: 90, color: '#F97316', purpose: 'Speed, power' },
  { zone: 5, name: 'VO2 Max',   lowPct: 90, highPct: 100, color: '#EF4444', purpose: 'Maximum effort' },
]

function calcBpm(maxHR: number, restingHR: number, pct: number, method: Method): number {
  if (method === 'karvonen') {
    return Math.round(((maxHR - restingHR) * (pct / 100)) + restingHR)
  }
  return Math.round(maxHR * (pct / 100))
}

export default function HeartRateClient({
  defaultAge,
  defaultRestingHR,
}: {
  defaultAge?: number
  defaultRestingHR?: number
} = {}) {
  const [age, setAge] = useState(defaultAge ?? 30)
  const [restingHR, setRestingHR] = useState(defaultRestingHR ?? 70)
  const [method, setMethod] = useState<Method>('simple')

  const results = useMemo(() => {
    if (age <= 0 || age > 120) return null

    const maxHR = 220 - age

    const zones = ZONES.map(z => ({
      ...z,
      lowBpm: calcBpm(maxHR, restingHR, z.lowPct, method),
      highBpm: calcBpm(maxHR, restingHR, z.highPct, method),
    }))

    return { maxHR, zones }
  }, [age, restingHR, method])

  const toggleBtn = (m: Method): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: method === m ? accent : 'transparent',
    color: method === m ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  // Find overall min/max BPM for bar width scaling
  const overallMin = results ? results.zones[0].lowBpm : 0
  const overallMax = results ? results.zones[results.zones.length - 1].highBpm : 200

  return (
    <ToolShell name="Heart Rate Zones" icon="❤️" currentPath="/heart-rate-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>❤️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Heart Rate Zones</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Heart Rate <span style={{ color: accent }}>Zone Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Find your fat burn, cardio, and VO2 max zones. Karvonen and simple methods.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Method toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Method</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setMethod('simple')} style={toggleBtn('simple')}>Simple (220−age)</button>
                <button onClick={() => setMethod('karvonen')} style={toggleBtn('karvonen')}>Karvonen</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: method === 'karvonen' ? '1fr 1fr' : '1fr', gap: 16 }}>
              {/* Age */}
              <div>
                <label style={labelStyle}>Age</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Resting HR - always shown but highlighted for Karvonen */}
              <div>
                <label style={labelStyle}>Resting Heart Rate (bpm){method === 'simple' ? ' — optional' : ''}</label>
                <input
                  type="number" value={restingHR} min={30} max={120}
                  onChange={e => setRestingHR(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {method === 'karvonen' && (
              <p style={{ fontSize: 12, color: '#9A958A', marginTop: 12, lineHeight: 1.5 }}>
                Karvonen formula: Target HR = ((Max HR − Resting HR) × Intensity%) + Resting HR
              </p>
            )}
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Max HR + Method cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{
                background: accent + '0A', border: `1.5px solid ${accent}25`,
                borderRadius: 16, padding: 22, textAlign: 'center',
              }}>
                <div style={labelStyle}>Max Heart Rate</div>
                <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {results.maxHR}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A' }}>bpm</div>
              </div>
              <div style={{
                background: '#fff', border: '1.5px solid #E8E4DB',
                borderRadius: 16, padding: 22, textAlign: 'center',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                <div style={labelStyle}>Method</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1C1B18' }}>
                  {method === 'simple' ? '220 − Age' : 'Karvonen'}
                </div>
                {method === 'karvonen' && (
                  <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4 }}>
                    Resting HR: {restingHR} bpm
                  </div>
                )}
              </div>
            </div>

            {/* Zone bars */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>Heart Rate Zones</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {results.zones.map(z => {
                  const barWidth = ((z.highBpm - z.lowBpm) / (overallMax - overallMin)) * 100
                  const barOffset = ((z.lowBpm - overallMin) / (overallMax - overallMin)) * 100
                  return (
                    <div key={z.zone} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 80, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: z.color }}>Z{z.zone}</span>
                        <span style={{ fontSize: 11, color: '#9A958A', marginLeft: 4 }}>{z.name}</span>
                      </div>
                      <div style={{ flex: 1, position: 'relative', height: 28 }}>
                        <div style={{
                          position: 'absolute',
                          left: `${barOffset}%`,
                          width: `${Math.max(barWidth, 8)}%`,
                          height: '100%',
                          background: z.color,
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all .3s',
                        }}>
                          <span style={{
                            fontSize: 11, fontFamily: fm, fontWeight: 700, color: '#fff',
                            whiteSpace: 'nowrap', textShadow: '0 1px 2px rgba(0,0,0,.3)',
                          }}>
                            {z.lowBpm}–{z.highBpm}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Zone table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16, overflowX: 'auto',
            }}>
              <div style={labelStyle}>Zone Details</div>
              <table style={{
                width: '100%', borderCollapse: 'collapse', marginTop: 12,
                fontSize: 13, fontFamily: fb,
              }}>
                <thead>
                  <tr>
                    {['Zone', 'Name', 'Intensity', 'BPM Range', 'Purpose'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB',
                        fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
                        letterSpacing: '.5px',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.zones.map(z => (
                    <tr key={z.zone}>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0ECE4' }}>
                        <span style={{
                          display: 'inline-block', width: 24, height: 24, borderRadius: 6,
                          background: z.color, color: '#fff', textAlign: 'center', lineHeight: '24px',
                          fontSize: 12, fontWeight: 700,
                        }}>
                          {z.zone}
                        </span>
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0ECE4', fontWeight: 600 }}>
                        {z.name}
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0ECE4', fontFamily: fm, fontSize: 12 }}>
                        {z.lowPct}–{z.highPct}%
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0ECE4', fontFamily: fm, fontSize: 12, fontWeight: 700, color: z.color }}>
                        {z.lowBpm}–{z.highBpm} bpm
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0ECE4', color: '#6B6560' }}>
                        {z.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              Heart rate zones are estimates. Consult a healthcare professional before starting any new exercise program.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Heart Rate Zone Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Calculate your heart rate training zones with our free calculator. Supports both the simple 220-minus-age method and the more accurate Karvonen formula, which factors in your resting heart rate. Instantly see your five training zones — Recovery, Fat Burn, Aerobic, Anaerobic, and VO2 Max — with personalized BPM ranges, colored zone bars, and a detailed breakdown of each zone's purpose. Perfect for runners, cyclists, and anyone looking to optimize their cardio training.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Simple Method vs. Karvonen Formula</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The simple method estimates max heart rate as 220 minus your age and calculates zones as a straight percentage of that number. The Karvonen formula is more personalized because it uses your heart rate reserve — the difference between your max and resting heart rate. This means two people of the same age but different fitness levels will get different zone ranges, making Karvonen the preferred method for experienced athletes.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Training in the Right Zone</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Each zone serves a specific purpose. Zone 1 (50-60%) is for warm-ups and active recovery. Zone 2 (60-70%) is the fat-burning zone, ideal for long easy runs. Zone 3 (70-80%) builds aerobic capacity and cardiovascular endurance. Zone 4 (80-90%) develops speed and lactate threshold. Zone 5 (90-100%) is maximum effort for short intervals. Most training plans recommend spending the majority of your time in Zones 2 and 3.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Pair your heart rate zones with our <a href="/pace-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>pace calculator</a> to match your running pace to each zone. You can also use the <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie calculator</a> to see how your activity level affects your daily energy needs.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
