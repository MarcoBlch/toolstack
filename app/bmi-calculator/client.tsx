'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

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
  background: '#F5F3EE', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type UnitSystem = 'metric' | 'imperial'
type Category = { label: string; color: string }

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  titleBMI: { en: 'BMI', fr: 'IMC', es: 'IMC', pt: 'IMC', de: 'BMI' },
  titleCalculator: { en: 'calculator', fr: 'calculateur', es: 'calculadora', pt: 'calculadora', de: 'Rechner' },
  subtitle: {
    en: 'Calculate your Body Mass Index instantly. Metric and imperial.',
    fr: 'Calculez votre indice de masse corporelle instantanément. Métrique et impérial.',
    es: 'Calcula tu índice de masa corporal al instante. Métrico e imperial.',
    pt: 'Calcule seu índice de massa corporal instantaneamente. Métrico e imperial.',
    de: 'Berechnen Sie Ihren Body-Mass-Index sofort. Metrisch und imperial.',
  },
  navTitle: { en: 'BMI Calculator', fr: 'Calculateur d\'IMC', es: 'Calculadora de IMC', pt: 'Calculadora de IMC', de: 'BMI-Rechner' },

  // Input labels
  heightCm: {
    en: 'Height (cm)', fr: 'Taille (cm)', es: 'Altura (cm)', pt: 'Altura (cm)', de: 'Größe (cm)',
  },
  weightKg: {
    en: 'Weight (kg)', fr: 'Poids (kg)', es: 'Peso (kg)', pt: 'Peso (kg)', de: 'Gewicht (kg)',
  },
  weightLbs: {
    en: 'Weight (lbs)', fr: 'Poids (lbs)', es: 'Peso (lbs)', pt: 'Peso (lbs)', de: 'Gewicht (lbs)',
  },
  ageOptional: {
    en: 'Age (optional)', fr: 'Âge (optionnel)', es: 'Edad (opcional)', pt: 'Idade (opcional)', de: 'Alter (optional)',
  },
  genderOptional: {
    en: 'Gender (optional)', fr: 'Sexe (optionnel)', es: 'Sexo (opcional)', pt: 'Sexo (opcional)', de: 'Geschlecht (optional)',
  },

  // Placeholders / units
  ft: { en: 'ft', fr: 'pi', es: 'pies', pt: 'pés', de: 'Fuß' },
  in: { en: 'in', fr: 'po', es: 'pulg', pt: 'pol', de: 'Zoll' },
  feet: { en: 'feet', fr: 'pieds', es: 'pies', pt: 'pés', de: 'Fuß' },
  inches: { en: 'inches', fr: 'pouces', es: 'pulgadas', pt: 'polegadas', de: 'Zoll' },
  egAge: { en: 'e.g. 30', fr: 'ex. 30', es: 'ej. 30', pt: 'ex. 30', de: 'z.B. 30' },

  // BMI categories
  underweight: { en: 'Underweight', fr: 'Insuffisance pondérale', es: 'Bajo peso', pt: 'Abaixo do peso', de: 'Untergewicht' },
  normal: { en: 'Normal', fr: 'Normal', es: 'Normal', pt: 'Normal', de: 'Normalgewicht' },
  overweight: { en: 'Overweight', fr: 'Surpoids', es: 'Sobrepeso', pt: 'Sobrepeso', de: 'Übergewicht' },
  obese: { en: 'Obese', fr: 'Obésité', es: 'Obesidad', pt: 'Obesidade', de: 'Adipositas' },

  // Gauge labels (shorter)
  gaugeUnder: { en: 'Under', fr: 'Insuf.', es: 'Bajo', pt: 'Abaixo', de: 'Unter' },
  gaugeNormal: { en: 'Normal', fr: 'Normal', es: 'Normal', pt: 'Normal', de: 'Normal' },
  gaugeOver: { en: 'Over', fr: 'Surp.', es: 'Sobre', pt: 'Sobre', de: 'Über' },
  gaugeObese: { en: 'Obese', fr: 'Obèse', es: 'Obeso', pt: 'Obeso', de: 'Adipös' },

  // Result labels
  yourBMI: { en: 'Your BMI', fr: 'Votre IMC', es: 'Tu IMC', pt: 'Seu IMC', de: 'Ihr BMI' },
  bmiScale: { en: 'BMI Scale', fr: 'Échelle IMC', es: 'Escala de IMC', pt: 'Escala de IMC', de: 'BMI-Skala' },
  healthyRange: {
    en: 'Healthy Weight Range', fr: 'Poids santé', es: 'Rango de peso saludable', pt: 'Faixa de peso saudável', de: 'Gesunder Gewichtsbereich',
  },

  // Disclaimer
  disclaimer: {
    en: 'BMI is a general indicator. Consult a healthcare professional for personalized advice.',
    fr: 'L\'IMC est un indicateur général. Consultez un professionnel de santé pour des conseils personnalisés.',
    es: 'El IMC es un indicador general. Consulta a un profesional de salud para obtener asesoramiento personalizado.',
    pt: 'O IMC é um indicador geral. Consulte um profissional de saúde para orientações personalizadas.',
    de: 'Der BMI ist ein allgemeiner Indikator. Konsultieren Sie einen Arzt für eine individuelle Beratung.',
  },

  // SEO
  seoH2: {
    en: 'Free BMI calculator',
    fr: 'Calculateur d\'IMC gratuit',
    es: 'Calculadora de IMC gratuita',
    pt: 'Calculadora de IMC gratuita',
    de: 'Kostenloser BMI-Rechner',
  },
  seoP1: {
    en: 'Our BMI calculator determines your Body Mass Index by dividing your weight in kilograms by your height in meters squared. Switch between metric and imperial units depending on what you are comfortable with. The result is displayed on a color-coded gauge that shows exactly where you fall across four standard categories: underweight, normal weight, overweight, and obese.',
    fr: 'Notre calculateur d\'IMC détermine votre indice de masse corporelle en divisant votre poids en kilogrammes par le carré de votre taille en mètres. Basculez entre unités métriques et impériales selon vos préférences. Le résultat s\'affiche sur une jauge colorée qui montre exactement où vous vous situez parmi les quatre catégories standards : insuffisance pondérale, poids normal, surpoids et obésité.',
    es: 'Nuestra calculadora de IMC determina tu índice de masa corporal dividiendo tu peso en kilogramos por el cuadrado de tu altura en metros. Alterna entre unidades métricas e imperiales según tu preferencia. El resultado se muestra en un indicador con colores que señala exactamente en cuál de las cuatro categorías estándar te encuentras: bajo peso, peso normal, sobrepeso y obesidad.',
    pt: 'Nossa calculadora de IMC determina seu índice de massa corporal dividindo seu peso em quilogramas pelo quadrado da sua altura em metros. Alterne entre unidades métricas e imperiais conforme sua preferência. O resultado é exibido em um medidor colorido que mostra exatamente onde você se encontra nas quatro categorias padrão: abaixo do peso, peso normal, sobrepeso e obesidade.',
    de: 'Unser BMI-Rechner ermittelt Ihren Body-Mass-Index, indem er Ihr Gewicht in Kilogramm durch das Quadrat Ihrer Größe in Metern teilt. Wechseln Sie je nach Vorliebe zwischen metrischen und imperialen Einheiten. Das Ergebnis wird auf einer farbcodierten Skala angezeigt, die genau zeigt, wo Sie sich in den vier Standardkategorien befinden: Untergewicht, Normalgewicht, Übergewicht und Adipositas.',
  },
  seoH3a: {
    en: 'Understanding BMI categories',
    fr: 'Comprendre les catégories d\'IMC',
    es: 'Comprender las categorías del IMC',
    pt: 'Entendendo as categorias do IMC',
    de: 'BMI-Kategorien verstehen',
  },
  seoP2: {
    en: 'A BMI below 18.5 is considered underweight, 18.5 to 24.9 falls within the normal range, 25 to 29.9 is classified as overweight, and 30 or above indicates obesity. The calculator also shows your healthy weight range for your specific height, giving you a concrete target if you are working toward a healthier weight. These categories are defined by the World Health Organization.',
    fr: 'Un IMC inférieur à 18,5 est considéré comme une insuffisance pondérale, de 18,5 à 24,9 se situe dans la plage normale, de 25 à 29,9 correspond au surpoids et 30 ou plus indique une obésité. Le calculateur affiche également votre fourchette de poids santé pour votre taille, vous offrant un objectif concret si vous cherchez à atteindre un poids plus sain. Ces catégories sont définies par l\'Organisation mondiale de la santé.',
    es: 'Un IMC inferior a 18,5 se considera bajo peso, de 18,5 a 24,9 se encuentra dentro del rango normal, de 25 a 29,9 se clasifica como sobrepeso y 30 o más indica obesidad. La calculadora también muestra tu rango de peso saludable para tu estatura, brindándote un objetivo concreto si estás trabajando hacia un peso más saludable. Estas categorías están definidas por la Organización Mundial de la Salud.',
    pt: 'Um IMC abaixo de 18,5 é considerado abaixo do peso, de 18,5 a 24,9 está na faixa normal, de 25 a 29,9 é classificado como sobrepeso e 30 ou acima indica obesidade. A calculadora também mostra sua faixa de peso saudável para sua altura específica, oferecendo uma meta concreta caso esteja buscando um peso mais saudável. Essas categorias são definidas pela Organização Mundial da Saúde.',
    de: 'Ein BMI unter 18,5 gilt als Untergewicht, 18,5 bis 24,9 liegt im Normalbereich, 25 bis 29,9 wird als Übergewicht eingestuft und 30 oder mehr deutet auf Adipositas hin. Der Rechner zeigt auch Ihren gesunden Gewichtsbereich für Ihre Körpergröße an und gibt Ihnen ein konkretes Ziel, wenn Sie auf ein gesünderes Gewicht hinarbeiten. Diese Kategorien werden von der Weltgesundheitsorganisation definiert.',
  },
  seoH3b: {
    en: 'BMI limitations and next steps',
    fr: 'Limites de l\'IMC et prochaines étapes',
    es: 'Limitaciones del IMC y próximos pasos',
    pt: 'Limitações do IMC e próximos passos',
    de: 'Einschränkungen des BMI und nächste Schritte',
  },
  seoP3: {
    en: 'While BMI is a useful screening tool, it does not distinguish between muscle and fat or account for factors like bone density, age, and gender. Athletes with high muscle mass may have an elevated BMI despite being healthy. For a more complete picture of your body composition, consider additional measurements and always consult a healthcare professional for personalized guidance.',
    fr: 'Bien que l\'IMC soit un outil de dépistage utile, il ne distingue pas la masse musculaire de la masse grasse et ne tient pas compte de facteurs comme la densité osseuse, l\'âge et le sexe. Les sportifs ayant une masse musculaire élevée peuvent présenter un IMC élevé tout en étant en bonne santé. Pour une image plus complète de votre composition corporelle, envisagez des mesures complémentaires et consultez toujours un professionnel de santé pour des conseils personnalisés.',
    es: 'Si bien el IMC es una herramienta de detección útil, no distingue entre músculo y grasa ni tiene en cuenta factores como la densidad ósea, la edad y el sexo. Los atletas con alta masa muscular pueden tener un IMC elevado a pesar de estar sanos. Para obtener una imagen más completa de tu composición corporal, considera mediciones adicionales y consulta siempre a un profesional de salud para orientación personalizada.',
    pt: 'Embora o IMC seja uma ferramenta de triagem útil, ele não distingue entre músculo e gordura nem considera fatores como densidade óssea, idade e sexo. Atletas com alta massa muscular podem ter um IMC elevado mesmo estando saudáveis. Para uma visão mais completa da sua composição corporal, considere medições adicionais e sempre consulte um profissional de saúde para orientação personalizada.',
    de: 'Obwohl der BMI ein nützliches Screening-Instrument ist, unterscheidet er nicht zwischen Muskel- und Fettmasse und berücksichtigt keine Faktoren wie Knochendichte, Alter und Geschlecht. Sportler mit hoher Muskelmasse können trotz guter Gesundheit einen erhöhten BMI haben. Für ein vollständigeres Bild Ihrer Körperzusammensetzung sollten Sie zusätzliche Messungen in Betracht ziehen und stets einen Arzt für individuelle Beratung konsultieren.',
  },
  seoCrossPromo: {
    en: 'Looking for more health metrics? Try our',
    fr: 'Vous cherchez d\'autres indicateurs de santé ? Essayez notre',
    es: '¿Buscas más indicadores de salud? Prueba nuestra',
    pt: 'Procurando mais indicadores de saúde? Experimente nossa',
    de: 'Auf der Suche nach weiteren Gesundheitswerten? Probieren Sie unseren',
  },
  linkIdealWeight: {
    en: 'ideal weight calculator',
    fr: 'calculateur de poids idéal',
    es: 'calculadora de peso ideal',
    pt: 'calculadora de peso ideal',
    de: 'Idealgewicht-Rechner',
  },
  linkBodyFat: {
    en: 'body fat calculator',
    fr: 'calculateur de masse grasse',
    es: 'calculadora de grasa corporal',
    pt: 'calculadora de gordura corporal',
    de: 'Körperfett-Rechner',
  },
  linkCalorie: {
    en: 'calorie calculator',
    fr: 'calculateur de calories',
    es: 'calculadora de calorías',
    pt: 'calculadora de calorias',
    de: 'Kalorienrechner',
  },
  crossPromoSuffix: {
    en: 'for a broader view of your fitness.',
    fr: 'pour une vision plus complète de votre forme physique.',
    es: 'para una visión más amplia de tu estado físico.',
    pt: 'para uma visão mais ampla da sua forma física.',
    de: 'für einen umfassenderen Blick auf Ihre Fitness.',
  },
}

