'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EA580C'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box' as const,
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const, WebkitAppearance: 'none' as const,
}

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
  padding: 22, marginBottom: 16,
}

type Mode = 'pace' | 'time' | 'distance'
type DistUnit = 'km' | 'miles'
type PaceUnit = 'km' | 'mile'

const KM_PER_MILE = 1.60934
const MILE_PER_KM = 1 / KM_PER_MILE

const racePresets = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Half Marathon', km: 21.0975 },
  { label: 'Marathon', km: 42.195 },
]

function formatTime(totalSeconds: number, forceHours = false): string {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return '--:--'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.round(totalSeconds % 60)
  const mm = String(m).padStart(2, '0')
  const ss = String(s === 60 ? 0 : s).padStart(2, '0')
  const adjustedM = s === 60 ? String(m + 1).padStart(2, '0') : mm
  if (h > 0 || forceHours) {
    return `${h}:${adjustedM}:${ss}`
  }
  return `${adjustedM}:${ss}`
}

function formatPace(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds <= 0) return '--:--'
  const m = Math.floor(totalSeconds / 60)
  const s = Math.round(totalSeconds % 60)
  return `${m}:${String(s === 60 ? 0 : s).padStart(2, '0')}`
}

export default function PaceClient({
  defaultMode,
  defaultDistance,
  defaultTime,
  defaultPace,
}: {
  defaultMode?: string
  defaultDistance?: number
  defaultTime?: number
  defaultPace?: number
} = {}) {
  const [mode, setMode] = useState<Mode>((defaultMode as Mode) ?? 'pace')

  // Distance state
  const [distValue, setDistValue] = useState(defaultDistance ?? 10)
  const [distUnit, setDistUnit] = useState<DistUnit>('km')

  // Time state (hh:mm:ss)
  const [timeH, setTimeH] = useState(defaultTime ? Math.floor(defaultTime / 3600) : 0)
  const [timeM, setTimeM] = useState(defaultTime ? Math.floor((defaultTime % 3600) / 60) : 50)
  const [timeS, setTimeS] = useState(defaultTime ? Math.round(defaultTime % 60) : 0)

  // Pace state (min:sec per unit)
  const [paceMin, setPaceMin] = useState(defaultPace ? Math.floor(defaultPace / 60) : 5)
  const [paceSec, setPaceSec] = useState(defaultPace ? Math.round(defaultPace % 60) : 0)
  const [paceUnit, setPaceUnit] = useState<PaceUnit>('km')

  const results = useMemo(() => {
    const distKm = distUnit === 'km' ? distValue : distValue * KM_PER_MILE
    const distMiles = distUnit === 'miles' ? distValue : distValue * MILE_PER_KM
    const totalTimeSec = timeH * 3600 + timeM * 60 + timeS
    const paceSecPerUnit = paceMin * 60 + paceSec
    const paceSecPerKm = paceUnit === 'km' ? paceSecPerUnit : paceSecPerUnit * MILE_PER_KM
    const paceSecPerMile = paceUnit === 'mile' ? paceSecPerUnit : paceSecPerUnit * KM_PER_MILE

    if (mode === 'pace') {
      // Calculate pace from distance + time
      if (distKm <= 0 || totalTimeSec <= 0) return null
      const calcPacePerKm = totalTimeSec / distKm
      const calcPacePerMile = totalTimeSec / distMiles
      return {
        mode: 'pace' as const,
        pacePerKm: calcPacePerKm,
        pacePerMile: calcPacePerMile,
        distKm,
        distMiles,
        totalTimeSec,
      }
    }

    if (mode === 'time') {
      // Calculate time from distance + pace
      if (distKm <= 0 || paceSecPerKm <= 0) return null
      const calcTimeSec = paceSecPerKm * distKm
      return {
        mode: 'time' as const,
        totalTimeSec: calcTimeSec,
        distKm,
        distMiles,
        pacePerKm: paceSecPerKm,
        pacePerMile: paceSecPerMile,
      }
    }

    // mode === 'distance': Calculate distance from time + pace
    if (totalTimeSec <= 0 || paceSecPerKm <= 0) return null
    const calcDistKm = totalTimeSec / paceSecPerKm
    const calcDistMiles = calcDistKm * MILE_PER_KM
    return {
      mode: 'distance' as const,
      distKm: calcDistKm,
      distMiles: calcDistMiles,
      totalTimeSec,
      pacePerKm: paceSecPerKm,
      pacePerMile: paceSecPerMile,
    }
  }, [mode, distValue, distUnit, timeH, timeM, timeS, paceMin, paceSec, paceUnit])

  // Splits table data
  const splits = useMemo(() => {
    if (!results || results.pacePerKm <= 0) return []
    const distKm = results.distKm
    const pacePerKm = results.pacePerKm
    const maxSplits = 42
    const count = Math.min(Math.ceil(distKm), maxSplits)
    const rows: { num: number; dist: string; cumTime: string }[] = []
    for (let i = 1; i <= count; i++) {
      const km = Math.min(i, distKm)
      const cumSec = km * pacePerKm
      rows.push({
        num: i,
        dist: `${km.toFixed(km === Math.floor(km) ? 0 : 2)} km`,
        cumTime: formatTime(cumSec, true),
      })
    }
    return rows
  }, [results])

  // Equivalent race times
  const raceTimes = useMemo(() => {
    if (!results || results.pacePerKm <= 0) return null
    return racePresets.map(r => ({
      label: r.label,
      distLabel: `${r.km === 42.195 ? '42.2' : r.km === 21.0975 ? '21.1' : r.km} km`,
      time: formatTime(r.km * results.pacePerKm, true),
    }))
  }, [results])

  const handlePreset = (km: number) => {
    setDistValue(parseFloat(km.toFixed(4)))
    setDistUnit('km')
  }

  const modeBtn = (m: Mode, label: string): React.CSSProperties => ({
    flex: 1, padding: '10px 0', border: 'none', borderRadius: 10, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: mode === m ? accent : 'transparent',
    color: mode === m ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const presetBtn = (km: number): React.CSSProperties => ({
    padding: '7px 14px', border: `1.5px solid ${distValue === km && distUnit === 'km' ? accent : '#E8E4DB'}`,
    borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: fb,
    background: distValue === km && distUnit === 'km' ? accent + '12' : '#fff',
    color: distValue === km && distUnit === 'km' ? accent : '#6B6560',
    transition: 'all .2s',
  })

  const thStyle: React.CSSProperties = {
    padding: '8px 12px', fontSize: 11, fontWeight: 600, color: '#9A958A',
    textTransform: 'uppercase', letterSpacing: '.5px', textAlign: 'left',
    borderBottom: '1.5px solid #E8E4DB',
  }

  const tdStyle: React.CSSProperties = {
    padding: '8px 12px', fontSize: 13, fontFamily: fm, color: '#1C1B18',
    borderBottom: '1px solid #F0EDE6',
  }

  return (
    <ToolShell name="Running Pace Calculator" icon="🏃" currentPath="/pace-calculator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏃</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Running Pace Calculator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Running Pace <span style={{ color: accent }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>
            Calculate pace, time, or distance for any run. Get split times and equivalent race paces.
          </p>
        </section>

        {/* Mode toggle */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', gap: 4, background: '#F0EDE6', borderRadius: 12, padding: 4 }}>
            <button style={modeBtn('pace', 'Pace')} onClick={() => setMode('pace')}>Calculate Pace</button>
            <button style={modeBtn('time', 'Time')} onClick={() => setMode('time')}>Calculate Time</button>
            <button style={modeBtn('distance', 'Distance')} onClick={() => setMode('distance')}>Calculate Distance</button>
          </div>
        </section>

        {/* Race presets */}
        {mode !== 'distance' && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
            <div style={labelStyle}>Race Presets</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {racePresets.map(r => (
                <button key={r.label} style={presetBtn(r.km)} onClick={() => handlePreset(r.km)}>
                  {r.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={cardStyle}>
            {/* Distance input — shown in pace and time modes */}
            {(mode === 'pace' || mode === 'time') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Distance</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={distValue}
                    onChange={e => setDistValue(parseFloat(e.target.value) || 0)}
                    style={{ ...inputStyle, flex: 2 }}
                  />
                  <select
                    value={distUnit}
                    onChange={e => setDistUnit(e.target.value as DistUnit)}
                    style={{ ...selectStyle, flex: 1 }}
                  >
                    <option value="km">km</option>
                    <option value="miles">miles</option>
                  </select>
                </div>
              </div>
            )}

            {/* Time input — shown in pace and distance modes */}
            {(mode === 'pace' || mode === 'distance') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Time</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={timeH}
                      onChange={e => setTimeH(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ ...inputStyle, textAlign: 'center' }}
                      placeholder="h"
                    />
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>hours</div>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#9A958A' }}>:</span>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={timeM}
                      onChange={e => setTimeM(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                      style={{ ...inputStyle, textAlign: 'center' }}
                      placeholder="m"
                    />
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>min</div>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#9A958A' }}>:</span>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={timeS}
                      onChange={e => setTimeS(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                      style={{ ...inputStyle, textAlign: 'center' }}
                      placeholder="s"
                    />
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>sec</div>
                  </div>
                </div>
              </div>
            )}

            {/* Pace input — shown in time and distance modes */}
            {(mode === 'time' || mode === 'distance') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Pace</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={paceMin}
                      onChange={e => setPaceMin(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ ...inputStyle, textAlign: 'center' }}
                      placeholder="min"
                    />
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>min</div>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#9A958A' }}>:</span>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={paceSec}
                      onChange={e => setPaceSec(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                      style={{ ...inputStyle, textAlign: 'center' }}
                      placeholder="sec"
                    />
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>sec</div>
                  </div>
                  <select
                    value={paceUnit}
                    onChange={e => setPaceUnit(e.target.value as PaceUnit)}
                    style={{ ...selectStyle, flex: 1.2 }}
                  >
                    <option value="km">per km</option>
                    <option value="mile">per mile</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Main result card */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 16,
            }}>
              {results.mode === 'pace' && (
                <>
                  <div style={labelStyle}>Your Pace</div>
                  <div style={{ fontSize: 44, fontFamily: fm, fontWeight: 700, color: accent }}>
                    {formatPace(results.pacePerKm)} <span style={{ fontSize: 16, fontWeight: 500, color: '#9A958A' }}>/km</span>
                  </div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 600, color: '#6B6560', marginTop: 4 }}>
                    {formatPace(results.pacePerMile)} <span style={{ fontSize: 14, fontWeight: 500, color: '#9A958A' }}>/mile</span>
                  </div>
                </>
              )}
              {results.mode === 'time' && (
                <>
                  <div style={labelStyle}>Total Time</div>
                  <div style={{ fontSize: 44, fontFamily: fm, fontWeight: 700, color: accent }}>
                    {formatTime(results.totalTimeSec, true)}
                  </div>
                </>
              )}
              {results.mode === 'distance' && (
                <>
                  <div style={labelStyle}>Distance</div>
                  <div style={{ fontSize: 44, fontFamily: fm, fontWeight: 700, color: accent }}>
                    {results.distKm.toFixed(2)} <span style={{ fontSize: 16, fontWeight: 500, color: '#9A958A' }}>km</span>
                  </div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 600, color: '#6B6560', marginTop: 4 }}>
                    {results.distMiles.toFixed(2)} <span style={{ fontSize: 14, fontWeight: 500, color: '#9A958A' }}>miles</span>
                  </div>
                </>
              )}
            </div>

            {/* Equivalent race times */}
            {raceTimes && (
              <div style={cardStyle}>
                <div style={labelStyle}>Equivalent Race Times</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Race</th>
                      <th style={thStyle}>Distance</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceTimes.map(r => (
                      <tr key={r.label}>
                        <td style={{ ...tdStyle, fontFamily: fb, fontWeight: 600 }}>{r.label}</td>
                        <td style={tdStyle}>{r.distLabel}</td>
                        <td style={{ ...tdStyle, textAlign: 'right', color: accent, fontWeight: 600 }}>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Split times */}
            {splits.length > 0 && (
              <div style={cardStyle}>
                <div style={labelStyle}>Split Times (per km)</div>
                <div style={{ maxHeight: 400, overflowY: 'auto', marginTop: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Split #</th>
                        <th style={thStyle}>Distance</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>Cumulative Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {splits.map(s => (
                        <tr key={s.num}>
                          <td style={tdStyle}>{s.num}</td>
                          <td style={tdStyle}>{s.dist}</td>
                          <td style={{ ...tdStyle, textAlign: 'right' }}>{s.cumTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Running Pace Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Free running pace calculator for runners of all levels. Calculate your pace per kilometer or mile from distance and time,
            estimate your finish time for any race distance, or find out how far you can run at a given pace. Get per-kilometer split
            times and see equivalent paces for popular race distances including 5K, 10K, half marathon, and marathon.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>How to use this pace calculator</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Choose a calculation mode: calculate your pace from distance and time, calculate your finish time from distance and pace,
            or calculate distance from time and pace. Use the race preset buttons to quickly fill in common race distances like 5K, 10K,
            half marathon (21.1 km), and marathon (42.2 km). The calculator instantly shows split times and equivalent race paces.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>Understanding running pace</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Running pace is expressed as minutes per kilometer (min/km) or minutes per mile (min/mile). A faster pace means a lower number.
            For example, a 5:00/km pace is faster than a 6:00/km pace. Use split times to track your progress during training and races.
            This calculator supports both metric and imperial units with automatic conversion.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            To train more effectively, pair your pace data with our <a href="/heart-rate-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>heart rate zone calculator</a> to ensure you are running at the right intensity for each workout. You can also use the <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>calorie calculator</a> to match your nutrition to your training volume and activity level.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
