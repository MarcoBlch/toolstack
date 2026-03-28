'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#D97706'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

type UnitSystem = 'metric' | 'imperial'
type Gender = 'male' | 'female'

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav & titles
  navTitle: { en: 'Body Fat Calculator', fr: 'Calculateur de graisse corporelle', es: 'Calculadora de grasa corporal', pt: 'Calculadora de gordura corporal', de: 'Körperfettrechner' },
  titleBodyFat: { en: 'Body Fat', fr: 'Graisse corporelle', es: 'Grasa corporal', pt: 'Gordura corporal', de: 'Körperfett-' },
  titleCalc: { en: 'calculator', fr: 'calculateur', es: 'calculadora', pt: 'calculadora', de: 'Rechner' },
  subtitle: {
    en: 'US Navy method. Calculate body fat percentage, fat mass, and lean mass.',
    fr: 'Méthode US Navy. Calculez votre pourcentage de graisse corporelle, masse grasse et masse maigre.',
    es: 'Método US Navy. Calcula tu porcentaje de grasa corporal, masa grasa y masa magra.',
    pt: 'Método US Navy. Calcule seu percentual de gordura corporal, massa gorda e massa magra.',
    de: 'US-Navy-Methode. Berechnen Sie Ihren Körperfettanteil, Fettmasse und Magermasse.',
  },

  // Input labels
  metricCmKg: { en: 'Metric (cm / kg)', fr: 'Métrique (cm / kg)', es: 'Métrico (cm / kg)', pt: 'Métrico (cm / kg)', de: 'Metrisch (cm / kg)' },
  imperialInLbs: { en: 'Imperial (in / lbs)', fr: 'Impérial (in / lbs)', es: 'Imperial (in / lbs)', pt: 'Imperial (in / lbs)', de: 'Imperial (in / lbs)' },
  heightCm: { en: 'Height (cm)', fr: 'Taille (cm)', es: 'Altura (cm)', pt: 'Altura (cm)', de: 'Größe (cm)' },
  weightKg: { en: 'Weight (kg)', fr: 'Poids (kg)', es: 'Peso (kg)', pt: 'Peso (kg)', de: 'Gewicht (kg)' },
  weightLbs: { en: 'Weight (lbs)', fr: 'Poids (lbs)', es: 'Peso (lbs)', pt: 'Peso (lbs)', de: 'Gewicht (lbs)' },
  waistCm: { en: 'Waist at navel (cm)', fr: 'Tour de taille au nombril (cm)', es: 'Cintura al ombligo (cm)', pt: 'Cintura no umbigo (cm)', de: 'Taille am Bauchnabel (cm)' },
  waistIn: { en: 'Waist at navel (in)', fr: 'Tour de taille au nombril (in)', es: 'Cintura al ombligo (in)', pt: 'Cintura no umbigo (in)', de: 'Taille am Bauchnabel (in)' },
  neckCm: { en: 'Neck (cm)', fr: 'Cou (cm)', es: 'Cuello (cm)', pt: 'Pescoço (cm)', de: 'Hals (cm)' },
  neckIn: { en: 'Neck (in)', fr: 'Cou (in)', es: 'Cuello (in)', pt: 'Pescoço (in)', de: 'Hals (in)' },
  hipCm: { en: 'Hip (cm)', fr: 'Hanches (cm)', es: 'Cadera (cm)', pt: 'Quadril (cm)', de: 'Hüfte (cm)' },
  hipIn: { en: 'Hip (in)', fr: 'Hanches (in)', es: 'Cadera (in)', pt: 'Quadril (in)', de: 'Hüfte (in)' },
  feet: { en: 'feet', fr: 'pieds', es: 'pies', pt: 'pés', de: 'Fuß' },
  inches: { en: 'inches', fr: 'pouces', es: 'pulgadas', pt: 'polegadas', de: 'Zoll' },

  // Categories
  essentialFat: { en: 'Essential Fat', fr: 'Graisse essentielle', es: 'Grasa esencial', pt: 'Gordura essencial', de: 'Essentielles Fett' },
  athlete: { en: 'Athlete', fr: 'Athlète', es: 'Atleta', pt: 'Atleta', de: 'Athlet' },
  fitness: { en: 'Fitness', fr: 'Fitness', es: 'Fitness', pt: 'Fitness', de: 'Fitness' },
  average: { en: 'Average', fr: 'Moyen', es: 'Promedio', pt: 'Médio', de: 'Durchschnitt' },
  obese: { en: 'Obese', fr: 'Obèse', es: 'Obeso', pt: 'Obeso', de: 'Adipös' },

  // Short gauge labels
  essential: { en: 'Essential', fr: 'Essentiel', es: 'Esencial', pt: 'Essencial', de: 'Essent.' },

  // Result labels
  yourBodyFat: { en: 'Your Body Fat', fr: 'Votre graisse corporelle', es: 'Tu grasa corporal', pt: 'Sua gordura corporal', de: 'Ihr Körperfett' },
  bodyFatScale: { en: 'Body Fat Scale', fr: 'Échelle de graisse corporelle', es: 'Escala de grasa corporal', pt: 'Escala de gordura corporal', de: 'Körperfettskala' },
  fatMass: { en: 'Fat Mass', fr: 'Masse grasse', es: 'Masa grasa', pt: 'Massa gorda', de: 'Fettmasse' },
  leanMass: { en: 'Lean Mass', fr: 'Masse maigre', es: 'Masa magra', pt: 'Massa magra', de: 'Magermasse' },

  // Disclaimer
  disclaimer: {
    en: 'The US Navy method provides an estimate. Results may vary based on individual body composition. Consult a healthcare professional for personalized advice.',
    fr: 'La méthode US Navy fournit une estimation. Les résultats peuvent varier selon la composition corporelle individuelle. Consultez un professionnel de la santé pour des conseils personnalisés.',
    es: 'El método US Navy proporciona una estimación. Los resultados pueden variar según la composición corporal individual. Consulta a un profesional de la salud para consejos personalizados.',
    pt: 'O método US Navy fornece uma estimativa. Os resultados podem variar de acordo com a composição corporal individual. Consulte um profissional de saúde para orientação personalizada.',
    de: 'Die US-Navy-Methode liefert eine Schätzung. Die Ergebnisse können je nach individueller Körperzusammensetzung variieren. Konsultieren Sie einen Gesundheitsexperten für eine individuelle Beratung.',
  },

  // SEO
  seoH2: {
    en: 'Free Body Fat Calculator',
    fr: 'Calculateur de graisse corporelle gratuit',
    es: 'Calculadora de grasa corporal gratuita',
    pt: 'Calculadora de gordura corporal gratuita',
    de: 'Kostenloser Körperfettrechner',
  },
  seoP1: {
    en: 'Free body fat calculator using the US Navy method. Calculate your body fat percentage, fat mass, and lean mass instantly. The US Navy body fat formula uses circumference measurements of your waist, neck, and height (plus hips for women) to estimate body fat percentage. This method is widely used by the military and fitness professionals as a reliable body composition assessment.',
    fr: 'Calculateur de graisse corporelle gratuit utilisant la méthode US Navy. Calculez instantanément votre pourcentage de graisse corporelle, votre masse grasse et votre masse maigre. La formule US Navy utilise les mesures de circonférence de votre taille, cou et hauteur (plus les hanches pour les femmes) pour estimer le pourcentage de graisse corporelle. Cette méthode est largement utilisée par l\'armée et les professionnels du fitness comme évaluation fiable de la composition corporelle.',
    es: 'Calculadora de grasa corporal gratuita usando el método US Navy. Calcula tu porcentaje de grasa corporal, masa grasa y masa magra al instante. La fórmula US Navy utiliza medidas de circunferencia de cintura, cuello y altura (más caderas para mujeres) para estimar el porcentaje de grasa corporal. Este método es ampliamente utilizado por militares y profesionales del fitness como una evaluación confiable de la composición corporal.',
    pt: 'Calculadora de gordura corporal gratuita usando o método US Navy. Calcule instantaneamente seu percentual de gordura corporal, massa gorda e massa magra. A fórmula US Navy usa medidas de circunferência da cintura, pescoço e altura (mais quadril para mulheres) para estimar o percentual de gordura corporal. Este método é amplamente utilizado por militares e profissionais de fitness como uma avaliação confiável da composição corporal.',
    de: 'Kostenloser Körperfettrechner mit der US-Navy-Methode. Berechnen Sie sofort Ihren Körperfettanteil, Fettmasse und Magermasse. Die US-Navy-Formel verwendet Umfangsmessungen von Taille, Hals und Größe (plus Hüfte bei Frauen), um den Körperfettanteil zu schätzen. Diese Methode wird vom Militär und Fitnessexperten als zuverlässige Bewertung der Körperzusammensetzung weitverbreitet eingesetzt.',
  },
  seoH3a: {
    en: 'How is body fat calculated?',
    fr: 'Comment la graisse corporelle est-elle calculée ?',
    es: '¿Cómo se calcula la grasa corporal?',
    pt: 'Como a gordura corporal é calculada?',
    de: 'Wie wird das Körperfett berechnet?',
  },
  seoP2: {
    en: 'For men, the formula is: 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76. For women, it includes hip measurement: 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387. All measurements are in centimeters. The calculator also shows your fat mass and lean mass based on your total body weight.',
    fr: 'Pour les hommes, la formule est : 86,010 × log10(taille − cou) − 70,041 × log10(hauteur) + 36,76. Pour les femmes, elle inclut la mesure des hanches : 163,205 × log10(taille + hanches − cou) − 97,684 × log10(hauteur) − 78,387. Toutes les mesures sont en centimètres. Le calculateur affiche également votre masse grasse et masse maigre en fonction de votre poids corporel total.',
    es: 'Para hombres, la fórmula es: 86,010 × log10(cintura − cuello) − 70,041 × log10(altura) + 36,76. Para mujeres, incluye la medida de cadera: 163,205 × log10(cintura + cadera − cuello) − 97,684 × log10(altura) − 78,387. Todas las medidas están en centímetros. La calculadora también muestra tu masa grasa y masa magra según tu peso corporal total.',
    pt: 'Para homens, a fórmula é: 86,010 × log10(cintura − pescoço) − 70,041 × log10(altura) + 36,76. Para mulheres, inclui a medida do quadril: 163,205 × log10(cintura + quadril − pescoço) − 97,684 × log10(altura) − 78,387. Todas as medidas são em centímetros. A calculadora também mostra sua massa gorda e massa magra com base no peso corporal total.',
    de: 'Für Männer lautet die Formel: 86,010 × log10(Taille − Hals) − 70,041 × log10(Größe) + 36,76. Für Frauen enthält sie die Hüftmessung: 163,205 × log10(Taille + Hüfte − Hals) − 97,684 × log10(Größe) − 78,387. Alle Messungen sind in Zentimetern. Der Rechner zeigt auch Ihre Fettmasse und Magermasse basierend auf Ihrem Gesamtkörpergewicht.',
  },
  seoH3b: {
    en: 'Body fat categories',
    fr: 'Catégories de graisse corporelle',
    es: 'Categorías de grasa corporal',
    pt: 'Categorias de gordura corporal',
    de: 'Körperfettkategorien',
  },
  seoP3: {
    en: 'Body fat ranges differ by gender. For men: Essential Fat (2–5%), Athlete (6–13%), Fitness (14–17%), Average (18–24%), and Obese (25%+). For women: Essential Fat (10–13%), Athlete (14–20%), Fitness (21–24%), Average (25–31%), and Obese (32%+). Maintaining a healthy body fat percentage supports cardiovascular health, energy levels, and overall fitness.',
    fr: 'Les plages de graisse corporelle diffèrent selon le sexe. Pour les hommes : Graisse essentielle (2–5 %), Athlète (6–13 %), Fitness (14–17 %), Moyen (18–24 %) et Obèse (25 %+). Pour les femmes : Graisse essentielle (10–13 %), Athlète (14–20 %), Fitness (21–24 %), Moyen (25–31 %) et Obèse (32 %+). Maintenir un pourcentage de graisse corporelle sain favorise la santé cardiovasculaire, les niveaux d\'énergie et la forme physique générale.',
    es: 'Los rangos de grasa corporal difieren por género. Para hombres: Grasa esencial (2–5 %), Atleta (6–13 %), Fitness (14–17 %), Promedio (18–24 %) y Obeso (25 %+). Para mujeres: Grasa esencial (10–13 %), Atleta (14–20 %), Fitness (21–24 %), Promedio (25–31 %) y Obeso (32 %+). Mantener un porcentaje saludable de grasa corporal apoya la salud cardiovascular, los niveles de energía y el estado físico general.',
    pt: 'As faixas de gordura corporal diferem por gênero. Para homens: Gordura essencial (2–5 %), Atleta (6–13 %), Fitness (14–17 %), Médio (18–24 %) e Obeso (25 %+). Para mulheres: Gordura essencial (10–13 %), Atleta (14–20 %), Fitness (21–24 %), Médio (25–31 %) e Obeso (32 %+). Manter um percentual saudável de gordura corporal apoia a saúde cardiovascular, os níveis de energia e a aptidão física geral.',
    de: 'Die Körperfettbereiche unterscheiden sich nach Geschlecht. Für Männer: Essentielles Fett (2–5 %), Athlet (6–13 %), Fitness (14–17 %), Durchschnitt (18–24 %) und Adipös (25 %+). Für Frauen: Essentielles Fett (10–13 %), Athlet (14–20 %), Fitness (21–24 %), Durchschnitt (25–31 %) und Adipös (32 %+). Ein gesunder Körperfettanteil unterstützt die Herzgesundheit, das Energieniveau und die allgemeine Fitness.',
  },
  seoP4: {
    en: 'For a broader view of your health metrics, check your score with our <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">BMI calculator</a> or find your target weight using the <a href="/ideal-weight" style="color:#FF6B35;text-decoration:underline">ideal weight calculator</a>. While BMI uses only height and weight, body fat percentage gives a more complete picture of your actual body composition.',
    fr: 'Pour une vue plus large de vos métriques de santé, vérifiez votre score avec notre <a href="/fr/calculateur-imc" style="color:#FF6B35;text-decoration:underline">calculateur d\'IMC</a> ou trouvez votre poids cible avec le <a href="/fr/calculateur-poids-ideal" style="color:#FF6B35;text-decoration:underline">calculateur de poids idéal</a>. Alors que l\'IMC n\'utilise que la taille et le poids, le pourcentage de graisse corporelle donne une image plus complète de votre composition corporelle réelle.',
    es: 'Para una visión más amplia de tus métricas de salud, verifica tu puntuación con nuestra <a href="/es/calculadora-imc" style="color:#FF6B35;text-decoration:underline">calculadora de IMC</a> o encuentra tu peso objetivo con la <a href="/es/calculadora-peso-ideal" style="color:#FF6B35;text-decoration:underline">calculadora de peso ideal</a>. Mientras que el IMC solo usa altura y peso, el porcentaje de grasa corporal da una imagen más completa de tu composición corporal real.',
    pt: 'Para uma visão mais ampla de suas métricas de saúde, verifique sua pontuação com nossa <a href="/pt/calculadora-imc" style="color:#FF6B35;text-decoration:underline">calculadora de IMC</a> ou encontre seu peso alvo com a <a href="/pt/calculadora-peso-ideal" style="color:#FF6B35;text-decoration:underline">calculadora de peso ideal</a>. Enquanto o IMC usa apenas altura e peso, o percentual de gordura corporal dá uma imagem mais completa da sua composição corporal real.',
    de: 'Für einen umfassenderen Blick auf Ihre Gesundheitswerte überprüfen Sie Ihren Wert mit unserem <a href="/de/bmi-rechner" style="color:#FF6B35;text-decoration:underline">BMI-Rechner</a> oder finden Sie Ihr Zielgewicht mit dem <a href="/de/idealgewicht-rechner" style="color:#FF6B35;text-decoration:underline">Idealgewicht-Rechner</a>. Während der BMI nur Größe und Gewicht verwendet, gibt der Körperfettanteil ein vollständigeres Bild Ihrer tatsächlichen Körperzusammensetzung.',
  },
}

