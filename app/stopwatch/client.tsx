'use client'
import { useState, useRef } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#059669'

const LABELS: Record<string, Record<Locale, string>> = {
  title:    { en: 'Stopwatch', fr: 'Chronomètre', es: 'Cronómetro', pt: 'Cronômetro', de: 'Stoppuhr' },
  subtitle: { en: 'Millisecond precision stopwatch with lap times. No download needed.', fr: 'Chronomètre avec précision à la milliseconde et temps de tours.', es: 'Cronómetro con precisión de milisegundos y tiempos de vuelta.', pt: 'Cronômetro com precisão de milissegundos e tempos de volta.', de: 'Stoppuhr mit Millisekundengenauigkeit und Rundenzeiten.' },
  start:    { en: 'Start', fr: 'Démarrer', es: 'Iniciar', pt: 'Iniciar', de: 'Start' },
  stop:     { en: 'Stop', fr: 'Arrêter', es: 'Parar', pt: 'Parar', de: 'Stopp' },
  lap:      { en: 'Lap', fr: 'Tour', es: 'Vuelta', pt: 'Volta', de: 'Runde' },
  reset:    { en: 'Reset', fr: 'Réinitialiser', es: 'Reiniciar', pt: 'Reiniciar', de: 'Zurücksetzen' },
  laps:     { en: 'Lap Times', fr: 'Temps de tours', es: 'Tiempos de vuelta', pt: 'Tempos de volta', de: 'Rundenzeiten' },
  best:     { en: 'Best', fr: 'Meilleur', es: 'Mejor', pt: 'Melhor', de: 'Beste' },
  worst:    { en: 'Worst', fr: 'Pire', es: 'Peor', pt: 'Pior', de: 'Schlechtste' },
  avg:      { en: 'Avg lap', fr: 'Moy. tour', es: 'Promedio', pt: 'Média', de: 'Ø Runde' },
  noLaps:   { en: 'No laps recorded yet', fr: 'Aucun tour enregistré', es: 'No hay vueltas registradas', pt: 'Nenhuma volta registrada', de: 'Noch keine Runden' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

function fmt(ms: number) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const cs = Math.floor((ms % 1000) / 10)
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
}

interface Props { locale?: Locale }

export default function StopwatchClient({ locale = 'en' }: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const [lastLapMs, setLastLapMs] = useState(0)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(0)
  const baseRef = useRef(0)

  function start() {
    startRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      setElapsed(baseRef.current + (Date.now() - startRef.current))
    }, 10)
    setRunning(true)
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    baseRef.current = baseRef.current + (Date.now() - startRef.current)
    setRunning(false)
  }

  function lap() {
    setLaps(prev => {
      const lapTime = baseRef.current + (Date.now() - startRef.current) - lastLapMs
      setLastLapMs(baseRef.current + (Date.now() - startRef.current))
      return [...prev, lapTime]
    })
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    baseRef.current = 0
    setElapsed(0)
    setRunning(false)
    setLaps([])
    setLastLapMs(0)
  }

  const minLap = laps.length > 0 ? Math.min(...laps) : -1
  const maxLap = laps.length > 0 ? Math.max(...laps) : -1
  const avgLap = laps.length > 0 ? laps.reduce((a, b) => a + b, 0) / laps.length : 0

  const btnBase: React.CSSProperties = {
    padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
    fontSize: 16, fontWeight: 700, fontFamily: fb, transition: 'opacity .15s',
  }

  return (
    <ToolShell name={L('title', locale)} icon="⏱️" currentPath="/stopwatch" locale={locale}>
      <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 28, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Main timer display */}
        <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 20, padding: '32px', textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 800, fontFamily: fm, color: running ? accent : '#1C1B18', letterSpacing: 2, lineHeight: 1 }}>
            {fmt(elapsed)}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
          {!running ? (
            <button onClick={start} style={{ ...btnBase, background: accent, color: '#fff', minWidth: 120 }}>{L('start', locale)}</button>
          ) : (
            <button onClick={stop} style={{ ...btnBase, background: '#EF4444', color: '#fff', minWidth: 120 }}>{L('stop', locale)}</button>
          )}
          <button onClick={lap} disabled={!running} style={{ ...btnBase, background: '#F5F3EE', color: '#4B4843', border: '1.5px solid #E8E4DB', opacity: running ? 1 : .4 }}>{L('lap', locale)}</button>
          <button onClick={reset} style={{ ...btnBase, background: '#F5F3EE', color: '#4B4843', border: '1.5px solid #E8E4DB' }}>{L('reset', locale)}</button>
        </div>

        {/* Lap stats */}
        {laps.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#ECFDF5', border: '1.5px solid #6EE7B7', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#059669', fontFamily: fm }}>{fmt(minLap)}</div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{L('best', locale)}</div>
            </div>
            <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', fontFamily: fm }}>{fmt(maxLap)}</div>
              <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{L('worst', locale)}</div>
            </div>
            <div style={{ background: '#F5F3EE', border: '1.5px solid #E8E4DB', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1B18', fontFamily: fm }}>{fmt(avgLap)}</div>
              <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{L('avg', locale)}</div>
            </div>
          </div>
        )}

        {/* Lap list */}
        <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0EDE6', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{L('laps', locale)}</div>
          {laps.length === 0 ? (
            <div style={{ padding: '20px 16px', color: '#9A958A', fontSize: 14, textAlign: 'center' }}>{L('noLaps', locale)}</div>
          ) : (
            <div style={{ maxHeight: 240, overflowY: 'auto' }}>
              {[...laps].reverse().map((lapMs, i) => {
                const idx = laps.length - i
                const isBest = lapMs === minLap
                const isWorst = lapMs === maxLap
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #F0EDE6', background: isBest ? '#ECFDF5' : isWorst ? '#FEF2F2' : 'transparent' }}>
                    <span style={{ color: '#9A958A', fontSize: 13 }}>#{idx}</span>
                    <span style={{ fontFamily: fm, fontWeight: 600, color: isBest ? '#059669' : isWorst ? '#DC2626' : '#1C1B18', fontSize: 14 }}>{fmt(lapMs)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  )
}
