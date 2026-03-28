'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#1D4ED8'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

type WeightUnit = 'kg' | 'lbs'

const trainingPercentages = [
  { pct: 100, reps: '1' },
  { pct: 95, reps: '2' },
  { pct: 90, reps: '4' },
  { pct: 85, reps: '6' },
  { pct: 80, reps: '8' },
  { pct: 75, reps: '10' },
  { pct: 70, reps: '12' },
  { pct: 65, reps: '15' },
  { pct: 60, reps: '18' },
  { pct: 50, reps: '20+' },
]

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  navTitle: {
    en: '1RM Calculator', fr: 'Calculateur 1RM', es: 'Calculadora 1RM',
    pt: 'Calculadora 1RM', de: '1RM-Rechner',
  },
  titleOneRepMax: {
    en: 'One Rep Max', fr: 'Répétition maximale', es: 'Repetición máxima',
    pt: 'Repetição máxima', de: 'Maximalgewicht',
  },
  titleCalculator: {
    en: 'Calculator', fr: 'Calculateur', es: 'Calculadora', pt: 'Calculadora', de: 'Rechner',
  },
  subtitle: {
    en: 'Estimate your 1RM using Epley, Brzycki, Lombardi, and O\'Conner formulas. Get training percentages instantly.',
    fr: 'Estimez votre 1RM avec les formules Epley, Brzycki, Lombardi et O\'Conner. Obtenez vos pourcentages d\'entraînement instantanément.',
    es: 'Estima tu 1RM con las fórmulas Epley, Brzycki, Lombardi y O\'Conner. Obtén los porcentajes de entrenamiento al instante.',
    pt: 'Estime sua 1RM com as fórmulas Epley, Brzycki, Lombardi e O\'Conner. Obtenha seus percentuais de treino instantaneamente.',
    de: 'Schätzen Sie Ihr 1RM mit den Formeln von Epley, Brzycki, Lombardi und O\'Conner. Erhalten Sie Trainingsprozentsätze sofort.',
  },

  // Input labels
  unit: { en: 'Unit', fr: 'Unité', es: 'Unidad', pt: 'Unidade', de: 'Einheit' },
  weightLifted: {
    en: 'Weight Lifted', fr: 'Poids soulevé', es: 'Peso levantado',
    pt: 'Peso levantado', de: 'Gehobenes Gewicht',
  },
  repsPerformed: {
    en: 'Reps Performed (1–30)', fr: 'Répétitions effectuées (1–30)', es: 'Repeticiones realizadas (1–30)',
    pt: 'Repetições realizadas (1–30)', de: 'Ausgeführte Wiederholungen (1–30)',
  },

  // Results
  estimatedOneRepMax: {
    en: 'Estimated One Rep Max (Average)', fr: 'Répétition maximale estimée (moyenne)',
    es: 'Repetición máxima estimada (promedio)', pt: 'Repetição máxima estimada (média)',
    de: 'Geschätztes Maximalgewicht (Durchschnitt)',
  },
  basedOn: {
    en: 'Based on', fr: 'Basé sur', es: 'Basado en', pt: 'Baseado em', de: 'Basierend auf',
  },
  rep: { en: 'rep', fr: 'rép', es: 'rep', pt: 'rep', de: 'Wdh' },
  reps: { en: 'reps', fr: 'réps', es: 'reps', pt: 'reps', de: 'Wdh' },
  formulaBreakdown: {
    en: 'Formula Breakdown', fr: 'Détail des formules', es: 'Desglose de fórmulas',
    pt: 'Detalhamento das fórmulas', de: 'Formelaufschlüsselung',
  },
  formula: { en: 'Formula', fr: 'Formule', es: 'Fórmula', pt: 'Fórmula', de: 'Formel' },
  estimated1RM: {
    en: 'Estimated 1RM', fr: '1RM estimée', es: '1RM estimada',
    pt: '1RM estimada', de: 'Geschätztes 1RM',
  },
  average: { en: 'Average', fr: 'Moyenne', es: 'Promedio', pt: 'Média', de: 'Durchschnitt' },

  // Training percentages
  trainingPercentages: {
    en: 'Training Percentages', fr: 'Pourcentages d\'entraînement', es: 'Porcentajes de entrenamiento',
    pt: 'Percentuais de treino', de: 'Trainingsprozentsätze',
  },
  pctOf1RM: {
    en: '% of 1RM', fr: '% de 1RM', es: '% de 1RM', pt: '% de 1RM', de: '% von 1RM',
  },
  approxReps: {
    en: 'Approx Reps', fr: 'Réps approx.', es: 'Reps aprox.',
    pt: 'Reps aprox.', de: 'Ca. Wdh.',
  },

  // Disclaimer
  disclaimer: {
    en: 'These are estimates based on mathematical formulas. Actual 1RM may vary depending on training experience, technique, fatigue, and individual factors. Always use a spotter when attempting heavy lifts.',
    fr: 'Ce sont des estimations basées sur des formules mathématiques. La 1RM réelle peut varier selon l\'expérience d\'entraînement, la technique, la fatigue et les facteurs individuels. Utilisez toujours un pareur pour les charges lourdes.',
    es: 'Estas son estimaciones basadas en fórmulas matemáticas. La 1RM real puede variar según la experiencia de entrenamiento, la técnica, la fatiga y factores individuales. Siempre usa un asegurador al intentar levantamientos pesados.',
    pt: 'Estas são estimativas baseadas em fórmulas matemáticas. A 1RM real pode variar dependendo da experiência de treino, técnica, fadiga e fatores individuais. Sempre use um auxiliar ao tentar levantamentos pesados.',
    de: 'Dies sind Schätzungen basierend auf mathematischen Formeln. Das tatsächliche 1RM kann je nach Trainingserfahrung, Technik, Ermüdung und individuellen Faktoren variieren. Verwenden Sie immer einen Spotter bei schweren Hebeversuchen.',
  },

  // SEO
  seoH2: {
    en: 'Free One Rep Max Calculator',
    fr: 'Calculateur de répétition maximale gratuit',
    es: 'Calculadora de repetición máxima gratuita',
    pt: 'Calculadora de repetição máxima gratuita',
    de: 'Kostenloser Maximalgewicht-Rechner',
  },
  seoP1: {
    en: 'Free 1RM calculator to estimate your one rep max from any weight and rep combination. Uses four proven formulas — Epley, Brzycki, Lombardi, and O\'Conner — then averages them for the most accurate estimate. Instantly see training percentages so you know exactly how much weight to load for any rep range.',
    fr: 'Calculateur 1RM gratuit pour estimer votre répétition maximale à partir de n\'importe quelle combinaison de poids et de répétitions. Utilise quatre formules éprouvées — Epley, Brzycki, Lombardi et O\'Conner — puis fait la moyenne pour l\'estimation la plus précise. Visualisez instantanément les pourcentages d\'entraînement pour savoir exactement combien de poids charger pour chaque plage de répétitions.',
    es: 'Calculadora 1RM gratuita para estimar tu repetición máxima a partir de cualquier combinación de peso y repeticiones. Utiliza cuatro fórmulas probadas — Epley, Brzycki, Lombardi y O\'Conner — y las promedia para la estimación más precisa. Ve los porcentajes de entrenamiento al instante para saber exactamente cuánto peso cargar para cualquier rango de repeticiones.',
    pt: 'Calculadora 1RM gratuita para estimar sua repetição máxima a partir de qualquer combinação de peso e repetições. Usa quatro fórmulas comprovadas — Epley, Brzycki, Lombardi e O\'Conner — e calcula a média para a estimativa mais precisa. Veja instantaneamente os percentuais de treino para saber exatamente quanto peso carregar para qualquer faixa de repetições.',
    de: 'Kostenloser 1RM-Rechner zur Schätzung Ihres Maximalgewichts aus jeder Gewichts- und Wiederholungskombination. Verwendet vier bewährte Formeln — Epley, Brzycki, Lombardi und O\'Conner — und bildet den Durchschnitt für die genaueste Schätzung. Sehen Sie sofort Trainingsprozentsätze, damit Sie genau wissen, wie viel Gewicht Sie für jeden Wiederholungsbereich laden müssen.',
  },
  seoH3a: {
    en: 'How is one rep max calculated?',
    fr: 'Comment la répétition maximale est-elle calculée ?',
    es: '¿Cómo se calcula la repetición máxima?',
    pt: 'Como a repetição máxima é calculada?',
    de: 'Wie wird das Maximalgewicht berechnet?',
  },
  seoP2: {
    en: 'The Epley formula calculates 1RM as weight × (1 + reps / 30). Brzycki uses weight × (36 / (37 − reps)). Lombardi computes weight × reps^0.10, and O\'Conner uses weight × (1 + reps × 0.025). Each formula has strengths at different rep ranges, so averaging all four gives the most reliable prediction. The calculator works for any barbell or dumbbell exercise including bench press, squat, deadlift, and overhead press.',
    fr: 'La formule d\'Epley calcule la 1RM comme poids × (1 + reps / 30). Brzycki utilise poids × (36 / (37 − reps)). Lombardi calcule poids × reps^0,10, et O\'Conner utilise poids × (1 + reps × 0,025). Chaque formule a ses forces pour différentes plages de répétitions, donc la moyenne des quatre donne la prédiction la plus fiable. Le calculateur fonctionne pour tout exercice à la barre ou aux haltères, y compris le développé couché, le squat, le soulevé de terre et le développé militaire.',
    es: 'La fórmula de Epley calcula la 1RM como peso × (1 + reps / 30). Brzycki usa peso × (36 / (37 − reps)). Lombardi calcula peso × reps^0,10, y O\'Conner usa peso × (1 + reps × 0,025). Cada fórmula tiene fortalezas en diferentes rangos de repeticiones, por lo que promediar las cuatro da la predicción más confiable. La calculadora funciona para cualquier ejercicio con barra o mancuernas, incluyendo press de banca, sentadilla, peso muerto y press militar.',
    pt: 'A fórmula de Epley calcula a 1RM como peso × (1 + reps / 30). Brzycki usa peso × (36 / (37 − reps)). Lombardi calcula peso × reps^0,10, e O\'Conner usa peso × (1 + reps × 0,025). Cada fórmula tem pontos fortes em diferentes faixas de repetições, portanto a média das quatro fornece a previsão mais confiável. A calculadora funciona para qualquer exercício com barra ou halteres, incluindo supino, agachamento, levantamento terra e desenvolvimento militar.',
    de: 'Die Epley-Formel berechnet das 1RM als Gewicht × (1 + Wdh / 30). Brzycki verwendet Gewicht × (36 / (37 − Wdh)). Lombardi berechnet Gewicht × Wdh^0,10, und O\'Conner verwendet Gewicht × (1 + Wdh × 0,025). Jede Formel hat ihre Stärken bei verschiedenen Wiederholungsbereichen, daher liefert der Durchschnitt aller vier die zuverlässigste Vorhersage. Der Rechner funktioniert für jede Langhantel- oder Kurzhantelübung, einschließlich Bankdrücken, Kniebeuge, Kreuzheben und Schulterdrücken.',
  },
  seoH3b: {
    en: 'Training with percentages',
    fr: 'S\'entraîner avec des pourcentages',
    es: 'Entrenar con porcentajes',
    pt: 'Treinar com percentuais',
    de: 'Training mit Prozentsätzen',
  },
  seoP3: {
    en: 'Once you know your estimated 1RM, you can program your training using percentages. Heavy singles and doubles at 95–100% build maximal strength. Working sets at 80–85% for 6–8 reps develop hypertrophy and strength. Lighter loads at 60–70% for 12–18 reps build muscular endurance. The training percentage table updates automatically based on your estimated max.',
    fr: 'Une fois que vous connaissez votre 1RM estimée, vous pouvez programmer votre entraînement à l\'aide de pourcentages. Les singles et doubles lourds à 95–100 % développent la force maximale. Les séries de travail à 80–85 % pour 6–8 reps développent l\'hypertrophie et la force. Les charges plus légères à 60–70 % pour 12–18 reps développent l\'endurance musculaire. Le tableau des pourcentages d\'entraînement se met à jour automatiquement en fonction de votre max estimé.',
    es: 'Una vez que conozcas tu 1RM estimada, puedes programar tu entrenamiento usando porcentajes. Las series simples y dobles pesadas al 95–100 % desarrollan la fuerza máxima. Las series de trabajo al 80–85 % para 6–8 reps desarrollan la hipertrofia y la fuerza. Las cargas más ligeras al 60–70 % para 12–18 reps desarrollan la resistencia muscular. La tabla de porcentajes de entrenamiento se actualiza automáticamente según tu máximo estimado.',
    pt: 'Uma vez que você conheça sua 1RM estimada, pode programar seu treino usando percentuais. Séries simples e duplas pesadas a 95–100 % desenvolvem força máxima. Séries de trabalho a 80–85 % para 6–8 reps desenvolvem hipertrofia e força. Cargas mais leves a 60–70 % para 12–18 reps desenvolvem resistência muscular. A tabela de percentuais de treino é atualizada automaticamente com base no seu máximo estimado.',
    de: 'Sobald Sie Ihr geschätztes 1RM kennen, können Sie Ihr Training mit Prozentsätzen programmieren. Schwere Singles und Doubles bei 95–100 % bauen maximale Kraft auf. Arbeitssätze bei 80–85 % für 6–8 Wdh entwickeln Hypertrophie und Kraft. Leichtere Lasten bei 60–70 % für 12–18 Wdh bauen Muskelausdauer auf. Die Trainingsprozentsatz-Tabelle wird automatisch basierend auf Ihrem geschätzten Maximum aktualisiert.',
  },
  seoP4: {
    en: 'Strength training goes hand in hand with tracking your body composition and nutrition. Use our <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">body fat calculator</a> to monitor changes in fat mass and lean mass as you progress. Pair your training with the <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calorie calculator</a> to make sure you are eating enough to support muscle growth and recovery.',
    fr: 'La musculation va de pair avec le suivi de votre composition corporelle et de votre nutrition. Utilisez notre <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de masse grasse</a> pour suivre les changements de masse grasse et de masse maigre au fil de votre progression. Associez votre entraînement au <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de calories</a> pour vous assurer de manger suffisamment pour soutenir la croissance musculaire et la récupération.',
    es: 'El entrenamiento de fuerza va de la mano con el seguimiento de tu composición corporal y nutrición. Usa nuestra <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de grasa corporal</a> para monitorear cambios en masa grasa y masa magra a medida que progresas. Combina tu entrenamiento con la <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de calorías</a> para asegurarte de comer lo suficiente para apoyar el crecimiento muscular y la recuperación.',
    pt: 'O treino de força anda de mãos dadas com o acompanhamento da sua composição corporal e nutrição. Use nossa <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de gordura corporal</a> para monitorar mudanças na massa gorda e massa magra conforme você progride. Combine seu treino com a <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de calorias</a> para garantir que está comendo o suficiente para apoiar o crescimento muscular e a recuperação.',
    de: 'Krafttraining geht Hand in Hand mit der Überwachung Ihrer Körperzusammensetzung und Ernährung. Verwenden Sie unseren <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">Körperfett-Rechner</a>, um Veränderungen der Fett- und Muskelmasse zu verfolgen. Kombinieren Sie Ihr Training mit dem <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">Kalorienrechner</a>, um sicherzustellen, dass Sie genug essen, um Muskelwachstum und Regeneration zu unterstützen.',
  },
}

