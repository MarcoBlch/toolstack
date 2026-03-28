'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#16A34A'
const carbColor = '#F59E0B'
const fatColor = '#EF4444'

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

const LABELS: Record<string, Record<Locale, string>> = {
  // Nav & titles
  navTitle: { en: 'Macro Calculator', fr: 'Calculateur de macros', es: 'Calculadora de macros', pt: 'Calculadora de macros', de: 'Makro-Rechner' },
  titleMacro: { en: 'Macro', fr: 'Calculateur de', es: 'Calculadora de', pt: 'Calculadora de', de: 'Makro-' },
  titleCalc: { en: 'calculator', fr: 'macros', es: 'macros', pt: 'macros', de: 'Rechner' },
  subtitle: {
    en: 'Calculate your daily protein, carbs, and fat intake. Choose a preset or customize your split.',
    fr: 'Calculez votre apport quotidien en protéines, glucides et lipides. Choisissez un preset ou personnalisez votre répartition.',
    es: 'Calcula tu ingesta diaria de proteínas, carbohidratos y grasas. Elige un preset o personaliza tu distribución.',
    pt: 'Calcule sua ingestão diária de proteínas, carboidratos e gorduras. Escolha um preset ou personalize sua distribuição.',
    de: 'Berechnen Sie Ihre tägliche Protein-, Kohlenhydrat- und Fettzufuhr. Wählen Sie ein Preset oder passen Sie Ihre Aufteilung an.',
  },

  // Input labels
  dailyCalories: { en: 'Daily Calories', fr: 'Calories quotidiennes', es: 'Calorías diarias', pt: 'Calorias diárias', de: 'Tägliche Kalorien' },
  goalPreset: { en: 'Goal / Preset', fr: 'Objectif / Preset', es: 'Objetivo / Preset', pt: 'Objetivo / Preset', de: 'Ziel / Preset' },

  // Goal options
  balanced: { en: 'Balanced', fr: 'Équilibré', es: 'Equilibrado', pt: 'Equilibrado', de: 'Ausgewogen' },
  lowCarb: { en: 'Low Carb', fr: 'Faible en glucides', es: 'Bajo en carbohidratos', pt: 'Baixo em carboidratos', de: 'Low Carb' },
  highProtein: { en: 'High Protein', fr: 'Riche en protéines', es: 'Alto en proteínas', pt: 'Rico em proteínas', de: 'Proteinreich' },
  keto: { en: 'Keto', fr: 'Keto', es: 'Keto', pt: 'Keto', de: 'Keto' },
  custom: { en: 'Custom', fr: 'Personnalisé', es: 'Personalizado', pt: 'Personalizado', de: 'Benutzerdefiniert' },

  // Macros
  protein: { en: 'Protein', fr: 'Protéines', es: 'Proteínas', pt: 'Proteínas', de: 'Protein' },
  carbs: { en: 'Carbs', fr: 'Glucides', es: 'Carbohidratos', pt: 'Carboidratos', de: 'Kohlenhydrate' },
  fat: { en: 'Fat', fr: 'Lipides', es: 'Grasas', pt: 'Gorduras', de: 'Fett' },

  // Result labels
  macroSplit: { en: 'Macro Split', fr: 'Répartition des macros', es: 'Distribución de macros', pt: 'Distribuição de macros', de: 'Makro-Aufteilung' },

  // SEO
  seoH2: {
    en: 'Free Macro Calculator',
    fr: 'Calculateur de macros gratuit',
    es: 'Calculadora de macros gratuita',
    pt: 'Calculadora de macros gratuita',
    de: 'Kostenloser Makro-Rechner',
  },
  seoP1: {
    en: 'Use this free macro calculator to find your ideal daily intake of protein, carbohydrates, and fat. Whether you follow a balanced diet, low carb, high protein, keto, or a fully custom macro split, this tool instantly calculates the grams you need. Macronutrients are the foundation of any nutrition plan -- protein supports muscle recovery and growth at 4 calories per gram, carbohydrates fuel your workouts and daily energy at 4 calories per gram, and dietary fat supports hormone production and nutrient absorption at 9 calories per gram.',
    fr: 'Utilisez ce calculateur de macros gratuit pour trouver votre apport quotidien idéal en protéines, glucides et lipides. Que vous suiviez un régime équilibré, faible en glucides, riche en protéines, keto ou une répartition entièrement personnalisée, cet outil calcule instantanément les grammes nécessaires. Les macronutriments sont la base de tout plan nutritionnel : les protéines favorisent la récupération et la croissance musculaire à 4 calories par gramme, les glucides alimentent vos entraînements et votre énergie quotidienne à 4 calories par gramme, et les lipides soutiennent la production hormonale et l\'absorption des nutriments à 9 calories par gramme.',
    es: 'Usa esta calculadora de macros gratuita para encontrar tu ingesta diaria ideal de proteínas, carbohidratos y grasas. Ya sea que sigas una dieta equilibrada, baja en carbohidratos, alta en proteínas, keto o una distribución completamente personalizada, esta herramienta calcula instantáneamente los gramos que necesitas. Los macronutrientes son la base de cualquier plan nutricional: las proteínas apoyan la recuperación y el crecimiento muscular a 4 calorías por gramo, los carbohidratos alimentan tus entrenamientos y tu energía diaria a 4 calorías por gramo, y las grasas dietéticas apoyan la producción hormonal y la absorción de nutrientes a 9 calorías por gramo.',
    pt: 'Use esta calculadora de macros gratuita para encontrar sua ingestão diária ideal de proteínas, carboidratos e gorduras. Seja seguindo uma dieta equilibrada, baixa em carboidratos, rica em proteínas, keto ou uma distribuição totalmente personalizada, esta ferramenta calcula instantaneamente os gramas necessários. Os macronutrientes são a base de qualquer plano nutricional: as proteínas apoiam a recuperação e o crescimento muscular a 4 calorias por grama, os carboidratos alimentam seus treinos e energia diária a 4 calorias por grama, e as gorduras dietéticas apoiam a produção hormonal e a absorção de nutrientes a 9 calorias por grama.',
    de: 'Verwenden Sie diesen kostenlosen Makro-Rechner, um Ihre ideale tägliche Aufnahme von Protein, Kohlenhydraten und Fett zu ermitteln. Ob Sie eine ausgewogene Ernährung, Low Carb, proteinreich, Keto oder eine vollständig individuelle Makro-Aufteilung verfolgen – dieses Tool berechnet sofort die benötigten Gramm. Makronährstoffe sind die Grundlage jedes Ernährungsplans: Protein unterstützt die Muskelregeneration und das Wachstum bei 4 Kalorien pro Gramm, Kohlenhydrate liefern Energie für Ihre Workouts und den Alltag bei 4 Kalorien pro Gramm, und Nahrungsfett unterstützt die Hormonproduktion und Nährstoffaufnahme bei 9 Kalorien pro Gramm.',
  },
  seoH3a: {
    en: 'Choosing the Right Macro Split',
    fr: 'Choisir la bonne répartition de macros',
    es: 'Elegir la distribución de macros correcta',
    pt: 'Escolhendo a distribuição de macros correta',
    de: 'Die richtige Makro-Aufteilung wählen',
  },
  seoP2: {
    en: 'The balanced preset (30/40/30) works well for general health and moderate exercise. A high protein split (40/35/25) supports muscle building and recovery, especially during strength training. The keto preset (25/5/70) drastically reduces carbs to promote fat adaptation. If none of these fit your needs, the custom mode lets you drag sliders to set your exact percentages while keeping the total locked at 100%.',
    fr: 'Le preset équilibré (30/40/30) convient bien à la santé générale et à l\'exercice modéré. Une répartition riche en protéines (40/35/25) favorise la construction musculaire et la récupération, surtout pendant l\'entraînement de force. Le preset keto (25/5/70) réduit drastiquement les glucides pour favoriser l\'adaptation aux graisses. Si aucun de ces presets ne convient, le mode personnalisé vous permet de glisser les curseurs pour définir vos pourcentages exacts tout en maintenant le total à 100 %.',
    es: 'El preset equilibrado (30/40/30) funciona bien para la salud general y el ejercicio moderado. Una distribución alta en proteínas (40/35/25) apoya la construcción muscular y la recuperación, especialmente durante el entrenamiento de fuerza. El preset keto (25/5/70) reduce drásticamente los carbohidratos para promover la adaptación a las grasas. Si ninguno se ajusta a tus necesidades, el modo personalizado te permite arrastrar controles para establecer tus porcentajes exactos manteniendo el total en 100 %.',
    pt: 'O preset equilibrado (30/40/30) funciona bem para a saúde geral e exercício moderado. Uma distribuição rica em proteínas (40/35/25) apoia a construção muscular e a recuperação, especialmente durante o treinamento de força. O preset keto (25/5/70) reduz drasticamente os carboidratos para promover a adaptação às gorduras. Se nenhum deles atender às suas necessidades, o modo personalizado permite arrastar controles para definir seus percentuais exatos mantendo o total em 100 %.',
    de: 'Das ausgewogene Preset (30/40/30) eignet sich gut für die allgemeine Gesundheit und moderate Bewegung. Eine proteinreiche Aufteilung (40/35/25) unterstützt den Muskelaufbau und die Regeneration, besonders beim Krafttraining. Das Keto-Preset (25/5/70) reduziert Kohlenhydrate drastisch zur Fettadaption. Wenn keines dieser Presets passt, können Sie im benutzerdefinierten Modus die Schieberegler ziehen, um Ihre exakten Prozentsätze festzulegen, während die Gesamtsumme bei 100 % bleibt.',
  },
  seoH3b: {
    en: 'Why Macros Matter for Your Goals',
    fr: 'Pourquoi les macros comptent pour vos objectifs',
    es: 'Por qué los macros importan para tus objetivos',
    pt: 'Por que os macros importam para seus objetivos',
    de: 'Warum Makros für Ihre Ziele wichtig sind',
  },
  seoP3: {
    en: 'Tracking macros rather than just total calories gives you more control over body composition. Two people eating 2,000 calories can see very different results depending on their protein-to-fat ratio. Higher protein intake preserves lean muscle during a calorie deficit, while adequate carbohydrates maintain training performance. Adjusting your macro split based on your goals is one of the most effective nutrition strategies available.',
    fr: 'Suivre les macros plutôt que les calories totales vous donne plus de contrôle sur la composition corporelle. Deux personnes mangeant 2 000 calories peuvent obtenir des résultats très différents selon leur ratio protéines/lipides. Un apport plus élevé en protéines préserve la masse musculaire maigre lors d\'un déficit calorique, tandis que des glucides adéquats maintiennent les performances d\'entraînement. Ajuster votre répartition de macros en fonction de vos objectifs est l\'une des stratégies nutritionnelles les plus efficaces.',
    es: 'Rastrear macros en lugar de solo las calorías totales te da más control sobre la composición corporal. Dos personas comiendo 2000 calorías pueden ver resultados muy diferentes dependiendo de su relación proteínas/grasas. Una mayor ingesta de proteínas preserva la masa muscular magra durante un déficit calórico, mientras que los carbohidratos adecuados mantienen el rendimiento del entrenamiento. Ajustar tu distribución de macros según tus objetivos es una de las estrategias nutricionales más efectivas.',
    pt: 'Rastrear macros em vez de apenas calorias totais dá mais controle sobre a composição corporal. Duas pessoas comendo 2.000 calorias podem ver resultados muito diferentes dependendo da proporção proteína/gordura. Uma maior ingestão de proteínas preserva a massa muscular magra durante um déficit calórico, enquanto carboidratos adequados mantêm o desempenho nos treinos. Ajustar sua distribuição de macros com base em seus objetivos é uma das estratégias nutricionais mais eficazes.',
    de: 'Makros statt nur Gesamtkalorien zu verfolgen gibt Ihnen mehr Kontrolle über die Körperzusammensetzung. Zwei Personen, die 2.000 Kalorien essen, können je nach Protein-Fett-Verhältnis sehr unterschiedliche Ergebnisse erzielen. Eine höhere Proteinzufuhr bewahrt die Muskelmasse während eines Kaloriendefizits, während ausreichend Kohlenhydrate die Trainingsleistung aufrechterhalten. Ihre Makro-Aufteilung an Ihre Ziele anzupassen ist eine der effektivsten verfügbaren Ernährungsstrategien.',
  },
  seoP4: {
    en: 'Need to find your daily calorie target first? Use our <a href="/calorie-calculator" style="color:#FF6B35;text-decoration:underline">calorie calculator</a> to determine your TDEE, then come back here to split those calories into macros. If you are planning to lose weight, the <a href="/calorie-deficit" style="color:#FF6B35;text-decoration:underline">calorie deficit calculator</a> can help you set a safe daily target and timeline.',
    fr: 'Besoin de trouver d\'abord votre objectif calorique quotidien ? Utilisez notre <a href="/fr/calculateur-calories" style="color:#FF6B35;text-decoration:underline">calculateur de calories</a> pour déterminer votre TDEE, puis revenez ici pour répartir ces calories en macros. Si vous prévoyez de perdre du poids, le <a href="/fr/calculateur-deficit-calorique" style="color:#FF6B35;text-decoration:underline">calculateur de déficit calorique</a> peut vous aider à définir un objectif quotidien sûr et un calendrier.',
    es: '¿Necesitas encontrar primero tu objetivo calórico diario? Usa nuestra <a href="/es/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorías</a> para determinar tu TDEE, luego vuelve aquí para dividir esas calorías en macros. Si planeas perder peso, la <a href="/es/calculadora-deficit-calorico" style="color:#FF6B35;text-decoration:underline">calculadora de déficit calórico</a> puede ayudarte a establecer un objetivo diario seguro y un cronograma.',
    pt: 'Precisa encontrar primeiro seu objetivo calórico diário? Use nossa <a href="/pt/calculadora-calorias" style="color:#FF6B35;text-decoration:underline">calculadora de calorias</a> para determinar seu TDEE, depois volte aqui para dividir essas calorias em macros. Se você planeja perder peso, a <a href="/pt/calculadora-deficit-calorico" style="color:#FF6B35;text-decoration:underline">calculadora de déficit calórico</a> pode ajudá-lo a definir um objetivo diário seguro e um cronograma.',
    de: 'Müssen Sie zuerst Ihr tägliches Kalorienziel finden? Verwenden Sie unseren <a href="/de/kalorienrechner" style="color:#FF6B35;text-decoration:underline">Kalorienrechner</a>, um Ihren TDEE zu bestimmen, und kommen Sie dann hierher zurück, um diese Kalorien in Makros aufzuteilen. Wenn Sie planen, Gewicht zu verlieren, kann der <a href="/de/kaloriendefizit-rechner" style="color:#FF6B35;text-decoration:underline">Kaloriendefizit-Rechner</a> Ihnen helfen, ein sicheres tägliches Ziel und einen Zeitplan festzulegen.',
  },
}