interface CategoryInfo {
  label: string
  color: string
  range: string
}

export default function BodyFatClient({
  defaultGender,
  defaultWeight,
  defaultHeight,
  defaultWaist,
  defaultNeck,
  locale = 'en' as Locale,
}: {
  defaultGender?: string
  defaultWeight?: number
  defaultHeight?: number
  defaultWaist?: number
  defaultNeck?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  function getCategory(bf: number, g: Gender): CategoryInfo {
    if (g === 'male') {
      if (bf <= 5) return { label: lt('essentialFat'), color: '#3B82F6', range: '2–5%' }
      if (bf <= 13) return { label: lt('athlete'), color: '#22C55E', range: '6–13%' }
      if (bf <= 17) return { label: lt('fitness'), color: '#16A34A', range: '14–17%' }
      if (bf <= 24) return { label: lt('average'), color: '#F97316', range: '18–24%' }
      return { label: lt('obese'), color: '#EF4444', range: '25%+' }
    } else {
      if (bf <= 13) return { label: lt('essentialFat'), color: '#3B82F6', range: '10–13%' }
      if (bf <= 20) return { label: lt('athlete'), color: '#22C55E', range: '14–20%' }
      if (bf <= 24) return { label: lt('fitness'), color: '#16A34A', range: '21–24%' }
      if (bf <= 31) return { label: lt('average'), color: '#F97316', range: '25–31%' }
      return { label: lt('obese'), color: '#EF4444', range: '32%+' }
    }
  }

  const maleSections = [
    { from: 2, to: 5, color: '#3B82F6', label: lt('essential') },
    { from: 5, to: 13, color: '#22C55E', label: lt('athlete') },
    { from: 13, to: 17, color: '#16A34A', label: lt('fitness') },
    { from: 17, to: 24, color: '#F97316', label: lt('average') },
    { from: 24, to: 45, color: '#EF4444', label: lt('obese') },
  ]

  const femaleSections = [
    { from: 10, to: 13, color: '#3B82F6', label: lt('essential') },
    { from: 13, to: 20, color: '#22C55E', label: lt('athlete') },
    { from: 20, to: 24, color: '#16A34A', label: lt('fitness') },
    { from: 24, to: 31, color: '#F97316', label: lt('average') },
    { from: 31, to: 50, color: '#EF4444', label: lt('obese') },
  ]

  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [unit, setUnit] = useState<UnitSystem>('metric')

  // Metric values
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 80)
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 175)
  const [waistCm, setWaistCm] = useState(defaultWaist ?? 85)
  const [neckCm, setNeckCm] = useState(defaultNeck ?? 38)
  const [hipCm, setHipCm] = useState(95)

  // Imperial values
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 176)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [waistIn, setWaistIn] = useState(defaultWaist ?? 33.5)
  const [neckIn, setNeckIn] = useState(defaultNeck ?? 15)
  const [hipIn, setHipIn] = useState(37.5)

  const results = useMemo(() => {
    let hCm: number
    let wCm: number
    let nCm: number
    let hiCm: number
    let wKg: number

    if (unit === 'metric') {
      hCm = heightCm
      wCm = waistCm
      nCm = neckCm
      hiCm = hipCm
      wKg = weightKg
    } else {
      hCm = (heightFt * 12 + heightIn) * 2.54
      wCm = waistIn * 2.54
      nCm = neckIn * 2.54
      hiCm = hipIn * 2.54
      wKg = weightLbs / 2.205
    }

    if (hCm <= 0 || wCm <= 0 || nCm <= 0 || wKg <= 0) return null
    if (gender === 'female' && hiCm <= 0) return null

    // US Navy formula (measurements in cm)
    let bf: number
    if (gender === 'male') {
      const diff = wCm - nCm
      if (diff <= 0) return null
      bf = 86.010 * Math.log10(diff) - 70.041 * Math.log10(hCm) + 36.76
    } else {
      const sum = wCm + hiCm - nCm
      if (sum <= 0) return null
      bf = 163.205 * Math.log10(sum) - 97.684 * Math.log10(hCm) - 78.387
    }

    if (bf < 0) bf = 0
    if (bf > 60) bf = 60

    const category = getCategory(bf, gender)
    const fatMassKg = (bf / 100) * wKg
    const leanMassKg = wKg - fatMassKg

    return { bf, category, fatMassKg, leanMassKg, wKg }
  }, [unit, gender, weightKg, weightLbs, heightCm, heightFt, heightIn, waistCm, waistIn, neckCm, neckIn, hipCm, hipIn, locale])

  const sections = gender === 'male' ? maleSections : femaleSections
  const gaugeMin = sections[0].from
  const gaugeMax = sections[sections.length - 1].to

  const pointerPos = results
    ? Math.min(Math.max(((results.bf - gaugeMin) / (gaugeMax - gaugeMin)) * 100, 0), 100)
    : 0

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitBtn = (sys: UnitSystem): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === sys ? accent : 'transparent',
    color: unit === sys ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const boundaryValues = sections.map(s => s.from)
  boundaryValues.push(sections[sections.length - 1].to)
  const uniqueBoundaries = [...new Set(boundaryValues)]

  return (
    <ToolShell name={lt('navTitle')} icon="📊" currentPath="/body-fat-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📊</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleBodyFat')} <span style={{ color: accent }}>{lt('titleCalc')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Gender toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{t('gender', locale)}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setGender('male')} style={genderBtn('male')}>{t('male', locale)}</button>
                <button onClick={() => setGender('female')} style={genderBtn('female')}>{t('female', locale)}</button>
              </div>
            </div>

            {/* Unit toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{t('unitSystem', locale)}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('metric')} style={unitBtn('metric')}>{lt('metricCmKg')}</button>
                <button onClick={() => setUnit('imperial')} style={unitBtn('imperial')}>{lt('imperialInLbs')}</button>
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
                        placeholder="ft"
                      />
                      <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('feet')}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightIn} min={0} max={11}
                        onChange={e => setHeightIn(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="in"
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

              {/* Waist */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? lt('waistCm') : lt('waistIn')}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? waistCm : waistIn}
                  min={1}
                  step={0.1}
                  onChange={e => unit === 'metric' ? setWaistCm(Number(e.target.value)) : setWaistIn(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Neck */}
              <div>
                <label style={labelStyle}>{unit === 'metric' ? lt('neckCm') : lt('neckIn')}</label>
                <input
                  type="number"
                  value={unit === 'metric' ? neckCm : neckIn}
                  min={1}
                  step={0.1}
                  onChange={e => unit === 'metric' ? setNeckCm(Number(e.target.value)) : setNeckIn(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Hip - only for females */}
              {gender === 'female' && (
                <div>
                  <label style={labelStyle}>{unit === 'metric' ? lt('hipCm') : lt('hipIn')}</label>
                  <input
                    type="number"
                    value={unit === 'metric' ? hipCm : hipIn}
                    min={1}
                    step={0.1}
                    onChange={e => unit === 'metric' ? setHipCm(Number(e.target.value)) : setHipIn(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Body fat value */}
            <div style={{
              background: results.category.color + '0A',
              border: `1.5px solid ${results.category.color}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('yourBodyFat')}</div>
              <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: results.category.color }}>
                {results.bf.toFixed(1)}%
              </div>
              <div style={{
                display: 'inline-block', marginTop: 6, padding: '4px 14px', borderRadius: 20,
                background: results.category.color + '18', color: results.category.color,
                fontSize: 14, fontWeight: 700,
              }}>
                {results.category.label} ({results.category.range})
              </div>
            </div>

            {/* Visual gauge bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('bodyFatScale')}</div>
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
                {/* BF value above pointer */}
                <div style={{
                  position: 'absolute', top: -24, left: `${pointerPos}%`,
                  transform: 'translateX(-50%)', fontSize: 11, fontFamily: fm,
                  fontWeight: 700, color: '#1C1B18', transition: 'left .3s',
                }}>
                  {results.bf.toFixed(1)}%
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
                  {uniqueBoundaries.map(v => (
                    <span key={v} style={{ fontSize: 9, fontFamily: fm, color: '#B0AAA0' }}>{v}%</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fat mass & Lean mass */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('fatMass')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#F97316' }}>
                  {unit === 'metric'
                    ? `${results.fatMassKg.toFixed(1)} kg`
                    : `${(results.fatMassKg * 2.205).toFixed(1)} lbs`
                  }
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('leanMass')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#22C55E' }}>
                  {unit === 'metric'
                    ? `${results.leanMassKg.toFixed(1)} kg`
                    : `${(results.leanMassKg * 2.205).toFixed(1)} lbs`
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
