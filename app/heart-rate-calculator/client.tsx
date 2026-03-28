'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

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

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav & titles
  navTitle: { en: 'Heart Rate Zones', fr: 'Zones de fréquence cardiaque', es: 'Zonas de frecuencia cardíaca', pt: 'Zonas de frequência cardíaca', de: 'Herzfrequenzzonen' },
  titleHR: { en: 'Heart Rate', fr: 'Fréquence cardiaque', es: 'Frecuencia cardíaca', pt: 'Frequência cardíaca', de: 'Herzfrequenz-' },
  titleZoneCalc: { en: 'Zone Calculator', fr: 'Calculateur de zones', es: 'Calculadora de zonas', pt: 'Calculadora de zonas', de: 'Zonenrechner' },
  subtitle: {
    en: 'Find your fat burn, cardio, and VO2 max zones. Karvonen and simple methods.',
    fr: 'Trouvez vos zones de combustion des graisses, cardio et VO2 max. Méthodes Karvonen et simple.',
    es: 'Encuentra tus zonas de quema de grasa, cardio y VO2 max. Métodos Karvonen y simple.',
    pt: 'Encontre suas zonas de queima de gordura, cardio e VO2 max. Métodos Karvonen e simples.',
    de: 'Finden Sie Ihre Fettverbrennungs-, Cardio- und VO2-Max-Zonen. Karvonen- und einfache Methode.',
  },

  // Input labels
  method: { en: 'Method', fr: 'Méthode', es: 'Método', pt: 'Método', de: 'Methode' },
  simple220: { en: 'Simple (220−age)', fr: 'Simple (220−âge)', es: 'Simple (220−edad)', pt: 'Simples (220−idade)', de: 'Einfach (220−Alter)' },
  karvonen: { en: 'Karvonen', fr: 'Karvonen', es: 'Karvonen', pt: 'Karvonen', de: 'Karvonen' },
  restingHR: { en: 'Resting Heart Rate (bpm)', fr: 'Fréquence cardiaque au repos (bpm)', es: 'Frecuencia cardíaca en reposo (bpm)', pt: 'Frequência cardíaca em repouso (bpm)', de: 'Ruheherzfrequenz (bpm)' },
  optionalSuffix: { en: ' — optional', fr: ' — optionnel', es: ' — opcional', pt: ' — opcional', de: ' — optional' },
  karvFormula: {
    en: 'Karvonen formula: Target HR = ((Max HR − Resting HR) × Intensity%) + Resting HR',
    fr: 'Formule Karvonen : FC cible = ((FC max − FC repos) × Intensité%) + FC repos',
    es: 'Fórmula Karvonen: FC objetivo = ((FC máx − FC reposo) × Intensidad%) + FC reposo',
    pt: 'Fórmula Karvonen: FC alvo = ((FC máx − FC repouso) × Intensidade%) + FC repouso',
    de: 'Karvonen-Formel: Ziel-HF = ((Max-HF − Ruhe-HF) × Intensität%) + Ruhe-HF',
  },

  // Zone names
  recovery: { en: 'Recovery', fr: 'Récupération', es: 'Recuperación', pt: 'Recuperação', de: 'Erholung' },
  fatBurn: { en: 'Fat Burn', fr: 'Brûle-graisses', es: 'Quema de grasa', pt: 'Queima de gordura', de: 'Fettverbrennung' },
  aerobic: { en: 'Aerobic', fr: 'Aérobie', es: 'Aeróbico', pt: 'Aeróbico', de: 'Aerob' },
  anaerobic: { en: 'Anaerobic', fr: 'Anaérobie', es: 'Anaeróbico', pt: 'Anaeróbico', de: 'Anaerob' },
  vo2max: { en: 'VO2 Max', fr: 'VO2 Max', es: 'VO2 Max', pt: 'VO2 Max', de: 'VO2 Max' },

  // Zone purposes
  purposeRecovery: { en: 'Warm-up, recovery', fr: 'Échauffement, récupération', es: 'Calentamiento, recuperación', pt: 'Aquecimento, recuperação', de: 'Aufwärmen, Erholung' },
  purposeFatBurn: { en: 'Fat burning, endurance', fr: 'Brûlage des graisses, endurance', es: 'Quema de grasa, resistencia', pt: 'Queima de gordura, resistência', de: 'Fettverbrennung, Ausdauer' },
  purposeAerobic: { en: 'Cardiovascular fitness', fr: 'Forme cardiovasculaire', es: 'Aptitud cardiovascular', pt: 'Aptidão cardiovascular', de: 'Kardiovaskuläre Fitness' },
  purposeAnaerobic: { en: 'Speed, power', fr: 'Vitesse, puissance', es: 'Velocidad, potencia', pt: 'Velocidade, potência', de: 'Geschwindigkeit, Kraft' },
  purposeVo2max: { en: 'Maximum effort', fr: 'Effort maximum', es: 'Esfuerzo máximo', pt: 'Esforço máximo', de: 'Maximale Belastung' },

  // Result labels
  maxHeartRate: { en: 'Max Heart Rate', fr: 'Fréquence cardiaque max', es: 'Frecuencia cardíaca máx', pt: 'Frequência cardíaca máx', de: 'Maximale Herzfrequenz' },
  methodLabel: { en: 'Method', fr: 'Méthode', es: 'Método', pt: 'Método', de: 'Methode' },
  restingHRLabel: { en: 'Resting HR', fr: 'FC repos', es: 'FC reposo', pt: 'FC repouso', de: 'Ruhe-HF' },
  heartRateZones: { en: 'Heart Rate Zones', fr: 'Zones de fréquence cardiaque', es: 'Zonas de frecuencia cardíaca', pt: 'Zonas de frequência cardíaca', de: 'Herzfrequenzzonen' },
  zoneDetails: { en: 'Zone Details', fr: 'Détails des zones', es: 'Detalles de las zonas', pt: 'Detalhes das zonas', de: 'Zonendetails' },

  // Table headers
  thZone: { en: 'Zone', fr: 'Zone', es: 'Zona', pt: 'Zona', de: 'Zone' },
  thName: { en: 'Name', fr: 'Nom', es: 'Nombre', pt: 'Nome', de: 'Name' },
  thIntensity: { en: 'Intensity', fr: 'Intensité', es: 'Intensidad', pt: 'Intensidade', de: 'Intensität' },
  thBpmRange: { en: 'BPM Range', fr: 'Plage BPM', es: 'Rango BPM', pt: 'Faixa BPM', de: 'BPM-Bereich' },
  thPurpose: { en: 'Purpose', fr: 'Objectif', es: 'Propósito', pt: 'Propósito', de: 'Zweck' },

  // Disclaimer
  disclaimer: {
    en: 'Heart rate zones are estimates. Consult a healthcare professional before starting any new exercise program.',
    fr: 'Les zones de fréquence cardiaque sont des estimations. Consultez un professionnel de la santé avant de commencer tout nouveau programme d\'exercice.',
    es: 'Las zonas de frecuencia cardíaca son estimaciones. Consulta a un profesional de la salud antes de comenzar cualquier nuevo programa de ejercicio.',
    pt: 'As zonas de frequência cardíaca são estimativas. Consulte um profissional de saúde antes de iniciar qualquer novo programa de exercícios.',
    de: 'Herzfrequenzzonen sind Schätzungen. Konsultieren Sie einen Gesundheitsexperten, bevor Sie ein neues Trainingsprogramm beginnen.',
  },

  // SEO
  seoH2: {
    en: 'Free Heart Rate Zone Calculator',
    fr: 'Calculateur gratuit de zones de fréquence cardiaque',
    es: 'Calculadora gratuita de zonas de frecuencia cardíaca',
    pt: 'Calculadora gratuita de zonas de frequência cardíaca',
    de: 'Kostenloser Herzfrequenzzonen-Rechner',
  },
  seoP1: {
    en: 'Calculate your heart rate training zones with our free calculator. Supports both the simple 220-minus-age method and the more accurate Karvonen formula, which factors in your resting heart rate. Instantly see your five training zones — Recovery, Fat Burn, Aerobic, Anaerobic, and VO2 Max — with personalized BPM ranges, colored zone bars, and a detailed breakdown of each zone\'s purpose. Perfect for runners, cyclists, and anyone looking to optimize their cardio training.',
    fr: 'Calculez vos zones d\'entraînement de fréquence cardiaque avec notre calculateur gratuit. Supporte la méthode simple 220 moins l\'âge et la formule Karvonen plus précise, qui prend en compte votre fréquence cardiaque au repos. Voyez instantanément vos cinq zones d\'entraînement — Récupération, Brûle-graisses, Aérobie, Anaérobie et VO2 Max — avec des plages BPM personnalisées, des barres de zones colorées et une description détaillée de l\'objectif de chaque zone. Parfait pour les coureurs, cyclistes et tous ceux qui souhaitent optimiser leur entraînement cardio.',
    es: 'Calcula tus zonas de entrenamiento de frecuencia cardíaca con nuestra calculadora gratuita. Soporta tanto el método simple de 220 menos la edad como la fórmula Karvonen más precisa, que considera tu frecuencia cardíaca en reposo. Ve instantáneamente tus cinco zonas de entrenamiento — Recuperación, Quema de grasa, Aeróbico, Anaeróbico y VO2 Max — con rangos BPM personalizados, barras de zonas con colores y un desglose detallado del propósito de cada zona. Perfecto para corredores, ciclistas y cualquiera que busque optimizar su entrenamiento cardio.',
    pt: 'Calcule suas zonas de treinamento de frequência cardíaca com nossa calculadora gratuita. Suporta tanto o método simples de 220 menos a idade quanto a fórmula Karvonen mais precisa, que considera sua frequência cardíaca em repouso. Veja instantaneamente suas cinco zonas de treinamento — Recuperação, Queima de gordura, Aeróbico, Anaeróbico e VO2 Max — com faixas BPM personalizadas, barras de zonas coloridas e um detalhamento do propósito de cada zona. Perfeito para corredores, ciclistas e qualquer pessoa que deseje otimizar seu treinamento cardio.',
    de: 'Berechnen Sie Ihre Herzfrequenz-Trainingszonen mit unserem kostenlosen Rechner. Unterstützt sowohl die einfache 220-minus-Alter-Methode als auch die genauere Karvonen-Formel, die Ihre Ruheherzfrequenz berücksichtigt. Sehen Sie sofort Ihre fünf Trainingszonen — Erholung, Fettverbrennung, Aerob, Anaerob und VO2 Max — mit personalisierten BPM-Bereichen, farbigen Zonenbalken und einer detaillierten Aufschlüsselung des Zwecks jeder Zone. Perfekt für Läufer, Radfahrer und alle, die ihr Cardio-Training optimieren möchten.',
  },
  seoH3a: {
    en: 'Simple Method vs. Karvonen Formula',
    fr: 'Méthode simple vs. formule Karvonen',
    es: 'Método simple vs. fórmula Karvonen',
    pt: 'Método simples vs. fórmula Karvonen',
    de: 'Einfache Methode vs. Karvonen-Formel',
  },
  seoP2: {
    en: 'The simple method estimates max heart rate as 220 minus your age and calculates zones as a straight percentage of that number. The Karvonen formula is more personalized because it uses your heart rate reserve — the difference between your max and resting heart rate. This means two people of the same age but different fitness levels will get different zone ranges, making Karvonen the preferred method for experienced athletes.',
    fr: 'La méthode simple estime la fréquence cardiaque maximale comme 220 moins votre âge et calcule les zones en pourcentage direct de ce nombre. La formule Karvonen est plus personnalisée car elle utilise votre réserve de fréquence cardiaque — la différence entre votre fréquence maximale et au repos. Cela signifie que deux personnes du même âge mais de niveaux de forme différents obtiendront des plages de zones différentes, faisant de Karvonen la méthode préférée des athlètes expérimentés.',
    es: 'El método simple estima la frecuencia cardíaca máxima como 220 menos tu edad y calcula las zonas como un porcentaje directo de ese número. La fórmula Karvonen es más personalizada porque usa tu reserva de frecuencia cardíaca — la diferencia entre tu frecuencia máxima y en reposo. Esto significa que dos personas de la misma edad pero con diferentes niveles de condición física obtendrán diferentes rangos de zonas, haciendo de Karvonen el método preferido para atletas experimentados.',
    pt: 'O método simples estima a frequência cardíaca máxima como 220 menos sua idade e calcula as zonas como uma porcentagem direta desse número. A fórmula Karvonen é mais personalizada porque usa sua reserva de frequência cardíaca — a diferença entre sua frequência máxima e em repouso. Isso significa que duas pessoas da mesma idade mas com diferentes níveis de condicionamento físico obterão diferentes faixas de zonas, tornando Karvonen o método preferido para atletas experientes.',
    de: 'Die einfache Methode schätzt die maximale Herzfrequenz als 220 minus Ihr Alter und berechnet die Zonen als direkten Prozentsatz dieser Zahl. Die Karvonen-Formel ist personalisierter, weil sie Ihre Herzfrequenzreserve verwendet — die Differenz zwischen Ihrer maximalen und Ruheherzfrequenz. Das bedeutet, dass zwei Personen gleichen Alters aber unterschiedlicher Fitnessniveaus unterschiedliche Zonenbereiche erhalten, was Karvonen zur bevorzugten Methode für erfahrene Athleten macht.',
  },
  seoH3b: {
    en: 'Training in the Right Zone',
    fr: 'S\'entraîner dans la bonne zone',
    es: 'Entrenar en la zona correcta',
    pt: 'Treinando na zona certa',
    de: 'Training in der richtigen Zone',
  },
  seoP3: {
    en: 'Each zone serves a specific purpose. Zone 1 (50-60%) is for warm-ups and active recovery. Zone 2 (60-70%) is the fat-burning zone, ideal for long easy runs. Zone 3 (70-80%) builds aerobic capacity and cardiovascular endurance. Zone 4 (80-90%) develops speed and lactate threshold. Zone 5 (90-100%) is maximum effort for short intervals. Most training plans recommend spending the majority of your time in Zones 2 and 3.',
    fr: 'Chaque zone a un objectif spécifique. La zone 1 (50-60 %) est pour l\'échauffement et la récupération active. La zone 2 (60-70 %) est la zone de brûlage des graisses, idéale pour les longues courses faciles. La zone 3 (70-80 %) développe la capacité aérobie et l\'endurance cardiovasculaire. La zone 4 (80-90 %) développe la vitesse et le seuil lactique. La zone 5 (90-100 %) est l\'effort maximum pour des intervalles courts. La plupart des plans d\'entraînement recommandent de passer la majorité du temps dans les zones 2 et 3.',
    es: 'Cada zona tiene un propósito específico. La zona 1 (50-60 %) es para calentamiento y recuperación activa. La zona 2 (60-70 %) es la zona de quema de grasa, ideal para carreras largas y fáciles. La zona 3 (70-80 %) desarrolla la capacidad aeróbica y la resistencia cardiovascular. La zona 4 (80-90 %) desarrolla la velocidad y el umbral de lactato. La zona 5 (90-100 %) es el esfuerzo máximo para intervalos cortos. La mayoría de los planes de entrenamiento recomiendan pasar la mayor parte del tiempo en las zonas 2 y 3.',
    pt: 'Cada zona tem um propósito específico. A zona 1 (50-60 %) é para aquecimento e recuperação ativa. A zona 2 (60-70 %) é a zona de queima de gordura, ideal para corridas longas e leves. A zona 3 (70-80 %) desenvolve a capacidade aeróbica e a resistência cardiovascular. A zona 4 (80-90 %) desenvolve a velocidade e o limiar de lactato. A zona 5 (90-100 %) é o esforço máximo para intervalos curtos. A maioria dos planos de treinamento recomenda passar a maior parte do tempo nas zonas 2 e 3.',
    de: 'Jede Zone dient einem bestimmten Zweck. Zone 1 (50-60 %) ist für Aufwärmen und aktive Erholung. Zone 2 (60-70 %) ist die Fettverbrennungszone, ideal für lange leichte Läufe. Zone 3 (70-80 %) baut aerobe Kapazität und kardiovaskuläre Ausdauer auf. Zone 4 (80-90 %) entwickelt Geschwindigkeit und Laktatschwelle. Zone 5 (90-100 %) ist maximale Anstrengung für kurze Intervalle. Die meisten Trainingspläne empfehlen, die meiste Zeit in den Zonen 2 und 3 zu verbringen.',
  },
  seoP4: {
    en: 'Pair your heart rate zones with our <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">pace calculator</a> to match your running pace to each zone. You can also use the <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calorie calculator</a> to see how your activity level affects your daily energy needs.',
    fr: 'Associez vos zones de fréquence cardiaque avec notre <a href="/fr/calculateur-allure" style="color:#FF6B35;text-decoration:underline">calculateur d\'allure</a> pour adapter votre rythme de course à chaque zone. Vous pouvez aussi utiliser le <a href="/fr/calculateur-calories" style="color:#FF6B35;text-decoration:underline">calculateur de calories</a> pour voir comment votre niveau d\'activité affecte vos besoins énergétiques quotidiens.',
    es: 'Combina tus zonas de frecuencia cardíaca con nuestra <a href="/es/calculadora-ritmo" style="color:#FF6B35;text-decoration:underline">calculadora de ritmo</a> para ajustar tu ritmo de carrera a cada zona. También puedes usar la <a href="/es/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorías</a> para ver cómo tu nivel de actividad afecta tus necesidades energéticas diarias.',
    pt: 'Combine suas zonas de frequência cardíaca com nossa <a href="/pt/calculadora-ritmo" style="color:#FF6B35;text-decoration:underline">calculadora de ritmo</a> para ajustar seu ritmo de corrida a cada zona. Você também pode usar a <a href="/pt/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorias</a> para ver como seu nível de atividade afeta suas necessidades energéticas diárias.',
    de: 'Kombinieren Sie Ihre Herzfrequenzzonen mit unserem <a href="/de/tempo-rechner" style="color:#FF6B35;text-decoration:underline">Tempo-Rechner</a>, um Ihr Lauftempo jeder Zone zuzuordnen. Sie können auch den <a href="/de/kalorienrechner" style="color:#FF6B35;text-decoration:underline">Kalorienrechner</a> verwenden, um zu sehen, wie Ihr Aktivitätsniveau Ihren täglichen Energiebedarf beeinflusst.',
  },
}