export default function OneRepMaxClient({
  defaultWeight,
  defaultReps,
  locale = 'en' as Locale,
}: {
  defaultWeight?: number
  defaultReps?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [weight, setWeight] = useState(defaultWeight ?? 100)
  const [reps, setReps] = useState(defaultReps ?? 5)
  const [unit, setUnit] = useState<WeightUnit>('kg')

  const results = useMemo(() => {
    if (weight <= 0 || reps < 1 || reps > 30) return null

    // If reps is 1, 1RM is the weight itself
    if (reps === 1) {
      return {
        epley: weight,
        brzycki: weight,
        lombardi: weight,
        oconner: weight,
        average: weight,
      }
    }

    const epley = weight * (1 + reps / 30)
    const brzycki = weight * (36 / (37 - reps))
    const lombardi = weight * Math.pow(reps, 0.10)
    const oconner = weight * (1 + reps * 0.025)
    const average = (epley + brzycki + lombardi + oconner) / 4

    return { epley, brzycki, lombardi, oconner, average }
  }, [weight, reps])

  const unitBtn = (u: WeightUnit): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === u ? accent : 'transparent',
    color: unit === u ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const fmt = (v: number) => {
    if (unit === 'lbs') {
      return `${(v * 2.20462).toLocaleString(LOCALE_CODES[locale], { maximumFractionDigits: 1, minimumFractionDigits: 1 })} lbs`
    }
    return `${v.toLocaleString(LOCALE_CODES[locale], { maximumFractionDigits: 1, minimumFractionDigits: 1 })} kg`
  }

  const formulas = results
    ? [
        { name: 'Epley', value: results.epley },
        { name: 'Brzycki', value: results.brzycki },
        { name: 'Lombardi', value: results.lombardi },
        { name: "O'Conner", value: results.oconner },
      ]
    : []

  return (
    <ToolShell name={lt('navTitle')} icon="🏋️" currentPath="/one-rep-max" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏋️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleOneRepMax')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('unit')}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3, maxWidth: 220 }}>
                <button onClick={() => setUnit('kg')} style={unitBtn('kg')}>kg</button>
                <button onClick={() => setUnit('lbs')} style={unitBtn('lbs')}>lbs</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Weight */}
              <div>
                <label style={labelStyle}>{lt('weightLifted')} ({unit})</label>
                <input
                  type="number"
                  value={weight}
                  min={1}
                  onChange={e => setWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Reps */}
              <div>
                <label style={labelStyle}>{lt('repsPerformed')}</label>
                <input
                  type="number"
                  value={reps}
                  min={1}
                  max={30}
                  onChange={e => setReps(Math.min(30, Math.max(1, Number(e.target.value))))}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Estimated 1RM - prominent */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('estimatedOneRepMax')}</div>
              <div style={{ fontSize: 52, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1, marginTop: 4 }}>
                {fmt(results.average)}
              </div>
              <div style={{ fontSize: 13, color: '#9A958A', marginTop: 8 }}>
                {lt('basedOn')} {weight} {unit} × {reps} {reps > 1 ? lt('reps') : lt('rep')}
              </div>
            </div>

            {/* Formula comparison table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('formulaBreakdown')}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('formula')}</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('estimated1RM')}</th>
                  </tr>
                </thead>
                <tbody>
                  {formulas.map(f => (
                    <tr key={f.name}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontWeight: 500 }}>{f.name}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{fmt(f.value)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: accent }}>{lt('average')}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(results.average)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Training percentage table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('trainingPercentages')}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('pctOf1RM')}</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{t('weight', locale)}</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('approxReps')}</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingPercentages.map(row => {
                    const trainingWeight = results.average * (row.pct / 100)
                    const barWidth = row.pct
                    return (
                      <tr key={row.pct}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontWeight: 600, width: '25%' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontFamily: fm, fontSize: 13 }}>{row.pct}%</span>
                            <div style={{
                              height: 6, borderRadius: 3,
                              background: accent,
                              opacity: 0.15 + (row.pct / 100) * 0.85,
                              width: `${barWidth}%`,
                              maxWidth: 60,
                              transition: 'width .3s',
                            }} />
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                          {fmt(trainingWeight)}
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #F0EDE7', textAlign: 'right', color: '#6B6560' }}>
                          {row.reps}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 4, padding: '12px 16px', borderRadius: 10,
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
