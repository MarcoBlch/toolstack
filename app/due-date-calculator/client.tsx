'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EC4899'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: "'Outfit', -apple-system, sans-serif", color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type Method = 'lmp' | 'conception' | 'ivf'

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

function toInputValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  titleDueDate: { en: 'Due Date', fr: 'Date prévue', es: 'Fecha probable', pt: 'Data prevista', de: 'Geburtstermin' },
  titleCalculator: { en: 'Calculator', fr: 'Calculateur', es: 'Calculadora', pt: 'Calculadora', de: 'Rechner' },
  subtitle: {
    en: 'Calculate your estimated due date, gestational age, and pregnancy milestones.',
    fr: 'Calculez votre date d\'accouchement prévue, l\'âge gestationnel et les étapes de la grossesse.',
    es: 'Calcula tu fecha probable de parto, edad gestacional y las etapas del embarazo.',
    pt: 'Calcule sua data prevista de parto, idade gestacional e marcos da gravidez.',
    de: 'Berechnen Sie Ihren voraussichtlichen Geburtstermin, das Gestationsalter und die Meilensteine der Schwangerschaft.',
  },
  navTitle: { en: 'Due Date Calculator', fr: 'Calculateur de date prévue', es: 'Calculadora de fecha de parto', pt: 'Calculadora de data de parto', de: 'Geburtsterminrechner' },

  // Method labels
  calcMethod: { en: 'Calculation Method', fr: 'Méthode de calcul', es: 'Método de cálculo', pt: 'Método de cálculo', de: 'Berechnungsmethode' },
  methodLmp: {
    en: 'Last Menstrual Period (LMP)',
    fr: 'Dernières règles (DDR)',
    es: 'Última menstruación (FUM)',
    pt: 'Última menstruação (DUM)',
    de: 'Letzte Menstruation (LMP)',
  },
  methodConception: {
    en: 'Conception Date',
    fr: 'Date de conception',
    es: 'Fecha de concepción',
    pt: 'Data da concepção',
    de: 'Empfängnisdatum',
  },
  methodIvf: {
    en: 'IVF Transfer Date',
    fr: 'Date de transfert FIV',
    es: 'Fecha de transferencia FIV',
    pt: 'Data de transferência FIV',
    de: 'IVF-Transferdatum',
  },

  // Date input labels
  dateLabelLmp: {
    en: 'First Day of Last Period',
    fr: 'Premier jour des dernières règles',
    es: 'Primer día de la última menstruación',
    pt: 'Primeiro dia da última menstruação',
    de: 'Erster Tag der letzten Periode',
  },
  dateLabelConception: {
    en: 'Conception Date',
    fr: 'Date de conception',
    es: 'Fecha de concepción',
    pt: 'Data da concepção',
    de: 'Empfängnisdatum',
  },
  dateLabelIvf: {
    en: 'IVF Transfer Date',
    fr: 'Date de transfert FIV',
    es: 'Fecha de transferencia FIV',
    pt: 'Data de transferência FIV',
    de: 'IVF-Transferdatum',
  },

  // Cycle
  cycleLength: {
    en: 'Cycle Length (days)',
    fr: 'Durée du cycle (jours)',
    es: 'Duración del ciclo (días)',
    pt: 'Duração do ciclo (dias)',
    de: 'Zykluslänge (Tage)',
  },

  // Result labels
  estimatedDueDate: {
    en: 'Estimated Due Date',
    fr: 'Date d\'accouchement prévue',
    es: 'Fecha probable de parto',
    pt: 'Data prevista de parto',
    de: 'Voraussichtlicher Geburtstermin',
  },
  daysRemaining: { en: 'Days Remaining', fr: 'Jours restants', es: 'Días restantes', pt: 'Dias restantes', de: 'Verbleibende Tage' },
  currentTrimester: { en: 'Current Trimester', fr: 'Trimestre actuel', es: 'Trimestre actual', pt: 'Trimestre atual', de: 'Aktuelles Trimester' },
  estConception: { en: 'Est. Conception', fr: 'Conception est.', es: 'Concepción est.', pt: 'Concepção est.', de: 'Gesch. Empfängnis' },

  // Trimester labels
  tri1: { en: '1st Trimester', fr: '1er trimestre', es: '1er trimestre', pt: '1o trimestre', de: '1. Trimester' },
  tri2: { en: '2nd Trimester', fr: '2e trimestre', es: '2do trimestre', pt: '2o trimestre', de: '2. Trimester' },
  tri3: { en: '3rd Trimester', fr: '3e trimestre', es: '3er trimestre', pt: '3o trimestre', de: '3. Trimester' },
  tri1Short: { en: '1st Tri', fr: '1er Tri', es: '1er Tri', pt: '1o Tri', de: '1. Tri' },
  tri2Short: { en: '2nd Tri', fr: '2e Tri', es: '2do Tri', pt: '2o Tri', de: '2. Tri' },
  tri3Short: { en: '3rd Tri', fr: '3e Tri', es: '3er Tri', pt: '3o Tri', de: '3. Tri' },

  // Progress
  pregnancyProgress: { en: 'Pregnancy Progress', fr: 'Progression de la grossesse', es: 'Progreso del embarazo', pt: 'Progresso da gravidez', de: 'Schwangerschaftsfortschritt' },

  // Milestones
  keyMilestones: { en: 'Key Milestones', fr: 'Étapes clés', es: 'Hitos clave', pt: 'Marcos importantes', de: 'Wichtige Meilensteine' },
  msEnd1stTri: { en: 'End of 1st Trimester', fr: 'Fin du 1er trimestre', es: 'Fin del 1er trimestre', pt: 'Fim do 1o trimestre', de: 'Ende 1. Trimester' },
  msAnatomyScan: { en: 'Anatomy Scan', fr: 'Échographie morphologique', es: 'Ecografía morfológica', pt: 'Ultrassom morfológico', de: 'Feindiagnostik' },
  msViability: { en: 'Viability', fr: 'Viabilité', es: 'Viabilidad', pt: 'Viabilidade', de: 'Lebensfähigkeit' },
  msTri3: { en: '3rd Trimester', fr: '3e trimestre', es: '3er trimestre', pt: '3o trimestre', de: '3. Trimester' },
  msFullTerm: { en: 'Full Term', fr: 'Terme complet', es: 'A término', pt: 'Gestação completa', de: 'Vollständige Reife' },
  msDueDate: { en: 'Due Date', fr: 'Date prévue', es: 'Fecha de parto', pt: 'Data prevista', de: 'Geburtstermin' },
  week: { en: 'Week', fr: 'Semaine', es: 'Semana', pt: 'Semana', de: 'Woche' },

  // Dynamic text
  weeksAndDays: { en: 'weeks,', fr: 'semaines,', es: 'semanas,', pt: 'semanas,', de: 'Wochen,' },
  dayPregnant: { en: 'day pregnant', fr: 'jour de grossesse', es: 'día de embarazo', pt: 'dia de gravidez', de: 'Tag schwanger' },
  daysPregnant: { en: 'days pregnant', fr: 'jours de grossesse', es: 'días de embarazo', pt: 'dias de gravidez', de: 'Tage schwanger' },
  daysToGo: { en: 'days to go', fr: 'jours restants', es: 'días restantes', pt: 'dias restantes', de: 'Tage verbleibend' },
  anyDayNow: { en: 'any day now!', fr: 'c\'est pour bientôt !', es: '¡en cualquier momento!', pt: 'a qualquer momento!', de: 'jeden Moment!' },

  // Disclaimer
  disclaimer: {
    en: 'This calculator provides estimates only. Please consult your healthcare provider for accurate pregnancy dating.',
    fr: 'Ce calculateur fournit uniquement des estimations. Veuillez consulter votre professionnel de santé pour un suivi précis de la grossesse.',
    es: 'Esta calculadora proporciona solo estimaciones. Consulta a tu profesional de salud para un seguimiento preciso del embarazo.',
    pt: 'Esta calculadora fornece apenas estimativas. Consulte seu profissional de saúde para um acompanhamento preciso da gravidez.',
    de: 'Dieser Rechner liefert nur Schätzungen. Bitte konsultieren Sie Ihren Arzt für eine genaue Schwangerschaftsdatierung.',
  },

  // SEO
  seoH2: {
    en: 'Free Pregnancy Due Date Calculator',
    fr: 'Calculateur de date d\'accouchement gratuit',
    es: 'Calculadora de fecha de parto gratuita',
    pt: 'Calculadora de data de parto gratuita',
    de: 'Kostenloser Geburtsterminrechner',
  },
  seoP1: {
    en: 'Calculate your estimated due date using Naegele\'s rule. Enter the first day of your last menstrual period, conception date, or IVF transfer date to see when your baby is expected. This free due date calculator shows your gestational age in weeks and days, which trimester you are in, and key pregnancy milestones such as the end of the first trimester, anatomy scan, viability, and full term dates.',
    fr: 'Calculez votre date d\'accouchement prévue grâce à la règle de Naegele. Entrez le premier jour de vos dernières règles, la date de conception ou la date de transfert FIV pour savoir quand votre bébé est attendu. Ce calculateur gratuit affiche votre âge gestationnel en semaines et jours, le trimestre en cours et les étapes clés de la grossesse comme la fin du premier trimestre, l\'échographie morphologique, la viabilité et la date de terme complet.',
    es: 'Calcula tu fecha probable de parto usando la regla de Naegele. Introduce el primer día de tu última menstruación, la fecha de concepción o la fecha de transferencia FIV para saber cuándo se espera a tu bebé. Esta calculadora gratuita muestra tu edad gestacional en semanas y días, en qué trimestre te encuentras y los hitos clave del embarazo como el final del primer trimestre, la ecografía morfológica, la viabilidad y la fecha a término.',
    pt: 'Calcule sua data prevista de parto usando a regra de Naegele. Insira o primeiro dia da sua última menstruação, a data da concepção ou a data da transferência FIV para saber quando seu bebê é esperado. Esta calculadora gratuita mostra sua idade gestacional em semanas e dias, em qual trimestre você está e os marcos importantes da gravidez, como o fim do primeiro trimestre, o ultrassom morfológico, a viabilidade e a data de gestação completa.',
    de: 'Berechnen Sie Ihren voraussichtlichen Geburtstermin mit der Naegele-Regel. Geben Sie den ersten Tag Ihrer letzten Periode, das Empfängnisdatum oder das IVF-Transferdatum ein, um zu erfahren, wann Ihr Baby erwartet wird. Dieser kostenlose Rechner zeigt Ihr Gestationsalter in Wochen und Tagen, in welchem Trimester Sie sich befinden, sowie wichtige Meilensteine der Schwangerschaft wie das Ende des ersten Trimesters, die Feindiagnostik, die Lebensfähigkeit und den errechneten Termin.',
  },
  seoH3a: {
    en: 'How is the due date calculated?',
    fr: 'Comment la date d\'accouchement est-elle calculée ?',
    es: '¿Cómo se calcula la fecha de parto?',
    pt: 'Como a data de parto é calculada?',
    de: 'Wie wird der Geburtstermin berechnet?',
  },
  seoP2: {
    en: 'For the LMP method, the due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period, adjusted for cycle length. If your cycle is longer or shorter than 28 days, the calculator adjusts accordingly. For the conception date method, 266 days are added to the date of conception. For IVF transfers, the calculator assumes a day-5 blastocyst transfer and adds 261 days from the transfer date.',
    fr: 'Avec la méthode DDR, la date d\'accouchement est calculée en ajoutant 280 jours (40 semaines) au premier jour de vos dernières règles, avec ajustement selon la durée du cycle. Si votre cycle est plus long ou plus court que 28 jours, le calcul s\'adapte en conséquence. Pour la méthode par date de conception, 266 jours sont ajoutés à la date de conception. Pour les transferts FIV, le calculateur suppose un transfert de blastocyste au jour 5 et ajoute 261 jours à partir de la date de transfert.',
    es: 'Con el método FUM, la fecha de parto se calcula sumando 280 días (40 semanas) al primer día de tu última menstruación, ajustado según la duración del ciclo. Si tu ciclo es más largo o más corto que 28 días, la calculadora se ajusta en consecuencia. Para el método por fecha de concepción, se añaden 266 días a la fecha de concepción. Para transferencias FIV, la calculadora asume una transferencia de blastocisto en el día 5 y añade 261 días desde la fecha de transferencia.',
    pt: 'Pelo método DUM, a data de parto é calculada somando 280 dias (40 semanas) ao primeiro dia da sua última menstruação, com ajuste pela duração do ciclo. Se seu ciclo é mais longo ou mais curto que 28 dias, a calculadora se ajusta de acordo. Para o método por data de concepção, 266 dias são adicionados à data da concepção. Para transferências FIV, a calculadora assume uma transferência de blastocisto no dia 5 e adiciona 261 dias a partir da data de transferência.',
    de: 'Bei der LMP-Methode wird der Geburtstermin berechnet, indem 280 Tage (40 Wochen) zum ersten Tag der letzten Menstruation addiert werden, angepasst an die Zykluslänge. Wenn Ihr Zyklus länger oder kürzer als 28 Tage ist, passt der Rechner das Ergebnis entsprechend an. Bei der Empfängnisdatum-Methode werden 266 Tage zum Empfängnisdatum addiert. Bei IVF-Transfers geht der Rechner von einem Tag-5-Blastozystentransfer aus und addiert 261 Tage ab dem Transferdatum.',
  },
  seoH3b: {
    en: 'Understanding gestational age',
    fr: 'Comprendre l\'âge gestationnel',
    es: 'Comprender la edad gestacional',
    pt: 'Entendendo a idade gestacional',
    de: 'Gestationsalter verstehen',
  },
  seoP3: {
    en: 'Gestational age counts from the first day of the last menstrual period, even though conception typically occurs about two weeks later. A full-term pregnancy is 37 to 42 weeks. The trimester progress bar shows your progress through each of the three trimesters and the milestones timeline helps track important dates throughout pregnancy.',
    fr: 'L\'âge gestationnel se compte à partir du premier jour des dernières règles, même si la conception a généralement lieu environ deux semaines plus tard. Une grossesse à terme dure de 37 à 42 semaines. La barre de progression des trimestres montre votre avancement à travers chacun des trois trimestres et la chronologie des étapes vous aide à suivre les dates importantes tout au long de la grossesse.',
    es: 'La edad gestacional se cuenta desde el primer día de la última menstruación, aunque la concepción suele ocurrir unas dos semanas después. Un embarazo a término dura de 37 a 42 semanas. La barra de progreso por trimestres muestra tu avance a través de cada uno de los tres trimestres y la línea de hitos te ayuda a seguir las fechas importantes durante todo el embarazo.',
    pt: 'A idade gestacional é contada a partir do primeiro dia da última menstruação, embora a concepção geralmente ocorra cerca de duas semanas depois. Uma gravidez a termo dura de 37 a 42 semanas. A barra de progresso por trimestres mostra seu avanço ao longo dos três trimestres e a linha do tempo de marcos ajuda a acompanhar as datas importantes durante toda a gravidez.',
    de: 'Das Gestationsalter zählt ab dem ersten Tag der letzten Menstruation, obwohl die Empfängnis typischerweise etwa zwei Wochen später stattfindet. Eine vollständige Schwangerschaft dauert 37 bis 42 Wochen. Der Trimester-Fortschrittsbalken zeigt Ihren Fortschritt durch alle drei Trimester und die Meilenstein-Zeitleiste hilft dabei, wichtige Termine während der Schwangerschaft zu verfolgen.',
  },
  seoCrossPromo: {
    en: 'Staying healthy during pregnancy starts with good nutrition and hydration. Use our',
    fr: 'Rester en bonne santé pendant la grossesse commence par une bonne alimentation et une bonne hydratation. Utilisez notre',
    es: 'Mantenerse saludable durante el embarazo comienza con una buena nutrición e hidratación. Usa nuestra',
    pt: 'Manter-se saudável durante a gravidez começa com boa nutrição e hidratação. Use nossa',
    de: 'Gesund durch die Schwangerschaft beginnt mit guter Ernährung und ausreichend Flüssigkeit. Nutzen Sie unseren',
  },
  linkCalorie: {
    en: 'calorie calculator',
    fr: 'calculateur de calories',
    es: 'calculadora de calorías',
    pt: 'calculadora de calorias',
    de: 'Kalorienrechner',
  },
  seoCrossPromo2: {
    en: 'to estimate your daily energy needs, which typically increase during the second and third trimesters. Our',
    fr: 'pour estimer vos besoins énergétiques quotidiens, qui augmentent généralement au cours des deuxième et troisième trimestres. Notre',
    es: 'para estimar tus necesidades energéticas diarias, que suelen aumentar durante el segundo y tercer trimestre. Nuestra',
    pt: 'para estimar suas necessidades energéticas diárias, que geralmente aumentam durante o segundo e terceiro trimestres. Nossa',
    de: 'um Ihren täglichen Energiebedarf einzuschätzen, der im zweiten und dritten Trimester typischerweise steigt. Unser',
  },
  linkWater: {
    en: 'water intake calculator',
    fr: 'calculateur d\'hydratation',
    es: 'calculadora de consumo de agua',
    pt: 'calculadora de consumo de água',
    de: 'Wasserbedarfsrechner',
  },
  seoCrossPromo3: {
    en: 'also accounts for pregnancy, adding the extra fluids recommended for expectant and breastfeeding mothers.',
    fr: 'tient également compte de la grossesse, en ajoutant les liquides supplémentaires recommandés pour les femmes enceintes et allaitantes.',
    es: 'también tiene en cuenta el embarazo, añadiendo los líquidos adicionales recomendados para embarazadas y madres lactantes.',
    pt: 'também leva em conta a gravidez, adicionando os líquidos extras recomendados para gestantes e lactantes.',
    de: 'berücksichtigt ebenfalls die Schwangerschaft und fügt die zusätzliche Flüssigkeitszufuhr hinzu, die für werdende und stillende Mütter empfohlen wird.',
  },
}