export default function BMIClient({
  defaultWeight,
  defaultHeight,
  defaultUnit,
  locale = 'en' as Locale,
}: {
  defaultWeight?: number
  defaultHeight?: number
  defaultUnit?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [unit, setUnit] = useState<UnitSystem>((defaultUnit as UnitSystem) ?? 'metric')
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 170)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')

  function getCategory(bmi: number): Category {
    if (bmi < 18.5) return { label: lt('underweight'), color: '#3B82F6' }
    if (bmi < 25) return { label: lt('normal'), color: '#22C55E' }
    if (bmi < 30) return { label: lt('overweight'), color: '#F97316' }
    return { label: lt('obese'), color: '#EF4444' }
  }

  const results = useMemo(() => {
    let wKg: number
    let hM: number

    if (unit === 'metric') {
      wKg = weightKg
      hM = heightCm / 100
    } else {
      wKg = weightLbs / 2.205
      hM = (heightFt * 12 + heightIn) * 0.0254
    }

    if (wKg <= 0 || hM <= 0) return null

    const bmi = wKg / (hM * hM)
    const category = getCategory(bmi)
    const range = {
      low: Math.round(18.5 * hM * hM * 10) / 10,
      high: Math.round(24.9 * hM * hM * 10) / 10,
    }

    return { bmi, category, range, heightM: hM }
  }, [unit, weightKg, weightLbs, heightCm, heightFt, heightIn, locale])

  // Gauge constants
  const gaugeMin = 12
  const gaugeMax = 42
  const sections = [
    { from: 12, to: 18.5, color: '#3B82F6', label: lt('gaugeUnder') },
    { from: 18.5, to: 25, color: '#22C55E', label: lt('gaugeNormal') },
    { from: 25, to: 30, color: '#F97316', label: lt('gaugeOver') },
    { from: 30, to: 42, color: '#EF4444', label: lt('gaugeObese') },
  ]

  const pointerPos = results
    ? Math.min(Math.max(((results.bmi - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0), 100)
    : 0

  const toggleBtn = (sys: UnitSystem): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === sys ? accent : 'transparent',
    color: unit === sys ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  return (
    <ToolShell name={lt('navTitle')} icon="⚖️" currentPath="/bmi-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleBMI')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{t('unitSystem', locale)}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('metric')} style={toggleBtn('metric')}>{t('metric', locale)}</button>
                <button onClick={() => setUnit('imperial')} style={toggleBtn('imperial')}>{t('imperial', locale)}</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Height */}
              {unit === 'metric' ? (
                <div>
                  <label style={labelStyle}>{lt('heightCm')}</label>
                  <input
                    type="number" value={heightCm} min={1}
                    onChange={e => setHeightCm(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>{t('height', locale)}</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightFt} min={0}
                        onChange={e => setHeightFt(Number(e.target.value))}
                        style={inputStyle}
                        placeholder={lt('ft')}
                      />
                      <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('feet')}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightIn} min={0} max={11}
                        onChange={e => setHeightIn(Number(e.target.value))}
                        style={inputStyle}
                        placeholder={lt('in')}
                      />
                      <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('inches')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? lt('weightKg') : lt('weightLbs')}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? weightKg : weightLbs}
                  min={1}
                  onChange={e => unit === 'metric' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Age (optional) */}
              <div>
                <label style={labelStyle}>{lt('ageOptional')}</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(e.target.value)}
                  style={inputStyle}
                  placeholder={lt('egAge')}
                />
              </div>

              {/* Gender (optional) */}
              <div>
                <label style={labelStyle}>{lt('genderOptional')}</label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={selectStyle}>
                  <option value="">{t('select', locale)}</option>
                  <option value="male">{t('male', locale)}</option>
                  <option value="female">{t('female', locale)}</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* BMI value */}
            <div style={{
              background: results.category.color + '0A',
              border: `1.5px solid ${results.category.color}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('yourBMI')}</div>
              <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: results.category.color }}>
                {results.bmi.toFixed(1)}
              </div>
              <div style={{
                display: 'inline-block', marginTop: 6, padding: '4px 14px', borderRadius: 20,
                background: results.category.color + '18', color: results.category.color,
                fontSize: 14, fontWeight: 700,
              }}>
                {results.category.label}
              </div>
            </div>

            {/* Visual gauge bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('bmiScale')}</div>
              <div style={{ position: 'relative', marginTop: 12, marginBottom: 24 }}>
                {/* Bar */}
                <div style={{ display: 'flex', height: 18, borderRadius: 9, overflow: 'hidden' }}>
                  {sections.map(s => (
                    <div key={s.label} style={{
                      flex: s.to - s.from,
                      background: s.color,
                      position: 'relative',
                    }} />
                  ))}
                </div>
                {/* Pointer */}
                <div style={{
                  position: 'absolute', top: -6, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', transition: 'left .3s',
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                    borderTop: '8px solid #1C1B18',
                  }} />
                </div>
                {/* BMI value above pointer */}
                <div style={{
                  position: 'absolute', top: -24, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', fontSize: 11, fontFamily: fm,
                  fontWeight: 700, color: '#1C1B18', transition: 'left .3s',
                }}>
                  {results.bmi.toFixed(1)}
                </div>
                {/* Labels */}
                <div style={{ display: 'flex', marginTop: 6 }}>
                  {sections.map(s => (
                    <div key={s.label} style={{
                      flex: s.to - s.from, fontSize: 10, color: '#9A958A', textAlign: 'center',
                    }}>
                      {s.label}
                    </div>
                  ))}
                </div>
                {/* Range numbers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {[12, 18.5, 25, 30, 42].map(v => (
                    <span key={v} style={{ fontSize: 9, fontFamily: fm, color: '#B0AAA0' }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Healthy range + info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('healthyRange')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {unit === 'metric'
                    ? `${results.range.low.toLocaleString(LOCALE_CODES[locale])} – ${results.range.high.toLocaleString(LOCALE_CODES[locale])} kg`
                    : `${(results.range.low * 2.205).toLocaleString(LOCALE_CODES[locale], { maximumFractionDigits: 1 })} – ${(results.range.high * 2.205).toLocaleString(LOCALE_CODES[locale], { maximumFractionDigits: 1 })} lbs`
                  }
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{t('height', locale)}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {unit === 'metric'
                    ? `${heightCm} cm`
                    : `${heightFt}' ${heightIn}"`
                  }
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 16, padding: '12px 16px', borderRadius: 10,
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
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoCrossPromo')} <a href="/ideal-weight" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkIdealWeight')}</a>, <a href="/body-fat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkBodyFat')}</a>, {locale === 'en' ? 'or' : locale === 'fr' ? 'ou' : locale === 'es' ? 'o' : locale === 'pt' ? 'ou' : 'oder'} <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkCalorie')}</a> {lt('crossPromoSuffix')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
