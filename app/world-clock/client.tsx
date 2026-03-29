'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#DC2626'

const LABELS: Record<string, Record<Locale, string>> = {
  title:    { en: 'World Clock', fr: 'Horloge Mondiale', es: 'Reloj Mundial', pt: 'Relógio Mundial', de: 'Weltzeituhr' },
  subtitle: { en: 'Current time in cities around the world. Live updating clocks.', fr: 'Heure actuelle dans les villes du monde. Horloges en direct.', es: 'Hora actual en ciudades de todo el mundo. Relojes en vivo.', pt: 'Hora atual em cidades ao redor do mundo. Relógios ao vivo.', de: 'Aktuelle Uhrzeit in Städten weltweit. Live-Uhren.' },
  addCity:  { en: 'Add city', fr: 'Ajouter une ville', es: 'Agregar ciudad', pt: 'Adicionar cidade', de: 'Stadt hinzufügen' },
  remove:   { en: 'Remove', fr: 'Supprimer', es: 'Eliminar', pt: 'Remover', de: 'Entfernen' },
  day:      { en: 'Day', fr: 'Jour', es: 'Día', pt: 'Dia', de: 'Tag' },
  night:    { en: 'Night', fr: 'Nuit', es: 'Noche', pt: 'Noite', de: 'Nacht' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

const ALL_CITIES = [
  { id: 'America/New_York',    name: 'New York',     flag: '🇺🇸' },
  { id: 'Europe/London',       name: 'London',       flag: '🇬🇧' },
  { id: 'Europe/Paris',        name: 'Paris',        flag: '🇫🇷' },
  { id: 'Asia/Tokyo',          name: 'Tokyo',        flag: '🇯🇵' },
  { id: 'Australia/Sydney',    name: 'Sydney',       flag: '🇦🇺' },
  { id: 'Asia/Dubai',          name: 'Dubai',        flag: '🇦🇪' },
  { id: 'Asia/Singapore',      name: 'Singapore',    flag: '🇸🇬' },
  { id: 'Asia/Hong_Kong',      name: 'Hong Kong',    flag: '🇭🇰' },
  { id: 'Asia/Kolkata',        name: 'Mumbai',       flag: '🇮🇳' },
  { id: 'America/Sao_Paulo',   name: 'São Paulo',    flag: '🇧🇷' },
  { id: 'Europe/Berlin',       name: 'Berlin',       flag: '🇩🇪' },
  { id: 'America/Los_Angeles', name: 'Los Angeles',  flag: '🇺🇸' },
  { id: 'America/Chicago',     name: 'Chicago',      flag: '🇺🇸' },
  { id: 'America/Toronto',     name: 'Toronto',      flag: '🇨🇦' },
  { id: 'America/Mexico_City', name: 'Mexico City',  flag: '🇲🇽' },
  { id: 'Europe/Moscow',       name: 'Moscow',       flag: '🇷🇺' },
  { id: 'Europe/Madrid',       name: 'Madrid',       flag: '🇪🇸' },
  { id: 'Europe/Rome',         name: 'Rome',         flag: '🇮🇹' },
  { id: 'Europe/Amsterdam',    name: 'Amsterdam',    flag: '🇳🇱' },
  { id: 'Africa/Cairo',        name: 'Cairo',        flag: '🇪🇬' },
  { id: 'Africa/Johannesburg', name: 'Johannesburg', flag: '🇿🇦' },
  { id: 'Asia/Shanghai',       name: 'Shanghai',     flag: '🇨🇳' },
  { id: 'Asia/Seoul',          name: 'Seoul',        flag: '🇰🇷' },
  { id: 'Asia/Bangkok',        name: 'Bangkok',      flag: '🇹🇭' },
  { id: 'Pacific/Auckland',    name: 'Auckland',     flag: '🇳🇿' },
  { id: 'Pacific/Honolulu',    name: 'Honolulu',     flag: '🇺🇸' },
  { id: 'America/Buenos_Aires',name: 'Buenos Aires', flag: '🇦🇷' },
  { id: 'America/Lima',        name: 'Lima',         flag: '🇵🇪' },
  { id: 'America/Bogota',      name: 'Bogotá',       flag: '🇨🇴' },
  { id: 'America/Santiago',    name: 'Santiago',     flag: '🇨🇱' },
  { id: 'Europe/Lisbon',       name: 'Lisbon',       flag: '🇵🇹' },
  { id: 'Europe/Warsaw',       name: 'Warsaw',       flag: '🇵🇱' },
  { id: 'Europe/Stockholm',    name: 'Stockholm',    flag: '🇸🇪' },
  { id: 'Asia/Jakarta',        name: 'Jakarta',      flag: '🇮🇩' },
  { id: 'Asia/Karachi',        name: 'Karachi',      flag: '🇵🇰' },
  { id: 'Asia/Tehran',         name: 'Tehran',       flag: '🇮🇷' },
  { id: 'Asia/Riyadh',         name: 'Riyadh',       flag: '🇸🇦' },
  { id: 'Africa/Lagos',        name: 'Lagos',        flag: '🇳🇬' },
  { id: 'Africa/Nairobi',      name: 'Nairobi',      flag: '🇰🇪' },
  { id: 'UTC',                 name: 'UTC',          flag: '🌐' },
]

const DEFAULT_CITIES = ALL_CITIES.slice(0, 12).map(c => c.id)

function getTimeData(tz: string, now: Date) {
  try {
    const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' })
    const offsetFmt = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'shortOffset' })
    const offsetStr = offsetFmt.format(now)
    const offsetMatch = offsetStr.match(/GMT([+-]\d+(?::\d+)?)?/)
    const offset = offsetMatch ? (offsetMatch[0] || 'GMT') : 'GMT'
    const hourFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false })
    const hour = parseInt(hourFmt.format(now))
    const isDay = hour >= 6 && hour < 20
    return { time: timeFmt.format(now), date: dateFmt.format(now), offset, isDay }
  } catch {
    return { time: '--:--:--', date: '---', offset: 'GMT', isDay: true }
  }
}

