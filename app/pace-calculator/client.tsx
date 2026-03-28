'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

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

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'Running Pace Calculator', fr: 'Calculateur d\'allure de course', es: 'Calculadora de ritmo de carrera', pt: 'Calculadora de ritmo de corrida', de: 'Laufpace-Rechner' },
  titleA: { en: 'Running Pace', fr: 'Calculateur d\'allure', es: 'Calculadora de ritmo', pt: 'Calculadora de ritmo', de: 'Laufpace' },
  titleB: { en: 'Calculator', fr: 'de course', es: 'de carrera', pt: 'de corrida', de: 'Rechner' },
  subtitle: {
    en: 'Calculate pace, time, or distance for any run. Get split times and equivalent race paces.',
    fr: 'Calculez l\'allure, le temps ou la distance pour toute course. Obtenez les temps intermédiaires et les allures équivalentes.',
    es: 'Calcule el ritmo, tiempo o distancia de cualquier carrera. Obtenga tiempos parciales y ritmos equivalentes.',
    pt: 'Calcule o ritmo, tempo ou distância de qualquer corrida. Obtenha tempos parciais e ritmos equivalentes.',
    de: 'Berechnen Sie Pace, Zeit oder Distanz für jeden Lauf. Erhalten Sie Zwischenzeiten und äquivalente Rennpaces.',
  },

  calcPace: { en: 'Calculate Pace', fr: 'Calculer l\'allure', es: 'Calcular ritmo', pt: 'Calcular ritmo', de: 'Pace berechnen' },
  calcTime: { en: 'Calculate Time', fr: 'Calculer le temps', es: 'Calcular tiempo', pt: 'Calcular tempo', de: 'Zeit berechnen' },
  calcDistance: { en: 'Calculate Distance', fr: 'Calculer la distance', es: 'Calcular distancia', pt: 'Calcular distância', de: 'Distanz berechnen' },

  racePresets: { en: 'Race Presets', fr: 'Distances prédéfinies', es: 'Distancias predefinidas', pt: 'Distâncias predefinidas', de: 'Rennvoreinstellungen' },
  halfMarathon: { en: 'Half Marathon', fr: 'Semi-marathon', es: 'Media maratón', pt: 'Meia maratona', de: 'Halbmarathon' },
  marathon: { en: 'Marathon', fr: 'Marathon', es: 'Maratón', pt: 'Maratona', de: 'Marathon' },

  distance: { en: 'Distance', fr: 'Distance', es: 'Distancia', pt: 'Distância', de: 'Distanz' },
  time: { en: 'Time', fr: 'Temps', es: 'Tiempo', pt: 'Tempo', de: 'Zeit' },
  pace: { en: 'Pace', fr: 'Allure', es: 'Ritmo', pt: 'Ritmo', de: 'Pace' },
  hours: { en: 'hours', fr: 'heures', es: 'horas', pt: 'horas', de: 'Stunden' },
  min: { en: 'min', fr: 'min', es: 'min', pt: 'min', de: 'Min' },
  sec: { en: 'sec', fr: 'sec', es: 'seg', pt: 'seg', de: 'Sek' },
  perKm: { en: 'per km', fr: 'par km', es: 'por km', pt: 'por km', de: 'pro km' },
  perMile: { en: 'per mile', fr: 'par mile', es: 'por milla', pt: 'por milha', de: 'pro Meile' },

  yourPace: { en: 'Your Pace', fr: 'Votre allure', es: 'Su ritmo', pt: 'Seu ritmo', de: 'Ihr Pace' },
  totalTime: { en: 'Total Time', fr: 'Temps total', es: 'Tiempo total', pt: 'Tempo total', de: 'Gesamtzeit' },

  equivalentRaceTimes: { en: 'Equivalent Race Times', fr: 'Temps de course équivalents', es: 'Tiempos de carrera equivalentes', pt: 'Tempos de corrida equivalentes', de: 'Äquivalente Rennzeiten' },
  race: { en: 'Race', fr: 'Course', es: 'Carrera', pt: 'Corrida', de: 'Rennen' },
  estimatedTime: { en: 'Estimated Time', fr: 'Temps estimé', es: 'Tiempo estimado', pt: 'Tempo estimado', de: 'Geschätzte Zeit' },

  splitTimes: { en: 'Split Times (per km)', fr: 'Temps intermédiaires (par km)', es: 'Tiempos parciales (por km)', pt: 'Tempos parciais (por km)', de: 'Zwischenzeiten (pro km)' },
  splitNum: { en: 'Split #', fr: 'Split #', es: 'Parcial #', pt: 'Parcial #', de: 'Split #' },
  cumulativeTime: { en: 'Cumulative Time', fr: 'Temps cumulé', es: 'Tiempo acumulado', pt: 'Tempo acumulado', de: 'Kumulierte Zeit' },

  // SEO
  seoH2: {
    en: 'Free Running Pace Calculator',
    fr: 'Calculateur d\'allure de course gratuit',
    es: 'Calculadora de ritmo de carrera gratuita',
    pt: 'Calculadora de ritmo de corrida gratuita',
    de: 'Kostenloser Laufpace-Rechner',
  },
  seoP1: {
    en: 'Free running pace calculator for runners of all levels. Calculate your pace per kilometer or mile from distance and time, estimate your finish time for any race distance, or find out how far you can run at a given pace. Get per-kilometer split times and see equivalent paces for popular race distances including 5K, 10K, half marathon, and marathon.',
    fr: 'Calculateur d\'allure de course gratuit pour les coureurs de tous niveaux. Calculez votre allure par kilomètre ou par mile à partir de la distance et du temps, estimez votre temps d\'arrivée pour n\'importe quelle distance de course, ou découvrez quelle distance vous pouvez parcourir à une allure donnée. Obtenez les temps intermédiaires par kilomètre et consultez les allures équivalentes pour les distances de course populaires, dont le 5 km, 10 km, semi-marathon et marathon.',
    es: 'Calculadora de ritmo de carrera gratuita para corredores de todos los niveles. Calcule su ritmo por kilómetro o milla a partir de la distancia y el tiempo, estime su tiempo de llegada para cualquier distancia de carrera, o descubra qué distancia puede correr a un ritmo dado. Obtenga tiempos parciales por kilómetro y vea ritmos equivalentes para distancias populares como 5K, 10K, media maratón y maratón.',
    pt: 'Calculadora de ritmo de corrida gratuita para corredores de todos os níveis. Calcule seu ritmo por quilômetro ou milha a partir da distância e tempo, estime seu tempo de chegada para qualquer distância de corrida, ou descubra até onde pode correr em um determinado ritmo. Obtenha tempos parciais por quilômetro e veja ritmos equivalentes para distâncias populares como 5K, 10K, meia maratona e maratona.',
    de: 'Kostenloser Laufpace-Rechner für Läufer aller Leistungsstufen. Berechnen Sie Ihren Pace pro Kilometer oder Meile aus Distanz und Zeit, schätzen Sie Ihre Zielzeit für jede Renndistanz, oder finden Sie heraus, wie weit Sie bei einem bestimmten Pace laufen können. Erhalten Sie Zwischenzeiten pro Kilometer und sehen Sie äquivalente Paces für beliebte Renndistanzen wie 5 km, 10 km, Halbmarathon und Marathon.',
  },
  seoH3a: {
    en: 'How to use this pace calculator',
    fr: 'Comment utiliser ce calculateur d\'allure',
    es: 'Cómo usar esta calculadora de ritmo',
    pt: 'Como usar esta calculadora de ritmo',
    de: 'So verwenden Sie diesen Pace-Rechner',
  },
  seoP2: {
    en: 'Choose a calculation mode: calculate your pace from distance and time, calculate your finish time from distance and pace, or calculate distance from time and pace. Use the race preset buttons to quickly fill in common race distances like 5K, 10K, half marathon (21.1 km), and marathon (42.2 km). The calculator instantly shows split times and equivalent race paces.',
    fr: 'Choisissez un mode de calcul : calculez votre allure à partir de la distance et du temps, calculez votre temps d\'arrivée à partir de la distance et de l\'allure, ou calculez la distance à partir du temps et de l\'allure. Utilisez les boutons de distances prédéfinies pour remplir rapidement les distances courantes comme le 5 km, 10 km, semi-marathon (21,1 km) et marathon (42,2 km). Le calculateur affiche instantanément les temps intermédiaires et les allures de course équivalentes.',
    es: 'Elija un modo de cálculo: calcule su ritmo a partir de la distancia y el tiempo, calcule su tiempo de llegada a partir de la distancia y el ritmo, o calcule la distancia a partir del tiempo y el ritmo. Use los botones de distancias predefinidas para completar rápidamente distancias comunes como 5K, 10K, media maratón (21,1 km) y maratón (42,2 km). La calculadora muestra instantáneamente los tiempos parciales y los ritmos de carrera equivalentes.',
    pt: 'Escolha um modo de cálculo: calcule seu ritmo a partir da distância e tempo, calcule seu tempo de chegada a partir da distância e ritmo, ou calcule a distância a partir do tempo e ritmo. Use os botões de distâncias predefinidas para preencher rapidamente distâncias comuns como 5K, 10K, meia maratona (21,1 km) e maratona (42,2 km). A calculadora mostra instantaneamente os tempos parciais e os ritmos de corrida equivalentes.',
    de: 'Wählen Sie einen Berechnungsmodus: Berechnen Sie Ihren Pace aus Distanz und Zeit, berechnen Sie Ihre Zielzeit aus Distanz und Pace, oder berechnen Sie die Distanz aus Zeit und Pace. Verwenden Sie die Voreinstellungen, um schnell gängige Renndistanzen wie 5 km, 10 km, Halbmarathon (21,1 km) und Marathon (42,2 km) einzugeben. Der Rechner zeigt sofort Zwischenzeiten und äquivalente Rennpaces an.',
  },
  seoH3b: {
    en: 'Understanding running pace',
    fr: 'Comprendre l\'allure de course',
    es: 'Entendiendo el ritmo de carrera',
    pt: 'Entendendo o ritmo de corrida',
    de: 'Laufpace verstehen',
  },
  seoP3: {
    en: 'Running pace is expressed as minutes per kilometer (min/km) or minutes per mile (min/mile). A faster pace means a lower number. For example, a 5:00/km pace is faster than a 6:00/km pace. Use split times to track your progress during training and races. This calculator supports both metric and imperial units with automatic conversion.',
    fr: 'L\'allure de course s\'exprime en minutes par kilomètre (min/km) ou minutes par mile (min/mile). Une allure plus rapide signifie un nombre plus petit. Par exemple, une allure de 5:00/km est plus rapide qu\'une allure de 6:00/km. Utilisez les temps intermédiaires pour suivre votre progression pendant l\'entraînement et les courses. Ce calculateur prend en charge les unités métriques et impériales avec conversion automatique.',
    es: 'El ritmo de carrera se expresa en minutos por kilómetro (min/km) o minutos por milla (min/milla). Un ritmo más rápido significa un número más bajo. Por ejemplo, un ritmo de 5:00/km es más rápido que uno de 6:00/km. Use los tiempos parciales para seguir su progreso durante el entrenamiento y las carreras. Esta calculadora soporta unidades métricas e imperiales con conversión automática.',
    pt: 'O ritmo de corrida é expresso em minutos por quilômetro (min/km) ou minutos por milha (min/milha). Um ritmo mais rápido significa um número menor. Por exemplo, um ritmo de 5:00/km é mais rápido que um de 6:00/km. Use os tempos parciais para acompanhar seu progresso durante treinos e corridas. Esta calculadora suporta unidades métricas e imperiais com conversão automática.',
    de: 'Der Laufpace wird in Minuten pro Kilometer (min/km) oder Minuten pro Meile (min/Meile) ausgedrückt. Ein schnellerer Pace bedeutet eine niedrigere Zahl. Beispielsweise ist ein 5:00/km-Pace schneller als ein 6:00/km-Pace. Verwenden Sie Zwischenzeiten, um Ihren Fortschritt beim Training und bei Rennen zu verfolgen. Dieser Rechner unterstützt sowohl metrische als auch imperiale Einheiten mit automatischer Umrechnung.',
  },
  seoP4: {
    en: 'To train more effectively, pair your pace data with our <a>heart rate zone calculator</a> to ensure you are running at the right intensity for each workout. You can also use the <a2>calorie calculator</a2> to match your nutrition to your training volume and activity level.',
    fr: 'Pour vous entraîner plus efficacement, associez vos données d\'allure à notre <a>calculateur de zones de fréquence cardiaque</a> pour vous assurer de courir à la bonne intensité pour chaque séance. Vous pouvez aussi utiliser le <a2>calculateur de calories</a2> pour adapter votre nutrition à votre volume d\'entraînement et votre niveau d\'activité.',
    es: 'Para entrenar de manera más efectiva, combine sus datos de ritmo con nuestra <a>calculadora de zonas de frecuencia cardíaca</a> para asegurar que corre a la intensidad correcta en cada entrenamiento. También puede usar la <a2>calculadora de calorías</a2> para ajustar su nutrición a su volumen de entrenamiento y nivel de actividad.',
    pt: 'Para treinar de forma mais eficaz, combine seus dados de ritmo com nossa <a>calculadora de zonas de frequência cardíaca</a> para garantir que está correndo na intensidade certa para cada treino. Você também pode usar a <a2>calculadora de calorias</a2> para adequar sua nutrição ao seu volume de treino e nível de atividade.',
    de: 'Um effektiver zu trainieren, kombinieren Sie Ihre Pace-Daten mit unserem <a>Herzfrequenzzonen-Rechner</a>, um sicherzustellen, dass Sie bei jeder Trainingseinheit mit der richtigen Intensität laufen. Sie können auch den <a2>Kalorienrechner</a2> nutzen, um Ihre Ernährung an Ihr Trainingsvolumen und Aktivitätsniveau anzupassen.',
  },
}

