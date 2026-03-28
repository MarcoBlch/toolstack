'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EF4444'

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

type Gender = 'male' | 'female'
type WeightUnit = 'kg' | 'lbs'
type HeightUnit = 'cm' | 'ftin'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  titleCalorie: { en: 'Calorie', fr: 'Calculateur de', es: 'Calculadora de', pt: 'Calculadora de', de: 'Kalorien' },
  titleCalculator: { en: 'calculator', fr: 'calories', es: 'calorías', pt: 'calorias', de: 'Rechner' },
  subtitle: {
    en: 'Calculate your daily calorie needs. BMR and TDEE using the Mifflin-St Jeor equation.',
    fr: 'Calculez vos besoins caloriques quotidiens. MB et DET avec l\'équation de Mifflin-St Jeor.',
    es: 'Calcula tus necesidades calóricas diarias. TMB y GETD con la ecuación de Mifflin-St Jeor.',
    pt: 'Calcule suas necessidades calóricas diárias. TMB e GET pela equação de Mifflin-St Jeor.',
    de: 'Berechnen Sie Ihren täglichen Kalorienbedarf. GU und TDEE mit der Mifflin-St-Jeor-Gleichung.',
  },
  navTitle: { en: 'Calorie Calculator', fr: 'Calculateur de calories', es: 'Calculadora de calorías', pt: 'Calculadora de calorias', de: 'Kalorienrechner' },

  // Activity levels
  actSedentary: {
    en: 'Sedentary (little or no exercise)',
    fr: 'Sédentaire (peu ou pas d\'exercice)',
    es: 'Sedentario (poco o nada de ejercicio)',
    pt: 'Sedentário (pouco ou nenhum exercício)',
    de: 'Sitzend (wenig oder kein Sport)',
  },
  actLight: {
    en: 'Lightly active (1-3 days/week)',
    fr: 'Légèrement actif (1-3 jours/sem.)',
    es: 'Ligeramente activo (1-3 días/sem.)',
    pt: 'Levemente ativo (1-3 dias/sem.)',
    de: 'Leicht aktiv (1-3 Tage/Woche)',
  },
  actModerate: {
    en: 'Moderately active (3-5 days/week)',
    fr: 'Modérément actif (3-5 jours/sem.)',
    es: 'Moderadamente activo (3-5 días/sem.)',
    pt: 'Moderadamente ativo (3-5 dias/sem.)',
    de: 'Mäßig aktiv (3-5 Tage/Woche)',
  },
  actVery: {
    en: 'Very active (6-7 days/week)',
    fr: 'Très actif (6-7 jours/sem.)',
    es: 'Muy activo (6-7 días/sem.)',
    pt: 'Muito ativo (6-7 dias/sem.)',
    de: 'Sehr aktiv (6-7 Tage/Woche)',
  },
  actExtra: {
    en: 'Extra active (very hard exercise/physical job)',
    fr: 'Extrêmement actif (exercice très intense/travail physique)',
    es: 'Extra activo (ejercicio muy intenso/trabajo físico)',
    pt: 'Extra ativo (exercício muito intenso/trabalho físico)',
    de: 'Extrem aktiv (sehr hartes Training/körperliche Arbeit)',
  },
  activityLevel: {
    en: 'Activity Level', fr: 'Niveau d\'activité', es: 'Nivel de actividad', pt: 'Nível de atividade', de: 'Aktivitätslevel',
  },

  // Unit labels
  egAge: { en: 'e.g. 30', fr: 'ex. 30', es: 'ej. 30', pt: 'ex. 30', de: 'z.B. 30' },
  ft: { en: 'ft', fr: 'pi', es: 'pies', pt: 'pés', de: 'Fuß' },
  in: { en: 'in', fr: 'po', es: 'pulg', pt: 'pol', de: 'Zoll' },
  feet: { en: 'feet', fr: 'pieds', es: 'pies', pt: 'pés', de: 'Fuß' },
  inches: { en: 'inches', fr: 'pouces', es: 'pulgadas', pt: 'polegadas', de: 'Zoll' },
  ftIn: { en: 'ft/in', fr: 'pi/po', es: 'pies/pulg', pt: 'pés/pol', de: 'Fuß/Zoll' },

  // Result labels
  bmrLabel: {
    en: 'BMR (Basal Metabolic Rate)',
    fr: 'MB (Métabolisme de base)',
    es: 'TMB (Tasa Metabólica Basal)',
    pt: 'TMB (Taxa Metabólica Basal)',
    de: 'GU (Grundumsatz)',
  },
  tdeeLabel: {
    en: 'TDEE (Daily Calories)',
    fr: 'DET (Dépense Énergétique Totale)',
    es: 'GETD (Gasto Energético Total)',
    pt: 'GET (Gasto Energético Total)',
    de: 'TDEE (Täglicher Kalorienbedarf)',
  },
  caloriesDay: { en: 'calories/day', fr: 'calories/jour', es: 'calorías/día', pt: 'calorias/dia', de: 'Kalorien/Tag' },
  dailyGoals: {
    en: 'Daily Calorie Goals',
    fr: 'Objectifs caloriques quotidiens',
    es: 'Objetivos calóricos diarios',
    pt: 'Metas calóricas diárias',
    de: 'Tägliche Kalorienziele',
  },

  // Calorie goals
  loseFast: { en: 'Lose weight fast', fr: 'Perte rapide', es: 'Perder peso rápido', pt: 'Perder peso rápido', de: 'Schnell abnehmen' },
  loseFastDesc: {
    en: '-1000 cal/day (~1 kg/week)',
    fr: '-1000 cal/jour (~1 kg/sem.)',
    es: '-1000 cal/día (~1 kg/sem.)',
    pt: '-1000 cal/dia (~1 kg/sem.)',
    de: '-1000 kcal/Tag (~1 kg/Woche)',
  },
  loseSlow: { en: 'Lose weight', fr: 'Perte modérée', es: 'Perder peso', pt: 'Perder peso', de: 'Abnehmen' },
  loseSlowDesc: {
    en: '-500 cal/day (~0.5 kg/week)',
    fr: '-500 cal/jour (~0,5 kg/sem.)',
    es: '-500 cal/día (~0,5 kg/sem.)',
    pt: '-500 cal/dia (~0,5 kg/sem.)',
    de: '-500 kcal/Tag (~0,5 kg/Woche)',
  },
  maintain: { en: 'Maintain weight', fr: 'Maintien du poids', es: 'Mantener peso', pt: 'Manter peso', de: 'Gewicht halten' },
  maintainDesc: {
    en: 'your TDEE', fr: 'votre DET', es: 'tu GETD', pt: 'seu GET', de: 'Ihr TDEE',
  },
  gainWeight: { en: 'Gain weight', fr: 'Prise de poids', es: 'Ganar peso', pt: 'Ganhar peso', de: 'Zunehmen' },
  gainDesc: {
    en: '+500 cal/day (~0.5 kg/week)',
    fr: '+500 cal/jour (~0,5 kg/sem.)',
    es: '+500 cal/día (~0,5 kg/sem.)',
    pt: '+500 cal/dia (~0,5 kg/sem.)',
    de: '+500 kcal/Tag (~0,5 kg/Woche)',
  },

  // Disclaimer
  disclaimer: {
    en: 'Calorie estimates are based on the Mifflin-St Jeor equation. Individual needs vary. Consult a healthcare professional or registered dietitian for personalized advice.',
    fr: 'Les estimations caloriques reposent sur l\'équation de Mifflin-St Jeor. Les besoins individuels varient. Consultez un professionnel de santé ou un diététicien pour des conseils personnalisés.',
    es: 'Las estimaciones calóricas se basan en la ecuación de Mifflin-St Jeor. Las necesidades individuales varían. Consulta a un profesional de salud o nutricionista para obtener asesoramiento personalizado.',
    pt: 'As estimativas calóricas são baseadas na equação de Mifflin-St Jeor. As necessidades individuais variam. Consulte um profissional de saúde ou nutricionista para orientações personalizadas.',
    de: 'Die Kalorienberechnung basiert auf der Mifflin-St-Jeor-Gleichung. Der individuelle Bedarf variiert. Konsultieren Sie einen Arzt oder Ernährungsberater für eine persönliche Beratung.',
  },

  // SEO
  seoH2: {
    en: 'Free Calorie Calculator',
    fr: 'Calculateur de calories gratuit',
    es: 'Calculadora de calorías gratuita',
    pt: 'Calculadora de calorias gratuita',
    de: 'Kostenloser Kalorienrechner',
  },
  seoP1: {
    en: 'This free calorie calculator estimates your daily calorie needs using the Mifflin-St Jeor equation, widely regarded as the most accurate formula for predicting energy expenditure. Enter your age, gender, weight, height, and activity level to get your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). The tool provides personalized calorie targets for weight loss, maintenance, and weight gain goals without requiring any signup.',
    fr: 'Ce calculateur de calories gratuit estime vos besoins caloriques quotidiens à l\'aide de l\'équation de Mifflin-St Jeor, largement reconnue comme la formule la plus précise pour prédire la dépense énergétique. Entrez votre âge, sexe, poids, taille et niveau d\'activité pour obtenir votre métabolisme de base (MB) et votre dépense énergétique totale (DET). L\'outil fournit des objectifs caloriques personnalisés pour la perte de poids, le maintien et la prise de poids, sans inscription requise.',
    es: 'Esta calculadora de calorías gratuita estima tus necesidades calóricas diarias utilizando la ecuación de Mifflin-St Jeor, ampliamente reconocida como la fórmula más precisa para predecir el gasto energético. Introduce tu edad, sexo, peso, altura y nivel de actividad para obtener tu Tasa Metabólica Basal (TMB) y tu Gasto Energético Total Diario (GETD). La herramienta proporciona objetivos calóricos personalizados para pérdida de peso, mantenimiento y aumento de peso sin necesidad de registrarse.',
    pt: 'Esta calculadora de calorias gratuita estima suas necessidades calóricas diárias usando a equação de Mifflin-St Jeor, amplamente reconhecida como a fórmula mais precisa para prever o gasto energético. Insira sua idade, sexo, peso, altura e nível de atividade para obter sua Taxa Metabólica Basal (TMB) e seu Gasto Energético Total (GET). A ferramenta fornece metas calóricas personalizadas para perda de peso, manutenção e ganho de peso sem necessidade de cadastro.',
    de: 'Dieser kostenlose Kalorienrechner schätzt Ihren täglichen Kalorienbedarf mit der Mifflin-St-Jeor-Gleichung, die als genaueste Formel zur Vorhersage des Energieverbrauchs gilt. Geben Sie Alter, Geschlecht, Gewicht, Größe und Aktivitätslevel ein, um Ihren Grundumsatz (GU) und Ihren täglichen Gesamtenergieumsatz (TDEE) zu erhalten. Das Tool liefert personalisierte Kalorienziele für Gewichtsabnahme, -erhaltung und -zunahme, ohne dass eine Registrierung erforderlich ist.',
  },
  seoH3a: {
    en: 'Understanding BMR and TDEE',
    fr: 'Comprendre le MB et la DET',
    es: 'Comprender TMB y GETD',
    pt: 'Entendendo TMB e GET',
    de: 'Grundumsatz und TDEE verstehen',
  },
  seoP2: {
    en: 'Your BMR is the number of calories your body burns at complete rest just to maintain basic functions like breathing, circulation, and cell production. TDEE builds on BMR by factoring in your daily physical activity using a multiplier that ranges from 1.2 for sedentary lifestyles up to 1.9 for extremely active individuals. The difference between BMR and TDEE reflects how much energy your movement and exercise require each day.',
    fr: 'Votre métabolisme de base correspond au nombre de calories que votre corps brûle au repos complet pour maintenir les fonctions vitales comme la respiration, la circulation sanguine et la production cellulaire. La dépense énergétique totale s\'appuie sur le MB en intégrant votre activité physique quotidienne via un multiplicateur allant de 1,2 pour un mode de vie sédentaire à 1,9 pour les personnes extrêmement actives. La différence entre MB et DET reflète l\'énergie que vos mouvements et exercices nécessitent chaque jour.',
    es: 'Tu TMB es la cantidad de calorías que tu cuerpo quema en reposo total solo para mantener funciones básicas como la respiración, la circulación y la producción celular. El GETD se basa en la TMB incorporando tu actividad física diaria mediante un multiplicador que va de 1,2 para estilos de vida sedentarios hasta 1,9 para personas extremadamente activas. La diferencia entre TMB y GETD refleja cuánta energía requieren tu movimiento y ejercicio cada día.',
    pt: 'Sua TMB é o número de calorias que seu corpo queima em repouso total apenas para manter funções básicas como respiração, circulação e produção celular. O GET se baseia na TMB ao incorporar sua atividade física diária por meio de um multiplicador que varia de 1,2 para estilos de vida sedentários até 1,9 para indivíduos extremamente ativos. A diferença entre TMB e GET reflete quanta energia seu movimento e exercício exigem a cada dia.',
    de: 'Ihr Grundumsatz ist die Anzahl an Kalorien, die Ihr Körper in völliger Ruhe verbrennt, um grundlegende Funktionen wie Atmung, Kreislauf und Zellproduktion aufrechtzuerhalten. Der TDEE baut auf dem Grundumsatz auf, indem er Ihre tägliche körperliche Aktivität über einen Multiplikator einbezieht, der von 1,2 für eine sitzende Lebensweise bis 1,9 für extrem aktive Personen reicht. Die Differenz zwischen Grundumsatz und TDEE zeigt, wie viel Energie Ihre Bewegung und Ihr Training täglich erfordern.',
  },
  seoH3b: {
    en: 'How Activity Levels Affect Your Calories',
    fr: 'Comment le niveau d\'activité influence vos calories',
    es: 'Cómo los niveles de actividad afectan tus calorías',
    pt: 'Como o nível de atividade afeta suas calorias',
    de: 'Wie das Aktivitätslevel Ihren Kalorienbedarf beeinflusst',
  },
  seoP3: {
    en: 'Choosing the correct activity level is essential for an accurate estimate. Sedentary means minimal movement beyond daily tasks. Lightly active covers 1 to 3 exercise sessions per week. Moderately active suits 3 to 5 sessions, while very active applies to daily intense training. Selecting the wrong level can skew your results by several hundred calories, so be honest about your typical weekly routine.',
    fr: 'Choisir le bon niveau d\'activité est essentiel pour une estimation précise. Sédentaire signifie un mouvement minimal au-delà des tâches quotidiennes. Légèrement actif correspond à 1 à 3 séances d\'exercice par semaine. Modérément actif convient à 3 à 5 séances, tandis que très actif s\'applique à un entraînement quotidien intense. Sélectionner le mauvais niveau peut fausser vos résultats de plusieurs centaines de calories : soyez honnête sur votre routine hebdomadaire habituelle.',
    es: 'Elegir el nivel de actividad correcto es esencial para una estimación precisa. Sedentario significa movimiento mínimo más allá de las tareas diarias. Ligeramente activo abarca de 1 a 3 sesiones de ejercicio por semana. Moderadamente activo se adapta a 3 a 5 sesiones, mientras que muy activo corresponde a entrenamiento diario intenso. Seleccionar el nivel incorrecto puede desviar tus resultados en varios cientos de calorías, así que sé sincero sobre tu rutina semanal habitual.',
    pt: 'Escolher o nível de atividade correto é essencial para uma estimativa precisa. Sedentário significa movimento mínimo além das tarefas diárias. Levemente ativo abrange de 1 a 3 sessões de exercício por semana. Moderadamente ativo se adequa a 3 a 5 sessões, enquanto muito ativo se aplica a treinos diários intensos. Selecionar o nível errado pode distorcer seus resultados em várias centenas de calorias, então seja honesto sobre sua rotina semanal habitual.',
    de: 'Die Wahl des richtigen Aktivitätslevels ist für eine genaue Schätzung entscheidend. Sitzend bedeutet minimale Bewegung über die täglichen Aufgaben hinaus. Leicht aktiv umfasst 1 bis 3 Trainingseinheiten pro Woche. Mäßig aktiv passt zu 3 bis 5 Einheiten, während sehr aktiv für tägliches intensives Training gilt. Die falsche Stufe kann Ihre Ergebnisse um mehrere Hundert Kalorien verfälschen, seien Sie also ehrlich bezüglich Ihres typischen Wochenablaufs.',
  },
  seoCrossPromo: {
    en: 'Once you know your TDEE, use our',
    fr: 'Une fois votre DET connue, utilisez notre',
    es: 'Una vez que conozcas tu GETD, usa nuestra',
    pt: 'Depois de conhecer seu GET, use nossa',
    de: 'Sobald Sie Ihren TDEE kennen, nutzen Sie unseren',
  },
  linkMacro: {
    en: 'macro calculator',
    fr: 'calculateur de macros',
    es: 'calculadora de macros',
    pt: 'calculadora de macros',
    de: 'Makro-Rechner',
  },
  seoCrossPromo2: {
    en: 'to split your calories into protein, carbs, and fat. If your goal is weight loss, the',
    fr: 'pour répartir vos calories en protéines, glucides et lipides. Si votre objectif est la perte de poids, le',
    es: 'para dividir tus calorías en proteínas, carbohidratos y grasas. Si tu objetivo es perder peso, la',
    pt: 'para dividir suas calorias em proteínas, carboidratos e gorduras. Se seu objetivo é perder peso, a',
    de: 'um Ihre Kalorien in Protein, Kohlenhydrate und Fett aufzuteilen. Wenn Ihr Ziel die Gewichtsabnahme ist, kann der',
  },
  linkDeficit: {
    en: 'calorie deficit calculator',
    fr: 'calculateur de déficit calorique',
    es: 'calculadora de déficit calórico',
    pt: 'calculadora de déficit calórico',
    de: 'Kaloriendefizit-Rechner',
  },
  seoCrossPromo3: {
    en: 'can help you plan a safe timeline to reach your target. You can also check your',
    fr: 'peut vous aider à planifier un calendrier sûr pour atteindre votre objectif. Vous pouvez aussi vérifier votre',
    es: 'puede ayudarte a planificar un plazo seguro para alcanzar tu meta. También puedes consultar tu',
    pt: 'pode ajudá-lo a planejar um cronograma seguro para atingir sua meta. Você também pode verificar seu',
    de: 'Ihnen helfen, einen sicheren Zeitplan zu erstellen. Sie können auch Ihren',
  },
  linkBMI: { en: 'BMI', fr: 'IMC', es: 'IMC', pt: 'IMC', de: 'BMI' },
  seoCrossPromo4: {
    en: 'to see where your current weight falls on the health spectrum.',
    fr: 'pour voir où votre poids actuel se situe sur le spectre de santé.',
    es: 'para ver dónde se sitúa tu peso actual en el espectro de salud.',
    pt: 'para ver onde seu peso atual se encontra no espectro de saúde.',
    de: 'überprüfen, um zu sehen, wo Ihr aktuelles Gewicht im Gesundheitsspektrum liegt.',
  },
}

