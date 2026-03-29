'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#EF4444'

const LABELS: Record<string, Record<Locale, string>> = {
  title:      { en: 'Countdown Timer', fr: 'Compte à Rebours', es: 'Cuenta Regresiva', pt: 'Contagem Regressiva', de: 'Countdown Timer' },
  subtitle:   { en: 'Live countdown to any date or event. Days, hours, minutes, and seconds.', fr: 'Compte à rebours en direct jusqu\'à n\'importe quelle date. Jours, heures, minutes et secondes.', es: 'Cuenta regresiva en vivo hasta cualquier fecha. Días, horas, minutos y segundos.', pt: 'Contagem regressiva ao vivo até qualquer data. Dias, horas, minutos e segundos.', de: 'Live-Countdown bis zu einem beliebigen Datum. Tage, Stunden, Minuten und Sekunden.' },
  targetDate: { en: 'Target Date', fr: 'Date cible', es: 'Fecha objetivo', pt: 'Data alvo', de: 'Zieldatum' },
  targetTime: { en: 'Target Time', fr: 'Heure cible', es: 'Hora objetivo', pt: 'Hora alvo', de: 'Zielzeit' },
  eventName:  { en: 'Event Name (optional)', fr: 'Nom de l\'événement (optionnel)', es: 'Nombre del evento (opcional)', pt: 'Nome do evento (opcional)', de: 'Ereignisname (optional)' },
  quickPresets:{ en: 'Quick Events', fr: 'Événements rapides', es: 'Eventos rápidos', pt: 'Eventos rápidos', de: 'Schnellereignisse' },
  days:       { en: 'Days', fr: 'Jours', es: 'Días', pt: 'Dias', de: 'Tage' },
  hours:      { en: 'Hours', fr: 'Heures', es: 'Horas', pt: 'Horas', de: 'Stunden' },
  minutes:    { en: 'Minutes', fr: 'Minutes', es: 'Minutos', pt: 'Minutos', de: 'Minuten' },
  seconds:    { en: 'Seconds', fr: 'Secondes', es: 'Segundos', pt: 'Segundos', de: 'Sekunden' },
  expired:    { en: 'This event has already passed', fr: 'Cet événement est déjà passé', es: 'Este evento ya pasó', pt: 'Este evento já passou', de: 'Dieses Ereignis ist bereits vorbei' },
  countdown:  { en: 'countdown to', fr: 'compte à rebours pour', es: 'cuenta regresiva para', pt: 'contagem para', de: 'Countdown für' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

const PRESETS = [
  { label: 'Christmas 2026', date: '2026-12-25', time: '00:00' },
  { label: 'New Year 2027', date: '2027-01-01', time: '00:00' },
  { label: 'Halloween 2026', date: '2026-10-31', time: '00:00' },
  { label: "Valentine's 2027", date: '2027-02-14', time: '00:00' },
  { label: 'Summer 2026', date: '2026-06-21', time: '00:00' },
  { label: 'Thanksgiving 2026', date: '2026-11-26', time: '00:00' },
]

function pad(n: number) { return String(n).padStart(2, '0') }

interface Props { defaultDate?: string; defaultName?: string; locale?: Locale }

export default function CountdownClient({ defaultDate = '', defaultName = '', locale = 'en' }: Props) {
  const [targetDate, setTargetDate] = useState(defaultDate || '2027-01-01')
  const [targetTime, setTargetTime] = useState('00:00')
  const [eventName, setEventName] = useState(defaultName || 'New Year 2027')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [])

  const { days, hours, minutes, seconds, expired } = (() => {
    if (!now) return { days: '--', hours: '--', minutes: '--', seconds: '--', expired: false }
    const target = new Date(`${targetDate}T${targetTime}:00`)
    const delta = target.getTime() - now.getTime()
    if (delta <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true }
    const totalSecs = Math.floor(delta / 1000)
    return {
      days: String(Math.floor(totalSecs / 86400)),
      hours: pad(Math.floor((totalSecs % 86400) / 3600)),
      minutes: pad(Math.floor((totalSecs % 3600) / 60)),
      seconds: pad(totalSecs % 60),
      expired: false,
    }
  })()

  const unitCard = (value: string, label: string) => (
    <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16, padding: '24px 20px', textAlign: 'center', flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 52, fontWeight: 800, color: expired ? '#9A958A' : accent, fontFamily: fm, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#9A958A', marginTop: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>{label}</div>
    </div>
  )

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4,
  }

  return (
    <ToolShell name={L('title', locale)} icon="⏳" currentPath="/countdown" locale={locale}>
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 28, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Quick presets */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('quickPresets', locale)}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => { setTargetDate(p.date); setTargetTime(p.time); setEventName(p.label) }}
                style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${targetDate === p.date ? accent : '#E8E4DB'}`, background: targetDate === p.date ? accent : '#fff', color: targetDate === p.date ? '#fff' : '#4B4843', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: fb }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div>
            <label style={labelStyle}>{L('targetDate', locale)}</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{L('targetTime', locale)}</label>
            <input type="time" value={targetTime} onChange={e => setTargetTime(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{L('eventName', locale)}</label>
            <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} style={inputStyle} placeholder="My Event" />
          </div>
        </div>

        {/* Display */}
        {eventName && (
          <div style={{ fontSize: 13, color: '#9A958A', textAlign: 'center', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>
            {L('countdown', locale)} <span style={{ color: accent }}>{eventName}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
          {unitCard(days, L('days', locale))}
          {unitCard(hours, L('hours', locale))}
          {unitCard(minutes, L('minutes', locale))}
          {unitCard(seconds, L('seconds', locale))}
        </div>

        {expired && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '12px 16px', textAlign: 'center', color: '#DC2626', fontSize: 14, fontWeight: 600 }}>
            {L('expired', locale)}
          </div>
        )}
      </div>
    </ToolShell>
  )
}