export default function DueDateClient({
  defaultMethod,
  defaultDate,
  locale = 'en' as Locale,
}: {
  defaultMethod?: string
  defaultDate?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(LOCALE_CODES[locale], { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString(LOCALE_CODES[locale], { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const [method, setMethod] = useState<Method>((defaultMethod as Method) ?? 'lmp')
  const [dateValue, setDateValue] = useState<string>(defaultDate ?? '')
  const [cycleLength, setCycleLength] = useState<number>(28)

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const results = useMemo(() => {
    if (!dateValue) return null

    const inputDate = new Date(dateValue + 'T00:00:00')
    if (isNaN(inputDate.getTime())) return null

    let dueDate: Date
    let conceptionEstimate: Date | null = null
    let lmpEstimate: Date

    if (method === 'lmp') {
      const cycleDiff = cycleLength - 28
      dueDate = addDays(inputDate, 280 + cycleDiff)
      conceptionEstimate = addDays(inputDate, 14 + cycleDiff)
      lmpEstimate = inputDate
    } else if (method === 'conception') {
      dueDate = addDays(inputDate, 266)
      lmpEstimate = addDays(inputDate, -14)
    } else {
      // IVF: day 5 blastocyst, so 266 - 5 = 261 days from transfer
      dueDate = addDays(inputDate, 261)
      lmpEstimate = addDays(inputDate, -19) // 14 + 5 days before transfer
    }

    // Gestational age is counted from LMP estimate
    const gestDays = daysBetween(lmpEstimate, today)
    const gestWeeks = Math.floor(gestDays / 7)
    const gestRemDays = gestDays % 7
    const daysRemaining = daysBetween(today, dueDate)

    // Trimester
    let trimester: number
    let trimesterLabel: string
    let trimesterColor: string
    if (gestWeeks < 13) {
      trimester = 1
      trimesterLabel = lt('tri1')
      trimesterColor = '#F59E0B'
    } else if (gestWeeks < 28) {
      trimester = 2
      trimesterLabel = lt('tri2')
      trimesterColor = '#10B981'
    } else {
      trimester = 3
      trimesterLabel = lt('tri3')
      trimesterColor = '#EC4899'
    }

    // Progress: 0-40 weeks = 0-100%
    const progress = Math.min(Math.max((gestDays / 280) * 100, 0), 100)

    // Milestones
    const milestones = [
      { label: lt('msEnd1stTri'), week: 12, date: addDays(lmpEstimate, 12 * 7) },
      { label: lt('msAnatomyScan'), week: 20, date: addDays(lmpEstimate, 20 * 7) },
      { label: lt('msViability'), week: 24, date: addDays(lmpEstimate, 24 * 7) },
      { label: lt('msTri3'), week: 28, date: addDays(lmpEstimate, 28 * 7) },
      { label: lt('msFullTerm'), week: 37, date: addDays(lmpEstimate, 37 * 7) },
      { label: lt('msDueDate'), week: 40, date: dueDate },
    ]

    return {
      dueDate,
      conceptionEstimate,
      gestWeeks,
      gestRemDays,
      gestDays,
      daysRemaining,
      trimester,
      trimesterLabel,
      trimesterColor,
      progress,
      milestones,
    }
  }, [dateValue, method, cycleLength, today, locale])

  const methodLabels: Record<Method, string> = {
    lmp: lt('methodLmp'),
    conception: lt('methodConception'),
    ivf: lt('methodIvf'),
  }

  const dateLabel = method === 'lmp'
    ? lt('dateLabelLmp')
    : method === 'conception'
      ? lt('dateLabelConception')
      : lt('dateLabelIvf')

  return (
    <ToolShell name={lt('navTitle')} icon={"\u{1F930}"} currentPath="/due-date-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>{'\u{1F930}'}</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleDueDate')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Method */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('calcMethod')}</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value as Method)}
                style={selectStyle}
              >
                <option value="lmp">{methodLabels.lmp}</option>
                <option value="conception">{methodLabels.conception}</option>
                <option value="ivf">{methodLabels.ivf}</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: method === 'lmp' ? '1fr 1fr' : '1fr', gap: 16 }}>
              {/* Date */}
              <div>
                <label style={labelStyle}>{dateLabel}</label>
                <input
                  type="date"
                  value={dateValue}
                  max={toInputValue(today)}
                  onChange={e => setDateValue(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Cycle length - only for LMP */}
              {method === 'lmp' && (
                <div>
                  <label style={labelStyle}>{lt('cycleLength')}</label>
                  <input
                    type="number"
                    value={cycleLength}
                    min={20}
                    max={45}
                    onChange={e => setCycleLength(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {results && results.gestDays >= 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Due date hero */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 22, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('estimatedDueDate')}</div>
              <div style={{ fontSize: 32, fontFamily: fm, fontWeight: 700, color: accent, marginBottom: 4 }}>
                {formatDate(results.dueDate)}
              </div>
              <div style={{ fontSize: 13, color: '#6B6560' }}>
                {results.gestWeeks} {lt('weeksAndDays')} {results.gestRemDays} {results.gestRemDays !== 1 ? lt('daysPregnant') : lt('dayPregnant')}
              </div>
            </div>

            {/* Days remaining + Trimester */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Days remaining */}
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('daysRemaining')}</div>
                <div style={{ fontSize: 48, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {Math.max(results.daysRemaining, 0)}
                </div>
                <div style={{ fontSize: 12, color: '#9A958A' }}>
                  {results.daysRemaining > 0 ? lt('daysToGo') : lt('anyDayNow')}
                </div>
              </div>

              {/* Trimester + conception */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', flex: 1 }}>
                  <div style={labelStyle}>{lt('currentTrimester')}</div>
                  <div style={{
                    display: 'inline-block', marginTop: 4, padding: '4px 14px', borderRadius: 20,
                    background: results.trimesterColor + '18', color: results.trimesterColor,
                    fontSize: 14, fontWeight: 700,
                  }}>
                    {results.trimesterLabel}
                  </div>
                </div>
                {results.conceptionEstimate && (
                  <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', flex: 1 }}>
                    <div style={labelStyle}>{lt('estConception')}</div>
                    <div style={{ fontSize: 14, fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>
                      {formatShortDate(results.conceptionEstimate)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 16px', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={labelStyle}>{lt('pregnancyProgress')}</span>
                <span style={{ fontSize: 13, fontFamily: fm, fontWeight: 600, color: accent }}>
                  {results.progress.toFixed(1)}%
                </span>
              </div>
              {/* Bar background */}
              <div style={{ position: 'relative', height: 18, borderRadius: 9, overflow: 'hidden', background: '#F5F3EE' }}>
                {/* Trimester sections background */}
                <div style={{ display: 'flex', height: '100%', position: 'absolute', top: 0, left: 0, width: '100%' }}>
                  <div style={{ width: `${(13 / 40) * 100}%`, background: '#FEF3C720', borderRight: '1px solid #E8E4DB' }} />
                  <div style={{ width: `${(15 / 40) * 100}%`, background: '#D1FAE520', borderRight: '1px solid #E8E4DB' }} />
                  <div style={{ width: `${(12 / 40) * 100}%`, background: '#FCE7F320' }} />
                </div>
                {/* Filled bar */}
                <div style={{
                  width: `${results.progress}%`,
                  height: '100%',
                  borderRadius: 9,
                  background: `linear-gradient(90deg, #F59E0B, #10B981, ${accent})`,
                  transition: 'width 0.4s ease',
                  position: 'relative',
                  zIndex: 1,
                }} />
              </div>
              {/* Trimester labels */}
              <div style={{ display: 'flex', marginTop: 6 }}>
                <div style={{ width: `${(13 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>{lt('tri1Short')}</div>
                <div style={{ width: `${(15 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>{lt('tri2Short')}</div>
                <div style={{ width: `${(12 / 40) * 100}%`, fontSize: 10, color: '#9A958A', textAlign: 'center' }}>{lt('tri3Short')}</div>
              </div>
            </div>

            {/* Milestones timeline */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: 22, marginBottom: 16,
            }}>
              <div style={{ ...labelStyle, marginBottom: 16 }}>{lt('keyMilestones')}</div>
              <div style={{ position: 'relative', paddingLeft: 28 }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
                  background: '#E8E4DB',
                }} />
                {results.milestones.map((m, i) => {
                  const isPast = today >= m.date
                  const isCurrent = !isPast && (i === 0 || today >= results.milestones[i - 1].date)
                  return (
                    <div key={m.label} style={{
                      position: 'relative', marginBottom: i < results.milestones.length - 1 ? 20 : 0,
                    }}>
                      {/* Dot */}
                      <div style={{
                        position: 'absolute', left: -24, top: 2,
                        width: 14, height: 14, borderRadius: '50%',
                        background: isPast ? accent : isCurrent ? '#fff' : '#F5F3EE',
                        border: isPast ? `2px solid ${accent}` : isCurrent ? `2px solid ${accent}` : '2px solid #D5D0C8',
                        zIndex: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isPast && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                        )}
                        {isCurrent && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
                        )}
                      </div>
                      {/* Content */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <div style={{
                            fontSize: 14, fontWeight: 600,
                            color: isPast ? '#1C1B18' : isCurrent ? accent : '#9A958A',
                          }}>
                            {m.label}
                          </div>
                          <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>
                            {lt('week')} {m.week}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 12, fontFamily: fm, color: isPast ? '#6B6560' : '#B0AAA0',
                          textDecoration: isPast ? 'none' : 'none',
                        }}>
                          {formatShortDate(m.date)}
                          {isPast && <span style={{ marginLeft: 6, color: '#10B981', fontSize: 10 }}>{'\u2713'}</span>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
              display: 'flex', alignItems: 'flex-start', gap: 8,
            }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{'\u26A0\uFE0F'}</span>
              <span>{lt('disclaimer')}</span>
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
            {lt('seoCrossPromo')} <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkCalorie')}</a> {lt('seoCrossPromo2')} <a href="/water-intake" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('linkWater')}</a> {lt('seoCrossPromo3')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