export default function CalorieClient({
  defaultGender,
  defaultAge,
  defaultWeight,
  defaultHeight,
  defaultActivity,
  locale = 'en' as Locale,
}: {
  defaultGender?: string
  defaultAge?: number
  defaultWeight?: number
  defaultHeight?: number
  defaultActivity?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const activityLabels: Record<ActivityLevel, string> = {
    sedentary: lt('actSedentary'),
    light: lt('actLight'),
    moderate: lt('actModerate'),
    very: lt('actVery'),
    extra: lt('actExtra'),
  }

  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [age, setAge] = useState(defaultAge ?? 30)
  const [weightKg, setWeightKg] = useState(defaultWeight ?? 70)
  const [weightLbs, setWeightLbs] = useState(defaultWeight ?? 154)
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg')
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 175)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm')
  const [activity, setActivity] = useState<ActivityLevel>((defaultActivity as ActivityLevel) ?? 'moderate')

  const results = useMemo(() => {
    const wKg = weightUnit === 'kg' ? weightKg : weightLbs / 2.205
    const hCm = heightUnit === 'cm' ? heightCm : (heightFt * 12 + heightIn) * 2.54

    if (wKg <= 0 || hCm <= 0 || age <= 0) return null

    const bmr = gender === 'male'
      ? (10 * wKg) + (6.25 * hCm) - (5 * age) + 5
      : (10 * wKg) + (6.25 * hCm) - (5 * age) - 161

    const tdee = bmr * activityMultipliers[activity]
    const loseSlow = tdee - 500
    const loseFast = tdee - 1000
    const gain = tdee + 500

    return { bmr, tdee, loseSlow, loseFast, gain }
  }, [gender, age, weightKg, weightLbs, weightUnit, heightCm, heightFt, heightIn, heightUnit, activity])

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitToggle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '6px 0', border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: 11, fontWeight: 600, fontFamily: fb,
    background: active ? accent : 'transparent',
    color: active ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  // Bar max for visual
  const maxCal = results ? Math.max(results.gain, 3500) : 3500

  return (
    <ToolShell name={lt('navTitle')} icon="🔥" currentPath="/calorie-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🔥</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleCalorie')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Age */}
              <div>
                <label style={labelStyle}>{t('age', locale)}</label>
                <input
                  type="number" value={age} min={1} max={120}
                  onChange={e => setAge(Number(e.target.value))}
                  style={inputStyle}
                  placeholder={lt('egAge')}
                />
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

              {/* Weight */}
              <div>
                <label style={labelStyle}>{t('weight', locale)}</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={weightUnit === 'kg' ? weightKg : weightLbs}
                      min={1}
                      onChange={e => weightUnit === 'kg' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 2, background: '#F5F3EE', borderRadius: 8, padding: 2, minWidth: 80 }}>
                    <button onClick={() => setWeightUnit('kg')} style={unitToggle(weightUnit === 'kg')}>kg</button>
                    <button onClick={() => setWeightUnit('lbs')} style={unitToggle(weightUnit === 'lbs')}>lbs</button>
                  </div>
                </div>
              </div>

              {/* Height */}
              <div>
                <label style={labelStyle}>{t('height', locale)}</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {heightUnit === 'cm' ? (
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightCm} min={1}
                        onChange={e => setHeightCm(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="cm"
                      />
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', gap: 6 }}>
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
                  )}
                  <div style={{ display: 'flex', gap: 2, background: '#F5F3EE', borderRadius: 8, padding: 2, minWidth: 80 }}>
                    <button onClick={() => setHeightUnit('cm')} style={unitToggle(heightUnit === 'cm')}>cm</button>
                    <button onClick={() => setHeightUnit('ftin')} style={unitToggle(heightUnit === 'ftin')}>{lt('ftIn')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* BMR + TDEE top cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* BMR */}
              <div style={{
                background: '#fff',
                border: '1.5px solid #E8E4DB',
                borderRadius: 16, padding: 22, textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('bmrLabel')}</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.round(results.bmr).toLocaleString(LOCALE_CODES[locale])}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>{lt('caloriesDay')}</div>
              </div>

              {/* TDEE */}
              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16, padding: 22, textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('tdeeLabel')}</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {Math.round(results.tdee).toLocaleString(LOCALE_CODES[locale])}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>{lt('caloriesDay')}</div>
              </div>
            </div>

            {/* Calorie goals */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('dailyGoals')}</div>

              {/* Visual bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
                {/* Lose weight fast */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>{lt('loseFast')}</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>{lt('loseFastDesc')}</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #EF4444, #F87171)',
                      width: `${Math.max((results.loseFast / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(Math.max(results.loseFast, 0)).toLocaleString(LOCALE_CODES[locale])} cal
                    </div>
                  </div>
                </div>

                {/* Lose weight */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>{lt('loseSlow')}</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>{lt('loseSlowDesc')}</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #F97316, #FB923C)',
                      width: `${Math.max((results.loseSlow / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(Math.max(results.loseSlow, 0)).toLocaleString(LOCALE_CODES[locale])} cal
                    </div>
                  </div>
                </div>

                {/* Maintain */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>{lt('maintain')}</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>{lt('maintainDesc')}</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
                      width: `${Math.max((results.tdee / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(results.tdee).toLocaleString(LOCALE_CODES[locale])} cal
                    </div>
                  </div>
                </div>

                {/* Gain weight */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1B18' }}>{lt('gainWeight')}</span>
                    <span style={{ fontSize: 11, color: '#9A958A' }}>{lt('gainDesc')}</span>
                  </div>
                  <div style={{ position: 'relative', height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 8,
                      background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                      width: `${Math.max((results.gain / maxCal) * 100, 5)}%`,
                      transition: 'width .3s',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
                      fontSize: 14, fontFamily: fm, fontWeight: 700, color: '#fff',
                    }}>
                      {Math.round(results.gain).toLocaleString(LOCALE_CODES[locale])} cal
                    </div>
                  </div>
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
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            {lt('seoCrossPromo')} <a href="/macro-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkMacro')}</a> {lt('seoCrossPromo2')} <a href="/calorie-deficit" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkDeficit')}</a> {lt('seoCrossPromo3')} <a href="/bmi-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkBMI')}</a> {lt('seoCrossPromo4')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