const racePresets = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { labelKey: 'halfMarathon', km: 21.0975 },
  { labelKey: 'marathon', km: 42.195 },
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
  locale = 'en' as Locale,
}: {
  defaultMode?: string
  defaultDistance?: number
  defaultTime?: number
  defaultPace?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

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

    // mode === 'distance'
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
      label: r.labelKey ? lt(r.labelKey) : r.label!,
      distLabel: `${r.km === 42.195 ? '42.2' : r.km === 21.0975 ? '21.1' : r.km} km`,
      time: formatTime(r.km * results.pacePerKm, true),
    }))
  }, [results, locale])

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
    <ToolShell name={lt('navTitle')} icon="🏃" currentPath="/pace-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏃</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: accent }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>
            {lt('subtitle')}
          </p>
        </section>

        {/* Mode toggle */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', gap: 4, background: '#F0EDE6', borderRadius: 12, padding: 4 }}>
            <button style={modeBtn('pace', 'Pace')} onClick={() => setMode('pace')}>{lt('calcPace')}</button>
            <button style={modeBtn('time', 'Time')} onClick={() => setMode('time')}>{lt('calcTime')}</button>
            <button style={modeBtn('distance', 'Distance')} onClick={() => setMode('distance')}>{lt('calcDistance')}</button>
          </div>
        </section>

        {/* Race presets */}
        {mode !== 'distance' && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
            <div style={labelStyle}>{lt('racePresets')}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {racePresets.map(r => (
                <button key={r.labelKey || r.label} style={presetBtn(r.km)} onClick={() => handlePreset(r.km)}>
                  {r.labelKey ? lt(r.labelKey) : r.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={cardStyle}>
            {/* Distance input */}
            {(mode === 'pace' || mode === 'time') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{lt('distance')}</label>
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

            {/* Time input */}
            {(mode === 'pace' || mode === 'distance') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{lt('time')}</label>
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
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>{lt('hours')}</div>
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
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>{lt('min')}</div>
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
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>{lt('sec')}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Pace input */}
            {(mode === 'time' || mode === 'distance') && (
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>{lt('pace')}</label>
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
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>{lt('min')}</div>
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
                    <div style={{ fontSize: 10, color: '#9A958A', textAlign: 'center', marginTop: 2 }}>{lt('sec')}</div>
                  </div>
                  <select
                    value={paceUnit}
                    onChange={e => setPaceUnit(e.target.value as PaceUnit)}
                    style={{ ...selectStyle, flex: 1.2 }}
                  >
                    <option value="km">{lt('perKm')}</option>
                    <option value="mile">{lt('perMile')}</option>
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
                  <div style={labelStyle}>{lt('yourPace')}</div>
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
                  <div style={labelStyle}>{lt('totalTime')}</div>
                  <div style={{ fontSize: 44, fontFamily: fm, fontWeight: 700, color: accent }}>
                    {formatTime(results.totalTimeSec, true)}
                  </div>
                </>
              )}
              {results.mode === 'distance' && (
                <>
                  <div style={labelStyle}>{lt('distance')}</div>
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
                <div style={labelStyle}>{lt('equivalentRaceTimes')}</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>{lt('race')}</th>
                      <th style={thStyle}>{lt('distance')}</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>{lt('estimatedTime')}</th>
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
                <div style={labelStyle}>{lt('splitTimes')}</div>
                <div style={{ maxHeight: 400, overflowY: 'auto', marginTop: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>{lt('splitNum')}</th>
                        <th style={thStyle}>{lt('distance')}</th>
                        <th style={{ ...thStyle, textAlign: 'right' }}>{lt('cumulativeTime')}</th>
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP1')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP2')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP3')}</p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            {lt('seoP4').split(/<a>|<\/a>|<a2>|<\/a2>/).map((part, i) => {
              if (i === 1) return <a key={i} href="/heart-rate-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
