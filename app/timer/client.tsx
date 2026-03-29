'use client'
import { useState, useRef, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#8B5CF6'

const LABELS: Record<string, Record<Locale, string>> = {
  title:    { en: 'Online Timer', fr: 'Minuteur en Ligne', es: 'Temporizador Online', pt: 'Temporizador Online', de: 'Timer Online' },
  subtitle: { en: 'Set a countdown timer up to 99 hours. Quick presets and audio alert when done.', fr: 'Réglez un minuteur jusqu\'à 99 heures. Préréglages rapides et alarme sonore à la fin.', es: 'Configura un temporizador hasta 99 horas. Preajustes rápidos y alarma sonora al terminar.', pt: 'Configure um temporizador até 99 horas. Atalhos rápidos e alarme sonoro ao terminar.', de: 'Stellen Sie einen Timer bis zu 99 Stunden ein. Schnellvorwahl und Ton-Alarm am Ende.' },
  hours:    { en: 'Hours', fr: 'Heures', es: 'Horas', pt: 'Horas', de: 'Stunden' },
  minutes:  { en: 'Minutes', fr: 'Minutes', es: 'Minutos', pt: 'Minutos', de: 'Minuten' },
  seconds:  { en: 'Seconds', fr: 'Secondes', es: 'Segundos', pt: 'Segundos', de: 'Sekunden' },
  start:    { en: 'Start', fr: 'Démarrer', es: 'Iniciar', pt: 'Iniciar', de: 'Start' },
  pause:    { en: 'Pause', fr: 'Pause', es: 'Pausar', pt: 'Pausar', de: 'Pause' },
  resume:   { en: 'Resume', fr: 'Reprendre', es: 'Reanudar', pt: 'Retomar', de: 'Fortsetzen' },
  reset:    { en: 'Reset', fr: 'Réinitialiser', es: 'Reiniciar', pt: 'Reiniciar', de: 'Zurücksetzen' },
  done:     { en: "Time's up!", fr: 'Temps écoulé !', es: '¡Tiempo!', pt: 'Tempo esgotado!', de: 'Zeit abgelaufen!' },
  presets:  { en: 'Quick presets', fr: 'Préréglages rapides', es: 'Preajustes rápidos', pt: 'Atalhos rápidos', de: 'Schnellvorwahl' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

const PRESETS = [1, 2, 3, 5, 10, 15, 30, 60]

function pad(n: number) { return String(Math.floor(n)).padStart(2, '0') }
function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function beep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.5)
  } catch {}
}

interface Props { defaultMinutes?: number; locale?: Locale }

export default function TimerClient({ defaultMinutes = 5, locale = 'en' }: Props) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(defaultMinutes)
  const [seconds, setSeconds] = useState(0)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const endTimeRef = useRef<number>(0)
  const pausedRemainingRef = useRef<number>(0)

  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000

  function startTimer() {
    const ms = remaining !== null ? remaining : totalMs
    if (ms <= 0) return
    endTimeRef.current = Date.now() + ms
    setDone(false)
    intervalRef.current = setInterval(() => {
      const rem = endTimeRef.current - Date.now()
      if (rem <= 0) {
        clearInterval(intervalRef.current!)
        setRemaining(0)
        setRunning(false)
        setDone(true)
        beep()
      } else {
        setRemaining(rem)
      }
    }, 100)
    setRunning(true)
  }

  function pauseTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    pausedRemainingRef.current = endTimeRef.current - Date.now()
    setRemaining(pausedRemainingRef.current)
    setRunning(false)
  }

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRemaining(null)
    setRunning(false)
    setDone(false)
  }

  function applyPreset(mins: number) {
    resetTimer()
    setHours(0)
    setMinutes(mins < 60 ? mins : 60)
    setSeconds(0)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const display = remaining !== null ? remaining : totalMs
  const progress = display > 0 && totalMs > 0 ? display / totalMs : done ? 0 : 1

  const radius = 90
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
    padding: '10px 12px', fontSize: 16, fontFamily: fm, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', boxSizing: 'border-box', textAlign: 'center',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4, textAlign: 'center',
  }
  const btnBase: React.CSSProperties = {
    padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
    fontSize: 16, fontWeight: 700, fontFamily: fb,
  }

  return (
    <ToolShell name={L('title', locale)} icon="⏲️" currentPath="/timer" locale={locale}>
      <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Presets */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('presets', locale)}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PRESETS.map(p => (
              <button key={p} onClick={() => applyPreset(p)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1.5px solid #E8E4DB', background: (minutes === p && hours === 0 && seconds === 0 && remaining === null) ? accent : '#fff', color: (minutes === p && hours === 0 && seconds === 0 && remaining === null) ? '#fff' : '#4B4843', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: fb }}>
                {p < 60 ? `${p}m` : '1h'}
              </button>
            ))}
          </div>
        </div>

        {/* Time inputs */}
        {!running && remaining === null && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>{L('hours', locale)}</label>
              <input type="number" min={0} max={99} value={hours} onChange={e => setHours(Math.max(0, Math.min(99, Number(e.target.value))))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{L('minutes', locale)}</label>
              <input type="number" min={0} max={59} value={minutes} onChange={e => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{L('seconds', locale)}</label>
              <input type="number" min={0} max={59} value={seconds} onChange={e => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))} style={inputStyle} />
            </div>
          </div>
        )}

        {/* SVG progress ring + timer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <svg width="220" height="220" viewBox="0 0 200 200" style={{ display: 'block' }}>
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#F0EDE6" strokeWidth="10" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke={done ? '#EF4444' : accent} strokeWidth="10"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              strokeLinecap="round" transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset .1s linear' }} />
            <text x="100" y="108" textAnchor="middle" fontFamily={fm} fontSize="28" fontWeight="800"
              fill={done ? '#EF4444' : '#1C1B18'}>
              {formatTime(display)}
            </text>
          </svg>

          {done && (
            <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '12px 24px', color: '#DC2626', fontWeight: 700, fontSize: 18, marginTop: 8 }}>
              {L('done', locale)}
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {!running ? (
            <button onClick={startTimer} disabled={display <= 0}
              style={{ ...btnBase, background: accent, color: '#fff', opacity: display <= 0 ? .4 : 1 }}>
              {remaining !== null ? L('resume', locale) : L('start', locale)}
            </button>
          ) : (
            <button onClick={pauseTimer} style={{ ...btnBase, background: '#F59E0B', color: '#fff' }}>{L('pause', locale)}</button>
          )}
          <button onClick={resetTimer} style={{ ...btnBase, background: '#F5F3EE', color: '#4B4843', border: '1.5px solid #E8E4DB' }}>{L('reset', locale)}</button>
        </div>
      </div>
    </ToolShell>
  )
}
