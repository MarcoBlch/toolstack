'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#0EA5E9'

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

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14,
  padding: 20, textAlign: 'center',
}

type UnitType = 'kg' | 'lbs'
type Gender = 'male' | 'female'

const DEFICIT_OPTIONS = [250, 500, 750, 1000]

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav & titles
  navTitle: { en: 'Calorie Deficit Calculator', fr: 'Calculateur de déficit calorique', es: 'Calculadora de déficit calórico', pt: 'Calculadora de déficit calórico', de: 'Kaloriendefizit-Rechner' },
  titleDeficit: { en: 'Calorie Deficit', fr: 'Déficit calorique', es: 'Déficit calórico', pt: 'Déficit calórico', de: 'Kaloriendefizit-' },
  titleCalc: { en: 'Calculator', fr: 'Calculateur', es: 'Calculadora', pt: 'Calculadora', de: 'Rechner' },
  subtitle: {
    en: 'Calculate how long to reach your goal weight with a safe daily calorie target.',
    fr: 'Calculez combien de temps il faut pour atteindre votre poids cible avec un objectif calorique quotidien sûr.',
    es: 'Calcula cuánto tiempo tardarás en alcanzar tu peso objetivo con un objetivo calórico diario seguro.',
    pt: 'Calcule quanto tempo levará para atingir seu peso alvo com uma meta calórica diária segura.',
    de: 'Berechnen Sie, wie lange es dauert, Ihr Zielgewicht mit einem sicheren täglichen Kalorienziel zu erreichen.',
  },

  // Input labels
  unit: { en: 'Unit', fr: 'Unité', es: 'Unidad', pt: 'Unidade', de: 'Einheit' },
  currentWeight: { en: 'Current Weight', fr: 'Poids actuel', es: 'Peso actual', pt: 'Peso atual', de: 'Aktuelles Gewicht' },
  goalWeight: { en: 'Goal Weight', fr: 'Poids cible', es: 'Peso objetivo', pt: 'Peso alvo', de: 'Zielgewicht' },
  tdeeDailyCal: { en: 'TDEE (daily calories)', fr: 'TDEE (calories quotidiennes)', es: 'TDEE (calorías diarias)', pt: 'TDEE (calorias diárias)', de: 'TDEE (tägliche Kalorien)' },
  dailyDeficitCal: { en: 'Daily Deficit (cal)', fr: 'Déficit quotidien (cal)', es: 'Déficit diario (cal)', pt: 'Déficit diário (cal)', de: 'Tägliches Defizit (cal)' },
  customDeficitCal: { en: 'Custom Deficit (cal/day)', fr: 'Déficit personnalisé (cal/jour)', es: 'Déficit personalizado (cal/día)', pt: 'Déficit personalizado (cal/dia)', de: 'Benutzerdefiniertes Defizit (cal/Tag)' },
  calDay: { en: 'cal/day', fr: 'cal/jour', es: 'cal/día', pt: 'cal/dia', de: 'cal/Tag' },
  custom: { en: 'Custom', fr: 'Personnalisé', es: 'Personalizado', pt: 'Personalizado', de: 'Benutzerdefiniert' },

  // Result labels
  dailyCalorieTarget: { en: 'Daily Calorie Target', fr: 'Objectif calorique quotidien', es: 'Objetivo calórico diario', pt: 'Meta calórica diária', de: 'Tägliches Kalorienziel' },
  caloriesPerDay: { en: 'calories / day', fr: 'calories / jour', es: 'calorías / día', pt: 'calorias / dia', de: 'Kalorien / Tag' },
  weeklyWeightLoss: { en: 'Weekly Weight Loss', fr: 'Perte de poids hebdomadaire', es: 'Pérdida de peso semanal', pt: 'Perda de peso semanal', de: 'Wöchentlicher Gewichtsverlust' },
  totalToLose: { en: 'Total to Lose', fr: 'Total à perdre', es: 'Total a perder', pt: 'Total a perder', de: 'Gesamt abzunehmen' },
  estimatedTime: { en: 'Estimated Time', fr: 'Temps estimé', es: 'Tiempo estimado', pt: 'Tempo estimado', de: 'Geschätzte Zeit' },
  weeks: { en: 'weeks', fr: 'semaines', es: 'semanas', pt: 'semanas', de: 'Wochen' },
  targetDate: { en: 'Target Date', fr: 'Date cible', es: 'Fecha objetivo', pt: 'Data alvo', de: 'Zieldatum' },
  weightLossProgress: { en: 'Weight Loss Progress', fr: 'Progression de la perte de poids', es: 'Progreso de pérdida de peso', pt: 'Progresso da perda de peso', de: 'Fortschritt beim Abnehmen' },
  pctToLose: { en: '% of current weight to lose', fr: '% du poids actuel à perdre', es: '% del peso actual a perder', pt: '% do peso atual a perder', de: '% des aktuellen Gewichts abzunehmen' },
  perWeek: { en: '/week', fr: '/semaine', es: '/semana', pt: '/semana', de: '/Woche' },

  // Safety warnings
  warningFemale: {
    en: 'Warning: Eating below 1,200 calories/day is not recommended for women without medical supervision.',
    fr: 'Attention : manger moins de 1 200 calories/jour n\'est pas recommandé pour les femmes sans supervision médicale.',
    es: 'Advertencia: comer menos de 1.200 calorías/día no se recomienda para mujeres sin supervisión médica.',
    pt: 'Aviso: comer menos de 1.200 calorias/dia não é recomendado para mulheres sem supervisão médica.',
    de: 'Warnung: Weniger als 1.200 Kalorien/Tag zu essen wird für Frauen ohne ärztliche Aufsicht nicht empfohlen.',
  },
  warningMale: {
    en: 'Warning: Eating below 1,500 calories/day is not recommended for men without medical supervision.',
    fr: 'Attention : manger moins de 1 500 calories/jour n\'est pas recommandé pour les hommes sans supervision médicale.',
    es: 'Advertencia: comer menos de 1.500 calorías/día no se recomienda para hombres sin supervisión médica.',
    pt: 'Aviso: comer menos de 1.500 calorias/dia não é recomendado para homens sem supervisão médica.',
    de: 'Warnung: Weniger als 1.500 Kalorien/Tag zu essen wird für Männer ohne ärztliche Aufsicht nicht empfohlen.',
  },

  // No results message
  noResults: {
    en: 'Your current weight must be greater than your goal weight to calculate a deficit plan.',
    fr: 'Votre poids actuel doit être supérieur à votre poids cible pour calculer un plan de déficit.',
    es: 'Tu peso actual debe ser mayor que tu peso objetivo para calcular un plan de déficit.',
    pt: 'Seu peso atual deve ser maior que seu peso alvo para calcular um plano de déficit.',
    de: 'Ihr aktuelles Gewicht muss größer sein als Ihr Zielgewicht, um einen Defizitplan zu berechnen.',
  },

  // Disclaimer
  disclaimer: {
    en: 'This calculator provides estimates only. Individual results vary based on metabolism, activity level, and body composition. Consult a healthcare professional before starting any weight loss program.',
    fr: 'Ce calculateur fournit uniquement des estimations. Les résultats individuels varient selon le métabolisme, le niveau d\'activité et la composition corporelle. Consultez un professionnel de la santé avant de commencer tout programme de perte de poids.',
    es: 'Esta calculadora proporciona solo estimaciones. Los resultados individuales varían según el metabolismo, el nivel de actividad y la composición corporal. Consulta a un profesional de la salud antes de comenzar cualquier programa de pérdida de peso.',
    pt: 'Esta calculadora fornece apenas estimativas. Os resultados individuais variam de acordo com o metabolismo, nível de atividade e composição corporal. Consulte um profissional de saúde antes de iniciar qualquer programa de perda de peso.',
    de: 'Dieser Rechner liefert nur Schätzungen. Individuelle Ergebnisse variieren je nach Stoffwechsel, Aktivitätsniveau und Körperzusammensetzung. Konsultieren Sie einen Gesundheitsexperten, bevor Sie ein Abnehmprogramm beginnen.',
  },

  // SEO
  seoH2: {
    en: 'Free Calorie Deficit Calculator',
    fr: 'Calculateur de déficit calorique gratuit',
    es: 'Calculadora de déficit calórico gratuita',
    pt: 'Calculadora de déficit calórico gratuita',
    de: 'Kostenloser Kaloriendefizit-Rechner',
  },
  seoP1: {
    en: 'Use this free calorie deficit calculator to find out how long it will take to reach your goal weight. Enter your current weight, goal weight, and daily calorie expenditure (TDEE) to get a personalized plan with safe daily calorie targets and estimated timelines.',
    fr: 'Utilisez ce calculateur de déficit calorique gratuit pour savoir combien de temps il faudra pour atteindre votre poids cible. Entrez votre poids actuel, votre poids cible et votre dépense calorique quotidienne (TDEE) pour obtenir un plan personnalisé avec des objectifs caloriques quotidiens sûrs et des délais estimés.',
    es: 'Usa esta calculadora de déficit calórico gratuita para saber cuánto tiempo tardarás en alcanzar tu peso objetivo. Ingresa tu peso actual, peso objetivo y gasto calórico diario (TDEE) para obtener un plan personalizado con objetivos calóricos diarios seguros y plazos estimados.',
    pt: 'Use esta calculadora de déficit calórico gratuita para descobrir quanto tempo levará para atingir seu peso alvo. Insira seu peso atual, peso alvo e gasto calórico diário (TDEE) para obter um plano personalizado com metas calóricas diárias seguras e prazos estimados.',
    de: 'Verwenden Sie diesen kostenlosen Kaloriendefizit-Rechner, um herauszufinden, wie lange es dauert, Ihr Zielgewicht zu erreichen. Geben Sie Ihr aktuelles Gewicht, Zielgewicht und täglichen Kalorienverbrauch (TDEE) ein, um einen personalisierten Plan mit sicheren täglichen Kalorienzielen und geschätzten Zeiträumen zu erhalten.',
  },
  seoH3a: {
    en: 'How Does a Calorie Deficit Work?',
    fr: 'Comment fonctionne un déficit calorique ?',
    es: '¿Cómo funciona un déficit calórico?',
    pt: 'Como funciona um déficit calórico?',
    de: 'Wie funktioniert ein Kaloriendefizit?',
  },
  seoP2: {
    en: 'A calorie deficit means eating fewer calories than your body burns each day. When you consistently maintain a deficit, your body uses stored fat for energy, leading to weight loss. A deficit of 500 calories per day typically results in about 0.45 kg (1 lb) of weight loss per week.',
    fr: 'Un déficit calorique signifie manger moins de calories que votre corps n\'en brûle chaque jour. Lorsque vous maintenez un déficit de manière constante, votre corps utilise les graisses stockées pour l\'énergie, ce qui entraîne une perte de poids. Un déficit de 500 calories par jour entraîne généralement une perte d\'environ 0,45 kg (1 lb) par semaine.',
    es: 'Un déficit calórico significa comer menos calorías de las que tu cuerpo quema cada día. Cuando mantienes un déficit de forma constante, tu cuerpo usa la grasa almacenada como energía, lo que lleva a la pérdida de peso. Un déficit de 500 calorías por día típicamente resulta en una pérdida de aproximadamente 0,45 kg (1 lb) por semana.',
    pt: 'Um déficit calórico significa comer menos calorias do que seu corpo queima a cada dia. Quando você mantém um déficit de forma consistente, seu corpo usa a gordura armazenada para energia, levando à perda de peso. Um déficit de 500 calorias por dia geralmente resulta em uma perda de aproximadamente 0,45 kg (1 lb) por semana.',
    de: 'Ein Kaloriendefizit bedeutet, weniger Kalorien zu essen, als Ihr Körper täglich verbrennt. Wenn Sie konsequent ein Defizit beibehalten, nutzt Ihr Körper gespeichertes Fett als Energie, was zum Gewichtsverlust führt. Ein Defizit von 500 Kalorien pro Tag führt typischerweise zu einem Gewichtsverlust von etwa 0,45 kg (1 lb) pro Woche.',
  },
  seoH3b: {
    en: 'What Is a Safe Calorie Deficit?',
    fr: 'Qu\'est-ce qu\'un déficit calorique sûr ?',
    es: '¿Qué es un déficit calórico seguro?',
    pt: 'O que é um déficit calórico seguro?',
    de: 'Was ist ein sicheres Kaloriendefizit?',
  },
  seoP3: {
    en: 'Most health experts recommend a daily deficit of 250 to 1,000 calories. Women should generally not eat fewer than 1,200 calories per day, and men should not go below 1,500 calories per day without medical supervision. A moderate deficit of 500 calories per day is considered safe and sustainable for most people.',
    fr: 'La plupart des experts en santé recommandent un déficit quotidien de 250 à 1 000 calories. Les femmes ne devraient généralement pas manger moins de 1 200 calories par jour, et les hommes ne devraient pas descendre en dessous de 1 500 calories par jour sans supervision médicale. Un déficit modéré de 500 calories par jour est considéré comme sûr et durable pour la plupart des gens.',
    es: 'La mayoría de los expertos en salud recomiendan un déficit diario de 250 a 1.000 calorías. Las mujeres generalmente no deberían comer menos de 1.200 calorías por día, y los hombres no deberían bajar de 1.500 calorías por día sin supervisión médica. Un déficit moderado de 500 calorías por día se considera seguro y sostenible para la mayoría de las personas.',
    pt: 'A maioria dos especialistas em saúde recomenda um déficit diário de 250 a 1.000 calorias. Mulheres geralmente não devem comer menos de 1.200 calorias por dia, e homens não devem ficar abaixo de 1.500 calorias por dia sem supervisão médica. Um déficit moderado de 500 calorias por dia é considerado seguro e sustentável para a maioria das pessoas.',
    de: 'Die meisten Gesundheitsexperten empfehlen ein tägliches Defizit von 250 bis 1.000 Kalorien. Frauen sollten generell nicht weniger als 1.200 Kalorien pro Tag essen, und Männer sollten nicht unter 1.500 Kalorien pro Tag gehen, ohne ärztliche Aufsicht. Ein moderates Defizit von 500 Kalorien pro Tag gilt als sicher und nachhaltig für die meisten Menschen.',
  },
  seoH3c: {
    en: 'What Is TDEE?',
    fr: 'Qu\'est-ce que le TDEE ?',
    es: '¿Qué es el TDEE?',
    pt: 'O que é TDEE?',
    de: 'Was ist TDEE?',
  },
  seoP4: {
    en: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day including basal metabolism, physical activity, and the thermic effect of food. Knowing your TDEE helps you set an accurate calorie target for weight loss.',
    fr: 'TDEE signifie Total Daily Energy Expenditure (Dépense Énergétique Totale Quotidienne) — le nombre total de calories que votre corps brûle en un jour, y compris le métabolisme basal, l\'activité physique et l\'effet thermique des aliments. Connaître votre TDEE vous aide à définir un objectif calorique précis pour la perte de poids.',
    es: 'TDEE significa Total Daily Energy Expenditure (Gasto Energético Total Diario) — el número total de calorías que tu cuerpo quema en un día, incluyendo el metabolismo basal, la actividad física y el efecto térmico de los alimentos. Conocer tu TDEE te ayuda a establecer un objetivo calórico preciso para perder peso.',
    pt: 'TDEE significa Total Daily Energy Expenditure (Gasto Energético Total Diário) — o número total de calorias que seu corpo queima em um dia, incluindo metabolismo basal, atividade física e efeito térmico dos alimentos. Conhecer seu TDEE ajuda a definir uma meta calórica precisa para perda de peso.',
    de: 'TDEE steht für Total Daily Energy Expenditure (Gesamter Täglicher Energieverbrauch) — die Gesamtzahl der Kalorien, die Ihr Körper an einem Tag verbrennt, einschließlich Grundumsatz, körperlicher Aktivität und thermischem Effekt der Nahrung. Ihren TDEE zu kennen hilft Ihnen, ein genaues Kalorienziel für den Gewichtsverlust festzulegen.',
  },
  seoP5: {
    en: 'Not sure what your TDEE is? Use our <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calorie calculator</a> to find your daily calorie needs based on the Mifflin-St Jeor equation. Once you have your deficit target, the <a href="/macro-calculator" style="color:#FF6B35;text-decoration:underline">macro calculator</a> can help you split those calories into the right balance of protein, carbs, and fat.',
    fr: 'Vous ne connaissez pas votre TDEE ? Utilisez notre <a href="/fr/calculateur-calories" style="color:#FF6B35;text-decoration:underline">calculateur de calories</a> pour trouver vos besoins caloriques quotidiens basés sur l\'équation de Mifflin-St Jeor. Une fois votre objectif de déficit défini, le <a href="/fr/calculateur-macros" style="color:#FF6B35;text-decoration:underline">calculateur de macros</a> peut vous aider à répartir ces calories en protéines, glucides et lipides.',
    es: '¿No sabes cuál es tu TDEE? Usa nuestra <a href="/es/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorías</a> para encontrar tus necesidades calóricas diarias basadas en la ecuación de Mifflin-St Jeor. Una vez que tengas tu objetivo de déficit, la <a href="/es/calculadora-macros" style="color:#FF6B35;text-decoration:underline">calculadora de macros</a> puede ayudarte a dividir esas calorías en proteínas, carbohidratos y grasas.',
    pt: 'Não sabe qual é seu TDEE? Use nossa <a href="/pt/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorias</a> para encontrar suas necessidades calóricas diárias baseadas na equação de Mifflin-St Jeor. Uma vez definida sua meta de déficit, a <a href="/pt/calculadora-macros" style="color:#FF6B35;text-decoration:underline">calculadora de macros</a> pode ajudá-lo a dividir essas calorias em proteínas, carboidratos e gorduras.',
    de: 'Sie kennen Ihren TDEE nicht? Verwenden Sie unseren <a href="/de/kalorienrechner" style="color:#FF6B35;text-decoration:underline">Kalorienrechner</a>, um Ihren täglichen Kalorienbedarf basierend auf der Mifflin-St-Jeor-Gleichung zu ermitteln. Sobald Sie Ihr Defizitziel haben, kann der <a href="/de/makro-rechner" style="color:#FF6B35;text-decoration:underline">Makro-Rechner</a> Ihnen helfen, diese Kalorien in das richtige Verhältnis von Protein, Kohlenhydraten und Fett aufzuteilen.',
  },
}