type Goal = 'Balanced' | 'Low Carb' | 'High Protein' | 'Keto' | 'Custom'

const presets: Record<Exclude<Goal, 'Custom'>, { protein: number; carbs: number; fat: number }> = {
  Balanced: { protein: 30, carbs: 40, fat: 30 },
  'Low Carb': { protein: 40, carbs: 20, fat: 40 },
  'High Protein': { protein: 40, carbs: 35, fat: 25 },
  Keto: { protein: 25, carbs: 5, fat: 70 },
}

export default function MacroClient({
  defaultCalories,
  defaultGoal,
  locale = 'en' as Locale,
}: {
  defaultCalories?: number
  defaultGoal?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [calories, setCalories] = useState(defaultCalories ?? 2000)
  const [goal, setGoal] = useState<Goal>((defaultGoal as Goal) ?? 'Balanced')
  const [customProtein, setCustomProtein] = useState(30)
  const [customCarbs, setCustomCarbs] = useState(40)
  const [customFat, setCustomFat] = useState(30)

  const ratios = useMemo(() => {
    if (goal === 'Custom') {
      return { protein: customProtein, carbs: customCarbs, fat: customFat }
    }
    return presets[goal]
  }, [goal, customProtein, customCarbs, customFat])

  const macros = useMemo(() => {
    const cal = Math.max(0, calories)
    const proteinCal = cal * (ratios.protein / 100)
    const carbsCal = cal * (ratios.carbs / 100)
    const fatCal = cal * (ratios.fat / 100)
    return {
      protein: { grams: Math.round(proteinCal / 4), calories: Math.round(proteinCal) },
      carbs: { grams: Math.round(carbsCal / 4), calories: Math.round(carbsCal) },
      fat: { grams: Math.round(fatCal / 9), calories: Math.round(fatCal) },
    }
  }, [calories, ratios])

  function handleCustomSlider(macro: 'protein' | 'carbs' | 'fat', newValue: number) {
    const others: ('protein' | 'carbs' | 'fat')[] =
      macro === 'protein' ? ['carbs', 'fat'] :
      macro === 'carbs' ? ['protein', 'fat'] :
      ['protein', 'carbs']

    const current = { protein: customProtein, carbs: customCarbs, fat: customFat }
    const remaining = 100 - newValue
    const othersSum = current[others[0]] + current[others[1]]

    let newOther0: number
    let newOther1: number

    if (othersSum === 0) {
      newOther0 = Math.round(remaining / 2)
      newOther1 = remaining - newOther0
    } else {
      newOther0 = Math.round((current[others[0]] / othersSum) * remaining)
      newOther1 = remaining - newOther0
    }

    newOther0 = Math.max(0, Math.min(100, newOther0))
    newOther1 = Math.max(0, Math.min(100, newOther1))

    const updated = { ...current, [macro]: newValue, [others[0]]: newOther0, [others[1]]: newOther1 }
    setCustomProtein(updated.protein)
    setCustomCarbs(updated.carbs)
    setCustomFat(updated.fat)
  }

  const donutGradient = `conic-gradient(
    ${accent} 0deg ${ratios.protein * 3.6}deg,
    ${carbColor} ${ratios.protein * 3.6}deg ${(ratios.protein + ratios.carbs) * 3.6}deg,
    ${fatColor} ${(ratios.protein + ratios.carbs) * 3.6}deg 360deg
  )`

  return (
    <ToolShell name={lt('navTitle')} icon="🥗" currentPath="/macro-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🥗</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleMacro')} <span style={{ color: accent }}>{lt('titleCalc')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Calories */}
              <div>
                <label style={labelStyle}>{lt('dailyCalories')}</label>
                <input
                  type="number"
                  value={calories}
                  min={0}
                  onChange={e => setCalories(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              {/* Goal */}
              <div>
                <label style={labelStyle}>{lt('goalPreset')}</label>
                <select
                  value={goal}
                  onChange={e => {
                    const g = e.target.value as Goal
                    setGoal(g)
                    if (g !== 'Custom') {
                      const p = presets[g]
                      setCustomProtein(p.protein)
                      setCustomCarbs(p.carbs)
                      setCustomFat(p.fat)
                    }
                  }}
                  style={selectStyle}
                >
                  <option value="Balanced">{lt('balanced')}</option>
                  <option value="Low Carb">{lt('lowCarb')}</option>
                  <option value="High Protein">{lt('highProtein')}</option>
                  <option value="Keto">{lt('keto')}</option>
                  <option value="Custom">{lt('custom')}</option>
                </select>
              </div>
            </div>

            {/* Custom sliders */}
            {goal === 'Custom' && (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {([
                  { key: 'protein' as const, label: lt('protein'), color: accent, value: customProtein },
                  { key: 'carbs' as const, label: lt('carbs'), color: carbColor, value: customCarbs },
                  { key: 'fat' as const, label: lt('fat'), color: fatColor, value: customFat },
                ]).map(s => (
                  <div key={s.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>{s.label}</label>
                      <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 700, color: s.color }}>{s.value}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={s.value}
                      onChange={e => handleCustomSlider(s.key, Number(e.target.value))}
                      style={{
                        width: '100%', height: 6, cursor: 'pointer',
                        accentColor: s.color,
                      }}
                    />
                  </div>
                ))}
                <div style={{ fontSize: 11, color: '#9A958A', textAlign: 'right' }}>
                  {t('total', locale)}: {customProtein + customCarbs + customFat}%
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          {/* Donut chart */}
          <div style={{
            background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB',
            padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16,
          }}>
            <div style={labelStyle}>{lt('macroSplit')}</div>
            <div style={{ position: 'relative', width: 180, height: 180, marginTop: 12, marginBottom: 16 }}>
              <div style={{
                width: 180, height: 180, borderRadius: '50%',
                background: donutGradient,
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 100, height: 100, borderRadius: '50%', background: '#fff',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>{calories}</div>
                <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>kcal</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
              {[
                { label: lt('protein'), color: accent },
                { label: lt('carbs'), color: carbColor },
                { label: lt('fat'), color: fatColor },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
                  <span style={{ color: '#6B6560' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Macro cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: lt('protein'), color: accent, grams: macros.protein.grams, cal: macros.protein.calories, pct: ratios.protein },
              { label: lt('carbs'), color: carbColor, grams: macros.carbs.grams, cal: macros.carbs.calories, pct: ratios.carbs },
              { label: lt('fat'), color: fatColor, grams: macros.fat.grams, cal: macros.fat.calories, pct: ratios.fat },
            ].map(m => (
              <div key={m.label} style={{
                background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14,
                padding: 20, textAlign: 'center',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: m.color,
                  margin: '0 auto 8px',
                }} />
                <div style={labelStyle}>{m.label}</div>
                <div style={{ fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#1C1B18', lineHeight: 1.1 }}>
                  {m.grams}<span style={{ fontSize: 14, fontWeight: 500, color: '#9A958A' }}>g</span>
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4 }}>
                  {m.cal} kcal &middot; {m.pct}%
                </div>
              </div>
            ))}
          </div>
        </section>

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