interface Props { defaultCities?: string[]; locale?: Locale }

export default function WorldClockClient({ defaultCities, locale = 'en' }: Props) {
  const [cities, setCities] = useState<string[]>(defaultCities || DEFAULT_CITIES)
  const [now, setNow] = useState<Date | null>(null)
  const [addValue, setAddValue] = useState('')

  useEffect(() => {
    setNow(new Date())
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [])

  const available = ALL_CITIES.filter(c => !cities.includes(c.id))

  function addCity() {
    if (addValue && !cities.includes(addValue)) {
      setCities(prev => [...prev, addValue])
      setAddValue('')
    }
  }
  function removeCity(id: string) {
    setCities(prev => prev.filter(c => c !== id))
  }

  const inputStyle: React.CSSProperties = {
    border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '8px 12px', fontSize: 14,
    fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none',
  }

  return (
    <ToolShell name={L('title', locale)} icon="🌍" currentPath="/world-clock" locale={locale}>
      <div style={{ maxWidth: 860, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Add city */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <select value={addValue} onChange={e => setAddValue(e.target.value)} style={{ ...inputStyle, flex: 1, cursor: 'pointer', appearance: 'none' as const }}>
            <option value="">— {L('addCity', locale)} —</option>
            {available.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
          </select>
          <button onClick={addCity} disabled={!addValue}
            style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontWeight: 700, cursor: addValue ? 'pointer' : 'not-allowed', opacity: addValue ? 1 : .5, fontFamily: fb, fontSize: 14 }}>
            + {L('addCity', locale)}
          </button>
        </div>

        {/* City grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {cities.map(id => {
            const city = ALL_CITIES.find(c => c.id === id)
            if (!city) return null
            const data = now ? getTimeData(id, now) : { time: '--:--:--', date: '---', offset: '', isDay: true }
            return (
              <div key={id} style={{ background: data.isDay ? '#fff' : '#1C1B18', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: '16px', position: 'relative', transition: 'background .3s' }}>
                <button onClick={() => removeCity(id)} title={L('remove', locale)}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', color: data.isDay ? '#9A958A' : '#6B6860', fontSize: 14, lineHeight: 1 }}>×</button>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{city.flag}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: data.isDay ? '#1C1B18' : '#FAFAF8', marginBottom: 2 }}>{city.name}</div>
                <div style={{ fontFamily: fm, fontSize: 24, fontWeight: 800, color: data.isDay ? accent : '#F87171', lineHeight: 1.2, marginBottom: 4 }}>
                  {data.time}
                </div>
                <div style={{ fontSize: 12, color: data.isDay ? '#9A958A' : '#6B6860' }}>{data.date}</div>
                <div style={{ fontSize: 11, color: data.isDay ? '#B8B3A7' : '#4B4843', marginTop: 2 }}>
                  {data.offset} · {data.isDay ? '☀️' : '🌙'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ToolShell>
  )
}