export default function CalorieDeficitClient({
  defaultCurrentWeight,
  defaultGoalWeight,
  defaultTDEE,
  defaultDeficit,
  locale = 'en' as Locale,
}: {
  defaultCurrentWeight?: number
  defaultGoalWeight?: number
  defaultTDEE?: number
  defaultDeficit?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [gender, setGender] = useState<Gender>('male')
  const [unit, setUnit] = useState<UnitType>('kg')
  const [currentWeight, setCurrentWeight] = useState(defaultCurrentWeight ?? 80)
  const [goalWeight, setGoalWeight] = useState(defaultGoalWeight ?? 70)
  const [tdee, setTdee] = useState(defaultTDEE ?? 2000)
  const [deficitPreset, setDeficitPreset] = useState<number | 'custom'>(defaultDeficit ?? 500)
  const [customDeficit, setCustomDeficit] = useState(defaultDeficit ?? 500)

  const deficit = deficitPreset === 'custom' ? customDeficit : deficitPreset

  const results = useMemo(() => {
    if (currentWeight <= 0 || goalWeight <= 0 || tdee <= 0 || deficit <= 0) return null
    if (currentWeight <= goalWeight) return null

    const dailyTarget = tdee - deficit

    // Weekly weight loss
    // 7700 kcal ~ 1 kg fat, 3500 kcal ~ 1 lb fat
    const weeklyLoss = unit === 'kg'
      ? (deficit * 7) / 7700
      : (deficit * 7) / 3500

    const totalToLose = currentWeight - goalWeight
    const estimatedWeeks = totalToLose / weeklyLoss
    const estimatedDays = Math.ceil(estimatedWeeks * 7)

    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + estimatedDays)

    const progressPct = Math.min(100, Math.max(0, ((currentWeight - goalWeight) / currentWeight) * 100))

    // Safety check
    const safeMin = gender === 'female' ? 1200 : 1500
    const unsafeWarning = dailyTarget < safeMin
      ? gender === 'female' ? lt('warningFemale') : lt('warningMale')
      : null

    return {
      dailyTarget,
      weeklyLoss,
      totalToLose,
      estimatedWeeks,
      targetDate,
      progressPct,
      unsafeWarning,
    }
  }, [currentWeight, goalWeight, tdee, deficit, unit, gender, locale])

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitBtn = (u: UnitType): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: unit === u ? accent : 'transparent',
    color: unit === u ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const formatDate = (d: Date) =>
    d.toLocaleDateString(LOCALE_CODES[locale], { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <ToolShell name={lt('navTitle')} icon="📉" currentPath="/calorie-deficit" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📉</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleDeficit')} <span style={{ color: accent }}>{lt('titleCalc')}</span>
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
              <label style={labelStyle}>{lt('unit')}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setUnit('kg')} style={unitBtn('kg')}>kg</button>
                <button onClick={() => setUnit('lbs')} style={unitBtn('lbs')}>lbs</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Current Weight */}
              <div>
                <label style={labelStyle}>{lt('currentWeight')} ({unit})</label>
                <input
                  type="number" value={currentWeight} min={1}
                  onChange={e => setCurrentWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Goal Weight */}
              <div>
                <label style={labelStyle}>{lt('goalWeight')} ({unit})</label>
                <input
                  type="number" value={goalWeight} min={1}
                  onChange={e => setGoalWeight(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* TDEE */}
              <div>
                <label style={labelStyle}>{lt('tdeeDailyCal')}</label>
                <input
                  type="number" value={tdee} min={1}
                  onChange={e => setTdee(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Deficit */}
              <div>
                <label style={labelStyle}>{lt('dailyDeficitCal')}</label>
                <select
                  value={deficitPreset}
                  onChange={e => {
                    const v = e.target.value
                    if (v === 'custom') {
                      setDeficitPreset('custom')
                    } else {
                      setDeficitPreset(Number(v))
                    }
                  }}
                  style={selectStyle}
                >
                  {DEFICIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt} {lt('calDay')}</option>
                  ))}
                  <option value="custom">{lt('custom')}</option>
                </select>
              </div>
            </div>

            {/* Custom deficit input */}
            {deficitPreset === 'custom' && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>{lt('customDeficitCal')}</label>
                <input
                  type="number" value={customDeficit} min={1}
                  onChange={e => setCustomDeficit(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Safety warning */}
            {results.unsafeWarning && (
              <div style={{
                marginBottom: 16, padding: '14px 18px', borderRadius: 12,
                background: '#FEF3C7', border: '1.5px solid #FDE68A',
                fontSize: 13, color: '#92400E', lineHeight: 1.6, fontWeight: 500,
              }}>
                {results.unsafeWarning}
              </div>
            )}

            {/* Daily calorie target -- hero card */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 18, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('dailyCalorieTarget')}</div>
              <div style={{ fontSize: 52, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {Math.round(results.dailyTarget).toLocaleString(LOCALE_CODES[locale])}
              </div>
              <div style={{ fontSize: 14, color: '#6B6560', marginTop: 6 }}>{lt('caloriesPerDay')}</div>
            </div>

            {/* Stat cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={cardStyle}>
                <div style={labelStyle}>{lt('weeklyWeightLoss')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {results.weeklyLoss.toFixed(2)} {unit}{lt('perWeek')}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>{lt('totalToLose')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {results.totalToLose.toFixed(1)} {unit}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>{lt('estimatedTime')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.ceil(results.estimatedWeeks)} {lt('weeks')}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={labelStyle}>{lt('targetDate')}</div>
                <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {formatDate(results.targetDate)}
                </div>
              </div>
            </div>

            {/* Progress bar visualization */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 24px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('weightLossProgress')}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                  {currentWeight} {unit}
                </span>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: accent }}>
                  {goalWeight} {unit}
                </span>
              </div>
              {/* Bar track */}
              <div style={{
                position: 'relative', height: 22, borderRadius: 11,
                background: '#F0EDE6', overflow: 'hidden',
              }}>
                {/* Filled portion */}
                <div style={{
                  height: '100%', borderRadius: 11,
                  background: `linear-gradient(90deg, ${accent}, #38BDF8)`,
                  width: `${results.progressPct}%`,
                  transition: 'width .4s ease',
                  minWidth: 4,
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#9A958A' }}>
                {results.progressPct.toFixed(1)}{lt('pctToLose')}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: '#F5F3EE', border: '1px solid #E8E4DB',
              fontSize: 12, color: '#6B6560', lineHeight: 1.6,
            }}>
              {lt('disclaimer')}
            </div>
          </section>
        )}

        {/* No results message */}
        {!results && currentWeight > 0 && goalWeight > 0 && currentWeight <= goalWeight && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{
              padding: '16px 20px', borderRadius: 12,
              background: '#EFF6FF', border: '1.5px solid #BFDBFE',
              fontSize: 13, color: '#1E40AF', textAlign: 'center',
            }}>
              {lt('noResults')}
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginBottom: 16 }}>
            {lt('seoP3')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{lt('seoH3c')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP4')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: lt('seoP5') }} />
        </section>
      </div>
    </ToolShell>
  )
}
