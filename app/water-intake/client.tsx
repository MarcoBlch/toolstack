'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#0891B2'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type WeightUnit = 'kg' | 'lbs'
type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'very_active'
type Climate = 'temperate' | 'hot' | 'cold'

const activityBonus: Record<ActivityLevel, number> = {
  sedentary: 0,
  moderate: 500,
  active: 750,
  very_active: 1000,
}

const climateBonus: Record<Climate, number> = {
  temperate: 0,
  hot: 500,
  cold: 0,
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  navTitle: {
    en: 'Water Intake Calculator', fr: 'Calculateur d\'hydratation', es: 'Calculadora de hidratación',
    pt: 'Calculadora de hidratação', de: 'Wasserbedarfsrechner',
  },
  titleWaterIntake: {
    en: 'Water intake', fr: 'Apport en eau', es: 'Consumo de agua', pt: 'Consumo de água', de: 'Wasserbedarf',
  },
  titleCalculator: {
    en: 'calculator', fr: 'calculateur', es: 'calculadora', pt: 'calculadora', de: 'Rechner',
  },
  subtitle: {
    en: 'How much water should you drink daily? Based on weight, activity level, and climate.',
    fr: 'Combien d\'eau devriez-vous boire par jour ? Selon votre poids, niveau d\'activité et climat.',
    es: '¿Cuánta agua deberías beber al día? Según tu peso, nivel de actividad y clima.',
    pt: 'Quanta água você deve beber por dia? Com base no peso, nível de atividade e clima.',
    de: 'Wie viel Wasser sollten Sie täglich trinken? Basierend auf Gewicht, Aktivitätslevel und Klima.',
  },

  // Activity levels
  sedentary: { en: 'Sedentary', fr: 'Sédentaire', es: 'Sedentario', pt: 'Sedentário', de: 'Sitzend' },
  moderate: { en: 'Moderate', fr: 'Modéré', es: 'Moderado', pt: 'Moderado', de: 'Moderat' },
  active: { en: 'Active', fr: 'Actif', es: 'Activo', pt: 'Ativo', de: 'Aktiv' },
  veryActive: { en: 'Very Active', fr: 'Très actif', es: 'Muy activo', pt: 'Muito ativo', de: 'Sehr aktiv' },

  // Climate
  climate: { en: 'Climate', fr: 'Climat', es: 'Clima', pt: 'Clima', de: 'Klima' },
  temperate: { en: 'Temperate', fr: 'Tempéré', es: 'Templado', pt: 'Temperado', de: 'Gemäßigt' },
  hot: { en: 'Hot', fr: 'Chaud', es: 'Caluroso', pt: 'Quente', de: 'Heiß' },
  cold: { en: 'Cold', fr: 'Froid', es: 'Frío', pt: 'Frio', de: 'Kalt' },

  // Input labels
  activityLevel: {
    en: 'Activity Level', fr: 'Niveau d\'activité', es: 'Nivel de actividad',
    pt: 'Nível de atividade', de: 'Aktivitätslevel',
  },
  pregnantLabel: {
    en: 'Pregnant / Breastfeeding', fr: 'Enceinte / Allaitement', es: 'Embarazada / Lactancia',
    pt: 'Grávida / Amamentando', de: 'Schwanger / Stillend',
  },
  pregnantYes: {
    en: 'Yes (+400 ml)', fr: 'Oui (+400 ml)', es: 'Sí (+400 ml)',
    pt: 'Sim (+400 ml)', de: 'Ja (+400 ml)',
  },
  pregnantNo: { en: 'No', fr: 'Non', es: 'No', pt: 'Não', de: 'Nein' },

  // Results
  yourDailyWaterIntake: {
    en: 'Your Daily Water Intake', fr: 'Votre apport quotidien en eau', es: 'Tu consumo diario de agua',
    pt: 'Seu consumo diário de água', de: 'Ihr täglicher Wasserbedarf',
  },
  glassesLabel: {
    en: '{n} glasses (250 ml each)', fr: '{n} verres (250 ml chacun)', es: '{n} vasos (250 ml cada uno)',
    pt: '{n} copos (250 ml cada)', de: '{n} Gläser (je 250 ml)',
  },
  glassVisualization: {
    en: 'Glass Visualization', fr: 'Visualisation des verres', es: 'Visualización de vasos',
    pt: 'Visualização dos copos', de: 'Gläservisualisierung',
  },
  eachGlass: {
    en: 'Each glass = 250 ml', fr: 'Chaque verre = 250 ml', es: 'Cada vaso = 250 ml',
    pt: 'Cada copo = 250 ml', de: 'Jedes Glas = 250 ml',
  },
  filledOf: {
    en: 'Filled: {a} of {b}', fr: 'Remplis : {a} sur {b}', es: 'Llenos: {a} de {b}',
    pt: 'Cheios: {a} de {b}', de: 'Gefüllt: {a} von {b}',
  },
  breakdown: { en: 'Breakdown', fr: 'Détail', es: 'Desglose', pt: 'Detalhamento', de: 'Aufschlüsselung' },
  baseNeed: {
    en: 'Base need (weight × 33)', fr: 'Besoin de base (poids × 33)', es: 'Necesidad base (peso × 33)',
    pt: 'Necessidade base (peso × 33)', de: 'Grundbedarf (Gewicht × 33)',
  },
  activityBonus: {
    en: 'Activity bonus', fr: 'Bonus activité', es: 'Bonus actividad',
    pt: 'Bônus atividade', de: 'Aktivitätsbonus',
  },
  climateBonus: {
    en: 'Climate bonus', fr: 'Bonus climat', es: 'Bonus clima',
    pt: 'Bônus clima', de: 'Klimabonus',
  },
  pregnancyBreastfeeding: {
    en: 'Pregnancy / breastfeeding', fr: 'Grossesse / allaitement', es: 'Embarazo / lactancia',
    pt: 'Gravidez / amamentação', de: 'Schwangerschaft / Stillen',
  },

  // Disclaimer
  disclaimer: {
    en: 'This is an estimate. Individual hydration needs vary. Consult a healthcare professional for personalized advice.',
    fr: 'Ceci est une estimation. Les besoins en hydratation varient d\'une personne à l\'autre. Consultez un professionnel de santé pour des conseils personnalisés.',
    es: 'Esto es una estimación. Las necesidades de hidratación varían según la persona. Consulta a un profesional de salud para obtener asesoramiento personalizado.',
    pt: 'Esta é uma estimativa. As necessidades de hidratação variam de pessoa para pessoa. Consulte um profissional de saúde para orientações personalizadas.',
    de: 'Dies ist eine Schätzung. Der individuelle Flüssigkeitsbedarf variiert. Konsultieren Sie einen Arzt für eine individuelle Beratung.',
  },

  // SEO
  seoH2: {
    en: 'Free water intake calculator',
    fr: 'Calculateur d\'hydratation gratuit',
    es: 'Calculadora de hidratación gratuita',
    pt: 'Calculadora de hidratação gratuita',
    de: 'Kostenloser Wasserbedarfsrechner',
  },
  seoP1: {
    en: 'Free water intake calculator. Find out how much water you should drink daily based on your body weight, activity level, and climate. Staying properly hydrated supports digestion, energy levels, skin health, and overall well-being. Use this tool to estimate your optimal daily water consumption in liters and glasses.',
    fr: 'Calculateur d\'hydratation gratuit. Découvrez combien d\'eau vous devriez boire chaque jour en fonction de votre poids corporel, niveau d\'activité et climat. Rester bien hydraté favorise la digestion, l\'énergie, la santé de la peau et le bien-être général. Utilisez cet outil pour estimer votre consommation d\'eau quotidienne optimale en litres et en verres.',
    es: 'Calculadora de hidratación gratuita. Descubre cuánta agua deberías beber diariamente según tu peso corporal, nivel de actividad y clima. Mantenerse bien hidratado favorece la digestión, los niveles de energía, la salud de la piel y el bienestar general. Usa esta herramienta para estimar tu consumo diario óptimo de agua en litros y vasos.',
    pt: 'Calculadora de hidratação gratuita. Descubra quanta água você deve beber diariamente com base no seu peso corporal, nível de atividade e clima. Manter-se bem hidratado favorece a digestão, os níveis de energia, a saúde da pele e o bem-estar geral. Use esta ferramenta para estimar seu consumo diário ideal de água em litros e copos.',
    de: 'Kostenloser Wasserbedarfsrechner. Finden Sie heraus, wie viel Wasser Sie täglich trinken sollten, basierend auf Ihrem Körpergewicht, Aktivitätslevel und Klima. Ausreichende Flüssigkeitszufuhr unterstützt die Verdauung, das Energieniveau, die Hautgesundheit und das allgemeine Wohlbefinden. Nutzen Sie dieses Tool, um Ihren optimalen täglichen Wasserverbrauch in Litern und Gläsern zu schätzen.',
  },
  seoH3a: {
    en: 'How is water intake calculated?',
    fr: 'Comment l\'apport en eau est-il calculé ?',
    es: '¿Cómo se calcula el consumo de agua?',
    pt: 'Como o consumo de água é calculado?',
    de: 'Wie wird der Wasserbedarf berechnet?',
  },
  seoP2: {
    en: 'The base recommendation is 33 ml of water per kilogram of body weight. This is adjusted for physical activity, hot climates, and pregnancy or breastfeeding. Active individuals and those in warm environments need more fluids to compensate for water lost through sweat.',
    fr: 'La recommandation de base est de 33 ml d\'eau par kilogramme de poids corporel. Elle est ajustée en fonction de l\'activité physique, des climats chauds et de la grossesse ou de l\'allaitement. Les personnes actives et celles vivant dans des environnements chauds ont besoin de plus de liquides pour compenser l\'eau perdue par la transpiration.',
    es: 'La recomendación base es de 33 ml de agua por kilogramo de peso corporal. Se ajusta según la actividad física, los climas calurosos y el embarazo o la lactancia. Las personas activas y quienes viven en ambientes cálidos necesitan más líquidos para compensar el agua perdida por el sudor.',
    pt: 'A recomendação base é de 33 ml de água por quilograma de peso corporal. É ajustada conforme a atividade física, climas quentes e gravidez ou amamentação. Pessoas ativas e aquelas em ambientes quentes precisam de mais líquidos para compensar a água perdida pelo suor.',
    de: 'Die Grundempfehlung liegt bei 33 ml Wasser pro Kilogramm Körpergewicht. Diese wird an körperliche Aktivität, heißes Klima und Schwangerschaft oder Stillzeit angepasst. Aktive Personen und solche in warmen Umgebungen benötigen mehr Flüssigkeit, um den durch Schwitzen verlorenen Wasserverlust auszugleichen.',
  },
  seoH3b: {
    en: 'Tips for staying hydrated',
    fr: 'Conseils pour rester hydraté',
    es: 'Consejos para mantenerse hidratado',
    pt: 'Dicas para se manter hidratado',
    de: 'Tipps für eine gute Flüssigkeitszufuhr',
  },
  seoP3: {
    en: 'Carry a reusable water bottle, drink a glass of water before each meal, and eat water-rich foods like fruits and vegetables. If you exercise, drink extra water before, during, and after your workout. Signs of dehydration include dark urine, fatigue, headache, and dry mouth.',
    fr: 'Emportez une bouteille d\'eau réutilisable, buvez un verre d\'eau avant chaque repas et consommez des aliments riches en eau comme les fruits et les légumes. Si vous faites de l\'exercice, buvez de l\'eau supplémentaire avant, pendant et après votre entraînement. Les signes de déshydratation comprennent une urine foncée, la fatigue, les maux de tête et la bouche sèche.',
    es: 'Lleva una botella de agua reutilizable, bebe un vaso de agua antes de cada comida y consume alimentos ricos en agua como frutas y verduras. Si haces ejercicio, bebe agua adicional antes, durante y después del entrenamiento. Los signos de deshidratación incluyen orina oscura, fatiga, dolor de cabeza y boca seca.',
    pt: 'Leve uma garrafa de água reutilizável, beba um copo de água antes de cada refeição e consuma alimentos ricos em água como frutas e vegetais. Se você se exercita, beba água extra antes, durante e após o treino. Os sinais de desidratação incluem urina escura, fadiga, dor de cabeça e boca seca.',
    de: 'Tragen Sie eine wiederverwendbare Wasserflasche bei sich, trinken Sie vor jeder Mahlzeit ein Glas Wasser und essen Sie wasserreiche Lebensmittel wie Obst und Gemüse. Wenn Sie Sport treiben, trinken Sie vor, während und nach dem Training zusätzlich Wasser. Anzeichen von Dehydrierung sind dunkler Urin, Müdigkeit, Kopfschmerzen und trockener Mund.',
  },
  seoP4: {
    en: 'Proper hydration works hand in hand with good nutrition. Use our <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calorie calculator</a> to determine your daily energy needs based on your activity level. If you are a runner or cyclist, the <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">pace calculator</a> can help you plan training sessions where staying hydrated becomes even more important.',
    fr: 'Une bonne hydratation va de pair avec une bonne nutrition. Utilisez notre <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de calories</a> pour déterminer vos besoins énergétiques quotidiens en fonction de votre niveau d\'activité. Si vous êtes coureur ou cycliste, le <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">calculateur d\'allure</a> peut vous aider à planifier des séances d\'entraînement où rester hydraté devient encore plus important.',
    es: 'Una buena hidratación va de la mano con una buena nutrición. Usa nuestra <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de calorías</a> para determinar tus necesidades energéticas diarias según tu nivel de actividad. Si eres corredor o ciclista, la <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de ritmo</a> puede ayudarte a planificar sesiones de entrenamiento donde mantenerse hidratado es aún más importante.',
    pt: 'A hidratação adequada anda de mãos dadas com uma boa nutrição. Use nossa <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de calorias</a> para determinar suas necessidades energéticas diárias com base no seu nível de atividade. Se você é corredor ou ciclista, a <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de ritmo</a> pode ajudá-lo a planejar sessões de treino onde manter-se hidratado é ainda mais importante.',
    de: 'Richtige Flüssigkeitszufuhr geht Hand in Hand mit guter Ernährung. Verwenden Sie unseren <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">Kalorienrechner</a>, um Ihren täglichen Energiebedarf basierend auf Ihrem Aktivitätslevel zu ermitteln. Wenn Sie Läufer oder Radfahrer sind, kann der <a href="/pace-calculator" style="color:#FF6B35;text-decoration:underline">Pace-Rechner</a> Ihnen helfen, Trainingseinheiten zu planen, bei denen die Flüssigkeitszufuhr noch wichtiger wird.',
  },
}

