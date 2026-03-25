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

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
  padding: 22, marginBottom: 16,
}

export default function CaloriesBurnedClient({
  activity,
  minutes,
  metValue,
  title,
}: {
  activity: string
  minutes: number
  metValue: number
  title: string
}) {
  const [weight, setWeight] = useState(70)

  const caloriesBurned = useMemo(() => {
    return Math.round(metValue * weight * (minutes / 60))
  }, [metValue, weight, minutes])

  return (
    <ToolShell
      name="Calories Burned"
      icon="🔥"
      currentPath={`/calories-burned`}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Activity</label>
            <div style={{
              fontSize: 18, fontWeight: 700, fontFamily: fb, color: '#1C1B18',
            }}>
              {activity} &mdash; {minutes} min
            </div>
            <div style={{
              fontSize: 12, color: '#9A958A', fontFamily: fb, marginTop: 4,
            }}>
              MET value: {metValue}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Your Weight: {weight} kg</label>
            <input
              type="range"
              min={40}
              max={150}
              step={1}
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              style={{
                width: '100%', accentColor: accent, cursor: 'pointer',
              }}
            />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 11, color: '#9A958A', fontFamily: fb, marginTop: 2,
            }}>
              <span>40 kg</span>
              <span>150 kg</span>
            </div>
          </div>
        </div>

        <div style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${accent}11, ${accent}08)`,
          border: `1.5px solid ${accent}33`,
          textAlign: 'center',
          padding: 32,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: accent, textTransform: 'uppercase',
            letterSpacing: '.8px', marginBottom: 8, fontFamily: fb,
          }}>
            Calories Burned
          </div>
          <div style={{
            fontSize: 48, fontWeight: 800, color: '#1C1B18', fontFamily: fm,
            lineHeight: 1,
          }}>
            {caloriesBurned}
          </div>
          <div style={{
            fontSize: 14, color: '#9A958A', fontFamily: fb, marginTop: 8,
          }}>
            kcal in {minutes} minutes at {weight} kg
          </div>
        </div>

        <div style={{
          ...cardStyle,
          fontSize: 13, color: '#6B6660', fontFamily: fb, lineHeight: 1.6,
        }}>
          <strong style={{ color: '#1C1B18' }}>How it&apos;s calculated:</strong>
          <br />
          Calories = MET &times; weight (kg) &times; (minutes / 60)
          <br />
          = {metValue} &times; {weight} &times; ({minutes} / 60)
          <br />
          = <strong style={{ color: '#1C1B18' }}>{caloriesBurned} kcal</strong>
        </div>

        <a
          href="/calorie-calculator"
          style={{
            display: 'block', textAlign: 'center', fontSize: 14, fontFamily: fb,
            color: accent, fontWeight: 600, textDecoration: 'none', marginTop: 8,
          }}
        >
          &larr; Full Calorie Calculator
        </a>
      </div>
    </ToolShell>
  )
}