interface Zone {
  zone: number
  name: string
  lowPct: number
  highPct: number
  color: string
  purpose: string
}

function calcBpm(maxHR: number, restingHR: number, pct: number, method: Method): number {
  if (method === 'karvonen') {
    return Math.round(((maxHR - restingHR) * (pct / 100)) + restingHR)
  }
  return Math.round(maxHR * (pct / 100))
}

export default function HeartRateClient({
  defaultAge,
  defaultRestingHR,
  locale = 'en' as Locale,
}: {
  defaultAge?: number
  defaultRestingHR?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const ZONES: Zone[] = [
    { zone: 1, name: lt('recovery'),  lowPct: 50, highPct: 60, color: '#3B82F6', purpose: lt('purposeRecovery') },
    { zone: 2, name: lt('fatBurn'),  lowPct: 60, highPct: 70, color: '#22C55E', purpose: lt('purposeFatBurn') },
    { zone: 3, name: lt('aerobic'),   lowPct: 70, highPct: 80, color: '#F59E0B', purpose: lt('purposeAerobic') },
    { zone: 4, name: lt('anaerobic'), lowPct: 80, highPct: 90, color: '#F97316', purpose: lt('purposeAnaerobic') },
    { zone: 5, name: lt('vo2max'),   lowPct: 90, highPct: 100, color: '#EF4444', purpose: lt('purposeVo2max') },
  ]

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
  }, [age, restingHR, method, locale])

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
    <ToolShell name={lt('navTitle')} icon="❤️" currentPath="/heart-rate-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>❤️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleHR')} <span style={{ color: accent }}>{lt('titleZoneCalc')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Method toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('method')}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setMethod('simple')} style={toggleBtn('simple')}>{lt('simple220')}</button>
                <button onClick={() => setMethod('karvonen')} style={toggleBtn('karvonen')}>{lt('karvonen')}</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: method === 'karvonen' ? '1fr 1fr' : '1fr', gap: 16 }}>
              {/* Age */}
              <div>
                <label style={labelStyle}>{t('age', locale)}</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Resting HR */}
              <div>
                <label style={labelStyle}>{lt('restingHR')}{method === 'simple' ? lt('optionalSuffix') : ''}</label>
                <input
                  type="number" value={restingHR} min={30} max={120}
                  onChange={e => setRestingHR(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {method === 'karvonen' && (
              <p style={{ fontSize: 12, color: '#9A958A', marginTop: 12, lineHeight: 1.5 }}>
                {lt('karvFormula')}
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
                <div style={labelStyle}>{lt('maxHeartRate')}</div>
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
                <div style={labelStyle}>{lt('methodLabel')}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1C1B18' }}>
                  {method === 'simple' ? '220 − Age' : 'Karvonen'}
                </div>
                {method === 'karvonen' && (
                  <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4 }}>
                    {lt('restingHRLabel')}: {restingHR} bpm
                  </div>
                )}
              </div>
            </div>

            {/* Zone bars */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('heartRateZones')}</div>
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
              <div style={labelStyle}>{lt('zoneDetails')}</div>
              <table style={{
                width: '100%', borderCollapse: 'collapse', marginTop: 12,
                fontSize: 13, fontFamily: fb,
              }}>
                <thead>
                  <tr>
                    {[lt('thZone'), lt('thName'), lt('thIntensity'), lt('thBpmRange'), lt('thPurpose')].map(h => (
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
              {lt('disclaimer')}
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: lt('seoP4') }} />
        </section>
      </div>
    </ToolShell>
  )
}