function GlassIcon({ filled, index }: { filled: boolean; index: number }) {
  return (
    <div
      key={index}
      style={{
        width: 30,
        height: 42,
        borderRadius: '0 0 8px 8px',
        border: `2px solid ${filled ? accent : '#E8E4DB'}`,
        borderTop: `2px solid ${filled ? accent : '#E8E4DB'}`,
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
        transition: 'all .3s',
        opacity: filled ? 1 : 0.35,
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: filled ? '75%' : '0%',
          background: filled ? accent + '40' : 'transparent',
          transition: 'height .3s',
          borderRadius: '0 0 6px 6px',
        }}
      />
      {/* Water line ripple */}
      {filled && (
        <div
          style={{
            position: 'absolute',
            bottom: '73%',
            left: 0,
            right: 0,
            height: 2,
            background: accent + '60',
            borderRadius: 1,
          }}
        />
      )}
    </div>
  )
}

export default function WaterIntakeClient({
  defaultWeight,
  defaultActivity,
  locale = 'en' as Locale,
}: {
  defaultWeight?: number
  defaultActivity?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const activityLabels: Record<ActivityLevel, string> = {
    sedentary: lt('sedentary'),
    moderate: lt('moderate'),
    active: lt('active'),
    very_active: lt('veryActive'),
  }

  const climateLabels: Record<Climate, string> = {
    temperate: lt('temperate'),
    hot: lt('hot'),
    cold: lt('cold'),
  }

  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg')
  const [activity, setActivity] = useState<ActivityLevel>((defaultActivity as ActivityLevel) ?? 'moderate')
  const [climate, setClimate] = useState<Climate>('temperate')
  const [pregnant, setPregnant] = useState(false)

  const results = useMemo(() => {
    const wKg = weightUnit === 'kg' ? weightKg : weightLbs / 2.205
    if (wKg <= 0) return null

    const baseMl = Math.round(wKg * 33)
    const actMl = activityBonus[activity]
    const cliMl = climateBonus[climate]
    const pregMl = pregnant ? 400 : 0
    const totalMl = baseMl + actMl + cliMl + pregMl
    const liters = totalMl / 1000
    const glasses = Math.ceil(totalMl / 250)

    return { baseMl, actMl, cliMl, pregMl, totalMl, liters, glasses }
  }, [weightKg, weightLbs, weightUnit, activity, climate, pregnant])

  const unitToggle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '6px 0', border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: 11, fontWeight: 600, fontFamily: fb,
    background: active ? accent : 'transparent',
    color: active ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const maxGlasses = 15
  const displayGlasses = results ? Math.min(results.glasses, maxGlasses) : 0

  return (
    <ToolShell name={lt('navTitle')} icon="💧" currentPath="/water-intake" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💧</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleWaterIntake')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Weight */}
              <div>
                <label style={labelStyle}>{t('weight', locale)}</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={weightUnit === 'kg' ? weightKg : weightLbs}
                      min={1}
                      onChange={e => {
                        const v = Number(e.target.value)
                        if (weightUnit === 'kg') { setWeightKg(v); setWeightLbs(Math.round(v * 2.205)) }
                        else { setWeightLbs(v); setWeightKg(Math.round(v / 2.205)) }
                      }}
                      style={inputStyle}
                      placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
                    />
                  </div>
                  <div style={{ display: 'flex', background: '#F5F3EE', borderRadius: 8, padding: 2, gap: 2 }}>
                    <button onClick={() => setWeightUnit('kg')} style={unitToggle(weightUnit === 'kg')}>kg</button>
                    <button onClick={() => setWeightUnit('lbs')} style={unitToggle(weightUnit === 'lbs')}>lbs</button>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label style={labelStyle}>{lt('activityLevel')}</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={activity}
                    onChange={e => setActivity(e.target.value as ActivityLevel)}
                    style={selectStyle}
                  >
                    {(Object.keys(activityLabels) as ActivityLevel[]).map(key => (
                      <option key={key} value={key}>{activityLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Climate */}
              <div>
                <label style={labelStyle}>{lt('climate')}</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={climate}
                    onChange={e => setClimate(e.target.value as Climate)}
                    style={selectStyle}
                  >
                    {(Object.keys(climateLabels) as Climate[]).map(key => (
                      <option key={key} value={key}>{climateLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pregnant / Breastfeeding Toggle */}
              <div>
                <label style={labelStyle}>{lt('pregnantLabel')}</label>
                <button
                  onClick={() => setPregnant(!pregnant)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1.5px solid ${pregnant ? accent : '#E8E4DB'}`,
                    borderRadius: 8,
                    background: pregnant ? accent + '12' : '#F5F3EE',
                    color: pregnant ? accent : '#9A958A',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: fb,
                    cursor: 'pointer',
                    transition: 'all .2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{
                    width: 18, height: 18, borderRadius: 4,
                    border: `2px solid ${pregnant ? accent : '#D0CCC4'}`,
                    background: pregnant ? accent : '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#fff', fontWeight: 700, transition: 'all .2s',
                  }}>
                    {pregnant ? '✓' : ''}
                  </span>
                  {pregnant ? lt('pregnantYes') : lt('pregnantNo')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Main result */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('yourDailyWaterIntake')}</div>
              <div style={{ fontSize: 56, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {results.liters.toFixed(1)} L
              </div>
              <div style={{
                display: 'inline-block', marginTop: 10, padding: '5px 16px', borderRadius: 20,
                background: accent + '18', color: accent,
                fontSize: 14, fontWeight: 700,
              }}>
                {lt('glassesLabel').replace('{n}', String(results.glasses))}
              </div>
            </div>

            {/* Glass visualization */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('glassVisualization')}</div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12,
                justifyContent: 'center',
              }}>
                {Array.from({ length: maxGlasses }).map((_, i) => (
                  <GlassIcon key={i} filled={i < displayGlasses} index={i} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#9A958A' }}>
                {lt('eachGlass')} &middot; {lt('filledOf').replace('{a}', String(displayGlasses)).replace('{b}', String(maxGlasses))}
              </div>
            </div>

            {/* Breakdown */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('breakdown')}</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>{lt('baseNeed')}</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{results.baseMl} ml</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>{lt('activityBonus')}</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: results.actMl > 0 ? accent : '#9A958A' }}>+{results.actMl} ml</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: '#6B6560' }}>{lt('climateBonus')}</span>
                  <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: results.cliMl > 0 ? accent : '#9A958A' }}>+{results.cliMl} ml</span>
                </div>
                {pregnant && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#FAFAF8', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, color: '#6B6560' }}>{lt('pregnancyBreastfeeding')}</span>
                    <span style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: accent }}>+{results.pregMl} ml</span>
                  </div>
                )}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px', background: accent + '0A', borderRadius: 8,
                  border: `1.5px solid ${accent}25`, marginTop: 4,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1C1B18' }}>{t('total', locale)}</span>
                  <span style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: accent }}>{results.totalMl} ml</span>
                </div>
              </div>
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
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: lt('seoP4') }} />
        </section>
      </div>
    </ToolShell>
  )
}
